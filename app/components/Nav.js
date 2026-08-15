'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Nav() {
  const [isNight, setIsNight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'night') {
      setIsNight(true);
      document.body.classList.add('night');
    }
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isNight;
    setIsNight(next);
    document.body.classList.toggle('night', next);
    localStorage.setItem('theme', next ? 'night' : 'day');
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-center p-4 pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', justifyContent: 'center', padding: '16px 24px', pointerEvents: 'none'
      }}
    >
      <motion.nav 
        className="nav-pill"
        animate={{
          padding: scrolled ? '6px 10px' : '8px 12px',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-lift)'
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="nav-logo-dot" />
          <span style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>Tanvi</span>
        </a>

        <span className="nav-divider" />

        {/* Links */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button className="nav-link" onClick={() => scrollTo('work')}>Work</button>
          <button className="nav-link" onClick={() => scrollTo('about')}>About</button>
          <button className="nav-link" onClick={() => scrollTo('contact')}>Contact</button>
        </div>

        <div className="nav-right">
          <span className="nav-divider" />

          {/* Theme toggle */}
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <AnimatePresence mode="wait">
              {isNight ? (
                <motion.svg key="moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
                </motion.svg>
              ) : (
                <motion.svg key="sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </motion.svg>
              )}
            </AnimatePresence>
          </button>

          {/* Resume */}
          <a
            className="resume-btn"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            View Resume 
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </motion.nav>
    </motion.header>
  );
}
