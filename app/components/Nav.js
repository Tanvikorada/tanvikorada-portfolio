'use client';
import { useState, useEffect, useRef } from 'react';

export default function Nav() {
  const [isNight, setIsNight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'night') {
      setIsNight(true);
      document.body.classList.add('night');
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    <header className="nav-wrapper">
      <nav className="nav-pill">
        {/* Logo */}
        <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="nav-logo-dot" />
          Tanvi
        </a>

        <span className="nav-divider" />

        {/* Links */}
        <button className="nav-link" onClick={() => scrollTo('work')}>Work</button>
        <button className="nav-link" onClick={() => scrollTo('about')}>About</button>
        <button className="nav-link" onClick={() => scrollTo('contact')}>Contact</button>

        <div className="nav-right">
          <span className="nav-divider" />

          {/* Theme toggle */}
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {isNight ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            )}
          </button>

          {/* Resume */}
          <a
            className="resume-btn"
            href="mailto:tanvikorada@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hire me ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
