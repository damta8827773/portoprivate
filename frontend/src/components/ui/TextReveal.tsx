import { useEffect, useRef, useState } from 'react';

/** #13 Reveals text word-by-word (blur -> sharp) when scrolled into view. */
export function TextReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: shown ? 1 : 0.12,
            filter: shown ? 'blur(0)' : 'blur(4px)',
            transition: `opacity 0.5s ease ${i * 0.025}s, filter 0.5s ease ${i * 0.025}s`,
          }}
        >
          {w}&nbsp;
        </span>
      ))}
    </p>
  );
}
