#!/usr/bin/env node

/**
 * Blog Migration Script
 * Migrates all blog posts from the old website to the new structure
 * 
 * Usage: node scripts/migrate-blog-posts.js
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

// Configuration
const BASE_URL = 'https://www.the-anchor.pub';
const POSTS_URL = `${BASE_URL}/post`;
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
const TEMP_DIR = path.join(__dirname, '..', 'temp-migration');

// Ensure required directories exist
async function ensureDirectories() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.mkdir(TEMP_DIR, { recursive: true });
}

// Fetch a URL and return the HTML
async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Download an image
async function downloadImage(imageUrl, outputPath) {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(outputPath);
    https.get(imageUrl, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      require('fs').unlink(outputPath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Extract post data from a page
async function extractPostData(postUrl) {
  console.log(`📄 Fetching: ${postUrl}`);
  
  try {
    const html = await fetchPage(postUrl);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Extract from JSON-LD structured data
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    let structuredData = null;
    
    for (const script of jsonLdScripts) {
      try {
        const data = JSON.parse(script.textContent);
        if (data['@type'] === 'BlogPosting' || data['@type'] === 'Article') {
          structuredData = data;
          break;
        }
      } catch (e) {
        // Continue to next script
      }
    }
    
    // Extract from meta tags
    const getMetaContent = (name) => {
      const meta = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
      return meta ? meta.getAttribute('content') : '';
    };
    
    // Extract main content
    const contentElement = document.querySelector('article, .post-content, .blog-content, main');
    let content = '';
    if (contentElement) {
      // Remove scripts and styles
      contentElement.querySelectorAll('script, style').forEach(el => el.remove());
      content = contentElement.textContent.trim();
    }
    
    // Extract images
    const images = [];
    const imageElements = document.querySelectorAll('article img, .post-content img, main img');
    imageElements.forEach(img => {
      const src = img.src || img.getAttribute('data-src');
      if (src && !src.includes('data:image')) {
        images.push({
          url: src.startsWith('http') ? src : `${BASE_URL}${src}`,
          alt: img.alt || ''
        });
      }
    });
    
    // Build post data
    const postData = {
      url: postUrl,
      title: structuredData?.headline || getMetaContent('og:title') || document.title,
      description: structuredData?.description || getMetaContent('og:description') || getMetaContent('description'),
      date: structuredData?.datePublished || getMetaContent('article:published_time') || new Date().toISOString(),
      author: structuredData?.author?.name || getMetaContent('article:author') || 'The Anchor Team',
      keywords: structuredData?.keywords || getMetaContent('keywords') || '',
      image: structuredData?.image || getMetaContent('og:image') || images[0]?.url,
      content: content,
      images: images
    };
    
    return postData;
  } catch (error) {
    console.error(`❌ Error extracting data from ${postUrl}:`, error.message);
    return null;
  }
}

// Get all post URLs from the posts listing page
async function getAllPostUrls() {
  console.log('🔍 Finding all blog posts...');
  
  try {
    const html = await fetchPage(POSTS_URL);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const postLinks = new Set();
    
    // Look for post links - adjust selectors based on actual site structure
    const linkSelectors = [
      'a[href*="/post/"]',
      '.post-link',
      '.blog-post-link',
      'article a',
      '.post-list a'
    ];
    
    linkSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(link => {
        const href = link.href;
        if (href && href.includes('/post/') && !href.endsWith('/post')) {
          const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;
          postLinks.add(fullUrl);
        }
      });
    });
    
    return Array.from(postLinks);
  } catch (error) {
    console.error('❌ Error fetching post list:', error.message);
    return [];
  }
}

// Create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

// Convert content to markdown
function convertToMarkdown(postData) {
  const { title, description, date, author, keywords, content } = postData;
  
  // Extract keywords array
  const keywordsArray = keywords
    ? keywords.split(',').map(k => k.trim()).filter(k => k)
    : [];
  
  // Determine tags based on content
  const tags = [];
  const contentLower = content.toLowerCase();
  
  if (contentLower.includes('offer') || contentLower.includes('special')) tags.push('offers');
  if (contentLower.includes('event')) tags.push('events');
  if (contentLower.includes('drink') || contentLower.includes('gin') || contentLower.includes('beer')) tags.push('drinks');
  if (contentLower.includes('food') || contentLower.includes('menu')) tags.push('food');
  if (contentLower.includes('news')) tags.push('news');
  if (tags.length === 0) tags.push('news'); // Default tag
  
  // Format date
  const formattedDate = new Date(date).toISOString().split('T')[0];
  
  // Build frontmatter
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${formattedDate}"
author: "${author}"
keywords:
${keywordsArray.map(k => `  - ${k}`).join('\n') || '  - the anchor\n  - stanwell moor'}
tags:
${tags.map(t => `  - ${t}`).join('\n')}
featured: false
hero: "hero.jpg"
images:
  - "image1.jpg"
  - "image2.jpg"
---

# ${title}

${content}

---

*This post was migrated from our previous website. Some formatting may have been adjusted.*`;

  return frontmatter;
}

// Migrate a single post
async function migratePost(postUrl, index) {
  const postData = await extractPostData(postUrl);
  if (!postData) return;
  
  const slug = createSlug(postData.title);
  const postDir = path.join(CONTENT_DIR, slug);
  
  console.log(`📝 Migrating: ${postData.title}`);
  
  try {
    // Create post directory
    await fs.mkdir(postDir, { recursive: true });
    
    // Write markdown file
    const markdown = convertToMarkdown(postData);
    await fs.writeFile(path.join(postDir, 'index.md'), markdown);
    
    // Download images
    if (postData.images.length > 0) {
      console.log(`  📷 Downloading ${postData.images.length} images...`);
      
      for (let i = 0; i < postData.images.length; i++) {
        const image = postData.images[i];
        const imageFilename = i === 0 ? 'hero.jpg' : `image${i}.jpg`;
        const imagePath = path.join(postDir, imageFilename);
        
        try {
          await downloadImage(image.url, imagePath);
          console.log(`    ✅ Downloaded: ${imageFilename}`);
        } catch (error) {
          console.log(`    ❌ Failed to download: ${image.url}`);
        }
      }
    }
    
    console.log(`✅ Migrated: ${slug}\n`);
  } catch (error) {
    console.error(`❌ Error migrating ${postData.title}:`, error.message);
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting blog migration...\n');
  
  await ensureDirectories();
  
  // Get all post URLs
  const postUrls = await getAllPostUrls();
  console.log(`📊 Found ${postUrls.length} posts to migrate\n`);
  
  if (postUrls.length === 0) {
    console.log('❌ No posts found. Check the selectors in getAllPostUrls()');
    return;
  }
  
  // Migrate each post
  for (let i = 0; i < postUrls.length; i++) {
    await migratePost(postUrls[i], i);
    
    // Add a small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✅ Migration complete!');
  console.log(`📁 Check the ${CONTENT_DIR} directory for migrated posts`);
}

// Run migration
migrate().catch(console.error);