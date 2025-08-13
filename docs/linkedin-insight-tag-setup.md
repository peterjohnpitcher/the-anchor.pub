# LinkedIn Insight Tag Setup Guide
## For The Anchor's Next.js Website

---

## What is the LinkedIn Insight Tag?

The LinkedIn Insight Tag is a piece of JavaScript code that enables you to:
- Track conversions from your LinkedIn ads
- Retarget website visitors on LinkedIn
- Get demographic insights about your website visitors
- Measure ROI from your LinkedIn campaigns

Think of it like Google Analytics but specifically for LinkedIn advertising.

---

## Part 1: Get Your LinkedIn Partner ID

### Step 1: Access LinkedIn Campaign Manager
1. Go to https://business.linkedin.com
2. Sign in with info@theanchorpub.co.uk
3. If prompted, select your ad account for The Anchor

### Step 2: Navigate to Insight Tag
1. Click **"Analyze"** on the left menu
2. Click **"Insight tag"**

### Step 3: Create Your Insight Tag (First Time Only)
1. If you see "Create Insight Tag" button, click it
2. Click **"I will use a tag manager"** option
3. Your Partner ID will appear (it's a 6-7 digit number like `1234567`)
4. **Copy this Partner ID** - you'll need it for the code

### Step 4: Save Your Partner ID
Save this somewhere safe:
```
LinkedIn Partner ID: [YOUR_NUMBER_HERE]
```

---

## Part 2: Add to Your Next.js Website

You have two options - choose the one you're most comfortable with:

### Option A: Using a Package (Recommended - Easier)

#### Step 1: Install the Package
Open terminal in your project folder and run:
```bash
npm install nextjs-linkedin-insight-tag
```

#### Step 2: Create the Component
Create a new file: `/components/tracking/LinkedInInsightTag.tsx`

```typescript
'use client'

import { LinkedInInsightTag as LinkedInTag } from 'nextjs-linkedin-insight-tag'

export function LinkedInInsightTag() {
  // Replace with your actual Partner ID from LinkedIn
  const LINKEDIN_PARTNER_ID = '1234567' // <-- PUT YOUR PARTNER ID HERE
  
  return <LinkedInTag partnerId={LINKEDIN_PARTNER_ID} />
}
```

#### Step 3: Add to Your Layout
Edit `/app/layout.tsx` and add the component before closing body tag:

```typescript
import { LinkedInInsightTag } from '@/components/tracking/LinkedInInsightTag'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <LinkedInInsightTag />  {/* Add this line */}
      </body>
    </html>
  )
}
```

### Option B: Manual Implementation (More Control)

#### Step 1: Create the Component
Create a new file: `/components/tracking/LinkedInInsightTag.tsx`

```typescript
'use client'

import Script from 'next/script'

export function LinkedInInsightTag() {
  // Replace with your actual Partner ID from LinkedIn
  const PARTNER_ID = '1234567' // <-- PUT YOUR PARTNER ID HERE
  
  return (
    <>
      <Script 
        id="linkedin-insight-tag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            _linkedin_partner_id = "${PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `
        }}
      />
      <Script 
        id="linkedin-insight-tag-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(l) {
              if (!l){
                window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";
              b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `
        }}
      />
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }} 
          alt="" 
          src={`https://px.ads.linkedin.com/collect/?pid=${PARTNER_ID}&fmt=gif`}
        />
      </noscript>
    </>
  )
}
```

#### Step 2: Add to Layout
Same as Option A - add to `/app/layout.tsx` before closing body tag.

---

## Part 3: Track Conversions on Your Christmas Page

### Step 1: Set Up Conversion Tracking
Add this to `/app/christmas-parties/client-components.tsx`:

```typescript
'use client'

import { trackLinkedInConversion } from '@/lib/linkedin-tracking'

