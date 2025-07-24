# Business Hours API Timezone Bug

## Issue Description
The external business hours API at `https://management.orangejelly.co.uk/api/business/hours` has a timezone calculation bug.

## Details
- **API Endpoint**: https://management.orangejelly.co.uk/api/business/hours
- **Issue**: The API claims to use "Europe/London" timezone but appears to calculate `currentStatus` using UTC
- **Impact**: During British Summer Time (BST/UTC+1), the pub appears closed when it should be open

## Example
On July 18, 2025 at 16:25 BST:
- Local time (BST): 16:25 (4:25 PM)
- UTC time: 15:25 (3:25 PM)
- Pub opens at: 16:00 (4:00 PM)
- API returns: `isOpen: false` (incorrect - should be true)

## Workaround
Fixed by applying timezone correction at the API level:

1. **Server-side fix in `/app/api/business-hours/route.ts`**:
   - Intercepts the external API response
   - Recalculates open/closed status using server's local time (BST)
   - Ensures consistent status across all components

2. **Client-side calculation in `components/BusinessHours.tsx`**:
   - Provides additional fallback
   - Uses the browser's local time (correctly handles BST)
   - Falls back to API data if calculation fails

## Action Items
1. Report bug to orangejelly.co.uk API support
2. Monitor for fix
3. Remove workaround once API is fixed

## Code Reference
- Server-side fix: `/app/api/business-hours/route.ts` lines 23-88
- Client-side fallback: `/components/BusinessHours.tsx` lines 45-114