'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// --- PREMIUM SVG ICONS ---
const SvgGradient = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="premium-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--primary)" />
        <stop offset="100%" stopColor="#f472b6" />
      </linearGradient>
      <linearGradient id="premium-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
      </linearGradient>
    </defs>
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
    <path d="M3 9.5L12 3l9 6.5" stroke="url(#premium-grad)" strokeWidth="2.5" />
    <path d="M19 11v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9" strokeOpacity="0.7" />
    <rect width="4" height="6" x="10" y="14" fill="url(#premium-glow)" stroke="none" rx="1" />
  </svg>
);

const WorkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
    <rect width="20" height="14" x="2" y="7" rx="3" ry="3" strokeOpacity="0.7" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="url(#premium-grad)" strokeWidth="2.5" />
    <circle cx="12" cy="14" r="2.5" fill="url(#premium-glow)" stroke="none" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" strokeOpacity="0.7" />
    <circle cx="12" cy="7" r="4.5" stroke="url(#premium-grad)" strokeWidth="2.5" />
    <circle cx="12" cy="7" r="2" fill="url(#premium-glow)" stroke="none" />
  </svg>
);

const GamepadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
    <rect width="20" height="12" x="2" y="6" rx="4" strokeOpacity="0.7" />
    <path d="M6 12h4m-2-2v4" stroke="url(#premium-grad)" strokeWidth="2.5" />
    <circle cx="15" cy="11" r="1.5" fill="url(#premium-glow)" stroke="none" />
    <circle cx="17" cy="13" r="1.5" fill="url(#premium-glow)" stroke="none" />
  </svg>
);

const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" strokeOpacity="0.7" />
    <polyline points="14 2 14 8 20 8" stroke="url(#premium-grad)" strokeWidth="2.5" />
    <line x1="9" y1="13" x2="15" y2="13" stroke="url(#premium-glow)" strokeWidth="2" />
    <line x1="9" y1="17" x2="13" y2="17" stroke="url(#premium-glow)" strokeWidth="2" />
  </svg>
);

const MoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#premium-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="url(#premium-glow)" fillOpacity="0.4" />
  </svg>
);

const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#premium-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
    <circle cx="12" cy="12" r="4" fill="url(#premium-glow)" fillOpacity="0.6" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeOpacity="0.8" />
  </svg>
);

// --- DOCK ITEM (Magnifying effect) ---
function DockIcon({ mouseX, onClick, icon, label, scrolled }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const baseWidth = scrolled ? 44 : 52; 
  const hoverWidth = scrolled ? 72 : 84;

  const widthSync = useTransform(distance, [-150, 0, 150], [baseWidth, hoverWidth, baseWidth]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div style={{ position: 'relative' }} className="dock-icon-wrapper">
      <motion.button
        ref={ref}
        onClick={onClick}
        style={{ width, height: width }}
        className="dock-icon-btn"
        aria-label={label}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div style={{ scale: useTransform(width, [baseWidth, hoverWidth], [1, 1.35]) }}>
          {icon}
        </motion.div>
      </motion.button>
      
      <div className="dock-tooltip">
        {label}
      </div>
    </div>
  );
}

export default function Nav() {
  const [isNight, setIsNight] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'day') {
      setIsNight(false);
      document.body.classList.remove('night');
    } else {
      setIsNight(true);
      document.body.classList.add('night');
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
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
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SvgGradient />
      <style>{`
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 50%;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid transparent;
          transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      width 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-radius 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      top 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dock-container {
          display: flex;
          align-items: center;
          gap: 12px;
          transition: margin 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dock-icon-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .dock-icon-wrapper:hover .dock-tooltip {
          opacity: 1;
          transform: translateY(0) translateX(-50%);
        }

        .dock-icon-btn {
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-heading);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
          box-shadow: inset 1px 1px 2px rgba(255,255,255,0.1);
        }
        
        body.night .dock-icon-btn {
          background: linear-gradient(135deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.2) 100%);
          border-color: rgba(56,189,248,0.15);
        }

        .dock-icon-btn:hover {
          background: var(--primary-glow);
          border-color: var(--primary);
          box-shadow: 0 10px 20px var(--primary-glow), inset 1px 1px 2px rgba(255,255,255,0.3);
        }

        .dock-divider {
          width: 1px;
          height: 32px;
          background: var(--border-mid);
          margin: 0 4px;
        }

        /* Tooltips show BELOW the nav */
        .dock-tooltip {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateY(-10px) translateX(-50%);
          opacity: 0;
          pointer-events: none;
          background: var(--text-heading);
          color: var(--bg-solid);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          white-space: nowrap;
          box-shadow: var(--shadow-md);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .dock-tooltip::after {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 4px 4px 4px;
          border-style: solid;
          border-color: transparent transparent var(--text-heading) transparent;
        }
        
        @media (max-width: 768px) {
          .nav-wrapper {
            gap: 8px !important;
          }
          .dock-container {
            gap: 6px;
          }
        }
      `}</style>
      
      <motion.div 
        className="nav-wrapper"
        initial={{ y: -100, opacity: 0, x: '-50%' }}
        animate={{ 
          y: 0, 
          opacity: 1, 
          x: '-50%',
          top: scrolled ? '20px' : '0px',
          width: scrolled ? 'auto' : '100%',
          padding: scrolled ? '10px 16px' : '24px 8vw',
          borderRadius: scrolled ? '999px' : '0px',
          background: scrolled ? 'var(--bg-surface)' : 'transparent',
          borderColor: scrolled ? 'var(--border-mid)' : 'transparent',
          boxShadow: scrolled ? 'var(--shadow-lg)' : 'none',
          backdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'blur(0px)'
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        
        {/* LOGO */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div 
              initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)', position: 'absolute' }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              onClick={() => scrollTo('top')}
            >
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #f472b6)', boxShadow: '0 0 15px var(--primary)' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-serif)', letterSpacing: '-0.5px' }}>Tanvi</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DOCK ICONS */}
        <div className="dock-container" style={{ marginLeft: scrolled ? '0' : 'auto' }}>
          <DockIcon scrolled={scrolled} mouseX={mouseX} onClick={() => scrollTo('top')} icon={<HomeIcon />} label="Home" />
          <DockIcon scrolled={scrolled} mouseX={mouseX} onClick={() => scrollTo('work')} icon={<WorkIcon />} label="Work" />
          <DockIcon scrolled={scrolled} mouseX={mouseX} onClick={() => scrollTo('about')} icon={<UserIcon />} label="About" />
          <DockIcon scrolled={scrolled} mouseX={mouseX} onClick={() => scrollTo('playground')} icon={<GamepadIcon />} label="Playground" />
          
          <div className="dock-divider" />
          
          <DockIcon 
            scrolled={scrolled}
            mouseX={mouseX} 
            onClick={toggleTheme} 
            icon={
              <AnimatePresence mode="wait">
                {isNight ? (
                  <motion.div key="moon" initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90, opacity:0 }} transition={{ duration:0.2 }}>
                    <MoonIcon />
                  </motion.div>
                ) : (
                  <motion.div key="sun" initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90, opacity:0 }} transition={{ duration:0.2 }}>
                    <SunIcon />
                  </motion.div>
                )}
              </AnimatePresence>
            } 
            label="Theme" 
          />
          
          <DockIcon 
            scrolled={scrolled}
            mouseX={mouseX} 
            onClick={() => window.open('/resume.pdf', '_blank')} 
            icon={<FileIcon />} 
            label="Resume" 
          />
        </div>

      </motion.div>
    </>
  );
}
