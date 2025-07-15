#!/usr/bin/env node

/**
 * Improved Blog Migration Script
 * Migrates blog posts from the old website with full content extraction
 * 
 * Usage: node scripts/migrate-blog-improved.js [specific-url]
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

// Initialize Turndown for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Configuration
const BASE_URL = 'https://www.the-anchor.pub';
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'content', 'blog');

// Ensure required directories exist
async function ensureDirectories() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
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
    const protocol = imageUrl.startsWith('https') ? https : require('http');
    
    protocol.get(imageUrl, (response) => {
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

// Extract post data from a page with improved content extraction
async function extractPostData(postUrl) {
  console.log(`📄 Fetching: ${postUrl}`);
  
  try {
    const html = await fetchPage(postUrl);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Remove unwanted elements before content extraction
    const unwantedSelectors = [
      'script', 'style', 'nav', 'header', 'footer',
      '.nav', '.navigation', '.menu', '.sidebar',
      '.social-share', '.related-posts', '.comments'
    ];
    
    unwantedSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
    
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
    
    // Try multiple selectors for main content
    const contentSelectors = [
      '[data-hook="post-content"]',
      '.post-content',
      '[itemprop="articleBody"]',
      'article .content',
      'article main',
      '.blog-content',
      'main article',
      'article',
      'main'
    ];
    
    let contentElement = null;
    let contentHtml = '';
    
    for (const selector of contentSelectors) {
      contentElement = document.querySelector(selector);
      if (contentElement && contentElement.innerHTML.trim().length > 100) {
        contentHtml = contentElement.innerHTML;
        break;
      }
    }
    
    // If no content found, try to get the main content area
    if (!contentHtml) {
      const mainContent = document.querySelector('main, .main-content, #content');
      if (mainContent) {
        contentHtml = mainContent.innerHTML;
      }
    }
    
    // Extract all images from the content
    const images = [];
    const imageElements = document.querySelectorAll('img');
    
    imageElements.forEach(img => {
      const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-pin-media');
      if (src && !src.includes('data:image')) {
        let fullUrl = src.startsWith('http') ? src : `${BASE_URL}${src}`;
        
        // Fix Wix thumbnail URLs to get full-size images
        if (fullUrl.includes('static.wixstatic.com')) {
          // Extract the base image ID and extension
          const match = fullUrl.match(/\/media\/([a-f0-9_]+~mv2\.[a-zA-Z]+)/);
          if (match) {
            const imageId = match[1];
            fullUrl = `https://static.wixstatic.com/media/${imageId}`;
          } else if (fullUrl.includes('/v1/')) {
            // Remove transformation parameters
            fullUrl = fullUrl.split('/v1/')[0];
          }
        }
        
        images.push({
          url: fullUrl,
          alt: img.alt || '',
          title: img.title || ''
        });
      }
    });
    
    // Get hero image and fix if it's a Wix URL
    let heroImage = structuredData?.image || getMetaContent('og:image') || images[0]?.url;
    if (heroImage && heroImage.includes('static.wixstatic.com')) {
      const match = heroImage.match(/\/media\/([a-f0-9_]+~mv2\.[a-zA-Z]+)/);
      if (match) {
        heroImage = `https://static.wixstatic.com/media/${match[1]}`;
      } else if (heroImage.includes('/v1/')) {
        heroImage = heroImage.split('/v1/')[0];
      }
    }
    
    // Build post data
    const postData = {
      url: postUrl,
      title: structuredData?.headline || getMetaContent('og:title') || document.title.replace(' | The Anchor', ''),
      description: structuredData?.description || getMetaContent('og:description') || getMetaContent('description'),
      date: structuredData?.datePublished || getMetaContent('article:published_time') || new Date().toISOString(),
      author: structuredData?.author?.name || getMetaContent('article:author') || 'The Anchor Team',
      keywords: structuredData?.keywords || getMetaContent('keywords') || '',
      image: heroImage,
      contentHtml: contentHtml,
      images: images
    };
    
    return postData;
  } catch (error) {
    console.error(`❌ Error extracting data from ${postUrl}:`, error.message);
    return null;
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

// Convert HTML content to Markdown
function convertHtmlToMarkdown(html) {
  // Clean up the HTML first
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Remove any remaining unwanted elements
  document.querySelectorAll('script, style, noscript').forEach(el => el.remove());
  
  // Convert to markdown
  const markdown = turndownService.turndown(document.body.innerHTML);
  
  return markdown;
}

// Create markdown file with full content
function createMarkdown(postData, imageFileNames) {
  const { title, description, date, author, keywords, contentHtml } = postData;
  
  // Extract keywords array
  const keywordsArray = keywords
    ? keywords.split(',').map(k => k.trim()).filter(k => k)
    : ['the anchor', 'stanwell moor', 'pub'];
  
  // Determine tags based on content
  const tags = [];
  const contentLower = (contentHtml + title + description).toLowerCase();
  
  if (contentLower.includes('offer') || contentLower.includes('special') || contentLower.includes('£')) tags.push('offers');
  if (contentLower.includes('event') || contentLower.includes('quiz') || contentLower.includes('drag')) tags.push('events');
  if (contentLower.includes('drink') || contentLower.includes('gin') || contentLower.includes('beer') || contentLower.includes('rum')) tags.push('drinks');
  if (contentLower.includes('food') || contentLower.includes('menu') || contentLower.includes('roast')) tags.push('food');
  if (contentLower.includes('news') || contentLower.includes('update')) tags.push('news');
  if (tags.length === 0) tags.push('news'); // Default tag
  
  // Format date
  const formattedDate = new Date(date).toISOString().split('T')[0];
  
  // Convert HTML to Markdown
  const markdownContent = convertHtmlToMarkdown(contentHtml);
  
  // Build frontmatter
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${formattedDate}"
author: "${author}"
keywords:
${keywordsArray.map(k => `  - ${k}`).join('\n')}
tags:
${tags.map(t => `  - ${t}`).join('\n')}
featured: false
hero: "${imageFileNames[0] || 'hero.jpg'}"
images:
${imageFileNames.slice(1).map(img => `  - "${img}"`).join('\n') || '  []'}
---

${markdownContent}
`;

  return frontmatter;
}

// Find all blog post URLs
async function findAllBlogUrls() {
  console.log('🔍 Finding all blog posts...');
  const allUrls = new Set();
  
  try {
    // Check the blog posts sitemap directly
    const blogSitemapUrl = `${BASE_URL}/blog-posts-sitemap.xml`;
    const sitemapXml = await fetchPage(blogSitemapUrl);
    
    // Extract URLs from sitemap
    const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g);
    if (urlMatches) {
      urlMatches.forEach(match => {
        const url = match.replace(/<\/?loc>/g, '');
        if (url.includes('/post/')) {
          allUrls.add(url);
        }
      });
    }
    console.log(`✅ Found ${allUrls.size} posts in blog sitemap`);
  } catch (error) {
    console.log('⚠️  Could not fetch blog sitemap, trying main sitemap...');
    
    // Try the main sitemap as fallback
    try {
      const sitemapUrl = `${BASE_URL}/sitemap.xml`;
      const sitemapHtml = await fetchPage(sitemapUrl);
      
      // Extract URLs from sitemap
      const urlMatches = sitemapHtml.match(/<loc>([^<]+)<\/loc>/g);
      if (urlMatches) {
        urlMatches.forEach(match => {
          const url = match.replace(/<\/?loc>/g, '');
          if (url.includes('/post/') && !url.endsWith('/post')) {
            allUrls.add(url);
          }
        });
      }
    } catch (error) {
      console.log('⚠️  Could not fetch main sitemap either');
    }
  }
  
  // Also check blog listing page as last resort
  if (allUrls.size === 0) {
    try {
      const blogListUrl = `${BASE_URL}/post`;
      const html = await fetchPage(blogListUrl);
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Find all links to blog posts
      document.querySelectorAll('a[href*="/post/"]').forEach(link => {
        const href = link.href;
        if (href && href.includes('/post/') && !href.endsWith('/post')) {
          const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;
          allUrls.add(fullUrl);
        }
      });
    } catch (error) {
      console.error('⚠️  Error checking blog listing:', error.message);
    }
  }
  
  return Array.from(allUrls);
}

// Migrate a single post with improved handling
async function migratePost(postUrl) {
  const postData = await extractPostData(postUrl);
  if (!postData) return false;
  
  const slug = createSlug(postData.title);
  const postDir = path.join(CONTENT_DIR, slug);
  const publicPostDir = path.join(PUBLIC_DIR, slug);
  
  console.log(`\n📝 Migrating: ${postData.title}`);
  console.log(`   Slug: ${slug}`);
  
  try {
    // Create directories
    await fs.mkdir(postDir, { recursive: true });
    await fs.mkdir(publicPostDir, { recursive: true });
    
    // Download and save images
    const imageFileNames = [];
    
    if (postData.images.length > 0) {
      console.log(`   📷 Found ${postData.images.length} images`);
      
      for (let i = 0; i < postData.images.length; i++) {
        const image = postData.images[i];
        const ext = path.extname(new URL(image.url).pathname) || '.jpg';
        const imageFileName = i === 0 ? `hero${ext}` : `image-${i}${ext}`;
        
        try {
          // Save to public directory for Next.js to serve
          const publicImagePath = path.join(publicPostDir, imageFileName);
          await downloadImage(image.url, publicImagePath);
          
          imageFileNames.push(imageFileName);
          console.log(`   ✅ Downloaded: ${imageFileName}`);
        } catch (error) {
          console.log(`   ❌ Failed to download image ${i + 1}: ${error.message}`);
        }
      }
    }
    
    // Create markdown file with full content
    const markdown = createMarkdown(postData, imageFileNames);
    await fs.writeFile(path.join(postDir, 'index.md'), markdown);
    
    console.log(`   ✅ Created markdown with ${markdown.length} characters`);
    console.log(`   ✅ Migration complete`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error migrating ${postData.title}:`, error.message);
    return false;
  }
}

// Main migration function
async function migrate(specificUrl = null) {
  console.log('🚀 Starting improved blog migration...\n');
  
  // Check for turndown dependency
  try {
    require('turndown');
  } catch (error) {
    console.error('❌ Missing dependency: turndown');
    console.log('📦 Please install it with: npm install --save-dev turndown');
    process.exit(1);
  }
  
  await ensureDirectories();
  
  if (specificUrl) {
    // Migrate specific URL
    await migratePost(specificUrl);
  } else {
    // Find and migrate all posts
    const postUrls = await findAllBlogUrls();
    console.log(`📊 Found ${postUrls.length} posts to migrate\n`);
    
    if (postUrls.length === 0) {
      console.log('❌ No posts found. Check the site structure.');
      return;
    }
    
    let successCount = 0;
    
    for (const url of postUrls) {
      const success = await migratePost(url);
      if (success) successCount++;
      
      // Add delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    console.log(`\n✅ Migration complete!`);
    console.log(`📊 Successfully migrated ${successCount}/${postUrls.length} posts`);
  }
  
  console.log(`\n📁 Content saved to: ${CONTENT_DIR}`);
  console.log(`📁 Images saved to: ${PUBLIC_DIR}`);
}

// Run migration
const specificUrl = process.argv[2];
migrate(specificUrl).catch(console.error);