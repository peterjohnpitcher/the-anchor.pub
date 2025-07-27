# API Migration - January 2025

## Overview
This document outlines the API changes implemented in January 2025 to support the new management.orangejelly.co.uk API format.

## Key Changes

### 1. API Endpoint Migration
- **Old**: `https://management.orangejelly.co.uk/api/business-hours`
- **New**: `https://management.orangejelly.co.uk/api/business/hours`

### 2. Response Wrapper Format
All API responses now follow a consistent wrapper format:

```typescript
// Success response
{
  success: true,
  data: { /* actual response data */ }
}

// Error response
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable error message",
    details: { /* optional additional context */ }
  }
}
```

### 3. Time Format Changes
- **Old**: `HH:mm` (e.g., "16:00")
- **New**: `HH:mm:ss` (e.g., "16:00:00")

### 4. Business Hours Response Structure
The business hours API now returns comprehensive data:

```typescript
{
  regularHours: {
    monday: { opens: "16:00:00", closes: "22:00:00", is_closed: false, kitchen: null },
    // ... other days
  },
  specialHours: [
    { date: "2025-01-01", is_closed: true, reason: "New Year's Day" }
  ],
  currentStatus: {
    isOpen: true,
    kitchenOpen: false,
    closesIn: "4 hours 30 minutes",
    opensIn: null
  },
  timezone: "Europe/London",
  lastUpdated: "2025-01-27T10:00:00Z"
}
```

### 5. Kitchen Status Format
Kitchen status can now be one of three formats:
- `null` - No kitchen service
- `false` - Kitchen closed (bar open)
- `{ opens: "HH:mm:ss", closes: "HH:mm:ss" }` - Kitchen hours

## Files Modified

### Core API Integration
1. **lib/api.ts**
   - Updated endpoint URL
   - Added response wrapper handling
   - Updated TypeScript interfaces
   - Made fields optional for backwards compatibility

### API Routes
All API routes now handle the wrapped response format:
1. **app/api/business-hours/route.ts** - Already wrapped responses
2. **app/api/table-bookings/availability/route.ts** - Already handled wrapped format
3. **app/api/table-bookings/create/route.ts** - Already handled wrapped format
4. **app/api/table-bookings/[reference]/route.ts** - Updated to handle wrapped format
5. **app/api/events/route.ts** - Updated to handle wrapped format
6. **app/api/events/[id]/route.ts** - Updated to handle wrapped format
7. **app/api/events/[id]/availability/route.ts** - Updated to handle wrapped format

### Components
1. **components/StatusBar.tsx** - Fixed import paths, simplified to use API data directly
2. **components/BusinessHours.tsx** - Removed client-side fallback calculations
3. **components/KitchenHoursDisplay.tsx** - Updated to handle new kitchen format
4. **components/KitchenHoursString.tsx** - Updated to handle new kitchen format
5. **components/NextEvent.tsx** - Updated to handle wrapped response format

### Hooks
1. **hooks/useBusinessHours.ts** - Already handled wrapped format correctly
2. **hooks/useKitchenStatus.ts** - Updated to use currentStatus.kitchenOpen from API

### Time Utilities
1. **lib/time-utils.ts** - Already supported HH:mm:ss format

## Testing

Run the API integration test to verify all changes:
```bash
node scripts/test-api-integration.js
```

## Rollback Plan

If issues arise, the API integration can be rolled back by:
1. Reverting the endpoint URL in lib/api.ts line 125
2. The response wrapper handling is backwards compatible, so no changes needed
3. Components will continue to work with both old and new formats

## Notes

- All changes maintain backwards compatibility
- The response wrapper extraction in lib/api.ts handles both wrapped and unwrapped responses
- TypeScript interfaces use optional fields to support gradual migration
- Error handling has been standardized across all API routes