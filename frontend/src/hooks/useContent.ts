import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type {
  Project,
  Certificate,
  Skill,
  TimelineEntry,
  HistoryEntry,
  CountryStat,
  VisitorStat,
  GithubSummary,
} from '@damta/types';
import {
  fallbackProjects,
  fallbackCertificates,
  fallbackSkills,
  fallbackTimeline,
  fallbackHistory,
  fallbackCountries,
  fallbackVisitorStats,
  fallbackGithub,
} from '../lib/fallbackData';

const GH_USER = import.meta.env.VITE_GITHUB_USERNAME || 'damta8827773';

/** Try the API; if it (or the backend) is unavailable, use bundled fallback data. */
async function withFallback<T>(path: string, fallback: T): Promise<T> {
  try {
    return await api.get<T>(path);
  } catch {
    return fallback;
  }
}

const opts = { staleTime: 5 * 60 * 1000, retry: 0 as const };

export const useProjects = () =>
  useQuery({ queryKey: ['projects'], queryFn: () => withFallback<Project[]>('/projects', fallbackProjects), ...opts });

export const useCertificates = () =>
  useQuery({ queryKey: ['certificates'], queryFn: () => withFallback<Certificate[]>('/certificates', fallbackCertificates), ...opts });

export const useSkills = () =>
  useQuery({ queryKey: ['skills'], queryFn: () => withFallback<Skill[]>('/skills', fallbackSkills), ...opts });

export const useTimeline = () =>
  useQuery({ queryKey: ['timeline'], queryFn: () => withFallback<TimelineEntry[]>('/timeline', fallbackTimeline), ...opts });

export const useHistory = () =>
  useQuery({ queryKey: ['history'], queryFn: () => withFallback<HistoryEntry[]>('/history', fallbackHistory), ...opts });

export const useCountries = () =>
  useQuery({ queryKey: ['countries'], queryFn: () => withFallback<CountryStat[]>('/stats/countries', fallbackCountries), ...opts });

export const useVisitorStats = () =>
  useQuery({ queryKey: ['visitor-stats'], queryFn: () => withFallback<VisitorStat[]>('/stats/visitors', fallbackVisitorStats), ...opts });

/** GitHub: backend proxy -> direct GitHub API -> static fallback. */
async function fetchGithubDirect(): Promise<GithubSummary> {
  const headers = { Accept: 'application/vnd.github+json' };
  const profileRes = await fetch(`https://api.github.com/users/${GH_USER}`, { headers });
  if (!profileRes.ok) throw new Error('gh profile');
  const profile = (await profileRes.json()) as GithubSummary['profile'];
  const reposRes = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`, { headers });
  const reposRaw = reposRes.ok ? ((await reposRes.json()) as GithubSummary['repos']) : [];
  const totalStars = reposRaw.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const languages: Record<string, number> = {};
  for (const r of reposRaw) if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
  return { profile, totalStars, repos: reposRaw.slice(0, 6), languages };
}

export const useGithub = () =>
  useQuery({
    queryKey: ['github'],
    queryFn: async () => {
      try {
        return await api.get<GithubSummary>('/github');
      } catch {
        try {
          return await fetchGithubDirect();
        } catch {
          return fallbackGithub;
        }
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 0,
  });

export const useVisitorCount = () =>
  useQuery({ queryKey: ['visitor-count'], queryFn: () => api.get<{ count: number }>('/visitors/count'), retry: 0 });
