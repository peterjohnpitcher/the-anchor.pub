# SEO Implementation Guide - The Anchor Website

## Overview

This guide provides technical implementation details for executing the Local SEO Strategy. It includes code examples, templates, and best practices for creating high-performing location and feature pages.

## Directory Structure

```
/app/
├── staines-pub/
│   └── page.tsx
├── stanwell-moor-pub/
│   └── page.tsx
├── restaurants-near-heathrow/
│   └── page.tsx
├── locations/
│   └── tw19/
│       └── page.tsx
├── food/
│   ├── pizza/
│   │   └── page.tsx ✓
│   └── fish-and-chips/
│       └── page.tsx
├── dog-friendly/
│   └── page.tsx
├── family-friendly/
│   └── page.tsx
├── free-parking/
│   └── page.tsx
├── offers/
│   └── over-65s/
│       └── page.tsx
├── beer-garden/
│   └── page.tsx ✓
└── whats-on/
    ├── quiz-nights/
    │   └── page.tsx
    └── drag-shows/
        └── page.tsx ✓
```

## Page Template Examples

### Location Page Template (Staines)

```typescript
import Image from 'next/image'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Pub in Staines | The Anchor - Traditional British Pub & Restaurant',
  description: 'Looking for a great pub in Staines? The Anchor offers traditional British food, real ales, and warm hospitality. Just 8 minutes from Staines town centre with free parking.',
  keywords: 'pub staines, staines pub, best pub in staines, restaurants staines, bars staines, food staines, staines upon thames pub',
  openGraph: {
    title: 'The Anchor - Your Local Pub in Staines',
    description: 'Traditional British pub with great food and drinks, 8 minutes from Staines',
    images: ['/images/the-anchor-pub-stanwell-moor.jpg'],
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "The Anchor - Staines Local Pub",
  "image": "https://www.the-anchor.pub/images/the-anchor-pub-stanwell-moor.jpg",
  "url": "https://www.the-anchor.pub/staines-pub",
  "telephone": "01753682707",
  "priceRange": "££",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Horton Road",
    "addressLocality": "Stanwell Moor",
    "addressRegion": "Surrey",
    "postalCode": "TW19 6AQ",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.4764,
    "longitude": -0.4735
  },
  "areaServed": {
    "@type": "City",
    "name": "Staines-upon-Thames"
  },
  "servesCuisine": "British",
  "hasMenu": "https://www.the-anchor.pub/food-menu",
  "acceptsReservations": "true"
}

export default function StainesPubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center mt-20">
        {/* Hero content */}
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2>Your Local Pub in Staines</h2>
            {/* Content targeting "pub staines" and related keywords */}
          </div>
        </div>
      </section>
    </>
  )
}
```

### Schema Markup Templates

#### Restaurant Schema (for food pages)
```javascript
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "The Anchor",
  "servesCuisine": "British",
  "hasMenu": {
    "@type": "Menu",
    "hasMenuSection": {
      "@type": "MenuSection",
      "name": "Fish & Chips",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Fish & Chips",
          "description": "Beer-battered fish with chunky chips",
          "offers": {
            "@type": "Offer",
            "price": "14.99",
            "priceCurrency": "GBP"
          }
        }
      ]
    }
  }
}
```

#### FAQ Schema (for feature pages)
```javascript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are dogs allowed at The Anchor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Dogs are welcome throughout The Anchor..."
      }
    }
  ]
}
```

#### Event Schema (for quiz nights, drag shows)
```javascript
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Quiz Night at The Anchor",
  "startDate": "2024-02-01T19:30",
  "endDate": "2024-02-01T22:00",
  "eventSchedule": {
    "@type": "Schedule",
    "repeatFrequency": "P1M",
    "byDay": "Thursday"
  },
  "location": {
    "@type": "Place",
    "name": "The Anchor",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Horton Road",
      "addressLocality": "Stanwell Moor"
    }
  }
}
```

## SEO Component Library

### 1. Local SEO Hero Component
```typescript
interface LocalSEOHeroProps {
  location: string
  distance: string
  keywords: string[]
}

export function LocalSEOHero({ location, distance, keywords }: LocalSEOHeroProps) {
  return (
    <section className="hero-section">
      <h1>The Anchor - Your Local Pub in {location}</h1>
      <p>Just {distance} away • Free Parking • Dogs Welcome</p>
      <div className="keyword-tags">
        {keywords.map(keyword => (
          <span key={keyword} className="tag">{keyword}</span>
        ))}
      </div>
    </section>
  )
}
```

### 2. Directions Component
```typescript
interface DirectionsProps {
  from: string
  time: string
  distance: string
  landmarks?: string[]
}

export function Directions({ from, time, distance, landmarks }: DirectionsProps) {
  return (
    <div className="directions-box">
      <h3>Getting Here from {from}</h3>
      <p>Journey time: {time} • Distance: {distance}</p>
      {landmarks && (
        <ul>
          {landmarks.map(landmark => (
            <li key={landmark}>Via {landmark}</li>
          ))}
        </ul>
      )}
      <CallToAction href="https://maps.google.com/...">
        Get Directions
      </CallToAction>
    </div>
  )
}
```

