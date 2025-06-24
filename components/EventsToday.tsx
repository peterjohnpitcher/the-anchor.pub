'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTodaysEvents, formatEventTime, type Event } from '@/lib/api'

// Map API event data to our display format
function mapEventToDisplay(event: Event) {
  const startTime = formatEventTime(event.startDate)
  
  // Link to individual event page
  const link = `/events/${event.slug || event.id}`
  
  return {
    id: event.id,
    name: event.name,
    time: startTime,
    description: event.description || 'Join us for a great time!',
    link,
    price: event.offers?.price,
    soldOut: event.remainingAttendeeCapacity === 0
  }
}

// Fallback data for when API is unavailable
const fallbackEvents = [
  {
    id: 'fallback-1',
    name: 'Check Our Events',
    time: 'Various Times',
    description: 'Call us for today\'s events schedule',
    link: '/whats-on'
  }
]

export function EventsToday() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const apiEvents = await getTodaysEvents()
        
        if (apiEvents.length > 0) {
          const mappedEvents = apiEvents.map(mapEventToDisplay)
          setEvents(mappedEvents)
        } else {
          // No events today, use day-specific message
          const day = new Date().getDay()
          const dayEvents = getDaySpecificEvents(day)
          setEvents(dayEvents)
        }
      } catch (err) {
        console.error('Failed to fetch events:', err)
        setError('Unable to load events')
        // Use fallback events on error
        setEvents(fallbackEvents)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Day-specific events when no API events are available
  function getDaySpecificEvents(day: number) {
    const dayEvents: Record<number, any[]> = {
      0: [ // Sunday
        {
          id: 'sunday-roast',
          name: 'Sunday Roast',
          time: '12:00 PM - 5:00 PM',
          description: 'Traditional British roast dinner with all the trimmings',
          link: '/sunday-lunch'
        }
      ],
      1: [ // Monday
        {
          id: 'pub-open',
          name: 'Bar Open',
          time: '4:00 PM - 10:00 PM',
          description: 'Relax with a drink (kitchen closed Mondays)',
          link: '/drinks'
        }
      ],
      2: [ // Tuesday
        {
          id: 'quiz-night',
          name: 'Quiz Night',
          time: '8:00 PM',
          description: 'Test your knowledge and win prizes!',
          link: '/whats-on/quiz-night'
        }
      ],
      3: [ // Wednesday
        {
          id: 'midweek-specials',
          name: 'Midweek Specials',
          time: '6:00 PM - 9:00 PM',
          description: 'Great deals on food and drinks',
          link: '/food-menu'
        }
      ],
      4: [ // Thursday
        {
          id: 'thursday-specials',
          name: 'Thursday Specials',
          time: '6:00 PM - 9:00 PM',
          description: 'Great deals on drinks and food',
          link: '/whats-on'
        }
      ],
      5: [ // Friday
        {
          id: 'live-music',
          name: 'Live Music',
          time: '8:00 PM',
          description: 'Local bands and artists performing',
          link: '/whats-on/live-music'
        }
      ],
      6: [ // Saturday
        {
          id: 'drag-show',
          name: 'Drag Show with Nikki Manfadge',
          time: '9:00 PM',
          description: 'Spectacular drag performance and entertainment',
          link: '/whats-on/drag-shows'
        },
        {
          id: 'cash-bingo',
          name: 'Cash Bingo',
          time: '3:00 PM',
          description: 'Win cash prizes in our monthly bingo',
          link: '/whats-on/cash-bingo'
        }
      ]
    }

    return dayEvents[day] || []
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="text-gray-600 mt-2">Loading today&apos;s events...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-red-700 mb-4">{error}</p>
          <Link href="/whats-on" className="text-anchor-gold hover:text-anchor-gold-light font-semibold">
            View our regular events →
          </Link>
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-anchor-sand/30 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-gray-700 text-lg mb-4">No special events today, but we&apos;re open as usual!</p>
          <Link href="/whats-on" className="text-anchor-gold hover:text-anchor-gold-light font-semibold inline-flex items-center gap-2">
            View all upcoming events
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {events.map((event) => (
        <div key={event.id} className="card-warm bg-white border-2 border-anchor-sand p-6 group">
          <div className="mb-4">
            <h3 className="font-bold text-2xl text-anchor-green mb-2">{event.name}</h3>
            <p className="text-anchor-gold font-medium text-sm">{event.time}</p>
            {event.price && (
              <p className={`text-sm mt-1 ${event.price === "0" ? "text-green-600 font-semibold" : "text-gray-600"}`}>
                {event.price === "0" ? "FREE EVENT" : `From £${event.price}`}
              </p>
            )}
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>
          {event.soldOut && (
            <p className="text-sm text-red-600 font-semibold mb-3">SOLD OUT</p>
          )}
          <Link 
            href={event.link}
            className="inline-flex items-center text-anchor-gold font-semibold hover:text-anchor-gold-light transition-colors gap-2"
          >
            <span>Find out more</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  )
}