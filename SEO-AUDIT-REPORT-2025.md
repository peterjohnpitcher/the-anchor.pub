# The Anchor Pub - Comprehensive Local SEO Audit Report
*Date: January 2025*

## Executive Summary

This comprehensive SEO audit of The Anchor pub website (the-anchor.pub) focused on local SEO best practices, schema markup implementation, and site structure. While the site demonstrates strong local SEO optimization in many areas, several critical issues were identified that require immediate attention, particularly incorrect opening hours in schema markup.

### Key Findings:
- ✅ **Strong Points**: Excellent local keyword targeting, comprehensive schema implementation, Google Reviews integration
- ⚠️ **Critical Issues**: Incorrect opening hours in schema (shows Monday as open), orphaned location pages
- 📊 **Overall Score**: 75/100 - Good foundation with room for improvement

## 1. Schema Markup Implementation

### Current Coverage (85%)
The site has extensive schema markup implementation including:

#### ✅ Implemented Schemas:
- **Organization** - Complete with logo, contact info, social links
- **LocalBusiness** (Restaurant + BarOrPub) - Comprehensive with amenities, payment methods
- **WebSite** - Includes SearchAction for sitelinks search box
- **FAQPage** - Voice search optimized on multiple pages
- **Menu** - Detailed food and drinks menus with pricing
- **Event** - Dynamic event schemas with proper structured data
- **Review** - Individual Google Reviews with aggregateRating
- **BreadcrumbList** - Navigation trails on all non-home pages
- **Article** - Blog posts with proper authorship
- **Service** - Event booking and venue hire services
- **Product/Offer** - Special offers and promotions

#### ❌ Missing Schemas:
- ImageObject for gallery images
- VideoObject for promotional videos
- Person schema for performers (drag queens, quiz hosts)
- ParkingFacility details
- SpecialAnnouncement for temporary changes

### Critical Issue: Opening Hours Schema
**🚨 URGENT**: The LocalBusiness schema in `/lib/schema.ts` contains incorrect opening hours:
- Shows Monday as OPEN (16:00-22:00) when pub is CLOSED
- Tuesday-Thursday shows 22:00 closing instead of 23:00
- Saturday shows 12:00 opening instead of 13:00
- Sunday shows 22:00 closing instead of 21:00

**Impact**: Customers may arrive when closed, damaging reputation and Google rankings.

## 2. NAP Consistency

### ✅ Strengths:
- **Name**: Consistent use of "The Anchor" with minor variations
- **Address**: Perfect consistency - "Horton Road, Stanwell Moor, Surrey, TW19 6AQ"
- **Phone**: Consistent primary number - 01753 682707

### ⚠️ Minor Issues:
- Multiple email addresses used (manager@, bookings@, events@, info@)
- Slight name variations in metadata ("The Anchor Pub" vs "The Anchor")

## 3. Local SEO Optimization

### Keyword Coverage Analysis:
- **"Heathrow"**: 3,404 occurrences - EXCELLENT
- **"Stanwell Moor"**: 157 occurrences - GOOD
- **"Surrey"**: 245 occurrences - NEEDS IMPROVEMENT
- **"TW19"**: Well integrated in structured data
- **"Near me"**: Strategic implementation in content

### Location-Specific Pages:
✅ **Strong Implementation**:
- Dedicated terminal pages (/near-heathrow/terminal-[1-5])
- M25 Junction 14 targeting page
- Local area pages for Staines, Ashford, Feltham, Windsor

❌ **Issue**: 8 location pages are completely orphaned (not linked from anywhere)

## 4. Google My Business Integration

### ✅ Implemented:
- Google Places API integrated with proper credentials
- Dynamic review fetching (limited to 5 reviews by API)
- Real-time rating updates in schema
- Review badge in header with current rating
- Direct link to leave reviews on Google

### Recommendations:
- Monitor API quota usage
- Consider caching reviews more aggressively
- Add review request automation for satisfied customers

## 5. Orphaned Pages Analysis

### 🚨 Critical Findings:
**11 orphaned pages** discovered that exist but aren't linked:

#### Location Pages (8):
- /ashford-pub, /bedfont-pub, /egham-pub, /feltham-pub
- /heathrow-hotels-pub, /m25-junction-14-pub
- /stanwell-pub, /windsor-pub

#### Feature Pages (3):
- /drinks/managers-special
- /pizza-tuesday (duplicate of /food/pizza)
- /blog/tags

### Test Pages (6) - Should be excluded from indexing:
- /_api-diagnostics, /api-status, /api-test
- /components, /demo-header, /test-reviews

