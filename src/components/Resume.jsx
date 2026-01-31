import { useEffect, useState } from 'react';
import { getResumePage } from '../contentful';
import SEO from './SEO';

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"/>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  );
}

export default function Resume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResumePage()
      .then(setResume)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !resume) {
    return (
      <div className="container">
        <section className="page-section">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </section>
      </div>
    );
  }

  // Parse JSON fields
  let experience = [];
  let technicalSkills = [];
  try {
    experience = JSON.parse(resume.experience || '[]');
  } catch (e) {
    console.error('Error parsing experience:', e);
  }
  try {
    technicalSkills = JSON.parse(resume.technicalSkills || '[]');
  } catch (e) {
    console.error('Error parsing technicalSkills:', e);
  }

  const achievements = resume.keyAchievements?.split('\n').filter(a => a.trim()) || [];
  const certifications = resume.certifications?.split('\n').filter(c => c.trim()) || [];

  return (
    <>
      <SEO
        title={resume.seoTitle}
        description={resume.seoDescription}
      />
      <div className="resume-page">
        {/* Hero Header */}
        <header className="resume-hero">
          <div className="resume-hero-content">
            <h1 className="resume-name">{resume.fullName}</h1>
            <p className="resume-title">Software Architect & Technical Leader</p>

            <div className="resume-contact-grid">
              <a href={`mailto:${resume.email}`} className="resume-contact-item">
                <EmailIcon />
                <span>{resume.email}</span>
              </a>
              <a href={`tel:${resume.phone}`} className="resume-contact-item">
                <PhoneIcon />
                <span>{resume.phone}</span>
              </a>
              <span className="resume-contact-item">
                <LocationIcon />
                <span>{resume.location}</span>
              </span>
              <a href={resume.linkedinUrl} target="_blank" rel="noopener noreferrer" className="resume-contact-item">
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>
              <a href={resume.portfolioUrl} target="_blank" rel="noopener noreferrer" className="resume-contact-item">
                <GlobeIcon />
                <span>Portfolio</span>
              </a>
            </div>

            <a href={resume.pdfUrl} download className="resume-download-btn">
              <DownloadIcon />
              Download Resume PDF
            </a>
          </div>
        </header>

        <div className="container">
          {/* Professional Summary */}
          <section className="resume-section resume-summary">
            <p>{resume.professionalSummary}</p>
          </section>

          {/* Key Achievements */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <span className="resume-section-icon"><AwardIcon /></span>
              Key Achievements
            </h2>
            <div className="resume-achievements">
              {achievements.map((achievement, index) => (
                <div key={index} className="resume-achievement-item">
                  <span className="achievement-bullet"></span>
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <span className="resume-section-icon"><BriefcaseIcon /></span>
              Professional Experience
            </h2>
            <div className="resume-timeline">
              {experience.map((job, index) => (
                <div key={index} className="resume-job">
                  <div className="resume-job-header">
                    <div className="resume-job-main">
                      <h3 className="resume-job-title">{job.title}</h3>
                      <span className="resume-job-company">{job.company}</span>
                    </div>
                    <div className="resume-job-meta">
                      <span className="resume-job-dates">{job.dates}</span>
                      <span className="resume-job-location">{job.location}</span>
                    </div>
                  </div>
                  <ul className="resume-job-bullets">
                    {job.bullets?.map((bullet, bIndex) => (
                      <li key={bIndex}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="resume-section">
            <h2 className="resume-section-title">
              <span className="resume-section-icon"><CodeIcon /></span>
              Technical Skills
            </h2>
            <div className="resume-skills-grid">
              {technicalSkills.map((category, index) => (
                <div key={index} className="resume-skill-category">
                  <h3 className="resume-skill-category-title">{category.category}</h3>
                  <div className="resume-skill-tags">
                    {category.skills?.map((skill, sIndex) => (
                      <span key={sIndex} className="resume-skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Certifications */}
          <div className="resume-two-column">
            <section className="resume-section">
              <h2 className="resume-section-title">
                <span className="resume-section-icon"><GraduationIcon /></span>
                Education
              </h2>
              <div className="resume-education">
                <p>{resume.education}</p>
              </div>
            </section>

            <section className="resume-section">
              <h2 className="resume-section-title">
                <span className="resume-section-icon"><AwardIcon /></span>
                Certifications
              </h2>
              <ul className="resume-certifications">
                {certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Download CTA */}
          <section className="resume-cta-section">
            <a href={resume.pdfUrl} download className="resume-download-btn resume-download-btn--large">
              <DownloadIcon />
              Download Full Resume (PDF)
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
