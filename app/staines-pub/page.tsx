import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { BusinessHours } from '@/components/BusinessHours'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { CONTACT, BRAND, PARKING, HEATHROW_TIMES } from '@/lib/constants'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { PhoneButton } from '@/components/PhoneButton'

export const metadata: Metadata = {
  title: `Staines Pub | ${BRAND.nameWithLocation} | Traditional British Pub Near Staines`,
  description: 'The Anchor - traditional British pub 8 mins from Staines. Sunday roasts, BOGOF pizza deals, drag shows & quiz nights. Free parking. Dog-friendly.',
  keywords: 'staines pub, pubs in staines, staines upon thames pub, traditional pub staines, british pub near staines, staines restaurants',
  openGraph: {
    title: 'The Anchor - Traditional Pub Near Staines',
    description: 'Just 8 minutes from Staines. Sunday roasts, entertainment, and free parking.',
    images: ['/images/the-anchor-pub-stanwell-moor.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'The Anchor - Traditional Pub Near Staines',
    description: 'Just 8 minutes from Staines. Sunday roasts, entertainment, and free parking.',
    images: ['/images/the-anchor-pub-stanwell-moor.jpg']
  })
}

// Schema for local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  "@id": "https://the-anchor.pub/staines-pub#business",
  "name": BRAND.name,
  "description": "Traditional British pub serving Staines and surrounding areas",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": CONTACT.address.street,
    "addressLocality": CONTACT.address.town,
    "addressRegion": CONTACT.address.county,
    "postalCode": CONTACT.address.postcode,
    "addressCountry": CONTACT.address.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": CONTACT.coordinates.lat,
    "longitude": CONTACT.coordinates.lng
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Staines-upon-Thames"
    },
    {
      "@type": "City", 
      "name": "Stanwell Moor"
    },
    {
      "@type": "City",
      "name": "Stanwell"
    }
  ],
  "priceRange": "££",
  "servesCuisine": ["British", "Pizza", "Sunday Roast"],
  "hasMenu": "https://the-anchor.pub/food-menu",
  "telephone": CONTACT.phoneIntl,
  "url": "https://the-anchor.pub"
}


