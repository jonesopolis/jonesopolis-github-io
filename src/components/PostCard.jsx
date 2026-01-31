import { Link } from 'react-router-dom';
import { getPostIcon } from './PostIcons';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0].replace(/-/g, '.');
}

export default function PostCard({ post }) {
  const PostIcon = getPostIcon(post.slug);
  const hasThumbnail = post.thumbnailImage;

  return (
    <Link to={`/post/${post.slug}`} className="post-card">
      <div className="post-image">
        {hasThumbnail ? (
          <div
            className="post-thumbnail"
            style={{ '--thumbnail-url': `url(${post.thumbnailImage})` }}
            role="img"
            aria-label={post.title}
          />
        ) : (
          <PostIcon />
        )}
      </div>
      <div className="post-body">
        <div className="post-header">
          <h2 className="post-title">{post.title}</h2>
          <span className="post-date">{formatDate(post.publishDate)}</span>
        </div>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag.slug} className="tag">{tag.name}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
