import type { Request, Response } from 'express';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getGithubSummary } from '../services/github.service.js';

export const getGithub = asyncHandler(async (_req: Request, res: Response) => {
  const summary = await getGithubSummary();
  return ok(res, summary);
});
