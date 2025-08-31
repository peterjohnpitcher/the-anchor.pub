# Manager's Special Documentation

## Overview
The Manager's Special is a monthly rotating drinks promotion at The Anchor pub. Each month features a different premium spirit at 25% off. The system automatically activates and deactivates promotions based on date ranges, ensuring new specials appear on the website at the correct time.

## Current Status (August 31, 2025)
- **Active Promotion**: Warners Elderflower Gin (August 2025)
- **Next Promotion**: None configured for September
- **System Time**: BST (British Summer Time)

## ⚠️ CRITICAL: September Promotion Missing
**No September promotion is currently configured. The website will show a 404 error on the Manager's Special page starting September 1st.**

## How It Works

### 1. Date-Based Activation
The system uses UK timezone (Europe/London) to determine which promotion is active:

```typescript
// lib/managers-special-utils.ts
function getUKDate(): Date {
  const now = new Date()
  const ukTimeString = now.toLocaleString('en-GB', { timeZone: 'Europe/London' })
  // Parses and returns UK date/time
}

function isDateInRange(currentDate: Date, startDate: string, endDate: string): boolean {
  // Start date: 00:00:00 on the first day
  // End date: 23:59:59 on the last day
  return current >= start && current <= end
}
```

### 2. Promotion Data Structure
Promotions are stored in `/content/managers-special-promotions.json`:

```json
{
  "promotions": [
    {
      "id": "unique-identifier",
      "startDate": "2025-09-01",  // YYYY-MM-DD format
      "endDate": "2025-09-30",    
      "imageFolder": "september-2025",  // Folder in public/images/managers-special/
      "active": true,  // Must be true to show
      "spirit": {
        "name": "Spirit Name",
        "category": "Spirit Type",
        "originalPrice": "£X.XX",
        "specialPrice": "£X.XX",
        "originalPriceDouble": "£X.XX",
        "specialPriceDouble": "£X.XX",
        "discount": "25% OFF",
        // ... additional fields
      },
      "promotion": {
        "headline": "Manager's Special - September",
        "subheadline": "Tagline",
        "offerText": "Offer description",
        "ctaText": "Call to action",
        "metaTitle": "SEO title",
        "metaDescription": "SEO description"
      }
    }
  ]
}
```

### 3. Automatic Activation Flow
1. **Server-side check** (`getCurrentPromotion()`) runs on every request
2. Finds promotions where:
   - `active` is `true`
   - Current UK date is between `startDate` and `endDate`
3. Returns the matching promotion or `null`
4. If no active promotion:
   - API returns 404
   - Page shows 404 error
   - Component doesn't render

### 4. Where It's Used

#### Main Page (`/drinks/managers-special`)
- Full dedicated page with all details
- Shows 404 if no active promotion
- Server-side rendered with dynamic metadata

#### Drinks Menu (`/drinks`)
- Uses `<ManagersSpecialHero />` component
- Shows banner if promotion is active
- Silently hidden if no promotion

#### API Endpoint (`/api/managers-special`)
- Returns current promotion data
- Used by client components
- Returns 404 if no active promotion

## Adding September's Promotion

### Step 1: Prepare the Spirit Image
1. Create folder: `/public/images/managers-special/september-2025/`
2. Add the spirit bottle image (JPG, PNG, or WebP)
3. Name it descriptively (e.g., `bombay-sapphire-bottle.jpg`)

### Step 2: Update Promotions JSON
Add this to `/content/managers-special-promotions.json`:

```json
{
  "id": "september-2025-promotion",
  "startDate": "2025-09-01",
  "endDate": "2025-09-30",
  "imageFolder": "september-2025",
  "active": true,
  "spirit": {
    "name": "[Spirit Name]",
    "category": "[Category, e.g., Premium Gin]",
    "originalPrice": "£[X.XX]",
    "specialPrice": "£[X.XX * 0.75]",
    "originalPriceDouble": "£[X.XX * 2]",
    "specialPriceDouble": "£[X.XX * 1.5]",
    "discount": "25% OFF",
    "description": "[Short description]",
    "longDescription": "[Detailed description]",
    "tastingNotes": [
      "Note 1",
      "Note 2",
      "Note 3"
    ],
    "servingsuggestions": [
      "Serving suggestion 1",
      "Serving suggestion 2"
    ],
    "botanicals": [
      // If applicable (for gins)
    ],
    "abv": "[XX%]",
    "origin": "[Country/Region]",
    "distillery": "[Distillery Name]"
  },
  "promotion": {
    "headline": "Manager's Special - September",
    "subheadline": "[Catchy tagline]",
    "offerText": "Enjoy 25% off all serves throughout September",
    "ctaText": "Try it today for just £[X.XX]",
    "metaTitle": "September Manager's Special - 25% OFF [Spirit] | The Anchor Stanwell Moor",
    "metaDescription": "Enjoy 25% off [Spirit] throughout September at The Anchor pub. Singles £[X.XX], Doubles £[X.XX]. Limited time offer."
  }
}
```

