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
import { CTASection, Container } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { BookTableButton } from '@/components/BookTableButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { DEFAULT_NEAR_HEATHROW_IMAGE } from '@/lib/image-fallbacks'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { InternalLinkingSection } from '@/components/seo/InternalLinkingSection'

export const metadata: Metadata = {
  title: 'Pub Near Heathrow Terminal 5 - 7 Minute Drive | The Anchor',
  description: 'Visit The Anchor, the closest traditional pub to Heathrow Terminal 5. 7 minute taxi, free parking, proper British food and drinks for Sofitel and Hilton guests.',
  keywords: 'pub near heathrow terminal 5, closest pub to t5, hilton terminal 5 restaurant alternative, sofitel t5 pub, british airways crew pub, taxi from terminal 5 to pub',
  openGraph: {
    title: 'Pub Near Heathrow Terminal 5 - Free Parking & 7 Minute Taxi',
    description: 'The Anchor is the nearest village pub to Heathrow Terminal 5 with free parking, great food and British hospitality.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE],
  },
  twitter: getTwitterMetadata({
    title: 'Pub Near Heathrow Terminal 5 - Free Parking & 7 Minute Taxi',
    description: 'The Anchor is the nearest village pub to Heathrow Terminal 5 with free parking, great food and British hospitality.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE]
  })
}

