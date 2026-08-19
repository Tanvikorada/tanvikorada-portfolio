'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AI_SKILLS = ['OpenAI API', 'Groq API', 'Claude API', 'Gemini API', 'LangChain', 'LangGraph', 'MediaPipe', 'YOLO', 'Computer Vision', 'Prompt Engineering'];
const FRONTEND = ['React', 'Next.js', 'Tailwind CSS', 'Three.js (R3F)', 'HTML/CSS'];
const BACKEND = ['Node.js', 'REST APIs', 'Next.js API Routes', 'Python'];
const DATABASES = ['PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'Upstash Redis'];
const CLOUD = ['AWS', 'Vercel', 'Render', 'Railway', 'Docker', 'Git'];

function TiltCard({ children, className = "", style = {} }) {
  return (
    <motion.div 
      className={`bento-card ${className}`}
      style={style}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
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
      
      {/* Floating abstract decorative elements */}
      <motion.div style={{ position: 'absolute', top: '10%', left: '5%', y: floatY1, rotate: floatRotate, fontSize: '4rem', opacity: 0.1, pointerEvents: 'none' }}>
        ✦
      </motion.div>
      <motion.div style={{ position: 'absolute', bottom: '20%', right: '5%', y: floatY2, rotate: floatRotate, fontSize: '6rem', opacity: 0.05, pointerEvents: 'none' }}>
        ❖
      </motion.div>

      <p className="section-eyebrow">About Me</p>

      <div className="bento-grid">
        {/* Bio */}
        <TiltCard className="bento-bio">
          <p className="bento-label">Who I am</p>
          <h2 className="bento-name">Korada Tanvi</h2>
          <p className="bento-body">
            B.Tech CSE (Cloud Computing) student at SRMIST Chennai with a CGPA of 9.27/10. I build and ship full-stack AI-native web products using React, Next.js, Node.js, and LLM APIs. Published first-author research on LLM pipeline architecture. Currently freelancing and building in public.
          </p>
        </TiltCard>

        {/* Status */}
        <TiltCard className="bento-status" style={{ background: 'linear-gradient(135deg, rgba(220, 252, 231, 0.8) 0%, rgba(187, 247, 208, 0.4) 100%)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
          <p className="bento-label">Status</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="status-dot" />
            <span style={{ fontWeight: 600, color: '#166534', fontSize: '15px' }}>Open to opportunities</span>
          </div>
          <p className="bento-body" style={{ fontSize: '13px' }}>
            Internships · Full-time · Freelance · Collabs
          </p>
          <p style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
            tanvikorada@gmail.com
          </p>
        </TiltCard>

        {/* Stats */}
        <TiltCard style={{ gridColumn: 'span 2', textAlign: 'center' }}>
          <div className="bento-stat-num">9.27</div>
          <div className="bento-stat-label">CGPA / 10</div>
        </TiltCard>
        <TiltCard style={{ gridColumn: 'span 2', textAlign: 'center' }}>
          <div className="bento-stat-num">6+</div>
          <div className="bento-stat-label">Projects Shipped</div>
        </TiltCard>
        <TiltCard style={{ gridColumn: 'span 2', textAlign: 'center' }}>
          <div className="bento-stat-num">1</div>
          <div className="bento-stat-label">Research Paper</div>
        </TiltCard>
        <TiltCard style={{ gridColumn: 'span 2', textAlign: 'center' }}>
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
        <TiltCard className="bento-location" style={{ background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.6) 0%, rgba(253, 230, 138, 0.3) 100%)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
          <p className="bento-label">Location</p>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ fontSize: '40px', marginBottom: '8px', display: 'inline-block' }}
          >
            📍
          </motion.div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--text-heading)' }}>Chennai</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>India · Tamil Nadu</div>
          <div style={{ marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
            SRMIST · 2024 – 2028
          </div>
        </TiltCard>

        {/* Clubs & Roles */}
        <TiltCard className="bento-fun">
          <p className="bento-label">Clubs & Roles</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <motion.div whileHover={{ x: 5, color: 'var(--accent)' }} style={{ transition: 'color 0.2s' }}>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>📸 Camogenics</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Photographer, Film Society (Winner: 'Saving Nature')</div>
            </motion.div>
            <motion.div whileHover={{ x: 5, color: 'var(--accent)' }} style={{ transition: 'color 0.2s' }}>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>📰 Andropedia</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Media Team Member</div>
            </motion.div>
            <motion.div whileHover={{ x: 5, color: 'var(--accent)' }} style={{ transition: 'color 0.2s' }}>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>🔌 SlugNPlug</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Hardware & Systems Club</div>
            </motion.div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
