# SEO Issues Documentation

## Overview

This document details all SEO-related issues found during the January 2025 audit of The Anchor website.

## Critical SEO Issues

### 1. Missing Canonical URLs

**Severity**: High  
**Affected**: All pages  

Every page is missing canonical URL tags, which can lead to:
- Duplicate content penalties
- Diluted page authority
- Incorrect pages ranking in search results

**Fix Required**:
```tsx
// Add to every page's metadata
export const metadata: Metadata = {
  // ... existing metadata
  alternates: {
    canonical: `https://the-anchor.pub${pathname}`
  }
}
```

### 2. Meta Description Issues

**Severity**: Medium  
**Affected**: Multiple pages  

Issues found:
- Descriptions exceeding 160 characters (truncated in SERPs)
- Generic descriptions not unique to page content
- Missing descriptions on some pages

**Examples**:
```tsx
// Bad - Too long
description: 'The Anchor is a traditional British pub in Stanwell Moor, near Heathrow Airport, offering delicious food, drinks, and entertainment for locals and visitors alike with free parking and a warm welcome.'

// Good - Concise and specific
description: 'Traditional British pub near Heathrow. Enjoy Sunday roasts, BOGOF pizzas, quiz nights, and free parking at The Anchor Stanwell Moor.'
```

### 3. Missing Twitter Card Metadata

**Severity**: Medium  
**Affected**: All pages  

No Twitter-specific meta tags, limiting social media visibility.

**Fix Required**:
```tsx
export const metadata: Metadata = {
  // ... existing metadata
  twitter: {
    card: 'summary_large_image',
    site: '@theanchorpub',
    creator: '@theanchorpub',
    title: pageTitle,
    description: pageDescription,
    images: ['/images/twitter-card.jpg']
  }
}
```

### 4. Incomplete Schema Markup

**Severity**: High  
**Affected**: Various page types  

#### Event Pages Issues:
- Missing performer information
- No offer/pricing schema
- Incomplete location data
- No aggregateRating

#### Menu Pages Issues:
- No nutrition information
- Missing allergen data
- No menu item schema
- Price not structured

#### Blog Pages Issues:
- Missing article schema
- No author information
- Publication date not marked up
- No breadcrumb schema

### 5. Image SEO Problems

**Severity**: Medium  
**Affected**: All pages with images  

Issues:
- Generic alt text ("Image", "Photo")
- Missing alt text completely
- No structured data for images
- File names not descriptive

**Examples**:
```tsx
// Bad
<Image alt="Image" src="/photo1.jpg" />

// Good
<Image 
  alt="The Anchor pub beer garden with outdoor seating and views of planes landing at Heathrow"
  src="/beer-garden-heathrow-view.jpg"
/>
```

### 6. Local SEO Issues

**Severity**: High  
**Affected**: Location pages  

Problems:
- Inconsistent NAP (Name, Address, Phone)
- Missing geo coordinates in some schemas
- No service area definitions
- Opening hours not properly marked

### 7. Missing Structured Data

**Severity**: Medium  
**Affected**: Various  

Missing opportunities:
- FAQ schema on FAQ sections
- HowTo schema for directions
- Recipe schema for menu items
- Video schema for embedded videos
- Review/Rating schema

## Page-Specific Issues

### Homepage
- Title too generic
- Missing organization schema
- No sitelinks search box schema

### Event Pages
- Dynamic content not properly indexed
- Missing event status (cancelled, postponed)
- No ticket availability schema

### Blog Pages
- No category/tag pages optimized
- Missing related articles schema
- No comment count in schema

### Menu Pages
- Items not individually indexable
- No price range indicators
- Missing dietary restriction markup

## Technical SEO Issues

### 1. URL Structure
- Some URLs too long
- Inconsistent slug formatting
- No trailing slash consistency

### 2. Internal Linking
- Orphaned pages exist
- No related content links
- Breadcrumbs incomplete

### 3. XML Sitemap
- Not comprehensive
- Missing priority indicators
- No image sitemap

### 4. Page Speed Impact
- Large images affecting Core Web Vitals
- No preconnect for external resources
- Missing resource hints

## Recommendations

### Immediate Fixes (This Week)

1. **Add Canonical URLs**
   - Create helper function for canonical URL generation
   - Add to all page metadata

2. **Fix Meta Descriptions**
   - Audit all descriptions for length
   - Rewrite to be unique and compelling
   - Include target keywords

3. **Implement Basic Schema**
   - Fix local business schema
   - Add event schema properly
   - Implement breadcrumbs

### Short-term Fixes (This Month)

1. **Complete Schema Implementation**
   - Add FAQ schema
   - Implement review schema
   - Add nutrition data to menus

2. **Image Optimization**
   - Rewrite all alt texts
   - Rename image files descriptively
   - Add image structured data

3. **Twitter Cards**
   - Add Twitter metadata
   - Create optimized images
   - Test with Twitter validator

### Long-term Improvements

1. **Content Strategy**
   - Create location-specific landing pages
   - Develop blog content calendar
   - Build topical authority

2. **Technical Improvements**
   - Implement dynamic sitemaps
   - Add hreflang for variants
   - Optimize Core Web Vitals

## Implementation Priority

1. **Legal/Compliance**: Accessibility-related SEO
2. **Revenue Impact**: Event and menu page optimization
3. **Visibility**: Local SEO and schema markup
4. **Authority**: Blog and content optimization

## Monitoring

- Set up Google Search Console
- Track ranking changes
- Monitor Core Web Vitals
- Review schema validation regularly

## Tools for Testing

- Google Rich Results Test
- Schema.org Validator
- Twitter Card Validator
- Facebook Debugger
- PageSpeed Insights
- Mobile-Friendly Test