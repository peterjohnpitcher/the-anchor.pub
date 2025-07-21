#!/usr/bin/env node

/**
 * Test script for Google Reviews integration
 * Verifies API connection and review fetching
 */

require('dotenv').config({ path: '.env.local' })
const https = require('https')

// Configuration
const API_KEY = process.env.GOOGLE_PLACES_API_KEY
const PLACE_ID = process.env.GOOGLE_PLACE_ID

if (!API_KEY || !PLACE_ID) {
  console.error('❌ Missing required environment variables:')
  if (!API_KEY) console.error('   - GOOGLE_PLACES_API_KEY')
  if (!PLACE_ID) console.error('   - GOOGLE_PLACE_ID')
  process.exit(1)
}

console.log('🔍 Testing Google Reviews Integration\n')
console.log('📍 Place ID:', PLACE_ID)
console.log('🔑 API Key:', API_KEY.substring(0, 10) + '...' + API_KEY.substring(API_KEY.length - 4))
console.log('')

// Test Place Details API
const testPlaceDetails = () => {
  return new Promise((resolve, reject) => {
    const fields = 'place_id,name,formatted_address,rating,user_ratings_total,reviews,url,website,geometry'
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=${fields}&key=${API_KEY}`
    
    console.log('🔗 Testing Google Places API...')
    
    https.get(url, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data)
          
          if (response.status === 'OK') {
            console.log('✅ API Connection Successful!\n')
            
            const place = response.result
            console.log('📍 Business Details:')
            console.log('   Name:', place.name || 'Not found')
            console.log('   Address:', place.formatted_address || 'Not found')
            console.log('   Rating:', place.rating || 'No rating')
            console.log('   Total Reviews:', place.user_ratings_total || 0)
            console.log('   Google Maps URL:', place.url || 'Not found')
            console.log('')
            
            if (place.reviews && place.reviews.length > 0) {
              console.log(`📝 Found ${place.reviews.length} recent reviews:`)
              place.reviews.forEach((review, index) => {
                console.log(`\n   Review ${index + 1}:`)
                console.log(`   ⭐ Rating: ${review.rating}/5`)
                console.log(`   👤 Author: ${review.author_name}`)
                console.log(`   📅 Posted: ${review.relative_time_description}`)
                console.log(`   💬 "${review.text.substring(0, 100)}${review.text.length > 100 ? '...' : ''}"`)
              })
            } else {
              console.log('⚠️  No reviews found in API response')
            }
            
            resolve(response)
          } else {
            console.error('❌ API Error:', response.status)
            console.error('   Message:', response.error_message || 'Unknown error')
            
            if (response.status === 'REQUEST_DENIED') {
              console.error('\n💡 Possible causes:')
              console.error('   - API key restrictions (check allowed domains/IPs)')
              console.error('   - Places API not enabled in Google Cloud Console')
              console.error('   - Billing not set up for the project')
            }
            
            reject(new Error(response.error_message || response.status))
          }
        } catch (error) {
          console.error('❌ Failed to parse response:', error.message)
          console.error('   Raw response:', data.substring(0, 200))
          reject(error)
        }
      })
    }).on('error', (error) => {
      console.error('❌ Network error:', error.message)
      reject(error)
    })
  })
}

// Test the internal API endpoint
const testInternalAPI = async () => {
  console.log('\n🔗 Testing internal API endpoint...')
  
  try {
    // Import the route handler directly for testing
    const { GET } = require('../app/api/reviews/route.ts')
    
    // Create a mock request
    const mockRequest = new Request('http://localhost:3000/api/reviews?minRating=4&limit=5')
    
    const response = await GET(mockRequest)
    const data = await response.json()
    
    if (data.reviews) {
      console.log('✅ Internal API working!')
      console.log(`   Source: ${data.source}`)
      console.log(`   Reviews: ${data.reviews.length}`)
      console.log(`   Rating: ${data.rating}`)
      console.log(`   Total Reviews: ${data.totalReviews}`)
    } else {
      console.log('❌ Internal API error:', data.error)
    }
  } catch (error) {
    console.log('⚠️  Cannot test internal API directly (requires Next.js runtime)')
    console.log('   Run "npm run dev" and visit http://localhost:3000/api/reviews to test')
  }
}

// Run tests
const runTests = async () => {
  try {
    await testPlaceDetails()
    await testInternalAPI()
    
    console.log('\n✅ All tests completed!')
    console.log('\n📋 Next steps:')
    console.log('   1. If API is restricted to production, deploy and test there')
    console.log('   2. Check the website to see reviews displaying correctly')
    console.log('   3. Monitor API usage in Google Cloud Console')
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    process.exit(1)
  }
}

runTests()