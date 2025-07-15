# GitHub Issues Log - The Anchor Website Consistency

This document contains all issues found during the consistency review, formatted for easy creation in GitHub Issues.

---

## Issue #1: 🚨 CRITICAL: Wrong phone number on Pizza page

### Labels
`bug`, `critical`, `quick-fix`, `customer-impact`

### Description
The Pizza BOGOF page contains an incorrect phone number that will prevent customers from calling the pub.

### Current Behavior
- **Incorrect phone:** `01784421181`
- **Correct phone:** `01753682707`

### Affected Locations
- File: `/app/food/pizza/page.tsx`
- Line 115: `<CallToAction href="tel:01784421181" variant="secondary" size="lg">`
- Line 206: `<CallToAction href="tel:01784421181" variant="secondary" size="lg">`

### Impact
- **Severity:** CRITICAL 🔴
- **Customer Impact:** Customers cannot reach the pub when trying to book for pizza deals
- **Business Impact:** Lost revenue from Tuesday/Wednesday BOGOF promotion

### Steps to Reproduce
1. Visit `/food/pizza`
2. Click any phone number CTA
3. Call goes to wrong number

### Expected Behavior
All phone CTAs should call `01753682707`

### Suggested Fix
```typescript
// Replace both instances:
<CallToAction href="tel:01753682707" variant="secondary" size="lg">
  📞 Call 01753 682707
</CallToAction>
```

### Additional Context
This page promotes the Tuesday/Wednesday pizza BOGOF deal, so incorrect contact info directly impacts revenue.

### Definition of Done
- [ ] Both phone number instances corrected
- [ ] Tested click-to-call functionality
- [ ] Verified no other pages have wrong number

---

## Issue #2: 🚨 CRITICAL: Schema shows pub open on Mondays (it's closed)

### Labels
`bug`, `critical`, `seo`, `customer-impact`

### Description
The LocalBusiness schema incorrectly shows The Anchor as open on Mondays, when it's actually closed. This affects Google Business Profile and search results.

### Current Behavior
Schema shows Monday hours as 16:00-22:00

### Affected Locations
- File: `/lib/schema.ts`
- Lines: 64-69
```typescript
{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": "Monday",
  "opens": "16:00",
  "closes": "22:00"
},
```

### Impact
- **Severity:** CRITICAL 🔴
- **Customer Impact:** Customers arriving on Monday to find pub closed
- **SEO Impact:** Google showing incorrect hours in search results
- **Review Impact:** Negative reviews from disappointed customers

### Expected Behavior
Monday should not appear in openingHoursSpecification array, or should show as closed

### Suggested Fix
```typescript
// Remove the entire Monday block from the array
// Lines 64-69 should be deleted completely
```

### Additional Context
- The Anchor is closed every Monday
- This misinformation appears in Google search results
- Could affect local pack rankings due to accuracy issues

### Definition of Done
- [ ] Monday block removed from schema
- [ ] Schema validates correctly
- [ ] Tested in Google's Rich Results Test
- [ ] Verified hours display correctly

---

## Issue #3: 🚨 CRITICAL: Fake GPS coordinates in schema

### Labels
`bug`, `critical`, `seo`, `local-seo`

### Description
The LocalBusiness schema contains placeholder GPS coordinates instead of the actual pub location.

### Current Behavior
- **Current (fake):** `latitude: 51.4567, longitude: -0.4567`
- **Actual location:** `latitude: 51.4764, longitude: -0.4735`

### Affected Locations
- File: `/lib/schema.ts`
- Lines: 49-50
```typescript
"latitude": 51.4567,
"longitude": -0.4567
```

### Impact
- **Severity:** CRITICAL 🔴
- **Local SEO Impact:** Wrong location in Google Maps
- **Customer Impact:** Navigation apps direct to wrong location
- **Business Impact:** Customers can't find the pub

### Verification
Actual coordinates verified from:
- `/app/beer-garden/page.tsx` (line 30-31)
- Google Maps: The Anchor, Horton Road, Stanwell Moor

### Suggested Fix
```typescript
"geo": {
  "@type": "GeoCoordinates",
  "latitude": 51.4764,
  "longitude": -0.4735
}
```

### Definition of Done
- [ ] Coordinates updated to actual location
- [ ] Verified against Google Maps
- [ ] Schema validates correctly
- [ ] Consistent across all schema instances

---

## Issue #4: Phone number format inconsistency

### Labels
`bug`, `high`, `consistency`, `ux`

### Description
Phone numbers appear in 3 different formats across the website, causing confusion and potential click-to-call failures.

### Current Behavior
1. `01753 682707` (with space) - Most common
2. `01753682707` (no space) - In tel: links
3. `+441753682707` (international) - In schema

### Affected Locations
Multiple files - see detailed list in consistency report

### Impact
- **Severity:** HIGH 🟡
- **UX Impact:** Inconsistent user experience
- **Technical Impact:** Some formats may not work with all devices

