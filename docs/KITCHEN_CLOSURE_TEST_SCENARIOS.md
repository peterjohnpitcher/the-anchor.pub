# Kitchen Closure Test Scenarios

## Overview
This document outlines all test scenarios for the kitchen closure API update implementation.

## Test Scenarios

### 1. StatusBar Component

#### Scenario A: Both Bar and Kitchen Open
- **API Response**: `"kitchen": { "opens": "12:00:00", "closes": "21:00:00" }`
- **Expected Display**: "Open • Kitchen: 12pm - 9pm" (green background)
- **Status Indicator**: Green dot

#### Scenario B: Bar Open, Kitchen Closed
- **API Response**: `"kitchen": { "is_closed": true }`
- **Expected Display**: "Bar Open • Kitchen Closed" (amber background)
- **Status Indicator**: Amber/warning dot

#### Scenario C: Bar Open, No Kitchen Service (Monday)
- **API Response**: `"kitchen": null`
- **Expected Display**: "Open • No Kitchen Service" (normal green for bar open)
- **Kitchen Display**: "No Kitchen Service"

### 2. BusinessHours Component

#### Test Each Variant:
- **Default**: Shows full hours with kitchen status
- **Condensed**: Shows compact hours with kitchen status
- **Dark**: Shows hours on dark background

#### Expected Messages:
- Kitchen open: "Kitchen: 12pm - 9pm"
- Kitchen closed: "Bar open • Kitchen closed"
- No service: "No kitchen service"

### 3. BookingDatePicker Component

#### Scenario A: Selecting Monday
- **Expected**: No time slots available
- **Message**: "No kitchen service on Mondays (bar open)"
- **Alternative**: Suggest selecting another day

#### Scenario B: Kitchen Closed Time Selected
- **Expected**: Warning message appears
- **Message**: "Kitchen not available"
- **Subtext**: "Kitchen is closed at this time but the bar is open for drinks"

#### Scenario C: Kitchen Open Time Selected
- **Expected**: Normal booking flow
- **Message**: Shows available times based on kitchen hours

### 4. API Response Verification

Test each endpoint with mock data:

```bash
# Test with kitchen open
curl -X GET http://localhost:3000/api/business-hours \
  -H "X-Test-Kitchen-Status: open"

# Test with kitchen closed
curl -X GET http://localhost:3000/api/business-hours \
  -H "X-Test-Kitchen-Status: closed"

# Test with no kitchen service
curl -X GET http://localhost:3000/api/business-hours \
  -H "X-Test-Kitchen-Status: null"
```

### 5. Edge Cases

#### Empty Kitchen Object
- **API Response**: `"kitchen": {}`
- **Expected**: Treat as no service

#### Invalid Kitchen Format
- **API Response**: `"kitchen": "closed"`
- **Expected**: Treat as no service

#### Missing Kitchen Times
- **API Response**: `"kitchen": { "opens": "12:00:00" }` (missing closes)
- **Expected**: Treat as no service

## Manual Testing Checklist

### StatusBar Component
- [ ] Green background when both open
- [ ] Amber background when bar open, kitchen closed
- [ ] Correct time calculations for "closes in X minutes"
- [ ] Mobile view shows abbreviated message
- [ ] Warning indicator for kitchen closed state

### BusinessHours Component
- [ ] All three kitchen states display correctly
- [ ] Special messaging for Monday (no kitchen service)
- [ ] Kitchen hours format correctly when open
- [ ] "Bar open • Kitchen closed" shows when appropriate
- [ ] Weather integration still works (if enabled)

### BookingDatePicker
- [ ] No slots available when kitchen closed
- [ ] Clear messaging about kitchen status
- [ ] Monday shows special message
- [ ] Time slots only show during kitchen hours
- [ ] Warning appears for unavailable times

### API Integration
- [ ] Type guards work correctly
- [ ] Status calculation is accurate
- [ ] Both API routes handle new format
- [ ] Error handling for malformed data

## Automated Test Commands

```bash
# Run type guard tests
node test-kitchen-closure.js

# Test the development server
npm run dev
# Then visit http://localhost:3000 and check each component

# Run any existing tests
npm test
```

## Visual Regression Testing

Compare screenshots of:
1. StatusBar in all three states
2. BusinessHours showing kitchen closed message
3. Booking form with kitchen closed warning
4. Mobile views of all components

## Performance Testing

Ensure no performance degradation:
- API response times remain under 200ms
- Component render times unchanged
- No additional unnecessary re-renders