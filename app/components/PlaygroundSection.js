'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function PlaygroundSection() {
  const containerRef = useRef(null);
  const gardenRef = useRef(null);
  const plantsRef = useRef([]);
  const dropsRef = useRef([]);
  const animationRef = useRef(null);
  
  // Custom cursor references
  const cursorRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current || !gardenRef.current) return;
    const garden = gardenRef.current;
    
    // --- Procedural Plant Generation ---
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const rnd = (min, max) => Math.random() * (max - min) + min;
    const pick = arr => arr[(Math.random() * arr.length) | 0];

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
      return `<path d="${d}" stroke="${col}" stroke-width="${rnd(1.5, 2.5).toFixed(1)}" stroke-linecap="round" fill="none"/>`;
    }

    function petalPath(L, W, col, extra = '') {
      return `<path d="M0,0 C${W},${-L * 0.3} ${W * 0.8},${-L * 0.8} 0,${-L} C${-W * 0.8},${-L * 0.8} ${-W},${-L * 0.3} 0,0 Z" fill="${col}" ${extra}/>`;
    }

    function buildDaisy() {
      const w = 120, h = 180, cx = 60;
      let base = '', stem = '', calyx = '';
      for (let i = 0; i < 3; i++) base += frond(cx, h - 2, 90 + rnd(-35, 35), rnd(h * 0.3, h * 0.6), leafColor);
      
      const top = rnd(h * 0.2, h * 0.4);
      stem = `<path d="M${cx},${h} Q${cx + rnd(-15, 15)},${h * 0.7} ${cx},${top}" stroke="${stemColor}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      calyx = `<circle cx="${cx}" cy="${top + 2}" r="6" fill="${leafColor}"/>`;
      
      const n = 11 + ((Math.random() * 4) | 0);
      let petals = '';
      for (let i = 0; i < n; i++) {
        const a = 360 / n * i + rnd(-4, 4), L = rnd(27, 35);
        petals += `<g transform="translate(${cx} ${top}) rotate(${a.toFixed(1)})">${petalPath(L, rnd(7, 10), cream, `stroke="${PETAL_EDGE}" stroke-width="1"`)}</g>`;
      }
      const cr = rnd(8.5, 10.5);
      let disc = `<circle cx="${cx}" cy="${top}" r="${cr.toFixed(1)}" fill="${DISC}"/>`;
      for (let i = 0; i < 16; i++) { 
        const aa = rnd(0, 6.28), rr = rnd(0, cr * 0.82); 
        disc += `<circle cx="${(cx + Math.cos(aa) * rr).toFixed(1)}" cy="${(top + Math.sin(aa) * rr).toFixed(1)}" r="${rnd(0.8, 1.6).toFixed(1)}" fill="${Math.random() < 0.5 ? DISC_HI : DISC_SH}"/>`; 
      }
      return { svg: wrap(w, h, base + stem + `<g>${calyx}${petals}${disc}</g>`), h };
    }

    function buildLavender() {
      const w = 80, h = 160, cx = 40;
      let leaves = '', stem = '';
      for (let i = 0; i < 2; i++) leaves += frond(cx, h - 2, 90 + rnd(-25, 25), rnd(h * 0.4, h * 0.7), leafColor);
      
      const spikeBot = rnd(h * 0.5, h * 0.7), spikeTop = rnd(h * 0.1, h * 0.2);
      stem = `<path d="M${cx},${h} Q${cx + rnd(-10, 10)},${h * 0.7} ${cx},${spikeTop}" stroke="${stemColor}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      
      let florets = '';
      const rows = 18;
      for (let i = 0; i <= rows; i++) {
        const t = i / rows, yy = spikeBot + (spikeTop - spikeBot) * t, spread = (1 - t) * 7 + 3;
        for (let k = 0; k < 2 + ((Math.random() * 2) | 0); k++) {
          florets += `<circle cx="${(cx + rnd(-spread, spread)).toFixed(1)}" cy="${(yy + rnd(-3, 3)).toFixed(1)}" r="${rnd(2.6, 4.3).toFixed(1)}" fill="${pick(LAV)}" opacity="${rnd(0.78, 1).toFixed(2)}"/>`;
        }
      }
      return { svg: wrap(w, h, leaves + stem + `<g>${florets}</g>`), h };
    }

    function buildFoliage() {
      const w = 100, h = 140, cx = 50, n = 4 + ((Math.random() * 3) | 0);
      let g = '';
      for (let i = 0; i < n; i++) g += frond(cx + rnd(-10, 10), h - 2, (i - (n - 1) / 2) * rnd(20, 30), rnd(h * 0.7, h * 1.05), olive);
      return { svg: wrap(w, h, `<g>${g}</g>`), h };
    }

    // --- Plant Garden Layout ---
    // Clear any previous plants (for React strict mode)
    while (garden.firstChild) garden.removeChild(garden.firstChild);
    plantsRef.current = [];
    
    // We create tight clumps exactly like the reference site
    const N = window.innerWidth > 900 ? 25 : 15;
    const nc = 5 + ((Math.random() * 2) | 0); // 5-6 clumps
    const centers = [];
    for (let c = 0; c < nc; c++) centers.push(clamp((c + 0.5) / nc * 100 + rnd(-5, 5), 7, 93));

    let storedScales = Array(N).fill(1.0);
    try {
      const s = localStorage.getItem('gardenScales_ref');
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed.length === N) storedScales = parsed;
      }
    } catch(e) {}

    const isMobile = window.innerWidth <= 768;

    for (let i = 0; i < N; i++) {
      const roll = Math.random();
      const built = roll < 0.5 ? buildDaisy() : roll < 0.78 ? buildLavender() : buildFoliage();
      
      const xPct = clamp(centers[i % nc] + rnd(-8, 8), 2, 98); // tight clump around center
      
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.left = xPct + '%';
      
      // Sink slightly below the ridge so they read planted
      const depthPx = rnd(4, 28);
      const baseY = isMobile ? 120 + depthPx : 60 + depthPx;
      el.style.bottom = `${baseY}px`;
      el.style.zIndex = Math.round(100 - depthPx);
      
      // Set growth scale
      let g0 = (isMobile ? rnd(0.4, 0.7) : rnd(0.55, 0.95)) * storedScales[i];
      el.style.setProperty('--g', g0.toFixed(3));
      el.style.transformOrigin = 'bottom center';
      el.style.transform = 'scale(var(--g))';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      
      // Sway animation wrapper
      const stalk = document.createElement('div');
      stalk.innerHTML = built.svg;
      const swayA = rnd(1.4, 3.4).toFixed(1);
      const swayT = rnd(4, 7).toFixed(1);
      const swayD = rnd(-3, 0).toFixed(1);
      stalk.style.animation = `sway ${swayT}s ease-in-out ${swayD}s infinite alternate`;
      stalk.style.transformOrigin = 'bottom center';
      stalk.style.setProperty('--swayA', `${swayA}deg`);
      
      el.appendChild(stalk);
      garden.appendChild(el);
      
      plantsRef.current.push({ el, g: g0, max: 1.75, fullH: built.h, xPct, baseY, baseScale: g0 / storedScales[i], idx: i });
    }

    // --- Droplet Particle System (like reference emit) ---
    const drops = dropsRef.current;
    const GRAV = 0.42;

    function emit(fx0, fy0, n, spread, vy0) {
      const cap = 90;
      for (let i = 0; i < n && drops.length < cap; i++) {
        const r = rnd(2.4, 4.6);
        const d = document.createElement('div');
        d.style.position = 'absolute';
        d.style.width = r.toFixed(1) + 'px';
        d.style.height = r.toFixed(1) + 'px';
        d.style.background = 'rgba(255,255,255,0.7)';
        d.style.borderRadius = '50%';
        d.style.pointerEvents = 'none';
        d.style.zIndex = 200;
        d.style.boxShadow = '0 0 4px rgba(56, 189, 248, 0.5)';
        
        garden.appendChild(d);
        drops.push({ el: d, x: fx0 + rnd(-4, 4), y: fy0 + rnd(-3, 3), vx: rnd(-spread, spread), vy: vy0 + rnd(0, 1.6), r, a: 1 });
      }
    }

    function tick() {
      const gw = garden.clientWidth;
      const gh = garden.clientHeight;
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.vy += GRAV; d.x += d.vx; d.y += d.vy;
        
        // Dissolve when it hits the ground plane
        const soilLevel = gh - (isMobile ? 120 : 60); 
        if (d.y >= soilLevel) { 
          d.y = soilLevel; 
          d.a -= 0.16; 
          d.vx *= 0.7; 
        }
        
        if (d.a <= 0) { 
          d.el.remove(); 
          drops.splice(i, 1); 
          continue; 
        }
        
        d.el.style.transform = `translate(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px) scale(${d.a})`;
        d.el.style.opacity = d.a;
      }
      animationRef.current = requestAnimationFrame(tick);
    }
    
    tick();

    // --- Pointer Interactions ---
    const toGarden = e => { 
      const r = garden.getBoundingClientRect(); 
      return { x: e.clientX - r.left, y: e.clientY - r.top, r }; 
    };

    let lastSpray = 0;
    
    const handleMove = e => {
      // Update custom cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      
      const now = performance.now();
      if (now - lastSpray > 120) {
        lastSpray = now;
        const p = toGarden(e);
        // Subtle continuous mist while moving
        emit(p.x, p.y + 10, 1, 0.5, 0.4);
      }
    };

    const handleDown = e => {
      const p = toGarden(e);
      // Click burst
      emit(p.x, p.y + 10, 16, 2.6, 0.6);
      
      const gw = p.r.width;
      const gh = p.r.height;
      
      // Check distance to plants
      let changed = false;
      plantsRef.current.forEach(pl => {
        const bx = gw * (pl.xPct / 100);
        const by = gh - pl.baseY; // actual pixel Y on screen
        
        // Nearest point on stem
        const cy = clamp(p.y, by - (pl.fullH * pl.g) - 8, by);
        const dist = Math.hypot(p.x - bx, p.y - cy);
        
        if (dist < 100) {
          if (pl.g < pl.max) {
            pl.g = Math.min(pl.max, pl.g + rnd(0.14, 0.24));
            pl.el.style.setProperty('--g', pl.g.toFixed(3));
            storedScales[pl.idx] = pl.g / pl.baseScale;
            changed = true;
          }
        }
      });
      
      if (changed) {
        try { localStorage.setItem('gardenScales_ref', JSON.stringify(storedScales)); } catch(e) {}
      }
    };
    
    const handleEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = 1;
      document.body.style.cursor = 'none'; // hide default cursor over garden
    };
    
    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = 0;
      document.body.style.cursor = ''; 
    };

    containerRef.current.addEventListener('pointermove', handleMove, { passive: true });
    containerRef.current.addEventListener('pointerdown', handleDown);
    containerRef.current.addEventListener('pointerenter', handleEnter);
    containerRef.current.addEventListener('pointerleave', handleLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (containerRef.current) {
        containerRef.current.removeEventListener('pointermove', handleMove);
        containerRef.current.removeEventListener('pointerdown', handleDown);
        containerRef.current.removeEventListener('pointerenter', handleEnter);
        containerRef.current.removeEventListener('pointerleave', handleLeave);
      }
      document.body.style.cursor = '';
      dropsRef.current.forEach(d => d.el.remove());
      dropsRef.current = [];
    };
  }, []);

  return (
    <>
      {/* Required keyframes injected for the sway */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sway {
          from { transform: skewX(calc(var(--swayA) * -1)) }
          to   { transform: skewX(var(--swayA)) }
        }
      `}} />
      
      {/* Custom Garden Sprayer Cursor */}
      <div 
        ref={cursorRef} 
        style={{
          position: 'fixed', top: -16, left: -16, width: 32, height: 32,
          pointerEvents: 'none', zIndex: 9999, opacity: 0,
          transition: 'opacity 0.2s ease', mixBlendMode: 'difference'
        }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.8)',
          boxShadow: '0 0 8px rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ width: 4, height: 4, background: 'white', borderRadius: '50%' }} />
        </div>
      </div>

      <section 
        id="playground" 
        ref={containerRef}
        style={{ 
          position: 'relative', width: '100%', height: '50vh', 
          background: 'transparent', overflow: 'hidden', 
          padding: 0, cursor: 'none'
        }}
      >
        {/* Ground/Soil layer at the bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '60px', background: 'var(--bg-solid, #020617)',
          zIndex: 50, borderTop: '1px solid rgba(255,255,255,0.05)'
        }} />
        
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', top: '-10vh' }}>
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '24px' }}
          >
            Let's grow together
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}
          >
            Click to water the garden
          </motion.h2>
        </div>
        
        {/* The actual garden bed where plants and drops go */}
        <div ref={gardenRef} style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }} />
      </section>
    </>
  );
}
