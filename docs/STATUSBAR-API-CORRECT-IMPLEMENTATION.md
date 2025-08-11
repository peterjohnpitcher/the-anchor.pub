# StatusBar API - CORRECT Implementation Guide
## Live-First Approach (Per Senior Developer Feedback)

---

## ⚠️ CRITICAL: What We Were Doing Wrong

### ❌ WRONG: Using timetable for "now"
We were using `regularHours[day].closes` to show current status. This is **wrong** - timetables are for planning, not live state.

### ✅ CORRECT: Trust currentStatus completely
```typescript
// ALWAYS use currentStatus for live state
const isOpen = data.currentStatus.isOpen;  // NOT calculated from hours
const closesIn = data.currentStatus.closesIn;  // NOT calculated from time
```

---

## 1. THE GOLDEN RULES

### Rule 1: currentStatus is TRUTH
- `currentStatus.isOpen` - Is the venue open RIGHT NOW?
- `currentStatus.kitchenOpen` - Is kitchen serving RIGHT NOW?
- `currentStatus.closesIn` / `opensIn` - Pre-calculated countdowns
- **NEVER** infer these from timetables

### Rule 2: Timetables are for DISPLAY ONLY
- Show scheduled hours in a "Today's hours: 16:00-22:00" line
- Never use to determine if currently open
- Special hours override regular hours for display

### Rule 3: specialHours is an ARRAY
```typescript
// WRONG - it's not a dictionary!
const special = specialHours["2025-08-25"];

// CORRECT - it's an array
const special = specialHours.find(s => s.date === "2025-08-25");
```

---

## 2. CORRECT API RESPONSE STRUCTURE

```typescript
interface APIResponse {
  currentStatus: {
    isOpen: boolean;           // Live venue state
    kitchenOpen: boolean;      // Live kitchen state
    closesIn: string | null;   // "17 minutes" (when open)
    opensIn: string | null;    // "in 2 hours" (when closed)
    timestamp: string;         // ISO timestamp for comparison
    services?: {
      venue: {
        open: boolean;
        closesIn: string | null;
      };
      kitchen: {
        open: boolean;
        closesIn: string | null;
      };
    };
  };
  regularHours: {
    [day: string]: {           // lowercase: "monday", "tuesday"
      opens: "HH:mm:ss";       // ALWAYS includes seconds
      closes: "HH:mm:ss";      // Can be "00:00:00" for midnight
      kitchen: {
        opens: "HH:mm:ss";
        closes: "HH:mm:ss";
      } | null;                // null = no kitchen service
    };
  };
  specialHours: Array<{        // ARRAY not object!
    date: "YYYY-MM-DD";
    opens: "HH:mm:ss";
    closes: "HH:mm:ss";
    status: "modified" | "closed";
    note?: string;
    kitchen?: KitchenHours | null;
  }>;
  today?: {
    isSpecialHours: boolean;   // Quick check for special hours
    // ... other fields
  };
}
```

---

## 3. CORRECT STATUS BAR LOGIC

```typescript
// THE ONLY LOGIC YOU NEED FOR STATUS DISPLAY
function getStatusBarDisplay(data: APIResponse) {
  const { currentStatus } = data;
  
  // 1. VENUE STATUS (Primary)
  let venueText: string;
  let venueColor: 'green' | 'red';
  
  if (currentStatus.isOpen) {
    venueColor = 'green';
    if (currentStatus.closesIn) {
      venueText = `Open — ${currentStatus.closesIn}`;
    } else {
      venueText = 'Open';
    }
  } else {
    venueColor = 'red';
    if (currentStatus.opensIn) {
      venueText = `Closed — opens ${currentStatus.opensIn}`;
    } else {
      venueText = 'Closed';
    }
  }
  
  // 2. KITCHEN STATUS (Only show if venue is open)
  let kitchenText: string | null = null;
  let kitchenColor: 'green' | 'amber' | 'red' | null = null;
  
  if (currentStatus.isOpen) {  // Don't show kitchen if venue closed
    if (currentStatus.kitchenOpen) {
      kitchenColor = 'green';
      const kitchenClosesIn = currentStatus.services?.kitchen?.closesIn;
      if (kitchenClosesIn) {
        kitchenText = `Kitchen open — ${kitchenClosesIn}`;
      } else {
        kitchenText = 'Kitchen open';
      }
    } else {
      kitchenColor = 'amber';
      kitchenText = 'Kitchen closed';
    }
  }
  
  // 3. SPECIAL HOURS BADGE
  const showSpecialBadge = data.today?.isSpecialHours === true ||
    data.specialHours.some(s => s.date === getTodayDateString());
  
  const specialNote = data.specialHours.find(
    s => s.date === getTodayDateString()
  )?.note;
  
  return {
    venueText,
    venueColor,
    kitchenText,
    kitchenColor,
    showSpecialBadge,
    specialNote
  };
}

// Helper: Get today's date in Europe/London timezone
function getTodayDateString(): string {
  // Using native Intl API (no libraries needed)
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(new Date()); // Returns "YYYY-MM-DD"
}
```

