'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// USER REQUESTED: "size of our blocks should be more" -> Massively increased block size (fewer blocks).
// USER REQUESTED: "grid should not be appeared" -> CUBE_SIZE exactly matches SPACING (no gaps), forming a seamless flat sheet.
const GRID_W = 24; 
const GRID_H = 16;
const SPACING = 4.5; 
const CUBE_SIZE = 4.5; 

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); 
  const cRippleLight = useMemo(() => new Color('#d8b4fe'), []); // Light lavender
  
  const cBaseNight = useMemo(() => new Color('#000000'), []); 
  const cRippleNight = useMemo(() => new Color('#fcd34d'), []); 

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  
  const ripples = useRef([]);
  const lastRipplePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        const ix = (i % GRID_W - GRID_W / 2) * SPACING;
        const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
        dummy.position.set(ix, iy, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        tempColor.copy(isNight ? cBaseNight : cBaseLight);
        meshRef.current.setColorAt(i, tempColor);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [isNight, count, cBaseNight, cBaseLight, dummy, tempColor]);

  useFrame((state, delta) => {
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.2);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.2);

    const mx = mouse.current.x * (GRID_W * SPACING / 2);
    const my = mouse.current.y * (GRID_H * SPACING / 2);
    
    const distMoved = Math.hypot(mx - lastRipplePos.current.x, my - lastRipplePos.current.y);
    if (distMoved > 2.0) {
      ripples.current.push({ x: mx, y: my, time: 0, strength: 1.0 });
      lastRipplePos.current.x = mx;
      lastRipplePos.current.y = my;
      if (ripples.current.length > 6) ripples.current.shift();
    }

    const dt = Math.min(delta, 0.05); 
    for (let r = 0; r < ripples.current.length; r++) {
      // Elegant, fluid traveling speed
      ripples.current[r].time += dt * 26.0; 
      ripples.current[r].strength *= 0.97; 
    }

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;

      // USER REQUEST: "bg is appearing as blocks clealry bcoz of grid"
      // FIX: Z must be strictly 0.0 at rest. No ambient noise. This makes it a seamless flat sheet.
      let z = 0;

      for (let r = 0; r < ripples.current.length; r++) {
        const rip = ripples.current[r];
        const d = Math.hypot(ix - rip.x, iy - rip.y);
        const ringDist = Math.abs(d - rip.time);
        
        // USER REQUEST: "dezprox ripples are really looking like circles but ours are not"
        // FIX: The wave MUST be wide enough to span multiple blocks (anti-aliasing). 
        // A thin wave on large blocks causes severe jagged diamond shapes.
        // A wide Gaussian Dome (divisor 18.0) creates a smooth height gradient that the eye reads as a perfect circle.
        if (ringDist < 12.0) { 
          const wave = Math.exp(-(ringDist * ringDist) / 18.0);
          z += wave * rip.strength * 2.8;
        }
      }

      dummy.position.set(ix, iy, z);
      dummy.rotation.set(0, 0, 0); 
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Light lavender coloring scales precisely with the Z elevation
      const intensity = Math.max(0, Math.min(1, z * 0.45));
      
      const base = isNight ? cBaseNight : cBaseLight;
      const ripple = isNight ? cRippleNight : cRippleLight;
      tempColor.copy(base).lerp(ripple, intensity);
      meshRef.current.setColorAt(i, tempColor);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        {/* Generous depth (10) so sides are heavily shaded when raised */}
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 10.0]} />
        <meshStandardMaterial roughness={0.1} metalness={0.05} />
      </instancedMesh>
      {/* Invisible Backplate prevents micro-leaks */}
      <mesh position={[0, 0, -5.0]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color={isNight ? '#000000' : '#ffffff'} roughness={0.1} metalness={0.05} />
      </mesh>
    </>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(true);
  const { scrollYProgress } = useScroll();
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.4]);

  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains('night'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas 
        gl={{ alpha: false, antialias: true }} 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 55], fov: 42 }} 
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={isNight ? 0.7 : 1.5} />
        {/* Strong angled lighting casts shadows ONLY when blocks are raised from the seamless flat sheet */}
        <directionalLight position={[15, -20, 30]} intensity={isNight ? 1.0 : 1.5} color="#ffffff" />
        <directionalLight position={[-15, 20, 20]} intensity={isNight ? 0.4 : 0.6} color={isNight ? '#fcd34d' : '#f3e8ff'} />
        
        <Cubes isNight={isNight} />
      </Canvas>
      <motion.div 
        style={{
          position: 'absolute', inset: 0,
          background: isNight ? '#000000' : '#ffffff',
          opacity: overlayOpacity
        }}
      />
    </div>
  );
}
