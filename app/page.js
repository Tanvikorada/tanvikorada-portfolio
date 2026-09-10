import Nav from './components/Nav';
import Hero from './components/Hero';
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
import PlaygroundSection from './components/PlaygroundSection';

export default function Home() {
  return (
    <>
      <CursorFX />
      <Preloader />
      <Nav />

      {/* Global CSS background provided in global.css */}
      <main style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '8rem', paddingBottom: '4rem' }}>
        <Hero />
        <TechStack />
        <Projects />
        <MoreProjects />
        <Experience />
        <Education />
        <Certs />
        <About />
        <Contact />
      </main>
      
      <PlaygroundSection />
    </>
  );
}
