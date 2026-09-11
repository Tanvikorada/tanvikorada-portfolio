'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils, Vector2 } from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Smooth flowing noise
    float elevation = sin(modelPosition.x * 2.0 + uTime * 0.5) * 0.15
                    + sin(modelPosition.y * 1.5 + uTime * 0.3) * 0.15;
                    
    // Cursor interaction (ripple)
    float dist = distance(uv, uMouse);
    float ripple = exp(-dist * 10.0) * 0.5 * sin(dist * 20.0 - uTime * 3.0);
    elevation += ripple * 0.5;
    
    modelPosition.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uIsNight;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Colors
    vec3 dayCol1 = vec3(0.95, 0.97, 1.0); // Very Light blue
    vec3 dayCol2 = vec3(1.0, 1.0, 1.0);  // White
    vec3 dayCol3 = vec3(0.85, 0.9, 1.0);  // Soft blue
    
    vec3 nightCol1 = vec3(0.01, 0.02, 0.05); // Deep space
    vec3 nightCol2 = vec3(0.04, 0.07, 0.15);   // Indigo
    vec3 nightCol3 = vec3(0.08, 0.04, 0.12);  // Purple tint

    vec3 base1 = mix(dayCol1, nightCol1, uIsNight);
    vec3 base2 = mix(dayCol2, nightCol2, uIsNight);
    vec3 base3 = mix(dayCol3, nightCol3, uIsNight);

    float mixRatio = sin(vUv.x * 3.0 + uTime * 0.5) * 0.5 + 0.5;
    vec3 color = mix(base1, base2, mixRatio);
    
    // Add elevation impact to color
    color = mix(color, base3, vElevation * 2.0 + 0.5);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidMesh({ isNight }) {
  const meshRef = useRef();
  const mouse = useRef(new Vector2(0.5, 0.5));
  const targetMouse = useRef(new Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uIsNight: { value: isNight ? 1 : 0 },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouse.current.x = e.clientX / window.innerWidth;
      targetMouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
      
      const targetNight = isNight ? 1 : 0;
      meshRef.current.material.uniforms.uIsNight.value = MathUtils.lerp(
        meshRef.current.material.uniforms.uIsNight.value,
        targetNight,
        0.05
      );

      mouse.current.x = MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.05);
      mouse.current.y = MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.05);
      meshRef.current.material.uniforms.uMouse.value = mouse.current;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]} rotation={[-Math.PI / 6, 0, 0]} scale={1.8}>
      <planeGeometry args={[10, 10, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}

export default function HeroBg() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    setIsNight(document.body.classList.contains('night'));
    const obs = new MutationObserver(() => setIsNight(document.body.classList.contains('night')));
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <FluidMesh isNight={isNight} />
      </Canvas>
    </div>
  );
}
