# StatusBar API Integration Guide
## For Senior Developer Review

---

## 1. CURRENT ARCHITECTURE

### 1.1 API Endpoint
**External API:** `https://management.orangejelly.co.uk/api/business/hours`  
**Authentication:** X-API-Key header  
**Environment Variable:** `ANCHOR_API_KEY`

### 1.2 Data Flow
```
External API (OrangeJelly)
    ↓ [HTTPS + API Key]
Next.js API Route (/api/business/hours/route.ts)
    ↓ [Internal fetch]
> **Update 2025:** `StatusBarSimple` has been removed. Use the unified `StatusBar` component for all implementations.

React Component (historical reference)
    ↓ [State management]
UI Display (Navigation header)
```

### 1.3 Caching Strategy
- **Server-side:** 60-second cache via Next.js `Cache-Control` headers
- **Client-side:** No caching (fetches on component mount only)
- **No automatic refresh** in the (now-removed) StatusBarSimple component

---

## 2. API RESPONSE STRUCTURE

### 2.1 Sample Response (Monday 21:43)
```json
{
  "regularHours": {
    "monday": {
      "opens": "16:00:00",      // 4pm
      "closes": "22:00:00",     // 10pm
      "kitchen": null,          // No kitchen service Mondays
      "is_closed": false
    },
    // ... other days
  },
  "currentStatus": {
    "isOpen": true,             // Pre-calculated by API
    "kitchenOpen": false,
    "closesIn": "17 minutes",   // Human-readable time until close
    "opensIn": null,            // Only set when closed
    "currentTime": "21:43:23",  // Server's current time
    "timestamp": "2025-08-11T21:43:23.689Z"
  },
  "specialHours": [
    {
      "date": "2025-08-25",
      "opens": "12:00:00",
      "closes": "22:00:00",
      "status": "modified",
      "note": "August Bank Holiday Weekend!"
    }
  ]
}
```

### 2.2 Key Fields for StatusBar

| Field | Type | Purpose | Always Present |
|-------|------|---------|----------------|
| `currentStatus.isOpen` | boolean | Is venue currently open | Yes |
| `currentStatus.kitchenOpen` | boolean | Is kitchen currently open | Yes |
| `currentStatus.closesIn` | string/null | Time until closing (e.g., "17 minutes") | When open |
| `currentStatus.opensIn` | string/null | Time until opening (e.g., "in 2 hours") | When closed |
| `regularHours.[day]` | object | Standard hours for each day | Yes |
| `specialHours` | array | Holiday/special event hours | Yes (can be empty) |

---

## 3. CURRENT IMPLEMENTATION ISSUES

### 3.1 The Bug
**Location:** `/components/StatusBarSimple.tsx` line 59

**Current Code:**
```typescript
Bar: {isOpen ? `Open until ${formatTime(todayHours.closes)}` : todayHours?.opens ? `Opens at ${formatTime(todayHours.opens)}` : 'Closed'}
```

**Problem:** When `isOpen` is true but `todayHours` is undefined, it shows the wrong message.

### 3.2 Root Causes
1. **Day name mismatch:** Component uses `toLocaleDateString('en-US')` which may not match API's lowercase day names
2. **No null checking:** Assumes `todayHours` exists when `isOpen` is true
3. **Ignores API's calculated fields:** Doesn't use `closesIn`/`opensIn` from API

---

## 4. RECOMMENDED API USAGE PATTERN

### 4.1 Option A: Trust API's Calculations (Recommended)
```typescript
// Use currentStatus as single source of truth
const getStatusMessage = () => {
  if (currentStatus.isOpen) {
    if (currentStatus.closesIn) {
      return `Open - ${currentStatus.closesIn}`;
    }
    return 'Open';
  } else {
    if (currentStatus.opensIn) {
      return `Closed - opens ${currentStatus.opensIn}`;
    }
    return 'Closed';
  }
};
```

**Pros:**
- Simple and reliable
- No client-side time calculations
- Handles edge cases (midnight closing, timezone issues)

**Cons:**
- Less control over message format
- Dependent on API's string formatting

