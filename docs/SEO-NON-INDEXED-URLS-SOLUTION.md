# SEO: Handling Non-Indexed URLs

## Overview
Google Search Console shows many URLs as "Crawled - currently not indexed". This is actually GOOD - these are mostly static assets and legacy URLs that shouldn't be indexed.

## Actions Taken

### 1. Updated robots.txt
Enhanced robots.txt to explicitly block:
- Next.js static assets (`/_next/`)
- API endpoints (`/api/`, `/_api/`)
- Legacy serverless functions (`/_serverless/`)
- Development/test pages
- Legacy URL patterns
- Excessive blog pagination (pages 6+)
- URL parameters (`?dpl=`, `?utm_`, etc.)
- Image optimization variants
- Dynamic resources

### 2. Added 301 Redirects
Created `legacy-redirects.json` to permanently redirect:
- `/post/*` → `/blog/*`
- `/event-details/*` → `/whats-on`
- `/drinks/*` → `/drinks`
- Other legacy URLs to appropriate pages

### 3. Sitemap Already Optimized
The sitemap.ts only includes:
- Static content pages
- Blog posts
- Tag pages
- NO static assets, API endpoints, or legacy URLs

## Why These URLs Shouldn't Be Indexed

### Static Assets (CSS, JS, Fonts)
- `/_next/static/css/*.css` - Build-specific stylesheets
- `/_next/static/media/*.woff2` - Font files
- These change with each build and have no SEO value

### Image Variants
- `/images/*/optimized/*.avif` - Generated image formats
- Google should only index the original images

### Legacy URLs
- `/post/*` - Old blog structure (now redirected)
- `/event-details/*` - Old event pages (now redirected)
- These create duplicate content issues

### API/Internal URLs
- `/_api/*`, `/_serverless/*` - Backend endpoints
- `/heel-of-fortune-admin` - Admin pages
- These expose internal structure

## Expected Results

After deploying these changes:

1. **Immediate Impact**:
   - New crawls will respect robots.txt
   - 301 redirects preserve link equity
   - Reduced crawl budget waste

2. **Within 2-4 Weeks**:
   - Non-content URLs removed from index
   - Legacy URLs consolidated to new URLs
   - Improved crawl efficiency

3. **Long Term**:
   - Better crawl budget allocation
   - Cleaner Search Console reports
   - Focus on indexing actual content

## Monitoring

Check in Google Search Console:
1. Coverage report - Non-indexed URLs should show as "Excluded by robots.txt"
2. Crawl stats - Should show more efficient crawling
3. Index coverage - Should focus on content pages

## No Action Needed For

These non-indexed URLs are CORRECTLY excluded:
- Build-specific CSS files
- Font files
- Manifest.json
- Generated icons
- API responses

This is Google working as intended - it crawls everything but only indexes valuable content pages.