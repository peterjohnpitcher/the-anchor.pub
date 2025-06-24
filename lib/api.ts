// The Anchor API Service
// Handles all API calls to the management system

const API_BASE_URL = 'https://management.orangejelly.co.uk/api'

// Types based on API documentation
export interface Event {
  '@type': 'Event'
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  eventStatus: string
  location: {
    '@type': 'Place'
    name: string
    address: {
      '@type': 'PostalAddress'
      streetAddress: string
      addressLocality: string
      postalCode: string
      addressCountry: string
    }
  }
  performer?: {
    '@type': 'MusicGroup' | 'Person'
    name: string
  }
  offers?: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    availability: string
    validFrom: string
    url?: string
  }
  image?: string[]
  remainingAttendeeCapacity?: number
  maximumAttendeeCapacity?: number
  category?: {
    id: string
    name: string
    color: string
  }
}

export interface EventsResponse {
  events: Event[]
  meta: {
    total: number
    limit: number
    offset: number
  }
}

export interface MenuItem {
  '@type': 'MenuItem'
  name: string
  description: string
  offers: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
  }
  nutrition?: {
    '@type': 'NutritionInformation'
    calories: string
  }
  suitableForDiet?: string[]
  menuAddOn?: MenuItem[]
}

export interface MenuSection {
  '@type': 'MenuSection'
  name: string
  hasMenuItem: MenuItem[]
}

export interface MenuResponse {
  '@context': string
  '@type': 'Menu'
  name: string
  hasMenuSection: MenuSection[]
}

export interface BusinessHours {
  '@context': string
  '@type': 'FoodEstablishment'
  name: string
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  specialOpeningHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification'
    validFrom: string
    validThrough: string
    opens: string
    closes: string
    description: string
  }>
}

export class AnchorAPI {
  private baseURL: string
  private apiKey: string

  constructor(apiKey?: string) {
    this.baseURL = API_BASE_URL
    this.apiKey = apiKey || process.env.ANCHOR_API_KEY || ''
    
    if (!this.apiKey) {
      console.warn('ANCHOR_API_KEY is not set. API calls will fail.')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    try {
      // Try both authentication methods as documented
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      // Add authentication header (using X-API-Key as recommended)
      if (this.apiKey) {
        headers['X-API-Key'] = this.apiKey
      }
      
      // Merge with any provided headers
      if (options.headers) {
        Object.assign(headers, options.headers)
      }
      
      
      const response = await fetch(url, {
        ...options,
        headers,
        // Next.js specific caching
        next: { revalidate: 300 }, // Cache for 5 minutes
      })

      if (!response.ok) {
        let errorMessage = `API request failed: ${response.status}`
        
        try {
          const errorData = await response.json()
          if (errorData.error) {
            errorMessage = errorData.error
          } else if (errorData.message) {
            errorMessage = errorData.message
          }
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = `${response.status} ${response.statusText}`
        }
        
        // Log specific error codes for debugging
        if (response.status === 401) {
          console.error('Authentication failed. Check ANCHOR_API_KEY environment variable.')
        } else if (response.status === 429) {
          console.error('Rate limit exceeded. Please try again later.')
        }
        
        throw { message: errorMessage, status: response.status }
      }

      return response.json()
    } catch (error) {
      console.error('API Error:', error)
      // Re-throw the error with proper structure
      throw error
    }
  }

  // Events
  async getEvents(params: {
    from_date?: string
    to_date?: string
    category_id?: string
    limit?: number
    offset?: number
  } = {}): Promise<EventsResponse> {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, value.toString())
      }
    })
    
    return this.request<EventsResponse>(`/events?${query.toString()}`)
  }

  async getEvent(id: string): Promise<Event> {
    return this.request<Event>(`/events/${id}`)
  }

  async getTodaysEvents(): Promise<EventsResponse> {
    return this.request<EventsResponse>('/events/today')
  }

  async getEventCategories(): Promise<any> {
    return this.request('/event-categories')
  }


  // Menu
  async getMenu(): Promise<MenuResponse> {
    return this.request<MenuResponse>('/menu')
  }

  async getMenuSpecials(): Promise<{
    specials: MenuItem[]
  }> {
    return this.request('/menu/specials')
  }

  async getDietaryMenu(type: 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-free'): Promise<MenuResponse> {
    return this.request<MenuResponse>(`/menu/dietary/${type}`)
  }

  // Business Information
  async getBusinessHours(): Promise<BusinessHours> {
    return this.request<BusinessHours>('/business/hours')
  }

  async getAmenities(): Promise<{
    amenities: {
      accessibility: {
        wheelchairAccessible: boolean
        accessibleParking: boolean
        accessibleRestrooms: boolean
        assistanceAnimalsAllowed: boolean
      }
      facilities: {
        wifi: boolean
        parking: boolean
        outdoorSeating: boolean
        privateRooms: boolean
        liveMusic: boolean
        sportsTv: boolean
      }
      services: {
        reservations: boolean
        catering: boolean
        privateEvents: boolean
        delivery: boolean
        takeaway: boolean
      }
      payments: {
        acceptsCash: boolean
        acceptsCards: boolean
        acceptsContactless: boolean
        acceptsMobilePayments: boolean
      }
      capacity: {
        total: number
        restaurant: number
        bar: number
        privateRoom: number
      }
    }
  }> {
    return this.request('/business/amenities')
  }
}

// Export singleton instance
export const anchorAPI = new AnchorAPI()

// Helper functions for common use cases
export async function getUpcomingEvents(limit: number = 10): Promise<Event[]> {
  try {
    const response = await anchorAPI.getEvents({
      from_date: new Date().toISOString().split('T')[0],
      limit,
    })
    return response.events || []
  } catch (error) {
    console.error('Failed to fetch upcoming events:', error)
    return []
  }
}

export async function getTodaysEvents(): Promise<Event[]> {
  try {
    const response = await anchorAPI.getTodaysEvents()
    return response.events || []
  } catch (error) {
    console.error('Failed to fetch today\'s events:', error)
    return []
  }
}

export async function getEventsByCategory(category: string, limit: number = 20): Promise<Event[]> {
  try {
    const response = await anchorAPI.getEvents({
      category_id: category,
      limit,
    })
    return response.events || []
  } catch (error) {
    console.error(`Failed to fetch events for category ${category}:`, error)
    return []
  }
}

// Format helpers
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatEventTime(dateString: string): string {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? 'pm' : 'am'
  const displayHours = hours % 12 || 12
  
  if (minutes === 0) {
    return `${displayHours}${period}`
  }
  return `${displayHours}:${minutes.toString().padStart(2, '0')}${period}`
}

export function formatPrice(price: string | number, currency: string = 'GBP'): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency
  })
  return formatter.format(typeof price === 'string' ? parseFloat(price) : price)
}