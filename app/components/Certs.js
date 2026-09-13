'use client';
import { motion } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';

const CERTS = [
  { name: 'Python', org: 'DataCamp', color: '#38bdf8', icon: '🐍' },
  { name: 'AWS Cloud', org: 'DataCamp', color: '#f97316', icon: '☁️' },
  { name: 'MongoDB', org: 'MongoDB', color: '#22c55e', icon: '🍃' },
  { name: 'Prompt Eng.', org: 'Future Interns', color: '#c084fc', icon: '🧠' },
  { name: 'Machine Learning', org: 'CodSoft', color: '#facc15', icon: '🤖' },
  { name: 'Web Dev', org: 'Prodigy', color: '#60a5fa', icon: '💻' },
];

export default function Certs() {
  return (
    <section className="certs-section" style={{ position: 'relative', padding: '15vh 5vw', overflow: 'hidden' }}>
      <style>{`
        .cert-glass-card {
          background: linear-gradient(135deg, color-mix(in srgb, var(--bg-glass) 70%, rgba(255,255,255,0.08)), color-mix(in srgb, var(--bg-glass) 90%, rgba(0,0,0,0.05)));
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid color-mix(in srgb, var(--border) 60%, rgba(255,255,255,0.15));
          border-radius: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255,255,255,0.2);
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
        }
        .cert-glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1), transparent 50%),
                      radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.05), transparent 50%);
          z-index: 0;
          pointer-events: none;
        }
        .cert-glass-card > * {
          position: relative;
          z-index: 1;
        }
        .cert-glass-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255,255,255,0.3);
        }
        .cert-pill {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .cert-pill:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(147, 51, 234, 0.3);
          box-shadow: 0 10px 30px rgba(147, 51, 234, 0.1);
        }
      `}</style>

      {/* Ambience */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '8vh', position: 'relative', zIndex: 2 }}
      >
        <p className="section-eyebrow" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', padding: '6px 20px', borderRadius: '100px', display: 'inline-block', marginBottom: '24px' }}>
          Trophies & Milestones
        </p>
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Lifelong <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>learner.</span>
        </h2>
      </motion.div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Achievements Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          
          {/* Hackathon */}
          <SpotlightCard className="cert-glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'color-mix(in srgb, #facc15 15%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0, border: '1px solid rgba(250, 204, 21, 0.2)' }}>
                🏆
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Hackathon</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px', lineHeight: 1.3 }}>OpenAI x Outskill AI Builders</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.6 }}>Final Round Participant. Built <strong>StudentOS</strong> solo in a rigorous 7-day sprint leveraging OpenAI APIs.</p>
              </div>
            </div>
          </SpotlightCard>

          {/* Publication */}
          <SpotlightCard className="cert-glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'color-mix(in srgb, #38bdf8 15%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0, border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                🔬
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Publication</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px', lineHeight: 1.3 }}>Research Publication (Zenodo)</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.6 }}>First author of <strong>AppCompiler: Multi-Stage LLM Pipeline</strong>. <br/> DOI: <a href="https://doi.org/10.5281/zenodo.20644045" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>10.5281/zenodo.20644045</a></p>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Certifications Grid */}
        <SpotlightCard className="cert-glass-card" style={{ padding: '40px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '24px', fontWeight: 600, textAlign: 'center' }}>Professional Certifications</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {CERTS.map((cert, i) => (
              <motion.div 
                key={i}
                className="cert-pill"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `color-mix(in srgb, ${cert.color} 15%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: `1px solid color-mix(in srgb, ${cert.color} 20%, transparent)` }}>
                  {cert.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '15px' }}>{cert.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '2px' }}>{cert.org}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </SpotlightCard>

      </div>
    </section>
  );
}
