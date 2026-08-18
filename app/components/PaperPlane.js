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
      
      const w = document.documentElement.clientWidth; // Use clientWidth to exclude scrollbar width
      // We read the container height (which spans the rest of the page below Hero)
      const h = containerRef.current.offsetHeight;
      
      const svg = trailRef.current.closest('svg');
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      
      // Build an elegant asymmetric swooping path down the page
      const loops = Math.max(3, Math.floor(h / 800)); // Dynamic loops based on height
      const step = h / loops;
      
      let d = `M ${w * 0.85} 0`; // Start top right
      
      for(let i = 0; i < loops; i++) {
        const y0 = i * step;
        const y1 = (i + 1) * step;
        if (i % 2 === 0) {
          // Curve right to left (organic swoop)
          d += ` C ${w * 0.9} ${y0 + step * 0.3}, ${w * 0.05} ${y0 + step * 0.6}, ${w * 0.15} ${y1}`;
        } else {
          // Curve left to right (shallower glide)
          d += ` C ${w * 0.3} ${y0 + step * 0.4}, ${w * 0.95} ${y0 + step * 0.7}, ${w * 0.85} ${y1}`;
        }
      }

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
        zIndex: 0, // Behind the content, above the background
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
