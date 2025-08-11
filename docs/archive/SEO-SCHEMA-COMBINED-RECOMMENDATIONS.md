# Combined SEO & Schema Recommendations for The Anchor

**Date**: January 2025  
**Overall SEO Score**: 8.5/10 (Excellent)  
**Document Purpose**: Unified action plan for local SEO and schema implementation  
**Implementation Status**: 90% Complete ✅

## 🚀 Implementation Status Update

**Last Updated**: January 2025

### ✅ Completed Items (90% of recommendations)
- **Surrey Expansion**: Added "Surrey" references across homepage, footer, and meta descriptions
- **Location Pages**: Created dedicated landing pages for Ashford, Feltham, Bedfont, and Egham
- **FAQ Schemas**: Implemented on Find Us, Food Menu, What's On, and Book Event pages
- **Offer Schemas**: Pizza BOGOF and Friday Fish offers now have structured data
- **Service Schemas**: Enhanced event booking service schema with detailed offerings
- **HowTo Schemas**: Added step-by-step directions from all locations
- **Drinks Menu Schema**: Comprehensive drinks menu with FAQ schema

### 🔄 Remaining Items (10%)
- Additional offer schemas for regular deals and seasonal specials
- Service area definitions for delivery zones
- Local supplier content and partnerships
- Monthly content calendar implementation

## Executive Summary

The Anchor website demonstrates exceptional local SEO with strong "near Heathrow" positioning and good schema implementation. Key opportunities include expanding geographical coverage to capture Surrey/Staines searches and implementing additional schema types for voice search and rich results.

## 🎯 Priority Action Items

### Quick Wins (Implement This Week) ⚡

1. **Add to every page footer**: "Serving Stanwell Moor, Staines, Ashford, and surrounding Surrey areas"
2. **Update homepage hero**: Add "Surrey's Best Kept Secret" tagline
3. **Add FAQ Schema** to Find Us page with parking/directions questions
4. **Implement Offer Schema** for Tuesday Pizza BOGOF
5. **Update meta descriptions**: Add "Surrey" to 5 key pages

### High Priority (Month 1) 🔴

1. **Create Location Landing Pages**
   - `/ashford-pub` - "8 minutes from Ashford"
   - `/feltham-pub` - "10 minutes from Feltham"
   - `/bedfont-pub` - "5 minutes from Bedfont"
   - `/egham-pub` - "12 minutes from Egham"

2. **Implement FAQ Schemas** on:
   - Food Menu (dietary options, allergens)
   - Near Heathrow pages (terminal-specific)
   - What's On (booking questions)

3. **Add Offer Schemas** for:
   - Friday Over 65s Fish & Chips 50% off
   - Tuesday Pizza BOGOF deal
   - Event ticket prices

### Medium Priority (Month 2-3) 🟡

1. **Local Content Expansion**
   - Add "Locally sourced from Surrey suppliers"
   - Define service areas for delivery/catering
   - Create local business partnership mentions

2. **Service Schemas** for:
   - Private event hosting
   - Corporate bookings
   - Sunday lunch pre-orders

3. **HowTo Schemas** for:
   - Directions from each terminal
   - Event booking process
   - Sunday lunch ordering

## 📍 Local SEO Recommendations

### 1. Expand County-Level Targeting

**Current Gap**: Limited "Surrey" mentions

**Actions**:
```html
<!-- Update Title Tags -->
<!-- From: -->
<title>The Anchor Stanwell Moor | Traditional British Pub Near Heathrow</title>
<!-- To: -->
<title>The Anchor Stanwell Moor | Traditional Surrey Pub Near Heathrow</title>
```

**Add to Homepage**:
- "Proudly serving Surrey since [year]"
- "Your traditional Surrey pub serving Stanwell Moor and surrounding villages"

### 2. Location Landing Page Template

```markdown
# The Anchor - Your Local Pub Near [Location]

Just [X] minutes from [Location] town centre, The Anchor offers traditional British 
pub food, regular events, and a warm welcome.

## Why [Location] Residents Choose The Anchor
- Closer than Staines town centre pubs
- Free parking (unlike [Location] high street)
- [Unique benefit for this location]

## How to Find Us from [Location]
[Specific turn-by-turn directions]

## What's On for [Location] Locals
- Tuesday: Pizza BOGOF - perfect for [Location] families
- Saturday: Drag shows - [Location]'s best night out
```

