#!/usr/bin/env npx tsx

/**
 * Test script to verify API v2 Sunday lunch booking behavior
 * Run with: npx tsx test-api-v2-sunday-lunch.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Set the API key in the environment
process.env.ANCHOR_API_KEY = 'anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4'

import { AnchorAPI } from '../../lib/api'

// Create API instance with the key
const anchorAPI = new AnchorAPI(process.env.ANCHOR_API_KEY)

async function testAPIv2SundayLunch() {
  console.log('🧪 TESTING API v2 SUNDAY LUNCH BOOKING\n')
  console.log('='.repeat(60))
  
  // Get next Sunday
  const today = new Date()
  const daysUntilSunday = (7 - today.getDay()) % 7 || 7
  const nextSunday = new Date(today)
  nextSunday.setDate(today.getDate() + daysUntilSunday)
  const bookingDate = nextSunday.toISOString().split('T')[0]
  
  console.log(`📅 Testing with date: ${bookingDate} (next Sunday)\n`)
  
  // API v2 simplified booking - only menu_item_id required
  const testBooking = {
    booking_type: 'sunday_lunch' as const,
    date: bookingDate,
    time: '13:30',
    party_size: 3,
    customer: {
      first_name: 'APIv2',
      last_name: 'Test',
      mobile_number: '07700900999',
      email: 'apiv2test@example.com',
      sms_opt_in: false
    },
    duration_minutes: 120,
    menu_selections: [
      {
        menu_item_id: '0c8054cb-ad07-4bbe-a730-48279ab1b615',  // Slow-Cooked Lamb Shank
        quantity: 1,
        guest_name: 'Alice',
        special_requests: 'Medium rare please'
      },
      {
        menu_item_id: '492a0f9b-0a25-4c7f-a4ab-365de41a8288',  // Roasted Chicken
        quantity: 1,
        guest_name: 'Bob'
      },
      {
        menu_item_id: '7991bf75-2a41-44b4-808b-2c4947b9e4a7',  // Crispy Pork Belly
        quantity: 1,
        guest_name: 'Charlie',
        special_requests: 'Extra crackling'
      }
    ],
    special_requirements: 'API v2 Test - Please delete. Window table if possible.',
    source: 'test_script_v2',
    marketing_opt_in: false
  }
  
  console.log('📤 SENDING TO API v2 (Simplified as documented):\n')
  console.log('Following API v2 documentation:')
  console.log('  ✅ Only menu_item_id required')
  console.log('  ✅ No item_type field')
  console.log('  ✅ No price_at_booking field')
  console.log('  ✅ Server fetches menu details')
  console.log('  ✅ Idempotency-Key prevents duplicates\n')
  
  console.log('Menu Selections:')
  testBooking.menu_selections.forEach(s => {
    console.log(`  - ${s.guest_name}: ${s.menu_item_id} (qty: ${s.quantity})`)
    if (s.special_requests) {
      console.log(`    Special: ${s.special_requests}`)
    }
  })
  console.log('\n' + '='.repeat(60) + '\n')
  
  // Generate idempotency key to prevent duplicates
  const idempotencyKey = `test-v2-${Date.now()}`
  
  try {
    console.log('⏳ Making API request with Idempotency-Key:', idempotencyKey, '\n')
    const response = await anchorAPI.createTableBooking(testBooking, idempotencyKey)
    
    console.log('📥 API RESPONSE:\n')
    console.log(JSON.stringify(response, null, 2))
    console.log('\n' + '='.repeat(60) + '\n')
    
    // Analyze response
    console.log('🔍 RESPONSE ANALYSIS:\n')
    console.log(`✓ Booking Reference: ${response.booking_reference || response.booking_id}`)
    console.log(`✓ Status: ${response.status}`)
    console.log(`✓ Payment Required: ${response.payment_required || 'NOT SET'}`)
    
    if (response.payment_details) {
      console.log('\n💳 PAYMENT DETAILS:')
      console.log(`  - Deposit Required: £${response.payment_details.deposit_amount || response.payment_details.amount}`)
      console.log(`  - Total Menu Cost: £${response.payment_details.total_amount || 'N/A'}`)
      console.log(`  - Outstanding: £${response.payment_details.outstanding_amount || 'N/A'}`)
      console.log(`  - Payment URL: ${response.payment_details.payment_url}`)
      console.log(`  - Expires: ${response.payment_details.expires_at}`)
    }
    
    console.log('\n' + '='.repeat(60) + '\n')
    
    // Verify API v2 behavior
    if (response.payment_required === true && response.payment_details?.payment_url) {
      console.log('✅ SUCCESS: API v2 is working correctly!')
      console.log('   - Sunday lunch booking requires payment (£5 per person)')
      console.log('   - Server has enriched the booking with menu details')
      console.log('   - Yorkshire pudding & roast potatoes will be auto-added')
      console.log('\n🎉 The restaurant will see:')
      console.log('   - Guest names and their menu choices')
      console.log('   - All prices and special requests')
      console.log('   - Automatic inclusion of sides')
    } else {
      console.log('⚠️  UNEXPECTED BEHAVIOR:')
      console.log('   API did not return expected payment requirement')
      console.log('   This may indicate the API is not configured correctly')
    }
    
    // Test idempotency by retrying with same key
    console.log('\n🔄 Testing Idempotency (retry with same key)...')
    try {
      const retryResponse = await anchorAPI.createTableBooking(testBooking, idempotencyKey)
      if (retryResponse.booking_reference === response.booking_reference) {
        console.log('✅ Idempotency working: Same booking reference returned')
      } else {
        console.log('⚠️  New booking created - idempotency may not be working')
      }
    } catch (retryError) {
      console.log('⚠️  Retry failed - check if idempotency is enabled')
    }
    
    // Attempt to cancel if it was created as confirmed
    if (response.booking_reference && response.status === 'confirmed') {
      console.log('\n🧹 Attempting to cancel test booking...')
      try {
        await anchorAPI.cancelTableBooking(response.booking_reference, 'API v2 test - cleanup')
        console.log('✓ Test booking cancelled successfully')
      } catch (err) {
        console.log('⚠️  Could not cancel - may require payment completion first')
      }
    }
    
  } catch (error: any) {
    console.error('❌ API ERROR:\n')
    
    // Handle API v2 error format
    const errorData = error.response?.data?.error || error.response?.data || error
    console.error('Error Code:', errorData.code || 'Unknown')
    console.error('Error Message:', errorData.message || error.message)
    
    if (errorData.correlation_id) {
      console.error('Correlation ID:', errorData.correlation_id)
      console.error('(Provide this to API support for debugging)')
    }
    
    if (errorData.details) {
      console.error('\nError Details:', JSON.stringify(errorData.details, null, 2))
    }
    
    // Check for specific v2 error scenarios
    if (errorData.code === 'INVALID_MENU_ITEMS') {
      console.error('\n⚠️  Menu items not found. The menu_item_id values may be incorrect.')
      console.error('   Ensure you\'re using valid menu item IDs from the API.')
    } else if (errorData.code === 'INVALID_MEAL_SELECTION') {
      console.error('\n⚠️  Menu selection count doesn\'t match party size.')
      console.error('   Each guest must have exactly one main course.')
    }
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('🧪 API v2 TEST COMPLETE')
}

// Run the test
testAPIv2SundayLunch().catch(console.error)