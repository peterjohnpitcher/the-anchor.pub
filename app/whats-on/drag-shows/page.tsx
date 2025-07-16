import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Drag Shows | The Anchor Stanwell Moor | Monthly Entertainment',
  description: 'Spectacular monthly drag shows at The Anchor with Nikki Manfadge. Inclusive, fun entertainment near Heathrow. Book your table for an unforgettable night!',
  keywords: 'drag shows stanwell moor, drag queen near heathrow, nikki manfadge, saturday night entertainment surrey',
  openGraph: {
    title: 'Monthly Drag Shows at The Anchor',
    description: 'Join us for spectacular drag performances with Nikki Manfadge - check our What\'s On page for dates!',
    images: ['/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg'],
  },
}

export default function DragShowsPage() {
  return (
    <>
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg"
            alt="Nikki Manfadge performing at The Anchor drag show"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-pink-900/60 to-purple-900/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-pink-300 text-lg mb-4 drop-shadow">Monthly Special Events</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Drag Shows at The Anchor
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              Featuring the fabulous Nikki Manfadge and special guests
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="tag bg-white/90 backdrop-blur-sm">👑 9PM Start</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🎭 Live Performance</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🏳️‍🌈 Everyone Welcome</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍹 Themed Cocktails</span>
            </div>
            
            <CallToAction 
              href="tel:01753682707"
              variant="primary"
              size="lg"
            >
              📞 Book Your Table Now
            </CallToAction>
          </div>
        </div>
      </section>

      {/* About Our Drag Shows */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              A Saturday Night Like No Other
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl mb-6 text-center">
                Join us monthly as The Anchor transforms into Stanwell Moor's premier 
                entertainment venue with our spectacular drag shows!
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-pink-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">The Show</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-pink-500">✨</span>
                      <span>Dazzling costume changes</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-pink-500">🎤</span>
                      <span>Lip-sync performances to your favorite hits</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-pink-500">😂</span>
                      <span>Hilarious comedy and audience interaction</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-pink-500">🎉</span>
                      <span>Birthday shout-outs and celebrations</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">The Experience</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-purple-500">🏳️‍🌈</span>
                      <span>Inclusive, welcoming atmosphere</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500">🍹</span>
                      <span>Themed cocktails and drink specials</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500">📸</span>
                      <span>Photo opportunities with the queens</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500">🎊</span>
                      <span>Perfect for hen dos and celebrations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Queens */}
      <section className="section-spacing bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              Meet Our Fabulous Performers
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Nikki Manfadge</h3>
              <p className="text-gray-700 text-lg mb-4">
                Our resident queen and host extraordinaire! Nikki brings glamour, comedy, 
                and fierce performances at our monthly shows. Known for her quick wit, 
                stunning outfits, and ability to get everyone on their feet.
              </p>
              <p className="text-gray-700">
                With years of experience on the drag circuit, Nikki has made The Anchor 
                her home and created a show that's become legendary in the local area.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Special Guests</h3>
              <p className="text-gray-700 text-lg">
                Throughout the year, we welcome special guest performers from across the UK. 
                Follow our social media to see who's joining Nikki each week!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              Plan Your Night Out
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Show Times</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">Doors Open</span>
                    <span>7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">Pre-Show Dining</span>
                    <span>Until 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">Show Starts</span>
                    <span>9:00 PM Sharp!</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Show Ends</span>
                    <span>Around 11:30 PM</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Booking Info</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">📞</span>
                    <span>Book by phone: 01753 682707</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🎟️</span>
                    <span>No ticket needed - just book a table</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">👥</span>
                    <span>Tables for 2-10 people available</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">⚠️</span>
                    <span>Book early - Saturday nights fill up fast!</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Perfect For */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Perfect For...</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-4xl mb-2">💍</div>
                  <p className="font-semibold">Hen Parties</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🎂</div>
                  <p className="font-semibold">Birthdays</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">👯‍♀️</div>
                  <p className="font-semibold">Girls' Night</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="font-semibold">Celebrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              First Time? Here's What to Expect
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">The Atmosphere</h3>
                  <p className="text-gray-700">
                    Our drag nights are all about fun, laughter, and inclusivity. Whether you're 
                    a drag superfan or it's your first show, you'll feel welcome. Expect a lively, 
                    friendly crowd ready to have a great time!
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">Audience Participation</h3>
                  <p className="text-gray-700">
                    Our queens love interacting with the audience! You might be asked to join in 
                    with singing, or even get pulled up for a dance. It's all in good fun, and 
                    participation is never forced.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">Dress Code</h3>
                  <p className="text-gray-700">
                    Come as you are! Whether you want to dress up for the occasion or keep it 
                    casual, all are welcome. Some guests love to go all out with glitter and glam!
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">Tips & Etiquette</h3>
                  <p className="text-gray-700">
                    Show your appreciation with applause and cheers! If you'd like to tip the 
                    performers, they'll graciously accept during or after their numbers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why The Anchor's Drag Shows Are Special */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Surrey's Most Fabulous Saturday Night
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl text-center mb-8">
                The Anchor has become the go-to destination for drag entertainment in the Stanwell Moor 
                and Heathrow area, attracting guests from across Surrey and West London.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">A Night Like No Other</h3>
                  <p className="mb-4">
                    Each month, our traditional British pub transforms into a glittering cabaret venue. 
                    The magic begins the moment you walk through our doors - rainbow flags flying proud, 
                    disco lights twinkling, and an atmosphere of pure celebration. Our drag shows have 
                    become legendary in the local area, with people traveling from Staines, Ashford, 
                    Heathrow, and beyond for a night they won't forget.
                  </p>
                  <p>
                    What sets The Anchor apart is the perfect blend of traditional pub warmth and 
                    spectacular entertainment. You can enjoy a proper home-cooked meal before the show, 
                    then stay for the performances without the pretension of city venues.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">Community & Celebration</h3>
                  <p className="mb-4">
                    Our drag nights are more than just entertainment - they're a celebration of diversity 
                    and inclusion in the heart of Surrey. We've hosted countless hen parties, birthday 
                    celebrations, and even a few wedding receptions. The energy is electric, with audiences 
                    ranging from drag first-timers to devoted fans who wouldn't miss a show.
                  </p>
                  <p>
                    Local LGBTQ+ community members tell us The Anchor feels like home - a safe, 
                    welcoming space where everyone can be themselves. That's exactly the atmosphere 
                    we've worked hard to create.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">
                  What Makes Saturday Special
                </h3>
                <p className="text-gray-700 mb-4">
                  Saturday nights at The Anchor are an institution. The excitement builds throughout 
                  the day - our kitchen prepares special pre-show dinners, the bar stocks up on 
                  prosecco and cocktails, and by 8pm, the venue is buzzing with anticipation. Tables 
                  fill with groups of friends, couples on date nights, and solo guests who've become 
                  part of our extended family.
                </p>
                <p className="text-gray-700">
                  When Nikki Manfadge takes the stage at 9pm sharp, the transformation is complete. 
                  For the next two and a half hours, you're transported to a world of glamour, 
                  laughter, and jaw-dropping performances. It's not just a drag show - it's the 
                  highlight of Stanwell Moor's social calendar.
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-lg text-gray-700">
                  Whether you're a drag enthusiast or curious first-timer, whether you're celebrating 
                  a special occasion or just want a fantastic night out, The Anchor's Saturday drag 
                  shows offer something truly special. In a world of generic entertainment, we're 
                  proud to bring world-class drag performances to our village pub.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for a Fabulous Night Out?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us this Saturday for an unforgettable evening of entertainment, 
            laughter, and fierce performances!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 Book Your Table: 01753 682707
            </CallToAction>
            <CallToAction 
              href="/whats-on"
              variant="white"
              size="lg"
            >
              View All Events
            </CallToAction>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">Monthly Shows - Check What's On for Dates</p>
            <p>Show starts at 9:00 PM</p>
            <p className="text-sm mt-2">The Anchor, Stanwell Moor</p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Saturday Drag Shows with Nikki Manfadge",
            "description": "Spectacular monthly drag performances at The Anchor with Nikki Manfadge",
            "startDate": "2024-01-06T21:00",
            "endDate": "2024-01-06T23:30",
            "eventSchedule": {
              "@type": "Schedule",
              "byDay": "Saturday",
              "repeatFrequency": "P1W"
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
            "performer": {
              "@type": "Person",
              "name": "Nikki Manfadge",
              "sameAs": "https://www.instagram.com/theanchor.pub/"
            },
            "organizer": {
              "@type": "Organization",
              "name": "The Anchor",
              "url": "https://the-anchor.pub"
            },
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
          })
        }}
      />
    </>
  )
}