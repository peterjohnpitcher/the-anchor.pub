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
    "latitude": 51.4567,
    "longitude": -0.4567
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
    "latitude": 51.4567,
    "longitude": -0.4567
  },
  "url": "https://the-anchor.pub",
  "telephone": "+441753682707",
  "priceRange": "££",
  "servesCuisine": ["British", "Pizza", "Pub Food"],
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
    }
  ],
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
  "currenciesAccepted": "GBP",
  "publicAccess": true
}

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://the-anchor.pub/#website",
  "url": "https://the-anchor.pub",
  "name": "The Anchor Stanwell Moor",
  "description": "Traditional British pub near Heathrow with drag shows, tequila tastings, and famous Sunday roasts",
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