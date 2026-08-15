'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WORDS = ['Developer.', 'Builder.', 'Engineer.', 'Creator.'];

function SplitText({ text }) {
  return (
    <span>
      {text.split('').map((ch, i) => (
        <span key={i} className="split-letter" style={{ display: 'inline-block' }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

function WordRoller() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="word-roller" style={{ height: '1em', overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}>
      <motion.span
        className="word-roller-inner"
        animate={{ y: `-${index}em` }}
        transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 0.8 }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {WORDS.map((w, i) => (
          <span key={i} className="word-roller-item" style={{ height: '1em', display: 'flex', alignItems: 'center' }}>
            <SplitText text={w} />
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yText = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <section id="hero" className="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <motion.div className="hero-bg" style={{ y: yBg }} />
      <motion.div className="hero-bg-night" style={{ y: yBg }} />
      <div className="hero-stars" />

      {/* SVG Path for Paper Plane (To be wired in global layout or here) */}
      <svg className="scroll-path" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '200vh', top: '50%', left: 0, pointerEvents: 'none', zIndex: 0 }}>
        <path id="flight-path" d="M -10,50 Q 30,10 50,50 T 110,50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 4" />
      </svg>

      <motion.div 
        className="hero-content" 
        style={{ opacity: opacityText, y: yText, zIndex: 10, position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8vw' }}
      >
        <div style={{ flex: 1, paddingTop: '80px' }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hero-badge"
          >
            <span className="hero-badge-dot" />
            Chennai, India · Open to opportunities
          </motion.div>

          {/* Giant Title */}
          <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.04em', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
                Full-Stack
              </motion.div>
            </div>
            <div style={{ overflow: 'hidden', display: 'flex' }}>
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>
                AI&nbsp;
              </motion.div>
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}>
                <WordRoller />
              </motion.div>
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-subtitle" 
            style={{ marginTop: '24px', maxWidth: '500px', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}
          >
            Building AI-native web products at the intersection of great engineering and real-world impact.
            B.Tech CSE @ SRMIST.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: '32px', display: 'flex', gap: '16px' }}
          >
             <a href="#work" className="resume-btn" style={{ padding: '12px 24px', fontSize: '15px' }}>View Projects</a>
             <a href="/resume.pdf" target="_blank" className="nav-link" style={{ padding: '12px 24px', fontSize: '15px', border: '1px solid var(--border)' }}>Read Resume</a>
          </motion.div>
        </div>

        {/* Profile Photo on the Right */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
          style={{
            flex: 0.8,
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '40px'
          }}
        >
          <div style={{
            width: 'clamp(250px, 30vw, 400px)',
            aspectRatio: '3/4',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '8px solid rgba(255,255,255,0.1)',
            boxShadow: 'var(--shadow-lg)',
            transform: 'rotate(2deg)',
            background: 'var(--bg-surface)'
          }}>
            <img src="/images/profile.jpg" alt="Korada Tanvi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
        className="hero-scroll-hint" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}
      >
        <div style={{ width: '1px', height: '40px', background: 'var(--border-mid)', overflow: 'hidden' }}>
           <motion.div 
             animate={{ y: ['-100%', '100%'] }} 
             transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
             style={{ width: '100%', height: '50%', background: 'var(--text-heading)' }} 
           />
        </div>
        <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Scroll</span>
      </motion.div>
    </section>
  );
}
