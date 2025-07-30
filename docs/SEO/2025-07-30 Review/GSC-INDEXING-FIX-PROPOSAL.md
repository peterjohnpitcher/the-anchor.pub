# Google Search Console Indexing Issues - Fix Proposal

**Date**: July 30, 2025
**Severity**: CRITICAL - Build broken + Redirect loops preventing indexing

## Executive Summary

The site has 585 pages with indexing issues, but the root causes are:
1. **Build Failure**: BookTableButton import errors preventing deployment
2. **Redirect Loop**: www/non-www infinite redirect loop
3. **No canonical implementation**: Pages missing explicit canonical tags
4. **Legacy URL handling**: Old Wix URLs still being crawled

## Critical Issues Found

### 1. BUILD FAILURE (Immediate Fix Required)
```
Error: 'BookTableButton' is not defined.  react/jsx-no-undef
- /app/near-heathrow/terminal-2/page.tsx
- /app/near-heathrow/terminal-3/page.tsx
```

### 2. REDIRECT LOOP (Blocking All Indexing)
- `https://www.the-anchor.pub` → redirects to → `https://www.the-anchor.pub`
- `https://www.the-anchor.pub` → redirects to → `https://www.the-anchor.pub`
- This creates an infinite loop preventing Google from indexing ANY page

### 3. Missing Canonical Implementation
- CanonicalLink component exists but pages don't use it in metadata
- Location pages have duplicate content issues
- No canonical tags in page metadata exports

## Proposed Fixes (In Priority Order)

### Phase 1: IMMEDIATE FIXES (Do First)

#### 1.1 Fix Build Errors
**Files to fix**:
- `/app/near-heathrow/terminal-2/page.tsx`
- `/app/near-heathrow/terminal-3/page.tsx`

**Fix**: Add missing import:
```typescript
import { BookTableButton } from '@/components/ui/buttons/BookTableButton'
```

#### 1.2 Fix Redirect Loop
**File**: Create/update `vercel.json`
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.the-anchor.pub"
        }
      ],
      "destination": "https://www.the-anchor.pub/:path*",
      "permanent": true
    }
  ]
}
```

### Phase 2: CANONICAL TAG IMPLEMENTATION

#### 2.1 Update Layout Metadata
**File**: `/app/layout.tsx`
```typescript
export const metadata: Metadata = {
  // ... existing metadata
  alternates: {
    canonical: 'https://www.the-anchor.pub',
  },
}
```

#### 2.2 Add Canonical to All Pages
For each page, add canonical URL to metadata:
```typescript
export const metadata: Metadata = {
  // ... existing metadata
  alternates: {
    canonical: 'https://www.the-anchor.pub/[page-path]',
  },
}
```

### Phase 3: SITEMAP FIXES

#### 3.1 Remove Duplicate Entry
**File**: `/app/sitemap.ts`
- Remove duplicate 'staines-pub' entry (line 39 or 40)

#### 3.2 Add Missing Pages
Add to sitemap:
- '/privacy-policy'
- '/live-music'
- '/quiz-night'

### Phase 4: ROBOTS.TXT OPTIMIZATION

#### 4.1 Update Robots.txt
**File**: `/public/robots.txt`

Add:
```
# Ensure proper domain crawling
Host: https://www.the-anchor.pub

# Block duplicate parameters
Disallow: /*&utm_
Disallow: /*?wordfence
Disallow: /*?hid=
```

### Phase 5: CONTENT DIFFERENTIATION

#### 5.1 Location Pages
Make each location page unique:
- Add specific local landmarks
- Include unique opening paragraphs
- Add location-specific directions
- Include local area information

### Phase 6: MONITORING & VALIDATION

#### 6.1 Google Search Console Actions
1. Submit updated sitemap
2. Request validation for all error types
3. Use URL Inspection tool on key pages
4. Monitor indexing progress

#### 6.2 Set Up Monitoring
- Check for 404s weekly
- Monitor redirect chains
- Track indexing status

## Implementation Timeline

**Day 1 (Immediate)**:
- Fix build errors (15 mins)
- Fix redirect loop (30 mins)
- Deploy and verify (15 mins)

**Day 2-3**:
- Implement canonical tags (2 hours)
- Fix sitemap issues (30 mins)
- Update robots.txt (15 mins)

**Week 2**:
- Differentiate location pages (4 hours)
- Submit to Google Search Console (30 mins)
- Monitor and adjust (ongoing)

## Expected Outcomes

1. **Immediate**: Site will build and deploy successfully
2. **24-48 hours**: Redirect loops will be resolved
3. **1-2 weeks**: Google will start properly indexing pages
4. **4-6 weeks**: Most indexing issues should be resolved

## Risk Mitigation

1. **Test all changes locally** before deploying
2. **Monitor 404s** after fixing redirects
3. **Check Analytics** for traffic changes
4. **Keep backups** of current configurations

## Success Metrics

- Build succeeds without errors
- No redirect loops in testing
- GSC shows declining error counts
- Indexed page count increases
- Organic traffic improves

---

**IMPORTANT**: The build failure and redirect loop are preventing ALL indexing. These must be fixed immediately before any other SEO work can be effective.