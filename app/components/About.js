'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import ClickSpark from './ui/ClickSpark';
import { useRef } from 'react';
import SpotlightCard from './ui/SpotlightCard';
import RippleDistortion from './ui/RippleDistortion';

const AI_SKILLS = ['OpenAI', 'Groq', 'Claude', 'Gemini', 'LangChain', 'MediaPipe', 'YOLO', 'Prompt Engineering'];
const FRONTEND = ['React', 'Next.js', 'Tailwind', 'Three.js (R3F)'];
const BACKEND = ['Node.js', 'PostgreSQL', 'Firebase', 'Supabase', 'Python'];

function AppleGlassCard({ children, className = "", style = {} }) {
  return (
    <SpotlightCard 
      className={`apple-glass-card ${className}`}
      style={style}
    >
      {children}
    </SpotlightCard>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const floatY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" className="about-section" ref={containerRef} style={{ position: 'relative', overflow: 'hidden', padding: '15vh 0' }}>
      {/* Background Ambience */}
      <motion.div animate={{ x: ['-5%', '5%', '-5%'], y: ['-5%', '10%', '-5%'] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '5%', left: '0%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 60%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
      <motion.div animate={{ x: ['5%', '-5%', '5%'], y: ['10%', '-5%', '10%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '10%', right: '0%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 60%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

      <style>{`
        .apple-bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(140px, auto);
          gap: 24px;
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          padding: 0 5vw;
        }

        @media (max-width: 1024px) {
          .apple-bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-photo { grid-column: span 1 !important; grid-row: span 2 !important; }
          .bento-map { grid-column: span 1 !important; grid-row: span 2 !important; }
          .bento-bio { grid-column: span 2 !important; grid-row: span 2 !important; }
          .bento-stats { grid-column: span 2 !important; }
          .bento-skills { grid-column: span 2 !important; }
          .bento-status { grid-column: span 2 !important; }
          .bento-fun { grid-column: span 2 !important; }
        }

        @media (max-width: 600px) {
          .apple-bento-grid {
            grid-template-columns: 1fr;
          }
          .apple-bento-grid > div {
            grid-column: span 1 !important;
            grid-row: auto !important;
          }
        }

        .apple-glass-card {
          background: var(--bg-glass);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
        }
        
        .apple-glass-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 16px 48px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .bento-photo { grid-column: span 1; grid-row: span 2; padding: 0; }
        .bento-bio { grid-column: span 2; grid-row: span 2; justify-content: center; }
        .bento-map { grid-column: span 1; grid-row: span 2; padding: 0; }
        
        .bento-status { grid-column: span 2; grid-row: span 1; justify-content: center; }
        .bento-skills { grid-column: span 2; grid-row: span 2; }
        .bento-stats { grid-column: span 2; grid-row: span 1; justify-content: center; }
        
        .bento-fun { grid-column: span 4; grid-row: span 1; }

        .apple-label {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 16px;
          font-weight: 600;
        }

        /* Status card glowing outline */
        .superb-status {
          background: linear-gradient(135deg, color-mix(in srgb, var(--bg-glass) 90%, #22c55e), var(--bg-glass));
        }
        .pulse-dot {
          width: 12px; height: 12px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e;
          animation: pulseGreen 2s infinite;
        }
        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(34,197,94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94, 0); }
        }

        .skill-pill {
          display: inline-block;
          padding: 8px 16px;
          margin: 0 8px 8px 0;
          border-radius: 100px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-heading);
          transition: all 0.2s;
        }
        .skill-pill:hover {
          border-color: #c084fc;
          background: color-mix(in srgb, #c084fc 10%, transparent);
          color: #c084fc;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '8vh', position: 'relative', zIndex: 2 }}
      >
        <p className="section-eyebrow" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', padding: '6px 20px', borderRadius: '100px', display: 'inline-block', marginBottom: '24px' }}>
          About Me
        </p>
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Builder. Thinker.
        </h2>
      </motion.div>

      <ClickSpark sparkColor="rgba(147, 51, 234, 0.8)" sparkSize={12} sparkRadius={25} sparkCount={8} duration={500}>
        <div className="apple-bento-grid">
          
          {/* 1. Photo Tile */}
          <AppleGlassCard className="bento-photo">
            <RippleDistortion
              src="/images/about-profile.jpg"
              grayscale={true}
              swirl={1}
              strength={0.25}
              alignY={1.0}
              trigger="hover"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px' }}
            />
          </AppleGlassCard>

          {/* 2. Bio Tile */}
          <AppleGlassCard className="bento-bio">
            <p className="apple-label">Who I am</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', marginBottom: '16px', lineHeight: 1.1 }}>
              Korada Tanvi
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 500 }}>
              B.Tech CSE (Cloud Computing) student at SRMIST Chennai. I build and ship full-stack AI-native web products using React, Next.js, Node.js, and LLM APIs. Published first-author research on LLM pipeline architecture. Currently freelancing and building in public.
            </p>
          </AppleGlassCard>

          {/* 3. Location / Map Tile (USER REQUESTED: MAP) */}
          <AppleGlassCard className="bento-map">
            <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', padding: '10px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ margin: 0, fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-serif)' }}>Chennai, IN</p>
            </div>
            {/* Directly embedded beautiful dark/light map via iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.40795413151!2d80.11729452098028!3d13.047374780512702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b686314bf!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1707572346912!5m2!1sen!2sin" 
              style={{ width: '100%', height: '100%', border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(85%)', objectFit: 'cover' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </AppleGlassCard>

          {/* 4. Availability Status */}
          <AppleGlassCard className="bento-status superb-status">
            <p className="apple-label">Availability</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div className="pulse-dot" />
              <span style={{ fontWeight: 800, color: 'var(--text-heading)', fontSize: '28px', letterSpacing: '-0.5px' }}>Open to Work</span>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Looking for Internships, Full-time roles, or Freelance collaborations. Let's build something extraordinary together.
            </p>
            <div>
              <a href="mailto:tanvikorada@gmail.com" style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-heading)', background: 'var(--bg-surface)', padding: '12px 20px', borderRadius: '100px', border: '1px solid var(--border)', fontWeight: 600, textDecoration: 'none' }}>
                tanvikorada@gmail.com
              </a>
            </div>
          </AppleGlassCard>

          {/* 5. Stats Row */}
          <AppleGlassCard className="bento-stats" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)' }}>9.27</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>CGPA</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--border)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)' }}>6+</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Projects</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--border)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)' }}>4+</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Internships</div>
              </div>
            </div>
          </AppleGlassCard>

          {/* 6. Skills */}
          <AppleGlassCard className="bento-skills">
            <p className="apple-label">Technical Arsenal</p>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600 }}>AI & GenAI</div>
              {AI_SKILLS.map(s => <span key={s} className="skill-pill">{s}</span>)}
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600 }}>Web Dev</div>
              {[...FRONTEND, ...BACKEND].map(s => <span key={s} className="skill-pill">{s}</span>)}
            </div>
          </AppleGlassCard>

          {/* 7. Fun / Roles */}
          <AppleGlassCard className="bento-fun" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p className="apple-label">Extracurriculars</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)' }}>Clubs & Roles</h3>
            </div>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'color-mix(in srgb, #c084fc 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                  📸
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>Camogenics</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Photographer (Winner)</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'color-mix(in srgb, #38bdf8 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                  📱
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>Andropedia</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Media Team</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'color-mix(in srgb, #fcd34d 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fcd34d' }}>
                  ⚙️
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>SlugNPlug</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hardware Club</div>
                </div>
              </div>
            </div>
          </AppleGlassCard>

        </div>
      </ClickSpark>
    </section>
  );
}

