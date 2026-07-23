import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cursor } from './components/layout/Cursor';
import { ParticleCanvas } from './components/layout/ParticleCanvas';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CommandPalette } from './components/layout/CommandPalette';
import { MacDock } from './components/layout/MacDock';
import { WelcomeScreen } from './components/layout/WelcomeScreen';
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { JourneyPage } from './pages/JourneyPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ChatWidget } from './components/layout/ChatWidget';
import { useAppStore } from './store/useAppStore';
import { useGlobalEffects } from './hooks/useGlobalEffects';

export default function App() {
  const theme = useAppStore((s) => s.theme);
  const [showWelcome, setShowWelcome] = useState(true);
  useGlobalEffects();

  // Sync <body> class with the active theme (drives the whole design system).
  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  return (
    <BrowserRouter>
      <Cursor />
      <ParticleCanvas />
      <ScrollProgress />
      <CommandPalette />
      <MacDock />
      <ChatWidget />
      {showWelcome && <WelcomeScreen onDone={() => setShowWelcome(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/legal/privacy-policy" element={<LegalPage document="privacy" />} />
        <Route path="/legal/terms-of-service" element={<LegalPage document="terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
