import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { FilteredUpcomingEvents } from '@/components/FilteredUpcomingEvents'
import { CategoryFilter } from '@/components/CategoryFilter'
import { HeroWrapper } from '@/components/hero'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "What's On Near Me | The Anchor Stanwell Moor | Events & Entertainment",
  description: 'Regular monthly events at The Anchor pub in Surrey including drag shows, quiz nights, bingo and more. Plus major sports on terrestrial TV near Heathrow Airport!',
  keywords: 'events stanwell moor, drag shows near heathrow, quiz night stanwell, pub entertainment surrey',
  openGraph: {
    title: "What's On at The Anchor",
    description: 'Drag shows, quiz nights and more. Your local entertainment hub.',
    images: ['/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg'],
  },
}

export default function WhatsOnPage({ searchParams }: { searchParams: { category?: string } }) {
  return (
    <>
      {/* Hero Section */}
      <HeroWrapper
        route="/whats-on"
        title="What's On at The Anchor"
        description="From drag shows to quiz nights - there's always something happening!"
        size="large"
        showStatusBar={true}
        statusBarPosition="below"
        tags={[
          { label: '👑 Drag Shows', variant: 'primary' },
          { label: '🎉 Special Events', variant: 'success' },
          { label: '🧠 Quiz Nights', variant: 'warning' },
          { label: '🎱 Cash Bingo', variant: 'default' }
        ]}
        cta={
          <CallToAction 
            href="#upcoming-events"
            variant="primary"
            size="lg"
          >
            View All Events
          </CallToAction>
        }
      />



      {/* Upcoming Events from API */}
      <section id="upcoming-events" className="section-spacing bg-white">
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
            <Suspense fallback={<div className="text-center py-8">Loading events...</div>}>
              <CategoryFilter />
            </Suspense>
            <Suspense fallback={<div className="text-center py-8">Loading events...</div>}>
              <FilteredUpcomingEvents categorySlug={searchParams.category} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Entertainment & Games */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Daily Entertainment & Games
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Always something to do at The Anchor - from traditional pub games to digital entertainment
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-5xl mb-4">🎱</div>
              <h3 className="text-xl font-bold text-anchor-green mb-2">Pool Table</h3>
              <p className="text-gray-700">
                Challenge your friends to a game. Cues and chalk provided.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-anchor-green mb-2">Darts Board</h3>
              <p className="text-gray-700">
                Professional board with oche. Darts available at the bar.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-anchor-green mb-2">Jukebox</h3>
              <p className="text-gray-700">
                Choose your favourite tunes. Wide selection of music genres.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-5xl mb-4">🎰</div>
              <h3 className="text-xl font-bold text-anchor-green mb-2">Fruit Machine</h3>
              <p className="text-gray-700">
                Try your luck on our gaming machine. 18+ only.
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">
              <span className="text-3xl">📶</span> Free WiFi Throughout
            </h3>
            <p className="text-gray-700 text-center">
              Stay connected with our free, high-speed WiFi. Perfect for checking emails, social media, or even getting some work done. 
              Our dining room features tables with power points - ideal for remote workers and digital nomads.
            </p>
          </div>
        </div>
      </section>


      {/* Special Events */}
      <section className="section-spacing bg-white">
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
                Costume contests, spooky decorations, themed drinks, and DJ entertainment. Best dressed wins prizes!
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-anchor-green mb-2">New Year's Eve</h3>
              <p className="text-gray-700">
                Ring in the new year with DJ entertainment, champagne, and midnight celebrations.
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">Watch Sports at The Anchor</h3>
            <p className="text-gray-700 text-center mb-6">
              Catch all the major sporting events on our screens! We show all terrestrial channel sports including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">⚽</div>
                <p className="font-semibold">World Cup</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🏆</div>
                <p className="font-semibold">Euros</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎾</div>
                <p className="font-semibold">Wimbledon</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🏉</div>
                <p className="font-semibold">Six Nations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Events */}
      <section className="section-spacing bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              Host Your Event at The Anchor
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Transform your special occasion into an unforgettable experience. We offer versatile 
              venue spaces for 10-200 guests with comprehensive event services including catering, 
              entertainment, and our preferred vendor network.
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

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "When are the drag shows at The Anchor?",
            answer: "Our fabulous drag shows run monthly, alternating between Nikki's Games Night (starting at 7pm) and Nikki's Karaoke Night (starting at 8pm). While there's no age restriction, please note there may be adult language. Entry is FREE but we recommend arriving early to get a good seat!"
          },
          {
            question: "What time is quiz night at The Anchor?",
            answer: "Quiz night is held monthly (date varies), starting at 7pm. Entry is £3 per person. Prizes include a £25 bar voucher for 1st place, and the 2nd from last team wins a bottle of wine. Check our social media for the next quiz date!"
          },
          {
            question: "Do I need to book for events at The Anchor?",
            answer: "For most regular events like drag shows and quiz nights, booking isn't required but arriving early is recommended as we do get busy! For special events, private parties, or large groups, please call us on 01753 682707 to reserve your space."
          },
          {
            question: "Can I hire The Anchor for a private party?",
            answer: "Yes! We offer versatile venue spaces that can accommodate groups from 10 to 200 guests. Perfect for birthdays, corporate events, weddings, wakes, and any celebration. Our experienced team will work with you to create the perfect event with flexible catering options and our preferred vendor network. Contact us on 01753 682707 for a personalised consultation."
          },
          {
            question: "Is there bingo at The Anchor pub?",
            answer: "Yes, we host cash prize bingo monthly. £10 per book with various prizes throughout the night, including a cash jackpot on the last game. Check our events calendar or follow us on social media for the next bingo night!"
          },
          {
            question: "Are children allowed at The Anchor events?",
            answer: "Children are always welcome at The Anchor with no time restrictions. Our drag shows have no age restriction, but please be aware there may be adult language. Some special events may be adults-only (18+). Please check when booking if bringing children."
          },
          {
            question: "How much are tickets for events at The Anchor?",
            answer: "Our monthly drag shows are FREE entry! Quiz night is £3 per person, and bingo is £10 per book. Special ticketed events vary in price - check our social media or call us for specific event pricing."
          },
          {
            question: "Is there entertainment every night at The Anchor?",
            answer: "We have scheduled entertainment throughout the month including monthly quiz nights, drag shows (alternating between Games Night and Karaoke Night), bingo nights, and special events. Check our What's On page or social media for upcoming dates."
          },
          {
            question: "What payment methods are accepted for events?",
            answer: "We accept cash and all major credit and debit cards, including American Express, for event entry fees, drinks, and food. Whether it's quiz night entry, bingo books, or your bar tab, we make payment easy and convenient."
          }
        ]}
        className="bg-gray-50"
      />

      {/* Stay Updated */}
      <section className="section-spacing bg-anchor-green text-white">
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
            <p>📱 WhatsApp: 01753 682707</p>
            <p>✉️ manager@the-anchor.pub</p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "EventSeries",
              "name": "Events at The Anchor",
              "description": "Regular monthly events including drag shows, quiz nights, and cash bingo",
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
                  "name": "Monthly Drag Shows",
                  "startDate": "2024-01-01T19:00",
                  "endDate": "2024-01-01T23:00",
                  "eventSchedule": {
                    "@type": "Schedule",
                    "repeatFrequency": "P1M"
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "When are the drag shows at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our fabulous drag shows run monthly, alternating between Nikki's Games Night (starting at 7pm) and Nikki's Karaoke Night (starting at 8pm). While there's no age restriction, please note there may be adult language. Entry is FREE but we recommend arriving early to get a good seat!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "What time is quiz night at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Quiz night is held monthly (date varies), starting at 7pm. Entry is £3 per person. Prizes include a £25 bar voucher for 1st place, and the 2nd from last team wins a bottle of wine. Check our social media for the next quiz date!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to book for events at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For most regular events like drag shows and quiz nights, booking isn't required but arriving early is recommended as we do get busy! For special events, private parties, or large groups, please call us on 01753 682707 to reserve your space."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I hire The Anchor for a private party?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We offer versatile venue spaces that can accommodate groups from 10 to 200 guests. Perfect for birthdays, corporate events, weddings, wakes, and any celebration. Our experienced team will work with you to create the perfect event with flexible catering options and our preferred vendor network. Contact us on 01753 682707 for a personalised consultation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there bingo at The Anchor pub?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we host cash prize bingo monthly. £10 per book with various prizes throughout the night, including a cash jackpot on the last game. Check our events calendar or follow us on social media for the next bingo night!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are children allowed at The Anchor events?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Children are always welcome at The Anchor with no time restrictions. Our drag shows have no age restriction, but please be aware there may be adult language. Some special events may be adults-only (18+). Please check when booking if bringing children."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much are tickets for events at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our monthly drag shows are FREE entry! Quiz night is £3 per person, and bingo is £10 per book. Special ticketed events vary in price - check our social media or call us for specific event pricing."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there entertainment every night at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We have scheduled entertainment throughout the month including monthly quiz nights, drag shows (alternating between Games Night and Karaoke Night), bingo nights, and special events. Check our What's On page or social media for upcoming dates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What payment methods are accepted for events?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We accept cash and all major credit and debit cards, including American Express, for event entry fees, drinks, and food. Whether it's quiz night entry, bingo books, or your bar tab, we make payment easy and convenient."
                  }
                }
              ]
            }
          ])
        }}
      />
    </>
  )
}