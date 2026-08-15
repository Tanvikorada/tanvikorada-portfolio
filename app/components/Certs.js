'use client';

const CERTS = [
  { name: 'Python', org: 'DataCamp', color: '#a4d4f4', backColor: '#96C3E0', emoji: '🐍' },
  { name: 'AWS Cloud', org: 'DataCamp', color: '#f4c8a4', backColor: '#E0A880', emoji: '☁️' },
  { name: 'MongoDB', org: 'MongoDB', color: '#a4f4b4', backColor: '#80E094', emoji: '🍃' },
  { name: 'Prompt Eng.', org: 'Future Interns', color: '#d4a4f4', backColor: '#C080E0', emoji: '🤖' },
  { name: 'ML', org: 'CodSoft', color: '#f4d4a4', backColor: '#E0B880', emoji: '🧠' },
  { name: 'Web Dev', org: 'Prodigy', color: '#a4c4f4', backColor: '#80A8E0', emoji: '🌐' },
];

function CertFolder({ cert }) {
  return (
    <div className="cert-folder-wrap">
      <div className="cert-folder">
        {/* Back */}
        <div className="cert-folder-back" style={{ background: cert.backColor }} />
        <div className="cert-folder-tab" style={{ background: cert.backColor }} />

        {/* Inner content peek */}
        <div className="cert-folder-content">
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'white', fontSize: '28px',
          }}>
            {cert.emoji}
          </div>
        </div>

        {/* Front flap */}
        <div className="cert-folder-front" style={{ background: cert.color }}>
          <span className="cert-folder-label">Certifications</span>
        </div>
      </div>
      <div className="cert-folder-name">
        <div style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '13px' }}>{cert.name}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{cert.org}</div>
      </div>
    </div>
  );
}

export default function Certs() {
  return (
    <section className="certs-section">
      <p className="section-eyebrow" style={{ textAlign: 'center' }}>Certifications & Achievements</p>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        Lifelong{' '}
        <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>learner.</span>
      </h2>

      {/* Hackathon highlight */}
      <div style={{
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 28px',
          borderRadius: '16px',
          border: '1px solid var(--border-mid)',
          background: 'var(--bg-card)',
          maxWidth: '560px',
          textAlign: 'left',
        }}>
          <span style={{ fontSize: '28px' }}>🏆</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '15px' }}>
              OpenAI × Outskill AI Builders Hackathon
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '2px' }}>
              Final Round — Built StudentOS solo in 7-day sprint
            </div>
          </div>
        </div>
      </div>

      {/* Publication highlight */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 28px',
          borderRadius: '16px',
          border: '1px solid var(--border-mid)',
          background: 'var(--bg-card)',
          maxWidth: '560px',
          textAlign: 'left',
        }}>
          <span style={{ fontSize: '28px' }}>📄</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '15px' }}>
              Research Publication — Zenodo
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '2px' }}>
              AppCompiler: Multi-Stage LLM Pipeline · DOI: 10.5281/zenodo.20644045
            </div>
          </div>
        </div>
      </div>

      <div className="certs-grid">
        {CERTS.map((c, i) => (
          <CertFolder key={i} cert={c} />
        ))}
      </div>
    </section>
  );
}