### 3. Feature List Component
```typescript
interface FeatureListProps {
  title: string
  features: Array<{
    icon: string
    title: string
    description: string
  }>
}

export function FeatureList({ title, features }: FeatureListProps) {
  return (
    <div className="feature-list">
      <h2>{title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map(feature => (
          <div key={feature.title} className="feature-card">
            <span className="icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Internal Linking Strategy

### Link Placement Rules
1. **Contextual Links**: Place links within content where naturally relevant
2. **Navigation Links**: Add to main navigation for high-priority pages
3. **Footer Links**: Include all location and feature pages
4. **Related Pages**: Link between similar pages (e.g., all Heathrow pages)

### Example Implementation
```typescript
// In any page component
<p>
  Looking for a great pub in {' '}
  <Link href="/staines-pub" className="text-anchor-gold hover:underline">
    Staines
  </Link>? 
  We're just 8 minutes away with {' '}
  <Link href="/free-parking" className="text-anchor-gold hover:underline">
    free parking
  </Link> and a {' '}
  <Link href="/dog-friendly" className="text-anchor-gold hover:underline">
    dog-friendly
  </Link> atmosphere.
</p>
```

## Image Optimization

### Naming Convention
```
/images/
├── location/
│   ├── the-anchor-pub-staines-exterior.jpg
│   ├── the-anchor-pub-stanwell-moor-interior.jpg
│   └── the-anchor-pub-near-heathrow.jpg
├── features/
│   ├── dog-friendly-pub-the-anchor.jpg
│   ├── family-friendly-dining-area.jpg
│   └── free-parking-the-anchor.jpg
└── food/
    ├── fish-and-chips-the-anchor-friday-offer.jpg
    └── sunday-roast-the-anchor-stanwell.jpg
```

### Alt Text Templates
- Location: "The Anchor pub in [location] - [specific feature]"
- Food: "[Dish name] at The Anchor - [unique aspect]"
- Features: "[Feature] at The Anchor pub near Heathrow"

## Content Optimization Checklist

### For Every New Page
- [ ] Unique title tag (55-60 characters)
- [ ] Meta description with CTA (150-160 characters)
- [ ] H1 with primary keyword
- [ ] 2-4 H2 headings with related keywords
- [ ] Schema markup (minimum 2 types)
- [ ] Internal links (minimum 3)
- [ ] External link to Google Maps
- [ ] StatusBar component for live hours
- [ ] CallToAction components
- [ ] Mobile-responsive design
- [ ] Image with descriptive alt text
- [ ] FAQ section (where relevant)

### Keyword Placement
1. **Title Tag**: Primary keyword near beginning
2. **H1**: Natural inclusion of primary keyword
3. **First Paragraph**: Primary and secondary keywords
4. **H2 Headings**: Related keywords and variations
5. **Body Content**: Natural distribution, 1-2% density
6. **Image Alt Text**: Descriptive with keywords
7. **Meta Description**: Primary keyword + CTA

## Performance Optimization

### Core Web Vitals Targets
- **LCP**: < 2.5s (optimize hero images)
- **FID**: < 100ms (minimize JavaScript)
- **CLS**: < 0.1 (set image dimensions)

### Implementation Tips
```typescript
// Optimize images
<Image
  src="/images/hero.jpg"
  alt="The Anchor pub"
  width={1200}
  height={600}
  priority // for above-fold images
  placeholder="blur"
  blurDataURL="..." // generate with plaiceholder
/>

// Lazy load below-fold components
const DynamicComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { 
    loading: () => <Skeleton />,
    ssr: false 
  }
)
```

## Monitoring & Maintenance

### Weekly Tasks
1. Check Google Search Console for new queries
2. Monitor page performance in Analytics
3. Update content based on seasonal trends
4. Respond to new reviews
5. Check for broken links

### Monthly Tasks
1. Analyze keyword rankings
2. Update schema markup with new offers
3. Add new FAQ questions based on queries
4. Refresh images if needed
5. Competitive analysis

### Tools Setup
1. **Google Search Console**: Verify all new URLs
2. **Google Analytics 4**: Track events and conversions
3. **Schema Validator**: Test all markup
4. **PageSpeed Insights**: Monitor performance
5. **Local Ranking Tracker**: Monitor local pack

## Common Pitfalls to Avoid

1. **Keyword Stuffing**: Keep density natural (1-2%)
2. **Duplicate Content**: Each page must be unique
3. **Thin Content**: Minimum 400 words per page
4. **Missing Schema**: Every page needs markup
5. **Broken Internal Links**: Test all links
6. **Slow Page Speed**: Optimize images and code
7. **Poor Mobile Experience**: Test on devices

## Quick Start Commands

```bash
# Create new location page
mkdir -p app/staines-pub
touch app/staines-pub/page.tsx

# Test schema markup
npx schema-dts-validator

# Check for broken links
npx link-checker http://localhost:3000

# Generate sitemap
npm run build && npm run sitemap
```

---

*Last updated: January 2024*
*Next review: February 2024*