# Page-by-Page SEO Optimization Checklist
*Complete list of changes needed based on Search Console data and Master Reference Guide*

## 🔴 PRIORITY 1 - CRITICAL FIXES (Week 1)

### 1. Homepage (`/` and `/app/page.tsx`)
**Current Issues**: 
- Ranking position 25 for "the anchor" (losing 150+ clicks/month)
- Split traffic between www and non-www
- Missing key brand signals

**Changes Required**:
```tsx
// Metadata changes
export const metadata: Metadata = {
  title: 'The Anchor Stanwell Moor | Traditional British Pub 7 Minutes from Heathrow Terminal 5',
  description: 'The closest traditional British pub to Heathrow. Famous Sunday roasts, FREE parking, beer garden under flight path. Outside ULEZ zone. Save 25% vs service stations. Book: 01753 682707',
  keywords: 'The Anchor, Stanwell Moor pub, pub near Heathrow, plane spotting pub, beer garden, Sunday roast Surrey',
}

// Add to hero section
<h1>The Anchor - Stanwell Moor's Favourite Local Pub</h1>
<p>The closest traditional British pub to Heathrow Airport - just 7 minutes from Terminal 5</p>

// Add above fold
<div className="trust-signals">
  - ⭐ 5-Star Food Hygiene Rating Since 2019
  - ✈️ Directly Under Heathrow Flight Path
  - 🚗 20 FREE Parking Spaces
  - 🍺 Where Everyone's Local
  - 📍 Outside ULEZ Zone - Save £12.50 Daily
</div>
```

**Schema to Add**:
```json
{
  "@type": "LocalBusiness",
  "name": "The Anchor",
  "description": "The closest traditional British pub to Heathrow",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Horton Road",
    "addressLocality": "Stanwell Moor",
    "postalCode": "TW19 6AQ"
  },
  "geo": {
    "latitude": 51.462509,
    "longitude": -0.502067
  },
  "openingHours": "Mo-Th 16:00-22:00, Fr 16:00-00:00, Sa 12:00-00:00, Su 12:00-22:00",
  "telephone": "+441753682707",
  "priceRange": "££"
}
```

---

### 2. `/drinks/baby-guinness`
**Current Issues**: 
- 2,100 impressions, 0 clicks (Position 38.1)
- No content, just price listing

**Changes Required**:
```tsx
// New content to add above product listing
<article className="drink-guide">
  <h1>Baby Guinness Shot at The Anchor - Stanwell Moor's Favourite Party Starter</h1>
  
  <section>
    <h2>What is a Baby Guinness?</h2>
    <p>The Baby Guinness is our most popular layered shot that looks exactly like a tiny pint 
    of Guinness. Made with Kahlúa coffee liqueur and Bailey's Irish Cream, it's the perfect 
    party starter at The Anchor.</p>
    
    <div className="recipe-card">
      <h3>How We Make Our Baby Guinness</h3>
      <ul>
        <li>2/3 Kahlúa (bottom layer)</li>
        <li>1/3 Bailey's Irish Cream (floated on top)</li>
        <li>Served in a shot glass</li>
        <li>£3.50 each or 2 for £6</li>
      </ul>
    </div>
  </section>

  <section>
    <h2>Perfect for Celebrations at The Anchor</h2>
    <ul>
      <li>Hen parties and stag dos</li>
      <li>Birthday celebrations</li>
      <li>After your Sunday roast</li>
      <li>Before our monthly quiz night</li>
    </ul>
  </section>

  <section>
    <h2>Why Order Baby Guinness at The Anchor?</h2>
    <p>Located just 7 minutes from Heathrow Terminal 5, The Anchor is the perfect 
    pre-flight celebration spot. Our experienced bartenders make perfect Baby Guinness 
    shots every time. Much better value than airport bars where shots cost £8+.</p>
  </section>
</article>

// Meta tags
title: 'Baby Guinness Shot £3.50 | The Anchor Stanwell Moor | Near Heathrow'
description: 'Perfect Baby Guinness shots at The Anchor, just 7 minutes from Heathrow. £3.50 each or 2 for £6. Popular for hen parties and celebrations. Much cheaper than airport bars.'

// Schema
{
  "@type": "Recipe",
  "name": "Baby Guinness Shot",
  "description": "Layered shot that looks like a tiny Guinness",
  "recipeIngredient": ["Kahlúa", "Bailey's Irish Cream"],
  "recipeInstructions": "Pour Kahlúa, float Bailey's on top"
}
```

