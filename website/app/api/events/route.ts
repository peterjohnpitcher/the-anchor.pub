import { NextResponse } from 'next/server'

const API_KEY = process.env.ANCHOR_API_KEY
const API_BASE_URL = 'https://management.orangejelly.co.uk/api'

export async function GET(request: Request) {
  if (!API_KEY) {
    console.error('ANCHOR_API_KEY is not set in environment variables')
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
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
          'X-API-Key': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    )

    if (!response.ok) {
      console.error(`Events API error: ${response.status} ${response.statusText}`)
      
      if (response.status === 401) {
        console.error('Authentication failed - API key may be invalid or lack permissions')
        return NextResponse.json(
          { error: 'Authentication failed. Please check API key validity and permissions.' },
          { status: 401 }
        )
      }
      
      const errorText = await response.text()
      console.error('Error response:', errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}