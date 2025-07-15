# Schema Markup Implementation Status

Last Updated: January 2024

## ✅ Implemented Schema

### Global Schema (layout.tsx)
- **Organization Schema** ✅
- **LocalBusiness Schema** ✅
  - Added aggregateRating (4.6 stars, 312 reviews)
  - Opening hours specification
  - Geo coordinates
  - Amenity features
- **WebSite Schema** ✅

### Page-Specific Schema

#### Homepage (/)
- **FAQPage Schema** ✅ (Voice search optimized Q&As)
- **BreadcrumbList Schema** ✅

#### Food Pages
- **/food-menu** - Menu schema with sections ✅
- **/sunday-lunch** - Product schema with offers ✅
- **/food/pizza** - Menu & Offer schema ✅
- **/food/fish-and-chips** - ❌ Not created yet

#### Drinks
- **/drinks** - Menu schema ✅
- **BreadcrumbList Schema** ✅

#### Location/Directions
- **/find-us** 
  - Place schema with amenities ✅
  - HowTo schema for directions ✅
  - BreadcrumbList ✅

#### Events
- **/whats-on** - Event schema ✅
- **/whats-on/drag-shows** - Event schema ✅
- **/events/[id]** - Dynamic event schema ✅
- **/book-event** 
  - Service schema ✅
  - BreadcrumbList ✅

#### Near Heathrow
- **/near-heathrow** - TouristAttraction schema ✅
- **/near-heathrow/terminal-2** - Restaurant schema ✅
- **/near-heathrow/terminal-3** - Restaurant schema ✅
- **/near-heathrow/terminal-4** - Restaurant schema ✅
- **/near-heathrow/terminal-5** - Restaurant schema ✅

#### Special Features
- **/beer-garden** - TouristAttraction & FAQPage schema ✅

## ❌ Missing Schema Opportunities

### Critical Gaps
1. **Review Schema** - Individual reviews not implemented
2. **ImageObject Schema** - For gallery images
3. **VideoObject Schema** - For promotional content
4. **Person Schema** - For performers (Nikki Manfadge)
5. **Speakable Schema** - For voice assistant optimization

### Pages Without Schema
- **/sitemap-page** - Low priority
- Any 404/error pages

### Enhanced Opportunities
1. **GeoShape** for service area coverage
2. **ParkingFacility** schema for free parking feature
3. **SpecialAnnouncement** for temporary changes
4. **MusicEvent** schema for entertainment nights
5. **FoodEstablishmentReservation** for table bookings

## 🎯 Recommendations

### High Priority
1. Add individual Review schema to build trust
2. Implement Speakable schema for voice search
3. Add ImageObject schema for better image search visibility

### Medium Priority
1. Create Person schema for key entertainers
2. Add ParkingFacility schema to highlight free parking
3. Implement FoodEstablishmentReservation schema

### Low Priority
1. Add GeoShape for local area coverage
2. Implement SpecialAnnouncement for holidays
3. Add BackgroundImage schema for hero images

## Implementation Notes

### Best Practices Followed
- ✅ All prices include currency (GBP)
- ✅ Opening hours connected to live API data
- ✅ Geo coordinates accurate
- ✅ Multiple schema types per page where relevant
- ✅ Breadcrumbs on all non-home pages
- ✅ FAQ schema for voice search

### Testing
- Use Google's Rich Results Test
- Monitor Search Console for errors
- Check schema rendering in SERPs
- Validate with Schema.org validator

## Code Organization

### Schema Files
- `/lib/schema.ts` - Base schemas
- `/lib/enhanced-schemas.ts` - Additional schemas
- `/lib/dynamic-schema.ts` - API-connected schemas
- Individual pages import and implement as needed

### Usage Pattern
```typescript
const schemas = [schemaType1, schemaType2, breadcrumbSchema]
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
/>
```

## Next Steps

1. **Complete Review Integration**
   - Pull reviews from Google/TripAdvisor
   - Add to LocalBusiness schema
   - Create individual review pages

2. **Voice Search Enhancement**
   - Add Speakable markup to all pages
   - Optimize FAQ content for voice
   - Test with voice assistants

3. **Image SEO**
   - Add ImageObject schema
   - Include licensing information
   - Optimize for Google Images

The site has strong schema coverage (~85% complete) with room for enhancement in reviews, voice search, and specialized schemas.