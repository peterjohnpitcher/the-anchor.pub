#!/usr/bin/env npx tsx

/**
 * COMPREHENSIVE TEST - Multiple scenarios to be 100% sure
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
}

async function runTest(testName: string, testData: any) {
  console.log(`\n${COLORS.blue}${COLORS.bright}Testing: ${testName}${COLORS.reset}`)
  console.log('=' .repeat(60))
  
  const response = await fetch('http://localhost:3001/api/booking/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testData)
  })
  
  const result = await response.json()
  
  // Check results
  const paymentRequired = result.payment_required === true
  const hasPayPalUrl = !!result.payment_details?.payment_url
  const correctStatus = result.booking?.status === 'pending_payment'
  const correctDeposit = result.payment_details?.deposit_amount === (testData.partySize * 5)
  
  console.log(`Payment Required: ${paymentRequired ? '✅' : '❌'} ${result.payment_required || 'false'}`)
  console.log(`Has PayPal URL: ${hasPayPalUrl ? '✅' : '❌'} ${result.payment_details?.payment_url ? 'Yes' : 'No'}`)
  console.log(`Status: ${correctStatus ? '✅' : '❌'} ${result.booking?.status || 'N/A'}`)
  console.log(`Deposit Amount: ${correctDeposit ? '✅' : '❌'} £${result.payment_details?.deposit_amount || 0} (expected £${testData.partySize * 5})`)
  
  const success = paymentRequired && hasPayPalUrl && correctStatus && correctDeposit
  
  if (success) {
    console.log(`\n${COLORS.green}${COLORS.bright}✅ PASSED${COLORS.reset}`)
  } else {
    console.log(`\n${COLORS.red}${COLORS.bright}❌ FAILED${COLORS.reset}`)
    if (result.error) {
      console.log(`Error: ${result.error}`)
    }
  }
  
  return { success, result }
}

async function comprehensiveTest() {
  console.log(`${COLORS.bright}🧪 COMPREHENSIVE SUNDAY LUNCH PAYMENT TEST${COLORS.reset}`)
  console.log('=' .repeat(60))
  
  // First, get the menu
  const menuResponse = await fetch('http://localhost:3001/api/menu/sunday-lunch?date=2025-08-17')
  const menuData = await menuResponse.json()
  
  if (!menuData.mains || menuData.mains.length < 2) {
    console.error('Cannot run tests - menu not available')
    return
  }
  
  console.log(`\nMenu loaded: ${menuData.mains.length} items available`)
  console.log(`Using items: ${menuData.mains[0].name} and ${menuData.mains[1].name}`)
  
  const results = []
  
  // Test 1: Normal Sunday lunch booking (2 people)
  results.push(await runTest('2 Person Sunday Lunch', {
    date: "2025-08-17",
    time: "13:00",
    partySize: 2,
    bookingType: "sunday_roast",
    firstName: "Test1",
    lastName: "User",
    phone: "07700900001",
    email: "test1@example.com",
    menuSelections: [
      {
        guest_name: "Guest 1",
        menu_item_id: menuData.mains[0].id,
        item_type: "main",
        quantity: 1,
        price_at_booking: menuData.mains[0].price
      },
      {
        guest_name: "Guest 2",
        menu_item_id: menuData.mains[1].id,
        item_type: "main",
        quantity: 1,
        price_at_booking: menuData.mains[1].price
      }
    ],
    specialRequirements: "",
    marketingOptIn: false
  }))
  
  // Test 2: Larger party (4 people)
  results.push(await runTest('4 Person Sunday Lunch', {
    date: "2025-08-17",
    time: "14:00",
    partySize: 4,
    bookingType: "sunday_roast",
    firstName: "Test2",
    lastName: "User",
    phone: "07700900002",
    email: "test2@example.com",
    menuSelections: [
      {
        guest_name: "Guest 1",
        menu_item_id: menuData.mains[0].id,
        item_type: "main",
        quantity: 1,
        price_at_booking: menuData.mains[0].price
      },
      {
        guest_name: "Guest 2",
        menu_item_id: menuData.mains[1].id,
        item_type: "main",
        quantity: 1,
        price_at_booking: menuData.mains[1].price
      },
      {
        guest_name: "Guest 3",
        menu_item_id: menuData.mains[0].id,
        item_type: "main",
        quantity: 1,
        price_at_booking: menuData.mains[0].price
      },
      {
        guest_name: "Guest 4",
        menu_item_id: menuData.mains[1].id,
        item_type: "main",
        quantity: 1,
        price_at_booking: menuData.mains[1].price
      }
    ],
    specialRequirements: "",
    marketingOptIn: false
  }))
  
  // Test 3: Single person
  results.push(await runTest('1 Person Sunday Lunch', {
    date: "2025-08-17",
    time: "12:30",
    partySize: 1,
    bookingType: "sunday_roast",
    firstName: "Test3",
    lastName: "User",
    phone: "07700900003",
    email: "test3@example.com",
    menuSelections: [
      {
        guest_name: "Guest 1",
        menu_item_id: menuData.mains[0].id,
        item_type: "main",
        quantity: 1,
        price_at_booking: menuData.mains[0].price
      }
    ],
    specialRequirements: "",
    marketingOptIn: false
  }))
  
  // Test 4: WITHOUT menu selections (should still require payment but £0)
  results.push(await runTest('Sunday Lunch WITHOUT Menu Pre-Selection', {
    date: "2025-08-17",
    time: "15:00",
    partySize: 2,
    bookingType: "sunday_roast",
    firstName: "Test4",
    lastName: "User",
    phone: "07700900004",
    email: "test4@example.com",
    menuSelections: [], // Empty!
    specialRequirements: "",
    marketingOptIn: false
  }))
  
  // Test 5: Regular booking on Sunday (NOT Sunday roast)
  results.push(await runTest('Regular Booking on Sunday (No Roast)', {
    date: "2025-08-17",
    time: "18:00",
    partySize: 2,
    bookingType: "regular", // Not sunday_roast!
    firstName: "Test5",
    lastName: "User",
    phone: "07700900005",
    email: "test5@example.com",
    specialRequirements: "",
    marketingOptIn: false
  }))
  
  // Summary
  console.log('\n' + '=' .repeat(60))
  console.log(`${COLORS.bright}📊 TEST SUMMARY${COLORS.reset}`)
  console.log('=' .repeat(60))
  
  const passed = results.filter(r => r.success).length
  const failed = results.length - passed
  
  console.log(`Total Tests: ${results.length}`)
  console.log(`${COLORS.green}Passed: ${passed}${COLORS.reset}`)
  console.log(`${COLORS.red}Failed: ${failed}${COLORS.reset}`)
  
  if (failed === 0) {
    console.log(`\n${COLORS.green}${COLORS.bright}🎉 ALL TESTS PASSED! THE ISSUE IS FIXED!${COLORS.reset}`)
    console.log('\nYou can now confidently test in the browser:')
    console.log('1. Go to http://localhost:3001/book-table')
    console.log('2. Select Sunday Aug 17, 2025')
    console.log('3. Choose "Sunday Roast - Pre-order required"')
    console.log('4. Select menu items')
    console.log('5. You WILL be redirected to PayPal for payment')
  } else {
    console.log(`\n${COLORS.red}${COLORS.bright}⚠️ SOME TESTS FAILED - ISSUE NOT FULLY FIXED${COLORS.reset}`)
    console.log('\nDo NOT test in browser yet. Let me investigate further.')
  }
  
  // Clean up test bookings
  console.log('\n🧹 Cleaning up test bookings...')
  for (const test of results) {
    if (test.result?.reference) {
      try {
        await fetch(`http://localhost:3001/api/booking/${test.result.reference}/cancel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason: 'Test cleanup' })
        })
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }
}

comprehensiveTest().catch(console.error)