import type {
  ContributionCalendar,
  ContributionDay,
  ContributionWeek,
} from '@damta/types';
import { env } from '../config/env.js';
import { createTtlCache, HOUR_MS } from '../utils/ttlCache.js';

const cache = createTtlCache<ContributionCalendar>(HOUR_MS);

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** GitHub only exposes the contribution graph through GraphQL, not REST. */
const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays { date contributionCount }
          }
          months { name firstDay totalWeeks }
        }
      }
    }
  }
`;

/** Buckets a raw count into the 0-4 scale the calendar colours by. */
function levelFor(count: number, max: number): number {
  if (count <= 0) return 0;
  const ratio = count / Math.max(max, 1);
  if (ratio > 0.66) return 4;
  if (ratio > 0.33) return 3;
  if (ratio > 0.12) return 2;
  return 1;
}

/** Groups a flat day list into calendar weeks starting on Sunday. */
function toWeeks(days: ContributionDay[]): {
  weeks: ContributionWeek[];
  months: ContributionCalendar['months'];
} {
  const weeks: ContributionWeek[] = [];
  const months: ContributionCalendar['months'] = [];
  let current: ContributionDay[] = [];
  let seenMonth = '';

  for (const day of days) {
    const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    if (weekday === 0 && current.length) {
      weeks.push({ firstDay: current[0]!.date, days: current });
      current = [];
    }
    current.push(day);

    const monthKey = day.date.slice(0, 7);
    if (monthKey !== seenMonth) {
      seenMonth = monthKey;
      months.push({
        name: MONTH_NAMES[Number(monthKey.slice(5, 7)) - 1]!,
        firstDay: day.date,
        totalWeeks: 4,
      });
    }
  }
  if (current.length) weeks.push({ firstDay: current[0]!.date, days: current });

  return { weeks, months };
}

function summarise(
  weeks: ContributionWeek[],
  months: ContributionCalendar['months'],
  totalContributions: number,
  configured: boolean,
): ContributionCalendar {
  const days = weeks.flatMap((w) => w.days);
  const bestDay = days.reduce<ContributionDay | null>(
    (best, day) => (!best || day.count > best.count ? day : best),
    null,
  );

  return {
    totalContributions,
    weeks,
    months,
    bestDay: bestDay ? { date: bestDay.date, count: bestDay.count } : null,
    averagePerDay: days.length ? Number((totalContributions / days.length).toFixed(2)) : 0,
    configured,
  };
}

/** Empty (not fabricated) calendar - used only when every source fails. */
function emptyCalendar(): ContributionCalendar {
  return {
    totalContributions: 0,
    weeks: [],
    months: [],
    bestDay: null,
    averagePerDay: 0,
    configured: false,
  };
}

/**
 * Real contribution data without a token. GitHub's own GraphQL endpoint needs
 * auth, so fall back to this public mirror of the same profile graph rather
 * than inventing numbers.
 */
async function fromPublicMirror(): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(env.GITHUB_USERNAME)}?y=last`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: Array<{ date: string; count: number; level: number }>;
    };
    const raw = json.contributions ?? [];
    if (raw.length === 0) return null;

    // Trim to the trailing 53 weeks so the grid matches GitHub's own window.
    const today = new Date().toISOString().slice(0, 10);
    const windowed = raw.filter((d) => d.date <= today).slice(-371);

    const days: ContributionDay[] = windowed.map((d) => ({
      date: d.date,
      count: d.count,
      level: d.level,
    }));

    const { weeks, months } = toWeeks(days);
    const total =
      json.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);

    return summarise(weeks, months, total, true);
  } catch {
    return null;
  }
}

/** Authenticated path: richer and rate-limit friendly, used when a token exists. */
async function fromGraphQL(): Promise<ContributionCalendar | null> {
  if (!env.GITHUB_TOKEN) return null;
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'damta-portfolio',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: env.GITHUB_USERNAME } }),
    });
    if (!res.ok) return null;

    const json = (await res.json()) as { data?: Record<string, any> };
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const rawWeeks = (calendar.weeks ?? []) as Array<Record<string, any>>;
    const max = Math.max(
      ...rawWeeks.flatMap((w) =>
        (w.contributionDays ?? []).map((d: any) => Number(d.contributionCount ?? 0)),
      ),
      1,
    );

    const weeks: ContributionWeek[] = rawWeeks.map((w) => ({
      firstDay: w.firstDay,
      days: (w.contributionDays ?? []).map((d: any) => {
        const count = Number(d.contributionCount ?? 0);
        return { date: d.date, count, level: levelFor(count, max) };
      }),
    }));

    return summarise(
      weeks,
      (calendar.months ?? []) as ContributionCalendar['months'],
      Number(calendar.totalContributions ?? 0),
      true,
    );
  } catch {
    return null;
  }
}

export async function getContributions(): Promise<ContributionCalendar> {
  const cached = cache.get();
  if (cached) return cached;

  // Real data only: token first, public mirror second, empty state last.
  const data = (await fromGraphQL()) ?? (await fromPublicMirror());
  if (!data) return emptyCalendar();

  return cache.set(data);
}
