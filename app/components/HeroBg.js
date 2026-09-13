'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// Exact Dezprox dimensions: Massive chunky blocks (~20 across the screen)
const GRID_W = 22; 
const GRID_H = 14;
const SPACING = 4.2; 
const CUBE_SIZE = 4.12; // Creates a deep structural crevice between blocks

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); 
  const cRippleLight = useMemo(() => new Color('#ff6b00'), []); // Premium global orange accent!
  
  const cBaseNight = useMemo(() => new Color('#000000'), []); 
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); 

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  
  // Explicit mathematical ripples (Guarantees perfect circular waves that travel across the screen)
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
    
    // 1. Drop perfect circular ripples based on mouse movement
    const distMoved = Math.hypot(mx - lastRipplePos.current.x, my - lastRipplePos.current.y);
    if (distMoved > 2.0) {
      ripples.current.push({ x: mx, y: my, time: 0, strength: 1.0 });
      lastRipplePos.current.x = mx;
      lastRipplePos.current.y = my;
      if (ripples.current.length > 8) ripples.current.shift(); // Keep memory usage low
    }

    // 2. Update ripple expanding radius
    // Delta limits ensure physics don't explode if tab is in background
    const dt = Math.min(delta, 0.05); 
    for (let r = 0; r < ripples.current.length; r++) {
      ripples.current[r].time += dt * 25.0; // Speed of the wave traveling outward
      ripples.current[r].strength *= 0.985; // Slow decay so it crosses the whole screen
    }

    const t = state.clock.elapsedTime;

    // 3. Render exact height for every block
    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;

      // Ambient Dezprox watery layer (constant rolling hills)
      let z = Math.sin(ix * 0.1 + t * 1.5) * Math.cos(iy * 0.1 + t * 1.2) * 1.2;

      // Add exact mathematical ripples
      for (let r = 0; r < ripples.current.length; r++) {
        const rip = ripples.current[r];
        const d = Math.hypot(ix - rip.x, iy - rip.y);
        const ringDist = Math.abs(d - rip.time);
        
        if (ringDist < 8.0) { // If the block is touching the expanding wave front
          // Beautiful water pulse: dips down, shoots UP high, dips down
          const wave = Math.cos(ringDist * 0.7) * Math.exp(-ringDist * 0.3);
          
          // Amplifies the wave height as it goes further away! (Exactly what the user requested)
          const distanceAmplify = 1.0 + (d * 0.15); 
          
          // Massive 6.0 multiplier so they shoot up like skyscrapers
          z += wave * rip.strength * 6.0 * distanceAmplify;
        }
      }

      // Clamp Z so blocks don't fly off screen
      const renderZ = Math.max(-18.0, Math.min(18.0, z));

      dummy.position.set(ix, iy, renderZ);
      dummy.rotation.set(0, 0, 0); // Straight up and down like real skyscrapers
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Intensity glow matching the huge Z spikes
      const intensity = Math.max(0, Math.min(1, Math.abs(z) * 0.25));
      
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
        {/* Incredible depth (16.0) for that extreme 3D skyscraper look! */}
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 16.0]} />
        <meshStandardMaterial roughness={0.15} metalness={0.1} />
      </instancedMesh>
      <mesh position={[0, 0, -8.0]}>
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
        // Perspective Camera positioned to reveal the 3D sides of the blocks perfectly
        camera={{ position: [0, 0, 50], fov: 50 }} 
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={isNight ? 0.7 : 1.3} />
        <directionalLight position={[20, -20, 30]} intensity={isNight ? 1.0 : 1.5} color="#ffffff" />
        <directionalLight position={[-20, 20, 20]} intensity={isNight ? 0.4 : 0.5} color={isNight ? '#fbbf24' : '#ff6b00'} />
        
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
