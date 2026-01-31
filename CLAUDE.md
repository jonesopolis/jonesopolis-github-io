# Learning AI Blog

A React SPA blog about learning AI, powered by Contentful CMS.

## Project Structure

```
blog/
├── index.html              # React mount point with SEO meta tags
├── package.json            # Dependencies
├── vite.config.js          # Vite bundler config
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
│   │   └── SEO.jsx         # Dynamic meta tags
│   └── styles/
│       └── main.css        # All styling (responsive)
└── CLAUDE.md
```

## Tech Stack

- React 18 + React Router
- Vite (build tool)
- Contentful CMS (headless)
- Fira Code font

## Setup

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
- `excerpt` (Long text, max 300)
- `content` (Rich text)
- `publishDate` (Date)
- `tags` (Array of linked Tag entries)
- `mainImage` (Asset, image) - Featured image for post
- `metaTitle` (Short text, max 60) - SEO title override
- `metaDescription` (Short text, max 160) - SEO description override

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