### 4.2 Option B: Hybrid Approach
```typescript
// Use currentStatus.isOpen but format our own times
const getStatusMessage = () => {
  // Trust API for open/closed state
  if (currentStatus.isOpen) {
    // But use regularHours for specific times
    const todayHours = getTodayHours(); // Fixed lookup function
    if (todayHours) {
      return `Open until ${formatTime(todayHours.closes)}`;
    }
    // Fallback to API's message
    return currentStatus.closesIn ? `Open - ${currentStatus.closesIn}` : 'Open';
  }
  // Similar for closed state
};
```

**Pros:**
- Consistent time formatting
- Fallback when data missing

**Cons:**
- More complex
- Potential for client/server time mismatch

---

## 5. CRITICAL QUESTIONS FOR DECISION

### 5.1 Time Source Authority
**Q: Should we trust the API's time calculations or calculate locally?**

API provides:
- `currentStatus.isOpen` (boolean)
- `currentStatus.closesIn` ("17 minutes")
- `currentStatus.currentTime` ("21:43:23")

Options:
1. ✅ Trust API completely (recommended)
2. ⚠️ Verify against client time (complexity)
3. ❌ Calculate everything client-side (timezone issues)

### 5.2 Special Hours Handling
**Q: How should special hours override regular hours?**

Current: StatusBarSimple ignores `specialHours` array entirely.

Should we:
1. Check if today matches any `specialHours.date`?
2. Let API handle it (it already includes special hours in `currentStatus`)?
3. Display a notice when special hours are active?

### 5.3 Kitchen Status Display
**Q: How to handle Monday's null kitchen hours?**

Current data: `"monday": { "kitchen": null }`

Display options:
1. "Kitchen: Closed today" (current)
2. "Kitchen: No service Mondays"
3. "No food service today"
4. Hide kitchen status on Mondays

### 5.4 Error Handling
**Q: What to show when API fails?**

Options:
1. Static fallback hours from constants
2. "Unable to load hours" message
3. Hide status bar completely
4. Show last known good state (requires caching)

### 5.5 Update Frequency
**Q: How often should status update?**

Current: StatusBarSimple fetches once on mount (no refresh).

Options:
1. Keep single fetch (simple, may show stale data)
2. Refresh every 5 minutes (like StatusBar component)
3. Refresh when `closesIn`/`opensIn` would change
4. WebSocket for real-time updates

---

## 6. PROPOSED IMPLEMENTATION

### 6.1 Immediate Fix (Minimal Changes)
```typescript
// Fix the display logic bug
const getBarStatus = () => {
  // Trust API's isOpen flag
  if (!currentStatus) return 'Loading...';
  
  if (currentStatus.isOpen) {
    // Try to get closing time
    if (todayHours?.closes) {
      return `Open until ${formatTime(todayHours.closes)}`;
    }
    // Fallback to API's message
    if (currentStatus.closesIn) {
      return `Open - closes ${currentStatus.closesIn}`;
    }
    return 'Open';
  } else {
    // Similar for closed state
    if (todayHours?.opens) {
      return `Opens at ${formatTime(todayHours.opens)}`;
    }
    if (currentStatus.opensIn) {
      return `Closed - ${currentStatus.opensIn}`;
    }
    return 'Closed';
  }
};
```

### 6.2 Robust Solution (Recommended)
```typescript
interface BusinessHoursAPI {
  currentStatus: {
    isOpen: boolean;
    kitchenOpen: boolean;
    closesIn: string | null;
    opensIn: string | null;
  };
  regularHours: Record<string, DayHours>;
  specialHours: SpecialHours[];
}

const useBusinessStatus = () => {
  const [data, setData] = useState<BusinessHoursAPI | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch with proper error handling
  useEffect(() => {
    fetchBusinessHours()
      .then(setData)
      .catch(setError);
  }, []);
  
  // Compute display values
  const barStatus = useMemo(() => {
    if (!data) return { text: 'Loading...', color: 'gray' };
    if (error) return { text: 'Hours unavailable', color: 'gray' };
    
    const { currentStatus } = data;
    
    // Use API's pre-calculated status
    if (currentStatus.isOpen) {
      const text = currentStatus.closesIn 
        ? `Open until ${extractTime(currentStatus.closesIn)}`
        : 'Open';
      return { text, color: 'green' };
    } else {
      const text = currentStatus.opensIn
        ? `Opens ${extractTime(currentStatus.opensIn)}`
        : 'Closed';
      return { text, color: 'red' };
    }
  }, [data, error]);
  
  return { barStatus, kitchenStatus, isLoading: !data && !error };
};
```

