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
  /** Long-form markdown body rendered on /projects/:slug. */
  contentId?: string | null;
  contentEn?: string | null;
  /** Tech stack badges, stored as a JSON string array in MySQL. */
  stacks?: string[];
  repoUrl?: string | null;
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
  /** Groups achievements in the /achievements filter (e.g. "Course", "Award"). */
  category?: string;
  /** Link to the credential / verification page. */
  credentialUrl?: string | null;
}

/** Blog article rendered from markdown on /blog and /blog/:slug. */
export interface Post {
  id: number;
  slug: string;
  titleId: string;
  titleEn: string;
  excerptId: string;
  excerptEn: string;
  contentId: string;
  contentEn: string;
  cover: string;
  tags: string[];
  published: boolean;
  publishedAt: string;
  readingMinutes: number;
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

export interface ContributionDay {
  date: string;
  count: number;
  /** 0-4 intensity level, mapped to the calendar's colour scale. */
  level: number;
}

export interface ContributionWeek {
  firstDay: string;
  days: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
  months: Array<{ name: string; firstDay: string; totalWeeks: number }>;
  /** Best single day and current streak, shown as overview tiles. */
  bestDay: { date: string; count: number } | null;
  averagePerDay: number;
  /** False when no GitHub token is set - the calendar shows sample data. */
  configured: boolean;
}

/** A named slice with a percentage - shared by Wakatime languages/editors. */
export interface WakatimeSlice {
  name: string;
  percent: number;
  text: string;
}

export interface WakatimeStats {
  /** Cumulative coding time since the account was created. */
  allTimeText: string;
  allTimeSeconds: number;
  last7Days: {
    startDate: string;
    endDate: string;
    dailyAverage: string;
    total: string;
    bestDay: { date: string; text: string } | null;
    languages: WakatimeSlice[];
    editors: WakatimeSlice[];
  };
  /** False when no API key is configured - the UI shows sample data instead. */
  configured: boolean;
}

export interface CodewarsStats {
  username: string;
  honor: number;
  leaderboardPosition: number | null;
  rankName: string;
  rankColor: string;
  rankScore: number;
  totalCompleted: number;
  languages: Array<{ name: string; rankName: string; score: number }>;
  configured: boolean;
}

export interface MonkeytypeStats {
  username: string;
  /** Personal-best words-per-minute keyed by test duration ("15" | "30" | "60" | "120"). */
  bestWpm: Record<string, { wpm: number; accuracy: number; consistency: number }>;
  testsCompleted: number;
  testsStarted: number;
  timeTyping: number;
  configured: boolean;
}

export interface UmamiPoint {
  x: string;
  y: number;
}

export interface UmamiStats {
  pageviews: UmamiPoint[];
  sessions: UmamiPoint[];
  totals: {
    pageviews: number;
    visitors: number;
    visits: number;
    countries: number;
  };
  configured: boolean;
}
