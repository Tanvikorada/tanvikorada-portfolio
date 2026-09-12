'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function PlaygroundSection() {
  const containerRef = useRef(null);
  const gardenRef = useRef(null);
  const plantsRef = useRef([]);
  const dropsRef = useRef([]);
  const animationRef = useRef(null);
  const cursorRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current || !gardenRef.current) return;
    const garden = gardenRef.current;
    
    // --- Sleek, Minimalist Plant Generation ---
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const rnd = (min, max) => Math.random() * (max - min) + min;
    const pick = arr => arr[(Math.random() * arr.length) | 0];

    function wrap(w, h, inner) {
      return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">${inner}</svg>`;
    }

    // Modern, vibrant, premium palette
    const STEM = '#65a30d'; 
    const LEAF = '#4d7c0f'; 
    const PETAL = '#fef08a'; 
    const CENTER = '#451a03'; 
    const LAV = ['#c084fc', '#a855f7', '#d8b4fe'];
    
    // Elegant smooth grass blade using a Quadratic Bezier curve
    function grassBlade(cx, cy, length, bend) {
      const ex = cx + bend;
      const ey = cy - length;
      const ctrlX = cx + bend * 0.5;
      const ctrlY = cy - length * 0.3;
      return `<path d="M${cx},${cy} Q${ctrlX},${ctrlY} ${ex},${ey}" stroke="${STEM}" stroke-width="${rnd(2.5, 4).toFixed(1)}" stroke-linecap="round" fill="none"/>`;
    }

    function buildDaisy() {
      const w = 160, h = 260, cx = 80;
      let base = '', stem = '';
      
      // 3-4 elegant grass blades at the base
      for (let i = 0; i < 3; i++) base += grassBlade(cx + rnd(-10, 10), h, rnd(60, 100), rnd(-40, 40));
      
      const top = rnd(80, 120);
      const bend = rnd(-20, 20);
      
      // Smooth modern stem
      stem = `<path d="M${cx},${h} Q${cx + bend * 1.5},${(h + top)/2} ${cx + bend},${top}" stroke="${STEM}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
      
      const headX = cx + bend;
      const headY = top;
      
      const n = 12;
      let petals = '';
      for (let i = 0; i < n; i++) {
        const a = (360 / n) * i;
        const L = rnd(28, 34);
        // Sleek pill-shaped petals using thick stroked lines
        petals += `<g transform="translate(${headX} ${headY}) rotate(${a})">
          <line x1="0" y1="0" x2="0" y2="-${L}" stroke="${PETAL}" stroke-width="12" stroke-linecap="round" />
        </g>`;
      }
      const disc = `<circle cx="${headX}" cy="${headY}" r="14" fill="${CENTER}"/>`;
      
      return { svg: wrap(w, h, base + stem + `<g>${petals}${disc}</g>`), h };
    }

    function buildLavender() {
      const w = 120, h = 240, cx = 60;
      let leaves = '', stem = '';
      
      for (let i = 0; i < 2; i++) leaves += grassBlade(cx + rnd(-8, 8), h, rnd(50, 90), rnd(-30, 30));
      
      const top = rnd(60, 100);
      const bend = rnd(-15, 15);
      
      stem = `<path d="M${cx},${h} Q${cx + bend * 1.2},${(h + top)/2} ${cx + bend},${top}" stroke="${STEM}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
      
      let florets = '';
      const spikeBot = rnd(h * 0.6, h * 0.75);
      const steps = 14;
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        // Interpolate along the curve for exact floret placement
        const yy = spikeBot + (top - spikeBot) * t;
        const xx = cx + bend * (1 - (h - yy)/(h - top)); // approximate curve X
        const spread = (1 - t) * 8 + 4;
        
        for (let k = 0; k < 3; k++) {
          florets += `<circle cx="${xx + rnd(-spread, spread)}" cy="${yy + rnd(-4, 4)}" r="${rnd(3.5, 5.5)}" fill="${pick(LAV)}" opacity="0.9"/>`;
        }
      }
      return { svg: wrap(w, h, leaves + stem + `<g>${florets}</g>`), h };
    }

    function buildFoliage() {
      const w = 140, h = 200, cx = 70, n = 6 + ((Math.random() * 4) | 0);
      let g = '';
      // Elegant, sweeping grass tufts
      for (let i = 0; i < n; i++) {
        g += grassBlade(cx + rnd(-15, 15), h, rnd(80, 180), rnd(-70, 70));
      }
      return { svg: wrap(w, h, `<g>${g}</g>`), h };
    }

    // --- Plant Garden Layout ---
    while (garden.firstChild) garden.removeChild(garden.firstChild);
    plantsRef.current = [];
    
    // Better, more organic distribution (fewer clumps, more even meadow)
    const N = window.innerWidth > 900 ? 35 : 20;
    
    let storedScales = Array(N).fill(1.0);
    try {
      const s = localStorage.getItem('gardenScales_premium');
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed.length === N) storedScales = parsed;
      }
    } catch(e) {}

    const isMobile = window.innerWidth <= 768;
    const SOIL_HEIGHT = 120; // Massive soil block to guarantee rooting

    for (let i = 0; i < N; i++) {
      const roll = Math.random();
      const built = roll < 0.4 ? buildDaisy() : roll < 0.7 ? buildLavender() : buildFoliage();
      
      // Even distribution with slight randomness, avoiding the very edges
      const xPct = clamp((i / N) * 100 + rnd(-3, 3), 2, 98); 
      
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.left = xPct + '%';
      
      // Roots go DEEP into the 120px opaque soil block
      const depthPx = rnd(20, 60);
      const baseY = SOIL_HEIGHT - depthPx;
      el.style.bottom = `${baseY}px`;
      
      // Crucial: Plants must have a LOWER z-index than the soil block (which is 50)
      el.style.zIndex = Math.round(20 - (depthPx / 3));
      
      let g0 = (isMobile ? rnd(0.4, 0.6) : rnd(0.5, 0.75)) * storedScales[i];
      el.style.setProperty('--g', g0.toFixed(3));
      el.style.transformOrigin = 'bottom center';
      el.style.transform = 'scale(var(--g))';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      
      const stalk = document.createElement('div');
      stalk.innerHTML = built.svg;
      const swayA = rnd(1.0, 2.5).toFixed(1); // gentler sway
      const swayT = rnd(5, 8).toFixed(1);
      const swayD = rnd(-4, 0).toFixed(1);
      stalk.style.animation = `sway ${swayT}s ease-in-out ${swayD}s infinite alternate`;
      stalk.style.transformOrigin = 'bottom center';
      stalk.style.setProperty('--swayA', `${swayA}deg`);
      
      el.appendChild(stalk);
      garden.appendChild(el);
      
      plantsRef.current.push({ el, g: g0, max: 1.4, fullH: built.h, xPct, baseY, baseScale: g0 / storedScales[i], idx: i });
    }

    // --- Droplet Particle System ---
    const drops = dropsRef.current;
    const GRAV = 0.35; // slightly floatier water

    function emit(fx0, fy0, n, spread, vy0) {
      const cap = 90;
      for (let i = 0; i < n && drops.length < cap; i++) {
        const r = rnd(3.0, 6.0);
        const d = document.createElement('div');
        d.style.position = 'absolute';
        d.style.width = r.toFixed(1) + 'px';
        d.style.height = r.toFixed(1) + 'px';
        d.style.background = 'rgba(255,255,255,0.85)';
        d.style.borderRadius = '50%';
        d.style.pointerEvents = 'none';
        d.style.zIndex = 200; 
        d.style.boxShadow = '0 0 8px rgba(56, 189, 248, 0.8)'; // brighter watery glow
        
        garden.appendChild(d);
        drops.push({ el: d, x: fx0 + rnd(-5, 5), y: fy0 + rnd(-5, 5), vx: rnd(-spread, spread), vy: vy0 + rnd(-0.5, 1.5), r, a: 1 });
      }
    }

    function tick() {
      const gh = containerRef.current?.clientHeight || 0;
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.vy += GRAV; d.x += d.vx; d.y += d.vy;
        
        // Splash exactly on the top edge of the 120px soil block
        const soilLevel = gh - SOIL_HEIGHT; 
        if (d.y >= soilLevel) { 
          d.y = soilLevel; 
          d.a -= 0.12; 
          d.vx *= 0.8; 
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
      const r = containerRef.current.getBoundingClientRect(); 
      return { x: e.clientX - r.left, y: e.clientY - r.top, r }; 
    };

    let lastSpray = 0;
    
    const handleMove = e => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const now = performance.now();
      if (now - lastSpray > 100) {
        lastSpray = now;
        const p = toGarden(e);
        emit(p.x, p.y + 10, 1, 0.6, 0.2);
      }
    };

    const handleDown = e => {
      const p = toGarden(e);
      emit(p.x, p.y + 10, 20, 3.5, -1.0); // bigger splash
      
      const gw = p.r.width;
      const gh = p.r.height;
      
      let changed = false;
      plantsRef.current.forEach(pl => {
        const bx = gw * (pl.xPct / 100);
        const by = gh - pl.baseY; 
        const cy = clamp(p.y, by - (pl.fullH * pl.g) - 8, by);
        const dist = Math.hypot(p.x - bx, p.y - cy);
        
        if (dist < 140) { // wider watering range
          if (pl.g < pl.max) {
            pl.g = Math.min(pl.max, pl.g + rnd(0.18, 0.28));
            pl.el.style.setProperty('--g', pl.g.toFixed(3));
            storedScales[pl.idx] = pl.g / pl.baseScale;
            changed = true;
          }
        }
      });
      
      if (changed) {
        try { localStorage.setItem('gardenScales_premium', JSON.stringify(storedScales)); } catch(e) {}
      }
    };
    
    const handleEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = 1;
      document.body.style.cursor = 'none';
    };
    
    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = 0;
      document.body.style.cursor = ''; 
    };

    const c = containerRef.current;
    c.addEventListener('pointermove', handleMove, { passive: true });
    c.addEventListener('pointerdown', handleDown);
    c.addEventListener('pointerenter', handleEnter);
    c.addEventListener('pointerleave', handleLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (c) {
        c.removeEventListener('pointermove', handleMove);
        c.removeEventListener('pointerdown', handleDown);
        c.removeEventListener('pointerenter', handleEnter);
        c.removeEventListener('pointerleave', handleLeave);
      }
      document.body.style.cursor = '';
      dropsRef.current.forEach(d => d.el.remove());
      dropsRef.current = [];
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sway {
          from { transform: skewX(calc(var(--swayA) * -1)) }
          to   { transform: skewX(var(--swayA)) }
        }
      `}} />
      
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
          border: '2px solid rgba(255,255,255,1)',
          boxShadow: '0 0 12px rgba(255,255,255,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ width: 6, height: 6, background: 'white', borderRadius: '50%' }} />
        </div>
      </div>

      <section 
        id="playground" 
        ref={containerRef}
        style={{ 
          position: 'relative', width: '100%', height: '70vh', 
          background: 'transparent', overflow: 'hidden', 
          padding: 0, cursor: 'none'
        }}
      >
        {/* Massive flawless background blur. Hardcoded to 24px with no mask so it CANNOT fail on any browser. */}
        <div style={{ 
          position: 'absolute', inset: 0, zIndex: 0, 
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          background: 'rgba(255, 255, 255, 0.03)' // Just enough to catch the blur
        }} />

        {/* Text Container locked cleanly to the top 15% so it NEVER touches the flowers */}
        <div style={{ 
          position: 'absolute', top: '10%', left: 0, right: 0, 
          zIndex: 60, pointerEvents: 'none', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' 
        }}>
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '16px', background: 'var(--bg-glass)', padding: '6px 20px', borderRadius: '100px', backdropFilter: 'blur(12px)', border: '1px solid var(--border)' }}
          >
            Let's grow together
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', 
              color: 'var(--text-heading)', textAlign: 'center',
              textShadow: '0 4px 16px rgba(0,0,0,0.2)' 
            }}
          >
            Click to water the garden
          </motion.h2>
        </div>

        {/* The true opaque SOIL BLOCK. 
            Using a guaranteed dark earthy tone (#0a0a0a) so it's impossible to confuse with the background grid or be transparent. */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '120px', background: '#0a0a0a',
          zIndex: 50, borderTop: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 -20px 40px rgba(0,0,0,0.3)'
        }} />
        
        {/* The garden bed. It strictly has zIndex: 10.
            Because the soil block has zIndex: 50, the SVG stems will visually disappear behind the soil block. */}
        <div ref={gardenRef} style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }} />
      </section>
    </>
  );
}
