import { users, socialMediaAccounts, cartItems, type User, type InsertUser, type SocialMediaAccount, type InsertSocialMediaAccount, type CartItem, type InsertCartItem } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Social media accounts
  getSocialMediaAccounts(filters?: {
    platform?: string;
    category?: string;
    minFollowers?: number;
    maxPrice?: number;
    sortBy?: 'price' | 'followers' | 'engagement' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  }): Promise<SocialMediaAccount[]>;
  getSocialMediaAccount(id: number): Promise<SocialMediaAccount | undefined>;
  createSocialMediaAccount(account: InsertSocialMediaAccount): Promise<SocialMediaAccount>;
  updateSocialMediaAccount(id: number, updates: Partial<InsertSocialMediaAccount>): Promise<SocialMediaAccount | undefined>;
  deleteSocialMediaAccount(id: number): Promise<boolean>;

  // Cart functionality
  getCartItems(userId: number): Promise<(CartItem & { account: SocialMediaAccount })[]>;
  addToCart(userId: number, accountId: number): Promise<CartItem>;
  removeFromCart(userId: number, accountId: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private socialMediaAccounts: Map<number, SocialMediaAccount>;
  private cartItems: Map<number, CartItem>;
  private currentUserId: number;
  private currentAccountId: number;
  private currentCartItemId: number;

  constructor() {
    this.users = new Map();
    this.socialMediaAccounts = new Map();
    this.cartItems = new Map();
    this.currentUserId = 1;
    this.currentAccountId = 1;
    this.currentCartItemId = 1;
    
    // Add some mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockAccounts: InsertSocialMediaAccount[] = [
      {
        sellerId: 1,
        platform: "instagram",
        accountHandle: "@lifestyle_guru",
        followers: 125000,
        engagement: "3.2",
        price: "2500.00",
        description: "Premium lifestyle account with high engagement rate. Niche focused on luxury travel and fashion.",
        category: "lifestyle",
        verified: true,
        age: 24,
        status: "available",
        sellerName: "Sarah Martinez",
        sellerRating: "4.8",
        sellerReviews: 127
      },
      {
        sellerId: 2,
        platform: "twitter",
        accountHandle: "@techreviews_pro",
        followers: 89000,
        engagement: "4.1",
        price: "1800.00",
        description: "Tech review account with engaged audience. Great for tech product promotions.",
        category: "technology",
        verified: false,
        age: 18,
        status: "available",
        sellerName: "Alex Chen",
        sellerRating: "4.6",
        sellerReviews: 89
      },
      {
        sellerId: 3,
        platform: "tiktok",
        accountHandle: "@dance_moves",
        followers: 340000,
        engagement: "7.8",
        price: "4200.00",
        description: "Viral dance content creator with young demographic. Perfect for fashion and music brands.",
        category: "entertainment",
        verified: true,
        age: 12,
        status: "available",
        sellerName: "Maya Johnson",
        sellerRating: "4.9",
        sellerReviews: 203
      },
      {
        sellerId: 4,
        platform: "youtube",
        accountHandle: "CookingMaster",
        followers: 78000,
        engagement: "5.2",
        price: "3100.00",
        description: "Food and cooking channel with loyal subscriber base. Ideal for kitchen appliance and food brands.",
        category: "food",
        verified: false,
        age: 36,
        status: "available",
        sellerName: "Roberto Silva",
        sellerRating: "4.7",
        sellerReviews: 156
      },
      {
        sellerId: 5,
        platform: "facebook",
        accountHandle: "FitnessJourney",
        followers: 156000,
        engagement: "2.9",
        price: "2200.00",
        description: "Fitness and wellness page with health-conscious audience. Great for supplement and gym equipment brands.",
        category: "fitness",
        verified: true,
        age: 28,
        status: "available",
        sellerName: "Emma Thompson",
        sellerRating: "4.5",
        sellerReviews: 92
      },
      {
        sellerId: 6,
        platform: "instagram",
        accountHandle: "@gaming_streams",
        followers: 67000,
        engagement: "6.4",
        price: "1500.00",
        description: "Gaming content creator specializing in FPS games. Strong male 18-25 demographic.",
        category: "gaming",
        verified: false,
        age: 15,
        status: "available",
        sellerName: "Tyler Brooks",
        sellerRating: "4.4",
        sellerReviews: 67
      }
    ];

    mockAccounts.forEach(account => {
      const id = this.currentAccountId++;
      const fullAccount: SocialMediaAccount = {
        ...account,
        id,
        createdAt: new Date()
      };
      this.socialMediaAccounts.set(id, fullAccount);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSocialMediaAccounts(filters?: {
    platform?: string;
    category?: string;
    minFollowers?: number;
    maxPrice?: number;
    sortBy?: 'price' | 'followers' | 'engagement' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  }): Promise<SocialMediaAccount[]> {
    let accounts = Array.from(this.socialMediaAccounts.values()).filter(
      account => account.status === 'available'
    );

    // Apply filters
    if (filters) {
      if (filters.platform) {
        accounts = accounts.filter(account => account.platform === filters.platform);
      }
      if (filters.category) {
        accounts = accounts.filter(account => account.category === filters.category);
      }
      if (filters.minFollowers) {
        accounts = accounts.filter(account => account.followers >= filters.minFollowers);
      }
      if (filters.maxPrice) {
        accounts = accounts.filter(account => parseFloat(account.price) <= filters.maxPrice);
      }

      // Apply sorting
      if (filters.sortBy) {
        accounts.sort((a, b) => {
          let aValue: any, bValue: any;
          
          switch (filters.sortBy) {
            case 'price':
              aValue = parseFloat(a.price);
              bValue = parseFloat(b.price);
              break;
            case 'followers':
              aValue = a.followers;
              bValue = b.followers;
              break;
            case 'engagement':
              aValue = parseFloat(a.engagement || '0');
              bValue = parseFloat(b.engagement || '0');
              break;
            case 'createdAt':
              aValue = a.createdAt?.getTime() || 0;
              bValue = b.createdAt?.getTime() || 0;
              break;
            default:
              return 0;
          }

          if (filters.sortOrder === 'desc') {
            return bValue - aValue;
          }
          return aValue - bValue;
        });
      }
    }

    return accounts;
  }

  async getSocialMediaAccount(id: number): Promise<SocialMediaAccount | undefined> {
    return this.socialMediaAccounts.get(id);
  }

  async createSocialMediaAccount(account: InsertSocialMediaAccount): Promise<SocialMediaAccount> {
    const id = this.currentAccountId++;
    const fullAccount: SocialMediaAccount = {
      ...account,
      id,
      createdAt: new Date()
    };
    this.socialMediaAccounts.set(id, fullAccount);
    return fullAccount;
  }

  async updateSocialMediaAccount(id: number, updates: Partial<InsertSocialMediaAccount>): Promise<SocialMediaAccount | undefined> {
    const account = this.socialMediaAccounts.get(id);
    if (!account) return undefined;

    const updatedAccount = { ...account, ...updates };
    this.socialMediaAccounts.set(id, updatedAccount);
    return updatedAccount;
  }

  async deleteSocialMediaAccount(id: number): Promise<boolean> {
    return this.socialMediaAccounts.delete(id);
  }

  // Cart functionality
  async getCartItems(userId: number): Promise<(CartItem & { account: SocialMediaAccount })[]> {
    const userCartItems = Array.from(this.cartItems.values())
      .filter(item => item.userId === userId);
    
    const result = [];
    for (const cartItem of userCartItems) {
      const account = this.socialMediaAccounts.get(cartItem.accountId);
      if (account) {
        result.push({ ...cartItem, account });
      }
    }
    
    return result;
  }

  async addToCart(userId: number, accountId: number): Promise<CartItem> {
    // Check if item already exists in cart
    const existing = Array.from(this.cartItems.values())
      .find(item => item.userId === userId && item.accountId === accountId);
    
    if (existing) {
      return existing;
    }

    const cartItem: CartItem = {
      id: this.currentCartItemId++,
      userId,
      accountId,
      quantity: 1,
      createdAt: new Date()
    };

    this.cartItems.set(cartItem.id, cartItem);
    return cartItem;
  }

  async removeFromCart(userId: number, accountId: number): Promise<boolean> {
    const cartItem = Array.from(this.cartItems.values())
      .find(item => item.userId === userId && item.accountId === accountId);
    
    if (cartItem) {
      return this.cartItems.delete(cartItem.id);
    }
    
    return false;
  }

  async clearCart(userId: number): Promise<boolean> {
    const userCartItems = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.userId === userId);
    
    userCartItems.forEach(([id, _]) => {
      this.cartItems.delete(id);
    });
    
    return true;
  }
}

export const storage = new MemStorage();
