# Create Blog Post Skill

## Overview
This skill guides the complete workflow for creating a new blog post from dictation to published content. The focus is on preserving your authentic voice while organizing and polishing your thoughts.

## Workflow Steps

### Step 1: Dictation
User dictates or provides raw ideas/content for the blog post - stream of consciousness style.

**Claude's role**:
- Listen and capture all key points, examples, and ideas
- Don't interrupt the flow - let the user get everything out
- Note tangents, asides, and random thoughts (often these become the best parts)

---

### Step 2: Structure Ideas
Transform raw dictation into a cohesive blog post structure.

**Claude's role**:
- Identify the main thesis/topic
- Group related ideas together
- Establish logical flow
- Note any gaps that need filling
- **CRITICAL: Preserve the user's voice and tone - don't corporate-speak it**

**Output**: Present organized structure for user approval before editing

---

### Step 3: Content Editing
Put on the content editor hat and polish the content.

**Claude's role**:
- Create compelling title
- Write engaging introduction
- Organize into clear sections with headings
- Ensure smooth transitions
- Write strong conclusion
- **CRITICAL: Don't change the tone - keep the user's personality intact**
- Match the blog's voice (developer-focused, learning journey, casual but informed)

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

### Step 4: Create Metadata & SVG
Generate all required metadata and banner image for the post.

**Required fields**:
- `title` - Post title (compelling, descriptive)
- `slug` - URL-friendly version (lowercase, hyphens, no special chars)
- `hook` - Short hook for listings (max 100 chars)
- `publishDate` - Date in YYYY-MM-DD format
- `tags` - Relevant tags (use existing or create new)

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

---

### Step 5: Convert SVG to PNG
Convert the SVG banner to PNG format for OG/social sharing (meta tags, Twitter cards, etc.).

**Why PNG?**
- SVG can't be used for Open Graph images (og:image)
- Social platforms require raster formats (PNG, JPG)
- The `image` field is used for SEO/social; `imageSvg` is used for on-page display

**Process**:

1. **Save SVG to scratchpad**
```bash
# Write SVG content to file
echo '<svg ...>' > /path/to/scratchpad/[slug].svg
```

2. **Convert to PNG using rsvg-convert**
```bash
# Requires librsvg (brew install librsvg)
rsvg-convert -w 800 -h 200 -b white [slug].svg -o [slug].png
```

3. **Upload PNG to temporary hosting** (for Contentful to fetch)
```bash
# catbox.moe provides free, simple hosting
curl -F "reqtype=fileupload" -F "fileToUpload=@[slug].png" https://catbox.moe/user/api.php
# Returns a URL like: https://files.catbox.moe/abc123.png
```

-> Save the PNG URL for the next step

---

### Step 6: Upload to Contentful (Unpublished)
Upload everything to Contentful as unpublished.

**Sequence**:

1. **Upload SVG Asset** (for on-page display)
```
Tool: mcp__contentful__upload_asset
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- title: "[Post Title] - Banner SVG"
- description: "SVG banner for [topic] (theme-aware)"
- file: { fileName: "[slug].svg", contentType: "image/svg+xml", upload: [SVG URL or content] }
```
-> Save the SVG asset ID

2. **Upload PNG Asset** (for OG/social sharing)
```
Tool: mcp__contentful__upload_asset
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- title: "[Post Title] - Banner PNG"
- description: "PNG banner for OG/social sharing"
- file: { fileName: "[slug].png", contentType: "image/png", upload: [PNG URL from catbox] }
```
-> Save the PNG asset ID

3. **Publish Both Assets** (required before linking)
```
Tool: mcp__contentful__publish_asset
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- assetId: ["[svg_asset_id]", "[png_asset_id]"]
```

4. **Create Blog Post Entry (Unpublished - published: false)**
```
Tool: mcp__contentful__create_entry
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- contentTypeId: "blogPost"
- fields:
  - title: { "en-US": "[title]" }
  - slug: { "en-US": "[slug]" }
  - hook: { "en-US": "[hook]" }
  - content: { "en-US": [Rich Text JSON] }
  - publishDate: { "en-US": "[YYYY-MM-DD]" }
  - tags: { "en-US": [linked tag entries] }
  - image: { "en-US": { "sys": { "type": "Link", "linkType": "Asset", "id": "[png_asset_id]" } } }
  - imageSvg: { "en-US": { "sys": { "type": "Link", "linkType": "Asset", "id": "[svg_asset_id]" } } }
  - published: { "en-US": false }
```
-> Save the entry ID

5. **Publish Entry** (makes it queryable, but `published: false` keeps it as unpublished)
```
Tool: mcp__contentful__publish_entry
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- entryId: [entry_id]
```

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

### Step 7: Preview Unpublished Post
Review the unpublished content on the live site.

**Provide user with**:
```
Unpublished post created!

Preview your post here:
https://code.blog-ai.local:5173/drafts/[slug]

Contentful entry:
https://app.contentful.com/spaces/0p9g4pxrt6uv/entries/[ENTRY_ID]

Let me know what changes you'd like, or say "publish" when ready!
```

**Iteration**: If user requests changes:
- Use `mcp__contentful__update_entry` to modify fields
- Use `mcp__contentful__update_asset` to replace images
- Provide updated preview links

---

### Step 8: Publish
Once user approves, flip the published flag.

**Sequence**:

1. **Update Entry to Published**
```
Tool: mcp__contentful__update_entry
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- entryId: [entry_id]
- fields:
  - published: { "en-US": true }
```

2. **Re-publish Entry** (to make the change live)
```
Tool: mcp__contentful__publish_entry
- spaceId: "0p9g4pxrt6uv"
- environmentId: "master"
- entryId: [entry_id]
```

3. **Confirm to User**
```
Blog post published!

Live post: https://code.blog-ai.local:5173/[slug]
Contentful: https://app.contentful.com/spaces/0p9g4pxrt6uv/entries/[entry_id]

The post is now visible on the main site.
```

---

## Quick Reference

### Contentful Space Info
- Space ID: `0p9g4pxrt6uv`
- Environment: `master`
- Content Type: `blogPost`

### blogPost Fields
| Field | Type | Notes |
|-------|------|-------|
| title | Symbol | Required |
| slug | Symbol | Required, unique |
| hook | Symbol | Max 100 chars |
| content | RichText | Post body |
| publishDate | Date | YYYY-MM-DD |
| tags | Array[Link] | Linked tag entries |
| image | Link[Asset] | Raster image (OG/social) |
| imageSvg | Link[Asset] | SVG banner (theme-aware) |
| published | Boolean | false = unpublished, true = live |

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
- [ ] Ideas structured (preserving voice!)
- [ ] Content edited (coherent but authentic)
- [ ] SVG created (800x200, circles/lines, #000000)
- [ ] Metadata complete (title, slug, hook, tags, date)
- [ ] SVG converted to PNG (800x200, white background)
- [ ] PNG uploaded to temporary hosting (catbox.moe)
- [ ] SVG asset uploaded and published
- [ ] PNG asset uploaded and published
- [ ] Entry created with both `image` (PNG) and `imageSvg` (SVG) linked
- [ ] Entry created with `published: false`
- [ ] User previewed at /drafts/[slug] (unpublished posts page)
- [ ] User approved
- [ ] Entry updated to `published: true`
- [ ] Entry re-published
- [ ] Post live at /[slug]
