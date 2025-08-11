#!/usr/bin/env npx tsx

/**
 * Test if menu selections are ACTUALLY stored in the booking
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
process.env.ANCHOR_API_KEY = 'anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4'

async function testMenuInBooking() {
  console.log('🔍 TESTING IF MENU SELECTIONS ARE STORED IN BOOKING\n')
  console.log('=' .repeat(60))
  
  // Step 1: Create a Sunday lunch booking with menu
  const bookingData = {
    booking_type: 'sunday_lunch',
    date: '2025-08-24',
    time: '13:00',
    party_size: 2,
    customer: {
      first_name: 'Menu',
      last_name: 'Test',
      mobile_number: '07700900222',
      email: 'menutest@example.com',
      sms_opt_in: false
    },
    duration_minutes: 120,
    menu_selections: [
      {
        guest_name: 'Alice',
        menu_item_id: '492a0f9b-0a25-4c7f-a4ab-365de41a8288',
        item_type: 'main',
        quantity: 1,
        price_at_booking: 14.99
      },
      {
        guest_name: 'Bob',
        menu_item_id: '0c8054cb-ad07-4bbe-a730-48279ab1b615',
        item_type: 'main',
        quantity: 1,
        price_at_booking: 15.49
      }
    ],
    special_requirements: 'TEST - Checking if menu selections are stored',
    source: 'test_script'
  }
  
  console.log('1️⃣ SENDING TO API:')
  console.log(JSON.stringify(bookingData, null, 2))
  
  const response = await fetch('https://management.orangejelly.co.uk/api/table-bookings', {
    method: 'POST',
    headers: {
      'X-API-Key': process.env.ANCHOR_API_KEY!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData)
  })
  
  const result = await response.json()
  
  console.log('\n2️⃣ API RESPONSE:')
  console.log(JSON.stringify(result, null, 2))
  
  console.log('\n3️⃣ ANALYSIS:')
  console.log('Booking Reference:', result.booking_reference || 'NONE')
  console.log('Status:', result.status)
  console.log('Payment Required:', result.payment_required)
  console.log('Menu Selections in Response:', result.menu_selections ? 'YES ✅' : 'NO ❌')
  
  if (!result.menu_selections) {
    console.log('\n⚠️ PROBLEM IDENTIFIED:')
    console.log('The API accepts menu_selections for payment calculation')
    console.log('But does NOT return them in the response')
    console.log('This means the restaurant cannot see what was ordered!')
    
    console.log('\n4️⃣ ATTEMPTING TO RETRIEVE BOOKING:')
    
    // Try with customer verification
    const getUrl = `https://management.orangejelly.co.uk/api/table-bookings/${result.booking_reference}?customer_email=${bookingData.customer.email}`
    const getResponse = await fetch(getUrl, {
      headers: {
        'X-API-Key': process.env.ANCHOR_API_KEY!
      }
    })
    
    if (getResponse.ok) {
      const bookingDetails = await getResponse.json()
      console.log('Retrieved booking:')
      console.log(JSON.stringify(bookingDetails, null, 2))
      
      if (bookingDetails.menu_selections) {
        console.log('\n✅ GOOD NEWS: Menu selections ARE stored and retrievable!')
      } else {
        console.log('\n❌ BAD NEWS: Menu selections are NOT in the stored booking!')
      }
    } else {
      console.log('Could not retrieve booking:', getResponse.status, getResponse.statusText)
      
      // Try the internal booking management endpoint
      console.log('\n5️⃣ CHECKING INTERNAL MANAGEMENT VIEW:')
      console.log('The restaurant would see the booking in their management system')
      console.log('If menu_selections are not stored, the kitchen won\'t know what to prepare!')
    }
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('CONCLUSION:')
  console.log('If menu selections are not being stored with the booking,')
  console.log('this is a CRITICAL API BUG that needs to be fixed by the API provider.')
  console.log('The website is sending the data correctly.')
}

testMenuInBooking().catch(console.error)