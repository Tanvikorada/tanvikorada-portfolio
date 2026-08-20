'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import GlassBuilding from './GlassBuilding';

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
           <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
             <GlassBuilding progress={scrollYProgress} />
           </Canvas>
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
