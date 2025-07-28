export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://the-anchor.pub/#organization",
  "name": "The Anchor",
  "url": "https://the-anchor.pub",
  "logo": "https://the-anchor.pub/images/the-anchor-pub-logo-black-transparent.png",
  "sameAs": [
    "https://www.facebook.com/theanchorpubsm/",
    "https://www.instagram.com/theanchor.pub/"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Horton Road",
    "addressLocality": "Stanwell Moor",
    "addressRegion": "Surrey",
    "postalCode": "TW19 6AQ",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.462509,
    "longitude": -0.502067
  },
  "telephone": "+441753682707",
  "email": "manager@the-anchor.pub"
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "BarOrPub"],
  "@id": "https://the-anchor.pub/#business",
  "name": "The Anchor",
  "image": [
    "https://the-anchor.pub/images/the-anchor-pub-exterior-stanwell-moor.jpg",
    "https://the-anchor.pub/images/the-anchor-beer-garden-heathrow.jpg",
    "https://the-anchor.pub/images/the-anchor-interior-stanwell-moor.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Horton Road",
    "addressLocality": "Stanwell Moor",
    "addressRegion": "Surrey",
    "postalCode": "TW19 6AQ",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.462509,
    "longitude": -0.502067
  },
  "url": "https://the-anchor.pub",
  "telephone": "+441753682707",
  "priceRange": "££",
  "servesCuisine": ["British", "Pizza", "Pub Food"],
  // TODO: Replace with dynamic data from Google Reviews
  // For now, using placeholder values
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "312",
    "bestRating": "5",
    "worstRating": "1"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "00:00",
      "closes": "00:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Tuesday",
      "opens": "16:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Wednesday",
      "opens": "16:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Thursday",
      "opens": "16:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "16:00",
      "closes": "00:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "13:00",
      "closes": "00:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "12:00",
      "closes": "21:00"
    }
  ],
  "specialOpeningHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "00:00",
      "closes": "00:00",
      "description": "Closed - Kitchen closed all day"
    }
  ],
  "acceptsReservations": "true",
  "menu": "https://the-anchor.pub/food-menu",
  "hasMenu": {
    "@type": "Menu",
    "name": "The Anchor Menu",
    "url": "https://the-anchor.pub/food-menu"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free Parking",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification", 
      "name": "Wheelchair Accessible",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Beer Garden",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Dog Friendly",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free WiFi",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Pool Table",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Darts",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Outside ULEZ Zone",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Luggage Storage",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Live Sports on TV",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Private Event Space",
      "value": true
    }
  ],
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "American Express"],
  "currenciesAccepted": "GBP",
  "publicAccess": true,
  "isAccessibleForFree": true,
  "maximumAttendeeCapacity": 250,
  "smokingAllowed": false,
  "keywords": "pub near Heathrow, restaurant Stanwell Moor, British food Surrey, beer garden, dog friendly pub",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+44-1753-682707",
      "contactType": "customer service",
      "areaServed": "GB",
      "availableLanguage": ["English"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+44-1753-682707",
      "contactType": "reservations",
      "areaServed": "GB",
      "availableLanguage": ["English"]
    }
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 51.462509,
      "longitude": -0.502067
    },
    "geoRadius": "16000"
  }
}

