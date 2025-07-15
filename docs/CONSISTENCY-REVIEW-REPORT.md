# Website Consistency Review Report - The Anchor

**Review Date:** January 2024  
**Reviewer:** Automated Consistency Check  
**Scope:** Full website audit across all pages

## Executive Summary

This report documents inconsistencies found across The Anchor website. Critical issues include phone number formatting variations, brand naming inconsistencies, and incorrect GPS coordinates. Most issues can be resolved through standardization of data sources and component usage.

**Overall Consistency Score: 65/100**

---

## 🔴 CRITICAL ISSUES

### 1. Phone Number Formatting Inconsistency
**Severity:** CRITICAL  
**Impact:** User confusion, click-to-call failures

**Found Variations:**
- `01753 682707` (with space) - Find Us page, Homepage
- `01753682707` (no space) - Navigation CTA
- `01784421181` - Pizza page (WRONG NUMBER!)
- `+441753682707` (international) - Schema markup

**Locations Affected:**
- `/app/page.tsx` - Line 95: `href="tel:01753682707"`
- `/app/find-us/page.tsx` - Multiple instances
- `/app/food/pizza/page.tsx` - Line 115: `href="tel:01784421181"` ❌
- `/lib/schema.ts` - Line 53: `"telephone": "+441753682707"`
- `/components/Footer.tsx` - Line 77: `phone: '01753 682707'`

**Recommended Fix:**
```typescript
// Create a constants file
export const CONTACT = {
  phone: '01753 682707',
  phoneHref: 'tel:01753682707',
  phoneIntl: '+441753682707'
}
```

---

### 2. Brand Name Inconsistency
**Severity:** CRITICAL  
**Impact:** SEO confusion, brand dilution

**Found Variations:**
- "The Anchor"
- "The Anchor Pub" 
- "The Anchor pub" (lowercase p)
- "The Anchor Stanwell Moor"
- "The Anchor, Stanwell Moor"

**Locations Affected:**
- Page titles use different formats
- Schema refers to "The Anchor Pub"
- Navigation uses "The Anchor"
- Content mixes all variations

**Recommended Fix:**
- Primary: "The Anchor"
- With location: "The Anchor, Stanwell Moor"
- Never use "Pub" in the brand name

---

### 3. GPS Coordinates Mismatch
**Severity:** CRITICAL  
**Impact:** Wrong location on maps, local SEO issues

**Found Coordinates:**
- `/lib/schema.ts`: `51.4567, -0.4567` (placeholder!)
- `/app/beer-garden/page.tsx`: `51.4764, -0.4735`
- `/app/near-heathrow/terminal-5/page.tsx`: `51.4745, -0.4713`

**Recommended Fix:**
- Verify actual coordinates: `51.4764, -0.4735`
- Update all instances to match

---

## 🟡 HIGH PRIORITY ISSUES

### 4. Opening Hours Inconsistency
**Severity:** HIGH  
**Impact:** Customer confusion, missed visits

**Found Variations:**
- Schema.ts: Monday 16:00-22:00 (WRONG - closed Mondays!)
- Homepage: Shows "Closed Mondays" correctly
- Kitchen hours vary between pages

**Locations Affected:**
- `/lib/schema.ts` - Lines 64-67 (Monday hours incorrect)
- Various pages show kitchen hours differently

**Recommended Fix:**
- Remove Monday from schema openingHoursSpecification
- Create single source of truth for hours

---

### 5. Parking Information Discrepancy
**Severity:** HIGH  
**Impact:** Customer expectations

**Found Variations:**
- Find Us page: "Parking for 20 Spaces"
- Other pages: Imply larger capacity
- No consistent messaging

**Locations Affected:**
- `/app/find-us/page.tsx` - "20 spaces available"
- Marketing copy suggests "ample parking"

**Recommended Fix:**
- Verify actual capacity
- Use consistent number everywhere

---

### 6. StatusBar Implementation Inconsistency
**Severity:** HIGH  
**Impact:** Code maintainability, visual inconsistency

**Found Patterns:**
- Some pages use `<StatusBar />` directly
- Homepage uses `<StatusBarWrapper />`
- Different theme props passed
- Some pages missing StatusBar

**Examples:**
```typescript
// Pattern 1 - Direct use with theme
<StatusBar theme={{...}} />

// Pattern 2 - Wrapper component
<StatusBarWrapper />

// Pattern 3 - Default props
<StatusBar />
```

**Recommended Fix:**
- Standardize on StatusBarWrapper
- Or create page-specific variants

---

## 🟢 MEDIUM PRIORITY ISSUES

### 7. Journey Times to Heathrow
**Severity:** MEDIUM  
**Impact:** Customer planning accuracy

**Found Variations:**
- Terminal 5: "7 minutes" vs "7-12 minutes"
- Terminal 2: "10 minutes" vs "11 minutes"
- General: "7-12 minutes from all terminals"

