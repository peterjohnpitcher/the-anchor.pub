import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { Metadata } from 'next'
import { BusinessHours } from '@/components/BusinessHours'

export const metadata: Metadata = {
  title: 'Find Us | The Anchor Stanwell Moor | Directions & Parking',
  description: 'Find The Anchor pub in Stanwell Moor. Easy directions from Heathrow, M25, and local areas. Free parking available. Just off Horton Road near the church.',
  keywords: 'anchor pub directions, find anchor stanwell moor, pub near me directions, free parking pub',
  openGraph: {
    title: 'Find The Anchor - Directions & Location',
    description: 'Easy to find pub in Stanwell Moor with free parking. Just 7 minutes from Heathrow.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
}

export default function FindUsPage() {
  return (
    <>
      {/* Status Bar */}
      <div className="flex justify-center py-4 bg-gray-50 mt-20">
        <StatusBar />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-anchor-green to-anchor-green-dark">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Find The Anchor
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Easy to find, hard to leave!
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">📍</div>
              <p className="font-bold text-anchor-green">Stanwell Moor</p>
              <p className="text-sm text-gray-600">Surrey TW19 6AQ</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🚗</div>
              <p className="font-bold text-anchor-green">Free Parking</p>
              <p className="text-sm text-gray-600">50+ spaces</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">✈️</div>
              <p className="font-bold text-anchor-green">Near Heathrow</p>
              <p className="text-sm text-gray-600">7-12 minutes</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🚌</div>
              <p className="font-bold text-anchor-green">Bus Routes</p>
              <p className="text-sm text-gray-600">441 & 442</p>
            </div>
          </div>
        </div>
      </section>

      {/* Address & Contact */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-anchor-green mb-6">Our Address</h2>
                <div className="bg-anchor-cream rounded-2xl p-8">
                  <address className="not-italic text-lg space-y-2">
                    <p className="font-bold text-xl text-anchor-green">The Anchor</p>
                    <p>Horton Road</p>
                    <p>Stanwell Moor</p>
                    <p>Surrey</p>
                    <p className="font-bold">TW19 6AQ</p>
                  </address>
                  
                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <p className="font-bold text-anchor-green mb-3">Contact</p>
                    <p className="mb-2">
                      <a href="tel:01753682707" className="text-anchor-gold hover:text-anchor-gold-light">
                        📞 01753 682707
                      </a>
                    </p>
                    <p>
                      <a href="mailto:manager@the-anchor.pub" className="text-anchor-gold hover:text-anchor-gold-light">
                        ✉️ manager@the-anchor.pub
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-anchor-green mb-6">Landmarks</h2>
                <div className="bg-anchor-sand/30 rounded-2xl p-8">
                  <p className="text-lg font-semibold text-anchor-green mb-4">
                    Look out for these landmarks:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-anchor-gold">⛪</span>
                      <span>Next to St Mary's Church</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-anchor-gold">✈️</span>
                      <span>Under the Heathrow flight path</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-anchor-gold">🚗</span>
                      <span>Large car park visible from road</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-anchor-gold">🌳</span>
                      <span>Traditional pub building with garden</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 italic">
                      "If you can hear the planes, you're close!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Hours & Weather */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-anchor-green mb-6 text-center">Hours & Weather</h2>
              <div className="bg-anchor-green/95 rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
                <BusinessHours variant="condensed" showKitchen={true} showWeather={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
            Directions from Popular Locations
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* From M25 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From M25</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Exit Junction 14</li>
                <li>Take A3113 towards Stanwell Moor</li>
                <li>At roundabout, continue straight</li>
                <li>Turn left at Horton Road</li>
                <li>The Anchor is on your right</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">Journey time: 5 minutes from M25</p>
            </div>

            {/* From Staines */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From Staines</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Head south on A30</li>
                <li>Turn right onto A3044</li>
                <li>Continue to Stanwell Moor</li>
                <li>Turn right onto Horton Road</li>
                <li>The Anchor is on your right</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">Journey time: 10 minutes</p>
            </div>

            {/* From Windsor */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From Windsor</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Take A308 towards Staines</li>
                <li>Join M25 at Junction 13</li>
                <li>Exit at Junction 14</li>
                <li>Follow signs to Stanwell Moor</li>
                <li>Turn left at Horton Road</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">Journey time: 20 minutes</p>
            </div>

            {/* From Ashford */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From Ashford</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Head north on A30</li>
                <li>Turn left onto A3044</li>
                <li>Continue through Stanwell</li>
                <li>Turn left onto Horton Road</li>
                <li>The Anchor is on your right</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">Journey time: 10 minutes</p>
            </div>

            {/* From Heathrow */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From Heathrow</h3>
              <p className="text-gray-700 mb-3">See our detailed terminal guides:</p>
              <ul className="space-y-2">
                <li><Link href="/near-heathrow/terminal-2" className="text-anchor-gold hover:text-anchor-gold-light">→ From Terminal 2</Link></li>
                <li><Link href="/near-heathrow/terminal-3" className="text-anchor-gold hover:text-anchor-gold-light">→ From Terminal 3</Link></li>
                <li><Link href="/near-heathrow/terminal-4" className="text-anchor-gold hover:text-anchor-gold-light">→ From Terminal 4</Link></li>
                <li><Link href="/near-heathrow/terminal-5" className="text-anchor-gold hover:text-anchor-gold-light">→ From Terminal 5</Link></li>
              </ul>
            </div>

            {/* By Public Transport */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">By Bus</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Route 441:</strong> Heathrow Central - Stanwell Moor</p>
                <p><strong>Route 442:</strong> Staines - Stanwell Moor</p>
                <p className="text-sm">Ask driver for The Anchor stop</p>
              </div>
              <p className="mt-4 text-sm text-gray-600">Buses run hourly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parking Information */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              Free Parking
            </h2>
            <div className="bg-anchor-cream rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl mb-3">🚗</div>
                  <h3 className="font-bold text-anchor-green mb-2">20 Spaces</h3>
                  <p className="text-gray-700">On-site parking for all guests</p>
                </div>
                <div>
                  <div className="text-4xl mb-3">♿</div>
                  <h3 className="font-bold text-anchor-green mb-2">Close to Building</h3>
                  <p className="text-gray-700">All spaces are near the entrance</p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="font-bold text-anchor-green mb-2">Safe & Lit</h3>
                  <p className="text-gray-700">Well-lit parking area with CCTV</p>
                </div>
              </div>
              <p className="mt-6 text-gray-600 italic">
                Free parking while you visit. Extended parking available - ask staff for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Opening Hours
            </h2>
            <BusinessHours variant="full" showKitchen={true} />
          </div>
        </div>
      </section>

      {/* Map CTA */}
      <section className="py-16 md:py-20 bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Get Directions
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Use your preferred map service to navigate directly to The Anchor
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
              variant="white"
              size="lg"
              external
            >
              📍 Google Maps
            </CallToAction>
            <CallToAction 
              href="https://maps.apple.com/?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
              variant="white"
              size="lg"
              external
            >
              📍 Apple Maps
            </CallToAction>
            <CallToAction 
              href="https://www.waze.com/ul?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
              variant="white"
              size="lg"
              external
            >
              📍 Waze
            </CallToAction>
          </div>
          
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">Sat Nav Postcode</p>
            <p className="text-2xl font-bold">TW19 6AQ</p>
          </div>
        </div>
      </section>
    </>
  )
}