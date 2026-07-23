/**
 * Real, self-hosted visit analytics - no third-party key required.
 *
 * Every page visit is recorded once per browser session: total count, the
 * visitor's country (geolocated client-side, validated here) and device class
 * (from the User-Agent). Persisted to a JSON file so it works without MySQL;
 * numbers therefore reflect ACTUAL visits since the feature went live - the
 * store starts empty and is never seeded with invented data.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_FILE = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../data/analytics.json',
);

interface AnalyticsStore {
  totalVisits: number;
  /** ISO-3166 alpha-2 -> visit count. */
  countries: Record<string, number>;
  /** "YYYY-MM" -> device split. */
  months: Record<string, { desktop: number; mobile: number }>;
}

const EMPTY: AnalyticsStore = { totalVisits: 0, countries: {}, months: {} };

let store: AnalyticsStore | null = null;

function load(): AnalyticsStore {
  if (store) return store;
  try {
    const raw = JSON.parse(readFileSync(DATA_FILE, 'utf8')) as AnalyticsStore;
    store = {
      totalVisits: Number(raw.totalVisits) || 0,
      countries: raw.countries ?? {},
      months: raw.months ?? {},
    };
  } catch {
    store = structuredClone(EMPTY);
  }
  return store;
}

function save() {
  if (!store) return;
  try {
    mkdirSync(dirname(DATA_FILE), { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch {
    // Read-only disk: keep counting in memory rather than crashing the API.
  }
}

const ISO_CODE = /^[A-Z]{2}$/;

/** "ID" -> the 🇮🇩 regional-indicator pair. Pure arithmetic, no lookup table. */
function flagEmoji(code: string): string {
  return [...code].map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)).join('');
}

const regionNames = new Intl.DisplayNames(['id'], { type: 'region' });

export function recordVisit(countryCode: unknown, userAgent: string): number {
  const s = load();
  s.totalVisits += 1;

  // Country comes from the client's own geo lookup - accept only a clean
  // ISO alpha-2 code; anything else is silently dropped, never guessed.
  if (typeof countryCode === 'string' && ISO_CODE.test(countryCode.toUpperCase())) {
    const code = countryCode.toUpperCase();
    s.countries[code] = (s.countries[code] ?? 0) + 1;
  }

  const monthKey = new Date().toISOString().slice(0, 7);
  const bucket = (s.months[monthKey] ??= { desktop: 0, mobile: 0 });
  if (/mobi|android|iphone|ipad/i.test(userAgent)) bucket.mobile += 1;
  else bucket.desktop += 1;

  save();
  return s.totalVisits;
}

export function getTotalVisits(): number {
  return load().totalVisits;
}

/** Same shape as the old CountryStat rows so the frontend types keep working. */
export function getCountryStats() {
  const s = load();
  const entries = Object.entries(s.countries).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, n]) => sum + n, 0);

  return entries.slice(0, 8).map(([code, count], index) => ({
    id: index + 1,
    name: regionNames.of(code) ?? code,
    flag: flagEmoji(code),
    percentage: total ? Math.round((count / total) * 100) : 0,
    order: index + 1,
  }));
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/** Current year's real device split, zero-filled - VisitorStat row shape. */
export function getMonthlyStats() {
  const s = load();
  const year = new Date().getFullYear();

  return MONTH_LABELS.map((month, monthIndex) => {
    const bucket = s.months[`${year}-${String(monthIndex + 1).padStart(2, '0')}`];
    return {
      id: monthIndex + 1,
      month,
      monthIndex,
      desktop: bucket?.desktop ?? 0,
      mobile: bucket?.mobile ?? 0,
    };
  });
}
