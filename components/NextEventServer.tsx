import Link from 'next/link'
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
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <EventSchema event={nextEvent} />
          
          {/* Date Badge */}
          <div className="bg-gradient-to-r from-anchor-green to-anchor-green-dark p-6">
            <div className="text-center">
              <p className="text-white/80 text-sm uppercase tracking-wide">
                {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : formatEventDate(nextEvent.startDate)}
              </p>
              <p className="text-2xl font-bold text-white">
                {formatEventTime(nextEvent.startDate)}
              </p>
            </div>
          </div>
          
          {/* Event Content */}
          <div className="p-8">
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
                href={`/events/${nextEvent.slug}`}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                Learn More
              </CallToAction>
              
              {nextEvent.offers?.url && (
                <CallToAction 
                  href={nextEvent.offers.url}
                  variant="secondary"
                  size="lg"
                  external
                  className="flex-1"
                >
                  Book Now
                </CallToAction>
              )}
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