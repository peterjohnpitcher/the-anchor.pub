// The Anchor API Service
// Handles all API calls to the management system

import { logError } from '@/lib/error-handling'

// Use internal API routes to avoid CORS issues and keep API key secure
const API_BASE_URL = typeof window === 'undefined' 
  ? 'https://management.orangejelly.co.uk/api'  // Server-side: direct API calls
  : '/api'  // Client-side: use Next.js API routes

// API Response wrapper types
export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

// Types based on API documentation
export interface Event {
  '@type': 'Event'
  id: string
  slug: string
  name: string
  description: string | null // Short description (same as shortDescription)
  shortDescription?: string | null
  longDescription?: string | null
  highlights?: string[]
  keywords?: string | string[] // Can be string or array
  startDate: string
  endDate?: string | null
  doorTime?: string | null // New field: doors open time
  duration?: string | null // New field: ISO 8601 duration
  about?: string | null // New field: extended description
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
  video?: string[] // New field: event video URLs
  heroImageUrl?: string | null // Legacy field
  thumbnailImageUrl?: string | null // Legacy field
  posterImageUrl?: string | null // Legacy field
  galleryImages?: string[] // Legacy field
  promoVideoUrl?: string | null // Legacy field
  highlightVideos?: string[] // Legacy field
  organizer?: {
    '@type': 'Organization'
    name: string
    url?: string
  }
  isAccessibleForFree?: boolean
  remainingAttendeeCapacity?: number // Available seats
  maximumAttendeeCapacity?: number // Total capacity
  url?: string // New field: event page URL
  identifier?: string // New field: same as id
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
  faq?: Array<{ // Updated field name from faqPage
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
  faqPage?: { // Keep legacy field for compatibility
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
  pagination: {
    total: number
    limit: number
    offset: number
  }
}

// New types for booking functionality
export interface BookingInitiation {
  event_id: string
  mobile_number: string
}

export interface BookingInitiationResponse {
  status: 'pending'
  booking_token: string
  confirmation_url: string
  expires_at: string
  event: {
    id: string
    name: string
    date: string
    time: string
    available_seats: number
  }
  customer_exists: boolean
  sms_sent: boolean
}

// Event availability check
export interface EventAvailability {
  available: boolean
  event_id: string
  capacity: number
  booked: number
  remaining: number
  percentage_full: number
}

// Event categories
export interface EventCategory {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
  is_active: boolean
  default_start_time: string
  default_capacity: number
  event_count: number
}

export interface EventCategoriesResponse {
  categories: EventCategory[]
  meta: {
    total: number
    lastUpdated: string
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

// Kitchen status types
export type KitchenOpen = {
  opens: string
  closes: string
}

export type KitchenClosed = {
  is_closed: true
}

export type KitchenStatus = KitchenOpen | KitchenClosed | null

export interface BusinessHours {
  regularHours: {
    [key: string]: {
      opens: string
      closes: string
      kitchen?: KitchenStatus
      is_closed: boolean
    }
  }
  specialHours: Array<{
    date: string
    opens?: string
    closes?: string
    is_closed: boolean
    status?: 'closed' | 'modified'
    reason?: string
    note?: string
    kitchen?: KitchenStatus
  }>
  currentStatus: {
    isOpen: boolean
    kitchenOpen: boolean
    closesIn: string | null
    opensIn: string | null
    // Optional new fields for future API version
    currentTime?: string
    timestamp?: string
    services?: {
      venue: {
        open: boolean
        closesIn: string | null
      }
      kitchen: {
        open: boolean
        closesIn: string | null
      }
      bookings: {
        accepting: boolean
        availableSlots: string[]
      }
    }
    capacity?: {
      total: number
      available: number
      percentageFull: number
    }
  }
  // Optional new fields for future API version
  today?: {
    date: string
    dayName: string
    summary: string
    isSpecialHours: boolean
    events: Array<{
      title: string
      time: string
      affectsCapacity: boolean
    }>
  }
  upcomingWeek?: Array<{
    date: string
    dayName: string
    status: 'normal' | 'modified' | 'closed'
    summary: string
    note: string | null
  }>
  patterns?: {
    regularClosures: string[]
    typicalBusyTimes: {
      [key: string]: string[]
    }
    quietTimes: {
      [key: string]: string[]
    }
  }
  services?: {
    kitchen: {
      lunch?: {
        start: string
        end: string
      }
      dinner?: {
        start: string
        end: string
      }
      sundayLunch?: {
        available: boolean
        slots: string[]
        bookingRequired: boolean
        lastOrderTime: string
      }
    }
    bar: {
      happyHour?: {
        days: string[]
        start: string
        end: string
      }
    }
    privateHire: {
      available: boolean
      minimumNotice: string
      spaces: string[]
    }
  }
  planning?: {
    nextClosure?: {
      date: string
      reason: string
    }
    nextModifiedHours?: {
      date: string
      reason: string
      changes: string
    }
    seasonalChanges?: {
      summerHours?: {
        active: boolean
        period: string
        changes: string
      }
    }
  }
  integration?: {
    bookingApi: string
    eventsApi: string
    lastUpdated: string
    updateFrequency: string
  }
  timezone: string
  lastUpdated: string
}

// Table Booking Types
export interface TableAvailabilitySlot {
  time: string
  available?: boolean
  available_capacity: number
  reason?: string
  requires_prepayment?: boolean
}

export interface TableAvailabilityResponse {
  date: string
  day?: string
  available: boolean
  time_slots: TableAvailabilitySlot[]
  kitchen_hours?: {
    opens: string
    closes: string
  } | null
  message?: string
  time?: string
  party_size?: number
  remaining_capacity?: number
}

export interface TableBookingRequest {
  // Required fields
  booking_type: 'regular' | 'sunday_lunch'
  date: string
  time: string
  party_size: number
  customer: {
    first_name: string
    last_name: string
    email?: string
    mobile_number: string
    sms_opt_in?: boolean
  }
  // Optional fields
  duration_minutes?: number  // 60-240, default: 120
  special_requirements?: string
  dietary_requirements?: string[]  // Array of dietary needs
  allergies?: string[]  // Array of allergies
  celebration_type?: string  // birthday, anniversary, etc.
  source?: string  // website, phone, walk-in, social_media (default: website)
  // Legacy fields for backward compatibility
  customer_name?: string
  customer_first_name?: string
  customer_last_name?: string
  customer_phone?: string
  occasion?: string  // UI field that gets mapped to celebration_type
  marketing_opt_in?: boolean
}

export interface TableBookingResponse {
  booking_id: string
  booking_reference: string
  status: 'confirmed' | 'pending' | 'cancelled' | 'pending_payment'
  customer_id?: string
  // New API format uses confirmation_details instead of booking_details
  confirmation_details?: {
    date: string
    time: string
    party_size: number
    duration_minutes: number
    special_requirements?: string
    occasion?: string
  }
  // Keep booking_details for backward compatibility
  booking_details?: {
    date: string
    time: string
    party_size: number
    duration_minutes: number
    special_requirements?: string
    occasion?: string
  }
  confirmation_sent: boolean
  sms_status?: string
  payment_details?: {
    amount: number
    currency: string
    payment_url: string
    expires_at: string
  }
  cancellation_policy?: string
}

export interface SundayLunchMenuItem {
  name: string
  description?: string
  price: number
  dietary?: string[]
}

export interface SundayLunchMenuResponse {
  menu: {
    starters: SundayLunchMenuItem[]
    mains: SundayLunchMenuItem[]
    desserts: SundayLunchMenuItem[]
  }
  service_times: {
    start: string
    end: string
  }
  last_updated: string
}

export class AnchorAPI {
  private baseURL: string
  private apiKey: string

  constructor(apiKey?: string) {
    this.baseURL = API_BASE_URL
    this.apiKey = apiKey || process.env.ANCHOR_API_KEY || ''
    
    // Only warn on server-side where API key is expected
    if (!this.apiKey && typeof window === 'undefined') {
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
        let errorCode = 'UNKNOWN_ERROR'
        let errorMessage = `API request failed: ${response.status}`
        let errorDetails: any = {}
        
        try {
          const errorData = await response.json()
          
          // Handle API error wrapper format
          if (errorData.success === false && errorData.error) {
            errorCode = errorData.error.code || errorCode
            errorMessage = errorData.error.message || errorMessage
            errorDetails = errorData.error.details || {}
          } else if (errorData.error) {
            errorMessage = errorData.error
          } else if (errorData.message) {
            errorMessage = errorData.message
          }
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = `${response.status} ${response.statusText}`
        }
        
        // Map HTTP status to error codes
        if (response.status === 401) {
          errorCode = 'UNAUTHORIZED'
          console.error('Authentication failed. Check ANCHOR_API_KEY environment variable.')
        } else if (response.status === 403) {
          errorCode = 'FORBIDDEN'
        } else if (response.status === 404) {
          errorCode = 'NOT_FOUND'
        } else if (response.status === 429) {
          errorCode = 'RATE_LIMIT_EXCEEDED'
          console.error('Rate limit exceeded. Please try again later.')
        } else if (response.status >= 500) {
          errorCode = 'INTERNAL_ERROR'
        }
        
        throw { 
          code: errorCode,
          message: errorMessage, 
          status: response.status,
          details: errorDetails
        }
      }

      const data = await response.json()
      
      // Handle API success wrapper format
      if (data.success === false && data.error) {
        throw {
          code: data.error.code || 'API_ERROR',
          message: data.error.message || 'API request failed',
          status: response.status,
          details: data.error.details || {}
        }
      }
      
      // Extract data from wrapper if present
      if (data.success === true && data.data) {
        return data.data
      }
      
      // Some endpoints return data directly without wrapper (legacy format)
      // Check if this looks like valid data (not an error)
      if (!data.error && !data.success) {
        return data
      }
      
      // If no wrapper format and no direct data, this is likely an error
      throw {
        code: 'INVALID_RESPONSE',
        message: 'Invalid API response format',
        status: response.status,
        details: { response: data }
      }
    } catch (error: any) {
      // Ensure error has proper structure
      const structuredError = {
        code: error.code || 'NETWORK_ERROR',
        message: error.message || 'Network request failed',
        status: error.status || 0,
        details: error.details || {}
      }
      
      logError('api-request', structuredError, { 
        endpoint, 
        url,
        method: options.method || 'GET' 
      })
      
      throw structuredError
    }
  }

  // Events
  async getEvents(params: {
    from_date?: string
    to_date?: string
    category_id?: string
    available_only?: boolean
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
      // Try the individual event endpoint first
      return await this.request<Event>(`/events/${idOrSlug}`)
    } catch (error: any) {
      // If individual endpoint fails, fallback to searching in events list
      // This ensures we get capacity information which may not be in individual endpoint
      console.log('Fetching event from events list for capacity data')
      const eventsResponse = await this.getEvents({ limit: 100 })
      const event = eventsResponse.events.find(e => e.id === idOrSlug || e.slug === idOrSlug)
      if (event) {
        return event
      }
      throw { message: 'Event not found', status: 404 }
    }
  }

  async getTodaysEvents(): Promise<EventsResponse> {
    return this.request<EventsResponse>('/events/today')
  }

  async getEventCategories(): Promise<EventCategoriesResponse> {
    return this.request<EventCategoriesResponse>('/event-categories')
  }

  // New methods for booking functionality
  async checkEventAvailability(eventId: string, seats: number = 1): Promise<EventAvailability> {
    // Use different endpoint for client vs server
    const endpoint = typeof window === 'undefined'
      ? `/events/${eventId}/check-availability`  // Server: external API endpoint
      : `/events/${eventId}/availability`        // Client: internal API route
    
    return this.request<EventAvailability>(endpoint, {
      method: 'POST',
      body: JSON.stringify({ seats })
    })
  }

  async initiateBooking(data: BookingInitiation): Promise<BookingInitiationResponse> {
    return this.request<BookingInitiationResponse>('/bookings/initiate', {
      method: 'POST',
      body: JSON.stringify(data),
    })
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

  // Table Bookings
  async checkTableAvailability(params: {
    date: string
    time: string
    party_size: number
    duration?: number
    booking_type?: 'regular' | 'sunday_lunch' | 'food'
  }): Promise<TableAvailabilityResponse> {
    const query = new URLSearchParams({
      date: params.date,
      time: params.time,
      party_size: params.party_size.toString(),
      ...(params.duration && { duration: params.duration.toString() }),
      ...(params.booking_type && { booking_type: params.booking_type })
    })
    
    return this.request<TableAvailabilityResponse>(`/table-bookings/availability?${query}`)
  }

  async createTableBooking(data: TableBookingRequest): Promise<TableBookingResponse> {
    return this.request<TableBookingResponse>('/table-bookings/create', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getTableBooking(reference: string): Promise<TableBookingResponse> {
    return this.request<TableBookingResponse>(`/table-bookings/${reference}`)
  }

  async cancelTableBooking(reference: string, reason?: string): Promise<{ success: boolean; message: string }> {
    return this.request(`/table-bookings/${reference}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    })
  }

  async getSundayLunchMenu(): Promise<SundayLunchMenuResponse> {
    return this.request<SundayLunchMenuResponse>('/table-bookings/menu/sunday-lunch')
  }

  // Business Information
  async getBusinessHours(): Promise<BusinessHours> {
    // Use shorter cache for business hours to ensure current status is accurate
    const data = await this.request<BusinessHours>('/business/hours', {
      next: { revalidate: 60 } // Cache for only 1 minute
    })
    return data
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

// Export singleton instance with API key from environment
export const anchorAPI = new AnchorAPI(process.env.ANCHOR_API_KEY)

// Helper function for business hours
export async function getBusinessHours(): Promise<BusinessHours | null> {
  try {
    return await anchorAPI.getBusinessHours()
  } catch (error) {
    logError('api-business-hours', error)
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
    logError('api-upcoming-events', error, { limit })
    return []
  }
}

export async function getTodaysEvents(): Promise<Event[]> {
  try {
    const response = await anchorAPI.getTodaysEvents()
    return response.events || []
  } catch (error) {
    logError('api-todays-events', error)
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
    logError('api-events-by-category', error, { category, limit })
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
  let date: Date
  
  // IMPORTANT: The API returns times like "2025-07-18T19:00+00:00" which are UTC
  // But these events are actually scheduled for local UK time (7pm local, not 7pm UTC)
  // So we need to treat the numeric time as local time, ignoring the timezone offset
  
  // Extract just the date and time part, ignoring any timezone info
  let cleanDateString = dateString
  
  // Remove timezone offset (+00:00, -05:00, etc) or Z
  if (dateString.includes('+') || dateString.includes('Z')) {
    cleanDateString = dateString.split('+')[0].split('Z')[0]
  } else if (dateString.includes('-') && dateString.lastIndexOf('-') > 10) {
    // Handle negative offsets (but not the date separators)
    cleanDateString = dateString.substring(0, dateString.lastIndexOf('-'))
  }
  
  // Parse as local time
  if (cleanDateString.includes('T')) {
    date = new Date(cleanDateString)
  } else {
    // Format like "2024-03-20 19:00:00"
    const isoString = cleanDateString.replace(' ', 'T')
    date = new Date(isoString)
  }
  
  // Format the time
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? 'pm' : 'am'
  const displayHours = hours % 12 || 12
  
  // Convert to the desired format (8pm instead of 8:00 pm)
  if (minutes === 0) {
    return `${displayHours}${period}`
  } else {
    return `${displayHours}:${minutes.toString().padStart(2, '0')}${period}`
  }
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
    } else if (name.includes('celebration') || name.includes('party')) {
      return 'Special celebration event - join us for a great time!'
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

// New helper functions for booking functionality
export async function checkEventAvailability(eventId: string, seats: number = 1): Promise<EventAvailability | null> {
  try {
    return await anchorAPI.checkEventAvailability(eventId, seats)
  } catch (error) {
    logError('api-check-availability', error, { eventId, seats })
    return null
  }
}

export async function initiateEventBooking(eventId: string, mobileNumber: string): Promise<BookingInitiationResponse | null> {
  try {
    return await anchorAPI.initiateBooking({
      event_id: eventId,
      mobile_number: mobileNumber,
    })
  } catch (error: any) {
    logError('api-initiate-booking', error, { eventId })
    // Re-throw the error so the component can handle it
    throw error
  }
}

// Helper to get event categories
export async function getEventCategories(): Promise<EventCategory[]> {
  try {
    const response = await anchorAPI.getEventCategories()
    return response.categories || []
  } catch (error) {
    logError('api-event-categories', error)
    return []
  }
}

// Type guards for kitchen status
export const isKitchenOpen = (kitchen: any): kitchen is KitchenOpen => {
  return kitchen && typeof kitchen === 'object' && 'opens' in kitchen && 'closes' in kitchen
}

export const isKitchenClosed = (kitchen: any): kitchen is KitchenClosed => {
  return kitchen && typeof kitchen === 'object' && 'is_closed' in kitchen && kitchen.is_closed === true
}

export const getKitchenStatus = (kitchen: KitchenStatus): 'open' | 'closed' | 'no-service' => {
  if (isKitchenOpen(kitchen)) return 'open'
  if (isKitchenClosed(kitchen)) return 'closed'
  return 'no-service'
}

// Helper to format door time
export function formatDoorTime(doorTimeString: string | null | undefined): string | null {
  if (!doorTimeString) return null
  
  // Use the same logic as formatEventTime - strip timezone and treat as local time
  let cleanDateString = doorTimeString
  
  // Remove timezone offset (+00:00, -05:00, etc) or Z
  if (doorTimeString.includes('+') || doorTimeString.includes('Z')) {
    cleanDateString = doorTimeString.split('+')[0].split('Z')[0]
  } else if (doorTimeString.includes('-') && doorTimeString.lastIndexOf('-') > 10) {
    // Handle negative offsets (but not the date separators)
    cleanDateString = doorTimeString.substring(0, doorTimeString.lastIndexOf('-'))
  }
  
  // Parse as local time
  let date: Date
  if (cleanDateString.includes('T')) {
    date = new Date(cleanDateString)
  } else {
    // Format like "2024-03-20 19:00:00"
    const isoString = cleanDateString.replace(' ', 'T')
    date = new Date(isoString)
  }
  
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? 'pm' : 'am'
  const displayHours = hours % 12 || 12
  
  const timeString = minutes === 0 
    ? `${displayHours}${period}`
    : `${displayHours}:${minutes.toString().padStart(2, '0')}${period}`
  
  return 'Doors: ' + timeString
}

// Helper to format event duration
export function formatEventDuration(duration: string | null | undefined): string | null {
  if (!duration) return null
  
  // Parse ISO 8601 duration (e.g., PT3H30M)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/)
  if (!match) return null
  
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  
  if (hours && minutes) {
    return `${hours}h ${minutes}m`
  } else if (hours) {
    return `${hours} hour${hours > 1 ? 's' : ''}`
  } else if (minutes) {
    return `${minutes} minutes`
  }
  
  return null
}

// Helper to check if event has limited availability
export function hasLimitedAvailability(event: Event): boolean {
  return event.offers?.availability === 'https://schema.org/LimitedAvailability' ||
    (event.remainingAttendeeCapacity !== undefined && event.remainingAttendeeCapacity < 10)
}