# Sunday Lunch Payment Issue - Diagnostic Test Plan

## Problem Summary
Sunday lunch bookings are NOT triggering payment despite sending the correct data to the API.

## What We're Sending vs What We Should Get

### What We Send to API:
```json
{
  "booking_type": "sunday_lunch",
  "date": "2025-01-12",
  "time": "13:00",
  "party_size": 2,
  "menu_selections": [
    {
      "guest_name": "Guest 1",
      "menu_item_id": "roast-beef",
      "item_type": "main",
      "quantity": 1,
      "price_at_booking": 18.95
    },
    {
      "guest_name": "Guest 2",
      "menu_item_id": "roast-chicken",
      "item_type": "main",
      "quantity": 1,
      "price_at_booking": 16.95
    }
  ],
  "customer": {
    "first_name": "John",
    "last_name": "Smith",
    "mobile_number": "07700900000",
    "email": "test@example.com"
  }
}
```

### What API Documentation Says We Should Get:
```json
{
  "booking_id": "TB-2025-XXXX",
  "booking_reference": "TB-2025-XXXX",
  "status": "pending_payment",
  "payment_required": true,
  "payment_details": {
    "deposit_amount": 10.00,
    "total_amount": 35.90,
    "outstanding_amount": 10.00,
    "currency": "GBP",
    "payment_url": "https://www.paypal.com/checkoutnow?token=XXX",
    "expires_at": "2025-01-10T21:00:00Z"
  }
}
```

### What We're Actually Getting:
The API is returning `status: "confirmed"` with NO `payment_required` field!

## Test Instructions

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open browser developer console** (F12) and go to the Console tab

3. **Navigate to**: http://localhost:3001/book-table

4. **Make a Sunday lunch booking**:
   - Select any Sunday date (e.g., January 12, 2025)
   - Choose "Sunday Roast - Pre-order required"
   - Select party size (e.g., 2)
   - Select menu items for each guest
   - Choose a time (e.g., 1:00 PM)
   - Fill in test details:
     - First Name: Test
     - Last Name: User
     - Phone: 07700900000
     - Email: test@example.com
   - Click Confirm Booking

5. **Check the console output** for diagnostic logs:
   - Look for logs starting with "🔍"
   - You should see:
     - `🔍 SUNDAY LUNCH BOOKING DETECTED`
     - `🔍 Menu selections:` (showing the menu data)
     - `🔍 FINAL REQUEST to API:` (what we're sending)
     - `🔍 API REQUEST to /table-bookings:` (in network logs)
     - `🔍 API RESPONSE from /table-bookings:` (what API returns)
     - `🔍 API RESPONSE ANALYSIS:` (parsed response)

## Expected vs Actual Results

### Expected:
- Console shows: `🔍 Payment Required: true`
- Console shows: `🔍 Payment Details:` with PayPal URL
- Browser redirects to PayPal payment page

### Actual (the bug):
- Console shows: `🔍 Payment Required: undefined`
- Console shows: `🔍 Payment Details: null`
- Browser redirects to booking confirmation page
- Warning in console: "WARNING: Sunday lunch booking did not return payment_required from API"

## Root Cause Analysis

The issue is **NOT** in our code. We are:
1. ✅ Correctly detecting Sunday lunch bookings
2. ✅ Correctly setting `booking_type: "sunday_lunch"`
3. ✅ Correctly sending menu selections array
4. ✅ Correctly checking for `payment_required` in response
5. ✅ Correctly attempting to redirect to payment URL if present

The problem is the external API at `management.orangejelly.co.uk` is:
- ❌ NOT returning `payment_required: true` for Sunday lunch bookings
- ❌ NOT returning payment details with PayPal URL
- ❌ Treating Sunday lunch bookings as regular bookings

## Possible Solutions

### Option 1: Contact API Provider (Recommended)
The API backend needs to be configured to recognize `booking_type: "sunday_lunch"` and trigger payment requirements.

### Option 2: Force Payment on Our Side (Workaround)
We could bypass the API response and always force payment for Sunday lunch bookings:
```javascript
// After receiving API response
if (bookingType === 'sunday_lunch' && !booking.payment_required) {
  // Force payment by constructing our own payment URL
  // This requires knowing the payment endpoint format
}
```

### Option 3: Use Different API Endpoint
Check if there's a specific endpoint for Sunday lunch bookings that handles payment differently.

## Next Steps

1. Run the diagnostic test above
2. Copy the console output showing what the API actually returns
3. Contact the API provider with this evidence
4. Or, if you have access to the API backend, check the configuration for Sunday lunch booking handling

## Files Modified for Diagnostics

1. `/lib/api.ts` - Added request/response logging to `createTableBooking`
2. `/app/api/booking/submit/route.ts` - Added detailed diagnostic logging

These changes are for debugging only and should be removed once the issue is resolved.