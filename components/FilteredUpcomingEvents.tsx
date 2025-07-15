import Link from 'next/link'
import Image from 'next/image'
import { getUpcomingEvents, getEventCategories, formatEventDate, formatEventTime, formatPrice, getEventShortDescription, formatDoorTime, hasLimitedAvailability, type Event } from '@/lib/api'
import { EventSchema } from '@/components/EventSchema'
import EventAvailability from '@/components/EventAvailability'

interface FilteredUpcomingEventsProps {
  categorySlug?: string | null
}

export async function FilteredUpcomingEvents({ categorySlug }: FilteredUpcomingEventsProps) {
  try {
    // Fetch events and categories in parallel
    const [events, categories] = await Promise.all([
      getUpcomingEvents(50), // Get more events for filtering
      getEventCategories()
    ])
    
    // Filter by category if specified
    let filteredEvents = events
    if (categorySlug) {
      const category = categories.find(cat => cat.slug === categorySlug)
      if (category) {
        filteredEvents = events.filter(event => event.category?.id === category.id)
      }
    }
    
    if (filteredEvents.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <p className="text-gray-600 text-lg">
            {categorySlug 
              ? `No upcoming events in this category at the moment.`
              : `No upcoming events scheduled at the moment.`
            }
          </p>
          <p className="text-gray-600 mt-2">Check back soon or follow us on social media for updates!</p>
        </div>
      )
    }

    return (
      <>
        {/* Generate individual schema for each event */}
        {filteredEvents.map(event => (
          <EventSchema key={event.id} event={event} />
        ))}
        
        <div className="space-y-6">
          {filteredEvents.map((event) => {
            const startTime = formatEventTime(event.startDate)
            const eventDate = formatEventDate(event.startDate)
            const eventImage = event.image?.[0] || event.heroImageUrl || 
                             '/images/events/default-event-hero.jpg'
            
            return (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Event Header with Name and Time */}
                <div className="bg-anchor-green text-white px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold line-clamp-1 text-white">{event.name}</h3>
                      <p className="text-sm sm:text-base opacity-90 text-white/90">{eventDate}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-lg sm:text-xl font-bold text-white">{startTime}</p>
                      {formatDoorTime(event.doorTime) && (
                        <p className="text-xs opacity-75 text-white/75">{formatDoorTime(event.doorTime)}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Mobile Layout */}
                <div className="sm:hidden p-4">
                  <div className="flex items-start gap-3">
                    {/* Mobile Thumbnail */}
                    <Link href={`/events/${event.slug || event.id}`} className="flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={eventImage}
                          alt={event.name}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>
                    </Link>
                    
                    {/* Mobile Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {getEventShortDescription(event)}
                      </p>
                      
                      {/* Mobile Meta Info */}
                      <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                        {event.offers && (
                          <span className={event.offers.price === "0" ? "text-green-600 font-semibold" : "text-anchor-gold font-semibold"}>
                            {event.offers.price === "0" ? "FREE" : formatPrice(event.offers.price, event.offers.priceCurrency)}
                          </span>
                        )}
                        
                        {event.category && (
                          <span 
                            className="inline-flex items-center px-2 py-0.5 font-semibold rounded-full"
                            style={{
                              backgroundColor: `${event.category.color}20`,
                              color: event.category.color
                            }}
                          >
                            {event.category.icon && <span className="mr-1">{event.category.icon}</span>}
                            {event.category.name}
                          </span>
                        )}
                        
                        <EventAvailability eventId={event.id} />
                      </div>
                      
                      {/* Mobile CTA */}
                      <Link 
                        href={`/events/${event.slug || event.id}`}
                        className="inline-flex items-center text-anchor-gold font-semibold text-sm"
                      >
                        View Details
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Desktop Layout */}
                <div className="hidden sm:block p-6">
                  <div className="flex items-start gap-4">
                    {/* Event Image */}
                    <Link href={`/events/${event.slug || event.id}`} className="flex-shrink-0">
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                        <Image
                          src={eventImage}
                          alt={event.name}
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-300"
                          sizes="128px"
                        />
                      </div>
                    </Link>
                    
                    <div className="flex-1">
                      <p className="text-gray-700 mb-3">
                        {getEventShortDescription(event)}
                      </p>
                      
                      {/* Event highlights if available */}
                      {event.highlights && event.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.highlights.slice(0, 3).map((highlight, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {event.offers && (
                          <span className={event.offers.price === "0" ? "text-green-600 font-semibold" : "text-anchor-gold font-semibold"}>
                            {event.offers.price === "0" ? "FREE EVENT" : formatPrice(event.offers.price, event.offers.priceCurrency)}
                          </span>
                        )}
                        
                        {/* Real-time availability */}
                        <EventAvailability eventId={event.id} />
                        
                        {event.performer && (
                          <span className="text-gray-600">
                            Featuring: {event.performer.name}
                          </span>
                        )}
                        
                        {event.duration && (
                          <span className="text-gray-500 text-xs">
                            Duration: {event.duration.replace('PT', '').replace('H', 'h ').replace('M', 'm')}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          {event.category && (
                            <span 
                              className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                              style={{
                                backgroundColor: `${event.category.color}20`,
                                color: event.category.color
                              }}
                            >
                              {event.category.icon && <span className="mr-1">{event.category.icon}</span>}
                              {event.category.name}
                            </span>
                          )}
                          
                          {event.video && event.video.length > 0 && (
                            <span className="text-xs text-gray-500">
                              📹 Video available
                            </span>
                          )}
                        </div>
                        
                        <Link 
                          href={`/events/${event.slug || event.id}`}
                          className="inline-flex items-center text-anchor-gold hover:text-anchor-gold-light font-semibold text-sm"
                        >
                          View Details & Book
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  } catch (error) {
    console.error('Failed to load upcoming events:', error)
    
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 mb-2">Unable to load upcoming events at the moment.</p>
        <p className="text-gray-600">Please try again later or contact us at 01753 682707.</p>
      </div>
    )
  }
}