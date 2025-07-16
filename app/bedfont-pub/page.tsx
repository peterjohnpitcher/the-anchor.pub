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
  title: 'Bedfont Pub | The Anchor - 5 Minutes Away | Surrey',
  description: 'The Anchor pub is just 5 minutes from Bedfont. Your nearest traditional British pub with free parking, great food, and regular events. The perfect local for East and West Bedfont residents.',
  keywords: 'bedfont pub, pub near bedfont, bedfont surrey pub, east bedfont pub, west bedfont pub, bedfont lakes pub',
  openGraph: {
    title: 'The Anchor - Your Local Pub Near Bedfont',
    description: 'Just 5 minutes from Bedfont with free parking and great food.',
    images: ['/images/hero/the-anchor-pub-exterior-stanwell-moor.jpg'],
  },
}

export default function BedfontPubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Bedfont Pub', url: '/bedfont-pub' }
  ])

  const directionsSchema = generateHowToDirectionsSchema(
    "Bedfont",
    "The Anchor Pub",
    [
      "From Bedfont Green, head south on Staines Road",
      "Continue for 0.8 miles",
      "Turn left onto Horton Road",
      "Continue for 0.5 miles",
      "The Anchor is on your left with free parking"
    ]
  )

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "name": "The Anchor - Bedfont's Local Pub",
    "description": "Traditional British pub serving Bedfont residents with great food, drinks, and entertainment.",
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
        "@type": "Place",
        "name": "Bedfont"
      },
      {
        "@type": "Place",
        "name": "East Bedfont"
      },
      {
        "@type": "Place",
        "name": "West Bedfont"
      }
    ],
    "telephone": "+441753682707",
    "url": "https://the-anchor.pub/bedfont-pub"
  }


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, breadcrumbSchema, directionsSchema]) }}
      />
      
      {/* Hero Section */}
      <PageHeaderWrapper
        route="/bedfont-pub"
        title="Bedfont's Closest Traditional Pub"
        description="Just 5 minutes away with free parking"
        showStatusBar={true}
      />

      {/* Distance & Benefits */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-4">
                The Anchor - Bedfont's Best Kept Secret
              </h2>
              <p className="text-xl text-gray-700">
                Your nearest proper British pub - just 5 minutes from both East and West Bedfont
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-anchor-gold text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  5min
                </div>
                <h3 className="font-bold text-lg mb-2">Closest Pub</h3>
                <p className="text-gray-600">Just 5 minutes from Bedfont - your nearest traditional pub</p>
              </div>
              <div className="text-center">
                <div className="bg-anchor-gold text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Business Friendly</h3>
                <p className="text-gray-600">Popular with Bedfont Lakes Business Park workers</p>
              </div>
              <div className="text-center">
                <div className="bg-anchor-gold text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏘️</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Community Hub</h3>
                <p className="text-gray-600">Where East and West Bedfont residents meet</p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-6">
                Why Bedfont Residents Love The Anchor
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Your nearest traditional pub - no need to travel to Feltham or Staines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Perfect meeting point for East and West Bedfont friends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Free parking for all - essential for family gatherings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Dog-friendly throughout - perfect for Bedfont dog walkers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-anchor-gold mr-3">✓</span>
                  <span>Regular quiz nights popular with Bedfont teams</span>
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
              Easy to Find from Bedfont
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4">From East Bedfont</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">1.</span>
                    Head west on Staines Road from Bedfont Green
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">2.</span>
                    Continue for 0.8 miles past the cemetery
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">3.</span>
                    Turn left onto Horton Road
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">4.</span>
                    The Anchor is 0.5 miles on your left
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-4">From West Bedfont</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">1.</span>
                    Take Bedfont Road heading south
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">2.</span>
                    Turn left onto Staines Road
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">3.</span>
                    After 0.3 miles, turn left onto Horton Road
                  </li>
                  <li className="flex">
                    <span className="text-anchor-gold font-bold mr-3">4.</span>
                    The Anchor is on your left with parking
                  </li>
                </ol>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="font-bold text-xl text-anchor-green mb-3">From Bedfont Lakes Business Park</h3>
              <p className="text-gray-700">
                Just 7 minutes via Bedfont Road and Staines Road. Perfect for lunch meetings, after-work drinks, 
                or team celebrations. We offer reserved areas for corporate groups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Features */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green mb-8 text-center">
              Perfect for Bedfont Locals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="font-bold text-xl text-anchor-green mb-4">Family Gatherings</h3>
                <p className="text-gray-600 mb-4">
                  The go-to venue for Bedfont family celebrations
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Children's menu available</li>
                  <li>• High chairs provided</li>
                  <li>• Family-friendly - children always welcome</li>
                  <li>• Birthday party packages</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="font-bold text-xl text-anchor-green mb-4">Local Groups Welcome</h3>
                <p className="text-gray-600 mb-4">
                  Home to many Bedfont clubs and societies
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Monthly quiz nights with local teams</li>
                  <li>• Darts league participants</li>
                  <li>• Book clubs meet here</li>
                  <li>• Walking groups finish point</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="font-bold text-xl text-anchor-green mb-4">Weekly Highlights for Bedfont</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-anchor-cream p-4 rounded-lg">
                  <p className="font-bold">Tuesday</p>
                  <p className="text-gray-600">Pizza BOGOF Night</p>
                </div>
                <div className="bg-anchor-cream p-4 rounded-lg">
                  <p className="font-bold">Wednesday</p>
                  <p className="text-gray-600">Quiz Night</p>
                </div>
                <div className="bg-anchor-cream p-4 rounded-lg">
                  <p className="font-bold">Saturday</p>
                  <p className="text-gray-600">Drag Shows</p>
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
            question: "How far is The Anchor from Bedfont?",
            answer: "The Anchor is just 5 minutes (1.5 miles) from Bedfont. We're the closest traditional British pub to both East and West Bedfont, with free parking available."
          },
          {
            question: "Is The Anchor walkable from Bedfont?",
            answer: "Yes, it's about a 20-minute walk from Bedfont Green via Staines Road and Horton Road. Many Bedfont residents enjoy the walk, especially in good weather, though most prefer the quick 5-minute drive."
          },
          {
            question: "Do you serve Bedfont Lakes Business Park?",
            answer: "Yes! We're very popular with workers from Bedfont Lakes Business Park. We offer versatile venue spaces for corporate events, team meetings, and celebrations. With comprehensive catering options and our preferred vendor network, we're perfect for business functions. Just 7 minutes away with free parking."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Your Nearest Traditional Pub
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join your Bedfont neighbours at The Anchor - where everyone knows your name
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