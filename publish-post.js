#!/usr/bin/env node

/**
 * Script to publish a blog post to Contentful
 * Usage: node publish-post.js <post-data-file.json>
 * 
 * This script will:
 * 1. Create/update tags if needed
 * 2. Create a new blog post entry
 * 3. Link the tags to the post
 * 4. Publish to preview environment (or leave as draft)
 */

import contentfulManagement from 'contentful-management';
import fs from 'fs';
import path from 'path';

const { createClient } = contentfulManagement;

// Load environment variables
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

// Validate required environment variables
if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Error: Missing required environment variables');
  console.error('Required:');
  console.error('  - CONTENTFUL_SPACE_ID');
  console.error('  - CONTENTFUL_MANAGEMENT_TOKEN');
  console.error('\nOptional:');
  console.error('  - CONTENTFUL_ENVIRONMENT (defaults to "master")');
  process.exit(1);
}

// Initialize Contentful Management client
const client = createClient({
  accessToken: MANAGEMENT_TOKEN,
});

/**
 * Find or create a tag
 */
async function ensureTag(environment, tagName, tagSlug) {
  try {
    console.log(`🔍 Looking for tag: ${tagName} (${tagSlug})`);
    
    // Try to find existing tag by slug
    const entries = await environment.getEntries({
      content_type: 'tag',
      'fields.slug': tagSlug,
      limit: 1,
    });

    if (entries.items.length > 0) {
      console.log(`✅ Found existing tag: ${tagName}`);
      return entries.items[0];
    }

    // Create new tag
    console.log(`📝 Creating new tag: ${tagName}`);
    const tag = await environment.createEntry('tag', {
      fields: {
        name: {
          'en-US': tagName,
        },
        slug: {
          'en-US': tagSlug,
        },
      },
    });

    // Publish the tag
    await tag.publish();
    console.log(`✅ Created and published tag: ${tagName}`);
    
    return tag;
  } catch (error) {
    console.error(`❌ Error ensuring tag ${tagName}:`, error.message);
    throw error;
  }
}

/**
 * Create a blog post
 */
async function createBlogPost(environment, postData) {
  try {
    console.log(`\n📝 Creating blog post: ${postData.title}`);

    // Ensure all tags exist
    const tagReferences = [];
    if (postData.tags && postData.tags.length > 0) {
      console.log('\n🏷️  Processing tags...');
      for (const tag of postData.tags) {
        const tagEntry = await ensureTag(environment, tag.name, tag.slug);
        tagReferences.push({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: tagEntry.sys.id,
          },
        });
      }
    }

    // Check if post with this slug already exists
    const existingPosts = await environment.getEntries({
      content_type: 'blogPost',
      'fields.slug': postData.slug,
      limit: 1,
    });

    if (existingPosts.items.length > 0) {
      console.log(`⚠️  Post with slug "${postData.slug}" already exists!`);
      console.log('Entry ID:', existingPosts.items[0].sys.id);
      return existingPosts.items[0];
    }

    // Prepare the content field (Rich Text format)
    const contentField = postData.content || {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: postData.contentText || 'No content provided.',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    };

    // Create the blog post entry
    const fields = {
      title: {
        'en-US': postData.title,
      },
      slug: {
        'en-US': postData.slug,
      },
      hook: {
        'en-US': postData.hook || '',
      },
      content: {
        'en-US': contentField,
      },
      publishDate: {
        'en-US': postData.publishDate || new Date().toISOString().split('T')[0],
      },
    };

    // Add tags if any
    if (tagReferences.length > 0) {
      fields.tags = {
        'en-US': tagReferences,
      };
    }

    const entry = await environment.createEntry('blogPost', { fields });

    console.log(`✅ Blog post created successfully!`);
    console.log(`   Entry ID: ${entry.sys.id}`);
    console.log(`   Status: Draft (unpublished)`);
    
    // Option to publish
    if (postData.publish) {
      console.log('\n📤 Publishing entry...');
      await entry.publish();
      console.log('✅ Entry published!');
    } else {
      console.log('\n📋 Entry left as draft (available in Preview API)');
    }

    return entry;
  } catch (error) {
    console.error('❌ Error creating blog post:', error.message);
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2));
    }
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Get the post data file path from command line
    const args = process.argv.slice(2);
    
    let postData;
    
    if (args.length === 0) {
      console.error('❌ Error: No post data file provided');
      console.error('Usage: node publish-post.js <post-data-file.json>');
      console.error('\nOr set POST_DATA environment variable with JSON string');
      process.exit(1);
    }

    const postDataFile = args[0];
    console.log(`📄 Loading post data from: ${postDataFile}`);
    
    const postDataPath = path.resolve(postDataFile);
    if (!fs.existsSync(postDataPath)) {
      console.error(`❌ Error: File not found: ${postDataPath}`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(postDataPath, 'utf-8');
    postData = JSON.parse(fileContent);

    console.log('\n🚀 Starting publication process...');
    console.log(`   Space ID: ${SPACE_ID}`);
    console.log(`   Environment: ${ENVIRONMENT_ID}`);

    // Get space and environment
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    console.log('✅ Connected to Contentful');

    // Create the blog post
    const entry = await createBlogPost(environment, postData);

    console.log('\n🎉 Success! Your blog post is ready.');
    console.log(`\n📍 Preview URL: https://app.contentful.com/spaces/${SPACE_ID}/entries/${entry.sys.id}`);
    
    if (!postData.publish) {
      console.log('\n💡 Tip: The post is in draft mode and available via the Preview API.');
      console.log('   To view it, use the Preview API token in your application.');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main();
