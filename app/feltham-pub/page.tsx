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
  title: 'Feltham Pub | The Anchor - 10 Minutes Away | Surrey',
  description: 'The Anchor pub is just 10 minutes from Feltham. Traditional British pub with free parking, great food, and regular events. A peaceful Surrey alternative to busy Feltham high street pubs.',
  keywords: 'feltham pub, pub near feltham, feltham surrey pub, pub with parking feltham, traditional pub feltham',
  openGraph: {
    title: 'The Anchor - Your Local Pub Near Feltham',
    description: 'Just 10 minutes from Feltham with free parking and great food.',
    images: ['/images/hero/the-anchor-pub-exterior-stanwell-moor.jpg'],
  },
}

export default function FelthamPubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Feltham Pub', url: '/feltham-pub' }
  ])

  const directionsSchema = generateHowToDirectionsSchema(
    "Feltham Town Centre",
    "The Anchor Pub",
    [
      "From Feltham High Street, head south on Bedfont Lane",
      "Continue for 1.5 miles through Bedfont",
      "At the roundabout, take the 2nd exit onto Staines Road",
      "After 0.8 miles, turn right onto Horton Road",
      "Continue for 0.5 miles",
      "The Anchor is on your left with free parking"
    ]
  )

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "name": "The Anchor - Feltham's Local Pub",
    "description": "Traditional British pub serving Feltham residents with great food, drinks, and entertainment.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Horton Road",
      "addressLocality": "Stanwell Moor",
      "addressRegion": "Surrey",
      "postalCode": "TW19 6AQ",
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": "Feltham",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Surrey"
      }
    },
    "telephone": "+441753682707",
    "url": "https://the-anchor.pub/feltham-pub"
  }


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, breadcrumbSchema, directionsSchema]) }}
      />
      
      {/* Hero Section */}
      <PageHeaderWrapper
        route="/feltham-pub"
        title="Your Local Pub Near Feltham"
        description="Just 10 minutes away with free parking"
        showStatusBar={true}
      />

      {/* Distance & Benefits */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-4">
                Feltham's Favourite Surrey Escape
              </h2>
              <p className="text-xl text-gray-700">
                Escape the hustle of Feltham High Street for a proper traditional pub experience
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-anchor-gold text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  10min
                </div>
                <h3 className="font-bold text-lg mb-2">Quick Drive</h3>
                <p className="text-gray-600">Just 10 minutes from Feltham via Bedfont Lane</p>
              </div>
              <div className="text-center">
                <div className="bg-anchor-gold text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌳</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Peaceful Setting</h3>
                <p className="text-gray-600">Village atmosphere away from busy Feltham traffic</p>
              </div>
              <div className="text-center">
                <div className="bg-anchor-gold text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✈️</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Plane Spotting</h3>
                <p className="text-gray-600">Unique beer garden under the Heathrow flight path</p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-6">
                Why Feltham Residents Choose The Anchor
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Free parking - no time limits or charges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Traditional pub atmosphere you won't find in chain venues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Our celebrated Sunday roasts worth the short journey</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Regular entertainment including drag shows and quiz nights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Perfect for Feltham work colleagues' gatherings</span>
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
              How to Find Us from Feltham
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4">Driving Directions</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">1.</span>
                    From Feltham High Street, head south on Bedfont Lane
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">2.</span>
                    Continue for 1.5 miles through Bedfont
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">3.</span>
                    At the roundabout, take the 2nd exit onto Staines Road
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">4.</span>
                    After 0.8 miles, turn right onto Horton Road
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">5.</span>
                    Continue for 0.5 miles
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">6.</span>
                    The Anchor is on your left - ample free parking available
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-4">Local Landmarks</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-anchor-green">From Feltham Station:</p>
                    <p className="text-gray-600">10-minute drive via Bedfont Lane, or take the 117 bus towards Staines.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-anchor-green">Near Bedfont Lakes:</p>
                    <p className="text-gray-600">We're just 5 minutes from Bedfont Lakes Business Park - perfect for after-work drinks.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-anchor-green">From The Centre Feltham:</p>
                    <p className="text-gray-600">Head south on Bedfont Lane, follow signs for Staines/Stanwell.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers for Feltham */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green mb-8 text-center">
              Perfect for Feltham Groups
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="font-bold text-xl text-anchor-green mb-4">Work Gatherings</h3>
                <p className="text-gray-600 mb-4">
                  Popular with teams from Feltham's business parks. Private areas available for corporate events.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Buffet menus from £12pp</li>
                  <li>• Reserved areas available</li>
                  <li>• Free parking for all guests</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="font-bold text-xl text-anchor-green mb-4">Weekend Escapes</h3>
                <p className="text-gray-600 mb-4">
                  Join Feltham locals who make The Anchor their weekend destination.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Saturday drag shows</li>
                  <li>• Sunday roasts (book ahead)</li>
                  <li>• Quiz nights & bingo</li>
                </ul>
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
            question: "How far is The Anchor from Feltham?",
            answer: "The Anchor is just 10 minutes (3.2 miles) from Feltham town centre. An easy drive via Bedfont Lane and Staines Road, with free parking available on arrival."
          },
          {
            question: "Is there a bus from Feltham to The Anchor?",
            answer: "Yes, the 117 bus route connects Feltham to nearby Stanwell Moor. From the bus stop, it's a short 5-minute walk to The Anchor. Alternatively, it's a quick 10-minute drive with free parking."
          },
          {
            question: "Do you deliver to Feltham?",
            answer: "We offer takeaway service for all our food menu items - just call ahead on 01753 682707 to place your order for collection. We don't currently offer delivery, but you're welcome to collect your order from our Stanwell Moor location."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Experience the Difference
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            See why so many Feltham residents make the short journey to The Anchor
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