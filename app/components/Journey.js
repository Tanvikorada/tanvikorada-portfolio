'use client';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const TIMELINE = [
  {
    id: 'atribs',
    side: 'right',
    type: 'experience',
    title: 'Software Development Intern',
    org: 'ATRIBS Software Systems Pvt Ltd',
    period: 'Sep – Oct 2026',
    isCurrent: true,
    status: 'Active',
    desc: 'Engineering a full Progressive Web App from the ground up — installable, offline-first, background sync and native-like UX in a live production environment.',
    achievement: 'Production PWA Shipped',
    tags: ['Next.js', 'PWA', 'Service Workers', 'IndexedDB'],
    color: '#38bdf8',
  },
  {
    id: 'srmist',
    side: 'left',
    type: 'education',
    title: 'B.Tech — CSE (Cloud Computing)',
    org: 'SRMIST Chennai',
    period: '2024 – 2028',
    isCurrent: true,
    status: 'In Progress',
    desc: 'Pursuing undergraduate studies with focus on distributed cloud systems, deep learning architectures and full-stack AI product engineering.',
    achievement: 'CGPA: 9.27 / 10',
    tags: ['Cloud Architecture', 'AI / ML', 'DSA', 'Microservices'],
    color: '#10b981',
  },
  {
    id: 'future-interns',
    side: 'right',
    type: 'experience',
    title: 'Prompt Engineering & AI Intern',
    org: 'Future Interns',
    period: 'Dec 2025 – Jan 2026',
    desc: 'Designed multi-step agentic workflows and LLM orchestration pipelines across 5+ enterprise use cases. Reduced hallucinations via systematic prompt decomposition.',
    achievement: '5+ Enterprise AI Workflows',
    tags: ['Agentic AI', 'LLM Orchestration', 'RAG', 'Prompt Design'],
    color: '#a855f7',
  },
  {
    id: 'prodigy',
    side: 'right',
    type: 'experience',
    title: 'Full-Stack Web Dev Intern',
    org: 'Prodigy InfoTech',
    period: 'Jun – Jul 2025',
    desc: 'Built responsive full-stack modules with REST API integrations, optimised rendering bottlenecks and shipped 3+ production features in a live customer-facing application.',
    achievement: '3+ Production Features',
    tags: ['React', 'Node.js', 'REST APIs', 'CSS'],
    color: '#06b6d4',
  },
  {
    id: 'tirumala',
    side: 'left',
    type: 'education',
    title: 'Class XII (MPC) — BIEAP',
    org: 'Tirumala Junior College',
    period: '2022 – 2024',
    desc: 'Higher Secondary Education with a rigorous focus on Mathematics, Physics & Chemistry. Graduated with top-percentile honours across the state board.',
    achievement: 'Score: 95.2%',
    tags: ['Mathematics', 'Physics', 'STEM'],
    color: '#f59e0b',
  },
  {
    id: 'ravindra',
    side: 'left',
    type: 'education',
    title: 'Class X (SSC) — BSEAP',
    org: 'Ravindra Bharathi School',
    period: '2021 – 2022',
    desc: 'Secondary schooling with broad distinctions in Computer Science fundamentals, sciences and scholastic leadership.',
    achievement: 'Score: 88.0%',
    tags: ['STEM Foundations', 'Merit Scholar'],
    color: '#ec4899',
  },
];

function BorderBeam({ color }) {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      <div style={{ position: 'absolute', inset: -1, borderRadius: 'inherit', background: `conic-gradient(from 0deg, transparent 0%, transparent 60%, ${color} 80%, transparent 100%)`, animation: 'beam-spin 3s linear infinite', opacity: 0.9 }} />
      <div style={{ position: 'absolute', inset: 1, borderRadius: '22px', background: '#080910' }} />
    </div>
  );
}

