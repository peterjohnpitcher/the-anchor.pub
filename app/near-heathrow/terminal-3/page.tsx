import Link from 'next/link'
import { Button } from '@/components/ui'
import { BookTableButton } from '@/components/BookTableButton'
import { HeroWrapper } from '@/components/hero'
import { Metadata } from 'next'
import { FlightStatus, FlightDelayWidget } from '@/components/FlightStatus'
import { SectionHeader } from '@/components/SectionHeader'
import { FeatureGrid } from '@/components/FeatureCard'
import { InfoBoxGrid } from '@/components/InfoBox'
import { AlertBox } from '@/components/AlertBox'
import { CTASection, Container } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { DirectionsButton } from '@/components/DirectionsButton'
import { PhoneButton } from '@/components/PhoneButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { PARKING } from '@/lib/constants'
import { DEFAULT_NEAR_HEATHROW_IMAGE } from '@/lib/image-fallbacks'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { InternalLinkingSection } from '@/components/seo/InternalLinkingSection'

export const metadata: Metadata = {
  title: 'Pub Near Heathrow Terminal 3 - 11 Minute Taxi | The Anchor',
  description: 'Choose The Anchor near Heathrow Terminal 3 for real British pub food, free parking and family-friendly atmosphere. 11 minute taxi from Virgin Atlantic and Emirates arrivals.',
  keywords: 'pub near heathrow terminal 3, virgin atlantic crew pub, emirates terminal 3 restaurant alternative, family pub near heathrow hotels, taxi from terminal 3 to pub',
  openGraph: {
    title: 'Pub Near Heathrow Terminal 3 - Free Parking & British Food',
    description: 'The Anchor offers an authentic pub alternative to Terminal 3 hotels with free parking and traditional British dishes.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE],
  },
  twitter: getTwitterMetadata({
    title: 'Pub Near Heathrow Terminal 3 - Free Parking & British Food',
    description: 'The Anchor offers an authentic pub alternative to Terminal 3 hotels with free parking and traditional British dishes.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE]
  })
}

