'use client';
import { useEffect, useRef } from 'react';

const PROJECTS = [
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
    color: '#f3f0ff',
    colorDark: '#1a1526',
    imageBg: '#f0ebff',
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
    color: '#f0fdf4',
    colorDark: '#0f1f15',
    imageBg: '#e8f7ee',
    reverse: true,
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
    color: '#fef9ee',
    colorDark: '#1f1a0e',
    imageBg: '#fdf3d0',
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
    color: '#eff6ff',
    colorDark: '#0f1a2e',
    imageBg: '#dbeafe',
    reverse: true,
  },
];

function ProjectCard({ project, zIndex }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.style.transform = 'scale(1) translateY(0)';
          card.style.opacity = '1';
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'sticky', top: '80px', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex, padding: '20px' }}>
      <div
        ref={cardRef}
        className={`project-card${project.reverse ? ' reverse' : ''}`}
        style={{ transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s', opacity: 0 }}
      >
        {/* Image side */}
        <div
          className="project-image-side"
          style={{ background: project.imageBg }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '12px',
          }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '64px',
              opacity: 0.15,
              userSelect: 'none',
              color: 'var(--text-heading)',
            }}>
              {project.title[0]}
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              opacity: 0.7,
            }}>
              {project.id}.vercel.app
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="project-content-side">
          <div className="project-tags">
            {project.tags.map(t => (
              <span key={t} className="project-tag">{t}</span>
            ))}
          </div>
          <h2 className="project-title">{project.title}</h2>
          <ul className="project-bullets">
            {project.bullets.map((b, i) => (
              <li key={i}>
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
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="projects-section" style={{ position: 'relative' }}>
      <div className="section" style={{ paddingBottom: 0 }}>
        <p className="section-eyebrow">Selected Work</p>
      </div>
      <div style={{ position: 'relative' }}>
        {PROJECTS.map((p, i) => (
          <div key={p.id} style={{ height: 'calc(100vh + 120px)' }}>
            <ProjectCard project={p} zIndex={i + 1} />
          </div>
        ))}
      </div>
    </section>
  );
}
