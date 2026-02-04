import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSiteSettings } from '../contentful';

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Header() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState({ logoText: '// learning.ai' });
  const location = useLocation();

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  useEffect(() => {
    // Set direction class BEFORE starting animation (determines overlay color)
    const directionClass = isDark ? 'transition-to-dark' : 'transition-to-light';
    document.documentElement.classList.add(directionClass);

    // Start the animation
    document.documentElement.classList.add('theme-transitioning');

    // Change theme when the swoop covers the screen (at ~45% of 400ms = 180ms)
    const themeTimeout = setTimeout(() => {
      if (isDark) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    }, 180);

    // Remove transitioning classes after animation completes
    const cleanupTimeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
      document.documentElement.classList.remove('transition-to-dark');
      document.documentElement.classList.remove('transition-to-light');
    }, 450);

    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    return () => {
      clearTimeout(themeTimeout);
      clearTimeout(cleanupTimeout);
    };
  }, [isDark]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Detect scroll for compact header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: settings.navBlogLabel || 'Blog' },
    { path: '/resume', label: settings.navResumeLabel || 'Resume' },
    { path: '/contact', label: settings.navContactLabel || 'Contact' },
  ];

  return (
    <header className={scrolled ? 'header--scrolled' : ''}>
      <div className="header-content">
        <div className="logo">
          <Link to="/">{settings.logoText}</Link>
        </div>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'nav-link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="toggle-btn"
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className={`menu-btn ${menuOpen ? 'menu-btn--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
