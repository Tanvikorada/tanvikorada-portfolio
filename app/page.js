import Nav from './components/Nav';
import Hero from './components/Hero';
import AnimatedBackground from './components/AnimatedBackground';
import TechStack from './components/TechStack';
import BongoCatSection from './components/BongoCatSection';
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
        <div style={{ position: 'relative', zIndex: 30 }}>
          <TechStack />
        </div>
        
        <BongoCatSection />

        {/* Wrap sections so the plane (z:20) flies OVER the bg (z:10) but UNDER the content (z:30) */}
        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          
          <div style={{ position: 'relative' }}>
            {/* Background layer */}
            <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-base)', zIndex: 10 }} />
            {/* Content layer */}
            <div style={{ position: 'relative', zIndex: 30 }}>
              <Projects />
            </div>
          </div>

          {/* 4. More Projects - horizontal row. Needs to be transparent for Bongo Cat */}
          <div style={{ position: 'relative', zIndex: 30 }}>
            <MoreProjects />
          </div>

          <div style={{ position: 'relative' }}>
            {/* Background layer */}
            <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-base)', zIndex: 10 }} />
            {/* Content layer */}
            <div style={{ position: 'relative', zIndex: 30 }}>
              {/* 5. Experience Timeline */}
              <Experience />

              {/* 6. Education */}
              <Education />

              {/* 7. Certifications + Achievements */}
              <Certs />

              {/* 5. About bento */}
              <About />
            </div>
          </div>

          {/* 6. Contact - Needs to be transparent for floating keycaps */}
          <div style={{ position: 'relative', zIndex: 30 }}>
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}
