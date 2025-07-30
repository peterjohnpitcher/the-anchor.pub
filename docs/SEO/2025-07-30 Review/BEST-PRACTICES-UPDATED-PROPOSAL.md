# Updated Proposal Based on Best Practices Research

**Date**: July 30, 2025

## Key Research Findings

### 1. Next.js 14 Canonical Best Practices ✅
- **Use `metadataBase` + relative paths** instead of hardcoded canonicals in layout
- **Remove canonical from root layout** - let pages define their own
- **Use `generateMetadata` function** for dynamic routes
- Setting `canonical: null` prevents inheritance

### 2. Cloudflare + Vercel Configuration ⚠️
- **Critical**: Set Cloudflare SSL/TLS to "Full" or "Full (strict)" (NOT "Flexible")
- **Avoid redirect loops**: Flexible SSL causes infinite redirects with Vercel
- **Let Vercel handle redirects**: Configure www redirect in Vercel, not Cloudflare

### 3. SEO Impact: www vs non-www 🔍
- **No ranking impact** according to Google's John Mueller
- **Choose one and stick with it** - consistency is key
- **Both are equally good** for SEO
- **Use 301 permanent redirects** for the non-canonical version

## Updated Implementation Plan

### Phase 1: Fix Build & Canonical Implementation

#### 1. Fix Build Errors (Same as before)
Add BookTableButton imports to terminal pages

#### 2. **UPDATED**: Fix Canonical Implementation
**File**: `/app/layout.tsx`

**REMOVE the entire alternates block**:
```typescript
// DELETE THESE LINES:
alternates: {
  canonical: 'https://www.the-anchor.pub',
},
```

**Keep metadataBase but update to www**:
```typescript
metadataBase: new URL('https://www.the-anchor.pub'),
```

#### 3. **NEW**: Update Each Page's Metadata
For each page that needs a canonical, use relative paths:
```typescript
export const metadata: Metadata = {
  // ... other metadata
  alternates: {
    canonical: './', // This will use metadataBase + current path
  },
}
```

Or for dynamic pages:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/blog/${params.slug}`, // Relative path
    },
  };
}
```

### Phase 2: Domain Configuration

#### 4. **CRITICAL**: Verify Cloudflare Settings
1. Check SSL/TLS encryption mode is set to "Full" or "Full (strict)"
2. Disable any Page Rules that might cause redirects
3. Ensure Cloudflare is NOT handling www redirects

#### 5. Update Domain References (Same as before)
- Update all instances of `https://www.the-anchor.pub` to `https://www.the-anchor.pub`
- Update canonical-url.ts, sitemap.ts, schema files, etc.

### Phase 3: Redirect Configuration

#### 6. **NEW**: Configure Vercel for www Redirect
Add to `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "the-anchor.pub"
        }
      ],
      "destination": "https://www.the-anchor.pub/$1",
      "permanent": true
    }
  ]
}
```

#### 7. Fix Blog Redirect Loops (Same as before)

### Phase 4: Additional Improvements

#### 8. **NEW**: Add Page-Specific Canonicals
For pages that should have canonicals:
```typescript
// app/drinks/page.tsx
export const metadata: Metadata = {
  // ... existing metadata
  alternates: {
    canonical: '/drinks', // Will become https://www.the-anchor.pub/drinks
  },
}
```

#### 9. **NEW**: Handle Query Parameters
For pages that might have query parameters:
```typescript
export async function generateMetadata({ searchParams }): Promise<Metadata> {
  // Canonical should exclude query params
  return {
    alternates: {
      canonical: '/events', // Not '/events?date=today'
    },
  };
}
```

## Why These Changes Are Better

1. **Follows Next.js 14 patterns**: Using metadataBase + relative paths is the recommended approach
2. **Prevents Cloudflare conflicts**: Ensuring SSL is set to "Full" prevents redirect loops
3. **Cleaner implementation**: Each page controls its own canonical rather than inheriting a wrong one
4. **Future-proof**: Easier to maintain and update canonicals per page
5. **Google-approved**: Following Google's canonical guidelines exactly

## Verification Steps

1. **Test locally first**: Ensure canonical tags render correctly
2. **Check Cloudflare SSL**: Verify it's set to "Full" or "Full (strict)"
3. **Test redirects**: Ensure non-www redirects to www without loops
4. **Validate in GSC**: Use URL inspection tool after deployment
5. **Monitor for 48 hours**: Watch for any redirect errors

## Expected Outcomes

- **Immediate**: Correct canonical tags on all pages
- **24-48 hours**: Google recognizes the canonical changes
- **1-2 weeks**: Indexing errors start resolving
- **4-6 weeks**: Full recovery of indexed pages

This updated approach follows the latest best practices and should resolve all indexing issues more effectively.