import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  getPosts,
  getPostBySlug,
  getCertificates,
  getSkills,
  getTimeline,
  getHistory,
} from '../controllers/content.controller.js';
import {
  getWakatime,
  getCodewars,
  getMonkeytype,
  getUmami,
  getInsights,
  getGithubContributions,
} from '../controllers/insights.controller.js';
import {
  getCountries,
  getVisitorStats,
  getVisitorCount,
  hitVisitor,
} from '../controllers/stats.controller.js';
import { listComments, createComment } from '../controllers/comments.controller.js';
import { createContact } from '../controllers/contact.controller.js';
import { getGithub } from '../controllers/github.controller.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { createCommentSchema, createContactSchema } from '../schemas/index.js';

export const apiRouter = Router();

// Health
apiRouter.get('/health', (_req, res) => res.json({ success: true, data: { status: 'ok' } }));

// Content (was hard-coded in the HTML)
apiRouter.get('/projects', getProjects);
apiRouter.get('/projects/:slug', getProjectBySlug);
apiRouter.get('/posts', getPosts);
apiRouter.get('/posts/:slug', getPostBySlug);
apiRouter.get('/certificates', getCertificates);
apiRouter.get('/skills', getSkills);
apiRouter.get('/timeline', getTimeline);
apiRouter.get('/history', getHistory);

// Stats / dashboard
apiRouter.get('/stats/countries', getCountries);
apiRouter.get('/stats/visitors', getVisitorStats);
apiRouter.get('/visitors/count', getVisitorCount);
apiRouter.post('/visitors/hit', hitVisitor);
apiRouter.get('/github', getGithub);
apiRouter.get('/github/contributions', getGithubContributions);

// External coding-activity providers (each degrades to sample data if unset)
apiRouter.get('/insights', getInsights);
apiRouter.get('/insights/wakatime', getWakatime);
apiRouter.get('/insights/codewars', getCodewars);
apiRouter.get('/insights/monkeytype', getMonkeytype);
apiRouter.get('/insights/umami', getUmami);

// Comments (chat room) - replaces Firestore
apiRouter.get('/comments', listComments);
apiRouter.post('/comments', requireAuth, validate(createCommentSchema), createComment);

// Contact
apiRouter.post('/contact', validate(createContactSchema), createContact);
