export const CONTACT = {
  // Display formats
  phone: '01753 682707',
  phoneHref: 'tel:01753682707',
  phoneIntl: '+441753682707',
  email: 'manager@the-anchor.pub',
  
  // Address
  address: {
    street: 'Horton Road',
    town: 'Stanwell Moor', 
    county: 'Surrey',
    postcode: 'TW19 6AQ',
    country: 'GB'
  },
  
  // Coordinates (verified from Google Maps)
  coordinates: {
    lat: 51.462509,
    lng: -0.502067
  }
}

export const BRAND = {
  // Primary name - always use this
  name: 'The Anchor',
  
  // With location context when needed
  nameWithLocation: 'The Anchor, Stanwell Moor',
  
  // Never use "The Anchor Pub" - avoid the word "Pub" in brand name
  // This helps with SEO and brand consistency
}

export const PARKING = {
  // Update this after verifying actual capacity
  capacity: 30, // Needs verification - currently shows "20 spaces" on Find Us page
  description: 'Free parking available',
  extendedDescription: 'Free on-site parking with extended parking available nearby'
}

export const HEATHROW_TIMES = {
  // Consistent journey times to each terminal
  terminal1: 12,
  terminal2: 11,
  terminal3: 11,
  terminal4: 12,
  terminal5: 7,
  
  // For general statements
  range: '7-12 minutes'
}

export const SUNDAY_ROAST = {
  // Standard messaging for consistency
  orderRequirement: 'Sunday roasts require pre-order by 1pm Saturday.',
  regularMenuNote: 'Regular menu also available on Sundays without pre-order.',
  fullMessage: 'Sunday roasts require pre-order by 1pm Saturday. Regular menu also available on Sundays without pre-order.'
}