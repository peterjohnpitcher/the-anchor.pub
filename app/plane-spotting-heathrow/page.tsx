import Link from 'next/link'
import { Metadata } from 'next'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { Container, Section, SectionHeader, FeatureGrid, InfoBoxGrid, CTASection, Button } from '@/components/ui'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { BookTableButton } from '@/components/BookTableButton'
import { DirectionsButton } from '@/components/DirectionsButton'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { DEFAULT_NEAR_HEATHROW_IMAGE } from '@/lib/image-fallbacks'

export const metadata: Metadata = {
  title: 'Plane Spotting at Heathrow - Watch Aircraft from The Anchor Beer Garden',
  description: 'Discover the best Heathrow plane spotting pub. The Anchor beer garden sits under the flight path with aircraft every 90 seconds, free parking, refreshments and WiFi.',
  keywords: 'plane spotting heathrow, heathrow plane spotting pub, watch planes heathrow, aircraft spotting terminal 5, plane spotting bar near heathrow',
  openGraph: {
    title: 'Plane Spotting at Heathrow - The Anchor Beer Garden',
    description: 'Enjoy aircraft overhead every 90 seconds from The Anchor beer garden with free parking, hot food and WiFi – just 7 minutes from Terminal 5.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE]
  },
  twitter: getTwitterMetadata({
    title: 'Plane Spotting at Heathrow - The Anchor Beer Garden',
    description: 'Plane spotters love The Anchor: free parking, hot food, WiFi and aircraft overhead every 90 seconds just minutes from Heathrow.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE]
  }),
  alternates: {
    canonical: '/plane-spotting-heathrow'
  }
}

const planeSpottingSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  '@id': 'https://www.the-anchor.pub/plane-spotting-heathrow',
  name: 'The Anchor - Heathrow Plane Spotting Pub',
  description: 'Heathrow plane spotting venue with beer garden directly under the flight path, offering food, drinks and shelter year-round.',
  url: 'https://www.the-anchor.pub/plane-spotting-heathrow',
  image: DEFAULT_NEAR_HEATHROW_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Horton Road',
    addressLocality: 'Stanwell Moor',
    postalCode: 'TW19 6AQ',
    addressRegion: 'Surrey',
    addressCountry: 'GB'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.462509,
    longitude: -0.502067
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '16:00',
      closes: '23:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '13:00',
      closes: '23:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '12:00',
      closes: '18:00'
    }
  ],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor Seating', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'WiFi Access', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Food & Drink Service', value: true }
  ],
  isAccessibleForFree: true,
  publicAccess: true
}

export default function PlaneSpottingHeathrowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(planeSpottingSchema) }}
      />

      <HeroWrapper
        route="/plane-spotting-heathrow"
        title="Plane Spotting at Heathrow"
        description="Watch widebodies roar overhead every 90 seconds from our beer garden"
        size="large"
        showStatusBar={true}
        tags={[
          { label: '✈️ A380 & Dreamliner Views', variant: 'primary' },
          { label: '🍺 Full Bar Service', variant: 'default' },
          { label: '🆓 Free Parking', variant: 'success' },
          { label: '📶 Free WiFi', variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookTableButton
              variant="primary"
              size="lg"
              source="plane_spotting_hero"
              className="w-full sm:w-auto"
            >
              📅 Reserve a Table
            </BookTableButton>
            <DirectionsButton
              source="plane_spotting_hero"
              size="lg"
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
              className="w-full sm:w-auto"
            >
              📍 Get Directions
            </DirectionsButton>
          </div>
        }
      />

      <Section background="white" spacing="sm">
        <Container>
          <PageTitle className="text-center text-anchor-green" seo={{ structured: true, speakable: true }}>
            Heathrow Plane Spotting Pub – The Anchor Beer Garden
          </PageTitle>
        </Container>
      </Section>

      <Section background="white" spacing="md">
        <Container>
          <SectionHeader
            title="Why Plane Spotters Choose The Anchor"
            subtitle="Front-row views, hot food and shelter when the weather turns – everything you need for an aviation day out."
          />
          <FeatureGrid
            columns={3}
            features={[
              {
                icon: '🛬',
                title: 'Under the Flight Path',
                description: 'On westerly operations you are aligned with the landing path. Expect A380s, 787s, A350s and narrow bodies at 500-800 ft.',
                variant: 'default',
                className: 'bg-white rounded-2xl p-6 shadow-sm text-left'
              },
              {
                icon: '📸',
                title: 'Photo-Friendly Garden',
                description: 'Low perimeter fencing, open sky and WiFi for FlightRadar24. Tripods welcome and heaters keep winter sessions comfortable.',
                variant: 'default',
                className: 'bg-white rounded-2xl p-6 shadow-sm text-left'
              },
              {
                icon: '🥧',
                title: 'Proper Refreshments',
                description: 'Stone-baked pizzas, Sunday roasts and full drinks menu available. Toilets, power sockets and indoor seating if the rain hits.',
                variant: 'default',
                className: 'bg-white rounded-2xl p-6 shadow-sm text-left'
              }
            ]}
          />
        </Container>
      </Section>

      <Section background="white" spacing="md" className="bg-anchor-cream/40">
        <Container>
          <SectionHeader
            title="Plan Your Heathrow Plane Spotting Trip"
            subtitle="Make the most of every arrival with timings, transport and kit tips."
          />
          <InfoBoxGrid
            columns={3}
            className="max-w-5xl mx-auto"
            boxes={[
              {
                title: '📅 Best Times to Visit',
                content: (
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
                    <li>06:00-09:00 for sunrise arrivals and cargo</li>
                    <li>16:00-20:00 evening long-haul waves</li>
                    <li>Check METAR: westerly winds bring aircraft overhead</li>
                  </ul>
                ),
                variant: 'colored',
                color: 'bg-white rounded-2xl p-6 shadow-sm'
              },
              {
                title: '🚗 Getting Here',
                content: (
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
                    <li>7 minutes from Heathrow Terminal 5 via A3044</li>
                    <li>Free on-site parking for patrons</li>
                    <li>442 bus stops outside – perfect for spotters without a car</li>
                  </ul>
                ),
                variant: 'colored',
                color: 'bg-white rounded-2xl p-6 shadow-sm'
              },
              {
                title: '🎒 What to Bring',
                content: (
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
                    <li>Camera with 70-200mm lens covers most arrivals</li>
                    <li>Radio scanner or FR24 app (free WiFi provided)</li>
                    <li>Layers – the beer garden is sheltered but breezy</li>
                  </ul>
                ),
                variant: 'colored',
                color: 'bg-white rounded-2xl p-6 shadow-sm'
              }
            ]}
          />
        </Container>
      </Section>

      <Section background="white" spacing="md">
        <Container>
          <SectionHeader
            title="Other Heathrow Plane Spotting Locations"
            subtitle="Make a full day of it by pairing The Anchor with these classic viewing spots."
          />
          <FeatureGrid
            columns={2}
            features={[
              {
                icon: '🌳',
                title: 'Myrtle Avenue',
                description: 'Legendary runway 27L arrivals spot in Hatton Cross. Pair with The Anchor for food, drinks and runway 27R coverage.',
                variant: 'default',
                className: 'bg-white rounded-2xl p-6 shadow-sm text-left'
              },
              {
                icon: '🪟',
                title: 'Visitors Centre / Renaissance Hotel',
                description: 'Great for departures on easterly operations. Wrap up the day with a pint at The Anchor before heading home.',
                variant: 'default',
                className: 'bg-white rounded-2xl p-6 shadow-sm text-left'
              }
            ]}
          />
        </Container>
      </Section>

      <FAQAccordionWithSchema
        className="bg-gray-50"
        faqs={[
          {
            question: 'Do I need to book a table for plane spotting?',
            answer: 'Booking is recommended at busy times (sunny weekends, major aviation events). Walk-ins are welcome subject to garden capacity and weather.'
          },
          {
            question: 'Is there shelter if it rains?',
            answer: 'Yes. Our heated, covered areas and indoor seating mean you can keep spotting even in showers. Staff are happy to update you on runway usage.'
          },
          {
            question: 'What aircraft will I see from The Anchor?',
            answer: 'Expect British Airways, Virgin Atlantic, Emirates A380, Qatar Airways, American Airlines, plus cargo airlines. We sit on the approach to runway 27R which operates 70% of the year.'
          },
          {
            question: 'Can I charge batteries or use WiFi?',
            answer: 'Yes. We provide free WiFi for flight tracking and have indoor sockets for charging devices while you grab a drink or meal.'
          },
          {
            question: 'Are families and dogs welcome?',
            answer: 'Absolutely. The beer garden is dog friendly and we have children’s meals plus soft drinks, mocktails and hot drinks for family visits.'
          }
        ]}
      />

      <CTASection
        title="Ready for Heathrow Plane Spotting?"
        description="Reserve a table, explore the beer garden or plan your route – everything you need for a memorable aviation session."
        buttons={[
          {
            text: '🍺 Discover the Beer Garden',
            href: '/beer-garden',
            variant: 'white'
          },
          {
            text: '📍 Find Us & Parking Info',
            href: '/find-us',
            variant: 'white'
          },
          {
            text: '📖 View Food & Drinks',
            href: '/food-menu',
            variant: 'white'
          }
        ]}
        variant="green"
      />
    </>
  )
}
