'use client';
import { motion } from 'framer-motion';

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
          <span className="contact-avail-dot">•</span>
          Open to internships, collaborations &amp; exciting projects
        </motion.div>

        <motion.h2
          className="contact-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Let&apos;s build something
          <br />
          <span className="contact-title-accent">thoughtful</span> together
        </motion.h2>

        {/* The Robot Mascot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '120px',
            pointerEvents: 'none'
          }}
        >
          <motion.img
            src="/assets/robot.png"
            alt="Friendly Robot"
            style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
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
          style={{ cursor: 'pointer' }}
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
          style={{ textAlign: 'center', marginBottom: '0', marginTop: '24px' }}
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
