'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * PaperPlane — Floating scroll-driven origami airplane + animated dotted trail.
 * Fixed viewport overlay:
 *  - Guaranteed 100% visible on top of all sections (z-index: 9999, pointer-events: none)
 *  - Fixed full viewport (100vw x 100vh) so it NEVER adds extra scroll height or bottom space
 *  - Rotates dynamically to match flight tangent angle
 *  - Renders a dotted flight trail behind the plane
 */
export default function PaperPlane() {
  const [mounted, setMounted] = useState(false);
  const planeRef = useRef(null);
  const pathRef = useRef(null);
  const trailRef = useRef(null);

  // Flight waypoints in viewport percentage [x%, y%] across 0..1 scroll progress
  const WAYPOINTS = [
    { p: 0.00, x: 0.95, y: 0.15 },
    { p: 0.08, x: 0.75, y: 0.30 },
    { p: 0.18, x: 0.40, y: 0.55 },
    { p: 0.28, x: 0.15, y: 0.35 },
    { p: 0.38, x: 0.35, y: 0.20 },
    { p: 0.48, x: 0.78, y: 0.45 },
    { p: 0.58, x: 0.82, y: 0.70 },
    { p: 0.68, x: 0.45, y: 0.60 },
    { p: 0.78, x: 0.18, y: 0.40 },
    { p: 0.88, x: 0.35, y: 0.75 },
    { p: 0.95, x: 0.65, y: 0.55 },
    { p: 1.00, x: 0.80, y: 0.70 },
  ];

  useEffect(() => {
    setMounted(true);

    let animFrameId = null;
    let targetP = 0;
    let currentP = 0;

    // Catmull-Rom spline interpolation
    function getSplinePoint(t) {
      const n = WAYPOINTS.length - 1;
      const scaled = t * n;
      const i0 = Math.max(0, Math.min(n, Math.floor(scaled)));
      const i1 = Math.min(n, i0 + 1);
      const iPrev = Math.max(0, i0 - 1);
      const iNext = Math.min(n, i1 + 1);

      const localT = scaled - i0;

      const p0 = WAYPOINTS[iPrev];
      const p1 = WAYPOINTS[i0];
      const p2 = WAYPOINTS[i1];
      const p3 = WAYPOINTS[iNext];

      const t2 = localT * localT;
      const t3 = t2 * localT;

      const calc = (v0, v1, v2, v3) => {
        return 0.5 * (
          (2 * v1) +
          (-v0 + v2) * localT +
          (2 * v0 - 5 * v1 + 4 * v2 - v3) * t2 +
          (-v0 + 3 * v1 - 3 * v2 + v3) * t3
        );
      };

      return {
        x: calc(p0.x, p1.x, p2.x, p3.x),
        y: calc(p0.y, p1.y, p2.y, p3.y),
      };
    }

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      targetP = Math.max(0, Math.min(1, window.scrollY / docH));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function renderLoop() {
      // Smooth interpolation for silky flight
      currentP += (targetP - currentP) * 0.12;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Calculate current point and slight forward point for tangent angle
      const pt = getSplinePoint(currentP);
      const delta = 0.01;
      const forwardT = Math.min(1, currentP + delta);
      const ptForward = getSplinePoint(forwardT);

      const px = pt.x * vw;
      const py = pt.y * vh;
      const fpx = ptForward.x * vw;
      const fpy = ptForward.y * vh;

      // Plane sprite nose offset (~ -31deg in sprite coordinate)
      const angleRad = Math.atan2(fpy - py, fpx - px);
      const angleDeg = (angleRad * 180) / Math.PI - 31;

      // Fade plane in once user starts scrolling, or subtle hint
      const opacity = Math.min(1, Math.max(0, (window.scrollY - 30) / 150));

      if (planeRef.current) {
        planeRef.current.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) rotate(${angleDeg}deg)`;
        planeRef.current.style.opacity = opacity;
      }

      // Draw dynamic trail up to current point
      if (trailRef.current && opacity > 0.05) {
        const steps = 40;
        const trailLen = Math.min(steps, Math.max(2, Math.floor(currentP * steps)));
        let d = '';
        for (let s = 0; s <= trailLen; s++) {
          const sampleT = (s / steps) * currentP;
          const sPt = getSplinePoint(sampleT);
          const sx = (sPt.x * vw).toFixed(1);
          const sy = (sPt.y * vh).toFixed(1);
          if (s === 0) {
            d += `M ${sx} ${sy}`;
          } else {
            d += ` L ${sx} ${sy}`;
          }
        }
        trailRef.current.setAttribute('d', d);
        trailRef.current.style.opacity = (opacity * 0.45).toFixed(2);
      } else if (trailRef.current) {
        trailRef.current.style.opacity = '0';
      }

      animFrameId = requestAnimationFrame(renderLoop);
    }

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        {/* Glowing Dotted Flight Trail */}
        <path
          ref={trailRef}
          fill="none"
          stroke="var(--gold, #c9961a)"
          strokeWidth="2"
          strokeDasharray="6 6"
          strokeLinecap="round"
          style={{
            transition: 'opacity 0.2s ease',
            filter: 'drop-shadow(0 0 6px rgba(201, 150, 26, 0.4))',
          }}
        />
      </svg>

      {/* The Origami Paper Plane Sprite */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={planeRef}
        src="/plane.svg"
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '56px',
          height: 'auto',
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25)) drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
