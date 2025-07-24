# Data Layer Improvement Recommendations for The Anchor Pub

Based on the latest GTM best practices for 2025 and analysis of the current implementation, here are recommendations to enhance the data layer structure.

## Current Implementation Strengths ✅

1. **Consistent Event Naming** - Uses clear, descriptive event names
2. **Centralized Implementation** - All events managed through `gtm-events.ts`
3. **Proper dataLayer.push() Usage** - Correctly uses push method
4. **Good Coverage** - Tracks essential user interactions

## Recommended Improvements 🚀

### 1. Enhanced Ecommerce Structure for Table Bookings

The current `table_booking_click` event should be expanded to follow GA4 Enhanced Ecommerce format:

```javascript
// Current implementation
{
  event: 'table_booking_click',
  event_category: 'Restaurant',
  event_label: source,
  booking_method: 'external_ordertab'
}

// Recommended GA4 Enhanced Ecommerce structure
{
  event: 'begin_checkout',
  ecommerce: {
    currency: 'GBP',
    value: 0, // Can be populated if deposits are required
    items: [{
      item_id: 'TABLE_BOOKING',
      item_name: 'Table Reservation',
      item_category: 'Restaurant Booking',
      item_category2: source, // e.g., 'header', 'hero'
      item_variant: booking_type, // e.g., 'regular', 'event', 'christmas'
      price: 0,
      quantity: 1,
      // Custom parameters
      booking_party_size: party_size,
      booking_date: booking_date,
      booking_time: booking_time,
      booking_source: source
    }]
  },
  // Additional context
  user_data: {
    booking_device: 'mobile' | 'desktop',
    booking_time_of_day: 'morning' | 'afternoon' | 'evening'
  }
}
```

### 2. Implement User Properties

Add persistent user properties to better understand customer behavior:

```javascript
// Add to initialization or after key actions
window.dataLayer.push({
  user_properties: {
    customer_type: 'new' | 'returning',
    booking_count: 0,
    last_booking_date: null,
    preferred_contact_method: 'phone' | 'whatsapp' | 'email',
    location_preference: 'indoor' | 'outdoor' | 'bar'
  }
});
```

### 3. Enhanced Event Tracking Structure

Upgrade event tracking to include more contextual data:

```javascript
// Example: Enhanced menu view tracking
export function trackMenuView(menuType: 'food' | 'drinks' | 'sunday', context?: {
  viewDuration?: number,
  itemsViewed?: string[],
  priceRangeViewed?: string,
  dietary_filters?: string[]
}) {
  pushToDataLayer({
    event: 'view_item_list',
    ecommerce: {
      item_list_id: `menu_${menuType}`,
      item_list_name: `${menuType} Menu`,
      items: context?.itemsViewed?.map((item, index) => ({
        item_id: item,
        item_name: item,
        index: index,
        item_list_id: `menu_${menuType}`,
        item_list_name: `${menuType} Menu`
      })) || []
    },
    engagement_time_msec: context?.viewDuration,
    dietary_preferences: context?.dietary_filters
  });
}
```

### 4. Add Page-Level Data Layer

Implement page-level data that persists across all events:

```javascript
// Add to page layouts
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  page_data: {
    page_type: 'menu' | 'event' | 'home' | 'booking',
    page_category: 'restaurant',
    page_subcategory: 'food' | 'drinks' | 'events',
    business_status: 'open' | 'closed',
    current_offers: ['happy_hour', 'lunch_special'],
    weather_condition: 'sunny' | 'rainy' | 'cloudy',
    terminal_proximity: 'terminal_5'
  }
});
```

### 5. Implement Error Context Enhancement

Improve error tracking with more context:

