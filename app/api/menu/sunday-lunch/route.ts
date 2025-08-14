import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering to ensure date parameter is read at request time
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
    
    console.log('📅 Menu API called with date:', date)
    console.log('🔑 API Key present:', !!process.env.ANCHOR_API_KEY)
    
    // Call the management API to get Sunday lunch menu
    const apiUrl = process.env.ANCHOR_API_KEY 
      ? 'https://management.orangejelly.co.uk/api'
      : 'http://localhost:3000/api/fallback'
    
    const apiEndpoint = `${apiUrl}/table-bookings/menu/sunday-lunch?date=${date}`
    console.log('🌐 Calling API:', apiEndpoint)
    
    const response = await fetch(apiEndpoint, {
      headers: {
        'X-API-Key': process.env.ANCHOR_API_KEY || ''
      },
      cache: 'no-store' // Prevent caching
    })
    
    console.log('🔍 Sunday Menu API Response Status:', response.status)
    
    if (!response.ok) {
      console.log('⚠️ Sunday Menu API failed with status:', response.status)
      // Return empty menu to prevent booking with invalid IDs
      return NextResponse.json({
        error: 'Menu temporarily unavailable. Please try again or call 01753 682707.',
        menu_date: date,
        mains: [],
        sides: [],
        cutoff_time: new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000).toISOString()
      })
    }
    
    const data = await response.json()
    console.log('🔍 Sunday Menu from API - First item:', data.mains?.[0])
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Failed to fetch Sunday lunch menu:', error)
    
    // Return error state to prevent invalid bookings
    return NextResponse.json({
      error: 'Unable to load menu. Please try again or call 01753 682707.',
      menu_date: new Date().toISOString().split('T')[0],
      mains: [],
      sides: []
    })
  }
}