'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// Dezprox uses very large, flat tiles.
const GRID_W = 24; 
const GRID_H = 14;
const SPACING = 4.0;
const CUBE_SIZE = 3.9; // Slight gap creates the tile lines

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_W * GRID_H;
  
  const tempColor = useMemo(() => new Color(), []);
  
  const cBaseLight = useMemo(() => new Color('#f8fafc'), []); // Very light subtle gray/white
  const cRippleLight = useMemo(() => new Color('#dcfce7'), []); // Subtle green Dezprox tint
  
  const cBaseNight = useMemo(() => new Color('#020617'), []); 
  const cRippleNight = useMemo(() => new Color('#fbbf24'), []); 

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  const states = useMemo(() => {
    const s = [];
    for (let i = 0; i < count; i++) {
      s.push({
        baseZ: 0, // PERFECTLY FLAT AT REST
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

    // Subtle camera parallax
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, mouse.current.x * 2.0, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, mouse.current.y * 2.0, 0.05);
    state.camera.lookAt(0, 0, 0);

    let needsUpdate = false;

    // Convert mouse to world coordinates perfectly based on visible area
    const mx = mouse.current.x * (GRID_W * SPACING / 2);
    const my = mouse.current.y * (GRID_H * SPACING / 2);

    const tension = 0.03;
    const damping = 0.88; // highly viscous fluid feel

    for (let i = 0; i < count; i++) {
      const ix = (i % GRID_W - GRID_W / 2) * SPACING;
      const iy = (Math.floor(i / GRID_W) - GRID_H / 2) * SPACING;
      
      const dx = ix - mx;
      const dy = iy - my;
      const dist = Math.hypot(dx, dy);

      if (dist < 12) {
        const force = (1 - dist / 12) * 1.5; // Stronger push for larger cubes
        states[i].vZ -= force;
      }

      const displacement = states[i].pZ - states[i].baseZ;
      
      if (Math.abs(states[i].vZ) > 0.001 || Math.abs(displacement) > 0.001) {
        needsUpdate = true;
        
        states[i].vZ -= displacement * tension;
        states[i].vZ *= damping;
        states[i].pZ += states[i].vZ;

        // The blocks push backward on Z
        dummy.position.set(ix, iy, states[i].pZ);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Color mapping
        const pressDepth = Math.abs(states[i].pZ);
        const intensity = Math.max(0, Math.min(1, pressDepth * 0.15));
        
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
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      {/* High metalness/smoothness makes them look sleek and reflective like Dezprox */}
      <meshStandardMaterial roughness={0.2} metalness={0.1} />
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
        gl={{ alpha: false, antialias: true }} 
        dpr={[1, 1.5]} // Slight bump in quality for the large cubes
        style={{ background: isNight ? '#020617' : '#ffffff', transition: 'background 0.5s ease' }}
      >
        {/* Orthographic Camera completely removes perspective warping, making blocks perfectly flush */}
        <orthographicCamera makeDefault position={[0, 0, 100]} zoom={18} />
        
        <ambientLight intensity={isNight ? 0.8 : 1.5} />
        <directionalLight position={[20, 20, 30]} intensity={isNight ? 1.0 : 1.5} color="#ffffff" />
        <directionalLight position={[-20, -20, 30]} intensity={isNight ? 0.5 : 0.8} color={isNight ? '#fbbf24' : '#dcfce7'} />
        
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
