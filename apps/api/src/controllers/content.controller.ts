import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  return ok(res, projects);
});

export const getCertificates = asyncHandler(async (_req: Request, res: Response) => {
  const certificates = await prisma.certificate.findMany({ orderBy: { order: 'asc' } });
  return ok(res, certificates);
});

export const getSkills = asyncHandler(async (_req: Request, res: Response) => {
  const skills = await prisma.skill.findMany({ orderBy: [{ row: 'asc' }, { order: 'asc' }] });
  return ok(res, skills);
});

export const getTimeline = asyncHandler(async (_req: Request, res: Response) => {
  const timeline = await prisma.timelineEntry.findMany({ orderBy: { order: 'asc' } });
  return ok(res, timeline);
});

export const getHistory = asyncHandler(async (_req: Request, res: Response) => {
  const history = await prisma.historyEntry.findMany({ orderBy: { order: 'asc' } });
  return ok(res, history);
});
