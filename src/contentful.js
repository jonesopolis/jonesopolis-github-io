// Contentful Delivery API - direct client-side calls
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

async function fetchContentful(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Contentful request failed: ${response.status}`);
  }

  return response.json();
}

// Helper to resolve linked assets and entries
function resolveLinks(items, includes = {}) {
  const assets = {};
  const entries = {};

  (includes.Asset || []).forEach((asset) => {
    assets[asset.sys.id] = asset;
  });

  (includes.Entry || []).forEach((entry) => {
    entries[entry.sys.id] = entry;
  });

  return items.map((item) => resolveItem(item, assets, entries));
}

function resolveItem(item, assets, entries) {
  const resolved = { ...item.fields };

  // Resolve linked assets (images)
  Object.keys(resolved).forEach((key) => {
    const value = resolved[key];
    if (value?.sys?.type === 'Link' && value.sys.linkType === 'Asset') {
      const asset = assets[value.sys.id];
      resolved[key] = asset ? `https:${asset.fields.file.url}` : null;
    }
    // Resolve linked entries (like tags)
    if (Array.isArray(value)) {
      resolved[key] = value.map((v) => {
        if (v?.sys?.type === 'Link' && v.sys.linkType === 'Entry') {
          const entry = entries[v.sys.id];
          return entry ? entry.fields : v;
        }
        return v;
      });
    }
  });

  return resolved;
}

// Fallback data
const heroFallback = {
  title: 'Welcome to Please Recompile',
  subtitle: "Software architecture is evolving. AI is making code cheaper and faster to write—the real value now is in vision, planning, and building systems that last. I'm here for it, join me as I recompile.",
};

const postsFallback = [
  {
    slug: 'getting-started-with-llms',
    title: 'Getting Started with LLMs',
    excerpt: 'How LLMs actually work, explained in terms I wish someone had told me earlier.',
    content: { nodeType: 'document', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: 'Large Language Models have revolutionized how we think about AI.', marks: [], data: {} }] }] },
    publishDate: '2024-12-15',
    tags: [{ name: 'AI', slug: 'ai' }],
    mainImage: null,
  },
];

const footerFallback = {
  copyright: '© 2026 Please Recompile',
  tagline: 'rebuilding how I build',
};

const siteSettingsFallback = {
  logoText: '// please recompile',
  heroBadgeText: 'Currently recompiling',
  backToPostsText: 'Back',
  relatedPostsTitle: 'Related',
  notFoundTitle: 'Page Not Found',
  notFoundMessage: "The page you're looking for doesn't exist.",
  loadingText: 'Loading...',
  contactEmail: 'davidarector@gmail.com',
  githubUrl: 'https://github.com/jonesopolis',
  linkedinUrl: 'https://linkedin.com/in/davidarector',
};

const contactPageFallback = {
  pageTitle: 'Contact',
  pageSubtitle: "Let's connect",
  seoTitle: 'contact | please recompile',
  introText: "Still recompiling. Happy to talk about it. Whether it's AI, architecture, or just swapping ideas—reach out.",
};

// API functions
export async function getHero() {
  try {
    const data = await fetchContentful('/entries?content_type=heroSection&limit=1');
    if (data.items?.length > 0) {
      const resolved = resolveLinks(data.items, data.includes);
      return resolved[0];
    }
    return heroFallback;
  } catch (error) {
    console.error('Error fetching hero:', error);
    return heroFallback;
  }
}

export async function getPosts() {
  try {
    const data = await fetchContentful('/entries?content_type=blogPost&order=-fields.publishDate&include=2');
    if (data.items?.length > 0) {
      return resolveLinks(data.items, data.includes);
    }
    return postsFallback;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return postsFallback;
  }
}

export async function getPostBySlug(slug) {
  try {
    const data = await fetchContentful(`/entries?content_type=blogPost&fields.slug=${slug}&include=2`);
    if (data.items?.length > 0) {
      const resolved = resolveLinks(data.items, data.includes);
      return resolved[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return postsFallback.find((p) => p.slug === slug) || null;
  }
}

export async function getFooter() {
  try {
    const data = await fetchContentful('/entries?content_type=footer&limit=1');
    if (data.items?.length > 0) {
      const resolved = resolveLinks(data.items, data.includes);
      return resolved[0];
    }
    return footerFallback;
  } catch (error) {
    console.error('Error fetching footer:', error);
    return footerFallback;
  }
}

export async function getSiteSettings() {
  try {
    const data = await fetchContentful('/entries?content_type=siteSettings&limit=1');
    if (data.items?.length > 0) {
      const resolved = resolveLinks(data.items, data.includes);
      return resolved[0];
    }
    return siteSettingsFallback;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return siteSettingsFallback;
  }
}

export async function getContactPage() {
  try {
    const data = await fetchContentful('/entries?content_type=contactPage&limit=1');
    if (data.items?.length > 0) {
      const resolved = resolveLinks(data.items, data.includes);
      return resolved[0];
    }
    return contactPageFallback;
  } catch (error) {
    console.error('Error fetching contact page:', error);
    return contactPageFallback;
  }
}

export async function getRelatedPosts(currentSlug, tags, limit = 2) {
  try {
    // Get posts that share tags with the current post
    const tagSlugs = tags.map((t) => t.slug).join(',');
    const data = await fetchContentful(`/entries?content_type=blogPost&fields.slug[ne]=${currentSlug}&include=2&limit=${limit + 5}`);

    if (data.items?.length > 0) {
      const resolved = resolveLinks(data.items, data.includes);
      // Filter by matching tags and limit
      const currentTagSlugs = tags.map((t) => t.slug);
      return resolved
        .filter((p) => p.tags?.some((t) => currentTagSlugs.includes(t.slug)))
        .slice(0, limit);
    }
    return [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Resume page isn't in Contentful - it's hardcoded in Resume.jsx
export async function getResumePage() {
  return null;
}
