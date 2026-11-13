import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const [characterState, setCharacterState] = useState({
    isEyeContact: true,
    frame: 'center',
    angleDeg: 0,
  });

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('.portfolio-section');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('section-motion-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '-12% 0px -12% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('section-motion-ready');
    };
  }, []);

  // Track active section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="portfolio-app">
      {/* Custom Magnetic Cursor */}
      <CustomCursor isEyeContact={characterState.isEyeContact} />

      {/* Centered Floating Frosted-Glass Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Award-Winning Luxury Hero Section with 360° Zero-Lag Cursor Tracking */}
      <Hero onStateUpdate={setCharacterState} />

      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default App;
