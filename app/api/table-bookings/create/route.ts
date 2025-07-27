import { NextResponse } from 'next/server'
import { createApiErrorResponse, logError } from '@/lib/error-handling'

const API_KEY = process.env.ANCHOR_API_KEY
const API_BASE_URL = 'https://management.orangejelly.co.uk/api'

// This interface matches what the frontend actually sends
interface BookingRequest {
  booking_type: 'regular' | 'sunday_lunch'
  date: string
  time: string
  party_size: number
  customer: {
    first_name: string
    last_name: string
    mobile_number: string
    sms_opt_in?: boolean
  }
  duration_minutes?: number
  special_requirements?: string
  dietary_requirements?: string | string[]  // Frontend might send either
  allergies?: string | string[]  // Frontend might send either
  celebration_type?: string
  source?: string
  // For Sunday lunch bookings
  menu_selections?: Array<{
    guest_name: string
    menu_item_id: string
    item_type: 'starter' | 'main' | 'dessert'
    quantity: number
    price_at_booking: number
  }>
}

export async function POST(request: Request) {
  console.log('Table booking create request received')
  console.log('API_KEY exists:', !!API_KEY)
  
  if (!API_KEY) {
    console.error('ANCHOR_API_KEY is not set in environment variables')
    return createApiErrorResponse('Service temporarily unavailable. Please try again later.', 503)
  }

  try {
    const body: BookingRequest = await request.json()
    console.log('Table booking request body:', JSON.stringify(body, null, 2))
    
    // Check kitchen status for food-related bookings
    if (body.booking_type === 'sunday_lunch' || body.booking_type === 'regular') {
      try {
        const businessHoursResponse = await fetch(
          `${API_BASE_URL}/business/hours`,
          {
            headers: {
              'X-API-Key': API_KEY
            }
          }
        )
        
        if (businessHoursResponse.ok) {
          const hoursData = await businessHoursResponse.json()
          const businessHours = hoursData.data || hoursData
          
          // Get day of week from the requested date
          const requestedDate = new Date(body.date)
          const dayOfWeek = requestedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
          const dayHours = businessHours.regularHours[dayOfWeek]
          
          // Check if kitchen is closed on this day
          const isKitchenClosed = !dayHours || dayHours.is_closed || !dayHours.kitchen || 
                                  dayHours.kitchen === null || 
                                  ('is_closed' in dayHours.kitchen && dayHours.kitchen.is_closed === true)
          
          if (isKitchenClosed) {
            return createApiErrorResponse(
              dayOfWeek === 'monday' 
                ? 'Kitchen is closed on Mondays. Bar service only - please call 01753 682707 for drinks-only reservations.'
                : `Kitchen is closed on ${dayOfWeek}s. No food service available.`,
              400
            )
          }
          
          // Check for special closures
          if (businessHours.specialHours) {
            const specialDay = businessHours.specialHours.find((sh: any) => 
              sh.date === body.date && (sh.is_closed || sh.kitchen === null || 
              ('is_closed' in sh.kitchen && sh.kitchen.is_closed))
            )
            if (specialDay) {
              return createApiErrorResponse(
                specialDay.note || 'Kitchen is closed on this date due to special circumstances.',
                400
              )
            }
          }
        }
      } catch (err) {
        console.error('Failed to check kitchen status:', err)
        // Continue with booking if we can't verify kitchen status
      }
    }
    
    // Validate required fields
    const missingFields: string[] = []
    
    if (!body.booking_type) missingFields.push('booking_type')
    if (!body.date) missingFields.push('date')
    if (!body.time) missingFields.push('time')
    if (!body.party_size) missingFields.push('party_size')
    if (!body.customer) missingFields.push('customer')
    if (body.customer) {
      if (!body.customer.first_name) missingFields.push('customer.first_name')
      if (!body.customer.last_name) missingFields.push('customer.last_name')
      if (!body.customer.mobile_number) missingFields.push('customer.mobile_number')
    }
    
    if (missingFields.length > 0) {
      return createApiErrorResponse(
        `Missing required fields: ${missingFields.join(', ')}`,
        400
      )
    }
    
    // Validate party size
    if (body.party_size < 1 || body.party_size > 20) {
      return createApiErrorResponse(
        'Party size must be between 1 and 20 guests',
        400
      )
    }
    
    // Validate Sunday lunch specific requirements
    if (body.booking_type === 'sunday_lunch') {
      if (!body.menu_selections || body.menu_selections.length === 0) {
        return createApiErrorResponse(
          'Menu selections are required for Sunday lunch bookings',
          400
        )
      }
      
      // Validate each menu selection
      for (const selection of body.menu_selections) {
        if (!selection.guest_name || !selection.menu_item_id || !selection.item_type || 
            !selection.quantity || !selection.price_at_booking) {
          return createApiErrorResponse(
            'Invalid menu selection. Each selection must include guest name, menu item, type, quantity, and price',
            400
          )
        }
      }
    }
    
    // The frontend already sends the data in the correct format
    // We just need to ensure defaults and clean up empty values
    const apiPayload: any = {
      booking_type: body.booking_type,
      date: body.date,
      time: body.time,
      party_size: body.party_size,
      duration_minutes: body.duration_minutes || 120,  // Default 2 hours
      customer: {
        first_name: body.customer.first_name,
        last_name: body.customer.last_name,
        mobile_number: body.customer.mobile_number,
        sms_opt_in: body.customer.sms_opt_in ?? true  // Default true if not specified
      },
      source: body.source || 'website'
    }
    
    // Only add optional fields if they have values
    if (body.special_requirements && body.special_requirements.trim()) {
      apiPayload.special_requirements = body.special_requirements
    }
    
    // Handle dietary_requirements - could be string or array from frontend
    if (body.dietary_requirements) {
      if (Array.isArray(body.dietary_requirements) && body.dietary_requirements.length > 0) {
        apiPayload.dietary_requirements = body.dietary_requirements
      } else if (typeof body.dietary_requirements === 'string' && body.dietary_requirements.trim()) {
        apiPayload.dietary_requirements = [body.dietary_requirements]
      }
    }
    
    // Handle allergies - could be string or array from frontend
    if (body.allergies) {
      if (Array.isArray(body.allergies) && body.allergies.length > 0) {
        apiPayload.allergies = body.allergies
      } else if (typeof body.allergies === 'string' && body.allergies.trim()) {
        apiPayload.allergies = [body.allergies]
      }
    }
    
    if (body.celebration_type && body.celebration_type.trim()) {
      apiPayload.celebration_type = body.celebration_type
    }
    
    // Add menu selections for Sunday lunch bookings
    if (body.booking_type === 'sunday_lunch' && body.menu_selections) {
      apiPayload.menu_selections = body.menu_selections
    }
    
    console.log('Transformed API payload:', JSON.stringify(apiPayload, null, 2))
    
    // Make request to external API with retry logic
    let lastError: Error | null = null
    const maxRetries = 3
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/table-bookings`,
          {
            method: 'POST',
            headers: {
              'X-API-Key': API_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiPayload)
          }
        )

        console.log(`Table booking API response status (attempt ${attempt}): ${response.status}`)

        if (!response.ok) {
          let errorData
          let errorMessage = `API error: ${response.status}`
          
          try {
            errorData = await response.json()
            // Handle new API error format
            if (errorData.success === false && errorData.error) {
              errorMessage = errorData.error.message || errorMessage
              console.error('Table booking API error response:', errorData.error)
            } else {
              errorMessage = errorData.error || errorData.message || errorMessage
              console.error('Table booking API error response:', errorData)
            }
          } catch (e) {
            const textError = await response.text()
            console.error('Table booking API error text:', textError)
            errorMessage = textError || errorMessage
          }
          
          if (response.status === 401) {
            return createApiErrorResponse(
              'Authentication failed. Service temporarily unavailable.',
              503
            )
          }
          
          // Handle specific HTTP status codes and error codes
          if (errorData?.error?.code) {
            switch (errorData.error.code) {
              case 'VALIDATION_ERROR':
                return createApiErrorResponse(errorMessage, 400, errorData.error)
              case 'NO_AVAILABILITY':
                return createApiErrorResponse(
                  'This time slot is no longer available. Please choose a different time.',
                  409,
                  errorData.error
                )
              case 'UNAUTHORIZED':
                return createApiErrorResponse(
                  'Authentication failed. Service temporarily unavailable.',
                  503
                )
              case 'FORBIDDEN':
                return createApiErrorResponse(
                  'Insufficient permissions. Please contact support.',
                  503
                )
              case 'RATE_LIMIT_EXCEEDED':
                return createApiErrorResponse(
                  'Too many requests. Please try again later.',
                  429,
                  errorData.error
                )
            }
          }
          
          // Handle by HTTP status if no specific error code
          if (response.status === 400) {
            // Don't retry client errors
            return createApiErrorResponse(errorMessage, 400, errorData)
          }
          
          if (response.status === 409) {
            // Conflict - table not available
            return createApiErrorResponse(
              'This time slot is no longer available. Please choose a different time.',
              409,
              errorData
            )
          }
          
          // For server errors, throw to trigger retry
          if (response.status >= 500) {
            throw new Error(`Server error: ${response.status}`)
          }
          
          return createApiErrorResponse(errorMessage, response.status, errorData)
        }
        
        const data = await response.json()
        console.log('Table booking creation response:', data)
        
        // Check if the response has the expected format
        if (data.success === false) {
          console.error('API returned error:', data.error)
          
          // Handle specific error codes
          switch (data.error?.code) {
            case 'NO_AVAILABILITY':
              return createApiErrorResponse(
                data.error.message || 'This time slot is no longer available',
                409,
                data.error
              )
            case 'VALIDATION_ERROR':
              return createApiErrorResponse(
                data.error.message || 'Invalid booking details',
                400,
                data.error
              )
            case 'RATE_LIMIT_EXCEEDED':
              return createApiErrorResponse(
                'Too many requests. Please try again later.',
                429,
                data.error
              )
            case 'DATABASE_ERROR':
            case 'INTERNAL_ERROR':
              return createApiErrorResponse(
                'Service temporarily unavailable. Please try again later.',
                503,
                data.error
              )
            default:
              return createApiErrorResponse(
                data.error?.message || 'Failed to create booking',
                400,
                data.error
              )
          }
        }
        
        // Extract booking data from success response
        const bookingData = data.data || data
        console.log('Table booking creation successful:', bookingData)
        
        // For Sunday lunch bookings, ensure payment details are included
        if (body.booking_type === 'sunday_lunch' && bookingData.status === 'pending_payment') {
          console.log('Sunday lunch booking requires payment:', bookingData.payment_details)
        }

        return NextResponse.json(bookingData)
      } catch (error) {
        lastError = error as Error
        console.error(`Table booking attempt ${attempt} failed:`, error)
        
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
        }
      }
    }
    
    // All retries failed
    throw lastError || new Error('Failed to create booking after retries')
  } catch (error: any) {
    logError('api/table-bookings/create', error, { body: request.body })
    return createApiErrorResponse(
      'We couldn\'t process your booking online. Please call us at 01753 682707 and we\'ll reserve your table right away.',
      503
    )
  }
}