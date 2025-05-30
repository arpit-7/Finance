import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, insertFinanceTermSchema, insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let posts;
      if (search) {
        posts = await storage.searchPosts(search as string);
      } else if (category) {
        posts = await storage.getPostsByCategory(category as string);
      } else {
        posts = await storage.getAllPosts();
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
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

  app.post("/api/posts", async (req, res) => {
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

  // Finance terms routes
  app.get("/api/finance-terms", async (req, res) => {
    try {
      const { search } = req.query;
      
      let terms;
      if (search) {
        terms = await storage.searchFinanceTerms(search as string);
      } else {
        terms = await storage.getAllFinanceTerms();
      }
      
      res.json(terms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch finance terms" });
    }
  });

  app.get("/api/finance-terms/featured", async (req, res) => {
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

  app.post("/api/finance-terms", async (req, res) => {
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

  // Newsletter routes
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const result = insertNewsletterSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid email", errors: result.error.errors });
      }
      
      const subscription = await storage.subscribeToNewsletter(result.data);
      res.status(201).json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      if (error instanceof Error && error.message === 'Email already subscribed') {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Market data endpoints using Yahoo Finance API
  app.get("/api/market-data/indian", async (req, res) => {
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
      const niftyChangePercent = (niftyChange / niftyPrevClose) * 100;
      
      const sensexPrice = sensexResult.meta.regularMarketPrice;
      const sensexPrevClose = sensexResult.meta.previousClose;
      const sensexChange = sensexPrice - sensexPrevClose;
      const sensexChangePercent = (sensexChange / sensexPrevClose) * 100;
      
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

  app.get("/api/market-data/us", async (req, res) => {
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
      const spyChangePercent = (spyChange / spyPrevClose) * 100;
      
      const qqqPrice = qqqResult.meta.regularMarketPrice;
      const qqqPrevClose = qqqResult.meta.previousClose;
      const qqqChange = qqqPrice - qqqPrevClose;
      const qqqChangePercent = (qqqChange / qqqPrevClose) * 100;
      
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

  app.get("/api/market-data/currency", async (req, res) => {
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
          lastUpdate: new Date(usdInrResult.meta.regularMarketTime * 1000).toISOString()
        },
        eurInr: {
          symbol: "EUR/INR", 
          rate: eurInrResult.meta.regularMarketPrice,
          lastUpdate: new Date(eurInrResult.meta.regularMarketTime * 1000).toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch currency data" });
    }
  });

  // Search endpoint
  app.get("/api/search", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const [posts, terms] = await Promise.all([
        storage.searchPosts(query as string),
        storage.searchFinanceTerms(query as string)
      ]);
      
      res.json({ posts, terms });
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
