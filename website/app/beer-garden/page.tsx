import Image from 'next/image'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { PageHeaderWrapper } from '@/components/ui/PageHeaderWrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beer Garden & Plane Spotting | The Anchor Stanwell Moor | Heathrow Flight Path',
  description: 'Unique beer garden directly under Heathrow flight path. Best plane spotting pub near Heathrow with outdoor seating, dog-friendly space, and views of aircraft every 90 seconds.',
  keywords: 'plane spotting heathrow, beer garden stanwell moor, pub garden heathrow, plane spotting pub, outdoor dining heathrow, best places for plane spotting, heathrow flight path pub',
  openGraph: {
    title: 'Beer Garden & Plane Spotting - The Anchor Pub',
    description: 'Watch planes overhead every 90 seconds while enjoying drinks in our unique beer garden',
    images: ['/images/garden/beer-garden/the-anchor-beer-garden-heathrow-flight-path.jpg'],
  },
}

const planeSpottingSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "The Anchor Beer Garden - Heathrow Plane Spotting",
  "description": "Unique pub beer garden directly under Heathrow flight path offering spectacular plane spotting opportunities",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Horton Road",
    "addressLocality": "Stanwell Moor",
    "addressRegion": "Surrey",
    "postalCode": "TW19 6AQ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.4764,
    "longitude": -0.4735
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "16:00",
    "closes": "23:00"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Outdoor Seating",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Dog Friendly",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Plane Spotting Views",
      "value": true
    }
  ]
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What planes can I see from The Anchor beer garden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You'll see all types of aircraft using Heathrow including A380s, Boeing 777s, 787 Dreamliners, and A350s. Planes pass directly overhead approximately every 90 seconds during peak times."
      }
    },
    {
      "@type": "Question",
      "name": "When is the best time for plane spotting at The Anchor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Early morning (6am-9am) and late afternoon (4pm-8pm) offer the most frequent flights. Summer evenings are particularly popular as you can enjoy drinks while watching the constant stream of aircraft."
      }
    },
    {
      "@type": "Question",
      "name": "Is the beer garden dog friendly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Dogs are very welcome in our beer garden. We provide water bowls and it's a great spot for your furry friend to relax while you enjoy plane spotting."
      }
    },
    {
      "@type": "Question",
      "name": "Can I take photos of planes from the beer garden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Our beer garden is a popular spot for aviation photographers. The planes pass low overhead providing excellent photo opportunities."
      }
    }
  ]
}

