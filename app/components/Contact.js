'use client';
import { motion } from 'framer-motion';
import ParticleText from './ui/ParticleText';

export default function Contact() {
  return (
    <section id="contact" className="contact-section" style={{ position: 'relative' }}>
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
          style={{ textAlign: 'center', lineHeight: 1.2, maxWidth: '900px', margin: '0 auto', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}
        >
          Let&apos;s build something <br/>
          <ParticleText text="thoughtful" /> together.
        </motion.div>

        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=tanvikorada@gmail.com&su=Portfolio%20Inquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-email-btn"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{ cursor: 'pointer', marginTop: '40px' }}
        >
          <span>&#9993;</span>
          tanvikorada@gmail.com
        </motion.a>

        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginBottom: '0', marginTop: '40px' }}
        >
          Also find me on
        </motion.p>

        <motion.div
          className="social-row"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <motion.a href="https://www.linkedin.com/in/tanvikorada" target="_blank" rel="noopener noreferrer" className="social-link" whileHover={{ y: -4, scale: 1.1 }}>in</motion.a>
          <motion.a href="https://github.com/tanvikorada" target="_blank" rel="noopener noreferrer" className="social-link" whileHover={{ y: -4, scale: 1.1 }}>gh</motion.a>
          <motion.a href="https://tanvikorada.vercel.app" target="_blank" rel="noopener noreferrer" className="social-link" whileHover={{ y: -4, scale: 1.1 }}>&#8599;</motion.a>
        </motion.div>

        <motion.p
          className="footer-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          &copy; Korada Tanvi &mdash; Chennai, India &mdash; {new Date().getFullYear()}
        </motion.p>
      </div>
    </section>
  );
}
