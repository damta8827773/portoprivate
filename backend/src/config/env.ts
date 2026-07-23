import 'dotenv/config';
import { z } from 'zod';

/** Validated, typed environment - fail fast on misconfiguration. */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  // Defaulted so the API still boots without a .env (DB calls just fall back).
  DATABASE_URL: z
    .string()
    .min(1)
    .default('mysql://damta:damtapass@localhost:3306/damta_portfolio'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  GITHUB_USERNAME: z.string().default('damta8827773'),
  GITHUB_TOKEN: z.string().optional(),
  // Owner identity - only this (verified) email may post replies.
  OWNER_EMAIL: z.string().email().default('damtafaiz@gmail.com'),
  // Firebase Admin service account (server-side token verification).
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  // External dashboard providers - all optional; each endpoint reports
  // `configured: false` and serves sample data when its key is missing.
  WAKATIME_API_KEY: z.string().optional(),
  CODEWARS_USERNAME: z.string().optional(),
  MONKEYTYPE_USERNAME: z.string().optional(),
  MONKEYTYPE_API_KEY: z.string().optional(),
  UMAMI_BASE_URL: z.string().default('https://api.umami.is/v1/websites'),
  UMAMI_WEBSITE_ID: z.string().optional(),
  UMAMI_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const data = parsed.data;

export const env = {
  ...data,
  isProd: data.NODE_ENV === 'production',
  corsOrigins: data.CORS_ORIGIN.split(',').map((o) => o.trim()),
  // PEM private keys are stored with literal "\n" in .env - restore real newlines.
  firebasePrivateKey: data.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  isFirebaseAdminConfigured: Boolean(
    data.FIREBASE_PROJECT_ID && data.FIREBASE_CLIENT_EMAIL && data.FIREBASE_PRIVATE_KEY,
  ),
  isWakatimeConfigured: Boolean(data.WAKATIME_API_KEY),
  isCodewarsConfigured: Boolean(data.CODEWARS_USERNAME),
  isMonkeytypeConfigured: Boolean(data.MONKEYTYPE_USERNAME && data.MONKEYTYPE_API_KEY),
  isUmamiConfigured: Boolean(data.UMAMI_WEBSITE_ID && data.UMAMI_API_KEY),
};