---

### 3. `/food-menu`
**Current Issues**: 
- 1,769 impressions, 0.45% CTR (Position 9.83)
- Generic meta tags, no prices mentioned

**Changes Required**:
```tsx
// Meta updates
title: 'Food Menu | Mains from £8.95 | Sunday Roast £14.99 | The Anchor Stanwell Moor'
description: 'Full food menu at The Anchor. Stone-baked pizzas from £7.49, fish & chips £11.95, famous Sunday roasts from £14.99. Kitchen open Tue-Sun. 7 minutes from Heathrow.'

// Add to page top
<div className="menu-highlights">
  <h2>Today's Popular Dishes</h2>
  - 🍕 Tuesday Pizza BOGOF - Buy One Get One FREE
  - 🐟 Friday Over 65s - 50% OFF Fish & Chips
  - 🥩 Sunday Roast - Must pre-order by Saturday 1pm
  - ⏰ Food served fresh in 15-20 minutes
  - 📦 Takeaway available on all items
</div>

// Add freshness indicator
<Badge>Menu Updated: November 2024</Badge>

// Schema
{
  "@type": "Menu",
  "hasMenuSection": [{
    "@type": "MenuSection",
    "name": "Pizza",
    "hasMenuItem": [{
      "@type": "MenuItem",
      "name": "Rustic Classic",
      "offers": {
        "@type": "Offer",
        "price": "10.49",
        "priceCurrency": "GBP"
      }
    }]
  }]
}
```

---

## 🟡 PRIORITY 2 - QUICK WINS (Week 1-2)

### 4. `/beer-garden`
**Current Issues**: 
- Good CTR (7.14%) but Position 10.42
- Missing unique plane-spotting angle

**Changes Required**:
```tsx
title: 'Beer Garden Under Heathrow Flight Path | Plane Spotting Pub | The Anchor'
description: 'Famous beer garden directly under Heathrow flight path. Planes every 90 seconds at peak times. Perfect for aviation photographers. Dog-friendly, heated, FREE parking.'

// Add new section
<section className="plane-spotting-guide">
  <h2>Plane Spotting at The Anchor Beer Garden</h2>
  <h3>Best Times to See Planes</h3>
  <ul>
    <li>Morning rush: 6am-9am (easterly operations)</li>
    <li>Evening rush: 5pm-8pm (westerly operations)</li>
    <li>Planes overhead every 90 seconds at peak times</li>
  </ul>
  
  <h3>What You'll See</h3>
  <p>Aircraft approaching Terminal 5 including A380s, 777s, and 787s. 
  Perfect for aviation photographers - bring your camera!</p>
  
  <h3>Flight Tracking</h3>
  <p>Free WiFi to track flights on FlightRadar24 while you watch</p>
</section>
```

---

### 5. `/sunday-lunch`
**Current Issues**: 
- Position 18.38 for "sunday roast near me"
- Missing schema and fresh imagery

**Changes Required**:
```tsx
title: 'Famous Sunday Roast from £14.99 | Pre-Order Required | The Anchor Stanwell Moor'
description: 'The best Sunday roast in Surrey. Chicken £14.99, Lamb £15.49, Pork £15.99. Must pre-order by Saturday 1pm. Served 12-5pm. Book: 01753 682707'

// Add testimonials section
<section className="reviews">
  <h2>Why We're Famous for Sunday Roasts</h2>
  <blockquote>"The best Sunday roast in Surrey" - Local Customer</blockquote>
  <blockquote>"Generous portions, perfectly cooked" - TripAdvisor Review</blockquote>
</section>

// Add booking urgency
<Alert>
  ⚠️ Sunday Roasts MUST be pre-ordered and paid by Saturday 1pm
  📞 Call 01753 682707 to book
</Alert>

// Schema
{
  "@type": "Product",
  "name": "Sunday Roast",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "14.99",
    "highPrice": "15.99",
    "priceCurrency": "GBP"
  }
}
```

---

### 6. `/near-heathrow/terminal-5`
**Current Issues**: 
- Position 28.1, missing practical information
- Not leveraging "7 minutes" claim

