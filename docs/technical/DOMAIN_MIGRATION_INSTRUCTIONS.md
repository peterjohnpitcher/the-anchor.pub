# Domain Migration Instructions: Wix to Vercel

This guide will help you migrate the-anchor.pub from Wix to your new Vercel deployment while keeping your domain at domain.com.

## Prerequisites

- [ ] Your Vercel deployment is live and working (check at your-project.vercel.app)
- [ ] You have access to your domain.com account
- [ ] You have access to your Vercel account
- [ ] You've backed up any important data from Wix

## Step 1: Get Your Vercel Deployment URL

1. Log into your Vercel account
2. Find your project (the-anchor.pub)
3. Note your Vercel deployment URL (it will look like: `the-anchor-pub.vercel.app` or similar)
4. Test this URL to ensure your new site is working correctly

## Step 2: Add Your Domain to Vercel

1. In Vercel, go to your project dashboard
2. Click on "Settings" → "Domains"
3. Add your custom domain:
   - Type: `the-anchor.pub`
   - Click "Add"
4. Also add the www version:
   - Type: `www.the-anchor.pub`
   - Click "Add"
5. Vercel will show you the DNS records you need to add

## Step 3: Update DNS Records at domain.com

### Option A: Using CNAME Records (Recommended)

1. Log into your domain.com account
2. Navigate to DNS Management for the-anchor.pub
3. Delete or disable any existing A or CNAME records pointing to Wix
4. Add the following records:

   **For the root domain (the-anchor.pub):**
   ```
   Type: CNAME
   Name: @ (or leave blank)
   Value: cname.vercel-dns.com
   TTL: 3600 (or default)
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600 (or default)
   ```

### Option B: Using A Records (If CNAME on root isn't supported)

If domain.com doesn't support CNAME records on the root domain, use these A records instead:

1. Add A record for root domain:
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 76.76.21.21
   TTL: 3600 (or default)
   ```

2. Add CNAME for www:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600 (or default)
   ```

## Step 4: Remove Wix DNS Records

1. In domain.com DNS management, look for any records pointing to Wix:
   - Records with values like `23.235.33.229` or `23.235.47.133` (Wix IP addresses)
   - CNAME records pointing to `www.wixdns.net` or similar
2. Delete or disable all Wix-related DNS records

## Step 5: Verify SSL Certificate

1. Once DNS propagates (5-30 minutes), Vercel will automatically provision SSL certificates
2. In Vercel dashboard, check Settings → Domains
3. You should see green checkmarks next to your domains
4. If SSL isn't working after 1 hour, click "Refresh" next to the domain in Vercel

## Step 6: Set up Redirects

Create or update your `vercel.json` file in your project root:

```json
{
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

Add any other Wix-specific URL redirects you need to maintain SEO.

## Step 7: Testing Checklist

- [ ] Visit https://www.the-anchor.pub - site loads with SSL
- [ ] Visit https://www.the-anchor.pub - redirects to non-www
- [ ] Check all main pages load correctly
- [ ] Test booking links work
- [ ] Verify contact forms/phone numbers
- [ ] Check Google Analytics is tracking
- [ ] Test on mobile devices

## Step 8: Update External Services

1. **Google Business Profile**: Update website URL if needed
2. **Google Analytics**: Verify tracking is working
3. **Google Search Console**: Add new property for Vercel site
4. **Social Media**: Update any links in profiles

## Timing Considerations

- **DNS Propagation**: Usually 5-30 minutes, can take up to 48 hours
- **Best time to switch**: Early morning or late evening when traffic is low
- **Keep Wix active**: Don't cancel Wix immediately - wait 48-72 hours to ensure everything works

## Rollback Plan

If something goes wrong:
1. Log back into domain.com
2. Change DNS records back to Wix values
3. DNS will propagate back within 5-30 minutes

## Common Issues & Solutions

**Site not loading after DNS change:**
- Clear browser cache
- Try incognito/private browsing
- Check DNS propagation at whatsmydns.net

**SSL certificate errors:**
- Wait up to 1 hour for auto-provisioning
- In Vercel, remove and re-add the domain
- Check no CAA records are blocking Let's Encrypt

**Redirect loops:**
- Check vercel.json for conflicting redirects
- Ensure www redirect is set up correctly in Vercel

## Support Contacts

- **Vercel Support**: https://vercel.com/support
- **domain.com Support**: Check your account for support options
- **DNS Propagation Checker**: https://www.whatsmydns.net/

## Final Notes

- The wix-redirects.json file in your project will handle any blog/page redirects
- Your new site is much faster than Wix - expect better SEO performance
- Monitor Google Analytics closely for the first week
- Keep backups of your Wix site data until you're confident in the migration

Good luck with your migration! 🚀