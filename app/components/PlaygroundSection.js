'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function PlaygroundSection() {
  const containerRef = useRef(null);
  const gardenRef = useRef(null);
  const landRef = useRef(null);
  const [isNight, setIsNight] = useState(true);

  // Sync theme
  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains('night'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !gardenRef.current) return;
    const footer = containerRef.current;
    const garden = gardenRef.current;
    
    // Cleanup previous garden
    garden.innerHTML = '';
    
    const rnd = (a, b) => a + Math.random() * (b - a);
    const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
    const pick = a => a[(Math.random() * a.length) | 0];
    
    const CREAM = ['#faf5e6', '#fbf7ec', '#f7f1df'];
    const PETAL_EDGE = '#e2d5b0';
    const DISC = '#e89a1c', DISC_HI = '#f6c740', DISC_SH = '#b9791a';
    const STEM = ['#b06a4d', '#a95c42', '#bb765b'];
    const OLIVE = ['#33361a', '#2b2e14', '#3c4020', '#454a24'];
    const LAV = ['#7c5fa6', '#684c90', '#8f73b8', '#5b4680', '#9a80c2'];
    const LEAFG = ['#5c7d3f', '#4a6b33', '#6f9450'];

    function petalPath(len, w, col, extra) {
      return `<path d="M0 0 C ${-w} ${(-len * 0.42).toFixed(1)} ${(-w * 0.55).toFixed(1)} ${-len} 0 ${-len} C ${(w * 0.55).toFixed(1)} ${-len} ${w} ${(-len * 0.42).toFixed(1)} 0 0 Z" fill="${col}" ${extra || ''}/>`;
    }
    function blade(x, y, ang, len, col) {
      const tx = x + Math.sin(ang * Math.PI / 180) * len, ty = y - Math.cos(ang * Math.PI / 180) * len;
      return `<path d="M${x} ${y} Q ${((x + tx) / 2 + rnd(-3, 3)).toFixed(1)} ${((y + ty) / 2).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}" stroke="${col}" stroke-width="${rnd(2.4, 3.6).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
    }
    function frond(x, y, ang, len, col) {
      const fingers = 3 + ((Math.random() * 3) | 0);
      let g = `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})">`;
      for (let i = 0; i < fingers; i++) {
        const fa = (i - (fingers - 1) / 2) * rnd(15, 21);
        const fl = len * (1 - Math.abs(i - (fingers - 1) / 2) * 0.1) * rnd(0.8, 1);
        g += `<g transform="rotate(${fa.toFixed(1)})">${petalPath(fl, rnd(6, 9), col)}</g>`;
      }
      return g + '</g>';
    }
    function wrap(w, h, inner) {
      return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible"><g filter="url(#ft-paint)">${inner}</g></svg>`;
    }

    function buildDaisy() {
      const h = rnd(185, 265), w = 96, cx = w / 2, top = 28, bend = rnd(-15, 15);
      const stemC = pick(STEM), olive = pick(OLIVE), cream = pick(CREAM);
      const stem = `<path d="M${cx} ${h} C ${(cx + bend).toFixed(1)} ${(h * 0.6).toFixed(1)} ${(cx - bend).toFixed(1)} ${(h * 0.34).toFixed(1)} ${cx} ${top + 6}" stroke="${stemC}" stroke-width="${rnd(3.4, 4.6).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
      let base = frond(cx + rnd(-4, 4), h - 2, rnd(-42, -22), rnd(48, 70), olive)
               + frond(cx + rnd(-4, 4), h - 2, rnd(22, 42), rnd(48, 70), olive)
               + frond(cx + rnd(-3, 3), h - 2, rnd(-10, 10), rnd(40, 58), olive);
      const calyx = `<path d="M${cx - 11} ${top + 2} q11 15 22 0 q-3 12 -11 12 q-8 0 -11 -12 z" fill="${olive}"/>`;
      const n = 11 + ((Math.random() * 4) | 0);
      let petals = '';
      for (let i = 0; i < n; i++) {
        const a = 360 / n * i + rnd(-4, 4), L = rnd(27, 35);
        petals += `<g transform="translate(${cx} ${top}) rotate(${a.toFixed(1)})">${petalPath(L, rnd(7, 10), cream, `stroke="${PETAL_EDGE}" stroke-width="1"`)}</g>`;
      }
      const cr = rnd(8.5, 10.5);
      let disc = `<circle cx="${cx}" cy="${top}" r="${cr.toFixed(1)}" fill="${DISC}"/>`;
      for (let i = 0; i < 16; i++) { const aa = rnd(0, 6.28), rr = rnd(0, cr * 0.82); disc += `<circle cx="${(cx + Math.cos(aa) * rr).toFixed(1)}" cy="${(top + Math.sin(aa) * rr).toFixed(1)}" r="${rnd(0.8, 1.6).toFixed(1)}" fill="${Math.random() < 0.5 ? DISC_HI : DISC_SH}"/>`; }
      return { svg: wrap(w, h, base + stem + `<g class="head">${calyx}${petals}${disc}</g>`), h };
    }

    function buildLavender() {
      const h = rnd(170, 235), w = 56, cx = w / 2;
      const green = pick(LEAFG);
      const stem = `<path d="M${cx} ${h} C ${(cx + rnd(-6, 6)).toFixed(1)} ${(h * 0.6).toFixed(1)} ${(cx + rnd(-4, 4)).toFixed(1)} ${(h * 0.42).toFixed(1)} ${cx} ${(h * 0.3).toFixed(1)}" stroke="${green}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
      const leaves = blade(cx, h, rnd(-32, -18), rnd(46, 66), green) + blade(cx, h, rnd(18, 32), rnd(46, 66), green);
      const spikeBot = h * 0.34, spikeTop = 12;
      let florets = '';
      const rows = 11 + ((Math.random() * 6) | 0);
      for (let i = 0; i <= rows; i++) {
        const t = i / rows, yy = spikeBot + (spikeTop - spikeBot) * t, spread = (1 - t) * 7 + 3;
        for (let k = 0; k < 2 + ((Math.random() * 2) | 0); k++)
          florets += `<circle cx="${(cx + rnd(-spread, spread)).toFixed(1)}" cy="${(yy + rnd(-3, 3)).toFixed(1)}" r="${rnd(2.6, 4.3).toFixed(1)}" fill="${pick(LAV)}" opacity="${rnd(0.78, 1).toFixed(2)}"/>`;
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

    // Shared paint filter definition
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

    // We fetch the terrain image asynchronously and THEN place the plants on its ridge.
    const imgSrc = isNight ? '/assets/land meadow-night.png' : '/assets/footer-land.png';
    const landImg = new Image();
    landImg.crossOrigin = 'Anonymous'; // Just in case
    landImg.onload = () => {
      ridgeProf = buildRidge(landImg, !isNight);
      
      const lr = landRef.current ? landRef.current.getBoundingClientRect() : { top: 0, height: 400, width: window.innerWidth };
      const fr = footer.getBoundingClientRect();
      landH = lr.height; landW = lr.width;
      footerW = fr.width;
      landTop = lr.top - fr.top; // offset inside the section
      
      function imgFrac(xf) {
        if (!landW) return clamp(xf, 0, 1);
        return clamp(0.5 + (clamp(xf, 0, 1) - 0.5) * (footerW / landW), 0, 1);
      }
      
      function ridgeFrac(xf) {
        if (!ridgeProf) return 0.42;
        const t = imgFrac(xf) * (ridgeProf.length - 1), i = t | 0, f = t - i;
        return ridgeProf[i] * (1 - f) + ridgeProf[Math.min(ridgeProf.length - 1, i + 1)] * f;
      }

      function soilY(xf) { return landTop + ridgeFrac(xf) * landH + 12; } // +12 sinks them firmly in

      const N = 26;
      const nc = 6;
      const centers = [];
      for (let c = 0; c < nc; c++) centers.push(clamp((c + 0.5) / nc * 100 + rnd(-5, 5), 7, 93));

      // Build the elements
      for (let i = 0; i < N; i++) {
        const roll = Math.random();
        const built = roll < 0.45 ? buildDaisy() : roll < 0.8 ? buildLavender() : buildFoliage();
        const el = document.createElement('div');
        el.className = 'ft-plant';
        const xPct = clamp(centers[i % nc] + rnd(-8, 8), 2, 98);
        const depthPx = rnd(5, 30); // Random z-depth planting
        const baseY = soilY(xPct / 100) + depthPx;

        el.style.position = 'absolute';
        el.style.left = xPct + '%';
        // Position them from the top of the container downwards to plant them on the ridge!
        el.style.top = (baseY - built.h) + 'px';
        el.style.zIndex = String(10 + Math.round(depthPx / 12));
        el.style.transform = `translateX(-50%)`;
        el.style.transformOrigin = `50% 100%`;
        
        // Gentle sway animation
        el.style.animation = `sway ${rnd(4, 7)}s ease-in-out infinite alternate`;
        el.style.animationDelay = `${rnd(-5, 0)}s`;

        el.innerHTML = built.svg;
        garden.appendChild(el);
      }
    };
    landImg.src = imgSrc;

    // A simple keyframes injection for the sway if not in CSS
    if (!document.getElementById('ft-sway-style')) {
      const style = document.createElement('style');
      style.id = 'ft-sway-style';
      style.innerHTML = `@keyframes sway { 0% { transform: translateX(-50%) rotate(-3deg); } 100% { transform: translateX(-50%) rotate(3deg); } }`;
      document.head.appendChild(style);
    }
    
  }, [isNight]);

  return (
    <>
      {/* 
        This section uses a strong backdrop-blur.
        It strictly prevents the 3D grid from overwhelming the garden, 
        giving the "Click to water" text and the garden clean breathing room. 
      */}
      <section 
        ref={containerRef}
        id="playground" 
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
          background: isNight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid var(--border)'
        }}
      >
        {/* TEXT: Positioned high up so it never overlaps the flowers! */}
        <div style={{ position: 'relative', zIndex: 60, textAlign: 'center', padding: '0 20px' }}>
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

        {/* 
          THE SOIL TERRAIN (Exactly matching reference) 
          This is absolutely positioned at the bottom.
        */}
        <div style={{ 
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', minWidth: '1200px', zIndex: 20, pointerEvents: 'none'
        }}>
          {/* We render the image explicitly so the bounding rect can be measured, but we also use it as the visual ground. */}
          <img 
            ref={landRef}
            src={isNight ? "/assets/land meadow-night.png" : "/assets/footer-land.png"} 
            alt="Terrain"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        
        {/* The garden bed where the SVGs are spawned using the extracted functions */}
        <div ref={gardenRef} style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }} />
      </section>
    </>
  );
}