function BlurCard({ children, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Card({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '24px',
        border: `1px solid ${hovered ? item.color + '60' : 'rgba(255,255,255,0.08)'}`,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '28px',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 28px 56px rgba(0,0,0,0.35), 0 0 32px ${item.color}18` : '0 8px 24px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.isCurrent && <BorderBeam color={item.color} />}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: item.color, background: item.color + '18', border: `1px solid ${item.color}30`, padding: '3px 10px', borderRadius: '100px', fontWeight: 700 }}>
              {item.type}
            </span>
            {item.isCurrent && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <span className="live-dot" />
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#10b981', letterSpacing: '0.05em' }}>{item.status}</span>
              </span>
            )}
          </div>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.period}</span>
        </div>

        <h3 style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1.25, marginBottom: '4px', fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em' }}>
          {item.title}
        </h3>
        <p style={{ fontSize: '13px', fontWeight: 700, color: item.color, marginBottom: '14px', letterSpacing: '0.02em' }}>{item.org}</p>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>{item.desc}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderRadius: '12px', background: item.color + '0f', border: `1px solid ${item.color}22`, marginBottom: '16px' }}>
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Key Highlight</span>
          <span style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-heading)' }}>{item.achievement}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {item.tags.map((tag, i) => (
            <span key={i} style={{ position: 'relative', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.85', 'end 0.2'] });
  const beamHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const edu = TIMELINE.filter(i => i.side === 'left');
  const exp = TIMELINE.filter(i => i.side === 'right');

  return (
    <section id="journey" ref={containerRef} style={{ position: 'relative', padding: '14vh 4vw', overflow: 'hidden' }}>
      <style>{`
        @keyframes beam-spin { to { transform: rotate(360deg); } }
        .live-dot {
          display: inline-block; width: 7px; height: 7px;
          border-radius: 50%; background: #10b981;
          position: relative; flex-shrink: 0;
        }
        .live-dot::after {
          content: ''; position: absolute; inset: -3px; border-radius: 50%;
          border: 1.5px solid #10b981;
          animation: liveping 2s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes liveping { 75%, 100% { transform: scale(2.4); opacity: 0; } }

        .tl-grid { display: grid; grid-template-columns: 1fr 32px 1fr; gap: 0 40px; }
        .tl-left  { display: flex; flex-direction: column; gap: 40px; padding-top: 72px; }
        .tl-right { display: flex; flex-direction: column; gap: 40px; }
        .tl-spine { position: relative; display: flex; justify-content: center; }
        @media (max-width: 860px) {
          .tl-grid { grid-template-columns: 28px 1fr; gap: 0 20px; }
          .tl-left { display: none; }
          .tl-right { padding-top: 0; }
        }
      `}</style>

      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 20px', borderRadius: '100px', marginBottom: '20px' }}>
            <span className="live-dot" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Trajectory & Pedigree</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 18px' }}>
            Experience &amp; <span style={{ background: 'linear-gradient(135deg, #a855f7, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Education</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>
            From crafting production-grade applications to pioneering deep research and academic distinctions.
          </p>
        </motion.div>

        {/* Column labels */}
        <div className="tl-grid" style={{ marginBottom: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Academic</span>
          </div>
          <div />
          <div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Professional</span>
          </div>
        </div>

        {/* Main grid */}
        <div className="tl-grid">

          {/* Left – Education */}
          <div className="tl-left">
            {edu.map((item, i) => (
              <BlurCard key={item.id} delay={i * 0.1}>
                <Card item={item} />
              </BlurCard>
            ))}
          </div>

          {/* Spine */}
          <div className="tl-spine">
            {/* Static track */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }} />
            {/* Animated Beam (Magic UI style) */}
            <motion.div style={{ position: 'absolute', top: 0, height: beamHeight, width: '2px', background: 'linear-gradient(180deg, #a855f7, #38bdf8)', borderRadius: '2px', boxShadow: '0 0 14px rgba(168,85,247,0.9), 0 0 32px rgba(56,189,248,0.5)' }} />
            {/* Glowing tip */}
            <motion.div style={{ position: 'absolute', top: beamHeight, translateY: '-50%', width: '12px', height: '12px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 12px 4px rgba(168,85,247,0.9), 0 0 28px 8px rgba(56,189,248,0.6)', marginLeft: '-5px' }} />
          </div>

          {/* Right – Experience */}
          <div className="tl-right">
            {exp.map((item, i) => (
              <BlurCard key={item.id} delay={i * 0.1 + 0.08}>
                <Card item={item} />
              </BlurCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
