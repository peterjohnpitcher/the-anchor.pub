# Local SEO Technical Implementation Specification
*For The Anchor Pub Website - January 2025*

## Overview
This document provides detailed technical specifications for implementing the local SEO recommendations from the comprehensive audit. All specifications are based on thorough analysis of the current codebase and industry best practices.

## Priority 1: Critical Technical Fixes (Week 1)

### 1.1 H1 Tag Implementation
**Current State:** No H1 tags on any page
**Impact:** Major SEO issue affecting all rankings

#### Implementation Details:
```typescript
// components/ui/typography/PageTitle.tsx
interface PageTitleProps {
  children: React.ReactNode
  className?: string
  seo?: {
    structured?: boolean
    speakable?: boolean
  }
}

export function PageTitle({ children, className = '', seo = {} }: PageTitleProps) {
  return (
    <h1 
      className={cn(
        'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
        seo.speakable && 'speakable-content',
        className
      )}
      {...(seo.structured && { itemProp: 'name headline' })}
    >
      {children}
    </h1>
  )
}
```

**Pages to Update:**
- Homepage: "The Anchor - Pub & Restaurant Near Heathrow Airport"
- Find Us: "Find The Anchor Pub - Directions from Heathrow"
- Food Menu: "Food Menu - The Anchor Pub Restaurant"
- What's On: "Events & Entertainment at The Anchor"
- All 30+ other pages

### 1.2 Email Consistency Fix
**Current:** Mixed use of info@theanchorpub.co.uk and manager@theanchorpub.co.uk
**Solution:** Standardize to info@theanchorpub.co.uk

```typescript
// lib/constants/business-info.ts
export const BUSINESS_INFO = {
  email: 'info@theanchorpub.co.uk', // Primary contact
  managerEmail: 'manager@theanchorpub.co.uk', // Internal use only
  // ... rest of constants
}
```

## Priority 2: Google My Business API Integration (Week 1-2)

### 2.1 GMB API Setup
**Current:** Using Places API (limited to 5 reviews)
**Target:** Full GMB API with all reviews, posts, Q&A

#### Technical Requirements:
```typescript
// lib/google/gmb-api.ts
import { google } from 'googleapis'

const mybusiness = google.mybusinessbusinessinformation('v1')

export class GMBService {
  private auth: any
  
  constructor() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: [
        'https://www.googleapis.com/auth/business.manage'
      ]
    })
  }
  
  async getReviews(limit = 50) {
    const response = await mybusiness.accounts.locations.reviews.list({
      parent: `accounts/${process.env.GMB_ACCOUNT_ID}/locations/${process.env.GMB_LOCATION_ID}`,
      pageSize: limit,
      auth: this.auth
    })
    return response.data.reviews
  }
  
  async createPost(post: GMBPost) {
    // Implementation for automated posts
  }
}
```

#### Environment Variables:
```env
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
GMB_ACCOUNT_ID=123456789
GMB_LOCATION_ID=987654321
GMB_API_KEY=your-api-key
```

### 2.2 Review Display Component
```typescript
// components/reviews/GMBReviews.tsx
export async function GMBReviews() {
  const reviews = await gmb.getReviews(20)
  
  return (
    <div className="reviews-container" itemScope itemType="https://schema.org/Review">
      {reviews.map(review => (
        <ReviewCard key={review.reviewId} review={review} />
      ))}
    </div>
  )
}
```

## Priority 3: Schema Enhancements (Week 2)

### 3.1 ParkingFacility Schema
```typescript
// lib/schemas/parking.ts
export const parkingSchema = {
  "@type": "ParkingFacility",
  "@id": "https://theanchorpub.co.uk/#parking",
  "name": "The Anchor Free Customer Parking",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "15 Church Road",
    "addressLocality": "Shepperton",
    "postalCode": "TW17 9JT"
  },
  "openingHours": "Mo-Su 00:00-24:00",
  "priceCurrency": "GBP",
  "price": "0",
  "numberOfParkingSpaces": "50",
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free Parking",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification", 
      "name": "CCTV Monitored",
      "value": true
    }
  ]
}
```

### 3.2 Speakable Schema Deployment
```typescript
// components/voice/SpeakableContent.tsx
export function SpeakableContent({ 
  children, 
  selector,
  priority = 'high' 
}: SpeakableProps) {
  return (
    <div 
      className={cn('speakable-content', `speakable-${priority}`)}
      data-speakable-selector={selector}
    >
      {children}
    </div>
  )
}

// Usage in pages
<SpeakableContent selector="opening-hours">
  <p>We're open Monday to Thursday 11am to 11pm, 
     Friday and Saturday 11am to midnight, 
     and Sunday noon to 10:30pm</p>
</SpeakableContent>
```

## Priority 4: Citation Tracking System (Week 2-3)

