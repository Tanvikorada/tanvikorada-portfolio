export default function TechStack() {
  return (
    <section
      id="stack"
      style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: '10%',
        paddingLeft: '8%',
        background: 'transparent',
        pointerEvents: 'none', // Allow clicks to pass through to the Spline canvas below
      }}
    >
      <div style={{ zIndex: 2, pointerEvents: 'auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Tech Stack</h2>
        <p style={{ marginTop: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>(Right-click for emoji bomb)</p>
      </div>
    </section>
  );
}
