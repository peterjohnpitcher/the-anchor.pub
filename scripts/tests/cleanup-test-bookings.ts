#!/usr/bin/env npx tsx

/**
 * Script to delete test bookings while keeping real customer bookings
 * Keeps: Jo Barr (Aug 8), Hannah Mersah (Aug 9), Jo Rolt (Aug 10)
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Set the API key
process.env.ANCHOR_API_KEY = 'anch_iPRE-XAgeN-D5QcfNTy_DxDbi1kZcrWg110ZroLotY4'

import { AnchorAPI } from '../../lib/api'

const anchorAPI = new AnchorAPI(process.env.ANCHOR_API_KEY)

// Real bookings to keep
const REAL_BOOKINGS = [
  { name: 'Jo Barr', date: '2025-08-08' },
  { name: 'Hannah Mersah', date: '2025-08-09' },
  { name: 'Jo Rolt', date: '2025-08-10' }
]

async function cleanupTestBookings() {
  console.log('🧹 CLEANING UP TEST BOOKINGS\n')
  console.log('='.repeat(60))
  
  console.log('📋 Will KEEP these real bookings:')
  REAL_BOOKINGS.forEach(b => {
    console.log(`   ✓ ${b.name} - ${b.date}`)
  })
  console.log('\n' + '='.repeat(60) + '\n')

  try {
    // Get list of all bookings
    // Note: We'll need to check what endpoint is available for listing bookings
    console.log('⚠️  Note: The API may not have a list endpoint available.')
    console.log('    You may need to manually delete test bookings through the management system.')
    console.log('\n📝 Test booking patterns to look for and delete:')
    console.log('   - First names: Test, APIv2, Storage, Custom, Sunday')
    console.log('   - Last names: User, Test, Booking')
    console.log('   - Email domains: @example.com, @test.com')
    console.log('   - Special requirements containing: "test", "please delete", "TEST BOOKING"')
    console.log('\n🔍 Known test booking references from our logs:')
    
    // List known test booking references from recent tests
    const testBookingRefs = [
      'TB-2025-1372', // APIv2 Test from our recent test
      'TB-2025-1067', // Another APIv2 test (duplicate attempt)
      'TB-2025-4460', // From earlier test
    ]
    
    console.log('   These were created during testing:')
    testBookingRefs.forEach(ref => {
      console.log(`   - ${ref}`)
    })
    
    console.log('\n' + '='.repeat(60))
    console.log('\n🗑️  Attempting to cancel known test bookings...\n')
    
    // Try to cancel each known test booking
    for (const ref of testBookingRefs) {
      try {
        console.log(`   Cancelling ${ref}...`)
        await anchorAPI.cancelTableBooking(ref, 'Test booking cleanup - not a real customer')
        console.log(`   ✅ Successfully cancelled ${ref}`)
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message
        if (errorMessage?.includes('not found') || errorMessage?.includes('does not exist')) {
          console.log(`   ⏭️  ${ref} - Already deleted or doesn't exist`)
        } else if (errorMessage?.includes('cannot be cancelled')) {
          console.log(`   ⚠️  ${ref} - Cannot be cancelled (may need payment completion first)`)
        } else {
          console.log(`   ❌ ${ref} - Error: ${errorMessage}`)
        }
      }
    }
    
    console.log('\n' + '='.repeat(60))
    console.log('\n📊 SUMMARY:')
    console.log('\n✅ Real bookings preserved:')
    REAL_BOOKINGS.forEach(b => {
      console.log(`   - ${b.name} on ${b.date}`)
    })
    
    console.log('\n📌 Next steps:')
    console.log('1. Check the management system for any remaining test bookings')
    console.log('2. Look for bookings with these characteristics:')
    console.log('   - Names containing "Test", "APIv2", "Storage", "Custom"')
    console.log('   - Email addresses with @example.com or @test.com')
    console.log('   - Special requirements mentioning "test" or "please delete"')
    console.log('3. Manually delete any test bookings not caught by this script')
    console.log('\n⚠️  IMPORTANT: Do NOT delete bookings from:')
    console.log('   - Jo Barr (August 8th)')
    console.log('   - Hannah Mersah (August 9th)') 
    console.log('   - Jo Rolt (August 10th)')
    
  } catch (error: any) {
    console.error('\n❌ Error during cleanup:', error.message)
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('🧹 CLEANUP COMPLETE')
}

// Run the cleanup
cleanupTestBookings().catch(console.error)