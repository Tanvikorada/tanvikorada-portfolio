'use client';
import { motion } from 'framer-motion';

const EDUCATION_DATA = [
  {
    institution: 'SRMIST Chennai',
    short: 'B.Tech — CSE (Cloud Computing)',
    timeline: '2024 - 2028',
    score: '9.27 / 10',
    label: 'Undergraduate',
  },
  {
    institution: 'Tirumala Junior College',
    short: 'Class XII (MPC) — BIEAP',
    timeline: '2022 - 2024',
    score: '95.2%',
    label: 'Higher Secondary',
  },
  {
    institution: 'Ravindra Bharathi School',
    short: 'Class X — BSEAP',
    timeline: '2021 - 2022',
    score: '88%',
    label: 'Secondary School',
  }
];

export default function Education() {
  return (
    <section id="education" style={{ padding: '15vh 8vw', position: 'relative', zIndex: 10 }}>
      <style>{`
        .edu-row {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          padding: 64px 0;
          border-bottom: 1px solid var(--border-mid);
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .edu-row:first-of-type {
          border-top: 1px solid var(--border-mid);
        }
        @media (max-width: 900px) {
          .edu-row {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 0;
          }
          .edu-score {
            text-align: left !important;
            align-items: flex-start !important;
          }
          .edu-year {
            flex-direction: row !important;
            align-items: center;
            gap: 16px;
          }
        }
      `}</style>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '24px' }}>
              Academic Journey
            </p>
            <h2 style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1, margin: 0 }}>
              Education.
            </h2>
          </div>
        </motion.div>

        <div>
          {EDUCATION_DATA.map((edu, i) => (
            <motion.div
              key={i}
              initial="initial"
              whileHover="hover"
              viewport={{ once: true }}
              className="edu-row"
            >
              <motion.div 
                variants={{
                  initial: { height: '0%' },
                  hover: { height: '100%' }
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  background: 'var(--border)', // subtle background highlight
                  zIndex: 0
                }}
              />
              
              {/* Year */}
              <div className="edu-year" style={{ zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', fontWeight: 300, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {edu.timeline}
                </span>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-heading)', padding: '6px 12px', border: '1px solid var(--border-mid)', borderRadius: '100px' }}>
                  {edu.label}
                </span>
              </div>

              {/* Institution */}
              <div style={{ zIndex: 1 }}>
                <motion.h3 
                  variants={{
                    initial: { x: 0 },
                    hover: { x: 16 }
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: '0 0 16px 0', lineHeight: 1.1 }}
                >
                  {edu.institution}
                </motion.h3>
                <motion.p
                  variants={{
                    initial: { x: 0 },
                    hover: { x: 16 }
                  }}
                  transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: '18px', color: 'var(--text-muted)', margin: 0 }}
                >
                  {edu.short}
                </motion.p>
              </div>

              {/* Score */}
              <div className="edu-score" style={{ zIndex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', margin: 0 }}>
                  Score
                </p>
                <p style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 300, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
                  {edu.score}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
