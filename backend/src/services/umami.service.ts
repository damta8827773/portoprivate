import type { UmamiStats, UmamiPoint } from '@damta/types';
import { env } from '../config/env.js';
import { createTtlCache, HOUR_MS } from '../utils/ttlCache.js';

const cache = createTtlCache<UmamiStats>(HOUR_MS);

const DAY_MS = 24 * 60 * 60 * 1000;

/** Shown when Umami credentials are absent so the dashboard is never empty. */
function buildSample(): UmamiStats {
  const now = Date.now();
  const pageviews: UmamiPoint[] = [];
  const sessions: UmamiPoint[] = [];
  for (let i = 29; i >= 0; i -= 1) {
    const day = new Date(now - i * DAY_MS).toISOString().slice(0, 10);
    // Deterministic wave so the sample chart looks plausible, not random noise.
    const base = 40 + Math.round(Math.sin(i / 3) * 12);
    pageviews.push({ x: day, y: base + 18 });
    sessions.push({ x: day, y: base });
  }
  return {
    pageviews,
    sessions,
    totals: { pageviews: 1742, visitors: 946, visits: 1183, countries: 12 },
    configured: false,
  };
}

function toPoints(raw: unknown): UmamiPoint[] {
  if (!Array.isArray(raw)) return [];
  return (raw as Array<Record<string, any>>).map((p) => ({
    x: String(p.x ?? ''),
    y: Number(p.y ?? 0),
  }));
}

export async function getUmamiStats(): Promise<UmamiStats> {
  const cached = cache.get();
  if (cached) return cached;
  if (!env.isUmamiConfigured) return buildSample();

  const endAt = Date.now();
  const startAt = endAt - 30 * DAY_MS;
  const headers = { Accept: 'application/json', 'x-umami-api-key': env.UMAMI_API_KEY! };
  const site = `${env.UMAMI_BASE_URL}/${env.UMAMI_WEBSITE_ID}`;
  const range = `startAt=${startAt}&endAt=${endAt}`;

  try {
    const [seriesRes, statsRes] = await Promise.all([
      fetch(`${site}/pageviews?${range}&unit=day&timezone=Asia/Jakarta`, { headers }),
      fetch(`${site}/stats?${range}`, { headers }),
    ]);
    if (!seriesRes.ok || !statsRes.ok) return buildSample();

    const series = (await seriesRes.json()) as Record<string, any>;
    const stats = (await statsRes.json()) as Record<string, any>;

    return cache.set({
      pageviews: toPoints(series.pageviews),
      sessions: toPoints(series.sessions),
      totals: {
        pageviews: Number(stats.pageviews?.value ?? 0),
        visitors: Number(stats.visitors?.value ?? 0),
        visits: Number(stats.visits?.value ?? 0),
        countries: Number(stats.countries?.value ?? 0),
      },
      configured: true,
    });
  } catch {
    return buildSample();
  }
}
