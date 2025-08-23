# CRITICAL API ISSUE: Menu Selections Not Being Stored

## The Problem
The restaurant CANNOT see what customers have ordered for Sunday lunch because menu selections are not being stored with the booking.

## What We're Sending (CORRECT ✅)
```json
{
  "booking_type": "sunday_lunch",
  "date": "2025-08-24",
  "time": "13:00",
  "party_size": 2,
  "customer": {
    "first_name": "John",
    "last_name": "Smith",
    "mobile_number": "07700900000",
    "email": "john@example.com"
  },
  "menu_selections": [
    {
      "guest_name": "Guest 1",
      "menu_item_id": "492a0f9b-0a25-4c7f-a4ab-365de41a8288",
      "item_type": "main",
      "quantity": 1,
      "price_at_booking": 14.99
    },
    {
      "guest_name": "Guest 2",
      "menu_item_id": "0c8054cb-ad07-4bbe-a730-48279ab1b615",
      "item_type": "main",
      "quantity": 1,
      "price_at_booking": 15.49
    }
  ]
}
```

## What API Returns (MISSING MENU ❌)
```json
{
  "booking_reference": "TB-2025-8558",
  "status": "pending_payment",
  "payment_required": true,
  "payment_details": {
    "deposit_amount": 10,
    "payment_url": "https://www.paypal.com/..."
  }
  // NO menu_selections field!
}
```

## Evidence
1. **Payment works** - API calculates £5/person deposit correctly
2. **Menu is accepted** - No validation errors
3. **Menu is NOT returned** - Not in booking response
4. **Menu is NOT stored** - Cannot retrieve it later
5. **Restaurant can't see orders** - Kitchen doesn't know what to prepare

## The Real Issue

### Option 1: API Bug (Most Likely)
The API is:
- ✅ Accepting menu_selections
- ✅ Using them for payment calculation
- ❌ NOT storing them in the database
- ❌ NOT returning them in responses

### Option 2: Missing Field
We're not including `special_requests` for each item (but this is optional per docs)

### Option 3: Wrong Endpoint
Maybe there's a separate endpoint to store menu selections after booking creation?

## Immediate Fix Needed

The API provider (OrangeJelly) needs to:
1. Store menu_selections when booking is created
2. Include them in booking retrieval responses
3. Make them visible in restaurant management system

## Temporary Workaround

Until the API is fixed, we could:
1. Store menu selections in our own database
2. Send them via email to the restaurant
3. Include them in the special_requirements field as text

But these are HACKS. The API should store the data properly.

## Test Command
```bash
# This proves the issue:
npx tsx test-menu-in-booking.ts
```

Output shows:
- Menu selections sent ✅
- Payment calculated ✅
- Menu NOT in response ❌
- Menu NOT retrievable ❌