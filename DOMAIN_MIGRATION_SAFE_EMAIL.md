# Safe Domain Migration: Wix to Vercel (Preserving Email)

This guide will help you migrate the-anchor.pub from Wix to Vercel while **keeping your email services intact** at Register.com.

## ⚠️ IMPORTANT: Your Email Setup
You have email services configured with Register.com. We will ONLY change the website DNS records (www and @) and leave all email-related records untouched.

## Current Email Records to PRESERVE:
- **MX Records**: Keep as-is (for email delivery)
- **Mail server A records**: email, ftp, imap, mail, mx, pop, smtp, webmail (all the 66.96.x.x IPs)
- These ensure your email continues working without interruption

## Step 1: Verify Current Setup

Your current DNS shows:
- **www**: Currently set to "none" with Register.com Hosting
- **@ (root)**: Currently set to "none" with Register.com Hosting
- **Email services**: Multiple mail-related A records (KEEP THESE!)

## Step 2: Add Your Domain to Vercel

1. Log into your Vercel account
2. Go to your project dashboard
3. Click "Settings" → "Domains"
4. Add your domains:
   - Add: `the-anchor.pub` → Click "Add"
   - Add: `www.the-anchor.pub` → Click "Add"
5. Vercel will show you DNS requirements (we'll modify these to preserve email)

## Step 3: Update ONLY Website Records at Register.com

### Option A: Using A Records (Recommended for Register.com)

Since you already have A records configured, this is the safest approach:

1. **Log into Register.com**
2. Go to "Advanced DNS Manager" for the-anchor.pub
3. Click "Edit A Records"
4. **Update ONLY these two records:**

   **For www:**
   ```
   Host: www
   TTL: 7200
   Numeric IP: 76.76.21.21
   ```

   **For @ (root domain):**
   ```
   Host: @ (None)
   TTL: 7200
   Numeric IP: 76.76.21.21
   ```

5. **DO NOT CHANGE** any of these email-related records:
   - email.the-anchor.pub (66.96.162.48)
   - ftp.the-anchor.pub (66.96.162.142)
   - imap.the-anchor.pub (66.96.162.142)
   - mail.the-anchor.pub (66.96.162.142)
   - mx.the-anchor.pub (66.96.140.142 & 66.96.140.143)
   - pop.the-anchor.pub (66.96.162.142)
   - smtp.the-anchor.pub (66.96.162.142)
   - webmail.the-anchor.pub (66.96.162.48)

### Option B: Using CNAME for www only

If you prefer, you can use CNAME for www subdomain:

1. Click "Edit CNAME Records"
2. Add:
   ```
   Alias: www
   Points to: cname.vercel-dns.com
   TTL: 7200
   ```
3. Then remove the www A record (but keep @ as A record pointing to 76.76.21.21)

## Step 4: Remove Old Wix Configuration

Since your current records show "none" for www and @, you likely don't have active Wix IPs. But double-check:
- Look for any A records with IPs like 23.235.33.229 or 23.235.47.133
- Look for any CNAME records pointing to wixdns.net
- Remove only these if found

## Step 5: Verify Domain in Vercel

1. After updating DNS, go back to Vercel
2. In Settings → Domains, you should see your domains
3. Click "Refresh" next to each domain
4. Vercel will verify and provision SSL certificates (can take 5-60 minutes)

## Step 6: Testing Checklist

**Website Tests:**
- [ ] https://the-anchor.pub loads correctly
- [ ] https://www.the-anchor.pub loads correctly
- [ ] SSL padlock shows in browser
- [ ] All pages load properly

**Email Tests (CRITICAL):**
- [ ] Send a test email TO your @the-anchor.pub address
- [ ] Send a test email FROM your @the-anchor.pub address
- [ ] Check webmail still works at webmail.the-anchor.pub
- [ ] Verify email clients (Outlook, Mail app) still connect

## Step 7: Set Up Redirects

Since you're keeping the same domain, you mainly need to handle any Wix-specific URLs. Your `wix-redirects.json` file should handle these automatically.

## Timing & Best Practices

1. **Make changes during low email volume** (evening/weekend)
2. **DNS propagation**: 5-30 minutes typically
3. **Monitor email immediately** after changes
4. **Keep Wix active** for 48 hours as backup

## Troubleshooting

**Website not loading:**
- Clear browser cache
- Check DNS propagation at whatsmydns.net
- Verify you used IP 76.76.21.21 for both www and @

**Email stops working:**
- IMMEDIATELY revert the @ and www records back to "none"
- Double-check you didn't modify any email-related records
- Contact Register.com support if needed

**SSL errors:**
- Wait up to 1 hour for Vercel to provision certificates
- In Vercel, remove and re-add the domain if needed

## Quick Rollback Plan

If anything goes wrong:
1. Log into Register.com
2. Edit A Records
3. Change www and @ back to "none" with Register.com Hosting
4. Changes revert in 5-30 minutes

## Summary of Changes

You're ONLY changing:
- **www** A record → 76.76.21.21
- **@** A record → 76.76.21.21

You're NOT changing:
- Any MX records
- Any email/mail/smtp/pop/imap records  
- Any other services

This ensures your website points to Vercel while email continues through Register.com.

## Support Contacts

- **Register.com Support**: Available in your account
- **Vercel Support**: https://vercel.com/support
- **DNS Check**: https://mxtoolbox.com/ (to verify email records)

Good luck! Your email will stay safe with this approach. 🚀