'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// SVGs
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const WorkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const GamepadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
);
const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);
const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
);

// DOCK ITEM (Magnifying effect)
function DockIcon({ mouseX, onClick, icon, label }) {
  const ref = useRef(null);

  // Distance from mouse to center of the icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale dimensions based on distance. [-150, 0, 150] is the hover radius
  // Base width: 48px. Max hovered width: 80px.
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div style={{ position: 'relative' }} className="dock-icon-wrapper">
      <motion.button
        ref={ref}
        onClick={onClick}
        style={{ width, height: width }}
        className="dock-icon-btn"
        aria-label={label}
      >
        <motion.div style={{ scale: useTransform(width, [48, 80], [1, 1.4]) }}>
          {icon}
        </motion.div>
      </motion.button>
      
      {/* Tooltip */}
      <div className="dock-tooltip">
        {label}
      </div>
    </div>
  );
}

export default function Nav() {
  const [isNight, setIsNight] = useState(true);
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
      <style>{`
        .dock-container {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 999px;
          background: var(--bg-surface);
          border: 1px solid var(--border-mid);
          box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.1);
          backdrop-filter: blur(24px) saturate(150%);
          -webkit-backdrop-filter: blur(24px) saturate(150%);
          transition: background 0.3s;
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
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          color: var(--text-heading);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }
        
        body:not(.night) .dock-icon-btn {
          background: rgba(0, 0, 0, 0.03);
        }

        .dock-icon-btn:hover {
          background: var(--primary-glow);
          border-color: var(--primary);
        }

        .dock-divider {
          width: 1px;
          height: 32px;
          background: var(--border-mid);
          margin: 0 4px;
        }

        .dock-tooltip {
          position: absolute;
          top: -44px;
          left: 50%;
          transform: translateY(10px) translateX(-50%);
          opacity: 0;
          pointer-events: none;
          background: var(--text-heading);
          color: var(--bg-solid);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          white-space: nowrap;
          box-shadow: var(--shadow-md);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .dock-tooltip::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 4px 4px 0;
          border-style: solid;
          border-color: var(--text-heading) transparent transparent transparent;
        }
        
        @media (max-width: 768px) {
          .dock-container {
            bottom: 16px;
            gap: 8px;
            padding: 8px 12px;
          }
        }
      `}</style>
      
      <motion.div 
        className="dock-container"
        initial={{ y: 100, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <DockIcon mouseX={mouseX} onClick={() => scrollTo('top')} icon={<HomeIcon />} label="Home" />
        <DockIcon mouseX={mouseX} onClick={() => scrollTo('work')} icon={<WorkIcon />} label="Work" />
        <DockIcon mouseX={mouseX} onClick={() => scrollTo('about')} icon={<UserIcon />} label="About" />
        <DockIcon mouseX={mouseX} onClick={() => scrollTo('playground')} icon={<GamepadIcon />} label="Playground" />
        
        <div className="dock-divider" />
        
        <DockIcon 
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
          mouseX={mouseX} 
          onClick={() => window.open('/resume.pdf', '_blank')} 
          icon={<FileIcon />} 
          label="Resume" 
        />
      </motion.div>
    </>
  );
}
