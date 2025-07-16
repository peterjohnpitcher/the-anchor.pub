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
  title: `M25 Junction 14 Pub Near Me | ${BRAND.name} - 5 Minutes from M25`,
  description: `Traditional British pub just 5 minutes from M25 Junction 14. Perfect motorway stop with free parking, real food, and authentic atmosphere. Avoid service station prices. Outside ULEZ zone.`,
  keywords: 'm25 junction 14 pub, pub near m25 junction 14, m25 motorway pub stop, traditional pub near m25, m25 j14 food stop',
  openGraph: {
    title: 'The Anchor - Traditional Pub Near M25 Junction 14',
    description: 'Just 5 minutes from M25 J14. Free parking, proper food, real ales. The perfect motorway break.',
    images: ['/images/the-anchor-pub-exterior-stanwell-moor.jpg'],
    type: 'website',
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "BarOrPub"],
  "@id": "https://the-anchor.pub/m25-junction-14-pub#business",
  "name": `${BRAND.name} - Near M25 Junction 14`,
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
      "name": "M25 Junction 14"
    },
    {
      "@type": "Place",
      "name": "M25 Motorway"
    },
    {
      "@type": "Place",
      "name": "A3113"
    }
  ],
  "priceRange": "££",
  "servesCuisine": ["British", "Traditional English", "Motorway Food Alternative"],
  "telephone": CONTACT.phoneIntl,
  "url": "https://the-anchor.pub/m25-junction-14-pub"
}

