'use client';
import { useEffect, useRef, useState } from 'react';

export default function PlaygroundSection() {
  const canvasRef = useRef(null);
  const [titleMode, setTitleMode] = useState('Night Drive');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer, scene, camera, dashGroup, particleGeo, frameId;
    let observer;
    let roadMat, mtMat, ambientLight, dirLight, moon, moonLight, stars, particles, headLeft, headRight;
    let bgDiv = canvas.parentElement;

    const init = async () => {
      const THREE = await import('three');

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.shadowMap.enabled = true;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
      camera.position.set(0, 2.2, 8);
      scene.add(camera);

      // ROAD
      const roadGeo = new THREE.PlaneGeometry(12, 400);
      roadMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.9, metalness: 0.1 });
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.z = -150;
      scene.add(road);

      const edgeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      [-5.5, 5.5].forEach((x) => {
        const edgeGeo = new THREE.PlaneGeometry(0.15, 400);
        const edge = new THREE.Mesh(edgeGeo, edgeMat);
        edge.rotation.x = -Math.PI / 2;
        edge.position.set(x, 0.01, -150);
        scene.add(edge);
      });

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

      const laneMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.25, transparent: true });
      [-3, 3].forEach((x) => {
        for (let i = 0; i < NUM_DASHES; i++) {
          const d = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 3), laneMat);
          d.rotation.x = -Math.PI / 2;
          d.position.set(x, 0.02, -i * 9 - 4);
          scene.add(d);
        }
      });

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

      mtMat = new THREE.MeshStandardMaterial({ color: 0x0d1117 });
      for (let i = 0; i < 12; i++) {
        const h = 20 + Math.random() * 40;
        const mt = new THREE.Mesh(new THREE.ConeGeometry(15 + Math.random() * 10, h, 5), mtMat);
        mt.position.set(-60 + i * 15 + Math.random() * 10, h / 2 - 1, -200);
        scene.add(mt);
      }

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
      stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.25 }));
      scene.add(stars);

      moon = new THREE.Mesh(
        new THREE.SphereGeometry(6, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xfff8e7, emissive: 0xfff0c8, emissiveIntensity: 0.3 })
      );
      moon.position.set(-30, 50, -180);
      scene.add(moon);
      moonLight = new THREE.PointLight(0xfff8e7, 0.8, 300);
      moonLight.position.copy(moon.position);
      scene.add(moonLight);

      ambientLight = new THREE.AmbientLight(0x112244, 0.5);
      scene.add(ambientLight);
      dirLight = new THREE.DirectionalLight(0x334488, 0.3);
      dirLight.position.set(0, 20, 0);
      scene.add(dirLight);

      headLeft = new THREE.SpotLight(0xfff4e0, 2.5, 80, Math.PI / 8, 0.3);
      headLeft.position.set(-0.8, 1.8, 0.5);
      headLeft.target.position.set(-2, 0, -60);
      scene.add(headLeft);
      scene.add(headLeft.target);

      headRight = new THREE.SpotLight(0xfff4e0, 2.5, 80, Math.PI / 8, 0.3);
      headRight.position.set(0.8, 1.8, 0.5);
      headRight.target.position.set(2, 0, -60);
      scene.add(headRight);
      scene.add(headRight.target);

      const hoodGroup = new THREE.Group();
      const hoodGeo = new THREE.BoxGeometry(5.2, 1, 3.5);
      const hoodMaterial = new THREE.MeshStandardMaterial({ color: 0xcc0000, roughness: 0.2, metalness: 0.7 });
      const hoodMesh = new THREE.Mesh(hoodGeo, hoodMaterial);
      hoodMesh.rotation.x = -Math.PI / 14;
      hoodMesh.position.set(0, -0.2, 0);
      hoodGroup.add(hoodMesh);

      const ventGeo = new THREE.BoxGeometry(0.8, 1.1, 1.2);
      const ventMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
      const ventL = new THREE.Mesh(ventGeo, ventMat);
      ventL.position.set(-1.2, -0.1, 0.5);
      ventL.rotation.x = -Math.PI / 14;
      const ventR = new THREE.Mesh(ventGeo, ventMat);
      ventR.position.set(1.2, -0.1, 0.5);
      ventR.rotation.x = -Math.PI / 14;
      hoodGroup.add(ventL, ventR);

      const wiperGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.5);
      const wiperMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
      const wiper = new THREE.Mesh(wiperGeo, wiperMat);
      wiper.position.set(-1, 0.4, 1.5);
      wiper.rotation.z = Math.PI / 2.2;
      wiper.rotation.x = -Math.PI / 10;
      hoodGroup.add(wiper);

      hoodGroup.position.set(0, -1.8, -2.2);
      camera.add(hoodGroup);

      particleGeo = new THREE.BufferGeometry();
      const pPos = [];
      for (let i = 0; i < 500; i++) {
        pPos.push((Math.random() - 0.5) * 14, Math.random() * 3, -Math.random() * 120);
      }
      particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
      particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
        color: 0xffd700, size: 0.06, transparent: true, opacity: 0.7,
      }));
      scene.add(particles);

      const updateTheme = (isNight) => {
        if (isNight) {
          setTitleMode('Night Drive');
          scene.background = new THREE.Color(0x010409);
          if (bgDiv) bgDiv.style.background = '#010409';
          roadMat.color.setHex(0x1a1a2e);
          mtMat.color.setHex(0x0d1117);
          ambientLight.color.setHex(0x112244);
          ambientLight.intensity = 0.5;
          dirLight.color.setHex(0x334488);
          dirLight.intensity = 0.3;
          moon.material.color.setHex(0xfff8e7);
          moon.material.emissive.setHex(0xfff0c8);
          moonLight.color.setHex(0xfff8e7);
          moonLight.intensity = 0.8;
          stars.visible = true;
          particles.visible = true;
          headLeft.intensity = 2.5;
          headRight.intensity = 2.5;
        } else {
          setTitleMode('Day Cruise');
          scene.background = new THREE.Color(0x87ceeb);
          if (bgDiv) bgDiv.style.background = '#87ceeb';
          roadMat.color.setHex(0x9ca3af);
          mtMat.color.setHex(0x64748b);
          ambientLight.color.setHex(0xffffff);
          ambientLight.intensity = 1.0;
          dirLight.color.setHex(0xffffff);
          dirLight.intensity = 1.0;
          moon.material.color.setHex(0xffdd00);
          moon.material.emissive.setHex(0xffdd00);
          moonLight.color.setHex(0xffdd00);
          moonLight.intensity = 1.5;
          stars.visible = false;
          particles.visible = false;
          headLeft.intensity = 0;
          headRight.intensity = 0;
        }
      };

      updateTheme(document.body.classList.contains('night'));

      observer = new MutationObserver(() => {
        updateTheme(document.body.classList.contains('night'));
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

      let t = 0;
      const positions = particleGeo.attributes.position.array;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        t += 0.016;

        dashGroup.position.z = (dashGroup.position.z + 0.6) % 8;

        if (particles.visible) {
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += 0.7;
            if (positions[i + 2] > 2) positions[i + 2] = -120;
          }
          particleGeo.attributes.position.needsUpdate = true;
        }

        const speedShake = Math.sin(t * 40) * 0.005;
        const sway = Math.sin(t * 2) * 0.02;
        camera.position.x = sway;
        camera.position.y = 2.2 + speedShake;

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
      if (observer) observer.disconnect();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', transition: 'background 0.5s ease' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%',
        padding: '3rem 3rem', display: 'flex', justifyContent: 'flex-end',
        alignItems: 'flex-start', zIndex: 50, pointerEvents: 'none',
      }}>
        <div style={{ textAlign: 'right', pointerEvents: 'none', mixBlendMode: 'difference', color: '#fff' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 400, margin: '0 0 0.25rem' }}>
            Playground
          </h1>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            {titleMode} · Interactive 3D
          </p>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
      }} />
    </div>
  );
}
