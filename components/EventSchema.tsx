import { Event } from '@/lib/api'

interface EventSchemaProps {
  event: Event
}

// Helper function to calculate end date if not provided
function calculateEndDate(startDate: string, duration?: string): string {
  const start = new Date(startDate)
  // Default to 3 hours if no duration specified
  const durationHours = duration ? parseInt(duration.replace(/\D/g, '')) || 3 : 3
  start.setHours(start.getHours() + durationHours)
  return start.toISOString()
}

export function EventSchema({ event }: EventSchemaProps) {
  // Use event.url if available, otherwise construct from slug or ID
  const eventUrl = event.url || (event.slug ? `https://www.the-anchor.pub/events/${event.slug}` : `https://www.the-anchor.pub/events/${event.id}`)
  
  // Ensure we always have an image URL
  const eventImage = event.image?.[0] || event.heroImageUrl || event.thumbnailImageUrl || '/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg'
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": eventUrl,
    "identifier": event.identifier || event.id,
    "name": event.name,
    "description": event.longDescription || event.about || event.description || event.shortDescription || `Join us for ${event.name} at The Anchor pub in Stanwell Moor. Experience great food, drinks and entertainment in a welcoming atmosphere.`,
    ...(event.shortDescription && { "disambiguatingDescription": event.shortDescription }),
    ...(event.keywords && { 
      "keywords": Array.isArray(event.keywords) ? event.keywords.join(", ") : event.keywords 
    }),
    "startDate": event.startDate,
    "endDate": event.endDate || calculateEndDate(event.startDate, event.duration || undefined),
    ...(event.doorTime && { "doorTime": event.doorTime }),
    ...(event.duration && { "duration": event.duration }),
    "eventStatus": "https://schema.org/EventScheduled", // Always include this
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode", // Always include this
    "location": {
      "@type": "Place",
      "name": "The Anchor Pub", // Always include
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Horton Road", // Always include
        "addressLocality": "Stanwell Moor", // Always include
        "addressRegion": "Surrey", // Always include
        "postalCode": "TW19 6AQ", // Always include
        "addressCountry": "GB" // Always include
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.462509,
        "longitude": -0.502067
      }
    },
    "performer": event.performer ? {
      "@type": event.performer['@type'] || "Person",
      "name": event.performer.name
    } : {
      "@type": "Organization",
      "name": "The Anchor Entertainment",
      "url": "https://www.the-anchor.pub"
    },
    "offers": {
      "@type": "Offer",
      "url": eventUrl, // Always include the event URL
      "price": event.offers?.price || "0",
      "priceCurrency": event.offers?.priceCurrency || "GBP",
      "availability": event.remainingAttendeeCapacity === 0 ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      "validFrom": event.offers?.validFrom || new Date().toISOString()
    },
    "image": Array.isArray(event.image) && event.image.length > 0 ? event.image : [eventImage], // Always include image
    ...(event.thumbnailImageUrl && { "thumbnailUrl": event.thumbnailImageUrl }),
    "organizer": event.organizer || {
      "@type": "Organization",
      "name": "The Anchor",
      "url": "https://www.the-anchor.pub"
    },
    "isAccessibleForFree": event.isAccessibleForFree || (event.offers?.price === "0"),
    ...(event.maximumAttendeeCapacity && {
      "maximumAttendeeCapacity": event.maximumAttendeeCapacity
    }),
    ...(event.remainingAttendeeCapacity !== undefined && {
      "remainingAttendeeCapacity": event.remainingAttendeeCapacity
    }),
    "url": eventUrl,
    ...(event.mainEntityOfPage && { "mainEntityOfPage": event.mainEntityOfPage }),
    ...(event.potentialAction && { "potentialAction": event.potentialAction }),
    ...(event.highlights && event.highlights.length > 0 && {
      "subjectOf": {
        "@type": "CreativeWork",
        "abstract": event.highlights.join(" • ")
      }
    }),
    ...(event.video && event.video.length > 0 && {
      "video": event.video.map((videoUrl, index) => ({
        "@type": "VideoObject",
        "url": videoUrl,
        "name": `${event.name} - Video ${index + 1}`
      }))
    }),
    ...(event.promoVideoUrl && !event.video && {
      "video": {
        "@type": "VideoObject",
        "url": event.promoVideoUrl,
        "name": `${event.name} - Promotional Video`
      }
    }),
    // Removed incorrect FAQPage as subEvent - FAQPage should never be a subEvent of Event
    // FAQ content can be included in the event description or as a separate FAQPage on the event page
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}