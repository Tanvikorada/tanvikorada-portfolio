import Nav from './components/Nav';
import Hero from './components/Hero';
import SkyBand from './components/SkyBand';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Certs from './components/Certs';
import About from './components/About';
import CursorFX from './components/CursorFX';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      {/* Global cursor effect (click sound + sparks) */}
      <CursorFX />

      {/* Floating pill nav */}
      <Nav />

      {/* 1. Sticky Sky Hero */}
      <Hero />

      {/* Main content scrolls over the sticky hero */}
      <div style={{ position: 'relative', zIndex: 10, background: 'var(--bg-base)', transition: 'background 0.6s' }}>
        {/* Sky band cloud transition */}
        <SkyBand />

        {/* 2. Tech Stack */}
        <TechStack />

        {/* 3. Projects — scroll stacking cards */}
        <Projects />

        {/* 4. Certifications + Achievements */}
        <Certs />

        {/* 5. About bento */}
        <About />

        {/* 6. Contact */}
        <Contact />
      </div>
    </>
  );
}
