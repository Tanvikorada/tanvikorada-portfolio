'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Playground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer, scene, camera, dashGroup, particleGeo, frameId;

    const init = async () => {
      const THREE = await import('three');

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x010409);
      scene.fog = new THREE.Fog(0x010409, 60, 200);

      // Camera — wide-angle, low, looking ahead like a racing cockpit
      camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 300);
      camera.position.set(0, 2.2, 0);
      camera.lookAt(0, 1.6, -100);

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.shadowMap.enabled = true;

      // ─── ROAD ───────────────────────────────────────────────
      const roadGeo = new THREE.PlaneGeometry(12, 400);
      const roadMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.9, metalness: 0.1 });
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.z = -150;
      scene.add(road);

      // Road edge lines (left + right)
      const edgeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      [-5.5, 5.5].forEach((x) => {
        const edgeGeo = new THREE.PlaneGeometry(0.15, 400);
        const edge = new THREE.Mesh(edgeGeo, edgeMat);
        edge.rotation.x = -Math.PI / 2;
        edge.position.set(x, 0.01, -150);
        scene.add(edge);
      });

      // ─── DASHED CENTER LINES ────────────────────────────────
      dashGroup = new THREE.Group();
      const dashGeo = new THREE.PlaneGeometry(0.18, 4);
      const dashMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const NUM_DASHES = 60;
      for (let i = 0; i < NUM_DASHES; i++) {
        const dash = new THREE.Mesh(dashGeo, dashMat);
        dash.rotation.x = -Math.PI / 2;
        dash.position.set(0, 0.02, -i * 8);
        dashGroup.add(dash);
      }
      scene.add(dashGroup);

      // ─── LANE MARKINGS (secondary) ──────────────────────────
      const laneMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.25, transparent: true });
      [-3, 3].forEach((x) => {
        for (let i = 0; i < NUM_DASHES; i++) {
          const d = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 3), laneMat);
          d.rotation.x = -Math.PI / 2;
          d.position.set(x, 0.02, -i * 9 - 4);
          scene.add(d);
        }
      });

      // ─── ROADSIDE POLES / LIGHTS ────────────────────────────
      const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 8, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
      const lampColors = [0xfff8e7, 0xffd580, 0xffe4a0];

      for (let i = 0; i < 20; i++) {
        [-7.5, 7.5].forEach((x) => {
          const pole = new THREE.Mesh(poleGeo, poleMat);
          pole.position.set(x, 4, -i * 16 - 10);
          scene.add(pole);

          const lampColor = lampColors[i % lampColors.length];
          const lamp = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 8, 8),
            new THREE.MeshStandardMaterial({
              color: lampColor, emissive: lampColor, emissiveIntensity: 1.5, roughness: 0.1,
            })
          );
          lamp.position.set(x, 8.3, -i * 16 - 10);
          scene.add(lamp);

          const light = new THREE.PointLight(lampColor, 0.8, 18);
          light.position.copy(lamp.position);
          scene.add(light);
        });
      }

      // ─── MOUNTAINS / HORIZON ────────────────────────────────
      const mtMat = new THREE.MeshStandardMaterial({ color: 0x0d1117 });
      for (let i = 0; i < 12; i++) {
        const h = 20 + Math.random() * 40;
        const mt = new THREE.Mesh(new THREE.ConeGeometry(15 + Math.random() * 10, h, 5), mtMat);
        mt.position.set(-60 + i * 15 + Math.random() * 10, h / 2 - 1, -200);
        scene.add(mt);
      }

      // ─── STARS ──────────────────────────────────────────────
      const starGeo = new THREE.BufferGeometry();
      const starPositions = [];
      for (let i = 0; i < 3000; i++) {
        starPositions.push(
          (Math.random() - 0.5) * 400,
          Math.random() * 80 + 10,
          (Math.random() - 0.5) * 400
        );
      }
      starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.25 })));

      // ─── MOON ───────────────────────────────────────────────
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(4, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xfff8e7, emissive: 0xfff0c8, emissiveIntensity: 0.3 })
      );
      moon.position.set(-30, 50, -180);
      scene.add(moon);
      const moonLight = new THREE.PointLight(0xfff8e7, 0.8, 300);
      moonLight.position.copy(moon.position);
      scene.add(moonLight);

      // ─── AMBIENT LIGHT ──────────────────────────────────────
      scene.add(new THREE.AmbientLight(0x112244, 0.5));
      const dir = new THREE.DirectionalLight(0x334488, 0.3);
      dir.position.set(0, 20, 0);
      scene.add(dir);

      // ─── CAR HEADLIGHTS (player POV) ────────────────────────
      const headLeft = new THREE.SpotLight(0xfff4e0, 2.5, 80, Math.PI / 8, 0.3);
      headLeft.position.set(-0.8, 1.8, 0.5);
      headLeft.target.position.set(-2, 0, -60);
      scene.add(headLeft);
      scene.add(headLeft.target);

      const headRight = new THREE.SpotLight(0xfff4e0, 2.5, 80, Math.PI / 8, 0.3);
      headRight.position.set(0.8, 1.8, 0.5);
      headRight.target.position.set(2, 0, -60);
      scene.add(headRight);
      scene.add(headRight.target);

      // ─── SPEED PARTICLES ────────────────────────────────────
      particleGeo = new THREE.BufferGeometry();
      const pPos = [];
      for (let i = 0; i < 500; i++) {
        pPos.push((Math.random() - 0.5) * 14, Math.random() * 3, -Math.random() * 120);
      }
      particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
      const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
        color: 0xffd700, size: 0.06, transparent: true, opacity: 0.7,
      }));
      scene.add(particles);

      // ─── ANIMATE ────────────────────────────────────────────
      let t = 0;
      const positions = particleGeo.attributes.position.array;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        t += 0.016;

        // Move dashes toward camera
        dashGroup.position.z = (dashGroup.position.z + 0.55) % 8;

        // Scroll particles
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 2] += 0.7;
          if (positions[i + 2] > 2) positions[i + 2] = -120;
        }
        particleGeo.attributes.position.needsUpdate = true;

        // Gentle camera sway
        camera.position.x = Math.sin(t * 0.4) * 0.08;
        camera.position.y = 2.2 + Math.sin(t * 0.7) * 0.04;

        renderer.render(scene, camera);
      };

      animate();
    };

    init();

    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#010409' }}>
      {/* Navigation */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, width: '100%',
        padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', zIndex: 50, pointerEvents: 'none',
      }}>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white',
          fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em',
          textDecoration: 'none', pointerEvents: 'auto',
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)',
          padding: '0.75rem 1.25rem', borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.3s ease',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
          <span>Back to Home</span>
        </Link>
        <div style={{ textAlign: 'right', color: 'white', pointerEvents: 'none' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, margin: '0 0 0.25rem' }}>
            Playground
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Night Drive · Interactive 3D
          </p>
        </div>
      </nav>

      {/* Three.js Canvas — fills entire screen */}
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

      {/* Vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
      }} />
    </div>
  );
}
