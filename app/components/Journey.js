'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXPERIENCES = [
  {
    id: 'atribs',
    type: 'experience',
    title: 'Software Development Intern',
    org: 'ATRIBS Software Systems Pvt Ltd',
    timeline: 'Sep 2026 - Oct 2026',
    status: 'Upcoming / Confirmed',
    isCurrent: true,
    desc: 'Progressive Web App (PWA) engineering — architecting installable, offline-first mobile web applications with native-like UX and background sync in a production environment.',
    metrics: 'Production PWA Architecture',
    tags: ['Next.js', 'PWA', 'Service Workers', 'Offline DB'],
    color: '#38bdf8',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
    )
  },
  {
    id: 'future-interns',
    type: 'experience',
    title: 'Prompt Engineering & AI Intern',
    org: 'Future Interns',
    timeline: 'Dec 2025 - Jan 2026',
    desc: 'Engineered multi-step autonomous AI workflows and LLM agent behaviors across 5+ enterprise use cases. Implemented systematic task decomposition and evaluation loops to drastically cut hallucinations.',
    metrics: '5+ Enterprise AI Workflows',
    tags: ['LLM Orchestration', 'Prompt Engineering', 'RAG', 'Agentic AI'],
    color: '#a855f7',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 3.36 2.06 6.24 5 7.4V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.6c2.94-1.16 5-4.04 5-7.4a8 8 0 0 0-8-8z"></path><line x1="12" y1="12" x2="12" y2="12.01"></line></svg>
    )
  },
  {
    id: 'prodigy',
    type: 'experience',
    title: 'Full-Stack Web Dev Intern',
    org: 'Prodigy InfoTech',
    timeline: 'Jun 2025 - Jul 2025',
    desc: 'Constructed responsive, dynamic web applications with modular client components and RESTful microservices. Integrated robust data pipelines and optimized rendering bottlenecks.',
    metrics: '3+ Production Features',
    tags: ['React', 'REST APIs', 'Node.js', 'State Mgmt'],
    color: '#06b6d4',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
    )
  }
];

const EDUCATION = [
  {
    id: 'srmist',
    type: 'education',
    title: 'B.Tech — CSE (Cloud Computing)',
    org: 'SRMIST Chennai',
    timeline: '2024 - 2028',
    status: 'In Progress',
    isCurrent: true,
    desc: 'Focusing on distributed cloud architectures, advanced deep learning, full-stack microservices, and AI system design. Active contributor to collegiate technical initiatives.',
    metrics: 'CGPA: 9.27 / 10',
    tags: ['Cloud Computing', 'Data Structures', 'AI / ML', 'Distributed Systems'],
    color: '#10b981',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
    )
  },
  {
    id: 'tirumala',
    type: 'education',
    title: 'Class XII (MPC) — BIEAP',
    org: 'Tirumala Junior College',
    timeline: '2022 - 2024',
    desc: 'Higher secondary education with rigorous focus in Mathematics, Physics, and Chemistry. Graduated with top percentile honors across the state board.',
    metrics: 'Score: 95.2%',
    tags: ['Mathematics', 'Physics', 'Analytical Problem Solving'],
    color: '#f59e0b',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
    )
  },
  {
    id: 'ravindra',
    type: 'education',
    title: 'Class X (SSC) — BSEAP',
    org: 'Ravindra Bharathi School',
    timeline: '2021 - 2022',
    desc: 'Secondary school foundation with broad distinctions in Computer Science fundamentals, science, and scholastic leadership.',
    metrics: 'Score: 88.0%',
    tags: ['STEM Foundations', 'Merit Scholar'],
    color: '#ec4899',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
    )
  }
];

