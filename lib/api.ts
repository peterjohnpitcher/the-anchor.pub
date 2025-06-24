// The Anchor API Service
// Handles all API calls to the management system

const API_BASE_URL = 'https://management.orangejelly.co.uk/api'

// Types based on API documentation
export interface Event {
  '@type': 'Event'
  id: string
  slug: string
  name: string
  description: string | null
  shortDescription?: string | null
  longDescription?: string | null
  highlights?: string[]
  keywords?: string[]
  startDate: string
  endDate?: string | null
  lastEntryTime?: string | null
  eventStatus: string
  eventAttendanceMode: string
  location: {
    '@type': 'Place'
    name: string
    address: {
      '@type': 'PostalAddress'
      streetAddress: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
  }
  performer?: {
    '@type': 'MusicGroup' | 'Person' | 'Organization'
    name: string
  }
  offers?: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    availability: string
    validFrom: string
    url?: string
    inventoryLevel?: {
      '@type': 'QuantitativeValue'
      value: number
    }
  }
  image?: string[]
  heroImageUrl?: string | null
  thumbnailImageUrl?: string | null
  posterImageUrl?: string | null
  galleryImages?: string[]
  promoVideoUrl?: string | null
  highlightVideos?: string[]
  organizer?: {
    '@type': 'Organization'
    name: string
    url?: string
  }
  isAccessibleForFree?: boolean
  remainingAttendeeCapacity?: number
  maximumAttendeeCapacity?: number
  metaTitle?: string | null
  metaDescription?: string | null
  category?: {
    id: string
    name: string
    slug: string
    color: string
    icon?: string
  }
  booking_rules?: {
    max_seats_per_booking: number
    requires_customer_details: boolean
    allows_notes: boolean
    sms_confirmation_enabled: boolean
  }
  custom_messages?: {
    confirmation?: string
    reminder?: string
  }
  mainEntityOfPage?: {
    '@type': 'WebPage'
    '@id': string
  }
  potentialAction?: {
    '@type': 'ReserveAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
      inLanguage: string
    }
    result: {
      '@type': 'Reservation'
      name: string
    }
  }
  faqPage?: {
    '@type': 'FAQPage'
    mainEntity: Array<{
      '@type': 'Question'
      name: string
      acceptedAnswer: {
        '@type': 'Answer'
        text: string
      }
    }>
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
  regularHours: {
    [key: string]: {
      opens: string
      closes: string
      kitchen?: {
        opens: string
        closes: string
      } | null
      is_closed: boolean
    }
  }
  specialHours: Array<{
    date: string
    opens?: string
    closes?: string
    is_closed: boolean
    reason?: string
  }>
  currentStatus: {
    isOpen: boolean
    kitchenOpen: boolean
    closesIn: string | null
    opensIn: string | null
  }
  timezone: string
  lastUpdated: string
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

  async getEvent(idOrSlug: string): Promise<Event> {
    try {
      // Try the individual event endpoint first (supports both ID and slug)
      return await this.request<Event>(`/events/${idOrSlug}`)
    } catch (error: any) {
      // If individual endpoint fails, fallback to searching in events list
      if (error?.status === 404 || error?.message?.includes('NOT_FOUND')) {
        console.log('Individual event endpoint failed, trying events list fallback')
        const eventsResponse = await this.getEvents({ limit: 100 })
        const event = eventsResponse.events.find(e => e.id === idOrSlug || e.slug === idOrSlug)
        if (event) {
          return event
        }
      }
      throw error
    }
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
    // Use shorter cache for business hours to ensure current status is accurate
    return this.request<BusinessHours>('/business/hours', {
      next: { revalidate: 60 } // Cache for only 1 minute
    })
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

// Helper function for business hours
export async function getBusinessHours(): Promise<BusinessHours | null> {
  try {
    return await anchorAPI.getBusinessHours()
  } catch (error) {
    console.error('Failed to fetch business hours:', error)
    return null
  }
}

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
  // Parse the date string and display in UK timezone
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/London'
  })
}

export function formatEventTime(dateString: string): string {
  // Parse the date and extract time in UK timezone
  const date = new Date(dateString)
  
  // Use Intl.DateTimeFormat to get the time in UK timezone
  const timeString = date.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Europe/London'
  })
  
  // Convert to the desired format (8pm instead of 8:00 pm)
  return timeString.replace(':00 ', '').replace(' ', '')
}

export function formatPrice(price: string | number, currency: string = 'GBP'): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency
  })
  return formatter.format(typeof price === 'string' ? parseFloat(price) : price)
}

export function isEventSoldOut(event: Event): boolean {
  return event.remainingAttendeeCapacity === 0 || 
    event.offers?.availability === 'https://schema.org/SoldOut'
}

export function isEventFree(event: Event): boolean {
  return event.isAccessibleForFree === true || 
    event.offers?.price === '0' || 
    event.offers?.price === '0.00'
}

export function getEventShortDescription(event: Event, maxLength: number = 150): string {
  // Use shortDescription if available
  if (event.shortDescription) {
    return event.shortDescription
  }
  
  // Otherwise use description
  if (!event.description) {
    // Generate a default description based on event type
    const name = event.name.toLowerCase()
    if (name.includes('drag')) {
      return 'Join us for a spectacular drag performance featuring amazing costumes, comedy, and entertainment.'
    } else if (name.includes('quiz')) {
      return 'Test your knowledge at our popular quiz night. Great prizes to be won!'
    } else if (name.includes('bingo')) {
      return 'Eyes down for a fun-filled bingo session with cash prizes.'
    } else if (name.includes('music') || name.includes('band')) {
      return 'Live music performance featuring talented local artists.'
    } else if (name.includes('tasting')) {
      return 'Join us for an exclusive tasting event with expert guidance.'
    } else if (name.includes('roast')) {
      return 'Traditional British Sunday roast with all the trimmings.'
    }
    return `Join us for ${event.name} at The Anchor.`
  }
  
  // Truncate long descriptions
  if (event.description.length > maxLength) {
    return event.description.substring(0, maxLength).trim() + '...'
  }
  
  return event.description
}