#\!/bin/bash

echo "Creating priority labels..."

# Create priority labels
gh label create "P0-Critical" --description "Must fix immediately - blocks operations" --color "FF0000" 2>/dev/null || echo "P0-Critical label exists"
gh label create "P1-High" --description "Fix in next sprint - significant impact" --color "FF6600" 2>/dev/null || echo "P1-High label exists"
gh label create "P2-Medium" --description "Fix soon - moderate impact" --color "FFAA00" 2>/dev/null || echo "P2-Medium label exists"
gh label create "P3-Low" --description "Fix when possible - minor impact" --color "FFDD00" 2>/dev/null || echo "P3-Low label exists"

echo "Now updating issues with priorities..."

# Update issues with just priority labels and comments
gh issue comment 62 --body "## 🚨 Priority: P0 (CRITICAL)

### Discovery Findings
The Sunday lunch payment issue is confirmed after code analysis:

**Root Cause:** External API not returning payment requirement
- Frontend sends correct \`booking_type: 'sunday_lunch'\`
- API at \`management.orangejelly.co.uk\` treats it as regular booking
- No \`payment_required: true\` in response

**Impact:** Revenue loss, operational issues

**Action Required:**
1. Contact OrangeJelly support immediately
2. Request Sunday lunch bookings to require payment
3. Test payment flow once configured"

gh issue comment 64 --body "## 🚨 Priority: P0 (CRITICAL) 

### Discovery Findings
Google is indexing UTM parameter URLs causing duplicate content:

**Problem:** Multiple URL variations in search results
- With google_business campaign parameters
- With GBP campaign parameters

**SEO Impact:** Severe - diluted page authority

**Fix Required:**
1. Add canonical tag handling in layout.tsx
2. Implement middleware to strip UTM parameters
3. Submit handling rules to Search Console"

gh issue comment 63 --body "## ⚠️ Priority: P1 (HIGH)

### Discovery Findings
Mobile header layout issue confirmed:

**Problem:** Status bars and reviews overlap on mobile
- Conflicting flex directions
- Visibility class issues

**Files:** MobileHeaderStatus.tsx, HeaderStatusSection.tsx

**Quick Fix:** Change flex-col to flex-row in mobile header component"

gh issue comment 61 --body "## ⚠️ Priority: P1 (HIGH)

### Discovery Findings  
Menu dropdown UX issue confirmed:

**Problem:** Can't see dish descriptions when selecting
- Only shows name and price
- Description appears after selection

**Solution:** Add truncated descriptions to dropdown options or switch to card layout"

gh issue comment 59 --body "## 📋 Priority: P2 (MEDIUM)

### Discovery Findings
Technical SEO issues partially addressed:

**Status:** Most critical issues fixed
- Redirects configured
- Robots.txt updated
- Some duplicate content remains

**Next Steps:** Implement remaining recommendations from SEO documentation"

gh issue comment 52 --body "## 📝 Priority: P3 (LOW)

### Discovery Findings
Christmas content exists but needs 2025 updates:

**Pages:** christmas-parties, corporate-events
**Required:** Update packages and pricing for 2025 season
**Timeline:** Can wait until September 2025"

gh issue comment 27 --body "## 📝 Priority: P3 (LOW)

### Discovery Findings
No dedicated dog-friendly page exists:

**Opportunity:** Create /dog-friendly page
**Content:** Consolidate existing dog-friendly mentions
**SEO Value:** Target 'dog friendly pub' searches"

gh issue comment 5 --body "## 📝 Priority: P3 (LOW/ONGOING)

### Discovery Findings
SEO content expansion is ongoing:

**Status:** Significant work completed
- Many pages created
- Rich content added
- Documentation comprehensive

**Nature:** Continuous improvement task, not a specific issue"

echo "Done adding priority comments to issues."
