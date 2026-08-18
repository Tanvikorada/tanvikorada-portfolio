'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * PaperPlane — scroll-driven paper plane + dotted trail.
 * Faithfully replicates the Zainab Kabira reference:
 *  - SVG trail path masked to reveal itself exactly behind the plane.
 *  - Plane sprite positioned + rotated along the EXACT same path via getPointAtLength().
 *  - Single unified path guarantees perfect alignment.
 */
export default function PaperPlane() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trailRef = useRef(null);
  const maskPathRef = useRef(null);
  const motionPathRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    let motionLen = 0;
    let lastMd = null;
    let lastAppear = null;

    function buildPath() {
      if (!containerRef.current) return;
      
      const w = document.documentElement.clientWidth;
      const h = containerRef.current.offsetHeight;
      
      const svg = trailRef.current.closest('svg');
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      
      // Zainab Kabira's exact reference paths (Featured Work section, 1440x2933)
      // We join the three disconnected paths with smooth Bezier curves to create one continuous flight.
      const rawPath = `M 210 110 C 110 200 70 325 88 410 C 103 488 192 528 255 555 C 600 600 1100 450 1225 513 C 1400 571 1408 837 1177 928 C 900 1000 700 900 526 944 C 343 950 -12 1108 114 1503 C 181 1632 428 1799 685 1627 C 1049 1385 1402 1429 1402 1762 C 1402 2099 1089 2154 826 2073 C 564 1992 279 1966 203 2255 C 123 2561 552 2708 800 2549 C 1047 2391 1393 2589 1253 2887`;

      // Scale the reference path to fit our page perfectly
      let d = rawPath.replace(/(-?\d+)\s+(-?\d+)/g, (match, px, py) => {
        const nx = (parseFloat(px) / 1440) * w;
        // Since our page is much taller than her 2933px section, we scale Y aggressively so it spans the entire page
        const ny = (parseFloat(py) / 2933) * h;
        return `${nx.toFixed(1)} ${ny.toFixed(1)}`;
      });

      motionPathRef.current.setAttribute('d', d);
      trailRef.current.setAttribute('d', d);
      maskPathRef.current.setAttribute('d', d);

      motionLen = motionPathRef.current.getTotalLength();
      
      // Setup the mask length
      maskPathRef.current.style.strokeDasharray = motionLen;
      maskPathRef.current.style.strokeDashoffset = motionLen;
    }

    const ease = (t) => t * t * (3 - 2 * t);

    function update() {
      if (!motionLen || !motionPathRef.current) return;
      
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;
      if (docH <= 0) return;

      // Scroll progress 0 to 1
      let p = Math.max(0, Math.min(1, scrollY / docH));
      
      // Reveal the plane gradually on first scroll
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const appear = reduce ? 1 : ease(Math.min(1, scrollY / (vh * 0.5)));

      const md = p * motionLen;

      if (md === lastMd && appear === lastAppear) return;
      const mdChanged = md !== lastMd;
      lastAppear = appear;

      if (!mdChanged) {
        planeRef.current.style.opacity = appear;
        trailRef.current.style.opacity = appear * 0.6;
        return;
      }
      lastMd = md;

      // Mask trails perfectly
      maskPathRef.current.style.strokeDashoffset = Math.max(0, motionLen - md);

      // Math for position and exact tangency
      const pt = motionPathRef.current.getPointAtLength(md);
      const pA = motionPathRef.current.getPointAtLength(Math.max(0, md - 1));
      const pB = motionPathRef.current.getPointAtLength(Math.min(motionLen, md + 1));
      const ang = Math.atan2(pB.y - pA.y, pB.x - pA.x) * 180 / Math.PI;

      // -31 deg offset because the plane.svg points slightly down-right
      planeRef.current.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${ang - 31}deg)`;
      planeRef.current.style.opacity = appear;
      trailRef.current.style.opacity = (appear * 0.6).toFixed(2);
    }

    function rebuild() {
      lastMd = null;
      lastAppear = null;
      buildPath();
      update();
    }

    // Wait for full layout to render before measuring heights
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        rebuild();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', rebuild);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', rebuild);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1, // Strictly behind all page content
        overflow: 'hidden',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        <defs>
          <mask id="planeTrailMask">
            <path
              ref={maskPathRef}
              fill="none"
              stroke="#fff"
              strokeWidth="60"
              strokeLinecap="butt"
            />
          </mask>
        </defs>

        {/* Hidden motion path for getPointAtLength */}
        <path
          ref={motionPathRef}
          fill="none"
          stroke="none"
        />

        {/* Dotted visible trail, exactly masked */}
        <path
          ref={trailRef}
          fill="none"
          stroke="var(--gold, #c9961a)"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          strokeLinecap="round"
          style={{
            mask: 'url(#planeTrailMask)',
            opacity: 0,
            transition: 'opacity 0.5s ease',
            filter: 'drop-shadow(0 2px 4px rgba(201,150,26,0.3))',
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
          width: '64px',
          height: 'auto',
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
          opacity: 0,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.3))',
        }}
      />
    </div>
  );
}