### Suggested Fix
Create constants file:
```typescript
// /lib/constants.ts
export const CONTACT = {
  phone: '01753 682707',        // Display format
  phoneHref: 'tel:01753682707',  // Link format
  phoneIntl: '+441753682707'     // Schema format
}
```

### Definition of Done
- [ ] Constants file created
- [ ] All phone instances updated to use constants
- [ ] Consistent format throughout site
- [ ] Click-to-call tested on mobile

---

## Issue #5: Brand name inconsistency

### Labels
`bug`, `high`, `branding`, `seo`

### Description
The pub is referred to by 5 different names throughout the website, diluting brand identity and confusing SEO.

### Current Behavior
1. "The Anchor"
2. "The Anchor Pub"
3. "The Anchor pub" (lowercase p)
4. "The Anchor Stanwell Moor"
5. "The Anchor, Stanwell Moor"

### Impact
- **Severity:** HIGH 🟡
- **Brand Impact:** Diluted brand identity
- **SEO Impact:** Confused entity recognition
- **Customer Impact:** Uncertainty about official name

### Suggested Fix
Standardize to:
- Primary: **"The Anchor"**
- With location context: **"The Anchor, Stanwell Moor"**
- Never use "Pub" in brand name

### Definition of Done
- [ ] All instances updated to standard format
- [ ] Style guide created for future reference
- [ ] Metadata titles standardized
- [ ] Schema markup consistent

---

## Issue #6: Parking capacity discrepancy

### Labels
`bug`, `high`, `content`, `customer-info`

### Description
Different pages state different parking capacities, creating customer confusion.

### Current Behavior
- Find Us page: "20 spaces"
- Other references: "Ample parking" / "Free parking"

### Affected Locations
- File: `/app/find-us/page.tsx`
- Specific text: "Parking for 20 Spaces"

### Impact
- **Severity:** HIGH 🟡
- **Customer Impact:** Uncertainty about parking availability
- **Peak Times:** May deter customers if they think parking is limited

### Investigation Needed
- [ ] Verify actual parking capacity with venue
- [ ] Check if 20 is accurate or underestimated

### Suggested Fix
Once verified, update all references to actual number (likely 30-40 spaces)

### Definition of Done
- [ ] Actual capacity verified
- [ ] All pages updated with correct number
- [ ] Consistent messaging about free parking

---

## Issue #7: StatusBar component implementation inconsistency

### Labels
`technical-debt`, `medium`, `components`, `refactor`

### Description
The StatusBar component is implemented differently across pages with no consistent pattern.

### Current Behavior
1. Direct use: `<StatusBar />`
2. With theme: `<StatusBar theme={{...}} />`
3. Wrapper: `<StatusBarWrapper />`
4. Missing entirely on some pages

### Affected Locations
- Homepage uses StatusBarWrapper
- Other pages use StatusBar directly
- Various theme implementations

### Impact
- **Severity:** MEDIUM 🟠
- **Code Impact:** Maintenance difficulty
- **Visual Impact:** Potential inconsistencies
- **Performance:** Possible duplicate code

### Suggested Fix
Standardize on one approach:
```typescript
// Option 1: Always use wrapper
<StatusBarWrapper variant="default|hero|navigation" />

// Option 2: Create page-specific variants
<StatusBar.Hero />
<StatusBar.Default />
```

### Definition of Done
- [ ] Pattern decided and documented
- [ ] All pages updated to use standard pattern
- [ ] Component documentation updated
- [ ] Visual regression tests pass

---

## Issue #8: Journey times to Heathrow inconsistency

### Labels
`bug`, `medium`, `content`, `accuracy`

### Description
Different pages show different journey times to the same Heathrow terminals.

### Current Behavior
- Terminal 5: Sometimes "7 minutes", sometimes "7-12 minutes"
- Terminal 2: "10 minutes" vs "11 minutes"
- General statements: "7-12 minutes from all terminals"

### Impact
- **Severity:** MEDIUM 🟠
- **Customer Impact:** Confusion when planning journeys
- **Trust Impact:** Appears unprofessional

### Suggested Fix
Standardize to specific times:
- Terminal 5: 7 minutes
- Terminal 2 & 3: 11 minutes  
- Terminal 4: 12 minutes

### Definition of Done
- [ ] All terminal pages show consistent times
- [ ] Homepage uses specific range (7-12 minutes)
- [ ] Journey times verified with mapping service

---

## Issue #9: Sunday roast ordering requirements messaging

### Labels
`bug`, `medium`, `content`, `customer-info`

### Description
Different pages have different messages about Sunday roast pre-ordering requirements.

### Current Behavior
1. "Pre-order required by 1pm Saturday"
2. "Pre-order and payment required by 1pm Saturday"
3. Some pages mention "regular menu also available"

### Affected Locations
- `/app/food-menu/page.tsx`
- `/app/sunday-lunch/page.tsx`
- Homepage

### Impact
- **Severity:** MEDIUM 🟠
- **Customer Impact:** Confusion about ordering process
- **Business Impact:** Missed orders due to unclear requirements

