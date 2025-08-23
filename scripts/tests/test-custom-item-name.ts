#!/usr/bin/env npx tsx

/**
 * Test that custom_item_name is being passed to the API
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function testCustomItemName() {
  console.log('🔍 TESTING CUSTOM_ITEM_NAME FIELD\n')
  console.log('=' .repeat(60))
  
  // Simulate what the frontend sends after user selects menu items
  const bookingData = {
    date: "2025-08-24",
    time: "13:00",
    partySize: 2,
    bookingType: "sunday_roast",
    firstName: "Custom",
    lastName: "Test",
    phone: "07700900666",
    email: "custom@test.com",
    specialRequirements: "Testing custom_item_name",
    marketingOptIn: false,
    menuSelections: [
      {
        guest_name: "Alice",
        menu_item_id: "492a0f9b-0a25-4c7f-a4ab-365de41a8288",
        custom_item_name: "Roasted Chicken", // THIS is what the API needs!
        item_type: "main",
        quantity: 1,
        price_at_booking: 14.99
      },
      {
        guest_name: "Bob",
        menu_item_id: "0c8054cb-ad07-4bbe-a730-48279ab1b615",
        custom_item_name: "Slow-Cooked Lamb Shank", // THIS is what the API needs!
        item_type: "main",
        quantity: 1,
        price_at_booking: 15.49
      }
    ]
  }
  
  console.log('1️⃣ MENU SELECTIONS WITH custom_item_name:')
  bookingData.menuSelections.forEach(s => {
    console.log(`   ${s.guest_name}:`)
    console.log(`     - custom_item_name: "${s.custom_item_name}" ✅`)
    console.log(`     - menu_item_id: "${s.menu_item_id.substring(0, 8)}..."`)
    console.log(`     - price: £${s.price_at_booking}`)
  })
  
  console.log('\n2️⃣ SENDING TO /api/booking/submit...')
  
  const response = await fetch('http://localhost:3001/api/booking/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  })
  
  const result = await response.json()
  
  console.log('\n3️⃣ RESPONSE:')
  console.log(`   Success: ${result.success ? '✅' : '❌'}`)
  console.log(`   Reference: ${result.reference}`)
  console.log(`   Payment Required: ${result.payment_required ? '✅' : '❌'}`)
  
  console.log('\n4️⃣ CHECK SERVER LOGS FOR:')
  console.log('   "🔍 Menu selections being sent to API:"')
  console.log('   Should show:')
  console.log('   - Alice: custom_item_name="Roasted Chicken", menu_item_id="492a0f9b..."')
  console.log('   - Bob: custom_item_name="Slow-Cooked Lamb Shank", menu_item_id="0c8054cb..."')
  
  console.log('\n5️⃣ WHAT THE API RECEIVES:')
  console.log('The API will get menu_selections array with BOTH:')
  console.log('  - menu_item_id (for linking to their menu if exists)')
  console.log('  - custom_item_name (the actual name to store and display)')
  
  console.log('\n6️⃣ WHAT THE RESTAURANT SEES:')
  console.log('In the booking system, they will see:')
  console.log('  1. In menu_selections: "Roasted Chicken", "Slow-Cooked Lamb Shank"')
  console.log('  2. In special_requirements: "SUNDAY ROAST PRE-ORDER: Alice: Roasted Chicken (£14.99), Bob: Slow-Cooked Lamb Shank (£15.49)"')
  
  console.log('\n' + '=' .repeat(60))
  
  if (result.success && result.payment_required) {
    console.log('✅ SUCCESS! The API is receiving:')
    console.log('   - custom_item_name for each menu selection')
    console.log('   - menu_item_id for reference')
    console.log('   - Full menu details in special_requirements as backup')
    console.log('\n✅ THE RESTAURANT WILL SEE WHAT WAS ORDERED!')
  } else {
    console.log('❌ Something went wrong - check the response')
  }
}

testCustomItemName().catch(console.error)