export default function StainesPubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema]) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/staines-pub"
        title="Your Local Staines Pub"
        description="Traditional British pub serving the Staines community with great food, entertainment, and a warm welcome"
        size="medium"
        showStatusBar={true}
        tags={[
          { label: "📍 Just 8 Minutes from Staines", variant: "warning" }
        ]}
        cta={
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PhoneButton
              phone={CONTACT.phone}
              source="staines_pub_hero"
              variant="primary"
              size="lg"
            >
              📞 Call {CONTACT.phone}
            </PhoneButton>
            <Link href="/food-menu">
              <Button variant="secondary" size="lg">
                View Our Menu
              </Button>
            </Link>
          </div>
        }
      />

      {/* Why Choose The Anchor */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Why Staines Locals Love The Anchor"
              subtitle="Just a short drive from Staines town centre, we're the perfect escape for a proper pub experience"
              className="text-center mb-12"
            />
            
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "🚗",
                  title: "Easy Access from Staines",
                  description: `8 minutes via A30\nFree parking for ${PARKING.capacity} cars\nRegular bus service`,
                  className: "text-center"
                },
                {
                  icon: "🍽️",
                  title: "Famous Sunday Roasts",
                  description: "Our renowned roasts\nPre-order by Saturday 1pm\nRegular menu also available",
                  className: "text-center"
                },
                {
                  icon: "🎭",
                  title: "Unique Entertainment",
                  description: "Drag shows monthly\nQuiz nights monthly\nLive sports coverage",
                  className: "text-center"
                },
                {
                  icon: "🍕",
                  title: "BOGOF Pizza Deal",
                  description: "Every Tuesday & Wednesday\nBuy one get one free\nAll stone-baked pizzas",
                  className: "text-center"
                },
                {
                  icon: "🌳",
                  title: "Beer Garden Paradise",
                  description: "Dog-friendly outdoor space\nHeathrow plane spotting\nCovered seating available",
                  className: "text-center"
                },
                {
                  icon: "👥",
                  title: "Community Hub",
                  description: "Private function room\nBirthday parties welcome\nCorporate events catered",
                  className: "text-center"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Journey from Staines */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Getting Here from Staines"
              className="text-center mb-12"
            />
            
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "🚗 By Car (8 minutes)",
                  content: (
                    <ol className="space-y-2 list-decimal list-inside">
                      <li>Head west on the A30 from Staines town centre</li>
                      <li>Continue through Stanwell village</li>
                      <li>Turn left onto Horton Road</li>
                      <li>The Anchor is on your right with free parking</li>
                    </ol>
                  ),
                  variant: "colored",
                  color: "bg-amber-50"
                },
                {
                  title: "🚌 By Public Transport",
                  content: (
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Bus routes from Staines Bus Station
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Regular services throughout the day
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Stop: Horton Road/The Anchor
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Journey time: 15-20 minutes
                      </li>
                    </ul>
                  ),
                  variant: "colored",
                  color: "bg-blue-50"
                }
              ]}
            />
            
            <AlertBox
              variant="success"
              title="Also conveniently located near:"
              className="mt-8 text-center"
              content={
                <div className="flex flex-wrap justify-center gap-4">
                  <span>• Heathrow T5: {HEATHROW_TIMES.terminal5} mins</span>
                  <span>• Ashford: 10 mins</span>
                  <span>• Sunbury: 15 mins</span>
                  <span>• Feltham: 12 mins</span>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* What's On This Week */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="What's On at Your Staines Local"
              className="text-center mb-12"
            />
            
            <div className="space-y-6">
              <div className="border-l-4 border-anchor-gold bg-anchor-cream/50 p-6 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-anchor-green">Tuesday & Wednesday</h3>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">BOGOF</span>
                </div>
                <p className="text-gray-700">Buy One Get One Free on all pizzas! No voucher needed.</p>
              </div>
              
              <div className="border-l-4 border-anchor-gold bg-anchor-cream/50 p-6 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-anchor-green">Thursday</h3>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">QUIZ</span>
                </div>
                <p className="text-gray-700">Quiz Night from 8pm - Win bar tabs and prizes!</p>
              </div>
              
              <div className="border-l-4 border-anchor-gold bg-anchor-cream/50 p-6 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-anchor-green">Sunday</h3>
                  <span className="bg-anchor-green text-white px-3 py-1 rounded-full text-sm font-semibold">ROASTS</span>
                </div>
                <p className="text-gray-700">Famous Sunday roasts served 12pm-5pm. Pre-order by Saturday 1pm.</p>
              </div>
              
              <div className="border-l-4 border-anchor-gold bg-anchor-cream/50 p-6 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-anchor-green">Monthly</h3>
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">DRAG</span>
                </div>
                <p className="text-gray-700">Fabulous drag shows with dinner. Cheque our events page for dates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Venue Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Popular Venue for Staines Events"
              subtitle="Host your special occasion at The Anchor - just 8 minutes from Staines"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-anchor-green mb-4">Perfect for Staines Residents</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span><strong>Quick journey</strong> - Just 8 minutes from Staines town centre</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span><strong>Free parking</strong> - No expensive town centre rates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span><strong>Competitive prices</strong> - Better value than Staines venues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span><strong>Flexible spaces</strong> - From intimate gatherings to large parties</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="text-xl font-bold text-anchor-green mb-4">Popular Events from Staines</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-anchor-gold mb-1">🎉 Birthday Parties</h4>
                    <p className="text-sm text-gray-700">Celebrate milestones with custom packages</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anchor-gold mb-1">💼 Corporate Events</h4>
                    <p className="text-sm text-gray-700">Team meetings and Christmas parties</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anchor-gold mb-1">💑 Wedding Receptions</h4>
                    <p className="text-sm text-gray-700">Beautiful venue for your special day</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anchor-gold mb-1">🕊️ Memorial Services</h4>
                    <p className="text-sm text-gray-700">Respectful space for celebrations of life</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <p className="text-lg text-gray-800 mb-4">
                <strong>Flexible venue hire pricing!</strong> Tailored to your event. 
                We're always willing to discuss your needs and budget.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/book-event">
                  <Button variant="primary" size="md">
                    View Event Options
                  </Button>
                </Link>
                <PhoneButton
                  phone="01753 682707"
                  source="staines_pub_event_enquiry"
                  variant="secondary"
                  size="md"
                >
                  📞 Quick Enquiry
                </PhoneButton>
                <Link href="https://wa.me/441753682707?text=Hi,%20I" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="md">
                    💬 WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title="Opening Hours"
              className="text-center mb-8"
            />
            <BusinessHours />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far is The Anchor from Staines?",
            answer: "The Anchor is just 8 minutes drive from Staines town centre via the A30. We're located on Horton Road in Stanwell Moor, with free parking available."
          },
          {
            question: "What makes The Anchor different from other Staines pubs?",
            answer: "We offer unique entertainment including drag shows and quiz nights, famous Sunday roasts, BOGOF pizza deals on Tuesdays, plus a dog-friendly beer garden with plane spotting views of Heathrow."
          },
          {
            question: "Do you have parking at your Staines area pub?",
            answer: `Yes! We have ${PARKING.description} with space for ${PARKING.capacity} cars, plus extended parking nearby if needed.`
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <CTASection
        title="Visit Staines' Favourite Local Pub"
        description="Just 8 minutes from Staines town centre with free parking"
        buttons={[
          {
            text: "📞 Book Your Table",
            href: CONTACT.phoneHref,
            isPhone: true,
            phoneSource: "staines_pub_cta",
            variant: "secondary"
          },
          {
            text: "📍 Get Directions from Staines",
            href: "https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor",
            variant: "outline",
            className: "!text-white !border-white hover:!bg-white hover:!text-anchor-green"
          }
        ]}
        variant="green"
      >
        <div className="mt-6 text-white/90">
          <p className="font-semibold mb-2">Find us at:</p>
          <address className="not-italic">
            {CONTACT.address.street}, {CONTACT.address.town}, {CONTACT.address.county} {CONTACT.address.postcode}
          </address>
        </div>
      </CTASection>
    </>
  )
}