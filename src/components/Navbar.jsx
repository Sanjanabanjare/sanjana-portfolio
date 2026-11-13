import { useState, useEffect } from 'react';

export default function Navbar({ activeSection = 'home' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem('portfolio-theme', theme);
    } catch {
      // The selected theme still applies for this session if storage is unavailable.
    }
  }, [theme]);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`header-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner-container">
        {/* Left: Bold SB. logo */}
        <a href="#home" className="nav-logo interactive" aria-label="Sanjana Banjare Home">
          SB<span className="logo-dot">.</span>
        </a>

        {/* Center: Clean Navigation Links */}
        <nav className="nav-menu" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-item-link interactive ${
                activeSection === item.id ? 'is-active' : ''
              }`}
            >
              {item.label}
              {activeSection === item.id && <span className="nav-active-bar" />}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="nav-badge-pill interactive">
            <span className="green-live-dot" />
            <span className="badge-text">Open to opportunities</span>
          </a>
          <button
            type="button"
            className="theme-toggle interactive"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'light'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" /></svg>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-toggle interactive"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="mobile-dropdown-menu" id="mobile-navigation" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
