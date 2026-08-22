'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EXPERIENCES = [
  {
    role: 'Prompt Engineering Intern',
    company: 'Future Interns',
    date: 'Dec 2025 – Jan 2026',
    desc: 'Designed multi-step AI workflows and agent behaviors for GenAI systems across 5+ business use cases. Optimized LLM output quality through task decomposition and iterative refinement.'
  },
  {
    role: 'Full Stack Web Dev Intern',
    company: 'Prodigy InfoTech',
    date: 'Jun 2025 – Jul 2025',
    desc: 'Built responsive full-stack web modules using HTML, CSS, JavaScript, and REST API integration across 3+ production features.'
  },
  {
    role: 'Python Developer Intern',
    company: 'CodSoft',
    date: 'Jun 2025 – Jul 2025',
    desc: 'Developed automated data processing pipelines in Python, eliminating manual steps for 2 recurring business workflows.'
  },
  {
    role: 'Artificial Intelligence Intern',
    company: 'Codec Technologies',
    date: 'May 2025 – Jun 2025',
    desc: 'Built and evaluated ML prototypes (classification, regression) on structured datasets; designed data pipelines from ingestion through model evaluation.'
  }
];

function TimelineItem({ exp, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'center center']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -20 : 20, 0]);

  return (
    <div ref={ref} style={{
      display: 'flex',
      flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
      gap: '40px',
      width: '100%',
      position: 'relative'
    }}>
      {/* Spacer for the other side */}
      <div style={{ flex: 1 }} />
      
      {/* Node */}
      <div style={{
        position: 'absolute', left: '50%', top: '24px', transform: 'translate(-50%, -50%)',
        width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent)',
        border: '4px solid var(--bg-surface)', zIndex: 2
      }} />

      {/* Content */}
      <motion.div style={{ flex: 1, opacity, x }} className="exp-card">
        <div style={{ padding: '24px', background: 'var(--bg-card)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid var(--border)', borderRadius: '24px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{exp.date}</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)', marginTop: '8px' }}>{exp.role}</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-main)', marginTop: '4px', fontWeight: 600 }}>{exp.company}</p>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: 1.6 }}>{exp.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });
  
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section" style={{ position: 'relative' }}>
      <p className="section-eyebrow" style={{ textAlign: 'center' }}>Professional Experience</p>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '80px' }}>Where I've <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>worked.</span></h2>
      
      <div ref={container} style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', padding: '0 8vw' }}>
        {/* Center Line */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--border)', transform: 'translateX(-50%)' }}>
          <motion.div style={{ width: '100%', height: '100%', background: 'var(--accent)', scaleY: lineScaleY, transformOrigin: 'top' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {EXPERIENCES.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
