'use client';
import { motion } from 'framer-motion';

const EXPERIENCE_DATA = [
  {
    title: 'Software Development Intern',
    org: 'ATRIBS Software Systems Pvt Ltd',
    date: 'Sep 2026 - Oct 2026',
    desc: 'Progressive Web App (PWA) development - building installable, mobile-first web applications with offline capability and app-like UX.',
    highlight: 'Full-Stack / PWA'
  },
  {
    title: 'Prompt Engineering Intern',
    org: 'Future Interns',
    date: 'Dec 2025 - Jan 2026',
    desc: 'Designed multi-step AI workflows and agent behaviors for GenAI systems across 5+ business use cases.',
    highlight: 'AI / GenAI'
  },
  {
    title: 'Full Stack Web Dev Intern',
    org: 'Prodigy InfoTech',
    date: 'Jun 2025 - Jul 2025',
    desc: 'Built responsive full-stack web modules using HTML, CSS, JavaScript, and REST API integration.',
    highlight: 'Full-Stack'
  }
];

const EDUCATION_DATA = [
  {
    title: 'B.Tech - CSE (Cloud Computing)',
    org: 'SRMIST Chennai',
    date: '2024 - 2028',
    desc: 'Undergraduate studies focusing on cloud architecture, AI, and full-stack development.',
    highlight: 'CGPA: 9.27 / 10'
  },
  {
    title: 'Class XII (MPC) - BIEAP',
    org: 'Tirumala Junior College',
    date: '2022 - 2024',
    desc: 'Higher Secondary education with a focus on Mathematics, Physics, and Chemistry.',
    highlight: '95.2%'
  },
  {
    title: 'Class X - BSEAP',
    org: 'Ravindra Bharathi School',
    date: '2021 - 2022',
    desc: 'Secondary School Education.',
    highlight: '88%'
  }
];

export default function Journey() {
  return (
    <section id="journey" className="section" style={{ position: 'relative', overflow: 'hidden', padding: '10vh 0' }}>
      
      <style>{`
        .journey-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        @media (max-width: 900px) {
          .journey-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        .compact-card {
          padding: 24px;
          border-radius: 20px;
          margin-bottom: 20px;
          transition: transform 0.3s;
        }
        .compact-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      {/* Background Orbs for glass reflection */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 5vw' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '8vh' }}
        >
          <p className="section-eyebrow">My Background</p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
            Experience & Education
          </h2>
        </motion.div>

        <div className="journey-grid">
          {/* Experience Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(192, 132, 252, 0.1)', border: '1px solid rgba(192, 132, 252, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>Professional</h3>
            </motion.div>

            {EXPERIENCE_DATA.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card compact-card"
                style={{ borderLeft: '4px solid #c084fc' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.3 }}>{item.title}</h4>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#c084fc', whiteSpace: 'nowrap', marginLeft: '12px', background: 'rgba(192, 132, 252, 0.1)', padding: '4px 8px', borderRadius: '100px' }}>
                    {item.date}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>{item.org}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>{item.desc}</p>
                <div style={{ display: 'flex' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '4px 12px', borderRadius: '100px', border: '1px solid var(--border-mid)', color: 'var(--text-heading)' }}>
                    {item.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>Academic</h3>
            </motion.div>

            {EDUCATION_DATA.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card compact-card"
                style={{ borderLeft: '4px solid #38bdf8' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.3 }}>{item.title}</h4>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#38bdf8', whiteSpace: 'nowrap', marginLeft: '12px', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 8px', borderRadius: '100px' }}>
                    {item.date}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>{item.org}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>{item.desc}</p>
                <div style={{ display: 'flex' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '4px 12px', borderRadius: '100px', border: '1px solid var(--border-mid)', color: 'var(--text-heading)' }}>
                    {item.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
