import { useEffect, useRef } from 'react';

const CLICK_SEL =
  'a, button, [onclick], label, .btn-view, .cta-primary, .cta-secondary, .control-btn, .social-icon-btn, .hamburger, .profil-social-item, .tech-item, .project-card, .cert-card, .timeline-card, .cmdK-hint, .cmd-item, .about-us-header';
const TEXT_SEL = 'p, h1, h2, h3, h4, h5, span, li, textarea';

/** Minimal professional custom cursor (dot + lagging ring). Desktop only. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(CLICK_SEL)) {
        dot.classList.add('hov');
        ring.classList.add('hov');
        dot.classList.remove('txt');
        ring.classList.remove('txt');
      } else if (target.matches(TEXT_SEL)) {
        dot.classList.add('txt');
        ring.classList.add('txt');
        dot.classList.remove('hov');
        ring.classList.remove('hov');
      }
    };
    const onOut = () => {
      dot.classList.remove('hov', 'txt');
      ring.classList.remove('hov', 'txt');
    };
    const down = () => {
      dot.classList.add('clk');
      ring.classList.add('clk');
    };
    const up = () => {
      dot.classList.remove('clk');
      ring.classList.remove('clk');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <>
      <div className="c-dot" ref={dotRef} />
      <div className="c-ring" ref={ringRef} />
    </>
  );
}
