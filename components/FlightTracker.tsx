'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Flight {
  flight: string
  airline: string
  origin?: string
  destination?: string
  scheduled: string
  estimated?: string
  terminal: string
  status: string
  gate?: string
}

interface FlightTrackerProps {
  type?: 'arrivals' | 'departures' | 'both'
  limit?: number
  terminal?: string
  compact?: boolean
}

// Mock flight data for demonstration
// In production, this would fetch from a real flight API
function generateMockFlights(type: string, limit: number): Flight[] {
  const airlines = ['British Airways', 'Virgin Atlantic', 'American Airlines', 'Emirates', 'Lufthansa', 'Air France', 'KLM']
  const destinations = ['New York JFK', 'Dubai', 'Paris CDG', 'Frankfurt', 'Amsterdam', 'Madrid', 'Rome FCO', 'Dublin']
  const origins = ['New York JFK', 'Dubai', 'Singapore', 'Hong Kong', 'Tokyo NRT', 'Sydney', 'Los Angeles LAX']
  const statuses = ['On Time', 'Boarding', 'Delayed', 'Departed', 'Landed', 'Final Call']
  
  const flights: Flight[] = []
  const now = new Date()
  
  for (let i = 0; i < limit; i++) {
    const scheduledTime = new Date(now.getTime() + (i * 30 - 60) * 60000) // Stagger by 30 mins
    const isArrival = type === 'arrivals'
    
    flights.push({
      flight: `${airlines[i % airlines.length].substring(0, 2).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`,
      airline: airlines[i % airlines.length],
      origin: isArrival ? origins[i % origins.length] : undefined,
      destination: !isArrival ? destinations[i % destinations.length] : undefined,
      scheduled: scheduledTime.toTimeString().substring(0, 5),
      terminal: `${Math.floor(2 + Math.random() * 4)}`,
      status: statuses[i % statuses.length],
      gate: Math.random() > 0.5 ? `${Math.floor(1 + Math.random() * 50)}` : undefined
    })
  }
  
  return flights
}

export function FlightTracker({ type = 'both', limit = 5, terminal, compact = false }: FlightTrackerProps) {
  const [arrivals, setArrivals] = useState<Flight[]>([])
  const [departures, setDepartures] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    // Mock data - in production, fetch from flight API
    const fetchFlights = () => {
      if (type === 'arrivals' || type === 'both') {
        setArrivals(generateMockFlights('arrivals', limit))
      }
      if (type === 'departures' || type === 'both') {
        setDepartures(generateMockFlights('departures', limit))
      }
      setLastUpdate(new Date())
      setLoading(false)
    }

    fetchFlights()
    // Update every 5 minutes
    const interval = setInterval(fetchFlights, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [type, limit, terminal])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }

  const FlightRow = ({ flight, isArrival }: { flight: Flight; isArrival: boolean }) => {
    const statusColor = flight.status === 'On Time' ? 'text-green-600' : 
                       flight.status === 'Delayed' ? 'text-red-600' : 
                       'text-blue-600'

    if (compact) {
      return (
        <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
          <div className="flex-1">
            <div className="font-semibold text-sm">{flight.flight}</div>
            <div className="text-xs text-gray-600">
              {isArrival ? `from ${flight.origin}` : `to ${flight.destination}`}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{flight.scheduled}</div>
            <div className={`text-xs ${statusColor}`}>{flight.status}</div>
          </div>
        </div>
      )
    }

    return (
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3 text-sm font-medium">{flight.flight}</td>
        <td className="px-4 py-3 text-sm">{flight.airline}</td>
        <td className="px-4 py-3 text-sm">
          {isArrival ? flight.origin : flight.destination}
        </td>
        <td className="px-4 py-3 text-sm">{flight.scheduled}</td>
        <td className="px-4 py-3 text-sm">T{flight.terminal}</td>
        {!compact && <td className="px-4 py-3 text-sm">{flight.gate || '-'}</td>}
        <td className={`px-4 py-3 text-sm font-medium ${statusColor}`}>
          {flight.status}
        </td>
      </tr>
    )
  }

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Live Flights</h3>
          <Link href="/near-heathrow" className="text-sm text-anchor-gold hover:text-anchor-gold-light">
            View all →
          </Link>
        </div>
        
        {type === 'both' && (
          <div className="space-y-4">
            {arrivals.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Arrivals</h4>
                <div className="space-y-1">
                  {arrivals.slice(0, 3).map((flight, i) => (
                    <FlightRow key={`arr-${i}`} flight={flight} isArrival={true} />
                  ))}
                </div>
              </div>
            )}
            
            {departures.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Departures</h4>
                <div className="space-y-1">
                  {departures.slice(0, 3).map((flight, i) => (
                    <FlightRow key={`dep-${i}`} flight={flight} isArrival={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-3 text-xs text-gray-500 text-center">
          Updated: {lastUpdate.toTimeString().substring(0, 5)}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-anchor-green text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">
            Heathrow {type === 'both' ? 'Flights' : type === 'arrivals' ? 'Arrivals' : 'Departures'}
            {terminal && ` - Terminal ${terminal}`}
          </h3>
          <span className="text-sm opacity-90">
            Updated: {lastUpdate.toTimeString().substring(0, 5)}
          </span>
        </div>
      </div>

      {type === 'both' ? (
        <div className="grid md:grid-cols-2 divide-x divide-gray-200">
          {/* Arrivals */}
          <div>
            <h4 className="text-lg font-semibold p-4 bg-gray-50 border-b">Arrivals</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700 text-sm">
                  <tr>
                    <th className="px-4 py-2 text-left">Flight</th>
                    <th className="px-4 py-2 text-left">Airline</th>
                    <th className="px-4 py-2 text-left">From</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Term</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {arrivals.map((flight, i) => (
                    <FlightRow key={`arr-${i}`} flight={flight} isArrival={true} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Departures */}
          <div>
            <h4 className="text-lg font-semibold p-4 bg-gray-50 border-b">Departures</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700 text-sm">
                  <tr>
                    <th className="px-4 py-2 text-left">Flight</th>
                    <th className="px-4 py-2 text-left">Airline</th>
                    <th className="px-4 py-2 text-left">To</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Term</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {departures.map((flight, i) => (
                    <FlightRow key={`dep-${i}`} flight={flight} isArrival={false} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 text-left">Flight</th>
                <th className="px-4 py-2 text-left">Airline</th>
                <th className="px-4 py-2 text-left">
                  {type === 'arrivals' ? 'From' : 'To'}
                </th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Terminal</th>
                <th className="px-4 py-2 text-left">Gate</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(type === 'arrivals' ? arrivals : departures).map((flight, i) => (
                <FlightRow key={i} flight={flight} isArrival={type === 'arrivals'} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="p-4 bg-gray-50 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Real-time flight information • Just 7-12 minutes from all terminals
        </p>
        <Link 
          href="/near-heathrow" 
          className="text-anchor-gold hover:text-anchor-gold-light font-semibold"
        >
          View directions from your terminal →
        </Link>
      </div>
    </div>
  )
}