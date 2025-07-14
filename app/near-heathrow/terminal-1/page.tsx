import Image from 'next/image'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { BusinessHours } from '@/components/BusinessHours'
import { Metadata } from 'next'
import { CONTACT, BRAND, PARKING, HEATHROW_TIMES } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Pub Near Heathrow Terminal 1 | ${BRAND.name} - ${HEATHROW_TIMES.terminal1} Minutes Away`,
  description: `${BRAND.name} is the closest traditional British pub to Heathrow Terminal 1, just ${HEATHROW_TIMES.terminal1} minutes drive. Perfect for pre-flight meals or airport staff. Free parking.`,
  keywords: 'pub near heathrow terminal 1, heathrow t1 pub, restaurants near terminal 1, bars near heathrow terminal 1, heathrow terminal 1 food',
  openGraph: {
    title: `${BRAND.name} - Closest Pub to Heathrow Terminal 1`,
    description: `Just ${HEATHROW_TIMES.terminal1} minutes from T1. Traditional British pub with parking.`,
    images: ['/images/near-heathrow/the-anchor-pub-heathrow-terminal-1.jpg'],
  },
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": `How far is ${BRAND.name} from Heathrow Terminal 1?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${BRAND.name} is just ${HEATHROW_TIMES.terminal1} minutes drive from Heathrow Terminal 1. We're the perfect spot for a pre-flight meal or drinks after landing.`
      }
    },
    {
      "@type": "Question",
      "name": "Do you have parking for Terminal 1 travelers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes! We offer ${PARKING.description} with space for ${PARKING.capacity} cars. Much more affordable than airport parking for short stays.`
      }
    },
    {
      "@type": "Question",
      "name": "What time should I leave for Terminal 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Allow ${HEATHROW_TIMES.terminal1} minutes to reach Terminal 1 from our pub, plus time for parking and security. We recommend leaving at least 2 hours before your flight.`
      }
    }
  ]
}

export default function Terminal1Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, faqSchema]) }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center mt-20">
        <Image
          src="/images/the-anchor-beer-garden-heathrow.jpg"
          alt={`${BRAND.name} - closest pub to Heathrow Terminal 1`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-full px-6 py-3 mb-8">
              <span className="text-white font-semibold">✈️ Terminal 1</span>
              <span className="text-white/60">•</span>
              <span className="text-white font-bold">{HEATHROW_TIMES.terminal1} minutes away</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Closest Pub to<br/>Heathrow Terminal 1
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              The perfect pre-flight dining spot or post-landing refreshment stop for T1 travelers
            </p>
            
            <StatusBar />
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CallToAction href={CONTACT.phoneHref} variant="primary" size="lg">
                📞 Book a Table
              </CallToAction>
              <CallToAction 
                href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor" 
                variant="secondary" 
                size="lg"
              >
                📍 Get Directions
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

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
              <p className="text-3xl font-bold">4am</p>
              <p className="text-sm uppercase tracking-wide">Early Opens*</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Terminal 1 */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-4">
              Why Terminal 1 Travelers Choose {BRAND.name}
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
              Whether you're catching an early flight or meeting arrivals, we're your perfect Terminal 1 companion
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-anchor-cream/50 rounded-xl p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Early Morning Opens</h3>
                <p className="text-gray-700">
                  Special early opening available for groups catching morning flights from Terminal 1. 
                  Call to arrange breakfast from 4am.
                </p>
              </div>
              
              <div className="bg-anchor-cream/50 rounded-xl p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🚗</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Cheaper Than Airport Parking</h3>
                <p className="text-gray-700">
                  Meeting someone at T1? Park with us for free instead of paying expensive airport rates. 
                  Just {HEATHROW_TIMES.terminal1} minutes to arrivals.
                </p>
              </div>
              
              <div className="bg-anchor-cream/50 rounded-xl p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Better Than Airport Food</h3>
                <p className="text-gray-700">
                  Enjoy proper British pub food at pub prices. Full menu available all day, 
                  much better value than Terminal 1 restaurants.
                </p>
              </div>
              
              <div className="bg-anchor-cream/50 rounded-xl p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">👨‍✈️</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Airport Staff Welcome</h3>
                <p className="text-gray-700">
                  Popular with Terminal 1 staff. Show your airport ID for special offers 
                  on food and drinks throughout the week.
                </p>
              </div>
              
              <div className="bg-anchor-cream/50 rounded-xl p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🧳</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Luggage Friendly</h3>
                <p className="text-gray-700">
                  Plenty of space for bags and cases. Perfect for that last meal before 
                  heading to Terminal 1 check-in.
                </p>
              </div>
              
              <div className="bg-anchor-cream/50 rounded-xl p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Flight Tracking</h3>
                <p className="text-gray-700">
                  Free WiFi to check your Terminal 1 flight status. Our staff can help 
                  you track arrivals if you're meeting someone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route to Terminal 1 */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-12">
              Quick Route to Terminal 1
            </h2>
            
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
                  <li>• Typical fare: £15-20</li>
                  <li>• Journey time: {HEATHROW_TIMES.terminal1} minutes</li>
                  <li>• We can call a taxi for you</li>
                  <li>• Pre-book for early morning flights</li>
                </ul>
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Tip:</strong> Book your return taxi when you land - 
                    many drivers know {BRAND.name} as the Terminal 1 meeting point!
                  </p>
                </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              Perfect for Terminal 1 Occasions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
                <h3 className="font-bold text-lg text-anchor-green mb-2">✈️ Pre-Flight Meals</h3>
                <p className="text-gray-700">
                  Better than airport prices with proper portions. Full English breakfast 
                  from 4am for early Terminal 1 departures (pre-book required).
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

      {/* Opening Hours */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-8">
              Opening Hours
            </h2>
            <BusinessHours />
            <div className="mt-6 bg-amber-100 border-2 border-amber-300 rounded-lg p-4 text-center">
              <p className="text-amber-900 font-semibold">
                ⏰ Early opens from 4am available for Terminal 1 flights - call to arrange
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Terminal 1's Favourite Local Pub
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Just {HEATHROW_TIMES.terminal1} minutes away • Free parking • Open from 4am for flights
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CallToAction href={CONTACT.phoneHref} variant="secondary" size="lg">
              📞 Call {CONTACT.phone}
            </CallToAction>
            <CallToAction 
              href="/food-menu" 
              variant="outline" 
              size="lg"
              className="!text-white !border-white hover:!bg-white hover:!text-red-600"
            >
              View Pre-Flight Menu
            </CallToAction>
          </div>
          
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Quick Terminal 1 Info</h3>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="font-semibold">Airlines at T1:</p>
                <p className="text-white/80">Check with airline for latest terminal info</p>
              </div>
              <div>
                <p className="font-semibold">Our Address:</p>
                <p className="text-white/80">{CONTACT.address.street}, {CONTACT.address.postcode}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}