import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSiteSettings } from '../contentful';
import Footer from './Footer';

// Sun Icon for theme toggle
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

// Moon Icon for theme toggle
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

// Minimalistic Robot SVG that adapts to theme
function RobotIllustration() {
  return (
    <svg
      className="error-robot"
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Antenna */}
      <line x1="100" y1="30" x2="100" y2="45" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="100" cy="25" r="4" fill="currentColor"/>

      {/* Head */}
      <rect x="70" y="45" width="60" height="50" rx="8" stroke="currentColor" strokeWidth="3" fill="none"/>

      {/* Eyes (sad) */}
      <circle cx="85" cy="65" r="4" fill="currentColor"/>
      <circle cx="115" cy="65" r="4" fill="currentColor"/>

      {/* Sad mouth */}
      <path d="M 85 80 Q 100 75 115 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* Body */}
      <rect x="65" y="100" width="70" height="70" rx="10" stroke="currentColor" strokeWidth="3" fill="none"/>

      {/* Chest panel */}
      <rect x="80" y="115" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="85" y1="125" x2="115" y2="125" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="85" y1="135" x2="115" y2="135" stroke="currentColor" strokeWidth="1.5"/>

      {/* Left arm (shrugging up) */}
      <g className="robot-arm-left">
        <line x1="65" y1="110" x2="40" y2="90" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="90" x2="30" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="30" cy="95" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      </g>

      {/* Right arm (shrugging up) */}
      <g className="robot-arm-right">
        <line x1="135" y1="110" x2="160" y2="90" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="160" y1="90" x2="170" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="170" cy="95" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      </g>

      {/* Legs */}
      <rect x="75" y="170" width="18" height="25" rx="4" stroke="currentColor" strokeWidth="3" fill="none"/>
      <rect x="107" y="170" width="18" height="25" rx="4" stroke="currentColor" strokeWidth="3" fill="none"/>
    </svg>
  );
}

export default function ErrorPage() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [settings, setSettings] = useState({ logoText: '// learning.ai' });

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  useEffect(() => {
    // Set direction class BEFORE starting animation
    const directionClass = isDark ? 'transition-to-dark' : 'transition-to-light';
    document.documentElement.classList.add(directionClass);

    // Start the animation
    document.documentElement.classList.add('theme-transitioning');

    // Change theme when the swoop covers the screen
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

  return (
    <>
      {/* Simplified Header - Only logo and theme toggle */}
      <header className="error-header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">{settings.logoText}</Link>
          </div>

          <button
            className="toggle-btn"
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      {/* Main Error Content */}
      <main className="error-page">
        <div className="container">
          <div className="error-content">
            <RobotIllustration />
            <h1 className="error-message">Whoops</h1>
            <Link to="/" className="error-home-link">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
