import { useEffect, useRef, useState } from 'react';

/** Top scroll-progress bar + back-to-top button. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const st = document.documentElement.scrollTop;
      const sh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (barRef.current) barRef.current.style.width = `${(st / sh) * 100}%`;
      setShowTop(st > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div id="scrollProgress" ref={barRef} />
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
