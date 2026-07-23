/**
 * Tiny in-memory TTL cache used by the external-provider services
 * (Wakatime / Codewars / Monkeytype / Umami) to stay well inside their
 * rate limits. Single-process only - good enough for one API instance.
 */
export function createTtlCache<T>(ttlMs: number) {
  let entry: { data: T; expires: number } | null = null;

  return {
    get(): T | null {
      if (entry && entry.expires > Date.now()) return entry.data;
      return null;
    },
    set(data: T): T {
      entry = { data, expires: Date.now() + ttlMs };
      return data;
    },
  };
}

/** One hour - the providers' data barely moves faster than that. */
export const HOUR_MS = 60 * 60 * 1000;
