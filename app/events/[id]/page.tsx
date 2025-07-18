import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button, Container, Section, Card, CardBody, Badge, Alert, Grid, GridItem } from '@/components/ui'
import { EventSchema } from '@/components/EventSchema'
import EventBooking from '@/components/EventBooking'
import EventAvailability from '@/components/EventAvailability'
import { anchorAPI, formatEventDate, formatEventTime, formatPrice, isEventFree, isEventSoldOut, formatDoorTime, formatEventDuration, hasLimitedAvailability } from '@/lib/api'
import { EventPageTracker } from '@/components/EventPageTracker'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const event = await anchorAPI.getEvent(params.id)
    
    return {
      title: event.metaTitle || `${event.name} | The Anchor Stanwell Moor`,
      description: event.metaDescription || event.shortDescription || event.description || `Join us for ${event.name} at The Anchor pub in Stanwell Moor. ${formatEventDate(event.startDate)} at ${formatEventTime(event.startDate)}.`,
      keywords: Array.isArray(event.keywords) ? event.keywords.join(', ') : event.keywords,
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
      <EventPageTracker 
        eventId={event.id}
        eventName={event.name}
        eventDate={event.startDate}
        eventCategory={event.category?.name}
        eventPrice={event.offers?.price ? parseFloat(event.offers.price) : undefined}
      />
      
      {/* Event Header Section - Mobile First */}
      <div className="mt-20 pt-6 pb-2 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Event Title and Basic Info */}
            <div className="text-center">
              {event.category && (
                <Badge 
                  variant="default"
                  size="sm"
                  className="mb-3"
                  style={{ backgroundColor: event.category.color, color: 'white' }}
                >
                  {event.category.name}
                </Badge>
              )}
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4 px-2">
                {event.name}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 text-gray-700 text-base md:text-lg">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-anchor-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="whitespace-nowrap">{eventDate}</span>
                </span>
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-anchor-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="whitespace-nowrap">{eventTime}</span>
                </span>
                {formatDoorTime(event.doorTime) && (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-anchor-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="whitespace-nowrap">{formatDoorTime(event.doorTime)}</span>
                  </span>
                )}
                {formatEventDuration(event.duration) && (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-anchor-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="whitespace-nowrap">{formatEventDuration(event.duration)}</span>
                  </span>
                )}
                {event.performer && (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-anchor-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="whitespace-nowrap">{event.performer.name}</span>
                  </span>
                )}
              </div>
              
              {(isSoldOut || hasLimitedAvailability(event)) && (
                <div className="flex justify-center mt-4">
                  {isSoldOut ? (
                    <span className="px-6 py-3 bg-red-600 text-white font-bold text-lg rounded-full">
                      SOLD OUT
                    </span>
                  ) : hasLimitedAvailability(event) ? (
                    <span className="px-6 py-3 bg-amber-600 text-white font-bold text-lg rounded-full animate-pulse">
                      LIMITED AVAILABILITY
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Event Details - Mobile First */}
      <div className="py-6 md:py-8 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Mobile: Image First, Desktop: Grid Layout */}
            {/* Square Event Image - Mobile: Full Width, Desktop: In Grid */}
            {(event.heroImageUrl || event.image?.[0]) && (
              <div className="lg:hidden mb-6">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg max-w-md mx-auto">
                  <Image
                    src={event.heroImageUrl || event.image![0]}
                    alt={event.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </div>
            )}
            
            {/* Mobile: Booking First for Better CTA */}
            <div className="lg:hidden mb-6">
              {!isSoldOut && event.booking_rules?.sms_confirmation_enabled !== false && (
                <EventBooking event={event} className="max-w-md mx-auto" />
              )}
            </div>
            
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-12">
              {/* Left Column - Event Image and Info */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                {/* Square Event Image - Desktop Only */}
                {(event.heroImageUrl || event.image?.[0]) && (
                  <div className="hidden lg:block relative aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg">
                    <Image
                      src={event.heroImageUrl || event.image![0]}
                      alt={event.name}
                      fill
                      className="object-contain"
                      sizes="320px"
                      priority
                    />
                  </div>
                )}
                
                {/* Quick Info Cards - Mobile: Grid, Desktop: Stack */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
                  {/* Price */}
                  <Card variant="default" className="bg-anchor-cream">
                    <CardBody className="p-4 md:p-6">
                      <p className="text-sm md:text-base text-gray-600 mb-1">Entry Price</p>
                      <p className={`text-xl md:text-2xl font-bold ${isFree ? 'text-green-600' : 'text-anchor-gold'}`}>
                        {isFree ? 'FREE' : event.offers ? formatPrice(event.offers.price, event.offers.priceCurrency) : 'TBC'}
                      </p>
                    </CardBody>
                  </Card>
                  
                  {/* Capacity */}
                  <Card variant="default" className="bg-anchor-cream">
                    <CardBody className="p-4 md:p-6">
                      <p className="text-sm md:text-base text-gray-600 mb-1">Availability</p>
                      <EventAvailability eventId={event.id} showDetails={true} />
                    </CardBody>
                  </Card>
                  
                  {/* Status */}
                  <Card variant="default" className="bg-anchor-cream col-span-2 lg:col-span-1">
                    <CardBody className="p-4 md:p-6">
                      <p className="text-sm md:text-base text-gray-600 mb-1">Status</p>
                      <p className={`text-base md:text-lg font-bold ${
                        event.eventStatus.includes('Cancelled') ? 'text-red-600' :
                        event.eventStatus.includes('Postponed') ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {event.eventStatus.includes('Cancelled') ? 'CANCELLED' :
                         event.eventStatus.includes('Postponed') ? 'POSTPONED' :
                         'CONFIRMED'}
                      </p>
                    </CardBody>
                  </Card>
                </div>
              </div>
              
              {/* Right Column - Details and Booking */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                {/* Desktop Booking Component */}
                <div className="hidden lg:block">
                  {!isSoldOut && event.booking_rules?.sms_confirmation_enabled !== false && (
                    <EventBooking event={event} className="mb-8" />
                  )}
                </div>
                
                {/* Description */}
                {(event.longDescription || event.about || event.description) && (
                  <div className="mb-6 lg:mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-anchor-green mb-3 md:mb-4">About This Event</h2>
                    <p className="text-gray-700 whitespace-pre-wrap text-base md:text-lg leading-relaxed">{event.longDescription || event.about || event.description}</p>
                  </div>
                )}
                
                {/* Highlights */}
                {event.highlights && event.highlights.length > 0 && (
                  <div className="mb-6 lg:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-anchor-green mb-3 md:mb-4">Event Highlights</h3>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-anchor-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 text-base">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Full Width Sections */}
            <div className="mt-8 space-y-6 md:space-y-8">
              {/* Location */}
              <Card variant="elevated" className="bg-gray-50">
                <CardBody className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-anchor-green mb-3 md:mb-4">Location</h2>
                  <address className="not-italic text-gray-700 text-base">
                    <p className="font-semibold">{event.location.name}</p>
                    <p>{event.location.address.streetAddress}</p>
                    <p>{event.location.address.addressLocality}, {event.location.address.addressRegion}</p>
                    <p>{event.location.address.postalCode}</p>
                  </address>
                  <Link 
                    href="/find-us"
                    className="inline-flex items-center text-anchor-gold hover:text-anchor-gold-light font-semibold mt-3 md:mt-4 text-base"
                  >
                    Get directions
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardBody>
              </Card>
            
              {/* FAQs */}
              {((event.faq && event.faq.length > 0) || (event.faqPage && event.faqPage.mainEntity.length > 0)) && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-anchor-green mb-4 md:mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-3 md:space-y-4">
                    {(event.faq || event.faqPage?.mainEntity || []).map((faq, index) => (
                      <Card key={index} variant="default" className="bg-gray-50">
                        <CardBody className="p-4 md:p-6">
                          <h3 className="font-semibold text-base md:text-lg text-anchor-green mb-2">{faq.name}</h3>
                          <p className="text-gray-700 text-sm md:text-base">{faq.acceptedAnswer.text}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Videos */}
              {event.video && event.video.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-anchor-green mb-4 md:mb-6">Event Videos</h2>
                  <div className="grid gap-4">
                    {event.video.map((videoUrl, index) => (
                      <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                        {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                          <iframe
                            src={videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={videoUrl}
                            controls
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section - Mobile First */}
      <div className="py-8 md:py-12 bg-anchor-green text-white">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            {isSoldOut ? "Join Our Waiting List" : "Reserve Your Spot"}
          </h2>
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            {isSoldOut 
              ? "This event is sold out but cancellations do happen. Call us to join the waiting list."
              : "Don't miss out! Book now to secure your place at this event."
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto sm:max-w-none">
            <Link href="tel:01753682707" className="w-full sm:w-auto">
              <Button 
                variant="secondary"
                size="lg"
                fullWidth
                className="bg-white text-anchor-green hover:bg-gray-100 sm:w-auto"
              >
                📞 Call: 01753 682707
              </Button>
            </Link>
            
            <Link href="/whats-on" className="w-full sm:w-auto">
              <Button 
                variant="secondary"
                size="lg"
                fullWidth
                className="bg-white text-anchor-green hover:bg-gray-100 sm:w-auto"
              >
                View All Events
              </Button>
            </Link>
          </div>
        </Container>
      </div>
      
    </>
  )
}

// Generate static params for known events (optional)
export async function generateStaticParams() {
  // For now, return empty array to generate pages on-demand
  // In production, you might want to pre-generate popular events
  return []
}