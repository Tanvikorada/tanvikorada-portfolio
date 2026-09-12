'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillNav from './ui/PillNav';

export default function Nav() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'night') {
      setIsNight(true);
      document.body.classList.add('night');
    }
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

  const navItems = [
    { label: 'Work', href: '#work', onClick: () => scrollTo('work') },
    { label: 'About', href: '#about', onClick: () => scrollTo('about') },
    { label: 'Playground', href: '#playground', onClick: () => scrollTo('playground') },
    { label: 'Resume', href: '/resume.pdf' }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-center p-4 pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', justifyContent: 'center', pointerEvents: 'none'
      }}
    >
      <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <PillNav
          logo="/images/about-profile.jpg"
          logoAlt="Tanvi"
          items={navItems}
          baseColor={isNight ? '#0f172a' : '#ffffff'}
          pillColor={isNight ? '#ffffff' : '#0f172a'}
          hoveredPillTextColor={isNight ? '#ffffff' : '#000000'}
          pillTextColor={isNight ? '#000000' : '#ffffff'}
        />

        {/* Theme toggle detached from PillNav but floating next to it */}
        <button 
          className="theme-btn" 
          onClick={toggleTheme} 
          aria-label="Toggle theme"
          style={{ 
            width: '42px', height: '42px', borderRadius: '50%', background: isNight ? '#020617' : '#ffffff', 
            color: isNight ? '#ffffff' : '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)', cursor: 'pointer', border: 'none',
            marginTop: '1em'
          }}
        >
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
      </div>
    </motion.header>
  );
}

