import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cursor } from './components/layout/Cursor';
import { ParticleCanvas } from './components/layout/ParticleCanvas';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CommandPalette } from './components/layout/CommandPalette';
import { MacDock } from './components/layout/MacDock';
import { WelcomeScreen } from './components/layout/WelcomeScreen';
import { Home } from './pages/Home';
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
      {showWelcome && <WelcomeScreen onDone={() => setShowWelcome(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
