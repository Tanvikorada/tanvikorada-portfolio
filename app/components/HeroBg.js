'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// Guaranteed massive flush tiles that perfectly fill the screen
const GRID_W = 24; 
const GRID_H = 14;
const SPACING = 4.0;
const CUBE_SIZE = 3.99; // Ultra-thin 0.01 gap for a sleek 1px hairline border

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#f8fafc'), []); 
  const cRippleLight = useMemo(() => new Color('#dcfce7'), []); 
  
  const cBaseNight = useMemo(() => new Color('#020617'), []); 
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); 

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  const states = useMemo(() => {
    const s = [];
    for (let i = 0; i < count; i++) {
      s.push({
        baseZ: 0,
        pZ: 0,
        vZ: 0
      });
    }
    return s;
  }, [count]);

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

  useFrame((state) => {
    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.1);

    let needsUpdate = false;

    // Map mouse to grid coords
    const mx = mouse.current.x * (GRID_W * SPACING / 2);
    const my = mouse.current.y * (GRID_H * SPACING / 2);

    const tension = 0.04;
    const damping = 0.85;

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
      
      const dx = ix - mx;
      const dy = iy - my;
      const dist = Math.hypot(dx, dy);

      // Super smooth, wide ripple radius (20) so there are no blocky cliffs
      if (dist < 20) {
        // Quadratic falloff makes the ripple transition beautiful and seamless
        const force = Math.pow(1 - dist / 20, 2) * 0.08; 
        states[i].vZ -= force;
      }

      const displacement = states[i].pZ - states[i].baseZ;
      
      if (Math.abs(states[i].vZ) > 0.001 || Math.abs(displacement) > 0.001) {
        needsUpdate = true;
        
        states[i].vZ -= displacement * tension;
        states[i].vZ *= damping;
        states[i].pZ += states[i].vZ;

        // Cap maximum depth so sides never get exposed
        const safeZ = Math.max(-0.5, states[i].pZ);

        dummy.position.set(ix, iy, safeZ);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Color intensity scales with depth
        const pressDepth = Math.abs(safeZ);
        const intensity = Math.max(0, Math.min(1, pressDepth * 2.5));
        
        const base = isNight ? cBaseNight : cBaseLight;
        const ripple = isNight ? cRippleNight : cRippleLight;
        tempColor.copy(base).lerp(ripple, intensity);
        meshRef.current.setColorAt(i, tempColor);
      }
    }
    
    if (needsUpdate) {
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      {/* Reduced thickness to absolute minimum to ensure it's a 2D tile */}
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 0.01]} />
      <meshStandardMaterial roughness={0.3} metalness={0.1} />
    </instancedMesh>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(true);
  const { scrollYProgress } = useScroll();
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.85, 0.85, 0]);

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
        gl={{ alpha: true, antialias: true }} // alpha: true PREVENTS THE BLACK VOID GRID LINES
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 150], fov: 15 }} 
        style={{ width: '100vw', height: '100vh', background: isNight ? '#020617' : '#ffffff', transition: 'background 0.5s ease' }}
      >
        {/* Fill the WebGL background explicitly to match the CSS background, destroying the black border issue */}
        <color attach="background" args={[isNight ? '#020617' : '#ffffff']} />
        
        <ambientLight intensity={isNight ? 0.7 : 1.2} />
        <directionalLight position={[10, -10, 20]} intensity={isNight ? 1.0 : 1.5} color="#ffffff" />
        <directionalLight position={[-10, 10, 15]} intensity={isNight ? 0.4 : 0.6} color={isNight ? '#fbbf24' : '#dcfce7'} />
        
        <Cubes isNight={isNight} />
      </Canvas>
      
      <motion.div 
        style={{
          position: 'absolute', inset: 0,
          background: isNight ? '#020617' : '#ffffff',
          opacity: overlayOpacity
        }}
      />
    </div>
  );
}
