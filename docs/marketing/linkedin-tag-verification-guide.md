# LinkedIn Insight Tag Verification Guide
## How to Check if Your Tag is Working

---

## Method 1: LinkedIn Campaign Manager (Most Reliable)

### Check Tag Status:
1. Log into LinkedIn Campaign Manager
2. Go to **Account Assets** → **Insight Tag** (or Conversion Tracking → Data Sources)
3. Look for your domain status:

#### What You Should See:
- **Status:** Active ✅ (Good!)
- **Last Received:** Shows recent timestamp (e.g., "2 hours ago")
- **Domain:** the-anchor.pub or www.the-anchor.pub

#### Status Meanings:
- **"Active"** ✅ = Tag is working perfectly
- **"Unverified"** ⚠️ = Tag installed but no LinkedIn member visited yet
- **"No recent activity"** ⚠️ = Tag exists but hasn't fired recently
- **"Not Active"** ❌ = Tag not installed or not firing

**Note:** Can take up to 24 hours to show "Active" after installation

---

## Method 2: LinkedIn Insight Tag Helper (Chrome Extension)

### Installation:
1. Open Chrome Web Store
2. Search: **"LinkedIn Insight Tag Helper"**
3. Add to Chrome
4. You'll see a small LinkedIn icon in your browser toolbar

### How to Test:
1. Visit your website: https://www.the-anchor.pub
2. Click the LinkedIn extension icon
3. Look for these indicators:

#### Good Signs ✅:
```
✓ LinkedIn Insight Tag found
✓ Partner ID: 1234567
✓ Status: Active
✓ Page views will be tracked
```

#### Problems to Fix ❌:
```
✗ No LinkedIn Insight Tag found
✗ Multiple tags detected
✗ Tag blocked by ad blocker
```

### Test Multiple Pages:
- Homepage: https://www.the-anchor.pub
- Christmas page: https://www.the-anchor.pub/christmas-parties
- Any other key pages

---

## Method 3: Browser Developer Console

### Quick Check:
1. Open your website
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. Type: `_linkedin_partner_id`
5. Press Enter

#### Should Return:
```javascript
"1234567"  // Your partner ID
```

#### If Returns:
```javascript
undefined  // Tag not installed
```

### Check if Tag Loaded:
In Console, type:
```javascript
window._linkedin_data_partner_ids
```

Should show:
```javascript
["1234567"]  // Array with your Partner ID
```

---

## Method 4: Network Tab Check

### Detailed Verification:
1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Filter by: **"linkedin"**
4. Refresh your page
5. Look for these requests:

#### Should See:
- `insight.min.js` (Status: 200) ✅
- `collect` request to px.ads.linkedin.com ✅
- Your Partner ID in the request parameters ✅

---

## Method 5: Google Tag Manager Debug

### If Using GTM:
1. Go to GTM
2. Click **Preview**
3. Enter your website URL
4. In Tag Assistant, look for:

#### On Page Load:
- **"LinkedIn Insight Tag - Base"** → Fired ✅
- Shows on "Tags Fired" section
- No errors in console

#### Test Conversions:
1. Go to /christmas-parties
2. Click email/phone links
3. Check conversion tags fired

---

## Common Issues & Fixes

### Issue: "Unverified" Status
**Fix:** 
- Visit your site in regular browser (not incognito)
- Make sure you're logged into LinkedIn
- Wait 2-24 hours for status update

### Issue: Tag Not Detected by Extension
**Fix:**
- Check GTM is published (not just saved)
- Clear browser cache
- Disable ad blockers
- Try different browser

### Issue: Multiple Tags Detected
**Fix:**
- Check you haven't installed tag twice
- Remove duplicate from GTM or code
- Keep only one instance

### Issue: Tag Blocked
**Fix:**
- Disable ad blockers for testing
- Add your domain to ad blocker whitelist
- Test in different browser

---

## Quick Verification Checklist

Run through this list to confirm everything works:

### In LinkedIn Campaign Manager:
- [ ] Status shows "Active"
- [ ] Last Received shows recent time
- [ ] No error messages displayed

### With Chrome Extension:
- [ ] Extension detects tag on homepage
- [ ] Extension detects tag on /christmas-parties
- [ ] Shows correct Partner ID

### In Browser Console:
- [ ] `_linkedin_partner_id` returns your ID
- [ ] No JavaScript errors about LinkedIn

### In Network Tab:
- [ ] insight.min.js loads successfully
- [ ] Collect requests sent to LinkedIn

### In GTM Preview:
- [ ] Base tag fires on all pages
- [ ] Conversion tags fire on clicks
- [ ] No tag errors shown

---

## Conversion Tracking Verification

### Test Your Conversions:
1. Go to /christmas-parties
2. Click email link
3. Click phone link
4. Wait 5-10 minutes
5. Check LinkedIn Campaign Manager:
   - Go to **Account Assets** → **Conversion Tracking**
   - Look at your conversions
   - Should show test conversions (might take 2-3 hours)

---

## What to Do Based on Results

### If Everything Works ✅:
1. Start your campaign!
2. Monitor weekly for continued operation
3. Check conversion data accumulates

### If Partially Working ⚠️:
1. Check specific issues above
2. Republish GTM if needed
3. Wait 24 hours and recheck

### If Not Working ❌:
1. Double-check Partner ID is correct
2. Verify GTM container is published
3. Check no typos in tag code
4. Try manual installation instead of GTM

---

## Success Indicators Timeline

### Immediately (0-5 mins):
- Chrome extension shows tag detected
- Console shows Partner ID
- Network shows requests

### Within 2-4 hours:
- First "Last Received" timestamp appears
- Status may show "Unverified"

### Within 24 hours:
- Status changes to "Active"
- Conversion test data appears
- Audience building starts

### After 48 hours:
- Full data flowing
- Can create retargeting audiences
- Ready to optimize campaigns

---

## Need Help?

### LinkedIn Resources:
- Status Page: Check Account Assets → Insight Tag
- Help Center: https://www.linkedin.com/help/lms/answer/a425696
- Chrome Extension: LinkedIn Insight Tag Helper

### Quick Debug Commands:
```javascript
// Check if tag exists
console.log(_linkedin_partner_id);

// Check if tracking works
window.lintrk('track');

// See all LinkedIn data
console.log(window._linkedin_data_partner_ids);
```

---

*Verification Guide Created: January 2025*
*Tag should be active within 24 hours of installation*