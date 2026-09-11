'use client';
import { useEffect, useRef } from 'react';

// Exact palettes from reference
const STEM = ['#5e6955', '#6b7960', '#76876a'];
const LAV = ['#8f73b8', '#9e85c4', '#a890cc', '#b9a5d8', '#7b62a1'];
const OLIVE = ['#3b4234', '#464d3f', '#4f5647'];
const CREAM = ['#f5efe5', '#faf4ed', '#fef9f2'];
const LEAFG = ['#4a5441', '#545d4b', '#5c6553'];
const DISC = '#c97a22';
const DISC_HI = '#d68c36';
const DISC_SH = '#b86616';
const PETAL_EDGE = 'rgba(0,0,0,0.05)';

export default function PlaygroundSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const garden = containerRef.current;
    
    // Clear any existing plants (for strict mode)
    garden.innerHTML = '';

    const rnd = (a, b) => a + Math.random() * (b - a);
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const phoneMQ = window.matchMedia('(max-width: 640px)');
    const compactMQ = window.matchMedia('(max-width: 1100px)');

    // ---- inline-SVG plant builders ----
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
      return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g filter="url(#ft-paint)">${inner}</g></svg>`;
    }

    function buildDaisy() {
      const h = rnd(165, 245), w = 96, cx = w / 2, top = 28, bend = rnd(-15, 15);
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
      const head = `<g class="head">${calyx}${petals}${disc}</g>`;
      return { svg: wrap(w, h, base + stem + head), h };
    }

    function buildLavender() {
      const h = rnd(150, 215), w = 56, cx = w / 2;
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
      const h = rnd(80, 130), w = 110, cx = w / 2;
      const olive = pick(OLIVE);
      let g = '';
      const n = 4 + ((Math.random() * 3) | 0);
      for (let i = 0; i < n; i++) g += frond(cx + rnd(-10, 10), h - 2, (i - (n - 1) / 2) * rnd(20, 30), rnd(h * 0.7, h * 1.05), olive);
      return { svg: wrap(w, h, `<g class="head">${g}</g>`), h };
    }

    // shared paint filter
    const defs = document.createElement('div');
    defs.setAttribute('aria-hidden', 'true');
    defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    defs.innerHTML = `<svg><defs><filter id="ft-paint" x="-30%" y="-30%" width="160%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.028 0.04" numOctaves="2" seed="6" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter></defs></svg>`;
    garden.appendChild(defs);

    const N = 20, plants = [];
    const nc = 5 + ((Math.random() * 2) | 0);
    const centers = [];
    for (let c = 0; c < nc; c++) centers.push(clamp((c + 0.5) / nc * 100 + rnd(-5, 5), 7, 93));

    // Simple flat ridge since we don't have the image
    const plantY = (pct, depth) => 20 + depth; 

    for (let i = 0; i < N; i++) {
      const roll = Math.random();
      const built = roll < 0.5 ? buildDaisy() : roll < 0.78 ? buildLavender() : buildFoliage();
      const el = document.createElement('div');
      
      // Inline the CSS classes from reference
      el.style.position = 'absolute';
      el.style.transformOrigin = 'bottom center';
      el.style.transform = 'scale(var(--g))';
      el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.willChange = 'transform';

      const xPct = clamp(centers[i % nc] + rnd(-6, 6), 2, 98);
      const depthPx = compactMQ.matches ? rnd(4, 28) : rnd(4, 15);
      const baseY = plantY(xPct / 100, depthPx);
      
      el.style.left = xPct + '%';
      el.style.bottom = baseY + 'px';
      el.style.zIndex = String(1 + ((Math.random() * 2) | 0) + Math.round(depthPx / 12));
      
      const g0 = phoneMQ.matches ? rnd(0.4, 0.7) : rnd(0.65, 1.0);
      el.style.setProperty('--g', g0.toFixed(3));
      
      const stalk = document.createElement('div');
      // Adding sway CSS inline to avoid needing the exact site.css
      stalk.style.transformOrigin = 'bottom center';
      stalk.style.animation = `willow-sway var(--sway) ease-in-out infinite alternate`;
      stalk.style.animationDelay = `var(--sway-d)`;
      
      stalk.style.cssText += `--swayA:${rnd(1.4, 3.4).toFixed(1)}deg;--sway:${rnd(4, 7).toFixed(1)}s;--sway-d:${rnd(-3, 0).toFixed(1)}s;`;
      stalk.innerHTML = built.svg;
      
      // Interactive scale
      el.addEventListener('mouseenter', () => { el.style.setProperty('--g', (g0 * 1.3).toFixed(3)); });
      el.addEventListener('mouseleave', () => { el.style.setProperty('--g', g0.toFixed(3)); });

      el.appendChild(stalk);
      garden.appendChild(el);
      plants.push({ el, g: g0, max: 1.75, fullH: built.h, xPct, baseY, depthPx });
    }

    // Add CSS for the sway
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes willow-sway {
        from { transform: skewX(calc(var(--swayA) * -1)) translateX(-1%); }
        to   { transform: skewX(var(--swayA)) translateX(1%); }
      }
      .head {
        transform-origin: 50% 30px;
        animation: head-nod 6s ease-in-out infinite alternate;
      }
      @keyframes head-nod {
        from { transform: rotate(-3deg); }
        to   { transform: rotate(3deg); }
      }
    `;
    garden.appendChild(style);

  }, []);

  const handleWaterGarden = () => {
    // Trigger growth animation
    plantsRef.current.forEach(p => {
      // Randomly scale up between 1.3x and 1.6x of base size
      const targetScale = p.g0 * (1.3 + Math.random() * 0.3);
      p.el.style.transform = `scale(${targetScale.toFixed(3)})`;
    });

    // Reset after 3 seconds
    setTimeout(() => {
      plantsRef.current.forEach(p => {
        p.el.style.transform = `scale(${p.g0.toFixed(3)})`;
      });
    }, 3000);
  };

  return (
    <section 
      id="playground" 
      onClick={handleWaterGarden}
      className="garden-container"
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '60vh',
        overflow: 'hidden',
        background: 'var(--bg-base)',
        borderTop: '1px solid var(--border)',
        cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><text x=\"0\" y=\"24\" font-size=\"24\">🚿</text></svg>') 0 24, pointer"
      }}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5, paddingBottom: '15vh' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Interactive Playground
        </p>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 7vw, 6rem)', color: 'var(--text-heading)', lineHeight: 1, margin: 0, opacity: 0.1 }}>
          The Garden
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', marginTop: '1rem', color: 'var(--text-heading)', animation: 'pulse 2s infinite' }}>
          CLICK TO GROW
        </p>
      </div>

      {/* The Garden Bed */}
      <div 
        ref={containerRef} 
        style={{ 
          position: 'absolute', 
          bottom: 25, 
          left: 0, 
          right: 0, 
          height: '250px', 
          zIndex: 10,
          pointerEvents: 'none' // Let clicks pass to the section
        }} 
      />

      {/* Wavy Meadow Base (replaces flat soil) */}
      <svg 
        viewBox="0 0 100 20" 
        preserveAspectRatio="none" 
        style={{ 
          position: 'absolute', 
          bottom: -5, 
          left: 0, 
          width: '100%', 
          height: '60px', 
          zIndex: 5 
        }}
      >
        <path d="M0,15 Q25,5 50,15 T100,10 L100,20 L0,20 Z" fill="#2a2e24" />
        <path d="M0,12 Q30,2 60,12 T100,8 L100,20 L0,20 Z" fill="#3b4234" opacity="0.8" />
      </svg>
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 0.3; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
