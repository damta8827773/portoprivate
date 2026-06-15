import type { Config } from 'tailwindcss';

/**
 * Tailwind is enabled for new components/layout utilities.
 * The original bespoke neon/glassmorphism design lives in src/styles/app.css
 * (imported globally) to keep the UI pixel-identical to the original.
 * `preflight` is disabled so Tailwind's reset does not fight app.css.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  // The original site uses `.hidden` as a scroll-reveal MARKER (not real hiding).
  // Tailwind's `.hidden` utility would force display:none on those elements
  // (hero, cards, sections), making content vanish. Block it so the markup keeps
  // its intended display from app.css; the reveal observer only adds `.show`.
  blocklist: ['hidden'],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        bronze: '#B87333',
        copper: '#C9922A',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
