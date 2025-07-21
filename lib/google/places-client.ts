// Google Places API Client
import { PlaceDetails, GoogleReview } from './types'

const GOOGLE_PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place'

export class GooglePlacesClient {
  private apiKey: string
  private placeId: string

  constructor(apiKey: string, placeId: string) {
    this.apiKey = apiKey
    this.placeId = placeId
  }

  async getPlaceDetails(): Promise<PlaceDetails | null> {
    try {
      const url = `${GOOGLE_PLACES_API_BASE}/details/json?` + 
        `place_id=${this.placeId}&` +
        `fields=place_id,name,formatted_address,rating,user_ratings_total,reviews,url,website,geometry&` +
        `key=${this.apiKey}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.status === 'OK' && data.result) {
        return data.result as PlaceDetails
      }

      console.error('Google Places API error:', data.status, data.error_message)
      return null
    } catch (error) {
      console.error('Failed to fetch place details:', error)
      return null
    }
  }

  async getReviews(): Promise<GoogleReview[]> {
    const details = await this.getPlaceDetails()
    return details?.reviews || []
  }

  // Get aggregate rating info
  async getRatingInfo(): Promise<{ rating: number; totalReviews: number } | null> {
    const details = await this.getPlaceDetails()
    if (!details) return null

    return {
      rating: details.rating || 0,
      totalReviews: details.user_ratings_total || 0
    }
  }
}

// Singleton instance for The Anchor
let anchorPlacesClient: GooglePlacesClient | null = null

export function getAnchorPlacesClient(): GooglePlacesClient | null {
  if (!process.env.GOOGLE_PLACES_API_KEY || !process.env.GOOGLE_PLACE_ID) {
    console.warn('Google Places API credentials not configured')
    return null
  }

  if (!anchorPlacesClient) {
    anchorPlacesClient = new GooglePlacesClient(
      process.env.GOOGLE_PLACES_API_KEY,
      process.env.GOOGLE_PLACE_ID
    )
  }

  return anchorPlacesClient
}