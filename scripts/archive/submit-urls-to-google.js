/**
 * Programmatic URL Submission to Google
 * 
 * Note: Google's Indexing API is officially limited to JobPosting and BroadcastEvent pages.
 * For other content, we use alternative methods.
 */

const https = require('https');

// Method 1: Ping Google's public sitemap endpoint
async function pingGoogleSitemap() {
  const sitemapUrl = encodeURIComponent('https://www.the-anchor.pub/sitemap.xml');
  const prioritySitemapUrl = encodeURIComponent('https://www.the-anchor.pub/sitemap-priority.xml');
  
  const urls = [
    `https://www.google.com/ping?sitemap=${sitemapUrl}`,
    `https://www.google.com/ping?sitemap=${prioritySitemapUrl}`
  ];

  console.log('📍 Pinging Google with sitemaps...');
  
  for (const url of urls) {
    try {
      await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          console.log(`✅ Pinged: ${url.substring(0, 50)}... Status: ${res.statusCode}`);
          resolve();
        }).on('error', reject);
      });
    } catch (error) {
      console.error(`❌ Failed to ping: ${error.message}`);
    }
  }
}

// Method 2: Ping Bing (also helps with search presence)
async function pingBingSitemap() {
  const sitemapUrl = encodeURIComponent('https://www.the-anchor.pub/sitemap.xml');
  const url = `https://www.bing.com/ping?sitemap=${sitemapUrl}`;
  
  console.log('\n📍 Pinging Bing with sitemap...');
  
  try {
    await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        console.log(`✅ Pinged Bing: Status ${res.statusCode}`);
        resolve();
      }).on('error', reject);
    });
  } catch (error) {
    console.error(`❌ Failed to ping Bing: ${error.message}`);
  }
}

// Method 3: Submit individual URLs via Google's "URL Inspection" API
// Note: This requires OAuth setup with Search Console API
async function submitUrlsViaSearchConsole() {
  console.log('\n📝 For individual URL submission via API:');
  console.log('1. Enable Google Search Console API in Google Cloud Console');
  console.log('2. Create OAuth 2.0 credentials');
  console.log('3. Install: npm install googleapis');
  console.log('4. Use the script below:\n');
  
  const sampleCode = `
const { google } = require('googleapis');
const searchconsole = google.searchconsole('v1');

// After OAuth setup...
async function requestIndexing(url) {
  const response = await searchconsole.urlInspection.index({
    siteUrl: 'https://www.the-anchor.pub/',
    requestBody: {
      inspectionUrl: url,
    }
  });
  console.log('Indexing requested for:', url);
}

// Submit your URLs
const urls = [
  'https://www.the-anchor.pub/blog',
  'https://www.the-anchor.pub/drinks',
  'https://www.the-anchor.pub/find-us',
  // ... more URLs
];

for (const url of urls) {
  await requestIndexing(url);
  // Rate limit: wait 1 second between requests
  await new Promise(resolve => setTimeout(resolve, 1000));
}
`;
  
  console.log(sampleCode);
}

// Method 4: Create a simple web ping service
async function createPingList() {
  const urls = [
    'https://www.the-anchor.pub/',
    'https://www.the-anchor.pub/blog',
    'https://www.the-anchor.pub/drinks',
    'https://www.the-anchor.pub/find-us',
    'https://www.the-anchor.pub/beer-garden',
    'https://www.the-anchor.pub/book-event',
    'https://www.the-anchor.pub/sunday-lunch',
    'https://www.the-anchor.pub/whats-on',
    'https://www.the-anchor.pub/whats-on/drag-shows',
    'https://www.the-anchor.pub/near-heathrow',
    'https://www.the-anchor.pub/staines-pub',
    'https://www.the-anchor.pub/food-menu',
    'https://www.the-anchor.pub/food/pizza',
  ];

  console.log('\n📋 Priority URLs to submit manually or via API:');
  urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });

  // Create a simple fetch to "warm up" these URLs
  console.log('\n🔥 Warming up URLs (helps with discovery)...');
  for (const url of urls) {
    try {
      await new Promise((resolve) => {
        https.get(url, (res) => {
          console.log(`✓ Fetched ${url} - Status: ${res.statusCode}`);
          res.on('data', () => {}); // Consume response
          res.on('end', resolve);
        }).on('error', (err) => {
          console.error(`✗ Failed ${url}: ${err.message}`);
          resolve();
        });
      });
      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting URL submission process...\n');
  
  // Ping sitemaps
  await pingGoogleSitemap();
  await pingBingSitemap();
  
  // Show Search Console API instructions
  await submitUrlsViaSearchConsole();
  
  // Warm up URLs
  await createPingList();
  
  console.log('\n✅ Process complete!');
  console.log('\n📌 Next steps:');
  console.log('1. Check Google Search Console in 24-48 hours');
  console.log('2. Monitor Coverage report for status changes');
  console.log('3. Consider setting up Search Console API for automated submission');
}

// Run the script
main().catch(console.error);