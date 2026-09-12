'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Link from 'next/link';

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
    handleScroll(); // init
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', justifyContent: 'center', pointerEvents: 'none'
      }}
    >
      <LayoutGroup>
        <motion.nav 
          layout // Enables extremely smooth automatic interpolations between size and position
          className="nav-pill"
          initial={false}
          animate={{
            width: scrolled ? 'auto' : '100%',
            padding: scrolled ? '8px 12px' : '20px 8vw',
            borderRadius: scrolled ? '100px' : '0px',
            backgroundColor: scrolled ? 'var(--nav-bg)' : 'var(--bg-glass)', // Glass effect on first page!
            borderColor: scrolled ? 'var(--border-mid)' : 'transparent',
            borderBottomColor: scrolled ? 'var(--border-mid)' : 'var(--border)',
            boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
            marginTop: scrolled ? '20px' : '0px',
            gap: scrolled ? '8px' : '6vw',
            backdropFilter: scrolled ? 'blur(24px) saturate(200%)' : 'blur(16px)',
          }}
          transition={{ layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'auto',
            borderStyle: 'solid',
            borderWidth: '1px',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(200%)' : 'blur(16px)'
          }}
        >
          {/* Logo */}
          <motion.div layout>
            <Link href="/" className="nav-logo">
              <span className="nav-logo-dot" />
              <span style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>Tanvi</span>
            </Link>
          </motion.div>

          <motion.span layout className="nav-divider" />

          {/* Links */}
          <motion.div layout style={{ display: 'flex', gap: '8px' }}>
            <button className="nav-link" onClick={() => scrollTo('work')}>Work</button>
            <button className="nav-link" onClick={() => scrollTo('about')}>About</button>
            <button className="nav-link" onClick={() => scrollTo('playground')}>Playground</button>
          </motion.div>

          <motion.div layout className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.span layout className="nav-divider" />

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
          </motion.div>
        </motion.nav>
      </LayoutGroup>
    </motion.header>
  );
}
