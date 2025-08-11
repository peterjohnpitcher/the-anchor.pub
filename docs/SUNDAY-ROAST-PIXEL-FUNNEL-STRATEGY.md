# Sunday Roast Pixel-Based Funnel Strategy
*Smart Audience Segmentation for £250 Budget*

## Funnel Overview

Stop wasting money showing awareness ads to people already interested. This strategy moves people through stages efficiently.

```
COLD → WARM → HOT → CONVERTED → RETAINED
```

## Audience Segments & Pixel Setup

### Required Pixel Events

1. **PageView** - All pages (standard)
2. **ViewContent** - Any food page
3. **ViewContent_SundayRoast** - Sunday lunch landing page
4. **InitiateCheckout** - Started booking
5. **Purchase** - Completed booking
6. **Custom: TimeOnPage_30s** - Engaged visitors

## The Smart Funnel Structure

### 🧊 COLD Audience (£80/month)
**Who**: Never visited website
**Exclude**: All website visitors (30 days)
**Message**: Awareness/Discovery
**Objective**: Reach

**Targeting**:
- 30-65 years
- 3-mile radius
- Interests: Sunday lunch, British food, family dining
- NO custom audiences

**Ad Copy**:
```
"Discover Stanwell Moor's best kept secret 🍖
Award-winning Sunday roasts under the flight path
Book by Saturday 1pm for Sunday lunch"
```

### 🌡️ WARM Audience (£70/month)
**Who**: Visited any food page BUT NOT Sunday roast page
**Include**: ViewContent (any food page) - 30 days
**Exclude**: 
- ViewContent_SundayRoast (30 days)
- Purchase (60 days)
**Message**: Education/Interest
**Objective**: Traffic

**Ad Copy**:
```
"You were checking out our menu...
Our Sunday roasts are the local favorite 🥘
£14.95 • Book by Saturday 1pm
See why families come every week:"
```

### 🔥 HOT Audience (£60/month)
**Who**: Visited Sunday roast page but didn't book
**Include**: ViewContent_SundayRoast (14 days)
**Exclude**:
- InitiateCheckout (14 days)
- Purchase (60 days)
**Message**: Overcome objections
**Objective**: Conversions

**Ad Copy**:
```
"Still thinking about Sunday lunch? 
✓ £5pp deposit comes off your bill
✓ Fresh ingredients ordered just for you
✓ Saturday 1pm deadline approaching"
```

### 🎯 ABANDONED Audience (£30/month)
**Who**: Started booking but didn't complete
**Include**: InitiateCheckout (7 days)
**Exclude**: Purchase (7 days)
**Message**: Remove friction
**Objective**: Conversions

**Ad Copy**:
```
"Your Sunday table is waiting...
Complete your booking in 2 minutes
Need help? Call 01753 682707
Or finish your booking here:"
```

### ✅ CONVERTED Audience (£10/month)
**Who**: Booked in last 60 days
**Include**: Purchase (8-60 days ago)
**Exclude**: Purchase (last 7 days)
**Message**: Repeat booking
**Objective**: Traffic

**Ad Copy**:
```
"Time for another perfect Sunday? 
Your favorite roast is waiting
Same quality, same £5pp deposit
Book next Sunday:"
```

## Budget Allocation by Day

### Monday-Tuesday (Awareness Phase)
- COLD: £15
- WARM: £10
- Total: £25

### Wednesday-Thursday (Consideration Phase)
- WARM: £20
- HOT: £15
- Total: £35

### Friday (Decision Phase)
- HOT: £25
- ABANDONED: £15
- Total: £40

### Saturday Morning (Final Push)
- HOT: £10
- ABANDONED: £10
- Total: £20

**Weekly Total**: £120
**Monthly Total**: £250

## Advanced Exclusion Rules

### Prevent Audience Overlap

**COLD Campaign Excludes**:
- All website visitors (30 days)
- Page fans
- Previous purchasers (90 days)

**WARM Campaign Excludes**:
- COLD audience (to prevent double-serving)
- HOT audience
- ABANDONED audience
- CONVERTED audience

