'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const EDUCATION = [{"id":"srmist","title":"B.Tech - CSE (Cloud Computing)","org":"SRMIST Chennai","period":"2024 - 2028","desc":"Focus on distributed systems, deep learning architectures and full-stack AI engineering. CGPA: 9.27/10","tags":["Cloud Arch","AI / ML","DSA"]},{"id":"tirumala","title":"Intermediate","org":"Tirumala Junior College","period":"2022 - 2024","desc":"Maths, Physics, and Chemistry focus. Secured 977/1000 in Boards. Built foundational analytical logic.","tags":["MPC","97.7%"]},{"id":"ravindra","title":"Secondary Education","org":"Ravindra Bharathi School","period":"2012 - 2022","desc":"Completed secondary education with a strong foundation in sciences and mathematics. Secured 88% in 10th standard boards.","tags":["88%"]}];
const EXPERIENCE = [];

function TimelineItem({ item, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fluid-glass-card group"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--primary-glow),
              transparent 80%
            )
          `
        }}
      />
      
      <div className="item-content-wrapper relative z-10 w-full h-full flex flex-col md:flex-row gap-8">
        <div className="item-period shrink-0 w-[200px]">
          <span>{item.period}</span>
        </div>
        
        <div className="item-content">
          <h3 className="item-title text-2xl font-bold font-serif mb-2">{item.title}</h3>
          <div className="item-org text-lg opacity-90 mb-4">{item.org}</div>
          <p className="item-desc">{item.desc}</p>
          <div className="item-tags mt-6">
            {item.tags.map(tag => (
              <span key={tag} className="tag px-3 py-1 rounded-full border border-mid/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="item-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section id="journey" style={{ padding: '8vh 4vw', position: 'relative' }}>
      <style>{`
        .premium-section-title {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 800;
          font-family: var(--font-serif);
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          color: var(--text-heading);
        }

        .premium-list-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 3rem;
        }

        /* Fluid Citrus Glass Card */
        \.fluid-glass-card { 
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.0) 100%);
  backdrop-filter: blur(60px) saturate(200%);
  -webkit-backdrop-filter: blur(60px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top-color: rgba(255, 255, 255, 0.8);
  border-left-color: rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 40px 80px rgba(0, 0, 0, 0.1),
    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
    inset 10px 10px 40px rgba(255, 255, 255, 0.2),
    inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  --primary-glow: rgba(168, 85, 247, 0.4);
 }

        :global(.night) \.fluid-glass-card { 
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.0) 100%);
  backdrop-filter: blur(60px) saturate(200%);
  -webkit-backdrop-filter: blur(60px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top-color: rgba(255, 255, 255, 0.8);
  border-left-color: rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 40px 80px rgba(0, 0, 0, 0.1),
    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
    inset 10px 10px 40px rgba(255, 255, 255, 0.2),
    inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  --primary-glow: rgba(168, 85, 247, 0.4);
 }

        \.fluid-glass-card:hover { 
  transform: translateY(-8px) scale(1.01);
  box-shadow: 
    0 50px 100px rgba(168, 85, 247, 0.2),
    inset 2px 2px 4px rgba(255, 255, 255, 1),
    inset 10px 10px 40px rgba(255, 255, 255, 0.3),
    inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%); }

        :global(.night) \.fluid-glass-card:hover { 
  transform: translateY(-8px) scale(1.01);
  box-shadow: 
    0 50px 100px rgba(168, 85, 247, 0.2),
    inset 2px 2px 4px rgba(255, 255, 255, 1),
    inset 10px 10px 40px rgba(255, 255, 255, 0.3),
    inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%); }

        .item-content-wrapper {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }

        .item-period {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding-top: 6px;
        }

        .item-content {
          flex: 1;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fluid-glass-card:hover .item-title {
          color: var(--primary);
        }

        .item-title {
          transition: color 0.3s;
        }

        .item-org {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          color: var(--text-body);
          margin-bottom: 16px;
        }
        
        .item-desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 640px;
          margin-bottom: 20px;
        }

        .item-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .item-tags .tag {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-body);
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.4);
          transition: all 0.3s;
        }
        :global(.night) .item-tags .tag {
          background: rgba(0,0,0,0.3);
          border-color: rgba(255,255,255,0.1);
        }

        .fluid-glass-card:hover .item-tags .tag {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(59, 130, 246, 0.05);
          transform: translateY(-2px);
        }

        .item-arrow {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding-top: 4px;
          color: var(--border-mid);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .item-arrow svg {
          width: 32px;
          height: 32px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fluid-glass-card:hover .item-arrow {
          color: var(--text-heading);
        }

        .fluid-glass-card:hover .item-arrow svg {
          transform: translate(6px, -6px) scale(1.1);
        }

        @media (max-width: 900px) {
          .item-content-wrapper {
            flex-direction: column;
            gap: 16px;
          }
          \.fluid-glass-card { 
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.0) 100%);
  backdrop-filter: blur(60px) saturate(200%);
  -webkit-backdrop-filter: blur(60px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top-color: rgba(255, 255, 255, 0.8);
  border-left-color: rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 40px 80px rgba(0, 0, 0, 0.1),
    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
    inset 10px 10px 40px rgba(255, 255, 255, 0.2),
    inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  --primary-glow: rgba(168, 85, 247, 0.4);
 }
          .item-period {
            padding-top: 0;
            width: 100%;
          }
          .item-arrow {
            display: none;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Experience Section */}
        {EXPERIENCE.length > 0 && (
        <div style={{ marginBottom: '6rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ padding: '0 12px' }}
          >
            <h2 className="premium-section-title">Experience.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '400px' }}>
              Building scalable web applications, AI pipelines, and production-ready systems.
            </p>
          </motion.div>

          <div className="premium-list-container">
            {EXPERIENCE.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
        )}

        {/* Education Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ padding: '0 12px' }}
          >
            <h2 className="premium-section-title">Education.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '400px' }}>
              Academic foundations in computer science and distributed architecture.
            </p>
          </motion.div>

          <div className="premium-list-container">
            {EDUCATION.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
