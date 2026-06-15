const LINKS = [
  { href: 'https://instagram.com/tadamta_', icon: 'ri-instagram-line', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/damta-faiz-955493221', icon: 'ri-linkedin-fill', label: 'LinkedIn' },
  { href: 'https://github.com/damta8827773', icon: 'ri-github-fill', label: 'GitHub' },
  { href: 'https://www.tiktok.com/@n1876382987nsg?', icon: 'ri-tiktok-fill', label: 'TikTok' },
  { href: 'mailto:damtafaiz@gmail.com', icon: 'ri-mail-line', label: 'Email' },
];

/** #9 macOS-style dock with magnify-on-hover (desktop only). */
export function MacDock() {
  return (
    <div className="mac-dock" aria-label="Quick links">
      {LINKS.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noreferrer" title={l.label}>
          <i className={l.icon} />
        </a>
      ))}
    </div>
  );
}
