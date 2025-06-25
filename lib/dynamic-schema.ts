import { getBusinessHours } from './api'
import { organizationSchema, webSiteSchema } from './schema'

// Convert API business hours to schema.org format
function convertToSchemaOpeningHours(businessHours: any) {
  const openingHoursSpec = []
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  
  for (const day of daysOfWeek) {
    const hours = businessHours.regularHours[day]
    if (hours && !hours.is_closed) {
      openingHoursSpec.push({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
        "opens": hours.opens,
        "closes": hours.closes
      })
    }
  }
  
  // Add special hours
  if (businessHours.specialHours && businessHours.specialHours.length > 0) {
    for (const special of businessHours.specialHours) {
      if (!special.is_closed && special.opens && special.closes) {
        openingHoursSpec.push({
          "@type": "OpeningHoursSpecification",
          "validFrom": special.date,
          "validThrough": special.date,
          "opens": special.opens,
          "closes": special.closes
        })
      }
    }
  }
  
  return openingHoursSpec
}

// Generate dynamic local business schema with live opening hours
export async function getDynamicLocalBusinessSchema() {
  try {
    const businessHours = await getBusinessHours()
    
    if (!businessHours) {
      // Return static schema if API fails
      return {
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
          "latitude": 51.4745,
          "longitude": -0.4713
        },
        "url": "https://the-anchor.pub",
        "telephone": "+441753682707",
        "priceRange": "££",
        "servesCuisine": ["British", "Pizza", "Pub Food"],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
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
    }
    
    // Generate dynamic schema with live opening hours
    const openingHoursSpec = convertToSchemaOpeningHours(businessHours)
    const isOpenNow = businessHours.currentStatus.isOpen
    
    return {
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
        "latitude": 51.4745,
        "longitude": -0.4713
      },
      "url": "https://the-anchor.pub",
      "telephone": "+441753682707",
      "priceRange": "££",
      "servesCuisine": ["British", "Pizza", "Pub Food"],
      "openingHoursSpecification": openingHoursSpec,
      "isOpen": isOpenNow ? "true" : "false",
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
  } catch (error) {
    console.error('Failed to generate dynamic schema:', error)
    // Return static fallback (same as above)
    return {
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
        "latitude": 51.4745,
        "longitude": -0.4713
      },
      "url": "https://the-anchor.pub",
      "telephone": "+441753682707",
      "priceRange": "££",
      "servesCuisine": ["British", "Pizza", "Pub Food"],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
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
  }
}

// Get all schemas including dynamic business hours
export async function getAllSchemas() {
  const localBusinessSchema = await getDynamicLocalBusinessSchema()
  return [organizationSchema, localBusinessSchema, webSiteSchema]
}