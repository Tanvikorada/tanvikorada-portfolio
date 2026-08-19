'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EDUCATION_DATA = [
  {
    institution: 'Ravindra Bharathi School',
    degree: 'Class X, BSEAP',
    timeline: '2022',
    score: 'Score: 88%',
    color: '#34d399' // Emerald
  },
  {
    institution: 'Tirumala Junior College',
    degree: 'Class XII (MPC), BIEAP',
    timeline: '2024',
    score: 'Score: 95.2%',
    color: '#60a5fa' // Blue
  },
  {
    institution: 'SRMIST Chennai',
    degree: 'B.Tech, CSE (Cloud Computing)',
    timeline: '2024 - 2028',
    score: 'CGPA: 9.27 / 10',
    color: '#c9961a' // Gold
  }
];

// A dynamic building component that morphs based on scroll progress (0 to 1)
function DynamicBuilding({ progress }) {
  // We'll map the progress (0 to 1) into dimensions and opacities.
  
  // Base building width grows from 120px to 200px to 320px
  const baseWidth = useTransform(progress, [0, 0.4, 0.5, 0.9, 1], [140, 140, 240, 240, 360]);
  const baseHeight = useTransform(progress, [0, 0.4, 0.5, 0.9, 1], [100, 100, 140, 140, 180]);
  
  // Roof morphs: Triangle (School) -> Flat/Columns (College) -> Dome (University)
  const roofOpacityTriangle = useTransform(progress, [0, 0.2, 0.4], [1, 1, 0]);
  const roofOpacityFlat = useTransform(progress, [0.3, 0.5, 0.7, 0.9], [0, 1, 1, 0]);
  const roofOpacityDome = useTransform(progress, [0.8, 1], [0, 1]);

  // Extra wings for the university
  const wingsOpacity = useTransform(progress, [0.8, 1], [0, 1]);
  const wingsWidth = useTransform(progress, [0.8, 1], [0, 460]);

  // Windows grow in number
  const windowsOpacityCollege = useTransform(progress, [0.4, 0.5], [0, 1]);
  const windowsOpacityUniv = useTransform(progress, [0.8, 1], [0, 1]);

  return (
    <div style={{ position: 'relative', width: '500px', height: '400px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'visible' }}>
      
      {/* 3. University Wings */}
      <motion.div style={{
        position: 'absolute',
        bottom: 0,
        height: '120px',
        width: wingsWidth,
        opacity: wingsOpacity,
        background: 'var(--border)',
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        border: '2px solid var(--text-muted)'
      }}>
        {/* Wing windows */}
        <div style={{ width: '40px', height: '60px', background: 'var(--text-muted)', borderRadius: '4px' }} />
        <div style={{ width: '40px', height: '60px', background: 'var(--text-muted)', borderRadius: '4px' }} />
      </motion.div>

      {/* Main Base Building */}
      <motion.div style={{
        position: 'relative',
        width: baseWidth,
        height: baseHeight,
        background: 'var(--text-body)',
        borderRadius: '4px 4px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '0',
        zIndex: 2,
        transition: 'background 0.3s'
      }}>
        
        {/* Door */}
        <div style={{ width: '40px', height: '60px', background: 'var(--bg-base)', borderRadius: '20px 20px 0 0', border: '2px solid var(--text-muted)' }} />

        {/* Windows - Base (School) */}
        <div style={{ position: 'absolute', top: '30px', display: 'flex', gap: '20px' }}>
          <div style={{ width: '24px', height: '24px', background: 'var(--bg-base)', borderRadius: '50%' }} />
          <div style={{ width: '24px', height: '24px', background: 'var(--bg-base)', borderRadius: '50%' }} />
        </div>

        {/* Windows - Level 2 (College) */}
        <motion.div style={{ position: 'absolute', top: '70px', display: 'flex', gap: '16px', opacity: windowsOpacityCollege }}>
           <div style={{ width: '20px', height: '30px', background: 'var(--bg-base)' }} />
           <div style={{ width: '20px', height: '30px', background: 'var(--bg-base)' }} />
           <div style={{ width: '20px', height: '30px', background: 'var(--bg-base)' }} />
           <div style={{ width: '20px', height: '30px', background: 'var(--bg-base)' }} />
        </motion.div>

        {/* Windows - Level 3 (University) */}
        <motion.div style={{ position: 'absolute', top: '120px', display: 'flex', gap: '24px', opacity: windowsOpacityUniv }}>
           <div style={{ width: '20px', height: '40px', background: 'var(--bg-base)', borderRadius: '10px 10px 0 0' }} />
           <div style={{ width: '20px', height: '40px', background: 'var(--bg-base)', borderRadius: '10px 10px 0 0' }} />
           <div style={{ width: '20px', height: '40px', background: 'var(--bg-base)', borderRadius: '10px 10px 0 0' }} />
           <div style={{ width: '20px', height: '40px', background: 'var(--bg-base)', borderRadius: '10px 10px 0 0' }} />
        </motion.div>

        {/* Roof - Triangle (School) */}
        <motion.div style={{
          position: 'absolute',
          top: '-60px',
          width: 0,
          height: 0,
          borderLeft: '80px solid transparent',
          borderRight: '80px solid transparent',
          borderBottom: '60px solid var(--text-muted)',
          opacity: roofOpacityTriangle
        }} />

        {/* Roof - Flat / Greek Pillars (College) */}
        <motion.div style={{
          position: 'absolute',
          top: '-40px',
          width: '110%',
          height: '40px',
          background: 'var(--text-muted)',
          opacity: roofOpacityFlat,
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'flex-end',
          paddingBottom: '5px'
        }}>
           {/* Mini pillars */}
           <div style={{ width: '8px', height: '20px', background: 'var(--bg-base)' }} />
           <div style={{ width: '8px', height: '20px', background: 'var(--bg-base)' }} />
           <div style={{ width: '8px', height: '20px', background: 'var(--bg-base)' }} />
           <div style={{ width: '8px', height: '20px', background: 'var(--bg-base)' }} />
        </motion.div>

        {/* Roof - Dome (University) */}
        <motion.div style={{
          position: 'absolute',
          top: '-80px',
          width: '160px',
          height: '80px',
          background: 'var(--text-muted)',
          borderTopLeftRadius: '80px',
          borderTopRightRadius: '80px',
          opacity: roofOpacityDome,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
           {/* Clock */}
           <div style={{ width: '30px', height: '30px', background: 'var(--gold)', borderRadius: '50%', border: '4px solid var(--bg-base)' }} />
        </motion.div>

      </motion.div>
    </div>
  );
}

export default function Education() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // The container is 300vh tall to allow scrolling.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll progress to horizontal translation of the cards
  // Progress 0 to 1 -> x moves from 0% to -66.66% (since we have 3 cards, 100vw each)
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section 
      id="education" 
      ref={containerRef} 
      style={{ 
        height: '300vh', // scroll distance
        position: 'relative',
        background: 'var(--bg-surface)'
      }}
    >
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          width: '100%', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        
        {/* Dynamic Background Animation (fixed in center) */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8, pointerEvents: 'none' }}>
           <DynamicBuilding progress={scrollYProgress} />
        </div>

        {/* Horizontal Scrolling Track */}
        <motion.div 
          style={{ 
            display: 'flex', 
            width: '300vw', // 3 cards * 100vw
            x: xTransform,
            alignItems: 'center',
            position: 'relative',
            zIndex: 10
          }}
        >
          {EDUCATION_DATA.map((edu, i) => {
            
            // Fade and scale each card as it approaches the center
            const centerProgress = i * 0.5; 
            
            // Clamp inputs to [0, 1] to prevent WAAPI animate offset errors
            let input, outputOpacity, outputScale;
            if (i === 0) {
              input = [0, 0.25];
              outputOpacity = [1, 0.2];
              outputScale = [1, 0.8];
            } else if (i === EDUCATION_DATA.length - 1) {
              input = [0.75, 1];
              outputOpacity = [0.2, 1];
              outputScale = [0.8, 1];
            } else {
              input = [centerProgress - 0.25, centerProgress, centerProgress + 0.25];
              outputOpacity = [0.2, 1, 0.2];
              outputScale = [0.8, 1, 0.8];
            }

            const opacity = useTransform(scrollYProgress, input, outputOpacity);
            const scale = useTransform(scrollYProgress, input, outputScale);

            return (
              <div key={i} style={{ width: '100vw', display: 'flex', justifyContent: 'center', padding: '0 5vw' }}>
                <motion.div 
                  className="edu-card"
                  style={{ 
                    opacity, 
                    scale, 
                    width: '100%', 
                    maxWidth: '500px',
                    borderTop: `4px solid ${edu.color}`,
                    marginTop: '300px' // push down below the building slightly
                  }}
                >
                  <h3 className="edu-inst" style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '8px' }}>{edu.institution}</h3>
                  <div className="edu-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px', color: 'var(--text-muted)' }}>
                    <span className="edu-deg" style={{ fontWeight: 600 }}>{edu.degree}</span>
                    {edu.timeline && <span className="edu-time">• {edu.timeline}</span>}
                  </div>
                  <div className="edu-score" style={{ display: 'inline-block', padding: '6px 12px', background: `${edu.color}22`, color: edu.color, borderRadius: '8px', fontWeight: 'bold' }}>
                    {edu.score}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Section Title overlay */}
        <div style={{ position: 'absolute', top: '10vh', left: '8vw' }}>
           <h2 className="section-title">Education Journey</h2>
        </div>
      </div>

      <style jsx>{`
        .edu-card {
          position: relative;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 32px;
        }
        :global(body.night) .edu-card {
          background: rgba(20, 20, 20, 0.6);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </section>
  );
}
