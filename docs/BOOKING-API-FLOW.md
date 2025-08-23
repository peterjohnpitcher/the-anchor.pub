# Complete Book-Table API Flow Documentation

## Overview
This document traces every API call made during the table booking process, from initial page load through booking confirmation.

## 1. Initial Page Load (`/book-table`)

### File: `/app/book-table/page.tsx`
**Server-side data fetching:**

```typescript
// Line 22: Pre-load availability data on server
const availabilityData = await getAvailabilityForNext30Days()
```

This calls → `/lib/booking-helpers.ts:getAvailabilityForNext30Days()`

### API Call #1: Business Hours
**Endpoint:** `GET /api/business/hours`  
**Internal Route:** `/app/api/business/hours/route.ts`  
**External API:** `https://management.orangejelly.co.uk/api/business/hours`

**Request:**
```typescript
// booking-helpers.ts:40-47
const businessHoursResponse = await fetch(
  `${process.env.ANCHOR_API_KEY ? 'https://management.orangejelly.co.uk/api' : 'http://localhost:3000/api'}/business/hours`,
  {
    headers: {
      'X-API-Key': process.env.ANCHOR_API_KEY || ''
    }
  }
)
```

**Response Structure:**
```json
{
  "regularHours": {
    "monday": {
      "opens": "16:00:00",
      "closes": "22:00:00",
      "kitchen": null,
      "is_closed": false,
      "is_kitchen_closed": false
    },
    "tuesday": {
      "opens": "16:00:00",
      "closes": "22:00:00",
      "kitchen": {
        "opens": "18:00:00",
        "closes": "21:00:00"
      },
      "is_closed": false,
      "is_kitchen_closed": false
    }
    // ... other days
  },
  "specialHours": [
    {
      "date": "2025-01-01",
      "opens": "12:00:00",
      "closes": "18:00:00",
      "is_closed": false,
      "status": "modified",
      "reason": "New Year's Day",
      "kitchen": null,
      "is_kitchen_closed": true
    }
  ],
  "currentStatus": {
    "isOpen": true,
    "kitchenOpen": false,
    "closesIn": "2 hours",
    "opensIn": null
  }
}
```

**Processing Logic (`booking-helpers.ts:54-131`):**
```typescript
for (const dateStr of dates) {
  const date = new Date(dateStr + 'T12:00:00')
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const dayHours = businessHours.regularHours[dayOfWeek]
  
  // Line 61: Check if venue is closed
  const isClosed = !dayHours || dayHours.is_closed
  
  // Line 65: Check if kitchen is closed (CURRENT LOGIC)
  const isKitchenClosed = dayHours?.is_kitchen_closed === true
  
  // Lines 81-104: Generate time slots
  if (!isClosed && dayHours.opens && dayHours.closes) {
    // Generate 30-minute slots
    // Mark slots as available/unavailable based on kitchen hours
    
    // Line 95-96: If kitchen is explicitly closed
    if (isKitchenClosed) {
      available = false  // No food bookings possible
    } else if (dayHours.kitchen && typeof dayHours.kitchen === 'object' && 
              'opens' in dayHours.kitchen && 'closes' in dayHours.kitchen) {
      // Lines 99-102: Check if time is within kitchen hours
      const kitchenOpen = parseTime(dayHours.kitchen.opens)
      const kitchenClose = parseTime(dayHours.kitchen.closes)
      available = currentTime >= kitchenOpen && currentTime < kitchenClose
    }
    // If no kitchen hours specified but not closed, assume follows venue hours
  }
  
  // Line 124-130: Build day data
  days.push({
    date: dateStr,
    isClosed,
    isKitchenClosed,
    times,
    specialNote
  })
}
```

**Output to Component:**
```typescript
{
  days: [
    {
      date: "2025-01-27",
      isClosed: false,
      isKitchenClosed: false,  // Based on is_kitchen_closed flag
      times: [
        { time: "16:00", available: true, busy: false, remaining: 10 },
        { time: "16:30", available: true, busy: false, remaining: 10 },
        // ...
      ],
      specialNote: undefined
    },
    // ... 30 days of data
  ],
  blockedDates: ["2025-02-01"],  // Days where venue is closed
  sundayRoastDates: ["2025-02-02", "2025-02-09"]  // Sundays with kitchen open
}
```

## 2. Calendar Display (`WizardStep1Date.tsx`)

**Data Processing (Lines 30-51):**
```typescript
const dayData = availabilityData.days.find(d => d.date === dateStr)
const isBlocked = availabilityData.blockedDates.includes(dateStr)

// Line 36-38: Separate venue vs kitchen closure
const venueClosed = isBlocked || dayData?.isClosed
const kitchenClosed = dayData?.isKitchenClosed
const drinksOnly = !venueClosed && kitchenClosed  // Blue days

// Visual states:
// - Gray (blocked): venueClosed = true
// - Blue (drinks only): drinksOnly = true  
// - White (available): Both false
```

## 3. User Selects Date & Time

### API Call #2: Check Availability
**When:** User reaches Step 4 (Time Selection)  
**File:** `/components/features/BookingWizard/WizardStep4Time.tsx`

```typescript
// Line 29-51: fetchAvailability function
const response = await fetch(
  `/api/table-bookings/availability?${params.toString()}`
)
```

**Endpoint:** `GET /api/table-bookings/availability`  
**Internal Route:** `/app/api/table-bookings/availability/route.ts`

**Query Parameters:**
```
?date=2025-01-27
&party_size=2
&duration=90
&booking_type=regular
```

