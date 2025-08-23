# The Anchor Website Consistency Report

## Executive Summary

This report documents inconsistencies found across The Anchor website. The analysis covered all pages in the `/app` directory, examining contact information, branding, metadata, visual components, and content patterns.

## Critical Issues

### 1. **Contact Information Inconsistencies**

**Phone Number Format** - **CRITICAL**
- Multiple formats used: `01753 682707`, `01753682707`, `+441753682707`
- **Pages affected**: All pages with phone links
- **Severity**: Critical - confuses users and search engines
- **Fix**: Standardize to `01753 682707` for display, `01753682707` for tel: links

**Email Address** - **HIGH**
- Schema uses: `manager@the-anchor.pub`
- Footer component uses: `manager@the-anchor.pub`  
- No other email addresses found (consistent)
- **Severity**: Low - currently consistent

### 2. **Brand Naming Inconsistencies**

**CRITICAL** - Multiple variations found:
- "The Anchor" (most common)
- "The Anchor Pub" (in meta titles)
- "The Anchor, Stanwell Moor" (in titles)
- "The Anchor Stanwell Moor" (in metadata)

**Locations**:
- Layout.tsx line 112: `template: '%s | The Anchor Stanwell Moor'`
- Layout.tsx line 125: `title: 'The Anchor Pub - Stanwell Moor\'s Premier Entertainment Venue'`
- Multiple schema references with different formats

**Fix**: Standardize to "The Anchor" for brand name, "The Anchor, Stanwell Moor" when location context needed

### 3. **Parking Information Discrepancy** - **HIGH**

- Find Us page (line 273): "20 Spaces"
- Homepage (line 82): "50+ spaces" implied by "Free Parking"
- Find Us page (line 287): "Extended parking available"

**Fix**: Verify actual parking capacity and update all references

### 4. **Metadata Title Format Inconsistencies**

Different patterns used:
- `'Pub Near Heathrow Terminal 5 | The Anchor - 7 Minutes Away'` (terminal-5/page.tsx)
- `'Find Us | The Anchor Stanwell Moor | Directions & Parking'` (find-us/page.tsx)
- `'Food Menu | The Anchor Stanwell Moor | Traditional British Pub Food'` (food-menu/page.tsx)

**Fix**: Standardize to: `[Page Topic] | The Anchor, Stanwell Moor | [Key Benefit]`

### 5. **StatusBar Component Usage** - **MEDIUM**

Inconsistent implementation:
- Homepage uses `<StatusBarWrapper />` (line 71)
- Find Us page uses `<StatusBar />` directly with custom theme (lines 54-61)
- Food Menu page uses `<StatusBar />` with different theme config

**Fix**: Create consistent StatusBar usage pattern, possibly always use StatusBarWrapper

### 6. **Schema Data vs Display Data** - **HIGH**

**Address Format**:
- Schema: Full structured address with PostalAddress type
- Display: Sometimes just "Horton Road, Stanwell Moor", sometimes full address
- Postcode: Always "TW19 6AQ" (consistent)

**Geo Coordinates**:
- schema.ts: `latitude: 51.4567, longitude: -0.4567` (generic)
- terminal-5 page: `latitude: 51.4745, longitude: -0.4713` (specific)

**Fix**: Use accurate coordinates consistently

### 7. **Opening Hours Display** - **MEDIUM**

- Schema.ts has static hours (e.g., Monday 16:00-22:00)
- BusinessHours component fetches dynamic hours from API
- Some pages mention "May vary on holidays", others don't

**Fix**: Always use dynamic hours, add consistent holiday disclaimer

### 8. **Image Path Patterns** - **LOW**

Most images follow pattern: `/images/[category]/[subcategory]/descriptive-name.jpg`
Some inconsistencies:
- Hero images sometimes in `/images/hero/`
- Some venue images in `/images/venue/`
- Logo has multiple versions with different paths

**Fix**: Document image naming convention

### 9. **CTA Button Inconsistencies** - **MEDIUM**

Different booking CTAs:
- "📅 Book a Table" (most common)
- "📞 Book a Table" (terminal pages)
- "Book Your Table Now" (food menu)
- External link inconsistently marked

**Fix**: Standardize primary booking CTA

### 10. **Feature Lists** - **LOW**

Dog-friendly mentioned as:
- "🐕 Dog Friendly" 
- "Dogs and families always welcome!"
- "Dog-friendly beer garden"

Similar variations for other features.

**Fix**: Create standard feature list component

## Medium Priority Issues

### 11. **Journey Times to Heathrow**

Terminal 5 page states:
- "7 minutes" in multiple places
- "7-12 minutes" on homepage for all terminals
- Find Us page: Different times for each terminal

**Fix**: Verify actual journey times and be consistent

### 12. **Sunday Roast Information**

Different messages about pre-ordering:
- "Pre-order required" 
- "Pre-order required by 1pm Saturday"
- "Regular menu also available" (not always mentioned)

**Fix**: Create single source of truth for Sunday roast rules

### 13. **Navigation Items**

Footer has different navigation structure than main nav:
- Footer includes "Sitemap" link
- Footer separates "Sunday Roast" from "Food Menu"
- Main nav combines them under "Food"

**Fix**: Align navigation structures

## Low Priority Issues

### 14. **Weather Component Usage**

- Sometimes shown in navigation
- Sometimes in BusinessHours component
- Not consistently used across pages

### 15. **Social Media Links**

- Facebook: `https://www.facebook.com/theanchorpubsm/`
- Instagram: `https://www.instagram.com/theanchor.pub/`
- Only referenced in Footer and schema, not promoted elsewhere

### 16. **Error Handling Patterns**

No consistent error states for:
- Failed API calls
- Missing data
- Loading states (some use skeleton, others don't)

## Recommendations

### Immediate Actions (Critical)

1. **Standardize Contact Info**
   - Phone: Always display as "01753 682707"
   - Create utility function for phone formatting
   - Update all tel: links to use consistent format

2. **Fix Brand Naming**
   - Primary: "The Anchor"
   - With location: "The Anchor, Stanwell Moor"
   - Never use "The Anchor Pub" in customer-facing content

3. **Verify and Fix Parking Info**
   - Confirm actual number of spaces
   - Update all references to match reality

### Short-term Actions (High Priority)

4. **Create Consistent Components**
   - StandardMetadata component for page metadata
   - FeatureList component for amenities
   - ContactBlock component for address/phone display

5. **Update Schema Data**
   - Use accurate GPS coordinates
   - Ensure schema matches displayed content
   - Consider dynamic schema generation

### Long-term Improvements

6. **Design System Documentation**
   - Document all UI patterns
   - Create component usage guidelines
   - Establish content style guide

7. **Automated Testing**
   - Add tests for consistent data display
   - Validate schema markup
   - Check for broken links and missing images

## Conclusion

While The Anchor website functions well, these consistency issues could impact:
- SEO performance (conflicting schema data)
- User trust (inconsistent information)
- Local search rankings (NAP consistency)
- Brand perception (naming variations)

Addressing the critical and high-priority issues should be the immediate focus, particularly standardizing contact information and brand naming across all pages.