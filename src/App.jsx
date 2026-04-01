import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { LangProvider } from './context/LangContext';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import Contact from './components/Contact';
import LangToggle from './components/LangToggle';
import './App.css';

function AppInner() {
  const [loading, setLoading] = useState(true);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const glowRef = useRef(null);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Custom cursor
  useEffect(() => {
    if (loading) return;
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const glow = glowRef.current;
    if (!cursor || !dot) return;

    const onMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      if (glow) gsap.to(glow, { x: e.clientX - 200, y: e.clientY - 200, duration: 1.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [loading]);

  return (
    <div className="app">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Language toggle — always visible */}
      <LangToggle />

      {!loading && (
        <>
          <div className="cursor" ref={cursorRef} />
          <div className="cursorDot" ref={cursorDotRef} />
          <div className="ambientGlow" ref={glowRef} />
        </>
      )}

      <div className={`appInner ${!loading ? 'visible' : ''}`}>
        <Hero />
        <About />
        <Portfolio />
        <Clients />
        <Contact />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
