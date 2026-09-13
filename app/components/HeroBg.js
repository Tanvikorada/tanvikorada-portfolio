'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// Perfectly balanced grid: Dense enough for flawless circles, chunky enough for 3D depth
const GRID_W = 42; 
const GRID_H = 28;
const SPACING = 2.5; 
const CUBE_SIZE = 2.38; // Clean gap to ensure shadows perfectly define each block

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); 
  const cRippleLight = useMemo(() => new Color('#c084fc'), []); // Beautiful, soft Light Lavender!
  
  const cBaseNight = useMemo(() => new Color('#000000'), []); 
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); 

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
    
    // Trigger perfect circular ripples
    const distMoved = Math.hypot(mx - lastRipplePos.current.x, my - lastRipplePos.current.y);
    if (distMoved > 2.0) {
      ripples.current.push({ x: mx, y: my, time: 0, strength: 1.0 });
      lastRipplePos.current.x = mx;
      lastRipplePos.current.y = my;
      if (ripples.current.length > 8) ripples.current.shift();
    }

    const dt = Math.min(delta, 0.05); 
    for (let r = 0; r < ripples.current.length; r++) {
      ripples.current[r].time += dt * 22.0; // Perfect, elegant expansion speed
      ripples.current[r].strength *= 0.985; 
    }

    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;

      // Rest perfectly flat like Dezprox, with only the tiniest microscopic breath
      let z = Math.sin(ix * 0.02 + t * 0.5) * Math.cos(iy * 0.02 + t * 0.4) * 0.15;

      for (let r = 0; r < ripples.current.length; r++) {
        const rip = ripples.current[r];
        const d = Math.hypot(ix - rip.x, iy - rip.y);
        const ringDist = Math.abs(d - rip.time);
        
        // Massive, wide radius guarantees perfectly smooth, non-pixelated circles
        if (ringDist < 14.0) { 
          // Pure Gaussian Dome curve: Always pushes UP.
          // This ensures the blocks rise cleanly and vividly like the reference, instead of dipping chaotically.
          const wave = Math.exp(-(ringDist * ringDist) / 16.0);
          
          const distanceAmplify = 1.0 + (d * 0.03); 
          
          // Blocks rise boldly up to ~3.5 units so their 3D sides perfectly catch the light
          z += wave * rip.strength * 3.5 * distanceAmplify;
        }
      }

      // Keep it constrained and elegant
      const renderZ = Math.max(-1.0, Math.min(8.0, z));

      dummy.position.set(ix, iy, renderZ);
      dummy.rotation.set(0, 0, 0); 
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Distinct, glowing light lavender
      const intensity = Math.max(0, Math.min(1, z * 0.4));
      
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
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 8.0]} />
        <meshStandardMaterial roughness={0.15} metalness={0.1} />
      </instancedMesh>
      <mesh position={[0, 0, -4.0]}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color={isNight ? '#000000' : '#ffffff'} roughness={0.15} metalness={0.1} />
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
        camera={{ position: [0, 0, 50], fov: 45 }} 
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={isNight ? 0.7 : 1.3} />
        <directionalLight position={[20, -20, 30]} intensity={isNight ? 1.0 : 1.5} color="#ffffff" />
        {/* Using a pure, clean light lavender for the directional glow */}
        <directionalLight position={[-20, 20, 20]} intensity={isNight ? 0.4 : 0.5} color={isNight ? '#fbbf24' : '#c084fc'} />
        
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
