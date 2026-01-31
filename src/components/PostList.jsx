import { useEffect, useState } from 'react';
import { getPosts, getSiteSettings } from '../contentful';
import PostCard from './PostCard';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState({ loadingText: 'Loading posts...' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPosts(), getSiteSettings()])
      .then(([postsData, settingsData]) => {
        setPosts(postsData);
        setSettings(settingsData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="posts">
        <p>{settings.loadingText}</p>
      </section>
    );
  }

  return (
    <section className="posts">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
}
