# Meta Ads Manager Import Instructions

## ⚠️ IMPORTANT: Before You Import

This JSON file is a template that requires customization before importing into Meta Ads Manager. Facebook doesn't support direct campaign imports via JSON, but you can use this as a detailed blueprint to quickly set up your campaigns.

---

## 📋 Required Setup Steps

### 1. Prerequisites
- [ ] Facebook Business Manager account set up
- [ ] Facebook Page for The Anchor created and verified
- [ ] Meta Pixel installed on www.the-anchor.pub
- [ ] Payment method added to Ad Account
- [ ] Domain verified in Business Settings

### 2. Replace Placeholder Values
Search and replace these values in the JSON:
- `YOUR_PAGE_ID` → Your actual Facebook Page ID
- `YOUR_PIXEL_ID` → Your Meta Pixel ID
- `YOUR_VIDEO_ID` → Upload videos and use their IDs
- `CREATE_WEBSITE_CUSTOM_AUDIENCE` → Create this audience first
- `CREATE_PURCHASER_AUDIENCE` → Create this audience first

### 3. Find Your IDs
- **Page ID**: Go to your Facebook Page → About → Page ID
- **Pixel ID**: Business Settings → Data Sources → Pixels
- **Ad Account ID**: Business Settings → Accounts → Ad Accounts

---

## 🚀 Two Ways to Use This File

### Option 1: Manual Setup (Recommended for Beginners)

Use the JSON as a reference guide to manually create campaigns in Ads Manager:

1. **Create Campaign**
   - Go to Ads Manager → Create
   - Choose "Traffic" objective
   - Name: "The Anchor - Food Drive Campaign"
   - Set daily budget: £25

2. **Create Ad Sets**
   - Follow the structure in the JSON
   - Copy targeting parameters exactly
   - Set schedules as specified

3. **Create Ads**
   - Use the ad copy provided
   - Upload creatives
   - Set up tracking

### Option 2: Use Meta Marketing API (Advanced)

If you have developer access:

1. **Install Facebook Business SDK**
```bash
pip install facebook-business
```

2. **Use the Python Script**
```python
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.campaign import Campaign
import json

# Initialize the API
FacebookAdsApi.init(access_token='YOUR_ACCESS_TOKEN')

# Load the JSON
with open('meta-ads-import-campaign.json', 'r') as file:
    campaign_data = json.load(file)

# Create campaigns programmatically
# (Full script available upon request)
```

---

## 📊 Campaign Structure Overview

### Campaign: The Anchor - Food Drive Campaign
**Daily Budget**: £25 (scales to £50 after testing)
**Objective**: Traffic initially, then Conversions for retargeting

#### Ad Sets:
1. **Always-On: Heathrow Radius** (£10/day)
   - 5km radius around Heathrow
   - Airport price comparisons

2. **Always-On: Local Community** (£10/day)
   - Stanwell, Staines, Ashford, Feltham
   - Family focus

3. **Tuesday Pizza BOGOF** (£15/day - Tuesdays only)
   - Runs Monday 3pm - Tuesday 9pm
   - 16km radius for pizza lovers

4. **Friday Fish Special** (£8/day - Fridays)
   - Over 65s targeting
   - 50% off messaging

5. **Saturday Afternoon** (£10/day - Saturdays)
   - Beer garden & plane spotting
   - 1-7pm kitchen hours

6. **Sunday Roast Pre-Orders** (£12/day - Wed-Sat)
   - Pre-order reminders
   - Saturday 1pm deadline focus

7. **Retargeting** (£5/day - Always on)
   - Website visitors last 30 days
   - Exclude recent bookers

---

## 🎨 Creative Assets Needed

### Images Required:
1. **Price Comparison Graphics** (1200x628px)
   - Airport vs Anchor prices
   - Split screen design
   
2. **Food Photography** (1080x1080px)
   - Fish & chips
   - Sunday roast
   - Pizza close-up
   - Burger & chips

3. **Venue Shots** (1200x628px)
   - Beer garden with planes
   - Interior atmosphere
   - Happy customers

### Videos Required:
1. **Tuesday Pizza** (15-30 seconds)
   - Pizza coming out of oven
   - BOGOF animation
   
2. **Sunday Roast** (30 seconds)
   - Plating sequence
   - Yorkshire pudding glory shot

---

## ⚙️ Custom Audiences to Create

### 1. Website Visitors - 30 Days
- **Type**: Website Traffic
- **Include**: All website visitors
- **Retention**: 30 days

### 2. Recent Bookers - 7 Days
- **Type**: Website Traffic
- **Include**: People who visited /booking-confirmation
- **Retention**: 7 days

### 3. Menu Browsers
- **Type**: Website Traffic
- **Include**: Visited /food-menu OR /sunday-lunch
- **Exclude**: Visited /booking-confirmation
- **Retention**: 14 days

### 4. High Intent (for scaling)
- **Type**: Website Traffic
- **Include**: Spent 30+ seconds on site
- **Retention**: 14 days

---

## 📈 Testing Strategy

### Week 1: Baseline Testing
- Start all campaigns with minimum budgets
- Monitor CTR (target: >2%)
- Track link clicks cost (target: <£0.50)

### Week 2: Optimize
- Pause ad sets with CTR <1%
- Increase budget on top performers by 20%
- Add new creative variations

### Week 3: Scale
- Double budget on profitable ad sets
- Create lookalike audiences
- Test new messaging angles

---

## 🔧 Tracking Setup

### Meta Pixel Events to Configure:
```javascript
// Page View (already standard)
fbq('track', 'PageView');

// View Menu
fbq('track', 'ViewContent', {
  content_name: 'Food Menu',
  content_category: 'Menu',
  value: 15.00,
  currency: 'GBP'
});

// Initiate Booking
fbq('track', 'InitiateCheckout', {
  value: 30.00,
  currency: 'GBP',
  content_category: 'Table Booking'
});

// Complete Booking
fbq('track', 'Purchase', {
  value: 30.00,
  currency: 'GBP',
  content_name: 'Table Reservation'
});
```

---

## 📞 Quick Support Contacts

### Meta Business Support:
- Help Center: business.facebook.com/help
- Live Chat: Available in Business Manager

### Campaign Questions:
- Review the strategy document: `meta-food-campaign-strategy.md`
- Test with small budgets first
- Monitor daily for first week

---

## ✅ Launch Checklist

Before going live:
- [ ] All creatives uploaded and approved
- [ ] Pixel firing correctly (use Pixel Helper extension)
- [ ] Custom audiences created
- [ ] Budget limits set
- [ ] Schedule reviewed (kitchen hours correct)
- [ ] Landing pages tested
- [ ] Phone ready for increased calls
- [ ] Staff briefed on expected increase

---

## 🚦 Go-Live Process

1. Start with £25/day total budget
2. Launch on a Monday for full week data
3. Check performance after 24 hours
4. Make first optimizations after 3 days
5. Scale winners after 7 days

Remember: The JSON file provides the complete campaign structure, but Meta Ads Manager requires manual setup or API implementation. Use this as your detailed blueprint for rapid deployment.

---

*For additional support or questions about implementation, refer to the main strategy document or Meta's Business Help Center.*