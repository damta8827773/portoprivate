import { useEffect, useState } from 'react';
import { api } from '../lib/api';

/**
 * Returns the total visitor count, incrementing once per browser session
 * (sessionStorage guard) — mirrors the original Firebase visitor logic.
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
        if (!cancelled) setCount(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return count;
}
