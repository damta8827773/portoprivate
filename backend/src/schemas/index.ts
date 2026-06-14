import { z } from 'zod';

/**
 * POST /api/comments - create a comment or a reply (parentId set).
 * Identity (name/email/photo) is NOT accepted from the client; it is derived
 * from the verified Firebase token in requireAuth to prevent impersonation.
 */
export const createCommentSchema = z.object({
  comment: z.string().min(1).max(2000),
  rating: z.coerce.number().int().min(0).max(5).default(0),
  parentId: z.coerce.number().int().positive().optional(),
});
export type CreateCommentInput = z.infer<typeof createCommentSchema>;

/** POST /api/contact - contact form submission. */
export const createContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(4000),
});
export type CreateContactInput = z.infer<typeof createContactSchema>;

/** GET /api/comments?parentId= - list top-level or replies. */
export const listCommentsQuerySchema = z.object({
  parentId: z.coerce.number().int().positive().optional(),
});
