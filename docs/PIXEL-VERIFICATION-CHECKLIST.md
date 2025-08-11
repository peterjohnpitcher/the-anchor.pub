# Facebook Pixel Verification Checklist
*Current Setup Analysis & Requirements*

## Current Situation

### ❌ NO Facebook Pixel Found
After reviewing your codebase:
- **No Facebook Pixel installation detected**
- **Only Google Tag Manager (GTM) is installed**
- **Current tracking**: GTM events only (menu views, page exits)

## What You Need to Implement

### Option 1: Install Facebook Pixel via GTM (Recommended)
This is easiest - no code changes needed!

1. **In Facebook Business Manager:**
   - Go to Events Manager
   - Create/find your Pixel ID
   - Copy the Pixel ID (looks like: 1234567890123456)

2. **In Google Tag Manager:**
   - Create new tag: "Facebook Pixel - Base Code"
   - Tag Type: Custom HTML
   - Paste Facebook base pixel code
   - Trigger: All Pages

3. **Add ViewContent Events in GTM:**
   ```javascript
   // Tag: FB Pixel - ViewContent Food Pages
   // Trigger: Page URL contains /food OR /menu OR /drinks
   fbq('track', 'ViewContent', {
     content_type: 'product',
     content_category: 'food_menu'
   });
   ```

4. **Add Sunday Lunch Specific Event:**
   ```javascript
   // Tag: FB Pixel - Sunday Lunch Page
   // Trigger: Page URL contains /sunday-lunch
   fbq('track', 'ViewContent', {
     content_type: 'product',
     content_name: 'sunday_roast',
     value: 14.95,
     currency: 'GBP'
   });
   ```

### Option 2: Direct Code Implementation
If you prefer adding directly to code:

1. **Add to GTMProvider.tsx:**
```typescript
// After line 64 in GTMProvider, add Facebook Pixel:
<Script
  id="fb-pixel"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'YOUR_PIXEL_ID_HERE');
      fbq('track', 'PageView');
    `,
  }}
/>
```

2. **Update MenuPageTracker.tsx to fire Facebook events:**
```typescript
// Add after line 34:
if (typeof window !== 'undefined' && window.fbq) {
  window.fbq('track', 'ViewContent', {
    content_type: 'menu',
    content_category: menuType,
    content_name: menuType === 'sunday_lunch' ? 'sunday_roast' : menuType
  });
}
```

## Events You Need for the Funnel

### Required Events & Where to Fire Them

1. **PageView** (Base Event)
   - ✅ Fires on all pages automatically with base pixel

2. **ViewContent - Food Pages**
   - Fire on: `/food`, `/menu`, `/drinks`
   - Data: `{content_category: 'food_menu'}`

3. **ViewContent - Sunday Lunch**
   - Fire on: `/sunday-lunch`
   - Data: `{content_name: 'sunday_roast', value: 14.95}`

4. **InitiateCheckout**
   - Fire on: Booking form start/click
   - Data: `{value: deposit_amount, num_items: party_size}`

5. **Purchase**
   - Fire on: Booking confirmation
   - Data: `{value: deposit_total, currency: 'GBP'}`

## Testing Your Pixel

### 1. Install Facebook Pixel Helper Chrome Extension
- Download from Chrome Web Store
- Navigate to your site
- Check if pixel fires on each page

### 2. Check in Facebook Events Manager
- Go to Events Manager > Test Events
- Enter your website URL
- Navigate through site
- Verify events appear in real-time

### 3. Verify Custom Audiences Work
After 24 hours of pixel firing:
- Create test audience: "Visited /sunday-lunch in last 7 days"
- Check audience size (should show 100+ after a week)

## Quick Data Check in Business Manager

### To See What Data You Have:
1. **Events Manager > Data Sources > Your Pixel**
2. **Click "Overview" tab**
3. **Look for:**
   - Total events in last 7 days
   - Event types being received
   - Top URLs triggering events

### Check Audience Quality:
1. **Audiences > Create Audience > Website Traffic**
2. **See if these options are available:**
   - All website visitors (should have data)
   - People who visited specific pages
   - Time spent on website
   - Frequency of visits

## Timeline for Data Collection

### Week 1
- Install pixel
- Start collecting basic PageView data
- Build "All Website Visitors" audience

### Week 2
- Implement ViewContent events
- Start segmenting food page visitors
- Test InitiateCheckout event

### Week 3
- Have enough data for WARM audience
- Can start retargeting campaigns
- Implement Purchase event

### Week 4
- Full funnel data available
- Can create lookalike audiences
- Ready for advanced segmentation

## If You Already Have GTM Events

Good news! Your current GTM events can be bridged to Facebook:

### Current GTM Events Found:
- `menu_page_view` (perfect for ViewContent)
- `menu_page_exit` (good for engagement tracking)
- `event_category: 'Menu Engagement'`

### Bridge These to Facebook:
In GTM, create trigger based on your existing events:
- When `menu_page_view` fires → Trigger Facebook ViewContent
- When `menu_type = 'sunday_lunch'` → Add special tagging

## Action Items

### Immediate (Today):
- [ ] Get Facebook Pixel ID from Business Manager
- [ ] Install base pixel via GTM
- [ ] Verify pixel fires on homepage

### This Week:
- [ ] Add ViewContent events for menu pages
- [ ] Set up Sunday lunch specific tracking
- [ ] Create initial custom audiences

### Next Week:
- [ ] Implement InitiateCheckout tracking
- [ ] Test audience building
- [ ] Launch first campaign with pixel data

---

**Note**: Without the pixel, you're flying blind. Even just installing the base pixel today will give you retargeting capabilities in 24-48 hours!