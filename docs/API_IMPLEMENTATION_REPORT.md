# API Implementation Report for Table Bookings

## Executive Summary

We have successfully implemented the table booking functionality according to the provided API documentation. The implementation has been updated to match the new API response format where `confirmation_details` is used instead of `booking_details`. All TypeScript interfaces and UI components have been updated accordingly.

## Current Implementation Status

### ✅ Successfully Implemented
1. Correct field names and types according to documentation
2. Proper payload structure with nested customer object
3. Optional fields are omitted when empty (not sent as null)
4. Arrays for dietary_requirements and allergies
5. Field mapping from UI (occasion) to API (celebration_type)
6. Default values (duration_minutes: 120, source: 'website')
7. Auto opt-in for marketing (sms_opt_in: true)
8. Text fields for dietary requirements and allergies
9. Allergen warning displayed when allergies field is filled
10. Updated TypeScript interfaces to handle both `confirmation_details` and `booking_details` response formats
11. Fixed UI components to handle new API response structure

## Implementation Details

### 1. API Endpoint Usage

**Endpoint:** `POST https://management.orangejelly.co.uk/api/table-bookings`

**Headers:**
```
X-API-Key: anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4
Content-Type: application/json
```

Note: We removed the duplicate `Authorization: Bearer` header as recommended in the documentation.

### 2. Request Payload Structure

Here's an example of the exact payload we're sending:

```json
{
  "booking_type": "regular",
  "date": "2025-07-27",
  "time": "13:30",
  "party_size": 2,
  "duration_minutes": 120,
  "customer": {
    "first_name": "Peter",
    "last_name": "Pitcher",
    "mobile_number": "07990587315",
    "sms_opt_in": true
  },
  "source": "website"
}
```

### 3. Field Handling Logic

#### Required Fields
- Always included in payload
- Validated on frontend before submission

#### Optional Fields
We only include optional fields when they have actual values:

```javascript
// Only add optional fields if they have values
if (body.special_requirements && body.special_requirements.trim()) {
  apiPayload.special_requirements = body.special_requirements
}

if (body.dietary_requirements && body.dietary_requirements.trim()) {
  apiPayload.dietary_requirements = [body.dietary_requirements]
}

if (body.allergies && body.allergies.trim()) {
  apiPayload.allergies = [body.allergies]
}

if (body.occasion && body.occasion.trim()) {
  apiPayload.celebration_type = body.occasion
}
```

### 4. Data Transformations

| UI Field | API Field | Transformation |
|----------|-----------|----------------|
| `occasion` | `celebration_type` | Direct mapping |
| `dietary_requirements` (string) | `dietary_requirements` (array) | Wrapped in array |
| `allergies` (string) | `allergies` (array) | Wrapped in array |
| `marketing_opt_in` | `customer.sms_opt_in` | Always set to `true` |
| Empty strings | Omitted | Not sent in payload |

### 5. Response Handling

We handle the success/error wrapper format:

```javascript
if (data.success === false) {
  // Handle error response
  switch (data.error?.code) {
    case 'NO_AVAILABILITY':
      // Handle no availability
    case 'VALIDATION_ERROR':
      // Handle validation errors
    case 'RATE_LIMIT_EXCEEDED':
      // Handle rate limiting
    case 'DATABASE_ERROR':
      // Handle database errors
  }
}
```

## Current Issues

### 1. DATABASE_ERROR Response

**Request:**
```json
{
  "booking_type": "regular",
  "date": "2025-07-27",
  "time": "13:30",
  "party_size": 2,
  "duration_minutes": 120,
  "customer": {
    "first_name": "Peter",
    "last_name": "Pitcher",
    "mobile_number": "07990587315",
    "sms_opt_in": true
  },
  "source": "website"
}
```

**Response:**
```json
{
  "code": "DATABASE_ERROR",
  "message": "Failed to create booking"
}
```

### 2. Google Places API Error