---

## 4. CORRECT DAY LOOKUP

```typescript
// WRONG - Using wrong locale/case
const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
const hours = regularHours[today];  // Fails!

// CORRECT - Lowercase British day names
function getTodayKey(): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const ukDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/London" })
  );
  return days[ukDate.getDay()];
}

// For display purposes only (NOT for determining open/closed)
function getTodaySchedule(data: APIResponse): DayHours | null {
  const todayDate = getTodayDateString();
  
  // Check special hours first
  const special = data.specialHours.find(s => s.date === todayDate);
  if (special) {
    return special;
  }
  
  // Fall back to regular hours
  const todayKey = getTodayKey();
  return data.regularHours[todayKey] || null;
}
```

---

## 5. CORRECT TIME FORMATTING

```typescript
// API returns "HH:mm:ss" - ALWAYS with seconds
function formatTime(timeString: string): string {
  const [hour, minute] = timeString.split(':').map(Number);
  
  // For British audience, use 24-hour format
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  
  // Or for 12-hour format:
  // const period = hour >= 12 ? 'pm' : 'am';
  // const displayHour = hour > 12 ? hour - 12 : hour || 12;
  // return minute === 0 ? `${displayHour}${period}` : `${displayHour}:${minute.toString().padStart(2, '0')}${period}`;
}

// Display scheduled hours (NOT for live status)
function formatScheduledHours(hours: DayHours): string {
  if (hours.is_closed) return 'Closed';
  return `${formatTime(hours.opens)}–${formatTime(hours.closes)}`;
}
```

---

## 6. CORRECT AUTO-REFRESH

```typescript
function useBusinessStatus() {
  const [data, setData] = useState<APIResponse | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [retryAfter, setRetryAfter] = useState<number>(0);
  
  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/business/hours');
      
      if (response.status === 429) {
        // Rate limited - respect Retry-After header
        const retryAfterHeader = response.headers.get('Retry-After');
        const delay = retryAfterHeader ? parseInt(retryAfterHeader) * 1000 : 60000;
        setRetryAfter(Date.now() + delay);
        return;
      }
      
      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setLastUpdate(new Date());
        setRetryAfter(0);
      }
    } catch (error) {
      console.error('Failed to fetch status:', error);
      // Keep showing last successful data
    }
  };
  
  useEffect(() => {
    fetchStatus(); // Initial fetch
    
    const interval = setInterval(() => {
      if (retryAfter === 0 || Date.now() > retryAfter) {
        fetchStatus();
      }
    }, 60000); // Poll every 60 seconds
    
    return () => clearInterval(interval);
  }, [retryAfter]);
  
  return { data, lastUpdate, isStale: lastUpdate && Date.now() - lastUpdate.getTime() > 120000 };
}
```

---

## 7. CORRECT ERROR HANDLING

```typescript
function StatusBar() {
  const { data, lastUpdate, isStale } = useBusinessStatus();
  
  if (!data && !lastUpdate) {
    // Never had successful fetch
    return <div>Unable to load opening hours</div>;
  }
  
  if (!data && lastUpdate) {
    // Show last known good with warning
    return (
      <div>
        <span>Opening hours temporarily unavailable</span>
        <span className="text-xs">Last updated: {formatRelativeTime(lastUpdate)}</span>
      </div>
    );
  }
  
  const status = getStatusBarDisplay(data);
  
  return (
    <div aria-live="polite">
      <div className="flex items-center gap-2">
        <span className={`indicator ${status.venueColor}`} />
        <span>{status.venueText}</span>
        {isStale && !status.venueText.includes('—') && (
          <span className="text-xs opacity-60">
            (updated {formatRelativeTime(lastUpdate)})
          </span>
        )}
      </div>
      
      {status.kitchenText && (
        <div className="flex items-center gap-2">
          <span className={`indicator ${status.kitchenColor}`} />
          <span>{status.kitchenText}</span>
        </div>
      )}
      
      {status.showSpecialBadge && (
        <div className="badge">
          Special hours today
          {status.specialNote && `: ${status.specialNote}`}
        </div>
      )}
    </div>
  );
}
```

---

## 8. COMPLETE TYPESCRIPT UTILITY

