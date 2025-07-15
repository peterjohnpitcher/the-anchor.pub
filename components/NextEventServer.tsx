import Link from 'next/link'
import Image from 'next/image'
import { getUpcomingEvents, formatEventDate, formatEventTime } from '@/lib/api'
import { EventSchema } from '@/components/EventSchema'
import { CallToAction } from '@/components/CallToAction'

export async function NextEventServer() {
  try {
    const events = await getUpcomingEvents(1)
    const nextEvent = events?.[0]
    
    if (!nextEvent) {
      return (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-anchor-green to-anchor-green-dark p-6">
              <h2 className="text-2xl font-bold text-white text-center">Coming Soon</h2>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-600">Check back soon for our next exciting event!</p>
              <CallToAction href="/whats-on" variant="primary" className="mt-4">
                View All Events
              </CallToAction>
            </div>
          </div>
        </div>
      )
    }

    const eventDate = new Date(nextEvent.startDate)
    const isToday = new Date().toDateString() === eventDate.toDateString()
    const isTomorrow = new Date(Date.now() + 86400000).toDateString() === eventDate.toDateString()
    
    // Get event image
    const eventImage = nextEvent.image?.[0] || nextEvent.heroImageUrl || 
                      '/images/events/default-event-hero.jpg'
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <EventSchema event={nextEvent} />
          
          <div className="flex flex-col md:flex-row">
            {/* Event Image - Square on left for desktop */}
            <div className="relative w-full md:w-80 h-64 md:h-80 flex-shrink-0">
              <Image
                src={eventImage}
                alt={nextEvent.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
              {/* Date Badge Overlay */}
              <div className="absolute top-4 right-4 bg-anchor-green text-white px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm uppercase tracking-wide font-semibold">
                  {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : formatEventDate(nextEvent.startDate)}
                </p>
                <p className="text-xl font-bold">
                  {formatEventTime(nextEvent.startDate)}
                </p>
              </div>
            </div>
            
            {/* Event Content */}
            <div className="p-8 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-anchor-green mb-2">
                    {nextEvent.name}
                  </h2>
                  <p className="text-xl text-anchor-gold font-semibold">
                    {nextEvent.shortDescription || 'Special Event'}
                  </p>
                </div>
                {nextEvent.offers && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-anchor-green">
                      {nextEvent.offers.price === '0' ? 'FREE' : `£${nextEvent.offers.price}`}
                    </p>
                    {nextEvent.offers.price === '0' && (
                      <p className="text-sm text-gray-600">No ticket needed</p>
                    )}
                  </div>
                )}
              </div>
              
              {nextEvent.description && (
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {nextEvent.description}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <CallToAction 
                  href={`/events/${nextEvent.slug || nextEvent.id}`}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  View Details & Book
                </CallToAction>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch next event:', error)
    return null
  }
}