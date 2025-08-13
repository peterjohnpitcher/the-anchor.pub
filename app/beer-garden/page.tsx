import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { HeroWrapper } from '@/components/hero'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AmenityList } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { GoogleReviews } from '@/components/reviews'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { BookTableButton } from '@/components/BookTableButton'
import { parkingFacilitySchema } from '@/lib/schemas/parking'

export const metadata: Metadata = {
  title: 'Beer Garden & Plane Spotting | The Anchor',
  description: 'Unique beer garden under Heathrow flight path. Best plane spotting location with outdoor seating, dog-friendly space & aircraft views every 90 seconds.',
  keywords: 'plane spotting heathrow, beer garden stanwell moor, beer garden heathrow, plane spotting venue, outdoor dining heathrow, best places for plane spotting, heathrow flight path',
  openGraph: {
    title: 'Beer Garden & Plane Spotting - The Anchor',
    description: 'Watch planes overhead every 90 seconds while enjoying drinks in our unique beer garden',
    images: ['/images/garden/beer-garden/the-anchor-beer-garden-heathrow-flight-path.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'Beer Garden & Plane Spotting - The Anchor',
    description: 'Watch planes overhead every 90 seconds while enjoying drinks in our unique beer garden',
    images: ['/images/garden/beer-garden/the-anchor-beer-garden-heathrow-flight-path.jpg']
  })
}

const planeSpottingSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "The Anchor Beer Garden - Heathrow Plane Spotting",
  "description": "Unique beer garden directly under Heathrow flight path offering spectacular plane spotting opportunities",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Horton Road",
    "addressLocality": "Stanwell Moor",
    "addressRegion": "Surrey",
    "postalCode": "TW19 6AQ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.4764,
    "longitude": -0.4735
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "16:00",
    "closes": "23:00"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Outdoor Seating",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Dog Friendly",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Plane Spotting Views",
      "value": true
    }
  ]
}


