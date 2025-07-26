# API Debugging Instructions for Management System Developer

## Current Issue
The `/api/table-bookings` endpoint is returning 500 errors with a generic "DATABASE_ERROR" message. We need more detailed error logging to identify the root cause.

## Recommended Error Logging Enhancement

In your management API's `/api/table-bookings` endpoint, please update the error handling to log detailed database errors:

```javascript
// In your table booking creation endpoint
try {
  // ... booking creation code
  const booking = await createTableBooking(bookingData);
  return { success: true, data: booking };
} catch (error) {
  // Add detailed error logging
  console.error('Detailed booking error:', {
    message: error.message,
    code: error.code,
    detail: error.detail,
    hint: error.hint,
    table: error.table,
    column: error.column,
    constraint: error.constraint,
    routine: error.routine,
    // Include the full error object for any missed properties
    fullError: JSON.stringify(error, null, 2)
  });
  
  // Also log the request data that caused the error
  console.error('Failed booking request data:', {
    booking_type: req.body.booking_type,
    date: req.body.date,
    time: req.body.time,
    party_size: req.body.party_size,
    customer: {
      first_name: req.body.customer?.first_name,
      last_name: req.body.customer?.last_name,
      mobile_number: req.body.customer?.mobile_number,
      // Don't log sensitive data in production
      mobile_masked: req.body.customer?.mobile_number?.replace(/\d(?=\d{4})/g, '*')
    }
  });
  
  // Return the generic error response to client
  return {
    success: false,
    error: {
      code: 'DATABASE_ERROR',
      message: 'Failed to create booking'
    }
  };
}
```

## Common Database Issues to Check

Based on the error pattern, here are the most likely causes:

### 1. Missing Column
If the error shows `column "email" does not exist`, it means the database schema doesn't match the expected structure.

### 2. Missing or Invalid Customer ID
The API might be trying to reference a customer that doesn't exist. Check if:
- Customer lookup by phone number is failing
- Customer creation is failing
- Foreign key constraint is violated

### 3. Constraint Violations
Look for errors like:
- `duplicate key value violates unique constraint`
- `foreign key violation`
- `check constraint violation`

### 4. Missing Database Function
If you see `function does not exist`, a required stored procedure or function might be missing.

### 5. Data Type Mismatch
Check for errors like `invalid input syntax for type`

## Quick Debugging Checklist

1. **Check Database Connection**
   ```javascript
   console.log('Database connected:', !!db.client);
   ```

2. **Verify Table Structure**
   ```sql
   SELECT column_name, data_type, is_nullable 
   FROM information_schema.columns 
   WHERE table_name = 'bookings';
   ```

3. **Check for Recent Schema Changes**
   - Has the `email` column been removed from the customers table?
   - Are all required columns present in the bookings table?

4. **Test Customer Lookup**
   ```javascript
   const testPhone = '07700900000';
   const customer = await findCustomerByPhone(testPhone);
   console.log('Customer lookup result:', customer);
   ```

## Request/Response Logs

Here's a sample request that's failing:

```json
{
  "booking_type": "regular",
  "date": "2025-07-26",
  "time": "15:00",
  "party_size": 2,
  "customer": {
    "first_name": "Pedro",
    "last_name": "Lancer",
    "mobile_number": "07990587315",
    "sms_opt_in": false
  },
  "special_requirements": "",
  "occasion": ""
}
```

Expected successful response format:
```json
{
  "success": true,
  "data": {
    "booking_id": "550e8400-e29b-41d4-a716-446655440000",
    "booking_reference": "TB-2024-1234",
    "status": "confirmed",
    "customer_id": "customer-uuid",
    "booking_details": {
      "date": "2025-07-26",
      "time": "15:00",
      "party_size": 2,
      "duration_minutes": 120,
      "special_requirements": "",
      "occasion": ""
    },
    "confirmation_sent": true,
    "sms_status": "sent"
  }
}
```

## Contact

If you need any clarification or have questions about the implementation, please reach out.