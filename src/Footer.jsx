import React from 'react';

const SocialBtn = ({ href, icon, label }) => (
  <a href={href} target="_blank" rel="noreferrer" className="social-icon-btn" data-name={label}>
    <i className={icon}></i>
  </a>
);

const Footer = ({ text }) => {
  return (
    <footer id="contact">
      <div className="social-links">
        <SocialBtn href="https://instagram.com/tadamta_" icon="ri-instagram-fill" label="Instagram" />
        <SocialBtn href="https://www.linkedin.com/in/damta-faiz" icon="ri-linkedin-fill" label="LinkedIn" />
        <SocialBtn href="https://github.com/damta8827773" icon="ri-github-fill" label="GitHub" />
        <SocialBtn href="mailto:damtafaiz@gmail.com" icon="ri-mail-fill" label="Email" />
      </div>
      <p>&copy; {new Date().getFullYear()} Damta Noviyan Muhamad Faiz. {text}</p>
    </footer>
  );
};

export default Footer;