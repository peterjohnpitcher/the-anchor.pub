# SEO Tracking & Measurement Guide - The Anchor

## Overview

This guide outlines how to track, measure, and optimize the local SEO campaign for The Anchor pub. It includes KPIs, tracking setup, reporting templates, and optimization workflows.

## Key Performance Indicators (KPIs)

### Primary KPIs
1. **Organic Traffic Growth**
   - Baseline: Current monthly organic visitors
   - Target: +400 visitors/month within 6 months
   - Measurement: Google Analytics 4

2. **Local Pack Rankings**
   - Target keywords ranking in top 3 local results
   - Focus on "pub staines", "restaurants heathrow", etc.
   - Measurement: Manual checks + rank tracking tool

3. **Conversion Metrics**
   - Phone calls from website
   - "Get Directions" clicks
   - Table booking clicks
   - Measurement: GA4 events

4. **Revenue Attribution**
   - Track bookings mentioning website
   - Monitor Friday fish & chips uptake
   - Sunday roast pre-orders
   - Measurement: POS notes + booking system

### Secondary KPIs
- Page visibility in Search Console
- Click-through rates by page
- Average session duration
- Pages per session
- Bounce rate by landing page

## Tracking Setup

### Google Analytics 4 Configuration

#### Events to Track
```javascript
// Phone Click Event
gtag('event', 'click', {
  'event_category': 'contact',
  'event_label': 'phone_number',
  'value': '01753682707'
});

// Directions Click Event
gtag('event', 'click', {
  'event_category': 'directions',
  'event_label': 'google_maps',
  'page_location': window.location.href
});

// Booking Click Event
gtag('event', 'click', {
  'event_category': 'booking',
  'event_label': 'table_reservation',
  'booking_source': 'ordertab'
});

// Offer View Event
gtag('event', 'view_item', {
  'event_category': 'offers',
  'event_label': 'fish_chips_friday',
  'value': '50_percent_off'
});
```

#### Custom Dimensions
1. **landing_page_type**: location/feature/food/event
2. **user_distance**: near/medium/far (based on location)
3. **time_of_day**: breakfast/lunch/dinner/late
4. **device_category**: mobile/tablet/desktop

### Google Search Console Setup

#### URL Inspection Priorities
1. Submit all new URLs immediately
2. Request indexing for high-priority pages
3. Monitor coverage errors weekly
4. Check mobile usability issues

#### Search Performance Tracking
- Filter by page to track individual performance
- Monitor queries for content opportunities
- Track position changes for target keywords
- Identify trending searches

### Local SEO Tracking Tools

#### Google Business Profile Insights
- Monitor "discovery" searches vs "direct" searches
- Track phone calls from GBP
- Monitor direction requests
- Review photo views and engagement

#### Third-Party Tools Setup
1. **BrightLocal** or **Whitespark**
   - Local rank tracking
   - Citation monitoring
   - Review tracking

2. **Semrush** or **Ahrefs**
   - Competitor tracking
   - Backlink monitoring
   - Keyword gap analysis

## Reporting Templates

### Weekly SEO Report

```markdown
# Weekly SEO Report - Week of [Date]

## Traffic Overview
- Total Organic Traffic: [Number] ([+/-]% vs last week)
- New vs Returning: [%] / [%]
- Top Landing Pages:
  1. [Page]: [Visits]
  2. [Page]: [Visits]
  3. [Page]: [Visits]

## Conversion Metrics
- Phone Calls: [Number]
- Direction Clicks: [Number]
- Booking Clicks: [Number]
- Conversion Rate: [%]

## New Page Performance
- [New Page 1]: [Impressions] / [Clicks] / [CTR]
- [New Page 2]: [Impressions] / [Clicks] / [CTR]

## Action Items
- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]
```

### Monthly SEO Report

```markdown
# Monthly SEO Report - [Month Year]

## Executive Summary
[2-3 sentences on overall performance]

## Traffic Analysis
### Organic Traffic Growth
- Total Sessions: [Number] ([+/-]% MoM)
- Users: [Number] ([+/-]% MoM)
- Pageviews: [Number] ([+/-]% MoM)

### Traffic by Page Category
- Location Pages: [%] of traffic
- Feature Pages: [%] of traffic
- Food Pages: [%] of traffic
- Event Pages: [%] of traffic

## Keyword Rankings
### Improving Keywords
1. [Keyword]: Position [X] → [Y]
2. [Keyword]: Position [X] → [Y]

### New Rankings
1. [Keyword]: Position [X]
2. [Keyword]: Position [X]

## Conversion Performance
- Total Conversions: [Number]
- Conversion Rate: [%]
- Most Converting Pages:
  1. [Page]: [Conversions]
  2. [Page]: [Conversions]

## Competitive Analysis
- Share of Voice: [%]
- New Competitor Pages: [List]
- Opportunities Identified: [List]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]
```

## Optimization Workflows

### New Page Optimization (Week 1-4)

#### Week 1: Launch & Monitor
- Submit to Search Console
- Check indexing status
- Monitor initial impressions
- Add internal links

#### Week 2: Early Optimization
- Review search queries
- Optimize meta description based on CTR
- Add FAQ questions from queries
- Improve internal linking