**Processing (availability/route.ts:46-72):**
```typescript
// Check if kitchen is closed for the selected date
const businessHours = await anchorAPI.getBusinessHours()
const selectedDate = new Date(date)
const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
const dayHours = businessHours.regularHours[dayOfWeek]

// Check for special closures
const specialDay = businessHours.specialHours?.find(
  sh => sh.date === date
)

const isKitchenClosed = specialDay 
  ? specialDay.is_closed || !specialDay.kitchen || specialDay.is_kitchen_closed
  : !dayHours?.kitchen || dayHours?.is_kitchen_closed

if (isKitchenClosed) {
  return NextResponse.json({
    success: false,
    available: false,
    reason: 'kitchen_closed',
    message: dayOfWeek === 'monday' 
      ? 'Our kitchen is closed on Mondays. The pub is open for drinks - please call 01753 682707 to book a table for drinks only.'
      : 'Kitchen is closed on this date'
  })
}
```

**External API Call:**
```typescript
// Line 77-83
const response = await anchorAPI.checkTableAvailability({
  date,
  party_size: parseInt(party_size),
  time: time || undefined,
  duration: parseInt(duration),
  booking_type: booking_type as 'regular' | 'sunday_roast' | undefined
})
```

## 4. User Submits Booking

### API Call #3: Create Booking
**When:** User completes all steps and clicks confirm  
**File:** `/components/features/BookingWizard/WizardStep6Confirm.tsx`

```typescript
// Line 65-71: handleConfirm function
const response = await fetch('/api/booking/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

**Endpoint:** `POST /api/booking/submit`  
**Internal Route:** `/app/api/booking/submit/route.ts`

**Request Body:**
```json
{
  "date": "2025-01-27",
  "time": "19:00",
  "party_size": 2,
  "booking_type": "regular",
  "first_name": "John",
  "last_name": "Smith",
  "phone": "07700900000",
  "email": "john@example.com",
  "special_requirements": "Window seat please",
  "dietary_requirements": ["vegetarian"],
  "marketing_opt_in": true
}
```

**Processing (submit/route.ts:74-88):**
```typescript
// Direct Monday check (should use API flag instead?)
const bookingDate = new Date(date)
const isMonday = bookingDate.getDay() === 1

if (isMonday) {
  return NextResponse.json({
    success: false,
    error: {
      code: 'KITCHEN_CLOSED_MONDAY',
      message: 'Kitchen closed on Mondays. Please call 01753 682707 for drinks-only bookings.'
    }
  }, { status: 400 })
}
```

**External API Call (Line 141-162):**
```typescript
const apiResponse = await fetch(
  `${API_BASE_URL}/table-bookings`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.ANCHOR_API_KEY!,
      'X-Idempotency-Key': idempotencyKey
    },
    body: JSON.stringify({
      date,
      time,
      party_size,
      duration,
      customer: {
        first_name,
        last_name,
        phone,
        email
      },
      special_requirements,
      dietary_requirements,
      occasion,
      booking_type,
      marketing_opt_in,
      source: 'website'
    })
  }
)
```

## 5. Alternative Booking Endpoints

### Alternative Create Booking
**Endpoint:** `POST /api/table-bookings/create`  
**File:** `/app/api/table-bookings/create/route.ts`

**Kitchen Check (Lines 77-88):**
```typescript
// More sophisticated check using business hours
const businessHours = await anchorAPI.getBusinessHours()
const dayOfWeek = bookingDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
const dayHours = businessHours.regularHours[dayOfWeek]

const isKitchenClosed = !dayHours?.kitchen || 
  dayHours.kitchen === null ||
  ('is_closed' in dayHours.kitchen && dayHours.kitchen.is_closed)

if (isKitchenClosed && dayOfWeek === 'monday') {
  return NextResponse.json({
    success: false,
    error: 'Kitchen closed on Mondays. Call 01753 682707 for drinks-only bookings.'
  })
}
```

## Key Issues Identified

### 1. Inconsistent Kitchen Closed Logic
Different endpoints check kitchen status differently:

- **booking-helpers.ts:** `is_kitchen_closed === true`
- **availability/route.ts:** `!dayHours?.kitchen || dayHours?.is_kitchen_closed`  
- **create/route.ts:** `!dayHours?.kitchen || dayHours.kitchen === null || dayHours.kitchen.is_closed`
- **submit/route.ts:** Hardcoded Monday check `bookingDate.getDay() === 1`

### 2. Monday Handling Inconsistency
- Some endpoints have special Monday logic
- Others rely on API data
- No consistent approach

### 3. Data Flow Issues
- Calendar shows Monday based on `is_kitchen_closed` flag
- But booking submission has hardcoded Monday rejection
- User can select Monday in calendar but booking will fail

## Recommended Fixes

### 1. Standardize Kitchen Status Check
Create a single utility function:
```typescript
function isKitchenClosed(dayHours: DayHours, specialHours?: SpecialHours): boolean {
  // Use consistent logic across all endpoints
  return dayHours?.is_kitchen_closed === true || 
         (!dayHours?.kitchen && dayHours?.is_kitchen_explicitly_open !== true)
}
```

### 2. Remove Hardcoded Day Checks
Replace all `getDay() === 1` checks with API-driven logic

### 3. Align Visual States with API Logic
Ensure calendar display matches what the booking API will accept

### 4. Add Clear API Documentation
Document exactly what each field means:
- When is `kitchen: null` vs `is_kitchen_closed: true`?
- What's the source of truth for kitchen availability?
- How should special hours override regular hours?

## Testing Checklist

- [ ] Monday shows correct state in calendar based on API
- [ ] Selected Monday dates can be booked if kitchen is open
- [ ] Drinks-only days show blue with appropriate message
- [ ] Special hours override regular hours correctly
- [ ] Time slots align with kitchen hours
- [ ] Booking submission respects same rules as calendar display