import type { Event } from './api'

// Helper to create recurring event objects that can use the EventSchema component
export function createRecurringEvent(params: {
  id: string
  slug: string
  name: string
  description: string
  longDescription?: string
  shortDescription?: string
  image: string[]
  price?: string
  duration?: string
  category?: {
    id: string
    name: string
    slug: string
    color: string
    icon: string
  }
  performer?: {
    name: string
    type?: string
  }
  dayOfWeek?: string
  startTime?: string
  endTime?: string
}): Event {
  const now = new Date()
  const oneYearLater = new Date(now)
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1)
  
  return {
    id: params.id,
    slug: params.slug,
    name: params.name,
    description: params.description,
    longDescription: params.longDescription || params.description,
    shortDescription: params.shortDescription || params.description.substring(0, 100),
    startDate: now.toISOString(),
    endDate: oneYearLater.toISOString(),
    duration: params.duration || 'PT3H',
    image: params.image,
    offers: {
      price: params.price || '0',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      validFrom: now.toISOString()
    },
    category: params.category || {
      id: 'events',
      name: 'Events',
      slug: 'events',
      color: '#D4AF37',
      icon: '🎉'
    },
    performer: params.performer,
    maximumAttendeeCapacity: 100,
    remainingAttendeeCapacity: 100,
    isAccessibleForFree: params.price === '0',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
  } as Event
}

// Pre-configured events that can be imported and used
export const staticEvents = {
  pizzaTuesday: createRecurringEvent({
    id: 'pizza-tuesday-weekly',
    slug: 'pizza-tuesday',
    name: 'Pizza Tuesday at The Anchor',
    description: 'Weekly BOGOF pizza deal every Tuesday. Buy one pizza, get one free on our entire stone-baked pizza menu.',
    longDescription: 'Weekly BOGOF pizza deal every Tuesday. Buy one pizza, get one free on our entire stone-baked pizza menu. Perfect for families, couples, or friends looking for great value dining near Heathrow.',
    shortDescription: 'Buy one pizza, get one FREE every Tuesday!',
    image: [
      '/images/food/pizza/the-anchor-stone-baked-pizza-stanwell-moor.jpg',
      '/images/food/pizza/margherita-pizza-the-anchor.jpg'
    ],
    price: '0',
    category: {
      id: 'special-offers',
      name: 'Special Offers',
      slug: 'special-offers',
      color: '#D4AF37',
      icon: '🍕'
    },
    dayOfWeek: 'Tuesday',
    startTime: '18:00',
    endTime: '21:00'
  }),
  
  corporateEvents: createRecurringEvent({
    id: 'corporate-events',
    slug: 'corporate-events',
    name: 'Corporate Events & Meetings',
    description: 'Professional venue hire for corporate events, meetings, and team building activities.',
    longDescription: 'Transform your next corporate event at The Anchor. Our flexible venue spaces accommodate meetings, presentations, team building activities, and corporate celebrations. Full catering options, AV equipment, and dedicated event support available.',
    shortDescription: 'Professional corporate event venue near Heathrow',
    image: [
      '/images/venue/function-room/the-anchor-corporate-events-stanwell-moor.jpg',
      '/images/venue/function-room/meeting-room-setup-the-anchor.jpg'
    ],
    price: 'Variable',
    duration: 'PT8H',
    category: {
      id: 'corporate',
      name: 'Corporate',
      slug: 'corporate',
      color: '#1e3a8a',
      icon: '💼'
    },
    performer: {
      name: 'The Anchor Events Team',
      type: 'Organization'
    }
  }),
  
  christmasParties: createRecurringEvent({
    id: 'christmas-parties-2024',
    slug: 'christmas-parties',
    name: 'Christmas Party Bookings',
    description: 'Book your Christmas party at The Anchor. Festive menus, decorations, and entertainment.',
    longDescription: 'Make your Christmas celebration special at The Anchor. We offer tailored Christmas party packages including festive menus, seasonal decorations, and optional entertainment. Perfect for office parties, family gatherings, or festive get-togethers.',
    shortDescription: 'Festive party venue with full Christmas packages',
    image: [
      '/images/events/christmas/the-anchor-christmas-party-venue.jpg',
      '/images/events/christmas/festive-dining-the-anchor.jpg'
    ],
    price: 'From £19.95',
    duration: 'PT4H',
    category: {
      id: 'seasonal',
      name: 'Seasonal Events',
      slug: 'seasonal',
      color: '#dc2626',
      icon: '🎄'
    },
    performer: {
      name: 'The Anchor Entertainment',
      type: 'Organization'
    },
    startTime: '12:00',
    endTime: '23:00'
  })
}