### Suggested Fix
Standardize to: "Sunday roasts require pre-order by 1pm Saturday. Regular menu also available on Sundays without pre-order."

### Definition of Done
- [ ] All mentions updated to standard message
- [ ] Clear about payment requirements
- [ ] Regular menu availability mentioned

---

## Issue #10: Metadata title format inconsistency

### Labels
`seo`, `medium`, `consistency`

### Description
Page titles follow no consistent format, affecting SEO and brand consistency.

### Current Patterns Found
1. `[Topic] | The Anchor Stanwell Moor | [Benefit]`
2. `[Topic] | The Anchor - [Description]`
3. `The Anchor - [Topic]`
4. Long descriptive titles without pattern

### Impact
- **Severity:** MEDIUM 🟠
- **SEO Impact:** Inconsistent SERP appearance
- **Brand Impact:** Unprofessional appearance

### Suggested Fix
Adopt consistent pattern:
```
Primary pages: [Page Topic] | The Anchor Stanwell Moor
Location pages: [Topic] Near [Location] | The Anchor
```

### Definition of Done
- [ ] Title format guide created
- [ ] All pages updated to standard format
- [ ] Character count within limits (55-60)
- [ ] Keywords appropriately placed

---

## Issue #11: CTA button text inconsistency

### Labels
`ux`, `medium`, `consistency`, `enhancement`

### Description
Call-to-action buttons use different text for the same actions across the site.

### Current Behavior
Phone CTAs:
- "Call Now"
- "📞 Call 01753 682707"
- "Call Us"
- "📞 Call: 01753 682707"

Booking CTAs:
- "Book a Table"
- "📅 Book a Table"
- "Reserve Now"
- "Book Your Table"

### Impact
- **Severity:** MEDIUM 🟠
- **UX Impact:** Cognitive load on users
- **Conversion Impact:** Inconsistency may affect click rates

### Suggested Fix
Standardize CTAs:
- Phone: "📞 Call 01753 682707"
- Booking: "📅 Book a Table"
- Directions: "📍 Get Directions"

### Definition of Done
- [ ] CTA style guide created
- [ ] All CTAs updated to standard format
- [ ] A/B test if possible
- [ ] Document in component library

---

## Issue #12: Image path naming patterns

### Labels
`technical-debt`, `low`, `maintenance`

### Description
Image paths and naming conventions are inconsistent across the project.

### Current Behavior
- Some use: `the-anchor-pub-[description].jpg`
- Others use: `anchor-[description].jpg`
- Directory structure varies

### Impact
- **Severity:** LOW 🔵
- **Maintenance Impact:** Harder to manage assets
- **SEO Impact:** Minor impact on image SEO

### Suggested Fix
Standardize naming:
```
/images/
  /hero/the-anchor-[description].jpg
  /food/the-anchor-[dish-name].jpg
  /events/the-anchor-[event-type].jpg
```

### Definition of Done
- [ ] Naming convention documented
- [ ] Existing images renamed (if feasible)
- [ ] Image optimization verified
- [ ] Alt text patterns standardized

---

## Issue #13: Component import ordering

### Labels
`code-style`, `low`, `technical-debt`

### Description
No consistent pattern for import statements ordering across files.

### Current Behavior
- React imports sometimes first, sometimes not
- Local vs external imports mixed
- No alphabetical ordering

### Impact
- **Severity:** LOW 🔵
- **Code Impact:** Harder to maintain
- **Team Impact:** No standard to follow

### Suggested Fix
Implement ESLint rule for import ordering:
1. React imports
2. Next.js imports
3. External libraries
4. Internal components
5. Internal utilities
6. Types
7. Styles

### Definition of Done
- [ ] ESLint rule configured
- [ ] All files auto-formatted
- [ ] Team documentation updated
- [ ] Pre-commit hooks set up

---

## Priority Matrix

### 🔴 Critical (Fix Immediately)
1. Wrong phone number on pizza page
2. Monday hours in schema (pub is closed)
3. Fake GPS coordinates

### 🟡 High (Fix This Week)
4. Phone number format inconsistency
5. Brand name inconsistency
6. Parking capacity discrepancy

### 🟠 Medium (Fix This Month)
7. StatusBar implementation
8. Journey times inconsistency
9. Sunday roast messaging
10. Metadata title formats
11. CTA button inconsistency

### 🔵 Low (Backlog)
12. Image naming patterns
13. Import ordering

---

## Batch Fix Opportunities

### Quick Wins (Under 30 mins total)
- Issues #1, #2, #3 - Direct value fixes

### Constants File Creation (1 hour)
- Issues #4, #5, #8 - Create shared data source

### Content Standardization (2 hours)
- Issues #6, #9, #10, #11 - Update all content

### Technical Refactor (4 hours)
- Issues #7, #12, #13 - Code improvements

---

*Use this document to create individual GitHub issues or as a checklist for fixes.*