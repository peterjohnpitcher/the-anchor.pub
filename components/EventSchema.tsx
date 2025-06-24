import { Event } from '@/lib/api'

interface EventSchemaProps {
  event: Event
}

export function EventSchema({ event }: EventSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `https://the-anchor.pub/events/${event.id}`,
    "identifier": event.id,
    "name": event.name,
    "description": event.description || `Join us for ${event.name} at The Anchor`,
    "startDate": event.startDate,
    ...(event.endDate && { "endDate": event.endDate }),
    "eventStatus": event.eventStatus || "https://schema.org/EventScheduled",
    "eventAttendanceMode": event.eventAttendanceMode || "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location?.name || "The Anchor Pub",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.location?.address?.streetAddress || "Horton Road",
        "addressLocality": event.location?.address?.addressLocality || "Stanwell Moor",
        "addressRegion": event.location?.address?.addressRegion || "Surrey",
        "postalCode": event.location?.address?.postalCode || "TW19 6AQ",
        "addressCountry": event.location?.address?.addressCountry || "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.4567,
        "longitude": -0.4567
      }
    },
    ...(event.performer && {
      "performer": {
        "@type": event.performer['@type'] || "Person",
        "name": event.performer.name
      }
    }),
    ...(event.offers && {
      "offers": {
        "@type": "Offer",
        "url": event.offers.url || `https://the-anchor.pub/events/${event.id}`,
        "price": event.offers.price,
        "priceCurrency": event.offers.priceCurrency || "GBP",
        "availability": event.offers.availability || "https://schema.org/InStock",
        "validFrom": event.offers.validFrom || new Date().toISOString(),
        ...(event.remainingAttendeeCapacity === 0 && {
          "availability": "https://schema.org/SoldOut"
        })
      }
    }),
    ...(event.image && event.image.length > 0 && {
      "image": event.image
    }),
    "organizer": event.organizer || {
      "@type": "Organization",
      "name": "The Anchor",
      "url": "https://the-anchor.pub"
    },
    "isAccessibleForFree": event.isAccessibleForFree || (event.offers?.price === "0"),
    ...(event.maximumAttendeeCapacity && {
      "maximumAttendeeCapacity": event.maximumAttendeeCapacity
    }),
    ...(event.remainingAttendeeCapacity !== undefined && {
      "remainingAttendeeCapacity": event.remainingAttendeeCapacity
    }),
    "url": `https://the-anchor.pub/events/${event.id}`
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