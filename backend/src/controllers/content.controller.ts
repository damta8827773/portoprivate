import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

/** CSV columns are stored flat in MySQL but exposed as arrays over the API. */
function splitCsv(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function serializeProject<T extends { stacksCsv: string }>(project: T) {
  const { stacksCsv, ...rest } = project;
  return { ...rest, stacks: splitCsv(stacksCsv) };
}

export const getProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  return ok(res, projects.map(serializeProject));
});

export const getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.project.findUnique({ where: { slug: req.params.slug! } });
  if (!project) throw ApiError.notFound('Project not found');
  return ok(res, serializeProject(project));
});

export const getPosts = asyncHandler(async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });
  // The list view never needs the full bodies - keep the payload small.
  return ok(
    res,
    posts.map(({ tagsCsv, ...rest }) => ({
      ...rest,
      contentId: '',
      contentEn: '',
      tags: splitCsv(tagsCsv),
    })),
  );
});

export const getPostBySlug = asyncHandler(async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({ where: { slug: req.params.slug! } });
  if (!post || !post.published) throw ApiError.notFound('Post not found');
  const { tagsCsv, ...rest } = post;
  return ok(res, { ...rest, tags: splitCsv(tagsCsv) });
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
