import React, { useState, useEffect } from 'react';

// --- IMPORT COMPONENT ---
// Pastikan nama file di folder kamu diawali Huruf Besar (misal: Navbar.jsx, Hero.jsx)
import About from './About';
import Certificates from './Certificates';
import Hero from './Heros';
import Navbar from './Navbar';
import Profile from './Profile';
import Skills from './Skill';      // Pastikan nama filenya Skills.jsx
import Projects from './Projects';
import Footer from './Footer';

// --- IMPORT DATA ---
// Pastikan di dalam file Content.js tulisannya: "export const content = { ... }"
import { content } from './content'; 

import './App.css'; 

function App() {
  const [lang, setLang] = useState('id');
  const [isLightMode, setIsLightMode] = useState(false);

  // Mengambil teks berdasarkan bahasa, dengan pengecekan agar tidak error jika content kosong
  const text = content && content[lang] ? content[lang] : null;

  const toggleLanguage = () => setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  const toggleTheme = () => setIsLightMode((prev) => !prev);

  // --- LOGIKA TEMA ---
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  // --- LOGIKA ANIMASI SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-active');
          // Optional: Hentikan observe setelah animasi jalan sekali agar performa lebih ringan
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Beri sedikit delay agar elemen sudah ter-render sebelum di-observe
    const timer = setTimeout(() => {
        const hiddenElements = document.querySelectorAll(
          'section h2, .hero p, .profil-card, .tech-item, .project-card, .cert-card, .vm-card, .history-item'
        );
        hiddenElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [lang]); // Tambahkan [lang] agar animasi dicek ulang saat ganti bahasa

  // Tampilan Loading jika data content belum siap/salah
  if (!text) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
        <p>Error: Cek file Content.js. Pastikan export const content ada.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar 
        text={text} 
        lang={lang} 
        isLightMode={isLightMode}
        toggleLanguage={toggleLanguage} 
        toggleTheme={toggleTheme} 
      />
      
      <main>
        {/* Pastikan props title/subtitle sesuai dengan key di Content.js */}
        <Hero title={text.hero_title} subtitle={text.hero_subtitle} />
        <Profile text={text} />
        <Skills title={text.skill_title} />
        <Projects title={text.project_title} />
        <Certificates title={text.cert_title} />
        <About title={text.about_title} />
      </main>

      <Footer text={text.footer} />
    </div>
  );
}

export default App;