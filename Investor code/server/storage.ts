import { users, posts, financeTerms, newsletters, type User, type InsertUser, type Post, type InsertPost, type FinanceTerm, type InsertFinanceTerm, type Newsletter, type InsertNewsletter } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Post operations
  getAllPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  getPostsByCategory(category: string): Promise<Post[]>;
  searchPosts(query: string): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;

  // Finance term operations
  getAllFinanceTerms(): Promise<FinanceTerm[]>;
  getFeaturedTerm(): Promise<FinanceTerm | undefined>;
  getFinanceTermById(id: number): Promise<FinanceTerm | undefined>;
  searchFinanceTerms(query: string): Promise<FinanceTerm[]>;
  createFinanceTerm(term: InsertFinanceTerm): Promise<FinanceTerm>;

  // Newsletter operations
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private financeTerms: Map<number, FinanceTerm>;
  private newsletters: Map<number, Newsletter>;
  private currentUserId: number;
  private currentPostId: number;
  private currentTermId: number;
  private currentNewsletterId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.financeTerms = new Map();
    this.newsletters = new Map();
    this.currentUserId = 1;
    this.currentPostId = 1;
    this.currentTermId = 1;
    this.currentNewsletterId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample featured finance term
    const featuredTerm: FinanceTerm = {
      id: this.currentTermId++,
      term: "Price-to-Earnings Ratio (P/E)",
      definition: "The P/E ratio compares a company's current share price to its earnings per share. It's one of the most fundamental metrics for evaluating whether a stock is overvalued or undervalued.",
      formula: "P/E = Market Price per Share ÷ Earnings per Share",
      example: "If a stock trades at ₹100 and has earnings of ₹10 per share, the P/E ratio is 10x",
      category: "Valuation Metrics",
      featured: true,
      createdAt: new Date(),
    };
    this.financeTerms.set(featuredTerm.id, featuredTerm);

    // Sample posts
    const samplePosts: Post[] = [
      {
        id: this.currentPostId++,
        title: "Understanding Beta: Market Risk Simplified",
        excerpt: "Learn how Beta measures a stock's volatility relative to the market and why it matters for your investment decisions.",
        content: "Beta is a measure of a stock's volatility in relation to the overall market...",
        category: "Finance Terms",
        readTime: 5,
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        published: true,
        createdAt: new Date('2024-12-15'),
        updatedAt: new Date('2024-12-15'),
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
        createdAt: new Date('2024-12-12'),
        updatedAt: new Date('2024-12-12'),
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
        createdAt: new Date('2024-12-10'),
        updatedAt: new Date('2024-12-10'),
      }
    ];

    samplePosts.forEach(post => this.posts.set(post.id, post));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Post operations
  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getPostById(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.published && post.category === category)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async searchPosts(query: string): Promise<Post[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.posts.values())
      .filter(post => 
        post.published && (
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.excerpt.toLowerCase().includes(lowercaseQuery) ||
          post.content.toLowerCase().includes(lowercaseQuery) ||
          post.category.toLowerCase().includes(lowercaseQuery)
        )
      )
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const now = new Date();
    const post: Post = { 
      ...insertPost, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: number, updatePost: Partial<InsertPost>): Promise<Post | undefined> {
    const existingPost = this.posts.get(id);
    if (!existingPost) return undefined;

    const updatedPost: Post = {
      ...existingPost,
      ...updatePost,
      updatedAt: new Date(),
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    return this.posts.delete(id);
  }

  // Finance term operations
  async getAllFinanceTerms(): Promise<FinanceTerm[]> {
    return Array.from(this.financeTerms.values())
      .sort((a, b) => a.term.localeCompare(b.term));
  }

  async getFeaturedTerm(): Promise<FinanceTerm | undefined> {
    return Array.from(this.financeTerms.values()).find(term => term.featured);
  }

  async getFinanceTermById(id: number): Promise<FinanceTerm | undefined> {
    return this.financeTerms.get(id);
  }

  async searchFinanceTerms(query: string): Promise<FinanceTerm[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.financeTerms.values())
      .filter(term => 
        term.term.toLowerCase().includes(lowercaseQuery) ||
        term.definition.toLowerCase().includes(lowercaseQuery) ||
        term.category.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => a.term.localeCompare(b.term));
  }

  async createFinanceTerm(insertTerm: InsertFinanceTerm): Promise<FinanceTerm> {
    const id = this.currentTermId++;
    const now = new Date();
    const term: FinanceTerm = { 
      ...insertTerm, 
      id, 
      createdAt: now 
    };
    this.financeTerms.set(id, term);
    return term;
  }

  // Newsletter operations
  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existing = Array.from(this.newsletters.values()).find(
      newsletter => newsletter.email === insertNewsletter.email
    );
    if (existing) {
      throw new Error('Email already subscribed');
    }

    const id = this.currentNewsletterId++;
    const now = new Date();
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id, 
      subscribedAt: now 
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values())
      .sort((a, b) => new Date(b.subscribedAt!).getTime() - new Date(a.subscribedAt!).getTime());
  }
}

export const storage = new MemStorage();
