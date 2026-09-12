'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
    color: '#e0e7ff', // subtle indigo
    textDark: true
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
    color: '#fce7f3', // subtle pink
    textDark: true
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
      color: '#fef3c7', // subtle amber
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
    color: '#dcfce7', // subtle green
    textDark: true
  },
];

function ProjectCard({ project, i }) {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8vh', position: 'relative' }}>
      <style>{`
        .premium-card {
          width: 85vw;
          max-width: 1200px;
          min-height: 70vh;
          border-radius: 40px;
          display: flex;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.4);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-card:hover {
          transform: translateY(-8px);
        }
        .premium-card:hover .project-img {
          transform: scale(1.05);
        }
        .premium-card:hover .live-demo-btn {
          background: #000;
          color: #fff;
          transform: scale(1.1);
        }
        .live-demo-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(0,0,0,0.05);
          color: #000;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(10px);
        }
        @media (max-width: 900px) {
          .premium-card {
            flex-direction: column;
            min-height: auto;
          }
          .premium-content {
            padding: 40px !important;
          }
          .premium-image-container {
            width: 100% !important;
            height: 300px !important;
            padding: 0 40px 40px 40px !important;
          }
        }
      `}</style>
      <div 
        className="premium-card"
        style={{ 
          background: project.color,
          color: project.textDark ? '#1a202c' : '#ffffff'
        }}
      >
        
        {/* Left Side: Content */}
        <div className="premium-content" style={{ flex: 1, padding: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: 0.6, letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
                0{i + 1}
              </p>
              {project.url !== '#' && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="live-demo-btn" aria-label="Live Demo">
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width="24" height="24">
                    <path d="M1 13 L13 1 M6 1 H13 V8" />
                  </svg>
                </a>
              )}
            </div>
            
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', lineHeight: 1.1, margin: '0 0 24px 0', letterSpacing: '-1px' }}>
              {project.title}
            </h2>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {project.tags.map(t => (
                <span key={t} style={{ fontSize: '13px', padding: '8px 16px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {t}
                </span>
              ))}
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.bullets.map((b, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px', fontSize: '16px', lineHeight: 1.6, opacity: 0.8, fontWeight: 500 }}>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', marginTop: '10px', flexShrink: 0, opacity: 0.5 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="premium-image-container" style={{ width: '45%', position: 'relative', overflow: 'hidden', padding: '24px' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', background: '#fff' }}>
             <img className="project-img" src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" style={{ paddingTop: '10vh' }}>
      <div className="section" style={{ display: 'flex', alignItems: 'center', zIndex: 10, marginBottom: '6vh' }}>
        <p className="section-eyebrow" style={{ fontSize: '2rem', margin: 0, paddingLeft: '8vw' }}>Selected Work</p>
      </div>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            i={i} 
          />
        ))}
      </div>
    </section>
  );
}