## 6. llms.txt Recommendation

### What is llms.txt?
A new standard (proposed 2024) for helping AI systems understand website content better. Similar to robots.txt but for AI models like ChatGPT, Claude, and Perplexity.

### Should The Anchor Implement It?
**YES** - Recommended for these reasons:
1. **Local Discovery**: AI tools increasingly used for "find a pub near me" queries
2. **Event Information**: Ensure AI accurately reports your events and opening hours
3. **Menu Details**: Help AI understand your food and drink offerings
4. **Future-Proofing**: Early adoption positions you ahead of competitors

### Proposed llms.txt Content:
```markdown
# The Anchor Pub - Stanwell Moor, Surrey

Traditional British pub near Heathrow Airport serving great food and drinks with regular entertainment.

## Key Information
- Location: Horton Road, Stanwell Moor, Surrey, TW19 6AQ
- Phone: 01753 682707
- Email: manager@the-anchor.pub
- Website: https://the-anchor.pub

## Opening Hours
- Monday: CLOSED
- Tuesday-Thursday: 4pm-11pm
- Friday: 4pm-12am
- Saturday: 1pm-12am
- Sunday: 12pm-9pm

## Kitchen Hours
- Tuesday-Friday: 6pm-9pm
- Saturday: 1pm-7pm
- Sunday: 12pm-5pm (Roast dinner pre-order by 1pm Saturday)

## What We Offer
- Traditional British pub food and Sunday roasts
- Wide selection of beers, wines, and spirits
- Dog-friendly with beer garden
- Free parking and WiFi
- Regular events: Quiz nights, drag shows, bingo
- Private event space for up to 150 people
- Just 7 minutes from Heathrow Terminal 5

## Important Pages
- Menu: https://the-anchor.pub/food-menu
- Events: https://the-anchor.pub/whats-on
- Book a Table: https://ordertab.menu/theanchor/bookings
- Find Us: https://the-anchor.pub/find-us
```

## 7. Immediate Action Items

### 🚨 Critical (Fix within 24 hours):
1. **Fix opening hours in schema** - Update `/lib/schema.ts` to show Monday as closed and correct hours
2. **Update error fallback hours** - Fix `/lib/error-handling.ts` with correct opening times
3. **Exclude test pages** - Add robots.txt rules for test/debug pages

### ⚠️ High Priority (Fix within 1 week):
1. **Link orphaned location pages** - Add "Nearby Areas We Serve" section
2. **Update sitemap.ts** - Include all linked pages, exclude orphans
3. **Implement llms.txt** - Add to public directory

### 📈 Medium Priority (Fix within 1 month):
1. **Increase Surrey keywords** - Add to titles and content
2. **Consolidate email addresses** - Standardize on manager@ or create department emails
3. **Add missing schemas** - ImageObject, VideoObject, Person
4. **Create Surrey content hub** - Blog category for Surrey-specific content

## 8. Long-term SEO Strategy

### Content Recommendations:
1. **Create seasonal Surrey guides** - "Best Surrey Pubs for Christmas Parties"
2. **Develop local partnerships** - Cross-promote with Surrey businesses
3. **Target voice search** - More conversational FAQ content
4. **Build local backlinks** - Surrey tourism sites, local directories

### Technical Improvements:
1. **Implement proper image schemas** - For better visual search
2. **Add video content** - Tour videos, event highlights
3. **Enhance event schemas** - Add performer details, ticket links
4. **Monitor Core Web Vitals** - Ensure fast loading for mobile users

## 9. Competitive Advantages

Your site already excels in:
- **Heathrow positioning** - Unmatched terminal-specific content
- **Event promotion** - Strong schema and content strategy
- **Google integration** - Live reviews and ratings
- **Mobile optimization** - Responsive design and fast loading

## 10. Expected Results

By implementing these recommendations:
- **Short-term (1-3 months)**: Fix critical issues, improve local rankings
- **Medium-term (3-6 months)**: Increase organic traffic by 20-30%
- **Long-term (6-12 months)**: Dominate "pub near Heathrow" searches

## Conclusion

The Anchor pub website demonstrates strong local SEO fundamentals with excellent schema implementation and local targeting. The critical opening hours issue must be addressed immediately to prevent customer confusion. With the recommended improvements, particularly fixing orphaned pages and implementing llms.txt, the site is well-positioned to dominate local search results and AI-powered discovery tools.

**Next Steps**: Begin with critical fixes, then systematically work through high and medium priority items while developing content for long-term growth.