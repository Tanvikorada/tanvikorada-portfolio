'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function DynamicSky() {
  const [mounted, setMounted] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

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

    let vantaInstance = null;

    const initVanta = async () => {
      try {
        const THREE = await import('three');
        window.THREE = THREE; // Vanta needs this globally sometimes
        const { default: CLOUDS } = await import('vanta/dist/vanta.clouds.min');
        
        vantaInstance = CLOUDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          speed: 1.0,
          THREE: THREE,
          ...(isNight ? {
            skyColor: 0x020617,
            cloudColor: 0x1e293b,
            cloudShadowColor: 0x0f172a,
            sunColor: 0x000000,
            sunGlareColor: 0x000000,
            sunPosition: {x: 0, y: -1, z: -1} // Hide sun
          } : {
            skyColor: 0xa1c4fd,
            cloudColor: 0xffffff,
            cloudShadowColor: 0xc2e9fb,
            sunColor: 0xff9919,
            sunGlareColor: 0xff6633,
            sunPosition: {x: 1, y: 1, z: 1}
          })
        });
        setVantaEffect(vantaInstance);
      } catch (error) {
        console.error("Vanta load error:", error);
      }
    };

    initVanta();

    return () => {
      if (vantaInstance) vantaInstance.destroy();
    };
  }, [mounted, isNight]);

  if (!mounted) return null;

  return (
    <div className={`dynamic-sky-container ${isNight ? 'night-mode' : 'day-mode'}`}>
      
      {/* Vanta WebGL Container */}
      <div 
        ref={vantaRef} 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transition: 'opacity 1s ease',
          opacity: vantaEffect ? 1 : 0
        }}
      />
      
      {/* Bottom gradient mask for smooth blending into the next section */}
      <div className="sky-gradient-mask" />
      
      <style jsx>{`
        .dynamic-sky-container {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
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
      `}</style>
    </div>
  );
}
