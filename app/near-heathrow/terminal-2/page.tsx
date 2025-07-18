import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { HeroWrapper, Breadcrumbs } from '@/components/hero'
import { Metadata } from 'next'
import { FlightStatus, FlightDelayWidget } from '@/components/FlightStatus'
import { SectionHeader } from '@/components/SectionHeader'
import { FeatureGrid } from '@/components/FeatureCard'
import { InfoBoxGrid } from '@/components/InfoBox'
import { AlertBox } from '@/components/AlertBox'
import { CTASection } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'

export const metadata: Metadata = {
  title: 'Pub Near Heathrow Terminal 2 | The Anchor - 10 Minutes Away',
  description: 'Traditional British pub 10 mins from Heathrow Terminal 2. Free parking, great food & perfect for Star Alliance travelers. Pre-flight dining.',
  keywords: 'pub near terminal 2, heathrow terminal 2 restaurant, closest pub to T2, star alliance terminal pub, queens terminal restaurant',
  openGraph: {
    title: 'The Anchor - 10 Minutes from Heathrow Terminal 2',
    description: 'The perfect traditional British pub near Terminal 2. Free parking and authentic pub food.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'The Anchor - 10 Minutes from Heathrow Terminal 2',
    description: 'The perfect traditional British pub near Terminal 2. Free parking and authentic pub food.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg']
  })
}

