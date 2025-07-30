# Redirect Mapping Audit

## Summary
This audit maps all redirect patterns to determine which are for decommissioned pages (should keep) vs blocking active content (should modify).

**Audit Date**: July 30, 2025
**Total Redirect Files**: 5 (drinks, wix, legacy, blog, tag)

---

## Redirect Analysis

### 1. drinks-redirects.json (62 entries)
**Purpose**: Redirects individual drink product pages to main drinks menu
**Type**: DECOMMISSIONED PAGES - Keep these redirects

**Pattern**: `/drinks/[product-name]` → `/drinks`
**Examples**:
- `/drinks/baby-guinness` → `/drinks`
- `/drinks/desperados` → `/drinks`
- `/drinks/carling` → `/drinks`

**EXCEPTION FOUND**: 
- `/drinks/managers-special` - This is an ACTIVE page that should NOT be redirected
- **Action Required**: Ensure this URL is not in the redirect list

### 2. wix-redirects.json
**Purpose**: Legacy Wix site URL structure redirects
**Type**: DECOMMISSIONED PAGES - Keep these redirects

**Key Patterns**:
- `/food` → `/food-menu` (old URL structure)
- `/drink` → `/drinks` (old URL structure)
- `/our-events` → `/whats-on` (old URL structure)
- `/event-details/:event*` → `/whats-on` (old event structure)

**Analysis**: These are all from the old Wix site. Current events use `/events/[id]` pattern.

### 3. legacy-redirects.json
**Purpose**: Additional legacy URL patterns
**Type**: MIXED - Mostly keep

**Key Patterns**:
- `/post/:slug` → `/blog/:slug` (old blog structure)
- `/event-details/:slug` → `/whats-on` (old event structure)
- Various old page names to new equivalents

### 4. blog-redirects.json
**Purpose**: Old blog post URLs
**Type**: DECOMMISSIONED PAGES - Keep these redirects

**Note**: Need to verify if any blog posts are still active

### 5. tag-redirects.json
**Purpose**: Old tag/category URLs
**Type**: DECOMMISSIONED PAGES - Keep these redirects

---

## Active Page Verification

### Confirmed Active Pages That Must Be Accessible:
1. ✅ `/drinks` - Main drinks menu page
2. ✅ `/drinks/managers-special` - Active promotional page
3. ✅ `/events/[id]` - Dynamic event pages (NOT /event-details/)
4. ✅ `/whats-on` - Events listing page
5. ✅ `/food-menu` - Main food menu

### Event Structure Clarification:
- **Old Structure**: `/event-details/event-name`
- **Current Structure**: `/events/[id]`
- **Redirect is CORRECT**: Old event-details URLs should redirect to /whats-on

---

## Recommendations

### 1. IMMEDIATE ACTION - Check Manager's Special
**Priority**: HIGH
**Risk**: Active page might be blocked
**Action**: Verify `/drinks/managers-special` is NOT in drinks-redirects.json

### 2. KEEP ALL EVENT-DETAILS REDIRECTS
**Reason**: These are for old Wix URLs, not current site structure
**Current events**: Use `/events/[id]` pattern which is not affected

### 3. KEEP ALL OTHER REDIRECTS
**Reason**: They properly handle old URLs from previous site versions
**Benefit**: Prevents 404 errors and maintains SEO value from old links

---

## Robots.txt Implications

Based on this analysis:
- `/event-details/` block in robots.txt is SAFE (old URLs)
- `/drinks/` block needs investigation - might block active content
- `/post/` block is likely SAFE (old blog structure)

---

## Next Steps

1. Check if `/drinks/managers-special` is in redirect list
2. Proceed to Phase 1.2 - Test location pages
3. Document findings in progress log