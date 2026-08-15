export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <p className="section-eyebrow" style={{ textAlign: 'center' }}>Contact</p>

      <div className="contact-availability">
        <span className="contact-avail-dot">●</span>
        Open to internships, collaborations & exciting projects
      </div>

      <h2 className="contact-title">
        Let's build something
        <br />
        <span className="contact-title-accent">thoughtful</span> together
      </h2>

      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=tanvikorada@gmail.com&su=Portfolio%20Inquiry"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-email-btn"
      >
        <span>📧</span>
        tanvikorada@gmail.com
      </a>

      <p className="section-eyebrow" style={{ textAlign: 'center', marginBottom: '0', marginTop: '24px' }}>Also find me on</p>
      <div className="social-row">
        <a
          href="https://www.linkedin.com/in/tanvikorada"
          target="_blank" rel="noopener noreferrer"
          className="social-link"
          title="LinkedIn"
        >
          in
        </a>
        <a
          href="https://github.com/tanvikorada"
          target="_blank" rel="noopener noreferrer"
          className="social-link"
          title="GitHub"
        >
          gh
        </a>
        <a
          href="https://tanvikorada.vercel.app"
          target="_blank" rel="noopener noreferrer"
          className="social-link"
          title="Portfolio"
        >
          ↗
        </a>
      </div>

      <p className="footer-copy">
        ✦ Korada Tanvi · Chennai, India · {new Date().getFullYear()} ✦
      </p>
    </section>
  );
}
