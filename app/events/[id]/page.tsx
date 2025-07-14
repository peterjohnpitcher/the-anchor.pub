import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CallToAction } from '@/components/CallToAction'
import { EventSchema } from '@/components/EventSchema'
import { anchorAPI, formatEventDate, formatEventTime, formatPrice, isEventFree, isEventSoldOut } from '@/lib/api'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const event = await anchorAPI.getEvent(params.id)
    
    return {
      title: event.metaTitle || `${event.name} | The Anchor Stanwell Moor`,
      description: event.metaDescription || event.shortDescription || event.description || `Join us for ${event.name} at The Anchor pub in Stanwell Moor. ${formatEventDate(event.startDate)} at ${formatEventTime(event.startDate)}.`,
      keywords: event.keywords?.join(', '),
      openGraph: {
        title: event.name,
        description: event.shortDescription || event.description || `Event at The Anchor - ${formatEventDate(event.startDate)}`,
        images: event.heroImageUrl ? [event.heroImageUrl] : event.image?.[0] ? [event.image[0]] : ['/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg'],
        type: 'website',
      },
    }
  } catch {
    return {
      title: 'Event Not Found | The Anchor Stanwell Moor',
      description: 'This event could not be found.',
    }
  }
}

export default async function EventPage({ params }: Props) {
  let event
  
  try {
    event = await anchorAPI.getEvent(params.id)
  } catch (error) {
    notFound()
  }

  const eventDate = formatEventDate(event.startDate)
  const eventTime = formatEventTime(event.startDate)
  const isFree = isEventFree(event)
  const isSoldOut = isEventSoldOut(event)
  
  // Determine event type for styling
  const eventType = event.name.toLowerCase()
  const isDragShow = eventType.includes('drag')
  const isQuiz = eventType.includes('quiz')
  const isSpecialEvent = eventType.includes('special') || eventType.includes('celebration')
  const isBingo = eventType.includes('bingo')
  const isMusic = eventType.includes('music') || eventType.includes('karaoke')
  
  return (
    <>
      <EventSchema event={event} />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center mt-20">
        {(event.heroImageUrl || event.image?.[0]) ? (
          <div className="absolute inset-0">
            <Image
              src={event.heroImageUrl || event.image![0]}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
        ) : (
          <div className={`absolute inset-0 ${
            isDragShow ? 'bg-gradient-to-br from-purple-600 to-pink-600' :
            isQuiz ? 'bg-gradient-to-br from-blue-600 to-indigo-600' :
            isMusic ? 'bg-gradient-to-br from-amber-600 to-orange-600' :
            isBingo ? 'bg-gradient-to-br from-green-600 to-emerald-600' :
            'bg-gradient-to-br from-anchor-green to-anchor-green-dark'
          }`} />
        )}
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {event.category && (
              <span 
                className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-4"
                style={{ backgroundColor: event.category.color }}
              >
                {event.category.name}
              </span>
            )}
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              {event.name}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 text-white text-lg mb-8">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {eventDate}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {eventTime}
              </span>
              {event.performer && (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {event.performer.name}
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {isSoldOut ? (
                <span className="px-8 py-4 bg-red-600 text-white font-bold text-xl rounded-full">
                  SOLD OUT
                </span>
              ) : (
                <>
                  <CallToAction 
                    href="tel:01753682707"
                    variant="primary"
                    size="lg"
                  >
                    📞 Book Now
                  </CallToAction>
                  {event.offers?.url && (
                    <CallToAction 
                      href={event.offers.url}
                      variant="white"
                      size="lg"
                    >
                      Book Online
                    </CallToAction>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Price */}
              <div className="text-center">
                <div className="bg-anchor-cream rounded-2xl p-6">
                  <p className="text-sm text-gray-600 mb-2">Entry Price</p>
                  <p className={`text-3xl font-bold ${isFree ? 'text-green-600' : 'text-anchor-gold'}`}>
                    {isFree ? 'FREE' : event.offers ? formatPrice(event.offers.price, event.offers.priceCurrency) : 'TBC'}
                  </p>
                </div>
              </div>
              
              {/* Capacity */}
              {event.maximumAttendeeCapacity && (
                <div className="text-center">
                  <div className="bg-anchor-cream rounded-2xl p-6">
                    <p className="text-sm text-gray-600 mb-2">Availability</p>
                    <p className="text-3xl font-bold text-anchor-green">
                      {event.remainingAttendeeCapacity || 0}
                    </p>
                    <p className="text-sm text-gray-600">of {event.maximumAttendeeCapacity} spaces</p>
                  </div>
                </div>
              )}
              
              {/* Status */}
              <div className="text-center">
                <div className="bg-anchor-cream rounded-2xl p-6">
                  <p className="text-sm text-gray-600 mb-2">Status</p>
                  <p className={`text-lg font-bold ${
                    event.eventStatus.includes('Cancelled') ? 'text-red-600' :
                    event.eventStatus.includes('Postponed') ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {event.eventStatus.includes('Cancelled') ? 'CANCELLED' :
                     event.eventStatus.includes('Postponed') ? 'POSTPONED' :
                     'CONFIRMED'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            {(event.longDescription || event.description) && (
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-3xl font-bold text-anchor-green mb-6">About This Event</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{event.longDescription || event.description}</p>
              </div>
            )}
            
            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Event Highlights</h3>
                <ul className="space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-anchor-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Location */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-anchor-green mb-4">Location</h2>
              <address className="not-italic text-gray-700">
                <p className="font-semibold">{event.location.name}</p>
                <p>{event.location.address.streetAddress}</p>
                <p>{event.location.address.addressLocality}, {event.location.address.addressRegion}</p>
                <p>{event.location.address.postalCode}</p>
              </address>
              <Link 
                href="/find-us"
                className="inline-flex items-center text-anchor-gold hover:text-anchor-gold-light font-semibold mt-4"
              >
                Get directions
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Additional Images */}
            {((event.galleryImages && event.galleryImages.length > 0) || (event.image && event.image.length > 1)) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-anchor-green mb-6">Event Photos</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {(event.galleryImages || event.image?.slice(1) || []).map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={img}
                        alt={`${event.name} - Photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* FAQs */}
            {event.faqPage && event.faqPage.mainEntity.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-anchor-green mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {event.faqPage.mainEntity.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-lg text-anchor-green mb-2">{faq.name}</h3>
                      <p className="text-gray-700">{faq.acceptedAnswer.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {isSoldOut ? "Join Our Waiting List" : "Reserve Your Spot"}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isSoldOut 
              ? "This event is sold out but cancellations do happen. Call us to join the waiting list."
              : "Don't miss out! Book now to secure your place at this event."
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 Call: 01753 682707
            </CallToAction>
            
            <CallToAction 
              href="/whats-on"
              variant="white"
              size="lg"
            >
              View All Events
            </CallToAction>
          </div>
        </div>
      </section>
      
    </>
  )
}

// Generate static params for known events (optional)
export async function generateStaticParams() {
  // For now, return empty array to generate pages on-demand
  // In production, you might want to pre-generate popular events
  return []
}