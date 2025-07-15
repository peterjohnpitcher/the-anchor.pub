#!/usr/bin/env node

/**
 * Find All Blog URLs Script
 * Discovers all blog post URLs from the old website
 * 
 * Usage: node scripts/find-blog-urls.js
 */

const https = require('https');
const fs = require('fs').promises;
const path = require('path');

// Fetch a URL and return the content
async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BlogMigrationBot/1.0)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Extract URLs from sitemap
async function getUrlsFromSitemap() {
  console.log('🔍 Checking sitemap...');
  
  try {
    const sitemapXml = await fetchPage('https://www.the-anchor.pub/sitemap.xml');
    const urls = [];
    
    // Extract all URLs that contain /post/
    const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/gi);
    if (urlMatches) {
      urlMatches.forEach(match => {
        const url = match.replace(/<\/?loc>/gi, '');
        if (url.includes('/post/') && !url.endsWith('/post')) {
          urls.push(url);
        }
      });
    }
    
    return urls;
  } catch (error) {
    console.log('❌ Could not fetch sitemap:', error.message);
    return [];
  }
}

// Search for blog post links on the main site
async function findBlogUrls() {
  const foundUrls = new Set();
  
  // Try sitemap first
  const sitemapUrls = await getUrlsFromSitemap();
  sitemapUrls.forEach(url => foundUrls.add(url));
  
  if (foundUrls.size > 0) {
    console.log(`✅ Found ${foundUrls.size} posts in sitemap\n`);
  }
  
  // Try common blog listing pages
  const pagesToCheck = [
    'https://www.the-anchor.pub/post',
    'https://www.the-anchor.pub/blog',
    'https://www.the-anchor.pub/news',
    'https://www.the-anchor.pub/'
  ];
  
  for (const pageUrl of pagesToCheck) {
    console.log(`🔍 Checking ${pageUrl}...`);
    
    try {
      const html = await fetchPage(pageUrl);
      
      // Find all links that look like blog posts
      const linkPatterns = [
        /href="(\/post\/[^"]+)"/gi,
        /href='(\/post\/[^']+)'/gi,
        /href="(https:\/\/www\.the-anchor\.pub\/post\/[^"]+)"/gi,
        /href='(https:\/\/www\.the-anchor\.pub\/post\/[^']+)'/gi
      ];
      
      linkPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(html)) !== null) {
          let url = match[1];
          
          // Convert relative URLs to absolute
          if (url.startsWith('/')) {
            url = `https://www.the-anchor.pub${url}`;
          }
          
          // Filter out the main blog page
          if (!url.endsWith('/post') && url.includes('/post/')) {
            foundUrls.add(url);
          }
        }
      });
      
    } catch (error) {
      console.log(`❌ Could not fetch ${pageUrl}:`, error.message);
    }
  }
  
  return Array.from(foundUrls).sort();
}

// Main function
async function main() {
  console.log('🚀 Finding all blog post URLs...\n');
  
  const urls = await findBlogUrls();
  
  console.log(`\n📊 Found ${urls.length} blog posts:\n`);
  
  urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });
  
  // Save URLs to file
  const outputPath = path.join(__dirname, '..', 'blog-urls.txt');
  await fs.writeFile(outputPath, urls.join('\n'));
  
  console.log(`\n✅ URLs saved to: blog-urls.txt`);
  console.log('\nTo migrate all posts, you can run:');
  console.log('cat blog-urls.txt | xargs -I {} node scripts/migrate-specific-post.js {}');
}

// Run the script
main().catch(console.error);