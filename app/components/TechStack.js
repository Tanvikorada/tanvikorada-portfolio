'use client';
import { motion } from 'framer-motion';

export default function TechStack() {
  const stack = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'JavaScript', category: 'Language' },
    { name: 'Python', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Firebase', category: 'Backend' },
    { name: 'TailwindCSS', category: 'Styling' },
    { name: 'Framer Motion', category: 'Animation' },
    { name: 'Spline 3D', category: 'Design' },
    { name: 'Groq', category: 'AI' },
  ];

  return (
    <section
      id="stack"
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        // Make it match the light theme seamlessly
        background: 'var(--bg-base)',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* ── Spline keyboard iframe ── */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <iframe
            src="https://my.spline.design/interactivekeyboardbyabhinandcopycopy-BfsVoYA194v5uDcGlns84SMF/"
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ display: 'block', border: 'none', pointerEvents: 'auto' }}
            title="Interactive 3D Keyboard"
          />
        </div>

        {/* ── Floating section header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute',
            top: '12vh',
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
              color: 'var(--accent)',
              marginBottom: '8px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Tools I build with
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-serif)',
            }}
          >
            Tech Stack
          </h2>
          <p
            style={{
              marginTop: '12px',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            (Interact with the 3D keyboard)
          </p>
        </motion.div>

        {/* ── Floating Tech Stack UI Overlay ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            position: 'absolute',
            right: '8vw',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            zIndex: 20,
            pointerEvents: 'none',
            maxWidth: '300px'
          }}
        >
          {stack.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                padding: '12px 20px',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontWeight: 600, 
                color: 'var(--text-primary)',
                fontSize: '15px'
              }}>
                {item.name}
              </span>
              <span style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)',
                background: 'rgba(0,0,0,0.04)',
                padding: '4px 8px',
                borderRadius: '8px'
              }}>
                {item.category}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