### 4.1 Database Schema
```sql
-- PostgreSQL schema for citation tracking
CREATE TABLE citations (
  id SERIAL PRIMARY KEY,
  directory_name VARCHAR(255) NOT NULL,
  directory_url VARCHAR(500),
  listing_url VARCHAR(500),
  status ENUM('pending', 'submitted', 'live', 'needs_update'),
  nap_accuracy DECIMAL(3,2),
  last_checked TIMESTAMP,
  notes TEXT
);

CREATE TABLE citation_checks (
  id SERIAL PRIMARY KEY,
  citation_id INTEGER REFERENCES citations(id),
  check_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name_match BOOLEAN,
  address_match BOOLEAN,
  phone_match BOOLEAN,
  website_match BOOLEAN,
  hours_match BOOLEAN
);
```

### 4.2 Citation Monitor Service
```typescript
// services/citation-monitor.ts
export class CitationMonitor {
  async checkCitation(citation: Citation) {
    const page = await fetch(citation.listing_url)
    const html = await page.text()
    
    return {
      nameMatch: html.includes('The Anchor'),
      addressMatch: html.includes('15 Church Road'),
      phoneMatch: html.includes('01932 782997'),
      websiteMatch: html.includes('theanchorpub.co.uk')
    }
  }
  
  async generateReport() {
    const citations = await db.citations.findAll()
    const results = await Promise.all(
      citations.map(c => this.checkCitation(c))
    )
    return this.formatReport(results)
  }
}
```

## Priority 5: Voice Search Implementation (Week 3)

### 5.1 Voice-Optimized Components
```typescript
// components/voice/VoiceAnswer.tsx
export function VoiceAnswer({ 
  question, 
  answer,
  schema = true 
}: VoiceAnswerProps) {
  return (
    <div 
      className="voice-answer"
      itemScope={schema}
      itemType={schema ? "https://schema.org/Question" : undefined}
    >
      {schema && (
        <>
          <meta itemProp="name" content={question} />
          <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
            <div itemProp="text" className="speakable-content">
              {answer}
            </div>
          </div>
        </>
      )}
      {!schema && <p className="speakable-content">{answer}</p>}
    </div>
  )
}
```

### 5.2 Voice Search Landing Pages
```typescript
// app/voice/[query]/page.tsx
const voiceQueries = {
  'opening-hours': {
    title: 'What time is The Anchor open?',
    answer: 'The Anchor is open Monday to Thursday from 11am to 11pm...'
  },
  'parking': {
    title: 'Does The Anchor have parking?',
    answer: 'Yes, The Anchor offers free customer parking with 20 spaces...'
  }
  // ... more queries
}
```

## Priority 6: Competitor Analysis Pages (Week 3-4)

### 6.1 Comparison Page Template
```typescript
// app/compare/[competitor]/page.tsx
export default function ComparisonPage({ params }) {
  const comparison = getComparison(params.competitor)
  
  return (
    <ComparisonTable
      ourVenue={anchorData}
      competitor={comparison}
      features={['parking', 'prices', 'atmosphere', 'food', 'location']}
    />
  )
}
```

## Development Timeline & Resources

### Week 1: Foundation (40 hours)
- H1 implementation across all pages (8 hours)
- Email consistency fixes (2 hours)
- GMB API setup and authentication (8 hours)
- Initial schema additions (8 hours)
- Testing and QA (14 hours)

### Week 2: Core Features (40 hours)
- GMB review integration (12 hours)
- Citation tracking database (8 hours)
- Speakable schema deployment (10 hours)
- Mobile performance optimization (10 hours)

### Week 3: Advanced Features (40 hours)
- Voice search components (12 hours)
- Citation monitoring automation (10 hours)
- Competitor analysis pages (12 hours)
- Integration testing (6 hours)

### Week 4: Polish & Launch (40 hours)
- Performance optimization (10 hours)
- Final testing across all pages (15 hours)
- Documentation (5 hours)
- Deployment and monitoring setup (10 hours)

## Total Resources Required
- **Development Time:** 160 hours (4 weeks full-time)
- **External Services:**
  - Google My Business API access
  - PostgreSQL database for citations
  - Monitoring tools (e.g., Sentry)
- **Ongoing Maintenance:** 5 hours/week

## Success Metrics
- **Technical:**
  - All pages have unique H1 tags
  - 100% NAP consistency
  - Schema validation passes
  - Page speed < 3 seconds
  
- **Business:**
  - +40% local pack visibility (3 months)
  - +25% phone calls from search (2 months)
  - #1 ranking for "pub near Heathrow" (6 months)
  - +50% GMB engagement (3 months)

## Risk Mitigation
1. **GMB API Approval:** Apply early, have fallback to Places API
2. **Performance Impact:** Implement lazy loading for reviews
3. **Schema Conflicts:** Test thoroughly with Google's tools
4. **Voice Search Adoption:** A/B test implementations

## Next Steps
1. Approve technical approach and timeline
2. Set up GMB API access
3. Create development branch
4. Begin Week 1 implementation
5. Schedule weekly progress reviews