#### Week 3: Content Enhancement
- Add sections addressing search queries
- Update images if needed
- Enhance schema markup
- Add more related keywords

#### Week 4: Performance Review
- Analyze traffic patterns
- Review user behavior
- Compare to projections
- Plan next optimizations

### Ongoing Optimization Process

#### Daily Tasks (5 mins)
- Check Search Console for errors
- Monitor phone call tracking
- Review any user feedback

#### Weekly Tasks (30 mins)
- Run ranking checks for top keywords
- Review GA4 landing page report
- Check competitor changes
- Update content calendar

#### Monthly Tasks (2 hours)
- Comprehensive performance review
- Competitive analysis
- Content gap analysis
- Strategy adjustment

## A/B Testing Framework

### Elements to Test

#### Meta Descriptions
- Version A: Feature-focused
- Version B: Benefit-focused
- Measurement: CTR in Search Console

#### Page Titles
- Version A: Keyword-first
- Version B: Brand-first
- Measurement: Rankings + CTR

#### CTA Buttons
- Version A: "Book a Table"
- Version B: "Reserve Your Spot"
- Measurement: Click rate

#### Hero Images
- Version A: Interior shot
- Version B: Food/drink shot
- Measurement: Bounce rate + time on page

### Testing Process
1. Run tests for minimum 2 weeks
2. Require 95% statistical significance
3. Document all test results
4. Implement winners site-wide

## Performance Benchmarks

### Page Load Speed
- Target: <2.5s LCP on mobile
- Current: [Measure baseline]
- Tools: PageSpeed Insights, GTmetrix

### Search Visibility
- Target: First page for all primary keywords
- Target: Top 3 for high-priority local terms
- Measurement: Rank tracking + GSC

### User Engagement
- Target Bounce Rate: <60%
- Target Session Duration: >2 minutes
- Target Pages/Session: >2.5

### Conversion Rates
- Phone Clicks: >5% of sessions
- Direction Clicks: >3% of sessions
- Booking Clicks: >2% of sessions

## Troubleshooting Guide

### Common Issues & Solutions

#### Issue: Page Not Ranking
1. Check indexing status in GSC
2. Verify no technical issues
3. Review content quality/length
4. Check for cannibalization
5. Build more internal links

#### Issue: Low CTR
1. Test new meta descriptions
2. Add structured data
3. Include publication date
4. Use emotional triggers
5. Add special offers

#### Issue: High Bounce Rate
1. Improve page load speed
2. Ensure content matches intent
3. Add clear CTAs above fold
4. Improve mobile experience
5. Add related content links

#### Issue: No Conversions
1. Make phone number more prominent
2. Add multiple CTAs
3. Include trust signals
4. Show opening hours clearly
5. Simplify booking process

## ROI Calculation

### Metrics to Track
1. **Organic Traffic Value**
   - Sessions × Average Order Value × Conversion Rate
   - Example: 400 × £25 × 2% = £200/month

2. **Phone Call Value**
   - Calls × Booking Rate × Average Spend
   - Example: 50 × 30% × £40 = £600/month

3. **Local Visibility Value**
   - Reduced PPC spend
   - Brand awareness increase
   - Long-term customer value

### Reporting ROI
```
Monthly SEO Value:
- Direct Revenue: £[X]
- Cost Savings: £[X]
- Total Value: £[X]
- SEO Investment: £[X]
- ROI: [X]%
```

## Tools & Resources

### Essential Tools
1. **Google Analytics 4** - Traffic & behavior
2. **Google Search Console** - Search performance
3. **Google Business Profile** - Local insights
4. **PageSpeed Insights** - Performance
5. **Schema Validator** - Markup testing

### Recommended Tools
1. **Screaming Frog** - Technical audits
2. **BrightLocal** - Local rank tracking
3. **Hotjar** - User behavior
4. **Semrush** - Competitive intelligence
5. **Canva** - Image creation

### Tracking Spreadsheet Template
```
| Date | Page | Impressions | Clicks | CTR | Position | Conversions | Notes |
|------|------|------------|--------|-----|----------|-------------|-------|
| [Date] | /staines-pub | [X] | [X] | [X]% | [X] | [X] | [Notes] |
```

## Monthly Review Checklist

### Performance Review
- [ ] Export all data from GA4
- [ ] Export Search Console data
- [ ] Run ranking reports
- [ ] Calculate conversion rates
- [ ] Compare to previous month

### Optimization Planning
- [ ] Identify underperforming pages
- [ ] List content gaps from queries
- [ ] Plan A/B tests
- [ ] Schedule content updates
- [ ] Set next month's targets

### Competitive Analysis
- [ ] Check new competitor pages
- [ ] Review their keyword targeting
- [ ] Identify gaps we can fill
- [ ] Monitor their offers/events
- [ ] Plan counter-strategies

### Reporting
- [ ] Create monthly report
- [ ] Highlight wins and challenges
- [ ] Calculate ROI
- [ ] Present recommendations
- [ ] Get stakeholder buy-in

---

*Tracking guide to ensure continuous improvement and ROI from local SEO efforts*
*Last updated: January 2024*
*Review quarterly for tool updates*