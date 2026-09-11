'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

const GRID_SIZE = 45; // Grid large enough to fill screen
const CUBE_SIZE = 1.051; // Matches SPACING for zero gap
const SPACING = 1.05; 

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_SIZE * GRID_SIZE;
  
  const tempColor = useMemo(() => new Color(), []);
  const cBaseLight = useMemo(() => new Color('#ffffff'), []); // Pure White
  const cRippleLight = useMemo(() => new Color('#e9d5ff'), []); // Light lavender ripple
  const cBaseNight = useMemo(() => new Color('#020617'), []);
  const cRippleNight = useMemo(() => new Color('#3b0764'), []);

  const states = useMemo(() => Array.from({ length: count }, () => ({
    rX: 0, rY: 0, rZ: 0,
    trX: 0, trY: 0, trZ: 0,
    pY: 0, tpY: 0,
    colorVal: 0
  })), [count]);

  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      const initialColor = isNight ? cBaseNight : cBaseLight;
      for (let i = 0; i < count; i++) {
        meshRef.current.setColorAt(i, initialColor);
      }
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [isNight, count, cBaseNight, cBaseLight]);

  useFrame((state) => {
    const { clock } = state;
    const time = clock.getElapsedTime();

    mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.1);

    if (meshRef.current && meshRef.current.instanceColor) {
      let i = 0;
      const offset = (GRID_SIZE * SPACING) / 2;
      
      const mouseWorldX = mouse.current.x * 25;
      const mouseWorldY = mouse.current.y * 15;

      const cBase = isNight ? cBaseNight : cBaseLight;
      const cRipple = isNight ? cRippleNight : cRippleLight;

      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          const px = x * SPACING - offset;
          const py = y * SPACING - offset;

          const dx = px - mouseWorldX;
          const dy = py - mouseWorldY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const cubeState = states[i];

          // Threshold matches exactly the cubes that are flipping
          if (dist < 3.5) {
            cubeState.colorVal = 1.0;
            cubeState.tpY = -0.5;
            cubeState.trX = Math.PI; 
            cubeState.trY = Math.PI / 4;
          } else {
            // Fade out color
            cubeState.colorVal = MathUtils.lerp(cubeState.colorVal, 0, 0.05);
            // Subtle ambient wave when far
            const wave = Math.sin(px * 0.2 + time * 1.5) * 0.1 + Math.cos(py * 0.2 + time * 1.5) * 0.1;
            cubeState.tpY = wave;
            cubeState.trX = 0;
            cubeState.trY = 0;
          }

          // Original spring interpolation
          cubeState.pY = MathUtils.lerp(cubeState.pY, cubeState.tpY, 0.08);
          cubeState.rX = MathUtils.lerp(cubeState.rX, cubeState.trX, 0.1);
          cubeState.rY = MathUtils.lerp(cubeState.rY, cubeState.trY, 0.1);

          // Apply Color
          tempColor.copy(cBase).lerp(cRipple, cubeState.colorVal);
          meshRef.current.setColorAt(i, tempColor);

          // Apply Positions
          dummy.position.set(px, py, cubeState.pY);
          dummy.rotation.set(cubeState.rX, cubeState.rY, 0);
          
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i++, dummy.matrix);
        }
      }
      meshRef.current.instanceColor.needsUpdate = true;
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      {/* High brightness, low roughness for brilliant white */}
      <meshStandardMaterial 
        color="#ffffff" 
        roughness={0.1} 
        metalness={0.0}
      />
    </instancedMesh>
  );
}

export default function HeroBg() {
  const [mounted, setMounted] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const { scrollYProgress } = useScroll();

  const blurVal = useTransform(scrollYProgress, [0, 0.05, 0.8, 1], [0, 15, 15, 20]);
  const filterStyle = useTransform(blurVal, (v) => `blur(${v}px)`);

  useEffect(() => {
    setMounted(true);
    setIsNight(document.body.classList.contains('night'));
    const obs = new MutationObserver(() => setIsNight(document.body.classList.contains('night')));
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <motion.div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none', filter: filterStyle }}>
      <div style={{ position: 'absolute', inset: 0, background: isNight ? '#020617' : '#ffffff', zIndex: -1 }} />
      <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
        {/* Crank up lighting for brilliant pure white background */}
        <ambientLight intensity={isNight ? 0.5 : 2.5} color="#ffffff" />
        <directionalLight position={[5, 10, 15]} intensity={isNight ? 2 : 2.5} color="#ffffff" castShadow />
        <directionalLight position={[-15, -10, -10]} intensity={isNight ? 1 : 1.5} color="#ffffff" />
        <pointLight position={[0, 0, 5]} intensity={isNight ? 1 : 1.0} color="#ffffff" />
        
        <Cubes isNight={isNight} />
        
        <fog attach="fog" args={[isNight ? '#020617' : '#ffffff', 12, 28]} />
      </Canvas>
    </motion.div>
  );
}

