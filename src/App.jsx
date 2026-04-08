import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
import { LangProvider } from './context/LangContext';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import Contact from './components/Contact';
import LangToggle from './components/LangToggle';
import './App.css';

const SiteLogo = ({ loading }) => {
  return (
    <div 
      className={`site-logo ${!loading ? 'visible' : ''}`} 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg viewBox="0 0 1920 1080">
        <g>
          <polygon fill="currentColor" points="1144.1,339.6 66.2,543.8 55.4,637.8 1133.3,433.7"/>
          <path fill="currentColor" d="M1497.6,437.5l9.8-59.8l-158.2-39.1c-43.1-10.7-86.1,17.7-93.3,61.5l-11.1,67.8L269.6,652.6l-13.5,94.6 l1230.6-233.1L1497.6,437.5z"/>
          <polygon fill="currentColor" points="1815.1,415.1 1830.6,320.1 1678.2,349 1589.3,365.8 1558.3,555.8 454.5,764.9 443.2,859 1542.8,650.7 1631.6,633.9 1788.4,604.2 1799.6,510.1 1647.1,539 1662.6,444"/>
        </g>
      </svg>
    </div>
  );
};

function AppInner() {
  const [loading, setLoading] = useState(true);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const glowRef = useRef(null);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Smooth Scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing to prevent conflicts with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
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

      {/* Permanent Home Logo */}
      <SiteLogo loading={loading} />

      {!loading && (
        <>
          <div className="cursor" ref={cursorRef} />
          <div className="cursorDot" ref={cursorDotRef} />
          <div className="ambientGlow" ref={glowRef} />
        </>
      )}

      <div className={`appInner ${!loading ? 'visible' : ''}`}>
        <div className="heroAboutWrapper">
          <div className="heroAboutBg" />
          <Hero />
          <About />
        </div>
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
