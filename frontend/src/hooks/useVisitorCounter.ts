import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { fallbackVisitorCount } from '../lib/fallbackData';

/**
 * Returns the total visitor count, incrementing once per browser session
 * (sessionStorage guard) - mirrors the original Firebase visitor logic.
 */
export function useVisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const alreadyHit = sessionStorage.getItem('hasVisited');
        const data = alreadyHit
          ? await api.get<{ count: number }>('/visitors/count')
          : await api.post<{ count: number }>('/visitors/hit', {});
        if (!alreadyHit) sessionStorage.setItem('hasVisited', 'true');
        if (!cancelled) setCount(data.count);
      } catch {
        // No backend available - show a representative count so the UI isn't empty.
        if (!cancelled) setCount(fallbackVisitorCount);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return count;
}