// Special Announcement for Monday Closure
export const specialAnnouncementSchema = {
  "@context": "https://schema.org",
  "@type": "SpecialAnnouncement",
  "@id": "https://the-anchor.pub/#monday-closure",
  "name": "Monday Closure",
  "text": "The Anchor is closed every Monday. Kitchen is also closed on Mondays.",
  "datePosted": "2024-01-01",
  "expires": "2025-12-31",
  "category": "https://www.wikidata.org/wiki/Q7692202",
  "announcementLocation": {
    "@id": "https://the-anchor.pub/#business"
  },
  "spatialCoverage": {
    "@type": "Place",
    "name": "The Anchor",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Stanwell Moor",
      "addressRegion": "Surrey"
    }
  }
}

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://the-anchor.pub/#website",
  "url": "https://the-anchor.pub",
  "name": "The Anchor Stanwell Moor",
  "description": "Traditional British pub near Heathrow with drag shows, quiz nights, and famous Sunday roasts",
  "publisher": {
    "@id": "https://the-anchor.pub/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://the-anchor.pub/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export const restaurantSchema = localBusinessSchema

// Event Series Schemas for Regular Events
export const quizNightEventSeries = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  "@id": "https://the-anchor.pub/#quiz-night-series",
  "name": "Monthly Quiz Night at The Anchor",
  "description": "Test your knowledge at our popular monthly quiz night. £3 entry, teams up to 6, great prizes including £25 bar voucher for winners.",
  "startDate": "2024-01-01",
  "endDate": "2025-12-31",
  "eventSchedule": {
    "@type": "Schedule",
    "repeatFrequency": "P1M",
    "startTime": "19:00:00",
    "endTime": "22:00:00",
    "scheduleTimezone": "Europe/London"
  },
  "location": {
    "@type": "Place",
    "name": "The Anchor",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Horton Road",
      "addressLocality": "Stanwell Moor",
      "addressRegion": "Surrey",
      "postalCode": "TW19 6AQ",
      "addressCountry": "GB"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "3",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  },
  "organizer": {
    "@id": "https://the-anchor.pub/#organization"
  },
  "performer": {
    "@type": "Organization",
    "name": "Question One Quiz Masters"
  }
}

export const dragShowEventSeries = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  "@id": "https://the-anchor.pub/#drag-show-series",
  "name": "Monthly Drag Shows with Nikki Manfadge",
  "description": "Spectacular monthly drag performances featuring Nikki Manfadge. FREE entry, alternating between Games Night and Karaoke Night formats.",
  "startDate": "2024-01-01",
  "endDate": "2025-12-31",
  "eventSchedule": {
    "@type": "Schedule",
    "repeatFrequency": "P1M",
    "startTime": "21:00:00",
    "endTime": "23:30:00",
    "scheduleTimezone": "Europe/London"
  },
  "location": {
    "@type": "Place",
    "name": "The Anchor",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Horton Road",
      "addressLocality": "Stanwell Moor",
      "addressRegion": "Surrey",
      "postalCode": "TW19 6AQ",
      "addressCountry": "GB"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  },
  "organizer": {
    "@id": "https://the-anchor.pub/#organization"
  },
  "performer": {
    "@type": "Person",
    "name": "Nikki Manfadge",
    "jobTitle": "Drag Queen"
  }
}

export const bingoEventSeries = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  "@id": "https://the-anchor.pub/#bingo-series",
  "name": "Monthly Cash Bingo Night",
  "description": "Monthly bingo night with £10 per book entry. 10 games with various prizes including drinks, chocolate, vouchers, and cash jackpot on the last game.",
  "startDate": "2024-01-01",
  "endDate": "2025-12-31",
  "eventSchedule": {
    "@type": "Schedule",
    "repeatFrequency": "P1M",
    "startTime": "19:00:00",
    "endTime": "21:00:00",
    "scheduleTimezone": "Europe/London"
  },
  "location": {
    "@type": "Place",
    "name": "The Anchor",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Horton Road",
      "addressLocality": "Stanwell Moor",
      "addressRegion": "Surrey",
      "postalCode": "TW19 6AQ",
      "addressCountry": "GB"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "10",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock"
  },
  "organizer": {
    "@id": "https://the-anchor.pub/#organization"
  }
}

