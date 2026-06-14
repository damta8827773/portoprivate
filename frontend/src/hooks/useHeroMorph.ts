import { useEffect, type RefObject } from 'react';

const ROLES = [
  'Full Stack Developer',
  'Frontend Specialist',
  'Backend Engineer',
  'UI/UX Enthusiast',
  'React & Next.js Dev',
  'BKI Software Engineer',
];

/** Gooey blur text-morph cycling through roles (ports initGooeyMorph). */
export function useHeroMorph(t1Ref: RefObject<HTMLElement>, t2Ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const t1 = t1Ref.current;
    const t2 = t2Ref.current;
    if (!t1 || !t2) return;

    const MORPH_S = 1.2;
    const COOLDOWN_S = 2.8;
    let idx = 0;
    let morphing = false;
    let morphP = 0;
    let cooldown = COOLDOWN_S;
    let lastTs: number | null = null;
    let raf = 0;
    let startTimer = 0;

    const reset = () => {
      t1.textContent = ROLES[idx];
      t2.textContent = ROLES[(idx + 1) % ROLES.length];
      t1.style.filter = '';
      t1.style.opacity = '1';
      t2.style.filter = 'blur(100px)';
      t2.style.opacity = '0';
    };
    const apply = (f: number) => {
      const b2 = Math.min(8 / (f + 0.001) - 8, 100);
      const b1 = Math.min(8 / (1 - f + 0.001) - 8, 100);
      t2.style.filter = `blur(${b2.toFixed(1)}px)`;
      t2.style.opacity = Math.pow(f, 0.4).toFixed(4);
      t1.style.filter = `blur(${b1.toFixed(1)}px)`;
      t1.style.opacity = Math.pow(1 - f, 0.4).toFixed(4);
    };
    reset();

    const frame = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.1);
      lastTs = ts;
      if (!morphing) {
        cooldown -= dt;
        if (cooldown <= 0) {
          morphing = true;
          morphP = 0;
        }
      } else {
        morphP += dt / MORPH_S;
        if (morphP >= 1) {
          idx = (idx + 1) % ROLES.length;
          morphing = false;
          cooldown = COOLDOWN_S;
          reset();
        } else {
          apply(morphP);
        }
      }
      raf = requestAnimationFrame(frame);
    };

    startTimer = window.setTimeout(() => {
      raf = requestAnimationFrame(frame);
    }, 1400);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
    };
  }, [t1Ref, t2Ref]);
}
