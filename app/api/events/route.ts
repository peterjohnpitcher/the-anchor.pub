import { NextResponse } from 'next/server'
import { anchorAPI } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10')
  const from_date = searchParams.get('from_date') || new Date().toISOString().split('T')[0]
  const category_id = searchParams.get('category_id') || undefined

  try {
    const response = await anchorAPI.getEvents({
      from_date,
      limit,
      category_id,
    })
    
    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Events API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events', message: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { endpoint } = body
    
    // Support specific endpoints
    if (endpoint === 'todays') {
      const response = await anchorAPI.getTodaysEvents()
      return NextResponse.json(response)
    }
    
    return NextResponse.json(
      { error: 'Invalid endpoint' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Events API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events', message: error.message },
      { status: 500 }
    )
  }
}