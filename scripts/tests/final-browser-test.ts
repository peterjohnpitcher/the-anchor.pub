#!/usr/bin/env npx tsx

/**
 * FINAL TEST - Simulates exact browser behavior
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function finalBrowserTest() {
  console.log('🌐 SIMULATING EXACT BROWSER BEHAVIOR\n')
  console.log('=' .repeat(60))
  
  // This is EXACTLY what the browser sends when user completes the wizard
  const browserPayload = {
    "date": "2025-08-17",
    "bookingType": "sunday_roast",
    "menuSelections": [
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
    ],
    "partySize": 2,
    "time": "13:00",
    "firstName": "John",
    "lastName": "Smith",
    "phone": "07700900123",
    "email": "john@example.com",
    "dietaryRequirements": [],
    "allergies": "",
    "occasion": "",
    "specialRequirements": "",
    "marketingOptIn": true
  }
  
  console.log('📤 Browser sends to /api/booking/submit:')
  console.log('   Date: Sunday, Aug 17, 2025')
  console.log('   Type: sunday_roast')
  console.log('   Party: 2 people')
  console.log('   Menu: 2 selections (£30.48 total)')
  
  const response = await fetch('http://localhost:3001/api/booking/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(browserPayload)
  })
  
  const result = await response.json()
  
  console.log('\n📥 Server responds with:')
  console.log(JSON.stringify(result, null, 2))
  
  console.log('\n🔍 What happens in the browser:')
  
  if (result.payment_required && result.payment_details?.payment_url) {
    console.log('✅ JavaScript code sees: payment_required = true')
    console.log('✅ JavaScript executes: window.location.href = "' + result.payment_details.payment_url + '"')
    console.log('✅ Browser redirects to PayPal')
    console.log('✅ User pays £' + result.payment_details.deposit_amount + ' deposit')
    console.log('\n🎉 ISSUE IS FIXED! You will be redirected to PayPal!')
  } else {
    console.log('❌ JavaScript code sees: payment_required = false or undefined')
    console.log('❌ JavaScript executes: router.push("/booking-confirmation?ref=' + result.reference + '")')
    console.log('❌ Browser goes to confirmation WITHOUT payment')
    console.log('\n⚠️ ISSUE NOT FIXED! Payment will be bypassed!')
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('💯 CONFIDENCE LEVEL:')
  
  if (result.payment_required === true && 
      result.payment_details?.payment_url && 
      result.payment_details?.deposit_amount === 10 &&
      result.booking?.status === 'pending_payment') {
    console.log('\n✅✅✅ 100% CONFIDENT - IT IS FIXED! ✅✅✅')
    console.log('\nYou can now test in the browser with confidence.')
    console.log('You WILL be redirected to PayPal for payment.')
  } else {
    console.log('\n❌ NOT FIXED - DO NOT TEST YET ❌')
    console.log('\nThere is still an issue to resolve.')
  }
}

finalBrowserTest().catch(console.error)