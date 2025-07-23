import Link from 'next/link'
import { getUpcomingEvents, formatEventDate, formatEventTime, formatPrice, getEventShortDescription, formatDoorTime, hasLimitedAvailability } from '@/lib/api'
import { EventSchema } from '@/components/EventSchema'
import { PhoneLink } from '@/components/PhoneLink'

export async function UpcomingEvents() {
  try {
    const events = await getUpcomingEvents(20)
    
    if (events.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No upcoming events scheduled at the moment.</p>
          <p className="text-gray-600 mt-2">Check back soon or follow us on social media for updates!</p>
        </div>
      )
    }

    // Group events by date
    const eventsByDate = events.reduce((acc, event) => {
      const date = formatEventDate(event.startDate)
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(event)
      return acc
    }, {} as Record<string, typeof events>)

    // Generate ItemList schema for all events
    const eventListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Upcoming Events at The Anchor",
      "description": "All upcoming events, entertainment, and special occasions at The Anchor pub in Stanwell Moor",
      "numberOfItems": events.length,
      "itemListElement": events.map((event, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Event",
          "@id": event.slug ? `https://the-anchor.pub/events/${event.slug}` : `https://the-anchor.pub/events/${event.id}`,
          "name": event.name,
          "startDate": event.startDate,
          "url": event.slug ? `https://the-anchor.pub/events/${event.slug}` : `https://the-anchor.pub/events/${event.id}`
        }
      }))
    }

    return (
      <>
        {/* Generate ItemList schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventListSchema)
          }}
        />
        
        {/* Generate individual schema for each event */}
        {events.map(event => (
          <EventSchema key={event.id} event={event} />
        ))}
        
        <div className="space-y-8">
          {Object.entries(eventsByDate).map(([date, dateEvents]) => (
          <div key={date} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-anchor-green text-white px-6 py-4">
              <h3 className="text-xl font-bold">{date}</h3>
            </div>
            <div className="p-6 space-y-6">
              {dateEvents.map((event) => {
                const startTime = formatEventTime(event.startDate)
                
                return (
                  <div key={event.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-20 text-center">
                      <p className="text-anchor-gold font-bold text-lg">{startTime}</p>
                    </div>
                    <div className="flex-1">
                      <Link href={`/events/${event.slug || event.id}`}>
                        <h4 className="text-xl font-bold text-anchor-green mb-2 hover:text-anchor-gold transition-colors">
                          {event.name}
                        </h4>
                      </Link>
                      <p className="text-gray-700 mb-3 line-clamp-2">
                        {getEventShortDescription(event)}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        {event.offers && (
                          <span className={event.offers.price === "0" ? "text-green-600 font-semibold" : "text-anchor-gold font-semibold"}>
                            {event.offers.price === "0" ? "FREE EVENT" : formatPrice(event.offers.price, event.offers.priceCurrency)}
                          </span>
                        )}
                        {event.remainingAttendeeCapacity === 0 && (
                          <span className="text-red-600 font-semibold">
                            SOLD OUT
                          </span>
                        )}
                        {hasLimitedAvailability(event) && event.remainingAttendeeCapacity !== 0 && (
                          <span className="text-amber-600 font-semibold animate-pulse">
                            LIMITED AVAILABILITY
                          </span>
                        )}
                        {event.remainingAttendeeCapacity && event.remainingAttendeeCapacity > 0 && !hasLimitedAvailability(event) && (
                          <span className="text-gray-600">
                            {event.remainingAttendeeCapacity} seats available
                          </span>
                        )}
                        {formatDoorTime(event.doorTime) && (
                          <span className="text-gray-600">
                            {formatDoorTime(event.doorTime)}
                          </span>
                        )}
                        {event.performer && (
                          <span className="text-gray-600">
                            Featuring: {event.performer.name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        {event.category && (
                          <span 
                            className="inline-block px-3 py-1 text-sm sm:text-xs font-semibold rounded-full"
                            style={{
                              backgroundColor: `${event.category.color}20`,
                              color: event.category.color
                            }}
                          >
                            {event.category.name}
                          </span>
                        )}
                        <Link 
                          href={`/events/${event.slug || event.id}`}
                          className="inline-flex items-center text-anchor-gold hover:text-anchor-gold-light font-semibold text-sm"
                        >
                          View {event.name} Details
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        </div>
      </>
    )
  } catch (error) {
    // Error: Failed to load upcoming events
    
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 mb-2">We couldn't load the events right now. Please refresh the page or try again in a moment.</p>
        <p className="text-gray-700 text-sm mt-2">Need help? <PhoneLink phone="+441753682707" source="upcoming_events_error" className="text-anchor-gold hover:text-anchor-gold-light font-semibold underline" showIcon={false}>Call us at 01753 682707</PhoneLink></p>
      </div>
    )
  }
}