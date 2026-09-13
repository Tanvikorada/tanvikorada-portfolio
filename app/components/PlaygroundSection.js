'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function PlaygroundSection() {
  const containerRef = useRef(null);
  const gardenRef = useRef(null);
  const landRef = useRef(null);
  const [isNight, setIsNight] = useState(true);

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

    function wrap(w, h, inner) { return `<svg viewBox="-${w / 2} -${h} ${w} ${h}" width="${w}" height="${h}" style="overflow:visible; filter:url(#ft-paint)">${inner}</svg>`; }

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
        @keyframes fall { 0% { top: -20px; opacity: 1; transform: scaleY(1); } 90% { transform: scaleY(1.5); opacity: 1; } 100% { top: calc(100% - 10px); opacity: 0; transform: scaleY(0.5); } }
        @keyframes splash { 0% { transform: scale(0); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes grow { 0% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.05); } 100% { transform: translateX(-50%) scale(1); } }
      `;
      document.head.appendChild(style);
    }
    
  }, [isNight]);

  // WATERING LOGIC
  const handleWaterClick = (e) => {
    if (!containerRef.current) return;
    
    // Create water drop
    const drop = document.createElement('div');
    const dropSize = 12;
    
    // Calculate relative coordinates
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drop.style.position = 'absolute';
    drop.style.left = `${x - dropSize / 2}px`;
    drop.style.width = `${dropSize}px`;
    drop.style.height = `${dropSize * 1.5}px`;
    drop.style.backgroundColor = '#38bdf8';
    drop.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%'; // Teardrop shape
    drop.style.zIndex = '100';
    drop.style.animation = 'fall 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards';
    drop.style.pointerEvents = 'none';
    drop.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.5)';
    
    // We append to container so it falls from mouse click down to bottom of container
    containerRef.current.appendChild(drop);

    // Splash effect and trigger growth
    setTimeout(() => {
      // Clean up drop
      if (drop.parentNode) drop.parentNode.removeChild(drop);

      // Create splash ring
      const splash = document.createElement('div');
      splash.style.position = 'absolute';
      splash.style.left = `${x - 15}px`;
      splash.style.bottom = '10%'; // Approx ground level
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
        // If plant is within 15% horizontal distance of the drop
        if (Math.abs(plantLeft - clickXPct) < 15) {
          // Remove old grow animation to re-trigger
          plant.style.animation = 'none';
          void plant.offsetWidth; // Trigger reflow
          // Apply grow animation then revert to sway
          plant.style.animation = 'grow 1s ease-out forwards, sway 5s ease-in-out infinite alternate';
        }
      });

    }, 600);
  };

  return (
    <>
      <section 
        ref={containerRef}
        id="playground" 
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
          cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' fill=\'none\' stroke=\'%2338bdf8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M12 2v20M17 7l-5-5-5 5\'/></svg>") 12 12, crosshair',
        }}
      >
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
