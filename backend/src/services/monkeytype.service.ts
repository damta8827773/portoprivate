import type { MonkeytypeStats } from '@damta/types';
import { env } from '../config/env.js';
import { createTtlCache, HOUR_MS } from '../utils/ttlCache.js';

const cache = createTtlCache<MonkeytypeStats>(HOUR_MS);

/** Shown when the Monkeytype ApeKey is absent so the dashboard is never empty. */
const sample: MonkeytypeStats = {
  username: 'damta',
  bestWpm: {
    '15': { wpm: 94, accuracy: 96.4, consistency: 78.2 },
    '30': { wpm: 88, accuracy: 95.1, consistency: 80.5 },
    '60': { wpm: 85, accuracy: 96.8, consistency: 82.1 },
    '120': { wpm: 81, accuracy: 95.7, consistency: 79.4 },
  },
  testsCompleted: 1240,
  testsStarted: 1608,
  timeTyping: 152400,
  configured: false,
};

/** Monkeytype returns an array of PBs per duration; we keep the fastest. */
function bestOf(entries: unknown): { wpm: number; accuracy: number; consistency: number } | null {
  if (!Array.isArray(entries) || entries.length === 0) return null;
  const best = (entries as Array<Record<string, any>>).reduce((a, b) =>
    Number(b.wpm ?? 0) > Number(a.wpm ?? 0) ? b : a,
  );
  return {
    wpm: Math.round(Number(best.wpm ?? 0)),
    accuracy: Number(best.acc ?? 0),
    consistency: Number(best.consistency ?? 0),
  };
}

export async function getMonkeytypeStats(): Promise<MonkeytypeStats> {
  const cached = cache.get();
  if (cached) return cached;
  if (!env.isMonkeytypeConfigured) return sample;

  try {
    const res = await fetch(
      `https://api.monkeytype.com/users/${encodeURIComponent(env.MONKEYTYPE_USERNAME!)}/profile`,
      { headers: { Authorization: `ApeKey ${env.MONKEYTYPE_API_KEY}` } },
    );
    if (!res.ok) return sample;

    const json = (await res.json()) as { data?: Record<string, any> };
    const d = json.data ?? {};
    const timePbs = (d.personalBests?.time ?? {}) as Record<string, unknown>;

    const bestWpm: MonkeytypeStats['bestWpm'] = {};
    for (const duration of ['15', '30', '60', '120']) {
      const best = bestOf(timePbs[duration]);
      if (best) bestWpm[duration] = best;
    }

    return cache.set({
      username: d.name ?? env.MONKEYTYPE_USERNAME!,
      bestWpm,
      testsCompleted: Number(d.typingStats?.completedTests ?? 0),
      testsStarted: Number(d.typingStats?.startedTests ?? 0),
      timeTyping: Number(d.typingStats?.timeTyping ?? 0),
      configured: true,
    });
  } catch {
    return sample;
  }
}
