import type { CodewarsStats } from '@damta/types';
import { env } from '../config/env.js';
import { createTtlCache, HOUR_MS } from '../utils/ttlCache.js';

const cache = createTtlCache<CodewarsStats>(HOUR_MS);

/** Shown when CODEWARS_USERNAME is absent so the dashboard is never empty. */
const sample: CodewarsStats = {
  username: 'damta',
  honor: 412,
  leaderboardPosition: 84210,
  rankName: '5 kyu',
  rankColor: 'yellow',
  rankScore: -5,
  totalCompleted: 96,
  languages: [
    { name: 'javascript', rankName: '5 kyu', score: 412 },
    { name: 'typescript', rankName: '6 kyu', score: 238 },
    { name: 'python', rankName: '7 kyu', score: 112 },
  ],
  configured: false,
};

export async function getCodewarsStats(): Promise<CodewarsStats> {
  const cached = cache.get();
  if (cached) return cached;
  if (!env.isCodewarsConfigured) return sample;

  try {
    const res = await fetch(
      `https://www.codewars.com/api/v1/users/${encodeURIComponent(env.CODEWARS_USERNAME!)}`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) return sample;

    const raw = (await res.json()) as Record<string, any>;
    const overall = raw.ranks?.overall ?? {};
    const byLanguage = (raw.ranks?.languages ?? {}) as Record<string, any>;

    return cache.set({
      username: raw.username ?? env.CODEWARS_USERNAME!,
      honor: Number(raw.honor ?? 0),
      leaderboardPosition: raw.leaderboardPosition ?? null,
      rankName: overall.name ?? '-',
      rankColor: overall.color ?? 'gray',
      rankScore: Number(overall.score ?? 0),
      totalCompleted: Number(raw.codeChallenges?.totalCompleted ?? 0),
      languages: Object.entries(byLanguage)
        .map(([name, r]) => ({
          name,
          rankName: r?.name ?? '-',
          score: Number(r?.score ?? 0),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 6),
      configured: true,
    });
  } catch {
    return sample;
  }
}
