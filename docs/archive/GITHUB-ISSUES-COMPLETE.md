# GitHub Issues Log - Complete List

This document contains ALL issues to be logged in GitHub, including consistency fixes and new pages to be created.

---

## 🔴 CRITICAL ISSUES (Already Fixed - Log as Completed)

### Issue #1: ✅ FIXED: Wrong phone number on Pizza page

**Labels:** `bug`, `critical`, `completed`

**Description:**
The Pizza BOGOF page contained an incorrect phone number that prevented customers from calling the pub.

**Resolution:**
- Fixed in commit: [Add commit hash]
- Changed from `01784421181` to `01753682707` in both CTAs
- File: `/app/food/pizza/page.tsx`

---

### Issue #2: ✅ FIXED: Schema shows pub open on Mondays (it's closed)

**Labels:** `bug`, `critical`, `seo`, `completed`

**Description:**
The LocalBusiness schema incorrectly showed The Anchor as open on Mondays when it's closed.

**Resolution:**
- Fixed in commit: [Add commit hash]
- Removed Monday block from openingHoursSpecification
- File: `/lib/schema.ts`

---

### Issue #3: ✅ FIXED: Fake GPS coordinates in schema

**Labels:** `bug`, `critical`, `seo`, `completed`

**Description:**
The LocalBusiness schema contained placeholder GPS coordinates instead of actual location.

**Resolution:**
- Fixed in commit: [Add commit hash]
- Updated to actual coordinates: `51.4764, -0.4735`
- File: `/lib/schema.ts`

---

## 🟡 HIGH PRIORITY CONSISTENCY ISSUES

### Issue #4: Phone number format inconsistency

**Labels:** `bug`, `high`, `consistency`, `ux`

**Description:**
Phone numbers appear in 3 different formats across the website, causing confusion and potential click-to-call failures.

**Current Behavior:**
1. `01753 682707` (with space)
2. `01753682707` (no space)
3. `+441753682707` (international)

**Acceptance Criteria:**
- [ ] Create and use constants from `/lib/constants.ts`
- [ ] Update all phone instances to use consistent format
- [ ] Test click-to-call on mobile devices

**Files to Update:**
- Multiple components and pages - see consistency report

---

### Issue #5: Brand name inconsistency

**Labels:** `bug`, `high`, `branding`, `seo`

**Description:**
The pub is referred to by 5 different names throughout the website.

**Current Variations:**
1. "The Anchor"
2. "The Anchor Pub"
3. "The Anchor pub" (lowercase p)
4. "The Anchor Stanwell Moor"
5. "The Anchor, Stanwell Moor"

**Acceptance Criteria:**
- [ ] Standardize to "The Anchor" (primary)
- [ ] Use "The Anchor, Stanwell Moor" when location needed
- [ ] Never use "Pub" in brand name
- [ ] Update all metadata and content

---

### Issue #6: Parking capacity discrepancy

**Labels:** `bug`, `high`, `content`, `customer-info`

**Description:**
Different pages state different parking capacities.

**Current State:**
- Find Us page: "20 spaces"
- Other references: "Ample parking"

**Acceptance Criteria:**
- [ ] Verify actual parking capacity with venue
- [ ] Update all references to correct number
- [ ] Use constants file for consistency

---

## 🟠 MEDIUM PRIORITY ISSUES

### Issue #7: StatusBar component implementation inconsistency

**Labels:** `technical-debt`, `medium`, `components`

**Description:**
StatusBar component is implemented differently across pages with no consistent pattern.

**Acceptance Criteria:**
- [ ] Standardize on one implementation approach
- [ ] Update all pages to use consistent pattern
- [ ] Document in component library

---

### Issue #8: Journey times to Heathrow inconsistency

**Labels:** `bug`, `medium`, `content`

**Description:**
Different pages show different journey times to the same terminals.

**Acceptance Criteria:**
- [ ] Use HEATHROW_TIMES constants consistently
- [ ] Verify times with mapping service
- [ ] Update all references

---

### Issue #9: Sunday roast messaging inconsistency

**Labels:** `bug`, `medium`, `content`

**Description:**
Different messages about Sunday roast pre-ordering requirements.

**Acceptance Criteria:**
- [ ] Use SUNDAY_ROAST constants for messaging
- [ ] Ensure all pages have consistent information
- [ ] Include note about regular menu availability

---

### Issue #10: Metadata title format inconsistency

**Labels:** `seo`, `medium`, `consistency`

**Description:**
Page titles follow no consistent format, affecting SEO and brand consistency.

**Acceptance Criteria:**
- [ ] Adopt pattern: `[Page Topic] | The Anchor, Stanwell Moor`
- [ ] Update all page metadata
- [ ] Keep within 55-60 character limit

---

### Issue #11: CTA button text inconsistency

**Labels:** `ux`, `medium`, `consistency`

**Description:**
Call-to-action buttons use different text for the same actions.

**Acceptance Criteria:**
- [ ] Standardize phone CTA: "📞 Call 01753 682707"
- [ ] Standardize booking CTA: "📅 Book a Table"
- [ ] Create CTA style guide

---

## 🔵 LOW PRIORITY ISSUES

### Issue #12: Image naming patterns

**Labels:** `technical-debt`, `low`, `maintenance`

**Description:**
Inconsistent image paths and naming conventions.

**Acceptance Criteria:**
- [ ] Document naming convention
- [ ] Rename images if feasible
- [ ] Standardize alt text patterns

---

### Issue #13: Component import ordering

**Labels:** `code-style`, `low`, `technical-debt`

