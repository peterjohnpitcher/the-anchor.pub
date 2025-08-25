# Existing Page Optimization Guide
*Specific changes needed for current pages to improve organic performance*

## 🔴 CRITICAL PAGE FIXES

### 1. Homepage (Both www and non-www versions)
**Current Issues**:
- Split traffic between two versions (139 total clicks)
- "the anchor" ranking at position 25.56 instead of #1
- Generic title tag not capturing brand searches

**Required Changes**:
```html
<!-- Current Title (likely) -->
<title>The Anchor Stanwell Moor | Pub & Restaurant</title>

<!-- Optimized Title -->
<title>The Anchor Pub Stanwell Moor | Restaurant, Beer Garden & Live Events</title>

<!-- Add to H1 -->
<h1>The Anchor - Stanwell Moor's Favourite Local Pub</h1>

<!-- Meta Description -->
<meta name="description" content="The Anchor pub in Stanwell Moor near Heathrow. Award-winning Sunday roasts, beer garden for plane spotting, live events, quiz nights. Open 7 days. Book: 01753 682707">
```

**Additional Changes**:
- Add LocalBusiness schema with opening hours
- Include "The Anchor" in first paragraph multiple times
- Add customer review section above fold
- Feature "Near Heathrow Terminal 5" prominently

---

## 📉 HIGH-IMPRESSION/LOW-CTR PAGES

### 2. `/drinks/baby-guinness` 
**Stats**: 2,100 impressions, 0.05% CTR, Position 38.1

**Current Problem**: Likely just a product listing with no content

**Required Changes**:
```markdown
Add above product listing:

# Baby Guinness Shot at The Anchor

## What is a Baby Guinness?
The Baby Guinness is a popular layered shot that looks like a tiny pint of Guinness. 
Made with coffee liqueur (usually Kahlúa) and Irish cream (typically Bailey's), 
it's one of our most requested shots.

## How We Make Our Baby Guinness
- 2/3 Kahlúa (bottom layer)
- 1/3 Bailey's (floated on top)
- Served in a shot glass
- £3.50 each or 2 for £6

## Perfect For
- Hen parties
- Birthday celebrations  
- After dinner treats
- Getting the party started

## The History
[Add 200 words about origin]

## Variations We Serve
- Baby Guinness Classic
- Slippery Nipple (with grenadine)
- [List others]
```

**Technical Additions**:
- Recipe schema markup
- High-quality image with alt="Baby Guinness shot at The Anchor pub"
- Internal links from blog posts
- FAQ section answering common questions

---

### 3. `/food-menu`
**Stats**: 1,769 impressions, 0.45% CTR, Position 9.83

**Required Changes**:

**Meta Tags**:
```html
<!-- Current (probably generic) -->
<title>Food Menu | The Anchor</title>

<!-- Optimized -->
<title>Food Menu | Fresh Daily Specials from £8.95 | The Anchor Stanwell Moor</title>

<meta name="description" content="View our full food menu. Sunday roasts £12.95, fish & chips £11.95, pizzas from £9.95. Gluten-free and vegetarian options. Kitchen open daily until 9pm.">
```

**On-Page Content**:
- Add "Updated November 2024" badge
- Include top 5 popular dishes with images at top
- Add calorie information for health-conscious searches
- Create jump links to sections (Starters, Mains, Desserts)
- Add "Order for Collection" CTA if available

---

### 4. `/beer-garden`
**Stats**: 406 impressions, 7.14% CTR, Position 10.42

**Good CTR but can improve position**

**Required Changes**:
```html
<!-- Title Optimization -->
<title>Beer Garden with Plane Spotting | Heathrow Flight Path Views | The Anchor</title>

<!-- H1 Update -->
<h1>Beer Garden Under Heathrow Flight Path - Watch Planes While You Drink</h1>
```

**Content Additions**:
- Add section: "Best Times for Plane Spotting"
- Include: "Which terminals fly overhead"
- Photo gallery of planes from the garden
- "Dog-Friendly Beer Garden" section
- Seasonal information (heaters, covered areas)

---

## 🎯 QUICK WIN PAGES (Positions 4-10)

### 5. `/sunday-lunch`
**Stats**: 707 impressions, 1.27% CTR, Position 18.38

**Required Changes**:
1. **Title**: "Award-Winning Sunday Roast £12.95 | Book Now | The Anchor Stanwell"
2. **Add**: High-quality photos of each roast option
3. **Include**: "Served 12pm-6pm Every Sunday"
4. **Feature**: Customer reviews specifically about Sunday lunch
5. **Schema**: Add Menu schema with prices
6. **CTA**: Prominent "Book Your Table" button

