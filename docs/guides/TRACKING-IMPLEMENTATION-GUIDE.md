# Tracking Implementation Guide

## What's Already Tracked

### 1. **Page Views** ✅
Every page navigation is automatically tracked with:
- Page path
- Page title
- Referrer
- Time on page

### 2. **Call-to-Action Clicks** ✅
All buttons using CallToAction component track:
- **Table Bookings**: When users click to book a table
- **Phone Calls**: When users click phone numbers
- **WhatsApp**: When users click WhatsApp links
- **Navigation**: Internal link clicks
- **Social**: External link clicks

### 3. **Event Pages** ✅
When users view an event:
- Event ID
- Event name
- Event date
- Event category
- Event price
- Time spent on page

### 4. **Event Booking Flow** ✅
Tracks the full funnel:
- **Form Start**: When user focuses on phone input
- **Booking Start**: When user submits phone number
- **Booking Complete**: When booking is confirmed

## How to Add Tracking to New Components

### 1. Track a Button Click
```tsx
import { trackTableBookingClick, trackPhoneCall } from '@/lib/gtm-events'

// In your component
<button onClick={() => {
  trackTableBookingClick('Header CTA')
  // Your existing logic
}}>
  Book a Table
</button>
```

### 2. Track Page/Section Views
```tsx
import { MenuPageTracker } from '@/components/MenuPageTracker'

// Add to your page
<MenuPageTracker menuType="food" />
```

### 3. Track Custom Events
```tsx
import { pushToDataLayer } from '@/lib/gtm-events'

// Track any custom event
pushToDataLayer({
  event: 'special_offer_view',
  offer_name: 'Tuesday Pizza BOGOF',
  offer_value: 15.99
})
```

## Implementing on Pages

### Food Menu Page
```tsx
// In app/food-menu/page.tsx
import { MenuPageTracker } from '@/components/MenuPageTracker'
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker'

export default function FoodMenuPage() {
  return (
    <>
      <MenuPageTracker menuType="food" />
      <ScrollDepthTracker />
      {/* Your existing content */}
    </>
  )
}
```

### Location Pages
```tsx
// Track directions clicks
import { trackDirectionsClick } from '@/lib/gtm-events'

<CallToAction 
  href="https://maps.google.com/..."
  onClick={() => trackDirectionsClick('Terminal 5 Page')}
>
  Get Directions
</CallToAction>
```

## GTM Variables to Create

### Data Layer Variables
Create these in GTM:
1. **dlv_event_id** → Data Layer Variable → event_id
2. **dlv_event_name** → Data Layer Variable → event_name
3. **dlv_event_price** → Data Layer Variable → value
4. **dlv_scroll_depth** → Data Layer Variable → scroll_threshold
5. **dlv_form_name** → Data Layer Variable → event_label

## GTM Triggers to Set Up

### 1. Table Booking Clicks
- Trigger Type: Custom Event
- Event name: table_booking_click
- Use for: GA4 Lead Generation

### 2. Phone Calls
- Trigger Type: Custom Event
- Event name: phone_call
- Use for: GA4 Lead Generation

### 3. Event Views
- Trigger Type: Custom Event
- Event name: view_event
- Use for: Remarketing audiences

### 4. Scroll Depth
- Trigger Type: Custom Event
- Event name: scroll_depth
- Use for: Engagement tracking

### 5. Form Interactions
- Trigger Type: Custom Event
- Event name: form_start
- Use for: Funnel analysis

## Conversion Events in GA4

Mark these as conversions:
1. **table_booking_click** - Primary conversion
2. **phone_call** - Primary conversion
3. **begin_checkout** - Micro conversion (event booking start)
4. **form_complete** - Goal completion

## Meta Pixel Events

### ViewContent (Dynamic)
```javascript
// In GTM Custom HTML tag
<script>
fbq('track', 'ViewContent', {
  content_name: {{dlv_event_name}},
  content_category: 'Event',
  content_ids: [{{dlv_event_id}}],
  content_type: 'product',
  value: {{dlv_event_price}},
  currency: 'GBP'
});
</script>
```

### Lead Generation
```javascript
// Trigger on phone_call and table_booking_click
<script>
fbq('track', 'Lead', {
  content_name: 'Restaurant Booking',
  content_category: {{Event Label}}
});
</script>
```

## Testing Your Implementation

### 1. GTM Preview Mode
- Enable Preview mode
- Browse your site
- Verify tags fire on correct actions

### 2. GA4 DebugView
- Enable debug mode in GA4
- See events in real-time
- Verify parameters are passed

### 3. Facebook Pixel Helper
- Chrome extension
- Shows pixel fires
- Validates event data

## Measuring Success

### Key Metrics to Monitor
1. **Conversion Rate**: Visitors → Table bookings
2. **Event Interest**: Event views → Booking attempts
3. **Engagement**: Scroll depth & time on page
4. **Channel Performance**: Which sources drive bookings

### Reports to Create
1. **Booking Funnel**
   - Page View → Menu View → Booking Click

2. **Event Performance**
   - Event Views → Booking Starts → Completions

3. **Content Engagement**
   - Page scroll depth by traffic source

4. **Multi-touch Attribution**
   - First touch vs last touch for bookings

## Future Enhancements

### 1. Enhanced E-commerce (When Ready)
- Product impressions (menu items)
- Add to cart events
- Checkout funnel
- Purchase tracking

### 2. Customer Lifetime Value
- Track repeat visitors
- Measure booking frequency
- Calculate CLV by source

### 3. Advanced Audiences
- High-intent visitors (viewed menu + events)
- Abandoned bookings
- Lookalike audiences

This tracking setup will provide comprehensive insights into user behavior and conversion paths, enabling data-driven marketing decisions.