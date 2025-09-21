import type { Metadata } from 'next'
import { ChristmasPartiesPageClient } from './client-components'

export const metadata: Metadata = {
  title: 'Christmas Parties & Dinners 2025 Near Heathrow Terminal 5 | The Anchor',
  description:
    'Book your 2025 Christmas celebration at The Anchor, the cosy village pub near Heathrow, Staines and Ashford in Surrey. Three-course festive dinners with Yorkshire puddings and pigs in blankets included, buffets for 26+, free on-site parking outside the ULEZ and five minutes from Heathrow Terminal 5.',
  keywords:
    'christmas dinner near heathrow, christmas party venue near heathrow, christmas parties heathrow, christmas party pub staines, christmas party venue surrey, christmas party in ashford, christmas buffet near heathrow, christmas lunch near staines, cheap christmas parties heathrow',
  openGraph: {
    title: 'Christmas Parties 2025 Near Heathrow Terminal 5 | The Anchor',
    description:
      'A proper village-pub Christmas with generous roasts, trimmings boards, and buffet options for larger groups. Free parking just minutes from Heathrow Terminal 5 and close to Staines, Ashford and Windsor.',
    images: ['/images/page-headers/christmas-parties/christmas-parties.jpg']
  },
  alternates: {
    canonical: '/christmas-parties'
  }
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Christmas Parties & Festive Dinners 2025 at The Anchor, Stanwell Moor',
  description:
    'Celebrate Christmas 2025 at The Anchor near Heathrow Terminal 5. Three-course pub roasts with Yorkshire puddings and pigs in blankets, free parking outside the ULEZ, buffet options for informal gatherings, and space for up to 60 seated guests.',
  startDate: '2025-11-24',
  endDate: '2025-12-23',
  eventStatus: 'https://schema.org/EventScheduled',
  image: ['https://www.the-anchor.pub/images/page-headers/christmas-parties/christmas-parties.jpg'],
  location: {
    '@type': 'Place',
    name: 'The Anchor, Stanwell Moor',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Horton Road',
      addressLocality: 'Stanwell Moor',
      addressRegion: 'Surrey',
      postalCode: 'TW19 6AQ',
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.462509,
      longitude: -0.502067
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free parking near Heathrow Terminal 5',
        value: '20 spaces on-site, two minutes from M25 Junction 14'
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Outside the ULEZ zone',
        value: 'No additional city charge for guests arriving by car'
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Village pub dining rooms',
        value: 'Up to 60 seated, 200 standing for Christmas events'
      }
    ]
  },
  organizer: {
    '@type': 'Organization',
    name: 'The Anchor',
    url: 'https://www.the-anchor.pub',
    email: 'manager@the-anchor.pub',
    telephone: '+44 1753 682707'
  },
  audience: [
    {
      '@type': 'BusinessAudience',
      audienceType: 'Mid-week workplace gatherings and airport teams'
    },
    {
      '@type': 'PeopleAudience',
      audienceType: 'Local families and community groups from Stanwell Moor and Staines'
    }
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Festive three-course menu (Tue–Thu)',
      price: '36.95',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      availabilityStarts: '2025-09-01',
      availabilityEnds: '2025-12-23',
      url: 'https://www.the-anchor.pub/christmas-parties',
      description: 'Three-course Christmas dinner with Yorkshire puddings, pigs in blankets, roast potatoes, seasonal vegetables and gravy. Available Tuesday to Thursday.'
    },
    {
      '@type': 'Offer',
      name: 'Festive three-course menu (Fri–Sat)',
      price: '39.95',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      availabilityStarts: '2025-09-01',
      availabilityEnds: '2025-12-23',
      url: 'https://www.the-anchor.pub/christmas-parties',
      description: 'Friday and Saturday Christmas dinners with all the trimmings, perfect for larger celebrations.'
    },
    {
      '@type': 'Offer',
      name: 'Children’s festive menu (under 12)',
      price: '15.95',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: 'Two or three-course children’s Christmas menu with smaller portions and the same trimmings.'
    }
  ],
  addOn: [
    {
      '@type': 'Offer',
      name: 'All the Trimmings Board',
      price: '11.95',
      priceCurrency: 'GBP',
      description: 'Serves four guests – extra Yorkshire puddings, pigs in blankets, roast potatoes, stuffing balls, seasonal veg and gravy.'
    },
    {
      '@type': 'Offer',
      name: 'XL Trimmings Board',
      price: '21.95',
      priceCurrency: 'GBP',
      description: 'Serves eight guests – doubles up the festive sides so the whole table can feast.'
    },
    {
      '@type': 'Offer',
      name: 'Bundle A arrival & finale',
      price: '9.95',
      priceCurrency: 'GBP',
      description: 'Glass of Prosecco on arrival plus coffee and mince pie to finish.'
    }
  ]
}

export default function ChristmasPartiesPage() {
  return <ChristmasPartiesPageClient structuredData={structuredData} />
}
