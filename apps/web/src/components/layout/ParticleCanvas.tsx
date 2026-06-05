import { useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';

/** Interactive particle-network background canvas (mouse repel + linking lines). */
export function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const theme = useAppStore((s) => s.theme);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0,
      H = 0,
      raf = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const mouse = { x: -999, y: -999 };
    const COUNT = Math.min(55, Math.floor(window.innerWidth / 22));
    const DIST = 130;
    const REPEL = 90;
    const SPEED = 0.35;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const spawn = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.2 + 0.5,
      }));
    };

    const draw = () => {
      const light = themeRef.current === 'light';
      const base = light ? 'rgba(37,99,235,' : 'rgba(96,165,250,';
      const dotAlpha = light ? 0.35 : 0.5;
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL && d > 0) {
          const f = (REPEL - d) / REPEL;
          p.x += (dx / d) * f * 1.5;
          p.y += (dy / d) * f * 1.5;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${base}${dotAlpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            const a = (1 - d / DIST) * (light ? 0.2 : 0.28);
            ctx.beginPath();
            ctx.strokeStyle = `${base}${a})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onResize = () => {
      resize();
      spawn();
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);
    resize();
    spawn();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas id="particleCanvas" aria-hidden="true" ref={ref} />;
}
