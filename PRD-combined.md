# Product Requirements Document (PRD) - Combined Version
## The Anchor Pub - Data-Driven Local SEO Website

### 1. Executive Summary

The Anchor pub requires a modern, local SEO-optimized website that converts existing content into a high-performing web presence. Based on comprehensive search data analysis showing 900% YoY growth in Heathrow-related searches and 47+ "near me" keyword variations with low competition, we will build a website architected specifically to dominate local search results for pub-related queries in Stanwell Moor, Staines, and the Heathrow area, while driving foot traffic, event bookings, and food orders.

### 2. Business Objectives

**Primary Goals:**
- Become the #1 search result for pub-related queries within a 3-mile radius
- Capture 80% of "pub near Heathrow Terminal [X]" searches (900% YoY growth)
- Rank #1 for 47+ "near me" variations within 3 months
- Convert 5,000 monthly "food near me" searchers
- Increase brand searches from 50/month to 500/month

**Secondary Goals & Revenue Impact:**
- Increase daily foot traffic by 25%
- Double private event bookings via organic search
- Increase food trade by 40%
- 50% increase in Sunday lunch covers
- Capture Heathrow traveler market (40% increase in airport traveler visits)
- Outrank competitors (The White Horse Longford, The Raising Sun Stanwell, The Golden Cross Poyle)

### 3. Target Audience

1. **Local Residents** (Primary)
   - Stanwell Moor village residents
   - 3-mile radius catchment area
   - Regular pub-goers seeking community connection
   - Mobile-first users (80% of traffic)

2. **Heathrow Travelers** (Secondary)
   - Pre-flight meals/drinks
   - Airport pickup waiting spot
   - Hotel guests seeking authentic British pub
   - International visitors searching in multiple languages

3. **Event Seekers** (Tertiary)
   - Private party organizers
   - Quiz night enthusiasts
   - Live music and entertainment seekers
   - Local groups and societies

### 4. Technical Requirements

#### 4.1 Core Technology Stack
```javascript
{
  "framework": "Next.js 14+ (App Router for SEO benefits)",
  "styling": "Tailwind CSS with custom configuration",
  "cms": "Directus/Strapi for non-technical updates + Markdown/MDX",
  "hosting": "Vercel Edge or Netlify",
  "monitoring": "Google Analytics 4 + Google Search Console + Vercel Analytics",
  "apis": {
    "events": "Existing management API",
    "reviews": "Google My Business API",
    "maps": "Google Maps Platform",
    "flights": "Heathrow flight data (optional)"
  }
}
```

#### 4.2 Performance Requirements
- PageSpeed Insights score: 95+ on mobile
- Core Web Vitals: All green
  - LCP < 2.5s (optimize hero image)
  - FID < 100ms (minimize JavaScript)
  - CLS < 0.1 (reserve space for images)
- Time to First Byte: <200ms
- Fully loaded: <3 seconds on 3G
- Offline functionality via Service Worker

### 5. Search-Driven Site Architecture

```
the-anchor.pub/
├── / (Homepage - optimized for "pub near me")
├── /near-heathrow/
│   ├── /terminal-2 (Pub near Heathrow Terminal 2)
│   ├── /terminal-3 (Pub near Heathrow Terminal 3)
│   ├── /terminal-4 (Pub near Heathrow Terminal 4)
│   └── /terminal-5 (Pub near Heathrow Terminal 5)
├── /locations/
│   ├── /staines (Staines pub, food Staines)
│   ├── /stanwell-moor (Stanwell Moor village pub)
│   └── /tw19 (Pubs in TW19)
├── /food-menu/
│   ├── /sunday-lunch (Sunday lunch near me)
│   ├── /pizza (Pizza near me, BOGOF pizza)
│   └── /menu (Food near me - full menu)
├── /drinks/ (Drink categories and prices)
├── /whats-on/
│   ├── /live-music (Live music near me)
│   ├── /quiz-night (Quiz night near Heathrow)
│   ├── /events (Events near me today)
│   └── /calendar (Real-time from API)
├── /find-us/ (Location with rich snippets)
├── /dog-friendly/ (Dog friendly pub near me)
├── /book-event/ (Private booking form)
└── /gallery/ (Photos for GMB and social proof)
```

