'use client';
import { motion } from 'framer-motion';

export default function TechStack() {
  return (
    <section
      id="stack"
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        /* Tall section so keyboard is visible while scrolling — mirrors Naresh's 150dvh */
        minHeight: '100vh',
      }}
    >
      {/* ── Full-screen Spline keyboard iframe (fills entire section) ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#050510',
        }}
      >
        <iframe
          src="https://my.spline.design/interactivekeyboardbyabhinandcopycopy-BfsVoYA194v5uDcGlns84SMF/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ display: 'block', border: 'none', pointerEvents: 'auto' }}
          title="Interactive 3D Keyboard"
        />

        {/* ── Floating section header (top-left, same as Naresh) ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute',
            top: '48px',
            left: '8vw',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '8px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Tools I build with
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-serif)',
            }}
          >
            Tech Stack
          </h2>
          {/* Hint text */}
          <p
            style={{
              marginTop: '12px',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.35)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            (hint: press a key)
          </p>
        </motion.div>

        {/* Subtle gradient top overlay so text is readable */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: 'linear-gradient(to bottom, rgba(5,5,16,0.7) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        {/* Subtle gradient bottom overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to top, rgba(5,5,16,0.8) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      </div>
    </section>
  );
}