**HOT Campaign Excludes**:
- ABANDONED audience (they're further down)
- CONVERTED audience (they already booked)

## Progressive Messaging Map

### Awareness → Interest
**COLD sees**: "Discover our Sunday roasts"
**Then becomes WARM, sees**: "You checked our menu..."

### Interest → Desire
**WARM sees**: "Our Sunday roasts are special"
**Then becomes HOT, sees**: "Still thinking about it?"

### Desire → Action
**HOT sees**: "Book before Saturday 1pm"
**Then becomes ABANDONED, sees**: "Complete your booking"

### Action → Loyalty
**CONVERTED sees**: "Time for another roast?"

## Frequency Capping Strategy

### By Audience Temperature

**COLD**: Max 2 impressions/week
- Don't annoy strangers

**WARM**: Max 3 impressions/week
- Build familiarity

**HOT**: Max 5 impressions/week
- They're interested, stay visible

**ABANDONED**: Max 7 impressions/week
- High intent, push harder

**CONVERTED**: Max 1 impression/week
- Gentle reminders only

## Custom Audience Creation

### In Facebook Business Manager

**Audience 1: Food Page Visitors**
```
Include: URL contains /food OR /menu OR /drinks
Exclude: URL contains /sunday-lunch
Retention: 30 days
```

**Audience 2: Sunday Lunch Visitors**
```
Include: URL contains /sunday-lunch
Retention: 14 days
```

**Audience 3: High Intent**
```
Include: Time on page > 30 seconds AND
         URL contains /sunday-lunch
Retention: 7 days
```

**Audience 4: Booking Starters**
```
Include: Custom event "InitiateCheckout"
Retention: 7 days
```

## Performance Tracking

### Funnel Metrics

**COLD → WARM Conversion**
- Target: 5% click-through rate
- Success: They visit food pages

**WARM → HOT Conversion**
- Target: 15% visit Sunday page
- Success: They research roasts

**HOT → BOOKING Conversion**
- Target: 20% start booking
- Success: They initiate checkout

**ABANDONED → COMPLETE**
- Target: 40% complete booking
- Success: They finalize

## Budget Optimization Rules

### Weekly Review Actions

**If COLD performing well** (>5% CTR):
- Increase COLD budget by £20
- Reduce WARM budget by £20

**If HOT performing well** (>20% conversion):
- Increase HOT budget by £30
- Reduce COLD budget by £30

**If ABANDONED performing well** (>40% recovery):
- Increase ABANDONED budget by £20
- Reduce WARM budget by £20

## Testing Schedule

### Week 1-2: Baseline
Run all audiences as configured

### Week 3-4: Refine
- Pause lowest performing audience
- Reallocate budget to winner

### Week 5-6: Scale
- Expand winning audience radius
- Test lookalike of converters

### Week 7-8: Optimize
- Narrow to ultra-performers
- Test new creative on winners

## Common Pitfalls to Avoid

### DON'T:
- Show COLD ads to HOT audience (waste)
- Forget to exclude purchasers (annoyance)
- Set same bid for all audiences (inefficient)
- Use same creative for all stages (boring)

### DO:
- Update exclusions weekly
- Check audience overlap report
- Vary creative by temperature
- Monitor frequency scores

## Quick Implementation Checklist

### Pixel Setup (Day 1)
- [ ] Install base pixel
- [ ] Add ViewContent to food pages
- [ ] Add custom event for Sunday page
- [ ] Add InitiateCheckout to booking
- [ ] Add Purchase confirmation
- [ ] Test all events firing

### Audience Creation (Day 2)
- [ ] Create COLD audience
- [ ] Create WARM audience with exclusions
- [ ] Create HOT audience with exclusions
- [ ] Create ABANDONED audience
- [ ] Create CONVERTED audience
- [ ] Verify no overlap

### Campaign Structure (Day 3)
- [ ] Set up 5 campaigns (one per audience)
- [ ] Apply frequency caps
- [ ] Set progressive budgets
- [ ] Upload stage-appropriate creative
- [ ] Schedule by optimal days

## ROI by Funnel Stage

### Expected Performance

**COLD** (£80 spend):
- 16,000 reach → 800 clicks → 40 warm

**WARM** (£70 spend):
- 400 people → 60 to Sunday page

**HOT** (£60 spend):
- 60 people → 12 bookings

**ABANDONED** (£30 spend):
- 20 people → 8 recovered bookings

**CONVERTED** (£10 spend):
- 100 previous → 5 repeat bookings

**Total**: 25 bookings from £250 spend
**Cost per booking**: £10
**Revenue**: £1,000 (25 tables @ £40)
**ROI**: 300%

---

*This funnel approach means you're always showing the right message to the right person at the right time - never wasting money on the wrong audience.*