**Recommended Fix:**
- Use consistent times: T5 (7 min), T2/3 (11 min), T4 (12 min)

---

### 8. Sunday Roast Messaging
**Severity:** MEDIUM  
**Impact:** Customer confusion on ordering

**Found Variations:**
- "Pre-order required by 1pm Saturday"
- "Pre-order and payment required"
- "Regular menu also available"

**Locations Affected:**
- `/app/food-menu/page.tsx`
- `/app/sunday-lunch/page.tsx`
- Homepage

**Recommended Fix:**
- Standardize message: "Pre-order required by 1pm Saturday. Regular menu also available on Sundays."

---

### 9. Metadata Title Format
**Severity:** MEDIUM  
**Impact:** SEO consistency

**Found Patterns:**
```
Pattern 1: [Topic] | The Anchor Stanwell Moor | [Benefit]
Pattern 2: [Topic] | The Anchor - [Description]
Pattern 3: The Anchor - [Topic]
Pattern 4: [Long descriptive title without pattern]
```

**Recommended Fix:**
- Adopt pattern: `[Page Topic] | The Anchor Stanwell Moor`

---

### 10. CTA Button Inconsistency
**Severity:** MEDIUM  
**Impact:** User experience

**Found Variations:**
- Phone: "Call Now" vs "📞 Call 01753 682707" vs "Call Us"
- Booking: "Book a Table" vs "📅 Book a Table" vs "Reserve Now"
- Directions: "Get Directions" vs "Find Us" vs "📍 Get Directions"

**Recommended Fix:**
- Standardize CTAs with consistent emoji usage

---

## 🔵 LOW PRIORITY ISSUES

### 11. Image Path Patterns
**Severity:** LOW  
**Impact:** Code maintainability

**Found Patterns:**
- Some use full paths: `/images/hero/...`
- Some inconsistent naming: `the-anchor-pub-...` vs `anchor-...`
- Alt text patterns vary

---

### 12. Component Import Order
**Severity:** LOW  
**Impact:** Code consistency

**Found Patterns:**
- No consistent import ordering
- Mix of named and default exports
- Varying path styles

---

### 13. Price Display Format
**Severity:** LOW  
**Impact:** Visual consistency

**Found Variations:**
- "£14.99"
- "£14.99 per person"
- "From £10"

---

## 📋 ACTION PLAN

### Immediate Actions (Week 1)
1. **Fix phone numbers** - Critical for business
2. **Update GPS coordinates** - Critical for local SEO
3. **Standardize brand name** - Update all instances
4. **Fix schema opening hours** - Remove Monday

### Short-term Actions (Week 2-3)
1. **Create constants file** for shared data
2. **Standardize StatusBar usage**
3. **Update parking information**
4. **Align journey times**

### Long-term Actions (Month 1)
1. **Component library** for consistent patterns
2. **Style guide documentation**
3. **Automated testing** for data consistency
4. **CMS integration** for single source of truth

---

## 🎯 RECOMMENDATIONS

### 1. Create Shared Constants
```typescript
// lib/constants.ts
export const BUSINESS_INFO = {
  name: 'The Anchor',
  fullName: 'The Anchor, Stanwell Moor',
  phone: '01753 682707',
  phoneHref: 'tel:01753682707',
  email: 'manager@the-anchor.pub',
  address: {
    street: 'Horton Road',
    town: 'Stanwell Moor',
    county: 'Surrey',
    postcode: 'TW19 6AQ'
  },
  coordinates: {
    lat: 51.4764,
    lng: -0.4735
  },
  parking: {
    capacity: 30, // Verify actual number
    description: 'Free parking available'
  }
}
```

### 2. Implement Data Validation
- Add TypeScript interfaces for all data structures
- Create validation functions for critical data
- Use ESLint rules for import ordering

### 3. Documentation Standards
- Create style guide for content writers
- Document component usage patterns
- Maintain changelog for data updates

### 4. Testing Strategy
- Implement automated checks for phone/email formats
- Add visual regression testing
- Create smoke tests for critical user paths

---

## 📊 METRICS

**Issues by Severity:**
- Critical: 3
- High: 3
- Medium: 4
- Low: 3

**Issues by Category:**
- Data Consistency: 7
- Visual/UX: 3
- Code Quality: 3

**Estimated Fix Time:**
- Critical issues: 4 hours
- All issues: 16 hours

---

## APPENDIX: Affected Files List

### Critical Fix Required
1. `/app/food/pizza/page.tsx` - Wrong phone number
2. `/lib/schema.ts` - Wrong coordinates and Monday hours
3. All pages - Brand name standardization

### High Priority Updates
1. `/app/find-us/page.tsx` - Parking info
2. `/components/StatusBar.tsx` - Usage pattern
3. All terminal pages - Journey times

### Medium Priority Updates
1. All page metadata
2. `/app/sunday-lunch/page.tsx` - Messaging
3. CTA components throughout

---

*End of Report*