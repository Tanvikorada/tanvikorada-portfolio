'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function PlaygroundSection() {
  const containerRef = useRef(null);
  const plantsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const garden = containerRef.current;
    
    // Clear any existing plants (for strict mode)
    garden.innerHTML = ''; plantsRef.current = [];

    const rnd = (a, b) => a + Math.random() * (b - a);
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const phoneMQ = window.matchMedia('(max-width: 640px)');

    function wrap(w, h, inner) {
      return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">${inner}</svg>`;
    }

    const stemColor = '#84cc16';
    const leafColor = '#4d7c0f';
    const cream = '#fef3c7';
    const PETAL_EDGE = '#fcd34d';
    const DISC = '#451a03';
    const DISC_HI = '#78350f';
    const DISC_SH = '#1c1917';
    const LAV = ['#c084fc', '#a855f7', '#d8b4fe', '#f0abfc'];
    const olive = '#65a30d';

    function frond(bx, by, a, L, col) {
      const p = [[0, 0]];
      let x = 0, y = 0, currA = a;
      const segs = 6, sl = L / segs;
      for (let i = 0; i < segs; i++) {
        currA += rnd(-8, 8);
        x += Math.cos(currA * Math.PI / 180) * sl;
        y -= Math.sin(currA * Math.PI / 180) * sl;
        p.push([x, y]);
      }
      const d = `M${bx} ${by} ` + p.map(pt => `L${(bx + pt[0]).toFixed(1)} ${(by + pt[1]).toFixed(1)}`).join(' ');
      return `<path class="stem" d="${d}" stroke="${col}" stroke-width="${rnd(1.5, 2.5).toFixed(1)}" stroke-linecap="round" fill="none"/>`;
    }

    function petalPath(L, W, col, extra = '') {
      return `<path d="M0,0 C${W},${-L * 0.3} ${W * 0.8},${-L * 0.8} 0,${-L} C${-W * 0.8},${-L * 0.8} ${-W},${-L * 0.3} 0,0 Z" fill="${col}" ${extra}/>`;
    }

    function buildDaisy() {
      const w = 120, h = 180, cx = 60;
      let base = '', stem = '', calyx = '';
      const numCols = 3;
      for (let i = 0; i < numCols; i++) base += frond(cx, h - 2, 90 + rnd(-35, 35), rnd(h * 0.3, h * 0.6), leafColor);
      
      const top = rnd(h * 0.2, h * 0.4);
      stem = `<path class="stem" d="M${cx},${h} Q${cx + rnd(-15, 15)},${h * 0.7} ${cx},${top}" stroke="${stemColor}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      calyx = `<circle cx="${cx}" cy="${top + 2}" r="6" fill="${leafColor}"/>`;
      
      const n = 11 + ((Math.random() * 4) | 0);
      let petals = '';
      for (let i = 0; i < n; i++) {
        const a = 360 / n * i + rnd(-4, 4), L = rnd(27, 35);
        petals += `<g transform="translate(${cx} ${top}) rotate(${a.toFixed(1)})">${petalPath(L, rnd(7, 10), cream, `stroke="${PETAL_EDGE}" stroke-width="1"`)}</g>`;
      }
      const cr = rnd(8.5, 10.5);
      let disc = `<circle cx="${cx}" cy="${top}" r="${cr.toFixed(1)}" fill="${DISC}"/>`;
      for (let i = 0; i < 16; i++) { const aa = rnd(0, 6.28), rr = rnd(0, cr * 0.82); disc += `<circle cx="${(cx + Math.cos(aa) * rr).toFixed(1)}" cy="${(top + Math.sin(aa) * rr).toFixed(1)}" r="${rnd(0.8, 1.6).toFixed(1)}" fill="${Math.random() < 0.5 ? DISC_HI : DISC_SH}"/>`; }
      const head = `<g class="head">${calyx}${petals}${disc}</g>`;
      return { svg: wrap(w, h, base + stem + head), h };
    }

    function buildLavender() {
      const w = 80, h = 160, cx = 40;
      let leaves = '', stem = '';
      const numCols = 2;
      for (let i = 0; i < numCols; i++) leaves += frond(cx, h - 2, 90 + rnd(-25, 25), rnd(h * 0.4, h * 0.7), leafColor);
      
      const spikeBot = rnd(h * 0.5, h * 0.7);
      const spikeTop = rnd(h * 0.1, h * 0.2);
      stem = `<path class="stem" d="M${cx},${h} Q${cx + rnd(-10, 10)},${h * 0.7} ${cx},${spikeTop}" stroke="${stemColor}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      
      let florets = '';
      const rows = 18;
      for (let i = 0; i <= rows; i++) {
        const t = i / rows, yy = spikeBot + (spikeTop - spikeBot) * t, spread = (1 - t) * 7 + 3;
        for (let k = 0; k < 2 + ((Math.random() * 2) | 0); k++)
          florets += `<circle cx="${(cx + rnd(-spread, spread)).toFixed(1)}" cy="${(yy + rnd(-3, 3)).toFixed(1)}" r="${rnd(2.6, 4.3).toFixed(1)}" fill="${pick(LAV)}" opacity="${rnd(0.78, 1).toFixed(2)}"/>`;
      }
      return { svg: wrap(w, h, leaves + stem + `<g class="head">${florets}</g>`), h };
    }

    function buildFoliage() {
      const w = 100, h = 140, cx = 50;
      const n = 4 + ((Math.random() * 3) | 0);
      let g = '';
      for (let i = 0; i < n; i++) g += frond(cx + rnd(-10, 10), h - 2, (i - (n - 1) / 2) * rnd(20, 30), rnd(h * 0.7, h * 1.05), olive);
      return { svg: wrap(w, h, `<g class="head">${g}</g>`), h };
    }

    const defs = document.createElement('div');
    defs.innerHTML = `<svg width="0" height="0" style="position:absolute; width:0; height:0;"><defs><filter id="paper" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>`;
    garden.appendChild(defs);

    // Give a FULL PAGE of plants!
    const N = window.innerWidth > 1024 ? 60 : 40;
    
    // Distribute them evenly across width (0-100%) and height (0-80% of container)
    let storedScales = Array(N).fill(1.0);
    try {
      const s = localStorage.getItem('gardenScales');
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed.length === N) storedScales = parsed;
      }
    } catch(e) {}

    for (let i = 0; i < N; i++) {
      const roll = Math.random();
      const built = roll < 0.5 ? buildDaisy() : roll < 0.78 ? buildLavender() : buildFoliage();
      const el = document.createElement('div');
      
      el.className = 'garden-plant';
      el.innerHTML = built.svg;
      
      const xPct = (i / N) * 100 + rnd(-3, 3);
      // Make the plants fill the entire vertical height of the section!
      const depthPx = rnd(-10, 40); 
      
      el.style.position = 'absolute';
      el.style.left = xPct + '%';
      el.style.bottom = depthPx + 'px';
      
      // Z-index depends on depth so closer plants overlap further ones
      el.style.zIndex = Math.round(1000 - depthPx);
      
      let baseScale = phoneMQ.matches ? 0.6 : 1.0;
      let g0 = baseScale * storedScales[i];
      el.style.setProperty('--g', g0.toFixed(3));
      el.style.transformOrigin = 'bottom center';
      el.style.transform = 'scale(var(--g))';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      
      // Interaction
      el.addEventListener('mouseenter', () => {
        g0 = Math.min(baseScale * 1.5, g0 + 0.15);
        storedScales[i] = g0 / baseScale;
        el.style.setProperty('--g', g0.toFixed(3));
      el.style.transformOrigin = 'bottom center';
      el.style.transform = 'scale(var(--g))';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        try { localStorage.setItem('gardenScales', JSON.stringify(storedScales)); } catch(e) {}
      });
      
      garden.appendChild(el);
      plantsRef.current.push({ el, xPct });
    }
  }, []);

  return (
    <section id="playground" style={{ position: 'relative', width: '100%', height: '100vh', background: 'transparent', overflow: 'hidden', padding: 0 }}>
      {/* Background depth gradient for the garden */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 80%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '24px' }}
        >
          Water The Garden
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}
        >
          Hover to Grow
        </motion.h2>
      </div>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
    </section>
  );
}





