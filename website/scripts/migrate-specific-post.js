#!/usr/bin/env node

/**
 * Single Post Migration Script
 * Migrates a specific blog post from the old website
 * 
 * Usage: node scripts/migrate-specific-post.js [post-url]
 * Example: node scripts/migrate-specific-post.js https://www.the-anchor.pub/post/botanist-gin-july-2025-managers-special-stanwell-moor
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Configuration
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');

// Fetch a URL and return the content
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
    
    const request = imageUrl.startsWith('https') ? https : require('http');
    request.get(imageUrl, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        downloadImage(response.headers.location, outputPath).then(resolve).catch(reject);
        return;
      }
      
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

// Extract structured data from the page
function extractStructuredData(html) {
  const structuredDataMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([^<]+)<\/script>/gi);
  
  if (structuredDataMatch) {
    for (const match of structuredDataMatch) {
      try {
        const jsonStr = match.replace(/<script[^>]*type="application\/ld\+json"[^>]*>|<\/script>/gi, '');
        const data = JSON.parse(jsonStr);
        
        // Look for BlogPosting or Article type
        if (data['@type'] === 'BlogPosting' || data['@type'] === 'Article') {
          return data;
        }
        
        // Check if it's an array of structured data
        if (Array.isArray(data)) {
          const article = data.find(item => item['@type'] === 'BlogPosting' || item['@type'] === 'Article');
          if (article) return article;
        }
      } catch (e) {
        // Continue to next match
      }
    }
  }
  
  return null;
}

// Extract meta tags
function extractMetaTags(html) {
  const metaTags = {};
  
  // Extract various meta tag patterns
  const patterns = [
    /<meta\s+property="([^"]+)"\s+content="([^"]+)"/gi,
    /<meta\s+name="([^"]+)"\s+content="([^"]+)"/gi,
    /<meta\s+content="([^"]+)"\s+property="([^"]+)"/gi,
    /<meta\s+content="([^"]+)"\s+name="([^"]+)"/gi
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const key = match[1].includes('=') ? match[2] : match[1];
      const value = match[1].includes('=') ? match[1] : match[2];
      metaTags[key] = value;
    }
  });
  
  return metaTags;
}

// Extract title
function extractTitle(html, structuredData, metaTags) {
  // Try structured data first
  if (structuredData?.headline) return structuredData.headline;
  
  // Try meta tags
  if (metaTags['og:title']) return metaTags['og:title'];
  if (metaTags.title) return metaTags.title;
  
  // Try page title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].replace(' | The Anchor Stanwell Moor', '').trim();
  }
  
  return 'Untitled Post';
}

// Create slug from URL or title
function createSlug(url, title) {
  // Try to extract from URL first
  const urlMatch = url.match(/\/post\/([^\/\?]+)/);
  if (urlMatch) {
    return urlMatch[1];
  }
  
  // Fallback to title
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

// Migrate a single post
async function migratePost(postUrl) {
  console.log(`📄 Fetching: ${postUrl}\n`);
  
  try {
    const html = await fetchPage(postUrl);
    
    // Extract data
    const structuredData = extractStructuredData(html);
    const metaTags = extractMetaTags(html);
    
    // Get basic info
    const title = extractTitle(html, structuredData, metaTags);
    const description = structuredData?.description || 
                       metaTags['og:description'] || 
                       metaTags.description || 
                       'Blog post from The Anchor';
    
    const date = structuredData?.datePublished || 
                 metaTags['article:published_time'] || 
                 new Date().toISOString();
    
    const author = structuredData?.author?.name || 
                   metaTags['article:author'] || 
                   'The Anchor Team';
    
    const imageUrl = structuredData?.image?.url || 
                     structuredData?.image || 
                     metaTags['og:image'] || 
                     null;
    
    console.log('📊 Extracted Data:');
    console.log(`   Title: ${title}`);
    console.log(`   Description: ${description}`);
    console.log(`   Date: ${date}`);
    console.log(`   Author: ${author}`);
    console.log(`   Image: ${imageUrl ? 'Found' : 'Not found'}\n`);
    
    // Create slug and directory
    const slug = createSlug(postUrl, title);
    const postDir = path.join(CONTENT_DIR, slug);
    await fs.mkdir(postDir, { recursive: true });
    
    // Extract keywords
    const keywords = metaTags.keywords ? metaTags.keywords.split(',').map(k => k.trim()) : [
      'the anchor',
      'stanwell moor',
      'pub'
    ];
    
    // Determine tags based on URL and title
    const tags = [];
    const combinedText = (title + ' ' + description).toLowerCase();
    
    if (combinedText.includes('offer') || combinedText.includes('special')) tags.push('offers');
    if (combinedText.includes('event') || combinedText.includes('drag') || combinedText.includes('quiz')) tags.push('events');
    if (combinedText.includes('drink') || combinedText.includes('gin') || combinedText.includes('beer') || combinedText.includes('wine')) tags.push('drinks');
    if (combinedText.includes('food') || combinedText.includes('menu') || combinedText.includes('roast')) tags.push('food');
    if (combinedText.includes('news')) tags.push('news');
    if (tags.length === 0) tags.push('news');
    
    // Format date
    const formattedDate = new Date(date).toISOString().split('T')[0];
    
    // Create markdown content
    const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${formattedDate}"
author: "${author}"
keywords:
${keywords.map(k => `  - ${k}`).join('\n')}
tags:
${tags.map(t => `  - ${t}`).join('\n')}
featured: false
hero: "hero.jpg"
images: []
---

# ${title}

${description}

---

*This post was migrated from our previous website. Visit the original at: ${postUrl}*

<!-- 
Migration Notes:
- Original URL: ${postUrl}
- Migrated on: ${new Date().toISOString()}
- The full content may need to be manually added or enhanced
-->`;
    
    // Write markdown file
    await fs.writeFile(path.join(postDir, 'index.md'), markdown);
    console.log('✅ Created markdown file\n');
    
    // Download image if found
    if (imageUrl) {
      console.log('📷 Downloading image...');
      const imagePath = path.join(postDir, 'hero.jpg');
      
      try {
        await downloadImage(imageUrl, imagePath);
        console.log('✅ Downloaded hero image\n');
      } catch (error) {
        console.log(`❌ Failed to download image: ${error.message}\n`);
        
        // Create a placeholder file for the image URL
        await fs.writeFile(
          path.join(postDir, 'image-url.txt'), 
          `Original image URL: ${imageUrl}\n\nPlease download this image manually and save it as hero.jpg`
        );
      }
    }
    
    console.log('✅ Migration complete!');
    console.log(`📁 Post location: ${postDir}`);
    console.log(`🔗 New URL will be: /blog/${slug}`);
    
  } catch (error) {
    console.error('❌ Error migrating post:', error.message);
  }
}

// Main function
async function main() {
  const postUrl = process.argv[2];
  
  if (!postUrl) {
    console.log('❌ Please provide a post URL');
    console.log('Usage: node scripts/migrate-specific-post.js [post-url]');
    console.log('Example: node scripts/migrate-specific-post.js https://www.the-anchor.pub/post/example-post');
    process.exit(1);
  }
  
  if (!postUrl.includes('the-anchor.pub/post/')) {
    console.log('❌ Invalid URL. Must be a post from the-anchor.pub');
    process.exit(1);
  }
  
  await migratePost(postUrl);
}

// Run the script
main().catch(console.error);