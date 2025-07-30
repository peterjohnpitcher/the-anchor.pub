# Heathrow Pages Audit

## Summary
This audit assesses the content quality and optimization level of all Heathrow-targeted pages.

**Audit Date**: July 30, 2025
**Total Pages**: 5 (1 main + 4 terminal-specific)

---

## Page Structure Analysis

### Main Hub Page: /near-heathrow ✅
- **Title**: "Pub Near Heathrow Airport | The Anchor Stanwell Moor | 7 Minutes from All Terminals"
- **Content Quality**: Good foundation
- **Features**:
  - Hero with CTAs
  - "Why Travelers Love The Anchor" section
  - Free parking emphasis (20 spaces)
  - StatusBar integration
  - SpeakableSchema implementation

### Terminal Pages:
1. **/near-heathrow/terminal-2** ✅
2. **/near-heathrow/terminal-3** ✅
3. **/near-heathrow/terminal-4** ✅
4. **/near-heathrow/terminal-5** ✅

**Common Features**:
- Terminal-specific titles
- TerminalNavigation component
- FlightStatus widgets
- Directions (By Car section)
- FAQAccordionWithSchema
- Proper schema markup

---

## Content Gaps vs Master Reference

### 🚨 MISSING: Critical Transport Information

According to MASTER-REFERENCE-GUIDE.md, these pages should include:

1. **Taxi Information**
   - **Missing**: "From Terminals: Around £25"
   - **Current**: Only shows driving directions

2. **Bus Service**
   - **Missing**: "Route 442: Staines-Stanwell Moor-Heathrow (operational)"
   - **Missing**: "Bus 442 stops directly outside"
   - **Missing**: "Ask driver for The Anchor stop"

3. **Specific Distances** (Currently generic)
   - Terminal 5: 7 minutes (2.8 miles) ✓
   - Terminal 4: 10 minutes ❌
   - Terminals 2 & 3: 15 minutes ❌

### ✅ CORRECT Information Being Used:
- Free parking (20 spaces)
- 7 minutes from Terminal 5
- Phone number: 01753 682707
- Outside ULEZ zone

---

## SEO Optimization Status

### Strengths:
- Unique title tags per terminal
- Proper schema implementation
- Good keyword targeting
- Internal terminal navigation
- Mobile responsive design

### Weaknesses:
- Missing comprehensive transport options
- No mention of "Surrey" location
- Limited local business schema
- No price comparisons (allowed per master ref)

---

## Recommendations for Phase 3.1

### 1. Add Transport Section to Each Terminal Page:
```jsx
// Required content from master reference:
<div className="transport-options">
  <h3>🚕 By Taxi</h3>
  <p>Around £25 from any terminal</p>
  
  <h3>🚌 By Bus</h3>
  <p>Route 442 stops directly outside</p>
  <p>Ask driver for The Anchor stop</p>
  
  <h3>🚗 By Car</h3>
  <p>[Existing content]</p>
</div>
```

### 2. Update Distance Information:
- Terminal 2 & 3 pages: Change to "15 minutes"
- Terminal 4 page: Change to "10 minutes"
- Include mileage where known

### 3. Add Value Propositions (from master ref):
- "Save 50% vs Hotel Restaurant Prices"
- "Airport food costs 2x more"
- "Outside ULEZ Zone - saves £12.50 daily"

### 4. Questions for Content Team:
**Need clarification on taxi costs**: Master reference says "Around £25" but earlier audit suggested "£8-10". Which is correct for content?

---

## Current Indexation Issues

**Remember**: These pages may not be properly indexed due to:
1. No internal links (orphaned pages)
2. Possible crawl budget issues
3. Need sitemap inclusion

---

## Next Steps

1. Complete remaining Phase 1 tasks
2. In Phase 3.1, add missing transport information
3. Verify taxi pricing before implementation
4. Consider adding Surrey location context