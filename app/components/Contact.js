'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleText from './ui/ParticleText';

export default function Contact() {
  const [isNight, setIsNight] = useState(true);

  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains('night'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="contact-section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'relative', zIndex: 20 }}>
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          Contact
        </motion.p>

        <motion.div
          className="contact-availability"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <span className="contact-avail-dot"> </span>
          Open to internships, collaborations &amp; exciting projects
        </motion.div>

        <motion.div
          className="contact-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ textAlign: 'center', lineHeight: 1.2, maxWidth: '900px', margin: '0 auto', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', marginBottom: '60px' }}
        >
          Let&apos;s build something <br/>
          <ParticleText text="thoughtful" particleSize={3} density={3} 
            color={isNight ? '#ffffff' : '#0b0b0b'}
            highlightColor={isNight ? '#c084fc' : '#9333ea'}
          /> together.
        </motion.div>

        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginBottom: '24px', marginTop: '10px' }}
        >
          Find me online
        </motion.p>

        <motion.div
          className="social-row"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}
        >
          {/* Email */}
          <motion.a 
            href="mailto:tanvikorada@gmail.com" 
            target="_blank" rel="noopener noreferrer" 
            className="social-link-icon" 
            whileHover={{ y: -6, scale: 1.15, backgroundColor: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }} 
            style={iconStyle}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </motion.a>

          {/* LinkedIn */}
          <motion.a 
            href="https://www.linkedin.com/in/tanvikorada" 
            target="_blank" rel="noopener noreferrer" 
            className="social-link-icon" 
            whileHover={{ y: -6, scale: 1.15, backgroundColor: '#0a66c2', color: '#fff', boxShadow: '0 10px 25px rgba(10,102,194,0.4)' }} 
            style={iconStyle}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </motion.a>
          
          {/* GitHub */}
          <motion.a 
            href="https://github.com/tanvikorada" 
            target="_blank" rel="noopener noreferrer" 
            className="social-link-icon" 
            whileHover={{ y: -6, scale: 1.15, backgroundColor: isNight ? '#fff' : '#000', color: isNight ? '#000' : '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }} 
            style={iconStyle}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </motion.a>

          {/* Twitter / X */}
          <motion.a 
            href="https://twitter.com/tanvikorada" 
            target="_blank" rel="noopener noreferrer" 
            className="social-link-icon" 
            whileHover={{ y: -6, scale: 1.15, backgroundColor: isNight ? '#fff' : '#000', color: isNight ? '#000' : '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }} 
            style={iconStyle}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </motion.a>
        </motion.div>

        <motion.p
          className="footer-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: '80px' }}
        >
          &copy; Korada Tanvi &mdash; Chennai, India &mdash; {new Date().getFullYear()}
        </motion.p>
      </div>
    </section>
  );
}

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  border: '1px solid var(--border)',
  background: 'var(--bg-glass)',
  color: 'var(--text-heading)',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  cursor: 'pointer'
};

