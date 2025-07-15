import { NextResponse } from 'next/server'

const API_KEY = process.env.ANCHOR_API_KEY
const API_BASE_URL = 'https://management.orangejelly.co.uk/api'

export async function GET() {
  if (!API_KEY) {
    console.error('ANCHOR_API_KEY is not set in environment variables')
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/event-categories`,
      {
        headers: {
          'X-API-Key': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    )

    if (!response.ok) {
      console.error(`Event categories API error: ${response.status} ${response.statusText}`)
      
      if (response.status === 401) {
        console.error('Authentication failed - API key may be invalid or lack read:events permission')
        return NextResponse.json(
          { error: 'Authentication failed. API key needs read:events permission.' },
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
    console.error('Failed to fetch event categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event categories' },
      { status: 500 }
    )
  }
}