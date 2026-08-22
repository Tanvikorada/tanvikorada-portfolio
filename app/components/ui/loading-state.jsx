"use client";

import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────
 * LOADING STATE — pixel-grid loader for long-running work
 * ───────────────────────────────────────────────────────── */

const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3),
    c = i % 3;
  return (c + Math.abs(r - 1)) * 90;
});

const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
const orbit = Array.from({ length: 9 }, (_, i) => {
  const k = ORBIT_ORDER.indexOf(i);
  return k === -1 ? null : k * 110;
});

const PATTERNS = {
  Drive: { delays: chevron, dur: 650, round: false },
  Dots: { delays: chevron, dur: 650, round: true },
  Orbit: { delays: orbit, dur: 950, round: false },
};

function useElapsed() {
  const [ds, setDs] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDs((d) => d + 1), 100);
    return () => clearInterval(t);
  }, []);
  const total = ds / 10;
  if (total < 60) return `${total.toFixed(1)}s`;
  return `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`;
}

export default function LoadingState({
  label = "Initializing",
  variant = "Orbit",
}) {
  const elapsed = useElapsed();
  const { delays, dur, round } = PATTERNS[variant] ?? PATTERNS.Drive;

  return (
    <div className="flex w-fit items-center gap-3">
      <span aria-hidden className="grid grid-cols-[repeat(3,4px)] gap-[1.5px]" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 4px)', gap: '1.5px' }}>
        {delays.map((d, i) => (
          <span
            key={i}
            className={`${round ? "rounded-full" : "rounded-[1px]"}`}
            style={{
              width: '4px',
              height: '4px',
              backgroundColor: 'var(--text-heading)',
              opacity: d === null ? 0.1 : 0.4,
              animation:
                d === null
                  ? "none"
                  : `pixel-on ${dur}ms ease-in-out ${d}ms infinite`,
            }}
          />
        ))}
      </span>
      <span
        className="text-[13px] font-medium"
        style={{
          color: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          backgroundImage: "linear-gradient(90deg, var(--text-muted) 35%, var(--text-heading) 50%, var(--text-muted) 65%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-text 1.4s linear infinite",
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
      >
        {label}
      </span>
      <span className="font-mono text-[12px] tabular-nums" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
        {elapsed}
      </span>
    </div>
  );
}
