#!/usr/bin/env npx tsx

/**
 * Test if menu selections are properly stored in the API
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
process.env.ANCHOR_API_KEY = 'anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4'

import { AnchorAPI } from './lib/api'
const api = new AnchorAPI(process.env.ANCHOR_API_KEY)

async function testMenuStorage() {
  console.log('🧪 TESTING MENU SELECTION STORAGE\n')
  console.log('=' .repeat(60))
  
  // Step 1: Create a booking with menu selections
  console.log('1️⃣ Creating Sunday lunch booking WITH menu selections...\n')
  
  const bookingData = {
    booking_type: 'sunday_lunch' as const,
    date: '2025-08-24',
    time: '13:00',
    party_size: 2,
    customer: {
      first_name: 'Menu',
      last_name: 'Storage',
      mobile_number: '07700900111',
      email: 'menustorage@test.com',
      sms_opt_in: false
    },
    duration_minutes: 120,
    menu_selections: [
      {
        guest_name: 'Alice',
        menu_item_id: '492a0f9b-0a25-4c7f-a4ab-365de41a8288',
        item_type: 'main' as const,
        quantity: 1,
        price_at_booking: 14.99,
        special_requests: 'No onions please'
      },
      {
        guest_name: 'Bob',
        menu_item_id: '0c8054cb-ad07-4bbe-a730-48279ab1b615',
        item_type: 'main' as const,
        quantity: 1,
        price_at_booking: 15.49,
        special_requests: 'Extra gravy'
      }
    ],
    special_requirements: 'Window table if possible',
    source: 'test_script'
  }
  
  console.log('Menu selections being sent:')
  bookingData.menu_selections.forEach(s => {
    console.log(`  - ${s.guest_name}: ${s.menu_item_id.substring(0, 8)}...`)
    console.log(`    Special: "${s.special_requests}"`)
  })
  
  try {
    const createResponse = await api.createTableBooking(bookingData as any)
    
    console.log('\n2️⃣ Booking created:')
    console.log(`  Reference: ${createResponse.booking_reference}`)
    console.log(`  Status: ${createResponse.status}`)
    console.log(`  Payment Required: ${createResponse.payment_required}`)
    
    // Check if menu selections are in the response
    console.log('\n3️⃣ Checking response for menu selections:')
    const responseHasMenu = !!(createResponse as any).menu_selections
    console.log(`  Menu selections in response: ${responseHasMenu ? '✅ YES' : '❌ NO'}`)
    
    if ((createResponse as any).menu_selections) {
      console.log('  Menu data:')
      console.log(JSON.stringify((createResponse as any).menu_selections, null, 2))
    }
    
    // Step 2: Try to retrieve the booking
    console.log('\n4️⃣ Attempting to retrieve booking details...')
    
    try {
      const getResponse = await api.getTableBooking(createResponse.booking_reference)
      console.log('  Retrieval successful!')
      console.log(`  Has menu selections: ${!!(getResponse as any).menu_selections ? '✅' : '❌'}`)
      
      if ((getResponse as any).menu_selections) {
        console.log('  Retrieved menu:')
        console.log(JSON.stringify((getResponse as any).menu_selections, null, 2))
      }
    } catch (err: any) {
      console.log('  ❌ Cannot retrieve booking:', err.message)
      console.log('  (This is expected - API requires customer verification)')
    }
    
    // Step 3: Check what info we have for confirmation page
    console.log('\n5️⃣ Information available for confirmation page:')
    console.log(`  Reference: ${createResponse.booking_reference}`)
    console.log(`  Date: ${createResponse.confirmation_details?.date || bookingData.date}`)
    console.log(`  Time: ${createResponse.confirmation_details?.time || bookingData.time}`)
    console.log(`  Party Size: ${createResponse.confirmation_details?.party_size || bookingData.party_size}`)
    console.log(`  Special Requirements: ${createResponse.confirmation_details?.special_requirements || 'Not returned'}`)
    console.log(`  Menu Selections: ${(createResponse as any).menu_selections ? 'Available' : 'NOT AVAILABLE'}`)
    
    console.log('\n📊 ANALYSIS:')
    if (!(createResponse as any).menu_selections) {
      console.log('⚠️  The API does not return menu selections in the booking response.')
      console.log('   This means the confirmation page cannot show what was ordered.')
      console.log('\n   OPTIONS:')
      console.log('   1. Store menu selections in browser localStorage before redirect')
      console.log('   2. Pass menu data in URL params (might be too long)')
      console.log('   3. Create a temporary session storage on server')
      console.log('   4. Ask API provider to include menu in response')
    } else {
      console.log('✅ Menu selections are included in the response!')
    }
    
    // Clean up
    if (createResponse.booking_reference && createResponse.status !== 'pending_payment') {
      try {
        await api.cancelTableBooking(createResponse.booking_reference, 'Test cleanup')
        console.log('\n🧹 Test booking cancelled')
      } catch (e) {
        // Ignore
      }
    }
    
  } catch (error: any) {
    console.error('❌ Test failed:', error.message)
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('TEST COMPLETE')
}

testMenuStorage().catch(console.error)