import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.js';

/** Singleton Prisma client (avoids exhausting connections during dev HMR). */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.isProd ? ['error'] : ['warn', 'error'],
  });

if (!env.isProd) globalForPrisma.prisma = prisma;
