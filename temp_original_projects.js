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
      <SpotlightCard 
        className="project-card"
        style={{ scale, top: `calc(-10% + ${i * 25}px)` }}
      >
        <div className="project-content-side">
          <div className="project-tags">
            {project.tags.map(t => (
              <span key={t} className="project-tag">{t}</span>
            ))}
          </div>
          <h2 className="project-title">{project.title}</h2>
          <ul className="project-bullets">
            {project.bullets.map((b, idx) => (
              <li key={idx}>
                <span className="bullet-dot" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {project.url !== '#' && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label={`View live demo for ${project.title}`}
            >
              Live Demo
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M1 13 L13 1 M6 1 H13 V8" />
              </svg>
            </a>
          )}
        </div>
        
        <div className="project-image-side" style={{ padding: '0', background: 'var(--bg-surface)', position: 'relative' }}>
          <PixelSwap
            firstContent={
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', flexDirection: 'column', gap: '10px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Hover to Reveal</span>
              </div>
            }
            secondContent={
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            }
            pixelSize={64}
            gap={0}
            pixelRadius={0}
            pixelSpin={0}
            pixelScale={0.35}
            duration={900}
            pixelDuration={400}
            pattern="random"
            randomness={1}
            fade={true}
            trigger="hover"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </SpotlightCard>
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



