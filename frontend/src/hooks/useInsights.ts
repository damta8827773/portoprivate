import { useQuery } from '@tanstack/react-query';
import type { ContributionCalendar, Post, Project } from '@damta/types';
import { api } from '../lib/api';
import { fallbackContributions } from '../lib/fallbackContributions';
import { fallbackInsights, fallbackPosts, type InsightsBundle } from '../lib/fallbackExtras';
import { fallbackProjects } from '../lib/fallbackData';

/**
 * Coding-activity providers (Wakatime / Codewars / Monkeytype / Umami) fetched
 * in one round-trip. Falls back to sample data so /dashboard is never empty.
 */
export const useInsights = () =>
  useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      try {
        return await api.get<InsightsBundle>('/insights');
      } catch {
        return fallbackInsights;
      }
    },
    initialData: fallbackInsights,
    // Same stale-from-birth trick: fetch real provider data immediately.
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

const GH_USER = import.meta.env.VITE_GITHUB_USERNAME || 'damta8827773';

/** Same public mirror the API uses, so real data still shows with no backend. */
async function fetchContributionsDirect(): Promise<ContributionCalendar> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`,
  );
  if (!res.ok) throw new Error('contributions');

  const json = (await res.json()) as {
    total?: Record<string, number>;
    contributions?: Array<{ date: string; count: number; level: number }>;
  };
  const today = new Date().toISOString().slice(0, 10);
  const days = (json.contributions ?? []).filter((d) => d.date <= today).slice(-371);
  if (days.length === 0) throw new Error('empty');

  const weeks: ContributionCalendar['weeks'] = [];
  let current: ContributionCalendar['weeks'][number]['days'] = [];
  for (const day of days) {
    if (new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0 && current.length) {
      weeks.push({ firstDay: current[0]!.date, days: current });
      current = [];
    }
    current.push({ date: day.date, count: day.count, level: day.level });
  }
  if (current.length) weeks.push({ firstDay: current[0]!.date, days: current });

  const total = json.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0);
  const best = days.reduce((b, d) => (!b || d.count > b.count ? d : b), days[0]!);

  return {
    totalContributions: total,
    weeks,
    months: [],
    bestDay: { date: best.date, count: best.count },
    averagePerDay: Number((total / days.length).toFixed(2)),
    configured: true,
  };
}

export const useContributions = () =>
  useQuery({
    queryKey: ['contributions'],
    queryFn: async () => {
      try {
        return await api.get<ContributionCalendar>('/github/contributions');
      } catch {
        try {
          return await fetchContributionsDirect();
        } catch {
          return fallbackContributions();
        }
      }
    },
    initialData: fallbackContributions,
    // The placeholder is EMPTY - mark it stale-from-birth or React Query would
    // treat it as fresh for staleTime and never fetch the real calendar.
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

export const usePosts = () =>
  useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        return await api.get<Post[]>('/posts');
      } catch {
        return fallbackPosts;
      }
    },
    initialData: fallbackPosts,
    retry: 0,
    refetchOnMount: 'always',
  });

export const usePost = (slug: string | undefined) =>
  useQuery({
    queryKey: ['post', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const local = fallbackPosts.find((p) => p.slug === slug);
      try {
        return await api.get<Post>(`/posts/${slug}`);
      } catch {
        // A slug that exists only in the API returns null -> the page 404s.
        return local ?? null;
      }
    },
    initialData: () => fallbackPosts.find((p) => p.slug === slug) ?? null,
    retry: 0,
  });

export const useProject = (slug: string | undefined) =>
  useQuery({
    queryKey: ['project', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const local = fallbackProjects.find((p) => p.slug === slug);
      try {
        return await api.get<Project>(`/projects/${slug}`);
      } catch {
        return local ?? null;
      }
    },
    initialData: () => fallbackProjects.find((p) => p.slug === slug) ?? null,
    retry: 0,
  });
