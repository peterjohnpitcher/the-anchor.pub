# Programmatic URL Submission Guide

## Overview
While Google's Indexing API is limited to job postings and live events, there are several programmatic methods to encourage crawling and indexing.

## Available Methods

### 1. Sitemap Pinging (Implemented ✅)
**Script**: `/scripts/submit-urls-to-google.js`
```bash
node scripts/submit-urls-to-google.js
```
- Pings Google and Bing with your sitemaps
- Warms up URLs by fetching them
- No API key required

### 2. API Endpoint (Implemented ✅)
**Endpoint**: `https://the-anchor.pub/api/trigger-indexing`
- Visit this URL to trigger sitemap pings
- Returns JSON with submission results
- Can be called via cron job

### 3. Google Search Console API (Requires Setup)
Most powerful but requires OAuth configuration:

```bash
# Install dependencies
npm install googleapis dotenv

# Create .env file with credentials
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
```

Then create `/scripts/search-console-submit.js`:
```javascript
const { google } = require('googleapis');

async function authenticateSearchConsole() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/oauth2callback'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  return google.searchconsole({
    version: 'v1',
    auth: oauth2Client
  });
}

async function requestIndexing(siteUrl, urlToIndex) {
  const searchconsole = await authenticateSearchConsole();
  
  try {
    const response = await searchconsole.urlInspection.index({
      siteUrl: siteUrl,
      requestBody: {
        inspectionUrl: urlToIndex,
      }
    });
    
    console.log(`✅ Submitted: ${urlToIndex}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed: ${urlToIndex}`, error.message);
  }
}

// Submit URLs
async function submitAllUrls() {
  const siteUrl = 'https://the-anchor.pub/';
  const urls = [
    'https://the-anchor.pub/blog',
    'https://the-anchor.pub/drinks',
    // ... add all URLs
  ];

  for (const url of urls) {
    await requestIndexing(siteUrl, url);
    // Rate limit: 1 request per second
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

### 4. Automated Cron Job
Set up a weekly cron to ping your indexing endpoint:

**Using Vercel Cron** (add to `vercel.json`):
```json
{
  "crons": [{
    "path": "/api/trigger-indexing",
    "schedule": "0 3 * * 1"
  }]
}
```

**Using GitHub Actions** (`.github/workflows/ping-sitemap.yml`):
```yaml
name: Ping Sitemaps
on:
  schedule:
    - cron: '0 3 * * 1' # Weekly on Monday
  workflow_dispatch: # Manual trigger

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping indexing endpoint
        run: |
          curl -X POST https://the-anchor.pub/api/trigger-indexing
```

### 5. Third-Party Services
- **IndexNow**: Instant indexing for Bing/Yandex
- **Pingler**: Pings multiple search engines
- **Rapid Indexer**: Bulk URL submission

## Best Practices

### 1. Rate Limiting
- Google: Max 200 URLs/day via Search Console API
- Between requests: Wait 1 second minimum
- Batch submissions: Groups of 10-20 URLs

### 2. Priority Order
Submit in this order:
1. Homepage and main navigation
2. High-traffic pages
3. Recent blog posts
4. Category/tag pages
5. Older content

### 3. Monitoring
After submission:
- Check Coverage report in 24-48 hours
- Monitor server logs for Googlebot
- Track indexing status weekly

### 4. Alternative Signals
Beyond direct submission:
- **Social sharing**: Post URLs on Twitter/LinkedIn
- **Internal linking**: Add links from high-value pages
- **External links**: Get other sites to link
- **User engagement**: Improve click-through rates

## Quick Start

1. **Immediate Action**:
   ```bash
   # Run the ping script
   node scripts/submit-urls-to-google.js
   ```

2. **Test API Endpoint**:
   ```bash
   curl https://the-anchor.pub/api/trigger-indexing
   ```

3. **Set Up Weekly Cron**:
   - Add to Vercel or use GitHub Actions

4. **Monitor Results**:
   - Check Search Console Coverage
   - Watch for indexing improvements

## Expected Results

- **Day 1-2**: Sitemaps recognized
- **Day 3-7**: Priority pages crawled
- **Week 2-3**: Blog posts indexed
- **Week 4+**: Full indexing

## Troubleshooting

If URLs still not indexed:
1. Check robots.txt isn't blocking
2. Verify no `noindex` tags
3. Ensure unique, quality content
4. Check page load speed < 3s
5. Verify mobile usability

## Important Notes

- Google's Indexing API is officially limited to JobPosting and BroadcastEvent
- Sitemap pinging doesn't guarantee indexing
- Quality content and user signals matter most
- Be patient - indexing can take weeks

The combination of programmatic submission, quality content, and strong user signals will maximize your indexing success.