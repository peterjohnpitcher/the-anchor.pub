# Pre-Launch Checklist for The Anchor Website

## Build & Compilation ✅
- [x] Project builds successfully with `npm run build`
- [x] TypeScript compilation passes without errors
- [x] ESLint warnings addressed (2 minor warnings remain)
  - Missing preconnect for Google Fonts (non-critical)
  - useCallback dependency warning in FlightStatus (non-critical)

## Code Quality ✅
- [x] No TODO/FIXME comments found
- [x] No placeholder or dummy content
- [x] Console.log statements only in appropriate places (API routes, error handling)

## Images & Assets ⚠️
- [x] Image directory structure exists
- [x] 14 images found in public/images
- [ ] **MISSING**: `/images/the-anchor-pub-stanwell-moor.jpg` referenced in metadata
- [ ] **MISSING**: `/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg` referenced in OG tags
- **Action Required**: Add these missing images or update references

## Environment Variables ⚠️
- [x] ANCHOR_API_KEY is set and valid
- [x] NEXT_PUBLIC_AVIATIONSTACK_API_KEY is set
- [x] OPENWEATHER_API_KEY is set
- [ ] **NEEDS UPDATE**: NEXT_PUBLIC_GA_MEASUREMENT_ID (currently placeholder)
- [ ] **NEEDS UPDATE**: GOOGLE_BUSINESS_LOCATION_ID (currently placeholder)
- [x] NEXTAUTH_SECRET is generated
- [x] NEXTAUTH_URL is set to production URL

## API Integration ✅
- [x] API base URL correctly configured
- [x] API client using proper authentication
- [x] Error handling implemented for all API calls
- [x] Fallback behavior for API failures

## SEO & Meta Tags ✅
- [x] Default meta tags configured in layout
- [x] Open Graph tags present
- [x] Twitter Card tags configured
- [x] Canonical URLs set
- [x] robots.txt configured
- [x] sitemap.ts implemented
- [x] Schema.org markup implemented

## Internal Links ✅
- [x] Navigation links use correct paths
- [x] No broken internal links detected
- [x] Proper Link components used throughout

## Contact Information ✅
- [x] Phone number consistent: 01753 682707
- [x] Email consistent: manager@the-anchor.pub
- [x] Address consistent throughout site
- [x] All contact info centralized in constants

## Performance Considerations ✅
- [x] Images using Next.js Image component
- [x] Lazy loading implemented for non-critical components
- [x] Critical CSS inlined
- [x] Font optimization configured

## Hardcoded URLs ✅
- [x] No localhost references in production code
- [x] API URLs properly configured
- [x] No development-specific URLs

## Content Verification ✅
- [x] No Lorem ipsum text
- [x] All placeholder attributes are legitimate

## Build Output
- Build generates 317 static pages
- Edge runtime warning for some pages (non-critical)
- All pages compile successfully

## Critical Issues to Fix Before Launch

### High Priority
1. **Add missing images**:
   - `/images/the-anchor-pub-stanwell-moor.jpg`
   - `/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg`

2. **Update environment variables**:
   - Set real Google Analytics ID in `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Set Google Business Location ID if using Google integration

### Medium Priority
1. Consider adding the missing preconnect tag for Google Fonts to optimize loading
2. Review the useCallback dependency in FlightStatus component

### Low Priority
1. The edge runtime warning can be addressed post-launch if needed

## Recommended Pre-Launch Tests

1. **Manual Testing**:
   - Navigate through all main pages
   - Test all forms (event booking, contact)
   - Verify all images load correctly
   - Check responsive design on mobile/tablet
   - Test in multiple browsers (Chrome, Safari, Firefox, Edge)

2. **API Testing**:
   - Verify events load on What's On page
   - Check business hours display
   - Test event booking flow
   - Verify weather widget works

3. **SEO Testing**:
   - Run through Google's Mobile-Friendly Test
   - Check with Google's Rich Results Test
   - Verify all meta tags with a tool like metatags.io

4. **Performance Testing**:
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Test on slow 3G connection

5. **Analytics Testing**:
   - Verify Google Analytics is tracking (after adding real ID)
   - Test event tracking for key actions

## Final Steps
1. Add the missing images
2. Update the environment variables
3. Run final build and deploy
4. Perform post-deployment verification