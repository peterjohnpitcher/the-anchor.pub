import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { BusinessHours } from '@/components/BusinessHours'
import { PageHeaderWrapper } from '@/components/ui/PageHeaderWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { generateBreadcrumbSchema, generateHowToDirectionsSchema } from '@/lib/enhanced-schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Egham Pub | The Anchor - 12 Minutes Away | Surrey',
  description: 'The Anchor pub is just 12 minutes from Egham. Traditional Surrey pub with free parking, great food, and regular events. A peaceful alternative to busy Egham high street, perfect for Royal Holloway students and staff.',
  keywords: 'egham pub, pub near egham, egham surrey pub, royal holloway pub, pub near royal holloway, traditional pub egham',
  openGraph: {
    title: 'The Anchor - Your Local Pub Near Egham',
    description: 'Just 12 minutes from Egham with free parking and great food.',
    images: ['/images/hero/the-anchor-pub-exterior-stanwell-moor.jpg'],
  },
}

export default function EghamPubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Egham Pub', url: '/egham-pub' }
  ])

  const directionsSchema = generateHowToDirectionsSchema(
    "Egham Town Centre",
    "The Anchor Pub",
    [
      "From Egham High Street, take the A30 towards Staines",
      "After 2 miles, turn left onto A308 Staines bypass",
      "At the roundabout, take the 3rd exit onto A3044",
      "Continue for 1.5 miles",
      "Turn right onto Horton Road",
      "The Anchor is 200 yards on your right with free parking"
    ]
  )

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "name": "The Anchor - Egham's Local Pub",
    "description": "Traditional British pub serving Egham residents and Royal Holloway students with great food, drinks, and entertainment.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Horton Road",
      "addressLocality": "Stanwell Moor",
      "addressRegion": "Surrey",
      "postalCode": "TW19 6AQ",
      "addressCountry": "GB"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Egham"
      },
      {
        "@type": "Place",
        "name": "Royal Holloway University"
      }
    ],
    "telephone": "+441753682707",
    "url": "https://the-anchor.pub/egham-pub"
  }


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, breadcrumbSchema, directionsSchema]) }}
      />
      
      {/* Hero Section */}
      <PageHeaderWrapper
        route="/egham-pub"
        title="Your Local Pub Near Egham"
        description="Just 12 minutes away with free parking"
        showStatusBar={true}
      />

      {/* Distance & Benefits */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-4">
                Egham's Favourite Surrey Escape
              </h2>
              <p className="text-xl text-gray-700">
                Worth the short drive for a proper traditional pub experience
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-anchor-gold text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  12min
                </div>
                <h3 className="font-bold text-lg mb-2">Quick Journey</h3>
                <p className="text-gray-600">Just 12 minutes from Egham via A30</p>
              </div>
              <div className="text-center">
                <div className="bg-anchor-gold text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Student Friendly</h3>
                <p className="text-gray-600">Popular with Royal Holloway students & staff</p>
              </div>
              <div className="text-center">
                <div className="bg-anchor-gold text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Great Value</h3>
                <p className="text-gray-600">Competitive prices compared to Egham venues</p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-6">
                Why Egham Residents & Students Choose The Anchor
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Free parking - no expensive Egham parking charges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Traditional pub atmosphere away from chain venues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Perfect for Royal Holloway society meetups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Regular quiz nights - build your own team</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Our celebrated Sunday roasts worth the journey</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green mb-8 text-center">
              How to Find Us from Egham
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4">From Egham Town Centre</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">1.</span>
                    Take the A30 towards Staines
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">2.</span>
                    After 2 miles, turn left onto A308 Staines bypass
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">3.</span>
                    At the roundabout, take 3rd exit onto A3044
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">4.</span>
                    Continue for 1.5 miles
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">5.</span>
                    Turn right onto Horton Road
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">6.</span>
                    The Anchor is on your right with free parking
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-4">From Royal Holloway</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">1.</span>
                    Exit campus and join A30 towards Staines
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">2.</span>
                    Follow A30 for 3 miles
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">3.</span>
                    Turn left onto A308 (Staines bypass)
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">4.</span>
                    Follow directions above from step 3
                  </li>
                </ol>
              </div>
            </div>

            <div className="mt-8 p-6 bg-purple-50 rounded-xl">
              <h3 className="font-bold text-xl text-anchor-green mb-3">Royal Holloway Students</h3>
              <p className="text-gray-700">
                Organising a society event? We offer special rates for Royal Holloway societies and sports teams. 
                Perfect for end-of-term celebrations, social mixers, and team dinners. Contact us for group bookings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student & Local Offers */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green mb-8 text-center">
              Perfect for Egham Groups
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="font-bold text-xl text-anchor-green mb-4">Royal Holloway Specials</h3>
                <p className="text-gray-600 mb-4">
                  Show your Royal Holloway ID for exclusive offers
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 10% off food (Mon-Thu)</li>
                  <li>• Society booking discounts</li>
                  <li>• End-of-term party packages</li>
                  <li>• Quiz team entry discounts</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="font-bold text-xl text-anchor-green mb-4">Egham Favourites</h3>
                <p className="text-gray-600 mb-4">
                  Join other Egham locals who make the journey
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Tuesday Pizza BOGOF</li>
                  <li>• Wednesday Quiz Nights</li>
                  <li>• Saturday Drag Shows</li>
                  <li>• Sunday Roast (book early)</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center bg-anchor-cream p-8 rounded-xl">
              <h3 className="font-bold text-xl text-anchor-green mb-4">Transport Options</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-2">Designated Drivers</p>
                  <p className="text-gray-600">Free soft drinks for designated drivers in groups of 4+</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Taxi Services</p>
                  <p className="text-gray-600">We can arrange taxis back to Egham/Royal Holloway</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="section-spacing bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green mb-8 text-center">
              Opening Hours
            </h2>
            <BusinessHours />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far is The Anchor from Egham?",
            answer: "The Anchor is just 12 minutes (4.5 miles) from Egham town centre via the A30 and A3044. We offer free parking, making us a great alternative to paid parking in Egham high street."
          },
          {
            question: "Is The Anchor popular with Royal Holloway students?",
            answer: "Yes! Many Royal Holloway students and staff visit The Anchor for our relaxed atmosphere, student-friendly prices, and regular events. We're just 15 minutes from the university campus."
          },
          {
            question: "Can you host Royal Holloway society events?",
            answer: "Absolutely! We regularly host Royal Holloway society events, sports team celebrations, and end-of-term parties. We offer special group rates and can reserve areas for your society."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Worth the Journey from Egham
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover why so many Egham residents and Royal Holloway students make The Anchor their regular
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
              href="/find-us"
              variant="white"
              size="lg"
            >
              📍 Get Directions
            </CallToAction>
          </div>
          <p className="mt-8 text-white/80">
            Horton Road, Stanwell Moor, Surrey TW19 6AQ
          </p>
        </div>
      </section>
    </>
  )
}