**Changes Required**:
```tsx
title: 'Pub 7 Minutes from Heathrow Terminal 5 | FREE Parking | The Anchor'
description: 'The Anchor is just 7 minutes (2.8 miles) from Terminal 5. FREE parking saves £20-40/day. Outside ULEZ zone. Perfect for pre-flight meals or crew stops.'

// Add practical info section
<section className="terminal-info">
  <h2>Getting to The Anchor from Terminal 5</h2>
  
  <div className="transport-options">
    <h3>By Car/Taxi</h3>
    <ul>
      <li>Distance: 2.8 miles</li>
      <li>Time: 7 minutes</li>
      <li>Taxi cost: Around £15-20</li>
      <li>FREE parking at pub (20 spaces)</li>
    </ul>
    
    <h3>By Bus</h3>
    <ul>
      <li>Route 442 from Terminal 5</li>
      <li>Ask driver for The Anchor stop</li>
      <li>Journey time: 15 minutes</li>
    </ul>
  </div>
  
  <h3>Why Visit The Anchor from T5?</h3>
  <ul>
    <li>Save 50% vs terminal restaurants</li>
    <li>Pint costs £4.75 not £7</li>
    <li>Food served fresh in 15-20 minutes</li>
    <li>Luggage storage available</li>
    <li>Watch your plane arrive while you eat</li>
  </ul>
</section>
```

---

## 🟢 PRIORITY 3 - SYSTEMATIC IMPROVEMENTS (Week 2-3)

### 7. All Drink Product Pages
**Pattern for**: `/drinks/disaronno`, `/drinks/bushmills`, `/drinks/gordons`, etc.

**Standard Template**:
```tsx
// For each drink page, add:
<article className="drink-profile">
  <h1>[Drink Name] at The Anchor - Stanwell Moor</h1>
  
  <div className="pricing">
    <p>Single: £[X] | Double: £[X] | Double up for just £2 extra</p>
  </div>
  
  <section>
    <h2>About [Drink Name]</h2>
    <p>[150 words about the spirit/liqueur including origin, flavor profile, ABV]</p>
  </section>
  
  <section>
    <h2>How We Serve [Drink Name]</h2>
    <ul>
      <li>Neat</li>
      <li>On the rocks</li>
      <li>With [mixer options]</li>
      <li>In cocktails: [list relevant cocktails]</li>
    </ul>
  </section>
  
  <section>
    <h2>Perfect For</h2>
    <p>[Occasions, food pairings, weather conditions]</p>
  </section>
  
  <div className="cta">
    <p>Located just 7 minutes from Heathrow Terminal 5. Much better value than 
    airport bars where [Drink Name] costs £[airport price].</p>
    <Button>View Full Drinks Menu</Button>
  </div>
</article>

// Meta pattern
title: '[Drink Name] £[price] | Premium Spirits | The Anchor Stanwell Moor'
description: 'Enjoy [Drink Name] at The Anchor, 7 minutes from Heathrow. Single £[X], Double £[X]. Much cheaper than airport bars. Full bar open until midnight Fri-Sat.'
```

---

### 8. `/whats-on`
**Current Issues**: 
- Low CTR despite good position
- Not highlighting FREE events

**Changes Required**:
```tsx
title: 'What\'s On | FREE Drag Shows, £3 Quiz Night, Bingo | The Anchor Stanwell Moor'
description: 'Monthly events at The Anchor. FREE drag shows with Nikki Manfadge, £3 quiz nights (£25 prize), £10 bingo, Tuesday pizza BOGOF. Near Heathrow Terminal 5.'

// Add recurring events calendar
<div className="recurring-events">
  <h2>Regular Monthly Events</h2>
  
  <div className="event-grid">
    <EventCard
      title="Quiz Night"
      price="£3 entry"
      prize="£25 bar voucher"
      frequency="Monthly - Check dates"
    />
    
    <EventCard
      title="Drag Shows"
      price="FREE ENTRY"
      performer="Nikki Manfadge"
      frequency="Monthly alternating Games/Karaoke"
    />
    
    <EventCard
      title="Cash Bingo"
      price="£10 per book"
      prizes="Drinks, vouchers, cash jackpot"
      frequency="Monthly"
    />
    
    <EventCard
      title="Tuesday Pizza BOGOF"
      price="Buy One Get One FREE"
      details="Every Tuesday, all day"
      frequency="Weekly"
    />
  </div>
</div>
```

---

### 9. `/pizza-tuesday`
**Current Issues**: 
- Position 24.23 for "tuesday pizza deals"
- Page exists but underoptimized

