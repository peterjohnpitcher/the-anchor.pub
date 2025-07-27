import { NextResponse } from 'next/server'
import { createApiErrorResponse, logError } from '@/lib/error-handling'

const API_KEY = process.env.ANCHOR_API_KEY
const API_BASE_URL = 'https://management.orangejelly.co.uk/api'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!API_KEY) {
    console.error('ANCHOR_API_KEY is not set in environment variables')
    return createApiErrorResponse('Service temporarily unavailable. Please try again later.', 503)
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/events/${params.id}`,
      {
        headers: {
          'X-API-Key': API_KEY
        }
      }
    )

    if (!response.ok) {
      console.error(`Event API error: ${response.status} ${response.statusText}`)
      
      if (response.status === 401) {
        console.error('Authentication failed - API key may be invalid or lack permissions')
        return createApiErrorResponse('Service temporarily unavailable. Please try again later.', 503)
      }
      
      if (response.status === 404) {
        return createApiErrorResponse('Event not found', 404)
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
        data.error?.message || 'Unable to retrieve event',
        400,
        data.error
      )
    }
    
    // Extract data from success response
    const eventData = data.data || data
    
    // Return with success wrapper format for consistency
    return NextResponse.json({
      success: true,
      data: eventData
    })
  } catch (error) {
    logError('api/events/[id]', error, { id: params.id })
    return createApiErrorResponse(
      'We couldn\'t load this event. Please try again later.',
      503
    )
  }
}