import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';
import { apiRouter } from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/error.js';

export function createApp() {
  const app = express();

  // Behind a reverse proxy (Vercel/Nginx/Cloudflare) the client IP arrives in
  // X-Forwarded-For; without this every request looks like the proxy's IP and
  // one visitor could exhaust the rate limit for everyone.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      // The API only ever returns JSON, so lock its own responses down hard.
      contentSecurityPolicy: {
        directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] },
      },
      referrerPolicy: { policy: 'no-referrer' },
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    }),
  );

  app.use(
    cors({
      origin: env.corsOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      maxAge: 86400,
    }),
  );
  app.use(express.json({ limit: '256kb' }));
  app.use(pinoHttp({ logger }));

  // Floor under every endpoint so reads can't be hammered. A single page load
  // fetches ~11 endpoints, so 300/min started returning 429 to real visitors
  // browsing quickly; 600 still stops abuse with room for normal use.
  app.use(
    '/api',
    rateLimit({
      windowMs: 60 * 1000,
      limit: 600,
      standardHeaders: true,
      legacyHeaders: false,
      skip: (req) => req.path === '/health',
    }),
  );

  // Tighter cap on anything that writes.
  const writeLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(['/api/comments', '/api/contact', '/api/visitors/hit'], writeLimiter);

  app.use('/api', apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
