#!/usr/bin/env npx tsx

/**
 * Test script for Manager's Special functionality
 * Run with: npx tsx scripts/test-managers-special.ts
 */

import { getCurrentPromotion, getPromotionById, getAllPromotions } from '../lib/managers-special'
import { nowInLondon, getLondonTimeString } from '../lib/time-london'

console.log('🧪 Testing Manager\'s Special System')
console.log('=====================================\n')

// Current time in London
const now = nowInLondon()
console.log(`📅 Current London time: ${getLondonTimeString(now)}`)
console.log(`📅 System timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n`)

// Test current promotion
console.log('1️⃣ Current Promotion:')
const current = getCurrentPromotion()
if (current) {
  console.log(`✅ Active: ${current.spirit.name}`)
  console.log(`   Period: ${current.startDate} to ${current.endDate}`)
  console.log(`   Price: ${current.spirit.specialPrice} (was ${current.spirit.originalPrice})`)
} else {
  console.log('❌ No active promotion')
}

// Test September 1st (force date)
console.log('\n2️⃣ Testing September 1st, 2025:')
const sept1 = new Date('2025-09-01T12:00:00Z')
const septPromo = getCurrentPromotion(sept1)
if (septPromo) {
  console.log(`✅ Will activate: ${septPromo.spirit.name}`)
  console.log(`   Price: ${septPromo.spirit.specialPrice}`)
} else {
  console.log('❌ No promotion for September 1st')
}

// Test August 31st at 23:59:59
console.log('\n3️⃣ Testing August 31st, 2025 at 23:59:59:')
const aug31 = new Date('2025-08-31T23:59:59Z')
const augPromo = getCurrentPromotion(aug31)
if (augPromo) {
  console.log(`✅ Still active: ${augPromo.spirit.name}`)
} else {
  console.log('❌ No promotion for August 31st')
}

// List all promotions
console.log('\n4️⃣ All Configured Promotions:')
const all = getAllPromotions()
all.forEach(p => {
  const status = p.active ? '✅' : '❌'
  console.log(`${status} ${p.id}: ${p.spirit.name} (${p.startDate} to ${p.endDate})`)
})

// Test preview by ID
console.log('\n5️⃣ Testing Preview Mode:')
const preview = getPromotionById('redleg-september-2025')
if (preview) {
  console.log(`✅ Preview available: ${preview.spirit.name}`)
  console.log(`   Can be previewed with: ?preview=redleg-september-2025&token=YOUR_TOKEN`)
} else {
  console.log('❌ September promotion not found')
}

console.log('\n=====================================')
console.log('✨ Test Complete!')

// Check for warnings
if (!current && now.getDate() <= 3) {
  console.log('\n⚠️  WARNING: No active promotion in first days of month!')
}

if (septPromo) {
  console.log('\n✅ September promotion is configured and ready to activate!')
} else {
  console.log('\n❌ CRITICAL: September promotion missing!')
}