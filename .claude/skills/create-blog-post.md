# Create Blog Post Skill

## Overview
This skill guides the complete workflow for creating a new blog post from dictation to published content.

## Workflow Steps

### Step 1: Dictation
User dictates or provides raw ideas/content for the blog post.

**Claude's role**: Listen and capture all key points, examples, and ideas.

---

### Step 2: Structure Ideas
Transform raw dictation into a cohesive blog post structure.

**Claude's role**:
- Identify the main thesis/topic
- Group related ideas together
- Establish logical flow
- Note any gaps that need filling

---

### Step 3: Content Editing
Put on the content editor hat and formulate the post structure.

**Claude's role**:
- Create compelling title
- Write engaging introduction
- Organize into clear sections with headings
- Ensure smooth transitions
- Write strong conclusion
- Match the blog's voice/tone (developer-focused, learning journey)

**Output format** (for user review):
```markdown
# [Post Title]

## Introduction
[Opening paragraph]

## [Section 1 Heading]
[Content]

## [Section 2 Heading]
[Content]

## Conclusion
[Closing thoughts]
```

---

### Step 4: Create SVG Images
Create both main image and thumbnail SVG for the post.

**SVG Requirements**:
- Dimensions: 800x200 (banner format)
- Style: ONLY circles and lines (no complex paths, rectangles, or fills)
- Color: `#000000` (black) - CSS mask-image handles theming
- Stroke width: 2 or similar
- Aesthetic: Abstract, minimalist representation of the topic

**SVG Template**:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" fill="none" stroke="#000000" stroke-width="2">
  <!-- Use circles and lines only -->
  <circle cx="100" cy="100" r="40" />
  <line x1="140" y1="100" x2="200" y2="100" />
</svg>
```

**Create two versions**:
1. `[slug]-main.svg` - Main banner for post detail page
2. `[slug]-thumb.svg` - Thumbnail for post cards (can be same or simplified)

---

### Step 5: Create Metadata
Generate all required metadata for the post.

**Required fields**:
- `title` - Post title (compelling, descriptive)
- `slug` - URL-friendly version (lowercase, hyphens, no special chars)
- `excerpt` - 1-2 sentence summary (max 300 chars) for post cards
- `publishDate` - Date in YYYY-MM-DD format
- `tags` - Relevant tags (use existing or create new)
- `metaTitle` - SEO title (max 60 chars, include key terms)
- `metaDescription` - SEO description (max 160 chars)

**Existing tags** (check Contentful for current list):
- AI, LLMs, Agents, Prompts, RAG, Embeddings, Fine-tuning, etc.

---

### Step 6: Upload to Contentful (Draft)
Upload everything to Contentful WITHOUT publishing.

**Sequence**:

1. **Upload Main Image Asset**
```
Tool: mcp__contentful__upload_asset
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- title: "[Post Title] - Main Image"
- description: "Banner image for [topic]"
- file: [SVG content or URL]
```
→ Save the asset ID

2. **Upload Thumbnail Asset**
```
Tool: mcp__contentful__upload_asset
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- title: "[Post Title] - Thumbnail"
- description: "Thumbnail for [topic]"
- file: [SVG content or URL]
```
→ Save the asset ID

3. **Create Blog Post Entry (Draft)**
```
Tool: mcp__contentful__create_entry
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- contentTypeId: "blogPost"
- fields:
  - title
  - slug
  - excerpt
  - content (Rich Text format)
  - publishDate
  - tags (linked entries)
  - mainImage (link to asset)
  - thumbnailImage (link to asset)
  - metaTitle
  - metaDescription
```
→ Save the entry ID

**Rich Text Format** for content field:
```json
{
  "nodeType": "document",
  "data": {},
  "content": [
    {
      "nodeType": "paragraph",
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Paragraph text here",
          "marks": [],
          "data": {}
        }
      ]
    },
    {
      "nodeType": "heading-2",
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "Section Heading",
          "marks": [],
          "data": {}
        }
      ]
    }
  ]
}
```

---

### Step 7: Verify (Preview)
Review the draft content in Contentful's web interface.

**Provide user with**:
```
📝 Draft Blog Post Created!

Review your post here:
https://app.contentful.com/spaces/0p9g4pxrt6uv/entries/[ENTRY_ID]

Main Image:
https://app.contentful.com/spaces/0p9g4pxrt6uv/assets/[MAIN_ASSET_ID]

Thumbnail:
https://app.contentful.com/spaces/0p9g4pxrt6uv/assets/[THUMB_ASSET_ID]

Let me know what changes you'd like, or say "publish" when ready!
```

**Iteration**: If user requests changes:
- Use `mcp__contentful__update_entry` to modify fields
- Use `mcp__contentful__update_asset` to replace images
- Provide updated preview links

---

### Step 8: Publish
Once user approves, publish everything in order.

**Sequence** (order matters!):

1. **Publish Main Image Asset**
```
Tool: mcp__contentful__publish_asset
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- assetId: [main_asset_id]
```

2. **Publish Thumbnail Asset**
```
Tool: mcp__contentful__publish_asset
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- assetId: [thumb_asset_id]
```

3. **Publish Blog Post Entry**
```
Tool: mcp__contentful__publish_entry
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- entryId: [entry_id]
```

4. **Build and Deploy**
```bash
cd "/Users/jones/Library/Mobile Documents/com~apple~CloudDocs/blog"
npm run build && npx netlify deploy --prod --dir=dist --no-build
```

5. **Confirm to User**
```
✅ Blog post published!

Live at: https://jones-blogs.netlify.app/post/[slug]

Contentful entry: https://app.contentful.com/spaces/0p9g4pxrt6uv/entries/[entry_id]
```

---

## Quick Reference

### Contentful Space Info
- Space ID: `0p9g4pxrt6uv`
- Environment: `master`
- Content Type: `blogPost`

### Asset Linking Format
```json
{
  "sys": {
    "type": "Link",
    "linkType": "Asset",
    "id": "[asset_id]"
  }
}
```

### Tag Linking Format
```json
{
  "sys": {
    "type": "Link",
    "linkType": "Entry",
    "id": "[tag_entry_id]"
  }
}
```

### SVG Color Rule
Always use `#000000` - never `currentColor` or other colors. The CSS mask-image technique handles light/dark theme switching.

---

## Checklist

- [ ] Dictation captured
- [ ] Ideas structured into cohesive flow
- [ ] Content edited with proper headings/sections
- [ ] Main SVG created (800x200, circles/lines, #000000)
- [ ] Thumbnail SVG created (800x200, circles/lines, #000000)
- [ ] Metadata complete (title, slug, excerpt, tags, SEO)
- [ ] Assets uploaded to Contentful (draft)
- [ ] Entry created in Contentful (draft)
- [ ] User reviewed and approved
- [ ] Assets published
- [ ] Entry published
- [ ] Site built and deployed
