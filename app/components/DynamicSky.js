'use client';
import React, { useEffect, useState } from 'react';

export default function DynamicSky() {
  const [mounted, setMounted] = useState(false);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsNight(document.body.classList.contains('night'));
    
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains('night'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className={`dynamic-sky-container ${isNight ? 'night-mode' : 'day-mode'}`}>
      {/* Animated Aurora Blobs */}
      <div className="aurora-blob blob-1"></div>
      <div className="aurora-blob blob-2"></div>
      <div className="aurora-blob blob-3"></div>
      <div className="aurora-blob blob-4"></div>
      
      {/* Bottom gradient mask for smooth blending into the next section */}
      <div className="sky-gradient-mask" />
      
      {/* Starfield overlay for night mode */}
      <div className={`vanta-stars-overlay ${isNight ? 'visible' : ''}`}>
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
        <div className="stars-lg"></div>
      </div>

      <style jsx>{`
        .dynamic-sky-container {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          transition: background-color 1.5s ease;
        }

        .day-mode {
          background-color: #e0f2fe; /* Light sky blue base */
        }
        
        .night-mode {
          background-color: #020617; /* Deep slate base */
        }

        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.8;
          mix-blend-mode: normal;
          animation: blob-float 20s infinite alternate ease-in-out;
          transition: all 1.5s ease;
        }

        /* Day Mode Colors (Bright, airy blues/cyans) */
        .day-mode .blob-1 { background: #bae6fd; width: 60vw; height: 60vw; top: -10%; left: -10%; animation-delay: 0s; }
        .day-mode .blob-2 { background: #7dd3fc; width: 50vw; height: 50vw; top: 40%; right: -10%; animation-delay: -5s; }
        .day-mode .blob-3 { background: #e0f2fe; width: 70vw; height: 70vw; bottom: -20%; left: 20%; animation-delay: -10s; }
        .day-mode .blob-4 { background: #fff; width: 40vw; height: 40vw; top: 10%; left: 50%; animation-delay: -15s; mix-blend-mode: overlay; opacity: 0.5; }

        /* Night Mode Colors (Deep space, neon blues/purples) */
        .night-mode .blob-1 { background: #1e1b4b; width: 70vw; height: 70vw; top: -10%; left: -10%; animation-delay: 0s; }
        .night-mode .blob-2 { background: #0f172a; width: 60vw; height: 60vw; top: 40%; right: -10%; animation-delay: -5s; }
        .night-mode .blob-3 { background: #312e81; width: 80vw; height: 80vw; bottom: -20%; left: 20%; animation-delay: -10s; }
        .night-mode .blob-4 { background: #0ea5e9; width: 50vw; height: 50vw; top: 10%; left: 50%; animation-delay: -15s; mix-blend-mode: screen; opacity: 0.15; }

        @keyframes blob-float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10vw, -10vh) scale(1.1); }
          66% { transform: translate(-10vw, 15vh) scale(0.9); }
          100% { transform: translate(5vw, 5vh) scale(1.05); }
        }

        .sky-gradient-mask {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30vh;
          background: linear-gradient(to bottom, transparent, var(--bg-base));
          pointer-events: none;
          z-index: 2;
        }

        .vanta-stars-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 2s ease;
        }
        
        .vanta-stars-overlay.visible {
          opacity: 1;
        }

        .stars-sm, .stars-md, .stars-lg {
          position: absolute;
          inset: 0;
        }
        
        .stars-sm {
          width: 1px; height: 1px; background: transparent;
          box-shadow: 10vw 20vh #fff, 30vw 10vh #fff, 50vw 50vh #fff, 70vw 30vh #fff, 90vw 80vh #fff,
                      15vw 60vh #fff, 35vw 70vh #fff, 55vw 15vh #fff, 75vw 65vh #fff, 95vw 25vh #fff,
                      5vw 90vh #fff, 25vw 40vh #fff, 45vw 85vh #fff, 65vw 10vh #fff, 85vw 55vh #fff;
          animation: twinkle-stars 3s ease-in-out infinite alternate;
        }
        
        .stars-md {
          width: 2px; height: 2px; background: transparent;
          box-shadow: 20vw 30vh #fff, 40vw 50vh #fff, 60vw 10vh #fff, 80vw 70vh #fff, 100vw 20vh #fff,
                      10vw 80vh #fff, 50vw 90vh #fff, 90vw 40vh #fff, 30vw 15vh #fff, 70vw 85vh #fff;
          animation: twinkle-stars 4s ease-in-out infinite alternate-reverse;
          border-radius: 50%;
        }
        
        .stars-lg {
          width: 3px; height: 3px; background: transparent;
          box-shadow: 15vw 40vh #fff, 45vw 20vh #fff, 75vw 50vh #fff, 85vw 90vh #fff, 25vw 75vh #fff;
          animation: twinkle-stars 5s ease-in-out infinite alternate;
          border-radius: 50%;
        }
        
        @keyframes twinkle-stars {
          0% { opacity: 0.1; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

