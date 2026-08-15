'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECTS = [
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
    image: '/images/physio.png', // The user uploaded physio as a png!
    color: '#f0fdf4',
  },
  {
    id: 'appcompiler',
    title: 'AppCompiler',
    tags: ['Next.js', 'LLM Pipeline', 'OpenAI', 'Research'],
    bullets: [
      '4-stage LLM pipeline converting natural language into complete DB, API, UI & Auth schemas',
      'Custom repair engine that fixes inconsistent schema layers without full retry',
      'Published first-author research paper — DOI 10.5281/zenodo.20644045 · 85–90% success rate',
    ],
    url: 'https://appcompiler-ten.vercel.app',
    image: '/images/appcompiler.jpg',
    color: '#f3f0ff',
  },
  {
    id: 'studentos',
    title: 'StudentOS',
    tags: ['Groq LLaMA', 'OpenAI', 'Hackathon', 'Next.js'],
    bullets: [
      'Built solo in 7 days for OpenAI × Outskill AI Builders Hackathon — Final Round',
      '19 AI-powered panels in one deployed full-stack app with sub-second Groq responses',
      'Full localStorage state persistence; shipped live on Vercel end-to-end',
    ],
    url: 'https://studentos-alpha.vercel.app',
    image: '/images/studentos.jpg',
    color: '#eff6ff',
  },
  {
    id: 'ingredientiq',
    title: 'IngredientIQ',
    tags: ['Gemini Vision', 'Supabase', 'React', 'PWA'],
    bullets: [
      'Scans food, cosmetic & household labels — scores ingredient safety across all categories',
      'Switched from Tesseract.js to Gemini Vision for dramatically higher extraction accuracy',
      'Migrated to Supabase PostgreSQL + Auth for persistent user accounts and scan history',
    ],
    url: 'https://ingredientiq-by-tanvi.vercel.app',
    image: '/images/ingredientiq.jpg',
    color: '#fef9ee',
  },
];

function ProjectCard({ project, i, progress, range, targetScale }) {
  const containerRef = useRef(null);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={containerRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0 }}>
      <motion.div 
        className="project-card"
        style={{ scale, top: `calc(-10% + ${i * 25}px)` }}
      >
        {/* Content Side */}
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
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Live Demo
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M1 13 L13 1 M6 1 H13 V8" />
            </svg>
          </a>
        </div>
        
        {/* Image Side */}
        <div className="project-image-side" style={{ padding: '0', background: 'var(--bg-surface)' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