**Description:**
No consistent pattern for import statement ordering.

**Acceptance Criteria:**
- [ ] Configure ESLint rule
- [ ] Auto-format all files
- [ ] Add to pre-commit hooks

---

## 🆕 NEW PAGES TO CREATE (SEO OPPORTUNITIES)

### Issue #14: Create restaurants near Heathrow hub page

**Labels:** `enhancement`, `seo`, `high-value`

**Description:**
Create comprehensive landing page targeting "restaurants near Heathrow" searches.

**Requirements:**
- URL: `/restaurants-near-heathrow`
- Target keywords: restaurants near heathrow, heathrow restaurants, places to eat near heathrow
- Include all terminals with journey times
- Add restaurant schema markup

**Acceptance Criteria:**
- [ ] Create page with proper SEO optimization
- [ ] Add to navigation/footer
- [ ] Include FAQ schema
- [ ] Add internal links from terminal pages

---

### Issue #15: Create fish & chips landing page

**Labels:** `enhancement`, `seo`, `high-value`

**Description:**
Create dedicated page for fish & chips searches (120 searches/month).

**Requirements:**
- URL: `/food/fish-and-chips`
- Target keywords: fish and chips stanwell moor, fish and chips near heathrow
- Include pricing and serving information
- Add MenuItem schema

**Acceptance Criteria:**
- [ ] Create optimized landing page
- [ ] Link from food menu
- [ ] Add to footer navigation
- [ ] Include local SEO elements

---

### Issue #16: Create dog-friendly page

**Labels:** `enhancement`, `seo`, `high-value`

**Description:**
Create comprehensive dog-friendly pub page targeting pet owners.

**Requirements:**
- URL: `/dog-friendly`
- Target keywords: dog friendly pub heathrow, dog friendly stanwell moor
- Include beer garden information
- Add specific amenities for dogs

**Acceptance Criteria:**
- [ ] Create page with dog-specific information
- [ ] Add photos of dogs in beer garden
- [ ] Include in main navigation
- [ ] Add FAQ about dog policies

---

### Issue #17: Enhance Sunday roast page for SEO

**Labels:** `enhancement`, `seo`, `high-priority`

**Description:**
Current Sunday roast page needs SEO enhancement to capture more searches.

**Requirements:**
- Optimize for "sunday roast near heathrow", "sunday lunch stanwell moor"
- Add more detailed menu information
- Include booking CTAs
- Add MenuItem schema for each roast option

**Acceptance Criteria:**
- [ ] Enhanced keyword optimization
- [ ] Detailed roast descriptions
- [ ] Pre-order process explanation
- [ ] Customer testimonials

---

### Issue #18: Create family-friendly page

**Labels:** `enhancement`, `seo`, `medium`

**Description:**
Create page targeting families looking for child-friendly pubs.

**Requirements:**
- URL: `/family-friendly`
- Include kids menu information
- Highlight safe beer garden
- Family event information

---

### Issue #19: Create quiz night page

**Labels:** `enhancement`, `seo`, `medium`

**Description:**
Dedicated page for Thursday quiz nights.

**Requirements:**
- URL: `/whats-on/quiz-nights`
- Include quiz format, prizes, times
- Add Event schema markup
- Booking information

---

### Issue #20: Create over 65s offers page

**Labels:** `enhancement`, `seo`, `medium`

**Description:**
Target searches for senior discounts and offers.

**Requirements:**
- URL: `/offers/over-65s`
- Detail Monday 20% discount
- Include menu options
- Add Offer schema

---

### Issue #21: Create Stanwell Moor pub page

**Labels:** `enhancement`, `seo`, `medium`

**Description:**
Local area page for Stanwell Moor searches.

**Requirements:**
- URL: `/stanwell-moor-pub`
- Target "stanwell moor pub" searches
- Include local community information
- Add LocalBusiness schema

---

### Issue #22: Create free parking page

**Labels:** `enhancement`, `seo`, `medium`

**Description:**
Dedicated page highlighting free parking amenity.

**Requirements:**
- URL: `/free-parking`
- Target "pub with parking heathrow"
- Include capacity and location details
- Add parking schema

---

### Issue #23: Create TW19 postcode page

**Labels:** `enhancement`, `seo`, `medium`

**Description:**
Location page for postcode-based searches.

**Requirements:**
- URL: `/locations/tw19`
- Target "pubs in TW19" searches
- Include nearby areas served
- Add postal address schema

---

## 📊 IMPLEMENTATION PRIORITY

### Sprint 1 (Week 1)
1. High priority consistency fixes (#4-#6)
2. Restaurant near Heathrow page (#14)
3. Fish & chips page (#15)

### Sprint 2 (Week 2)
1. Dog-friendly page (#16)
2. Sunday roast enhancement (#17)
3. Medium consistency fixes (#7-#11)

### Sprint 3 (Week 3)
1. Family-friendly page (#18)
2. Quiz night page (#19)
3. Over 65s offers (#20)

### Sprint 4 (Week 4)
1. Location pages (#21-#23)
2. Low priority fixes (#12-#13)
3. Testing and optimization

---

## 🎯 SUCCESS METRICS

**Technical Metrics:**
- 0 console errors
- 100% consistent data display
- All schema validates correctly

**SEO Metrics:**
- Target 400+ new visitors/month
- Improve local pack rankings
- Increase organic CTR by 20%

**Business Metrics:**
- Reduce customer confusion
- Increase phone inquiries
- Improve conversion rate

---

*Use this document to create individual GitHub issues. Each issue should be created with the appropriate labels, description, and acceptance criteria listed above.*