export default function Terminal2Page() {
  return (
    <>
      
      {/* Hero Section */}
      <HeroWrapper
        route="/near-heathrow/terminal-2"
        title="Your Local Pub Near Heathrow Terminal 2"
        description="Perfect for Star Alliance travelers • Free parking • Traditional British hospitality"
        size="large"
        breadcrumbs={[
          { name: 'Near Heathrow', href: '/near-heathrow' },
          { name: 'Terminal 2' }
        ]}
        tags={[
          { label: "Just 10 minutes away", variant: "warning" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="tel:01753682707">
      <Button 
        variant="primary"
        size="lg"
      >
        📞 Book a Table
      </Button>
    </Link>
            
            <Link href="#directions">
      <Button 
        variant="secondary"
        size="lg"
        className="bg-white text-anchor-green hover:bg-gray-100"
      >
        📍 Get Directions
      </Button>
    </Link>
          </div>
        }
      />

      {/* Quick Info Cards */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <FeatureGrid
            columns={4}
            features={[
              {
                icon: "🚗",
                title: "10 mins",
                description: "by car"
              },
              {
                icon: "🅿️",
                title: "Free",
                description: "parking"
              },
              {
                icon: "🍺",
                title: "Real",
                description: "British pub"
              },
              {
                icon: "⭐",
                title: "Star Alliance",
                description: "Terminal 2"
              }
            ]}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Detailed Directions */}
      <section id="directions" className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="How to Get Here from Terminal 2"
              align="center"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* By Car */}
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚗 By Car (10 minutes)</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">1.</span>
                    Exit Terminal 2 following signs for A4/M4
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">2.</span>
                    Join the A4 Bath Road heading East
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">3.</span>
                    After 2 miles, turn left onto A3044 (Stanwell Moor Road)
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">4.</span>
                    Continue for 1 mile through Stanwell Moor village
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">5.</span>
                    Turn left onto Horton Road - The Anchor is on your right
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="font-semibold text-anchor-green">Sat Nav:</p>
                  <p className="text-lg">TW19 6AQ</p>
                </div>
              </div>

              {/* By Taxi */}
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚕 By Taxi</h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Cost: Around £25</p>
                    <p>Tell your driver: &quot;The Anchor pub, Horton Road, Stanwell Moor&quot;</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Taxi Ranks:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Terminal 2 Arrivals (Ground floor)</li>
                      <li>Terminal 2 Departures (Level 5)</li>
                      <li>Central Bus Station (between T2 & T3)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-semibold text-anchor-green mb-2">Pre-book Return:</p>
                    <p className="text-sm">We can arrange your return taxi - just ask at the bar!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Interactive Map</h3>
              <p className="text-gray-700 mb-6">
                Click below for turn-by-turn directions from Terminal 2
              </p>
              <Link href="https://maps.google.com/maps?saddr=Heathrow+Terminal+2&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ" target="_blank" rel="noopener noreferrer">
      <Button 
        variant="primary"
        size="lg"
      >
        Open in Google Maps
      </Button>
    </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Why Terminal 2 Travelers Choose The Anchor"
              align="center"
            />
            
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "Star Alliance Hub",
                  icon: "⭐",
                  content: "Terminal 2 hosts Star Alliance carriers including Lufthansa, United, Air Canada, and Singapore Airlines. Enjoy authentic British hospitality before your international journey."
                },
                {
                  title: "The Queen's Terminal",
                  icon: "👑",
                  content: "Opened by Her Majesty in 2014, T2 is Heathrow's newest terminal. Experience a piece of traditional Britain at The Anchor before entering this modern gateway."
                },
                {
                  title: "Smart Parking Choice",
                  icon: "🅿️",
                  content: "Terminal 2 short-stay parking costs £6.90 for just 30 minutes! Park free with us while dropping off or collecting passengers."
                },
                {
                  title: "International Meets Local",
                  icon: "🍽️",
                  content: "Flying to Munich, Toronto, or Singapore? Start with fish & chips or a Sunday roast. Our international guests love experiencing authentic British pub culture."
                },
                {
                  title: "Outside ULEZ Zone",
                  icon: "🚫",
                  content: "Save £12.50 daily! We're outside London's ULEZ zone, perfect for travelers avoiding the charge. Direct access from M25 without entering the zone."
                },
                {
                  title: "Direct Bus Route",
                  icon: "🚌",
                  content: "The 442 bus stops directly outside, connecting Terminal 2 to our pub. Much cheaper than a taxi and runs regularly throughout the day."
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Live Flight Information */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Live Terminal 2 Flight Information"
              subtitle="Cheque flight times while you enjoy your meal or drink"
              align="center"
            />
            <FlightStatus terminal="2" type="both" limit={5} />
          </div>
        </div>
      </section>

      {/* Terminal 2 Specific Info */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Terminal 2 Travel Tips"
              align="center"
            />
            
            <div className="mb-8">
              <FlightDelayWidget terminal="2" />
            </div>
            
            <div className="bg-anchor-sand/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Airlines & Destinations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-2">Major Airlines:</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Lufthansa - Frankfurt, Munich</li>
                    <li>• United Airlines - US destinations</li>
                    <li>• Air Canada - Toronto, Vancouver</li>
                    <li>• Singapore Airlines - Singapore</li>
                    <li>• Swiss - Zurich, Geneva</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Check-in Advice:</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• European flights: 2 hours before</li>
                    <li>• International: 3 hours before</li>
                    <li>• US flights: 3.5 hours (extra security)</li>
                    <li>• Allow 15 mins drive from The Anchor</li>
                  </ul>
                </div>
              </div>
            </div>

            <AlertBox
              variant="tip"
              title="Insider Knowledge"
              content={
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span>💡</span>
                    <span>T2 is connected to T3 via pedestrian walkway - great for airline connections</span>
                  </li>
                  <li className="flex gap-3">
                    <span>💡</span>
                    <span>The Anchor hosts many Lufthansa and United crews - we know the flight patterns!</span>
                  </li>
                  <li className="flex gap-3">
                    <span>💡</span>
                    <span>T2 security is busiest 6-9am for European departures</span>
                  </li>
                  <li className="flex gap-3">
                    <span>💡</span>
                    <span>Our German beers are popular with Lufthansa passengers!</span>
                  </li>
                </ul>
              }
            />
          </div>
        </div>
      </section>

      {/* Perfect for Terminal 2 Travelers */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Your Perfect Stop Near Terminal 2"
              align="center"
            />
            
            <div className="prose prose-lg max-w-none text-gray-700 mb-12">
              <p className="text-xl text-center mb-8">
                Whether you're flying with Lufthansa, United Airlines, Air Canada, or any of the 23 airlines 
                operating from Terminal 2, The Anchor provides the perfect escape from airport prices and crowds.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">Before Your Flight</h3>
                  <p className="mb-4">
                    Instead of paying premium prices for average food at the terminal, enjoy a proper meal 
                    at The Anchor. Our traditional British menu offers everything from classic pub favourites 
                    to fish and chips, all at local pub prices during kitchen hours. With Terminal 2's 
                    recommendation to arrive 3 hours early for international flights, you'll have plenty 
                    of time to relax in our beer garden or cozy interior before heading to the gate.
                  </p>
                  <p>
                    Many of our regulars are business travelers who've discovered that a calm meal at 
                    The Anchor beats the stress of airport dining. Park free with us, enjoy your meal, 
                    then take a quick 10-minute drive to T2's drop-off zone.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">Meeting Arrivals</h3>
                  <p className="mb-4">
                    Terminal 2's short-stay car park charges £6.90 for just 30 minutes - that's more 
                    than a pint costs at The Anchor! When collecting passengers, wait comfortably with 
                    us instead. Use our free WiFi to track their flight, enjoy a drink or meal, and 
                    only head to the terminal when they've cleared customs.
                  </p>
                  <p>
                    We're particularly popular with families meeting international arrivals. Kids can 
                    play in our garden while adults relax, making those flight delays much more bearable 
                    than sitting in expensive terminal cafes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">Local Knowledge</h3>
              <p className="text-gray-700 mb-4">
                As Stanwell Moor's village pub, we've been serving Terminal 2 travelers since the 
                Queen opened it in 2014. Our staff know the flight patterns, the best times to 
                travel to avoid traffic, and can even recommend the quickest security lanes based 
                on the time of day. We're not just a pub - we're part of your journey.
              </p>
              <p className="text-gray-700">
                Regular Terminal 2 flight crews choose The Anchor as their local when staying at 
                nearby hotels. If it's good enough for the professionals who fly every day, you 
                know you're in good hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="See You Soon at The Anchor!"
        description="Just 10 minutes from Terminal 2 • Free Parking • Authentic British Pub"
        variant="green"
        buttons={[
          {
            text: "📞 01753 682707",
            href: "tel:01753682707",
            variant: "white",
            size: "lg"
          },
          {
            text: "← Back to All Terminals",
            href: "/near-heathrow",
            variant: "white",
            size: "lg"
          }
        ]}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto mt-8">
          <p className="font-semibold mb-2">The Anchor</p>
          <p>Horton Road, Stanwell Moor</p>
          <p>Surrey TW19 6AQ</p>
        </div>
      </CTASection>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "The Anchor - Pub Near Heathrow Terminal 2",
            "description": "Traditional British pub just 10 minutes from Heathrow Terminal 2 with free parking.",
            "image": "https://the-anchor.pub/images/hero/the-anchor-pub-interior-atmosphere.jpg",
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
            "url": "https://the-anchor.pub/near-heathrow/terminal-2",
            "telephone": "+441753682707",
            "priceRange": "££",
            "servesCuisine": ["British", "Pub Food"],
            "nearbyLocation": {
              "@type": "Airport",
              "name": "Heathrow Terminal 2",
              "iataCode": "LHR"
            }
          })
        }}
      />
    </>
  )
}