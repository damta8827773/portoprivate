import { useEffect, useState } from 'react';
import { api } from '../lib/api';

/**
 * Total-visitor counter backed by our own analytics endpoint. Increments once
 * per browser session; on first hit the visitor's country (looked up from
 * their own IP, client-side) is reported so the demographics card shows REAL
 * origins - never seeded numbers.
 */

/** Best-effort geo lookup; visits still count when it fails or is blocked. */
async function lookupCountry(): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = (await res.json()) as { country_code?: string };
    return typeof json.country_code === 'string' ? json.country_code : null;
  } catch {
    return null;
  }
}

export function useVisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // 1) Show the real total immediately. Previously the first visit waited on
      //    a third-party geo lookup (up to 4s, longer when blocked), which left
      //    the card spinning; the count never depended on that call.
      try {
        const data = await api.get<{ count: number }>('/visitors/count');
        if (!cancelled) setCount(data.count);
      } catch {
        // Backend offline: show nothing rather than an invented number.
        if (!cancelled) setCount(null);
      }

      // 2) Record this visit in the background, once per browser session.
      if (sessionStorage.getItem('hasVisited')) return;
      sessionStorage.setItem('hasVisited', 'true');
      try {
        const country = await lookupCountry();
        const data = await api.post<{ count: number }>('/visitors/hit', { country });
        if (!cancelled) setCount(data.count);
      } catch {
        // The visit just isn't recorded; the displayed total stays valid.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return count;
}
