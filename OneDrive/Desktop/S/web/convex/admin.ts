import { query } from './_generated/server';
import { v } from 'convex/values';

export const me = query({
  args: { userId: v.optional(v.id('users')) },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db.get(args.userId);
    }
    return await ctx.db
      .query('users')
      .withIndex('by_role', (q) => q.eq('role', 'IT_ADMIN'))
      .first();
  },
});

export const getStandard = query({
  args: { userId: v.optional(v.id('users')) },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db.get(args.userId);
    }
    return await ctx.db
      .query('users')
      .withIndex('by_role', (q) => q.eq('role', 'IT_ADMIN'))
      .first();
  },
});
