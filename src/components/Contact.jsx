import { useEffect, useState } from 'react';
import { getContactPage, getSiteSettings } from '../contentful';
import SEO from './SEO';
import Footer from './Footer';
import Robot from './Robot';

export default function Contact() {
  const [contact, setContact] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getContactPage(), getSiteSettings()])
      .then(([contactData, settingsData]) => {
        setContact(contactData);
        setSettings(settingsData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !contact || !settings) {
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
    <>
      <SEO
        title={contact.seoTitle}
        description={contact.introText}
      />
      <div className="container">
        <section className="hero">
          <div className="hero-content">
            <h1>{contact.pageTitle}<span className="hero-cursor"></span></h1>
            <p>{contact.introText}</p>
          </div>
          <div className="hero-decoration" style={{ opacity: 0.3 }}>
            <Robot emotion="thinking" size={140} />
          </div>
        </section>
      </div>

      {/* VARIATION 1: Spread + subtle bg */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>1. spread + subtle bg</h3>
        <div className="contact-links-v1">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v1">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v1">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v1">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* VARIATION 2: Spread + underline */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>2. spread + underline</h3>
        <div className="contact-links-v2">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v2">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v2">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v2">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* VARIATION 3: Spread + glow */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>3. spread + glow</h3>
        <div className="contact-links-v3">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v3">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v3">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v3">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* VARIATION 4: Spread + arrow */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>4. spread + arrow</h3>
        <div className="contact-links-v4">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v4">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
            <span className="arrow">→</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v4">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
            <span className="arrow">→</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v4">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>

      {/* VARIATION 5: Spread + accent bar grows */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>5. spread + accent bar</h3>
        <div className="contact-links-v5">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v5">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v5">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v5">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* VARIATION 6: Spread + icon scales */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>6. spread + icon scale</h3>
        <div className="contact-links-v6">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v6">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v6">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v6">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* VARIATION 7: Spread + color shift */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>7. spread + color shift</h3>
        <div className="contact-links-v7">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v7">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v7">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v7">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* VARIATION 8: Spread + bottom border slide */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>8. spread + bottom slide</h3>
        <div className="contact-links-v8">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v8">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v8">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v8">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* VARIATION 9: Spread + lift */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>9. spread + lift</h3>
        <div className="contact-links-v9">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v9">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v9">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v9">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* VARIATION 10: Spread + bracket reveal */}
      <div className="container">
        <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>10. spread + brackets</h3>
        <div className="contact-links-v10">
          <a href={`mailto:${settings.contactEmail}`} className="contact-link-v10">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text">{settings.contactEmail}</span>
          </a>
          <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v10">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            <span className="text">GitHub</span>
          </a>
          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-link-v10">
            <span className="icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
