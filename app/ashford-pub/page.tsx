import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { BusinessHours } from '@/components/BusinessHours'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { generateBreadcrumbSchema, generateHowToDirectionsSchema } from '@/lib/enhanced-schemas'
import { Metadata } from 'next'
import { CONTACT, BRAND, PARKING } from '@/lib/constants'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'

export const metadata: Metadata = {
  title: `Ashford Pub Near Me | ${BRAND.name} - 10 Minutes from Ashford`,
  description: `${BRAND.name} - traditional British pub 10 mins from Ashford. Free parking, Sunday roasts, quiz nights & family-friendly. Easy A30 access.`,
  keywords: 'ashford pub, pub near ashford, ashford surrey pub, pubs close to ashford, british pub ashford, traditional pub near ashford',
  openGraph: {
    title: 'The Anchor - Traditional Pub Near Ashford',
    description: 'Just 10 minutes from Ashford with free parking. Sunday roasts, British classics, and regular events.',
    images: ['/images/the-anchor-pub-exterior-stanwell-moor.jpg'],
    type: 'website',
  },
  twitter: getTwitterMetadata({
    title: 'The Anchor - Traditional Pub Near Ashford',
    description: 'Just 10 minutes from Ashford with free parking. Sunday roasts, British classics, and regular events.',
    images: ['/images/the-anchor-pub-exterior-stanwell-moor.jpg']
  })
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
      'From Ashford town centre, head west on Church Road/B377',
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
      <HeroWrapper
        route="/ashford-pub"
        title="Traditional British Pub Near Ashford"
        description="Just 10 minutes from Ashford with free parking"
        size="medium"
        showStatusBar={true}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={CONTACT.phoneHref}>
              <Button variant="primary" size="lg">
                📞 Call to Book
              </Button>
            </Link>
            <Link href="/food-menu">
              <Button variant="secondary" size="lg">
                🍽️ View Menu
              </Button>
            </Link>
          </div>
        }
      />

      {/* Welcome Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Ashford's Favourite Traditional Pub Experience"
              subtitle="Just a 10-minute drive from Ashford, The Anchor offers the perfect escape from busy town life. Enjoy traditional British hospitality, fantastic food, and a warm welcome in our historic Stanwell Moor location."
            />
            
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "🚗",
                  title: "Easy Access",
                  description: "10 minutes via A30 with 20 free parking spaces",
                  variant: "colored",
                  color: "bg-anchor-cream",
                  className: "rounded-xl p-6 text-center"
                },
                {
                  icon: "🍺",
                  title: "Real Pub Feel",
                  description: "Traditional atmosphere Ashford chain pubs can't match",
                  variant: "colored",
                  color: "bg-anchor-cream",
                  className: "rounded-xl p-6 text-center"
                },
                {
                  icon: "💚",
                  title: "ULEZ Free",
                  description: "Save £12.50 - we're outside the zone!",
                  variant: "colored",
                  color: "bg-anchor-cream",
                  className: "rounded-xl p-6 text-center"
                }
              ]}
              className="mb-8"
            />
          </div>
        </div>
      </section>

      {/* Why Ashford Residents Choose Us */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Why Ashford Residents Love The Anchor"
            />
            
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
                      <strong>Free parking always available</strong> - No metres, no stress, no charges
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
                      <strong>Friday Fish Special</strong> - 50% off for over 65s on chip shop favourites
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
            
            <AlertBox
              variant="info"
              title="Plane Spotting Bonus"
              className="mt-8 text-center"
              content={
                <p className="text-lg">
                  Watch aircraft overhead every 90 seconds - entertainment Ashford pubs can't offer!
                </p>
              }
            />
          </div>
        </div>
      </section>

      {/* Popular with Ashford Groups */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Popular with Ashford Groups"
            />
            
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
              <Link href="/book-event">
      <Button 
        variant="primary"
        size="lg"
      >
        Enquire About Private Hire
      </Button>
    </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Venue for Ashford */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Event Venue for Ashford Celebrations"
              subtitle="Just 10 minutes from Ashford with free parking"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-anchor-green mb-4">Why Ashford Chooses The Anchor</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span><strong>Avoid town traffic</strong> - Easy access, ample parking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span><strong>Better value</strong> - No inflated town centre prices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span><strong>Flexible spaces</strong> - Intimate gatherings to 200 guests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span><strong>Tailored pricing for every event</strong> - Let's discuss your needs</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-anchor-green mb-4">Popular Ashford Events</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-1">🎂 Milestone Birthdays</h4>
                    <p className="text-sm text-gray-700">18th, 21st, 40th, 50th celebrations</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-1">💑 Wedding Receptions</h4>
                    <p className="text-sm text-gray-700">Beautiful venue, competitive pricing</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-1">🏆 Sports Club Events</h4>
                    <p className="text-sm text-gray-700">End of season parties, presentations</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-1">🎄 Christmas Parties</h4>
                    <p className="text-sm text-gray-700">Festive celebrations for Ashford groups</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <p className="text-lg text-gray-800 mb-4">
                <strong>Special rates for Ashford bookings!</strong> 
                We love being part of the Ashford community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/book-event">
      <Button 
        variant="primary"
        size="md"
      >
        View All Event Options
      </Button>
    </Link>
                <Link href="tel:01753682707">
      <Button 
        variant="secondary"
        size="md"
      >
        📞 Call: 01753 682707
      </Button>
    </Link>
                <Link href="https://wa.me/441753682707?text=Hi,%20I" target="_blank" rel="noopener noreferrer">
      <Button 
        variant="secondary"
        size="md"
      >
        💬 WhatsApp Us
      </Button>
    </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here from Ashford */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Getting to The Anchor from Ashford"
            />
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🚗 Driving Directions</h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-anchor-gold">1.</span>
                    <span>From Ashford centre, head west on Church Road</span>
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
                <p className="mt-4 text-sm text-gray-700">
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
              <Link href="https://maps.google.com/maps?saddr=Ashford+Surrey&daddr=The+Anchor+Stanwell+Moor+TW19+6AQ" target="_blank" rel="noopener noreferrer">
      <Button 
        variant="secondary"
        size="md"
      >
        📍 Get Directions from Ashford
      </Button>
    </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Connections */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Ashford to The Anchor - Local Connections"
            />
            
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
              Join the many Ashford residents who've discovered their new favourite pub!
            </p>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeader
              title="Opening Hours"
            />
            <BusinessHours />
            <p className="mt-4 text-gray-700">
              Kitchen closes earlier - check times for food service
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far is The Anchor from Ashford town centre?",
            answer: "The Anchor is approximately 3.5 miles from Ashford town centre, which is about a 10-minute drive via the A30. We're located in Stanwell Moor, just past Ashford Hospital."
          },
          {
            question: "Is there parking at The Anchor for Ashford visitors?",
            answer: "Yes! We have 20 free parking spaces available for all our guests. Unlike Ashford town centre, you'll never have to worry about parking metres or charges here."
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
      <CTASection
        title="Worth the Trip from Ashford"
        description="Join your Ashford neighbours who've discovered their new favourite pub"
        buttons={[
          {
            text: "📞 Book a Table",
            href: `tel:${CONTACT.phone}`,
            variant: "secondary"
          },
          {
            text: "🎉 View Offers",
            href: "/special-offers",
            variant: "white"
          }
        ]}
        variant="green"
        footer="Just 10 minutes from Ashford • Free Parking • Outside ULEZ Zone"
      />
    </>
  )
}