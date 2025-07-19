import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSocialMediaAccountSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Social media accounts routes
  
  // GET /api/accounts - Get all accounts with optional filters
  app.get("/api/accounts", async (req, res) => {
    try {
      const { platform, category, minFollowers, maxPrice, sortBy, sortOrder } = req.query;
      
      const filters = {
        platform: platform as string,
        category: category as string,
        minFollowers: minFollowers ? parseInt(minFollowers as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        sortBy: sortBy as 'price' | 'followers' | 'engagement' | 'createdAt',
        sortOrder: sortOrder as 'asc' | 'desc'
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => 
        filters[key as keyof typeof filters] === undefined && delete filters[key as keyof typeof filters]
      );

      const accounts = await storage.getSocialMediaAccounts(filters);
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch accounts" });
    }
  });

  // GET /api/accounts/:id - Get specific account
  app.get("/api/accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const account = await storage.getSocialMediaAccount(id);
      
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
      
      res.json(account);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch account" });
    }
  });

  // POST /api/accounts - Create new account
  app.post("/api/accounts", async (req, res) => {
    try {
      const validatedData = insertSocialMediaAccountSchema.parse(req.body);
      const account = await storage.createSocialMediaAccount(validatedData);
      res.status(201).json(account);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  // PUT /api/accounts/:id - Update account
  app.put("/api/accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertSocialMediaAccountSchema.partial().parse(req.body);
      const account = await storage.updateSocialMediaAccount(id, validatedData);
      
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
      
      res.json(account);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update account" });
    }
  });

  // DELETE /api/accounts/:id - Delete account
  app.delete("/api/accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSocialMediaAccount(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Account not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete account" });
    }
  });

  // Cart routes
  app.get("/api/cart/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      console.error("Error getting cart items:", error);
      res.status(500).json({ error: "Failed to get cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const { userId, accountId } = req.body;
      const cartItem = await storage.addToCart(userId, accountId);
      res.status(201).json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.delete("/api/cart/:userId/:accountId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const accountId = parseInt(req.params.accountId);
      const success = await storage.removeFromCart(userId, accountId);
      
      if (success) {
        res.json({ message: "Item removed from cart" });
      } else {
        res.status(404).json({ error: "Item not found in cart" });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const success = await storage.clearCart(userId);
      
      if (success) {
        res.json({ message: "Cart cleared" });
      } else {
        res.status(500).json({ error: "Failed to clear cart" });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
