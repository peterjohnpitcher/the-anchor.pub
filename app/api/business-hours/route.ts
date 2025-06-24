import { NextResponse } from 'next/server'

const API_KEY = 'bcf9b880cc9fe4615bd68090e88c6407d4ee7506'
const API_URL = 'https://management.orangejelly.co.uk/api/business/hours'

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      // No cache - always fetch fresh data
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch business hours')
    }

    const data = await response.json()
    
    // Add timestamp for debugging
    return NextResponse.json({
      ...data,
      fetchedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Business hours API error:', error)
    return NextResponse.json({ error: 'Unable to load business hours' }, { status: 500 })
  }
}