// Parking Facility Schema
export const parkingFacilitySchema = {
  "@context": "https://schema.org",
  "@type": "ParkingFacility",
  "@id": "https://the-anchor.pub/#parking",
  "name": "The Anchor Free Car Park",
  "description": "Free customer parking available on-site with ample spaces for pub visitors",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Horton Road",
    "addressLocality": "Stanwell Moor",
    "addressRegion": "Surrey",
    "postalCode": "TW19 6AQ",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.462509,
    "longitude": -0.502067
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday"],
      "opens": "16:00",
      "closes": "23:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "16:00",
      "closes": "00:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "13:00",
      "closes": "00:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "12:00",
      "closes": "21:30"
    }
  ],
  "maximumVehicleHeight": {
    "@type": "QuantitativeValue",
    "value": 2.5,
    "unitCode": "MTR"
  },
  "petsAllowed": true,
  "isAccessibleForFree": true,
  "numberOfSpaces": {
    "@type": "QuantitativeValue",
    "value": 50
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Wheelchair Accessible Spaces",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Well Lit",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "CCTV Monitored",
      "value": true
    }
  ],
  "operator": {
    "@id": "https://the-anchor.pub/#organization"
  }
}

// Individual Review Schema Generator
export const createReviewSchema = (review: {
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: number;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "datePublished": review.datePublished,
    "reviewBody": review.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.reviewRating,
      "bestRating": 5,
      "worstRating": 1
    },
    "itemReviewed": {
      "@id": "https://the-anchor.pub/#business"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google Reviews"
    }
  }
}

// Image Object Schema Generator
export const createImageObjectSchema = (image: {
  url: string;
  name: string;
  caption?: string;
  width?: number;
  height?: number;
  datePublished?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": image.url,
    "name": image.name,
    "caption": image.caption || image.name,
    "description": image.caption || image.name,
    "width": image.width || 1200,
    "height": image.height || 800,
    "datePublished": image.datePublished || new Date().toISOString(),
    "uploadDate": image.datePublished || new Date().toISOString(),
    "copyrightHolder": {
      "@id": "https://the-anchor.pub/#organization"
    },
    "contentLocation": {
      "@type": "Place",
      "name": "The Anchor",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Horton Road",
        "addressLocality": "Stanwell Moor",
        "addressRegion": "Surrey",
        "postalCode": "TW19 6AQ",
        "addressCountry": "GB"
      }
    },
    "license": "https://the-anchor.pub/terms",
    "acquireLicensePage": "https://the-anchor.pub/contact"
  }
}

// Food Establishment Reservation Schema Generator
export const createReservationSchema = (reservation: {
  reservationId: string;
  reservationStatus: 'ReservationConfirmed' | 'ReservationPending' | 'ReservationCancelled';
  startTime: string;
  endTime: string;
  partySize: number;
  reservationFor?: {
    name: string;
    email?: string;
    telephone?: string;
  };
  bookingTime?: string;
  modifiedTime?: string;
  specialRequests?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishmentReservation",
    "reservationId": reservation.reservationId,
    "reservationStatus": `https://schema.org/${reservation.reservationStatus}`,
    "startTime": reservation.startTime,
    "endTime": reservation.endTime,
    "partySize": reservation.partySize,
    "reservationFor": reservation.reservationFor ? {
      "@type": "Person",
      "name": reservation.reservationFor.name,
      "email": reservation.reservationFor.email,
      "telephone": reservation.reservationFor.telephone
    } : undefined,
    "bookingTime": reservation.bookingTime || new Date().toISOString(),
    "modifiedTime": reservation.modifiedTime,
    "provider": {
      "@id": "https://the-anchor.pub/#business"
    },
    "programMembershipUsed": {
      "@type": "ProgramMembership",
      "programName": "The Anchor Booking System",
      "url": "https://the-anchor.pub/book"
    },
    "bookingAgent": {
      "@type": "Organization",
      "name": "The Anchor Online Booking",
      "url": "https://the-anchor.pub"
    },
    "specialRequests": reservation.specialRequests,
    "potentialAction": [
      {
        "@type": "ConfirmAction",
        "name": "Confirm Reservation",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `https://the-anchor.pub/reservations/confirm/${reservation.reservationId}`,
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        }
      },
      {
        "@type": "CancelAction",
        "name": "Cancel Reservation",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `https://the-anchor.pub/reservations/cancel/${reservation.reservationId}`,
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        }
      }
    ]
  }
}