---

## 7. TESTING REQUIREMENTS

### 7.1 Test Scenarios
| Time | Day | Expected Bar Display | Expected Kitchen Display |
|------|-----|---------------------|------------------------|
| Mon 15:00 | Monday | "Opens at 4pm" | "Closed today" |
| Mon 16:01 | Monday | "Open until 10pm" | "Closed today" |
| Mon 21:45 | Monday | "Open until 10pm" | "Closed today" |
| Mon 22:01 | Monday | "Closed" | "Closed today" |
| Fri 23:30 | Friday | "Open until midnight" | "Closed" |
| Sat 00:30 | Saturday | "Closed - Opens at noon" | "Opens at 1pm" |

### 7.2 Edge Cases to Handle
1. **Midnight closing** (Friday/Saturday close at "00:00:00")
2. **Bank holidays** (check specialHours array)
3. **API timeout/failure** (network issues)
4. **Clock skew** (client time vs server time)
5. **Timezone changes** (BST vs GMT)

---

## 8. MIGRATION PATH

### Phase 1: Fix Current Bug (1 day)
- Fix day lookup in StatusBarSimple
- Add null checks for todayHours
- Deploy and monitor

### Phase 2: Improve Reliability (3 days)
- Switch to using currentStatus fields
- Add proper error handling
- Implement fallback messages

### Phase 3: Enhancement (1 week)
- Consider switching to StatusBar component
- Add special hours support
- Implement auto-refresh
- Add unit tests

---

## 9. DEPENDENCIES & CONSTRAINTS

### Technical Dependencies
- Next.js 14.2.3 (App Router)
- React 18
- TypeScript with strict mode
- External API must remain source of truth

### Business Constraints
- Must show accurate real-time status
- Kitchen closed Mondays (business rule)
- Special hours for holidays
- No breakfast service (don't imply morning hours)

### Performance Requirements
- Status should load within 1 second
- Minimize API calls (use caching)
- Handle offline gracefully

---

## 10. SECURITY CONSIDERATIONS

### API Key Protection
- ✅ Key stored in environment variable
- ✅ Never exposed to client
- ✅ Proxied through Next.js API route

### Rate Limiting
- Current: No client-side rate limiting
- API may return 429 errors
- Consider implementing exponential backoff

---

## APPENDIX A: Component Comparison

| Feature | StatusBarSimple | StatusBar |
|---------|----------------|-----------|
| Auto-refresh | ❌ No | ✅ Every 5 min |
| Error handling | Basic | Comprehensive |
| Loading states | ✅ Yes | ✅ Yes |
| Variants | 2 | 3+ |
| Special hours | ❌ No | ❌ No |
| Code complexity | Simple | Moderate |
| Current usage | Main layout | Some pages |

---

## APPENDIX B: API Field Mapping

| UI Display | API Field | Fallback |
|------------|-----------|----------|
| "Open until 10pm" | `regularHours[day].closes` | `currentStatus.closesIn` |
| "Opens at 4pm" | `regularHours[day].opens` | `currentStatus.opensIn` |
| Green/Red indicator | `currentStatus.isOpen` | Calculate from hours |
| Kitchen status | `currentStatus.kitchenOpen` | Check `regularHours[day].kitchen` |

---

## RECOMMENDATIONS SUMMARY

1. **Immediate:** Fix the bug in StatusBarSimple line 59
2. **Short-term:** Use `currentStatus` fields from API as primary source
3. **Medium-term:** Add proper error handling and special hours support
4. **Long-term:** Consider unified state management for all status displays

---

**Document prepared for senior developer review**  
**Date:** 11 August 2025  
**Current Issue:** Bar showing "Opens at 4pm" when actually open until 10pm
