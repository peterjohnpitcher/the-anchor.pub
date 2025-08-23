# 🔴 CRITICAL: Sunday Lunch Payment Issue - Action Plan

## Executive Summary
**The problem is NOT in our code.** The external API at `management.orangejelly.co.uk` is not returning payment requirements for Sunday lunch bookings as documented.

## Current Situation

### ✅ What Our Code Does Correctly:
1. Detects Sunday bookings and shows menu selection
2. Collects menu choices with correct structure
3. Sends `booking_type: "sunday_lunch"` to API
4. Includes `menu_selections` array with guest names, items, and prices
5. Checks for `payment_required` flag in response
6. Ready to redirect to PayPal if payment URL provided

### ❌ What the API is Doing Wrong:
1. Returns `status: "confirmed"` instead of `"pending_payment"`
2. Does NOT include `payment_required: true`
3. Does NOT include `payment_details` with PayPal URL
4. Treats Sunday lunch bookings like regular bookings

## Immediate Actions

### 1. Run Diagnostic Test (5 minutes)
```bash
npx tsx test-sunday-lunch-api.ts
```
This will make a real API call and show exactly what the API returns.

### 2. Manual Test with Full Logging (10 minutes)
1. Start dev server: `npm run dev`
2. Open browser console (F12)
3. Make a Sunday lunch booking
4. Copy all logs starting with "🔍"
5. Save the output to share with API provider

### 3. Contact API Provider
Send them:
- The expected vs actual API responses
- Screenshot of console logs
- Link to their API documentation showing payment flow
- The test script output

## Three Resolution Options

### Option A: Fix API Backend (Best)
**Who needs to act:** OrangeJelly (API provider)
**What they need to do:**
1. Configure Sunday lunch bookings to require payment
2. Set up PayPal integration for deposit collection
3. Return proper `payment_required` and `payment_details` fields

### Option B: Workaround - Force Payment (Quick Fix)
**We can implement this NOW if needed:**
```javascript
// In /app/api/booking/submit/route.ts
if (bookingType === 'sunday_lunch' && !booking.payment_required) {
  // Force payment redirect
  const depositAmount = bookingData.partySize * 5
  return NextResponse.json({
    success: true,
    reference: booking.booking_reference,
    payment_required: true,
    payment_details: {
      deposit_amount: depositAmount,
      payment_url: `https://management.orangejelly.co.uk/bookings/${booking.booking_reference}/payment`,
      expires_at: new Date(Date.now() + 3600000).toISOString()
    }
  })
}
```
**Risk:** This assumes the payment URL format, which might not work.

### Option C: Disable Pre-Payment (Temporary)
**Remove payment requirement until API is fixed:**
1. Keep menu selection for kitchen planning
2. Collect deposit at the venue
3. Add clear messaging about deposit policy

## Evidence for API Provider

### What We Send:
```json
{
  "booking_type": "sunday_lunch",
  "menu_selections": [/* array of selections */],
  "date": "2025-01-12",
  "time": "13:00",
  "party_size": 2
}
```

### What Their Docs Say We Get:
```json
{
  "status": "pending_payment",
  "payment_required": true,
  "payment_details": {
    "payment_url": "https://paypal.com/..."
  }
}
```

### What We Actually Get:
```json
{
  "status": "confirmed",
  "payment_required": undefined,
  "payment_details": undefined
}
```

## Files with Diagnostic Logging

1. `/lib/api.ts` - Line 735-741 (logs raw API response)
2. `/app/api/booking/submit/route.ts` - Lines 94-96, 124-137 (logs request/response)

## Next Step Decision Tree

```
Can you contact API provider?
├─ YES → Send them this evidence, wait for fix
│   └─ They fix it? → Problem solved! 
│       └─ They won't? → Implement Option B workaround
└─ NO → Do you have API backend access?
    ├─ YES → Fix the API configuration yourself
    └─ NO → Implement Option B or C workaround
```

## To Remove After Resolution

Once fixed, remove diagnostic logging from:
- `/lib/api.ts` (lines 736-740)
- `/app/api/booking/submit/route.ts` (lines 94-96, 124-129, 133-137)
- Delete test files:
  - `/test-sunday-lunch-api.ts`
  - `/SUNDAY_LUNCH_PAYMENT_DIAGNOSTICS.md`
  - `/PAYMENT_ISSUE_ACTION_PLAN.md`

---

**Bottom Line:** Your code is correct. The API isn't doing what its documentation says it should. This needs to be fixed on the API backend, not in your website code.