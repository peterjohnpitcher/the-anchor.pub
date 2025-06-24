import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { CallToAction } from '@/components/CallToAction'
import { BusinessHours } from '@/components/BusinessHours'
import { Weather } from '@/components/Weather'

// Dynamic imports for non-critical components
const OpeningStatus = dynamic(() => import('@/components/OpeningStatus').then(mod => mod.OpeningStatus), {
  loading: () => <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full border-2 border-anchor-gold/20 px-6 py-3 shadow-sm min-h-[44px]"></div>,
  ssr: true
})

const NextEvent = dynamic(() => import('@/components/NextEvent').then(mod => mod.NextEvent), {
  loading: () => <div className="max-w-3xl mx-auto"><div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[300px] animate-pulse bg-gray-200"></div></div>,
  ssr: true
})

export default function HomePage() {
  return (
    <>
      {/* Warm Welcome Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/the-anchor-pub-interior-atmosphere.jpg"
            alt="The Anchor pub - warm and welcoming interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-anchor-green/70 via-anchor-green/50 to-anchor-green/70" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Welcome message with wave */}
            <p className="text-lg md:text-xl text-anchor-gold mb-4 font-medium drop-shadow-lg">
              Welcome to your local <span className="wave inline-block">👋</span>
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              The Anchor
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-anchor-gold mb-8 font-serif drop-shadow-lg">
              Where Everyone&apos;s Welcome
            </p>
            
            <div className="mb-8 flex justify-center">
              <div className="max-w-md">
                <OpeningStatus />
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
              Your friendly neighbourhood pub in Stanwell Moor. Great food, 
              fantastic entertainment, and a warm welcome for all the family - 
              including your four-legged friends! 🐕
            </p>
            
            {/* Feature tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <span className="tag bg-white/90 backdrop-blur-sm">🚗 Free Parking</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🐕 Dog Friendly</span>
              <span className="tag bg-white/90 backdrop-blur-sm">👨‍👩‍👧‍👦 Family Welcome</span>
              <span className="tag bg-white/90 backdrop-blur-sm">♿ Step-Free Access</span>
              <span className="tag bg-white/90 backdrop-blur-sm">✈️ 7 mins from Heathrow</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallToAction 
                href="https://ordertab.menu/theanchor/bookings"
                variant="primary"
                size="large"
                external
              >
                📅 Book a Table
              </CallToAction>
              
              <CallToAction 
                href="tel:01753682707"
                variant="secondary"
                size="large"
              >
                📞 Call: 01753 682707
              </CallToAction>
              
              <CallToAction 
                href="#visit-us"
                variant="secondary"
                size="large"
              >
                📍 Find Us
              </CallToAction>
            </div>
          </div>
        </div>
        
        {/* Friendly scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <p className="text-sm text-white/80 mb-2 drop-shadow">Scroll to explore</p>
            <svg className="w-6 h-6 text-white mx-auto animate-bounce drop-shadow-lg" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              What Makes Us Special
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              More than just a pub - we&apos;re the heart of the community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Community Card */}
            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Community Hub</h3>
              <p className="text-gray-700">
                A gathering place for locals and visitors alike. From quiz nights 
                to celebrations, we&apos;re where memories are made.
              </p>
            </div>

            {/* Food Card */}
            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Honest Food</h3>
              <p className="text-gray-700">
                Traditional British pub food done right. Sunday roasts, 
                stone-baked pizzas, and hearty meals that won&apos;t break the bank.
              </p>
            </div>

            {/* Entertainment Card */}
            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Fun for Everyone</h3>
              <p className="text-gray-700">
                From monthly quiz nights to spectacular drag shows, there&apos;s 
                always something happening at The Anchor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Event */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Next Event at The Anchor
            </h2>
            <p className="text-xl text-gray-700">
              Don&apos;t miss out on what&apos;s coming up
            </p>
          </div>
          <NextEvent />
        </div>
      </section>

      {/* Heathrow Travelers Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
                ✈️ Perfect for Heathrow Travelers
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Just 7-12 minutes from all terminals • Free parking • Real British experience
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Why Choose Us */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Why Stop at The Anchor?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <strong>Save Money:</strong> Airport food costs 3x more. Enjoy a proper meal for less.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">🚗</span>
                    <div>
                      <strong>Free Parking:</strong> No hourly charges, no stress. Stay as long as you like.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">🇬🇧</span>
                    <div>
                      <strong>Real Experience:</strong> Authentic British pub, not an airport chain.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <strong>Kill Time Comfortably:</strong> Much nicer than terminal seating.
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Terminal Times */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Journey Times by Car</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Terminal 2 & 3</span>
                    <span className="text-anchor-gold font-bold">11 minutes</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Terminal 4</span>
                    <span className="text-anchor-gold font-bold">12 minutes</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Terminal 5</span>
                    <span className="text-anchor-gold font-bold">7 minutes</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <CallToAction href="/near-heathrow" variant="primary" size="large">
                    Get Directions From Your Terminal
                  </CallToAction>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green text-center mb-12">
            Life at The Anchor
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Event Photo */}
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer card-warm">
              <Image
                src="/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg"
                alt="Entertainment at The Anchor - everyone welcome"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 p-6">
                  <p className="text-white font-semibold text-lg">Saturday Night Entertainment</p>
                </div>
              </div>
            </div>
            
            {/* Food Photo */}
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer card-warm">
              <Image
                src="/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg"
                alt="Traditional Sunday roast at The Anchor"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 p-6">
                  <p className="text-white font-semibold text-lg">Famous Sunday Roasts</p>
                </div>
              </div>
            </div>
            
            {/* Garden Photo */}
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer card-warm">
              <Image
                src="/images/garden/beer-garden/the-anchor-beer-garden-heathrow-flight-path.jpg"
                alt="Beer garden at The Anchor - family and dog friendly"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 p-6">
                  <p className="text-white font-semibold text-lg">Unique Beer Garden</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center text-anchor-gold hover:text-anchor-gold-light font-semibold">
              See more photos
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section id="visit-us" className="py-16 md:py-20 bg-anchor-green text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
              Come Visit Us!
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white/10 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4">📍 Find Us Here</h3>
                  <address className="not-italic text-lg leading-relaxed">
                    The Anchor<br />
                    Horton Road<br />
                    Stanwell Moor<br />
                    Surrey TW19 6AQ
                  </address>
                </div>
                
                <div className="bg-white/10 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4">🚗 Getting Here</h3>
                  <ul className="space-y-2">
                    <li>✈️ Just 7 minutes from Heathrow Terminal 5</li>
                    <li>🚌 Bus routes 441 & 442 stop nearby</li>
                    <li>🚗 Free parking for all guests</li>
                    <li>♿ Step-free access to most areas</li>
                  </ul>
                </div>
                
                <CallToAction 
                  href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
                  variant="white"
                  size="large"
                  external
                  className="w-full sm:w-auto"
                >
                  Get Directions on Google Maps
                </CallToAction>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">🕐 Opening Hours & Weather</h3>
                <BusinessHours variant="dark" showKitchen={true} showWeather={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}