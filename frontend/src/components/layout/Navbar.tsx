import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n/useI18n';
import { useAppStore } from '../../store/useAppStore';
import type { TranslationKey } from '../../i18n/translations';

interface NavItem {
  /** "#id" scrolls to a home section; "/path" opens a dedicated page. */
  href: string;
  /** The user's own custom logo PNGs (restored). Rendered inside a uniform
   *  white chip so every one shows the same size on the dark bar. */
  img: string;
  key: TranslationKey;
}

const NAV: NavItem[] = [
  { href: '#home', img: 'home.png', key: 'nav_home' },
  { href: '/profil', img: 'profil.png', key: 'nav_profil' },
  { href: '/skills', img: 'skill.png', key: 'nav_skill' },
  { href: '/projects', img: 'proyek.png', key: 'nav_project' },
  { href: '/achievements', img: 'sertif.png', key: 'nav_cert' },
  { href: '#about', img: 'tentang kami.png', key: 'about_title_main' },
  { href: '/blog', img: 'proyek.png', key: 'nav_blog' },
  { href: '/dashboard', img: 'dasbor.png', key: 'nav_dashboard' },
  { href: '/comments', img: 'komen&rate.png', key: 'nav_comments' },
  { href: '#contact', img: 'kontak.png', key: 'nav_contact' },
];

export function Navbar() {
  const { t, lang, toggleLang } = useI18n();
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bursting, setBursting] = useState(false);
  const isHome = useLocation().pathname === '/';

  // BKI-style shrink-on-scroll: the bar is tall with a big logo at the very top
  // and compacts into a shorter sticky bar once the page scrolls (offset 60px).
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onTheme = () => {
    toggleTheme();
    setBursting(false);
    requestAnimationFrame(() => {
      setBursting(true);
      setTimeout(() => setBursting(false), 550);
    });
  };

  const isDark = theme === 'dark';

  return (
    <div className={`navbar-container${scrolled ? ' scrolled' : ''}`}>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-left">
          <div className="logo-container">
            <img src="/assets/img/logo-nexus.png" alt="Nexus Omni D - Vanguard Tech" />
          </div>
        </div>

        <div
          className={`hamburger${menuOpen ? ' active' : ''}`}
          id="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </div>

        <div className={`nav-links${menuOpen ? ' active' : ''}`} id="navMenu">
          <ul>
            {NAV.map((item) => {
              const icon = (
                <>
                  <span className="nav-ico">
                    <img
                      src={`/assets/img/${item.img}`}
                      alt=""
                      aria-hidden="true"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                  </span>
                  <span>{t(item.key)}</span>
                </>
              );
              const close = () => setMenuOpen(false);
              // Narrow desktop widths hide the label - keep it as a tooltip.
              const label = t(item.key);

              return (
                <li key={item.href} title={label} data-nav={item.key}>
                  {item.href.startsWith('#') ? (
                    // Section anchors only resolve on the home page - from a
                    // sub-page, route home first and let Home scroll to the hash.
                    isHome ? (
                      <a href={item.href} onClick={close}>
                        {icon}
                      </a>
                    ) : (
                      <Link to={`/${item.href}`} onClick={close}>
                        {icon}
                      </Link>
                    )
                  ) : (
                    <Link to={item.href} onClick={close}>
                      {icon}
                    </Link>
                  )}
                </li>
              );
            })}

            <div className="controls">
              <button className="control-btn" onClick={toggleLang}>
                <i className="ri-global-line" /> <span id="lang-text">{lang.toUpperCase()}</span>
              </button>
              <button
                className={`theme-pill-btn${bursting ? ' bursting' : ''}`}
                id="themePillBtn"
                onClick={onTheme}
                aria-label="Ganti tema"
                role="switch"
                aria-checked={isDark}
              >
                <i className="ri-sun-line theme-pill-icon-bg tp-sun" />
                <i className="ri-moon-line theme-pill-icon-bg tp-moon" />
                <span className="theme-pill-thumb" id="themePillThumb">
                  <i id="theme-icon" className={isDark ? 'ri-moon-line' : 'ri-sun-line'} />
                </span>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
