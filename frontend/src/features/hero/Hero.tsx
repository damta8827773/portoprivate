import { Fragment, useEffect, useRef } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { useHeroMorph } from '../../hooks/useHeroMorph';
import { useCountUp } from '../../hooks/useCountUp';
import { useSplineGreeting } from '../../hooks/useSplineGreeting';

const SPLINE_URL =
  import.meta.env.VITE_SPLINE_SCENE_URL ||
  'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

// UI FIX #4 - 15+ technologies in the hero marquee.
const MARQUEE_TECH = [
  'React.js', 'Node.js', 'PHP', 'MySQL', 'Next.js', 'Tailwind CSS', 'Firebase',
  'JavaScript', 'TypeScript', 'Express.js', 'Prisma', 'Python', 'Go', 'Docker', 'Git', 'REST API',
];

function HeroStat({ target, labelKey }: { target: number; labelKey: 'hero_stat_exp' | 'hero_stat_live' | 'hero_stat_tech' }) {
  const { t } = useI18n();
  const { ref, value } = useCountUp(target);
  return (
    <div className="hero-stat">
      <span className="hero-stat-num" ref={ref}>
        {value}
      </span>
      <span className="hero-stat-plus">+</span>
      <span className="hero-stat-label">{t(labelKey)}</span>
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const t1 = useRef<HTMLSpanElement>(null);
  const t2 = useRef<HTMLSpanElement>(null);
  const robotWrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useHeroMorph(t1, t2);
  useSplineGreeting(robotWrap);

  // Hero video: unmute on first interaction, mute again past 50% viewport scroll.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = 0.5;
    let interacted = false;
    const enable = () => {
      video.muted = false;
      interacted = true;
      video.play().catch(() => {});
      document.removeEventListener('click', enable);
      document.removeEventListener('touchstart', enable);
    };
    const onScroll = () => {
      const trigger = window.innerHeight * 0.5;
      if (window.scrollY > trigger) {
        if (!video.muted) video.muted = true;
      } else if (video.muted && interacted) {
        video.muted = false;
        video.play().catch(() => {});
      }
    };
    document.addEventListener('click', enable);
    document.addEventListener('touchstart', enable);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('click', enable);
      document.removeEventListener('touchstart', enable);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="home" className="hero hidden">
      <div className="hero-video-wrapper">
        <video
          id="heroVideo"
          ref={videoRef}
          src="/assets/img/vidio.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
        />
        <canvas id="heroCinema" />
        <div className="video-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-status-badge">
          <span className="status-dot" />
          <span>{t('hero_available')}</span>
        </div>

        <div className="hero-greeting">
          <span className="greeting-line" />
          <span className="greeting-text">{t('hero_greeting')}</span>
        </div>

        <h1 id="hero-title">
          <span className="hero-name-text">DAMTA NOVIYAN MUHAMAD FAIZ</span>
        </h1>

        <div className="hero-role-row">
          <span className="role-bracket">&lt;</span>
          <div className="hero-morph-wrap">
            <span id="hero-morph-t1" className="hero-morph-text" ref={t1} />
            <span id="hero-morph-t2" className="hero-morph-text" ref={t2} />
          </div>
          <span className="role-bracket">/&gt;</span>
        </div>

        <div className="hero-stats-row">
          <HeroStat target={3} labelKey="hero_stat_exp" />
          <div className="hero-stat-divider" />
          <HeroStat target={8} labelKey="hero_stat_live" />
          <div className="hero-stat-divider" />
          <HeroStat target={25} labelKey="hero_stat_tech" />
        </div>

        <div className="hero-cta">
          <a href="#projects" className="cta-primary magnetic-btn shimmer-btn">
            <span>{t('hero_btn_projects')}</span>
            <i className="ri-arrow-right-line" />
          </a>
          <a href="#contact" className="cta-secondary magnetic-btn shimmer-btn">
            <span>{t('hero_btn_contact')}</span>
            <i className="ri-send-plane-line" />
          </a>
        </div>
      </div>

      <div className="hero-robot-wrap" id="heroRobotWrap" ref={robotWrap}>
        <div className="spline-card">
          <svg className="spline-spotlight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3787 2842" fill="none">
            <g filter="url(#splineSpotFilter)">
              <ellipse
                cx="1924.71"
                cy="273.501"
                rx="1924.71"
                ry="273.501"
                transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                fill="white"
                fillOpacity="0.21"
              />
            </g>
            <defs>
              <filter id="splineSpotFilter" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
              </filter>
            </defs>
          </svg>
          <spline-viewer id="splineViewer" url={SPLINE_URL} />
          <div className="spline-loading" id="splineLoading">
            <div className="spline-loader-ring" />
            <span>Loading 3D...</span>
          </div>
        </div>
        <div className="robot-glow-ring" />
        <div className="robot-label">
          <span className="robot-label-dot" />
          <span className="robot-label-text">{t('robot_label')}</span>
        </div>
      </div>

      <div className="hero-marquee-wrap">
        <div className="hero-marquee-track">
          {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, i) => (
            <Fragment key={i}>
              <span>{tech}</span>
              <span className="mq-dot">◆</span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
