# Learning AI Blog - Site Maintenance Skill

## Overview
This skill covers maintaining the Learning AI blog, a React SPA powered by Contentful CMS and deployed to Netlify.

## Tech Stack
- **Frontend**: React 18 + React Router + Vite
- **CMS**: Contentful (headless)
- **Hosting**: Netlify
- **Font**: Fira Code

## Environment Variables
```
VITE_CONTENTFUL_SPACE_ID=0p9g4pxrt6uv
VITE_CONTENTFUL_ACCESS_TOKEN=<delivery_api_token>
CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=<management_api_token>
```

## Contentful Content Types

### blogPost
- `title`, `slug`, `excerpt`, `content` (Rich text)
- `publishDate`, `tags` (linked Tag entries)
- `mainImage` (Asset) - 800x200 banner SVG for post detail
- `thumbnailImage` (Asset) - 800x200 thumbnail SVG for post cards
- `metaTitle`, `metaDescription` - SEO overrides

### heroSection
- `title`, `subtitle`, `siteTitle`, `siteDescription`, `socialImage`

### siteSettings
- `logoText`, `heroBadgeText`, `backToPostsText`, `backToHomeText`
- `notFoundTitle`, `notFoundMessage`, `loadingText`
- `defaultSiteTitle`, `defaultSiteDescription`
- `contactEmail`, `githubUrl`, `linkedinUrl`, `twitterUrl`

### resumePage
- `fullName`, `location`, `phone`, `email`, `linkedinUrl`, `portfolioUrl`
- `professionalSummary`, `keyAchievements` (newline-separated)
- `experience` (JSON array), `technicalSkills` (JSON array)
- `education`, `certifications` (newline-separated)
- `pdfUrl`, `seoTitle`, `seoDescription`

### contactPage
- `pageTitle`, `pageSubtitle`, `introText`
- `seoTitle`, `seoDescription`

### tag
- `name`, `slug`

### footer
- `copyright`, `tagline`

---

## Creating SVG Images for Blog Posts

### SVG Design Requirements
1. **Dimensions**: 800x200 (banner format, same for main and thumbnail)
2. **Style**: Use ONLY circles and lines (no complex shapes, paths, or fills)
3. **Colors**: Use `#000000` (black) - the CSS mask-image technique handles theming
4. **Stroke**: Use `stroke-width="2"` or similar, no fills
5. **Aesthetic**: Abstract, minimalist representations of the topic

### SVG Template
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" fill="none" stroke="#000000" stroke-width="2">
  <!-- Use circles and lines only -->
  <circle cx="100" cy="100" r="40" />
  <line x1="140" y1="100" x2="200" y2="100" />
  <!-- Add more elements as needed -->
</svg>
```

### How Theme-Aware SVGs Work
The blog uses CSS `mask-image` to make SVGs respond to theme changes:
- SVGs are loaded as mask images
- The mask reveals a solid color background
- In light mode: dark color shows through
- In dark mode: light color shows through
- **Important**: SVGs must use `#000000` for this to work correctly

---

## Uploading Images to Contentful

### Step 1: Upload the SVG as an Asset
```javascript
// Use mcp__contentful__upload_asset
{
  spaceId: "0p9g4pxrt6uv",
  environmentId: "master",
  title: "Post Title - Main Image",
  description: "Banner image for [post topic]",
  file: {
    // Provide file content or URL
  }
}
```

### Step 2: Publish the Asset
```javascript
// Use mcp__contentful__publish_asset
{
  spaceId: "0p9g4pxrt6uv",
  environmentId: "master",
  assetId: "<asset_id_from_step_1>"
}
```

### Step 3: Link Asset to Blog Post Entry
```javascript
// Use mcp__contentful__update_entry
{
  spaceId: "0p9g4pxrt6uv",
  environmentId: "master",
  entryId: "<blog_post_entry_id>",
  fields: {
    mainImage: {
      "en-US": {
        sys: { type: "Link", linkType: "Asset", id: "<asset_id>" }
      }
    },
    thumbnailImage: {
      "en-US": {
        sys: { type: "Link", linkType: "Asset", id: "<asset_id>" }
      }
    }
  }
}
```

