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
Added client-side calculation in `components/BusinessHours.tsx` that:
1. Uses the browser's local time (correctly handles BST)
2. Calculates open/closed status based on regular hours
3. Falls back to API data if calculation fails

## Action Items
1. Report bug to orangejelly.co.uk API support
2. Monitor for fix
3. Remove workaround once API is fixed

## Code Reference
See the client-side calculation in:
- `/components/BusinessHours.tsx` lines 45-114