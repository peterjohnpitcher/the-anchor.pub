# Meta Pixel Data Audit Guide
*How to Check if Your Existing Pixel Data is Usable for Campaigns*

## Quick Answer: Is Your Data Usable?

### Minimum Requirements for Different Campaign Types

**Can Run Ads:**
- **20 people** - Absolute minimum (ads will run but poorly)
- **100 people** - API minimum for custom audiences
- **1,000+ people** - Practical minimum for decent performance

**For Your £250 Sunday Roast Campaign:**
- Need **1,000+ website visitors** for effective cold audience exclusion
- Need **100+ Sunday lunch page visitors** for retargeting
- Need **20+ booking initiators** for abandoned cart campaigns

## How to Check Your Current Data Quality

### Step 1: Check Events Manager Overview

1. **Go to**: Business Manager > Events Manager > Your Pixel
2. **Look at**: Overview tab
3. **Check these numbers**:

```
Last 7 Days:
- Total Events: _______ (need 1,000+ per week minimum)
- Unique Users: _______ (need 200+ per week minimum)
- Page Views: _______
- ViewContent: _______
- InitiateCheckout: _______
- Purchase: _______
```

**Red Flags:**
- Less than 100 events per day
- No ViewContent events
- No custom events beyond PageView
- Event Match Quality below 5.0

### Step 2: Check Your Custom Audiences

1. **Go to**: Audiences > Create Audience > Website Traffic
2. **Try creating these test audiences**:

**Test Audience 1: All Website Visitors**
- Include: All website visitors
- Retention: 30 days
- **Check size**: Should show 1,000+ for campaigns to work well

**Test Audience 2: Food Page Visitors**
- Include: People who visited specific web pages
- URL contains: /food OR /menu OR /drinks
- Retention: 30 days
- **Check size**: Need 100+ minimum

**Test Audience 3: Sunday Lunch Visitors**
- Include: URL contains /sunday-lunch
- Retention: 14 days
- **Check size**: Need 100+ for retargeting

**If audiences show "Less than 1000" or won't populate:**
- Your pixel hasn't collected enough data yet
- Events aren't firing properly
- Too restrictive retention window

### Step 3: Verify Event Quality

#### Use Meta Pixel Helper Chrome Extension

1. **Install**: Meta Pixel Helper from Chrome Store
2. **Visit your website**: Navigate to key pages
3. **Check for green checkmarks**:
   - Homepage: PageView ✓
   - Menu pages: ViewContent ✓
   - Sunday lunch: ViewContent with parameters ✓
   - Booking form: InitiateCheckout ✓

**Warning Signs:**
- Red errors
- "No Pixel Found"
- Duplicate pixels firing
- Missing parameters

#### Check Event Match Quality (EMQ)

1. **In Events Manager**: Click on individual events
2. **Look for EMQ Score**: 0-10 scale
   - 8-10: Excellent
   - 6-7: Good
   - 4-5: Fair (needs improvement)
   - Below 4: Poor (campaigns will struggle)

### Step 4: Test Events Tool Verification

1. **Go to**: Events Manager > Test Events
2. **Enter**: https://www.the-anchor.pub
3. **Navigate through site** while watching events fire
4. **Should see**:
   ```
   PageView - ✓ Received
   ViewContent - ✓ Received (on menu pages)
   InitiateCheckout - ✓ Received (on booking start)
   ```

## Data Quality Assessment

### 🟢 GREEN LIGHT - Ready for Campaigns
- 2,000+ total website visitors (30 days)
- 500+ food page visitors (30 days)
- 200+ Sunday lunch page visitors (14 days)
- All standard events firing correctly
- EMQ score above 6.0

### 🟡 YELLOW LIGHT - Can Start Testing
- 1,000-2,000 website visitors (30 days)
- 100-500 food page visitors (30 days)
- 50-200 Sunday lunch page visitors (14 days)
- Basic events working (PageView, ViewContent)
- EMQ score 4.0-6.0

**What you can do:**
- Run awareness campaigns to all website visitors
- Simple retargeting to site visitors
- Build data while campaigning

### 🔴 RED LIGHT - Need More Data First
- Under 1,000 website visitors (30 days)
- Under 100 food page visitors
- No ViewContent events
- Only PageView firing
- EMQ score below 4.0

**Fix first:**
- Verify pixel installation
- Add ViewContent events
- Run organic social for 2-4 weeks to build data
- Consider broader awareness campaign first

## Common GTM Pixel Issues to Check

### If Your Pixel is in GTM:

1. **Check Tag Firing**:
   - GTM Preview mode
   - Verify pixel fires on all pages
   - Check no blocking from consent management

2. **Check Event Parameters**:
   ```javascript
   // Good ViewContent for Sunday Lunch
   fbq('track', 'ViewContent', {
     content_name: 'sunday_roast',
     content_category: 'food',
     value: 14.95,
     currency: 'GBP'
   });
   
   // Bad - Missing parameters
   fbq('track', 'ViewContent');
   ```

3. **Check Triggers**:
   - All Pages trigger for PageView
   - URL-based triggers for ViewContent
   - Click triggers for InitiateCheckout

## Quick Fixes for Common Problems

### "Audience Too Small" Error
**Problem**: Custom audience won't save or shows <1000
**Fix**: 
- Expand retention window (7 → 30 → 180 days)
- Broaden URL parameters
- Wait 2-4 weeks for more data

### "No Events Received"
**Problem**: Events Manager shows no data
**Fix**:
- Check GTM is publishing correctly
- Verify pixel ID matches
- Check for ad blockers during testing
- Clear cache and cookies

### "Poor Event Match Quality"
**Problem**: EMQ score below 4
**Fix**:
- Add customer information parameters when available
- Implement Conversions API (server-side)
- Hash email addresses properly

## Action Plan Based on Your Data

### If You Have Good Data (Green Light):
1. Implement full funnel strategy immediately
2. Create all 5 audience segments
3. Launch with confidence

### If You Have Some Data (Yellow Light):
1. Start with simple website visitor retargeting
2. Focus budget on building pixel data
3. Add ViewContent events for menu pages
4. Re-assess in 2 weeks

### If You Have Minimal Data (Red Light):
1. Fix pixel implementation first
2. Run organic social to drive traffic
3. Consider £100 broad awareness campaign
4. Build for 4 weeks then reassess

## The Bottom Line

**For your £250/month Sunday roast campaign to work optimally, you need:**

1. **Minimum**: 1,000 pixel events per month
2. **Better**: 100+ Sunday lunch page views per month
3. **Best**: Full funnel tracking with all events

**Can you start with less?** 
Yes, but:
- Targeting will be less precise
- Costs will be higher
- Learning phase will take longer
- ROI will be lower initially

**Quick Test**: 
Go create a "Website visitors last 30 days" audience right now. 
- If it shows 1,000+, you're ready
- If it shows 100-1,000, you can start carefully
- If it shows <100 or won't create, fix pixel first

---

*Remember: Even Facebook Lookalike Audiences need just 100 people minimum. But for effective campaign performance at your budget level, 1,000+ in your pixel data is the real starting point.*