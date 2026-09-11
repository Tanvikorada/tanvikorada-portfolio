'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';
import HalftoneReveal from './ui/HalftoneReveal';

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
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c83636?q=80&w=1200&auto=format&fit=crop',
    color: '#eff6ff',
  },
  {
    id: 'shrimpcount',
    title: 'ShrimpCount',
    tags: ['Computer Vision', 'YOLO', 'Python', 'Freelance'],
    bullets: [
      'Automated YOLO-based computer vision system to estimate shrimp population density',
      'Designed data pipeline for model training on real hatchery image data',
      'Targeting deployment for MAS Aqua Techniks, a commercial shrimp hatchery',
    ],
    url: '#',
    image: 'https://images.unsplash.com/photo-1549615286-90b1464fb2bc?q=80&w=1200&auto=format&fit=crop',
    color: '#fef9ee',
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
          <HalftoneReveal
            src={project.image}
            mode="color"
            inkColor="#1c1917"
            paperColor="#fff9f1"
            dotDensity={80}
            revealRadius={0.4}
            borderRadius="0px"
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
