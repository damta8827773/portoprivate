import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import { firebaseAdminAuth } from '../lib/firebaseAdmin.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../lib/logger.js';

interface TokenClaims {
  email?: string;
  name?: string;
  picture?: string;
}

/** Decode a JWT payload WITHOUT verifying the signature (dev fallback only). */
function unsafeDecode(token: string): TokenClaims | null {
  try {
    const payload = token.split('.')[1];
    const json = Buffer.from(payload, 'base64').toString('utf8');
    return JSON.parse(json) as TokenClaims;
  } catch {
    return null;
  }
}

/**
 * Requires a Firebase ID token (Authorization: Bearer <token>) and attaches the
 * verified identity to req.user. Identity is taken from the token, never the body,
 * so callers cannot impersonate other users (e.g. claim the owner email).
 */
export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    if (!token) throw new ApiError(401, 'Authentication required');

    let claims: TokenClaims | null;
    if (firebaseAdminAuth) {
      claims = await firebaseAdminAuth.verifyIdToken(token);
    } else if (!env.isProd) {
      claims = unsafeDecode(token);
      logger.debug('Auth: dev mode — token accepted without signature verification.');
    } else {
      throw new ApiError(503, 'Authentication backend not configured');
    }

    if (!claims?.email) throw new ApiError(401, 'Invalid authentication token');

    req.user = {
      email: claims.email,
      name: claims.name || claims.email.split('@')[0],
      picture: claims.picture || '',
    };
    next();
  } catch (err) {
    if (err instanceof ApiError) return next(err);
    next(new ApiError(401, 'Invalid or expired token'));
  }
}