```typescript
// lib/status-bar-utils.ts
export interface StatusBarDisplay {
  stripText: string;
  stripVariant: 'open' | 'closed';
  kitchenPill: string | null;
  kitchenVariant: 'open' | 'closed' | null;
  showSpecialBadge: boolean;
  specialNote?: string;
  debugInfo?: {
    isOpen: boolean;
    kitchenOpen: boolean;
    usingFallback: boolean;
    lastUpdate: string;
  };
}

export function getStatusBarDisplay(
  data: APIResponse | null,
  options: { debug?: boolean } = {}
): StatusBarDisplay {
  // Fallback for no data
  if (!data) {
    return {
      stripText: 'Opening hours unavailable',
      stripVariant: 'closed',
      kitchenPill: null,
      kitchenVariant: null,
      showSpecialBadge: false
    };
  }
  
  const { currentStatus, specialHours, today } = data;
  
  // Venue status (primary)
  let stripText: string;
  let stripVariant: 'open' | 'closed';
  
  if (currentStatus.isOpen) {
    stripVariant = 'open';
    stripText = currentStatus.closesIn 
      ? `Open — ${currentStatus.closesIn}`
      : 'Open';
  } else {
    stripVariant = 'closed';
    stripText = currentStatus.opensIn
      ? `Closed — opens ${currentStatus.opensIn}`
      : 'Closed';
  }
  
  // Kitchen status (only if venue open)
  let kitchenPill: string | null = null;
  let kitchenVariant: 'open' | 'closed' | null = null;
  
  if (currentStatus.isOpen) {
    if (currentStatus.kitchenOpen) {
      kitchenVariant = 'open';
      const kitchenClosesIn = currentStatus.services?.kitchen?.closesIn;
      kitchenPill = kitchenClosesIn 
        ? `Kitchen open — ${kitchenClosesIn}`
        : 'Kitchen open';
    } else {
      kitchenVariant = 'closed';
      kitchenPill = 'Kitchen closed';
    }
  }
  
  // Special hours detection
  const todayDate = getTodayDateString();
  const todaySpecial = specialHours?.find(s => s.date === todayDate);
  const showSpecialBadge = today?.isSpecialHours === true || !!todaySpecial;
  
  const result: StatusBarDisplay = {
    stripText,
    stripVariant,
    kitchenPill,
    kitchenVariant,
    showSpecialBadge,
    specialNote: todaySpecial?.note
  };
  
  if (options.debug) {
    result.debugInfo = {
      isOpen: currentStatus.isOpen,
      kitchenOpen: currentStatus.kitchenOpen,
      usingFallback: false,
      lastUpdate: currentStatus.timestamp || new Date().toISOString()
    };
  }
  
  return result;
}

function getTodayDateString(): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(new Date());
}
```

---

## 9. UNIT TESTS TO ADD

```typescript
describe('StatusBar Display Logic', () => {
  it('shows special hours badge when today is special', () => {
    const data = mockData({ isSpecialHours: true });
    const result = getStatusBarDisplay(data);
    expect(result.showSpecialBadge).toBe(true);
  });
  
  it('hides kitchen pill when venue is closed', () => {
    const data = mockData({ isOpen: false, kitchenOpen: false });
    const result = getStatusBarDisplay(data);
    expect(result.kitchenPill).toBeNull();
  });
  
  it('shows countdown when available', () => {
    const data = mockData({ isOpen: true, closesIn: '45 minutes' });
    const result = getStatusBarDisplay(data);
    expect(result.stripText).toBe('Open — 45 minutes');
  });
  
  it('handles midnight closing correctly', () => {
    const data = mockData({ 
      isOpen: true, 
      closesIn: '15 minutes',
      closes: '00:00:00' 
    });
    const result = getStatusBarDisplay(data);
    expect(result.stripText).toBe('Open — 15 minutes');
  });
  
  it('shows stale warning after 2 minutes', () => {
    const twoMinutesAgo = new Date(Date.now() - 125000);
    const { isStale } = useBusinessStatus();
    expect(isStale).toBe(true);
  });
  
  it('handles specialHours as array not object', () => {
    const data = {
      specialHours: [
        { date: '2025-08-25', opens: '12:00:00', closes: '22:00:00' }
      ]
    };
    const special = data.specialHours.find(s => s.date === '2025-08-25');
    expect(special).toBeDefined();
  });
});
```

---

## 10. MIGRATION CHECKLIST

### Immediate Fixes (Do Now)
- [ ] Stop using `regularHours` to determine current state
- [ ] Fix specialHours array handling (not object)
- [ ] Use `currentStatus.isOpen` as single source of truth
- [ ] Hide kitchen status when venue is closed
- [ ] Fix day key lookup (lowercase, Europe/London timezone)

### Quick Wins (This Week)
- [ ] Add 60-second auto-refresh
- [ ] Show "Last updated" when stale
- [ ] Add special hours badge
- [ ] Handle 429 rate limiting properly
- [ ] Use `currentStatus.closesIn/opensIn` for countdowns

### Future Improvements
- [ ] Add WebSocket support for real-time updates
- [ ] Cache last good response in localStorage
- [ ] Add analytics for API failures
- [ ] Implement progressive enhancement for offline

---

## THE GOLDEN RULE (AGAIN)

**currentStatus is TRUTH. Timetables are for DISPLAY.**

Never calculate "is open now" from hours. Always trust the API's live state.