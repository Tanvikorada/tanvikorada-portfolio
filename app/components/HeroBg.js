'use client';
import { useEffect, useRef } from 'react';

export default function HeroBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, frameId, t = 0;
    let mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    // === BLOB SYSTEM ===
    // Each blob has a base position, amplitude of drift, and follows cursor with spring
    const makeBlob = (bx, by, size, h1, h2, speed) => ({
      bx, by,        // base position (0-1 normalized)
      x: bx * 1000, y: by * 1000,  // current pos
      size, h1, h2, speed,
      ox: Math.random() * Math.PI * 2,
      oy: Math.random() * Math.PI * 2,
    });

    const blobs = [
      makeBlob(0.15, 0.20, 0.48, 220, 260, 0.00035),
      makeBlob(0.80, 0.15, 0.44, 180, 220, 0.00028),
      makeBlob(0.50, 0.70, 0.52, 260, 300, 0.00040),
      makeBlob(0.75, 0.65, 0.38, 190, 240, 0.00032),
      makeBlob(0.20, 0.75, 0.36, 240, 280, 0.00038),
    ];

    // === DOT GRID ===
    const SPACING = 38;
    let dots = [];
    const buildGrid = () => {
      dots = [];
      const cols = Math.ceil(W / SPACING) + 2;
      const rows = Math.ceil(H / SPACING) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ bx: c * SPACING, by: r * SPACING });
        }
      }
    };
    buildGrid();
    window.addEventListener('resize', buildGrid);

    const lerp = (a, b, n) => a + (b - a) * n;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    const draw = () => {
      frameId = requestAnimationFrame(draw);
      t += 0.012;

      const night = document.body.classList.contains('night');

      // Smooth mouse
      mouse.x = lerp(mouse.x === -9999 ? W * 0.5 : mouse.x, mouse.tx === -9999 ? W * 0.5 : mouse.tx, 0.055);
      mouse.y = lerp(mouse.y === -9999 ? H * 0.5 : mouse.y, mouse.ty === -9999 ? H * 0.5 : mouse.ty, 0.055);

      ctx.clearRect(0, 0, W, H);

      // ---- Background fill ----
      ctx.fillStyle = night ? '#020617' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      // ---- Blobs ----
      blobs.forEach((b, i) => {
        const driftX = Math.sin(t * b.speed * 1000 + b.ox) * 0.08;
        const driftY = Math.cos(t * b.speed * 900 + b.oy) * 0.08;

        // Pull gently toward cursor
        const cx = (mouse.x / W) + driftX;
        const cy = (mouse.y / H) + driftY;
        const pull = 0.04 + i * 0.005;
        const targetX = lerp(b.bx, cx, pull) + driftX;
        const targetY = lerp(b.by, cy, pull) + driftY;

        b.x = lerp(b.x / W, targetX, 0.018) * W;
        b.y = lerp(b.y / H, targetY, 0.018) * H;

        const r = b.size * Math.min(W, H);
        const hue = (b.h1 + Math.sin(t * 0.4 + i) * (b.h2 - b.h1) * 0.5) % 360;

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        if (night) {
          g.addColorStop(0, 'hsla(' + hue + ',90%,65%,0.18)');
          g.addColorStop(0.4, 'hsla(' + hue + ',80%,55%,0.08)');
          g.addColorStop(1, 'hsla(' + hue + ',70%,45%,0)');
        } else {
          g.addColorStop(0, 'hsla(' + hue + ',80%,60%,0.12)');
          g.addColorStop(0.4, 'hsla(' + hue + ',70%,55%,0.05)');
          g.addColorStop(1, 'hsla(' + hue + ',60%,50%,0)');
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // ---- Dot Grid ----
      const INFLUENCE = 130;
      const MAX_PUSH = 28;

      dots.forEach(d => {
        const dx = d.bx - mouse.x;
        const dy = d.by - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let px = d.bx, py = d.by;

        if (dist < INFLUENCE && dist > 1) {
          const force = (1 - dist / INFLUENCE);
          const push = force * MAX_PUSH;
          px += (dx / dist) * push;
          py += (dy / dist) * push;
        }

        const proximity = clamp(1 - dist / INFLUENCE, 0, 1);
        const baseAlpha = night ? 0.18 : 0.12;
        const alpha = baseAlpha + proximity * 0.55;
        const dotR = night
          ? 1.1 + proximity * 2.2
          : 1.0 + proximity * 1.8;

        const hue = night ? 210 + proximity * 40 : 220 + proximity * 30;
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fillStyle = night
          ? 'rgba(148,163,184,' + alpha + ')'
          : 'rgba(99,102,241,' + (alpha * 0.8) + ')';
        ctx.fill();

        // Glow on hover nearby
        if (proximity > 0.4) {
          const glowG = ctx.createRadialGradient(px, py, 0, px, py, dotR * 4);
          glowG.addColorStop(0, 'hsla(' + hue + ',85%,65%,' + (proximity * 0.3) + ')');
          glowG.addColorStop(1, 'hsla(' + hue + ',85%,65%,0)');
          ctx.beginPath();
          ctx.arc(px, py, dotR * 4, 0, Math.PI * 2);
          ctx.fillStyle = glowG;
          ctx.fill();
        }
      });

      // ---- Cursor glow ring ----
      if (mouse.tx !== -9999) {
        const cr = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
        cr.addColorStop(0, night ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)');
        cr.addColorStop(0.5, night ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.02)');
        cr.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
        ctx.fillStyle = cr;
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', buildGrid);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
