'use client';
import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

export default function DynamicSky() {
  const [mounted, setMounted] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setIsNight(document.body.classList.contains('night'));
    
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains('night'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted || !vantaRef.current) return;

    if (vantaEffectRef.current) {
      vantaEffectRef.current.destroy();
    }

    const dayColors = {
      skyColor: 0x68b8d7,
      cloudColor: 0xadc1de,
      cloudShadowColor: 0x183550,
      sunColor: 0xff9919,
      sunGlareColor: 0xff6633,
    };

    const nightColors = {
      skyColor: 0x020617,
      cloudColor: 0x1e293b,
      cloudShadowColor: 0x020617,
      sunColor: 0x94a3b8, 
      sunGlareColor: 0x475569,
    };

    const colors = isNight ? nightColors : dayColors;

    try {
      vantaEffectRef.current = CLOUDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        speed: 1.0,
        ...colors
      });
    } catch (e) {
      console.error("Vanta initialization failed:", e);
    }

    return () => {
      if (vantaEffectRef.current) vantaEffectRef.current.destroy();
    };
  }, [mounted, isNight]);

  if (!mounted) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {/* Vanta Canvas Container */}
      <div 
        ref={vantaRef} 
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} 
      />
      
      {/* Bottom gradient mask for smooth blending into the next section */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25vh',
          background: 'linear-gradient(to bottom, transparent, var(--bg-base))',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />
      
      {/* Starfield overlay for night mode to make it extra realistic */}
      <div 
        className={`vanta-stars-overlay ${isNight ? 'visible' : ''}`}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          opacity: isNight ? 1 : 0, transition: 'opacity 2s ease'
        }}
      >
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
        <div className="stars-lg"></div>
      </div>

      <style jsx>{`
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
          0% { opacity: 0.2; }
          100% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

