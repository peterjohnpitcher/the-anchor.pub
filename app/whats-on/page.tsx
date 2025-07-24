import Image from 'next/image'
import Link from 'next/link'
import { Button, Container, Section, Card, CardBody, Grid } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { FilteredUpcomingEvents } from '@/components/FilteredUpcomingEvents'
import { CategoryFilter } from '@/components/CategoryFilter'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { EventSchema } from '@/components/EventSchema'
import { staticEvents } from '@/lib/static-events'
import ScrollDepthTracker from '@/components/tracking/ScrollDepthTracker'
import { SocialLink } from '@/components/SocialLink'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { SpeakableSchema } from '@/components/seo/SpeakableSchema'
import { SpeakableContent } from '@/components/voice/SpeakableContent'
import { InternalLinkingSection, commonLinkGroups } from '@/components/seo/InternalLinkingSection'

export const metadata: Metadata = {
  title: "What's On Near Me | The Anchor Stanwell Moor | Events & Entertainment",
  description: "Regular monthly events at The Anchor pub in Surrey including drag shows, quiz nights, bingo & more. Plus major sports on TV near Heathrow!",
  keywords: "events stanwell moor, drag shows near heathrow, quiz night stanwell, pub entertainment surrey",
  openGraph: {
    title: "What's On at The Anchor",
    description: "Drag shows, quiz nights and more. Your local entertainment hub.",
    images: ["/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg"],
  },
  twitter: getTwitterMetadata({
    title: "What's On at The Anchor - Events & Entertainment",
    description: "Regular monthly events including drag shows, quiz nights, bingo & more. Plus major sports on TV!",
    images: ["/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg"]
  })
}

type WhatsOnPageProps = {
  searchParams: { category?: string }
}

