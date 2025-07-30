# Schema.org Implementation Guide for The Anchor

**Last Updated**: January 2025  
**Priority**: High - Schema markup directly impacts search visibility and rich results

## Overview

This guide outlines the current schema implementation and provides recommendations for additional schemas that will enhance The Anchor's search presence, particularly for local searches and voice queries.

## Current Schema Implementation ✅

### Global Schemas (All Pages)
- **Organization** - Basic business information
- **LocalBusiness** (Restaurant & BarOrPub) - NAP, hours, amenities
- **WebSite** - Site structure and search capabilities

### Page-Specific Schemas
| Page | Current Schemas | Status |
|------|----------------|---------|
| Homepage | FAQ, Breadcrumb | ✅ Good |
| Food Menu | Menu, MenuSection, MenuItem | ✅ Good |
| Sunday Lunch | Restaurant, Menu | ✅ Good |
| What's On | EventSeries, Event | ✅ Good |
| Find Us | Place | ⚠️ Basic |
| Drinks | None | ❌ Missing |
| Near Heathrow | Basic | ⚠️ Needs enhancement |
| Book Event | None | ❌ Missing |

## Priority Schema Additions 🎯

### 1. **FAQPage Schema** (High Priority)
Voice search optimization and featured snippets opportunity.

#### Implementation Locations:
- **Find Us Page** (`/find-us`)
- **Food Menu** (`/food-menu`)
- **What's On** (`/whats-on`)
- **Near Heathrow Pages** (`/near-heathrow/*`)

#### Example Implementation:
```typescript
const findUsFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is there parking at The Anchor pub?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, The Anchor offers free parking for all customers. Our car park has spaces for approximately 50 vehicles, including disabled parking bays near the entrance."
      }
    },
    {
      "@type": "Question",
      "name": "How far is The Anchor from Heathrow Terminal 5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Anchor is just 7 minutes (2.8 miles) from Heathrow Terminal 5. We're the closest traditional British pub to T5."
      }
    },
    {
      "@type": "Question",
      "name": "Is The Anchor wheelchair accessible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Anchor has a wheelchair ramp available at the back door for step-free access to the main areas. Please note that we do not currently have accessible toilet facilities."
      }
    }
  ]
}
```

### 2. **Offer/SpecialOffer Schema** (High Priority)
Highlight deals in search results.

#### Key Offers to Schema:
- Tuesday Pizza BOGOF
- Friday Over 65s Fish & Chips 50% off
- Double Up spirits offer (permanent)
- Event ticket prices

#### Example Implementation:
```typescript
const pizzaBOGOF = {
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "Buy One Get One Free Pizza",
  "description": "BOGOF on all stone-baked pizzas every Tuesday at The Anchor",
  "url": "https://www.the-anchor.pub/food-menu#pizza",
  "priceCurrency": "GBP",
  "eligibleRegion": {
    "@type": "Place",
    "address": "Stanwell Moor, Surrey"
  },
  "availabilityStarts": "2025-01-01",
  "availabilityEnds": "2025-12-31",
  "validFrom": "11:00",
  "validThrough": "22:00",
  "dayOfWeek": "https://schema.org/Tuesday",
  "eligibleTransactionVolume": {
    "@type": "PriceSpecification",
    "description": "Dine-in and takeaway"
  }
}
```

### 3. **Service Schema** (Medium Priority)
For pub services beyond food/drink.

#### Services to Schema:
- Private event hosting
- Corporate bookings
- Wake/memorial services
- Sunday lunch pre-orders

#### Example Implementation:
```typescript
const eventHostingService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Private Event Hosting",
  "provider": {
    "@type": "LocalBusiness",
    "name": "The Anchor"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Stanwell Moor and surrounding areas"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Event Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Birthday Party Package"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Corporate Event Package"
        }
      }
    ]
  }
}
```

### 4. **HowTo Schema** (Medium Priority)
Step-by-step directions from key locations.

#### Implementation for:
- Directions from each Heathrow terminal
- Directions from Staines
- How to book events
- How to pre-order Sunday lunch

#### Example Implementation:
```typescript
const directionsFromT5 = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to get to The Anchor from Heathrow Terminal 5",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "GBP",
    "value": "0"
  },
  "totalTime": "PT7M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Exit Terminal 5",
      "text": "Exit Terminal 5 and follow signs for A3044/Staines"
    },
    {
      "@type": "HowToStep",
      "name": "Join A3044",
      "text": "Take A3044 towards Staines/Stanwell Moor"
    },
    {
      "@type": "HowToStep",
      "name": "Turn onto Horton Road",
      "text": "After 2 miles, turn left onto Horton Road"
    },
    {
      "@type": "HowToStep",
      "name": "Arrive at The Anchor",
      "text": "The Anchor is on your right with free parking"
    }
  ]
}
```

### 5. **SpeakableSpecification** (Voice Search)
Optimize for voice assistants.

#### Add to key pages:
```typescript
const speakable = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".opening-hours",
      ".contact-info",
      ".location-info",
      ".today-special"
    ]
  }
}
```

## Schema Implementation by Page 📄

### Homepage Enhancements
```typescript
// Add to existing schemas
const specialAnnouncement = {
  "@context": "https://schema.org",
  "@type": "SpecialAnnouncement",
  "name": "Tuesday Pizza BOGOF",
  "text": "Every Tuesday - Buy One Get One Free on all pizzas!",
  "datePosted": "2025-01-01",
  "expires": "2025-12-31",
  "category": "https://www.wikidata.org/wiki/Q11060274" // food/beverage offer
}

const featuredEvents = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Upcoming Events at The Anchor",
  "itemListElement": [
    // Dynamic event list
  ]
}
```