export default function Journey() {
  const [filter, setFilter] = useState('all'); // 'all' | 'experience' | 'education'

  const items = filter === 'all' 
    ? [...EXPERIENCES, ...EDUCATION]
    : filter === 'experience' ? EXPERIENCES : EDUCATION;

  return (
    <section id="journey" style={{ position: 'relative', padding: '14vh 5vw', overflow: 'hidden' }}>
      
      {/* Magic UI / React Bits Styles */}
      <style>{`
        /* Animated Border Beam */
        @keyframes border-beam {
          100% {
            offset-distance: 100%;
          }
        }
        .border-beam-card {
          position: relative;
        }
        .border-beam-card::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.8) 50%, transparent 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.8;
          animation: border-beam-glow 4s ease-in-out infinite alternate;
        }
        @keyframes border-beam-glow {
          0% { filter: drop-shadow(0 0 4px rgba(56,189,248,0.3)); }
          100% { filter: drop-shadow(0 0 16px rgba(168,85,247,0.5)); }
        }

        /* Glass Bento Container */
        .magic-bento-card {
          background: linear-gradient(135deg, color-mix(in srgb, var(--bg-glass) 50%, rgba(255,255,255,0.06)), color-mix(in srgb, var(--bg-glass) 80%, rgba(0,0,0,0.03)));
          border: 1px solid color-mix(in srgb, var(--border) 70%, rgba(255,255,255,0.12));
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border-radius: 28px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.04), inset 0 1px 1px rgba(255,255,255,0.15);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .magic-bento-card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--card-color, #a855f7) 50%, transparent);
          box-shadow: 0 20px 50px rgba(0,0,0,0.1), 0 0 30px color-mix(in srgb, var(--card-color, #a855f7) 12%, transparent);
        }

        /* Live Radar Beacon */
        .live-beacon {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
        }
        .live-beacon::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid #10b981;
          animation: beacon-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes beacon-ping {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        /* Connecting Timeline Line */
        .timeline-beam-spine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          background: linear-gradient(180deg, transparent, var(--border) 10%, var(--border) 90%, transparent);
          z-index: 1;
        }
        @media (max-width: 860px) {
          .timeline-beam-spine {
            left: 28px;
          }
        }
      `}</style>

      {/* Atmospheric Ambient Glows */}
      <div style={{ position: 'absolute', top: '15%', left: '15%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 60%)', filter: 'blur(90px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 60%)', filter: 'blur(90px)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg-glass)', border: '1px solid var(--border)', padding: '6px 22px', borderRadius: '100px', marginBottom: '24px' }}
          >
            <span className="live-beacon" />
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Trajectory & Pedigree
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px 0' }}
          >
            Experience & <span style={{ color: 'var(--text-muted)' }}>Education.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 36px', lineHeight: 1.6 }}
          >
            From engineering production-grade web applications to pioneering deep research and achieving academic distinctions.
          </motion.p>

          {/* Magic UI Interactive Segmented Control */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ display: 'inline-flex', background: 'color-mix(in srgb, var(--text-heading) 5%, transparent)', padding: '4px', borderRadius: '100px', border: '1px solid var(--border)', gap: '4px' }}
          >
            {[
              { id: 'all', label: 'All Milestones' },
              { id: 'experience', label: 'Work Experience' },
              { id: 'education', label: 'Academic Journey' }
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  style={{
                    position: 'relative',
                    padding: '8px 22px',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--bg-base)' : 'var(--text-muted)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    zIndex: 2
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="magic-tab-indicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'var(--text-heading)',
                        borderRadius: '100px',
                        zIndex: -1
                      }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Bento Grid with Magic UI Aesthetics */}
        <motion.div 
          layout
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '24px',
            alignItems: 'stretch'
          }}
        >
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`magic-bento-card ${item.isCurrent ? 'border-beam-card' : ''}`}
                style={{ '--card-color': item.color, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                
                {/* Card Top: Icon, Type Badge & Timeline */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div 
                        style={{ 
                          width: '46px', 
                          height: '46px', 
                          borderRadius: '14px', 
                          background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${item.color} 28%, transparent)`,
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: item.color,
                          boxShadow: `0 8px 20px color-mix(in srgb, ${item.color} 15%, transparent)`
                        }}
                      >
                        {item.icon}
                      </div>

                      <span 
                        style={{ 
                          fontSize: '11px', 
                          fontFamily: 'var(--font-mono)', 
                          letterSpacing: '0.08em', 
                          textTransform: 'uppercase', 
                          fontWeight: 700, 
                          color: item.color, 
                          background: `color-mix(in srgb, ${item.color} 10%, transparent)`, 
                          padding: '4px 12px', 
                          borderRadius: '100px',
                          border: `1px solid color-mix(in srgb, ${item.color} 20%, transparent)`
                        }}
                      >
                        {item.type === 'experience' ? 'Experience' : 'Education'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.isCurrent && <span className="live-beacon" title="Active milestone" />}
                      <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {item.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1.25, marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  
                  <div style={{ fontSize: '14px', fontWeight: 600, color: item.color, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{item.org}</span>
                    {item.status && (
                      <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', background: 'color-mix(in srgb, var(--text-heading) 5%, transparent)', padding: '2px 8px', borderRadius: '4px' }}>
                        {item.status}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '24px' }}>
                    {item.desc}
                  </p>
                </div>

                {/* Card Bottom: Metrics Highlight & Tags */}
                <div>
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '12px 16px', 
                      borderRadius: '16px', 
                      background: `color-mix(in srgb, ${item.color} 8%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${item.color} 18%, transparent)`,
                      marginBottom: '18px'
                    }}
                  >
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                      Key Distinction
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-mono)' }}>
                      {item.metrics}
                    </span>
                  </div>

                  {/* Tags Pill Cloud */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                          background: 'color-mix(in srgb, var(--text-heading) 4%, transparent)',
                          border: '1px solid color-mix(in srgb, var(--border) 80%, transparent)',
                          padding: '3px 10px',
                          borderRadius: '6px'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
