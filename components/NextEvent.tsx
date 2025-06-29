'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatEventDate, formatEventTime, type Event } from '@/lib/api'
import { EventSchema } from '@/components/EventSchema'

export function NextEvent() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNextEvent() {
      try {
        const response = await fetch('/api/events?limit=1')
        
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        
        const data = await response.json()
        const events = data.events || []
        
        if (events.length > 0) {
          setNextEvent(events[0])
        } else {
          setError('No upcoming events scheduled')
        }
      } catch (err) {
        console.error('Failed to fetch next event:', err)
        setError('Unable to load event information')
      } finally {
        setLoading(false)
      }
    }

    fetchNextEvent()
  }, [])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
          <div className="bg-gray-300 h-[72px]"></div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="h-9 bg-gray-300 rounded w-64 mb-2"></div>
                <div className="h-7 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="h-7 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="h-12 bg-gray-300 rounded-full w-36"></div>
              <div className="h-12 bg-gray-300 rounded-full w-36"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !nextEvent) {
    return (
      <div className="text-center py-8">
        <div className="bg-anchor-sand/30 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-gray-700 text-lg mb-4">
            {error || 'No upcoming events at the moment'}
          </p>
          <Link href="/whats-on" className="text-anchor-gold hover:text-anchor-gold-light font-semibold inline-flex items-center gap-2">
            Check our events calendar
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  const eventDate = formatEventDate(nextEvent.startDate)
  const eventTime = formatEventTime(nextEvent.startDate)
  const isToday = new Date(nextEvent.startDate).toDateString() === new Date().toDateString()
  const isTomorrow = new Date(nextEvent.startDate).toDateString() === 
    new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()

  // Link to individual event page
  const link = `/events/${nextEvent.slug || nextEvent.id}`

  return (
    <>
      <EventSchema event={nextEvent} />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-anchor-green text-white p-6">
          <p className="text-lg font-semibold">
            {isToday ? 'TODAY' : isTomorrow ? 'TOMORROW' : eventDate}
          </p>
        </div>
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-3xl font-bold text-anchor-green mb-2">{nextEvent.name}</h3>
              <p className="text-xl text-anchor-gold font-medium">{eventTime}</p>
            </div>
            {nextEvent.offers && (
              <div className="text-right">
                <p className={`text-xl font-bold ${nextEvent.offers.price === "0" ? "text-green-600" : "text-anchor-gold"}`}>
                  {nextEvent.offers.price === "0" ? "FREE EVENT" : `£${nextEvent.offers.price}`}
                </p>
                {nextEvent.remainingAttendeeCapacity === 0 && (
                  <p className="text-red-600 font-semibold text-sm mt-1">SOLD OUT</p>
                )}
              </div>
            )}
          </div>
          
          {nextEvent.description && (
            <p className="text-gray-700 text-lg mb-6">{nextEvent.description}</p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={link}
              className="inline-flex items-center justify-center px-6 py-3 bg-anchor-gold text-white font-semibold rounded-full hover:bg-anchor-gold-light transition-colors gap-2"
            >
              Learn More
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link 
              href="/whats-on"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-anchor-green font-semibold rounded-full border-2 border-anchor-green hover:bg-anchor-green hover:text-white transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}