import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    userId: v.id('users'),
    title: v.string(),
    body: v.string(),
    type: v.union(
      v.literal('ATTENDANCE'),
      v.literal('QUIZ'),
      v.literal('ASSIGNMENT'),
      v.literal('ADMISSION'),
      v.literal('ANNOUNCEMENT'),
      v.literal('SYSTEM')
    ),
    data: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('notifications', {
      ...args,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});

export const getByUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('notifications')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .order('desc')
      .take(50);
  },
});

export const getUnreadCount = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const unread = await ctx.db
      .query('notifications')
      .withIndex('by_user_unread', (q) => q.eq('userId', args.userId).eq('isRead', false))
      .collect();
    return unread.length;
  },
});

export const markAsRead = mutation({
  args: { notificationId: v.id('notifications') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.notificationId, { isRead: true });
  },
});

export const markAllAsRead = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const unread = await ctx.db
      .query('notifications')
      .withIndex('by_user_unread', (q) => q.eq('userId', args.userId).eq('isRead', false))
      .collect();
    for (const notification of unread) {
      await ctx.db.patch(notification._id, { isRead: true });
    }
  },
});
