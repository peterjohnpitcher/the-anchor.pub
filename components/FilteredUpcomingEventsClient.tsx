'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { formatEventDate, formatEventTime, formatPrice, getEventShortDescription, formatDoorTime, type Event } from '@/lib/api'
import { EventSchema } from '@/components/EventSchema'
import EventAvailability from '@/components/EventAvailability'

interface EventCardProps {
  event: Event
  index: number
}

const EventCard = memo(function EventCard({ event, index }: EventCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px'
  })

  const startTime = formatEventTime(event.startDate)
  const eventDate = formatEventDate(event.startDate)
  const eventImage = event.image?.[0] || event.heroImageUrl || '/images/events/default-event-hero.jpg'

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {inView ? (
        <>
          <EventSchema event={event} />
          
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
                    loading={index < 3 ? "eager" : "lazy"}
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
                    loading={index < 3 ? "eager" : "lazy"}
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
        </>
      ) : (
        // Loading skeleton
        <div className="animate-pulse">
          <div className="bg-gray-300 h-20 sm:h-24"></div>
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

import { memo } from 'react'

// Virtual scrolling configuration
const INITIAL_LOAD = 10
const BATCH_SIZE = 10
const OVERSCAN = 3 // Render this many items above/below viewport

interface FilteredUpcomingEventsClientProps {
  events: Event[]
  categorySlug?: string | null
}

export function FilteredUpcomingEventsClient({ events, categorySlug }: FilteredUpcomingEventsClientProps) {
  const [displayCount, setDisplayCount] = useState(INITIAL_LOAD)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: INITIAL_LOAD })

  // Calculate which events should be rendered based on scroll position
  const virtualizedEvents = useMemo(() => {
    const start = Math.max(0, visibleRange.start - OVERSCAN)
    const end = Math.min(displayCount, visibleRange.end + OVERSCAN)
    return events.slice(start, end).map((event, idx) => ({
      event,
      originalIndex: start + idx
    }))
  }, [events, visibleRange, displayCount])

  const hasMore = displayCount < events.length

  const loadMore = useCallback(() => {
    setIsLoadingMore(true)
    // Use requestAnimationFrame for smoother loading
    requestAnimationFrame(() => {
      setDisplayCount(prev => Math.min(prev + BATCH_SIZE, events.length))
      setIsLoadingMore(false)
    })
  }, [events.length])

  // Update visible range based on scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const items = container.querySelectorAll('[data-event-index]')
      
      let newStart = 0
      let newEnd = displayCount

      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const index = parseInt(item.getAttribute('data-event-index') || '0')
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          newStart = Math.min(newStart, index)
          newEnd = Math.max(newEnd, index + 1)
        }
      })

      setVisibleRange({ start: newStart, end: newEnd })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayCount])

  // Auto-load more when scrolling near bottom
  const { ref: loadMoreRef } = useInView({
    threshold: 0.1,
    rootMargin: '200px',
    onChange: (inView) => {
      if (inView && hasMore && !isLoadingMore) {
        loadMore()
      }
    }
  })

  if (events.length === 0) {
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
    <div ref={containerRef} className="space-y-6" role="feed" aria-busy={isLoadingMore}>
      {/* Spacer for items above viewport */}
      {visibleRange.start > 0 && (
        <div 
          style={{ height: `${visibleRange.start * 400}px` }} 
          aria-hidden="true"
        />
      )}
      
      {virtualizedEvents.map(({ event, originalIndex }) => (
        <div key={event.id} data-event-index={originalIndex}>
          <EventCard event={event} index={originalIndex} />
        </div>
      ))}
      
      {/* Spacer for items below viewport */}
      {visibleRange.end < displayCount && (
        <div 
          style={{ height: `${(displayCount - visibleRange.end) * 400}px` }} 
          aria-hidden="true"
        />
      )}
      
      {hasMore && (
        <div ref={loadMoreRef} className="text-center py-8">
          {isLoadingMore ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 bg-anchor-gold rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-4 h-4 bg-anchor-gold rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-4 h-4 bg-anchor-gold rounded-full animate-bounce"></div>
            </div>
          ) : (
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-anchor-gold text-white rounded-full font-semibold hover:bg-anchor-gold-light transition-colors"
              aria-label={`Load more events. ${events.length - displayCount} remaining`}
            >
              Load More Events ({events.length - displayCount} remaining)
            </button>
          )}
        </div>
      )}
      
      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isLoadingMore ? 'Loading more events' : `Showing ${displayCount} of ${events.length} events`}
      </div>
    </div>
  )
}