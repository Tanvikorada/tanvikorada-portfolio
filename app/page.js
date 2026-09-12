import Nav from './components/Nav';
import Hero from './components/Hero';

import AnimatedBackground from './components/AnimatedBackground';

import HeroBg from './components/HeroBg';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import MoreProjects from './components/MoreProjects';
import ScrollExpand from './components/ui/ScrollExpand';
import Journey from './components/Journey';
import Certs from './components/Certs';
import About from './components/About';
import CursorFX from './components/CursorFX';
import Contact from './components/Contact';

import Preloader from './components/Preloader';
import PaperPlane from './components/PaperPlane';
import PlaygroundSection from './components/PlaygroundSection';
import RagBot from './components/ui/RagBot';

export default function Home() {
  return (
    <>
      <CursorFX />
      <RagBot />
      <Preloader />
      <Nav />
      <HeroBg />
      <AnimatedBackground />

      <main className="canvas-overlay-mode" style={{ position: 'relative', zIndex: 10 }}>
        <PaperPlane />
        <Hero />

        <section style={{ position: 'relative', zIndex: 30 }}>
          <TechStack />
        </section>

        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          
          <section style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-glass)', zIndex: 10, borderTop: '1px solid var(--border)' }} />
            <div style={{ position: 'relative', zIndex: 30 }}>
              <Projects />
            </div>
          </section>

          <section style={{ position: 'relative', zIndex: 30 }}>
            <ScrollExpand
              src="/images/engineered_scale.jpg"
              title="Engineered for Scale"
              scrollHint="Scroll to reveal"
              useWindowScroll
            >
              <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.5)', padding: '3rem', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 'bold', color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Every pixel, crafted.</h2>
                <p style={{ color: '#ccc', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>From complex backend microservices to silky smooth frontend experiences.</p>
              </div>
            </ScrollExpand>
            <MoreProjects />
          </section>

          <section style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-glass)', zIndex: 10, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} />
            <div style={{ position: 'relative', zIndex: 30 }}>
              <Journey />
              <Certs />
              <About />
            </div>
          </section>

          <section style={{ position: 'relative', zIndex: 30 }}>
            <Contact />
          </section>

          <section style={{ position: 'relative', zIndex: 40 }}>
            <PlaygroundSection />
          </section>
        </div>
      </main>
    </>
  );
}



