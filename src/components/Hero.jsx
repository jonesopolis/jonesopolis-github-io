import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHero, getSiteSettings } from '../contentful';
import Robot from './Robot';

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
          {settings.heroBadgeText}
        </div>
        <h1>{hero.title}<span className="hero-cursor"></span></h1>
        <p>{hero.subtitle}</p>
      </div>
      <Link to="/bit" className="hero-decoration" style={{ opacity: 0.3, color: 'inherit' }}>
        <Robot emotion="waving" size={140} />
      </Link>
    </section>
  );
}
