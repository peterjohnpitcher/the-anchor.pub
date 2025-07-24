# Table Booking Tracking Implementation

## Overview

This document describes the comprehensive table booking tracking system implemented for The Anchor pub website. This tracking is **CRITICAL** for revenue tracking as table bookings are the PRIMARY revenue driver for the business.

## Implementation Details

### 1. BookTableButton Component

Created a reusable `BookTableButton` component (`/components/BookTableButton.tsx`) that:

- Automatically tracks all clicks on table booking CTAs
- Captures comprehensive metadata for analytics
- Maintains consistent styling with existing buttons
- Supports all button variants and sizes

### 2. Analytics Events

The component tracks two types of events:

#### Standard Analytics Event
```javascript
{
  action: 'click',
  category: 'booking',
  label: 'Book a Table', // or custom label
  value: 1,
  metadata: {
    source: 'homepage_hero', // Where the button is located
    context: 'regular', // Type of booking (regular, special_event, etc.)
    eventName: 'Christmas Party', // If applicable
    page: '/current-page',
    device: 'mobile' | 'desktop',
    timeOfDay: 'morning' | 'afternoon' | 'evening',
    dayOfWeek: 'Monday',
    timestamp: '2024-01-15T14:30:00Z',
    buttonLocation: 'homepage_hero',
    userAgent: '...',
    screenWidth: 1920,
    screenHeight: 1080,
    referrer: 'https://google.com'
  }
}
```

#### GTM DataLayer Event
```javascript
{
  event: 'table_booking_click',
  booking_source: 'homepage_hero',
  booking_context: 'regular',
  booking_event: 'Christmas Party',
  booking_page: '/current-page',
  booking_device: 'mobile' | 'desktop',
  booking_time_of_day: 'evening',
  booking_day_of_week: 'Monday',
  booking_timestamp: '2024-01-15T14:30:00Z'
}
```

### 3. Updated Components

The following components have been updated to use `BookTableButton`:

1. **Navigation Component** (`/components/Navigation.tsx`)
   - Desktop and mobile header CTAs
   - Automatically detects OrderTab booking links

2. **FloatingActions Component** (`/components/FloatingActions.tsx`)
   - Floating action button menu
   - Tracks with source: 'floating_actions'

3. **CTASection Component** (`/components/CTASection.tsx`)
   - Automatically detects booking links in CTA sections
   - Supports custom context and event names

4. **Page-specific implementations:**
   - Homepage hero (`/app/page.tsx`) - source: 'homepage_hero'
   - Sunday Lunch page - source: 'sunday_lunch_hero', context: 'sunday_roast'
   - Pizza Tuesday page - source: 'pizza_tuesday_hero', context: 'pizza_tuesday'
   - Near Heathrow page - source: 'near_heathrow_hero', context: 'heathrow_traveler'
   - Pizza menu page - source: 'pizza_menu_hero', context: 'pizza_menu'
   - Location pages (e.g., Ashford) - source: '[location]_pub_hero', context: 'location_[name]'

## Usage Guide

### Basic Usage

```tsx
import { BookTableButton } from '@/components/BookTableButton'

<BookTableButton
  source="page_section_name"
  variant="primary"
  size="lg"
>
  📅 Book a Table
</BookTableButton>
```

### With Context

```tsx
<BookTableButton
  source="christmas_page_hero"
  context="christmas_party"
  eventName="Christmas Party 2024"
  variant="primary"
  size="lg"
>
  🎄 Book Christmas Party
</BookTableButton>
```

### In CTASection

```tsx
<CTASection
  title="Ready to Book?"
  buttons={[
    {
      text: "📅 Book a Table",
      href: "https://ordertab.menu/theanchor/bookings",
      variant: "primary",
      bookingContext: "special_offer",
      eventName: "Tuesday BOGOF"
    }
  ]}
/>
```

## Tracking Sources

Use descriptive source names that indicate where the button is located:

- `header_desktop` / `header_mobile` - Navigation bar
- `homepage_hero` - Homepage hero section
- `floating_actions` - Floating action button
- `footer` - Footer section
- `[page]_hero` - Hero section of specific pages
- `cta_section` - CTA sections throughout the site
- `sidebar` - Sidebar widgets
- `event_card` - Event listing cards

## Context Types

Use these standard contexts where applicable:

- `regular` - Standard table booking
- `sunday_roast` - Sunday lunch bookings
- `pizza_tuesday` - Tuesday pizza deal bookings
- `special_event` - Event-specific bookings
- `christmas_party` - Christmas party bookings
- `heathrow_traveler` - Bookings from airport travelers
- `location_[name]` - Location-specific pages

## Testing

A comprehensive test suite is available at `/__tests__/BookTableButton.test.tsx` that covers:

- Component rendering
- Analytics tracking
- Device detection
- Time of day calculation
- DataLayer integration
- Custom click handlers

Run tests with:
```bash
npm test BookTableButton
```

## Analytics Dashboard

Track booking performance in Google Analytics 4:

1. **Events Report**: Look for `click` events with category `booking`
2. **Custom Report**: Filter by `table_booking_click` event
3. **Conversion Tracking**: Set up conversions based on booking clicks

Key metrics to monitor:
- Total booking clicks by source
- Device breakdown (mobile vs desktop)
- Time of day patterns
- Day of week trends
- Page performance (which pages drive most bookings)
- Context performance (which types of bookings are most popular)

## Future Enhancements

1. **A/B Testing**: Test different button texts, colors, and placements
2. **Heatmap Integration**: Add position tracking for better UX insights
3. **Conversion Tracking**: Track completed bookings (requires OrderTab integration)
4. **Personalization**: Show different CTAs based on time of day or user behavior

## Maintenance

When adding new booking CTAs:

1. Always use `BookTableButton` component
2. Provide meaningful `source` prop
3. Add appropriate `context` and `eventName` when relevant
4. Test tracking in development before deploying
5. Verify events appear in Google Analytics

For phone-based bookings, continue using `PhoneButton` component which has its own tracking.