### Food Menu Enhancements
```typescript
// Enhanced MenuItem with nutrition
const menuItemWithNutrition = {
  "@type": "MenuItem",
  "name": "Classic Beef Burger",
  "description": "8oz British beef patty with lettuce, tomato, and house sauce",
  "offers": {
    "@type": "Offer",
    "price": "14.95",
    "priceCurrency": "GBP"
  },
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "650 cal",
    "fatContent": "32 g",
    "proteinContent": "45 g"
  },
  "suitableForDiet": [
    "https://schema.org/GlutenFreeDiet" // with GF bun option
  ]
}
```

### Drinks Menu Schema (Currently Missing)
```typescript
const drinksMenuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "name": "Drinks Menu",
  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Draught Beers",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "London Pride",
          "offers": {
            "@type": "Offer",
            "price": "5.20",
            "priceCurrency": "GBP"
          }
        }
      ]
    },
    {
      "@type": "MenuSection", 
      "name": "Cocktails",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Espresso Martini",
          "description": "Vodka, coffee liqueur, fresh espresso",
          "offers": {
            "@type": "Offer",
            "price": "9.50",
            "priceCurrency": "GBP"
          }
        }
      ]
    }
  ]
}
```

### Events Enhancement
```typescript
// Add to individual event pages
const eventReservation = {
  "@context": "https://schema.org",
  "@type": "EventReservation",
  "reservationFor": {
    "@type": "Event",
    "@id": "#event"
  },
  "reservationStatus": "https://schema.org/ReservationConfirmed",
  "bookingTime": "2025-01-15T10:00:00Z",
  "modifiedTime": "2025-01-15T10:00:00Z"
}
```

## Voice Search Optimization FAQ Templates 🗣️

### Common Voice Queries to Target:

#### Operating Hours
```json
{
  "@type": "Question",
  "name": "What time does The Anchor open?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "The Anchor opens at 4pm Tuesday-Thursday, 4pm Friday, 12pm Saturday-Sunday. Closed Mondays."
  }
}
```

#### Location/Directions
```json
{
  "@type": "Question",
  "name": "Where is The Anchor pub located?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "The Anchor is located on Horton Road in Stanwell Moor, Surrey TW19 6AQ, just 7 minutes from Heathrow Terminal 5."
  }
}
```

#### Services/Offerings
```json
{
  "@type": "Question",
  "name": "Does The Anchor serve food?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Yes, The Anchor serves traditional British pub food including Sunday roasts, stone-baked pizzas, fish & chips, and more. Kitchen hours vary by day."
  }
}
```

## Implementation Priority Matrix

| Schema Type | Priority | Effort | Impact | Pages |
|------------|----------|---------|---------|--------|
| FAQPage | High | Low | High | Find Us, Food Menu, Near Heathrow |
| Offer | High | Low | High | Homepage, Food Menu |
| Service | Medium | Medium | Medium | Book Event |
| HowTo | Medium | Medium | High | Find Us, Near Heathrow |
| Menu (Drinks) | High | Low | Medium | Drinks page |
| SpeakableSpecification | Low | Low | Medium | All pages |
| NutritionInformation | Low | High | Low | Food Menu items |

## Technical Implementation Tips

### 1. **Create Schema Templates**
```typescript
// lib/schemas/faq-templates.ts
export const createFAQSchema = (questions: FAQItem[]) => ({
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
})
```

### 2. **Dynamic Schema Generation**
```typescript
// For events from API
export const generateEventSchema = (event: Event) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.name,
  "startDate": event.startDate,
  "location": {
    "@type": "Place",
    "name": "The Anchor",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Horton Road",
      "addressLocality": "Stanwell Moor"
    }
  },
  "offers": event.offers ? {
    "@type": "Offer",
    "price": event.offers.price,
    "priceCurrency": event.offers.priceCurrency,
    "availability": event.offers.availability
  } : undefined
})
```

### 3. **Schema Validation**
- Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
- Validate with [Schema.org Validator](https://validator.schema.org/)
- Monitor in Google Search Console

### 4. **Multiple Schema Implementation**
```typescript
// Combine multiple schemas on one page
<script type="application/ld+json">
{JSON.stringify([
  organizationSchema,
  localBusinessSchema,
  faqSchema,
  offerSchema
])}
</script>
```

## Measurement & Monitoring 📊

### Track Performance:
1. **Search Console**
   - Monitor rich results appearance
   - Track schema errors/warnings
   - Review enhancement reports

2. **Analytics**
   - Featured snippet clicks
   - Voice search traffic (mobile)
   - "Near me" query performance

3. **SERP Features**
   - Knowledge panel updates
   - Rich snippets display
   - FAQ featured snippets

## Next Steps

1. **Week 1**: Implement FAQ schemas on high-traffic pages
2. **Week 2**: Add Offer schemas for weekly deals
3. **Week 3**: Create HowTo schemas for directions
4. **Week 4**: Add Service schemas for events/bookings
5. **Ongoing**: Monitor and optimize based on performance

## Resources

- [Schema.org Documentation](https://schema.org/)
- [Google's Structured Data Guidelines](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data)
- [Rich Results Test Tool](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

---

*Remember: Schema markup is not just about rankings—it's about providing better information to search engines so they can present your content more effectively to users.*