'use client';
import { useEffect, useRef, useState } from 'react';

export default function PlaygroundSection() {
  const canvasRef = useRef(null);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const obs = new MutationObserver(() => setIsNight(document.body.classList.contains('night')));
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let W, H, particles;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 120;
    particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      r: 1.5 + Math.random() * 3.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: 0.2 + Math.random() * 0.6,
      hue: 200 + Math.random() * 60,
      phase: Math.random() * Math.PI * 2,
    }));

    let mouse = { x: -9999, y: -9999 };
    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    let t = 0;
    const draw = () => {
      frameId = requestAnimationFrame(draw);
      t += 0.006;

      const night = document.body.classList.contains('night');
      ctx.clearRect(0, 0, W, H);

      // Aurora gradient backdrop
      const auroraY = H * 0.35;
      const grad = ctx.createRadialGradient(W * 0.5, auroraY, 0, W * 0.5, auroraY, W * 0.65);
      if (night) {
        grad.addColorStop(0, 'rgba(56,189,248,0.06)');
        grad.addColorStop(0.4, 'rgba(129,140,248,0.04)');
        grad.addColorStop(1, 'rgba(2,6,23,0)');
      } else {
        grad.addColorStop(0, 'rgba(56,189,248,0.05)');
        grad.addColorStop(0.4, 'rgba(192,212,255,0.04)');
        grad.addColorStop(1, 'rgba(248,250,252,0)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Orbs
      particles.forEach((p, i) => {
        p.x = (p.x + W) % W;
        p.y = (p.y + H) % H;

        // Drift toward mouse gently
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += (dx / dist) * 0.012;
          p.vy += (dy / dist) * 0.012;
        }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;

        const pulse = Math.sin(t * 0.8 + p.phase) * 0.3 + 0.7;
        const r = p.r * pulse;
        const alpha = p.alpha * pulse * (night ? 0.9 : 0.55);

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        const h = (p.hue + t * 12) % 360;
        const lightness = night ? 70 : 55;
        g.addColorStop(0, 'hsla(' + h + ',80%,' + lightness + '%,' + alpha + ')');
        g.addColorStop(1, 'hsla(' + h + ',80%,' + lightness + '%,0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = 0.06 * (1 - d / 100);
            ctx.strokeStyle = night
              ? 'rgba(148,163,184,' + lineAlpha + ')'
              : 'rgba(99,102,241,' + lineAlpha + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      id="playground"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: isNight ? '#020617' : '#fafafa',
        transition: 'background 0.6s ease',
      }}
    >
      {/* Seamless top blend */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '25vh',
        background: isNight
          ? 'linear-gradient(to bottom, #020617 0%, transparent 100%)'
          : 'linear-gradient(to bottom, #fafafa 0%, transparent 100%)',
        zIndex: 20, pointerEvents: 'none',
        transition: 'background 0.6s ease',
      }} />

      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }}
      />

      {/* Center label */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', zIndex: 30,
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '4px',
          textTransform: 'uppercase', color: isNight ? 'rgba(148,163,184,0.5)' : 'rgba(100,116,139,0.5)',
          marginBottom: '16px',
        }}>
          Interactive &middot; Move your cursor
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 7vw, 6rem)',
          fontWeight: 700, color: isNight ? 'rgba(248,250,252,0.08)' : 'rgba(15,23,42,0.06)',
          letterSpacing: '-0.03em', lineHeight: 1, textAlign: 'center',
          userSelect: 'none',
        }}>
          Playground
        </h2>
      </div>

      {/* Bottom vignette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '20vh',
        background: isNight
          ? 'linear-gradient(to top, #020617 0%, transparent 100%)'
          : 'linear-gradient(to top, #fafafa 0%, transparent 100%)',
        zIndex: 20, pointerEvents: 'none',
        transition: 'background 0.6s ease',
      }} />
    </div>
  );
}
