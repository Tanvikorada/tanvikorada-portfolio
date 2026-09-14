'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, User, Gamepad2, FileText } from 'lucide-react';

// Theme toggler component with morphing animation
const AnimatedThemeIcon = ({ isNight }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ overflow: 'visible' }}
    >
      <mask id="theme-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <motion.circle
          initial={false}
          animate={{ cx: isNight ? 15 : 24, cy: isNight ? 9 : 4, r: 8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          fill="black"
        />
      </mask>
      <motion.g
        initial={false}
        animate={{ rotate: isNight ? -90 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.circle
          cx="12"
          cy="12"
          mask="url(#theme-mask)"
          fill="currentColor"
          initial={false}
          animate={{
            r: isNight ? 8 : 5,
            fillOpacity: isNight ? 0.6 : 0.8
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <motion.g
          stroke="currentColor"
          initial={false}
          animate={{
            scale: isNight ? 0 : 1,
            opacity: isNight ? 0 : 1
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.g>
    </svg>
  );
};


// --- DOCK ITEM (Magnifying effect) ---
function DockIcon({ mouseX, onClick, icon, label, scrolled }) {
  const ref = useRef(null);

  // Using getBoundingClientRect() which is relative to the viewport.
  // mouseX is set to e.clientX (also relative to viewport).
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
        <motion.div style={{ 
          scale: useTransform(width, [baseWidth, hoverWidth], [1, 1.35]),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-heading)'
        }}>
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

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
                      top 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
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
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
        }
        
        body.night .dock-icon-btn {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .dock-icon-btn:hover {
          background: var(--primary-glow, rgba(0,210,255,0.15));
          border-color: var(--primary);
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
        // CRITICAL FIX: use clientX so it works identically regardless of scroll position!
        onMouseMove={(e) => mouseX.set(e.clientX)}
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
          <DockIcon scrolled={scrolled} mouseX={mouseX} onClick={() => scrollTo('top')} icon={<Home strokeWidth={2.5} size={24} />} label="Home" />
          <DockIcon scrolled={scrolled} mouseX={mouseX} onClick={() => scrollTo('work')} icon={<Briefcase strokeWidth={2.5} size={24} />} label="Work" />
          <DockIcon scrolled={scrolled} mouseX={mouseX} onClick={() => scrollTo('about')} icon={<User strokeWidth={2.5} size={24} />} label="About" />
          <DockIcon scrolled={scrolled} mouseX={mouseX} onClick={() => scrollTo('playground')} icon={<Gamepad2 strokeWidth={2.5} size={24} />} label="Playground" />
          
          <div className="dock-divider" />
          
          <DockIcon 
            scrolled={scrolled}
            mouseX={mouseX} 
            onClick={toggleTheme} 
            icon={<AnimatedThemeIcon isNight={isNight} />} 
            label="Theme" 
          />
          
          <DockIcon 
            scrolled={scrolled}
            mouseX={mouseX} 
            onClick={() => window.open('/resume.pdf', '_blank')} 
            icon={<FileText strokeWidth={2.5} size={24} />} 
            label="Resume" 
          />
        </div>

      </motion.div>
    </>
  );
}
