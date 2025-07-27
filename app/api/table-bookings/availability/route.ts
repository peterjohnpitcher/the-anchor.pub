import { NextResponse } from 'next/server'
import { createApiErrorResponse, logError } from '@/lib/error-handling'

const API_KEY = process.env.ANCHOR_API_KEY
const API_BASE_URL = 'https://management.orangejelly.co.uk/api'

export async function GET(request: Request) {
  if (!API_KEY) {
    console.error('ANCHOR_API_KEY is not set in environment variables')
    return createApiErrorResponse('Service temporarily unavailable. Please try again later.', 503)
  }

  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')
  const partySize = searchParams.get('party_size')
  const time = searchParams.get('time') // Optional for specific time check
  const duration = searchParams.get('duration')
  const bookingType = searchParams.get('booking_type') // 'regular' or 'sunday_lunch'

  // Validate required parameters
  if (!date || !partySize) {
    return createApiErrorResponse(
      'Missing required parameters: date and party_size are required',
      400
    )
  }

  try {
    // First, check kitchen status if this is a food-related booking
    if (bookingType === 'sunday_lunch' || bookingType === 'food') {
      // Fetch business hours to check kitchen status
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
        const requestedDate = new Date(date)
        const dayOfWeek = requestedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
        const dayHours = businessHours.regularHours[dayOfWeek]
        
        // Check if kitchen is closed on this day
        if (!dayHours || dayHours.is_closed || !dayHours.kitchen || dayHours.kitchen === null) {
          return NextResponse.json({
            success: true,
            data: {
              available: false,
              message: 'Kitchen is closed on this day. No food service available.',
              time_slots: []
            }
          })
        }
        
        // Check if kitchen has is_closed flag
        if ('is_closed' in dayHours.kitchen && dayHours.kitchen.is_closed === true) {
          return NextResponse.json({
            success: true,
            data: {
              available: false,
              message: 'Kitchen is closed on this day. Bar service only.',
              time_slots: []
            }
          })
        }
        
        // Check for special closures
        if (businessHours.specialHours) {
          const specialDay = businessHours.specialHours.find((sh: any) => 
            sh.date === date && (sh.is_closed || sh.kitchen === null || ('is_closed' in sh.kitchen && sh.kitchen.is_closed))
          )
          if (specialDay) {
            return NextResponse.json({
              success: true,
              data: {
                available: false,
                message: specialDay.note || 'Kitchen is closed on this date due to special circumstances.',
                time_slots: []
              }
            })
          }
        }
      }
    }
    
    // Build query parameters
    const query = new URLSearchParams({
      date,
      party_size: partySize
    })
    
    if (time) {
      query.append('time', time)
    }
    
    if (duration) {
      query.append('duration', duration)
    }

    const response = await fetch(
      `${API_BASE_URL}/table-bookings/availability?${query.toString()}`,
      {
        headers: {
          'X-API-Key': API_KEY
        }
      }
    )

    if (!response.ok) {
      console.error(`Table availability API error: ${response.status} ${response.statusText}`)
      
      if (response.status === 401) {
        console.error('Authentication failed - API key may be invalid or lack permissions')
        return createApiErrorResponse('Service temporarily unavailable. Please try again later.', 503)
      }
      
      // Handle specific status codes
      if (response.status === 400) {
        const errorData = await response.json().catch(() => null)
        return createApiErrorResponse(
          errorData?.error || 'Invalid request parameters',
          400,
          errorData
        )
      }
      
      const errorText = await response.text()
      console.error('Error response:', errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Check if the response has the expected format
    if (data.success === false) {
      console.error('API returned error:', data.error)
      return createApiErrorResponse(
        data.error?.message || 'Unable to check availability',
        400,
        data.error
      )
    }
    
    // Extract data from success response
    const availabilityData = data.data || data
    
    // Return with success wrapper format for consistency
    return NextResponse.json({
      success: true,
      data: availabilityData
    })
  } catch (error) {
    logError('api/table-bookings/availability', error, {
      date,
      time,
      partySize,
      duration
    })
    return createApiErrorResponse(
      'We couldn\'t check table availability right now. Please try again or call us at 01753 682707.',
      503
    )
  }
}