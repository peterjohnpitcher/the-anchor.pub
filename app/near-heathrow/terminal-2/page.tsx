import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { FlightStatus, FlightDelayWidget } from '@/components/FlightStatus'

export const metadata: Metadata = {
  title: 'Pub Near Heathrow Terminal 2 | The Anchor - 10 Minutes Away',
  description: 'Traditional British pub just 10 minutes from Heathrow Terminal 2. Free parking, great food, and perfect for Star Alliance travelers. Your pre-flight dining destination.',
  keywords: 'pub near terminal 2, heathrow terminal 2 restaurant, closest pub to T2, star alliance terminal pub, queens terminal restaurant',
  openGraph: {
    title: 'The Anchor - 10 Minutes from Heathrow Terminal 2',
    description: 'The perfect traditional British pub near Terminal 2. Free parking and authentic pub food.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
}

export default function Terminal2Page() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-anchor-green to-anchor-green-dark" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-anchor-gold text-lg mb-4">Just 10 minutes away</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Local Pub Near Heathrow Terminal 2
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Perfect for Star Alliance travelers • Free parking • Traditional British hospitality
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallToAction 
                href="tel:01753682707"
                variant="primary"
                size="large"
              >
                📞 Book a Table
              </CallToAction>
              
              <CallToAction 
                href="#directions"
                variant="white"
                size="large"
              >
                📍 Get Directions
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🚗</div>
              <p className="font-bold text-anchor-green">10 mins</p>
              <p className="text-sm text-gray-600">by car</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🅿️</div>
              <p className="font-bold text-anchor-green">Free</p>
              <p className="text-sm text-gray-600">parking</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🍺</div>
              <p className="font-bold text-anchor-green">Real</p>
              <p className="text-sm text-gray-600">British pub</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="font-bold text-anchor-green">Star Alliance</p>
              <p className="text-sm text-gray-600">Terminal 2</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Directions */}
      <section id="directions" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              How to Get Here from Terminal 2
            </h2>
            
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
                    <p className="font-semibold mb-2">Cost: £12-15</p>
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
              <CallToAction
                href="https://maps.google.com/maps?saddr=Heathrow+Terminal+2&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ"
                variant="primary"
                size="large"
                external
              >
                Open in Google Maps
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Why Terminal 2 Travelers Choose The Anchor
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  ⭐ Star Alliance Hub
                </h3>
                <p className="text-gray-700">
                  Terminal 2 hosts Star Alliance carriers including Lufthansa, United, Air Canada, 
                  and Singapore Airlines. Enjoy authentic British hospitality before your international journey.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  👑 The Queen&apos;s Terminal
                </h3>
                <p className="text-gray-700">
                  Opened by Her Majesty in 2014, T2 is Heathrow&apos;s newest terminal. 
                  Experience a piece of traditional Britain at The Anchor before entering this modern gateway.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🅿️ Smart Parking Choice
                </h3>
                <p className="text-gray-700">
                  Terminal 2 short-stay parking costs £6.90 for just 30 minutes! 
                  Park free with us while dropping off or collecting passengers.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🍽️ International Meets Local
                </h3>
                <p className="text-gray-700">
                  Flying to Munich, Toronto, or Singapore? Start with fish & chips or a Sunday roast. 
                  Our international guests love experiencing authentic British pub culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Flight Information */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Live Terminal 2 Flight Information
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8">
              Check flight times while you enjoy your meal or drink
            </p>
            <FlightStatus terminal="2" type="both" limit={5} />
          </div>
        </div>
      </section>

      {/* Terminal 2 Specific Info */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Terminal 2 Travel Tips
            </h2>
            
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

            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Insider Knowledge</h3>
              <ul className="space-y-3 text-gray-700">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            See You Soon at The Anchor!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Just 10 minutes from Terminal 2 • Free Parking • Authentic British Pub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="large"
            >
              📞 01753 682707
            </CallToAction>
            <CallToAction 
              href="/near-heathrow"
              variant="white"
              size="large"
            >
              ← Back to All Terminals
            </CallToAction>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">The Anchor</p>
            <p>Horton Road, Stanwell Moor</p>
            <p>Surrey TW19 6AQ</p>
          </div>
        </div>
      </section>

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
    <Footer /></>
  )
}