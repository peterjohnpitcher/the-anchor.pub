'use client'

import { useEffect, useState } from 'react'
import { anchorAPI, type BusinessHours } from '@/lib/api'

interface BusinessHoursProps {
  variant?: 'compact' | 'full' | 'status' | 'dark'
  showKitchen?: boolean
}

export function BusinessHours({ variant = 'full', showKitchen = true }: BusinessHoursProps) {
  const [hours, setHours] = useState<BusinessHours | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHours() {
      try {
        const data = await anchorAPI.getBusinessHours()
        setHours(data)
      } catch (err) {
        console.error('Failed to fetch business hours:', err)
        setError('Unable to load business hours')
      } finally {
        setLoading(false)
      }
    }

    fetchHours()
    // Refresh every 5 minutes
    const interval = setInterval(fetchHours, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    if (variant === 'status') {
      return <span className="text-sm">Loading hours...</span>
    }
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
    )
  }

  if (error || !hours) {
    return null
  }

  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase()

  // Format time from 24h to 12h
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour % 12 || 12
    return minutes === '00' ? `${displayHour}${ampm}` : `${displayHour}:${minutes}${ampm}`
  }

  // Status variant - just shows open/closed
  if (variant === 'status') {
    return (
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${hours.currentStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm">
          {hours.currentStatus.isOpen ? (
            <>Open now • Closes {hours.currentStatus.closesIn}</>
          ) : (
            <>Closed • Opens {hours.currentStatus.opensIn}</>
          )}
        </span>
      </div>
    )
  }

  // Compact variant - for header/footer
  if (variant === 'compact') {
    const todayHours = hours.regularHours[today]
    return (
      <div className="text-sm">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${hours.currentStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="font-medium">
            {hours.currentStatus.isOpen ? 'Open' : 'Closed'}
          </span>
          {todayHours && !todayHours.is_closed && (
            <span className="text-gray-600">
              {formatTime(todayHours.opens)} - {formatTime(todayHours.closes)}
            </span>
          )}
        </div>
        {hours.currentStatus.isOpen && hours.currentStatus.closesIn && (
          <p className="text-xs text-gray-600 mt-1">Closes in {hours.currentStatus.closesIn}</p>
        )}
      </div>
    )
  }

  // Dark variant - for dark backgrounds
  if (variant === 'dark') {
    return (
      <div className="space-y-4">
        {/* Current Status */}
        <div className={`p-4 rounded-lg ${hours.currentStatus.isOpen ? 'bg-green-500/20 border border-green-400/30' : 'bg-red-500/20 border border-red-400/30'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`inline-block w-3 h-3 rounded-full ${hours.currentStatus.isOpen ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="font-semibold text-lg text-white">
                {hours.currentStatus.isOpen ? 'We\'re Open!' : 'We\'re Closed'}
              </span>
            </div>
            {hours.currentStatus.isOpen && hours.currentStatus.closesIn && (
              <span className="text-sm text-gray-300">Closes in {hours.currentStatus.closesIn}</span>
            )}
            {!hours.currentStatus.isOpen && hours.currentStatus.opensIn && (
              <span className="text-sm text-gray-300">Opens in {hours.currentStatus.opensIn}</span>
            )}
          </div>
          {showKitchen && (
            <p className="text-sm mt-2 text-gray-200">
              Kitchen: {hours.currentStatus.kitchenOpen ? 
                <span className="text-green-400 font-medium">Open for food orders</span> : 
                <span className="text-red-400 font-medium">Closed</span>
              }
            </p>
          )}
        </div>

        {/* Regular Hours */}
        <div className="space-y-2">
          {dayOrder.map(day => {
            const dayHours = hours.regularHours[day]
            const isToday = day === today
            
            return (
              <div 
                key={day} 
                className={`flex justify-between items-start py-2 px-3 rounded ${
                  isToday ? 'bg-white/10' : ''
                }`}
              >
                <span className={`font-medium capitalize ${isToday ? 'text-anchor-gold' : 'text-white'}`}>
                  {day}
                  {isToday && <span className="text-xs ml-2 text-anchor-gold">(Today)</span>}
                </span>
                <div className="text-right">
                  {dayHours.is_closed ? (
                    <span className="text-gray-400">Closed</span>
                  ) : (
                    <>
                      <span className="text-white">{formatTime(dayHours.opens)} - {formatTime(dayHours.closes)}</span>
                      {showKitchen && dayHours.kitchen && (
                        <p className="text-xs text-gray-400 mt-1">
                          Kitchen: {formatTime(dayHours.kitchen.opens)} - {formatTime(dayHours.kitchen.closes)}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Full variant - for dedicated sections
  return (
    <div className="space-y-4">
      {/* Current Status */}
      <div className={`p-4 rounded-lg ${hours.currentStatus.isOpen ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`inline-block w-3 h-3 rounded-full ${hours.currentStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="font-semibold text-lg">
              {hours.currentStatus.isOpen ? 'We\'re Open!' : 'We\'re Closed'}
            </span>
          </div>
          {hours.currentStatus.isOpen && hours.currentStatus.closesIn && (
            <span className="text-sm text-gray-600">Closes in {hours.currentStatus.closesIn}</span>
          )}
          {!hours.currentStatus.isOpen && hours.currentStatus.opensIn && (
            <span className="text-sm text-gray-600">Opens in {hours.currentStatus.opensIn}</span>
          )}
        </div>
        {showKitchen && (
          <p className="text-sm mt-2 text-gray-700">
            Kitchen: {hours.currentStatus.kitchenOpen ? 
              <span className="text-green-700 font-medium">Open for food orders</span> : 
              <span className="text-red-700 font-medium">Closed</span>
            }
          </p>
        )}
      </div>

      {/* Regular Hours */}
      <div>
        <h3 className="font-bold text-lg mb-3">Opening Hours</h3>
        <div className="space-y-2">
          {dayOrder.map(day => {
            const dayHours = hours.regularHours[day]
            const isToday = day === today
            
            return (
              <div 
                key={day} 
                className={`flex justify-between items-start py-2 px-3 rounded ${
                  isToday ? 'bg-anchor-cream' : ''
                }`}
              >
                <span className={`font-medium capitalize ${isToday ? 'text-anchor-green' : ''}`}>
                  {day}
                  {isToday && <span className="text-xs ml-2 text-anchor-gold">(Today)</span>}
                </span>
                <div className="text-right">
                  {dayHours.is_closed ? (
                    <span className="text-gray-500">Closed</span>
                  ) : (
                    <>
                      <span>{formatTime(dayHours.opens)} - {formatTime(dayHours.closes)}</span>
                      {showKitchen && dayHours.kitchen && (
                        <p className="text-xs text-gray-600 mt-1">
                          Kitchen: {formatTime(dayHours.kitchen.opens)} - {formatTime(dayHours.kitchen.closes)}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Special Hours */}
      {hours.specialHours && hours.specialHours.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-3">Special Hours</h3>
          <div className="space-y-2">
            {hours.specialHours.map((special, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{new Date(special.date).toLocaleDateString('en-GB', { 
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}</span>
                  <span>
                    {special.is_closed ? 'Closed' : `${formatTime(special.opens!)} - ${formatTime(special.closes!)}`}
                  </span>
                </div>
                {special.reason && (
                  <p className="text-sm text-gray-600 mt-1">{special.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}