### Step 3: Test the Setup
1. **Check current promotion** (should still show August until midnight):
   ```bash
   curl https://www.the-anchor.pub/api/managers-special
   ```

2. **Verify September will activate**:
   - The promotion will automatically activate at 00:00:01 on September 1st
   - No code changes or deployments needed
   - The system checks dates on every request

## Testing & Verification

### Quick Health Check Script
```bash
# Check if promotion is active
curl -s https://www.the-anchor.pub/api/managers-special | jq '.'

# Check the dedicated page
curl -s -o /dev/null -w "%{http_code}" https://www.the-anchor.pub/drinks/managers-special
# Should return 200 if active, 404 if not
```

### Manual Testing
1. Visit `/drinks/managers-special` - should show current promotion
2. Visit `/drinks` - should show banner if promotion active
3. Check metadata: View page source for correct SEO tags

## Common Issues & Solutions

### Issue: Promotion Not Showing on Correct Date
**Cause**: Timezone mismatch
**Solution**: System uses UK timezone (Europe/London). Check server timezone settings.

### Issue: Image Not Displaying
**Cause**: Wrong folder name or missing image
**Solution**: 
1. Verify folder exists: `/public/images/managers-special/[imageFolder]/`
2. Check at least one image file exists in folder
3. Verify `imageFolder` in JSON matches actual folder name

### Issue: 404 on Manager's Special Page
**Cause**: No active promotion for current date
**Solution**: 
1. Check `active: true` in promotion
2. Verify date range includes today
3. Check JSON syntax is valid

### Issue: Old Promotion Still Showing
**Cause**: Browser/CDN caching
**Solution**: 
1. Hard refresh (Ctrl+Shift+R)
2. Clear Vercel cache if needed
3. Check Cloudflare cache settings

## Monitoring Checklist

### Daily (1st of each month)
- [ ] Verify new promotion is active
- [ ] Check page loads correctly
- [ ] Verify image displays
- [ ] Test on mobile and desktop
- [ ] Check SEO metadata

### Weekly
- [ ] Monitor 404 errors on `/drinks/managers-special`
- [ ] Check API response times
- [ ] Verify GTM tracking events

### Monthly (25th of each month)
- [ ] Prepare next month's promotion data
- [ ] Upload spirit image
- [ ] Update promotions JSON
- [ ] Test in development environment

## Technical Implementation Details

### Server Components (SSR)
- `/app/drinks/managers-special/page.tsx` - Main page
- Metadata generated dynamically per promotion
- 404 handling for no active promotion

### Client Components
- `/components/ManagersSpecial.tsx` - Reusable display component
- `/components/ManagersSpecialHero.tsx` - Banner for drinks page
- Fetches from API endpoint, handles loading/error states

### Utility Functions
- `getCurrentPromotion()` - Core date checking logic
- `getPromotionImage()` - Image path resolution
- UK timezone handling for accurate activation

### Data Flow
1. User requests page
2. Server checks current date (UK timezone)
3. Finds active promotion in JSON
4. Renders page with promotion data
5. Client components fetch same data via API

## Future Enhancements
1. Admin interface for managing promotions
2. Automatic social media posting
3. Email notifications for new promotions
4. Analytics dashboard for promotion performance
5. A/B testing different spirits
6. Integration with POS system for automatic pricing

## Contact for Issues
- Technical issues: Check this documentation first
- Missing promotions: Add to JSON file as shown above
- Emergency support: Contact development team

---

**Last Updated**: August 31, 2025
**Next Action Required**: Add September promotion before September 1st, 2025