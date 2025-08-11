#!/usr/bin/env npx tsx

/**
 * Test script to verify Sunday lunch booking API behavior
 * This version tests WITHOUT menu selections first
 */

// Load environment variables
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Set the API key in the environment
process.env.ANCHOR_API_KEY = 'anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4'

import { AnchorAPI } from './lib/api'

// Create API instance with the key
const anchorAPI = new AnchorAPI(process.env.ANCHOR_API_KEY)

async function testBookingTypes() {
  console.log('🧪 TESTING DIFFERENT BOOKING TYPES\n')
  console.log('=' .repeat(50))
  
  // Get next Sunday
  const today = new Date()
  const daysUntilSunday = (7 - today.getDay()) % 7 || 7
  const nextSunday = new Date(today)
  nextSunday.setDate(today.getDate() + daysUntilSunday)
  const sundayDate = nextSunday.toISOString().split('T')[0]
  
  // Get tomorrow (weekday)
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const weekdayDate = tomorrow.toISOString().split('T')[0]
  
  // Test 1: Regular booking on weekday
  console.log('\n📋 TEST 1: Regular booking on weekday')
  console.log(`📅 Date: ${weekdayDate}\n`)
  
  try {
    const regularBooking = await anchorAPI.createTableBooking({
      booking_type: 'regular',
      date: weekdayDate,
      time: '19:00',
      party_size: 2,
      customer: {
        first_name: 'Test',
        last_name: 'Regular',
        mobile_number: '07700900001',
        email: 'test1@example.com',
        sms_opt_in: false
      },
      duration_minutes: 120,
      special_requirements: 'TEST BOOKING - DELETE ME',
      source: 'test_script'
    } as any)
    
    console.log('✅ Regular booking created:')
    console.log(`   - Reference: ${regularBooking.booking_reference}`)
    console.log(`   - Status: ${regularBooking.status}`)
    console.log(`   - Payment Required: ${regularBooking.payment_required || 'false'}`)
    
    // Cancel the test booking
    if (regularBooking.booking_reference) {
      await anchorAPI.cancelTableBooking(regularBooking.booking_reference, 'Test cleanup')
      console.log('   - Cancelled: ✓')
    }
  } catch (error: any) {
    console.log('❌ Regular booking failed:', error.message)
  }
  
  // Test 2: Sunday booking with type "regular"
  console.log('\n📋 TEST 2: Regular type booking on Sunday')
  console.log(`📅 Date: ${sundayDate}\n`)
  
  try {
    const sundayRegular = await anchorAPI.createTableBooking({
      booking_type: 'regular',
      date: sundayDate,
      time: '13:00',
      party_size: 2,
      customer: {
        first_name: 'Test',
        last_name: 'SundayReg',
        mobile_number: '07700900002',
        email: 'test2@example.com',
        sms_opt_in: false
      },
      duration_minutes: 120,
      special_requirements: 'TEST BOOKING - DELETE ME',
      source: 'test_script'
    } as any)
    
    console.log('✅ Sunday regular booking created:')
    console.log(`   - Reference: ${sundayRegular.booking_reference}`)
    console.log(`   - Status: ${sundayRegular.status}`)
    console.log(`   - Payment Required: ${sundayRegular.payment_required || 'false'}`)
    
    // Cancel the test booking
    if (sundayRegular.booking_reference) {
      await anchorAPI.cancelTableBooking(sundayRegular.booking_reference, 'Test cleanup')
      console.log('   - Cancelled: ✓')
    }
  } catch (error: any) {
    console.log('❌ Sunday regular booking failed:', error.message)
  }
  
  // Test 3: Sunday lunch booking WITHOUT menu selections
  console.log('\n📋 TEST 3: Sunday lunch type WITHOUT menu selections')
  console.log(`📅 Date: ${sundayDate}\n`)
  
  try {
    const sundayLunchNoMenu = await anchorAPI.createTableBooking({
      booking_type: 'sunday_lunch',
      date: sundayDate,
      time: '13:00',
      party_size: 2,
      customer: {
        first_name: 'Test',
        last_name: 'SundayNoMenu',
        mobile_number: '07700900003',
        email: 'test3@example.com',
        sms_opt_in: false
      },
      duration_minutes: 120,
      special_requirements: 'TEST BOOKING - DELETE ME',
      source: 'test_script'
    } as any)
    
    console.log('✅ Sunday lunch (no menu) booking created:')
    console.log(`   - Reference: ${sundayLunchNoMenu.booking_reference}`)
    console.log(`   - Status: ${sundayLunchNoMenu.status}`)
    console.log(`   - Payment Required: ${sundayLunchNoMenu.payment_required || 'false'}`)
    console.log(`   - Payment URL: ${sundayLunchNoMenu.payment_details?.payment_url || 'none'}`)
    
    // Cancel the test booking
    if (sundayLunchNoMenu.booking_reference) {
      await anchorAPI.cancelTableBooking(sundayLunchNoMenu.booking_reference, 'Test cleanup')
      console.log('   - Cancelled: ✓')
    }
  } catch (error: any) {
    console.log('❌ Sunday lunch (no menu) booking failed:', error.message)
  }
  
  // Test 4: Get actual Sunday lunch menu to find valid IDs
  console.log('\n📋 TEST 4: Fetch Sunday lunch menu to get valid item IDs')
  
  try {
    const menuResponse = await fetch(`http://localhost:3001/api/menu/sunday-lunch?date=${sundayDate}`)
    const menuData = await menuResponse.json()
    
    if (menuData.mains && menuData.mains.length > 0) {
      console.log('✅ Found menu items:')
      menuData.mains.forEach((item: any) => {
        console.log(`   - ${item.id}: ${item.name} (£${item.price})`)
      })
      
      // Test 5: Sunday lunch WITH valid menu selections
      console.log('\n📋 TEST 5: Sunday lunch WITH valid menu selections')
      console.log(`📅 Date: ${sundayDate}\n`)
      
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
      
      console.log('Using menu selections:')
      menuSelections.forEach(s => {
        console.log(`   - ${s.guest_name}: ${s.menu_item_id} (£${s.price_at_booking})`)
      })
      
      try {
        const sundayLunchWithMenu = await anchorAPI.createTableBooking({
          booking_type: 'sunday_lunch',
          date: sundayDate,
          time: '13:00',
          party_size: 2,
          customer: {
            first_name: 'Test',
            last_name: 'SundayWithMenu',
            mobile_number: '07700900004',
            email: 'test4@example.com',
            sms_opt_in: false
          },
          duration_minutes: 120,
          menu_selections: menuSelections,
          special_requirements: 'TEST BOOKING - DELETE ME',
          source: 'test_script'
        } as any)
        
        console.log('\n✅ Sunday lunch WITH menu booking created:')
        console.log(`   - Reference: ${sundayLunchWithMenu.booking_reference}`)
        console.log(`   - Status: ${sundayLunchWithMenu.status}`)
        console.log(`   - Payment Required: ${sundayLunchWithMenu.payment_required || 'false'}`)
        console.log(`   - Payment URL: ${sundayLunchWithMenu.payment_details?.payment_url || 'none'}`)
        
        if (sundayLunchWithMenu.payment_required) {
          console.log('\n🎉 SUCCESS! Payment is required as expected!')
          console.log('   Payment details:', JSON.stringify(sundayLunchWithMenu.payment_details, null, 2))
        } else {
          console.log('\n⚠️  PROBLEM: Payment NOT required despite menu selections')
        }
        
        // Cancel the test booking
        if (sundayLunchWithMenu.booking_reference) {
          await anchorAPI.cancelTableBooking(sundayLunchWithMenu.booking_reference, 'Test cleanup')
          console.log('   - Cancelled: ✓')
        }
      } catch (error: any) {
        console.log('❌ Sunday lunch WITH menu booking failed:', error.message)
        console.log('   Error details:', error.details || error)
      }
    } else {
      console.log('❌ No menu items found')
    }
  } catch (error: any) {
    console.log('❌ Failed to fetch menu:', error.message)
  }
  
  console.log('\n' + '=' .repeat(50))
  console.log('🧪 ALL TESTS COMPLETE')
  console.log('\n📊 SUMMARY:')
  console.log('If Sunday lunch bookings with menu selections do NOT require payment,')
  console.log('then the API backend needs to be configured to handle this booking type.')
}

// Run the tests
testBookingTypes().catch(console.error)