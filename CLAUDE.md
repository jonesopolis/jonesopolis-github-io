# Learning AI Blog

A React SPA blog about learning AI, powered by Contentful CMS.

## Project Structure

```
blog/
├── index.html              # React mount point with SEO meta tags
├── package.json            # Dependencies
├── vite.config.js          # Vite bundler config (includes HTTPS + allowed hosts)
├── Dockerfile              # Docker image for dev server
├── docker-compose.yml      # Docker compose config with volume mounting
├── certs/                  # SSL certificates (gitignored)
│   ├── key.pem
│   └── cert.pem
├── src/
│   ├── index.jsx           # React entry point
│   ├── App.jsx             # Main app with routing
│   ├── contentful.js       # Contentful client & helpers
│   ├── components/
│   │   ├── Header.jsx      # Navigation + theme toggle (icon)
│   │   ├── Hero.jsx        # Hero section (from CMS)
│   │   ├── PostCard.jsx    # Blog post card with image
│   │   ├── PostList.jsx    # List of posts (from CMS)
│   │   ├── PostDetail.jsx  # Full post view (from CMS)
│   │   ├── Footer.jsx      # Footer (from CMS)
│   │   ├── Resume.jsx      # Resume page
│   │   ├── Contact.jsx     # Contact page
│   │   ├── BitPage.jsx     # Bit mascot showcase page
│   │   ├── Robot.jsx       # Bit robot component (inline SVG)
│   │   └── SEO.jsx         # Dynamic meta tags
│   └── styles/
│       └── main.css        # All styling (responsive)
└── CLAUDE.md
```

## Git

- **Main branch:** `master`
- PRs should target `master`
- **Auto-push for /bit/iterate:** When working on the `/bit/iterate` page, always push changes directly to master after making updates

## Tech Stack

- React 18 + React Router
- Vite (build tool)
- Contentful CMS (headless)
- Docker (development environment)
- Fira Code font

## Development Environment (IMPORTANT)

**All development and testing MUST use Docker. Do not run `npm run dev` locally.**

### Docker Dev Server

The project runs in a Docker container with hot reload. Local file changes sync automatically.

**URL:** `https://code.blog-ai.local:5173`

**Start the dev server:**
```bash
docker compose up -d --build
```

**Check logs:**
```bash
docker compose logs -f
```

**Restart after config changes:**
```bash
docker compose restart
```

**Stop:**
```bash
docker compose down
```

### Prerequisites

1. Docker must be installed and running
2. Add to `/etc/hosts` (one-time setup):
   ```
   127.0.0.1 code.blog-ai.local
   ```
3. Generate SSL certificates (one-time setup):
   ```bash
   mkdir -p certs
   openssl req -x509 -newkey rsa:2048 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "/CN=code.blog-ai.local"
   ```

### AI Agent Instructions

**CRITICAL:** When making changes to this project:
1. **ALWAYS** verify Docker is running before testing changes
2. **NEVER** run `npm run dev` locally - use the Docker container
3. If Docker is not running, start it with `docker compose up -d --build` before proceeding
4. Test all changes at `https://code.blog-ai.local:5173`
5. If the Docker container is down and cannot be started, STOP and do not continue work

**Check if Docker is running:**
```bash
docker compose ps
```

**If container is not running, start it:**
```bash
docker compose up -d --build
```

## Local Setup (NOT for development - reference only)

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env` file:
```
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
```

Without credentials, the app uses mock data for development.

## Contentful Content Model

### heroSection
- `title` (Short text, required) - Main heading
- `subtitle` (Long text) - Description
- `siteTitle` (Short text, max 60) - SEO site title
- `siteDescription` (Short text, max 160) - SEO description
- `socialImage` (Asset, image) - OG/social share image

### blogPost
- `title` (Short text, required)
- `slug` (Short text, unique, required)
- `hook` (Short text, max 100) - Short hook for listings and SEO description
- `content` (Rich text)
- `publishDate` (Date)
- `tags` (Array of linked Tag entries)
- `image` (Asset, image) - Header image (raster format for OG/social sharing)
- `imageSvg` (Asset, image) - Header image (SVG format, theme-aware via currentColor)

### tag
- `name` (Short text, required, unique)
- `slug` (Short text, required, unique)

### footer
- `copyright` (Short text)
- `tagline` (Short text)

### siteSettings
- `logoText` (Short text, required) - Header logo text
- `heroBadgeText` (Short text) - Badge text in hero section
- `backToPostsText` (Short text) - "Back to posts" link text
- `backToHomeText` (Short text) - "Back to home" button text
- `notFoundTitle` (Short text) - 404 page title
- `notFoundMessage` (Long text) - 404 page message
- `loadingText` (Short text) - Loading state text
- `defaultSiteTitle` (Short text, max 60) - Default SEO title
- `defaultSiteDescription` (Long text, max 160) - Default SEO description
- `contactEmail` (Short text) - Contact email address
- `githubUrl` (Short text) - GitHub profile URL
- `linkedinUrl` (Short text) - LinkedIn profile URL
- `twitterUrl` (Short text) - Twitter profile URL

### resumePage
- `fullName` (Short text, required) - Full name displayed in header
- `location` (Short text) - City, State
- `phone` (Short text) - Phone number
- `email` (Short text) - Email address
- `linkedinUrl` (Short text) - LinkedIn profile URL
- `portfolioUrl` (Short text) - Portfolio website URL
- `professionalSummary` (Long text) - Summary paragraph
- `keyAchievements` (Long text) - Newline-separated achievements
- `experience` (Long text) - JSON array of job objects
- `technicalSkills` (Long text) - JSON array of skill category objects
- `education` (Long text) - Education details
- `certifications` (Long text) - Newline-separated certifications
- `pdfUrl` (Short text) - URL to downloadable PDF resume
- `seoTitle` (Short text, max 60) - SEO title
- `seoDescription` (Short text, max 160) - SEO description

### contactPage
- `pageTitle` (Short text, required) - Page heading
- `pageSubtitle` (Short text) - Page subtitle
- `seoTitle` (Short text, max 60) - SEO title
- `seoDescription` (Short text, max 160) - SEO description
- `introText` (Long text) - Introduction paragraph

## Routes

- `/` - Home (hero + post list)
- `/post/:slug` - Individual post
- `/resume` - Resume page
- `/contact` - Contact page
- `/bit` - Bit mascot showcase page

## Features

- SEO optimized (meta tags, OG, Twitter cards)
- Responsive design (mobile-first)
- Dark/light mode toggle (icon button)
- Sticky header with navigation
- Animated hero section
- Post cards with featured images
- Loading skeletons
- Smooth animations

## Conventions

- Keep components minimal
- CSS custom properties for theming
- Dark/light mode via `.dark-mode` class on `<html>`
- Tags are linked entries (not strings)
- Images use Contentful's image API for optimization
- **Lowercase titles via CSS**: UI titles, nav labels, section headings, and page titles display as lowercase via `text-transform: lowercase` in CSS. Keep source text properly cased (better for SEO, accessibility, screen readers). The CSS handles the visual transformation. Affected classes include: `.nav-link`, `.page-title`, `.page-subtitle`, `.resume-name`, `.resume-title`, `.resume-section-title`, `.resume-download-btn`, `.error-title`, `.error-btn`, `.back-link`, `.related-posts h2`, `.hero-badge`, `.bit-page h1/h2`

## Bit - Robot Mascot

Bit is the friendly robot mascot of Learning AI. The Robot component (`src/components/Robot.jsx`) renders Bit as inline SVG with 16 emotions/poses that animate on hover.

### Usage
```jsx
import Robot from './components/Robot';

