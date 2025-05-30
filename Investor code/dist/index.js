// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  posts;
  financeTerms;
  newsletters;
  currentUserId;
  currentPostId;
  currentTermId;
  currentNewsletterId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.posts = /* @__PURE__ */ new Map();
    this.financeTerms = /* @__PURE__ */ new Map();
    this.newsletters = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentPostId = 1;
    this.currentTermId = 1;
    this.currentNewsletterId = 1;
    this.initializeSampleData();
  }
  initializeSampleData() {
    const featuredTerm = {
      id: this.currentTermId++,
      term: "Price-to-Earnings Ratio (P/E)",
      definition: "The P/E ratio compares a company's current share price to its earnings per share. It's one of the most fundamental metrics for evaluating whether a stock is overvalued or undervalued.",
      formula: "P/E = Market Price per Share \xF7 Earnings per Share",
      example: "If a stock trades at \u20B9100 and has earnings of \u20B910 per share, the P/E ratio is 10x",
      category: "Valuation Metrics",
      featured: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.financeTerms.set(featuredTerm.id, featuredTerm);
    const samplePosts = [
      {
        id: this.currentPostId++,
        title: "Understanding Beta: Market Risk Simplified",
        excerpt: "Learn how Beta measures a stock's volatility relative to the market and why it matters for your investment decisions.",
        content: "Beta is a measure of a stock's volatility in relation to the overall market...",
        category: "Finance Terms",
        readTime: 5,
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        published: true,
        createdAt: /* @__PURE__ */ new Date("2024-12-15"),
        updatedAt: /* @__PURE__ */ new Date("2024-12-15")
      },
      {
        id: this.currentPostId++,
        title: "Q3 Earnings Season: Key Takeaways",
        excerpt: "My analysis of major Indian companies' Q3 results and what they mean for retail investors like us.",
        content: "The Q3 earnings season has revealed some interesting trends...",
        category: "Market Analysis",
        readTime: 8,
        imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        published: true,
        createdAt: /* @__PURE__ */ new Date("2024-12-12"),
        updatedAt: /* @__PURE__ */ new Date("2024-12-12")
      },
      {
        id: this.currentPostId++,
        title: "My First Month in Equity Cohort",
        excerpt: "Sharing my experience and key learnings from the first month of structured equity analysis training.",
        content: "Starting an equity analysis cohort was one of the best decisions...",
        category: "Learning Journey",
        readTime: 6,
        imageUrl: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        published: true,
        createdAt: /* @__PURE__ */ new Date("2024-12-10"),
        updatedAt: /* @__PURE__ */ new Date("2024-12-10")
      }
    ];
    samplePosts.forEach((post) => this.posts.set(post.id, post));
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Post operations
  async getAllPosts() {
    return Array.from(this.posts.values()).filter((post) => post.published).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async getPostById(id) {
    return this.posts.get(id);
  }
  async getPostsByCategory(category) {
    return Array.from(this.posts.values()).filter((post) => post.published && post.category === category).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async searchPosts(query) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.posts.values()).filter(
      (post) => post.published && (post.title.toLowerCase().includes(lowercaseQuery) || post.excerpt.toLowerCase().includes(lowercaseQuery) || post.content.toLowerCase().includes(lowercaseQuery) || post.category.toLowerCase().includes(lowercaseQuery))
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async createPost(insertPost) {
    const id = this.currentPostId++;
    const now = /* @__PURE__ */ new Date();
    const post = {
      ...insertPost,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.posts.set(id, post);
    return post;
  }
  async updatePost(id, updatePost) {
    const existingPost = this.posts.get(id);
    if (!existingPost) return void 0;
    const updatedPost = {
      ...existingPost,
      ...updatePost,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }
  async deletePost(id) {
    return this.posts.delete(id);
  }
  // Finance term operations
  async getAllFinanceTerms() {
    return Array.from(this.financeTerms.values()).sort((a, b) => a.term.localeCompare(b.term));
  }
  async getFeaturedTerm() {
    return Array.from(this.financeTerms.values()).find((term) => term.featured);
  }
  async getFinanceTermById(id) {
    return this.financeTerms.get(id);
  }
  async searchFinanceTerms(query) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.financeTerms.values()).filter(
      (term) => term.term.toLowerCase().includes(lowercaseQuery) || term.definition.toLowerCase().includes(lowercaseQuery) || term.category.toLowerCase().includes(lowercaseQuery)
    ).sort((a, b) => a.term.localeCompare(b.term));
  }
  async createFinanceTerm(insertTerm) {
    const id = this.currentTermId++;
    const now = /* @__PURE__ */ new Date();
    const term = {
      ...insertTerm,
      id,
      createdAt: now
    };
    this.financeTerms.set(id, term);
    return term;
  }
  // Newsletter operations
  async subscribeToNewsletter(insertNewsletter) {
    const existing = Array.from(this.newsletters.values()).find(
      (newsletter2) => newsletter2.email === insertNewsletter.email
    );
    if (existing) {
      throw new Error("Email already subscribed");
    }
    const id = this.currentNewsletterId++;
    const now = /* @__PURE__ */ new Date();
    const newsletter = {
      ...insertNewsletter,
      id,
      subscribedAt: now
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  async getNewsletterSubscribers() {
    return Array.from(this.newsletters.values()).sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  readTime: integer("read_time").notNull(),
  imageUrl: text("image_url"),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var financeTerms = pgTable("finance_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
  formula: text("formula"),
  example: text("example"),
  category: text("category").notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertFinanceTermSchema = createInsertSchema(financeTerms).omit({
  id: true,
  createdAt: true
});
var insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  subscribedAt: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/posts", async (req, res) => {
    try {
      const { category, search } = req.query;
      let posts2;
      if (search) {
        posts2 = await storage.searchPosts(search);
      } else if (category) {
        posts2 = await storage.getPostsByCategory(category);
      } else {
        posts2 = await storage.getAllPosts();
      }
      res.json(posts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });
  app2.get("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });
  app2.post("/api/posts", async (req, res) => {
    try {
      const result = insertPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid post data", errors: result.error.errors });
      }
      const post = await storage.createPost(result.data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create post" });
    }
  });
  app2.get("/api/finance-terms", async (req, res) => {
    try {
      const { search } = req.query;
      let terms;
      if (search) {
        terms = await storage.searchFinanceTerms(search);
      } else {
        terms = await storage.getAllFinanceTerms();
      }
      res.json(terms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch finance terms" });
    }
  });
  app2.get("/api/finance-terms/featured", async (req, res) => {
    try {
      const term = await storage.getFeaturedTerm();
      if (!term) {
        return res.status(404).json({ message: "No featured term found" });
      }
      res.json(term);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured term" });
    }
  });
  app2.post("/api/finance-terms", async (req, res) => {
    try {
      const result = insertFinanceTermSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid term data", errors: result.error.errors });
      }
      const term = await storage.createFinanceTerm(result.data);
      res.status(201).json(term);
    } catch (error) {
      res.status(500).json({ message: "Failed to create finance term" });
    }
  });
  app2.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const result = insertNewsletterSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid email", errors: result.error.errors });
      }
      const subscription = await storage.subscribeToNewsletter(result.data);
      res.status(201).json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      if (error instanceof Error && error.message === "Email already subscribed") {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });
  app2.get("/api/market-data/indian", async (req, res) => {
    try {
      const niftyResponse = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/^NSEI`);
      const sensexResponse = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/^BSESN`);
      const niftyData = await niftyResponse.json();
      const sensexData = await sensexResponse.json();
      const niftyResult = niftyData.chart.result[0];
      const sensexResult = sensexData.chart.result[0];
      const niftyPrice = niftyResult.meta.regularMarketPrice;
      const niftyPrevClose = niftyResult.meta.previousClose;
      const niftyChange = niftyPrice - niftyPrevClose;
      const niftyChangePercent = niftyChange / niftyPrevClose * 100;
      const sensexPrice = sensexResult.meta.regularMarketPrice;
      const sensexPrevClose = sensexResult.meta.previousClose;
      const sensexChange = sensexPrice - sensexPrevClose;
      const sensexChangePercent = sensexChange / sensexPrevClose * 100;
      res.json({
        nifty: {
          symbol: "NIFTY 50",
          price: niftyPrice,
          change: niftyChange,
          changePercent: niftyChangePercent
        },
        sensex: {
          symbol: "SENSEX",
          price: sensexPrice,
          change: sensexChange,
          changePercent: sensexChangePercent
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Indian market data" });
    }
  });
  app2.get("/api/market-data/us", async (req, res) => {
    try {
      const spyResponse = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/SPY`);
      const qqqResponse = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/QQQ`);
      const spyData = await spyResponse.json();
      const qqqData = await qqqResponse.json();
      const spyResult = spyData.chart.result[0];
      const qqqResult = qqqData.chart.result[0];
      const spyPrice = spyResult.meta.regularMarketPrice;
      const spyPrevClose = spyResult.meta.previousClose;
      const spyChange = spyPrice - spyPrevClose;
      const spyChangePercent = spyChange / spyPrevClose * 100;
      const qqqPrice = qqqResult.meta.regularMarketPrice;
      const qqqPrevClose = qqqResult.meta.previousClose;
      const qqqChange = qqqPrice - qqqPrevClose;
      const qqqChangePercent = qqqChange / qqqPrevClose * 100;
      res.json({
        sp500: {
          symbol: "S&P 500 (SPY)",
          price: spyPrice,
          change: spyChange,
          changePercent: spyChangePercent
        },
        nasdaq: {
          symbol: "NASDAQ (QQQ)",
          price: qqqPrice,
          change: qqqChange,
          changePercent: qqqChangePercent
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch US market data" });
    }
  });
  app2.get("/api/market-data/currency", async (req, res) => {
    try {
      const usdInrResponse = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/USDINR=X`);
      const eurInrResponse = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/EURINR=X`);
      const usdInrData = await usdInrResponse.json();
      const eurInrData = await eurInrResponse.json();
      const usdInrResult = usdInrData.chart.result[0];
      const eurInrResult = eurInrData.chart.result[0];
      res.json({
        usdInr: {
          symbol: "USD/INR",
          rate: usdInrResult.meta.regularMarketPrice,
          lastUpdate: new Date(usdInrResult.meta.regularMarketTime * 1e3).toISOString()
        },
        eurInr: {
          symbol: "EUR/INR",
          rate: eurInrResult.meta.regularMarketPrice,
          lastUpdate: new Date(eurInrResult.meta.regularMarketTime * 1e3).toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch currency data" });
    }
  });
  app2.get("/api/search", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const [posts2, terms] = await Promise.all([
        storage.searchPosts(query),
        storage.searchFinanceTerms(query)
      ]);
      res.json({ posts: posts2, terms });
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
process.env.ALPHA_VANTAGE_API_KEY = "BYHJ4WYAHQJ038GI";
process.env.FINNHUB_API_KEY = "d0s3i71r01qumephgjs0d0s3i71r01qumephgjsg";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
