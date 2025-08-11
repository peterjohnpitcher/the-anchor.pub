# API Bug Report: Incorrect `isOpen` Status for Midnight Closing Times

## Executive Summary
The business hours API endpoint has a critical bug where venues with midnight closing times (00:00:00) are incorrectly shown as closed during their operating hours. This affects Friday and Saturday operations at The Anchor.

**API Endpoint:** `https://management.orangejelly.co.uk/api/business/hours`

## Bug Description

### Current Behavior (Incorrect)
When a venue closes at midnight (00:00:00), the API incorrectly calculates `isOpen: false` during operating hours.

### Expected Behavior
The API should return `isOpen: true` when the current time is between the opening and closing times, properly handling midnight as the next day.

## Reproduction Steps

1. Set venue hours to close at midnight (e.g., Friday: 16:00:00 - 00:00:00)
2. Make API request during operating hours (e.g., at 18:02 on Friday)
3. Observe that `currentStatus.isOpen` returns `false` (incorrect)

## Live Example

### API Request
```bash
GET https://management.orangejelly.co.uk/api/business/hours
X-API-Key: [YOUR_API_KEY]
```

### Current Response (at 18:02 on Friday)
```json
{
  "regularHours": {
    "friday": {
      "opens": "16:00:00",
      "closes": "00:00:00",
      "is_closed": false
    }
  },
  "currentStatus": {
    "isOpen": false,        // ❌ WRONG - should be true
    "currentTime": "18:02:48",
    "services": {
      "venue": {
        "open": false       // ❌ WRONG - should be true
      }
    }
  }
}
```

### Expected Response
```json
{
  "currentStatus": {
    "isOpen": true,         // ✅ CORRECT
    "currentTime": "18:02:48",
    "services": {
      "venue": {
        "open": true        // ✅ CORRECT
      }
    }
  }
}
```

## Technical Analysis

### Root Cause
The time comparison logic doesn't properly handle the edge case where closing time (00:00) is numerically less than opening time (16:00).

### Current Logic (Presumed)
```javascript
// This fails for midnight closing times
function isOpen(currentTime, openTime, closeTime) {
  return currentTime >= openTime && currentTime < closeTime;
}

// Example: Friday at 18:02
// 18.02 >= 16.00 && 18.02 < 0.00
// true && false = false ❌
```

### Required Logic
```javascript
function isOpen(currentTime, openTime, closeTime) {
  // Handle midnight crossing
  if (closeTime <= openTime) {
    // Venue closes after midnight
    return currentTime >= openTime || currentTime < closeTime;
  }
  // Normal hours
  return currentTime >= openTime && currentTime < closeTime;
}

// Example: Friday at 18:02
// closeTime (0.00) <= openTime (16.00) = true
// So: 18.02 >= 16.00 || 18.02 < 0.00
// true || false = true ✅
```

## Affected Days

| Day | Hours | Status |
|-----|-------|---------|
| **Friday** | 16:00 - 00:00 | ❌ Shows as closed after 16:00 |
| **Saturday** | 12:00 - 00:00 | ❌ Shows as closed after 12:00 |
| Sunday | 12:00 - 22:00 | ✅ Works correctly |
| Monday | 16:00 - 22:00 | ✅ Works correctly |
| Tuesday | 16:00 - 22:00 | ✅ Works correctly |
| Wednesday | 16:00 - 22:00 | ✅ Works correctly |
| Thursday | 16:00 - 22:00 | ✅ Works correctly |

## Business Impact

1. **Customer Confusion:** Website shows "Bar: Opens at 4pm" when the bar is actually open
2. **Lost Revenue:** Customers may not visit thinking the venue is closed
3. **Peak Hours Affected:** Friday and Saturday evenings are the busiest times
4. **Brand Reputation:** Incorrect information damages trust

## Test Cases

### Test Case 1: Friday Evening
- **Time:** Friday 20:00
- **Hours:** 16:00 - 00:00
- **Expected:** `isOpen: true`
- **Actual:** `isOpen: false` ❌

### Test Case 2: Friday After Midnight
- **Time:** Saturday 00:30
- **Hours:** Friday 16:00 - 00:00
- **Expected:** `isOpen: false`
- **Actual:** Unknown (needs testing)

### Test Case 3: Saturday Afternoon
- **Time:** Saturday 15:00
- **Hours:** 12:00 - 00:00
- **Expected:** `isOpen: true`
- **Actual:** `isOpen: false` ❌

### Test Case 4: Regular Closing (Control)
- **Time:** Tuesday 20:00
- **Hours:** 16:00 - 22:00
- **Expected:** `isOpen: true`
- **Actual:** `isOpen: true` ✅

## Recommended Fix

### Implementation
1. Update the time comparison logic to handle midnight crossing
2. Consider times after midnight as part of the previous day's session
3. Test with all edge cases listed above

### Sample Code Fix
```javascript
function calculateIsOpen(currentTime, daySchedule) {
  if (daySchedule.is_closed) {
    return false;
  }
  
  const openTime = timeToDecimal(daySchedule.opens);
  const closeTime = timeToDecimal(daySchedule.closes);
  const current = timeToDecimal(currentTime);
  
  // Handle midnight crossing
  if (closeTime <= openTime) {
    // If close time is after midnight (00:00 - 04:00)
    if (closeTime > 0 && closeTime <= 4) {
      // Check if we're in the late night portion
      if (current >= 0 && current < closeTime) {
        return true;
      }
    }
    // Check if we're in the evening portion
    return current >= openTime;
  }
  
  // Normal hours (no midnight crossing)
  return current >= openTime && current < closeTime;
}
```

## Additional Considerations

### Kitchen Hours Work Correctly
Interestingly, the kitchen status (`kitchenOpen`) works correctly even when the venue status is wrong:
- Kitchen hours: 18:00 - 21:00
- At 18:02: `kitchenOpen: true` ✅

This suggests the bug is specific to the venue open/closed calculation logic.

### Timezone Handling
- All times appear to be in local timezone (Europe/London)
- The `currentTime` field correctly shows local time
- This is not a timezone issue

## Priority
**HIGH** - This bug affects peak business hours on the two busiest days of the week.

## Contact Information
For any questions about this bug report or to discuss the implementation:
- **Reporter:** The Anchor Development Team
- **Date:** January 8, 2025
- **Affected Venue:** The Anchor, Stanwell Moor

## Verification Steps After Fix
1. Deploy the fix to staging/test environment
2. Test all scenarios in the Test Cases section
3. Verify the fix at these specific times:
   - Friday at 16:01 (just after opening)
   - Friday at 23:59 (just before midnight)
   - Saturday at 00:01 (just after midnight - should be closed)
   - Saturday at 12:01 (just after opening)
4. Confirm no regression on regular closing times (days ending at 22:00)

---

*This bug report was generated after observing the issue in production on January 8, 2025, at 18:02 GMT.*