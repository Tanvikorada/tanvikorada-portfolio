'use client';
import { motion } from 'framer-motion';

export default function EngineeredForScale() {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: '10vh 8vw', zIndex: 30 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
            Engineered for <span style={{ background: 'linear-gradient(135deg, #38bdf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Scale</span>
          </h2>
          <p style={{ marginTop: '24px', fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '24px auto 0' }}>
            Building resilient, high-performance architectures that handle complexity effortlessly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bento-card"
          style={{
            width: '100%',
            padding: '40px',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}
        >
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
          
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            <div style={{ background: 'var(--bg-base)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-mid)' }}>
              <div style={{ color: '#38bdf8', marginBottom: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '12px' }}>Microservices & Cloud</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Deploying decoupled, highly available services using Docker, Kubernetes, and AWS/GCP to ensure zero-downtime scalability.
              </p>
            </div>

            <div style={{ background: 'var(--bg-base)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-mid)' }}>
              <div style={{ color: '#c084fc', marginBottom: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '12px' }}>Optimized Data Flow</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Designing efficient data pipelines and caching layers with Redis and PostgreSQL to minimize latency under heavy read/write loads.
              </p>
            </div>

            <div style={{ background: 'var(--bg-base)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-mid)' }}>
              <div style={{ color: '#fbbf24', marginBottom: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '12px' }}>Performance First</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Writing clean, efficient code and utilizing modern build tools to achieve 99+ Lighthouse scores and instantaneous load times.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
