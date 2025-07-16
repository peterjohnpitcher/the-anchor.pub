import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { BusinessHours } from '@/components/BusinessHours'
import { PageHeaderWrapper } from '@/components/ui/PageHeaderWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { generateBreadcrumbSchema, generateHowToDirectionsSchema } from '@/lib/enhanced-schemas'
import { Metadata } from 'next'
import { CONTACT, BRAND, PARKING } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Heathrow Hotels Pub Near Me | ${BRAND.name} - Escape Airport Prices`,
  description: `Traditional British pub just minutes from Heathrow hotels. Free parking, authentic food, real ale. Perfect escape from airport hotel restaurants. 7 mins from Premier Inn T5, Holiday Inn T4.`,
  keywords: 'heathrow hotels pub, pub near heathrow hotels, british pub near premier inn heathrow, pub near holiday inn heathrow, escape airport hotel prices',
  openGraph: {
    title: 'The Anchor - Traditional Pub Near Heathrow Hotels',
    description: 'Escape expensive hotel restaurants! Authentic British pub with free parking, just minutes from all Heathrow hotels.',
    images: ['/images/the-anchor-pub-exterior-stanwell-moor.jpg'],
    type: 'website',
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "BarOrPub"],
  "@id": "https://the-anchor.pub/heathrow-hotels-pub#business",
  "name": `${BRAND.name} - Near Heathrow Hotels`,
  "image": "https://the-anchor.pub/images/the-anchor-pub-exterior-stanwell-moor.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": CONTACT.address.street,
    "addressLocality": CONTACT.address.town,
    "addressRegion": "Surrey",
    "postalCode": CONTACT.address.postcode,
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": CONTACT.coordinates.lat,
    "longitude": CONTACT.coordinates.lng
  },
  "areaServed": [
    {
      "@type": "Place",
      "name": "Heathrow Airport Hotels"
    },
    {
      "@type": "Place",
      "name": "Terminal 5 Hotels"
    },
    {
      "@type": "Place",
      "name": "Terminal 4 Hotels"
    },
    {
      "@type": "Place",
      "name": "Bath Road Hotels"
    }
  ],
  "priceRange": "££",
  "servesCuisine": ["British", "Traditional English", "Sunday Roast"],
  "telephone": CONTACT.phoneIntl,
  "url": "https://the-anchor.pub/heathrow-hotels-pub"
}

export default function HeathrowHotelsPubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Near Heathrow', url: '/near-heathrow' },
    { name: 'Heathrow Hotels Pub', url: '/heathrow-hotels-pub' }
  ])

  const directionsSchema = generateHowToDirectionsSchema(
    'Heathrow Hotels',
    'The Anchor Pub Stanwell Moor',
    [
      'From Terminal 5 hotels (Premier Inn, Sofitel), take A3044',
      'Head east on Northern Perimeter Road',
      'Turn left onto Horton Road',
      'Continue for 1.5 miles',
      'The Anchor is on your right with free parking',
      'Alternative: From Bath Road hotels, take A4 to Horton Road'
    ]
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, breadcrumbSchema, directionsSchema]) }}
      />
      
      {/* Hero Section */}
      <PageHeaderWrapper
        route="/heathrow-hotels-pub"
        title="Escape Heathrow Hotel Prices"
        description="Traditional British pub just minutes from your hotel"
        showStatusBar={true}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CallToAction 
            href={`tel:${CONTACT.phone}`}
            variant="primary"
            size="lg"
          >
            📞 Book a Table
          </CallToAction>
          <CallToAction 
            href="/food-menu"
            variant="secondary"
            size="lg"
          >
            🍽️ View Menu
          </CallToAction>
        </div>
      </PageHeaderWrapper>

      {/* Welcome Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-6">
              The Perfect Escape from Hotel Dining
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Tired of overpriced hotel restaurants and room service? The Anchor offers authentic 
              British pub atmosphere, honest prices, and proper portions - just a short taxi or 
              drive from any Heathrow hotel.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 rounded-xl p-6">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-lg mb-2">50% Less</h3>
                <p className="text-gray-700">Than hotel restaurant prices for the same quality meal</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-bold text-lg mb-2">Free Parking</h3>
                <p className="text-gray-700">20 spaces - no hourly charges like hotel car parks</p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="text-4xl mb-3">🇬🇧</div>
                <h3 className="font-bold text-lg mb-2">Real Experience</h3>
                <p className="text-gray-700">Authentic British pub, not a chain hotel restaurant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Distances */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Minutes from Major Heathrow Hotels
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-anchor-green mb-4">Terminal 5 Area Hotels</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Sofitel London Heathrow</span>
                    <span className="text-anchor-gold font-bold">7 mins</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Premier Inn T5</span>
                    <span className="text-anchor-gold font-bold">8 mins</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Hilton Garden Inn</span>
                    <span className="text-anchor-gold font-bold">9 mins</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Travelodge T5</span>
                    <span className="text-anchor-gold font-bold">8 mins</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  £10-12 taxi fare or easy drive with free parking
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-anchor-green mb-4">Bath Road & T4 Hotels</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Holiday Inn T4</span>
                    <span className="text-anchor-gold font-bold">10 mins</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Radisson RED</span>
                    <span className="text-anchor-gold font-bold">12 mins</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Marriott Heathrow</span>
                    <span className="text-anchor-gold font-bold">11 mins</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium">Renaissance Hotel</span>
                    <span className="text-anchor-gold font-bold">12 mins</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  £12-15 taxi fare - worth it for the savings!
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-amber-50 rounded-xl p-6 text-center">
              <p className="text-lg text-amber-800">
                <span className="font-bold">Hotel Shuttle Tip:</span> Some hotels offer area shuttles - 
                ask reception if they go near Stanwell Moor!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hotel Guests Choose Us */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Why Heathrow Hotel Guests Love The Anchor
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Escape Hotel Life</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">✓</span>
                    <div>
                      <strong>Real pub atmosphere</strong> - Not another sterile hotel bar
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">✓</span>
                    <div>
                      <strong>Meet locals</strong> - Experience genuine British hospitality
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">✓</span>
                    <div>
                      <strong>Proper portions</strong> - Not tiny hotel plates at huge prices
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">✓</span>
                    <div>
                      <strong>Entertainment</strong> - Quiz nights, drag shows, live atmosphere
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Perfect for Travelers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🕐</span>
                    <div>
                      <strong>Layover dining</strong> - Better than airport or hotel food
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">✈️</span>
                    <div>
                      <strong>Pre-flight meals</strong> - Proper dinner before early flights
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🧳</span>
                    <div>
                      <strong>Luggage storage</strong> - We'll keep bags safe while you eat
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🌍</span>
                    <div>
                      <strong>All currencies</strong> - Cards welcome, including Amex
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <p className="text-lg text-green-800">
                <span className="font-bold">Outside ULEZ Zone:</span> No extra charges - 
                perfect if you're renting a car from the airport!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Guest Favorites */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Hotel Guest Favorites
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🍺</div>
                <h3 className="font-bold text-lg mb-2">Real Ales</h3>
                <p className="text-gray-700">Try proper British beer - not just hotel lagers</p>
                <p className="text-anchor-gold font-semibold mt-2">From £4.80/pint</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🐟</div>
                <h3 className="font-bold text-lg mb-2">Fish & Chips</h3>
                <p className="text-gray-700">Classic British meal hotel guests always request</p>
                <p className="text-anchor-gold font-semibold mt-2">£12.99 (half hotel price)</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🥩</div>
                <h3 className="font-bold text-lg mb-2">Sunday Roast</h3>
                <p className="text-gray-700">Must-try British tradition for Sunday visitors</p>
                <p className="text-anchor-gold font-semibold mt-2">From £14.99</p>
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">Business Travelers Love Us</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-2">Expense-Friendly</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Full VAT receipts provided</li>
                    <li>• 50% less than hotel dining</li>
                    <li>• Proper business atmosphere</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Work-Friendly</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Free WiFi throughout</li>
                    <li>• Quiet corners available</li>
                    <li>• Power outlets in dining room</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transport Options */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Getting Here from Your Hotel
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">🚕 By Taxi</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• £10-15 from most hotels</li>
                  <li>• 7-12 minute journey</li>
                  <li>• Ask for "The Anchor, Stanwell Moor"</li>
                  <li>• Return taxi easily arranged</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">🚗 Rental Car</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Free parking at pub</li>
                  <li>• Easy route from all hotels</li>
                  <li>• Postcode: TW19 6AQ</li>
                  <li>• Outside ULEZ zone</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">🚌 Public Transport</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Bus 442 from some hotels</li>
                  <li>• Ask hotel concierge</li>
                  <li>• Or combine with short taxi</li>
                  <li>• Worth it for the savings!</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700 mb-4">
                Most hotel guests say the short journey is absolutely worth it for the authentic 
                experience and massive savings compared to hotel dining!
              </p>
              <CallToAction href="/find-us" variant="secondary" size="lg">
                Get Detailed Directions
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers for Hotel Guests */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-anchor-green mb-8">
              Special Times for Hotel Guests
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-800 mb-3">Tuesday Pizza Deal</h3>
                <p className="text-4xl font-bold text-red-600 mb-2">BUY 1 GET 1 FREE</p>
                <p className="text-gray-700">All pizzas, all day Tuesday</p>
                <p className="text-sm mt-2">Perfect for sharing with travel companions!</p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Early Evening Dining</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">Kitchen from 6pm</p>
                <p className="text-gray-700">Beat the hotel dinner rush</p>
                <p className="text-sm mt-2">Quieter atmosphere for jet-lagged guests</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700">
              Kitchen closes at 9pm Tuesday-Friday, 7pm Saturday, 5pm Sunday
            </p>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-anchor-green mb-8">
              Opening Hours
            </h2>
            <BusinessHours />
            <p className="mt-4 text-gray-600">
              Perfect for evening meals after hotel check-in
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far is The Anchor from Heathrow hotels?",
            answer: "We're just 7-12 minutes by car from most Heathrow hotels. Terminal 5 hotels like Premier Inn and Sofitel are closest (7-8 mins), while Bath Road hotels take about 10-12 minutes. A taxi costs £10-15 each way."
          },
          {
            question: "Is it worth leaving my hotel to eat at The Anchor?",
            answer: "Absolutely! Hotel guests consistently tell us they save 50% compared to hotel restaurant prices, plus you get a genuine British pub experience. The short journey is worth it for better food, authentic atmosphere, and significant savings."
          },
          {
            question: "Do you accommodate flight crews and business travelers?",
            answer: "Yes! We regularly serve flight crews and business travelers. We provide full VAT receipts for expenses, have free WiFi for working, and understand the needs of travelers including flexible dining times and quick service when needed."
          },
          {
            question: "Can I store luggage while dining?",
            answer: "Yes, we offer secure luggage storage for diners. This is perfect if you're between hotel checkout and flight time, or if you've just arrived and your room isn't ready yet."
          },
          {
            question: "What's the best way to get to The Anchor from my hotel?",
            answer: "Most guests take a taxi (£10-15, 7-12 minutes). If you have a rental car, we have free parking. Some hotels are on the 442 bus route which stops near us. The hotel concierge can arrange transport - just ask for 'The Anchor pub in Stanwell Moor, TW19 6AQ'."
          },
          {
            question: "Are you open early/late for travelers?",
            answer: "We open at 4pm Tuesday-Friday, noon on weekends. While we're not open for breakfast, we're perfect for lunch (weekends), dinner, or evening drinks. Many guests visit us the night before early flights or after afternoon hotel check-in."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escape Hotel Prices Tonight
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Real food, real prices, real British pub - just minutes from your hotel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <CallToAction 
              href={`tel:${CONTACT.phone}`}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              📞 Book a Table
            </CallToAction>
            <CallToAction 
              href="/food-menu"
              variant="primary"
              size="lg"
              className="flex-1 bg-white text-anchor-green hover:bg-gray-100"
            >
              🍽️ View Menu
            </CallToAction>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Free Parking • 7-12 mins from all major hotels • Outside ULEZ Zone
          </p>
        </div>
      </section>
    </>
  )
}