export default function BeerGardenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([planeSpottingSchema, parkingFacilitySchema]) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/beer-garden"
        title="Beer Garden & Plane Spotting"
        description="Watch aircraft every 90 seconds while enjoying a pint"
        size="large"
        showStatusBar={true}
        tags={[
          { label: '🛬 Every 90 Seconds', variant: 'success' },
          { label: '📸 Photo Opportunities', variant: 'primary' },
          { label: '🐕 Dog Friendly', variant: 'default' },
          { label: '🍺 Full Bar Service', variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookTableButton
              source="beer_garden_hero"
              variant="primary"
              size="lg"
            />
            <Link href="/drinks">
      <Button 
        variant="secondary"
        size="lg"
      >
        🍺 View Drinks Menu
      </Button>
    </Link>
            <Link href="/find-us">
      <Button 
        variant="secondary"
        size="lg"
      >
        📍 Get Directions
      </Button>
    </Link>
          </div>
        }
      >
        <div className="bg-white/90 backdrop-blur-sm text-anchor-green font-bold text-lg md:text-xl px-6 py-3 rounded-full inline-block mt-4">
          ✈️ DIRECTLY UNDER THE FLIGHT PATH ✈️
        </div>
      </HeroWrapper>

      {/* Page Title for SEO */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <PageTitle 
            className="text-center text-anchor-green"
            seo={{ structured: true, speakable: true }}
          >
            Beer Garden - Outdoor Dining & Plane Spotting
          </PageTitle>
        </div>
      </section>

      {/* Plane Spotting Paradise */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Heathrow's Best Kept Secret for Plane Spotting"
            />
            
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "Why Aviation Enthusiasts Love Us",
                  content: (
                    <AmenityList
                      items={[
                        { icon: "✈️", title: "Perfect Position", description: "Directly under the Heathrow approach path" },
                        { icon: "👀", title: "Low & Loud", description: "Aircraft pass at approximately 500-800 feet" },
                        { icon: "📸", title: "Photo Friendly", description: "Unobstructed views perfect for photography" },
                        { icon: "🍺", title: "Refreshments", description: "Full bar service delivered to your table" },
                        { icon: "📱", title: "FlightRadar24", description: "Free WiFi to track incoming flights" }
                      ]}
                      iconColor="text-2xl"
                    />
                  ),
                  variant: "colored",
                  color: "bg-sky-50 rounded-2xl p-8"
                },
                {
                  title: "What You'll See",
                  content: (
                    <>
                      <div className="space-y-2 mb-6">
                        <p className="font-semibold">Common Aircraft Types:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Airbus A380 "Superjumbo"</li>
                          <li>Boeing 777 & 787 Dreamliner</li>
                          <li>Airbus A350 & A330</li>
                          <li>Boeing 747 (increasingly rare!)</li>
                          <li>Various narrow-body aircraft</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <strong>Peak Times:</strong> 6am-9am & 4pm-8pm<br />
                          <strong>Frequency:</strong> Every 90 seconds (peak)<br />
                          <strong>Wind Direction:</strong> Westerly operations (70% of year)
                        </p>
                      </div>
                    </>
                  ),
                  variant: "colored",
                  color: "bg-amber-50 rounded-2xl p-8"
                }
              ]}
              className="mb-12"
            />
            
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section-spacing bg-anchor-sand/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              What Visitors Say About Our Beer Garden
            </h2>
            <GoogleReviews 
              layout="carousel"
              showTitle={false}
            />
          </div>
        </div>
      </section>

      {/* Beer Garden Features */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Our Unique Beer Garden"
            />
            
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "🪑",
                  title: "Spacious Seating",
                  description: "Multiple tables with umbrellas for sunny days",
                  className: "text-center"
                },
                {
                  icon: "🐕",
                  title: "Dog Friendly",
                  description: "Water bowls provided, treats available at the bar",
                  className: "text-center"
                },
                {
                  icon: "🍔",
                  title: "Food Service",
                  description: "Full menu available in the garden during kitchen hours",
                  className: "text-center"
                },
                {
                  icon: "🌡️",
                  title: "Heated Areas",
                  description: "Covered sections with heaters for cooler evenings",
                  className: "text-center"
                },
                {
                  icon: "👨‍👩‍👧‍👦",
                  title: "Family Friendly",
                  description: "Safe enclosed space, children welcome until 8pm",
                  className: "text-center"
                },
                {
                  icon: "🚬",
                  title: "Smoking Area",
                  description: "Designated zones with ashtrays provided",
                  className: "text-center"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Plane Spotting Tips */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Plane Spotting Tips for Visitors"
            />
            
            <InfoBoxGrid
              columns={1}
              boxes={[
                {
                  title: "📱 Essential Apps",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Flightradar24:</strong> Track incoming flights in real-time</li>
                      <li>• <strong>Plane Finder:</strong> Identify aircraft types and airlines</li>
                      <li>• <strong>LiveATC:</strong> Listen to air traffic control (bring headphones!)</li>
                    </ul>
                  ),
                  variant: "colored",
                  color: "bg-sky-50 rounded-xl p-6"
                },
                {
                  title: "📸 Photography Tips",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li>• Best light: Golden hour (1 hour before sunset)</li>
                      <li>• Recommended lens: 70-300mm for close-ups</li>
                      <li>• Fast shutter speed: 1/500s or faster</li>
                      <li>• Look for special liveries and rare aircraft</li>
                    </ul>
                  ),
                  variant: "colored",
                  color: "bg-amber-50 rounded-xl p-6"
                },
                {
                  title: "🍺 Make a Day of It",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li>• Arrive early to secure the best spotting tables</li>
                      <li>• Try our aviation-themed cocktails</li>
                      <li>• Join other enthusiasts - great community feel</li>
                      <li>• Food available during kitchen hours</li>
                    </ul>
                  ),
                  variant: "colored",
                  color: "bg-green-50 rounded-xl p-6"
                }
              ]}
            />
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "What planes can I see from The Anchor beer garden?",
            answer: "You'll see all types of aircraft using Heathrow including A380s, Boeing 777s, 787 Dreamliners, and A350s. Planes pass directly overhead approximately every 90 seconds during peak times."
          },
          {
            question: "When is the best time for plane spotting at The Anchor?",
            answer: "Early morning (6am-9am) and late afternoon (4pm-8pm) offer the most frequent flights. Summer evenings are particularly popular as you can enjoy drinks while watching the constant stream of aircraft."
          },
          {
            question: "Is the beer garden dog friendly?",
            answer: "Yes! Dogs are very welcome in our beer garden. We provide water bowls and it's a great spot for your furry friend to relax while you enjoy plane spotting."
          },
          {
            question: "Can I take photos of planes from the beer garden?",
            answer: "Absolutely! Our beer garden is a popular spot for aviation photographers. The planes pass low overhead providing excellent photo opportunities."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-anchor-green to-anchor-green/90 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready for Planes & Pints?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join fellow aviation enthusiasts in our unique beer garden
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookTableButton
                source="beer_garden_cta"
                size="lg"
                variant="secondary"
                className="bg-white text-anchor-green hover:bg-gray-100"
              />
              <Link href="tel:+441753682707">
                <Button size="lg" variant="secondary" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                  📞 Call 01753 682707
                </Button>
              </Link>
              <Link href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                  📍 Get Directions
                </Button>
              </Link>
            </div>
            <p className="text-white/80 mt-8 text-sm">
              Just 7 minutes from Heathrow Terminal 5 • Free parking • Dogs welcome
            </p>
          </div>
        </div>
      </section>
    </>
  )
}