import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDraftPosts, getSiteSettings } from '../contentful';
import SEO from './SEO';
import Footer from './Footer';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0].replace(/-/g, '.');
}

function getMonthYear(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`.toLowerCase();
}

export default function DraftList() {
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState({ loadingText: 'Loading unpublished posts...' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDraftPosts(), getSiteSettings()])
      .then(([postsData, settingsData]) => {
        setPosts(postsData);
        setSettings(settingsData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <SEO
          title="Unpublished | Please Recompile"
          description="Unpublished posts"
        />
        <div className="container">
          <section className="posts">
            <p>{settings.loadingText}</p>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  let lastMonth = null;

  return (
    <>
      <SEO
        title="Unpublished | Please Recompile"
        description="Unpublished posts"
      />
      <div className="container">
        <div className="drafts-header">
          <h1>unpublished</h1>
        </div>
        {posts.length === 0 ? (
          <section className="posts">
            <p className="no-drafts">no unpublished posts yet</p>
          </section>
        ) : (
          <section className="posts timeline-3">
            {posts.map((post, index) => {
              const monthYear = getMonthYear(post.publishDate);
              const showMonthBreak = monthYear !== lastMonth;
              lastMonth = monthYear;
              const isLast = index === posts.length - 1;

              return (
                <div key={post.slug} className="timeline-item">
                  {showMonthBreak && (
                    <div className="month-break">
                      <span className="month-label">{monthYear}</span>
                    </div>
                  )}
                  <Link to={`/drafts/${post.slug}`} className={`timeline-post-3${isLast ? ' last' : ''}`}>
                    <span className="date">{formatDate(post.publishDate)}</span>
                    <span className="line"></span>
                    <span className="content">
                      <span className="hook">{post.hook || 'what can we learn?'}</span>
                      <span className="title">{post.title}</span>
                    </span>
                  </Link>
                </div>
              );
            })}
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
