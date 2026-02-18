import React, { useState } from 'react';

const Navbar = ({ text, lang, isLightMode, toggleLanguage, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-container" style={{height: '50px'}}>
            {/* SOLUSI NO 6 & 7: Pastikan pakai slash di depan */}
            <img src="/assets/img/logo.png" alt="Logo" style={{height: '100%', objectFit: 'contain'}} onError={(e) => e.target.style.display='none'} />
          </div>
        </div>

        {/* SOLUSI NO 3: Hamburger dengan class yang sesuai CSS baru */}
        <div 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home" onClick={handleClose}>{text.nav_home}</a></li>
            <li><a href="#profil" onClick={handleClose}>{text.nav_profil}</a></li>
            <li><a href="#skill" onClick={handleClose}>{text.nav_skill}</a></li>
            <li><a href="#projects" onClick={handleClose}>{text.nav_project}</a></li>
            <li><a href="#certificates" onClick={handleClose}>{text.nav_cert}</a></li>
            <li><a href="#about" onClick={handleClose}>{text.about_title || "Visi Misi"}</a></li>
            <li><a href="#contact" onClick={handleClose}>{text.nav_contact}</a></li>

            <div className="controls">
              <button className="control-btn" onClick={toggleLanguage}>
                <i className="ri-global-line"></i> 
                <span>{lang.toUpperCase()}</span>
              </button>
              <button className="control-btn" onClick={toggleTheme}>
                <i className={isLightMode ? "ri-sun-line" : "ri-moon-line"}></i>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;