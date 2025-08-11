#!/usr/bin/env npx tsx

/**
 * Test that simulates the exact user journey through the booking wizard
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function testUserJourney() {
  console.log('🧪 SIMULATING USER JOURNEY FOR SUNDAY LUNCH BOOKING\n')
  console.log('=' .repeat(60))
  
  const sundayDate = '2025-01-12' // Next Sunday from your timezone
  
  // Step 1: User loads menu selection page
  console.log('\n1️⃣ USER LOADS MENU SELECTION PAGE')
  console.log('   GET /api/menu/sunday-lunch?date=' + sundayDate)
  
  const menuResponse = await fetch(`http://localhost:3001/api/menu/sunday-lunch?date=${sundayDate}`)
  const menuData = await menuResponse.json()
  
  if (menuData.error) {
    console.error('   ❌ ERROR:', menuData.error)
    console.error('   Menu has no items - user cannot proceed!')
    return
  }
  
  console.log(`   ✅ Menu loaded: ${menuData.mains?.length || 0} items`)
  if (menuData.mains && menuData.mains.length > 0) {
    console.log(`   First item: ${menuData.mains[0].name}`)
    console.log(`   ID format: ${menuData.mains[0].id}`)
    console.log(`   Price: £${menuData.mains[0].price}`)
  }
  
  // Step 2: User selects menu items
  console.log('\n2️⃣ USER SELECTS MENU ITEMS')
  
  if (!menuData.mains || menuData.mains.length < 2) {
    console.error('   ❌ Not enough menu items to proceed')
    return
  }
  
  const userSelections = {
    date: sundayDate,
    time: '13:00',
    partySize: 2,
    bookingType: 'sunday_roast',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '07700900123',
    email: 'jane@example.com',
    menuSelections: [
      {
        guest_name: 'Guest 1',
        menu_item_id: menuData.mains[0].id,
        item_type: 'main',
        quantity: 1,
        price_at_booking: menuData.mains[0].price
      },
      {
        guest_name: 'Guest 2', 
        menu_item_id: menuData.mains[1].id,
        item_type: 'main',
        quantity: 1,
        price_at_booking: menuData.mains[1].price
      }
    ],
    specialRequirements: '',
    marketingOptIn: false
  }
  
  console.log('   Selected items:')
  userSelections.menuSelections.forEach(s => {
    console.log(`   - ${s.guest_name}: ${s.menu_item_id.substring(0, 8)}... (£${s.price_at_booking})`)
  })
  
  // Step 3: User submits booking
  console.log('\n3️⃣ USER CLICKS "CONFIRM BOOKING"')
  console.log('   POST /api/booking/submit')
  
  const bookingResponse = await fetch('http://localhost:3001/api/booking/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userSelections)
  })
  
  const bookingResult = await bookingResponse.json()
  
  console.log('\n4️⃣ BOOKING RESPONSE:')
  console.log(`   Success: ${bookingResult.success ? '✅' : '❌'}`)
  console.log(`   Reference: ${bookingResult.reference || 'none'}`)
  console.log(`   Payment Required: ${bookingResult.payment_required ? '✅ YES' : '❌ NO'}`)
  
  if (bookingResult.payment_required && bookingResult.payment_details) {
    console.log('\n💳 PAYMENT REDIRECTION:')
    console.log(`   Deposit: £${bookingResult.payment_details.deposit_amount || bookingResult.payment_details.amount}`)
    console.log(`   PayPal URL: ${bookingResult.payment_details.payment_url}`)
    console.log('\n   ✅ USER WOULD BE REDIRECTED TO PAYPAL')
  } else {
    console.log('\n   ❌ USER GOES TO CONFIRMATION PAGE WITHOUT PAYMENT')
    console.log('   This is the bug - Sunday lunch should require payment!')
  }
  
  // Step 5: Check what actually happened
  console.log('\n5️⃣ WHAT THE USER EXPERIENCES:')
  
  if (bookingResult.payment_required) {
    console.log('   1. Booking wizard shows "Processing..."')
    console.log('   2. JavaScript redirects to: ' + bookingResult.payment_details?.payment_url)
    console.log('   3. User pays £5/person deposit on PayPal')
    console.log('   4. PayPal redirects back to confirmation page')
    console.log('\n   ✅ CORRECT FLOW - Payment is required!')
  } else {
    console.log('   1. Booking wizard shows "Processing..."')
    console.log('   2. JavaScript redirects to: /booking-confirmation?ref=' + bookingResult.reference)
    console.log('   3. User sees confirmation WITHOUT paying')
    console.log('\n   ❌ INCORRECT - Payment was bypassed!')
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('🏁 USER JOURNEY TEST COMPLETE\n')
  
  if (bookingResult.payment_required) {
    console.log('✅ ISSUE IS FIXED! Sunday lunch bookings require payment.')
  } else {
    console.log('❌ ISSUE PERSISTS! Payment is still being bypassed.')
    console.log('\nDEBUGGING INFO:')
    console.log('- Menu IDs are: ' + (menuData.mains?.[0]?.id?.includes('-') ? 'UUIDs ✅' : 'Simple IDs ❌'))
    console.log('- Booking type sent: ' + (userSelections.bookingType === 'sunday_roast' ? 'sunday_roast ✅' : 'wrong'))
    console.log('- Menu selections sent: ' + userSelections.menuSelections.length)
  }
}

testUserJourney().catch(console.error)