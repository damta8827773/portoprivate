import { useEffect, useRef } from 'react';

const FLOATERS = [
  ['7%', '12%', '1.1rem', '0s', '0.13', '</>'],
  ['87%', '19%', '0.85rem', '1.3s', '0.1', '{ }'],
  ['14%', '76%', '1.2rem', '0.5s', '0.11', '[ ]'],
  ['76%', '63%', '0.8rem', '2.1s', '0.09', 'npm'],
  ['44%', '85%', '0.9rem', '0.8s', '0.1', 'git'],
  ['91%', '47%', '1.1rem', '1.6s', '0.12', '( )'],
  ['4%', '41%', '0.8rem', '2.6s', '0.08', 'API'],
  ['58%', '8%', '0.95rem', '0.3s', '0.1', '=>'],
  ['24%', '28%', '0.75rem', '1.9s', '0.09', '&&'],
  ['68%', '79%', '1rem', '1.1s', '0.11', 'fn()'],
  ['33%', '51%', '0.85rem', '0.6s', '0.07', 'CSS'],
  ['81%', '32%', '0.7rem', '2.3s', '0.07', 'JSX'],
  ['50%', '17%', '0.9rem', '1.4s', '0.09', 'SQL'],
  ['17%', '57%', '0.75rem', '0.9s', '0.1', 'dev'],
] as const;

const STEPS = [
  { msg: 'Initializing portfolio modules...', pct: 28, t: 500 },
  { msg: 'Connecting to GitHub API...', pct: 55, t: 1500 },
  { msg: 'Loading projects & certificates...', pct: 80, t: 2600 },
  { msg: 'All systems ready. Welcome!', pct: 100, t: 3700 },
];

// UI FIX #1 - professional gold & brown loading palette (was blue/purple/green/pink).
const DOT_COLORS = [
  [212, 175, 55], // #D4AF37 gold
  [201, 146, 42], // #C9922A copper
  [184, 115, 51], // #B87333 bronze
  [180, 134, 11], // #B4860B dark gold
];

