# Location Pages Audit

## Summary
This audit verifies the existence and structure of all 8 location-targeted pages for The Anchor.

**Audit Date**: July 30, 2025
**Total Location Pages**: 8

---

## Location Pages Status

### ✅ All Location Pages Found

1. **ashford-pub** ✓
   - Path: `/app/ashford-pub/page.tsx`
   - Title: "Ashford Pub Near Me | The Anchor - 10 Minutes from Ashford"
   - Description: Targets Ashford area (10 mins away)
   
2. **bedfont-pub** ✓
   - Path: `/app/bedfont-pub/page.tsx`
   - Status: File exists with backup
   
3. **egham-pub** ✓
   - Path: `/app/egham-pub/page.tsx`
   - Status: File exists with backup
   
4. **feltham-pub** ✓
   - Path: `/app/feltham-pub/page.tsx`
   - Status: File exists with backup
   
5. **heathrow-hotels-pub** ✓
   - Path: `/app/heathrow-hotels-pub/page.tsx`
   - Status: File exists with backup
   
6. **staines-pub** ✓
   - Path: `/app/staines-pub/page.tsx`
   - Status: File exists with backup
   
7. **stanwell-pub** ✓
   - Path: `/app/stanwell-pub/page.tsx`
   - Status: File exists with backup
   
8. **windsor-pub** ✓
   - Path: `/app/windsor-pub/page.tsx`
   - Status: File exists with backup

---

## Technical Structure

### Page Components Found:
- HeroWrapper for consistent headers
- StatusBar for business information
- BusinessHours component
- FAQAccordionWithSchema for structured data
- DirectionsButton for navigation
- Schema markup (LocalBusiness + Restaurant)

### SEO Implementation:
- Proper metadata with location-specific titles
- Location-targeted keywords
- Schema markup with geo coordinates
- Breadcrumb schemas
- OpenGraph and Twitter cards

---

## Critical Finding: ORPHANED PAGES

**ISSUE**: While all pages exist, the original audit identified these as "orphaned" - meaning they have NO internal links pointing to them.

**Impact**: 
- Google can't discover these pages through crawling
- Zero link equity flowing to these pages
- Missing out on local search traffic

**Required Action**: Add internal links to these pages (Phase 2.1)

---

## Recommendations

### 1. IMMEDIATE - Verify No Redirects Block These
**Check**: Ensure none of these location URLs are in redirect files
**Risk**: Low (already checked main redirects)

### 2. PHASE 2 - Add Footer Links
**Action**: Create "Areas We Serve" section in footer
**Benefit**: Makes all pages discoverable by search engines

### 3. FUTURE - Add Surrey Context
**Note**: Master Reference confirms we're in Surrey
**Action**: Update content to mention Surrey (Phase 3.4)

---

## Next Steps

1. Continue to Phase 1.3 - Audit robots.txt
2. Plan footer implementation for Phase 2.1
3. Consider creating /locations hub page