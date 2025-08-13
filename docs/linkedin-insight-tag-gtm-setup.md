# LinkedIn Insight Tag Setup via Google Tag Manager (GTM)
## Complete Guide for The Anchor's Christmas Campaign

---

## Finding Your LinkedIn Insight Tag

Since you can't see the "Analyze" menu, here are alternative ways to find it:

### Option 1: Account Assets Menu
1. Log into LinkedIn Campaign Manager: https://business.linkedin.com
2. Select your ad account (top-left dropdown)
3. Look for **"Account Assets"** in the navigation
4. Click **"Insight Tag"** or **"Conversion Tracking"**

### Option 2: Through Conversion Tracking
1. In Campaign Manager, look for **"Account Assets"**
2. Click **"Conversion Tracking"**
3. Select the **"Data Sources"** tab
4. You'll find Insight Tag there

### Option 3: Direct URL
Try this direct link after logging in:
```
https://www.linkedin.com/campaignmanager/accounts/[YOUR_ACCOUNT_ID]/insight-tag
```

### If This is Your First Time:
- You'll see a **"Create Insight Tag"** button
- Click it and select **"I will use a tag manager"**
- This will generate your Partner ID

---

## Step 1: Get Your LinkedIn Partner ID

### In LinkedIn Campaign Manager:
1. Navigate to your Insight Tag (using methods above)
2. Click **"I will use a tag manager"**
3. You'll see code that looks like this:
```javascript
_linkedin_partner_id = "1234567";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
```
4. **Copy only the number** (e.g., `1234567`) - this is your Partner ID
5. Save it somewhere safe:
```
LinkedIn Partner ID: [YOUR_NUMBER]
```

---

## Step 2: Set Up in Google Tag Manager

### A. Access GTM
1. Go to https://tagmanager.google.com
2. Select your container for the-anchor.pub

### B. Create LinkedIn Insight Tag

#### Method 1: Using Community Template (Recommended)

1. Click **"Tags"** in left menu
2. Click **"New"** button
3. Click **"Tag Configuration"**
4. Click **"Discover more tag types in the Community Template Gallery"** (puzzle piece icon)
5. Search for **"LinkedIn Insight"**
6. Select **"LinkedIn Insight Tag 2.0"** template
7. Click **"Add to workspace"**

#### Method 2: Manual Setup with Custom HTML

If the template isn't available:

1. Click **"Tags"** → **"New"**
2. Name it: **"LinkedIn Insight Tag - Site Wide"**
3. Click **"Tag Configuration"**
4. Choose **"Custom HTML"**
5. Paste this code:

```html
<script type="text/javascript">
_linkedin_partner_id = "YOUR_PARTNER_ID_HERE"; // Replace with your actual ID
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=YOUR_PARTNER_ID_HERE&fmt=gif" />
</noscript>
```

6. Replace `YOUR_PARTNER_ID_HERE` with your actual Partner ID (both places)

