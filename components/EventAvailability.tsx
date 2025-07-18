'use client'

import { useEffect, useState } from 'react'
import { checkEventAvailability, type EventAvailability } from '@/lib/api'

interface EventAvailabilityProps {
  eventId: string
  className?: string
  showDetails?: boolean
}

export default function EventAvailability({ eventId, className = '', showDetails = false }: EventAvailabilityProps) {
  const [availability, setAvailability] = useState<EventAvailability | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const data = await checkEventAvailability(eventId)
        setAvailability(data)
        setError(false)
        setLastUpdate(new Date())
      } catch (err) {
        // Error: Failed to check availability
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
    
    // Refresh availability every 30 seconds for real-time updates
    const interval = setInterval(fetchAvailability, 30000)
    
    return () => clearInterval(interval)
  }, [eventId])

  if (loading) {
    return (
      <div className={`text-sm text-gray-700 ${className}`} role="status" aria-live="polite">
        <span className="sr-only">Loading event availability</span>
        Checking availability...
      </div>
    )
  }

  if (error || !availability) {
    return null
  }

  if (!availability.available) {
    return (
      <div className={`text-sm font-semibold text-red-600 ${className}`} role="alert" aria-live="assertive">
        SOLD OUT
      </div>
    )
  }

  const isLimited = availability.remaining < 10
  const percentageFull = availability.percentage_full

  if (showDetails) {
    return (
      <div className={`space-y-2 ${className}`} role="region" aria-live="polite" aria-label="Event availability details">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${
            isLimited ? 'text-amber-600 animate-pulse' : 'text-green-600'
          }`} role={isLimited ? 'alert' : undefined}>
            {isLimited ? 'LIMITED AVAILABILITY' : `${availability.remaining} seats available`}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={percentageFull} aria-valuemin={0} aria-valuemax={100} aria-label="Booking capacity">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              percentageFull >= 90 ? 'bg-red-500' :
              percentageFull >= 75 ? 'bg-amber-500' :
              percentageFull >= 50 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
            style={{ width: `${percentageFull}%` }}
          />
        </div>
        <p className="text-sm sm:text-xs text-gray-700" aria-live="off">
          {availability.booked} of {availability.capacity} seats booked
        </p>
        <span className="sr-only" aria-live="polite">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </span>
      </div>
    )
  }

  return (
    <span className={`text-sm ${
      isLimited ? 'text-amber-600 font-semibold animate-pulse' : 'text-gray-700'
    } ${className}`} role={isLimited ? 'alert' : undefined} aria-live={isLimited ? 'assertive' : 'polite'}>
      {isLimited ? 'Limited availability' : `${availability.remaining} seats available`}
    </span>
  )
}