'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';
import PixelSwap from './ui/PixelSwap';

const PROJECTS = [
  {
    id: 'appcompiler',
    title: 'AppCompiler',
    tags: ['Next.js', 'LLM Pipeline', 'OpenAI', 'Research'],
    bullets: [
      '4-stage LLM pipeline converting natural language into complete DB, API, UI & Auth schemas',
      'Custom repair engine that fixes inconsistent schema layers without full retry',
      'Published first-author research paper - DOI 10.5281/zenodo.20644045 - 85-90% success rate',
    ],
    url: 'https://appcompiler-ten.vercel.app',
    image: '/images/appcompiler.jpg',
    color: '#f3f0ff',
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
  },
  {
      id: 'trackr',
      title: 'TrackR',
      tags: ['Next.js', 'Groq LLaMA 3.3', 'Upstash Redis', 'Automations'],
      bullets: [
        'AI-Powered full-stack tracker for managing internship and job applications centrally',
        'Automated digest generation and pipeline status updates via Groq LLaMA 3.3',
        'Scheduled cron jobs trigger Pushbullet push notifications for daily productivity nudges',
      ],
      url: 'https://trackr-by-tanvi.vercel.app',
      image: '/images/trackr.png',
      color: '#f8fafc',
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
    color: '#f0fdf4',
  },
];

function ProjectCard({ project, i, progress, range, targetScale }) {
  const containerRef = useRef(null);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={containerRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0 }}>
      <motion.div 
        style={{ 
          scale, 
          top: `calc(-10% + ${i * 25}px)`,
          width: '85vw',
          maxWidth: '1200px',
          height: '70vh',
          background: 'var(--bg-surface)',
          borderRadius: '32px',
          border: '1px solid var(--border-mid)',
          padding: '64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Minimalist Top Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
              0{i + 1}
            </p>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', lineHeight: 1, margin: 0 }}>
              {project.title}
            </h2>
          </div>
          {project.url !== '#' && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
                width: '64px', height: '64px', borderRadius: '50%', border: '1px solid var(--border)', 
                color: 'var(--text-heading)', textDecoration: 'none', transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--text-heading)'; e.currentTarget.style.color = 'var(--bg-surface)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-heading)'; }}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width="24" height="24">
                <path d="M1 13 L13 1 M6 1 H13 V8" />
              </svg>
            </a>
          )}
        </div>

        {/* Minimalist Bottom Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'end' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {project.tags.map(t => (
                <span key={t} style={{ fontSize: '12px', padding: '6px 14px', border: '1px solid var(--border-mid)', borderRadius: '100px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {t}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, maxWidth: '500px' }}>
              {project.bullets[0]}
            </p>
          </div>
          
          <div style={{ height: '250px', width: '100%', borderRadius: '16px', overflow: 'hidden', background: project.color }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'multiply' }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section id="work" ref={container} style={{ marginTop: '10vh' }}>
      <div className="section" style={{ position: 'sticky', top: 0, height: '100px', display: 'flex', alignItems: 'center', zIndex: 10 }}>
        <p className="section-eyebrow" style={{ fontSize: '2rem', margin: 0, paddingLeft: '8vw' }}>Selected Work</p>
      </div>
      <div style={{ position: 'relative' }}>
        {PROJECTS.map((project, i) => {
          const targetScale = 1 - ( (PROJECTS.length - i) * 0.05);
          return (
            <ProjectCard 
              key={project.id} 
              project={project} 
              i={i} 
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



