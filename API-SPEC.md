# API Specifications for The Anchor Events System

## Overview
This document outlines the API requirements for maximum SEO impact through proper Event schema implementation and real-time data feeds.

## 1. Events API Endpoints

### GET /api/events
Returns all upcoming events with full schema.org compliance.

**Response Structure:**
```json
{
  "events": [
    {
      "id": "unique-event-id",
      "@type": "Event",
      "name": "Tuesday Quiz Night",
      "description": "Join us for our famous pub quiz with cash prizes",
      "startDate": "2024-01-30T19:00:00+00:00",
      "endDate": "2024-01-30T22:00:00+00:00",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "The Anchor Pub",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Horton Road",
          "addressLocality": "Stanwell Moor",
          "addressRegion": "Surrey",
          "postalCode": "TW19 6AQ",
          "addressCountry": "GB"
        }
      },
      "image": [
        "https://api.the-anchor.pub/images/quiz-night-1x1.jpg",
        "https://api.the-anchor.pub/images/quiz-night-4x3.jpg",
        "https://api.the-anchor.pub/images/quiz-night-16x9.jpg"
      ],
      "performer": {
        "@type": "Person",
        "name": "Quiz Master Dave"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://the-anchor.pub/whats-on/quiz-night",
        "price": "0",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01T00:00:00+00:00"
      },
      "organizer": {
        "@type": "Organization",
        "name": "The Anchor",
        "url": "https://the-anchor.pub"
      },
      "isAccessibleForFree": true,
      "maximumAttendeeCapacity": 100,
      "remainingAttendeeCapacity": 45
    }
  ],
  "meta": {
    "total": 25,
    "lastUpdated": "2024-01-24T10:00:00Z"
  }
}
```

### GET /api/events/today
Returns today's events only (for "events near me today" searches)

### GET /api/events/recurring
Returns recurring event templates

### GET /api/events/{id}
Returns single event with extended details

### POST /api/events/rsvp
For future booking functionality

## 2. Menu/Food API Endpoints

### GET /api/menu
```json
{
  "menu": {
    "@type": "Menu",
    "name": "The Anchor Menu",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Stone Baked Pizzas",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Margherita Pizza",
            "description": "Classic tomato base with mozzarella",
            "offers": {
              "@type": "Offer",
              "price": "12.95",
              "priceCurrency": "GBP"
            },
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": "750 calories"
            },
            "suitableForDiet": [
              "https://schema.org/VegetarianDiet"
            ]
          }
        ]
      }
    ],
    "lastUpdated": "2024-01-24T10:00:00Z"
  }
}
```

### GET /api/menu/specials
Daily specials with "availableAtOrFrom" and "availableThrough" dates

### GET /api/menu/dietary/{type}
Filtered menu items (vegetarian, vegan, gluten-free)

## 3. Business Information API

### GET /api/business/hours
```json
{
  "regularHours": {
    "monday": { "opens": "16:00", "closes": "22:00", "kitchen": null },
    "tuesday": { "opens": "16:00", "closes": "22:00", "kitchen": { "opens": "18:00", "closes": "21:00" }}
  },
  "specialHours": [
    {
      "date": "2024-12-25",
      "status": "closed",
      "note": "Christmas Day"
    }
  ],
  "currentStatus": {
    "isOpen": true,
    "kitchenOpen": true,
    "closesIn": "3 hours 45 minutes"
  }
}
```

### GET /api/business/amenities
```json
{
  "amenities": [
    { "type": "parking", "available": true, "details": "Free parking for 50 cars" },
    { "type": "wifi", "available": true, "details": "Free WiFi - password at bar" },
    { "type": "dogFriendly", "available": true, "details": "Dogs welcome in bar area and garden" },
    { "type": "wheelchairAccess", "available": true },
    { "type": "beerGarden", "available": true, "capacity": 100, "heatingAvailable": true }
  ]
}
```

## 4. External Data Feeds Strategy

### Essential External Feeds for SEO:

1. **Google My Business API**
   - Opening hours (sync every 30 min)
   - Reviews (display with schema)
   - Posts (push events automatically)
   - Q&A section
   - Photos

2. **Weather API Integration**
   ```json
   GET /api/weather/garden-status
   {
     "gardenOpen": true,
     "temperature": "18°C",
     "conditions": "Sunny",
     "sunset": "20:45",
     "heatingOn": false,
     "specialMessage": "Perfect weather for our beer garden!"
   }
   ```

3. **Flight Information API (Heathrow)**
   ```json
   GET /api/flights/delays
   {
     "terminal2": { "averageDelay": 0, "status": "normal" },
     "terminal3": { "averageDelay": 45, "status": "delays" },
     "lastUpdated": "2024-01-24T10:00:00Z"
   }
   ```

4. **Local Events Feed (Council/Community)**
   - Pull local area events
   - Show "before/after" positioning
   - "Watch the match here" opportunities

5. **Traffic/Transport APIs**
   ```json
   GET /api/transport/status
   {
     "heathrowExpress": "Good Service",
     "m25Status": "Slow J13-J14",
     "localBuses": "On Time",
     "taxiWaitTime": "5-10 minutes"
   }
   ```

6. **Social Media Feeds**
   - Instagram latest posts (visual content)
   - Facebook events (auto-import)
   - Google Posts API (push updates)

7. **Review Aggregation API**
   ```json
   GET /api/reviews/aggregate
   {
     "google": { "rating": 4.5, "count": 234 },
     "tripadvisor": { "rating": 4.0, "count": 89 },
     "facebook": { "rating": 4.6, "count": 156 },
     "aggregate": { "rating": 4.4, "count": 479 }
   }
   ```

## 5. Webhook Requirements

```json
POST /webhooks/content-update
{
  "type": "menu_change|event_update|hours_change",
  "data": {},
  "timestamp": "2024-01-24T10:00:00Z"
}
```

This triggers:
- Sitemap regeneration
- Google indexing API ping
- Schema markup updates
- Cache invalidation

## 6. Performance Requirements

- All endpoints must respond < 200ms
- Support HTTP/2
- Include ETag headers for caching
- CORS enabled for the-anchor.pub domain
- Rate limiting: 1000 requests/hour per IP

## 7. SEO-Specific Features

### Structured Data Validation
All responses must pass Google's Rich Results Test

### Event Ticketing Integration
```json
"offers": {
  "@type": "Offer",
  "url": "https://the-anchor.pub/book/event-id",
  "availability": "https://schema.org/InStock",
  "inventoryLevel": {
    "@type": "QuantitativeValue",
    "value": 45
  }
}
```

### Multi-format Image Requirements
- 1:1 ratio (Google Business Profile)
- 4:3 ratio (Search results)
- 16:9 ratio (Event cards)
- WebP format with JPG fallback

## 8. Implementation Priority

1. **Phase 1**: Events API with full schema
2. **Phase 2**: Business hours/status API  
3. **Phase 3**: Menu API with dietary filters
4. **Phase 4**: External integrations (GMB, Weather)
5. **Phase 5**: Advanced features (flight info, traffic)