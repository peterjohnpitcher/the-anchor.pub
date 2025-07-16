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
  title: `Ashford Pub Near Me | ${BRAND.name} - 10 Minutes from Ashford`,
  description: `${BRAND.name} is the perfect traditional British pub just 10 minutes from Ashford. Free parking, Sunday roasts, quiz nights, and family-friendly atmosphere. Easy access from Ashford via A30.`,
  keywords: 'ashford pub, pub near ashford, ashford surrey pub, pubs close to ashford, british pub ashford, traditional pub near ashford',
  openGraph: {
    title: 'The Anchor - Traditional Pub Near Ashford',
    description: 'Just 10 minutes from Ashford with free parking. Sunday roasts, British classics, and regular events.',
    images: ['/images/the-anchor-pub-exterior-stanwell-moor.jpg'],
    type: 'website',
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "BarOrPub"],
  "@id": "https://the-anchor.pub/ashford-pub#business",
  "name": `${BRAND.name} - Near Ashford`,
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
      "@type": "City",
      "name": "Ashford"
    },
    {
      "@type": "City",
      "name": "Ashford Common"
    },
    {
      "@type": "Place",
      "name": "Littleton"
    }
  ],
  "priceRange": "££",
  "servesCuisine": ["British", "Traditional English", "Sunday Roast"],
  "telephone": CONTACT.phoneIntl,
  "url": "https://the-anchor.pub/ashford-pub"
}

