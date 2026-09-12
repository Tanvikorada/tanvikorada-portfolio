'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import ClickSpark from './ui/ClickSpark';
import { useRef } from 'react';
import SpotlightCard from './ui/SpotlightCard';

import RippleDistortion from './ui/RippleDistortion';

const AI_SKILLS = ['OpenAI API', 'Groq API', 'Claude API', 'Gemini API', 'LangChain', 'LangGraph', 'MediaPipe', 'YOLO', 'Computer Vision', 'Prompt Engineering'];
const FRONTEND = ['React', 'Next.js', 'Tailwind CSS', 'Three.js (R3F)', 'HTML/CSS'];
const BACKEND = ['Node.js', 'REST APIs', 'Next.js API Routes', 'Python'];
const DATABASES = ['PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'Upstash Redis'];
const CLOUD = ['AWS', 'Vercel', 'Render', 'Railway', 'Docker', 'Git'];

function TiltCard({ children, className = "", style = {} }) {
  return (
    <SpotlightCard 
      className={`bento-card ${className}`}
      style={style}
    >
      {children}
    </SpotlightCard>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const floatY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" className="about-section" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        .superb-status {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(20, 83, 45, 0.2) 100%);
          border: 1px solid rgba(34, 197, 94, 0.3);
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.1);
        }
        .superb-status::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: conic-gradient(transparent, rgba(34, 197, 94, 0.4), transparent 30%);
          animation: rotateGlow 4s linear infinite;
          opacity: 0.5;
        }
        .superb-status::after {
          content: '';
          position: absolute;
          inset: 2px;
          background: var(--bg-surface);
          border-radius: inherit;
          z-index: 0;
        }
        @keyframes rotateGlow {
          100% { transform: rotate(360deg); }
        }
        .status-content {
          position: relative;
          z-index: 1;
        }
        .pulse-dot {
          width: 12px; height: 12px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e;
          animation: pulseGreen 2s infinite;
        }
        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(34,197,94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94, 0); }
        }
      `}</style>

      {/* Floating abstract decorative elements */}
      <motion.div style={{ position: 'absolute', top: '10%', left: '5%', y: floatY1, rotate: floatRotate, fontSize: '4rem', opacity: 0.1, pointerEvents: 'none' }}>
        ✧
      </motion.div>
      <motion.div style={{ position: 'absolute', bottom: '20%', right: '5%', y: floatY2, rotate: floatRotate, fontSize: '6rem', opacity: 0.05, pointerEvents: 'none' }}>
        ✦
      </motion.div>

      <p className="section-eyebrow">About Me</p>

      <ClickSpark
        sparkColor="rgba(147, 51, 234, 0.8)"
        sparkSize={12}
        sparkRadius={25}
        sparkCount={8}
        duration={500}
      >
      <div className="bento-grid">
        {/* Photo Tile */}
        <TiltCard className="bento-photo" style={{ padding: 0, overflow: 'hidden', minHeight: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RippleDistortion
            src="/images/about-profile.jpg"
            grayscale={true}
            swirl={1}
            strength={0.25}
            alignY={1.0}
            trigger="hover"
            style={{ position: 'absolute', inset: 0 }}
          />
        </TiltCard>

        {/* Bio */}
        <TiltCard className="bento-bio">
          <p className="bento-label">Who I am</p>
          <h2 className="bento-name">Korada Tanvi</h2>
          <p className="bento-body">
            B.Tech CSE (Cloud Computing) student at SRMIST Chennai with a CGPA of 9.27/10. I build and ship full-stack AI-native web products using React, Next.js, Node.js, and LLM APIs. Published first-author research on LLM pipeline architecture. Currently freelancing and building in public.
          </p>
        </TiltCard>

        {/* Status */}
        <TiltCard className="bento-status superb-status" style={{ padding: '32px' }}>
          <div className="status-content">
            <p className="bento-label" style={{ marginBottom: '24px' }}>Availability</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div className="pulse-dot" />
              <span style={{ fontWeight: 800, color: 'var(--text-heading)', fontSize: '24px', letterSpacing: '-0.5px' }}>Open to Work</span>
            </div>
            <p className="bento-body" style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
              Looking for Internships, Full-time roles, or Freelance collaborations. Let's build something extraordinary.
            </p>
            <div style={{ marginTop: '24px', padding: '12px 16px', background: 'var(--border)', borderRadius: '12px', display: 'inline-block' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-heading)', margin: 0, fontWeight: 600 }}>
                tanvikorada@gmail.com
              </p>
            </div>
          </div>
        </TiltCard>

        {/* Stats */}
        <TiltCard className="bento-stat" style={{ textAlign: 'center' }}>
          <div className="bento-stat-num">9.27</div>
          <div className="bento-stat-label">CGPA / 10</div>
        </TiltCard>
        <TiltCard className="bento-stat" style={{ textAlign: 'center' }}>
          <div className="bento-stat-num">6+</div>
          <div className="bento-stat-label">Projects Shipped</div>
        </TiltCard>
        <TiltCard className="bento-stat" style={{ textAlign: 'center' }}>
          <div className="bento-stat-num">1</div>
          <div className="bento-stat-label">Research Paper</div>
        </TiltCard>
        <TiltCard className="bento-stat" style={{ textAlign: 'center' }}>
          <div className="bento-stat-num">4+</div>
          <div className="bento-stat-label">Internships</div>
        </TiltCard>

        {/* Skills */}
        <TiltCard className="bento-skills">
          <p className="bento-label">AI & GenAI</p>
          <div style={{ marginBottom: '16px' }}>
            {AI_SKILLS.map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
          <p className="bento-label">Frontend</p>
          <div style={{ marginBottom: '16px' }}>
            {FRONTEND.map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
          <p className="bento-label">Backend & DB</p>
          <div>
            {[...BACKEND, ...DATABASES].map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
        </TiltCard>

        {/* Location */}
        <TiltCard className="bento-location" style={{ background: 'var(--bg-surface)' }}>
          <div style={{ position: 'absolute', right: '-20px', top: '10px', opacity: 0.1, transform: 'scale(1.5)', pointerEvents: 'none' }}>
            <img src="/globe.svg" alt="Globe" width="150" height="150" />
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p className="bento-label">Location</p>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{ display: 'inline-block', marginBottom: '16px', background: 'var(--border)', padding: '12px', borderRadius: '50%' }}
            >
              <img src="/globe.svg" alt="Globe Map" width="40" height="40" style={{ display: 'block', opacity: 0.8 }} />
            </motion.div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 800, color: 'var(--text-heading)' }}>Chennai</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px' }}>India — Tamil Nadu</div>
            <div style={{ marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '100px', display: 'inline-block' }}>
              SRMIST — 2024 - 2028
            </div>
          </div>
        </TiltCard>

        {/* Clubs & Roles */}
        <TiltCard className="bento-fun">
          <p className="bento-label">Clubs & Roles</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <motion.div whileHover={{ x: 5, color: 'var(--accent)' }} style={{ transition: 'color 0.2s' }}>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>✦ Camogenics</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Photographer, Film Society (Winner: 'Saving Nature')</div>
            </motion.div>
            <motion.div whileHover={{ x: 5, color: 'var(--accent)' }} style={{ transition: 'color 0.2s' }}>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>✦ Andropedia</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Media Team Member</div>
            </motion.div>
            <motion.div whileHover={{ x: 5, color: 'var(--accent)' }} style={{ transition: 'color 0.2s' }}>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>✦ SlugNPlug</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Hardware & Systems Club</div>
            </motion.div>
          </div>
        </TiltCard>
      </div>
      </ClickSpark>
    </section>
  );
}