export default function WhatsOnPage({ searchParams }: WhatsOnPageProps) {
  return (
    <>
      <SpeakableSchema />
      <ScrollDepthTracker />
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#upcoming-events">
              <Button 
                variant="primary"
                size="lg"
              >
                📅 View All Events
              </Button>
            </Link>
            <Link href="/book-event">
              <Button 
                variant="secondary"
                size="lg"
              >
                🎉 Book Private Event
              </Button>
            </Link>
          </div>
        }
      />

      {/* Page Title */}
      <div className="bg-white py-8">
        <Container>
          <PageTitle className="text-center text-anchor-green" seo={{ structured: true, speakable: true }}>
            What's On - Events & Entertainment at The Anchor
          </PageTitle>
        </Container>
      </div>

      {/* Upcoming Events from API */}
      <div id="upcoming-events" className="bg-white section-spacing-md">
        <Container>
          <SectionHeader
            title="Upcoming Events"
            subtitle="Live updates from our events calendar"
          />
          
          <SpeakableContent selector="events-list" priority="high">
            <div className="max-w-5xl mx-auto">
              <Suspense fallback={<div className="text-center py-8">Loading events...</div>}>
                <CategoryFilter />
              </Suspense>
              <Suspense fallback={<div className="text-center py-8">Loading events...</div>}>
                <FilteredUpcomingEvents categorySlug={searchParams.category} />
              </Suspense>
            </div>
          </SpeakableContent>
        </Container>
      </div>

      {/* Featured Events */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 section-spacing-md">
        <Container>
          <SectionHeader
            title="Monthly Highlights"
            subtitle="Our most popular regular events"
          />
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/whats-on/drag-shows" className="group">
              <Card variant="default" className="h-full transition-all hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-100 to-pink-100">
                <CardBody className="text-center p-8">
                  <div className="text-5xl mb-4">👑</div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-3 group-hover:text-purple-700">
                    Drag Shows with Nikki Manfadge
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Spectacular Saturday entertainment with games, karaoke, and fierce performances.
                  </p>
                  <p className="text-purple-700 font-semibold">Learn more →</p>
                </CardBody>
              </Card>
            </Link>
            
            <Card variant="default" className="h-full bg-gradient-to-br from-blue-50 to-green-50">
              <CardBody className="text-center p-8">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold text-anchor-green mb-3">
                  Quiz Night
                </h3>
                <p className="text-gray-700 mb-4">
                  Test your knowledge monthly. £3 entry, great prizes, and brilliant atmosphere.
                </p>
                <p className="text-sm text-gray-600">Check calendar for dates</p>
              </CardBody>
            </Card>
            
            <Card variant="default" className="h-full bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardBody className="text-center p-8">
                <div className="text-5xl mb-4">🎱</div>
                <h3 className="text-2xl font-bold text-anchor-green mb-3">
                  Cash Prize Bingo
                </h3>
                <p className="text-gray-700 mb-4">
                  Monthly bingo nights with cash prizes. £10 per book, jackpot on the last game!
                </p>
                <p className="text-sm text-gray-600">Check calendar for dates</p>
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>

      {/* Entertainment & Games */}
      <div className="bg-white section-spacing-md">
        <Container>
          <SectionHeader
            title="Daily Entertainment & Games"
            subtitle="Always something to do at The Anchor - from traditional pub games to digital entertainment"
          />
          
          <FeatureGrid
            columns={4}
            features={[
              {
                icon: "🎱",
                title: "Pool Table",
                description: "Challenge your friends to a game. Cues and chalk provided.",
                variant: "default",
                className: "bg-white rounded-xl p-6 text-center shadow-sm"
              },
              {
                icon: "🎯",
                title: "Darts Board",
                description: "Professional board with oche. Darts available at the bar.",
                variant: "default",
                className: "bg-white rounded-xl p-6 text-center shadow-sm"
              },
              {
                icon: "🎵",
                title: "Jukebox",
                description: "Choose your favourite tunes. Wide selection of music genres.",
                variant: "default",
                className: "bg-white rounded-xl p-6 text-center shadow-sm"
              },
              {
                icon: "🎰",
                title: "Fruit Machine",
                description: "Try your luck on our gaming machine. 18+ only.",
                variant: "default",
                className: "bg-white rounded-xl p-6 text-center shadow-sm"
              }
            ]}
            className="max-w-5xl mx-auto"
          />
          
          <Card variant="default" className="mt-12 max-w-3xl mx-auto">
            <CardBody className="text-center">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">
                <span className="text-3xl">📶</span> Free WiFi Throughout
              </h3>
              <p className="text-gray-700">
                Stay connected with our free, high-speed WiFi. Perfect for checking emails, social media, or even getting some work done. 
                Our dining room features tables with power points - ideal for remote workers and digital nomads.
              </p>
            </CardBody>
          </Card>
        </Container>
      </div>


      {/* Special Events */}
      <div className="bg-white section-spacing-md">
        <Container>
          <SectionHeader
            title="Special Events & Celebrations"
            subtitle="Throughout the year, we host special themed events and celebrations"
          />
          
          <SpeakableContent selector="special-events" priority="medium">
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "🎄",
                  title: "Christmas Parties",
                  description: "Festive menu, decorations, and party atmosphere. Book your Christmas do with us!",
                  className: "text-center"
                },
                {
                  icon: "🎃",
                  title: "Halloween Spectacular",
                  description: "Costume contests, spooky decorations, themed drinks, and DJ entertainment. Best dressed wins prizes!",
                  className: "text-center"
                },
                {
                  icon: "🎉",
                  title: "New Year's Eve",
                  description: "Ring in the new year with DJ entertainment, champagne, and midnight celebrations.",
                  className: "text-center"
                }
              ]}
              className="max-w-5xl mx-auto"
            />
          </SpeakableContent>
          
          <InfoBoxGrid
            columns={1}
            boxes={[
              {
                title: "Watch Sports at The Anchor",
                content: (
                  <>
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
                  </>
                ),
                variant: "default",
                className: "bg-white rounded-lg p-8 shadow-lg"
              }
            ]}
            className="mt-12 max-w-3xl mx-auto"
          />
        </Container>
      </div>

      {/* Private Events */}
      <div className="bg-anchor-cream section-spacing-md">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Host Your Event at The Anchor"
              subtitle="Transform your special occasion into an unforgettable experience. We offer versatile venue spaces for 10-200 guests with comprehensive event services including catering, entertainment, and our preferred vendor network."
            />
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "🎂",
                  title: "Birthday Parties",
                  description: "Celebrate in style with custom menus",
                  variant: "default",
                  className: "bg-white rounded-lg p-6 text-center"
                },
                {
                  icon: "💼",
                  title: "Corporate Events",
                  description: "Team building, meetings, or celebrations",
                  variant: "default",
                  className: "bg-white rounded-lg p-6 text-center"
                },
                {
                  icon: "🎊",
                  title: "Special Occasions",
                  description: "Engagements, anniversaries, and more",
                  variant: "default",
                  className: "bg-white rounded-lg p-6 text-center"
                }
              ]}
              className="mb-8"
            />
            <Link href="/book-event">
              <Button variant="primary" size="lg">
                Enquire About Private Events
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      {/* Internal Links for SEO */}
      <InternalLinkingSection 
        title="Discover More at The Anchor"
        links={[...commonLinkGroups.dining, { href: '/blog', title: 'Latest News', description: 'Updates and announcements' }]}
        className="section-spacing-md"
      />

      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "When are the drag shows at The Anchor?",
            answer: "Our fabulous drag shows run monthly, alternating between Nikki's Games Night and Nikki's Karaoke Night (both starting at 7pm). While there's no age restriction, please note there may be adult language. Entry is FREE but we recommend arriving early to get a good seat!"
          },
          {
            question: "What time is quiz night at The Anchor?",
            answer: "Quiz night is held monthly (date varies), starting at 7pm. Entry is £3 per person. Prizes include a £25 bar voucher for 1st place, and the 2nd from last team wins a bottle of wine. Cheque our social media for the next quiz date!"
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
            answer: "Yes, we host cash prize bingo monthly. £10 per book with various prizes throughout the night, including a cash jackpot on the last game. Cheque our events calendar or follow us on social media for the next bingo night!"
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
      <CTASection
        title="Never Miss an Event"
        description="Follow us on social media for the latest updates, special events, and last-minute changes"
        buttons={[]}
        variant="green"
      >
        <div className="flex justify-center gap-6 mb-8">
          <SocialLink
            platform="facebook"
            href="https://www.facebook.com/theanchorpubsm/"
            source="whats_on_page"
            className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colors text-white"
          >
            Facebook
          </SocialLink>
          <SocialLink
            platform="instagram"
            href="https://www.instagram.com/theanchor.pub/"
            source="whats_on_page"
            className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-colours text-white"
          >
            Instagram
          </SocialLink>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
          <p className="font-semibold mb-2 text-white">Event Enquiries</p>
          <p className="text-white">📞 01753 682707</p>
          <p className="text-white">📱 WhatsApp: 01753 682707</p>
          <p className="text-white">✉️ manager@the-anchor.pub</p>
        </div>
      </CTASection>

      {/* Event Schemas for Monthly Events */}
      <EventSchema event={staticEvents.dragShows} />
      <EventSchema event={staticEvents.quizNight} />
      <EventSchema event={staticEvents.bingoNight} />
    </>
  )
}