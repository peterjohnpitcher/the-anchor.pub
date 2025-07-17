# Google Tag Manager Implementation Guide for The Anchor

## 📋 Complete GTM Setup & Configuration Plan

### Phase 1: Initial Setup (Day 1)

#### 1. Create GTM Account & Container
- Account name: "The Anchor Pub"
- Container name: "the-anchor.pub"
- Container type: Web
- Save your GTM ID (format: GTM-XXXXXXX)

#### 2. Add GTM to Environment Variables
```bash
# In .env.local
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

#### 3. Install GTM in the Website
The code has been prepared. Update your layout.tsx to include GTM.

### Phase 2: Essential Tags Setup (Day 1-2)

#### 1. Google Analytics 4
**Tag Configuration:**
- Tag Type: Google Analytics: GA4 Configuration
- Measurement ID: Your GA4 ID (G-XXXXXXXXXX)
- Send page view: Yes

**Trigger:**
- All Pages

#### 2. Meta Pixel (Facebook/Instagram)
**Tag Configuration:**
- Tag Type: Custom HTML
- Tag Name: Meta Pixel Base Code
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

**Trigger:**
- All Pages

### Phase 3: Enhanced Tracking Setup (Week 1)

#### 1. Event Tracking Tags

**Table Booking Clicks**
- Tag Type: GA4 Event
- Event Name: table_booking_click
- Parameters:
  - booking_source: {{Click Text}}
  - click_url: {{Click URL}}
- Trigger: Clicks on links containing "ordertab.menu"

**Phone Call Tracking**
- Tag Type: GA4 Event
- Event Name: phone_call_click
- Parameters:
  - call_source: {{Click Text}}
- Trigger: Clicks on tel: links

**Menu Views**
- Tag Type: GA4 Event
- Event Name: menu_view
- Parameters:
  - menu_type: {{Data Layer Variable - menu_type}}
- Trigger: Custom Event - view_menu

#### 2. Variables to Create

**Data Layer Variables:**
- event_id
- event_name
- event_category
- menu_type
- booking_source

**Built-in Variables to Enable:**
- Click ID
- Click Classes
- Click Text
- Click URL
- Page Path
- Page URL
- Referrer

### Phase 4: Conversion Tracking (Week 1-2)

#### 1. Primary Conversions
**Table Booking (External)**
- Conversion Name: table_booking
- Trigger: Outbound link clicks to ordertab.menu

**Phone Call**
- Conversion Name: phone_call
- Trigger: Tel link clicks

**Event Booking Start**
- Conversion Name: event_booking_start
- Trigger: Custom event - begin_checkout

#### 2. Meta Pixel Events
**ViewContent (Event Pages)**
```javascript
fbq('track', 'ViewContent', {
  content_name: '{{event_name}}',
  content_category: 'Event',
  content_type: 'product',
  value: {{event_price}},
  currency: 'GBP'
});
```

**Lead (Contact Actions)**
```javascript
fbq('track', 'Lead', {
  content_name: 'Contact',
  content_category: '{{contact_method}}'
});
```

### Phase 5: Advanced Tracking (Week 2-3)

#### 1. Scroll Tracking
- Tag Type: Scroll Depth Trigger
- Thresholds: 25%, 50%, 75%, 90%
- Create GA4 event for scroll milestones

#### 2. Engagement Time
- Track time on key pages (menu, events, location)
- Fire events at 15s, 30s, 60s, 120s

#### 3. Error Tracking
- JavaScript Error Listener
- 404 Page Tracking
- API Error Events

### Phase 6: E-commerce Ready (Future)

#### 1. Enhanced E-commerce Setup
Prepare for future online ordering:
- Product Impressions (menu items)
- Add to Cart
- Checkout Steps
- Purchase Tracking

#### 2. Dynamic Remarketing
- Setup product feeds
- Configure dynamic remarketing tags
- Create audience lists

### GTM Container Structure

```
📁 Tags
  ├── 📄 GA4 Configuration
  ├── 📄 GA4 - Event - Table Booking Click
  ├── 📄 GA4 - Event - Phone Call
  ├── 📄 GA4 - Event - Menu View
  ├── 📄 GA4 - Event - Event View
  ├── 📄 GA4 - Event - Scroll Depth
  ├── 📄 Meta Pixel - Base
  ├── 📄 Meta Pixel - ViewContent
  └── 📄 Meta Pixel - Lead

📁 Triggers
  ├── 🎯 All Pages
  ├── 🎯 Table Booking Clicks
  ├── 🎯 Phone Clicks
  ├── 🎯 Menu Page Views
  ├── 🎯 Event Page Views
  ├── 🎯 Scroll Depth
  └── 🎯 Custom Events

📁 Variables
  ├── 📊 GA4 Measurement ID
  ├── 📊 Meta Pixel ID
  ├── 📊 Event Name
  ├── 📊 Event Price
  └── 📊 Menu Type
```

### Testing Protocol

#### 1. Preview Mode Testing
- Enable GTM Preview mode
- Test each tag fires correctly
- Verify data layer values
- Check for duplicate firing

#### 2. GA4 DebugView
- Enable debug mode
- Verify events appear
- Check parameter values
- Validate conversions

#### 3. Meta Pixel Helper
- Install Chrome extension
- Verify pixel fires
- Check event parameters
- Test on mobile

### Implementation Checklist

**Week 1:**
- [ ] Create GTM account
- [ ] Install GTM on website
- [ ] Setup GA4 configuration tag
- [ ] Install Meta Pixel
- [ ] Configure table booking tracking
- [ ] Setup phone call tracking
- [ ] Test all basic tracking

**Week 2:**
- [ ] Implement event tracking
- [ ] Setup scroll tracking
- [ ] Configure engagement timing
- [ ] Create conversion goals
- [ ] Setup remarketing audiences
- [ ] Test Meta Pixel events

**Week 3:**
- [ ] Advanced event tracking
- [ ] Error tracking setup
- [ ] Create custom reports
- [ ] Document all tracking
- [ ] Train team on reports

### Reporting & Insights

**Key Metrics to Track:**
1. Table booking clicks by source
2. Phone calls by page
3. Event page engagement
4. Menu views to bookings
5. Location page performance
6. Peak booking times
7. Customer journey paths

**Custom Reports to Create:**
1. Booking Funnel Analysis
2. Event Performance Dashboard
3. Menu Engagement Report
4. Location Traffic Analysis
5. Day/Hour Heatmaps

### Maintenance & Optimization

**Monthly Tasks:**
- Review tag firing rates
- Check for errors
- Update event values
- Analyze conversion paths
- Optimize underperforming tags

**Quarterly Tasks:**
- Audit all tags
- Update tracking plan
- Review privacy compliance
- Enhance attribution models

This comprehensive setup will give you:
- Complete visibility of customer behaviour
- Multi-channel attribution
- Remarketing capabilities
- Conversion optimization data
- ROI measurement for all channels

Ready to implement? Start with Phase 1 and work through systematically!