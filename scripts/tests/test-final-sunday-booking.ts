#!/usr/bin/env npx tsx

/**
 * Final test to confirm Sunday lunch booking with payment works
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

process.env.ANCHOR_API_KEY = 'anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4'

import { AnchorAPI } from '../../lib/api'
const anchorAPI = new AnchorAPI(process.env.ANCHOR_API_KEY)

async function testFinalSundayBooking() {
  console.log('🧪 FINAL TEST: Sunday Lunch Booking with Real Menu IDs\n')
  console.log('=' .repeat(50))
  
  // Get next Sunday
  const today = new Date()
  const daysUntilSunday = (7 - today.getDay()) % 7 || 7
  const nextSunday = new Date(today)
  nextSunday.setDate(today.getDate() + daysUntilSunday)
  const sundayDate = nextSunday.toISOString().split('T')[0]
  
  console.log(`📅 Booking date: ${sundayDate}\n`)
  
  // Step 1: Fetch real menu from API
  console.log('1️⃣ Fetching Sunday lunch menu...')
  const menuResponse = await fetch(`http://localhost:3001/api/menu/sunday-lunch?date=${sundayDate}`)
  const menuData = await menuResponse.json()
  
  if (!menuData.mains || menuData.mains.length === 0) {
    console.error('❌ No menu items available')
    return
  }
  
  console.log('✅ Menu loaded successfully:')
  menuData.mains.forEach((item: any) => {
    console.log(`   - ${item.name}: ${item.id.substring(0, 8)}... (£${item.price})`)
  })
  
  // Step 2: Create booking with real menu selections
  console.log('\n2️⃣ Creating Sunday lunch booking with menu selections...')
  
  const menuSelections = [
    {
      guest_name: 'Guest 1',
      menu_item_id: menuData.mains[0].id,
      item_type: 'main' as const,
      quantity: 1,
      price_at_booking: menuData.mains[0].price
    },
    {
      guest_name: 'Guest 2',
      menu_item_id: menuData.mains[Math.min(1, menuData.mains.length - 1)].id,
      item_type: 'main' as const,
      quantity: 1,
      price_at_booking: menuData.mains[Math.min(1, menuData.mains.length - 1)].price
    }
  ]
  
  console.log('Menu selections:')
  menuSelections.forEach(s => {
    console.log(`   - ${s.guest_name}: £${s.price_at_booking}`)
  })
  
  const totalPrice = menuSelections.reduce((sum, s) => sum + s.price_at_booking, 0)
  const expectedDeposit = menuSelections.length * 5
  
  console.log(`\n💰 Expected deposit: £${expectedDeposit} (£5 per person)`)
  console.log(`💰 Total meal price: £${totalPrice.toFixed(2)}`)
  
  try {
    const booking = await anchorAPI.createTableBooking({
      booking_type: 'sunday_lunch',
      date: sundayDate,
      time: '13:00',
      party_size: 2,
      customer: {
        first_name: 'Final',
        last_name: 'Test',
        mobile_number: '07700900999',
        email: 'finaltest@example.com',
        sms_opt_in: false
      },
      duration_minutes: 120,
      menu_selections: menuSelections,
      special_requirements: 'FINAL TEST - Please delete',
      source: 'test_script'
    } as any)
    
    console.log('\n3️⃣ Booking Response:')
    console.log(`   Reference: ${booking.booking_reference}`)
    console.log(`   Status: ${booking.status}`)
    console.log(`   Payment Required: ${booking.payment_required ? '✅ YES' : '❌ NO'}`)
    
    if (booking.payment_details) {
      console.log('\n💳 Payment Details:')
      console.log(`   Deposit: £${booking.payment_details.deposit_amount}`)
      console.log(`   Total: £${booking.payment_details.total_amount}`)
      console.log(`   PayPal URL: ${booking.payment_details.payment_url}`)
      
      if (booking.payment_details.deposit_amount === expectedDeposit) {
        console.log('\n✅ SUCCESS! Deposit amount is correct!')
      } else {
        console.log(`\n⚠️ WARNING: Expected £${expectedDeposit} deposit, got £${booking.payment_details.deposit_amount}`)
      }
    } else {
      console.log('\n❌ PROBLEM: No payment details returned')
    }
    
    // Clean up
    if (booking.booking_reference && booking.status === 'confirmed') {
      console.log('\n🧹 Cleaning up test booking...')
      try {
        await anchorAPI.cancelTableBooking(booking.booking_reference, 'Test cleanup')
        console.log('✅ Test booking cancelled')
      } catch (err) {
        console.log('⚠️ Could not cancel test booking')
      }
    }
    
  } catch (error: any) {
    console.error('\n❌ Booking failed:', error.message)
    console.error('Details:', error.details || error)
  }
  
  console.log('\n' + '=' .repeat(50))
  console.log('🧪 TEST COMPLETE\n')
  
  console.log('📝 SUMMARY:')
  console.log('If payment was required with correct deposit amount,')
  console.log('the Sunday lunch booking system is working correctly!')
  console.log('\nNext step: Test through the actual website UI to confirm')
  console.log('the user flow redirects to PayPal as expected.')
}

testFinalSundayBooking().catch(console.error)