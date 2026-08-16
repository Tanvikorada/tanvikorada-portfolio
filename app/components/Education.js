'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EDUCATION_DATA = [
  {
    institution: 'SRMIST Chennai',
    degree: 'B.Tech, CSE (Cloud Computing)',
    timeline: '2024 - 2028',
    score: 'CGPA: 9.27 / 10'
  },
  {
    institution: 'Tirumala Junior College',
    degree: 'Class XII (MPC), BIEAP',
    timeline: '2024',
    score: 'Score: 95.2%'
  },
  {
    institution: 'Ravindra Bharathi School',
    degree: 'Class X, BSEAP',
    timeline: '',
    score: 'Score: 88%'
  }
];

function EduCard({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"] // fade in when entering from bottom
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale, y }}
      className="edu-card"
    >
      <div className="edu-dot" />
      <div className="edu-content">
        <h3 className="edu-inst">{item.institution}</h3>
        <div className="edu-meta">
          <span className="edu-deg">{item.degree}</span>
          {item.timeline && <span className="edu-time">• {item.timeline}</span>}
        </div>
        <div className="edu-score">{item.score}</div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 0.8", "1 0.8"]
  });

  // the glowing progress line
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section" id="education" style={{ padding: '80px 8vw', background: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="section-title">Education</h2>
        <div className="edu-timeline-container" ref={containerRef} style={{ position: 'relative', marginTop: '40px', paddingLeft: '32px' }}>
          
          {/* Timeline background track */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: '2px', height: '100%', background: 'var(--border-mid)', borderRadius: '2px' }} />
          
          {/* Glowing active track */}
          <motion.div style={{ position: 'absolute', left: 0, top: 0, width: '2px', height, background: 'var(--accent)', borderRadius: '2px', boxShadow: '0 0 10px var(--accent)' }} />

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {EDUCATION_DATA.map((edu, i) => (
              <EduCard key={i} item={edu} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .edu-card {
          position: relative;
          background: var(--bg-base);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          box-shadow: var(--shadow-sm);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .edu-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .edu-dot {
          position: absolute;
          left: -39px;
          top: 28px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--bg-base);
          border: 2px solid var(--accent);
          transition: background 0.3s;
        }
        .edu-card:hover .edu-dot {
          background: var(--accent);
          box-shadow: 0 0 12px var(--accent);
        }
        .edu-inst {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 8px;
        }
        .edu-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 12px;
        }
        .edu-deg {
          font-weight: 600;
          color: var(--text);
        }
        .edu-score {
          display: inline-block;
          padding: 4px 12px;
          background: var(--bg-surface);
          border: 1px solid var(--border-mid);
          border-radius: 20px;
          font-size: 0.85rem;
          font-family: var(--font-mono);
          color: var(--accent);
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}
