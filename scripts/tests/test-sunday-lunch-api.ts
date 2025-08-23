#!/usr/bin/env npx tsx

/**
 * Test script to verify Sunday lunch booking API behavior
 * Run with: npx tsx test-sunday-lunch-api.ts
 */

// Load environment variables
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Set the API key in the environment
process.env.ANCHOR_API_KEY = 'anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4'

import { AnchorAPI } from '../../lib/api'

// Create API instance with the key
const anchorAPI = new AnchorAPI(process.env.ANCHOR_API_KEY)

async function testSundayLunchBooking() {
  console.log('🧪 TESTING SUNDAY LUNCH BOOKING API\n')
  console.log('='.repeat(50))
  
  // Get next Sunday
  const today = new Date()
  const daysUntilSunday = (7 - today.getDay()) % 7 || 7
  const nextSunday = new Date(today)
  nextSunday.setDate(today.getDate() + daysUntilSunday)
  const bookingDate = nextSunday.toISOString().split('T')[0]
  
  console.log(`📅 Testing with date: ${bookingDate} (next Sunday)\n`)
  
  // Test data matching exactly what the wizard sends
  const testBooking = {
    booking_type: 'sunday_lunch' as const,
    date: bookingDate,
    time: '13:00',
    party_size: 2,
    customer: {
      first_name: 'Test',
      last_name: 'User',
      mobile_number: '07700900000',
      email: 'test@example.com',
      sms_opt_in: false
    },
    duration_minutes: 120,
    menu_selections: [
      {
        guest_name: 'Guest 1',
        menu_item_id: 'roast-beef',
        item_type: 'main' as const,
        quantity: 1,
        price_at_booking: 18.95,
      },
      {
        guest_name: 'Guest 2',
        menu_item_id: 'roast-chicken',
        item_type: 'main' as const,
        quantity: 1,
        price_at_booking: 16.95,
      }
    ],
    special_requirements: 'This is a test booking - please delete',
    source: 'test_script',
    marketing_opt_in: false
  }
  
  console.log('📤 SENDING TO API:\n')
  console.log(JSON.stringify(testBooking, null, 2))
  console.log('\n' + '='.repeat(50) + '\n')
  
  try {
    console.log('⏳ Making API request...\n')
    const response = await anchorAPI.createTableBooking(testBooking)
    
    console.log('📥 API RESPONSE:\n')
    console.log(JSON.stringify(response, null, 2))
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Analyze response
    console.log('🔍 RESPONSE ANALYSIS:\n')
    console.log(`✓ Booking Reference: ${response.booking_reference || response.booking_id}`)
    console.log(`✓ Status: ${response.status}`)
    console.log(`✓ Payment Required: ${response.payment_required || 'NOT SET (undefined)'}`)
    
    if (response.payment_details) {
      console.log('\n💳 PAYMENT DETAILS:')
      console.log(`  - Deposit Amount: £${response.payment_details.deposit_amount}`)
      console.log(`  - Total Amount: £${response.payment_details.total_amount}`)
      console.log(`  - Payment URL: ${response.payment_details.payment_url}`)
      console.log(`  - Expires: ${response.payment_details.expires_at}`)
    } else {
      console.log('\n❌ NO PAYMENT DETAILS RETURNED')
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Check if this matches expected behavior
    if (response.payment_required === true && response.payment_details?.payment_url) {
      console.log('✅ SUCCESS: API is working correctly!')
      console.log('   Sunday lunch booking correctly requires payment.')
    } else {
      console.log('⚠️  PROBLEM DETECTED:')
      console.log('   API did not return payment_required=true for Sunday lunch booking.')
      console.log('   This confirms the API backend is not configured correctly.')
      console.log('\n   According to API documentation, Sunday lunch bookings should:')
      console.log('   1. Return status: "pending_payment"')
      console.log('   2. Return payment_required: true')
      console.log('   3. Include payment_details with PayPal URL')
      console.log('\n   But the API returned:')
      console.log(`   1. status: "${response.status}"`)
      console.log(`   2. payment_required: ${response.payment_required || 'undefined'}`)
      console.log(`   3. payment_details: ${response.payment_details ? 'present' : 'missing'}`)
    }
    
    // Attempt to cancel the test booking if it was created
    if (response.booking_reference && response.status === 'confirmed') {
      console.log('\n🧹 Attempting to cancel test booking...')
      try {
        await anchorAPI.cancelTableBooking(response.booking_reference, 'Test booking - automatic cleanup')
        console.log('✓ Test booking cancelled successfully')
      } catch (err) {
        console.log('⚠️  Could not cancel test booking automatically')
        console.log(`   Please manually cancel booking: ${response.booking_reference}`)
      }
    }
    
  } catch (error: any) {
    console.error('❌ API ERROR:\n')
    console.error(error)
    console.error('\nError details:', error.details || error.message)
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('🧪 TEST COMPLETE')
}

// Run the test
testSundayLunchBooking().catch(console.error)