```javascript
export function trackError(errorData: {
  type: string,
  message: string,
  context?: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  user_impact: boolean,
  recovery_action?: string
}) {
  pushToDataLayer({
    event: 'exception',
    description: errorData.message,
    fatal: errorData.severity === 'critical',
    error_details: {
      error_type: errorData.type,
      error_context: errorData.context,
      error_severity: errorData.severity,
      user_impacted: errorData.user_impact,
      recovery_action: errorData.recovery_action,
      timestamp: new Date().toISOString(),
      page_url: window.location.href
    }
  });
}
```

### 6. Add Consent Mode Integration

Prepare for privacy regulations:

```javascript
// Initialize consent mode
window.dataLayer.push({
  event: 'consent_default',
  consent: {
    ad_storage: 'denied',
    analytics_storage: 'granted',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted'
  }
});

// Update after user consent
export function updateConsent(consentSettings: Record<string, 'granted' | 'denied'>) {
  pushToDataLayer({
    event: 'consent_update',
    consent: consentSettings
  });
}
```

### 7. Implement Custom Dimensions

Add business-specific dimensions:

```javascript
// For every event, include relevant custom dimensions
{
  event: 'any_event',
  custom_dimensions: {
    day_part: getDayPart(), // 'breakfast', 'lunch', 'dinner'
    day_type: getDayType(), // 'weekday', 'weekend', 'holiday'
    season: getSeason(), // 'spring', 'summer', 'autumn', 'winter'
    special_event_active: hasSpecialEvent(), // true/false
    kitchen_status: getKitchenStatus(), // 'open', 'closing_soon', 'closed'
  }
}
```

### 8. Create Data Layer Documentation

Create a comprehensive data layer specification document:

```markdown
# The Anchor Pub Data Layer Specification

## Standard Events
- `page_view` - Triggered on every page load
- `table_booking_click` - When user clicks book table button
- `menu_view` - When user views any menu
...

## Variables
- `booking_source` - Where the booking originated
- `menu_type` - Type of menu being viewed
...

## Implementation Examples
[Include code examples for each event type]
```

### 9. Add Booking Funnel Tracking

Implement complete funnel tracking for table bookings:

```javascript
// Step 1: View booking options
trackBookingView()

// Step 2: Select date/time
trackBookingDateSelection()

// Step 3: Add party details
trackBookingDetailsAdded()

// Step 4: Begin checkout
trackBookingCheckoutStart()

// Step 5: Complete booking
trackBookingComplete()
```

### 10. Implement Server-Side Tracking Preparation

Prepare for server-side tracking capabilities:

```javascript
// Include user and session identifiers
window.dataLayer.push({
  user_id: getUserId(), // Hashed user ID
  session_id: getSessionId(),
  client_id: getClientId() // GA client ID
});
```

## Implementation Priority

1. **High Priority** (Week 1)
   - Enhanced ecommerce structure for bookings
   - Page-level data layer
   - Improved error tracking

2. **Medium Priority** (Week 2-3)
   - User properties
   - Custom dimensions
   - Booking funnel tracking

3. **Low Priority** (Month 2)
   - Consent mode integration
   - Server-side tracking preparation
   - Complete documentation

## Testing Checklist

- [ ] All events fire consistently across browsers
- [ ] Data layer variables are properly formatted
- [ ] No duplicate events on single actions
- [ ] Events contain all required parameters
- [ ] Custom dimensions populate correctly
- [ ] Enhanced ecommerce data validates in GA4
- [ ] Error tracking captures all edge cases

## Monitoring & Maintenance

1. Set up GA4 custom alerts for tracking anomalies
2. Weekly review of data quality in GA4 reports
3. Monthly audit of new features for tracking gaps
4. Quarterly review of tracking documentation
5. Regular testing of critical conversion paths

## Next Steps

1. Review recommendations with development team
2. Create implementation tickets in project management system
3. Set up staging environment for testing
4. Implement changes incrementally
5. Validate each change in GTM Preview mode
6. Document all modifications

These improvements will provide richer data insights while maintaining clean, maintainable code that follows 2025 best practices.