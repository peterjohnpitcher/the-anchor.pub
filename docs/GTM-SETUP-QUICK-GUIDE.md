# Google Tag Manager Setup - Quick Guide

Your GTM Container ID: **GTM-WWFQTQS**

## ✅ Step 1: GTM is Now Installed!

The GTM container is now installed on your website. When you deploy, it will start collecting data.

## 📋 Step 2: Configure GTM Container

### Login to GTM
1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Find your container: GTM-WWFQTQS
3. Click to open it

### Essential Tags to Create

#### 1. Google Analytics 4 Configuration
**Create New Tag:**
- Click "New" → Tag
- Tag Configuration → Google Analytics → GA4 Configuration
- Measurement ID: `G-2ZTRYGDRJW` (your existing GA4 ID)
- Trigger: All Pages
- Name it: "GA4 - Configuration"
- Save

#### 2. Enhanced Conversions - Table Booking
**Create New Tag:**
- Tag Type: Google Analytics: GA4 Event
- Configuration Tag: Select "GA4 - Configuration"
- Event Name: `generate_lead`
- Event Parameters:
  - Parameter Name: `lead_source` | Value: `{{Click Text}}`
  - Parameter Name: `method` | Value: `table_booking`
- Trigger: Create New → Click - Just Links
- Filter: Click URL contains `ordertab.menu`
- Name it: "GA4 - Table Booking Click"
- Save

#### 3. Phone Call Tracking
**Create New Tag:**
- Tag Type: Google Analytics: GA4 Event
- Configuration Tag: Select "GA4 - Configuration"
- Event Name: `generate_lead`
- Event Parameters:
  - Parameter Name: `lead_source` | Value: `{{Page Path}}`
  - Parameter Name: `method` | Value: `phone_call`
- Trigger: Create New → Click - Just Links
- Filter: Click URL contains `tel:`
- Name it: "GA4 - Phone Call Click"
- Save

### Variables to Enable

Go to Variables → Configure Built-in Variables and enable:
- ✅ Click Classes
- ✅ Click ID
- ✅ Click Target
- ✅ Click URL
- ✅ Click Text
- ✅ Page Path
- ✅ Page URL
- ✅ Page Hostname
- ✅ Referrer

### Test Your Setup

1. Click "Preview" in GTM
2. Enter your website URL
3. Browse around and verify:
   - Page views are tracked
   - Phone clicks register
   - Table booking clicks work

### Publish Your Container

1. Click "Submit" in top right
2. Name: "Initial Setup - GA4 and Conversions"
3. Description: "Basic tracking implementation"
4. Click "Publish"

## 🎯 Step 3: Set Up Conversions in GA4

### In Google Analytics:
1. Go to Admin → Events
2. Find these events:
   - `generate_lead` (should appear after testing)
   - `page_view`
3. Toggle "Mark as conversion" for `generate_lead`

### Create Audiences:
1. Admin → Audiences → New Audience
2. Create:
   - "Engaged Visitors" - Time on site > 30 seconds
   - "Event Viewers" - Visited /whats-on or /events
   - "Menu Browsers" - Visited /food-menu or /drinks

## 📊 Step 4: Meta Pixel Setup (Facebook/Instagram)

### Get Your Pixel ID:
1. Go to [Facebook Business Manager](https://business.facebook.com)
2. Events Manager → Data Sources
3. Create or find your Pixel
4. Copy the Pixel ID

### Add to GTM:
1. New Tag → Custom HTML
2. Paste the Meta Pixel code (replacing YOUR_PIXEL_ID)
3. Trigger: All Pages
4. Name: "Meta Pixel - Base Code"

### Track Events:
Create another tag for conversions:
- Tag Type: Custom HTML
- Code: `fbq('track', 'Lead');`
- Trigger: Same as phone/booking clicks
- Name: "Meta Pixel - Lead Event"

## 📈 What You'll See

### Immediate (Today):
- Real-time visitors in GA4
- Page views tracking
- Basic user geography

### Within 24-48 Hours:
- Conversion data appearing
- Source/medium attribution
- User behavior flow

### Within 1 Week:
- Enough data for insights
- Conversion patterns
- Peak booking times

## 🚀 Quick Wins

1. **See What's Working:**
   - Which pages drive phone calls
   - What events get most views
   - Best traffic sources

2. **Optimize Ads:**
   - Track ROI from Google Ads
   - Retarget website visitors
   - Create lookalike audiences

3. **Improve Website:**
   - Find drop-off points
   - See popular content
   - Test changes with data

## 🆘 Troubleshooting

**No data showing?**
- Check GTM Preview mode
- Verify container is published
- Clear cache and cookies

**Conversions not tracking?**
- Check trigger conditions
- Verify tag fires in Preview
- Wait 24 hours for data

**Need help?**
- GTM has great documentation
- GA4 has a setup assistant
- Consider hiring a specialist for advanced setup

## Next Steps

1. ✅ Verify basic tracking works
2. ✅ Set up conversion tracking
3. ⏱️ Wait 48 hours for data
4. 📊 Create first reports
5. 🎯 Add more advanced tracking as needed

Your analytics foundation is now ready! 🎉