// In your ContactActions component, update the click handlers:
export function ContactActions() {
  const handleEmailClick = () => {
    // Track LinkedIn conversion
    trackLinkedInConversion('email_click')
    
    // Track GTM event as before
    trackChristmasEnquiry('email_click', 'christmas_cta')
    
    // Continue with email action
    window.location.href = 'mailto:info@theanchorpub.co.uk?subject=Christmas Party Enquiry'
  }
  
  const handlePhoneClick = () => {
    // Track LinkedIn conversion
    trackLinkedInConversion('phone_click')
    
    // Track GTM event as before
    trackChristmasEnquiry('phone_click', 'christmas_cta')
    
    // Continue with phone action
    window.location.href = 'tel:01753682707'
  }
  
  // Rest of your component...
}
```

### Step 2: Create the Tracking Function
Create `/lib/linkedin-tracking.ts`:

```typescript
export function trackLinkedInConversion(eventName: string) {
  // Only track if LinkedIn pixel is loaded
  if (typeof window !== 'undefined' && window.lintrk) {
    // You'll get these conversion IDs from LinkedIn Campaign Manager
    const conversionIds: Record<string, number> = {
      'email_click': 12345678,  // Replace with your actual conversion ID
      'phone_click': 12345679,  // Replace with your actual conversion ID
      'form_submit': 12345680,  // Replace with your actual conversion ID
    }
    
    const conversionId = conversionIds[eventName]
    if (conversionId) {
      window.lintrk('track', { conversion_id: conversionId })
    }
  }
}
```

---

## Part 4: Verify Installation

### Step 1: Deploy Changes
1. Commit and push your changes
2. Deploy to production

### Step 2: Check in LinkedIn Campaign Manager
1. Go back to Campaign Manager
2. Click **Analyze** > **Insight tag**
3. Look for your domain status - it should show:
   - **Status:** Active (may take up to 24 hours)
   - **Last received:** Shows timestamp when tag fired

### Step 3: Use LinkedIn Insight Tag Helper (Chrome Extension)
1. Install the LinkedIn Insight Tag Helper Chrome extension
2. Visit your website
3. Click the extension icon - it should show:
   - ✅ Partner ID found
   - ✅ Tag is firing correctly

---

## Part 5: Create Conversion Actions in Campaign Manager

### Step 1: Define Conversions
1. In Campaign Manager, go to **Analyze** > **Conversion tracking**
2. Click **Create conversion**
3. Create these conversions:

#### Conversion 1: Email Click
- **Name:** Christmas Party - Email Click
- **Type:** Custom Action
- **Conversion window:** 30 days
- **Attribution model:** Last touch

#### Conversion 2: Phone Click  
- **Name:** Christmas Party - Phone Click
- **Type:** Custom Action
- **Conversion window:** 30 days
- **Attribution model:** Last touch

#### Conversion 3: Form Submit (if you add a form)
- **Name:** Christmas Party - Form Submit
- **Type:** Lead
- **Conversion window:** 30 days
- **Attribution model:** Last touch

### Step 2: Get Conversion IDs
1. After creating each conversion, click on it
2. Copy the Conversion ID (8-digit number)
3. Update these IDs in your `/lib/linkedin-tracking.ts` file

---

## Part 6: Environment Variables (Optional but Recommended)

For better security, store your Partner ID in an environment variable:

### Step 1: Add to `.env.local`
```bash
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=1234567
```

### Step 2: Update Your Component
```typescript
export function LinkedInInsightTag() {
  const PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || ''
  
  if (!PARTNER_ID) {
    console.warn('LinkedIn Partner ID not configured')
    return null
  }
  
  // Rest of component...
}
```

---

## Troubleshooting

### Tag Not Showing as Active
- **Wait 24 hours** - It can take time to register
- **Check for blockers** - Ad blockers can prevent the tag from firing
- **Verify deployment** - Make sure changes are live on production

### Conversions Not Tracking
- **Check conversion window** - Default is 30 days
- **Verify conversion IDs** - Make sure they match Campaign Manager
- **Test in incognito** - Avoid cookie/cache issues

### Getting "Pending" Status
- This is normal for new tags
- Visit your site a few times
- Check again in 2-4 hours

---

## Best Practices

1. **Don't add to sensitive pages** - Avoid pages with financial or medical information
2. **Test thoroughly** - Use the Chrome extension to verify
3. **Monitor regularly** - Check weekly that tag is still active
4. **Track key actions** - Focus on high-intent actions like contact clicks
5. **Keep Partner ID secure** - Don't commit it to public repos

---

## Quick Checklist

- [ ] Got Partner ID from LinkedIn Campaign Manager
- [ ] Added LinkedInInsightTag component to website
- [ ] Added component to layout.tsx
- [ ] Created conversion tracking functions
- [ ] Deployed to production
- [ ] Verified tag is active in Campaign Manager
- [ ] Created conversion actions in Campaign Manager
- [ ] Updated conversion IDs in tracking code
- [ ] Tested with Chrome extension

---

## Support Resources

- **LinkedIn Help:** https://www.linkedin.com/help/lms/answer/a418880
- **Chrome Extension:** Search "LinkedIn Insight Tag Helper" in Chrome Web Store
- **Campaign Manager:** https://business.linkedin.com

---

*Document created: January 2025*
*For: The Anchor Christmas Campaign*