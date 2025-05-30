import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Set API keys for market data
process.env.ALPHA_VANTAGE_API_KEY = "BYHJ4WYAHQJ038GI";
process.env.FINNHUB_API_KEY = "d0s3i71r01qumephgjs0d0s3i71r01qumephgjsg";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 3000;
  
  // Handle ENOTSUP error by trying different binding options
  const startServer = () => {
    // Try localhost first (most compatible)
    const server = app.listen(port, 'localhost', () => {
      log(`serving on port ${port} (localhost)`);
    });

    server.on('error', (err: any) => {
      if (err.code === 'ENOTSUP' || err.code === 'EADDRINUSE' || err.code === 'EACCES') {
        console.log(`Failed to bind to localhost:${port}, trying 127.0.0.1...`);
        
        // Try 127.0.0.1
        const server2 = app.listen(port, '127.0.0.1', () => {
          log(`serving on port ${port} (127.0.0.1)`);
        });

        server2.on('error', (err2: any) => {
          if (err2.code === 'ENOTSUP' || err2.code === 'EADDRINUSE' || err2.code === 'EACCES') {
            console.log(`Failed to bind to 127.0.0.1:${port}, trying default binding...`);
            
            // Final fallback - let Node.js choose
            app.listen(port, () => {
              log(`serving on port ${port} (default binding)`);
            }).on('error', (err3: any) => {
              console.error('All binding attempts failed:', err3);
              process.exit(1);
            });
          } else {
            console.error('Server error:', err2);
            process.exit(1);
          }
        });
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  };

  startServer();
})();