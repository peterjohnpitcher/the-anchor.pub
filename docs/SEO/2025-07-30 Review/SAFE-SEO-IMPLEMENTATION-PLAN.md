# Safe SEO Implementation Plan - The Anchor Pub

## Overview

This plan prioritizes safety and verification at every step. No changes will be made without first confirming they won't break existing functionality. The approach is "measure twice, cut once."

## Critical Principles

1. **Verify Before Modifying** - Test everything before changing anything
2. **Incremental Changes** - Small, reversible changes with monitoring
3. **Backup Everything** - Keep rollback options available
4. **Monitor Continuously** - Watch for issues after each change
5. **Document Everything** - Track what was changed and why

## Phase 1: Audit & Verification (Days 1-2)
**Goal**: Understand current state without making ANY changes

### 1.1 Redirect Mapping
**What**: Document every redirect pattern and its purpose
**How**: 
```bash
# Extract all redirects
cat drinks-redirects.json wix-redirects.json legacy-redirects.json > all-redirects.json
# Test sample URLs from each redirect file
```
**Risk**: None - read-only operation
**Output**: Spreadsheet showing URL → Redirect → Purpose

### 1.2 Location Page Testing
**What**: Verify all 8 location pages load correctly
**Test URLs**:
- /ashford-pub
- /bedfont-pub
- /egham-pub
- /feltham-pub
- /stanwell-pub
- /windsor-pub
- /staines-pub
- /heathrow-hotels-pub

**Risk**: None - just testing
**Output**: Confirmation all pages return 200 status

