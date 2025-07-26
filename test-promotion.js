// Quick test script to verify promotion selection
const { getCurrentPromotion } = require('./lib/managers-special-utils')

const currentPromotion = getCurrentPromotion()

if (currentPromotion) {
  console.log('Active Promotion:', {
    id: currentPromotion.id,
    name: currentPromotion.spirit.name,
    start: currentPromotion.startDate,
    end: currentPromotion.endDate,
    imageFolder: currentPromotion.imageFolder
  })
} else {
  console.log('No active promotion')
}