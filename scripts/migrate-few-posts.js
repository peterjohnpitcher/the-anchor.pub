#!/usr/bin/env node

// Quick script to migrate just a few specific posts for testing
const { execSync } = require('child_process');

const posts = [
  'https://www.the-anchor.pub/post/the-botanist-gin-july-2025-managers-special-stanwell-moor',
  'https://www.the-anchor.pub/post/discover-unique-events-at-the-anchor',
  'https://www.the-anchor.pub/post/kraken-rum-offer-stanwell-moor',
  'https://www.the-anchor.pub/post/rum-tasting-night-stanwell-moor',
  'https://www.the-anchor.pub/post/bombay-sapphire-the-anchor-pub'
];

console.log(`🚀 Migrating ${posts.length} posts...`);

posts.forEach((url, index) => {
  console.log(`\n📝 Migrating post ${index + 1}/${posts.length}`);
  try {
    execSync(`node scripts/migrate-blog-improved.js "${url}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Failed to migrate: ${url}`);
  }
  
  // Add delay between migrations
  if (index < posts.length - 1) {
    console.log('⏳ Waiting 2 seconds...');
    execSync('sleep 2');
  }
});

console.log('\n✅ Migration test complete!');