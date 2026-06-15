import { useEffect, useRef, useState } from 'react';

const R = 22;
const CIRC = 2 * Math.PI * R;

/** Top scroll-progress bar + circular reading-progress ring + back-to-top button. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const st = document.documentElement.scrollTop;
      const sh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = sh > 0 ? st / sh : 0;
      if (barRef.current) barRef.current.style.width = `${p * 100}%`;
      setPct(p);
      setShowTop(st > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div id="scrollProgress" ref={barRef} />

      {/* #19 circular reading-progress ring */}
      <div className={`circ-progress${showTop ? ' show' : ''}`} aria-hidden="true">
        <svg width="52" height="52" viewBox="0 0 52 52">
          <defs>
            <linearGradient id="circGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <circle className="track" cx="26" cy="26" r={R} />
          <circle
            className="bar"
            cx="26"
            cy="26"
            r={R}
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - pct)}
          />
        </svg>
      </div>

      <button
        id="btnTop"
        className={`btn-top${showTop ? ' show' : ''}`}
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="ri-arrow-up-s-line" />
      </button>
    </>
  );
}
