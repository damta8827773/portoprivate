import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

const GH_API = 'https://api.github.com';

function headers() {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'damta-portfolio',
  };
  if (env.GITHUB_TOKEN) h.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  return h;
}

// Lightweight in-memory cache to stay under GitHub's unauthenticated rate limit.
let cache: { data: GithubSummary; expires: number } | null = null;
const TTL_MS = 5 * 60 * 1000;

export interface GithubSummary {
  profile: {
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
  };
  totalStars: number;
  repos: Array<{
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
  }>;
  languages: Record<string, number>;
}

export async function getGithubSummary(): Promise<GithubSummary> {
  if (cache && cache.expires > Date.now()) return cache.data;

  const user = env.GITHUB_USERNAME;
  const profileRes = await fetch(`${GH_API}/users/${user}`, { headers: headers() });
  if (!profileRes.ok) {
    throw new ApiError(profileRes.status === 404 ? 404 : 502, 'Failed to fetch GitHub profile');
  }
  const profile = (await profileRes.json()) as GithubSummary['profile'];

  const reposRes = await fetch(
    `${GH_API}/users/${user}/repos?per_page=100&sort=updated`,
    { headers: headers() },
  );
  const reposRaw = reposRes.ok ? ((await reposRes.json()) as GithubSummary['repos']) : [];

  const totalStars = reposRaw.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const languages: Record<string, number> = {};
  for (const r of reposRaw) {
    if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
  }

  const data: GithubSummary = {
    profile,
    totalStars,
    repos: reposRaw.slice(0, 6),
    languages,
  };

  cache = { data, expires: Date.now() + TTL_MS };
  return data;
}
