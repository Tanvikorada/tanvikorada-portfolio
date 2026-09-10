'use client';
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const CSSBook = () => (
  <div style={{ width: '180px', height: '240px', position: 'relative', transformStyle: 'preserve-3d', transform: 'rotateX(-20deg) rotateY(-30deg)' }} className="css-3d-model">
    {/* Book Spine */}
    <div style={{ position: 'absolute', left: 0, top: 0, width: '40px', height: '240px', background: 'linear-gradient(to right, #0f3a2c, #0a2e21)', transformOrigin: 'left', transform: 'rotateY(-90deg)', border: '1px solid #0a2e21', borderRadius: '4px 0 0 4px' }}></div>
    {/* Book Front */}
    <div style={{ position: 'absolute', left: 0, top: 0, width: '180px', height: '240px', background: 'linear-gradient(135deg, #124734, #0f3a2c)', transformOrigin: 'left', transform: 'translateZ(40px)', border: '1px solid #1a5944', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 5px 5px 15px rgba(0,0,0,0.3)' }}>
      <div style={{ width: '85%', height: '85%', border: '2px solid rgba(52, 211, 153, 0.2)', borderRadius: '4px', display: 'flex', flexDirection: 'column', padding: '20px', gap: '10px' }}>
         <div style={{ width: '40%', height: '8px', background: 'rgba(52, 211, 153, 0.3)', borderRadius: '4px' }}></div>
         <div style={{ width: '70%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}></div>
      </div>
    </div>
    {/* Book Back */}
    <div style={{ position: 'absolute', left: 0, top: 0, width: '180px', height: '240px', background: '#0a2e21', transformOrigin: 'left', transform: 'translateZ(0px)', border: '1px solid #1a5944' }}></div>
    {/* Book Top Pages */}
    <div style={{ position: 'absolute', left: 0, top: 0, width: '180px', height: '40px', background: '#f5f5dc', transformOrigin: 'top', transform: 'rotateX(90deg)', border: '1px solid #e5e5cb', backgroundSize: '100% 2px', backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)' }}></div>
    {/* Book Bottom Pages */}
    <div style={{ position: 'absolute', left: 0, bottom: 0, width: '180px', height: '40px', background: '#e8e8d1', transformOrigin: 'bottom', transform: 'rotateX(-90deg) translateZ(40px)', border: '1px solid #e5e5cb', backgroundSize: '100% 2px', backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)' }}></div>
    {/* Book Right Pages */}
    <div style={{ position: 'absolute', right: 0, top: 0, width: '40px', height: '240px', background: '#fafaf0', transformOrigin: 'right', transform: 'rotateY(90deg)', border: '1px solid #e5e5cb', backgroundSize: '100% 3px', backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)' }}></div>
  </div>
);

const CSSAtom = () => (
  <div style={{ width: '200px', height: '200px', position: 'relative', transformStyle: 'preserve-3d', transform: 'rotateX(-20deg) rotateY(15deg)' }} className="css-3d-model atom-model">
    
    {/* Glowing Core (Nucleus) */}
    <div style={{ 
      position: 'absolute', 
      top: '50%', left: '50%', 
      width: '40px', height: '40px', 
      transform: 'translate(-50%, -50%)',
      background: 'radial-gradient(circle, #fff, #38bdf8, #0284c7)', 
      borderRadius: '50%', 
      boxShadow: '0 0 30px #38bdf8, 0 0 60px #0284c7',
      animation: 'pulse 2s ease-in-out infinite alternate'
    }}></div>

    {/* Orbit 1 */}
    <div style={{
      position: 'absolute',
      top: '0', left: '0', right: '0', bottom: '0',
      border: '2px solid rgba(56, 189, 248, 0.3)',
      borderRadius: '50%',
      transformStyle: 'preserve-3d',
      transform: 'rotateX(75deg) rotateY(0deg)',
      animation: 'spin-orbit 8s linear infinite'
    }}>
      {/* Electron */}
      <div style={{ position: 'absolute', top: '-6px', left: '50%', width: '12px', height: '12px', background: '#38bdf8', borderRadius: '50%', transform: 'translateX(-50%) rotateX(-75deg)', boxShadow: '0 0 10px #38bdf8' }}></div>
    </div>

    {/* Orbit 2 */}
    <div style={{
      position: 'absolute',
      top: '0', left: '0', right: '0', bottom: '0',
      border: '2px solid rgba(56, 189, 248, 0.3)',
      borderRadius: '50%',
      transformStyle: 'preserve-3d',
      transform: 'rotateX(75deg) rotateY(60deg)',
      animation: 'spin-orbit 8s linear infinite reverse'
    }}>
      <div style={{ position: 'absolute', top: '-6px', left: '50%', width: '12px', height: '12px', background: '#38bdf8', borderRadius: '50%', transform: 'translateX(-50%) rotateX(-75deg)', boxShadow: '0 0 10px #38bdf8' }}></div>
    </div>

    {/* Orbit 3 */}
    <div style={{
      position: 'absolute',
      top: '0', left: '0', right: '0', bottom: '0',
      border: '2px solid rgba(56, 189, 248, 0.3)',
      borderRadius: '50%',
      transformStyle: 'preserve-3d',
      transform: 'rotateX(75deg) rotateY(120deg)',
      animation: 'spin-orbit-slow 10s linear infinite'
    }}>
      <div style={{ position: 'absolute', top: '-6px', left: '50%', width: '12px', height: '12px', background: '#38bdf8', borderRadius: '50%', transform: 'translateX(-50%) rotateX(-75deg)', boxShadow: '0 0 10px #38bdf8' }}></div>
    </div>
  </div>
);

const CSSServer = () => (
  <div style={{ width: '160px', height: '280px', position: 'relative', transformStyle: 'preserve-3d', transform: 'rotateX(-15deg) rotateY(-35deg)' }} className="css-3d-model">
    {[0, 1, 2].map((layer) => (
      <div key={layer} style={{ position: 'absolute', bottom: layer * 95, left: 0, width: '160px', height: '90px', transformStyle: 'preserve-3d' }}>
        {/* Front */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #18181b, #09090b)', border: '1px solid #3f3f46', transform: 'translateZ(80px)', display: 'flex', alignItems: 'center', padding: '15px', borderRadius: '6px', boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)' }}>
           
           {/* Drive bays */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginRight: '15px' }}>
              <div style={{ width: '40px', height: '12px', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '2px' }}></div>
              <div style={{ width: '40px', height: '12px', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '2px' }}></div>
           </div>

           {/* LEDs */}
           <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#c9961a', boxShadow: '0 0 12px #c9961a', animation: `blink ${1 + layer*0.4}s infinite` }}></div>
           <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 12px #3b82f6', marginLeft: '12px', animation: `blink ${1.2 + layer*0.2}s infinite` }}></div>
           
           {/* Grill */}
           <div style={{ marginLeft: 'auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
              {Array.from({length: 12}).map((_, i) => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#000' }}></div>)}
           </div>
        </div>
        {/* Back */}
        <div style={{ position: 'absolute', inset: 0, background: '#09090b', border: '1px solid #27272a', transform: 'rotateY(180deg) translateZ(80px)', borderRadius: '6px' }}></div>
        {/* Left */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '160px', height: '90px', background: '#131316', border: '1px solid #3f3f46', transform: 'rotateY(-90deg) translateZ(80px)' }}></div>
        {/* Right */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '160px', height: '90px', background: '#131316', border: '1px solid #3f3f46', transform: 'rotateY(90deg) translateZ(80px)' }}></div>
        {/* Top */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '160px', height: '160px', background: '#27272a', border: '1px solid #3f3f46', transform: 'rotateX(90deg) translateZ(80px)' }}></div>
        {/* Bottom */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '160px', height: '160px', background: '#09090b', border: '1px solid #27272a', transform: 'rotateX(-90deg) translateZ(80px)' }}></div>
      </div>
    ))}
  </div>
);

const EDUCATION_DATA = [
  {
    institution: 'Ravindra Bharathi School',
    degree: 'Class X, BSEAP',
    timeline: '2022',
    score: 'Score: 88%',
    color: '#34d399', // Emerald
    component: CSSBook
  },
  {
    institution: 'Tirumala Junior College',
    degree: 'Class XII (MPC), BIEAP',
    timeline: '2024',
    score: 'Score: 95.2%',
    color: '#60a5fa', // Blue
    component: CSSAtom
  },
  {
    institution: 'SRMIST Chennai',
    degree: 'B.Tech, CSE (Cloud Computing)',
    timeline: '2024 - 2028',
    score: 'CGPA: 9.27 / 10',
    color: '#c9961a', // Gold
    component: CSSServer
  }
];

export default function Education() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Derive active index from scroll progress (0 to 1) across the 400vh container
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveIndex(0);
    } else if (latest >= 0.33 && latest < 0.66) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  return (
    <section 
      id="education" 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '400vh', // 400vh gives 100vh for each of the 3 items to scroll past, plus 100vh for entering/exiting
        background: 'var(--bg-main)',
      }}
    >
      {/* Sticky Container locked to viewport */}
      <div 
        className="edu-sticky-container" 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          display: 'flex', 
          flexWrap: 'wrap', 
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Left Side: Text Cards Crossfading */}
        <div 
          className="edu-text-container"
          style={{ 
            flex: '1 1 50%', 
            padding: '10vh 5vw', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10
          }}
        >
          <h2 className="section-title" style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', position: 'absolute', top: '10vh' }}>
            Education<span style={{ color: 'var(--primary)' }}>.</span>
          </h2>
          
          <div style={{ position: 'relative', width: '100%', height: '350px', marginTop: '10vh' }}>
            {/* Ambient Ambient Glow */}
            <AnimatePresence mode="wait">
               <motion.div
                 key={`glow-${activeIndex}`}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 0.15, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 transition={{ duration: 1 }}
                 style={{
                   position: 'absolute',
                   top: '10%',
                   left: '10%',
                   width: '80%',
                   height: '80%',
                   background: `radial-gradient(circle, ${EDUCATION_DATA[activeIndex].color} 0%, transparent 70%)`,
                   filter: 'blur(60px)',
                   zIndex: -1,
                   pointerEvents: 'none'
                 }}
               />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="ultra-premium-card"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: 'var(--nav-bg)',
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: '1px solid var(--border)',
                  borderTop: `1px solid var(--border-mid)`,
                  borderLeft: `1px solid var(--border-mid)`,
                  borderRadius: '32px',
                  padding: '50px',
                  width: '100%',
                  maxWidth: '600px',
                  boxShadow: 'var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.1), inset 1px 0 0 rgba(255,255,255,0.05)',
                  overflow: 'hidden'
                }}
              >
                {/* Noise Texture Overlay */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.15, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
                
                {/* Animated Gradient Accent Top Edge */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '1px', background: `linear-gradient(90deg, transparent, ${EDUCATION_DATA[activeIndex].color}, transparent)`, opacity: 0.8 }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 className="edu-inst" style={{ fontSize: '2.6rem', color: 'var(--text-heading)', marginBottom: '16px', fontFamily: 'var(--font-serif)', letterSpacing: '-0.03em', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>{EDUCATION_DATA[activeIndex].institution}</h3>
                  <div className="edu-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px', color: 'var(--text-muted)', fontSize: '1.25rem' }}>
                    <span className="edu-deg" style={{ fontWeight: 500, color: 'var(--text-body)' }}>{EDUCATION_DATA[activeIndex].degree}</span>
                    {EDUCATION_DATA[activeIndex].timeline && <span className="edu-time" style={{ opacity: 0.7 }}>• {EDUCATION_DATA[activeIndex].timeline}</span>}
                  </div>
                  <div className="edu-score" style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    padding: '12px 24px', 
                    background: `linear-gradient(135deg, ${EDUCATION_DATA[activeIndex].color}15, ${EDUCATION_DATA[activeIndex].color}05)`, 
                    border: `1px solid ${EDUCATION_DATA[activeIndex].color}33`,
                    borderTop: `1px solid ${EDUCATION_DATA[activeIndex].color}66`,
                    color: EDUCATION_DATA[activeIndex].color, 
                    borderRadius: '16px', 
                    fontWeight: '600', 
                    fontSize: '1.2rem',
                    boxShadow: `0 8px 32px ${EDUCATION_DATA[activeIndex].color}15, inset 0 2px 10px ${EDUCATION_DATA[activeIndex].color}11`,
                    backdropFilter: 'blur(10px)'
                  }}>
                    <span style={{ filter: `drop-shadow(0 0 8px ${EDUCATION_DATA[activeIndex].color})` }}>{EDUCATION_DATA[activeIndex].score}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Pure CSS 3D Canvas */}
        <div 
          className="edu-canvas-container"
          style={{ 
            flex: '1 1 50%', 
            height: '100%', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px',
            pointerEvents: 'none'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90, z: -200 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90, z: -200 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {(() => {
                const ActiveComponent = EDUCATION_DATA[activeIndex].component;
                return <ActiveComponent />;
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotateX(-15deg) rotateY(-25deg); }
          50% { transform: translateY(-20px) rotateX(-20deg) rotateY(-20deg); }
          100% { transform: translateY(0px) rotateX(-15deg) rotateY(-25deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .css-3d-model {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
