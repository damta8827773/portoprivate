// Shared DTOs between apps/api (responses) and apps/web (fetch results).

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiFailure {
  success: false;
  error: { message: string; details?: unknown };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface Project {
  id: number;
  slug: string;
  title: string;
  descId: string;
  descEn: string;
  image: string;
  url: string;
  featured: boolean;
  order: number;
}

export interface Certificate {
  id: number;
  slug: string;
  titleId: string;
  titleEn: string;
  org: string;
  year: string;
  image: string;
  descId: string;
  descEn: string;
  order: number;
}

export interface Skill {
  id: number;
  name: string;
  image: string;
  category: string;
  level: number;
  row: number;
  order: number;
}

export interface TimelineEntry {
  id: number;
  slug: string;
  titleId: string;
  titleEn: string;
  companyId: string;
  companyEn: string;
  dateId: string;
  dateEn: string;
  descId: string;
  descEn: string;
  icon: string;
  logo: string | null;
  order: number;
}

export interface HistoryEntry {
  id: number;
  year: string;
  descId: string;
  descEn: string;
  image: string;
  order: number;
}

export interface CountryStat {
  id: number;
  name: string;
  flag: string;
  percentage: number;
  order: number;
}

export interface VisitorStat {
  id: number;
  month: string;
  monthIndex: number;
  desktop: number;
  mobile: number;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  comment: string;
  rating: number;
  parentId: number | null;
  createdAt: string;
  replies?: Comment[];
}

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

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
  repos: GithubRepo[];
  languages: Record<string, number>;
}
