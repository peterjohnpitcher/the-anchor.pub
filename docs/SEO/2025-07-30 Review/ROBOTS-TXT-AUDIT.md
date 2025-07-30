# Robots.txt Audit

## Summary
This audit analyzes the current robots.txt file to identify which blocks are appropriate vs problematic.

**Audit Date**: July 30, 2025
**File Location**: `/public/robots.txt`

---

## Critical Findings

### 🚨 PROBLEMATIC BLOCK: /drinks/

**Line 29**: `Disallow: /drinks/`

**Issue**: This blocks the ENTIRE drinks section including:
- ✓ `/drinks` - Active main drinks menu page
- ✓ `/drinks/managers-special` - Active promotional page
- ✓ `/drinks/cocktails.css` - Style file

**Impact**: Google cannot crawl or index any drinks-related content

**Required Action**: Remove or modify this line

---

## Safe Blocks (Keep These)

### ✅ Development/Test Pages
Correctly blocks test and diagnostic pages:
- `/_api-diagnostics`
- `/api-status`
- `/api-test`
- `/test-reviews`
- `/test-tracking`
- etc.

### ✅ Legacy URLs
Correctly blocks old URL patterns:
- `/post/` - Old blog structure (current uses /blog/)
- `/event-details/` - Old event structure (current uses /events/)
- `/celebrating-sport-at-the-anchor` - Specific old page
- `/company-christmas-party-venue` - Specific old page

### ✅ Technical Resources
Correctly blocks technical files:
- `/_next/` - Next.js internals
- `/api/` - API endpoints
- `/_buildManifest.js` - Build files
- URL parameters with tracking codes

### ✅ Crawl Budget Optimization
Smart blocking of deep pagination:
- Blog pages beyond page 5
- Prevents crawling infinite pagination

---

## Verification Results

### Paths Checked:
1. **`/post/`** - NO content exists ✓ (safe to block)
2. **`/event-details/`** - NO content exists ✓ (safe to block)  
3. **`/drinks/`** - ACTIVE CONTENT EXISTS ✗ (should NOT block)

### Current Structure:
- Blog: `/blog/[slug]` (not /post/)
- Events: `/events/[id]` (not /event-details/)
- Drinks: `/drinks` and `/drinks/managers-special` (ACTIVE)

---

## Recommendations

### 1. IMMEDIATE FIX REQUIRED
```
# Remove this line:
Disallow: /drinks/

# Or if you need to block old drink pages, be more specific:
Disallow: /drinks/product-
Disallow: /drinks/old-
```

### 2. Consider Adding
```
# Block additional test pages found during audit
Disallow: /debug-hours
Disallow: /gtm-debug
Disallow: /test-booking
Disallow: /test-events
Disallow: /test-gtm
Disallow: /test-hours
Disallow: /test-navigation-tracking
Disallow: /test-simple
Disallow: /test-social-tracking
Disallow: /test-timezone
```

### 3. Keep All Other Blocks
All other disallow rules are appropriate and should remain.

---

## Impact Assessment

**Current State**: 
- Drinks section completely invisible to Google
- Losing potential traffic for drinks-related searches
- Manager's Special promotions not indexed

**After Fix**:
- Drinks menu will be crawlable
- Manager's Special can be indexed
- Improved visibility for drink searches

---

## Next Steps

1. Remove `/drinks/` from robots.txt in Phase 2.2
2. Continue to Phase 1.4 - Verify Heathrow pages
3. Monitor Search Console after changes for crawl errors