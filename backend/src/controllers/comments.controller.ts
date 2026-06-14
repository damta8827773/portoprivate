import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { env } from '../config/env.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import type { CreateCommentInput } from '../schemas/index.js';

/** Lists top-level comments with their nested replies (chat room). */
export const listComments = asyncHandler(async (_req: Request, res: Response) => {
  const comments = await prisma.comment.findMany({
    where: { parentId: null },
    orderBy: { createdAt: 'asc' },
    include: { replies: { orderBy: { createdAt: 'asc' } } },
  });
  return ok(res, comments);
});

/**
 * Creates a comment, or a reply when parentId is provided.
 * Identity comes from the verified token (req.user), not the request body.
 * Replies are restricted to the owner only.
 */
export const createComment = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body as CreateCommentInput;
  const user = req.user;
  if (!user) throw new ApiError(401, 'Authentication required');

  if (data.parentId) {
    if (user.email !== env.OWNER_EMAIL) {
      throw new ApiError(403, 'Only the owner can reply to comments');
    }
    const parent = await prisma.comment.findUnique({ where: { id: data.parentId } });
    if (!parent) throw ApiError.notFound('Parent comment not found');
  }

  const comment = await prisma.comment.create({
    data: {
      name: user.name,
      email: user.email,
      photo: user.picture || null,
      comment: data.comment,
      rating: data.parentId ? 0 : (data.rating ?? 0),
      parentId: data.parentId ?? null,
    },
  });
  return ok(res, comment, undefined, 201);
});
