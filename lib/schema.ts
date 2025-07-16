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
      "opens": "16:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Tuesday",
      "opens": "16:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Wednesday",
      "opens": "16:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Thursday",
      "opens": "16:00",
      "closes": "22:00"
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
      "opens": "12:00",
      "closes": "00:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "12:00",
      "closes": "22:00"
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
  "maximumAttendeeCapacity": 250
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