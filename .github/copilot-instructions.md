# AI Agent Instructions

Instructions for AI agents (GitHub Copilot, Claude) working on this repository.

## Project Overview

This is a React SPA blog about learning AI, powered by Contentful CMS and deployed to Netlify.

- **Frontend**: React 18 + React Router + Vite
- **CMS**: Contentful (headless)
- **Hosting**: Netlify
- **AI Model**: Claude Opus 4.5 (`claude-opus-4-5-20251101`)

## Project Structure

```
blog/
├── index.html              # React mount point
├── package.json            # Dependencies
├── vite.config.js          # Vite config
├── src/
│   ├── index.jsx           # Entry point
│   ├── App.jsx             # Main app with routing
│   ├── contentful.js       # CMS client & helpers
│   ├── components/         # React components
│   └── styles/main.css     # All styling
├── .claude/skills/         # Claude-specific skills
└── CLAUDE.md               # Full project documentation
```

## Development Commands

```bash
npm install     # Install dependencies
npm run dev     # Start dev server
npm run build   # Production build
```

## Contentful CMS

**Space ID**: `0p9g4pxrt6uv`
**Environment**: `master`

### Content Types

- `blogPost` - Blog articles (title, slug, content, images, tags)
- `heroSection` - Homepage hero
- `siteSettings` - Global config
- `resumePage` - Resume content
- `contactPage` - Contact page
- `tag` - Post tags
- `footer` - Footer content

### Field Localization

All Contentful fields require locale keys:
```javascript
{ title: { 'en-US': 'My Title' } }
```

## SVG Image Standards

Blog post images follow strict requirements:

- **Dimensions**: 800x200 (banner format)
- **Style**: Only circles and lines (no complex paths)
- **Color**: `#000000` only (CSS mask handles theming)
- **Stroke**: `stroke-width="2"`, no fills

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" fill="none" stroke="#000000" stroke-width="2">
  <circle cx="100" cy="100" r="40" />
  <line x1="140" y1="100" x2="200" y2="100" />
</svg>
```

## Deployment

Always build locally then deploy (to include .env variables):

```bash
npm run build && npx netlify deploy --prod --dir=dist --no-build
```

## Code Conventions

- Keep components minimal
- Use CSS custom properties for theming
- Dark/light mode via `.dark-mode` class on `<html>`
- Tags are linked Contentful entries (not strings)
- Images use Contentful's image API for optimization

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Hero + post list |
| `/post/:slug` | PostDetail | Individual post |
| `/resume` | Resume | Resume page |
| `/contact` | Contact | Contact page |

## For Detailed Instructions

See `CLAUDE.md` in the repository root for complete documentation including:
- Full content model specifications
- All field definitions and validations
- Detailed component descriptions

See `.claude/skills/` for Claude-specific workflows:
- `create-blog-post.md` - Full blog post creation workflow
- `site-maintenance.md` - Site maintenance procedures
