import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { BusinessHours } from '@/components/BusinessHours'
import { HeroWrapper, Breadcrumbs } from '@/components/hero'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { CONTACT, BRAND, PARKING, HEATHROW_TIMES } from '@/lib/constants'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'

export const metadata: Metadata = {
  title: `Pub Near Heathrow Terminal 1 Hotels | ${BRAND.name} - Local British Pub`,
  description: `Escape Terminal 1 hotel dining for authentic British pub experience. ${BRAND.name} offers local atmosphere, traditional food & ales just ${HEATHROW_TIMES.terminal1} mins from T1 hotels.`,
  keywords: 'pub near heathrow terminal 1, heathrow t1 pub, restaurants near terminal 1, bars near heathrow terminal 1, heathrow terminal 1 food, local pub near terminal 1 hotels',
  openGraph: {
    title: `${BRAND.name} - Local Pub Near Terminal 1 Hotels`,
    description: `Escape hotel dining! Family pub ${HEATHROW_TIMES.terminal1} mins from T1. Real atmosphere.`,
    images: ['/images/near-heathrow/the-anchor-pub-heathrow-terminal-1.jpg'],
  },
  twitter: getTwitterMetadata({
    title: `${BRAND.name} - Local Pub Near Terminal 1 Hotels`,
    description: `Escape hotel dining! Family pub ${HEATHROW_TIMES.terminal1} mins from T1. Real atmosphere.`,
    images: ['/images/near-heathrow/the-anchor-pub-heathrow-terminal-1.jpg']
  })
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  "@id": "https://the-anchor.pub/near-heathrow/terminal-1#business",
  "name": `${BRAND.name} - Near Heathrow Terminal 1`,
  "description": `Traditional British pub ${HEATHROW_TIMES.terminal1} minutes from Heathrow Terminal 1`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": CONTACT.address.street,
    "addressLocality": CONTACT.address.town,
    "addressRegion": CONTACT.address.county,
    "postalCode": CONTACT.address.postcode,
    "addressCountry": CONTACT.address.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": CONTACT.coordinates.lat,
    "longitude": CONTACT.coordinates.lng
  },
  "nearbyLocation": {
    "@type": "Airport",
    "name": "London Heathrow Airport Terminal 1",
    "iataCode": "LHR"
  },
  "priceRange": "££",
  "servesCuisine": ["British", "Pizza", "Sunday Roast"],
  "hasMenu": "https://the-anchor.pub/food-menu",
  "telephone": CONTACT.phoneIntl,
  "url": "https://the-anchor.pub"
}


