# StatusBar API Investigation Report
## Current Time: Monday 21:39 (11 August 2025)

## 🔴 PROBLEM IDENTIFIED

The statusbar is showing **"Bar: Opens at 4pm"** when it should show **"Bar: Open until 10pm"**.

## ROOT CAUSE ANALYSIS

### 1. API Response (✅ CORRECT)
The external API at `management.orangejelly.co.uk` is returning the **CORRECT** data:
```json
{
  "currentStatus": {
    "isOpen": true,              // ✅ Correctly shows as open
    "kitchenOpen": false,
    "closesIn": "17 minutes",     // ✅ Correct (closes at 22:00)
    "opensIn": null,
    "currentTime": "21:43:23"
  },
  "regularHours": {
    "monday": {
      "opens": "16:00:00",        // 4pm
      "closes": "22:00:00",       // 10pm
      "kitchen": null
    }
  }
}
```

### 2. StatusBarSimple Component Bug (❌ INCORRECT LOGIC)

The bug is in `/components/StatusBarSimple.tsx` at line 59:

```typescript
// CURRENT BUGGY CODE (line 59):
Bar: {isOpen ? `Open until ${formatTime(todayHours.closes)}` : todayHours?.opens ? `Opens at ${formatTime(todayHours.opens)}` : 'Closed'}

// PROBLEM:
// When isOpen is true BUT todayHours is undefined/null, it shows the WRONG branch
```

**The Issue**: The component is checking `isOpen` from `currentStatus` (which is true), but then tries to use `todayHours.closes` which might be undefined if the day lookup fails. When `todayHours` is undefined, the expression evaluates incorrectly and falls through to show "Opens at 4pm".

### 3. Day Lookup Problem

Line 42 uses JavaScript's `toLocaleDateString` which might return a different format than expected:
```typescript
const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
const todayHours = regularHours[today]  // Could be undefined if 'today' doesn't match
```

The API returns days as lowercase (`"monday"`, `"tuesday"`, etc.), but the JS date formatting might not match exactly.

## DATA FLOW SUMMARY

```
1. External API (✅ Correct)
   ↓
2. Next.js API Route /api/business/hours (✅ Just proxies data)
   ↓
3. StatusBarSimple Component (❌ Bug in display logic)
   ↓
4. UI Shows Wrong Message
```

## QUESTIONS FOR SENIOR DEVELOPER

### 1. API Usage Confirmation
**Q:** Should we be using `currentStatus.isOpen` from the API or calculating open/closed state ourselves from `regularHours`?

**Context:** The API provides both:
- `currentStatus.isOpen: true/false` (pre-calculated by API)
- `regularHours` with times we could use to calculate ourselves

### 2. Timezone Handling
**Q:** How should we handle timezone differences? The API returns:
- Times in 24-hour format (e.g., "16:00:00")
- A `currentTime` field showing server time
- A `timestamp` in ISO format

**Current Issue:** We're using browser's local time which might differ from server time.

### 3. Fallback Strategy
**Q:** When `currentStatus` says the bar is open but we can't find the matching day in `regularHours`, what should we display?

**Options:**
a) Trust `currentStatus.isOpen` and show generic "Open" without times
b) Show an error/fallback message
c) Use `currentStatus.closesIn` (e.g., "Open - closes in 17 minutes")

### 4. Component Choice
**Q:** Why are we using `StatusBarSimple` instead of the more robust `StatusBar` component which has better error handling?

**Context:** There are two components:
- `StatusBarSimple.tsx` - Basic, single fetch, has the bug
- `StatusBar.tsx` - More features, auto-refresh, better error handling

### 5. Special Hours Handling
**Q:** How should we handle `specialHours` (like Bank Holidays)? The API returns these but StatusBarSimple ignores them.

**Example from API:**
```json
"specialHours": [
  {
    "date": "2025-08-25",
    "opens": "12:00:00",
    "closes": "22:00:00",
    "note": "August Bank Holiday Weekend!"
  }
]
```

## RECOMMENDED FIXES

### Quick Fix (Minimal Change)
Use `currentStatus` fields directly instead of trying to look up hours:

```typescript
// Instead of complex logic, use what the API tells us:
if (isOpen && currentStatus.closesIn) {
  return `Open - closes ${currentStatus.closesIn}`
} else if (!isOpen && currentStatus.opensIn) {
  return `Opens ${currentStatus.opensIn}`
} else {
  return isOpen ? 'Open' : 'Closed'
}
```

### Proper Fix (More Robust)
1. Fix the day lookup to ensure it matches API format
2. Add null checks for `todayHours`
3. Use `currentStatus` as primary source of truth
4. Add fallback messages when data is missing

## TEST SCENARIOS TO VERIFY

1. **Monday 21:39** (current) - Should show "Open until 10pm"
2. **Monday 15:00** - Should show "Opens at 4pm"
3. **Monday 22:30** - Should show "Closed"
4. **Friday 23:30** - Should show "Open until midnight"
5. **Bank Holiday** - Should respect special hours

## FILES INVOLVED

1. `/app/api/business/hours/route.ts` - API proxy (✅ working correctly)
2. `/lib/api.ts` - API client class (✅ working correctly)
3. `/components/StatusBarSimple.tsx` - Display component (❌ has the bug)
4. `/components/StatusBar.tsx` - Alternative component (might work better?)

## NEXT STEPS

1. Get answers to the questions above from senior developer
2. Implement the agreed fix approach
3. Test all scenarios
4. Consider switching to the more robust StatusBar component
5. Add unit tests to prevent regression