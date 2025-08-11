#!/usr/bin/env npx tsx

/**
 * Test API directly to see what it returns
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
process.env.ANCHOR_API_KEY = 'anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4'

async function testAPIDirectly() {
  console.log('🧪 TESTING API DIRECTLY\n')
  
  // Test what the /api/booking/submit endpoint does
  const testData = {
    date: "2025-08-17",
    time: "13:00",
    partySize: 2,
    bookingType: "sunday_roast",
    firstName: "Direct",
    lastName: "Test",
    phone: "07700900777",
    email: "direct@test.com",
    menuSelections: [
      {
        guest_name: "Guest 1",
        menu_item_id: "492a0f9b-0a25-4c7f-a4ab-365de41a8288",
        item_type: "main",
        quantity: 1,
        price_at_booking: 14.99
      },
      {
        guest_name: "Guest 2",
        menu_item_id: "0c8054cb-ad07-4bbe-a730-48279ab1b615",
        item_type: "main",
        quantity: 1,
        price_at_booking: 15.49
      }
    ],
    specialRequirements: "DIRECT API TEST",
    marketingOptIn: false
  }
  
  console.log('📤 Sending to /api/booking/submit:')
  console.log('   bookingType:', testData.bookingType)
  console.log('   menuSelections:', testData.menuSelections.length, 'items')
  console.log('   Total price: £' + (14.99 + 15.49).toFixed(2))
  
  const response = await fetch('http://localhost:3001/api/booking/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testData)
  })
  
  const result = await response.json()
  
  console.log('\n📥 Response from /api/booking/submit:')
  console.log(JSON.stringify(result, null, 2))
  
  console.log('\n🔍 Analysis:')
  console.log('   Success:', result.success ? '✅' : '❌')
  console.log('   Payment Required:', result.payment_required ? '✅ YES' : '❌ NO')
  console.log('   Status:', result.booking?.status || 'unknown')
  
  if (result.payment_required) {
    console.log('\n✅ WORKING! Payment is required')
    console.log('   Deposit: £' + result.payment_details?.deposit_amount)
    console.log('   PayPal URL:', result.payment_details?.payment_url)
  } else {
    console.log('\n❌ BROKEN! Payment was NOT required')
    console.log('   The booking went straight to confirmed status')
    console.log('   This means the API is not returning payment_required')
  }
  
  // Now check what the server logs show
  console.log('\n📋 Check the terminal running "npm run dev" for:')
  console.log('   🔍 SUNDAY LUNCH BOOKING DETECTED')
  console.log('   🔍 Menu selections: ...')
  console.log('   🔍 API REQUEST to /table-bookings: ...')
  console.log('   🔍 API RESPONSE from /table-bookings: ...')
  console.log('\nIf you see those logs, check what the API response contains.')
}

testAPIDirectly().catch(console.error)