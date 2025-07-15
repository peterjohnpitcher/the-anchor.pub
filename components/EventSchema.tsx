import { Event } from '@/lib/api'

interface EventSchemaProps {
  event: Event
}

export function EventSchema({ event }: EventSchemaProps) {
  // Use event.url if available, otherwise construct from slug or ID
  const eventUrl = event.url || (event.slug ? `https://the-anchor.pub/events/${event.slug}` : `https://the-anchor.pub/events/${event.id}`)
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": eventUrl,
    "identifier": event.identifier || event.id,
    "name": event.name,
    "description": event.longDescription || event.about || event.description || `Join us for ${event.name} at The Anchor`,
    ...(event.shortDescription && { "disambiguatingDescription": event.shortDescription }),
    ...(event.keywords && { 
      "keywords": Array.isArray(event.keywords) ? event.keywords.join(", ") : event.keywords 
    }),
    "startDate": event.startDate,
    ...(event.endDate && { "endDate": event.endDate }),
    ...(event.doorTime && { "doorTime": event.doorTime }),
    ...(event.duration && { "duration": event.duration }),
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
        "url": event.offers.url || eventUrl,
        "price": event.offers.price,
        "priceCurrency": event.offers.priceCurrency || "GBP",
        "availability": event.offers.availability || "https://schema.org/InStock",
        "validFrom": event.offers.validFrom || new Date().toISOString(),
        ...(event.remainingAttendeeCapacity === 0 && {
          "availability": "https://schema.org/SoldOut"
        }),
        ...(event.offers.inventoryLevel && {
          "inventoryLevel": event.offers.inventoryLevel
        })
      }
    }),
    ...(event.image && event.image.length > 0 && {
      "image": event.image
    }),
    ...(event.heroImageUrl && !event.image && { "image": event.heroImageUrl }),
    ...(event.thumbnailImageUrl && { "thumbnailUrl": event.thumbnailImageUrl }),
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
    ...(event.faq && event.faq.length > 0 && {
      "subEvent": {
        "@type": "FAQPage",
        "mainEntity": event.faq
      }
    }),
    ...(event.faqPage && !event.faq && { "about": event.faqPage })
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