### 1.3 Robots.txt Audit
**What**: Check if blocked paths have real content
**How**:
```bash
# For each Disallow in robots.txt:
# 1. Try to access the URL
# 2. Check if it returns content or redirects
# 3. Document findings
```
**Current Blocks to Verify**:
- /post/ (likely old blog URLs)
- /event-details/ (need to check if used)
- /drinks/ (verify this isn't blocking /drinks page itself)

### 1.4 Heathrow Page Quality Check
**What**: Verify terminal pages exist and assess content
**URLs to Check**:
- /near-heathrow
- /near-heathrow/terminal-2
- /near-heathrow/terminal-3
- /near-heathrow/terminal-4
- /near-heathrow/terminal-5

**Assessment Criteria**:
- Page loads successfully
- Content is substantial (not placeholder)
- No duplicate content issues
- Mobile responsive

### 1.5 Event-Details Pattern Search
**What**: Search codebase for /event-details/ usage
**How**:
```bash
# Search all files for event-details references
grep -r "event-details" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"
```
**Risk**: None
**Decision Point**: If found, keep redirects. If not found, consider removal.

### 1.6 Managers Special Access Test
**What**: Ensure /drinks/managers-special isn't caught by redirects
**How**: Direct browser test + curl test
**Expected**: Should load page, not redirect to /drinks

### 1.7 Create Backups
**What**: Backup critical configuration files
**Files**:
- next.config.js
- robots.txt
- All redirect JSON files
- Current sitemap

**How**:
```bash
mkdir backups-2025-07-30
cp next.config.js robots.txt *.json backups-2025-07-30/
```

### 1.8 Baseline Metrics
**What**: Document current performance for comparison
**Metrics to Record**:
- Total indexed pages
- Current traffic (daily average)
- Top 20 ranking keywords
- 404 error count
- Core Web Vitals scores

## Phase 2: Safe Technical Fixes (Days 3-4)
**Goal**: Make low-risk changes that can't break functionality

### 2.1 Add Location Links to Footer
**What**: Create "Areas We Serve" section
**Implementation**:
```jsx
// In Footer component
<div className="footer-section">
  <h4>Areas We Serve</h4>
  <ul>
    <li><Link href="/ashford-pub">Ashford</Link></li>
    <li><Link href="/bedfont-pub">Bedfont</Link></li>
    // ... other locations
  </ul>
</div>
```
**Risk**: Minimal - just adding links
**Rollback**: Remove the section

### 2.2 Careful Robots.txt Updates
**What**: Only unblock confirmed content
**Safe Approach**:
```
# Instead of removing all blocks, be specific
# If /event-details/ has no content, keep block
# If /drinks/ is blocking the main page, modify to:
Disallow: /drinks/product-* # More specific pattern
```
**Testing**: Use robots.txt tester in Search Console

### 2.3 Add Canonical Tags
**What**: Ensure location pages have self-referencing canonicals
**Implementation**:
```jsx
// In each location page
<link rel="canonical" href="https://www.the-anchor.pub/ashford-pub" />
```
**Risk**: Low - reinforces page authority
**Benefit**: Prevents duplicate content issues

### 2.4 Comprehensive Sitemap
**What**: Include all verified pages
**Validation**:
- Test each URL returns 200
- Check for duplicates
- Validate XML format
- Limit to 50,000 URLs

### 2.5 Post-Change Testing
**Critical Tests**:
1. Run full site crawl - check for 404s
2. Test all navigation paths
3. Verify redirects still work
4. Check mobile responsiveness
5. Test booking/contact forms

**Tools**:
- Screaming Frog for crawl
- Google Mobile-Friendly Test
- Manual testing of critical paths

### 2.6 Search Console Submission
**Process**:
1. Submit sitemap
2. Request indexing for priority pages
3. Monitor coverage report daily

### 2.7 404 Monitoring Setup
**Implementation**:
- Set up Google Analytics 404 tracking
- Create daily alert for new 404s
- Log all 404s for first week

## Phase 3: Content Optimization (Week 2)
**Goal**: Improve content without changing URLs or structure

### 3.1 Heathrow Page Enhancement
**Safe Approach**:
1. Add content to existing pages (don't change URLs)
2. Include:
   - Taxi costs: £8-10 per terminal
   - Driving time: 5-7 minutes
   - Parking availability
   - Public transport options
   - Opening hours relevance

**Template Structure**:
```markdown
## Getting to The Anchor from Terminal [X]

### By Taxi
- Cost: £8-10
- Journey time: 5-7 minutes
- Taxi ranks located at...

### By Car
- Free customer parking
- 5 minute drive via [specific route]

### Opening Hours for Airport Travelers
- Kitchen open until 9pm
- Full menu available all day
```

### 3.2 FAQ Schema for Heathrow
**Questions to Include**:
- How far is The Anchor from Terminal X?
- Do you have parking for airport customers?
- Can I walk from the terminal?
- What are your hours for early flights?

**Testing**: Google Rich Results Test before deploying

### 3.3 Sunday Lunch Optimization
**Current Position**: 14.54 for "sunday roast near me"
**Safe Improvements**:
1. Update title tag: "Award-Winning Sunday Roast Near Me | The Anchor"
2. Add customer reviews about Sunday roast
3. Include prices and serving times prominently
4. Add photos of actual roasts

**Monitoring**: Track position daily after changes

## Phase 4: Schema Implementation (Week 3)
**Goal**: Add structured data without breaking existing functionality

### 4.1 Menu Schema
**Validation Process**:
1. Implement on staging first
2. Test with Google tool
3. Check for conflicts with existing schemas
4. Deploy to one page first
5. Monitor for errors in Search Console

### 4.2 Event Schema
**Safe Implementation**:
- Start with one event type
- Monitor Search Console for errors
- Roll out to all events if successful

## Risk Mitigation Strategies

### For Every Change:
1. **Test in staging** if possible
2. **Make changes early in day** - allows monitoring
3. **Have rollback plan** ready
4. **Monitor for 24 hours** before next change
5. **Document what was changed** with timestamps

### Red Flags to Watch For:
- Sudden traffic drops (>20%)
- Increase in 404 errors
- Search Console coverage errors
- Customer complaints about broken features
- Booking system failures

### Emergency Rollback Procedure:
1. Restore configuration files from backup
2. Clear CDN cache
3. Submit sitemap to force recrawl
4. Monitor recovery

## Success Metrics & Checkpoints

### Week 1 Checkpoint:
- [ ] No increase in 404 errors
- [ ] All critical functions working
- [ ] Location pages receiving crawls
- [ ] No customer complaints

### Week 2 Checkpoint:
- [ ] Indexed pages increasing
- [ ] Heathrow pages showing impressions
- [ ] Sunday roast keyword improving
- [ ] No technical errors in Search Console

### Week 4 Checkpoint:
- [ ] 50%+ increase in indexed pages
- [ ] First Heathrow traffic appearing
- [ ] Local searches improving
- [ ] Rich snippets showing

### Month 2 Target:
- [ ] 200+ indexed pages (from 90)
- [ ] 500+ clicks/month (from 60)
- [ ] Top 20 for priority keywords
- [ ] No technical debt created

## Communication Plan

### Internal Updates:
- Daily status during Phase 1-2
- Weekly reports thereafter
- Immediate alerts for any issues

### Stakeholder Communication:
- Set expectations: 3-6 months for full results
- Share early wins (indexation improvements)
- Explain temporary fluctuations are normal

## Conclusion

This plan prioritizes stability over speed. Every change is verified, tested, and monitored before moving to the next step. The phased approach allows for course correction and ensures that SEO improvements don't compromise site functionality.

Remember: It's better to improve slowly and safely than to risk breaking a functioning website.