### C. Set Trigger
1. Click **"Triggering"**
2. Choose **"All Pages"** (or create one if it doesn't exist)
3. This ensures the tag fires on every page

### D. Save and Test
1. Click **"Save"**
2. Name your tag: **"LinkedIn Insight Tag - Base"**

---

## Step 3: Set Up Conversion Tracking for Christmas Enquiries

### A. Create Variables for Tracking

1. In GTM, click **"Variables"**
2. Click **"New"** under User-Defined Variables
3. Create a **"Constant"** variable:
   - Name: **"LinkedIn Partner ID"**
   - Value: Your Partner ID (e.g., `1234567`)

### B. Create Conversion Tags

#### Email Click Conversion:

1. Create new tag: **"LinkedIn Conversion - Christmas Email Click"**
2. Tag Type: **"Custom HTML"**
3. HTML:
```html
<script type="text/javascript">
window.lintrk('track', { 
  conversion_id: 12345678 // You'll get this from LinkedIn
});
</script>
```
4. Trigger: Create trigger for when email link is clicked
   - Trigger Type: **"Click - Just Links"**
   - Some Link Clicks
   - Click URL contains: `mailto:info@theanchorpub.co.uk`
   - AND Page Path equals: `/christmas-parties`

#### Phone Click Conversion:

1. Create new tag: **"LinkedIn Conversion - Christmas Phone Click"**
2. Tag Type: **"Custom HTML"**
3. HTML:
```html
<script type="text/javascript">
window.lintrk('track', { 
  conversion_id: 12345679 // You'll get this from LinkedIn
});
</script>
```
4. Trigger: Create trigger for phone clicks
   - Trigger Type: **"Click - Just Links"**
   - Some Link Clicks
   - Click URL contains: `tel:01753682707`
   - AND Page Path equals: `/christmas-parties`

---

## Step 4: Create Conversions in LinkedIn Campaign Manager

### Back in LinkedIn:
1. Go to **Account Assets** → **Conversion Tracking**
2. Click **"Create Conversion"**

### Create These Conversions:

#### Conversion 1: Christmas Email Enquiry
- **Name:** Christmas Party - Email Click
- **Conversion Type:** Other
- **Conversion Window:** 30 days post-click, 7 days post-view
- **Attribution Model:** Last Touch
- Click **"Save"**
- **Copy the Conversion ID** (8-digit number)

#### Conversion 2: Christmas Phone Enquiry
- **Name:** Christmas Party - Phone Click
- **Conversion Type:** Other
- **Conversion Window:** 30 days post-click, 7 days post-view
- **Attribution Model:** Last Touch
- Click **"Save"**
- **Copy the Conversion ID**

#### Conversion 3: Page View (Optional)
- **Name:** Christmas Party - Page View
- **Conversion Type:** Other
- **Use for:** Retargeting visitors
- Click **"Save"**
- **Copy the Conversion ID**

### Update GTM Tags:
Go back to GTM and replace the placeholder conversion IDs with your actual ones.

---

## Step 5: Test Your Setup

### A. GTM Preview Mode
1. In GTM, click **"Preview"**
2. Enter your website URL: https://www.the-anchor.pub
3. Navigate to /christmas-parties
4. Check that:
   - LinkedIn Insight Tag fires on page load
   - Email conversion fires when clicking email link
   - Phone conversion fires when clicking phone number

### B. LinkedIn Insight Tag Helper
1. Install Chrome extension: **"LinkedIn Insight Tag Helper"**
2. Visit your website
3. Click extension icon - should show:
   - ✅ Partner ID detected
   - ✅ Tag firing correctly

### C. Check LinkedIn Campaign Manager
1. Go to Account Assets → Insight Tag
2. Status should change to **"Active"** within 24 hours
3. You'll see "Last Received" timestamp

---

## Step 6: Publish GTM Changes

Once testing is successful:
1. Exit Preview mode
2. Click **"Submit"** in GTM
3. Add version name: **"LinkedIn Insight Tag Implementation"**
4. Add description: **"Added LinkedIn tracking for Christmas campaign"**
5. Click **"Publish"**

---

## Step 7: Create Retargeting Audiences

### In LinkedIn Campaign Manager:
1. Go to **Account Assets** → **Matched Audiences**
2. Click **"Create Audience"** → **"Website Audience"**

### Create These Audiences:

#### Audience 1: Christmas Page Visitors
- **Name:** Christmas Party Page Visitors
- **Target:** People who visited specific pages
- **URL contains:** `/christmas-parties`
- **Lookback window:** 90 days

#### Audience 2: High Intent (Email/Phone Clickers)
- **Name:** Christmas Party - High Intent
- **Based on:** Conversion tracking
- **Include:** Email Click OR Phone Click conversions
- **Lookback window:** 30 days

---

## Troubleshooting Common Issues

### "Account Assets" Not Visible:
- Make sure you have admin or campaign manager permissions
- Try switching accounts (top-left dropdown)
- Contact LinkedIn support if still not visible

### Tag Not Firing:
- Check GTM is published (not just saved)
- Disable ad blockers when testing
- Clear cache and cookies
- Check GTM debug console for errors

### Conversions Not Tracking:
- Wait 24-48 hours for data to appear
- Verify conversion IDs match exactly
- Check trigger conditions in GTM
- Test in incognito mode

### Partner ID Not Found:
- You may need to create campaign first
- Try: Campaign Groups → Create Campaign Group
- Then check Account Assets again

---

## Quick Reference

### Your Setup Checklist:
- [ ] Found Insight Tag in LinkedIn (Account Assets)
- [ ] Copied Partner ID
- [ ] Created base tag in GTM
- [ ] Set up conversion tracking tags
- [ ] Created conversions in LinkedIn
- [ ] Updated conversion IDs in GTM
- [ ] Tested in Preview mode
- [ ] Published GTM container
- [ ] Verified "Active" status in LinkedIn

### Key URLs:
- LinkedIn Campaign Manager: https://business.linkedin.com
- Google Tag Manager: https://tagmanager.google.com
- Your Christmas Page: https://www.the-anchor.pub/christmas-parties

### Support:
- LinkedIn Help: https://www.linkedin.com/help/lms
- GTM Help: https://support.google.com/tagmanager

---

## GTM Container Export (Optional)

If you want to share your setup or backup:
1. In GTM, go to **Admin**
2. Click **"Export Container"**
3. This creates a JSON file with all your tags
4. Can be imported to another container if needed

---

*Setup Guide Created: January 2025*
*For: The Anchor Christmas LinkedIn Campaign*