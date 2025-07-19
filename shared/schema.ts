import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export const socialMediaAccounts = pgTable("social_media_accounts", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id").notNull(),
  platform: text("platform").notNull(), // instagram, twitter, facebook, tiktok, youtube
  accountHandle: text("account_handle").notNull(),
  followers: integer("followers").notNull(),
  engagement: decimal("engagement", { precision: 5, scale: 2 }), // engagement rate %
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  category: text("category").notNull(), // lifestyle, business, gaming, fashion, etc.
  verified: boolean("verified").default(false),
  age: integer("age"), // account age in months
  status: text("status").notNull().default("available"), // available, pending, sold
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertSocialMediaAccountSchema = createInsertSchema(socialMediaAccounts).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSocialMediaAccount = z.infer<typeof insertSocialMediaAccountSchema>;
export type SocialMediaAccount = typeof socialMediaAccounts.$inferSelect;
