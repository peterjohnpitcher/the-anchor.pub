import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { PageHeaderWrapper } from '@/components/ui/PageHeaderWrapper'
import { Metadata } from 'next'
import { FlightStatus, FlightDelayWidget } from '@/components/FlightStatus'

export const metadata: Metadata = {
  title: 'Pub Near Heathrow Terminal 4 | The Anchor - 12 Minutes Away',
  description: 'Traditional British pub just 12 minutes from Heathrow Terminal 4. Free parking, authentic food, perfect for SkyTeam and budget airline travelers.',
  keywords: 'pub near terminal 4, heathrow terminal 4 restaurant, closest pub to T4, skyteam terminal pub, terminal 4 dining',
  openGraph: {
    title: 'The Anchor - 12 Minutes from Heathrow Terminal 4',
    description: 'Authentic British pub near Terminal 4. Free parking and traditional hospitality.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
}

export default function Terminal4Page() {
  return (
    <>
      
      {/* Hero Section */}
      <PageHeaderWrapper
        route="/near-heathrow/terminal-4"
        title="Traditional British Pub Near Heathrow Terminal 4"
        description="Perfect for SkyTeam & budget travelers • Free parking • Real British hospitality"
        minHeight="min-h-[60vh]"
      >
        <p className="text-anchor-gold text-lg mb-4">Just 12 minutes away</p>
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
      </PageHeaderWrapper>

      {/* Quick Info Cards */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🚗</div>
              <p className="font-bold text-anchor-green">12 mins</p>
              <p className="text-sm text-gray-600">by car</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🅿️</div>
              <p className="font-bold text-anchor-green">Free</p>
              <p className="text-sm text-gray-600">parking</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">💷</div>
              <p className="font-bold text-anchor-green">Value</p>
              <p className="text-sm text-gray-600">prices</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🌐</div>
              <p className="font-bold text-anchor-green">SkyTeam</p>
              <p className="text-sm text-gray-600">Terminal 4</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Directions */}
      <section id="directions" className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              How to Get Here from Terminal 4
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* By Car */}
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚗 By Car (12 minutes)</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">1.</span>
                    Exit Terminal 4 following signs for M25/A30
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">2.</span>
                    Take Southern Perimeter Road west
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">3.</span>
                    At Hatton Cross, follow A30 towards Staines
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">4.</span>
                    After 2.5 miles, turn right onto A3044
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">5.</span>
                    After 1 mile, turn right onto Horton Road
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
                    <p className="font-semibold mb-2">Cost: £15-18</p>
                    <p>Tell your driver: &quot;The Anchor pub, Horton Road, Stanwell Moor&quot;</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Taxi Ranks:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Terminal 4 Arrivals (Level 0)</li>
                      <li>Terminal 4 Departures (Level 1)</li>
                      <li>Short stay car park entrance</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-semibold text-anchor-green mb-2">Budget Tip:</p>
                    <p className="text-sm">Share a taxi with other travelers - ask at the rank!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Interactive Map</h3>
              <p className="text-gray-700 mb-6">
                Click below for turn-by-turn directions from Terminal 4
              </p>
              <CallToAction
                href="https://maps.google.com/maps?saddr=Heathrow+Terminal+4&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ"
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
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Why Terminal 4 Travelers Choose The Anchor
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🌐 SkyTeam Alliance Hub
                </h3>
                <p className="text-gray-700">
                  Terminal 4 hosts Air France, KLM, and other SkyTeam partners, plus many 
                  Middle Eastern and Asian carriers. Experience British culture before your journey.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  💰 Budget-Friendly Option
                </h3>
                <p className="text-gray-700">
                  T4 also serves budget airlines. Why start your holiday overspending at the airport? 
                  Our meals cost less than airport fast food with proper portions.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🚊 Transit Alternative
                </h3>
                <p className="text-gray-700">
                  T4 is furthest from central terminals. If you have a long connection, 
                  escape to The Anchor instead of waiting in crowded lounges.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🌙 24-Hour Terminal Benefits
                </h3>
                <p className="text-gray-700">
                  T4 handles many overnight flights. Join us for a late afternoon meal or 
                  evening drink - much more comfortable than terminal seating!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Flight Information */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Live Terminal 4 Flight Information
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8">
              Check flight times while you enjoy your meal or drink
            </p>
            <FlightStatus terminal="4" type="both" limit={5} />
          </div>
        </div>
      </section>

      {/* Terminal 4 Specific Info */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Terminal 4 Travel Tips
            </h2>
            
            <div className="mb-8">
              <FlightDelayWidget terminal="4" />
            </div>
            
            <div className="bg-anchor-sand/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Airlines & Destinations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-2">Major Airlines:</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Air France - Paris CDG</li>
                    <li>• KLM - Amsterdam</li>
                    <li>• Etihad - Abu Dhabi</li>
                    <li>• Malaysia Airlines - Kuala Lumpur</li>
                    <li>• Qatar Airways - Doha</li>
                    <li>• Plus many more Asian/ME carriers</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Terminal Features:</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Separate from T2/T3 complex</li>
                    <li>• Free terminal train to T2/T3</li>
                    <li>• Generally quieter than other terminals</li>
                    <li>• Good for overnight layovers</li>
                    <li>• Limited dining after 9pm</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Insider Tips</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span>💡</span>
                  <span>T4 to T5 connections need 90+ minutes - consider a quick meal with us instead!</span>
                </li>
                <li className="flex gap-3">
                  <span>💡</span>
                  <span>Air France morning flights are busy - T4 security peaks 5:30-7:30am</span>
                </li>
                <li className="flex gap-3">
                  <span>💡</span>
                  <span>Many Gulf carrier flights depart late evening - perfect for an early dinner</span>
                </li>
                <li className="flex gap-3">
                  <span>💡</span>
                  <span>T4 parking is cheapest at Heathrow - but free is better at The Anchor!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            See You Soon at The Anchor!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Just 12 minutes from Terminal 4 • Free Parking • Great Value
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 01753 682707
            </CallToAction>
            <CallToAction 
              href="/near-heathrow"
              variant="white"
              size="lg"
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
            "name": "The Anchor - Pub Near Heathrow Terminal 4",
            "description": "Traditional British pub just 12 minutes from Heathrow Terminal 4 with free parking.",
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
            "url": "https://the-anchor.pub/near-heathrow/terminal-4",
            "telephone": "+441753682707",
            "priceRange": "££",
            "servesCuisine": ["British", "Pub Food"],
            "nearbyLocation": {
              "@type": "Airport",
              "name": "Heathrow Terminal 4",
              "iataCode": "LHR"
            }
          })
        }}
      />
    </>
  )
}