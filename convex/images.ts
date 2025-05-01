import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const saveImage = internalMutation({
  args: {
    prompt: v.string(),
    imageUrl: v.string(),
    width: v.number(),
    height: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.db.insert("images", {
      userId,
      prompt: args.prompt,
      imageUrl: args.imageUrl,
      width: args.width,
      height: args.height,
    });
  },
});

export const listUserImages = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    
    return await ctx.db
      .query("images")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});