<Robot emotion="happy" size={64} />
```

### Props
- `emotion` - One of: `neutral`, `happy`, `sad`, `mad`, `surprised`, `confused`, `thinking`, `love`, `excited`, `shrug`, `waving`, `dancing`, `sleeping`, `talking`, `walking-front`, `walking-side`
- `size` - Pixel width (height scales proportionally at 1.25x)
- `className` - Optional additional CSS classes

### Features
- Uses `currentColor` for automatic light/dark mode support
- Hover animations defined in `main.css` (pure CSS, no JavaScript)
- Scales to any size while maintaining crisp lines

## Bit Logo Specifications

The base logo file is at `/public/logos/robot-v110-no-feet.svg`. When creating or modifying Bit, follow these exact specifications:

### Canvas & Proportions
- **ViewBox:** `0 0 64 80` (64 units wide, 80 units tall)
- **Fill:** `currentColor` (inherits text color for theming)
- **Style:** Minimalist line art with consistent stroke weights

### Antenna (Top)
- **Ball:** Hollow circle, radius 3, centered at (32, 3)
  - `fill="none"`, `stroke-width="2"`
- **Stem:** Vertical line from y=6 to y=14, centered at x=32
  - `stroke-width="3"`, `stroke-linecap="round"`

### Head
- **Shape:** Rounded rectangle, 32×26 units
- **Position:** x=16, y=14 (centered horizontally)
- **Corner radius:** rx=8, ry=8
- **Style:** Outline only (`fill="none"`, `stroke-width="3"`)

### Eyes
- **Style:** Flat horizontal lines (not circles or arcs)
- **Left eye:** x1=22 to x2=28, y=27
- **Right eye:** x1=36 to x2=42, y=27
- **Stroke:** `stroke-width="2.5"`, `stroke-linecap="round"`
- **Expression:** Neutral/stoic (not happy or sad)

### Body
- **Shape:** Rounded rectangle, 12×18 units
- **Position:** x=26, y=46 (centered below head with 6-unit gap)
- **Corner radius:** rx=3, ry=3
- **Style:** Outline only (`fill="none"`, `stroke-width="3"`)
- **Buttons:** Two small filled circles (r=1.5) vertically centered
  - Upper button: cx=32, cy=52
  - Lower button: cx=32, cy=58

### Arms
- **Style:** Short diagonal lines angling downward, with ball "hands"
- **Left arm:**
  - Line from (20, 52) to (14, 56)
  - Hand: filled circle at (14, 56), radius 2
- **Right arm:**
  - Line from (44, 52) to (50, 56)
  - Hand: filled circle at (50, 56), radius 2
- **Stroke:** `stroke-width="2.5"`, `stroke-linecap="round"`
- **Angle:** ~45° downward from body

### Legs
- **Style:** Simple vertical lines, NO feet
- **Left leg:** x=27, from y=68 to y=76
- **Right leg:** x=37, from y=68 to y=76
- **Stroke:** `stroke-width="2.5"`, `stroke-linecap="round"`
- **Spacing:** 10 units apart, positioned under body edges

### Key Design Principles
1. **Hollow vs Filled:** Head, body, and antenna ball are outlines; eyes, buttons, and hand balls are filled
2. **No feet:** Legs end as simple rounded lines
3. **Neutral expression:** Flat line eyes give a calm, non-cartoonish look
4. **Disconnected parts:** Small gaps between head/body and body/legs create a floating, modular feel
5. **Consistent strokes:** Primary elements use stroke-width 3, secondary elements use 2.5, details use 2
6. **Theme-friendly:** Uses `currentColor` so it automatically adapts to light/dark mode
