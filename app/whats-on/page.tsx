import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { UpcomingEvents } from '@/components/UpcomingEvents'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "What's On | The Anchor Stanwell Moor | Events, Entertainment & Live Music",
  description: 'Regular events at The Anchor pub including drag shows, tequila tastings, quiz nights, live music and more. Something happening every week!',
  keywords: 'events stanwell moor, drag shows near heathrow, quiz night stanwell, live music pub surrey',
  openGraph: {
    title: "What's On at The Anchor",
    description: 'Drag shows, tequila tastings, quiz nights and more. Your local entertainment hub.',
    images: ['/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg'],
  },
}

export default function WhatsOnPage() {
  return (
    <>
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg"
            alt="Entertainment at The Anchor - drag shows and events"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              What's On at The Anchor
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              From drag shows to quiz nights - there's always something happening!
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="tag bg-white/90 backdrop-blur-sm">👑 Drag Shows</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🥃 Tasting Events</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🧠 Quiz Nights</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🎸 Live Music</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🎱 Cash Bingo</span>
            </div>
            
            <CallToAction 
              href="#upcoming-events"
              variant="primary"
              size="lg"
            >
              View All Events
            </CallToAction>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Our Signature Events
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These are the events that make The Anchor special
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Drag Shows */}
            <Link href="/whats-on/drag-shows" className="block group">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <Image
                  src="/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg"
                  alt="Drag shows at The Anchor with Nikki Manfadge"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-2xl drop-shadow">Saturday Drag Shows</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-anchor-green mb-2">Spectacular Drag Performances</h3>
              <p className="text-gray-700 mb-4">
                Join us for unforgettable Saturday nights with Nikki Manfadge and special guests. 
                Dazzling costumes, hilarious comedy, and inclusive fun for everyone!
              </p>
              <p className="text-anchor-gold font-semibold group-hover:underline">
                Learn more about our drag shows →
              </p>
            </Link>

            {/* Tequila Tasting */}
            <Link href="/whats-on/tequila-tasting" className="block group">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-anchor-gold to-amber-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl">🥃</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-2xl drop-shadow">Tequila Tasting Nights</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-anchor-green mb-2">Quarterly Tequila Events</h3>
              <p className="text-gray-700 mb-4">
                Join our special quarterly tequila tasting events. Explore Mexico's finest 
                spirits with expert guidance in an intimate, educational setting.
              </p>
              <p className="text-anchor-gold font-semibold group-hover:underline">
                Learn more about our tasting events →
              </p>
            </Link>
          </div>
        </div>
      </section>


      {/* Upcoming Events from API */}
      <section id="upcoming-events" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-700">
              Live updates from our events calendar
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <UpcomingEvents />
          </div>
        </div>
      </section>

      {/* Special Events */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Special Events & Celebrations
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Throughout the year, we host special themed events and celebrations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-6xl mb-4">🎄</div>
              <h3 className="text-xl font-bold text-anchor-green mb-2">Christmas Parties</h3>
              <p className="text-gray-700">
                Festive menu, decorations, and party atmosphere. Book your Christmas do with us!
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎃</div>
              <h3 className="text-xl font-bold text-anchor-green mb-2">Halloween Spectacular</h3>
              <p className="text-gray-700">
                Costume contests, spooky decorations, and themed drinks. Best dressed wins prizes!
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-anchor-green mb-2">New Year's Eve</h3>
              <p className="text-gray-700">
                Ring in the new year with live entertainment, champagne, and midnight celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Private Events */}
      <section className="py-16 md:py-20 bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              Host Your Event at The Anchor
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Looking for a venue for your celebration? We host private parties, birthdays, 
              wakes, and corporate events. Our flexible spaces can accommodate groups of all sizes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6">
                <div className="text-4xl mb-3">🎂</div>
                <h3 className="font-bold text-anchor-green mb-2">Birthday Parties</h3>
                <p className="text-gray-600 text-sm">Celebrate in style with custom menus</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="font-bold text-anchor-green mb-2">Corporate Events</h3>
                <p className="text-gray-600 text-sm">Team building, meetings, or celebrations</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-4xl mb-3">🎊</div>
                <h3 className="font-bold text-anchor-green mb-2">Special Occasions</h3>
                <p className="text-gray-600 text-sm">Engagements, anniversaries, and more</p>
              </div>
            </div>
            <CallToAction href="/book-event" variant="primary" size="lg">
              Enquire About Private Events
            </CallToAction>
          </div>
        </div>
      </section>

      {/* Stay Updated */}
      <section className="py-16 md:py-20 bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Never Miss an Event
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Follow us on social media for the latest updates, special events, and last-minute changes
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://www.facebook.com/theanchorpubsm/" 
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a 
              href="https://www.instagram.com/theanchor.pub/" 
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">Event Enquiries</p>
            <p>📞 01753 682707</p>
            <p>✉️ manager@the-anchor.pub</p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventSeries",
            "name": "Events at The Anchor",
            "description": "Regular weekly events including drag shows, quiz nights, and live music",
            "organizer": {
              "@type": "Organization",
              "name": "The Anchor",
              "url": "https://the-anchor.pub"
            },
            "location": {
              "@type": "Place",
              "name": "The Anchor",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Horton Road",
                "addressLocality": "Stanwell Moor",
                "addressRegion": "Surrey",
                "postalCode": "TW19 6AQ",
                "addressCountry": "GB"
              }
            },
            "subEvent": [
              {
                "@type": "Event",
                "name": "Saturday Drag Shows",
                "startDate": "2024-01-06T21:00",
                "endDate": "2024-01-06T23:30",
                "eventSchedule": {
                  "@type": "Schedule",
                  "byDay": "Saturday",
                  "repeatFrequency": "P1W"
                }
              },
              {
                "@type": "Event",
                "name": "Tequila Thursday",
                "startDate": "2024-01-04T19:00",
                "endDate": "2024-01-04T22:00",
                "eventSchedule": {
                  "@type": "Schedule",
                  "byDay": "Thursday",
                  "repeatFrequency": "P1W"
                }
              }
            ]
          })
        }}
      />
    </>
  )
}