export default function Terminal1Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema]) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/near-heathrow/terminal-1"
        title="Closest Pub to Heathrow Terminal 1"
        description="The perfect pre-flight dining spot or post-landing refreshment stop for T1 travelers"
        size="large"
        showStatusBar={true}
        breadcrumbs={[
          { name: 'Near Heathrow', href: '/near-heathrow' },
          { name: 'Terminal 1' }
        ]}
        tags={[
          { label: `✈️ Terminal 1 • ${HEATHROW_TIMES.terminal1} minutes away`, variant: "primary" }
        ]}
        cta={
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={CONTACT.phoneHref}>
              <Button variant="primary" size="lg">📞 Book a Table</Button>
            </Link>
            <Link href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                📍 Get Directions
              </Button>
            </Link>
          </div>
        }
      />

      {/* Quick Journey Info */}
      <section className="py-8 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">{HEATHROW_TIMES.terminal1}</p>
              <p className="text-sm uppercase tracking-wide">Minutes to T1</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30" />
            <div>
              <p className="text-3xl font-bold">Free</p>
              <p className="text-sm uppercase tracking-wide">Parking</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30" />
            <div>
              <p className="text-3xl font-bold">Free</p>
              <p className="text-sm uppercase tracking-wide">WiFi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Terminal 1 */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title={`Why Terminal 1 Travelers Choose ${BRAND.name}`}
              subtitle="Whether you're catching an early flight or meeting arrivals, we're your perfect Terminal 1 companion"
            />
            
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "⏰",
                  title: "Convenient Hours",
                  description: "Open from midday at weekends and 4pm on weekdays. Perfect timing for pre-flight meals or meeting arrivals.",
                  variant: "colored",
                  color: "bg-anchor-cream/50",
                  className: "rounded-xl p-6"
                },
                {
                  icon: "🚗",
                  title: "Cheaper Than Airport Parking",
                  description: `Meeting someone at T1? Park with us for free instead of paying expensive airport rates. Just ${HEATHROW_TIMES.terminal1} minutes to arrivals.`,
                  variant: "colored",
                  color: "bg-anchor-cream/50",
                  className: "rounded-xl p-6"
                },
                {
                  icon: "🍽️",
                  title: "Better Than Airport Food",
                  description: "Enjoy proper British pub food at pub prices. Full menu available during kitchen hours, much better value than Terminal 1 restaurants.",
                  variant: "colored",
                  color: "bg-anchor-cream/50",
                  className: "rounded-xl p-6"
                },
                {
                  icon: "👨‍✈️",
                  title: "Airport Staff Welcome",
                  description: "Popular with Terminal 1 staff. Show your airport ID for special offers on food and drinks throughout the week.",
                  variant: "colored",
                  color: "bg-anchor-cream/50",
                  className: "rounded-xl p-6"
                },
                {
                  icon: "🧳",
                  title: "Luggage Friendly",
                  description: "Plenty of space for bags and cases. Perfect for that last meal before heading to Terminal 1 check-in.",
                  variant: "colored",
                  color: "bg-anchor-cream/50",
                  className: "rounded-xl p-6"
                },
                {
                  icon: "📱",
                  title: "Flight Tracking",
                  description: "Free WiFi to check your Terminal 1 flight status. Our staff can help you track arrivals if you're meeting someone.",
                  variant: "colored",
                  color: "bg-anchor-cream/50",
                  className: "rounded-xl p-6"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Route to Terminal 1 */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Quick Route to Terminal 1"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-anchor-green mb-4">🚗 Driving to Terminal 1</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">1.</span>
                    <span>Exit our car park and turn left onto Horton Road</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">2.</span>
                    <span>Follow signs for Heathrow Airport via A3044</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">3.</span>
                    <span>Join the A30 and follow Terminal 1 signs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">4.</span>
                    <span>Take Central Terminal Area exit for T1 drop-off</span>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">Journey time: {HEATHROW_TIMES.terminal1} minutes</p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-anchor-green mb-4">🚖 Taxi to Terminal 1</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Typical fare: Around £25</li>
                  <li>• Journey time: {HEATHROW_TIMES.terminal1} minutes</li>
                  <li>• We can call a taxi for you</li>
                  <li>• Pre-book for early morning flights</li>
                </ul>
                <AlertBox
                  variant="info"
                  title="Tip"
                  className="mt-6"
                  content={
                    <p className="text-sm">
                      Book your return taxi when you land - many drivers know {BRAND.name} as the Terminal 1 meeting point!
                    </p>
                  }
                />
              </div>
            </div>
            
            {/* Distance to other terminals */}
            <div className="bg-anchor-green text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-center">Distance to All Heathrow Terminals</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-lg">T1</p>
                  <p className="text-sm">{HEATHROW_TIMES.terminal1} mins</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-lg">T2</p>
                  <p className="text-sm">{HEATHROW_TIMES.terminal2} mins</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-lg">T3</p>
                  <p className="text-sm">{HEATHROW_TIMES.terminal3} mins</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-lg">T4</p>
                  <p className="text-sm">{HEATHROW_TIMES.terminal4} mins</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-bold text-lg">T5</p>
                  <p className="text-sm">{HEATHROW_TIMES.terminal5} mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect for Terminal 1 */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Perfect for Terminal 1 Occasions"
            />
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
                <h3 className="font-bold text-lg text-anchor-green mb-2">✈️ Pre-Flight Meals</h3>
                <p className="text-gray-700">
                  Better than airport prices with proper portions. 
                  Food available during kitchen hours for Terminal 1 departures.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
                <h3 className="font-bold text-lg text-anchor-green mb-2">🛬 Welcome Home Drinks</h3>
                <p className="text-gray-700">
                  Just landed at T1? Decompress with a proper pint and home-cooked meal 
                  before heading home. Much nicer than airport lounges!
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
                <h3 className="font-bold text-lg text-anchor-green mb-2">👋 Farewell Gatherings</h3>
                <p className="text-gray-700">
                  Say goodbye properly before Terminal 1 departures. Private area available 
                  for larger groups. We'll time everything for your flight.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
                <h3 className="font-bold text-lg text-anchor-green mb-2">🚗 Park & Meet Service</h3>
                <p className="text-gray-700">
                  Meeting arrivals at T1? Park free with us, enjoy a coffee, then collect 
                  them. Save on expensive Terminal 1 parking charges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Guest Section */}
      <section className="section-spacing bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Staying Near Terminal 1?"
              subtitle="Escape your hotel for a genuine British pub experience"
              align="center"
            />
            
            <div className="mb-12">
              <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto">
                If you're staying at one of the Terminal 1 hotels, The Anchor offers 
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
                🚕 Getting Here from Terminal 1 Hotels
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-semibold mb-2">By Taxi</p>
                  <p className="text-3xl font-bold text-anchor-gold mb-2">£15-18</p>
                  <p className="text-sm text-gray-600">10 minutes</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">By Uber</p>
                  <p className="text-3xl font-bold text-anchor-gold mb-2">£13-16</p>
                  <p className="text-sm text-gray-600">10 minutes</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">By Bus</p>
                  <p className="text-3xl font-bold text-anchor-gold mb-2">£2.50</p>
                  <p className="text-sm text-gray-600">Take 442 bus</p>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Tell your driver: "The Anchor pub, Horton Road, Stanwell Moor"
              </p>
            </div>

            <div className="bg-anchor-green text-white rounded-2xl p-8 text-center">
              <p className="text-lg mb-4 max-w-2xl mx-auto">
                Take a break from the hustle and bustle of airport life. 
                The Anchor offers a peaceful village pub atmosphere where you can 
                relax, enjoy great food, and experience genuine British hospitality.
              </p>
              <Link href="tel:01753682707">
                <Button variant="secondary" size="lg" className="bg-white text-anchor-green hover:bg-gray-100">
                  📞 Book Your Table: 01753 682707
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title="Opening Hours"
            />
            <BusinessHours />
            <AlertBox
              variant="info"
              content={
                <p className="font-semibold text-center">
                  ⏰ Open from midday weekends, 4pm weekdays - perfect for Terminal 1 travelers
                </p>
              }
              className="mt-6"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: `How far is ${BRAND.name} from Heathrow Terminal 1?`,
            answer: `${BRAND.name} is just ${HEATHROW_TIMES.terminal1} minutes drive from Heathrow Terminal 1. We're the perfect spot for a pre-flight meal or drinks after landing.`
          },
          {
            question: "Do you have parking for Terminal 1 travelers?",
            answer: `Yes! We offer ${PARKING.description} with space for ${PARKING.capacity} cars. Much more affordable than airport parking for short stays.`
          },
          {
            question: "What time should I leave for Terminal 1?",
            answer: `Allow ${HEATHROW_TIMES.terminal1} minutes to reach Terminal 1 from our pub, plus time for parking and security. We recommend leaving at least 2 hours before your flight.`
          },
          {
            question: "Is The Anchor good for Terminal 1 hotel guests?",
            answer: "Absolutely! Many guests from Terminal 1 hotels visit us for a break from hotel dining. We offer a genuine British family pub atmosphere with local residents, traditional ales, and home-cooked food at pub prices."
          },
          {
            question: "How do I get to The Anchor from my Terminal 1 hotel?",
            answer: "It's about £15-18 by taxi (10 minutes) or £13-16 by Uber. The 442 bus also stops near us for just £2.50. Tell your driver 'The Anchor pub, Horton Road, Stanwell Moor' or use postcode TW19 6AQ."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <CTASection
        title="Terminal 1's Favourite Local Pub"
        description={`Just ${HEATHROW_TIMES.terminal1} minutes away • Free parking • Convenient opening hours`}
        buttons={[
          {
            text: `📞 Call ${CONTACT.phone}`,
            href: CONTACT.phoneHref,
            variant: "secondary"
          },
          {
            text: "View Pre-Flight Menu",
            href: "/food-menu",
            variant: "white"
          }
        ]}
        variant="red"
      >
        <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Quick Terminal 1 Info</h3>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="font-semibold">Airlines at T1:</p>
              <p className="text-white/80">Cheque with airline for latest terminal info</p>
            </div>
            <div>
              <p className="font-semibold">Our Address:</p>
              <p className="text-white/80">{CONTACT.address.street}, {CONTACT.address.postcode}</p>
            </div>
          </div>
        </div>
      </CTASection>
    </>
  )
}