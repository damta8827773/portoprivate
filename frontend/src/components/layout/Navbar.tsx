import { useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { useAppStore } from '../../store/useAppStore';

const NAV = [
  { href: '#home', img: 'home.png', key: 'nav_home', size: 18 },
  { href: '#profil', img: 'profil.png', key: 'nav_profil', size: 18 },
  { href: '#skill', img: 'skill.png', key: 'nav_skill', size: 18 },
  { href: '#projects', img: 'proyek.png', key: 'nav_project', size: 18 },
  { href: '#certificates', img: 'sertif.png', key: 'nav_cert', size: 25 },
  { href: '#about', img: 'tentang kami.png', key: 'about_title_main', size: 18 },
  { href: '#dashboard', img: 'dasbor.png', key: 'dashboard_title', size: 30 },
  { href: '#comments', img: 'komen&rate.png', key: 'comment_title', size: 24 },
  { href: '#contact', img: 'kontak.png', key: 'nav_contact', size: 24 },
] as const;

export function Navbar() {
  const { t, lang, toggleLang } = useI18n();
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bursting, setBursting] = useState(false);

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
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-container">
            <img src="/assets/img/logo.png" alt="Logo Damta" />
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
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  <img
                    src={`/assets/img/${item.img}`}
                    alt={t(item.key)}
                    style={{ width: item.size, height: item.size }}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                  <span>{t(item.key)}</span>
                </a>
              </li>
            ))}

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
