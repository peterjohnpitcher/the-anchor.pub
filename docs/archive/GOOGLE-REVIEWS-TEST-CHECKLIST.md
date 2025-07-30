# Google Reviews Integration Test Checklist

## Current Status
✅ Google Place ID configured: `ChIJDcbcERJxdkgReaFjdQ7fzfg`
✅ API Key configured (with referer restrictions)
✅ Integration code implemented
⚠️ API has production-only restrictions

## Test URLs Once Deployed

### 1. API Status Check
Visit: `https://www.the-anchor.pub/api/reviews/status`

Expected response:
```json
{
  "status": "ok",
  "config": {
    "hasApiKey": true,
    "hasPlaceId": true,
    "placeId": "ChIJDcbcERJxdkgReaFjdQ7fzfg"
  },
  "api": {
    "status": "working",
    "placeInfo": {
      "name": "The Anchor",
      "rating": 4.6,
      "totalReviews": 300+,
      "reviewsAvailable": 5
    }
  }
}
```

### 2. Reviews API Test
Visit: `https://www.the-anchor.pub/api/reviews`

Should return:
- `source`: "places" (not "mock")
- `reviews`: Array of 5 recent Google reviews
- `rating`: Current Google rating
- `totalReviews`: Total review count

### 3. Visual Check - Pages with Reviews

Check these pages for Google Reviews display:
- ✅ [Beer Garden](https://www.the-anchor.pub/beer-garden) - Carousel layout
- ✅ [Sunday Lunch](https://www.the-anchor.pub/sunday-lunch) - ReviewSection component
- 🔲 [Food Menu](https://www.the-anchor.pub/food) - To be added
- 🔲 [Drinks Menu](https://www.the-anchor.pub/drinks) - To be added
- 🔲 [Events Pages](https://www.the-anchor.pub/events) - To be added

## Troubleshooting

### If API shows "error" status:
1. Check Google Cloud Console for API restrictions
2. Ensure your domain is whitelisted: `the-anchor.pub`
3. Verify Places API is enabled
4. Check billing is active

### If reviews show "mock" source:
- API is not connecting properly
- Check browser console for errors
- Verify Place ID is correct

### Production Testing Commands:
```bash
# Check API status
curl https://www.the-anchor.pub/api/reviews/status

# Get reviews
curl https://www.the-anchor.pub/api/reviews

# Get filtered reviews (4+ stars only)
curl "https://www.the-anchor.pub/api/reviews?minRating=4"
```

## Next Steps After Testing

1. **If everything works:**
   - Monitor API usage in Google Cloud Console
   - Consider implementing Google My Business API for full review access
   - Add reviews to remaining pages

2. **If API is blocked:**
   - Check API key restrictions in Google Cloud Console
   - Add `the-anchor.pub` to allowed referrers
   - Ensure HTTPS is used (not HTTP)

3. **Performance optimization:**
   - Reviews are cached for 1 hour
   - Consider adjusting cache duration if needed
   - Monitor Core Web Vitals impact

## API Usage Limits
- Google Places API: 5 reviews maximum
- Rate limits apply (check quota in console)
- Consider costs if traffic increases

## Support
- Google Places API docs: https://developers.google.com/maps/documentation/places/web-service
- API Console: https://console.cloud.google.com/apis/