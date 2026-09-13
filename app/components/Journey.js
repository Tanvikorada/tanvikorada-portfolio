'use client';
import { motion } from 'framer-motion';

const EXPERIENCE_DATA = [
  {
    title: 'Software Development Intern',
    org: 'ATRIBS Software Systems Pvt Ltd',
    date: 'Sep 2026 - Oct 2026',
    desc: 'Progressive Web App (PWA) development - building installable, mobile-first web applications with offline capability.',
    highlight: 'Full-Stack / PWA',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    )
  },
  {
    title: 'Prompt Engineering Intern',
    org: 'Future Interns',
    date: 'Dec 2025 - Jan 2026',
    desc: 'Designed multi-step AI workflows and agent behaviors for GenAI systems across 5+ business use cases.',
    highlight: 'AI / GenAI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    )
  },
    {
    title: 'Full Stack Web Dev Intern',
    org: 'Prodigy InfoTech',
    date: 'Jun 2025 - Jul 2025',
    desc: 'Built responsive full-stack web modules using HTML, CSS, JavaScript, and REST API integration across 3+ production features.',
    highlight: 'Full-Stack',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
    )
  }
];

const EDUCATION_DATA = [
  {
    title: 'B.Tech - CSE (Cloud Computing)',
    org: 'SRMIST Chennai',
    date: '2024 - 2028',
    desc: 'Undergraduate studies focusing on cloud architecture, AI, and full-stack development.',
    highlight: 'CGPA: 9.27 / 10',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
    )
  },
  {
    title: 'Class XII (MPC) - BIEAP',
    org: 'Tirumala Junior College',
    date: '2022 - 2024',
    desc: 'Higher Secondary education with a focus on Mathematics, Physics, and Chemistry.',
    highlight: '95.2%',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
    )
  },
  {
    title: 'Class X - BSEAP',
    org: 'Ravindra Bharathi School',
    date: '2021 - 2022',
    desc: 'Secondary School Education.',
    highlight: '88%',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
    )
  }
];

// Helper to render premium cards
function PremiumCard({ item, colorHex, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="premium-journey-card"
    >
      <div className="card-glow" style={{ '--glow-color': colorHex }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div 
          style={{ 
            width: '40px', height: '40px', 
            borderRadius: '12px', 
            background: `color-mix(in srgb, ${colorHex} 15%, transparent)`, 
            border: `1px solid color-mix(in srgb, ${colorHex} 30%, transparent)`, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: colorHex
          }}
        >
          {item.icon}
        </div>
        <span 
          style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            color: 'var(--text-muted)', 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border)',
            padding: '6px 12px', 
            borderRadius: '100px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          {item.date}
        </span>
      </div>

      <div style={{ flexGrow: 1 }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.3, marginBottom: '6px', fontFamily: 'var(--font-sans)' }}>
          {item.title}
        </h4>
        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: colorHex, marginBottom: '16px', letterSpacing: '0.02em' }}>
          {item.org}
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {item.desc}
        </p>
      </div>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        <span 
          style={{ 
            fontSize: '10px', 
            fontFamily: 'var(--font-mono)', 
            padding: '6px 14px', 
            borderRadius: '100px', 
            background: `color-mix(in srgb, ${colorHex} 8%, transparent)`,
            border: `1px solid color-mix(in srgb, ${colorHex} 20%, transparent)`, 
            color: 'var(--text-heading)',
            fontWeight: 600
          }}
        >
          {item.highlight}
        </span>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="section" style={{ position: 'relative', overflow: 'hidden', padding: '12vh 0' }}>
      
      <style>{`
        .journey-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          position: relative;
        }
        @media (max-width: 900px) {
          .journey-layout {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        .journey-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
                .premium-journey-card {
          position: relative;
          height: 280px; /* ENFORCED EQUAL HEIGHT FOR ALL CARDS */
          display: flex;
          flex-direction: column;
          padding: 32px;
          background: linear-gradient(135deg, color-mix(in srgb, var(--bg-glass) 60%, rgba(255,255,255,0.08)), color-mix(in srgb, var(--bg-glass) 90%, rgba(0,0,0,0.05)));
          border-radius: 28px;
          border: 1px solid color-mix(in srgb, var(--border) 60%, rgba(255,255,255,0.15));
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255,255,255,0.2);
        }

        .premium-journey-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1), transparent 50%),
                      radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--glow-color) 10%, transparent), transparent 60%);
          z-index: 0;
          pointer-events: none;
        }

        .premium-journey-card > * {
          position: relative;
          z-index: 1;
        }
        
        .premium-journey-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: color-mix(in srgb, var(--glow-color) 50%, transparent);
          box-shadow: 0 20px 50px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.3), 0 0 30px color-mix(in srgb, var(--glow-color) 15%, transparent);
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: radial-gradient(circle at top left, color-mix(in srgb, var(--glow-color) 25%, transparent), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }
        
        .premium-journey-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: radial-gradient(circle at top left, color-mix(in srgb, var(--glow-color) 15%, transparent), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        
        .premium-journey-card:hover .card-glow {
          opacity: 1;
        }
      `}</style>

      {/* Subtle Premium Background Ambience */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(192,132,252,0.05) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 5vw' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '10vh' }}
        >
          <p className="section-eyebrow" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', padding: '6px 20px', borderRadius: '100px', display: 'inline-block', marginBottom: '24px' }}>
            My Background
          </p>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Experience & Education
          </h2>
        </motion.div>

        <div className="journey-layout">
          {/* Experience Column */}
          <div className="journey-column">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', paddingLeft: '8px' }}
            >
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>Professional</h3>
              <div style={{ height: '1px', flexGrow: 1, background: 'linear-gradient(90deg, var(--border) 0%, transparent 100%)' }} />
            </motion.div>

            {EXPERIENCE_DATA.map((item, i) => (
              <PremiumCard key={i} item={item} colorHex="#c084fc" delay={i} />
            ))}
          </div>

          {/* Education Column */}
          <div className="journey-column">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', paddingLeft: '8px' }}
            >
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>Academic</h3>
              <div style={{ height: '1px', flexGrow: 1, background: 'linear-gradient(90deg, var(--border) 0%, transparent 100%)' }} />
            </motion.div>

            {EDUCATION_DATA.map((item, i) => (
              <PremiumCard key={i} item={item} colorHex="#38bdf8" delay={i} />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}



