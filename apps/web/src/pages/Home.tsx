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
