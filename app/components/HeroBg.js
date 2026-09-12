'use client';
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Object3D, MathUtils, Color } from 'three';

const GRID_SIZE = 26; 
const CUBE_SIZE = 2.005; 
const SPACING = 2.0; 

function MouseLight() {
  const lightRef = useRef();
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (lightRef.current) {
      // Follow the mouse smoothly
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      lightRef.current.position.x = MathUtils.lerp(lightRef.current.position.x, x, 0.1);
      lightRef.current.position.y = MathUtils.lerp(lightRef.current.position.y, y, 0.1);
    }
  });
  
  return <pointLight ref={lightRef} position={[0, 0, 4]} distance={20} intensity={2.5} color="#ffffff" />;
}

function Cubes({ isNight }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  const count = GRID_SIZE * GRID_SIZE;
  
  const tempColor = useMemo(() => new Color(), []);
  
  // High-end premium colors
  // Light mode: Clean soft gray base, striking vibrant violet/blue on hover
  const cBaseLight = useMemo(() => new Color('#f8fafc'), []); 
  const cRippleLight = useMemo(() => new Color('#6366f1'), []); 
  
  // Dark mode: Deep slate base, electric cyan/teal on hover
  const cBaseNight = useMemo(() => new Color('#0f172a'), []);
  const cRippleNight = useMemo(() => new Color('#06b6d4'), []); 

  const states = useMemo(() => Array.from({ length: count }, () => ({
    pY: 0, tpY: 0,
    colorVal: 0
  })), [count]);

  const mouse = useRef({ x: -100, y: -100 });
  const targetMouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onLeave = () => {
      targetMouse.current.x = -100;
      targetMouse.current.y = -100;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.body.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useFrame(() => {
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

          // Smooth depression effect (NO ROTATION, just smooth Z-axis sink)
          const maxDist = 6.0;
          if (dist < maxDist) {
            // Gaussian-like curve for buttery smooth edges
            const intensity = Math.exp(-Math.pow(dist, 2) / (2 * Math.pow(maxDist / 2.5, 2)));
            cubeState.tpY = -2.0 * intensity;
            cubeState.colorVal = intensity * 1.2; // Slightly boost color intensity at the peak
          } else {
            cubeState.tpY = 0;
            cubeState.colorVal = 0;
          }

          // Buttery smooth physical interpolation
          cubeState.pY = MathUtils.lerp(cubeState.pY, cubeState.tpY, 0.08);

          // Apply position
          dummy.position.set(px, py, cubeState.pY);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);

          // Apply color
          tempColor.copy(cBase).lerp(cRipple, MathUtils.clamp(cubeState.colorVal, 0, 1));
          meshRef.current.setColorAt(i, tempColor);

          i++;
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, 0.8]} />
      <meshStandardMaterial 
        roughness={0.4} 
        metalness={0.1}
      />
    </instancedMesh>
  );
}

export default function HeroBg({ isNight = false }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 0,
      pointerEvents: 'none',
      background: isNight ? '#020617' : '#ffffff'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 40 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={isNight ? 1.0 : 1.5} />
        <directionalLight position={[10, 20, 15]} intensity={isNight ? 1.5 : 2.5} />
        <MouseLight />
        <Cubes isNight={isNight} />
      </Canvas>
      
      {/* Heavy gradient fade at the bottom so it blends into the rest of the site */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '40vh',
        background: isNight 
          ? 'linear-gradient(to bottom, transparent, var(--bg-base))'
          : 'linear-gradient(to bottom, transparent, var(--bg-base))',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
