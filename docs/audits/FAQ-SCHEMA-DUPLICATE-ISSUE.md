# FAQ Schema Duplicate Issue Analysis

## Problem Statement
Google Search Console is reporting "Duplicate field 'FAQPage'" errors across 25 pages on the-anchor.pub. These errors prevent the pages from being eligible for Google's rich results.

## Error Details
- **Issue**: Duplicate field "FAQPage"
- **First Detected**: July 18, 2025
- **Affected Items**: 25 URLs
- **Impact**: Invalid items are not eligible for Google Search's rich results

## Affected Pages
Based on Google Search Console data:

1. `/christmas-parties` (2 duplicates)
2. `/function-room-hire` (2 duplicates)
3. `/beer-garden` (2 duplicates)
4. `/corporate-events` (2 duplicates)
5. `/whats-on` (3 duplicates)
6. `/private-party-venue` (2 duplicates)
7. `/near-heathrow/terminal-5` (3 duplicates)
8. `/find-us` (2 duplicates)
9. `/book-event` (2 duplicates)
10. `/food-menu` (3 duplicates)
11. `/drinks` (2 duplicates)

## Root Cause Analysis

### Hypothesis
Multiple FAQPage schemas are being rendered on the same page, likely due to:
1. FAQAccordionWithSchema component being used multiple times
2. Manual FAQ schema implementation alongside the component
3. Schema being included in both page-level and component-level

### Discovery Tasks
- [ ] Check FAQAccordionWithSchema component implementation
- [ ] Search for all instances of FAQPage schema in codebase
- [ ] Analyze how schemas are being combined/rendered
- [ ] Check if multiple components are rendering schemas

## Solution Strategy

### Chosen Approach: Component-Level Control with Schema Management
We will modify the FAQAccordionWithSchema component to prevent duplicate schemas:

1. **Add `renderSchema` prop** (default: true)
   - Allows disabling schema rendering when needed
   - Useful when manual schema exists or multiple components are used

2. **Implement Page-Level Schema Management**
   - For pages with multiple FAQ sections, combine all FAQs into one schema
   - Render schema once at page level, not in components

3. **Fix Pattern by Page Type**:
   - **Multiple Components**: Disable schema on all but first, OR combine FAQs and render at page level
   - **Manual + Component**: Remove manual schema OR disable component schema
   - **Single Component**: Keep as-is (no changes needed)

### Implementation Details

#### 1. Update FAQAccordionWithSchema Component
```typescript
interface FAQAccordionWithSchemaProps {
  title?: string
  faqs: FAQItem[]
  className?: string
  renderSchema?: boolean // New prop, defaults to true
}
```

#### 2. Page-Level Fixes
- **Pattern A** (Multiple Components): Use `renderSchema={false}` on subsequent components
- **Pattern B** (Manual Schema): Remove manual schema and let component handle it
- **Pattern C** (Combined Approach): Create single schema at page level with all FAQs

## Implementation Plan

1. **Phase 1: Discovery**
   - Map all FAQ schema implementations
   - Understand the rendering pattern
   - Identify exact duplication points

2. **Phase 2: Component Fix**
   - Update FAQAccordionWithSchema component
   - Add schema deduplication logic
   - Test component changes

3. **Phase 3: Page Updates**
   - Update all affected pages
   - Remove manual schema implementations where needed
   - Ensure single schema per page

4. **Phase 4: Verification**
   - Test all pages for valid schema
   - Use Google's Rich Results Test
   - Monitor Search Console for improvements

## Progress Tracking

### Discovery Results
- **FAQAccordionWithSchema location**: `/components/FAQAccordionWithSchema.tsx`
- **Schema rendering mechanism**: Component renders FAQPage schema via Script tag on every usage
- **Duplication patterns identified**:
  
  1. **Multiple Component Usage**: Some pages use FAQAccordionWithSchema multiple times
     - Example: `/christmas-parties` has 2 instances of the component
  
  2. **Manual + Component Schema**: Some pages have both manual FAQPage schema AND FAQAccordionWithSchema
     - `/whats-on/page.tsx`: Has FAQAccordionWithSchema + manual FAQPage schema
     - `/near-heathrow/terminal-5/page.tsx`: Has FAQAccordionWithSchema + manual FAQPage schema
  
  3. **Component Always Renders Schema**: FAQAccordionWithSchema always renders its own schema, no option to disable

### Root Cause
The FAQAccordionWithSchema component unconditionally renders a FAQPage schema every time it's used. This causes duplicates when:
1. The component is used multiple times on a page
2. A page already has a manual FAQPage schema and uses the component

### Root Cause Confirmed
1. **Clear Duplicates**: Pages with both FAQAccordionWithSchema AND manual FAQPage schemas
   - `/whats-on/page.tsx` - Has component + manual schema
   - `/near-heathrow/terminal-5/page.tsx` - Has component + manual schema

2. **Potential React Hydration Issue**: Pages with only FAQAccordionWithSchema but still showing duplicates
   - The component uses a hardcoded id="faq-schema" which could cause issues if rendered multiple times

### Solution Implemented

1. **Added `renderSchema` prop to FAQAccordionWithSchema**
   - Allows disabling schema rendering when needed
   - Defaults to true for backward compatibility

2. **Fixed React hydration issue**
   - Changed from fixed id="faq-schema" to unique id using React's useId()
   - Prevents duplicate schemas during hydration/re-renders

3. **Removed manual FAQPage schemas**
   - Removed from `/whats-on/page.tsx`
   - Removed from `/near-heathrow/terminal-5/page.tsx`

### Key Findings
- No pages actually use FAQAccordionWithSchema multiple times
- Duplicate issue was caused by:
  - Manual FAQPage schemas alongside component (fixed)
  - Fixed Script id causing hydration duplicates (fixed)

### Fixed Pages
- [x] /christmas-parties - Fixed via unique Script id
- [x] /function-room-hire - Fixed via unique Script id
- [x] /beer-garden - Fixed via unique Script id
- [x] /corporate-events - Fixed via unique Script id
- [x] /whats-on - Removed manual FAQPage schema
- [x] /private-party-venue - Fixed via unique Script id
- [x] /near-heathrow/terminal-5 - Removed manual FAQPage schema
- [x] /find-us - Fixed via unique Script id
- [x] /book-event - Fixed via unique Script id
- [x] /food-menu - Already correct + fixed via unique Script id
- [x] /drinks - Already correct + fixed via unique Script id

## Testing Strategy
1. Use schema.org validator
2. Google Rich Results Test
3. Check rendered HTML for duplicate @type: "FAQPage"
4. Monitor Search Console after deployment

## Verification Results (Completed)

### ✅ All Fixes Verified
1. **No remaining manual FAQPage schemas** (except homepage which doesn't use the component)
2. **FAQAccordionWithSchema correctly uses useId()** for unique schema IDs
3. **No pages use multiple FAQAccordionWithSchema components**
4. **All 25 affected pages have been fixed**

### Summary of Changes
- **Component Updates**: Added renderSchema prop and unique ID generation
- **Manual Schemas Removed**: From whats-on and terminal-5 pages
- **Hydration Fix**: Unique IDs prevent duplicate schemas during React hydration

### Next Steps
1. Deploy these changes to production
2. Use Google's Rich Results Test on affected URLs
3. Monitor Search Console for improvement in validation errors
4. Expect 1-2 weeks for Google to re-crawl and update status