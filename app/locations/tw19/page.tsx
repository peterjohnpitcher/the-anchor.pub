import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'
import { getUpcomingEvents, getTodaysSpecials } from '@/lib/anchorAPI'
import { EventCard } from '@/components/EventCard'
import { OpeningStatus } from '@/components/OpeningStatus'

export const metadata: Metadata = {
  title: 'Best Pub in TW19 | The Anchor - Traditional British Pub & Restaurant',
  description: 'Looking for pubs in TW19? The Anchor in Stanwell Moor offers great food, real ales, live entertainment and free parking. The best local pub in the TW19 postcode area.',
  keywords: 'pubs in tw19, tw19 pub, restaurants tw19, bars tw19, tw19 food, pub food tw19, stanwell moor tw19, heathrow tw19',
  openGraph: {
    title: 'The Anchor - Best Pub in TW19 Postcode Area',
    description: 'Award-winning pub and restaurant in TW19. Traditional British food, entertainment, and warm hospitality near Heathrow.',
    images: ['/images/hero/the-anchor-pub-beer-garden.jpg'],
  },
}

export default async function TW19Page() {
  const upcomingEvents = await getUpcomingEvents(3)
  const todaysSpecials = await getTodaysSpecials()

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-anchor-green to-anchor-green-dark" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-anchor-gold text-lg mb-4">Award-winning local pub</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The Best Pub in TW19
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Stanwell Moor's premier pub • Restaurant • Entertainment venue
            </p>
            
            <div className="mb-6">
              <OpeningStatus />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallToAction 
                href="tel:01753682707"
                variant="primary"
                size="lg"
              >
                📞 Reserve Your Table
              </CallToAction>
              
              <CallToAction 
                href="#tw19-area"
                variant="white"
                size="lg"
              >
                📍 Explore TW19 Area
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* TW19 Quick Info */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">📍</div>
              <p className="font-bold text-anchor-green">TW19 6AQ</p>
              <p className="text-sm text-gray-600">Full postcode</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🚗</div>
              <p className="font-bold text-anchor-green">Free</p>
              <p className="text-sm text-gray-600">parking</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">✈️</div>
              <p className="font-bold text-anchor-green">Near</p>
              <p className="text-sm text-gray-600">Heathrow</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-bold text-anchor-green">Top Rated</p>
              <p className="text-sm text-gray-600">in TW19</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're TW19's Best */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Why The Anchor is TW19's Premier Pub
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Central TW19 Location</h3>
                <p className="text-gray-700 mb-4">
                  Perfectly positioned in the heart of the TW19 postcode area, The Anchor serves 
                  residents from across this diverse region. Whether you're in Stanwell Moor, 
                  parts of Stanwell, or the Heathrow periphery, we're your local.
                </p>
                <p className="text-gray-700">
                  The TW19 postcode covers a unique area where village charm meets international 
                  connectivity. We embody this blend - a traditional British pub that welcomes 
                  both longtime locals and global travelers.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">More Than Other TW19 Pubs</h3>
                <p className="text-gray-700 mb-4">
                  While TW19 has a few drinking establishments, The Anchor stands apart. We're 
                  not just a pub - we're a restaurant, entertainment venue, and community hub 
                  all rolled into one. From our famous drag shows to traditional Sunday roasts, 
                  we offer experiences you won't find elsewhere in TW19.
                </p>
                <p className="text-gray-700">
                  Our recent renovations mean we offer the best of both worlds: traditional 
                  pub character with modern comfort and facilities.
                </p>
              </div>
            </div>

            {/* TW19 Area Features */}
            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">
                Serving All of TW19
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🏘️</div>
                  <h4 className="font-bold text-anchor-green mb-2">Village Atmosphere</h4>
                  <p className="text-sm text-gray-700">
                    Despite proximity to Heathrow, TW19 maintains its local character
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🌍</div>
                  <h4 className="font-bold text-anchor-green mb-2">International Mix</h4>
                  <p className="text-sm text-gray-700">
                    TW19 residents include locals and international airport workers
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🚗</div>
                  <h4 className="font-bold text-anchor-green mb-2">Easy Access</h4>
                  <p className="text-sm text-gray-700">
                    Central TW19 location with ample free parking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TW19 Area Guide */}
      <section id="tw19-area" className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Your Guide to TW19 Area
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* About TW19 */}
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">📍 About TW19</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    The TW19 postcode district covers several communities in Surrey, 
                    centered around Stanwell and extending to areas near Heathrow Airport.
                  </p>
                  <div>
                    <p className="font-semibold mb-2">TW19 includes:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Stanwell Moor (where we are!)</li>
                      <li>• Parts of Stanwell</li>
                      <li>• Areas near Heathrow</li>
                      <li>• King George VI Reservoir area</li>
                      <li>• Parts of Horton</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-anchor-cream rounded-lg">
                    <p className="font-semibold text-anchor-green">Did You Know?</p>
                    <p className="text-sm">TW stands for Twickenham, though TW19 is closer to Staines!</p>
                  </div>
                </div>
              </div>

              {/* Getting Around TW19 */}
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🚗 Getting to The Anchor</h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">From TW19 Areas:</p>
                    <ul className="text-sm space-y-2">
                      <li>• <strong>Stanwell:</strong> 5 mins via A3044</li>
                      <li>• <strong>Horton:</strong> 3 mins via Horton Road</li>
                      <li>• <strong>Poyle:</strong> 7 mins via Bath Road</li>
                      <li>• <strong>Colnbrook:</strong> 8 mins via A3044</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Public Transport:</p>
                    <p className="text-sm">
                      Bus 441 serves TW19 area<br />
                      Connects to Staines & Heathrow
                    </p>
                  </div>
                  <div className="p-4 bg-anchor-cream rounded-lg">
                    <p className="font-semibold text-anchor-green">Full Address:</p>
                    <p className="text-sm">The Anchor, Horton Road<br />Stanwell Moor, TW19 6AQ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Link */}
            <div className="bg-anchor-sand/30 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Find Us in TW19</h3>
              <p className="text-gray-700 mb-6">
                Centrally located in the TW19 postcode area with easy access from all directions
              </p>
              <CallToAction
                href="https://maps.google.com/maps?q=TW19+6AQ"
                variant="primary"
                size="lg"
                external
              >
                View TW19 6AQ on Map
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Special in TW19 */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              What TW19 Residents Love About Us
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🍽️ Best Food in TW19
                </h3>
                <p className="text-gray-700 mb-3">
                  From hearty British classics to international favorites, our menu offers 
                  the most diverse dining in the TW19 area. Fresh ingredients, generous portions.
                </p>
                <CallToAction href="/food-menu" variant="secondary" size="sm">
                  View Our Menu
                </CallToAction>
              </div>

              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🎉 TW19's Entertainment Hub
                </h3>
                <p className="text-gray-700 mb-3">
                  The only venue in TW19 offering regular drag shows, live music, quiz nights 
                  and special events. There's always something happening!
                </p>
                <CallToAction href="/whats-on" variant="secondary" size="sm">
                  See What's On
                </CallToAction>
              </div>

              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🏠 Private Functions
                </h3>
                <p className="text-gray-700 mb-3">
                  TW19's premier venue for birthdays, anniversaries, wakes, and celebrations. 
                  Our function room hosts events for 20-100 guests.
                </p>
                <CallToAction href="/book-event" variant="secondary" size="sm">
                  Book Your Event
                </CallToAction>
              </div>

              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">
                  🅿️ Always Free Parking
                </h3>
                <p className="text-gray-700 mb-3">
                  Unlike many TW19 venues, we offer ample free parking. No meters, no stress 
                  - just pull up and enjoy your visit.
                </p>
                <CallToAction href="#tw19-area" variant="secondary" size="sm">
                  Get Directions
                </CallToAction>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Specials */}
      {todaysSpecials && todaysSpecials.length > 0 && (
        <section className="section-spacing bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                Today's Specials in TW19
              </h2>
              <div className="bg-white rounded-2xl p-8">
                {todaysSpecials.map((special, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h3 className="font-bold text-lg text-anchor-green">{special.name}</h3>
                    <p className="text-gray-700">{special.description}</p>
                    {special.price && (
                      <p className="text-anchor-gold font-semibold mt-1">£{special.price}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="section-spacing bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                Upcoming Events in TW19
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="text-center mt-8">
                <CallToAction href="/whats-on" variant="primary">
                  View All TW19 Events
                </CallToAction>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TW19 Community */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Part of the TW19 Community
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <div className="bg-white rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Serving TW19 Since 1936</h3>
                <p className="mb-4">
                  The Anchor has been a cornerstone of the TW19 community for generations. We've 
                  watched the area transform from rural Surrey to a unique blend of village life 
                  and international connectivity, thanks to our proximity to Heathrow.
                </p>
                <p className="mb-4">
                  Today, TW19 is home to a diverse community - from families who've lived here 
                  for generations to international residents working at the airport. The Anchor 
                  brings everyone together, creating a uniquely welcoming atmosphere you won't 
                  find anywhere else in the postcode.
                </p>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Why TW19 is Special</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span>✈️</span>
                    <span>Direct access to Heathrow while maintaining village charm</span>
                  </li>
                  <li className="flex gap-3">
                    <span>🌳</span>
                    <span>Green spaces and reservoirs provide natural beauty</span>
                  </li>
                  <li className="flex gap-3">
                    <span>🚗</span>
                    <span>Excellent transport links to London, Windsor, and beyond</span>
                  </li>
                  <li className="flex gap-3">
                    <span>🏘️</span>
                    <span>Strong community spirit despite diverse population</span>
                  </li>
                  <li className="flex gap-3">
                    <span>📍</span>
                    <span>The Anchor: TW19's gathering place for all occasions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Experience the Best of TW19
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join your neighbors at TW19's premier pub and entertainment venue
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 Call: 01753 682707
            </CallToAction>
            <CallToAction 
              href="/food-menu"
              variant="white"
              size="lg"
            >
              🍽️ Browse Menu
            </CallToAction>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">The Anchor</p>
            <p>Horton Road, Stanwell Moor</p>
            <p className="text-xl font-bold">TW19 6AQ</p>
            <p className="text-sm mt-2">The best pub in the TW19 postcode</p>
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
            "name": "The Anchor - Best Pub in TW19",
            "description": "Award-winning pub and restaurant in TW19 postcode area. Traditional British food, entertainment, and hospitality near Heathrow.",
            "image": "https://the-anchor.pub/images/hero/the-anchor-pub-beer-garden.jpg",
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
            "areaServed": [
              {
                "@type": "PostalAddress",
                "postalCode": "TW19",
                "addressRegion": "Surrey",
                "addressCountry": "GB"
              }
            ],
            "url": "https://the-anchor.pub/locations/tw19",
            "telephone": "+441753682707",
            "priceRange": "££",
            "servesCuisine": ["British", "Pub Food", "International"],
            "keywords": "tw19 pub, pubs in tw19, restaurants tw19, best pub tw19",
            "award": "Best Pub in TW19",
            "hasMap": "https://maps.google.com/maps?q=TW19+6AQ",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "12:00",
                "closes": "23:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "12:00",
                "closes": "23:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "12:00",
                "closes": "22:30"
              }
            ]
          })
        }}
      />
    </>
  )
}