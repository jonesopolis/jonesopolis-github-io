import { useEffect, useState } from 'react';
import { getHero, getSiteSettings } from '../contentful';

export default function Hero() {
  const [hero, setHero] = useState({ title: '', subtitle: '' });
  const [settings, setSettings] = useState({ heroBadgeText: 'Currently exploring AI' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getHero(), getSiteSettings()])
      .then(([heroData, settingsData]) => {
        setHero(heroData);
        setSettings(settingsData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="hero">
        <div className="hero-content">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          {settings.heroBadgeText}<span className="hero-badge-ellipsis"></span>
        </div>
        <h1>{hero.title}<span className="hero-cursor"></span></h1>
        <p>{hero.subtitle}</p>
      </div>
      <div className="hero-decoration">
        <svg viewBox="0 0 200 200" className="hero-svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" className="hero-circle hero-circle-1"/>
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" className="hero-circle hero-circle-2"/>
          <circle cx="100" cy="100" r="40" fill="url(#grad)" className="hero-circle hero-circle-3"/>
          <circle cx="100" cy="60" r="4" fill="currentColor" opacity="0.4" className="hero-dot hero-dot-1"/>
          <circle cx="140" cy="100" r="3" fill="currentColor" opacity="0.3" className="hero-dot hero-dot-2"/>
          <circle cx="100" cy="140" r="5" fill="currentColor" opacity="0.2" className="hero-dot hero-dot-3"/>
        </svg>
      </div>
    </section>
  );
}
