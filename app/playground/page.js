import Spline from '@splinetool/react-spline/next';
import Link from 'next/link';

export const metadata = {
  title: 'Playground | Tanvi Korada',
  description: 'Interactive 3D WebGL Playground',
};

export default function Playground() {
  return (
    <div className="playground-page">
      {/* Navigation overlay */}
      <nav className="playground-nav">
        <Link href="/" className="back-link group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
          <span>Back to Home</span>
        </Link>
        <div className="playground-title">
          <h1>Playground</h1>
          <p>Interactive WebGL Racing</p>
        </div>
      </nav>

      {/* Full-screen Spline Scene */}
      <div className="spline-wrapper">
        {/* We use a highly polished public Spline car racing interactive scene */}
        {/* URL: A popular interactive 3D driving scene by Spline */}
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>

      <style jsx>{`
        .playground-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #000;
        }

        .playground-nav {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          z-index: 50;
          pointer-events: none;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.25rem;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .playground-title {
          text-align: right;
          color: white;
        }

        .playground-title h1 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 400;
          margin: 0 0 0.25rem 0;
        }

        .playground-title p {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .spline-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        /* Hide the Spline watermark */
        :global(.spline-watermark) {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
