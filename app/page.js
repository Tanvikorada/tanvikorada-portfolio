import Nav from './components/Nav';
import Hero from './components/Hero';
import AnimatedBackground from './components/AnimatedBackground';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import MoreProjects from './components/MoreProjects';
import Experience from './components/Experience';
import Certs from './components/Certs';
import About from './components/About';
import CursorFX from './components/CursorFX';
import Contact from './components/Contact';
import Education from './components/Education';
import PaperPlane from './components/PaperPlane';

export default function Home() {
  return (
    <>
      {/* Global cursor effect (click sound + sparks) */}
      <CursorFX />

      {/* Floating pill nav */}
      <Nav />

      <AnimatedBackground />

      {/* Main content scrolls over the sticky hero */}
      <div className="canvas-overlay-mode" style={{ position: 'relative', zIndex: 10 }}>
        {/* 1. Sticky Sky Hero */}
        <Hero />

        {/* Scroll-driven paper plane that flies the full page */}
        <PaperPlane />

        {/* 2. Tech Stack */}
        <TechStack />

        {/* Start solid background for the rest of the site */}
        <div style={{ background: 'var(--bg-base)', position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
          {/* 3. Projects — scroll stacking cards */}
          <Projects />

          {/* 4. More Projects - horizontal row */}
          <MoreProjects />

          {/* 5. Experience Timeline */}
          <Experience />

        {/* 6. Education */}
        <Education />

        {/* 7. Certifications + Achievements */}
        <Certs />

        {/* 5. About bento */}
        <About />

          {/* 6. Contact */}
          <Contact />
        </div>
      </div>
    </>
  );
}