export function WelcomeScreen({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const termRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // - Dot-matrix canvas reveal -
    const cv = canvasRef.current;
    let raf = 0;
    let dead = false;
    if (cv) {
      const ctx = cv.getContext('2d')!;
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      const CELL = 22;
      const DOT_R = 1.5;
      const OPACITIES = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1.0];
      const cxC = cv.width / 2,
        cyC = cv.height / 2;
      const maxD = Math.hypot(cxC, cyC);
      const ox = (cv.width % CELL) / 2;
      const oy = (cv.height % CELL) / 2;
      const dots: { x: number; y: number; threshold: number; opi: number; ci: number; nextFlick: number }[] = [];
      for (let x = ox; x < cv.width; x += CELL) {
        for (let y = oy; y < cv.height; y += CELL) {
          const rnd = Math.random();
          dots.push({
            x,
            y,
            threshold: (Math.hypot(x - cxC, y - cyC) / maxD) * 0.78 + rnd * 0.14,
            opi: Math.floor(rnd * OPACITIES.length),
            ci: Math.floor(rnd * DOT_COLORS.length),
            nextFlick: rnd * 0.6,
          });
        }
      }
      const T0 = performance.now();
      const REVEAL_MS = 2800;
      const draw = () => {
        if (dead) return;
        const prog = (performance.now() - T0) / REVEAL_MS;
        ctx.clearRect(0, 0, cv.width, cv.height);
        dots.forEach((d) => {
          if (prog < d.threshold) return;
          if (prog > d.nextFlick) {
            d.opi = Math.floor(Math.random() * OPACITIES.length);
            d.nextFlick = prog + 0.12 + Math.random() * 0.38;
          }
          const fadeIn = Math.min((prog - d.threshold) / 0.1, 1);
          const [r, g, b] = DOT_COLORS[d.ci];
          ctx.globalAlpha = OPACITIES[d.opi] * fadeIn;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, DOT_R, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(draw);
      };
      draw();
      setTimeout(() => {
        dead = true;
        cancelAnimationFrame(raf);
      }, 5600);
    }

    // - Terminal typewriter + progress -
    let curPct = 0;
    const timers: number[] = [];
    const typeText = (txt: string) => {
      const el = termRef.current;
      if (!el) return;
      el.textContent = '';
      let i = 0;
      const iv = window.setInterval(() => {
        el.textContent += txt[i++];
        if (i >= txt.length) clearInterval(iv);
      }, 28);
      timers.push(iv);
    };
    const animPct = (target: number) => {
      const from = curPct;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 900, 1);
        const v = Math.round(from + (target - from) * p);
        if (pctRef.current) pctRef.current.textContent = `${v}%`;
        if (fillRef.current) fillRef.current.style.width = `${v}%`;
        if (p < 1) requestAnimationFrame(tick);
        else curPct = target;
      };
      requestAnimationFrame(tick);
    };
    STEPS.forEach((step) => {
      const id = window.setTimeout(() => {
        typeText(step.msg);
        animPct(step.pct);
      }, step.t);
      timers.push(id);
    });

    // - Fade out + reveal main content -
    const fadeId = window.setTimeout(() => {
      if (rootRef.current) {
        rootRef.current.style.transition = 'opacity 1s ease';
        rootRef.current.style.opacity = '0';
      }
      window.setTimeout(onDone, 1000);
    }, 4800);
    timers.push(fadeId);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [onDone]);

  return (
    <div id="welcome-screen" className="welcome-screen" ref={rootRef}>
      <div className="ws-aurora" aria-hidden="true" />
      <canvas id="welcomeCanvas" className="ws-canvas" ref={canvasRef} />
      <div className="ws-grid-overlay" />
      <div className="ws-scanlines" />

      <div className="ws-floaters" aria-hidden="true">
        {FLOATERS.map(([x, y, s, d, o, txt], i) => (
          <span
            key={i}
            className="wsf"
            style={{ ['--x' as string]: x, ['--y' as string]: y, ['--s' as string]: s, ['--d' as string]: d, ['--o' as string]: o }}
          >
            {txt}
          </span>
        ))}
      </div>

      <div className="ws-content">
        <div className="ws-avatar-ring">
          <div className="ws-avatar-inner">
            <img
              src="/assets/img/profil foto.png"
              className="ws-avatar-img"
              alt="Damta"
              onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/assets/img/gambar1.png')}
            />
          </div>
          <svg className="ws-ring-svg" viewBox="0 0 120 120" fill="none">
            <defs>
              <linearGradient id="wsRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="60%" stopColor="#C9922A" />
                <stop offset="100%" stopColor="#B87333" />
              </linearGradient>
            </defs>
            <circle className="ws-ring-track" cx="60" cy="60" r="54" />
            <circle className="ws-ring-progress" cx="60" cy="60" r="54" />
          </svg>
          <div className="ws-orbit-wrap" aria-hidden="true">
            <span className="ws-odot" style={{ ['--oa' as string]: '0deg', ['--oc' as string]: '#D4AF37' }} />
            <span className="ws-odot" style={{ ['--oa' as string]: '120deg', ['--oc' as string]: '#C9922A' }} />
            <span className="ws-odot" style={{ ['--oa' as string]: '240deg', ['--oc' as string]: '#B87333' }} />
          </div>
          <div className="ws-pulse-ring" aria-hidden="true" />
        </div>

        <div className="ws-brand">
          <div className="ws-name-wrap">
            <p className="ws-name-label">// initializing user profile</p>
            <h1 className="ws-name-line1">DAMTA NOVIYAN</h1>
            <h1 className="ws-name-line2">MUHAMAD FAIZ</h1>
          </div>
          <p className="ws-subtitle">Full Stack Developer &nbsp;-&nbsp; BKI Software Engineer</p>
          <div className="ws-status-row">
            <span className="ws-stt"><span className="ws-stt-dot s-green" />System Online</span>
            <span className="ws-stt"><span className="ws-stt-dot s-blue" />Firebase Ready</span>
            <span className="ws-stt"><span className="ws-stt-dot s-purple" />Portfolio v3.0</span>
          </div>
        </div>

        <div className="ws-terminal-box">
          <span className="ws-terminal-prompt">$&gt;</span>
          <span className="ws-terminal-text" ref={termRef} />
          <span className="ws-terminal-cursor">▮</span>
        </div>

        <div className="ws-loader">
          <div className="ws-loader-bar">
            <div className="ws-loader-fill" ref={fillRef} />
          </div>
          <span className="ws-loader-pct" ref={pctRef}>0%</span>
        </div>

        <div className="ws-tech-tags">
          <span className="ws-tag" style={{ ['--tc' as string]: '#D4AF37' }}>React</span>
          <span className="ws-tag" style={{ ['--tc' as string]: '#C9922A' }}>Next.js</span>
          <span className="ws-tag" style={{ ['--tc' as string]: '#B87333' }}>Node.js</span>
          <span className="ws-tag" style={{ ['--tc' as string]: '#d4a00a' }}>PHP</span>
          <span className="ws-tag" style={{ ['--tc' as string]: '#c9922a' }}>Firebase</span>
          <span className="ws-tag" style={{ ['--tc' as string]: '#b8860b' }}>MySQL</span>
        </div>

        <div className="ws-icon-row">
          <div className="ws-icon-item" style={{ ['--ic' as string]: '#D4AF37' }}>
            <img src="/assets/img/gambar1.png" alt="Portfolio" />
          </div>
          <div className="ws-icon-item" style={{ ['--ic' as string]: '#C9922A' }}>
            <img src="/assets/img/github.png" alt="GitHub" />
          </div>
          <div className="ws-icon-item" style={{ ['--ic' as string]: '#B87333' }}>
            <img src="/assets/img/proyek.png" alt="Projects" />
          </div>
        </div>
      </div>
    </div>
  );
}
