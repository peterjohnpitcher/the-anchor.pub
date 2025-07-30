# Google Search Console Indexing Issues - Complete Analysis

**Date**: July 30, 2025
**Total Pages Affected**: 585 pages
**Critical Finding**: Multiple configuration issues preventing proper indexing

## Executive Summary

After comprehensive discovery, I've identified the root causes of your indexing issues:

1. **Build Failure** - Site won't deploy due to missing imports
2. **Cloudflare Redirect Configuration** - Non-www redirects to www via Cloudflare
3. **Broken Canonical Implementation** - All pages have canonical pointing to homepage
4. **Redirect Loops** - Some blog redirects create infinite loops
5. **Domain Mismatch** - Sitemap uses non-www, but site serves from www

## Detailed Findings

### 1. BUILD FAILURE (Blocks Everything)
```
Error: 'BookTableButton' is not defined.
- /app/near-heathrow/terminal-2/page.tsx:514
- /app/near-heathrow/terminal-3/page.tsx:444
```
**Impact**: Site cannot deploy until fixed

### 2. CLOUDFLARE DNS CONFIGURATION
- DNS is handled by Cloudflare (not Vercel)
- Cloudflare is redirecting `the-anchor.pub` → `www.the-anchor.pub`
- Using 307 (temporary) redirects instead of 301 (permanent)
- This creates inconsistency with the codebase which expects non-www

### 3. BROKEN CANONICAL TAGS
Found in `/app/layout.tsx` line 168:
```typescript
alternates: {
  canonical: 'https://www.the-anchor.pub',  // This is hardcoded!
}
```
**Result**: Every page has TWO canonical tags:
1. From layout metadata: Points to homepage (wrong!)
2. From CanonicalLink component: Points to correct URL

Example on drinks page:
```html
<link rel="canonical" href="https://www.the-anchor.pub"/>  <!-- Wrong -->
<link rel="canonical" href="https://www.the-anchor.pub/drinks"/>  <!-- Correct -->
```

### 4. REDIRECT CONFIGURATION ISSUES
Found circular redirect loops:
- `/blog/gameshow-house-party` → `/blog/a-night-to-remember...` → `/blog/gameshow-house-party`
- `/blog/spring-tasting-night` → `/blog/spring-tasting-night-at...` → `/blog/spring-tasting-night`

Multiple redirects pointing to same destination:
- 76 redirects → `/drinks`
- 11 redirects → `/whats-on`

### 5. DOMAIN CONSISTENCY ISSUES
- **Codebase**: Uses `https://www.the-anchor.pub` (non-www)
- **Cloudflare**: Redirects to `https://www.the-anchor.pub` (www)
- **Sitemap**: Lists `https://www.the-anchor.pub` URLs
- **Canonical**: Points to `https://www.the-anchor.pub`
- **Actual serving**: From `https://www.the-anchor.pub`

## Why Google Can't Index Your Pages

1. **Redirect Errors (12 pages)**: Cloudflare redirect conflicts with app expectations
2. **Alternate Canonical (23 pages)**: All pages claim homepage is canonical
3. **Page Redirects (64 pages)**: Mix of redirect issues and loops
4. **Crawled Not Indexed (175 pages)**: Google sees duplicate content (wrong canonicals)
5. **Discovered Not Indexed (311 pages)**: URLs in sitemap redirect to different domain

## Root Cause Analysis

The fundamental issue is a **domain configuration mismatch**:
- Your app is built for non-www
- Cloudflare forces www
- Canonical tags say non-www
- Google doesn't know which version to trust

Combined with the hardcoded canonical tag pointing all pages to the homepage, Google thinks:
- Every page is a duplicate of the homepage
- The sitemap URLs are wrong (they redirect)
- There are redirect loops it can't resolve

## Recommended Fix Strategy

### Phase 1: IMMEDIATE (Fix Build)
1. Add missing BookTableButton imports
2. Deploy successfully

### Phase 2: CHOOSE CANONICAL DOMAIN
**Option A: Use www (Recommended)**
- Update codebase to use `www.the-anchor.pub`
- Keep Cloudflare redirect as-is
- Update all references in code

**Option B: Use non-www**
- Configure Cloudflare to NOT redirect
- Remove www redirect from Cloudflare
- Ensure consistency throughout

### Phase 3: FIX CANONICAL TAGS
1. Remove hardcoded canonical from layout.tsx
2. Let CanonicalLink component handle it
3. Update SITE_URL in canonical-url.ts to match chosen domain

### Phase 4: FIX REDIRECTS
1. Fix circular redirect loops
2. Consolidate multiple redirects to same destination
3. Use 301 permanent redirects

### Phase 5: UPDATE & VALIDATE
1. Update sitemap to use chosen domain
2. Submit to Google Search Console
3. Request validation for all error types

## Business Impact

- **Current**: 585 pages not indexed = invisible to Google
- **Potential**: Losing significant organic traffic
- **Timeline**: 2-4 weeks to see improvement after fixes

## Critical Decision Required

**You must choose**: www.the-anchor.pub OR the-anchor.pub

This decision affects:
- Cloudflare configuration
- All code updates
- Marketing materials
- Google Search Console property

## Next Steps

1. **Immediate**: Fix build errors
2. **Today**: Decide on www vs non-www
3. **This Week**: Implement all fixes
4. **Monitor**: Track indexing improvements

---

**Note**: The build failure must be fixed first. Nothing else matters until the site can deploy.