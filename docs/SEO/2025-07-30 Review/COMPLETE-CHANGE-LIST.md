# Complete Change List for WWW Migration & Indexing Fixes

**Decision**: Using www.the-anchor.pub as canonical domain
**Date**: July 30, 2025

## Phase 1: Fix Build Errors (CRITICAL - Do First)

### 1. `/app/near-heathrow/terminal-2/page.tsx`
**Line 3**: Add import
```typescript
import { Button, BookTableButton } from '@/components/ui'
```

### 2. `/app/near-heathrow/terminal-3/page.tsx`
**Line 3**: Add import
```typescript
import { Button, BookTableButton } from '@/components/ui'
```

### 3. `/app/near-heathrow/terminal-4/page.tsx`
**Check**: Verify if BookTableButton is used and add import if needed

### 4. `/app/near-heathrow/terminal-5/page.tsx`
**Check**: Verify if BookTableButton is used and add import if needed

## Phase 2: Fix Canonical Implementation

### 5. `/app/layout.tsx`
**Line 119**: Update metadataBase
```typescript
metadataBase: new URL('https://www.the-anchor.pub'),
```

**Lines 167-169**: REMOVE the hardcoded canonical
```typescript
// DELETE THESE LINES:
alternates: {
  canonical: 'https://www.the-anchor.pub',
},
```

**Line 137**: Update OpenGraph URL
```typescript
url: 'https://www.the-anchor.pub',
```

## Phase 3: Update Domain References

### 6. `/lib/canonical-url.ts`
**Line 5**: Update SITE_URL
```typescript
const SITE_URL = 'https://www.the-anchor.pub'
```

### 7. `/app/sitemap.ts`
**Line 5**: Update baseUrl
```typescript
const baseUrl = 'https://www.the-anchor.pub'
```

### 8. `/public/robots.txt`
**Lines 70-71**: Update sitemap URLs
```
Sitemap: https://www.the-anchor.pub/sitemap.xml
Sitemap: https://www.the-anchor.pub/sitemap-priority.xml
```

### 9. `/next.config.js`
**Line 129**: Add www domain to images config
```javascript
domains: ['the-anchor.pub', 'www.the-anchor.pub', 'management.orangejelly.co.uk', ...],
```

### 10. `/lib/schema.ts`
Update ALL occurrences of `https://www.the-anchor.pub` to `https://www.the-anchor.pub`:
- Line 4: `"@id": "https://www.the-anchor.pub/#organization"`
- Line 6: `"url": "https://www.the-anchor.pub"`
- Line 7: Update logo URL
- Line 32: `"@id": "https://www.the-anchor.pub/#business"`
- Line 52: `"url": "https://www.the-anchor.pub"`
- Lines 35-37: Update all image URLs
- Check entire file for other occurrences

### 11. `/public/sitemap-priority.xml`
Update ALL `<loc>` tags from:
```xml
<loc>https://www.the-anchor.pub/...</loc>
```
To:
```xml
<loc>https://www.the-anchor.pub/...</loc>
```

## Phase 4: Fix Redirect Issues

### 12. `/blog-redirects.json`
Fix circular redirects:
1. Find and fix gameshow-house-party loop
2. Find and fix spring-tasting-night loop
3. Review all redirects for other loops

### 13. `/app/sitemap.ts`
**Line 39-40**: Remove duplicate 'staines-pub' entry

### 14. Create `/vercel.json` (if not exists)
Add configuration to handle edge cases:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "trailingSlash": false
}
```

## Phase 5: Content & Schema Updates

### 15. Check all schema files:
- `/lib/schema-utils.ts`
- `/lib/schema-helpers.ts`
- `/lib/enhanced-schemas.ts`
- `/lib/schema-with-reviews.ts`

Replace any instance of `https://www.the-anchor.pub` with `https://www.the-anchor.pub`

### 16. Update any hardcoded URLs in:
- `/lib/static-events.ts`
- `/components/EventSchema.tsx`
- `/components/BlogShareButtons.tsx`

## Phase 6: Additional Fixes

### 17. ESLint Warnings (Optional but recommended)
Fix the warnings about:
- Using `<img>` instead of Next.js `<Image>`
- React Hook dependencies
These don't block deployment but should be addressed

### 18. Add missing pages to sitemap:
- '/privacy-policy'
- '/live-music' 
- '/quiz-night'

## Verification Checklist

After all changes:
- [ ] Run `npm run build` - should succeed
- [ ] Check canonical tags on key pages
- [ ] Verify sitemap.xml uses www
- [ ] Test image loading
- [ ] Verify no broken internal links
- [ ] Check robots.txt is accessible
- [ ] Verify redirects work correctly

## Google Search Console Actions

After deployment:
1. Add www.the-anchor.pub property (if not already)
2. Submit updated sitemap
3. Request validation for all error types
4. Use URL inspection on key pages
5. Monitor indexing over next 2-4 weeks

## Expected Timeline

- **Day 1**: Fix build, deploy
- **Day 2-3**: Google discovers changes
- **Week 1**: Start seeing validation progress
- **Week 2-4**: Most pages should be indexed
- **Week 6-8**: Full indexing complete

---

**CRITICAL**: The build errors (Phase 1) must be fixed first or nothing else matters!