import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * listAdmins
 * - Returns all admins from the database
 */
export const listAdmins = query({
  handler: async (ctx) => {
    return await ctx.db.query("admins").collect();
  },
});

/**
 * addAdmin
 * - Adds a new admin email
 */
export const addAdmin = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
  },
  handler: async (ctx, { email, name, role }) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", cleanEmail))
      .first();

    if (existing) {
      throw new Error("Admin with this email already exists");
    }

    return await ctx.db.insert("admins", {
      email: cleanEmail,
      name: name ?? "Admin",
      role: role ?? "admin",
      addedAt: Date.now(),
    });
  },
});

/**
 * removeAdmin
 * - Deletes an admin by ID
 */
export const removeAdmin = mutation({
  args: {
    adminId: v.id("admins"),
  },
  handler: async (ctx, { adminId }) => {
    await ctx.db.delete(adminId);
    return { success: true };
  },
});

/**
 * isEmailAdmin
 * - Checks if an email is registered as admin
 */
export const isEmailAdmin = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    const cleanEmail = email.trim().toLowerCase();
    const admin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", cleanEmail))
      .first();

    return !!admin;
  },
});