export default function Terminal3Page() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Near Heathrow', url: '/near-heathrow' },
    { name: 'Terminal 3', url: '/near-heathrow/terminal-3' }
  ])

  return (
    <>
      
      {/* Hero Section */}
      <HeroWrapper
        route="/near-heathrow/terminal-3"
        title="Your Family Pub Near Heathrow Terminal 3"
        description="Perfect for Virgin Atlantic & Emirates travelers • Free parking • British hospitality"
        size="large"
        tags={[
          { label: "Just 11 minutes away", variant: "warning" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton
              phone="01753 682707"
              source="terminal_3_hero"
              variant="primary"
              size="lg"
            >
              📞 Book a Table
            </PhoneButton>
            
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

      {/* Quick Summary */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-anchor-cream/40 border border-anchor-cream rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-anchor-green mb-3">Key Info For Terminal 3 Travellers</h2>
            <p className="text-gray-700 mb-4">
              Swap Terminal 3 hotel dining for a proper village pub. Friendly staff, fair prices and space for luggage make The Anchor ideal for Virgin Atlantic and Emirates passengers.
            </p>
            <div className="grid gap-3 md:grid-cols-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-anchor-gold">⏱️</span>
                <span>11 minute taxi or Uber (£20-25) via Tunnel Road</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-anchor-gold">🅿️</span>
                <span>Free parking for meet-ups, luggage swaps and family meals</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-anchor-gold">👨‍👩‍👧‍👦</span>
                <span>Family-friendly seating with children\'s menu and high chairs</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-anchor-gold">📞</span>
                <span>Phone 01753 682707 to reserve ahead of peak travel times</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Title */}
      <section className="section-spacing bg-white">
        <Container>
          <PageTitle className="text-center text-anchor-green" seo={{ structured: true, speakable: true }}>
            Pub Near Heathrow Terminal 3 - The Anchor
          </PageTitle>
        </Container>
      </section>

      {/* Quick Info Cards */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <FeatureGrid
            columns={4}
            features={[
              {
                icon: "🚗",
                title: "15 mins",
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
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* By Car */}
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚗 By Car (11 minutes)</h3>
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
                    <p className="font-semibold mb-2">Cost: £20-£25</p>
                    <p className="text-sm mb-2">Journey time: 11 minutes</p>
                    <p className="text-sm mb-2">Distance: 4.5 miles</p>
                    <p>Tell your driver: &quot;The Anchor, Horton Road, Stanwell Moor&quot;</p>
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

              {/* By Bus */}
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚌 By Bus</h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Route 442</p>
                    <p className="text-sm mb-2">Journey time: 20-25 minutes</p>
                    <p className="text-sm mb-2">Runs every 30 minutes</p>
                    <p>Cost: About what a pint should cost</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">From Terminal 3:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Bus stop at Central Bus Station</li>
                      <li>Between Terminals 2 & 3</li>
                      <li>Follow signs from arrivals</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-semibold text-anchor-green mb-2">Your Stop:</p>
                    <p className="text-sm">Get off at Horton Road - The Anchor is right there!</p>
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
              <DirectionsButton
                href="https://maps.google.com/maps?saddr=Heathrow+Terminal+3&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ"
                source="terminal_3_directions"
                variant="primary"
                size="lg"
                fromLocation="Heathrow Terminal 3"
              >
                Open in Google Maps
              </DirectionsButton>
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

      {/* Hotel Guest Section */}
      <section className="section-spacing bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Staying Near Terminal 3?"
              subtitle="Escape your hotel for a genuine British pub experience"
              align="center"
            />
            
            <div className="mb-12">
              <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto">
                If you're staying at one of the Terminal 3 hotels, The Anchor offers 
                the perfect escape from hotel dining. Experience a real British family 
                pub where locals gather - a refreshing change from the international 
                atmosphere of airport hotels.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">
                Why Hotel Guests Choose The Anchor
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-3">🏠 A Real Local Experience</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-anchor-gold">✓</span>
                      <span>Traditional British pub atmosphere</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-anchor-gold">✓</span>
                      <span>Meet local residents, not just travelers</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-anchor-gold">✓</span>
                      <span>Authentic ales and home-cooked meals</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-anchor-gold">✓</span>
                      <span>Peaceful setting away from airport hustle</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3">💰 Better Value Than Hotels</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-anchor-gold">✓</span>
                      <span>Pub prices, not hotel prices</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-anchor-gold">✓</span>
                      <span>Hearty portions of British classics</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-anchor-gold">✓</span>
                      <span>Free parking saves on hotel charges</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-anchor-gold">✓</span>
                      <span>Relaxed atmosphere with no time limits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">
                🚕 Getting Here from Terminal 3 Hotels
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-semibold mb-2">By Taxi</p>
                  <p className="text-3xl font-bold text-anchor-gold mb-2">£20-25</p>
                  <p className="text-sm text-gray-600">11 minutes</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">By Uber</p>
                  <p className="text-3xl font-bold text-anchor-gold mb-2">£16-20</p>
                  <p className="text-sm text-gray-600">11 minutes</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">By Bus</p>
                  <p className="text-3xl font-bold text-anchor-gold mb-2">£2.50</p>
                  <p className="text-sm text-gray-600">Take 442 bus</p>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Tell your driver: "The Anchor, Horton Road, Stanwell Moor"
              </p>
            </div>

            <div className="bg-anchor-green text-white rounded-2xl p-8 text-center">
              <p className="text-lg mb-4 max-w-2xl mx-auto">
                Take a break from the hustle and bustle of airport life. 
                The Anchor offers a peaceful village pub atmosphere where you can 
                relax, enjoy great food, and experience genuine British hospitality.
              </p>
              <BookTableButton
                source="terminal_3_hotel_cta"
                context="heathrow_terminal_3_hotels"
                variant="secondary"
                size="lg"
                className="bg-white text-anchor-green hover:bg-gray-100"
              >
                📅 Book Your Table Online
              </BookTableButton>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkingSection
        title="Make The Most Of Your Heathrow Stop"
        links={[
          { href: '/pizza-tuesday', title: 'Tuesday Pizza Deal', description: '2-for-1 stone-baked pizzas for crew and families' },
          { href: '/food-menu', title: 'Full Food Menu', description: 'Pub classics and Sunday roast pre-orders' },
          { href: '/drinks/jagerbomb', title: 'Jagerbomb Shots', description: 'Energy boost before red-eye flights' },
          { href: '/near-heathrow/terminal-4', title: 'Terminal 4 Guide', description: 'Travel tips for other Heathrow terminals' }
        ]}
        className="section-spacing-md"
      />

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far is The Anchor from Heathrow Terminal 3?",
            answer: "The Anchor is just 11 minutes drive from Heathrow Terminal 3. We're the perfect spot for a pre-flight meal or drinks after landing."
          },
          {
            question: "Do you have parking for Terminal 3 travelers?",
            answer: `Yes! We offer free parking with space for ${PARKING.capacity} cars. Much more affordable than airport parking for short stays.`
          },
          {
            question: "What time should I leave for Terminal 3?",
            answer: "Allow 11 minutes to reach Terminal 3 from our pub, plus time for parking and security. We recommend leaving at least 2.5 hours before your flight for most destinations, 3.5 hours for long-haul flights to Asia or the Americas."
          },
          {
            question: "Is The Anchor good for Terminal 3 hotel guests?",
            answer: "Absolutely! Many guests from Terminal 3 hotels visit us for a break from hotel dining. We offer a genuine British family pub atmosphere with local residents, traditional ales, and home-cooked food at pub prices."
          },
          {
            question: "How do I get to The Anchor from my Terminal 3 hotel?",
            answer: "It's about £20-25 by taxi (11 minutes) or £16-20 by Uber. The 442 bus also stops near us for just £2.50. Tell your driver 'The Anchor, Horton Road, Stanwell Moor' or use postcode TW19 6AQ."
          },
          {
            question: "Can I get a taxi from Terminal 3 to The Anchor?",
            answer: "Yes, taxis are readily available from Terminal 3. The journey costs £20-25 and takes about 11 minutes (4.5 miles). Taxi ranks are located at Terminal 3 Arrivals (Ground floor), Terminal 3 Departures drop-off, and the Central Bus Station shared with T2. Tell your driver 'The Anchor, Horton Road, Stanwell Moor'."
          },
          {
            question: "Is there a bus from Terminal 3 to The Anchor?",
            answer: "Yes! The 442 bus runs from Terminal 3 to Stanwell Moor, stopping right outside The Anchor. It takes 20-25 minutes and runs every 30 minutes. The bus stop is at the Central Bus Station between Terminals 2 & 3 - follow signs from arrivals. Cost is about what a pint should cost."
          },
          {
            question: "Is The Anchor family-friendly for Terminal 3 travelers?",
            answer: "Yes! We're very family-friendly with a dedicated children's menu, high chairs, and a relaxed atmosphere. Much better than busy airport restaurants for families with children. Our garden area is perfect for kids to stretch their legs before a long flight."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <CTASection
        title="See You Soon at The Anchor!"
        description="Just 11 minutes from Terminal 3 • Free Parking • Family Friendly"
        variant="green"
        buttons={[
          {
            text: "📞 01753 682707",
            href: "tel:+441753682707",
            isPhone: true,
            phoneSource: "terminal_3_cta_section",
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
          __html: JSON.stringify([
            breadcrumbSchema,
            {
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "The Anchor - Pub Near Heathrow Terminal 3",
              "description": "Family-friendly British pub just 11 minutes from Heathrow Terminal 3 with free parking.",
              "image": "https://www.the-anchor.pub/images/page-headers/near-heathrow/Heathrow.jpg",
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
              "url": "https://www.the-anchor.pub/near-heathrow/terminal-3",
              "telephone": "+441753682707",
              "priceRange": "££",
              "servesCuisine": ["British", "Pub Food"],
              "nearbyLocation": {
                "@type": "Airport",
                "name": "Heathrow Terminal 3",
                "iataCode": "LHR"
              }
            }
          ])
        }}
      />
    </>
  )
}
