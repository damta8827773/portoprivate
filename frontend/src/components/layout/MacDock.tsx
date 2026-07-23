import { useEffect, useState } from 'react';

const LINKS = [
  { href: 'https://instagram.com/tadamta_', icon: 'ri-instagram-line', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/damta-faiz-955493221', icon: 'ri-linkedin-fill', label: 'LinkedIn' },
  { href: 'https://github.com/damta8827773', icon: 'ri-github-fill', label: 'GitHub' },
  { href: 'https://www.tiktok.com/@n1876382987nsg?', icon: 'ri-tiktok-fill', label: 'TikTok' },
  { href: 'mailto:damtafaiz@gmail.com', icon: 'ri-mail-line', label: 'Email' },
];

/**
 * #9 macOS-style dock with magnify-on-hover (desktop only).
 *
 * Hides itself once the footer scrolls into view - the footer already carries
 * the same social links, so the fixed dock would otherwise sit on top of the
 * footer text (the "bottom-center overlap").
 */
export function MacDock() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`mac-dock${hidden ? ' mac-dock-hidden' : ''}`} aria-label="Quick links">
      {LINKS.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noreferrer" title={l.label}>
          <i className={l.icon} />
        </a>
      ))}
    </div>
  );
}
