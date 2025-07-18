import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { BusinessHours } from '@/components/BusinessHours'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { generateBreadcrumbSchema, generateHowToDirectionsSchema } from '@/lib/enhanced-schemas'
import { Metadata } from 'next'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'

export const metadata: Metadata = {
  title: 'Egham Pub | The Anchor - 12 Minutes Away | Surrey',
  description: 'The Anchor - 12 mins from Egham. Traditional Surrey pub with free parking & great food. Perfect for Royal Holloway students. Peaceful alternative.',
  keywords: 'egham pub, pub near egham, egham surrey pub, royal holloway pub, pub near royal holloway, traditional pub egham',
  openGraph: {
    title: 'The Anchor - Your Local Pub Near Egham',
    description: 'Just 12 minutes from Egham with free parking and great food.',
    images: ['/images/hero/the-anchor-pub-exterior-stanwell-moor.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'The Anchor - Your Local Pub Near Egham',
    description: 'Just 12 minutes from Egham with free parking and great food.',
    images: ['/images/hero/the-anchor-pub-exterior-stanwell-moor.jpg']
  })
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
      <HeroWrapper
        route="/egham-pub"
        title="Your Local Pub Near Egham"
        description="Just 12 minutes away with free parking"
        size="medium"
        showStatusBar={true}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="tel:01753682707">
      <Button 
        variant="primary"
        size="lg"
      >
        📞 Call to Book
      </Button>
    </Link>
            <Link href="/food-menu">
      <Button 
        variant="secondary"
        size="lg"
      >
        🍽️ View Menu
      </Button>
    </Link>
          </div>
        }
      />

      {/* Distance & Benefits */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Egham's Favourite Surrey Escape"
              subtitle="Worth the short drive for a proper traditional pub experience"
              className="text-center mb-12"
            />

            {/* Key Benefits Grid */}
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "12min",
                  title: "Quick Journey",
                  description: "Just 12 minutes from Egham via A30",
                  className: "text-center"
                },
                {
                  icon: "🎓",
                  title: "Student Friendly",
                  description: "Popular with Royal Holloway students & staff",
                  className: "text-center"
                },
                {
                  icon: "💰",
                  title: "Great Value",
                  description: "Competitive prices compared to Egham venues",
                  className: "text-center"
                }
              ]}
              className="mb-12"
            />

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
            <SectionHeader
              title="How to Find Us from Egham"
            />
            
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

            <AlertBox
              variant="tip"
              title="Royal Holloway Students"
              className="mt-8"
              content={
                <>
                  Organising a society event? We offer special rates for Royal Holloway societies and sports teams. 
                  Perfect for end-of-term celebrations, social mixers, and team dinners. Contact us for group bookings.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Student & Local Offers */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Perfect for Egham Groups"
            />
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "Royal Holloway Specials",
                  content: (
                    <>
                      <p className="mb-3">Show your Royal Holloway ID for exclusive offers</p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          10% off food (Mon-Thu)
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          Society booking discounts
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          End-of-term party packages
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          Quiz team entry discounts
                        </li>
                      </ul>
                    </>
                  ),
                  variant: "colored",
                  color: "bg-amber-50"
                },
                {
                  title: "Egham Favourites",
                  content: (
                    <>
                      <p className="mb-3">Join other Egham locals who make the journey</p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Tuesday Pizza BOGOF
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Wednesday Quiz Nights
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Saturday Drag Shows
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Sunday Roast (book early)
                        </li>
                      </ul>
                    </>
                  ),
                  variant: "colored",
                  color: "bg-blue-50"
                }
              ]}
            />

            <div className="mt-8 text-center bg-anchor-cream p-8 rounded-xl">
              <h3 className="font-bold text-xl text-anchor-green mb-4">Transport Options</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-2">Designated Drivers</p>
                  <p className="text-gray-700">Free soft drinks for designated drivers in groups of 4+</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Taxi Services</p>
                  <p className="text-gray-700">We can arrange taxis back to Egham/Royal Holloway</p>
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
            <SectionHeader
              title="Opening Hours"
            />
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
      <CTASection
        title="Worth the Journey from Egham"
        description="Discover why so many Egham residents and Royal Holloway students make The Anchor their regular"
        buttons={[
          {
            text: "📞 Call: 01753 682707",
            href: "tel:01753682707",
            variant: "white"
          },
          {
            text: "📍 Get Directions",
            href: "/find-us",
            variant: "white"
          }
        ]}
        variant="green"
        footer="Horton Road, Stanwell Moor, Surrey TW19 6AQ"
      />
    </>
  )
}