export default function AshfordPubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/locations' },
    { name: 'Ashford Pub', url: '/ashford-pub' }
  ])

  const directionsSchema = generateHowToDirectionsSchema(
    'Ashford Surrey',
    'The Anchor Pub Stanwell Moor',
    [
      'From Ashford town center, head west on Church Road/B377',
      'Continue onto Fordbridge Road',
      'At the roundabout, take the 2nd exit onto A30 (Staines Road West)',
      'Continue for about 2 miles',
      'Turn right onto Horton Road (look for Stanwell Moor signs)',
      'The Anchor will be on your right with free parking'
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
        route="/ashford-pub"
        title="Traditional British Pub Near Ashford"
        description="Just 10 minutes from Ashford with free parking"
        showStatusBar={true}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CallToAction 
            href={`tel:${CONTACT.phone}`}
            variant="primary"
            size="lg"
          >
            📞 Call to Book
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
              Ashford's Favorite Traditional Pub Experience
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Just a 10-minute drive from Ashford, The Anchor offers the perfect escape from 
              busy town life. Enjoy traditional British hospitality, fantastic food, and a warm 
              welcome in our historic Stanwell Moor location.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-anchor-cream rounded-xl p-6">
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-bold text-lg mb-2">Easy Access</h3>
                <p className="text-gray-700">10 minutes via A30 with 20 free parking spaces</p>
              </div>
              
              <div className="bg-anchor-cream rounded-xl p-6">
                <div className="text-4xl mb-3">🍺</div>
                <h3 className="font-bold text-lg mb-2">Real Pub Feel</h3>
                <p className="text-gray-700">Traditional atmosphere Ashford chain pubs can't match</p>
              </div>
              
              <div className="bg-anchor-cream rounded-xl p-6">
                <div className="text-4xl mb-3">💚</div>
                <h3 className="font-bold text-lg mb-2">ULEZ Free</h3>
                <p className="text-gray-700">Save £12.50 - we're outside the zone!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ashford Residents Choose Us */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Why Ashford Residents Love The Anchor
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Worth the Short Journey</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">✓</span>
                    <div>
                      <strong>Escape Ashford's busy high street</strong> - Peaceful village setting with countryside views
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">✓</span>
                    <div>
                      <strong>Better value than Ashford pubs</strong> - Proper portions at village pub prices
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">✓</span>
                    <div>
                      <strong>Free parking always available</strong> - No meters, no stress, no charges
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">✓</span>
                    <div>
                      <strong>Dog-friendly throughout</strong> - Perfect after Ashford Common walks
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Special Events & Offers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🍕</span>
                    <div>
                      <strong>Tuesday Pizza BOGOF</strong> - Worth the trip from Ashford for 2-for-1 pizzas
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🐟</span>
                    <div>
                      <strong>Friday Fish Special</strong> - 50% off for over 65s on chip shop favorites
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🥘</span>
                    <div>
                      <strong>Sunday Roasts</strong> - Book by Saturday 1pm - Ashford folks fill tables fast!
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🎯</span>
                    <div>
                      <strong>Entertainment</strong> - Quiz nights, drag shows, pool & darts
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
              <p className="text-lg text-blue-800">
                <span className="font-bold">Plane Spotting Bonus:</span> Watch aircraft overhead 
                every 90 seconds - entertainment Ashford pubs can't offer!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular with Ashford Groups */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Popular with Ashford Groups
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Sports & Social</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Ashford football fans for big matches</li>
                  <li>• Cricket club celebrations</li>
                  <li>• Rugby supporters gatherings</li>
                  <li>• Darts and pool leagues</li>
                  <li>• Quiz teams from Ashford</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Special Occasions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Birthday parties</li>
                  <li>• Anniversary dinners</li>
                  <li>• Work leaving dos</li>
                  <li>• Christmas parties</li>
                  <li>• Family gatherings</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6">
                Private areas available for Ashford groups - from intimate dinners to parties of 250!
              </p>
              <CallToAction href="/book-event" variant="primary" size="lg">
                Enquire About Private Hire
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here from Ashford */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green text-center mb-8">
              Getting to The Anchor from Ashford
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🚗 Driving Directions</h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">1.</span>
                    <span>From Ashford center, head west on Church Road</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">2.</span>
                    <span>Continue onto Fordbridge Road</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">3.</span>
                    <span>Join the A30 westbound (Staines Road)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">4.</span>
                    <span>After 2 miles, turn right onto Horton Road</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">5.</span>
                    <span>The Anchor is on your right - look for our sign!</span>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  <strong>Journey time:</strong> 10 minutes in normal traffic
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🚌 Alternative Routes</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Via Ashford Common</p>
                    <p className="text-gray-700">Through Ashford Common and Stanwell - scenic route past the reservoirs</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Via Staines</p>
                    <p className="text-gray-700">A308 to Staines, then A30 to Stanwell Moor</p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="font-semibold text-amber-700">⚡ Quick Tip</p>
                    <p className="text-gray-700">Avoid Heathrow traffic - use Stanwell Moor Road via Bedfont</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <CallToAction 
                href="https://maps.google.com/maps?saddr=Ashford+Surrey&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ"
                variant="secondary"
                external
              >
                📍 Get Directions from Ashford
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Local Connections */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-anchor-green mb-8">
              Ashford to The Anchor - Local Connections
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Nearby Landmarks</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• 2 miles from Queen Mary Reservoir</li>
                  <li>• 3 miles from Ashford Hospital</li>
                  <li>• Next to St Mary's Church</li>
                  <li>• 5 mins from M25 Junction 14</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Local Areas Served</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Ashford Common</li>
                  <li>• Littleton</li>
                  <li>• Charlton Village</li>
                  <li>• Laleham</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Journey Times</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Ashford Station: 12 mins</li>
                  <li>• Ashford Hospital: 8 mins</li>
                  <li>• Spelthorne Leisure: 10 mins</li>
                  <li>• Heathrow T5: 7 mins</li>
                </ul>
              </div>
            </div>
            
            <p className="text-lg text-gray-700">
              Join the many Ashford residents who've discovered their new favorite pub!
            </p>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-anchor-green mb-8">
              Opening Hours
            </h2>
            <BusinessHours />
            <p className="mt-4 text-gray-600">
              Kitchen closes earlier - check times for food service
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far is The Anchor from Ashford town center?",
            answer: "The Anchor is approximately 3.5 miles from Ashford town center, which is about a 10-minute drive via the A30. We're located in Stanwell Moor, just past Ashford Hospital."
          },
          {
            question: "Is there parking at The Anchor for Ashford visitors?",
            answer: "Yes! We have 20 free parking spaces available for all our guests. Unlike Ashford town center, you'll never have to worry about parking meters or charges here."
          },
          {
            question: "What makes The Anchor different from pubs in Ashford?",
            answer: "The Anchor offers a genuine traditional village pub experience with better value, free parking, a large beer garden, and unique features like plane spotting. Plus, we're outside the ULEZ zone, saving you £12.50 if coming from London."
          },
          {
            question: "Do you get many customers from Ashford?",
            answer: "Absolutely! Many Ashford residents are regulars here, especially for our Sunday roasts, Tuesday pizza deals, and quiz nights. The 10-minute journey is worth it for the authentic pub atmosphere and better prices."
          },
          {
            question: "What's the best route from Ashford to avoid traffic?",
            answer: "The quickest route is via the A30 westbound. To avoid Heathrow traffic during peak times, you can go through Ashford Common and Bedfont. Our postcode TW19 6AQ works perfectly with sat nav."
          },
          {
            question: "Do you host private events for Ashford groups?",
            answer: "Yes! We regularly host birthday parties, corporate events, and celebrations for Ashford residents. We have spaces for groups from 20 to 250 people. Contact us to discuss your requirements."
          }
        ]}
        className="bg-white"
      />

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Worth the Trip from Ashford
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join your Ashford neighbors who've discovered their new favorite pub
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
              href="/special-offers"
              variant="primary"
              size="lg"
              className="flex-1 bg-white text-anchor-green hover:bg-gray-100"
            >
              🎉 View Offers
            </CallToAction>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Just 10 minutes from Ashford • Free Parking • Outside ULEZ Zone
          </p>
        </div>
      </section>
    </>
  )
}