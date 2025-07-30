# Google Search Console Indexing Issues Report
**Date**: July 30, 2025
**Total Pages Affected**: 585 pages across 5 different issue types

## Executive Summary
Google Search Console has identified 585 pages with various indexing issues preventing them from being properly indexed and served in search results. These issues range from redirect errors to crawling/discovery problems.

## Detailed Issue Breakdown

### 1. Redirect Error (12 pages)
**Status**: Not indexed or served on Google
**First Detected**: July 22, 2025
**Last Updated**: July 26, 2025

**Sample URLs**:
- https://www.the-anchor.pub/leave-review
- https://www.the-anchor.pub/staines-pub
- https://www.the-anchor.pub/near-heathrow
- https://www.the-anchor.pub/whats-on
- https://www.the-anchor.pub/sunday-lunch
- https://www.the-anchor.pub/drinks
- https://www.the-anchor.pub/drinks/whitley-neill-rhubarb-gin
- https://www.the-anchor.pub/drinks/corona-extra

**Key Observations**:
- Mix of www and non-www URLs
- Includes important pages (near-heathrow, whats-on, sunday-lunch)
- Some drink product pages affected

### 2. Alternate Page with Proper Canonical Tag (23 pages)
**Status**: Not indexed or served on Google
**First Detected**: August 16, 2022 (long-standing issue)
**Last Updated**: July 26, 2025

**Sample URLs**:
- Homepage with UTM parameters
- Event detail pages with /form suffix
- Old blog posts and event pages
- URLs with tracking parameters (utm_source, utm_medium)
- Old security/wordfence URLs

**Key Observations**:
- Mostly URLs with query parameters
- Many are legitimate campaign tracking URLs
- Some very old URLs from 2019-2023

### 3. Page with Redirect (64 pages)
**Status**: Not indexed or served on Google
**First Detected**: August 16, 2022
**Last Updated**: July 26, 2025

**Sample URLs**:
- http://www.the-anchor.pub/ (HTTP version)
- https://www.the-anchor.pub/food
- Multiple event detail pages
- Old blog posts
- Legacy drink pages
- API endpoints (/_api/)

**Key Observations**:
- Mix of HTTP/HTTPS issues
- Many legacy Wix URLs
- Some current pages that should be indexed

### 4. Crawled - Currently Not Indexed (175 pages)
**Status**: Not indexed but validation started July 28, 2025
**Last Updated**: July 26, 2025

**Sample URLs**:
- Blog tag pages (/blog/tag/*)
- CSS files with deployment parameters
- Image files (AVIF format)
- Event detail pages for future dates
- Old blog posts from previous years

**Key Observations**:
- Many are legitimate non-indexable resources (CSS, images)
- Blog tag pages might be thin content
- Future event pages

### 5. Discovered - Currently Not Indexed (311 pages)
**Status**: Not indexed, validation passed June 11, 2024
**Last Updated**: July 26, 2025

**Sample URLs**:
- All new site URLs (the-anchor.pub without www)
- Location pages (/ashford-pub, /bedfont-pub, etc.)
- Blog posts without /blog prefix
- Terminal pages (/near-heathrow/terminal-*)
- Function room and event pages

**Key Observations**:
- These appear to be our NEW site structure
- Critical pages not being indexed
- Validation passed but still not indexed

## Critical Findings

1. **Domain Configuration Issue**: Mix of www/non-www and HTTP/HTTPS suggests redirect configuration problems
2. **New Site Not Indexed**: 311 pages from new site structure discovered but not indexed
3. **Legacy URL Issues**: Many old Wix URLs still being crawled
4. **Important Pages Affected**: Key pages like terminal pages, location pages, and main navigation pages affected

## Immediate Concerns

1. **New Site Visibility**: Our new Next.js site pages aren't being indexed
2. **Duplicate Content**: Both www and non-www versions being crawled
3. **Redirect Chains**: Potential redirect loops or chains preventing indexing
4. **Lost Traffic**: Critical pages for local SEO and Heathrow traffic not indexed