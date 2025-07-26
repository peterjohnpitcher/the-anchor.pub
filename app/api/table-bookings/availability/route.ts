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
  const time = searchParams.get('time')
  const partySize = searchParams.get('party_size')
  const duration = searchParams.get('duration')

  // Validate required parameters
  if (!date || !time || !partySize) {
    return createApiErrorResponse(
      'Missing required parameters: date, time, and party_size are required',
      400
    )
  }

  try {
    // Build query parameters
    const query = new URLSearchParams({
      date,
      time,
      party_size: partySize
    })
    
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
    return NextResponse.json(availabilityData)
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