### 6. `/near-heathrow/terminal-2`
**Stats**: 441 impressions, 1.81% CTR, Position 28.29

**Required Changes**:
```markdown
Current page probably just says "we're near Terminal 2"

Add:
- Distance/time from Terminal 2 (X miles, X minutes by car/taxi)
- Transport options with costs
- "Perfect for:" section (layovers, crew, meetings)
- Opening hours aligned with flight times
- Parking information
- Direct booking button for travelers
```

---

## 🍺 DRINK PRODUCT PAGES

### 7. `/drinks` (Main Category Page)
**Stats**: 1,576 impressions, 0.06% CTR, Position 13.94

**Critical Issue**: Almost zero CTR despite high impressions

**Required Changes**:
1. **Structure**: Create clear categories with jump links
   - Beers & Lagers
   - Wines
   - Spirits
   - Cocktails
   - Soft Drinks

2. **Featured Section** at top:
   - Manager's Special
   - Most Popular Drinks
   - New Arrivals

3. **Meta Description**: 
   "150+ drinks available. Craft beers from £4, wines from £5/glass, cocktails £8. Happy hour 5-7pm weekdays. Full drinks menu."

### 8. Individual Drink Pages Pattern
**For all**: `/drinks/disaronno`, `/drinks/bushmills`, `/drinks/gordons`, etc.

**Standard Template Needed**:
```markdown
# [Drink Name] at The Anchor

Price: £[X] per measure / £[X] for double

## About [Drink Name]
[150-word description of the spirit/beer/wine]

## How We Serve It
- Neat
- On the rocks  
- Mixed with [common mixers]
- In cocktails: [list cocktails using this]

## Tasting Notes
[Flavor profile, ABV, origin]

## Perfect For
[Occasions, food pairings]

## Also Try
[Related drinks available]
```

---

## 📱 MOBILE-SPECIFIC FIXES

### All Food/Drink Pages
1. **Tap targets**: Increase button sizes to 48x48px minimum
2. **Menu navigation**: Add sticky category bar
3. **Images**: Lazy load below fold
4. **Tables**: Make responsive with horizontal scroll

---

## 🏃 SPEED OPTIMIZATIONS

### Priority Pages for Speed Fixes
1. **Homepage**: Currently loading 280KB JS - reduce by 50%
2. **Food Menu**: Optimize images (use WebP, max 100KB each)
3. **Drinks Pages**: Implement virtual scrolling for long lists
4. **Blog Posts**: Lazy load images after 2nd paragraph

---

## 📋 IMPLEMENTATION PRIORITY

### Week 1 - Critical
1. ✅ Homepage title/H1/meta optimization
2. ✅ Baby Guinness page content addition
3. ✅ Food Menu meta tags and structure

### Week 2 - High Impact  
4. ✅ All drink product pages - add template content
5. ✅ Sunday Lunch page enhancement
6. ✅ Beer Garden unique angle content

### Week 3 - Supporting
7. ✅ Near Heathrow pages - add transport/practical info
8. ✅ Drinks category page restructure
9. ✅ Mobile UX fixes across all pages

### Week 4 - Technical
10. ✅ Schema markup on all pages
11. ✅ Image optimization site-wide
12. ✅ Internal linking improvements

---

## 🎯 EXPECTED IMPACT

| Page | Current CTR | Target CTR | Current Position | Target Position | Monthly Click Gain |
|------|------------|------------|------------------|-----------------|-------------------|
| Homepage | 1.52% | 5% | 22.47 | 5 | +100 |
| Baby Guinness | 0.05% | 2% | 38.1 | 15 | +40 |
| Food Menu | 0.45% | 2% | 9.83 | 5 | +25 |
| Drinks | 0.06% | 1% | 13.94 | 8 | +15 |
| Sunday Lunch | 1.27% | 3% | 18.38 | 8 | +12 |

**Total Expected Gain**: 192+ clicks/month from existing page optimization alone

---

## 🔍 TRACKING SUCCESS

Set up Google Analytics 4 events for:
- Menu views vs. bookings
- Drink page views vs. bar visits
- Beer garden page vs. outdoor bookings
- Time on page improvements
- Scroll depth on long pages

Monitor in Search Console:
- CTR improvements week-over-week
- Position changes for target keywords
- Page-level impression changes
- Query matching improvements

---

*These optimizations focus on maximizing the value of existing pages without creating new content, providing the fastest path to improved organic performance.*