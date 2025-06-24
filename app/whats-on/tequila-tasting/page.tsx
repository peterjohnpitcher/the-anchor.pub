import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tequila Thursdays | The Anchor Stanwell Moor | Premium Tequila Tasting Events',
  description: 'Join us every Thursday for premium tequila tastings at The Anchor. Explore Mexico\'s finest spirits, learn about regions and production, all in a friendly social atmosphere near Heathrow.',
  keywords: 'tequila tasting stanwell moor, tequila thursday heathrow, premium tequila surrey, mexican spirits tasting, agave spirits uk',
  openGraph: {
    title: 'Tequila Thursdays at The Anchor',
    description: 'Every Thursday evening - Premium tequila tastings with expert guidance in a social atmosphere',
    images: ['/images/events/tequila-tasting/the-anchor-tequila-tasting-event.jpg'],
  },
}

// Types for tequila information
type TequilaRegion = {
  name: string
  description: string
  characteristics: string[]
  icon: string
}

type TequilaType = {
  name: string
  aging: string
  profile: string
  pairings: string[]
}

const tequilaRegions: TequilaRegion[] = [
  {
    name: 'Jalisco Highlands',
    description: 'The birthplace of tequila, known for sweeter, fruitier profiles',
    characteristics: ['Floral notes', 'Citrus undertones', 'Sweet agave'],
    icon: '🏔️'
  },
  {
    name: 'Jalisco Lowlands',
    description: 'Valley region producing earthier, more herbaceous tequilas',
    characteristics: ['Earthy flavors', 'Mineral notes', 'Black pepper'],
    icon: '🌄'
  },
  {
    name: 'Other CRT Regions',
    description: 'Certified regions including Michoacán, Guanajuato, and Nayarit',
    characteristics: ['Unique terroir', 'Diverse profiles', 'Artisanal methods'],
    icon: '🗺️'
  }
]

const tequilaTypes: TequilaType[] = [
  {
    name: 'Blanco',
    aging: 'Unaged or up to 2 months',
    profile: 'Pure agave flavor, bright and crisp',
    pairings: ['Citrus', 'Fresh herbs', 'Light seafood']
  },
  {
    name: 'Reposado',
    aging: '2-12 months in oak',
    profile: 'Smooth with hints of vanilla and caramel',
    pairings: ['Grilled meats', 'Chocolate', 'Aged cheeses']
  },
  {
    name: 'Añejo',
    aging: '1-3 years in oak',
    profile: 'Complex with deep oak and spice notes',
    pairings: ['Dark chocolate', 'Coffee', 'Rich desserts']
  },
  {
    name: 'Extra Añejo',
    aging: 'Over 3 years in oak',
    profile: 'Ultra-smooth, cognac-like complexity',
    pairings: ['Cigars', 'Dried fruits', 'Nuts']
  }
]

