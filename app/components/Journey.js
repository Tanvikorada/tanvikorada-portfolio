'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const JOURNEY_DATA = [
  {
    type: 'experience',
    title: 'Software Development Intern',
    org: 'ATRIBS Software Systems Pvt Ltd',
    date: 'Sep 2026 - Oct 2026',
    desc: 'Progressive Web App (PWA) development - building installable, mobile-first web applications with offline capability and app-like UX in a live production environment.',
    highlight: 'Full-Stack / PWA'
  },
  {
    type: 'experience',
    title: 'Prompt Engineering Intern',
    org: 'Future Interns',
    date: 'Dec 2025 - Jan 2026',
    desc: 'Designed multi-step AI workflows and agent behaviors for GenAI systems across 5+ business use cases. Optimized LLM output quality through task decomposition and iterative refinement.',
    highlight: 'AI / GenAI'
  },
  {
    type: 'experience',
    title: 'Full Stack Web Dev Intern',
    org: 'Prodigy InfoTech',
    date: 'Jun 2025 - Jul 2025',
    desc: 'Built responsive full-stack web modules using HTML, CSS, JavaScript, and REST API integration across 3+ production features.',
    highlight: 'Full-Stack'
  },
  {
    type: 'education',
    title: 'B.Tech - CSE (Cloud Computing)',
    org: 'SRMIST Chennai',
    date: '2024 - 2028',
    desc: 'Undergraduate studies focusing on cloud architecture, AI, and full-stack development.',
    highlight: 'CGPA: 9.27 / 10'
  },
  {
    type: 'education',
    title: 'Class XII (MPC) - BIEAP',
    org: 'Tirumala Junior College',
    date: '2022 - 2024',
    desc: 'Higher Secondary education with a focus on Mathematics, Physics, and Chemistry.',
    highlight: '95.2%'
  },
  {
    type: 'education',
    title: 'Class X - BSEAP',
    org: 'Ravindra Bharathi School',
    date: '2021 - 2022',
    desc: 'Secondary School Education.',
    highlight: '88%'
  }
];

export default function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="section" style={{ position: 'relative', overflow: 'hidden', padding: '15vh 0' }}>
      
      <style>{`
        @media (max-width: 900px) {
          .journey-spine {
            left: 24px !important;
            transform: none !important;
          }
          .journey-node {
            left: 25px !important;
            transform: translate(-50%, -50%) !important;
          }
          .journey-card {
            width: calc(100% - 64px) !important;
            margin-left: 64px !important;
            text-align: left !important;
          }
          .journey-card-highlight {
            justify-content: flex-start !important;
          }
        }
      `}</style>

      {/* Background Orbs for glass reflection */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 5vw' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '15vh' }}
        >
          <p className="section-eyebrow">My Path</p>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
            Experience <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>&</span> Education.
          </h2>
          <p style={{ marginTop: '24px', fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '24px auto 0' }}>
            A unified timeline of my academic foundations and professional industry roles.
          </p>
        </motion.div>

        <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8vh' }}>
          
          {/* Central Glowing Spine */}
          <div className="journey-spine" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '2px', background: 'var(--border-mid)' }}>
            <motion.div 
              style={{
                width: '100%',
                height: lineHeight,
                background: 'linear-gradient(to bottom, #38bdf8, #c084fc, #38bdf8)',
                boxShadow: '0 0 20px rgba(192, 132, 252, 0.6)'
              }}
            />
          </div>

          {JOURNEY_DATA.map((item, i) => {
            const isLeft = item.type === 'education';
            
            return (
              <div key={i} style={{ 
                display: 'flex', 
                justifyContent: isLeft ? 'flex-start' : 'flex-end', 
                position: 'relative',
                width: '100%'
              }}>
                
                {/* Timeline Node */}
                <motion.div 
                  className="journey-node"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-20%' }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'var(--bg-base)',
                    border: '4px solid ' + (isLeft ? '#38bdf8' : '#c084fc'),
                    zIndex: 10,
                    boxShadow: '0 0 20px ' + (isLeft ? 'rgba(56,189,248,0.4)' : 'rgba(192,132,252,0.4)')
                  }}
                />

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                  className="bento-card journey-card"
                  style={{
                    width: 'calc(50% - 40px)',
                    padding: '32px',
                    textAlign: isLeft ? 'right' : 'left',
                    borderRadius: '24px',
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: isLeft ? '#38bdf8' : '#c084fc', marginBottom: '12px' }}>
                    {item.date}
                  </p>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '16px' }}>
                    {item.org}
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {item.desc}
                  </p>
                  
                  <div className="journey-card-highlight" style={{ display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: '100px',
                      background: 'var(--border)',
                      border: '1px solid var(--border-mid)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '1px',
                      color: 'var(--text-heading)',
                      fontWeight: 600
                    }}>
                      {item.highlight}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
