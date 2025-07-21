// Google Reviews Types

export interface GoogleReview {
  author_name: string
  author_url?: string
  language: string
  original_language?: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
  translated?: boolean
}

export interface PlaceDetails {
  place_id: string
  name: string
  formatted_address: string
  rating?: number
  user_ratings_total?: number
  reviews?: GoogleReview[]
  url?: string
  website?: string
  geometry?: {
    location: {
      lat: number
      lng: number
    }
  }
}

export interface ReviewsFilter {
  minRating?: number
  maxRating?: number
  keywords?: string[]
  dateFrom?: Date
  dateTo?: Date
  limit?: number
  sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest'
}

export interface CachedReviews {
  reviews: GoogleReview[]
  rating: number
  totalReviews: number
  lastUpdated: Date
  source: 'places' | 'mybusiness'
}