'use client';
import { useEffect, useRef } from 'react';

/**
 * PaperPlane — scroll-driven paper plane + dotted trail.
 * Faithfully replicates the Zainab Kabira reference:
 *  - SVG trail path revealed with a dash-offset mask as the plane flies
 *  - Plane sprite positioned + rotated along the path via getPointAtLength()
 *  - Three connected bezier segments across the full page
 *  - Fades in on first scroll, out between segments
 */
export default function PaperPlane() {
  const containerRef = useRef(null);
  const spriteRef = useRef(null);
  const trailPathRef = useRef(null);
  const maskPathRef = useRef(null);
  const motionPathRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sprite = spriteRef.current;
    const trail = trailPathRef.current;
    const maskPath = maskPathRef.current;
    const motion = motionPathRef.current;
    if (!container || !sprite || !trail || !maskPath || !motion) return;

    const PLANE_OFFSET = -31; // nose angle correction
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let motionLen = 0;
    let lastMd = null;
    let lastAppear = null;
    let lastFade = 1;

    // Build the path dynamically from window size
    function buildPath() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      // Three sweeping bezier segments that route across the full page
      const seg1 = `M ${vw * 0.14} ${vh * 0.18}
        C ${vw * 0.05} ${vh * 0.35}  ${vw * 0.02} ${vh * 0.6}  ${vw * 0.08} ${vh * 0.75}
        C ${vw * 0.12} ${vh * 0.88}  ${vw * 0.28} ${vh * 0.95} ${vw * 0.38} ${vh * 1.05}`;

      const seg2 = `M ${vw * 0.62} ${vh * 1.2}
        C ${vw * 0.85} ${vh * 1.28}  ${vw * 0.95} ${vh * 1.55} ${vw * 0.82} ${vh * 1.8}
        C ${vw * 0.72} ${vh * 2.0}   ${vw * 0.55} ${vh * 2.1}  ${vw * 0.42} ${vh * 2.3}`;

      const seg3 = `M ${vw * 0.18} ${vh * 2.5}
        C ${vw * 0.04} ${vh * 2.7}   ${vw * 0.06} ${vh * 3.0}  ${vw * 0.25} ${vh * 3.2}
        C ${vw * 0.45} ${vh * 3.4}   ${vw * 0.72} ${vh * 3.5}  ${vw * 0.85} ${vh * 3.7}`;

      // Visible trail = all 3 subpaths (with gap between them)
      const visD = `${seg1} ${seg2} ${seg3}`;
      trail.setAttribute('d', visD);

      // Continuous motion path = seg1 + bridge + seg2 + bridge + seg3
      const bridge1 = `C ${vw * 0.48} ${vh * 1.1} ${vw * 0.56} ${vh * 1.15} ${vw * 0.62} ${vh * 1.2}`;
      const bridge2 = `C ${vw * 0.12} ${vh * 2.35} ${vw * 0.15} ${vh * 2.42} ${vw * 0.18} ${vh * 2.5}`;

      const motionD = `${seg1} ${bridge1}
        ${seg2.replace(/^M[^C]*/, '')} ${bridge2}
        ${seg3.replace(/^M[^C]*/, '')}`;

      motion.setAttribute('d', motionD);
      motionLen = motion.getTotalLength();

      maskPath.setAttribute('d', motionD);
      maskPath.style.strokeDasharray = motionLen;
      maskPath.style.strokeDashoffset = motionLen;

      // Set SVG viewBox to full page
      const svg = trail.closest('svg');
      svg.setAttribute('viewBox', `0 0 ${vw} ${docH}`);
      svg.style.width = `${vw}px`;
      svg.style.height = `${docH}px`;
    }

    function ease(t) {
      t = Math.max(0, Math.min(1, t));
      return t * t * (3 - 2 * t);
    }

    function update() {
      if (!motionLen) return;
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const vh = window.innerHeight;

      // p = 0 at top, 1 at bottom of page
      const p = Math.max(0, Math.min(1, scrollY / (docH * 0.88)));

      // Fade in after first scroll
      const appear = reduce ? 1 : ease(scrollY / (vh * 0.7));

      const md = p * motionLen;

      if (md === lastMd && appear === lastAppear) return;
      lastAppear = appear;
      const mdChanged = md !== lastMd;

      if (!mdChanged) {
        sprite.style.opacity = lastFade * appear;
        return;
      }
      lastMd = md;

      // Reveal trail
      maskPath.style.strokeDashoffset = Math.max(0, motionLen - md);

      // Get position and angle
      const pt = motion.getPointAtLength(md);
      const pA = motion.getPointAtLength(Math.max(0, md - 2));
      const pB = motion.getPointAtLength(Math.min(motionLen, md + 2));
      const ang = Math.atan2(pB.y - pA.y, pB.x - pA.x) * 180 / Math.PI;

      lastFade = appear;
      sprite.style.opacity = appear > 0 ? appear : 0;
      sprite.style.transform = `translate(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px) translate(-50%, -50%) rotate(${ang + PLANE_OFFSET}deg)`;
    }

    function rebuild() {
      lastMd = null;
      lastAppear = null;
      buildPath();
      update();
    }

    // Wait for full DOM render before first build
    requestAnimationFrame(() => {
      rebuild();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', rebuild);
    });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', rebuild);
    };
  }, []);

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
        zIndex: 5,
        overflow: 'visible',
      }}
    >
      <svg
        fill="none"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
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

        {/* Dotted visible trail — masked to reveal as plane flies */}
        <path
          ref={trailPathRef}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="8 6"
          strokeLinecap="round"
          style={{
            mask: 'url(#planeTrailMask)',
            color: 'rgba(26,18,8,0.3)',
          }}
        />
      </svg>

      {/* The paper plane sprite */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={spriteRef}
        src="/plane.svg"
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '72px',
          height: 'auto',
          transformOrigin: 'center center',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, opacity',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
