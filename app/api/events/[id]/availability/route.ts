import { NextResponse } from 'next/server'

const API_KEY = process.env.ANCHOR_API_KEY
const API_BASE_URL = 'https://management.orangejelly.co.uk/api'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('Availability check for event:', params.id)
  console.log('API_KEY exists:', !!API_KEY)
  
  if (!API_KEY) {
    console.error('ANCHOR_API_KEY is not set in environment variables')
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Parse request body to get seats parameter
    const body = await request.json()
    const seats = body.seats || 1
    
    console.log('Checking availability for seats:', seats)
    
    // Try the check-availability endpoint with POST method
    const response = await fetch(
      `${API_BASE_URL}/events/${params.id}/check-availability`,
      {
        method: 'POST',
        headers: {
          'X-API-Key': API_KEY,
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ seats })
      }
    )

    console.log('Check-availability response status:', response.status)
    
    // Handle authentication errors specifically
    if (response.status === 401) {
      console.error('Authentication failed - API key may be invalid or lack permissions')
      return NextResponse.json(
        { error: 'Authentication failed. Please check API key validity and permissions.' },
        { status: 401 }
      )
    }
    
    // If check-availability doesn't exist or errors, fall back to getting the full event
    if (response.status === 404 || response.status === 405 || !response.ok) {
      console.log('Falling back to full event endpoint')
      const eventResponse = await fetch(
        `${API_BASE_URL}/events/${params.id}`,
        {
          headers: {
            'X-API-Key': API_KEY,
            'Authorization': `Bearer ${API_KEY}`
          }
        }
      )

      console.log('Event response status:', eventResponse.status)
      
      if (!eventResponse.ok) {
        // If individual event endpoint fails, try to get from events list
        console.log('Individual event endpoint failed, trying events list')
        const eventsResponse = await fetch(
          `${API_BASE_URL}/events?limit=100`,
          {
            headers: {
              'X-API-Key': API_KEY,
              'Authorization': `Bearer ${API_KEY}`
            }
          }
        )
        
        if (!eventsResponse.ok) {
          const errorText = await eventsResponse.text()
          console.error('Events list API error:', errorText)
          throw new Error(`API error: ${eventsResponse.status}`)
        }
        
        const eventsData = await eventsResponse.json()
        const event = eventsData.events?.find((e: any) => e.id === params.id || e.slug === params.id)
        
        if (!event) {
          console.error('Event not found in events list')
          return NextResponse.json(
            { error: 'Event not found' },
            { status: 404 }
          )
        }
        
        // Create availability response from event data
        const availability = {
          available: event.remainingAttendeeCapacity > 0,
          event_id: event.id,
          capacity: event.maximumAttendeeCapacity || 100,
          booked: event.maximumAttendeeCapacity ? (event.maximumAttendeeCapacity - event.remainingAttendeeCapacity) : 0,
          remaining: event.remainingAttendeeCapacity || 0,
          percentage_full: event.maximumAttendeeCapacity 
            ? Math.round(((event.maximumAttendeeCapacity - event.remainingAttendeeCapacity) / event.maximumAttendeeCapacity) * 100)
            : 0
        }
        
        return NextResponse.json(availability)
      }

      const eventData = await eventResponse.json()
      const event = eventData.event || eventData
      
      // Create availability response from event data using correct field names
      const availability = {
        available: event.remainingAttendeeCapacity > 0,
        event_id: event.id,
        capacity: event.maximumAttendeeCapacity || 100,
        booked: event.maximumAttendeeCapacity ? (event.maximumAttendeeCapacity - event.remainingAttendeeCapacity) : 0,
        remaining: event.remainingAttendeeCapacity || 0,
        percentage_full: event.maximumAttendeeCapacity 
          ? Math.round(((event.maximumAttendeeCapacity - event.remainingAttendeeCapacity) / event.maximumAttendeeCapacity) * 100)
          : 0
      }

      return NextResponse.json(availability)
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Try to get capacity info from the events list
    let maximumCapacity = 100
    
    try {
      const eventsResponse = await fetch(
        `${API_BASE_URL}/events?limit=100`,
        {
          headers: {
            'X-API-Key': API_KEY,
            'Authorization': `Bearer ${API_KEY}`
          }
        }
      )
      
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json()
        const event = eventsData.events?.find((e: any) => e.id === params.id)
        if (event && event.maximumAttendeeCapacity) {
          maximumCapacity = event.maximumAttendeeCapacity
        }
      }
    } catch (e) {
      console.log('Could not fetch event details for capacity')
    }
    
    // Map the API response to our expected format
    const availability = {
      available: data.available,
      event_id: data.event?.id || params.id,
      capacity: maximumCapacity,
      booked: maximumCapacity - (data.available_seats || 0),
      remaining: data.available_seats || 0,
      percentage_full: maximumCapacity ? Math.round(((maximumCapacity - (data.available_seats || 0)) / maximumCapacity) * 100) : 0
    }
    
    return NextResponse.json(availability)
  } catch (error) {
    console.error('Failed to check event availability:', error)
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    )
  }
}