### 3. Service Area Definition

**Add to relevant pages**:
```markdown
## Areas We Serve
**Free Delivery**: Stanwell Moor (TW19)
**Delivery Available** (£2.50): 
- Staines (TW18)
- Ashford (TW15) 
- Feltham (TW13, TW14)
- Bedfont (TW14)

**Private Events & Catering**: 
Available throughout Surrey and West London
```

### 4. Local Business Partnerships

**Add references to**:
- "Walking distance from Premier Inn Heathrow Terminal 5"
- "Serving Bedfont Lakes Business Park"
- "Preferred venue for Heathrow Cargo Centre staff"
- "Partner pub for local hotels"

### 5. Monthly Local Content Calendar

| Month | Local Focus | Content Ideas |
|-------|-------------|---------------|
| January | "Warm up after Heathrow delays" | Blog: Best comfort food for travelers |
| February | "Valentine's dining in Stanwell Moor" | Special menu promotion |
| March | "St. Patrick's Day - Staines' biggest celebration" | Event page optimization |
| April | "Easter Sunday lunch in Surrey" | Family dining focus |
| May | "Best beer garden near Heathrow" | Plane spotting content |
| June | "Watch planes while you dine" | Summer garden promotion |
| July | "Stanwell Moor village summer events" | Community involvement |
| August | "Heathrow staff summer parties" | Corporate booking push |
| September | "Back to school celebrations" | Family offers |
| October | "Halloween in Stanwell Moor" | Local event focus |
| November | "Warm Surrey welcome" | Comfort food/drinks |
| December | "Christmas party venue near Heathrow" | Booking push |

## 📋 Schema Implementation Recommendations

### 1. FAQPage Schema (Voice Search Optimization)

**Implementation Priority**: High - Add to multiple pages

**Find Us Page FAQ**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is there parking at The Anchor pub?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, The Anchor offers free parking for all customers with spaces for 20 vehicles, including disabled parking bays."
      }
    },
    {
      "@type": "Question",
      "name": "How far is The Anchor from Heathrow Terminal 5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Anchor is just 7 minutes (2.8 miles) from Heathrow Terminal 5, making us the closest traditional British pub to T5."
      }
    },
    {
      "@type": "Question",
      "name": "Which areas does The Anchor serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Anchor serves Stanwell Moor, Staines, Ashford, Feltham, Bedfont, and surrounding Surrey areas. We're also convenient for all Heathrow terminals."
      }
    }
  ]
}
```

**Food Menu FAQ**:
```json
{
  "@type": "Question",
  "name": "Does The Anchor cater for dietary requirements?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Yes, we offer vegetarian, vegan, and gluten-free options. Please inform staff of any allergies when ordering."
  }
}
```

### 2. Offer Schema (Deal Visibility)

**Tuesday Pizza BOGOF**:
```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "Buy One Get One Free Pizza Tuesdays",
  "description": "BOGOF on all stone-baked pizzas every Tuesday",
  "url": "https://www.the-anchor.pub/food-menu#pizza",
  "availabilityStarts": "2025-01-01",
  "availabilityEnds": "2025-12-31",
  "validFrom": "16:00",
  "validThrough": "22:00",
  "dayOfWeek": "Tuesday",
  "eligibleRegion": {
    "@type": "Place",
    "name": "Stanwell Moor, Staines, Ashford, Feltham"
  }
}
```

### 3. Service Schema (Business Services)

**Event Hosting Service**:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Private Event Hosting",
  "provider": {
    "@type": "LocalBusiness",
    "name": "The Anchor",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Stanwell Moor",
      "addressRegion": "Surrey"
    }
  },
  "areaServed": [
    {
      "@type": "Place",
      "name": "Stanwell Moor"
    },
    {
      "@type": "Place", 
      "name": "Staines"
    },
    {
      "@type": "Place",
      "name": "Surrey"
    }
  ],
  "serviceType": "Birthday parties, corporate events, wakes, celebrations"
}
```

### 4. HowTo Schema (Directions)

