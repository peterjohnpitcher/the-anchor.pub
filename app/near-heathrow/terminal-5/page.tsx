import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { HeroWrapper } from '@/components/hero'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { DirectionsButton } from '@/components/DirectionsButton'
import { Metadata } from 'next'
import { FlightStatus, FlightDelayWidget } from '@/components/FlightStatus'
import { TerminalNavigation } from '@/components/TerminalNavigation'
import { SectionHeader } from '@/components/SectionHeader'
import { FeatureGrid } from '@/components/FeatureCard'
import { InfoBoxGrid } from '@/components/InfoBox'
import { AlertBox } from '@/components/AlertBox'
import { CTASection } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { BookTableButton } from '@/components/BookTableButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'

export const metadata: Metadata = {
  title: 'Pub Near Heathrow Terminal 5 Hotels | The Anchor - Local British Pub',
  description: 'Escape Sofitel & Hilton T5 hotel dining. Experience an authentic British family pub just 7 minutes from Terminal 5. Free parking, real ales, home-cooked food.',
  keywords: 'pub near terminal 5, heathrow terminal 5 restaurant, closest pub to T5, british airways terminal pub, sofitel heathrow alternative, hilton T5 restaurant, local pub near heathrow hotels',
  openGraph: {
    title: 'The Anchor - Real British Pub Near Terminal 5 Hotels',
    description: 'Escape hotel dining! Authentic local pub 7 mins from Sofitel & Hilton T5. Free parking.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'The Anchor - Real British Pub Near Terminal 5 Hotels',
    description: 'Escape hotel dining! Authentic local pub 7 mins from Sofitel & Hilton T5. Free parking.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg']
  })
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
            <BookTableButton
              source="terminal_5_hero"
              context="heathrow_terminal_5"
              variant="primary"
              size="lg"
            >
              📅 Book a Table Online
            </BookTableButton>
            
            <Link href="#directions">
      <Button 
        variant="secondary"
        size="lg"
      >
        📍 Get Directions
      </Button>
    </Link>
          </div>
        }
      />

      {/* Page Title */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <PageTitle className="text-center text-anchor-green" seo={{ structured: true, speakable: true }}>
            Pub Near Heathrow Terminal 5 - The Anchor
          </PageTitle>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <FeatureGrid
            columns={4}
            features={[
              {
                icon: "🚗",
                title: "7 mins",
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
                icon: "✈️",
                title: "BA Hub",
                description: "Terminal 5"
              }
            ]}
            className="max-w-4xl mx-auto"
          />
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
            <SectionHeader
              title="How to Get Here from Terminal 5"
              align="center"
            />
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
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
                    <p className="font-semibold mb-2">Cost: £20-£25</p>
                    <p className="text-sm text-gray-600 mb-2">Journey time: 4-7 minutes (2.8 miles)</p>
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

              {/* By Bus */}
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚌 By Bus</h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Route 442</p>
                    <p className="text-sm mb-2">Staines - Stanwell Moor - Heathrow</p>
                    <p className="text-sm">Runs every 20 minutes</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Journey Time: 4-6 minutes</p>
                    <p className="text-sm">Ask driver for "The Anchor" stop</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-semibold text-anchor-green mb-1">Bus Stop Location:</p>
                    <p className="text-sm">Central Bus Station, Terminal 5</p>
                    <p className="text-sm text-gray-600">Ground floor, follow signs</p>
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
              <DirectionsButton
                href="https://maps.google.com/maps?saddr=Heathrow+Terminal+5&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ"
                source="terminal_5_directions"
                variant="primary"
                size="lg"
                fromLocation="Heathrow Terminal 5"
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
              title="Why Terminal 5 Travelers Choose The Anchor"
              align="center"
            />
            
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "Perfect for BA Travelers",
                  icon: "✈️",
                  content: "Terminal 5 is British Airways' exclusive hub. Whether you're flying Club World or Euro Traveller, enjoy a proper British welcome just minutes away."
                },
                {
                  title: "Beat the Airport Prices",
                  icon: "⏰",
                  content: "Why pay £15 for a sandwich at T5? Enjoy a full meal with us for the same price. Plus a pint costs half what you'd pay airside!"
                },
                {
                  title: "Free Parking Advantage",
                  icon: "🅿️",
                  content: "Meeting someone? Save on T5's expensive short-stay parking. Park free with us and track their flight on our WiFi."
                },
                {
                  title: "Pre-Flight Dining",
                  icon: "🍽️",
                  content: "Start your holiday right. Relax in our beer garden, enjoy a proper meal, then head to T5 refreshed and ready - not rushed and hungry."
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
              title="Live Terminal 5 Flight Information"
              subtitle="Check flight times while you enjoy your meal or drink"
              align="center"
            />
            <FlightStatus terminal="5" type="both" limit={5} />
          </div>
        </div>
      </section>

      {/* Terminal 5 Specific Info */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Terminal 5 Travel Tips"
              align="center"
            />
            
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

            <AlertBox
              variant="tip"
              title="Local Knowledge"
              content={
                <ul className="space-y-3">
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
                    <span>Our Sunday roast is famous among T5 staff - £5 deposit pre-order required by Saturday 1pm!</span>
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
              title="Staying at a Terminal 5 Hotel?"
              subtitle="Escape the hotel restaurant for an authentic British pub experience"
              align="center"
            />
            
            <div className="mb-12">
              <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto">
                If you're staying at the Sofitel, Hilton Garden Inn, or any T5 hotel, 
                The Anchor offers the perfect escape from generic hotel dining. 
                Experience a real British family pub where locals have gathered for over 250 years.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">
                  🏨 Sofitel Terminal 5 Guests
                </h3>
                <p className="text-gray-700 mb-4">
                  Just 8 minutes from your luxury hotel, The Anchor offers a genuine
                  alternative to hotel dining with traditional British pub fare.
                </p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex gap-2">
                    <span className="text-anchor-gold">✓</span>
                    <span>Half the price of hotel dining</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-anchor-gold">✓</span>
                    <span>Authentic British atmosphere</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-anchor-gold">✓</span>
                    <span>Meet real locals, not just travelers</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-anchor-gold">✓</span>
                    <span>Traditional ales & home-cooked food</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">
                  🏨 Hilton T5 Guests
                </h3>
                <p className="text-gray-700 mb-4">
                  Why settle for another chain restaurant meal? Your Hilton is just 
                  7 minutes from genuine British hospitality.
                </p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex gap-2">
                    <span className="text-anchor-gold">✓</span>
                    <span>Real cask ales, not just lagers</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-anchor-gold">✓</span>
                    <span>Stone-baked pizzas from £12</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-anchor-gold">✓</span>
                    <span>Sunday roasts that locals queue for (£5 deposit pre-order)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-anchor-gold">✓</span>
                    <span>Garden terrace for sunny days</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 italic">
                  Perfect for business travelers looking for local atmosphere
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">
                🚕 Getting Here from Your Hotel
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="font-semibold mb-2">By Taxi</p>
                  <p className="text-3xl font-bold text-anchor-gold mb-2">£12-15</p>
                  <p className="text-sm text-gray-600">5-8 minutes</p>
                  <p className="text-sm text-gray-600 mt-2">Ask for "The Anchor, Stanwell Moor"</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-2">By Uber</p>
                  <p className="text-3xl font-bold text-anchor-gold mb-2">£10-13</p>
                  <p className="text-sm text-gray-600">5-8 minutes</p>
                  <p className="text-sm text-gray-600 mt-2">Postcode: TW19 6AQ</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-2">Walking</p>
                  <p className="text-3xl font-bold text-anchor-gold mb-2">25-30 min</p>
                  <p className="text-sm text-gray-600">Pleasant route</p>
                  <p className="text-sm text-gray-600 mt-2">Via Stanwell Moor Road</p>
                </div>
              </div>
            </div>

            <div className="bg-anchor-green text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Experience Real British Pub Culture
              </h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                The Anchor has been serving locals and travelers for over 250 years. 
                Step away from the international hotel scene and discover authentic 
                British hospitality, traditional ales, and home-cooked food in a 
                genuine village pub atmosphere.
              </p>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-700 mb-6">
                Join the savvy travelers who've discovered there's more to Heathrow 
                dining than airport chains and hotel restaurants.
              </p>
              <BookTableButton
                source="terminal_5_hotel_reserve"
                context="heathrow_terminal_5_hotels"
                variant="primary"
                size="lg"
              >
                📅 Reserve Your Table Online
              </BookTableButton>
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
            answer: "Yes, taxis are readily available from Terminal 5. The journey costs £20-£25 and takes about 4-7 minutes. Tell your driver 'The Anchor pub, Horton Road, Stanwell Moor, TW19 6AQ'. Alternatively, take bus route 442 which stops directly outside the pub - it runs every 20 minutes and costs about what a pint should cost."
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
          },
          {
            question: "Do you welcome guests from nearby hotels?",
            answer: "Absolutely! We're popular with guests from the Sofitel, Hilton, and other Terminal 5 hotels. Many hotel guests visit us to experience authentic British pub culture and enjoy traditional food at more reasonable prices than hotel restaurants."
          },
          {
            question: "How do I get to The Anchor from my Terminal 5 hotel?",
            answer: "From Sofitel or Hilton T5, it's just £12-15 by taxi (5-8 minutes). Tell the driver 'The Anchor pub, Stanwell Moor'. Uber costs about £10-13. For the adventurous, it's a pleasant 25-30 minute walk via Stanwell Moor Road."
          },
          {
            question: "Why should I leave my hotel to eat at The Anchor?",
            answer: "Hotel restaurants serve the same international menu worldwide. At The Anchor, you'll experience genuine British hospitality, meet locals, enjoy traditional ales, and pay half what you'd spend at your hotel. This is the authentic Britain you came to see!"
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <CTASection
        title="See You Soon at The Anchor!"
        description="Just 7 minutes from Terminal 5 • Free Parking • Great British Food"
        variant="green"
        buttons={[
          {
            text: "📞 01753 682707",
            href: "tel:01753682707",
            isPhone: true,
            phoneSource: "terminal_5_cta_section",
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
            }
          ])
        }}
      />
    </>
  )
}