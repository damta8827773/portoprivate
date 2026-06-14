import type { Request, Response } from 'express';
import { fail } from '../utils/apiResponse.js';

export function notFound(req: Request, res: Response) {
  return fail(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);
}
