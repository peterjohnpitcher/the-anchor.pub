import Link from 'next/link'
import { getUpcomingEvents, formatEventDate, formatEventTime, formatPrice } from '@/lib/api'

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

    return (
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
                      <h4 className="text-xl font-bold text-anchor-green mb-2">{event.name}</h4>
                      <p className="text-gray-700 mb-3">{event.description}</p>
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
                        {event.performer && (
                          <span className="text-gray-600">
                            Featuring: {event.performer.name}
                          </span>
                        )}
                      </div>
                      {event.category && (
                        <span 
                          className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full"
                          style={{
                            backgroundColor: `${event.category.color}20`,
                            color: event.category.color
                          }}
                        >
                          {event.category.name}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
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