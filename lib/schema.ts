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

export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://the-anchor.pub/#restaurant",
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
  }
}