# API Bug Report: Opening Hours Status Calculation

## Issue Summary
The API endpoint `https://management.orangejelly.co.uk/api/business/hours` is incorrectly calculating the venue's open/closed status, resulting in misleading information being displayed to customers.

## Bug Details

### Current Behavior (INCORRECT)
When tested at **Saturday, 14:36 UK time**, the API returned:
```json
{
  "currentStatus": {
    "isOpen": false,           // ❌ WRONG - Should be true
    "kitchenOpen": true,        // ✅ Correct
    "services": {
      "venue": {
        "open": false,          // ❌ WRONG - Should be true
        "closesIn": null
      },
      "kitchen": {
        "open": true,           // ✅ Correct
        "closesIn": "4 hours 24 minutes"
      }
    }
  }
}
```

### Expected Behavior (CORRECT)
At **Saturday, 14:36**, based on the regular hours:
- **Bar**: Opens at 12:00, closes at 00:00 (midnight)
- **Kitchen**: Opens at 13:00, closes at 19:00

The API should return:
```json
{
  "currentStatus": {
    "isOpen": true,             // Bar is open from 12:00-00:00
    "kitchenOpen": true,        // Kitchen is open from 13:00-19:00
    "services": {
      "venue": {
        "open": true,           // Bar is currently open
        "closesIn": "9 hours 24 minutes"  // Closes at midnight
      },
      "kitchen": {
        "open": true,           // Kitchen is currently open
        "closesIn": "4 hours 24 minutes"  // Closes at 19:00
      }
    }
  }
}
```

## Impact on Frontend

This API bug causes the status bars throughout the website to display incorrect information:

### What Users See (WRONG):
- **Bar**: "Opens at 12pm" (when it's already open)
- **Kitchen**: "Opens at 1pm" (when it's already open)

### What Users Should See (CORRECT):
- **Bar**: "Open until 12am"
- **Kitchen**: "Open until 7pm"

## Test Evidence

### Test Performed
```bash
# Time: Saturday, 09/08/2025, 14:36:02 UK time
curl -H "X-Authorization: [API_KEY]" \
  https://management.orangejelly.co.uk/api/business/hours
```

### Full API Response
The API correctly returns the regular hours but incorrectly calculates the current status:

```json
{
  "regularHours": {
    "saturday": {
      "opens": "12:00:00",      // ✅ Correct data
      "closes": "00:00:00",      // ✅ Correct data
      "kitchen": {
        "opens": "13:00:00",     // ✅ Correct data
        "closes": "19:00:00"     // ✅ Correct data
      }
    }
  },
  "currentStatus": {
    "isOpen": false,             // ❌ BUG HERE
    "currentTime": "14:36:03",   // ✅ Time is correct
    "timestamp": "2025-08-09T14:36:03.317Z"
  }
}
```

## Confirmed Occurrences

1. **Friday Evening** (Issue #40 - Original Report)
   - Time: 18:04 (6:04 PM)
   - Bar hours: 16:00-00:00
   - Bug: Showed "Opens at 4pm" instead of "Open until 12am"

2. **Saturday Afternoon** (This Report)
   - Time: 14:36 (2:36 PM)
   - Bar hours: 12:00-00:00
   - Kitchen hours: 13:00-19:00
   - Bug: Shows opening times instead of closing times for both

## Root Cause Analysis

The issue appears to be in the API's time comparison logic. Possible causes:

1. **Midnight Handling**: When closing time is "00:00:00" (midnight), the API might be incorrectly comparing times
2. **Time Zone Issues**: Although the API reports the correct current time, the comparison logic might have timezone issues
3. **Date Boundary**: The logic might not correctly handle venues that close after midnight

## Frontend Workaround (NOT RECOMMENDED)

While the API is being fixed, the frontend could potentially:
1. Ignore the `currentStatus.isOpen` field
2. Calculate the open/closed status locally using `regularHours` data
3. However, this would duplicate business logic and could lead to inconsistencies

## Recommended Fix

The API should:
1. Fix the time comparison logic for venues closing at/after midnight
2. Ensure Saturday 14:36 correctly identifies as being between 12:00 and 00:00
3. Add comprehensive tests for edge cases:
   - Venues closing at midnight (00:00)
   - Venues closing after midnight (01:00, 02:00)
   - Current time near opening/closing boundaries
   - All days of the week

## Priority
**HIGH** - This directly impacts customer experience by showing incorrect opening information, potentially losing business if customers think the venue is closed when it's actually open.

## Contact
Please fix this issue as soon as possible. The bug is consistently reproducible and affects multiple days of the week.