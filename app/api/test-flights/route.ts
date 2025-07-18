import { NextResponse } from 'next/server'
import { flightAPI } from '@/lib/flights'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const terminal = searchParams.get('terminal') || '5'
  
  try {
    // Cheque if API key is set
    const hasApiKey = !!process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY
    
    if (!hasApiKey) {
      return NextResponse.json({
        error: 'API key not configured',
        message: 'NEXT_PUBLIC_AVIATIONSTACK_API_KEY environment variable is not set'
      }, { status: 500 })
    }
    
    // Try to fetch departures
    const departures = await flightAPI.getDepartures(terminal, 10)
    
    // Cheque if we have flights for the specific terminal
    const terminalFlights = departures.flights.filter(flight => 
      flight.departure.terminal === terminal || 
      flight.departure.terminal === `T${terminal}` ||
      flight.departure.terminal === `Terminal ${terminal}`
    )
    
    return NextResponse.json({
      success: true,
      terminal,
      apiKeyPresent: hasApiKey,
      totalFlights: departures.flights.length,
      terminalFlights: terminalFlights.length,
      terminals: Array.from(new Set(departures.flights.map(f => f.departure.terminal))),
      sampleFlights: departures.flights.slice(0, 3).map(f => ({
        flight: f.flight.iata,
        airline: f.airline.name,
        departure: f.departure.airport,
        terminal: f.departure.terminal,
        status: f.flight_status
      }))
    })
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: error.message,
      terminal,
      apiKeyPresent: !!process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY,
      details: error.toString()
    }, { status: 500 })
  }
}