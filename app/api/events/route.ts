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
  const today = searchParams.get('today') === 'true'
  const limit = searchParams.get('limit') || '10'
  const fromDate = searchParams.get('from_date') || new Date().toISOString().split('T')[0]
  const categoryId = searchParams.get('category_id')
  const availableOnly = searchParams.get('available_only')
  
  try {
    let endpoint: string
    
    if (today) {
      endpoint = '/events/today'
    } else {
      // Build query params
      const query = new URLSearchParams()
      query.append('from_date', fromDate)
      query.append('limit', limit)
      if (categoryId) query.append('category_id', categoryId)
      if (availableOnly) query.append('available_only', availableOnly)
      
      endpoint = `/events?${query.toString()}`
    }
    
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        headers: {
          'X-API-Key': API_KEY
        }
      }
    )

    if (!response.ok) {
      console.error(`Events API error: ${response.status} ${response.statusText}`)
      
      if (response.status === 401) {
        console.error('Authentication failed - API key may be invalid or lack permissions')
        return createApiErrorResponse('Service temporarily unavailable. Please try again later.', 503)
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
        data.error?.message || 'Unable to load events',
        400,
        data.error
      )
    }
    
    // Extract data from success response
    const eventsData = data.data || data
    
    // Return with success wrapper format for consistency
    return NextResponse.json({
      success: true,
      data: eventsData
    })
  } catch (error) {
    logError('api/events', error)
    return createApiErrorResponse(
      'We couldn\'t load the events right now. Please try again in a moment.',
      503
    )
  }
}