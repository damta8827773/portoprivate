import type { Request, Response } from 'express';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getLikes, toggleLike, reportComment } from '../services/likes.service.js';

export const listLikes = asyncHandler(async (_req: Request, res: Response) => ok(res, getLikes()));

export const likeComment = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id ?? '').slice(0, 200);
  const liked = req.body?.liked !== false; // default: like; { liked: false } unlikes
  return ok(res, { id, count: toggleLike(id, liked) });
});

export const flagComment = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id ?? '').slice(0, 200);
  return ok(res, { id, reports: reportComment(id) });
});
