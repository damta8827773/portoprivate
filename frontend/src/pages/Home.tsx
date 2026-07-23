import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../features/hero/Hero';
import { Profil } from '../features/profil/Profil';
import { Skills } from '../features/skills/Skills';
import { Stack } from '../features/stack/Stack';
import { Projects } from '../features/projects/Projects';
import { Certificates } from '../features/certificates/Certificates';
import { About } from '../features/about/About';
import { Dashboard } from '../features/dashboard/Dashboard';
import { Comments } from '../features/comments/Comments';

export function Home() {
  const { hash } = useLocation();

  // Arriving from a sub-page as "/#skill": React Router restores the hash but
  // never scrolls, so do it once the sections have mounted.
  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  return (
    <div id="main-content" style={{ width: '100%', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <Profil />
      <Skills />
      <Stack />
      <Projects />
      <Certificates />
      <About />
      <Dashboard />
      <Comments />
      <Footer />
    </div>
  );
}
