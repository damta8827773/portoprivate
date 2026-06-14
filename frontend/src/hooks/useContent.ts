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

/**
 * Content is shown from bundled fallback data INSTANTLY (initialData), so the
 * site is never empty - even with no backend. If the API is reachable it
 * refetches in the background and replaces the fallback with live data.
 */
function useContentQuery<T>(key: string, path: string, fallback: T) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      try {
        return await api.get<T>(path);
      } catch {
        return fallback;
      }
    },
    initialData: fallback,
    staleTime: 0,
    retry: 0,
    refetchOnMount: 'always',
  });
}

export const useProjects = () => useContentQuery<Project[]>('projects', '/projects', fallbackProjects);
export const useCertificates = () =>
  useContentQuery<Certificate[]>('certificates', '/certificates', fallbackCertificates);
export const useSkills = () => useContentQuery<Skill[]>('skills', '/skills', fallbackSkills);
export const useTimeline = () =>
  useContentQuery<TimelineEntry[]>('timeline', '/timeline', fallbackTimeline);
export const useHistory = () => useContentQuery<HistoryEntry[]>('history', '/history', fallbackHistory);
export const useCountries = () =>
  useContentQuery<CountryStat[]>('countries', '/stats/countries', fallbackCountries);
export const useVisitorStats = () =>
  useContentQuery<VisitorStat[]>('visitor-stats', '/stats/visitors', fallbackVisitorStats);

/** GitHub: instant fallback -> backend proxy -> direct GitHub API. */
async function fetchGithubDirect(): Promise<GithubSummary> {
  const headers = { Accept: 'application/vnd.github+json' };
  const profileRes = await fetch(`https://api.github.com/users/${GH_USER}`, { headers });
  if (!profileRes.ok) throw new Error('gh profile');
  const profile = (await profileRes.json()) as GithubSummary['profile'];
  const reposRes = await fetch(
    `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`,
    { headers },
  );
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
    initialData: fallbackGithub,
    staleTime: 0,
    retry: 0,
    refetchOnMount: 'always',
  });

export const useVisitorCount = () =>
  useQuery({ queryKey: ['visitor-count'], queryFn: () => api.get<{ count: number }>('/visitors/count'), retry: 0 });
