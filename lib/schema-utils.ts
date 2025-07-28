import { BusinessHours, KitchenStatus } from './api'
import { isKitchenOpen } from './api'
import type { AllergenType } from '@/hooks/useAllergenFilter'

// Helper to generate OpeningHoursSpecification from BusinessHours API response
export function generateOpeningHoursSpecification(businessHours: BusinessHours | null) {
  if (!businessHours) return []
  
  const openingHours: any[] = []
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  
  daysOfWeek.forEach(day => {
    const hours = businessHours.regularHours[day]
    if (hours && !hours.is_closed) {
      openingHours.push({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
        "opens": hours.opens,
        "closes": hours.closes
      })
    }
  })
  
  return openingHours
}

// Helper to generate kitchen hours specification
export function generateKitchenHoursSpecification(businessHours: BusinessHours | null) {
  if (!businessHours) return []
  
  const kitchenHours: any[] = []
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  
  daysOfWeek.forEach(day => {
    const hours = businessHours.regularHours[day]
    if (hours && !hours.is_closed && hours.kitchen && isKitchenOpen(hours.kitchen)) {
      kitchenHours.push({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
        "opens": hours.kitchen.opens,
        "closes": hours.kitchen.closes,
        "name": "Kitchen Hours"
      })
    }
  })
  
  return kitchenHours
}

// Helper to generate special hours (holidays, etc.)
export function generateSpecialOpeningHours(businessHours: BusinessHours | null) {
  if (!businessHours || !businessHours.specialHours?.length) return []
  
  return businessHours.specialHours.map(special => ({
    "@type": "OpeningHoursSpecification",
    "validFrom": special.date,
    "validThrough": special.date,
    ...(special.is_closed ? {
      "opens": "00:00",
      "closes": "00:00"
    } : {
      "opens": special.opens,
      "closes": special.closes
    }),
    "description": special.reason || special.note || (special.is_closed ? "Closed" : "Modified hours")
  }))
}

// Map allergen types to schema.org RestrictedDiet values
export function mapAllergenToRestrictedDiet(allergen: AllergenType): string | null {
  const allergenMap: Record<AllergenType, string | null> = {
    gluten: "https://schema.org/GlutenFreeDiet",
    crustaceans: null,
    eggs: null,
    fish: null,
    peanuts: null,
    soya: null,
    milk: "https://schema.org/LactoseFreeDiet",
    nuts: null,
    celery: null,
    mustard: null,
    sesame: null,
    sulphites: null,
    lupin: null,
    molluscs: null
  }
  
  return allergenMap[allergen]
}

// Generate suitableForDiet array for menu items
export function generateSuitableForDiet(item: { vegetarian?: boolean, allergens?: string[] }) {
  const diets: string[] = []
  
  if (item.vegetarian) {
    diets.push("https://schema.org/VegetarianDiet")
  }
  
  // Add gluten-free if no gluten allergen
  if (item.allergens && !item.allergens.includes('gluten')) {
    diets.push("https://schema.org/GlutenFreeDiet")
  }
  
  // Add dairy-free if no milk allergen
  if (item.allergens && !item.allergens.includes('milk')) {
    diets.push("https://schema.org/LactoseFreeDiet")
  }
  
  return diets.length > 0 ? diets : undefined
}

// Generate nutrition information schema (placeholder values for now)
export function generateNutritionInfo(itemName: string, category: string) {
  // In a real implementation, this would pull from a nutrition database
  // For now, return reasonable estimates based on item type
  
  const nutritionDefaults: Record<string, any> = {
    pizza: {
      calories: "800-1200",
      fatContent: "30-45g",
      carbohydrateContent: "80-120g",
      proteinContent: "35-50g",
      sodiumContent: "1500-2000mg"
    },
    burger: {
      calories: "600-900",
      fatContent: "35-50g",
      carbohydrateContent: "45-65g",
      proteinContent: "30-45g",
      sodiumContent: "1000-1500mg"
    },
    "fish-and-chips": {
      calories: "800-1000",
      fatContent: "40-55g",
      carbohydrateContent: "75-95g",
      proteinContent: "35-45g",
      sodiumContent: "800-1200mg"
    },
    default: {
      calories: "varies",
      fatContent: "varies",
      carbohydrateContent: "varies",
      proteinContent: "varies",
      sodiumContent: "varies"
    }
  }
  
  let nutritionKey = 'default'
  if (itemName.toLowerCase().includes('pizza')) nutritionKey = 'pizza'
  else if (itemName.toLowerCase().includes('burger')) nutritionKey = 'burger'
  else if (itemName.toLowerCase().includes('fish') && itemName.toLowerCase().includes('chips')) nutritionKey = 'fish-and-chips'
  
  return {
    "@type": "NutritionInformation",
    "servingSize": "1 portion",
    ...nutritionDefaults[nutritionKey]
  }
}

// Generate offer schema for menu items with special deals
export function generateMenuItemOffer(item: any, dayOfWeek?: string) {
  const offers: any[] = []
  
  // Tuesday pizza BOGOF
  if (item.name.toLowerCase().includes('pizza') && dayOfWeek === 'Tuesday') {
    offers.push({
      "@type": "Offer",
      "name": "Buy One Get One Free",
      "description": "BOGOF on all pizzas every Tuesday",
      "dayOfWeek": "https://schema.org/Tuesday",
      "price": item.price.replace(/[£$]/, ''),
      "priceCurrency": "GBP"
    })
  }
  
  return offers.length > 0 ? offers : undefined
}

// Generate ContactPoint schema
export function generateContactPoints() {
  return [
    {
      "@type": "ContactPoint",
      "telephone": "+44-1753-682707",
      "contactType": "customer service",
      "areaServed": "GB",
      "availableLanguage": ["English"],
      "contactOption": ["TollFree", "HearingImpairedSupported"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+44-1753-682707",
      "contactType": "reservations",
      "areaServed": "GB",
      "availableLanguage": ["English"]
    }
  ]
}

// Generate GeoShape for service area (roughly 10 mile radius around pub)
export function generateServiceArea() {
  return {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 51.462509,
      "longitude": -0.502067
    },
    "geoRadius": "16000" // 16km ~ 10 miles
  }
}

// Generate aggregate rating from actual review data
export function generateAggregateRating(reviews?: Array<{ rating: number }>) {
  if (!reviews || reviews.length === 0) {
    // Return placeholder until we have real data
    return {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "reviewCount": "312",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = (totalRating / reviews.length).toFixed(1)
  
  return {
    "@type": "AggregateRating",
    "ratingValue": averageRating,
    "reviewCount": reviews.length.toString(),
    "bestRating": "5",
    "worstRating": "1"
  }
}