'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function PlaygroundSection() {
  const containerRef = useRef(null);
  const gardenRef = useRef(null);
  const landRef = useRef(null);
  const cursorRef = useRef(null);
  const [isNight, setIsNight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains('night'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const garden = gardenRef.current;
    const footer = containerRef.current;
    if (!garden || !footer) return;

    garden.innerHTML = ''; // Reset

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const rnd = (min, max) => min + Math.random() * (max - min);
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    const ORANGE = ['#f97316', '#fb923c', '#ea580c'];
    const WHITE = ['#ffffff', '#f8fafc', '#f1f5f9'];
    const BLUE = ['#38bdf8', '#0ea5e9', '#7dd3fc'];
    const OLIVE = ['#65a30d', '#4d7c0f', '#3f6212', '#84cc16'];
    const LAVENDER = ['#c084fc', '#a855f7', '#d8b4fe'];

    function wrap(w, h, inner) { 
      return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible; filter:url(#ft-paint)">${inner}</svg>`; 
    }

    function leaf(x, y, ang, len, col) {
      return `<path d="M ${x} ${y} Q ${x + Math.sin(ang - 0.2) * len} ${y - Math.cos(ang - 0.2) * len} ${x + Math.sin(ang) * len * 1.5} ${y - Math.cos(ang) * len * 1.5} Q ${x + Math.sin(ang + 0.2) * len} ${y - Math.cos(ang + 0.2) * len} ${x} ${y}" fill="${col}"/>`;
    }

    function frond(x, y, ang, len, col) {
      let g = `<path d="M ${x} ${y} Q ${x + Math.sin(ang) * len / 2} ${y - Math.cos(ang) * len / 2} ${x + Math.sin(ang) * len} ${y - Math.cos(ang) * len}" stroke="${col}" stroke-width="2" fill="none"/>`;
      const steps = 6;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const px = x + Math.sin(ang) * len * t;
        const py = y - Math.cos(ang) * len * t;
        const ll = len * 0.3 * (1 - t);
        g += leaf(px, py, ang - 1, ll, col) + leaf(px, py, ang + 1, ll, col);
      }
      return g;
    }

    function buildDaisy() {
      const h = rnd(100, 160), w = 120, cx = w / 2;
      const petals = Math.random() < 0.5 ? WHITE : ORANGE;
      const olive = pick(OLIVE);
      let stem = `<path d="M ${cx} ${h} Q ${cx + rnd(-20, 20)} ${h / 2} ${cx} 15" stroke="${olive}" stroke-width="4" fill="none"/>`;
      let leaves = '';
      for (let i = 0; i < 3; i++) {
        const y = h * rnd(0.3, 0.8);
        leaves += leaf(cx, y, Math.random() > 0.5 ? -1.2 : 1.2, rnd(30, 50), olive);
      }
      const np = 12; let fl = '';
      for (let i = 0; i < np; i++) {
        const a = (i / np) * Math.PI * 2;
        fl += leaf(cx, 15, a, 25, pick(petals));
      }
      fl += `<circle cx="${cx}" cy="15" r="8" fill="#eab308"/>`;
      return { svg: wrap(w, h, leaves + stem + `<g class="head">${fl}</g>`), h };
    }

    function buildLavender() {
      const h = rnd(120, 180), w = 80, cx = w / 2;
      const olive = pick(OLIVE);
      let stem = `<path d="M ${cx} ${h} Q ${cx + rnd(-10, 10)} ${h / 2} ${cx} 10" stroke="${olive}" stroke-width="3" fill="none"/>`;
      let leaves = '';
      for (let i = 0; i < 4; i++) {
        const y = h * rnd(0.4, 0.9);
        leaves += leaf(cx, y, Math.random() > 0.5 ? -1 : 1, rnd(20, 40), olive);
      }
      let florets = '';
      for (let y = 15; y < h * 0.4; y += 8) {
        for (let i = 0; i < 3; i++) {
          florets += `<circle cx="${cx + rnd(-8, 8)}" cy="${y + rnd(-4, 4)}" r="${rnd(3, 6)}" fill="${pick(LAVENDER)}"/>`;
        }
      }
      return { svg: wrap(w, h, leaves + stem + `<g class="head">${florets}</g>`), h };
    }

    function buildFoliage() {
      const h = rnd(90, 140), w = 110, cx = w / 2;
      const olive = pick(OLIVE);
      let g = '';
      const n = 4 + ((Math.random() * 3) | 0);
      for (let i = 0; i < n; i++) g += frond(cx + rnd(-10, 10), h - 2, (i - (n - 1) / 2) * rnd(20, 30), rnd(h * 0.7, h * 1.05), olive);
      return { svg: wrap(w, h, `<g class="head">${g}</g>`), h };
    }

    const defs = document.createElement('div');
    defs.setAttribute('aria-hidden', 'true');
    defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    defs.innerHTML = `<svg><defs><filter id="ft-paint" x="-30%" y="-30%" width="160%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.028 0.04" numOctaves="2" seed="6" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter></defs></svg>`;
    garden.appendChild(defs);

    let ridgeProf = null, landTop = 0, landH = 0, landW = 0, footerW = 0;
    
    function buildRidge(img, requireDark) {
      try {
        const W = img.naturalWidth, H = img.naturalHeight;
        if (!W) return null;
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, W, H).data;
        const S = 72, prof = [];
        for (let s = 0; s < S; s++) {
          const col = Math.min(W - 1, ((s + 0.5) / S * W) | 0);
          let ridge = H * 0.45;
          for (let y = 0; y < H; y++) { const i = (y * W + col) * 4; if (d[i + 3] > 200 && (!requireDark || (d[i] + d[i + 1] + d[i + 2]) / 3 < 72)) { ridge = y; break; } }
          prof.push(ridge / H);
        }
        return prof;
      } catch (e) { return null; }
    }

    const imgSrc = isNight ? '/assets/land meadow-night.png' : '/assets/footer-land.png';
    const landImg = new Image();
    landImg.crossOrigin = 'Anonymous'; 
    landImg.onload = () => {
      ridgeProf = buildRidge(landImg, !isNight);
      
      const lr = landRef.current ? landRef.current.getBoundingClientRect() : { top: 0, height: 400, width: window.innerWidth };
      const fr = footer.getBoundingClientRect();
      landH = lr.height; landW = lr.width;
      footerW = fr.width;
      landTop = lr.top - fr.top; 
      
      function imgFrac(xf) {
        if (!landW) return clamp(xf, 0, 1);
        return clamp(0.5 + (clamp(xf, 0, 1) - 0.5) * (footerW / landW), 0, 1);
      }
      
      function ridgeFrac(xf) {
        if (!ridgeProf) return 0.42;
        const t = imgFrac(xf) * (ridgeProf.length - 1), i = t | 0, f = t - i;
        return ridgeProf[i] * (1 - f) + ridgeProf[Math.min(ridgeProf.length - 1, i + 1)] * f;
      }

      function soilY(xf) { return landTop + ridgeFrac(xf) * landH + 12; } 

      const N = 26;
      const nc = 6;
      const centers = [];
      for (let c = 0; c < nc; c++) centers.push(clamp((c + 0.5) / nc * 100 + rnd(-5, 5), 7, 93));

      for (let i = 0; i < N; i++) {
        const roll = Math.random();
        const built = roll < 0.45 ? buildDaisy() : roll < 0.8 ? buildLavender() : buildFoliage();
        const el = document.createElement('div');
        el.className = 'ft-plant';
        const xPct = clamp(centers[i % nc] + rnd(-8, 8), 2, 98);
        const depthPx = rnd(5, 30); 
        const baseY = soilY(xPct / 100) + depthPx;

        el.style.position = 'absolute';
        el.style.left = xPct + '%';
        el.style.top = (baseY - built.h) + 'px';
        el.style.zIndex = String(10 + Math.round(depthPx / 12));
        el.style.transform = `translateX(-50%)`;
        el.style.transformOrigin = `50% 100%`;
        
        el.style.animation = `sway ${rnd(4, 7)}s ease-in-out infinite alternate`;
        el.style.animationDelay = `${rnd(-5, 0)}s`;

        el.innerHTML = built.svg;
        garden.appendChild(el);
      }
    };
    landImg.src = imgSrc;

    if (!document.getElementById('ft-sway-style')) {
      const style = document.createElement('style');
      style.id = 'ft-sway-style';
      style.innerHTML = `
        @keyframes sway { 0% { transform: translateX(-50%) rotate(-3deg); } 100% { transform: translateX(-50%) rotate(3deg); } }
        @keyframes splash { 0% { transform: scale(0); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes grow { 0% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.05); } 100% { transform: translateX(-50%) scale(1); } }
      `;
      document.head.appendChild(style);
    }
    
  }, [isNight]);

  const handleMouseMove = (e) => {
    if (cursorRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // offset by 44, 43 so the tip of the can touches the cursor
      cursorRef.current.style.transform = `translate(${x - 44}px, ${y - 43}px) ${isClicking ? 'rotate(-25deg)' : ''}`;
    }
  };

  const handleWaterClick = (e) => {
    if (!containerRef.current) return;
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 200);

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create splash ring
    const splash = document.createElement('div');
    splash.style.position = 'absolute';
    splash.style.left = `${x - 15}px`;
    splash.style.top = `${y - 5}px`;
    splash.style.width = '30px';
    splash.style.height = '10px';
    splash.style.border = '2px solid #38bdf8';
    splash.style.borderRadius = '50%';
    splash.style.animation = 'splash 0.5s ease-out forwards';
    splash.style.pointerEvents = 'none';
    splash.style.zIndex = '90';
    containerRef.current.appendChild(splash);
    
    setTimeout(() => {
      if (splash.parentNode) splash.parentNode.removeChild(splash);
    }, 500);

    // Make all plants nearby grow
    const plants = document.querySelectorAll('.ft-plant');
    const clickXPct = (x / rect.width) * 100;
    
    plants.forEach(plant => {
      const plantLeft = parseFloat(plant.style.left);
      if (Math.abs(plantLeft - clickXPct) < 15) {
        plant.style.animation = 'none';
        void plant.offsetWidth; // Trigger reflow
        plant.style.animation = 'grow 1s ease-out forwards, sway 5s ease-in-out infinite alternate';
      }
    });
  };

  return (
    <>
      <section 
        ref={containerRef}
        id="playground" 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleWaterClick}
        style={{ 
          position: 'relative', 
          width: '100%', 
          minHeight: '85vh', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '10vh',
          userSelect: 'none',
          cursor: isHovering ? 'none' : 'auto'
        }}
      >
        {isHovering && (
          <div 
            ref={cursorRef} 
            style={{ 
              position: 'absolute', 
              top: 0, left: 0, 
              pointerEvents: 'none', 
              zIndex: 9999, 
              transition: 'transform 0.1s ease-out'
            }}
          >
            <svg viewBox="0 0 60 60" width="58" height="58">
              <g filter="url(#ft-paint)">
                <g transform="rotate(20 27 27)">
                  <path d="M16 21 Q7.5 22 8 29 Q8.3 34 15 34" fill="none" stroke="#c9856f" strokeWidth="3.2" strokeLinecap="round"/>
                  <path d="M34.5 24 L47 29 L49.5 33.5 L46 37 L33 31 Z" fill="#d69880"/>
                  <ellipse cx="47.5" cy="34.5" rx="2.6" ry="3.8" transform="rotate(28 47.5 34.5)" fill="#cf8f7b"/>
                  <path d="M16 22 Q16 18 20 18 L32 18 Q36 18 36 22 L35 35 Q35 38 31 38 L21 38 Q16 38 16 34 Z" fill="#d99f8c"/>
                  <ellipse cx="26" cy="18" rx="8.2" ry="2.6" fill="#cf8f7b"/>
                  <path d="M16.5 16 Q26 1 35.5 15" fill="none" stroke="#d99f8c" strokeWidth="4.6" strokeLinecap="round"/>
                  <path d="M24 29.5 C 20.5 26.5 21.6 23.4 24 25.2 C 26.4 23.4 27.5 26.5 24 29.5 Z" fill="#a85a48"/>
                </g>
              </g>
            </svg>
            {isClicking && (
              <>
                <div style={{ position: 'absolute', left: '44px', top: '43px', width: '3px', height: '3px', background: '#6cc2ee', borderRadius: '50%', animation: 'fall 0.3s linear forwards' }} />
                <div style={{ position: 'absolute', left: '47px', top: '41px', width: '2px', height: '2px', background: '#6cc2ee', borderRadius: '50%', animation: 'fall 0.3s linear 0.1s forwards' }} />
              </>
            )}
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 60, textAlign: 'center', padding: '0 20px', pointerEvents: 'none' }}>
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              marginBottom: '16px', display: 'inline-block',
              background: 'var(--bg-glass)', padding: '6px 20px', 
              borderRadius: '100px', border: '1px solid var(--border)' 
            }}
          >
            Let's grow together
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', 
              color: 'var(--text-heading)',
              textShadow: isNight ? '0 4px 16px rgba(0,0,0,0.5)' : '0 4px 16px rgba(255,255,255,0.5)' 
            }}
          >
            Click to water the garden
          </motion.h2>
        </div>

        <div style={{ 
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', minWidth: '1200px', zIndex: 20, pointerEvents: 'none'
        }}>
          <img 
            ref={landRef}
            src={isNight ? "/assets/land meadow-night.png" : "/assets/footer-land.png"} 
            alt="Terrain"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        
        <div ref={gardenRef} style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }} />
      </section>
    </>
  );
}
