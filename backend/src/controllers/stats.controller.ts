import type { Request, Response } from 'express';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  recordVisit,
  getTotalVisits,
  getCountryStats,
  getMonthlyStats,
} from '../services/analytics.service.js';

/**
 * All visitor statistics come from the self-hosted analytics store (real,
 * accumulated visits) - the seeded Prisma tables are no longer consulted so
 * fabricated demo numbers can never leak into the dashboard.
 */

export const getCountries = asyncHandler(async (_req: Request, res: Response) =>
  ok(res, getCountryStats()),
);

export const getVisitorStats = asyncHandler(async (_req: Request, res: Response) =>
  ok(res, getMonthlyStats()),
);

export const getVisitorCount = asyncHandler(async (_req: Request, res: Response) =>
  ok(res, { count: getTotalVisits() }),
);

/** Records one real visit (client guards per-session via sessionStorage). */
export const hitVisitor = asyncHandler(async (req: Request, res: Response) => {
  const { country } = (req.body ?? {}) as { country?: unknown };
  const count = recordVisit(country, req.headers['user-agent'] ?? '');
  return ok(res, { count });
});