export default function BeerGardenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([planeSpottingSchema, faqSchema]) }}
      />
      
      {/* Hero Section */}
      <PageHeaderWrapper
        route="/beer-garden"
        title="Beer Garden & Plane Spotting"
        description="Watch aircraft every 90 seconds while enjoying a pint"
        minHeight="min-h-[70vh]"
        showStatusBar={true}
      >
        <div className="bg-white/90 backdrop-blur-sm text-anchor-green font-bold text-lg md:text-xl px-6 py-3 rounded-full inline-block mb-6">
          ✈️ DIRECTLY UNDER THE FLIGHT PATH ✈️
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="tag bg-white/90 backdrop-blur-sm">🛬 Every 90 Seconds</span>
          <span className="tag bg-white/90 backdrop-blur-sm">📸 Photo Opportunities</span>
          <span className="tag bg-white/90 backdrop-blur-sm">🐕 Dog Friendly</span>
          <span className="tag bg-white/90 backdrop-blur-sm">🍺 Full Bar Service</span>
        </div>
      </PageHeaderWrapper>

      {/* Plane Spotting Paradise */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green text-center mb-12">
              Heathrow's Best Kept Secret for Plane Spotting
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-sky-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Why Aviation Enthusiasts Love Us</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-2xl">✈️</span>
                    <div>
                      <strong>Perfect Position:</strong> Directly under the Heathrow approach path
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">👀</span>
                    <div>
                      <strong>Low & Loud:</strong> Aircraft pass at approximately 500-800 feet
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">📸</span>
                    <div>
                      <strong>Photo Friendly:</strong> Unobstructed views perfect for photography
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">🍺</span>
                    <div>
                      <strong>Refreshments:</strong> Full bar service delivered to your table
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <strong>FlightRadar24:</strong> Free WiFi to track incoming flights
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">What You'll See</h3>
                <div className="space-y-2 mb-6">
                  <p className="font-semibold">Common Aircraft Types:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Airbus A380 "Superjumbo"</li>
                    <li>Boeing 777 & 787 Dreamliner</li>
                    <li>Airbus A350 & A330</li>
                    <li>Boeing 747 (increasingly rare!)</li>
                    <li>Various narrow-body aircraft</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Peak Times:</strong> 6am-9am & 4pm-8pm<br />
                    <strong>Frequency:</strong> Every 90 seconds (peak)<br />
                    <strong>Wind Direction:</strong> Westerly operations (70% of year)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-anchor-sand/30 rounded-2xl p-8 text-center">
              <p className="text-lg text-gray-700 mb-4">
                "The best plane spotting pub near Heathrow. Grab a pint, find a table, and enjoy the show!"
              </p>
              <p className="text-sm text-gray-600">- Regular visitor review</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beer Garden Features */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-12">
              Our Unique Beer Garden
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🪑</div>
                <h3 className="font-bold text-lg mb-2">Spacious Seating</h3>
                <p className="text-gray-700">Multiple tables with umbrellas for sunny days</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🐕</div>
                <h3 className="font-bold text-lg mb-2">Dog Friendly</h3>
                <p className="text-gray-700">Water bowls provided, treats available at the bar</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🍔</div>
                <h3 className="font-bold text-lg mb-2">Food Service</h3>
                <p className="text-gray-700">Full menu available in the garden (kitchen hours apply)</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🌡️</div>
                <h3 className="font-bold text-lg mb-2">Heated Areas</h3>
                <p className="text-gray-700">Covered sections with heaters for cooler evenings</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
                <h3 className="font-bold text-lg mb-2">Family Friendly</h3>
                <p className="text-gray-700">Safe enclosed space, children welcome until 8pm</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🚬</div>
                <h3 className="font-bold text-lg mb-2">Smoking Area</h3>
                <p className="text-gray-700">Designated zones with ashtrays provided</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plane Spotting Tips */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-12">
              Plane Spotting Tips for Visitors
            </h2>
            
            <div className="space-y-6">
              <div className="bg-sky-50 rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">📱 Essential Apps</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Flightradar24:</strong> Track incoming flights in real-time</li>
                  <li>• <strong>Plane Finder:</strong> Identify aircraft types and airlines</li>
                  <li>• <strong>LiveATC:</strong> Listen to air traffic control (bring headphones!)</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">📸 Photography Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Best light: Golden hour (1 hour before sunset)</li>
                  <li>• Recommended lens: 70-300mm for close-ups</li>
                  <li>• Fast shutter speed: 1/500s or faster</li>
                  <li>• Look for special liveries and rare aircraft</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">🍺 Make a Day of It</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Arrive early to secure the best spotting tables</li>
                  <li>• Try our aviation-themed cocktails</li>
                  <li>• Join other enthusiasts - great community feel</li>
                  <li>• Food available all day (check kitchen hours)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              What Plane Spotters Say
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <p className="text-gray-700 mb-4 italic">
                  "Fantastic location for plane spotting! Aircraft pass so low you can read the registration. 
                  Great beer selection and friendly staff who understand aviation enthusiasts."
                </p>
                <p className="font-semibold">- Aviation Photography UK</p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <p className="text-gray-700 mb-4 italic">
                  "Hidden gem for Heathrow plane spotting. Much more comfortable than standing at the fence, 
                  plus you get table service! Dog loved it too."
                </p>
                <p className="font-semibold">- Local Plane Spotter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Planes & Pints?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join fellow aviation enthusiasts in our unique beer garden
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CallToAction href="tel:01753682707" variant="secondary" size="lg">
              📞 Call 01753 682707
            </CallToAction>
            <CallToAction 
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor" 
              variant="outline" 
              size="lg"
              className="!text-white !border-white hover:!bg-white hover:!text-anchor-green"
            >
              📍 Get Directions
            </CallToAction>
          </div>
          
          <div className="mt-8 text-white/80">
            <p className="text-sm">
              Just 7 minutes from Heathrow Terminal 5 • Free parking • Dogs welcome
            </p>
          </div>
        </div>
      </section>
    </>
  )
}