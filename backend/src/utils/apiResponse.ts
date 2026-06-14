import type { Response } from 'express';

/** Standard success envelope: { success, data, meta? }. */
export function ok<T>(res: Response, data: T, meta?: Record<string, unknown>, status = 200) {
  return res.status(status).json({ success: true, data, ...(meta ? { meta } : {}) });
}

/** Standard error envelope: { success:false, error:{ message, details? } }. */
export function fail(res: Response, status: number, message: string, details?: unknown) {
  return res.status(status).json({
    success: false,
    error: { message, ...(details ? { details } : {}) },
  });
}
