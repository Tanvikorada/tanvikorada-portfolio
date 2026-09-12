'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 'ai-compiler',
    title: 'AppCompiler',
    tags: ['React', 'Next.js', 'LLVM', 'OpenAI'],
    bullets: [
      'Designed and engineered an LLM-powered compiler that transforms natural language directly into deployable web apps',
      'Architected a highly scalable microservice backend using Docker and Kubernetes to securely isolate execution environments',
      'Integrated advanced prompt engineering and RAG for zero-shot bug fixing and self-healing code compilation',
    ],
    url: 'https://github.com/tanvikorada/appcompiler',
    image: '/images/appcompiler.png',
    color: '#0f172a',
    textDark: false
  },
  {
    id: 'satyalabel',
    title: 'SatyaLabel',
    tags: ['Gemini Vision', 'Next.js', 'PostgreSQL', 'SIH 2026'],
    bullets: [
      'AI Compliance Checker built for Ministry of Consumer Affairs; placed 8th in SRMIST SIH round',
      'Scans packaged product labels via OCR and validates mandatory declarations against rules',
      'Mobile-first PWA on a zero-cost stack using Tesseract OCR with Gemini Vision as fallback',
    ],
    url: 'https://satyalabel.vercel.app',
    image: '/images/satyalabel.png',
    color: '#eff6ff',
    textDark: true
  },
  {
    id: 'trackr',
    title: 'TrackR',
    tags: ['SvelteKit', 'PostgreSQL', 'Tailwind', 'Groq'],
    bullets: [
      'AI-Powered full-stack tracker to organize and visualize daily job applications centrally',
      'Automated digest generation and pipeline status updates via Groq LLaMA 3.3',
      'Scheduled cron jobs trigger Pushbullet push notifications for daily productivity nudges',
    ],
    url: 'https://trackr-by-tanvi.vercel.app',
    image: '/images/trackr.png',
    color: '#fef3c7',
    textDark: true
  },
  {
    id: 'physio',
    title: 'Physio',
    tags: ['MediaPipe', 'Groq', 'React Three Fiber', 'PWA'],
    bullets: [
      'Real-time exercise form correction via phone camera using MediaPipe pose estimation',
      'Detects compensatory movement patterns and rep-by-rep form degradation in-browser',
      'Interactive 3D exercise demonstrations with react-three-fiber alongside live camera',
    ],
    url: 'https://physio-by-tanvi.vercel.app',
    image: '/images/physio.png',
    color: '#dcfce7',
    textDark: true
  },
];

function ProjectCard({ project, i, progress, range, targetScale }) {
  const containerRef = useRef(null);
  
  // As the user scrolls past this card, it scales down slightly and pushes back
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={containerRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0 }}>
      <motion.div 
        className="premium-card"
        style={{ 
          scale,
          top: `calc(-10% + ${i * 25}px)`,
          background: project.color,
          color: project.textDark ? '#1a202c' : '#ffffff',
          position: 'relative',
          width: '90vw',
          maxWidth: '1200px',
          height: '75vh',
          borderRadius: '32px',
          padding: '64px',
          display: 'flex',
          flexDirection: 'row',
          gap: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}
      >
        {/* Left Side: Content */}
        <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: 0.6, letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
              0{i + 1}
            </p>
            <motion.a 
              href={project.url} target="_blank" rel="noopener noreferrer"
              className="premium-btn"
              style={{
                background: project.textDark ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                color: 'inherit',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              &#8599;
            </motion.a>
          </div>
          
          <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '24px', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {project.id === 'physio' ? 'Your personal rehab assistant.' : project.title}
          </h3>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {project.bullets.map((b, idx) => (
              <li key={idx} style={{ fontSize: '1.1rem', opacity: 0.8, display: 'flex', gap: '12px', lineHeight: 1.6 }}>
                <span style={{ opacity: 0.5 }}>&bull;</span>
                {b}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontSize: '13px', fontWeight: 600, padding: '8px 16px', borderRadius: '100px', background: project.textDark ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Media */}
        <div className="premium-media" style={{ flex: '1 1 50%', position: 'relative', borderRadius: '24px', overflow: 'hidden', background: 'rgba(0,0,0,0.1)' }}>
           <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section id="work" ref={containerRef} style={{ position: 'relative', background: 'transparent' }}>
      <div style={{ padding: '120px 4vw 40px', textAlign: 'center' }}>
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '24px' }}
        >
          Selected Work
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}
        >
          Case Studies
        </motion.h2>
      </div>

      <div style={{ position: 'relative', paddingBottom: '10vh' }}>
        {projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return (
            <ProjectCard 
              key={project.id} 
              i={i} 
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

