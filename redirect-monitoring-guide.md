# Redirect Monitoring Guide

## Overview
This guide helps you monitor the success of the 301 redirects implemented from the old Wix site to the new Next.js site.

## Immediate Actions After Deploy

### 1. Test Critical Redirects Manually
Test these high-traffic URLs immediately after deployment:
- https://www.the-anchor.pub/food → Should redirect to /food-menu
- https://www.the-anchor.pub/drink → Should redirect to /drinks
- https://www.the-anchor.pub/our-events → Should redirect to /whats-on
- https://www.the-anchor.pub/post/sunday-lunch-at-the-anchor → Should redirect to /sunday-lunch
- https://www.the-anchor.pub/drinks/carling → Should redirect to /drinks

### 2. Google Search Console Setup
1. Submit new sitemap: https://www.the-anchor.pub/sitemap.xml
2. Monitor Coverage report for:
   - Redirect errors
   - 404 errors
   - Valid pages

### 3. Google Analytics 4 Monitoring
Set up custom reports to track:
- 404 error pages
- Traffic to redirected URLs
- User behaviour flow from redirects

## Week 1 Monitoring

### Daily Cheques
1. **Google Search Console**
   - Cheque Coverage report for new errors
   - Monitor "Page with redirect" status
   - Review any crawl errors

2. **Analytics**
   - Monitor organic traffic levels
   - Cheque for unusual bounce rates
   - Review landing page performance

3. **Manual Testing**
   - Test 5-10 random old URLs daily
   - Verify they redirect correctly

### Issues to Watch For
- Redirect chains (multiple redirects)
- Redirect loops
- Slow redirect response times
- Missing redirects (404 errors)

## Week 2-4 Monitoring

### Weekly Reports
Create weekly reports tracking:
1. **Traffic Recovery**
   - Compare organic traffic to pre-migration levels
   - Monitor specific page performance
   - Track conversion rates

2. **Technical Health**
   - 404 error rate
   - Redirect success rate
   - Page load times

3. **Search Performance**
   - Keyword rankings
   - Click-through rates
   - Impressions

### Optimisation Actions
Based on monitoring data:
1. Add any missing redirects discovered
2. Fix redirect chains if found
3. Update internal links to use new URLs directly
4. Submit URL removal requests for any problematic old URLs

## Long-term Monitoring (Month 2+)

### Monthly Reviews
1. **Redirect Cleanup**
   - Identify redirects with no traffic
   - Consider removing after 6 months
   - Update any remaining internal links

2. **Performance Analysis**
   - Compare year-over-year traffic
   - Monitor seasonal patterns
   - Track mobile vs desktop performance

3. **SEO Health**
   - Monitor keyword rankings recovery
   - Cheque for any penalties
   - Review Core Web Vitals

## Tools for Monitoring

### Essential Tools
1. **Google Search Console**
   - Coverage reports
   - URL inspection tool
   - Performance reports

2. **Google Analytics 4**
   - Real-time reports
   - Landing page reports
   - 404 tracking

3. **Screaming Frog** (optional)
   - Crawl site for redirect chains
   - Find broken links
   - Export redirect mapping

### Useful Chrome Extensions
- Redirect Path
- Link Redirect Trace
- Cheque My Links

## Emergency Response Plan

If traffic drops significantly:
1. **Immediate Actions**
   - Cheque for site-wide issues
   - Verify redirects are working
   - Review server logs

2. **Within 24 Hours**
   - Submit updated sitemap
   - Cheque for manual penalties
   - Review competitor changes

3. **Within 48 Hours**
   - Implement missing redirects
   - Fix any technical issues
   - Communicate with Google via Search Console

## Success Metrics

### Week 1
- ✓ Less than 5% 404 error rate
- ✓ 90%+ of redirects working correctly
- ✓ No significant traffic drop (>20%)

### Month 1
- ✓ Organic traffic recovered to 80%+ of pre-migration
- ✓ All high-traffic pages indexed
- ✓ No redirect chains or loops

### Month 3
- ✓ Traffic exceeds pre-migration levels
- ✓ Improved user engagement metrics
- ✓ Better Core Web Vitals scores

## Reporting Template

Weekly redirect report should include:
```
Week of: [Date]

Traffic Overview:
- Organic Sessions: [Number] ([Change]% from previous week)
- 404 Errors: [Number]
- Successful Redirects: [Number]

Issues Found:
- [List any problems]

Actions Taken:
- [List fixes implemented]

Next Week Focus:
- [Priority items]
```

## Contact for Issues

If you encounter significant issues:
1. Cheque this guide first
2. Review redirect implementation in next.config.js
3. Test specific redirects manually
4. Cheque server logs for errors

Remember: Most traffic fluctuations in the first month are normal. Focus on fixing errors and ensuring all redirects work correctly.