export default function TequilaTastingPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/events/tequila-tasting/the-anchor-tequila-tasting-event.jpg"
            alt="Tequila tasting event at The Anchor pub"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 via-amber-800/60 to-amber-900/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-amber-200 text-lg mb-4 drop-shadow">Every Thursday Evening</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Tequila Thursdays
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              Discover the art and soul of Mexico's national spirit
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="tag bg-white/90 backdrop-blur-sm">🥃 Premium Selection</span>
              <span className="tag bg-white/90 backdrop-blur-sm">📚 Educational Journey</span>
              <span className="tag bg-white/90 backdrop-blur-sm">👥 Social Experience</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🌮 Authentic Pairings</span>
            </div>
            
            <CallToAction 
              href="tel:01753682707"
              variant="primary"
              size="large"
            >
              📞 Book Your Tasting Experience
            </CallToAction>
          </div>
        </div>
      </section>

      {/* About Tequila Thursdays */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              More Than Just a Tasting
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl mb-6 text-center">
                Every Thursday evening, join us for an immersive journey through Mexico's 
                most celebrated spirit. Our carefully curated tastings are designed to educate, 
                entertain, and bring people together.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-amber-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">The Experience</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-amber-600">🥃</span>
                      <span>Taste 4-6 premium tequilas per session</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-amber-600">👨‍🏫</span>
                      <span>Learn from our knowledgeable staff</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-amber-600">🌮</span>
                      <span>Enjoy complimentary Mexican nibbles</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-amber-600">📖</span>
                      <span>Discover the history and culture</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">What You'll Learn</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-green-600">🌵</span>
                      <span>Blue agave cultivation and harvesting</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600">⚗️</span>
                      <span>Traditional vs modern production methods</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600">🗺️</span>
                      <span>Regional differences and terroir</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600">👃</span>
                      <span>Proper tasting techniques</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tequila Types */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              Understanding Tequila Types
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {tequilaTypes.map((type) => (
                <div key={type.name} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-amber-700 mb-3">{type.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">Aging: {type.aging}</p>
                  <p className="text-gray-700 mb-4">{type.profile}</p>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-amber-800 mb-2">Perfect with:</p>
                    <p className="text-sm text-gray-700">{type.pairings.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">100% Agave Promise</h3>
              <p className="text-gray-700 text-lg">
                We only serve 100% blue agave tequilas - no mixtos here! 
                Experience the true taste of Mexico with authentic, premium spirits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              Journey Through Mexico's Tequila Regions
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {tequilaRegions.map((region) => (
                <div key={region.name} className="text-center">
                  <div className="text-6xl mb-4">{region.icon}</div>
                  <h3 className="text-xl font-bold text-anchor-green mb-3">{region.name}</h3>
                  <p className="text-gray-700 mb-4">{region.description}</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">Tasting Notes:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {region.characteristics.map((char, index) => (
                        <li key={index}>{char}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              Join Us This Thursday
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">Day</span>
                    <span>Every Thursday</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">Time</span>
                    <span>7:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">Format</span>
                    <span>Guided tasting sessions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Duration</span>
                    <span>Drop in anytime</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Booking & Pricing</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">💰</span>
                    <span>Tasting flights from £15 per person</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">📞</span>
                    <span>Reserve your spot: 01753 682707</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🚶</span>
                    <span>Walk-ins welcome (subject to availability)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">👥</span>
                    <span>Perfect for groups of 2-8 people</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Special Features */}
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Why Choose Our Tequila Thursdays?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="font-semibold">Premium Brands</p>
                  <p className="text-sm text-gray-600">Carefully selected</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">👫</div>
                  <p className="font-semibold">Social Setting</p>
                  <p className="text-sm text-gray-600">Meet new people</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🎓</div>
                  <p className="font-semibold">Educational</p>
                  <p className="text-sm text-gray-600">Learn as you taste</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🌮</div>
                  <p className="font-semibold">Food Pairings</p>
                  <p className="text-sm text-gray-600">Authentic nibbles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tequila Cocktails */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              Beyond the Tasting: Signature Cocktails
            </h2>
            
            <p className="text-xl text-gray-700 text-center mb-12">
              Not ready for neat tequila? Try one of our expertly crafted cocktails featuring 
              the same premium spirits from our tasting selection.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-amber-50 rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">🍹</div>
                <h3 className="font-bold text-anchor-green mb-2">Classic Margarita</h3>
                <p className="text-sm text-gray-600">Fresh lime, Cointreau, premium blanco</p>
              </div>
              <div className="bg-red-50 rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">🌶️</div>
                <h3 className="font-bold text-anchor-green mb-2">Spicy Paloma</h3>
                <p className="text-sm text-gray-600">Grapefruit, jalapeño, reposado</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 text-center">
                <div className="text-5xl mb-3">🥃</div>
                <h3 className="font-bold text-anchor-green mb-2">Añejo Old Fashioned</h3>
                <p className="text-sm text-gray-600">Agave nectar, bitters, orange peel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-amber-700 mb-3">
                  Do I need to be a tequila expert to join?
                </h3>
                <p className="text-gray-700">
                  Not at all! Our tastings are designed for everyone, from complete beginners to 
                  seasoned aficionados. Our friendly staff will guide you through each tasting, 
                  explaining what makes each tequila unique.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-amber-700 mb-3">
                  Can I book for a private group?
                </h3>
                <p className="text-gray-700">
                  Absolutely! We can arrange private tequila tasting sessions for groups of 8 or more. 
                  Perfect for team building, birthday celebrations, or just a unique night out with friends.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-amber-700 mb-3">
                  Is food available during the tasting?
                </h3>
                <p className="text-gray-700">
                  Yes! We provide complimentary Mexican-inspired nibbles with each tasting flight. 
                  Our full menu is also available if you'd like to enjoy dinner before or after your tasting.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-amber-700 mb-3">
                  What if I can't make it on a Thursday?
                </h3>
                <p className="text-gray-700">
                  While Thursday is our dedicated tequila night with special pricing and atmosphere, 
                  our premium tequila selection is available throughout the week. Ask at the bar about 
                  our full range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore the World of Tequila?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us this Thursday for an unforgettable journey through Mexico's 
            most celebrated spirit. Educational, social, and delicious!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="large"
            >
              📞 Book Now: 01753 682707
            </CallToAction>
            <CallToAction 
              href="/whats-on"
              variant="white"
              size="large"
            >
              View All Events
            </CallToAction>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">Every Thursday Evening</p>
            <p>7:00 PM - 10:00 PM</p>
            <p className="text-sm mt-2">The Anchor, Stanwell Moor</p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Tequila Thursdays - Premium Tequila Tasting",
            "description": "Weekly tequila tasting event featuring premium Mexican spirits, educational content, and social atmosphere",
            "startDate": "2024-01-04T19:00",
            "endDate": "2024-01-04T22:00",
            "eventSchedule": {
              "@type": "Schedule",
              "byDay": "Thursday",
              "repeatFrequency": "P1W"
            },
            "location": {
              "@type": "Place",
              "name": "The Anchor",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Horton Road",
                "addressLocality": "Stanwell Moor",
                "addressRegion": "Surrey",
                "postalCode": "TW19 6AQ",
                "addressCountry": "GB"
              }
            },
            "offers": {
              "@type": "Offer",
              "price": "15.00",
              "priceCurrency": "GBP",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01"
            },
            "organizer": {
              "@type": "Organization",
              "name": "The Anchor",
              "url": "https://the-anchor.pub",
              "telephone": "01753682707"
            },
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "isAccessibleForFree": false,
            "maximumAttendeeCapacity": 40
          })
        }}
      />
    <Footer /></>
  )
}