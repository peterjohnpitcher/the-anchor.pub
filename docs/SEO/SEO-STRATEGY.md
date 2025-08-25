# SEO Strategy & Implementation Guide

## Overview
Comprehensive SEO strategy and implementation guide for The Anchor pub website, covering technical SEO, content strategy, local SEO, and performance optimization.

## Table of Contents
1. [Technical SEO](#technical-seo)
2. [Schema Implementation](#schema-implementation)
3. [Local SEO](#local-seo)
4. [Content Strategy](#content-strategy)
5. [Backlink Strategy](#backlink-strategy)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Reporting](#monitoring--reporting)

## Technical SEO

### Domain Configuration
- **Canonical Domain**: `https://www.the-anchor.pub` (with www)
- **SSL**: Full/Strict via Cloudflare
- **Redirects**: Non-www to www (301 permanent)

### URL Structure
```
/                           # Homepage
/book-table                 # Booking page
/whats-on                   # Events listing
/food                       # Food menu
/drinks                     # Drinks menu
/near-heathrow/terminal-5   # Location pages
/blog/[slug]               # Blog posts
```

### Meta Tags Implementation
```typescript
// Page-specific metadata
export const metadata: Metadata = {
  title: 'Page Title | The Anchor Stanwell Moor',
  description: 'Description under 160 characters',
  keywords: ['relevant', 'keywords'],
  alternates: {
    canonical: './', // Relative to metadataBase
  },
  openGraph: {
    title: 'Page Title',
    description: 'Description',
    images: ['/images/og-image.jpg'],
  }
}
```

### Heading Hierarchy
- **One H1 per page** (page title)
- **Logical H2-H6 structure** (no skipping levels)
- **Keywords in headings** (naturally integrated)

### Sitemap Configuration
```xml
<!-- Automated sitemap.xml generation -->
<url>
  <loc>https://www.the-anchor.pub/page</loc>
  <lastmod>2025-08-01</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

## Schema Implementation

### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "The Anchor",
  "image": "https://www.the-anchor.pub/images/the-anchor-pub.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "26 High St, Stanwell Moor",
    "addressLocality": "Staines",
    "postalCode": "TW19 7AB",
    "addressCountry": "GB"
  },
  "telephone": "+441753682707",
  "url": "https://www.the-anchor.pub",
  "servesCuisine": "British",
  "priceRange": "££",
  "openingHoursSpecification": [...]
}
```

### FAQ Schema (Fixed Duplicate Issues)
```typescript
// Ensure single FAQPage per page
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map(q => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer
    }
  }))
}
```

### Event Schema
```json
{
  "@type": "Event",
  "name": "Event Name",
  "startDate": "2025-08-15T20:00:00+01:00",
  "endDate": "2025-08-15T23:00:00+01:00",
  "location": {
    "@type": "Place",
    "name": "The Anchor",
    "address": {...}
  },
  "offers": {
    "@type": "Offer",
    "price": "10.00",
    "priceCurrency": "GBP",
    "url": "https://www.the-anchor.pub/book-event"
  }
}
```

## Local SEO

### Google My Business Optimization
- **NAP Consistency**: Name, Address, Phone identical everywhere
- **Categories**: Restaurant, Pub, Bar
- **Service Areas**: Heathrow, Stanwell Moor, Staines, Ashford
- **Photos**: Regular updates of food, venue, events
- **Posts**: Weekly updates about events and specials

### Local Keywords Strategy
```
Primary: "pub near Heathrow Terminal 5"
Secondary: "restaurant Stanwell Moor"
Long-tail: "Sunday roast near Heathrow Airport"
Location: "pub in Staines", "bar near Ashford"
```

### Location Pages
- `/near-heathrow` - Main hub page
- `/near-heathrow/terminal-5` - Specific terminal
- `/near-heathrow/hotels` - Hotel guests targeting
- `/stanwell-moor` - Local community page

## Content Strategy

### Blog Content Calendar
- **Weekly**: Event announcements
- **Bi-weekly**: Food & drink features
- **Monthly**: Community stories
- **Seasonal**: Holiday specials

### Content Optimization
1. **Target 1,500+ words** for pillar content
2. **Include FAQ sections** with schema
3. **Add internal links** (3-5 per post)
4. **Optimize images** with alt text
5. **Update regularly** to maintain freshness

### Keyword Targeting
```typescript
// Example keyword mapping
const keywordMap = {
  '/': ['The Anchor pub', 'Stanwell Moor pub'],
  '/food': ['Sunday roast Stanwell', 'pub food near Heathrow'],
  '/whats-on': ['events near Heathrow', 'drag shows Staines'],
  '/book-table': ['book restaurant Heathrow', 'reserve table']
}
```

## Backlink Strategy

### High-Priority Targets
1. **Local Directories**
   - Yell.com
   - Thomson Local
   - Yelp UK
   - TripAdvisor

2. **Industry Sites**
   - CAMRA (Campaign for Real Ale)
   - Great British Pubs
   - Pub Explorer

3. **Local Partners**
   - Heathrow Airport guides
   - Local hotels
   - Event partners
   - Suppliers

### Link Building Tactics
- **Guest Posts**: Local blogs and news sites
- **Event Partnerships**: Cross-promotion
- **Press Releases**: Local media coverage
- **Resource Pages**: "Best pubs near Heathrow"

## Performance Optimization

### Core Web Vitals Targets
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds  
- **CLS**: < 0.1
- **Speed Index**: < 3.0 seconds

### Image Optimization
```typescript
// Next.js Image component usage
<Image
  src="/images/hero.jpg"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  priority={true} // For above-fold
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Bundle Optimization
- Code splitting by route
- Dynamic imports for heavy components
- Tree shaking unused code
- Minimize JavaScript payload

## Monitoring & Reporting

### Key Metrics to Track
1. **Organic Traffic Growth**
2. **Keyword Rankings**
3. **Local Pack Position**
4. **Click-Through Rate**
5. **Conversion Rate**
6. **Core Web Vitals**

### Tools & Dashboards
- **Google Search Console**: Technical issues, rankings
- **Google Analytics**: Traffic and conversions
- **PageSpeed Insights**: Performance monitoring
- **Ahrefs/SEMrush**: Backlink tracking
- **Google My Business**: Local performance

### Monthly Reporting Template
```markdown
## SEO Monthly Report - [Month Year]

### Traffic Overview
- Organic Sessions: X (±X% MoM)
- Organic Users: X (±X% MoM)
- Organic Conversions: X (±X% MoM)

### Keyword Performance
- Top 10 keywords: [list]
- New rankings gained: X
- Rankings lost: X

### Technical Health
- Pages indexed: X
- Crawl errors: X
- Core Web Vitals: Pass/Fail

### Action Items
1. [Priority fixes]
2. [Content opportunities]
3. [Link building targets]
```

## SEO Opportunities 2025

### Quick Wins (1-2 weeks)
1. Fix remaining heading hierarchy issues
2. Add FAQ schema to all service pages
3. Optimize meta descriptions
4. Update Google My Business photos

### Medium Term (1-3 months)
1. Create 10 location-specific landing pages
2. Build 20 high-quality backlinks
3. Implement review schema
4. Launch content hub for events

### Long Term (3-6 months)
1. Achieve Position 1 for "pub near Heathrow"
2. Double organic traffic
3. Expand to video content
4. Build authoritative food blog

## Common SEO Issues & Fixes

### Issue: Duplicate Content
**Fix**: Use canonical tags and consolidate similar pages

### Issue: Slow Page Speed
**Fix**: Optimize images, enable caching, minimize JavaScript

### Issue: Poor Mobile Experience
**Fix**: Responsive design, touch-friendly buttons, readable fonts

### Issue: Thin Content
**Fix**: Expand to 1,000+ words, add value, include FAQs

---
*Last Updated: August 2025*