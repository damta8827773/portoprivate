import { useEffect, useRef, useState } from 'react';

interface NumberTickerProps {
  value: number;
  /** Zero-pad the result to this length (e.g. 5 -> "01280"). */
  pad?: number;
  durationMs?: number;
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Animates 0 -> value with an ease-out roll (21st.dev-style number ticker). */
export function NumberTicker({ value, pad, durationMs = 1400 }: NumberTickerProps) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      setDisplay(Math.round(from + (value - from) * easeOutExpo(p)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, durationMs]);

  const text = pad ? String(display).padStart(pad, '0') : display.toLocaleString('id-ID');
  return <>{text}</>;
}
