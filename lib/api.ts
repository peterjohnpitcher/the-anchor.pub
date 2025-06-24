// The Anchor API Service
// Handles all API calls to the management system

const API_BASE_URL = 'https://management.orangejelly.co.uk/api'
const API_KEY = process.env.ANCHOR_API_KEY || 'anch_wzjjWLuMd5osCBUZA7YTAyIKagxI_oboVSXRyYiIHmg'

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
  '@context': string
  '@type': string
  itemListElement: Event[]
  meta: {
    total: number
    page: number
    per_page: number
    last_page: number
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

class AnchorAPI {
  private baseURL: string
  private apiKey: string

  constructor() {
    this.baseURL = API_BASE_URL
    this.apiKey = API_KEY
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'X-API-Key': this.apiKey,
          'Content-Type': 'application/json',
          ...options.headers,
        },
        // Next.js specific caching
        next: { revalidate: 300 }, // Cache for 5 minutes
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `API request failed: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Events
  async getEvents(params: {
    page?: number
    per_page?: number
    status?: 'scheduled' | 'cancelled' | 'postponed'
    category?: string
    from_date?: string
    to_date?: string
    performer?: string
    sort?: 'date' | 'name' | 'created_at'
    order?: 'asc' | 'desc'
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

  async getRecurringEvents(parentId?: string): Promise<EventsResponse> {
    const query = parentId ? `?parent_id=${parentId}` : ''
    return this.request<EventsResponse>(`/events/recurring${query}`)
  }

  async checkEventAvailability(id: string): Promise<{
    event_id: string
    available: boolean
    remaining_capacity: number
    total_capacity: number
    bookings_count: number
  }> {
    return this.request(`/events/${id}/check-availability`)
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
      status: 'scheduled',
      from_date: new Date().toISOString().split('T')[0],
      per_page: limit,
      sort: 'date',
      order: 'asc'
    })
    return response.itemListElement
  } catch (error) {
    console.error('Failed to fetch upcoming events:', error)
    return []
  }
}

export async function getTodaysEvents(): Promise<Event[]> {
  try {
    const response = await anchorAPI.getTodaysEvents()
    return response.itemListElement
  } catch (error) {
    console.error('Failed to fetch today\'s events:', error)
    return []
  }
}

export async function getEventsByCategory(category: string, limit: number = 20): Promise<Event[]> {
  try {
    const response = await anchorAPI.getEvents({
      category,
      status: 'scheduled',
      per_page: limit,
      sort: 'date',
      order: 'asc'
    })
    return response.itemListElement
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
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatPrice(price: string | number, currency: string = 'GBP'): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency
  })
  return formatter.format(typeof price === 'string' ? parseFloat(price) : price)
}