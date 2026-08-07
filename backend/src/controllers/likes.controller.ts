import type { Request, Response } from 'express';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getLikes, toggleLike, reportComment } from '../services/likes.service.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Ids come straight from the URL, so accept only the shape Firestore actually
 * produces. This keeps arbitrary strings (path traversal, huge keys) out of the
 * JSON store that backs likes and reports.
 */
const ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

function safeId(raw: unknown): string | null {
  const id = String(raw ?? '');
  return ID_PATTERN.test(id) ? id : null;
}

export const listLikes = asyncHandler(async (_req: Request, res: Response) => ok(res, getLikes()));

export const likeComment = asyncHandler(async (req: Request, res: Response) => {
  const id = safeId(req.params.id);
  if (!id) throw ApiError.badRequest('Invalid comment id');
  const liked = req.body?.liked !== false; // default: like; { liked: false } unlikes
  return ok(res, { id, count: toggleLike(id, liked) });
});

export const flagComment = asyncHandler(async (req: Request, res: Response) => {
  const id = safeId(req.params.id);
  if (!id) throw ApiError.badRequest('Invalid comment id');
  return ok(res, { id, reports: reportComment(id) });
});
