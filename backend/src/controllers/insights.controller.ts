import type { Request, Response } from 'express';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getWakatimeStats } from '../services/wakatime.service.js';
import { getCodewarsStats } from '../services/codewars.service.js';
import { getMonkeytypeStats } from '../services/monkeytype.service.js';
import { getUmamiStats } from '../services/umami.service.js';
import { getContributions } from '../services/contributions.service.js';

export const getGithubContributions = asyncHandler(async (_req: Request, res: Response) =>
  ok(res, await getContributions()),
);

export const getWakatime = asyncHandler(async (_req: Request, res: Response) =>
  ok(res, await getWakatimeStats()),
);

export const getCodewars = asyncHandler(async (_req: Request, res: Response) =>
  ok(res, await getCodewarsStats()),
);

export const getMonkeytype = asyncHandler(async (_req: Request, res: Response) =>
  ok(res, await getMonkeytypeStats()),
);

export const getUmami = asyncHandler(async (_req: Request, res: Response) =>
  ok(res, await getUmamiStats()),
);

/** Single round-trip for the dashboard - avoids four waterfall requests. */
export const getInsights = asyncHandler(async (_req: Request, res: Response) => {
  const [wakatime, codewars, monkeytype, umami] = await Promise.all([
    getWakatimeStats(),
    getCodewarsStats(),
    getMonkeytypeStats(),
    getUmamiStats(),
  ]);
  return ok(res, { wakatime, codewars, monkeytype, umami });
});