### Step 4: Publish the Updated Entry
```javascript
// Use mcp__contentful__publish_entry
{
  spaceId: "0p9g4pxrt6uv",
  environmentId: "master",
  entryId: "<blog_post_entry_id>"
}
```

---

## Deleting Local SVG Files After Upload

Once SVGs are uploaded to Contentful, local files should be removed:

```bash
# Remove specific SVG file
rm "/path/to/file.svg"

# Remove entire images folder (if all uploaded)
rm -rf "/path/to/blog/public/images/posts"

# Remove assets folder (old unused SVGs)
rm -rf "/path/to/blog/assets"
```

**Important**: The `/dist` folder is auto-generated during build - it will be recreated clean.

---

## Build & Deploy Workflow

### Always deploy after making changes:
```bash
cd "/Users/jones/Library/Mobile Documents/com~apple~CloudDocs/blog"
npm run build && npx netlify deploy --prod --dir=dist --no-build
```

### Key flags:
- `--prod`: Deploy to production
- `--dir=dist`: Specify built output directory
- `--no-build`: Skip Netlify's build (we already ran Vite build with .env)

### Why `--no-build`?
Netlify CLI's built-in build doesn't have access to our local `.env` file, causing Contentful credentials to be missing. We build locally first (Vite loads `.env`), then deploy the pre-built `dist`.

---

## Fallback Icons

If a post doesn't have images set in Contentful, inline SVG icons from `PostIcons.jsx` are used as fallbacks. These are React components, not files:

```javascript
// src/components/PostIcons.jsx
export const postIconMap = {
  'understanding-large-language-models': IconLLM,
  'building-first-ai-agent': IconAgent,
  // ... etc
};

export function getPostIcon(slug) {
  return postIconMap[slug] || IconDefault;
}
```

---

## Common Maintenance Tasks

### Adding a New Blog Post
1. Create entry in Contentful (`blogPost` content type)
2. Create SVG images (800x200, circles/lines only, #000000)
3. Upload SVGs to Contentful as assets
4. Link assets to entry's `mainImage` and `thumbnailImage`
5. Publish entry
6. Build and deploy

### Updating Site Text
1. Edit the appropriate Contentful entry:
   - Global settings → `siteSettings`
   - Resume → `resumePage`
   - Contact → `contactPage`
   - Hero → `heroSection`
   - Footer → `footer`
2. Publish entry
3. Build and deploy

### Updating Resume
The `experience` and `technicalSkills` fields are JSON arrays:

```json
// experience format
[
  {
    "title": "Job Title",
    "company": "Company Name",
    "dates": "2020 - Present",
    "location": "City, State",
    "bullets": ["Achievement 1", "Achievement 2"]
  }
]

// technicalSkills format
[
  {
    "category": "Category Name",
    "skills": ["Skill 1", "Skill 2", "Skill 3"]
  }
]
```

---

## Project Structure
```
blog/
├── index.html
├── package.json
├── vite.config.js
├── .env                    # Local environment variables
├── public/
│   └── ATS_Resume.pdf      # Downloadable resume
├── src/
│   ├── index.jsx
│   ├── App.jsx
│   ├── contentful.js       # CMS client & data fetching
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── PostCard.jsx
│   │   ├── PostList.jsx
│   │   ├── PostDetail.jsx
│   │   ├── PostIcons.jsx   # Fallback SVG icons (React components)
│   │   ├── RelatedPosts.jsx
│   │   ├── Footer.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   └── SEO.jsx
│   └── styles/
│       └── main.css
├── .claude/
│   ├── settings.local.json
│   └── skills/
│       └── site-maintenance.md
└── CLAUDE.md               # Project documentation
```

---

## Troubleshooting

### Images not loading?
- Check Contentful asset is published
- Verify asset is linked to entry's image field
- Ensure entry is published after linking
- Check browser console for 404s

### Build fails?
- Ensure `.env` file exists with valid credentials
- Run `npm install` if dependencies missing
- Check for syntax errors in contentful.js

### Deploy shows old content?
- Make sure to run `npm run build` before deploy
- Use `--no-build` flag with netlify deploy
- Clear browser cache or use incognito

### SVGs not responding to theme?
- Ensure SVG uses `#000000` (not `currentColor` or other colors)
- Check CSS mask-image properties in main.css
- Verify SVG has no fill attributes (stroke only)