export default function Terminal5Page() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Near Heathrow', url: '/near-heathrow' },
    { name: 'Terminal 5', url: '/near-heathrow/terminal-5' }
  ])

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

      {/* Quick Summary */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-anchor-cream/40 border border-anchor-cream rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-anchor-green mb-3">Essential Details at a Glance</h2>
            <p className="text-gray-700 mb-4">
              The Anchor is the closest independent pub to Terminal 5. Swap hotel bars for real British hospitality, fair pint prices and free parking.
            </p>
            <div className="grid gap-3 md:grid-cols-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-anchor-gold">⏱️</span>
                <span>7 minute taxi or Uber (£20-25 fixed fare) from BA arrivals</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-anchor-gold">🅿️</span>
                <span>Free on-site parking for pick-ups, drop-offs and diners</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-anchor-gold">🍽️</span>
                <span>Kitchen open Tue-Sun with pizza, burgers and Sunday roasts</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-anchor-gold">📞</span>
                <span>Call 01753 682707 or book online to secure tables for peak flights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <CTASection
            title="Plan a 90-Minute Layover Meal"
            description="Follow our new Heathrow layover dining guide for timed itineraries, taxi tips, and menu ideas between flights."
            buttons={[
              {
                text: "View Layover Guide",
                href: "/heathrow-layover-dining",
                variant: "white",
                size: "lg"
              },
              {
                text: "WhatsApp for Fast Booking",
                href: "https://wa.me/441753682707?text=Hi%20Anchor%20Team!%20Can%20you%20help%20plan%20a%20Heathrow%20layover%20meal%3F",
                variant: "outline",
                size: "lg"
              }
            ]}
          />
        </div>
      </section>

      {/* Food Before You Fly */}
      <section className="section-spacing bg-anchor-cream/40">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Need Food Near Terminal 5?"
            subtitle="Book ahead so your meal is ready when you arrive — no airport prices, no queues."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-anchor-green mb-2">Sunday Roast (Sun 12–5pm)</h3>
              <p className="text-sm text-gray-700 mb-4">
                Pre-order by 1pm Saturday and enjoy Yorkshire puddings, crispy potatoes and homemade gravy before your flight.
              </p>
              <div className="flex flex-col gap-2">
                <BookTableButton
                  source="terminal5_roast_cta"
                  variant="primary"
                  size="sm"
                >
                  Book Roast Table
                </BookTableButton>
                <Link href="/sunday-lunch" className="text-sm text-anchor-gold font-semibold hover:text-anchor-green transition">
                  Sunday roast menu →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-anchor-green mb-2">Pizza Tuesday (6–9pm)</h3>
              <p className="text-sm text-gray-700 mb-4">
                Buy one get one free on all stone-baked pizzas — perfect for crew nights, family send-offs or late layovers.
              </p>
              <div className="flex flex-col gap-2">
                <BookTableButton
                  source="terminal5_pizza_cta"
                  context="pizza_tuesday"
                  variant="primary"
                  size="sm"
                >
                  Reserve Pizza Tuesday
                </BookTableButton>
                <Link href="/pizza-tuesday" className="text-sm text-anchor-gold font-semibold hover:text-anchor-green transition">
                  Pizza Tuesday details →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-anchor-green mb-2">All-Day Menu</h3>
              <p className="text-sm text-gray-700 mb-4">
                Burgers, fish & chips, veggie options and sharers served fast — great for BA crews and Sofitel/Hilton guests.
              </p>
              <div className="flex flex-col gap-2">
                <BookTableButton
                  source="terminal5_food_cta"
                  variant="primary"
                  size="sm"
                >
                  Book a Table
                </BookTableButton>
                <Link href="/food-menu" className="text-sm text-anchor-gold font-semibold hover:text-anchor-green transition">
                  Browse full menu →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Title */}
      <section className="section-spacing bg-white">
        <Container>
          <PageTitle className="text-center text-anchor-green" seo={{ structured: true, speakable: true }}>
            Pub Near Heathrow Terminal 5 - The Anchor
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
              <div className="bg-amber-50 rounded-2xl p-8 border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚕 By Taxi/Uber</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-lg text-green-700 mb-1">£20-25 fixed fare</p>
                    <p className="text-sm text-gray-600">7 minutes • 2.8 miles</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Tell your driver:</p>
                    <p className="italic">&quot;The Anchor pub, Horton Road, Stanwell Moor, TW19 6AQ&quot;</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Pick-up Points:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Arrivals:</strong> Exit, turn left, taxi rank outside</li>
                      <li>• <strong>Departures:</strong> Level 1, follow taxi signs</li>
                      <li>• <strong>Uber:</strong> Short Stay Car Park Level 4</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800 mb-1">💡 Return Taxi Service</p>
                    <p className="text-sm">We'll call you a cab back to T5 - just ask!</p>
                  </div>
                </div>
              </div>

              {/* By Bus */}
              <div className="bg-sky-50 rounded-2xl p-8 border-2 border-sky-200">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚌 By Bus (Budget Option)</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-lg text-green-700 mb-1">£2.50 single fare</p>
                    <p className="text-sm text-gray-600">15-20 minutes journey</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Routes to The Anchor:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="bg-white p-2 rounded">
                        <strong>442:</strong> T5 → Stanwell Moor (every 20 mins)
                      </li>
                      <li className="bg-white p-2 rounded">
                        <strong>441:</strong> T5 → Staines via Stanwell (hourly)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Where to Catch Bus:</p>
                    <p className="text-sm">Central Bus Station (Ground Floor)</p>
                    <p className="text-sm">Follow signs from Arrivals</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="font-semibold text-yellow-800 mb-1">⚠️ Important</p>
                    <p className="text-sm">Tell driver: "The Anchor pub stop"</p>
                    <p className="text-sm">Last bus: 11:30pm Mon-Sat, 10:30pm Sun</p>
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
              subtitle="British Airways crews and Sofitel/Hilton guests love our authentic pub"
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
                  icon: "💰",
                  content: "T5 sandwich: £15. Our full meal: £12.95. T5 pint: £8. Our pint: £4.50. Save 50% on dining!"
                },
                {
                  title: "FREE Parking vs T5 Charges",
                  icon: "🅿️",
                  content: "T5 Short Stay: £7.50/hour. T5 Long Stay: £25/day. The Anchor: FREE! Perfect for picking up/dropping off."
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

            <div className="bg-gradient-to-r from-sky-50 to-amber-50 rounded-2xl p-8 mb-8 border-2 border-anchor-gold">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">📍 Terminal 5 Insider Tips</h3>
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
                    <span>Our Sunday roast is famous among T5 staff - Sunday roasts require pre-order with £5 per person deposit by 1pm Saturday!</span>
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
                    <span>Sunday roasts that locals queue for - Sunday roasts require pre-order with £5 per person deposit by 1pm Saturday</span>
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

      <InternalLinkingSection
        title="Plan The Rest Of Your Visit"
        links={[
          { href: '/food-menu', title: 'Food Menu', description: 'Pizza Tuesdays, burgers and Sunday roast pre-orders' },
          { href: '/drinks', title: 'Drinks Menu', description: 'Real ales, cocktails and value pub prices near Heathrow' },
          { href: '/book-event', title: 'Book an Event', description: 'Reserve private space for crew briefings or celebrations' },
          { href: '/near-heathrow/terminal-3', title: 'Terminal 3 Guide', description: 'Directions and tips for Virgin and Emirates flights' }
        ]}
        className="section-spacing-md"
      />

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
            answer: "Yes, taxis are readily available from Terminal 5. The journey costs £20-£25 and takes about 4-7 minutes. Tell your driver 'The Anchor, Horton Road, Stanwell Moor, TW19 6AQ'. Alternatively, take bus route 442 which stops directly outside the pub - it runs every 20 minutes and costs about what a pint should cost."
          },
          {
            question: "What time should I leave The Anchor to catch my flight from T5?",
            answer: "Allow 7 minutes to drive from The Anchor to Terminal 5, plus parking time if needed. For short-haul flights, leave 2.5 hours before departure. For long-haul, leave 3.5 hours before."
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
            answer: "From Sofitel or Hilton T5, it's just £12-15 by taxi (5-8 minutes). Tell the driver 'The Anchor, Stanwell Moor'. Uber costs about £10-13. For the adventurous, it's a pleasant 25-30 minute walk via Stanwell Moor Road."
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
            href: "tel:+441753682707",
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
            breadcrumbSchema,
            {
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "The Anchor - Pub Near Heathrow Terminal 5",
              "description": "The closest pub to Heathrow Terminal 5 - just 7 minutes drive with free parking.",
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
              "url": "https://www.the-anchor.pub/near-heathrow/terminal-5",
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
              "description": "Easy directions from Terminal 5 to The Anchor - just 7 minutes by car",
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
              "@type": "TravelAction",
              "name": "Travel from Heathrow Terminal 5 to The Anchor",
              "agent": {
                "@type": "Person",
                "name": "Heathrow Traveler"
              },
              "fromLocation": {
                "@type": "Airport",
                "name": "Heathrow Terminal 5",
                "address": "London Heathrow Airport, TW6 2GA"
              },
              "toLocation": {
                "@type": "Restaurant",
                "name": "The Anchor",
                "address": "Horton Road, Stanwell Moor, TW19 6AQ"
              },
              "distance": "2.8 miles",
              "instrument": [
                {
                  "@type": "Vehicle",
                  "name": "Car",
                  "description": "7 minutes drive, FREE parking available"
                },
                {
                  "@type": "Vehicle", 
                  "name": "Taxi",
                  "description": "£20-25 fixed fare, 7 minutes"
                },
                {
                  "@type": "Vehicle",
                  "name": "Bus",
                  "description": "Route 442/441, £2.50 single, 15-20 minutes"
                }
              ]
            }
          ])
        }}
      />
    </>
  )
}