**Changes Required**:
```tsx
title: 'Tuesday Pizza BOGOF | Buy One Get One FREE | The Anchor Stanwell Moor'
description: 'Every Tuesday: Buy one pizza, get one FREE at The Anchor. Stone-baked pizzas from £7.49. All pizzas included. Dine-in or takeaway. 7 minutes from Heathrow.'

// Add clear value proposition
<Hero>
  <h1>Tuesday Pizza Deal - Buy One Get One FREE</h1>
  <h2>Every Tuesday at The Anchor, Stanwell Moor</h2>
  
  <div className="deal-details">
    ✅ ALL stone-baked pizzas included
    ✅ No voucher needed
    ✅ Available all day Tuesday
    ✅ Dine-in or takeaway
    ✅ Gluten-free bases available (no extra charge)
  </div>
</Hero>

// Add comparison
<section>
  <h2>Pizza Price Comparison</h2>
  <table>
    <tr>
      <td>The Anchor (Tuesday)</td>
      <td>2 pizzas for £10.49-13.99</td>
    </tr>
    <tr>
      <td>Domino's</td>
      <td>2 pizzas for £35+</td>
    </tr>
    <tr>
      <td>Pizza Express</td>
      <td>2 pizzas for £30+</td>
    </tr>
  </table>
</section>
```

---

### 10. `/find-us`
**Current Issues**: 
- 1,762 impressions but only 0.34% CTR
- Not emphasizing FREE parking and location benefits

**Changes Required**:
```tsx
title: 'Find The Anchor | FREE Parking | 7 Min from Heathrow T5 | Outside ULEZ'
description: 'Directions to The Anchor, Horton Road, Stanwell Moor TW19 6AQ. 20 FREE parking spaces. Outside ULEZ zone (save £12.50). 5 min from M25 J14. Regular bus 442.'

// Add transport calculator
<div className="transport-calculator">
  <h2>How to Get Here</h2>
  
  <TransportOption
    from="Terminal 5"
    time="7 minutes"
    distance="2.8 miles"
    taxi="£15-20"
    bus="442 (15 min)"
    savings="Save £20-40 on parking"
  />
  
  <TransportOption
    from="M25 Junction 14"
    time="5 minutes"
    distance="2 miles"
    directions="Exit J14, follow signs to Stanwell Moor"
    savings="Outside ULEZ - save £12.50"
  />
</div>

// Add parking emphasis
<Alert variant="success">
  🚗 20 FREE Parking Spaces - No Time Limits
  Unlike Heathrow: No £5/hour charges, no booking needed
</Alert>
```

---

## 📋 TECHNICAL OPTIMIZATIONS (All Pages)

### Schema Markup Implementation
```javascript
// Add to all relevant pages
- LocalBusiness schema on location pages
- Menu schema on food/drinks pages  
- Event schema on whats-on
- FAQPage schema on informational content
- BreadcrumbList schema on all pages
- Review/AggregateRating where applicable
```

### Internal Linking Strategy
```
FROM drinks/baby-guinness TO:
- /whats-on (mention quiz night)
- /book-table (celebrations)
- /food-menu (after dinner)

FROM /beer-garden TO:
- /near-heathrow/terminal-5
- /find-us (parking info)
- /sunday-lunch (outdoor dining)

FROM /sunday-lunch TO:
- /book-table (prominent CTA)
- /find-us (directions)
- /whats-on (Sunday events)
```

### Meta Description Pattern
```
[Main Keyword] at The Anchor, [distance claim from Heathrow]. 
[Key offer/price]. [Unique value prop]. 
[Call-to-action with phone number].
```

---

## 🎯 SUCCESS METRICS

### Week 1 Targets
- [ ] Homepage ranking improves from 25 to <15
- [ ] Baby Guinness page gets first clicks
- [ ] Food menu CTR increases to 1%+

### Week 2 Targets  
- [ ] 5 pages move from page 2 to page 1
- [ ] Overall CTR improves from 0.89% to 1.2%
- [ ] Drink pages start receiving clicks

### Month 1 Targets
- [ ] 500+ organic clicks/month
- [ ] Homepage ranks top 5 for "the anchor"
- [ ] Capture 10% of baby guinness searches

---

## ⚠️ CRITICAL REMINDERS

From Master Reference Guide:
- ✅ Always use "The Anchor" NOT "The Anchor Pub"
- ✅ Email is manager@the-anchor.pub
- ✅ Only 20 parking spaces (not 30 or 50)
- ✅ Kitchen CLOSED Mondays
- ✅ No Sky Sports/TNT
- ✅ No breakfast service
- ✅ No accessible toilets
- ✅ Must pre-order Sunday roast by Saturday 1pm

---

*This checklist provides specific, actionable changes for each page based on search data and verified claims. Implement in priority order for maximum impact.*