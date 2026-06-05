import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ApiError } from '../utils/ApiError.js';
import { fail } from '../utils/apiResponse.js';
import { logger } from '../lib/logger.js';

/** Centralized error handler — last middleware in the chain. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return fail(res, err.statusCode, err.message, err.details);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') return fail(res, 404, 'Resource not found');
    if (err.code === 'P2002') return fail(res, 409, 'Duplicate entry');
    logger.error({ code: err.code }, 'Prisma error');
    return fail(res, 400, 'Database request error');
  }

  logger.error({ err }, 'Unhandled error');
  return fail(res, 500, 'Internal server error');
}
