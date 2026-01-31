import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getPostBySlug, getSiteSettings } from '../contentful';
import { getPostIcon } from './PostIcons';
import SEO from './SEO';
import Footer from './Footer';
import RelatedPosts from './RelatedPosts';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0].replace(/-/g, '.');
}

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [settings, setSettings] = useState({
    backToPostsText: 'Back to posts',
    backToHomeText: '← Back to home',
    notFoundTitle: 'Post not found',
    notFoundMessage: "The post you're looking for doesn't exist.",
  });
  const [loading, setLoading] = useState(true);
  const [showStickyTitle, setShowStickyTitle] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    Promise.all([getPostBySlug(slug), getSiteSettings()])
      .then(([postData, settingsData]) => {
        setPost(postData);
        setSettings(settingsData);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Show sticky title when the title is about to touch the nav header
  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        // Get the header height (changes when scrolled: ~73px normal, ~49px compact)
        const header = document.querySelector('header');
        const headerBottom = header ? header.getBoundingClientRect().bottom : 50;
        // Show sticky bar when title top reaches the header bottom (before it gets clipped)
        setShowStickyTitle(titleRect.top <= headerBottom);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading-skeleton">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-date"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <section className="page-section">
          <h1 className="page-title">{settings.notFoundTitle}</h1>
          <p>{settings.notFoundMessage}</p>
          <Link to="/" className="btn">{settings.backToHomeText}</Link>
        </section>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.metaTitle || `${post.title} | Learning AI`}
        description={post.metaDescription || post.excerpt}
        image={post.mainImage}
        type="article"
      />

      {/* Sticky compact title bar */}
      <div className={`sticky-title-bar ${showStickyTitle ? 'sticky-title-bar--visible' : ''}`}>
        <div className="sticky-title-content">
          <Link to="/" className="sticky-back-btn" aria-label="Back to posts">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </Link>
          <div className="sticky-title-info">
            <span className="sticky-title-text">{post.title}</span>
            <div className="sticky-title-meta">
              <span className="sticky-title-date">{formatDate(post.publishDate)}</span>
              <div className="sticky-title-tags">
                {post.tags.map((tag) => (
                  <span key={tag.slug} className="tag">{tag.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <article className={`post-detail ${showStickyTitle ? 'post-detail--sticky-active' : ''}`}>
          <Link to="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            {settings.backToPostsText}
          </Link>

          {post.mainImage ? (
            <div className="post-detail-image">
              <div
                className="post-main-image"
                style={{ '--main-image-url': `url(${post.mainImage})` }}
                role="img"
                aria-label={post.title}
              />
            </div>
          ) : (
            (() => {
              const PostIcon = getPostIcon(post.slug);
              return (
                <div className="post-detail-icon">
                  <PostIcon />
                </div>
              );
            })()
          )}

          <header className="post-detail-header">
            <h1 ref={titleRef}>{post.title}</h1>
            <span className="post-date">{formatDate(post.publishDate)}</span>
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag.slug} className="tag">{tag.name}</span>
              ))}
            </div>
          </header>

          <div className="post-content">
            {documentToReactComponents(post.content)}
          </div>

          <RelatedPosts currentSlug={post.slug} tags={post.tags} />
        </article>
      </div>
      <Footer />
    </>
  );
}
