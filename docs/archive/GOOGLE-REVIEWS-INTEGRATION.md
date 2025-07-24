# Google Reviews Integration

## Overview
This document describes the Google Reviews integration for The Anchor website, which uses a direct Google API connection for maximum flexibility and control.

## Current Implementation

### Architecture
1. **Direct Google Places API Integration** - Fetches reviews directly from Google
2. **Server-side API Routes** - Secure API key handling and caching
3. **Flexible Components** - Multiple layout options and filtering capabilities
4. **Mock Data Fallback** - Development/testing support when API is not configured

### Google Business Information
- Business Name: "The Anchor"
- Address: Horton Road, Stanwell Moor, Surrey TW19 6AQ
- Phone: 01753 682707
- Google Maps Short URL: https://g.page/theanchorpubsm?share
- Google Business Account ID: 3574093756936907293

## Technical Implementation

### API Integration
- **Google Places API** for basic reviews (5 most recent)
- **Google My Business API** ready for full review access
- **Caching** for performance optimization
- **Filtering** by rating, keywords, and date

### Component Structure
```
components/reviews/
├── GoogleReviews.tsx       # Main component with filtering
├── ReviewCard.tsx          # Individual review display
├── ReviewsCarousel.tsx     # Carousel layout
├── ReviewsBadge.tsx        # Compact rating badge
├── ReviewSection.tsx       # Full section wrapper
└── index.ts               # Exports

lib/google/
├── types.ts               # TypeScript interfaces
├── places-client.ts       # Google Places API client
└── review-utils.ts        # Filtering and formatting utilities
```

### API Endpoints
```
GET /api/reviews
  ?minRating=4              # Filter by minimum rating
  ?keywords=food,service    # Filter by keywords
  ?limit=10                 # Limit number of reviews
  ?sortBy=newest           # Sort order
```

## Usage Examples

### Basic Implementation
```tsx
import { GoogleReviews } from '@/components/reviews'

// Simple carousel of reviews
<GoogleReviews 
  layout="carousel"
  showTitle={true}
/>

// Grid layout with filters
<GoogleReviews 
  layout="grid"
  filter={{
    minRating: 4,
    keywords: ['food', 'sunday'],
    limit: 6
  }}
/>

// Rating badge only
<GoogleReviews 
  layout="badge"
  showTitle={false}
/>
```

### Review Section
```tsx
import { ReviewSection } from '@/components/reviews'

<ReviewSection
  title="What Our Customers Say"
  subtitle="Real reviews from Google"
  layout="carousel"
  filter={{ minRating: 4 }}
  background="gray"
/>
```

## Environment Variables

Add to `.env.local`:
```env
# Google Places API Key (required)
GOOGLE_PLACES_API_KEY=your-api-key-here

# Google Place ID (required)
GOOGLE_PLACE_ID=your-place-id-here

# Google My Business OAuth (for full access)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_BUSINESS_ACCOUNT_ID=your-account-id
GOOGLE_BUSINESS_LOCATION_ID=your-location-id
```

## Finding Your Google Place ID

Run the helper script:
```bash
node scripts/find-place-id.js
```

Or manually:
1. Visit [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Search for "The Anchor Stanwell Moor"
3. Copy the Place ID (format: ChIJ...)

## Features

### Filtering Options
- **By Rating**: Show only 4-5 star reviews
- **By Keywords**: Filter reviews mentioning specific terms
- **By Date**: Show recent reviews only
- **By Length**: Limit review text length

### Layout Options
1. **Badge**: Compact rating display
2. **Carousel**: Auto-rotating review cards
3. **Grid**: Multiple reviews in columns
4. **List**: Vertical list with full text

### Performance
- Server-side caching (1 hour)
- Stale-while-revalidate strategy
- Mock data fallback for development
- Optimized for Core Web Vitals

## Limitations

### Google Places API
- Returns only 5 most recent reviews
- No write access (can't reply to reviews)
- Rate limits apply
- Requires API key with billing

### Google My Business API
- Requires business ownership verification
- OAuth2 authentication needed
- Can access all reviews
- Allows review management

## Future Enhancements

1. **Full Google My Business Integration**
   - Access all reviews (not just 5)
   - Reply to reviews functionality
   - Review notifications

2. **Advanced Features**
   - AI-powered review summaries
   - Sentiment analysis
   - Review response templates
   - Multi-platform aggregation

3. **Analytics**
   - Review trends tracking
   - Rating history charts
   - Keyword analysis

## Maintenance

1. **Regular Updates**
   - Monitor API usage and costs
   - Update mock data periodically
   - Check for API changes

2. **Performance**
   - Review cache hit rates
   - Optimize API calls
   - Monitor loading times

3. **Content**
   - Respond to reviews promptly
   - Update filter keywords
   - Maintain high ratings