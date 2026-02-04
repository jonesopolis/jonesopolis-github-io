import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { resolve } from 'path';

// Check if certs exist (for local dev)
const certsExist = fs.existsSync('./certs/key.pem') && fs.existsSync('./certs/cert.pem');

// Contentful API proxy plugin for development
function contentfulProxyPlugin(env) {
  return {
    name: 'contentful-proxy',
    configureServer(server) {
      server.middlewares.use('/api/contentful', async (req, res) => {
        const url = new URL(req.url, 'http://localhost');
        const type = url.searchParams.get('type');
        const spaceId = env.VITE_CONTENTFUL_SPACE_ID;
        const accessToken = env.VITE_CONTENTFUL_ACCESS_TOKEN;

        if (!spaceId || !accessToken) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Missing Contentful credentials' }));
          return;
        }

        const getImageUrl = (asset, includes) => {
          if (!asset?.sys?.id || !includes?.Asset) return null;
          const resolved = includes.Asset.find(a => a.sys.id === asset.sys.id);
          if (!resolved?.fields?.file?.url) return null;
          return `https:${resolved.fields.file.url}`;
        };

        const extractTags = (tags, includes) => {
          if (!tags || !Array.isArray(tags)) return [];
          return tags.map(tag => {
            if (tag.sys?.type === 'Link' && includes?.Entry) {
              const resolved = includes.Entry.find(e => e.sys.id === tag.sys.id);
              if (resolved) return { name: resolved.fields.name, slug: resolved.fields.slug };
            }
            if (tag.fields) return { name: tag.fields.name, slug: tag.fields.slug };
            return null;
          }).filter(Boolean);
        };

        try {
          const fetchEntries = async (query) => {
            const params = new URLSearchParams({ access_token: accessToken, ...query });
            const response = await fetch(`https://cdn.contentful.com/spaces/${spaceId}/entries?${params}`);
            if (!response.ok) throw new Error(`Contentful: ${response.status}`);
            return response.json();
          };

          let data = null;

          if (type === 'hero') {
            const entries = await fetchEntries({ content_type: 'heroSection', limit: '1', include: '1' });
            if (entries.items.length) {
              const item = entries.items[0].fields;
              data = {
                title: item.title,
                subtitle: item.subtitle,
                siteTitle: item.siteTitle,
                siteDescription: item.siteDescription,
                socialImage: getImageUrl(item.socialImage, entries.includes),
              };
            }
          } else if (type === 'posts') {
            const entries = await fetchEntries({ content_type: 'blogPost', order: '-fields.publishDate', include: '2' });
            data = entries.items.map(item => ({
              slug: item.fields.slug,
              title: item.fields.title,
              hook: item.fields.hook,
              content: item.fields.content,
              publishDate: item.fields.publishDate,
              tags: extractTags(item.fields.tags, entries.includes),
              image: getImageUrl(item.fields.image, entries.includes),
              imageSvg: getImageUrl(item.fields.imageSvg, entries.includes),
            }));
          } else if (type === 'postBySlug') {
            const slug = url.searchParams.get('slug');
            const entries = await fetchEntries({ content_type: 'blogPost', 'fields.slug': slug, limit: '1', include: '2' });
            if (entries.items.length) {
              const item = entries.items[0].fields;
              data = {
                slug: item.slug,
                title: item.title,
                hook: item.hook,
                content: item.content,
                publishDate: item.publishDate,
                tags: extractTags(item.tags, entries.includes),
                image: getImageUrl(item.image, entries.includes),
                imageSvg: getImageUrl(item.imageSvg, entries.includes),
              };
            }
          } else if (type === 'footer') {
            const entries = await fetchEntries({ content_type: 'footer', limit: '1' });
            if (entries.items.length) {
              const item = entries.items[0].fields;
              data = { copyright: item.copyright, tagline: item.tagline };
            }
          } else if (type === 'siteSettings') {
            const entries = await fetchEntries({ content_type: 'siteSettings', limit: '1' });
            if (entries.items.length) {
              const item = entries.items[0].fields;
              data = {
                logoText: item.logoText,
                heroBadgeText: item.heroBadgeText,
                backToPostsText: item.backToPostsText,
                backToHomeText: item.backToHomeText,
                notFoundTitle: item.notFoundTitle,
                notFoundMessage: item.notFoundMessage,
                loadingText: item.loadingText,
                defaultSiteTitle: item.defaultSiteTitle,
                defaultSiteDescription: item.defaultSiteDescription,
                contactEmail: item.contactEmail,
                githubUrl: item.githubUrl,
                linkedinUrl: item.linkedinUrl,
                twitterUrl: item.twitterUrl,
              };
            }
          } else if (type === 'resumePage') {
            const entries = await fetchEntries({ content_type: 'resumePage', limit: '1' });
            if (entries.items.length) {
              const item = entries.items[0].fields;
              data = {
                fullName: item.fullName,
                location: item.location,
                phone: item.phone,
                email: item.email,
                linkedinUrl: item.linkedinUrl,
                portfolioUrl: item.portfolioUrl,
                professionalSummary: item.professionalSummary,
                keyAchievements: item.keyAchievements,
                experience: item.experience,
                technicalSkills: item.technicalSkills,
                education: item.education,
                certifications: item.certifications,
                pdfUrl: item.pdfUrl,
                seoTitle: item.seoTitle,
                seoDescription: item.seoDescription,
              };
            }
          } else if (type === 'contactPage') {
            const entries = await fetchEntries({ content_type: 'contactPage', limit: '1' });
            if (entries.items.length) {
              const item = entries.items[0].fields;
              data = {
                pageTitle: item.pageTitle,
                pageSubtitle: item.pageSubtitle,
                seoTitle: item.seoTitle,
                seoDescription: item.seoDescription,
                introText: item.introText,
              };
            }
          } else if (type === 'relatedPosts') {
            const currentSlug = url.searchParams.get('currentSlug');
            const limit = Number(url.searchParams.get('limit') || 2);
            let tags = [];
            try { tags = JSON.parse(url.searchParams.get('tags') || '[]'); } catch {}
            const entries = await fetchEntries({ content_type: 'blogPost', order: '-fields.publishDate', include: '2', limit: '20' });
            const currentTagSlugs = tags.map(t => t.slug).filter(Boolean);
            data = entries.items
              .filter(item => item.fields.slug !== currentSlug)
              .map(item => {
                const postTags = extractTags(item.fields.tags, entries.includes);
                const commonTags = postTags.filter(t => currentTagSlugs.includes(t.slug));
                return {
                  slug: item.fields.slug,
                  title: item.fields.title,
                  hook: item.fields.hook,
                  publishDate: item.fields.publishDate,
                  tags: postTags,
                  image: getImageUrl(item.fields.image, entries.includes),
                  imageSvg: getImageUrl(item.fields.imageSvg, entries.includes),
                  commonTagCount: commonTags.length,
                };
              })
              .filter(p => p.commonTagCount > 0)
              .sort((a, b) => b.commonTagCount - a.commonTagCount)
              .slice(0, limit);
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ data }));
        } catch (error) {
          console.error('Contentful proxy error:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Failed to fetch Contentful data', message: error.message }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [
      react(),
      contentfulProxyPlugin(env),
      // Copy index.html to 404.html for GitHub Pages SPA routing
      {
        name: 'copy-404',
        closeBundle() {
          const distPath = resolve(__dirname, 'dist');
          if (fs.existsSync(resolve(distPath, 'index.html'))) {
            fs.copyFileSync(
              resolve(distPath, 'index.html'),
              resolve(distPath, '404.html')
            );
          }
        }
      }
    ],
    root: '.',
    publicDir: 'public',
    build: {
      outDir: 'dist',
    },
    server: {
      allowedHosts: ['code.blog-ai.local'],
      ...(certsExist && {
        https: {
          key: fs.readFileSync('./certs/key.pem'),
          cert: fs.readFileSync('./certs/cert.pem'),
        },
      }),
    },
  };
});
