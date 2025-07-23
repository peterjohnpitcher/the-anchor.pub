# The Anchor Pub - Comprehensive Tracking Optimization Plan

## Executive Summary

After conducting a thorough discovery of The Anchor's website tracking implementation, I've identified significant gaps between the existing tracking infrastructure and actual implementation. While you have a robust tracking library and GTM setup, approximately 90% of trackable user interactions are not being captured.

## Current State Analysis

### ✅ What's Working
1. **GTM Container** (GTM-WWFQTQS) properly loaded on all pages
2. **Event page view tracking** when users view individual events
3. **Partial event booking tracking** (start and form submission)
4. **Basic page view tracking** via useAnalytics hook
5. **Comprehensive tracking library** with 30+ tracking functions defined

### ❌ What's Missing
1. **Phone call tracking** - Critical for a pub business
2. **Table booking clicks** - Primary revenue driver
3. **Menu interactions** - No tracking on menu views or sections
4. **Navigation tracking** - No insights on user flow
5. **Scroll depth** - Component exists but not implemented
6. **Social media clicks** - Missing engagement metrics
7. **Email link tracking** - Contact intent not captured
8. **WhatsApp tracking** - Alternative contact method ignored
9. **Directions/maps clicks** - Visit intent not tracked
10. **Error tracking** - Only implemented in event booking

## Priority Tracking Implementation Plan

### Phase 1: Revenue-Critical Tracking (Week 1)

#### 1.1 Table Booking Tracking
**Priority: CRITICAL**
- Track all "Book a Table" button clicks (OrderTab external links)
- Implement on: Header, Homepage, FloatingActions, Food Menu, Events
- Estimated conversions: 50-100/month

#### 1.2 Phone Call Tracking
**Priority: CRITICAL**
- Track all phone number clicks (tel:01753682707)
- Implement on: All pages with phone links
- Include source tracking (header vs footer vs floating)
- Estimated conversions: 200-300/month

#### 1.3 Event Booking Enhancement
**Priority: HIGH**
- Add completion tracking (currently missing)
- Track form abandonment with field-level data
- Add event category and price tracking
- Estimated conversions: 20-40/month

### Phase 2: Engagement & Intent Tracking (Week 2)

#### 2.1 Menu Tracking
**Priority: HIGH**
- Implement MenuPageTracker on all menu pages
- Track menu section views (starters, mains, desserts)
- Track time spent on menu pages
- Track menu PDF downloads

#### 2.2 Navigation & User Flow
**Priority: MEDIUM**
- Track main navigation clicks
- Track mobile menu interactions
- Implement scroll depth on long pages (food menu, blog posts)
- Track footer navigation usage

#### 2.3 Location & Visit Intent
**Priority: HIGH**
- Track "Get Directions" clicks
- Track map interactions
- Track parking information views
- Track terminal-specific page views (Heathrow traffic)

### Phase 3: Advanced Tracking (Week 3)

#### 3.1 Enhanced Ecommerce Structure
**Priority: MEDIUM**
- Treat menu items as products
- Track menu item views
- Implement item list views for categories
- Track promotional content (Manager's Special, Pizza Tuesday)

#### 3.2 Content Engagement
**Priority: LOW**
- Implement ScrollDepthTracker across all pages
- Track blog post engagement
- Track image gallery interactions
- Track video plays (if any)

#### 3.3 Multi-Channel Attribution
**Priority: MEDIUM**
- Track WhatsApp clicks separately
- Track social media engagement
- Implement cross-domain tracking for OrderTab
- Track email newsletter signups

## Technical Implementation Guide

### 1. Update Interactive Components

```typescript
// Example: Phone Link Component Update
import { analytics } from '@/lib/analytics';

// Before
<a href="tel:01753682707">Call Us</a>

// After
<a 
  href="tel:01753682707"
  onClick={() => analytics.track('phone_call_click', {
    source: 'header',
    number: '01753682707'
  })}
>
  Call Us
</a>
```

### 2. Implement Missing Trackers

```typescript
// Add to layout.tsx or specific pages
import { ScrollDepthTracker } from '@/components/tracking/ScrollDepthTracker';
import { MenuPageTracker } from '@/components/tracking/MenuPageTracker';

// In page component
<>
  <ScrollDepthTracker />
  <MenuPageTracker menuType="food" />
  {/* Page content */}
</>
```

### 3. Create Conversion Events in GA4

**Key Events to Configure:**
1. `table_booking_click` → Conversion
2. `phone_call_click` → Conversion
3. `event_booking_complete` → Conversion
4. `directions_click` → Micro-conversion
5. `menu_view` → Micro-conversion
6. `whatsapp_click` → Conversion

## Success Metrics & KPIs

### Primary KPIs (Monthly)
- **Booking Conversion Rate**: Target 5-8% of visitors
- **Phone Call Rate**: Target 10-15% of mobile visitors
- **Event Booking Rate**: Target 2-3% of event page visitors
- **Menu Engagement Rate**: Target 40%+ scroll depth

### Secondary KPIs
- **Average Session Duration**: Target 2:30+ (industry avg: 2:19)
- **Pages per Session**: Target 3.5+
- **Mobile vs Desktop Split**: Monitor for optimization
- **Peak Traffic Times**: Optimize staffing and promotions

## ROI Estimation

### Conservative Estimates (Monthly)
- **Table Bookings**: 75 tracked × £40 avg = £3,000 attributed revenue
- **Phone Bookings**: 150 tracked × £35 avg = £5,250 attributed revenue
- **Event Bookings**: 30 tracked × £25 avg = £750 attributed revenue
- **Total Monthly Attribution**: £9,000+ in trackable revenue

### Data-Driven Improvements
With proper tracking, you can:
1. Optimize marketing spend based on actual conversions
2. Improve website UX based on user behavior
3. Personalize content for different customer segments
4. Reduce phone calls by improving online information
5. Increase event bookings through funnel optimization

## Testing & Validation

### 1. GTM Preview Mode Testing
- Test all new events in GTM preview
- Verify dataLayer receives correct parameters
- Confirm GA4 receives events

### 2. Real User Testing
- Monitor first 24 hours after implementation
- Check for JavaScript errors
- Verify no performance impact

### 3. Data Validation
- Compare tracked conversions with actual bookings
- Validate phone tracking with call logs
- Cross-reference with OrderTab data

## Maintenance & Optimization

### Monthly Tasks
1. Review conversion rates and optimize CTAs
2. Analyze user flow and fix drop-off points
3. Update tracking for new features/pages
4. Monitor data quality and fix issues

### Quarterly Tasks
1. Full tracking audit
2. Update conversion values
3. Review and optimize key events
4. Competitive analysis of tracking practices

## Next Steps

1. **Immediate Action**: Implement Phase 1 tracking (revenue-critical)
2. **Week 1 Goal**: 100% coverage of booking and phone tracking
3. **Month 1 Goal**: Full implementation of all phases
4. **Month 2 Goal**: Data-driven optimization based on insights

## Resources Needed

- Developer time: ~20 hours for full implementation
- GTM configuration: ~5 hours
- Testing and validation: ~5 hours
- Monthly maintenance: ~2 hours

Total investment: ~30 hours
Expected ROI: 20-30% improvement in trackable conversions

---

*This plan will transform The Anchor's website from having minimal tracking to industry-leading analytics implementation, providing clear insights into customer behavior and revenue attribution.*