export default function M25Junction14PubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/locations' },
    { name: 'M25 Junction 14 Pub', url: '/m25-junction-14-pub' }
  ])

  const directionsSchema = generateHowToDirectionsSchema(
    'M25 Junction 14',
    'The Anchor Pub Stanwell Moor',
    [
      'Exit M25 at Junction 14',
      'At roundabout, take A3113 exit (Airport Way/Stanwell Moor)',
      'Continue on A3113 for 1 mile',
      'Turn right onto Horton Road',
      'The Anchor is 0.5 miles on your left',
      'Free parking available on site'
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
        route="/m25-junction-14-pub"
        title="Your M25 Junction 14 Pit Stop"
        description="Just 5 minutes from the motorway - real food, real prices"
        showStatusBar={true}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CallToAction 
            href={`tel:${CONTACT.phone}`}
            variant="primary"
            size="lg"
          >
            📞 Call Ahead
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
              The Smart Alternative to Service Stations
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Why settle for overpriced motorway services when a proper British pub is just 
              5 minutes from Junction 14? Fresh food, fair prices, and a chance to stretch 
              your legs in our beer garden.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-6">
                <div className="text-4xl mb-3">⏱️</div>
                <h3 className="font-bold text-lg mb-2">5 Minutes</h3>
                <p className="text-gray-700">Quick detour from M25 Junction 14</p>
              </div>
              
              <div className="bg-red-50 rounded-xl p-6">
                <div className="text-4xl mb-3">💷</div>
                <h3 className="font-bold text-lg mb-2">Half Price</h3>
                <p className="text-gray-700">Compared to motorway services</p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-bold text-lg mb-2">Free Parking</h3>
                <p className="text-gray-700">20 spaces, easy access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Over Services */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Why M25 Drivers Choose The Anchor
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Beat Service Station Blues</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">❌</span>
                    <div>
                      <strong>Service stations:</strong> £15+ for basic sandwich meal
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <strong>The Anchor:</strong> Full meals from £8.99
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">❌</span>
                    <div>
                      <strong>Service stations:</strong> Packaged, reheated food
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <strong>The Anchor:</strong> Freshly cooked to order
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">❌</span>
                    <div>
                      <strong>Service stations:</strong> Crowded, noisy, stressful
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <strong>The Anchor:</strong> Relaxed pub atmosphere
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Perfect Journey Break</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🍺</span>
                    <div>
                      <strong>Proper refreshment</strong> - Real ales, wines, soft drinks
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🌳</span>
                    <div>
                      <strong>Beer garden break</strong> - Stretch legs in fresh air
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🐕</span>
                    <div>
                      <strong>Dog friendly</strong> - Perfect for traveling with pets
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🚻</span>
                    <div>
                      <strong>Clean facilities</strong> - Better than service stations
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">📶</span>
                    <div>
                      <strong>Free WiFi</strong> - Check routes, emails, or relax
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-amber-50 rounded-xl p-6 text-center">
              <p className="text-lg text-amber-800">
                <span className="font-bold">M25 Tip:</span> Avoid peak times (7-9am, 5-7pm) 
                for the quickest detour. We're much quieter than services during rush hours!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stops Menu */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Quick Stops & Hearty Meals
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">20-Minute Lunch Stops</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Soup & Sandwich Combo - £7.99</li>
                  <li>• Classic Burger & Chips - £10.99</li>
                  <li>• Fish & Chips - £12.99</li>
                  <li>• Ham, Egg & Chips - £8.99</li>
                  <li>• Jacket Potatoes - From £6.99</li>
                </ul>
                <p className="mt-3 text-sm text-amber-700">All served quickly for motorway travelers</p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Take a Proper Break</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Sunday Roasts (weekends)</li>
                  <li>• Steak & Ale Pie - £11.99</li>
                  <li>• Chicken Katsu Curry - £10.99</li>
                  <li>• Tuesday Pizza BOGOF</li>
                  <li>• Daily Specials Board</li>
                </ul>
                <p className="mt-3 text-sm text-blue-700">Relax and enjoy - you deserve it!</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                Kitchen serves quick meals perfect for motorway breaks
              </p>
              <CallToAction href="/food-menu" variant="primary" size="lg">
                View Full Menu
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Planner */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Easy Access from M25 Junction 14
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">📍 From M25 Clockwise</h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">1.</span>
                    <span>Exit at Junction 14 (signed Heathrow T4, T5)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">2.</span>
                    <span>At roundabout, take 3rd exit (A3113)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">3.</span>
                    <span>After 1 mile, turn right onto Horton Road</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">4.</span>
                    <span>The Anchor is 0.5 miles on your left</span>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  <strong>Total time:</strong> 5 minutes from motorway
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🔄 Rejoining M25</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Back to M25 (any direction)</p>
                    <p className="text-gray-700">Simply reverse the route - well signed back to Junction 14</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Alternative Routes</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• To Heathrow: Continue on local roads</li>
                      <li>• To M4: Via Stanwell and M25 J15</li>
                      <li>• To A30: Direct from Stanwell Moor</li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-green-700 font-semibold">⚡ Time Saver</p>
                    <p className="text-sm text-gray-700">Often quicker than service station queues!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <CallToAction 
                href="https://maps.google.com/maps?saddr=M25+Junction+14&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ"
                variant="secondary"
                external
              >
                📍 Get Sat Nav Directions
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Regular M25 Users */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-anchor-green mb-8">
              Popular with M25 Regulars
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Business Drivers</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Quieter than services</li>
                  <li>• Proper meals</li>
                  <li>• VAT receipts</li>
                  <li>• Free WiFi</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Long Distance</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Halfway point M25</li>
                  <li>• Dog walking area</li>
                  <li>• Proper break spot</li>
                  <li>• Avoid M25 stress</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Local Traffic</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Known by locals</li>
                  <li>• Traffic updates</li>
                  <li>• Alternative routes</li>
                  <li>• Regular stop</li>
                </ul>
              </div>
            </div>
            
            <p className="text-lg text-gray-700">
              Join the smart M25 drivers who've discovered the better alternative to services!
            </p>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              More Than Just a Motorway Stop
            </h2>
            
            <div className="bg-white rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-anchor-green mb-4">Perfect For</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Meeting point from different M25 directions</li>
                    <li>✓ Break before Heathrow drop-offs</li>
                    <li>✓ Avoiding accident delays with local knowledge</li>
                    <li>✓ Weekend leisure trips around M25</li>
                    <li>✓ Commercial drivers' regular stop</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-anchor-green mb-4">Remember</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>📍 Postcode: TW19 6AQ</li>
                    <li>🚗 Free parking for all</li>
                    <li>⏰ Quick service available</li>
                    <li>💳 All cards accepted</li>
                    <li>🚫 Outside ULEZ zone</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-anchor-green mb-8">
              Opening Hours for M25 Travelers
            </h2>
            <BusinessHours />
            <p className="mt-4 text-gray-600">
              Kitchen times perfect for lunch and dinner breaks
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far is The Anchor from M25 Junction 14?",
            answer: "We're just 2.1 miles (5 minutes) from M25 Junction 14. Exit at J14, follow A3113 for 1 mile, turn right onto Horton Road, and we're 0.5 miles on your left. Much quicker than queuing at motorway services!"
          },
          {
            question: "Is it worth leaving the M25 for food at The Anchor?",
            answer: "Absolutely! You'll save 50% compared to service station prices, get freshly cooked food instead of reheated meals, and enjoy a proper break in relaxed surroundings. The 5-minute detour often takes less time than service station queues."
          },
          {
            question: "Can I park easily if I'm towing or in a large vehicle?",
            answer: "Yes, we have 20 free parking spaces with easy access and turning space. While we can accommodate most vehicles, extremely large lorries might find local laybys more suitable. Cars with caravans and vans fit comfortably."
          },
          {
            question: "What's the quickest meal option for M25 travelers?",
            answer: "Our kitchen can serve sandwiches, burgers, and jacket potatoes within 15-20 minutes. If you're in a real hurry, call ahead on 01753 682707 and we can have your order ready for collection."
          },
          {
            question: "Are you open early/late for M25 traffic?",
            answer: "We open at 4pm Tuesday-Friday and noon on weekends. While we're not open for breakfast, we're perfect for lunch (weekends), afternoon breaks, and dinner. Many M25 regulars time their journeys to stop with us."
          },
          {
            question: "Do you get updates on M25 traffic conditions?",
            answer: "Yes! Our locals often share real-time traffic updates, and we have WiFi if you need to check routes. When there are major delays, we see lots of M25 drivers taking a break with us until traffic clears."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Make The Smart M25 Stop
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Real food, real prices, real break - just 5 minutes from Junction 14
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <CallToAction 
              href={`tel:${CONTACT.phone}`}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              📞 Call Ahead
            </CallToAction>
            <CallToAction 
              href="/find-us"
              variant="primary"
              size="lg"
              className="flex-1 bg-white text-anchor-green hover:bg-gray-100"
            >
              📍 Get Directions
            </CallToAction>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Free Parking • Quick Service • Dog Friendly • Outside ULEZ
          </p>
        </div>
      </section>
    </>
  )
}