import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pub Near Heathrow Airport | The Anchor Stanwell Moor | 7 Minutes from All Terminals',
  description: 'The closest traditional British pub to Heathrow Airport. Just 7 minutes from Terminal 5, 10 minutes from T2/T3. Free parking, great food, and a warm welcome for travelers.',
  keywords: 'pub near heathrow, heathrow airport pub, pub near terminal 5, closest pub to heathrow, heathrow restaurant',
  openGraph: {
    title: 'The Anchor - Your Local Pub Near Heathrow Airport',
    description: 'Just 7 minutes from Heathrow Terminal 5. Perfect for pre-flight meals or meeting arriving passengers.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
}

export default function NearHeathrowPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/garden/beer-garden/the-anchor-beer-garden-heathrow-flight-path.jpg"
            alt="The Anchor pub beer garden with planes overhead - closest pub to Heathrow"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-anchor-green/70 via-anchor-green/50 to-anchor-green/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              The Closest Pub to Heathrow Airport
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              Just 7 minutes from Terminal 5 • 10 minutes from Terminals 2 & 3
            </p>
            
            {/* Status Bar */}
            <div className="flex justify-center mb-8">
              <StatusBar 
                theme={{
                  background: 'bg-white/10 backdrop-blur-md',
                  border: 'border-2 border-white/20',
                  text: 'text-white',
                  accentText: 'text-white/60'
                }}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <span className="tag bg-white/90 backdrop-blur-sm">✈️ 7 mins from T5</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🚗 Free Parking</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍽️ Full Menu</span>
              <span className="tag bg-white/90 backdrop-blur-sm">⏰ Late Opening</span>
              <span className="tag bg-white/90 backdrop-blur-sm">📶 Free WiFi</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallToAction 
                href="tel:01753682707"
                variant="primary"
                size="lg"
              >
                📞 Book a Table: 01753 682707
              </CallToAction>
              
              <CallToAction 
                href="#terminals"
                variant="secondary"
                size="lg"
              >
                📍 Get Directions
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose The Anchor */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Why Travelers Love The Anchor
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Whether you&apos;re killing time before a flight, meeting arriving passengers, 
              or just landed and need a proper British welcome
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Free Parking</h3>
              <p className="text-gray-700">
                Over 50 free parking spaces. No stress, no fees, no time limits. 
                Perfect for meeting arriving passengers.
              </p>
            </div>

            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">🍺</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Proper British Pub</h3>
              <p className="text-gray-700">
                Traditional pub atmosphere with real ales, hearty food, and genuine 
                British hospitality. A taste of local life.
              </p>
            </div>

            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Flexible Hours</h3>
              <p className="text-gray-700">
                Open late Fridays & Saturdays. Kitchen hours designed around flight 
                times. Call ahead for early/late arrangements.
              </p>
            </div>

            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Business Friendly</h3>
              <p className="text-gray-700">
                Free WiFi, quiet corners for meetings, and proper coffee. 
                Popular with flight crews and business travelers.
              </p>
            </div>

            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">🎒</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Luggage Welcome</h3>
              <p className="text-gray-700">
                Plenty of space for bags and cases. No cramped city pub experience here - 
                we&apos;ve got room for travelers.
              </p>
            </div>

            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">All Welcome</h3>
              <p className="text-gray-700">
                International menu options alongside British classics. 
                Dietary requirements catered for. Everyone&apos;s local.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal-Specific Directions */}
      <section id="terminals" className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Directions from Each Terminal
            </h2>
            <p className="text-xl text-gray-700">
              We&apos;re the closest traditional pub to all Heathrow terminals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Terminal 2 */}
            <Link href="/near-heathrow/terminal-2" className="block group">
              <div className="card-warm bg-white p-6 h-full group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Terminal 2</h3>
                  <span className="text-anchor-gold font-semibold">10 mins</span>
                </div>
                <p className="text-gray-700 mb-4">The Queen&apos;s Terminal</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Via A3044 and A3113</li>
                  <li>• Follow signs to Staines/Stanwell</li>
                  <li>• Free parking available</li>
                </ul>
                <p className="text-anchor-gold font-semibold mt-4 group-hover:underline">
                  Get full directions →
                </p>
              </div>
            </Link>

            {/* Terminal 3 */}
            <Link href="/near-heathrow/terminal-3" className="block group">
              <div className="card-warm bg-white p-6 h-full group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Terminal 3</h3>
                  <span className="text-anchor-gold font-semibold">10 mins</span>
                </div>
                <p className="text-gray-700 mb-4">Virgin Atlantic & Emirates</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Via Tunnel Road</li>
                  <li>• Exit at Stanwell Moor</li>
                  <li>• Straight down Horton Road</li>
                </ul>
                <p className="text-anchor-gold font-semibold mt-4 group-hover:underline">
                  Get full directions →
                </p>
              </div>
            </Link>

            {/* Terminal 4 */}
            <Link href="/near-heathrow/terminal-4" className="block group">
              <div className="card-warm bg-white p-6 h-full group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Terminal 4</h3>
                  <span className="text-anchor-gold font-semibold">12 mins</span>
                </div>
                <p className="text-gray-700 mb-4">Alliance Hub</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Via Southern Perimeter Rd</li>
                  <li>• Through Cargo tunnel</li>
                  <li>• Exit Stanwell Moor</li>
                </ul>
                <p className="text-anchor-gold font-semibold mt-4 group-hover:underline">
                  Get full directions →
                </p>
              </div>
            </Link>

            {/* Terminal 5 */}
            <Link href="/near-heathrow/terminal-5" className="block group">
              <div className="card-warm bg-white p-6 h-full group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Terminal 5</h3>
                  <span className="text-anchor-gold font-semibold">7 mins</span>
                </div>
                <p className="text-gray-700 mb-4">British Airways Home</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Shortest route!</li>
                  <li>• Via A3044 direct</li>
                  <li>• We&apos;re the closest pub</li>
                </ul>
                <p className="text-anchor-gold font-semibold mt-4 group-hover:underline">
                  Get full directions →
                </p>
              </div>
            </Link>

            {/* General/Taxi */}
            <div className="card-warm bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-anchor-green">By Taxi</h3>
                <span className="text-anchor-gold font-semibold">£10-15</span>
              </div>
              <p className="text-gray-700 mb-4">All terminals</p>
              <p className="text-gray-600 text-sm mb-4">
                Tell your driver: &quot;The Anchor pub, Horton Road, Stanwell Moor&quot;
              </p>
              <p className="text-sm text-gray-700">
                Postcode: <strong className="text-gray-900">TW19 6AQ</strong>
              </p>
            </div>

            {/* Bus */}
            <div className="card-warm bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-anchor-green">By Bus</h3>
                <span className="text-anchor-gold font-semibold">441/442</span>
              </div>
              <p className="text-gray-700 mb-4">From Central Bus Station</p>
              <p className="text-gray-600 text-sm">
                Regular service to Stanwell Moor. Ask driver for The Anchor stop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular with Travelers */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Popular with Heathrow Travelers
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">✈️ Pre-Flight Dining</h3>
              <p className="text-gray-700 mb-4">
                Skip expensive airport food. Enjoy a proper meal with us before your flight. 
                We&apos;re just minutes away with free parking - much more relaxing than airport restaurants.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Quick lunch options for tight schedules</li>
                <li>• Relax in our beer garden before long flights</li>
              </ul>
            </div>

            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">🛬 Meeting Point for Arrivals</h3>
              <p className="text-gray-700 mb-4">
                Perfect meeting spot when picking up friends and family. Free parking means 
                no airport fees, and you can track flights while enjoying a drink.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Monitor arrivals on our free WiFi</li>
                <li>• Comfortable seating to wait</li>
                <li>• Just minutes away when they land</li>
              </ul>
            </div>

            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">🏨 Layovers & Crew Stops</h3>
              <p className="text-gray-700 mb-4">
                Regular stop for flight crews and travelers with long layovers. 
                Get out of the airport and experience a real British pub.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Quiet areas for rest and relaxation</li>
                <li>• Hearty meals to combat jet lag</li>
                <li>• Local beers and proper pub atmosphere</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Heathrow Local Experience */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              More Than Just a Pub Near the Airport
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl text-center mb-8">
                While millions pass through Heathrow's terminals each year, The Anchor offers 
                something the airport can't - authentic British hospitality at local prices.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">The Airport Alternative</h3>
                  <p className="mb-4">
                    Heathrow Airport serves over 80 million passengers annually, making it one of the 
                    world's busiest airports. But with that comes crowds, queues, and eye-watering 
                    prices. Just 7 minutes from Terminal 5, The Anchor provides a refreshing alternative. 
                    Here, a pint costs what a pint should cost. A meal is freshly prepared, not 
                    pre-packaged. And you can actually hear yourself think.
                  </p>
                  <p>
                    Whether you're starting your journey, ending it, or somewhere in between, we offer 
                    what every traveler needs: good food, fair prices, and a warm welcome. No boarding 
                    passes required.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">A Hub for Everyone</h3>
                  <p className="mb-4">
                    Our unique location makes us a natural meeting point. Business travelers conducting 
                    meetings over lunch. Families reuniting after months apart. Flight crews unwinding 
                    after long-haul flights. Tour groups getting their first taste of British pub culture. 
                    Each brings their own story, but all find the same thing: a proper local pub that 
                    happens to be perfectly placed for airport access.
                  </p>
                  <p>
                    We've become part of countless travel stories. Marriage proposals after arrivals. 
                    Tearful goodbyes before departures. Celebrations and commiserations. The Anchor 
                    isn't just near Heathrow - we're part of the journey.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-md mb-12">
                <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">
                  Why Smart Travelers Choose The Anchor
                </h3>
                <p className="text-gray-700 mb-4">
                  Let's be honest - nobody enjoys airport prices. A sandwich that costs £12 at 
                  Heathrow costs £6 here. A pint that's £7 in the terminal is £4.50 at our bar. 
                  But it's not just about the money. It's about the experience. Real ales on tap, 
                  not just commercial lagers. Food cooked to order, not reheated. Staff who remember 
                  your name, not just your order number.
                </p>
                <p className="text-gray-700 mb-4">
                  Our free parking alone can save you £20-30 compared to airport rates. Spend an 
                  hour with us before your flight and you've effectively paid for your meal in 
                  parking savings alone. That's what we call Heathrow economics.
                </p>
                <p className="text-gray-700">
                  From Terminal 5, we're closer than most of the airport hotels. From Terminal 2 
                  and 3, we're a straight shot down the A3044. Even Terminal 4, the furthest away, 
                  is only 12 minutes by car. Close enough to be convenient, far enough to escape 
                  the airport bubble.
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  The Anchor has been Stanwell Moor's village pub for generations. Long before 
                  Heathrow grew into the giant it is today, we were here serving the local 
                  community. Now we serve a global community too, but our values remain the same: 
                  good food, proper drinks, and a warm welcome for all.
                </p>
                <p className="text-lg text-gray-700 italic">
                  "Your local near Heathrow" isn't just a tagline - it's a promise. However far 
                  you've traveled, you'll always find a home at The Anchor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Visit The Anchor - Heathrow&apos;s Local
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Just minutes from all terminals. Free parking. Great food. 
            Genuine British pub experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 Call: 01753 682707
            </CallToAction>
            <CallToAction 
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
              variant="white"
              size="lg"
              external
            >
              📍 Get Directions
            </CallToAction>
          </div>
          
          <div className="mt-12 text-white/80">
            <p className="mb-2">The Anchor, Horton Road, Stanwell Moor, Surrey TW19 6AQ</p>
            <p>Free Parking • Family Friendly • Dog Friendly • Garden • Late Opening</p>
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
            "name": "The Anchor - Pub Near Heathrow Airport",
            "description": "The closest traditional British pub to Heathrow Airport. Just 7 minutes from Terminal 5.",
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
            "url": "https://the-anchor.pub/near-heathrow",
            "telephone": "+441753682707",
            "priceRange": "££",
            "servesCuisine": ["British", "Pub Food"],
            "amenityFeature": [
              {"@type": "LocationFeatureSpecification", "name": "Free Parking"},
              {"@type": "LocationFeatureSpecification", "name": "Free WiFi"},
              {"@type": "LocationFeatureSpecification", "name": "Wheelchair Accessible"},
              {"@type": "LocationFeatureSpecification", "name": "Dog Friendly"}
            ]
          })
        }}
      />
    </>
  )
}