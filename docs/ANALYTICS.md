# Analytics Setup Guide

## Google Analytics 4 (GA4) Implementation

The Anchor website includes comprehensive Google Analytics 4 tracking for monitoring site performance, user behavior, and conversion metrics.

### Setup Instructions

1. **Create a Google Analytics 4 Property**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create a new GA4 property for the-anchor.pub
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Configure Environment Variable**
   - Copy `.env.example` to `.env.local`
   - Add your Measurement ID:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Deploy and Verify**
   - Analytics only runs in production mode
   - Verify installation using GA4 Real-Time reports

### What We Track

#### Automatic Tracking
- Page views (all pages)
- Session duration
- User demographics (anonymous)
- Traffic sources
- Device types

#### Custom Events
- **Phone Clicks**: When users click phone numbers
- **Direction Clicks**: When users request directions
- **Booking Clicks**: Table and event booking attempts
- **Menu Views**: Which menu sections are viewed
- **Event Views**: Individual event page views
- **Terminal Pages**: Which Heathrow terminal pages are popular

#### Conversion Tracking
The following actions are tracked as conversions:
- Phone number clicks
- Direction/map clicks
- Booking form submissions
- Event enquiries

### Enhanced Tracking Features

#### Local SEO Insights
- Track which location pages drive most traffic
- Monitor "near me" search performance
- Analyze Heathrow terminal page effectiveness

#### User Journey Analysis
- Understand paths to booking
- Identify popular content
- Track event interest

### Custom Implementation

The implementation includes:
- `app/google-analytics.tsx`: Core GA4 component and tracking functions
- Enhanced `CallToAction` component with automatic event tracking
- Server-side rendering compatible
- Privacy-focused (no PII collected)

### Testing Analytics

To test in development:
1. Temporarily remove the production check in `google-analytics.tsx`
2. Use GA4 DebugView to see events
3. Remember to restore production check before deploying

### Privacy Compliance

- No personally identifiable information is collected
- IP anonymization is enabled by default in GA4
- Cookie consent should be implemented if required by law
- Users can opt-out using browser settings

### Useful Reports

After implementation, focus on these reports:
1. **Acquisition**: Where visitors come from
2. **Engagement**: Most popular pages and events
3. **Conversions**: Phone clicks and bookings
4. **User Demographics**: Understand your audience
5. **Real-Time**: Monitor live activity

### Custom Dashboards

Consider creating dashboards for:
- Daily performance overview
- Event popularity tracking
- Location page performance
- Conversion funnel analysis

### Integration with Other Tools

GA4 can be connected to:
- Google Search Console (SEO insights)
- Google Ads (if running campaigns)
- Google My Business (local insights)
- BigQuery (advanced analysis)

### Maintenance

- Review monthly for insights
- Update tracking as new features are added
- Monitor for any tracking issues
- Keep documentation updated