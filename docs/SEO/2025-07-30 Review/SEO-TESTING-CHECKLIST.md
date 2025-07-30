# SEO Implementation Testing Checklist

## Pre-Implementation Testing

### Current State Documentation
- [ ] Screenshot current footer layout (desktop & mobile)
- [ ] Export current Search Console data
- [ ] Document current 404 count
- [ ] Save current sitemap
- [ ] Test and document all booking forms
- [ ] Check current page load times
- [ ] Verify analytics tracking working

## Phase 1: Audit Testing (Read-Only)

### 1.1 Redirect Testing
```bash
# Test each redirect category
curl -I https://the-anchor.pub/drinks/carling  # Should redirect to /drinks
curl -I https://the-anchor.pub/event-details/test  # Check redirect behavior
curl -I https://the-anchor.pub/blog/old-post  # Check blog redirects
```

### 1.2 Location Page Testing
```bash
# Test all location pages return 200
for location in ashford-pub bedfont-pub egham-pub feltham-pub stanwell-pub windsor-pub staines-pub heathrow-hotels-pub; do
  echo "Testing /$location"
  curl -I https://the-anchor.pub/$location | grep "HTTP"
done
```

### 1.3 Content Verification
- [ ] Visit each Heathrow terminal page
- [ ] Check for duplicate content
- [ ] Verify images load correctly
- [ ] Test mobile responsiveness
- [ ] Check page content length (>300 words)

### 1.4 Special Pages Testing
- [ ] Verify /drinks/managers-special loads (not redirected)
- [ ] Check /drinks main page loads correctly
- [ ] Test event pages at /events/[id] work
- [ ] Confirm /whats-on displays all events

## Phase 2: Technical Implementation Testing

### 2.1 Footer Links Testing

**Before Adding Links:**
- [ ] Screenshot current footer (mobile/tablet/desktop)
- [ ] Note current footer height
- [ ] Check mobile menu behavior

**After Adding Links:**
- [ ] All 8 location links clickable
- [ ] Links go to correct pages (no 404s)
- [ ] Footer layout not broken on mobile
- [ ] No horizontal scroll on mobile
- [ ] Text readable on all devices
- [ ] Links have proper hover states
- [ ] Accessibility: keyboard navigation works

### 2.2 Robots.txt Testing

**Before Changes:**
```bash
# Save current robots.txt
curl https://the-anchor.pub/robots.txt > robots-backup.txt
```

**After Changes:**
- [ ] Test in Search Console robots.txt tester
- [ ] Verify Googlebot can access intended pages
- [ ] Check no important pages are blocked
- [ ] Validate syntax is correct
- [ ] Test specific paths:
  ```bash
  # Should be allowed
  curl -A "Googlebot" https://the-anchor.pub/drinks
  curl -A "Googlebot" https://the-anchor.pub/near-heathrow
  
  # Should still be blocked
  curl -A "Googlebot" https://the-anchor.pub/test-page
  ```

### 2.3 Canonical Tag Testing
- [ ] View source on each location page
- [ ] Verify canonical points to itself
- [ ] Check for duplicate canonicals
- [ ] Ensure HTTPS in canonical URLs
- [ ] No trailing slashes inconsistency

### 2.4 Sitemap Testing

**XML Validation:**
```bash
# Validate XML structure
xmllint --noout sitemap.xml
```

**Content Testing:**
- [ ] All URLs return 200 status
- [ ] No redirected URLs included
- [ ] No duplicate URLs
- [ ] Under 50,000 URLs
- [ ] File size under 10MB
- [ ] Lastmod dates are reasonable

### 2.5 Critical Functionality Testing

**Booking System:**
- [ ] Table booking form submits
- [ ] Confirmation emails sent
- [ ] Event booking works
- [ ] Contact form functional

**Navigation:**
- [ ] Mobile menu opens/closes
- [ ] All nav links work
- [ ] Dropdown menus functional
- [ ] Search (if exists) works

**E-commerce (if applicable):**
- [ ] Can add items to cart
- [ ] Checkout process works
- [ ] Payment processing functional

**Analytics:**
- [ ] Page views tracking
- [ ] Events firing correctly
- [ ] Goals/conversions tracking
- [ ] No duplicate tracking

## Phase 3: Content Testing

### 3.1 Heathrow Content Testing
- [ ] Each terminal page has unique content
- [ ] Transport information accurate
- [ ] Costs are clearly displayed
- [ ] Opening hours visible
- [ ] Contact information correct
- [ ] Images optimized and loading
- [ ] No broken internal links

### 3.2 FAQ Schema Testing
- [ ] Validate with Google Rich Results Test
- [ ] Questions relevant to searches
- [ ] Answers complete and accurate
- [ ] Markup properly nested
- [ ] No validation errors

### 3.3 Content Quality Checks
- [ ] No spelling/grammar errors
- [ ] Information is accurate
- [ ] Tone consistent with brand
- [ ] CTAs working properly
- [ ] No placeholder content

## Phase 4: Schema Testing

### 4.1 Schema Validation
For each schema type:
- [ ] Google Rich Results Test passes
- [ ] Schema.org validator passes
- [ ] No missing required fields
- [ ] No conflicting schemas

### 4.2 Implementation Testing
- [ ] Schema appears in page source
- [ ] JSON-LD properly formatted
- [ ] No JavaScript errors
- [ ] Schema loads on all devices

## Phase 5: Local SEO Testing

### 5.1 NAP Consistency
Check across all platforms:
- [ ] Name exactly matches
- [ ] Address formatting consistent
- [ ] Phone number identical
- [ ] Website URL correct
- [ ] Hours match website

### 5.2 Citation Testing
- [ ] All links point to correct website
- [ ] Business category consistent
- [ ] Images display properly
- [ ] Reviews/ratings showing

## Post-Implementation Testing

### Immediate (Within 1 Hour):
- [ ] Site loads normally
- [ ] No increase in error pages
- [ ] Analytics still tracking
- [ ] Critical paths working
- [ ] No console errors

### Day 1:
- [ ] Check 404 report
- [ ] Verify crawl stats
- [ ] Monitor server logs
- [ ] Check page speed
- [ ] Review user feedback

### Week 1:
- [ ] Search Console errors
- [ ] Indexation changes
- [ ] Ranking fluctuations
- [ ] Traffic patterns
- [ ] Conversion rates

## Automated Testing Setup

### Monitoring Tools:
```bash
# Set up uptime monitoring
curl -I https://the-anchor.pub > /dev/null || alert "Site Down"

# 404 monitoring
grep "404" /var/log/nginx/access.log | wc -l

# Page speed testing
lighthouse https://the-anchor.pub --output json
```

### Daily Health Check:
1. Homepage loads < 3 seconds
2. Booking form submits successfully
3. No new 404s beyond baseline
4. Search Console - no new errors
5. Analytics tracking active

## Rollback Testing

If rollback needed:
- [ ] Restore files from backup
- [ ] Clear all caches
- [ ] Test critical functionality
- [ ] Verify tracking works
- [ ] Check for 404s
- [ ] Monitor for 24 hours

## Sign-Off Checklist

Before marking phase complete:
- [ ] All tests passed
- [ ] No degradation in performance
- [ ] No increase in errors
- [ ] Functionality preserved
- [ ] Stakeholder approval
- [ ] Documentation updated

Remember: **One failure = stop and investigate before proceeding**