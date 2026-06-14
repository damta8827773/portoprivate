import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { env } from '../config/env.js';
import { logger } from './logger.js';

/**
 * Firebase Admin - used to verify client ID tokens server-side so a caller
 * cannot spoof another user's identity (name/email/photo) on the comments API.
 */
let auth: Auth | null = null;

if (env.isFirebaseAdminConfigured) {
  const app: App =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.firebasePrivateKey,
      }),
    });
  auth = getAuth(app);
  logger.info('🔐 Firebase Admin initialized - comment tokens are verified.');
} else if (env.isProd) {
  logger.warn('⚠️  Firebase Admin NOT configured in production - comment posting is disabled.');
} else {
  logger.warn('⚠️  Firebase Admin NOT configured - DEV mode decodes tokens WITHOUT verification.');
}

export const firebaseAdminAuth = auth;