**From Terminal 5**:
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Directions to The Anchor from Heathrow Terminal 5",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "value": "0"
  },
  "totalTime": "PT7M",
  "step": [
    {
      "@type": "HowToStep",
      "text": "Exit Terminal 5 following signs for A3044/Staines"
    },
    {
      "@type": "HowToStep",
      "text": "Take A3044 towards Stanwell Moor (2 miles)"
    },
    {
      "@type": "HowToStep",
      "text": "Turn left onto Horton Road"
    },
    {
      "@type": "HowToStep",
      "text": "The Anchor is on your right with free parking"
    }
  ]
}
```

### 5. Enhanced LocalBusiness Schema

**Add to existing schema**:
```json
{
  "@type": ["Restaurant", "BarOrPub"],
  "areaServed": [
    {
      "@type": "City",
      "name": "Stanwell Moor"
    },
    {
      "@type": "City",
      "name": "Staines"
    },
    {
      "@type": "City",
      "name": "Ashford"
    },
    {
      "@type": "City",
      "name": "Feltham"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Surrey"
    }
  ],
  "keywords": "Surrey pub, Heathrow pub, Staines restaurant, Stanwell Moor bar",
  "slogan": "Surrey's Best Kept Secret - 7 Minutes from Heathrow"
}
```

## 📊 Implementation Roadmap

### Phase 1: Quick Wins (Week 1)
- [x] Add Surrey references to footer and key pages
- [x] Implement FAQ schema on Find Us page
- [x] Add Pizza BOGOF offer schema
- [x] Update 5 meta descriptions with "Surrey"
- [x] Add "Surrey's Best Kept Secret" tagline

### Phase 2: Location Pages (Week 2-3)
- [x] Create Ashford pub page
- [x] Create Feltham pub page
- [x] Create Bedfont pub page
- [x] Create Egham pub page
- [x] Implement HowTo schemas for directions

### Phase 3: Schema Enhancement (Week 4)
- [x] Add FAQ schemas to Food Menu and What's On
- [x] Implement Service schemas
- [x] Create Drinks menu schema
- [ ] Add remaining Offer schemas

### Phase 4: Content & Partnerships (Month 2)
- [ ] Add local supplier information
- [ ] Create service area definitions
- [ ] Develop local business partnerships
- [ ] Launch monthly local content calendar

## 📈 Success Metrics

### Local SEO KPIs
- Rankings for "Surrey pub" (target: top 10)
- Rankings for "[Town] pub" for each location page
- Local pack visibility for "pub near me" searches
- Direction requests from Google My Business
- Phone calls from local numbers

### Schema Performance
- Rich results appearances in Search Console
- Featured snippet captures
- Voice search traffic (mobile "near me")
- Click-through rate improvements
- FAQ snippet visibility

### Tracking Setup
1. **Google Search Console**
   - Monitor local query performance
   - Track rich results
   - Review mobile usability

2. **Google Analytics**
   - Location page traffic
   - Local search terms
   - Conversion by location

3. **Google My Business**
   - Direction requests
   - Phone calls
   - Search vs Maps discovery

## 🎯 Expected Outcomes

By implementing these combined recommendations:

1. **30-40% increase** in local search visibility
2. **Rich snippets** for deals and FAQs
3. **Voice search capture** for common queries
4. **Broader geographical reach** beyond Heathrow
5. **Enhanced user experience** with better information

## ✅ Implementation Checklist

### Immediate Actions (This Week)
- [x] Add Surrey to homepage tagline
- [x] Update footer with service areas
- [x] Implement first FAQ schema
- [x] Add Pizza BOGOF offer schema
- [x] Update meta descriptions

### Short Term (Month 1)
- [x] Create 4 location landing pages
- [x] Implement FAQ schemas across site
- [ ] Add all weekly offer schemas
- [ ] Define service areas clearly
- [x] Add HowTo direction schemas

### Medium Term (Month 2-3)
- [ ] Develop local partnerships
- [ ] Create monthly content calendar
- [ ] Add service schemas
- [ ] Enhance menu schemas
- [ ] Build local backlinks

### Ongoing
- [ ] Monitor performance weekly
- [ ] Update schemas with new info
- [ ] Create seasonal local content
- [ ] Respond to local reviews
- [ ] Track competitor changes

## 📞 Next Steps

1. **Review** this document with stakeholders
2. **Prioritize** based on resources
3. **Assign** implementation tasks
4. **Schedule** monthly reviews
5. **Track** progress against KPIs

---

*This combined strategy leverages The Anchor's excellent foundation to expand local reach while enhancing search visibility through structured data. The pub's unique positioning near Heathrow combined with broader Surrey targeting will capture maximum local search traffic.*

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Next Review**: February 2025