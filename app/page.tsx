import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { CallToAction } from '@/components/CallToAction'
import { BusinessHours } from '@/components/BusinessHours'
import { Weather } from '@/components/Weather'
import { StatusBarWrapper } from '@/components/StatusBarWrapper'
import { GalleryImage } from '@/components/GalleryImage'
import { NextEventServer } from '@/components/NextEventServer'
import { Suspense } from 'react'

// Loading skeleton for NextEvent
function NextEventSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-100 rounded-2xl shadow-xl overflow-hidden h-[300px] animate-pulse"></div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* Warm Welcome Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Hero Image with optimized loading */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/the-anchor-pub-interior-atmosphere.jpg"
            alt="The Anchor pub - warm and welcoming interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-anchor-green/70 via-anchor-green/50 to-anchor-green/70" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Welcome message with wave */}
            <p className="text-lg md:text-xl text-anchor-gold mb-4 font-medium drop-shadow-lg">
              Welcome to your local <span className="inline-block motion-safe:wave">👋</span>
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              The Anchor
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-anchor-gold mb-8 font-serif drop-shadow-lg">
              Where Everyone&apos;s Welcome
            </p>
            
            <div className="mb-8 flex justify-center">
              <StatusBarWrapper />
            </div>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
              Stanwell Moor's village pub near Heathrow Airport. Traditional British food, 
              Saturday drag shows, quiz nights, and the warmest welcome in Surrey - 
              dogs and families always welcome! 🐕
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
                size="lg"
                external
              >
                📅 Book a Table
              </CallToAction>
              
              <CallToAction 
                href="tel:01753682707"
                variant="secondary"
                size="lg"
              >
                📞 Call: 01753 682707
              </CallToAction>
              
              <CallToAction 
                href="#visit-us"
                variant="secondary"
                size="lg"
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
      <section className="section-spacing bg-white">
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
                Traditional British pub classics. Famous Sunday roasts (pre-order required), 
                fish & chips, burgers, and proper pub grub at local prices.
              </p>
            </div>

            {/* Entertainment Card */}
            <div className="card-warm bg-anchor-sand/30 p-8 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Events & Entertainment</h3>
              <p className="text-gray-700">
                Spectacular Saturday drag shows with Nikki Manfadge, monthly quiz nights, 
                and special events throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Information */}
      <section className="section-spacing bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green text-center mb-12">
              Everything You Need to Know
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-bold text-lg text-anchor-green mb-2">Location</h3>
                <p className="text-sm text-gray-700">
                  Horton Road, Stanwell Moor<br />
                  Surrey TW19 6AQ<br />
                  <span className="text-anchor-gold font-semibold">7 mins from Heathrow T5</span>
                </p>
              </div>
              
              {/* Opening Hours */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">🕐</div>
                <h3 className="font-bold text-lg text-anchor-green mb-2">Opening Hours</h3>
                <p className="text-sm text-gray-700">
                  Live hours shown above<br />
                  Including kitchen times<br />
                  <span className="text-xs">May vary on holidays</span>
                </p>
              </div>
              
              {/* Contact */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">📞</div>
                <h3 className="font-bold text-lg text-anchor-green mb-2">Get in Touch</h3>
                <p className="text-sm text-gray-700">
                  <a href="tel:01753682707" className="hover:text-anchor-gold transition-colors">
                    01753 682707
                  </a><br />
                  <span className="text-xs">Call for bookings & enquiries</span>
                </p>
              </div>
              
              {/* Key Features */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-bold text-lg text-anchor-green mb-2">Key Features</h3>
                <p className="text-sm text-gray-700">
                  Free Parking<br />
                  Dog Friendly<br />
                  <span className="text-anchor-gold font-semibold">Great Events</span>
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
              <p className="text-center text-gray-700">
                <strong className="text-anchor-green">Important:</strong> Sunday roasts require pre-order and payment by 1pm Saturday. 
                Regular menu available on Sundays without pre-order. Free parking for all guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Event */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Next Event at The Anchor
            </h2>
            <p className="text-xl text-gray-700">
              Don&apos;t miss out on what&apos;s coming up
            </p>
          </div>
          <Suspense fallback={<NextEventSkeleton />}>
            <NextEventServer />
          </Suspense>
        </div>
      </section>

      {/* Heathrow Travelers Section */}
      <section className="section-spacing bg-white">
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
                  <CallToAction href="/near-heathrow" variant="primary" size="lg">
                    Get Directions From Your Terminal
                  </CallToAction>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green text-center mb-12">
            Life at The Anchor
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Event Photo */}
            <GalleryImage
              src="/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg"
              alt="Entertainment at The Anchor - everyone welcome"
              caption="Saturday Night Entertainment"
            />
            
            {/* Food Photo */}
            <GalleryImage
              src="/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg"
              alt="Traditional Sunday roast at The Anchor"
              caption="Famous Sunday Roasts"
            />
            
            {/* Garden Photo */}
            <GalleryImage
              src="/images/garden/beer-garden/the-anchor-beer-garden-heathrow-flight-path.jpg"
              alt="Beer garden at The Anchor - family and dog friendly"
              caption="Unique Beer Garden"
            />
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
      <section id="visit-us" className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-white">
              Come Visit Us!
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-white/10 rounded-lg p-5 mb-4">
                  <h3 className="text-xl font-bold mb-3 text-white">📍 Find Us Here</h3>
                  <address className="not-italic text-base leading-relaxed">
                    The Anchor<br />
                    Horton Road<br />
                    Stanwell Moor<br />
                    Surrey TW19 6AQ
                  </address>
                </div>
                
                <div className="bg-white/10 rounded-lg p-5 mb-5">
                  <h3 className="text-xl font-bold mb-3 text-white">🚗 Getting Here</h3>
                  <ul className="space-y-1.5 text-base">
                    <li>✈️ Just 7 minutes from Heathrow Terminal 5</li>
                    <li>🚌 Bus routes 441 & 442 stop nearby</li>
                    <li>🚗 Free parking for all guests</li>
                    <li>♿ Step-free access to most areas</li>
                  </ul>
                </div>
                
                <CallToAction 
                  href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
                  variant="white"
                  size="lg"
                  external
                  className="w-full sm:w-auto"
                >
                  Get Directions on Google Maps
                </CallToAction>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3 text-white">🕐 Hours & Weather</h3>
                <BusinessHours variant="condensed" showKitchen={true} showWeather={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}