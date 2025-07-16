import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { HeroWrapper } from '@/components/hero'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { FlightStatus, FlightDelayWidget } from '@/components/FlightStatus'
import { TerminalNavigation } from '@/components/TerminalNavigation'

export const metadata: Metadata = {
  title: 'Pub Near Heathrow Terminal 5 | The Anchor - 7 Minutes Away',
  description: 'The closest pub to Heathrow Terminal 5 - just 7 minutes drive. Free parking, traditional British food, and a warm welcome. Perfect for BA travelers.',
  keywords: 'pub near terminal 5, heathrow terminal 5 restaurant, closest pub to T5, british airways terminal pub',
  openGraph: {
    title: 'The Anchor - 7 Minutes from Heathrow Terminal 5',
    description: 'The closest traditional British pub to Terminal 5. Free parking and great food.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
}

export default function Terminal5Page() {
  return (
    <>
      
      {/* Hero Section */}
      <HeroWrapper
        route="/near-heathrow/terminal-5"
        title="The Closest Pub to Heathrow Terminal 5"
        description="Perfect for British Airways travelers • Free parking • Traditional British pub"
        size="small"
        tags={[
          { label: '✈️ Just 7 minutes away', variant: 'success' },
          { label: '🇬🇧 British Airways Terminal', variant: 'primary' }
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
              variant="secondary"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🚗</div>
              <p className="font-bold text-anchor-green">7 mins</p>
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
              <div className="text-3xl mb-2">✈️</div>
              <p className="font-bold text-anchor-green">BA Hub</p>
              <p className="text-sm text-gray-600">Terminal 5</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Navigation */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <TerminalNavigation currentTerminal="5" />
        </div>
      </section>

      {/* Detailed Directions */}
      <section id="directions" className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              How to Get Here from Terminal 5
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* By Car */}
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚗 By Car (7 minutes)</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">1.</span>
                    Exit Terminal 5 following signs for M25/A30
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">2.</span>
                    At roundabout, take A3044 towards Staines
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">3.</span>
                    Continue straight for 1.5 miles
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">4.</span>
                    Turn right onto Horton Road (at the church)
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">5.</span>
                    The Anchor is 200m on your right
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
                      <li>Arrivals level (Ground floor)</li>
                      <li>Departures level (First floor)</li>
                      <li>Short stay car park</li>
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
                Click below for turn-by-turn directions from Terminal 5
              </p>
              <CallToAction
                href="https://maps.google.com/maps?saddr=Heathrow+Terminal+5&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ"
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
              Why Terminal 5 Travelers Choose The Anchor
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  ✈️ Perfect for BA Travelers
                </h3>
                <p className="text-gray-700">
                  Terminal 5 is British Airways&apos; exclusive hub. Whether you&apos;re flying 
                  Club World or Euro Traveller, enjoy a proper British welcome just minutes away.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  ⏰ Beat the Airport Prices
                </h3>
                <p className="text-gray-700">
                  Why pay £15 for a sandwich at T5? Enjoy a full meal with us for the same price. 
                  Plus a pint costs half what you&apos;d pay airside!
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🅿️ Free Parking Advantage
                </h3>
                <p className="text-gray-700">
                  Meeting someone? Save on T5&apos;s expensive short-stay parking. 
                  Park free with us and track their flight on our WiFi.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🍽️ Pre-Flight Dining
                </h3>
                <p className="text-gray-700">
                  Start your holiday right. Relax in our beer garden, enjoy a proper meal, 
                  then head to T5 refreshed and ready - not rushed and hungry.
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
              Live Terminal 5 Flight Information
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8">
              Check flight times while you enjoy your meal or drink
            </p>
            <FlightStatus terminal="5" type="both" limit={5} />
          </div>
        </div>
      </section>

      {/* Terminal 5 Specific Info */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Terminal 5 Travel Tips
            </h2>
            
            <div className="mb-8">
              <FlightDelayWidget terminal="5" />
            </div>

            <div className="bg-anchor-sand/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Travel Tips</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-2">Check-in Times:</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Short-haul: 2 hours before</li>
                    <li>• Long-haul: 3 hours before</li>
                    <li>• Allow 15 mins to reach T5 from here</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Popular Routes:</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• New York JFK</li>
                    <li>• Dubai</li>
                    <li>• Barcelona</li>
                    <li>• Edinburgh</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Local Knowledge</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span>💡</span>
                  <span>T5 security is typically quieter before 6am and after 8pm</span>
                </li>
                <li className="flex gap-3">
                  <span>💡</span>
                  <span>The Anchor is popular with BA cabin crew - we know the flight schedules!</span>
                </li>
                <li className="flex gap-3">
                  <span>💡</span>
                  <span>We can store luggage for short periods if you&apos;re between flights</span>
                </li>
                <li className="flex gap-3">
                  <span>💡</span>
                  <span>Our Sunday roast is famous among T5 staff - book ahead!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far is The Anchor from Heathrow Terminal 5?",
            answer: "The Anchor is just 7 minutes (2.8 miles) from Terminal 5, making it the closest traditional British pub to T5. It's a straight drive via the A3044."
          },
          {
            question: "Is there parking at The Anchor near Terminal 5?",
            answer: "Yes! We offer free parking for all customers. This is perfect for meeting arriving passengers or enjoying a meal before your flight without paying expensive airport parking fees."
          },
          {
            question: "Can I get a taxi from Terminal 5 to The Anchor?",
            answer: "Yes, taxis are readily available from Terminal 5. The journey costs around £25 and takes about 7 minutes. Tell your driver 'The Anchor pub, Horton Road, Stanwell Moor, TW19 6AQ'. Alternatively, the 442 bus stops directly outside the pub for much less."
          },
          {
            question: "What time should I leave The Anchor to catch my flight from T5?",
            answer: "Allow 15 minutes to drive from The Anchor to Terminal 5, plus parking time if needed. For short-haul flights, leave 2.5 hours before departure. For long-haul, leave 3.5 hours before."
          },
          {
            question: "Do BA cabin crew visit The Anchor?",
            answer: "Yes! We're very popular with British Airways crew based at Terminal 5. Many are regulars who appreciate our proximity to T5 and relaxed atmosphere after long flights."
          },
          {
            question: "Can I store luggage at The Anchor between flights?",
            answer: "We can store luggage for short periods for customers who are dining with us. Perfect if you have a long layover or are between flights. Just ask our staff."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            See You Soon at The Anchor!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Just 7 minutes from Terminal 5 • Free Parking • Great British Food
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
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "The Anchor - Pub Near Heathrow Terminal 5",
              "description": "The closest pub to Heathrow Terminal 5 - just 7 minutes drive with free parking.",
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
              "url": "https://the-anchor.pub/near-heathrow/terminal-5",
              "telephone": "+441753682707",
              "priceRange": "££",
              "servesCuisine": ["British", "Pub Food"],
              "nearbyLocation": {
                "@type": "Airport",
                "name": "Heathrow Terminal 5",
                "iataCode": "LHR"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to get to The Anchor from Heathrow Terminal 5",
              "description": "Easy directions from Terminal 5 to The Anchor pub - just 7 minutes by car",
              "totalTime": "PT7M",
              "supply": {
                "@type": "HowToSupply",
                "name": "Transportation",
                "requiredQuantity": 1
              },
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Exit Terminal 5",
                  "text": "Exit Terminal 5 following signs for M25/A30",
                  "position": 1
                },
                {
                  "@type": "HowToStep",
                  "name": "Take A3044",
                  "text": "At roundabout, take A3044 towards Staines",
                  "position": 2
                },
                {
                  "@type": "HowToStep",
                  "name": "Continue straight",
                  "text": "Continue straight for 1.5 miles",
                  "position": 3
                },
                {
                  "@type": "HowToStep",
                  "name": "Turn onto Horton Road",
                  "text": "Turn right onto Horton Road (at the church)",
                  "position": 4
                },
                {
                  "@type": "HowToStep",
                  "name": "Arrive at The Anchor",
                  "text": "The Anchor is 200m on your right with free parking",
                  "position": 5
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How far is The Anchor from Heathrow Terminal 5?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Anchor is just 7 minutes (2.8 miles) from Terminal 5, making it the closest traditional British pub to T5. It's a straight drive via the A3044."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there parking at The Anchor near Terminal 5?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We offer free parking for all customers. This is perfect for meeting arriving passengers or enjoying a meal before your flight without paying expensive airport parking fees."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I get a taxi from Terminal 5 to The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, taxis are readily available from Terminal 5. The journey costs around £25 and takes about 7 minutes. Tell your driver 'The Anchor pub, Horton Road, Stanwell Moor, TW19 6AQ'. Alternatively, the 442 bus stops directly outside the pub for much less."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What time should I leave The Anchor to catch my flight from T5?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Allow 15 minutes to drive from The Anchor to Terminal 5, plus parking time if needed. For short-haul flights, leave 2.5 hours before departure. For long-haul, leave 3.5 hours before."
                  }
                }
              ]
            }
          ])
        }}
      />
    </>
  )
}