import Nav from './components/Nav';
import Hero from './components/Hero';
import DynamicSky from './components/DynamicSky';
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
import Preloader from './components/Preloader';

export default function Home() {
  return (
    <>
      <CursorFX />
      <Preloader />
      <Nav />
      <DynamicSky />
      <AnimatedBackground />

      <main className="canvas-overlay-mode" style={{ position: 'relative', zIndex: 10 }}>
        <Hero />

        <section style={{ position: 'relative', zIndex: 30 }}>
          <TechStack />
        </section>

        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          
          <section style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-glass)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', zIndex: 10, borderTop: '1px solid var(--border)' }} />
            <div style={{ position: 'relative', zIndex: 30 }}>
              <Projects />
            </div>
          </section>

          <section style={{ position: 'relative', zIndex: 30 }}>
            <MoreProjects />
          </section>

          <section style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-glass)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', zIndex: 10, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} />
            <div style={{ position: 'relative', zIndex: 30 }}>
              <Experience />
              <Education />
              <Certs />
              <About />
            </div>
          </section>

          <section style={{ position: 'relative', zIndex: 30 }}>
            <Contact />
          </section>
        </div>
      </main>
    </>
  );
}
