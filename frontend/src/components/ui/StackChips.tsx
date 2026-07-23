/**
 * Stack badges with the technology's logo. Names are matched loosely so
 * "Next.js", "nextjs" and "NEXT JS" all resolve to the same icon; anything
 * without a local logo simply renders as a text-only chip.
 */

/** Normalised stack name -> file in public/assets/img. */
const LOGOS: Record<string, string> = {
  html: 'html.png',
  html5: 'html.png',
  css: 'css.png',
  css3: 'css.png',
  javascript: 'js.png',
  js: 'js.png',
  vanillajs: 'js.png',
  typescript: 'typescript.png',
  ts: 'typescript.png',
  react: 'react.png',
  reactjs: 'react.png',
  nextjs: 'nextjs.png',
  next: 'nextjs.png',
  node: 'node.png',
  nodejs: 'node.png',
  php: 'php.png',
  phpnative: 'php.png',
  mysql: 'mysql.png',
  sql: 'mysql.png',
  python: 'python.png',
  firebase: 'firebase.png',
  tailwind: 'tailwind.png',
  tailwindcss: 'tailwind.png',
  bootstrap: 'bootstrap.png',
  go: 'go.png',
  golang: 'go.png',
  java: 'java.png',
  kotlin: 'kotlin.png',
  rust: 'rust.png',
  ruby: 'ruby.png',
  lua: 'lua.png',
  c: 'c.png',
  'c++': 'cpp.png',
  cpp: 'cpp.png',
  elixir: 'elixir.png',
  github: 'github.png',
  cpanel: 'cpanel.png',
  gemini: 'gemini.png',
  // Deliberately unmapped (no matching local logo): Docker, Vite, Prisma,
  // Express, Streamlit, Tailwind-variants without assets, etc. A text-only
  // chip beats a wrong logo.
};

/** Public URL of a technology's logo, or null when we don't ship one. */
export function techLogo(name: string): string | null {
  const key = name.toLowerCase().replace(/[\s._-]/g, '');
  const file = LOGOS[key] ?? LOGOS[name.toLowerCase()];
  return file ? `/assets/img/${file}` : null;
}

interface StackChipsProps {
  items: string[];
  className?: string;
}

export function StackChips({ items, className = '' }: StackChipsProps) {
  if (items.length === 0) return null;

  return (
    <ul className={`stack-chips ${className}`.trim()}>
      {items.map((item) => {
        const logo = techLogo(item);
        return (
          <li key={item} className={logo ? 'has-logo' : undefined}>
            {logo && (
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                  el.parentElement?.classList.remove('has-logo');
                }}
              />
            )}
            <span>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
