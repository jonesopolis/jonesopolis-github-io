# Available AI Agents

This repository is configured to work with the following AI agents for development assistance.

## Claude (Anthropic)

**Model**: Claude Opus 4.5 (`claude-opus-4-5-20251101`)

### Capabilities

- Code generation and refactoring
- Content creation for blog posts
- Contentful CMS operations (create, update, publish entries/assets)
- Site maintenance and deployment
- SVG image creation for blog posts
- Rich text content formatting

### Skills

Claude has specialized skills defined in `.claude/skills/`:

| Skill | Description |
|-------|-------------|
| `create-blog-post` | End-to-end workflow: dictation → structure → edit → images → Contentful → publish |
| `site-maintenance` | CMS operations, deployment, troubleshooting |

### When to Use Claude

- Creating new blog posts from ideas/dictation
- Updating Contentful CMS content
- Generating SVG images (800x200, circles/lines style)
- Building and deploying to Netlify
- Complex multi-step content workflows

---

## GitHub Copilot

**Provider**: GitHub

### Capabilities

- Code completion and suggestions
- Pull request reviews
- Code explanations
- Simple refactoring tasks

### When to Use Copilot

- Quick code completions while typing
- Simple code suggestions
- PR review assistance

---

## Contentful Integration

Both agents can interact with Contentful CMS:

- **Space ID**: `0p9g4pxrt6uv`
- **Environment**: `master`

### Content Types

| Type | Purpose |
|------|---------|
| `blogPost` | Blog articles with rich text, images, tags |
| `heroSection` | Homepage hero content |
| `siteSettings` | Global site configuration |
| `resumePage` | Resume/CV content |
| `contactPage` | Contact page content |
| `tag` | Post categorization |
| `footer` | Footer content |
