import { NextResponse } from 'next/server'
import { getAnchorPlacesClient } from '@/lib/google/places-client'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const hasApiKey = !!process.env.GOOGLE_PLACES_API_KEY
    const hasPlaceId = !!process.env.GOOGLE_PLACE_ID
    
    let apiStatus = 'not_configured'
    let apiError = null
    let placeInfo = null
    
    if (hasApiKey && hasPlaceId) {
      const client = getAnchorPlacesClient()
      if (client) {
        try {
          const details = await client.getPlaceDetails()
          if (details) {
            apiStatus = 'working'
            placeInfo = {
              name: details.name,
              rating: details.rating,
              totalReviews: details.user_ratings_total,
              reviewsAvailable: details.reviews?.length || 0
            }
          } else {
            apiStatus = 'error'
            apiError = 'No data returned from API'
          }
        } catch (error: any) {
          apiStatus = 'error'
          apiError = error.message || 'Unknown error'
        }
      }
    }
    
    return NextResponse.json({
      status: 'ok',
      config: {
        hasApiKey,
        hasPlaceId,
        placeId: hasPlaceId ? process.env.GOOGLE_PLACE_ID : null
      },
      api: {
        status: apiStatus,
        error: apiError,
        placeInfo
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}