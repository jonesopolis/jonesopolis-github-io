import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRelatedPosts } from '../contentful';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0].replace(/-/g, '.');
}

export default function RelatedPosts({ currentSlug, tags }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tags && tags.length > 0) {
      getRelatedPosts(currentSlug, tags, 2)
        .then(setPosts)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [currentSlug, tags]);

  if (loading) {
    return (
      <section className="related-posts">
        <h2>Related</h2>
        <div className="related-posts-timeline">
          <div className="related-timeline-item skeleton">
            <div className="skeleton-line" style={{ width: '60px' }}></div>
            <div className="skeleton-line" style={{ width: '80%' }}></div>
          </div>
          <div className="related-timeline-item skeleton">
            <div className="skeleton-line" style={{ width: '60px' }}></div>
            <div className="skeleton-line" style={{ width: '80%' }}></div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="related-posts">
      <h2>Related</h2>
      <div className="related-posts-timeline">
        {posts.map((post, index) => (
          <Link key={post.slug} to={`/${post.slug}`} className={`related-timeline-item${index === posts.length - 1 ? ' last' : ''}`}>
            <span className="line"></span>
            <span className="content">
              <span className="date">{formatDate(post.publishDate)}</span>
              <span className="hook">{post.hook || 'what can we learn?'}</span>
              <span className="title">{post.title}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