```
Google Places API error: REQUEST_DENIED API keys with referer restrictions cannot be used with this API.
```

This appears before the DATABASE_ERROR, suggesting the API might be trying to validate the venue location or address.

## API Response Format Update

### Previous Issue
The API was returning `confirmation_details` instead of the expected `booking_details` in the response, causing the UI to crash.

### Solution Implemented
1. Updated `TableBookingResponse` interface to include both `confirmation_details` and `booking_details` as optional properties
2. Updated all UI components to check for both properties with fallback logic
3. Added `cancellation_policy` field to the response interface

### Updated Response Interface
```typescript
export interface TableBookingResponse {
  booking_id: string
  booking_reference: string
  status: 'confirmed' | 'pending' | 'cancelled' | 'pending_payment'
  customer_id?: string
  // New API format uses confirmation_details
  confirmation_details?: {
    date: string
    time: string
    party_size: number
    duration_minutes: number
    special_requirements?: string
    occasion?: string
  }
  // Keep booking_details for backward compatibility
  booking_details?: {
    date: string
    time: string
    party_size: number
    duration_minutes: number
    special_requirements?: string
    occasion?: string
  }
  confirmation_sent: boolean
  sms_status?: string
  payment_details?: {
    amount: number
    currency: string
    payment_url: string
    expires_at: string
  }
  cancellation_policy?: string
}
```

## Recommendations for API Developer

### 1. Add Detailed Error Logging
```javascript
try {
  // booking creation code
} catch (error) {
  console.error('Detailed booking error:', {
    message: error.message,
    code: error.code,
    detail: error.detail,
    hint: error.hint,
    table: error.table,
    column: error.column,
    constraint: error.constraint,
    stack: error.stack
  });
  
  // Log the specific operation that failed
  console.error('Failed operation:', {
    operation: 'insert_booking',
    payload: sanitizedPayload,
    timestamp: new Date().toISOString()
  });
}
```

### 2. Google Places API Handling
Consider making the Google Places API call optional or fail gracefully:
```javascript
let venueData = null;
try {
  venueData = await fetchGooglePlacesData();
} catch (error) {
  console.warn('Google Places API failed, continuing without venue data:', error);
  // Continue with booking creation
}
```

### 3. Possible Database Issues to Check

1. **Customer Creation/Lookup**
   - Is the customer lookup by phone number failing?
   - Is customer creation failing due to missing required fields?
   - Check if the phone number format is causing issues

2. **Table Availability Check**
   - Is the `check_table_availability` function returning properly?
   - Are there capacity constraints being violated?

3. **Field Mapping**
   - Verify all database columns match expected field names
   - Check if any NOT NULL constraints are being violated

4. **Transaction Issues**
   - Is the booking creation wrapped in a transaction that's failing?
   - Are there foreign key constraints failing?

### 4. Test Query
Try running this directly on the database to isolate the issue:
```sql
-- Check if customer exists
SELECT * FROM customers WHERE mobile_number = '07990587315';

-- Check table availability
SELECT * FROM check_table_availability('2025-07-27'::date, '13:30'::time, 2, 120);

-- Try minimal insert
INSERT INTO table_bookings (
  booking_type,
  date,
  time,
  party_size,
  duration_minutes,
  customer_id,
  source,
  created_at
) VALUES (
  'regular',
  '2025-07-27',
  '13:30',
  2,
  120,
  [customer_id_from_above],
  'website',
  NOW()
);
```

## Conclusion

The table booking implementation has been successfully updated to:
1. Match the new API documentation with exact field names and types
2. Handle the new response format with `confirmation_details`
3. Implement all requested UI features (auto opt-in, text fields, allergen warning)
4. Build without TypeScript errors

The implementation is now ready for production use once the API developer confirms their backend changes are deployed.

## Contact

If you need any clarification about our implementation or want to test specific scenarios, please let us know. We can provide full request/response logs for any test case.

---

**Report Date:** July 26, 2025  
**Prepared by:** The Anchor Website Development Team