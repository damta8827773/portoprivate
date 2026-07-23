import type { WakatimeStats, WakatimeSlice } from '@damta/types';
import { env } from '../config/env.js';
import { createTtlCache, HOUR_MS } from '../utils/ttlCache.js';

const BASE_URL = 'https://wakatime.com/api/v1/users/current';

const cache = createTtlCache<WakatimeStats>(HOUR_MS);

/** Wakatime authenticates with the base64 of the raw API key. */
function authHeader() {
  const encoded = Buffer.from(env.WAKATIME_API_KEY ?? '').toString('base64');
  return { Authorization: `Basic ${encoded}` };
}

interface RawSlice {
  name: string;
  percent: number;
  text: string;
}

/** Shown when WAKATIME_API_KEY is absent so the dashboard is never empty. */
const sample: WakatimeStats = {
  allTimeText: '1.284 hrs 30 mins',
  allTimeSeconds: 4624200,
  last7Days: {
    startDate: '',
    endDate: '',
    dailyAverage: '4 hrs 12 mins',
    total: '29 hrs 24 mins',
    bestDay: { date: '', text: '7 hrs 5 mins' },
    languages: [
      { name: 'TypeScript', percent: 41.2, text: '12 hrs 6 mins' },
      { name: 'PHP', percent: 22.7, text: '6 hrs 40 mins' },
      { name: 'CSS', percent: 14.1, text: '4 hrs 8 mins' },
      { name: 'JavaScript', percent: 11.3, text: '3 hrs 19 mins' },
      { name: 'JSON', percent: 6.4, text: '1 hr 52 mins' },
      { name: 'Markdown', percent: 4.3, text: '1 hr 15 mins' },
    ],
    editors: [
      { name: 'VS Code', percent: 92.5, text: '27 hrs 12 mins' },
      { name: 'Neovim', percent: 7.5, text: '2 hrs 12 mins' },
    ],
  },
  configured: false,
};

function toSlices(raw: unknown): WakatimeSlice[] {
  if (!Array.isArray(raw)) return [];
  return (raw as RawSlice[]).slice(0, 6).map((s) => ({
    name: s.name,
    percent: Number(s.percent ?? 0),
    text: s.text ?? '',
  }));
}

export async function getWakatimeStats(): Promise<WakatimeStats> {
  const cached = cache.get();
  if (cached) return cached;
  if (!env.isWakatimeConfigured) return sample;

  try {
    const [statsRes, allTimeRes] = await Promise.all([
      fetch(`${BASE_URL}/stats/last_7_days`, { headers: authHeader() }),
      fetch(`${BASE_URL}/all_time_since_today`, { headers: authHeader() }),
    ]);

    // A failed auth/rate limit should degrade to sample data, not a 500.
    if (!statsRes.ok || !allTimeRes.ok) return sample;

    const stats = (await statsRes.json()) as { data?: Record<string, any> };
    const allTime = (await allTimeRes.json()) as { data?: Record<string, any> };
    const d = stats.data ?? {};

    return cache.set({
      allTimeText: allTime.data?.text ?? '-',
      allTimeSeconds: Number(allTime.data?.total_seconds ?? 0),
      last7Days: {
        startDate: d.start ?? '',
        endDate: d.end ?? '',
        dailyAverage: d.human_readable_daily_average_including_other_language ?? '-',
        total: d.human_readable_total_including_other_language ?? '-',
        bestDay: d.best_day ? { date: d.best_day.date, text: d.best_day.text } : null,
        languages: toSlices(d.languages),
        editors: toSlices(d.editors),
      },
      configured: true,
    });
  } catch {
    return sample;
  }
}
