# Product Requirements Document (PRD) v2
## The Anchor Pub - Data-Driven Local SEO Website

### 1. Executive Summary

Based on comprehensive search data analysis, The Anchor has massive untapped potential in local search. With 900% YoY growth in Heathrow-related searches, 47+ "near me" keyword variations, and low competition across most target keywords, we will build a website architected specifically to capture this demand and convert searchers into customers.

### 2. Data-Driven Objectives

**Primary KPIs:**
- Capture 80% of "pub near Heathrow Terminal [X]" searches (currently 900% YoY growth)
- Rank #1 for 47+ "near me" variations within 3 months
- Convert 5,000 monthly "food near me" searchers
- Increase brand searches from 50/month to 500/month

**Revenue Impact:**
- 40% increase in airport traveler visits
- 25% increase in local foot traffic
- Double event bookings via organic search
- 50% increase in Sunday lunch covers

### 3. Search-Driven Site Architecture

```
the-anchor.pub/
├── / (Homepage - optimized for "pub near me")
├── /heathrow/
│   ├── /terminal-2 (Pub near Heathrow Terminal 2)
│   ├── /terminal-3 (Pub near Heathrow Terminal 3)
│   ├── /terminal-4 (Pub near Heathrow Terminal 4)
│   └── /terminal-5 (Pub near Heathrow Terminal 5)
├── /locations/
│   ├── /staines (Staines pub, food Staines)
│   ├── /stanwell-moor (Stanwell Moor village pub)
│   └── /tw19 (Pubs in TW19)
├── /food/
│   ├── /sunday-lunch (Sunday lunch near me)
│   ├── /pizza (Pizza near me, BOGOF pizza)
│   └── /menu (Food near me)
├── /whats-on/
│   ├── /live-music (Live music near me)
│   ├── /events (Events near me today)
│   └── /calendar (Real-time from API)
├── /dog-friendly (Dog friendly pub near me)
└── /book (Book a table/event)
```

### 4. Local SEO Technical Implementation

