#!/usr/bin/env node

/**
 * Complete Blog Migration Script
 * Migrates all blog posts from the old website with progress tracking
 * 
 * Usage: node scripts/migrate-all-blog-posts.js
 */

const { execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

async function main() {
  console.log('🚀 Starting complete blog migration...\n');
  
  // First, run the improved migration script to get all URLs
  let urls = [];
  
  try {
    console.log('📋 Fetching all blog post URLs...');
    const output = execSync('node scripts/migrate-blog-improved.js --list-only', { encoding: 'utf8' });
    // Parse URLs from output (we'll need to modify the script to support this)
  } catch (error) {
    // For now, let's use the known URLs from the sitemap
    console.log('📋 Using predefined URL list...');
    urls = [
      'https://www.the-anchor.pub/post/experience-the-magic-at-the-anchor-s-christmas-market',
      'https://www.the-anchor.pub/post/buy-one-get-one-half-price-on-all-dine-in-pizza-every-tuesday',
      'https://www.the-anchor.pub/post/day-of-the-dead-anchor-pub-events',
      'https://www.the-anchor.pub/post/have-you-tried-kraken-rum',
      'https://www.the-anchor.pub/post/world-salami-day-pizza-offerings',
      'https://www.the-anchor.pub/post/the-botanist-gin-july-2025-managers-special-stanwell-moor',
      'https://www.the-anchor.pub/post/discover-unique-events-at-the-anchor',
      'https://www.the-anchor.pub/post/kraken-rum-offer-stanwell-moor',
      'https://www.the-anchor.pub/post/rum-tasting-night-stanwell-moor',
      'https://www.the-anchor.pub/post/bombay-sapphire-the-anchor-pub',
      'https://www.the-anchor.pub/post/spring-tasting-night-celebration',
      'https://www.the-anchor.pub/post/rum-tasting-night-june-success',
      'https://www.the-anchor.pub/post/prices-frozen-until-autumn-the-anchor-pub',
      'https://www.the-anchor.pub/post/opihr-gin-the-anchor',
      'https://www.the-anchor.pub/post/drag-cabaret-nikki-manfadge-the-anchor',
      'https://www.the-anchor.pub/post/spring-tasting-night',
      // Add more URLs as needed from the sitemap
    ];
  }
  
  console.log(`\n📊 Found ${urls.length} blog posts to migrate\n`);
  
  // Track progress
  let successful = 0;
  let failed = 0;
  const failedUrls = [];
  
  // Create a log file
  const logFile = path.join(__dirname, `migration-log-${new Date().toISOString().slice(0,10)}.txt`);
  await fs.writeFile(logFile, `Blog Migration Log - ${new Date().toISOString()}\n\n`);
  
  // Process each URL
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const progress = `[${i + 1}/${urls.length}]`;
    
    console.log(`\n${progress} Migrating: ${url.split('/').pop()}`);
    await fs.appendFile(logFile, `\n${progress} ${url}\n`);
    
    try {
      execSync(`node scripts/migrate-blog-improved.js "${url}"`, { stdio: 'inherit' });
      successful++;
      await fs.appendFile(logFile, `✅ Success\n`);
    } catch (error) {
      failed++;
      failedUrls.push(url);
      console.error(`❌ Failed to migrate`);
      await fs.appendFile(logFile, `❌ Failed: ${error.message}\n`);
    }
    
    // Add delay to avoid overwhelming the server
    if (i < urls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Log file: ${logFile}`);
  
  if (failedUrls.length > 0) {
    console.log('\n❌ Failed URLs:');
    failedUrls.forEach(url => console.log(`  - ${url}`));
    await fs.appendFile(logFile, `\n\nFailed URLs:\n${failedUrls.join('\n')}`);
  }
  
  console.log('\n✅ Migration complete!');
  console.log('📁 Content saved to: content/blog/');
  console.log('🖼️  Images saved to: public/content/blog/');
  
  // Run a build to verify
  console.log('\n🔨 Running build to verify...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build successful!');
  } catch (error) {
    console.error('❌ Build failed - please check for errors');
  }
}

main().catch(console.error);