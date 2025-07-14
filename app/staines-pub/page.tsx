import Image from 'next/image'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { BusinessHours } from '@/components/BusinessHours'
import { Metadata } from 'next'
import { CONTACT, BRAND, PARKING, HEATHROW_TIMES } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Staines Pub | ${BRAND.nameWithLocation} | Traditional British Pub Near Staines`,
  description: 'The Anchor is a traditional British pub just 8 minutes from Staines. Enjoy Sunday roasts, BOGOF pizza deals, drag shows, and quiz nights. Free parking and dog-friendly.',
  keywords: 'staines pub, pubs in staines, staines upon thames pub, traditional pub staines, british pub near staines, staines restaurants',
  openGraph: {
    title: 'The Anchor - Traditional Pub Near Staines',
    description: 'Just 8 minutes from Staines. Sunday roasts, entertainment, and free parking.',
    images: ['/images/the-anchor-pub-stanwell-moor.jpg'],
  },
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How far is The Anchor from Staines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Anchor is just 8 minutes drive from Staines town centre via the A30. We're located on Horton Road in Stanwell Moor, with free parking available."
      }
    },
    {
      "@type": "Question", 
      "name": "What makes The Anchor different from other Staines pubs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer unique entertainment including drag shows and quiz nights, famous Sunday roasts, BOGOF pizza deals on Tuesdays and Wednesdays, plus a dog-friendly beer garden with plane spotting views of Heathrow."
      }
    },
    {
      "@type": "Question",
      "name": "Do you have parking at your Staines area pub?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": `Yes! We have ${PARKING.description} with space for ${PARKING.capacity} cars, plus extended parking nearby if needed.`
      }
    }
  ]
}

export default function StainesPubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, faqSchema]) }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center mt-20">
        <Image
          src="/images/the-anchor-pub-stanwell-moor.jpg"
          alt="The Anchor pub near Staines - exterior view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-anchor-gold text-white font-semibold text-lg px-6 py-2 rounded-full inline-block mb-6">
              📍 Just 8 Minutes from Staines
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Your Local Staines Pub
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Traditional British pub serving the Staines community with great food, 
              entertainment, and a warm welcome
            </p>
            
            <StatusBar />
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CallToAction href={CONTACT.phoneHref} variant="primary" size="lg">
                📞 Call {CONTACT.phone}
              </CallToAction>
              <CallToAction href="/food-menu" variant="secondary" size="lg">
                View Our Menu
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose The Anchor */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-4">
              Why Staines Locals Love The Anchor
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
              Just a short drive from Staines town centre, we're the perfect escape for a proper pub experience
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-anchor-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚗</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Easy Access from Staines</h3>
                <p className="text-gray-700">
                  8 minutes via A30<br/>
                  Free parking for {PARKING.capacity} cars<br/>
                  Regular bus service
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-anchor-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🍽️</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Famous Sunday Roasts</h3>
                <p className="text-gray-700">
                  Award-winning roasts<br/>
                  Pre-order by Saturday 1pm<br/>
                  Regular menu also available
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-anchor-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎭</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Unique Entertainment</h3>
                <p className="text-gray-700">
                  Drag shows monthly<br/>
                  Quiz nights weekly<br/>
                  Live sports coverage
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-anchor-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🍕</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">BOGOF Pizza Deal</h3>
                <p className="text-gray-700">
                  Every Tuesday & Wednesday<br/>
                  Buy one get one free<br/>
                  All stone-baked pizzas
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-anchor-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌳</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Beer Garden Paradise</h3>
                <p className="text-gray-700">
                  Dog-friendly outdoor space<br/>
                  Heathrow plane spotting<br/>
                  Covered seating available
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-anchor-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-anchor-green mb-2">Community Hub</h3>
                <p className="text-gray-700">
                  Private function room<br/>
                  Birthday parties welcome<br/>
                  Corporate events catered
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey from Staines */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-12">
              Getting Here from Staines
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-anchor-green mb-4">🚗 By Car (8 minutes)</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Head west on the A30 from Staines town centre</li>
                  <li>2. Continue through Stanwell village</li>
                  <li>3. Turn left onto Horton Road</li>
                  <li>4. The Anchor is on your right with free parking</li>
                </ol>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-anchor-green mb-4">🚌 By Public Transport</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Bus routes from Staines Bus Station</li>
                  <li>• Regular services throughout the day</li>
                  <li>• Stop: Horton Road/The Anchor</li>
                  <li>• Journey time: 15-20 minutes</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-anchor-green text-white rounded-xl p-6 text-center">
              <p className="text-lg font-semibold mb-2">
                Also conveniently located near:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-white/90">
                <span>• Heathrow T5: {HEATHROW_TIMES.terminal5} mins</span>
                <span>• Ashford: 10 mins</span>
                <span>• Sunbury: 15 mins</span>
                <span>• Feltham: 12 mins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's On This Week */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-12">
              What's On at Your Staines Local
            </h2>
            
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
                <p className="text-gray-700">Fabulous drag shows with dinner. Check our events page for dates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-8">
              Opening Hours
            </h2>
            <BusinessHours />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visit Staines' Favourite Local Pub
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Just 8 minutes from Staines town centre with free parking
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CallToAction href={CONTACT.phoneHref} variant="secondary" size="lg">
              📞 Book Your Table
            </CallToAction>
            <CallToAction 
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor" 
              variant="outline" 
              size="lg"
              className="!text-white !border-white hover:!bg-white hover:!text-anchor-green"
            >
              📍 Get Directions from Staines
            </CallToAction>
          </div>
          
          <div className="mt-8 text-white/80">
            <p className="font-semibold mb-2">Find us at:</p>
            <address className="not-italic">
              {CONTACT.address.street}, {CONTACT.address.town}, {CONTACT.address.county} {CONTACT.address.postcode}
            </address>
          </div>
        </div>
      </section>
    </>
  )
}