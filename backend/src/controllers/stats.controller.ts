import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCountries = asyncHandler(async (_req: Request, res: Response) => {
  const countries = await prisma.countryStat.findMany({ orderBy: { order: 'asc' } });
  return ok(res, countries);
});

export const getVisitorStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await prisma.visitorStat.findMany({ orderBy: { monthIndex: 'asc' } });
  return ok(res, stats);
});

export const getVisitorCount = asyncHandler(async (_req: Request, res: Response) => {
  const counter = await prisma.visitorCounter.upsert({
    where: { id: 1 },
    create: { id: 1, count: 0 },
    update: {},
  });
  return ok(res, { count: counter.count });
});

/** Increments the total-visitor counter once per session (client guards with sessionStorage). */
export const hitVisitor = asyncHandler(async (_req: Request, res: Response) => {
  const counter = await prisma.visitorCounter.upsert({
    where: { id: 1 },
    create: { id: 1, count: 1 },
    update: { count: { increment: 1 } },
  });
  return ok(res, { count: counter.count });
});
