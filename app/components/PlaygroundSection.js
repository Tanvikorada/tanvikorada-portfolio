'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function PlaygroundSection() {
  const canvasRef = useRef(null);
  const [titleMode, setTitleMode] = useState('Night Drive');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bgDiv = canvas.parentElement;

    let renderer, scene, camera;
    let roadMat, dashGroup, mtMat;
    let particles, particleGeo;
    let frameId;
    let observer;
    let headLeft, headRight, ambientLight, dirLight;
    let sunMoon, sunMoonLight, stars;
    let hoodMaterial;

    const init = () => {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0a0a0f, 0.015);

      camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 300);
      camera.position.set(0, 2.2, 0);
      scene.add(camera);

      // Elegant Grid Road
      roadMat = new THREE.MeshStandardMaterial({ 
        color: 0x101018, 
        roughness: 0.1, 
        metalness: 0.8 
      });
      const roadGeo = new THREE.PlaneGeometry(100, 400);
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.set(0, 0, -150);
      scene.add(road);

      dashGroup = new THREE.Group();
      const dashMat = new THREE.MeshBasicMaterial({ color: 0x444444 });
      for (let i = 0; i < 40; i++) {
        const dashGeo = new THREE.PlaneGeometry(0.2, 3);
        const dash = new THREE.Mesh(dashGeo, dashMat);
        dash.rotation.x = -Math.PI / 2;
        dash.position.set(0, 0.02, -i * 8);
        dashGroup.add(dash);
      }
      scene.add(dashGroup);

      // Geometric Abstract Mountains
      mtMat = new THREE.MeshStandardMaterial({ color: 0x111115, flatShading: true, roughness: 0.8 });
      for (let i = 0; i < 20; i++) {
        const h = 20 + Math.random() * 50;
        const mt = new THREE.Mesh(new THREE.ConeGeometry(20 + Math.random() * 15, h, 4), mtMat);
        const side = Math.random() > 0.5 ? 1 : -1;
        mt.position.set(side * (30 + Math.random() * 40), h / 2 - 1, -50 - Math.random() * 200);
        mt.rotation.y = Math.random() * Math.PI;
        scene.add(mt);
      }

      // Stars
      const starGeo = new THREE.BufferGeometry();
      const starPositions = [];
      for (let i = 0; i < 2000; i++) {
        starPositions.push(
          (Math.random() - 0.5) * 400,
          Math.random() * 100 + 20,
          (Math.random() - 0.5) * 400
        );
      }
      starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
      stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 }));
      scene.add(stars);

      // Sun/Moon
      sunMoon = new THREE.Mesh(
        new THREE.SphereGeometry(8, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xfff8e7, emissive: 0xfff0c8, emissiveIntensity: 0.5 })
      );
      sunMoon.position.set(-40, 60, -200);
      scene.add(sunMoon);
      
      sunMoonLight = new THREE.PointLight(0xfff8e7, 1, 400);
      sunMoonLight.position.copy(sunMoon.position);
      scene.add(sunMoonLight);

      ambientLight = new THREE.AmbientLight(0x112244, 0.6);
      scene.add(ambientLight);
      
      dirLight = new THREE.DirectionalLight(0x334488, 0.4);
      dirLight.position.set(0, 30, 0);
      scene.add(dirLight);

      // Headlights
      headLeft = new THREE.SpotLight(0xfff4e0, 2, 100, Math.PI / 6, 0.5);
      headLeft.position.set(-1, 1.8, 0.5);
      headLeft.target.position.set(-3, 0, -80);
      scene.add(headLeft);
      scene.add(headLeft.target);

      headRight = new THREE.SpotLight(0xfff4e0, 2, 100, Math.PI / 6, 0.5);
      headRight.position.set(1, 1.8, 0.5);
      headRight.target.position.set(3, 0, -80);
      scene.add(headRight);
      scene.add(headRight.target);

      // Glassmorphic Car Hood
      const hoodGroup = new THREE.Group();
      hoodMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x0f172a, 
        metalness: 0.5, 
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      });
      const hoodMesh = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1, 3.5), hoodMaterial);
      hoodMesh.rotation.x = -Math.PI / 14;
      hoodMesh.position.set(0, -0.2, 0);
      hoodGroup.add(hoodMesh);

      // Sleek vents
      const ventMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.9 });
      const ventL = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.05, 0.4), ventMat);
      ventL.position.set(-1.2, -0.1, 0.8);
      ventL.rotation.x = -Math.PI / 14;
      const ventR = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.05, 0.4), ventMat);
      ventR.position.set(1.2, -0.1, 0.8);
      ventR.rotation.x = -Math.PI / 14;
      hoodGroup.add(ventL, ventR);

      hoodGroup.position.set(0, -1.8, -2.2);
      camera.add(hoodGroup);

      // Tech Particles
      particleGeo = new THREE.BufferGeometry();
      const pPos = [];
      for (let i = 0; i < 400; i++) {
        pPos.push((Math.random() - 0.5) * 20, Math.random() * 4, -Math.random() * 150);
      }
      particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
      particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
        color: 0x38bdf8, size: 0.08, transparent: true, opacity: 0.6,
      }));
      scene.add(particles);

      const updateTheme = (isNight) => {
        if (isNight) {
          setTitleMode('Night Drive');
          scene.background = new THREE.Color(0x020617);
          scene.fog.color.setHex(0x020617);
          scene.fog.density = 0.015;
          
          roadMat.color.setHex(0x0f172a);
          mtMat.color.setHex(0x020617);
          hoodMaterial.color.setHex(0x0f172a);
          
          ambientLight.color.setHex(0x0f172a);
          ambientLight.intensity = 1.0;
          dirLight.color.setHex(0x334488);
          dirLight.intensity = 0.5;
          
          sunMoon.material.color.setHex(0xfff8e7);
          sunMoon.material.emissive.setHex(0xfff0c8);
          sunMoon.material.emissiveIntensity = 0.4;
          sunMoonLight.color.setHex(0xfff8e7);
          sunMoonLight.intensity = 0.8;
          
          stars.visible = true;
          particles.visible = true;
          headLeft.intensity = 2.0;
          headRight.intensity = 2.0;
          dashMat.color.setHex(0x333333);
        } else {
          setTitleMode('Day Cruise');
          scene.background = new THREE.Color(0xf8fafc);
          scene.fog.color.setHex(0xf8fafc);
          scene.fog.density = 0.008;
          
          roadMat.color.setHex(0xe2e8f0);
          mtMat.color.setHex(0xcbd5e1);
          hoodMaterial.color.setHex(0xffffff);
          
          ambientLight.color.setHex(0xffffff);
          ambientLight.intensity = 1.5;
          dirLight.color.setHex(0xffffff);
          dirLight.intensity = 1.0;
          
          sunMoon.material.color.setHex(0xffdd00);
          sunMoon.material.emissive.setHex(0xffdd00);
          sunMoon.material.emissiveIntensity = 0.8;
          sunMoonLight.color.setHex(0xffdd00);
          sunMoonLight.intensity = 1.5;
          
          stars.visible = false;
          particles.visible = false;
          headLeft.intensity = 0;
          headRight.intensity = 0;
          dashMat.color.setHex(0xffffff);
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

        dashGroup.position.z = (dashGroup.position.z + 0.8) % 8;

        if (particles.visible) {
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += 1.2;
            if (positions[i + 2] > 5) positions[i + 2] = -150;
          }
          particleGeo.attributes.position.needsUpdate = true;
        }

        const speedShake = Math.sin(t * 50) * 0.003;
        const sway = Math.sin(t * 1.5) * 0.015;
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
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      
      {/* Blend Mask at the top to merge seamlessly with the portfolio above */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '30vh',
        background: 'linear-gradient(to bottom, var(--bg-base) 0%, transparent 100%)',
        zIndex: 20, pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%',
        padding: '10vh 8vw', display: 'flex', justifyContent: 'flex-end',
        alignItems: 'flex-start', zIndex: 50, pointerEvents: 'none',
      }}>
        <div style={{ textAlign: 'right', pointerEvents: 'none', mixBlendMode: 'difference', color: '#fff' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', fontWeight: 600, margin: '0 0 0.5rem' }}>
            Playground
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'var(--font-mono)' }}>
            {titleMode} • Interactive 3D
          </p>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
      }} />
    </div>
  );
}
