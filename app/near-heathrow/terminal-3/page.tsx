import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { HeroWrapper } from '@/components/hero'
import { Metadata } from 'next'
import { FlightStatus, FlightDelayWidget } from '@/components/FlightStatus'
import { SectionHeader } from '@/components/SectionHeader'
import { FeatureGrid } from '@/components/FeatureCard'
import { InfoBoxGrid } from '@/components/InfoBox'
import { AlertBox } from '@/components/AlertBox'
import { CTASection } from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Pub Near Heathrow Terminal 3 | The Anchor - 10 Minutes Away',
  description: 'Family-friendly British pub just 10 minutes from Heathrow Terminal 3. Free parking, traditional food, perfect for Virgin Atlantic and Emirates travelers.',
  keywords: 'pub near terminal 3, heathrow terminal 3 restaurant, closest pub to T3, virgin atlantic terminal pub, emirates terminal restaurant',
  openGraph: {
    title: 'The Anchor - 10 Minutes from Heathrow Terminal 3',
    description: 'Traditional British pub near Terminal 3. Free parking and family-friendly atmosphere.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
}

export default function Terminal3Page() {
  return (
    <>
      
      {/* Hero Section */}
      <HeroWrapper
        route="/near-heathrow/terminal-3"
        title="Your Family Pub Near Heathrow Terminal 3"
        description="Perfect for Virgin Atlantic & Emirates travelers • Free parking • British hospitality"
        size="large"
        tags={[
          { label: "Just 10 minutes away", variant: "warning" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="tel:01753682707"
              variant="primary"
              size="lg"
            >
              📞 Book a Table
            </CallToAction>
            
            <CallToAction 
              href="#directions"
              variant="white"
              size="lg"
            >
              📍 Get Directions
            </CallToAction>
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
                icon: "👨‍👩‍👧‍👦",
                title: "Family",
                description: "friendly"
              },
              {
                icon: "✈️",
                title: "Virgin & Emirates",
                description: "Terminal 3"
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
              title="How to Get Here from Terminal 3"
              align="center"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* By Car */}
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚗 By Car (10 minutes)</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">1.</span>
                    Exit Terminal 3 following signs for A4/M4
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">2.</span>
                    Take the tunnel under the runways
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">3.</span>
                    Join A4 Bath Road heading East
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">4.</span>
                    After 2 miles, turn left onto A3044 (Stanwell Moor Road)
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">5.</span>
                    Continue for 1 mile, turn left at Horton Road
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
                    <p className="font-semibold mb-2">Cost: £12-15</p>
                    <p>Tell your driver: &quot;The Anchor pub, Horton Road, Stanwell Moor&quot;</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Taxi Ranks:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Terminal 3 Arrivals (Ground floor)</li>
                      <li>Terminal 3 Departures drop-off</li>
                      <li>Central Bus Station (shared with T2)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-semibold text-anchor-green mb-2">Family Tip:</p>
                    <p className="text-sm">Traveling with kids? We have high chairs and a children&apos;s menu!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Interactive Map</h3>
              <p className="text-gray-700 mb-6">
                Click below for turn-by-turn directions from Terminal 3
              </p>
              <CallToAction
                href="https://maps.google.com/maps?saddr=Heathrow+Terminal+3&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ"
                variant="primary"
                size="lg"
                external
              >
                Open in Google Maps
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Why Terminal 3 Travelers Choose The Anchor"
              align="center"
            />
            
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "Global Airlines Hub",
                  icon: "🌍",
                  content: "Terminal 3 hosts Virgin Atlantic, Emirates, Delta, and many Asian carriers. Whether flying to New York, Dubai, or Tokyo, start with a taste of Britain."
                },
                {
                  title: "Family-Friendly Space",
                  icon: "👨‍👩‍👧‍👦",
                  content: "Traveling with children? We offer a dedicated kids menu, high chairs, and a relaxed atmosphere. Much better than busy airport restaurants!"
                },
                {
                  title: "Value for Money",
                  icon: "💷",
                  content: "A family meal at T3 can cost over £60. Enjoy the same at The Anchor for half the price, with generous portions and free parking too!"
                },
                {
                  title: "Perfect for Arrivals",
                  icon: "🛬",
                  content: "Meeting someone from a long-haul flight? Wait comfortably with us instead of the crowded arrivals hall. Track flights on our free WiFi."
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
              title="Live Terminal 3 Flight Information"
              subtitle="Check flight times while you enjoy your meal or drink"
              align="center"
            />
            <FlightStatus terminal="3" type="both" limit={5} />
          </div>
        </div>
      </section>

      {/* Terminal 3 Specific Info */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Terminal 3 Travel Tips"
              align="center"
            />
            
            <div className="mb-8">
              <FlightDelayWidget terminal="3" />
            </div>
            
            <div className="bg-anchor-sand/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Airlines & Routes</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-2">Major Airlines:</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Virgin Atlantic - USA, Caribbean</li>
                    <li>• Emirates - Dubai connections</li>
                    <li>• Delta - USA destinations</li>
                    <li>• Cathay Pacific - Hong Kong</li>
                    <li>• Qantas - Australia via Dubai/Singapore</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Peak Times:</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Morning: 10-11am Emirates departures</li>
                    <li>• Afternoon: 12-3pm Virgin Atlantic to USA</li>
                    <li>• Evening: 8-10pm Asian carriers</li>
                    <li>• Quietest: Early morning (6-8am)</li>
                  </ul>
                </div>
              </div>
            </div>

            <AlertBox
              variant="tip"
              title="Local Insights"
              content={
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span>💡</span>
                    <span>Virgin Atlantic Premium check-in is worth it for families - much shorter queues</span>
                  </li>
                  <li className="flex gap-3">
                    <span>💡</span>
                    <span>Emirates A380 flights board 45 mins early - don&apos;t cut it close!</span>
                  </li>
                  <li className="flex gap-3">
                    <span>💡</span>
                    <span>T3 has the best shopping at Heathrow - arrive early if you want to browse</span>
                  </li>
                  <li className="flex gap-3">
                    <span>💡</span>
                    <span>We&apos;re popular with Virgin cabin crew - great stories over Sunday lunch!</span>
                  </li>
                </ul>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="See You Soon at The Anchor!"
        description="Just 10 minutes from Terminal 3 • Free Parking • Family Friendly"
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
            "name": "The Anchor - Pub Near Heathrow Terminal 3",
            "description": "Family-friendly British pub just 10 minutes from Heathrow Terminal 3 with free parking.",
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
            "url": "https://the-anchor.pub/near-heathrow/terminal-3",
            "telephone": "+441753682707",
            "priceRange": "££",
            "servesCuisine": ["British", "Pub Food"],
            "nearbyLocation": {
              "@type": "Airport",
              "name": "Heathrow Terminal 3",
              "iataCode": "LHR"
            }
          })
        }}
      />
    </>
  )
}