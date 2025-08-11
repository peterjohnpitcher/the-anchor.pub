# GitHub Issues Audit Report - August 2025

## Summary
Reviewed 25 open issues to determine current status and relevance.

## Issues Closed (Resolved)
1. **#21** - Fake GPS coordinates in schema - **FIXED** ✅
   - Coordinates now correct: 51.462509
   
2. **#20** - Schema shows pub open on Mondays - **FIXED** ✅
   - Monday correctly shows as closed (00:00-00:00)
   
3. **#19** - Wrong phone number on Pizza page - **FIXED** ✅
   - All phone numbers now use correct: 01753682707

4. **#38** - Sunday Lunch booking and payment process - **FIXED** ✅
   - Payment integration now working correctly

## Still Valid Issues (Bugs to Fix)

### High Priority  
1. **#23** - Brand name inconsistency (58 occurrences)
   - Still using "The Anchor Pub" in 34 files
   - Should be standardized to "The Anchor"

2. **#22** - Phone number format inconsistency
   - Mix of formats: "01753 682707" vs "01753682707"
   - Needs standardization across all pages

3. **#29** - Journey times to Heathrow inconsistent
   - Different times quoted on different pages
   - Should use constants from lib/constants.ts

4. **#28** - StatusBar component implementation inconsistency
   - Different implementations across pages
   - Needs standardization

### Medium Priority
5. **#35** - Metadata title format inconsistency
   - SEO impact from inconsistent title formats

6. **#34** - Sunday roast pre-order messaging inconsistent
   - Different messages about booking requirements

7. **#24** - Parking capacity discrepancy
   - Conflicting information about parking spaces

## Enhancement Issues (Still Relevant)

### SEO/Content Enhancements
- **#30** - Enhance Sunday Roast page for SEO
- **#27** - Create Dog-Friendly pub page
- **#26** - Create Fish & Chips landing page
- **#25** - Create 'Restaurants Near Heathrow' hub page
- **#31** - Create Quiz Night dedicated page
- **#5** - SEO Content Expansion

### Feature Enhancements
- **#41** - Redesign booking interface as wizard
- **#18** - Add Images to Event Components
- **#15** - Event Pages - Hide Exact Capacity Numbers
- **#12** - Private Hire - Add Content & Booking Information
- **#11** - Google Reviews Integration
- **#10** - Booking System - Phone & Name Collection
- **#8** - Terminal 5 Bus Connection messaging

### Tracking Issues
- **#36** - MASTER TRACKING issue for consistency project

## Recommendations

### Immediate Actions
1. Standardize brand name (#23)
2. Fix phone number format (#22)
3. Fix journey times consistency (#29)

### Next Sprint
1. Standardize StatusBar implementation (#28)
2. Fix metadata titles (#35)
3. Fix Sunday roast messaging (#34)

### Future Enhancements
- SEO landing pages (#26, #27, #25, #31)
- Booking system improvements (#41, #10)
- Content additions (#18, #12, #5)

## Issues That Could Be Closed
None of the enhancement issues should be closed as they represent valid future work. All bug issues except the three already closed remain valid and need fixing.