#### 4.1 Schema Markup Strategy
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://the-anchor.pub/#restaurant",
      "name": "The Anchor",
      "servesCuisine": ["British", "Pizza"],
      "priceRange": "££",
      "acceptsReservations": true,
      "menu": "https://the-anchor.pub/food/menu",
      "hasMenu": {
        "@type": "Menu",
        "hasMenuSection": [...]
      }
    },
    {
      "@type": "BarOrPub",
      "@id": "https://the-anchor.pub/#pub",
      "name": "The Anchor Pub",
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
        "latitude": 51.4567,
        "longitude": -0.4567
      },
      "openingHoursSpecification": [...],
      "containsPlace": {
        "@type": "Restaurant",
        "@id": "https://the-anchor.pub/#restaurant"
      }
    }
  ]
}
```

#### 4.2 Page-Level Optimization

**Homepage Focus: "Near Me" Dominance**
- Title: "The Anchor Pub Near Me | Heathrow's Local Pub | Open Now"
- H1: Dynamic based on user location/time
- Content blocks for each high-volume "near me" variation
- Real-time "Open Now" indicator with kitchen hours

**Heathrow Landing Pages**
- Title: "Pub Near Heathrow Terminal [X] | 7 Minutes Away | The Anchor"
- Content: Journey times, parking info, pre-flight meals
- Schema: TravelAction with duration estimates
- Real-time flight departure boards widget (if possible)

**Location Pages**
- Hyper-local content mentioning nearby landmarks
- Walking directions from major points
- Local event partnerships and mentions

### 5. Mobile-First Features (80% of traffic)

#### 5.1 Critical Mobile UX
- One-tap phone calls
- GPS directions button above fold
- "Open Now" banner
- Swipeable menu cards
- Voice search optimization

#### 5.2 Progressive Web App Features
- "Add to Home Screen" for repeat visitors
- Offline menu viewing
- Push notifications for events (opt-in)

### 6. API Integration & Real-Time Data

#### 6.1 Events API Integration
```javascript
// Real-time event display
const EventsFeed = () => {
  // Pull from your API
  // Update every 30 minutes
  // Cache for performance
  // Schema markup for each event
}
```

#### 6.2 Google My Business API
- Sync opening hours
- Push events as GMB posts
- Pull and display reviews
- Update holiday hours automatically

#### 6.3 Booking Integration
- Direct table booking
- Event space inquiries
- Pre-order for collection
- Integration with your existing system

### 7. Content Strategy for Search Intent

#### 7.1 Programmatic Pages
- Auto-generate "food near [location]" pages
- Dynamic "open now" content based on time
- Weather-based content (beer garden availability)

#### 7.2 FAQ Schema for Voice Search
- "What time does The Anchor close?"
- "Does The Anchor allow dogs?"
- "Is The Anchor kitchen open now?"
- "How far is The Anchor from Terminal 5?"

### 8. Link Building & Citations

#### 8.1 Priority Citations
- Heathrow Airport local guides
- Staines business directory
- Surrey pub guides
- TripAdvisor optimization
- Yell.com premium listing

#### 8.2 Strategic Partnerships
- Hotel concierge programs
- Heathrow staff discount scheme
- Local business cross-promotion
- Event partnership mentions

### 9. Performance Optimization

#### 9.1 Core Web Vitals
- LCP < 2.5s (optimize hero image)
- FID < 100ms (minimize JavaScript)
- CLS < 0.1 (reserve space for images)

#### 9.2 Speed Optimizations
- Image CDN with WebP/AVIF
- Critical CSS inlining
- Resource hints for Google fonts
- Service worker for offline access

### 10. Conversion Optimization

#### 10.1 Micro-Conversions
- "Get Directions" clicks
- "Call Now" taps
- Menu views
- Event calendar adds
- Review prompts after 3 page views

#### 10.2 Macro-Conversions
- Table bookings
- Event inquiries
- Newsletter signups
- App downloads (if applicable)

### 11. Measurement & Iteration

#### 11.1 Custom Dashboards
- Real-time "near me" rankings
- Heathrow traffic monitoring
- Weather correlation analysis
- Event attendance tracking

#### 11.2 A/B Testing Priority
- Homepage hero messaging
- CTA button colors/text
- Menu layout options
- Event display formats

### 12. Quick Wins Implementation (Week 1)

1. **Schema Implementation** - Immediate ranking boost
2. **"Near Me" Landing Page** - Capture high-volume searches
3. **Heathrow Pages** - Tap into 900% growth market
4. **Mobile Click-to-Call** - Instant conversions
5. **GMB Integration** - Review display & posts

### 13. Competitive Advantages

**vs The White Horse Longford:**
- 50x faster page load
- Mobile-first vs desktop-only
- Real-time information

**vs The Raising Sun Stanwell:**
- Actual website vs Facebook only
- SEO dominance
- Professional presence

**vs The Golden Cross Poyle:**
- Modern UX
- Schema implementation
- Content depth

### 14. Technical Stack (Optimized)

```javascript
// Recommended Stack
{
  "framework": "Next.js 14 (App Router)",
  "styling": "Tailwind CSS",
  "cms": "Directus/Strapi (for non-technical updates)",
  "hosting": "Vercel Edge",
  "monitoring": "Vercel Analytics + GSC",
  "apis": {
    "events": "Your existing API",
    "reviews": "Google My Business API",
    "maps": "Google Maps Platform"
  }
}
```

### 15. ROI Projections

**Month 1:**
- 300% increase in organic traffic
- 50+ daily direction requests
- 20+ phone calls/day

**Month 3:**
- Page 1 for all target keywords
- 1,000+ Heathrow visitor captures/month
- 100+ event page conversions

**Month 6:**
- #1 for "pub near me" in area
- 5x increase in brand searches
- Measurable revenue attribution

### 16. Next Steps

1. **Immediate Actions:**
   - Confirm API endpoints and documentation
   - Gather high-quality photos for each page
   - Set up Google Search Console if not already done

2. **Development Priority:**
   - Week 1: Core pages + schema
   - Week 2: API integrations
   - Week 3: Performance optimization
   - Week 4: Launch & monitor

This data-driven approach ensures every page, every piece of content, and every technical decision is based on actual search demand and user behavior, maximizing ROI and local search dominance.