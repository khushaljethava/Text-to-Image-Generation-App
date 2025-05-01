import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  images: defineTable({
    userId: v.id("users"),
    prompt: v.string(),
    imageUrl: v.string(),
    width: v.number(),
    height: v.number(),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