### 6. SEO Strategy

#### 6.1 Local SEO Foundation

**Comprehensive Schema Markup:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://the-anchor.pub/#restaurant",
      "name": "The Anchor",
      "servesCuisine": ["British", "Pizza", "Pub Food"],
      "priceRange": "££",
      "acceptsReservations": true,
      "menu": "https://the-anchor.pub/food-menu",
      "hasMenu": {
        "@type": "Menu",
        "hasMenuSection": [
          {
            "@type": "MenuSection",
            "name": "Sunday Roast",
            "hasMenuItem": [...]
          }
        ]
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

**Google My Business Integration:**
- Direct links to leave reviews with schema markup
- Live opening hours sync with holiday variations
- Event posting integration
- Photo gallery sync
- Q&A monitoring and responses

#### 6.2 Technical SEO

**Meta Implementation:**
- Dynamic title tags with location keywords
- Compelling meta descriptions with CTAs
- Open Graph for social sharing
- Twitter Cards
- Multilingual support for international visitors

**Local Keywords Integration:**
- "near Heathrow" (900% YoY growth)
- "Stanwell Moor pub"
- "TW19" postcode targeting
- "Surrey pub"
- 47+ "near me" variations
- Neighboring area mentions (Staines, Poyle, Longford)

#### 6.3 Content Strategy

**Location-Based Landing Pages:**
- "Pub near Heathrow Terminal [2,3,4,5]" with journey times
- "Stanwell Moor village pub" with local history
- "Pub in Staines area" with transport links
- Dynamic content based on user location

**Service-Specific Pages:**
- "Sunday roast Stanwell Moor" with menu and prices
- "Quiz night near Heathrow" with schedule
- "Private party venue Staines" with capacity details
- "Dog friendly pub near me" with policies

**FAQ Schema for Voice Search:**
- "What time does The Anchor close?"
- "Does The Anchor allow dogs?"
- "Is The Anchor kitchen open now?"
- "How far is The Anchor from Terminal 5?"

### 7. Features & Functionality

#### 7.1 Homepage
- Hero with live opening status and weather-based messaging
- Today's events widget with schema markup
- Featured menu items with prices
- Google reviews integration with aggregate rating
- Quick booking CTAs (table/event)
- Local weather widget for beer garden
- "Near me" content blocks for SEO
- Real-time "Open Now" indicator with kitchen hours

#### 7.2 Menu System
- Filterable food menu with dietary options
- Searchable drinks database with categories
- Dietary filters (vegetarian, vegan, gluten-free)
- Price display with schema markup
- "Popular items" based on orders
- Nutritional information where available
- Photo gallery for key dishes

#### 7.3 Events System
- Calendar view with filtering options
- Individual event pages with schema
- "Add to Calendar" functionality
- Social sharing for events
- Recurring event templates
- Ticket/booking integration
- Real-time capacity updates

#### 7.4 Location/Contact
- Interactive map with multiple transport options:
  - Driving directions with real-time traffic
  - Public transport from all Heathrow terminals
  - Walking routes from nearby hotels
  - Parking information and availability
- Click-to-call phone number
- WhatsApp integration for international visitors
- Estimated journey times from key locations

#### 7.5 Booking System
- Private event inquiry form with capacity calculator
- Table booking integration
- Email/SMS confirmation system
- Calendar availability checker
- Pre-order for collection
- Special requirements handling

### 8. Mobile-First Design (80% of traffic)

#### 8.1 Critical Mobile UX
- One-tap phone calls with tracking
- GPS directions button above fold
- Persistent "Open Now" banner
- Swipeable menu cards
- Voice search optimization
- Touch-friendly interface elements
- Offline menu viewing capability

#### 8.2 Progressive Web App Features
- "Add to Home Screen" prompts for repeat visitors
- Offline content caching
- Push notifications for events (opt-in)
- Background sync for bookings
- App-like navigation

### 9. API Integration & Real-Time Data

#### 9.1 Events API Integration
- Real-time event display from management system
- 30-minute cache with automatic updates
- Schema markup for each event
- Social media cross-posting

#### 9.2 Dynamic Content Updates
- Opening hours with holiday variations
- Daily specials automation
- Menu availability status
- Real-time table availability
- Weather-based content (beer garden status)

#### 9.3 External Integrations
- Google My Business API for reviews and posts
- Weather API for garden availability
- Optional: Heathrow flight data for terminal pages
- Social media feeds

### 10. Analytics & Measurement

#### 10.1 Key Metrics
- Local search rankings tracking
- Click-through rates by keyword
- Phone calls from website
- Direction requests by source
- Event page views to bookings
- Menu interaction time
- Booking form submissions
- Review conversion rate

#### 10.2 Custom Dashboards
- Real-time "near me" rankings
- Heathrow traffic monitoring
- Weather correlation analysis
- Event attendance tracking
- Revenue attribution by channel

### 11. Launch Strategy

#### Phase 1: Core Website (Week 1-2)
- Homepage with location focus
- Basic menu pages with prices
- Location/contact with schema
- Basic event listings
- Mobile optimization

#### Phase 2: Enhanced Features (Week 3-4)
- Full event calendar system
- Review integration
- Booking forms
- Heathrow landing pages
- API integrations

#### Phase 3: Optimization (Week 5-6)
- Performance tuning
- SEO refinements
- A/B testing setup
- Analytics configuration
- Content expansion

### 12. Success Metrics

**Month 1:**
- Achieve first page rankings for "pub Stanwell Moor"
- 500+ local searches captured
- 50+ direction requests daily
- 300% increase in organic traffic

**Month 3:**
- Top 3 for all local pub searches
- 20% increase in website-driven visits
- 10+ event bookings via website
- 1,000+ Heathrow visitor captures/month

**Month 6:**
- #1 for primary keywords
- 40% of customers mention finding via Google
- Outrank all local competitors
- 5x increase in brand searches

### 13. Competitive Advantages

**vs The White Horse Longford:**
- 50x faster page load
- Mobile-first vs desktop-only
- Real-time information
- Superior schema implementation

**vs The Raising Sun Stanwell:**
- Actual website vs Facebook only
- Complete SEO dominance
- Professional presence
- Booking capabilities

**vs The Golden Cross Poyle:**
- Modern, responsive UX
- Comprehensive schema markup
- Content depth and freshness
- API-driven dynamic content

### 14. Maintenance & Ongoing Strategy

#### 14.1 Content Updates
- Weekly event updates
- Monthly menu reviews
- Quarterly SEO audits
- Annual design refresh
- Continuous performance monitoring

#### 14.2 Link Building & Citations
**Priority Citations:**
- Heathrow Airport local guides
- Staines business directory
- Surrey pub guides
- TripAdvisor optimization
- Yell.com premium listing

**Strategic Partnerships:**
- Hotel concierge programs
- Heathrow staff discount scheme
- Local business cross-promotion
- Event partnership mentions

### 15. Budget Considerations & ROI

**Development Costs:**
- One-time development cost
- Minimal ongoing hosting (~£20/month)
- No licensing fees (open source stack)
- Optional: Local SEO management service

**ROI Projections:**
- Month 1: 20+ phone calls/day, 50+ directions/day
- Month 3: 100+ event page conversions
- Month 6: Measurable revenue attribution
- Break-even: 2-3 months based on increased traffic

### 16. Accessibility & Compliance

- WCAG 2.1 AA compliance
- Cookie consent (GDPR)
- Privacy policy
- Keyboard navigation
- Screen reader optimization
- High contrast mode option
- Multi-language support for international visitors

### 17. Next Steps

1. **Immediate Actions:**
   - Confirm API endpoints and documentation
   - Gather high-quality photos for each section
   - Set up Google Search Console
   - Competitor backlink analysis

2. **Development Priority:**
   - Week 1: Core pages + comprehensive schema
   - Week 2: API integrations + dynamic content
   - Week 3: Performance optimization + PWA features
   - Week 4: Launch, monitor, and iterate

This combined PRD ensures every page, feature, and technical decision is driven by actual search demand and user behavior, maximizing ROI while creating a superior user experience that dominates local search and drives measurable business results.