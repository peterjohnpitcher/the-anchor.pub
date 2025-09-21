import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import { StatusBar } from '@/components/StatusBar'
import { NextEventServer } from '@/components/NextEventServer'
import { Suspense, type CSSProperties } from 'react'
import { homepageFAQSchema } from '@/lib/enhanced-schemas'
import { parkingFacilitySchema } from '@/lib/schemas/parking'
import { LazySection } from '@/components/LazySection'
import { HeroWrapper } from '@/components/hero'
import { ReviewSection } from '@/components/reviews'
import { PhoneLinksSection, QuickEnquiryLinks } from '@/components/homepage/PhoneLinksSection'
import { PhoneLink } from '@/components/PhoneLink'
import { BookTableButton } from '@/components/BookTableButton'
import { DirectionsButton } from '@/components/DirectionsButton'
import ScrollDepthTracker from '@/components/tracking/ScrollDepthTracker'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { SpeakableSchema } from '@/components/seo/SpeakableSchema'
import { SpeakableContent } from '@/components/voice/SpeakableContent'
import { InternalLinkingSection, commonLinkGroups } from '@/components/seo/InternalLinkingSection'
import { getSeasonalHomepageImage, getSeasonalGreeting, getSeasonalAltText, getSeasonalFocal } from '@/lib/seasonal-utils'
import { 
  Button, 
  Card, 
  CardBody, 
  Container, 
  Grid, 
  GridItem,
  Alert,
  CTASection, 
  SectionHeader, 
  FeatureGrid, 
  QuickInfoGrid, 
  InfoBoxGrid,
  Section 
} from '@/components/ui'

// Revalidate every 24 hours to ensure seasonal images update
export const revalidate = 60 * 60 * 24 // 24 hours

export const metadata: Metadata = {
  title: 'The Anchor - Heathrow Pub & Dining | Traditional British Venue Near Terminal 5',
  description: 'THE ANCHOR - Famous traditional British pub & dining in Stanwell Moor. 7 mins from Heathrow. FREE parking, Sunday roasts from £14.99, Tuesday pizza 2-for-1. Beer garden under flight path. Book: 01753 682707',
  keywords: 'The Anchor, The Anchor Heathrow, Heathrow pub, pub near Heathrow, dining near Heathrow, plane spotting, beer garden, traditional British',
  alternates: {
    canonical: './'
  }
}

// Lazy load non-critical components
const BusinessHours = dynamic(() => import('@/components/BusinessHours').then(mod => ({ default: mod.BusinessHours })), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: true
})

const GalleryImage = dynamic(() => import('@/components/GalleryImage').then(mod => ({ default: mod.GalleryImage })), {
  loading: () => <div className="aspect-square bg-gray-100 animate-pulse rounded-lg" />,
  ssr: true
})

// Loading skeleton for NextEvent
function NextEventSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-100 rounded-2xl shadow-xl overflow-hidden h-[300px] animate-pulse"></div>
    </div>
  )
}


export default function HomePage() {
  // Get seasonal image configuration
  const seasonalImage = getSeasonalHomepageImage()
  const seasonalGreeting = getSeasonalGreeting(seasonalImage.season)
  const seasonalAltText = getSeasonalAltText(seasonalImage.season)
  const focal = getSeasonalFocal(seasonalImage.season)
  
  return (
    <>
      <ScrollDepthTracker />
      <SpeakableSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([homepageFAQSchema, parkingFacilitySchema]) }}
      />
      {/* Custom Hero Section with Seasonal Image */}
      <HeroWrapper
        route="/"
        size="hero"
        alignment="center"
        title={
          <span className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]">
            {seasonalGreeting}
          </span>
        }
        overlay="gradient"
        className="hero-focal"
        style={{
          '--hero-ox': `${focal.x}%`,
          '--hero-oy-mobile': `${focal.yMobile}%`,
          '--hero-oy-desktop': `${focal.yDesktop}%`
        } as CSSProperties}
        image={{
          src: seasonalImage.src,
          alt: seasonalAltText,
          priority: true,
          fallbackSrc: seasonalImage.fallback,
          blurDataURL: "data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQF/8QAGhAAAgMBAQAAAAAAAAAAAAAAAQIAAwQRIf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAZEQACAwEAAAAAAAAAAAAAAAACAwABMQT/2gAMAwEAAhEDEQA/ANOxLaMjPcVcr70CTruylQTmPeREIvZWFCfOotGp/9k="
        }}
        lead={
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/images/branding/the-anchor-pub-logo-white-transparent.png"
              alt="The Anchor logo - elegant anchor symbol with traditional British pub typography in white"
              width={320}
              height={320}
              sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
              className="mx-auto w-48 sm:w-64 lg:w-80 h-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
              priority
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzAwNTEzMSIvPjwvc3ZnPg=="
            />

            <p className="text-2xl sm:text-3xl text-white font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Where Everyone&apos;s Welcome
            </p>

            <p className="text-lg md:text-xl text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Your local pub <span className="inline-block motion-safe:wave">👋</span>
            </p>

            <div className="flex justify-center px-2 sm:px-0 w-full">
              <StatusBar
                variant="hero"
                className="self-center"
              />
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur-sm">
              ⭐ Highest-rated non-airport pub in the Heathrow area
            </span>
          </div>
        }
        tags={[
          { label: 'Free Parking', icon: '🚗', size: 'small', className: 'bg-white/15 text-white backdrop-blur-sm border border-white/10' },
          { label: 'Dog Friendly', icon: '🐕', size: 'small', className: 'bg-white/15 text-white backdrop-blur-sm border border-white/10' },
          { label: 'Family Welcome', icon: '👨‍👩‍👧‍👦', size: 'small', className: 'bg-white/15 text-white backdrop-blur-sm border border-white/10' },
          { label: 'Step-Free Access', icon: '♿', size: 'small', className: 'bg-white/15 text-white backdrop-blur-sm border border-white/10' },
          { label: '7 mins from Heathrow', icon: '✈️', size: 'small', className: 'bg-white/15 text-white backdrop-blur-sm border border-white/10' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-2 sm:px-0 max-w-md mx-auto">
            <BookTableButton
              source="homepage_hero"
              variant="primary"
              size="lg"
              fullWidth
              className="flex-1"
            />

            <Link
              href="/food-menu"
              className="flex-1"
            >
              <Button 
                variant="secondary"
                size="lg"
                fullWidth
              >
                🍽️ View Menu
              </Button>
            </Link>
          </div>
        }
        showStatusBar={false}
        showBreadcrumbs={false}
      />

      {/* Main Page Title for SEO */}
      <div className="bg-white pt-12 pb-8">
        <Container>
          <PageTitle 
            className="text-center text-anchor-green"
            seo={{ structured: true, speakable: true }}
          >
            The Anchor - Stanwell Moor's Favourite Local Pub
          </PageTitle>
          <p className="text-center text-lg text-gray-700 mt-4">
            The closest traditional British pub to Heathrow Airport - just 7 minutes from Terminal 5
          </p>
          
          {/* Trust Signals */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">⭐ Highest-rated non-airport pub near Heathrow (Google 4.6/5, 21 Sept 2025)</span>
            <span className="flex items-center gap-1">💷 Pub classics £10–£20 – fair village prices near Heathrow</span>
            <span className="flex items-center gap-1">🏡 Independent village pub minutes from Heathrow – no terminal access needed</span>
            <span className="flex items-center gap-1">✈️ Horton Road plane-spotting area – fuel up before or after your flight</span>
            <span className="flex items-center gap-1">🚗 20 FREE Parking Spaces</span>
            <span className="flex items-center gap-1">📍 Outside ULEZ Zone - Save £12.50 Daily</span>
          </div>
        </Container>
      </div>


      {/* What Makes Us Special */}
      <div className="bg-white section-spacing-md">
        <Container>
          <SectionHeader
            title="What Makes Us Special"
            subtitle="More than just a pub - we're the heart of the community"
          />
          
          <FeatureGrid
            columns={3}
            features={[
              {
                icon: "🤝",
                title: "Community Hub",
                description: "A gathering place for locals and visitors alike. From quiz nights to celebrations, we're where memories are made.",
                variant: "colored",
                color: "bg-anchor-sand/30",
                className: "card-warm p-8 text-center"
              },
              {
                icon: "🍽️",
                title: "Honest Food",
                description: "Traditional British pub classics. Famous Sunday roasts (pre-order required), fish & chips, burgers, and proper pub grub. Tuesday: Pizza BOGOF Deal!",
                variant: "colored",
                color: "bg-anchor-sand/30",
                className: "card-warm p-8 text-center"
              },
              {
                icon: "🎉",
                title: "Events & Entertainment",
                description: (
                  <>
                    <Link href="/whats-on/drag-shows" className="text-anchor-gold hover:text-anchor-gold-light underline font-semibold">
                      Spectacular Saturday drag shows
                    </Link>{" "}
                    with Nikki Manfadge, monthly quiz nights, and special events throughout the year.
                  </>
                ),
                variant: "colored",
                color: "bg-anchor-sand/30",
                className: "card-warm p-8 text-center"
              }
            ]}
            className="max-w-6xl mx-auto"
          />
        </Container>
      </div>

      {/* Key Information */}
      <div className="bg-anchor-cream section-spacing-md">
        <Container>
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Everything You Need to Know"
            />
            
            <QuickInfoGrid
              columns={4}
              items={[
                {
                  icon: "📍",
                  title: "Location",
                  subtitle: (
                    <SpeakableContent selector="contact-info" priority="high">
                      Horton Road, Stanwell Moor<br />
                      Surrey TW19 6AQ<br />
                      <span className="text-anchor-gold font-semibold">7 mins from Heathrow T5</span>
                    </SpeakableContent>
                  )
                },
                {
                  icon: "🕐",
                  title: "Opening Hours",
                  subtitle: (
                    <SpeakableContent selector="opening-hours" priority="high">
                      Live hours shown above<br />
                      Including kitchen times<br />
                      <span className="text-sm sm:text-xs">May vary on holidays</span>
                    </SpeakableContent>
                  )
                },
                {
                  icon: "📞",
                  title: "Get in Touch",
                  subtitle: <PhoneLinksSection source="homepage_quickinfo" />
                },
                {
                  icon: "⭐",
                  title: "Key Features",
                  subtitle: (
                    <>
                      Free Parking<br />
                      Dog Friendly<br />
                      <span className="text-anchor-gold font-semibold">Great Events</span>
                    </>
                  )
                }
              ]}
            />
            
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
              <p className="text-center text-gray-700">
                <strong className="text-anchor-green">Important:</strong> Sunday roasts require pre-order with £5 per person deposit by 1pm Saturday. 
                Regular menu available on Sundays without pre-order. Free parking for all guests.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Next Event */}
      <div className="bg-gray-50 section-spacing-md">
        <Container>
          <SectionHeader
            title="Next Event at The Anchor"
            subtitle="Don't miss out on what's coming up"
          />
          <Suspense fallback={<NextEventSkeleton />}>
            <NextEventServer />
          </Suspense>
        </Container>
      </div>


      {/* Heathrow Travelers Section */}
      <div className="bg-white section-spacing-md">
        <Container>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="✈️ Perfect for Heathrow Travelers"
              subtitle="Just 7-12 minutes from all terminals • Free parking • Real British experience"
            />
            
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "Why Stop at The Anchor?",
                  content: (
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <span className="text-2xl">💰</span>
                        <div>
                          <strong>Save Money:</strong> Airport food costs 2x more. Enjoy a proper meal for less.
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
                      <li className="flex gap-3">
                        <span className="text-2xl">✈️</span>
                        <div>
                          <strong>Plane Spotting:</strong> <Link href="/beer-garden" className="text-anchor-gold hover:text-anchor-gold-light underline">Beer garden</Link> with aircraft every 90 seconds.
                        </div>
                      </li>
                    </ul>
                  ),
                  variant: "default"
                },
                {
                  title: "Journey Times by Car",
                  content: (
                    <>
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
                        <Link href="/near-heathrow" className="block">
                          <Button variant="primary" size="lg" className="w-full sm:w-auto">
                            <span className="hidden sm:inline">Get Directions From Your Terminal</span>
                            <span className="sm:hidden">Get Directions</span>
                          </Button>
                        </Link>
                      </div>
                    </>
                  ),
                  variant: "default"
                }
              ]}
              className="mb-12"
            />
          </div>
        </Container>
      </div>

      {/* Photo Gallery */}
      <div className="bg-gray-50 section-spacing-md">
        <Container>
          <SectionHeader
            title="Life at The Anchor"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Food Photo - Now First */}
            <GalleryImage
              src="/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg"
              alt="Traditional Sunday roast at The Anchor"
              caption="Famous Sunday Roasts - Sunday roasts require pre-order with £5 per person deposit by 1pm Saturday"
              width={600}
              height={600}
              priority
            />
            
            {/* Event Photo - Now Second */}
            <GalleryImage
              src="/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg"
              alt="Entertainment at The Anchor - everyone welcome"
              caption="Saturday Night Entertainment"
              width={600}
              height={600}
              priority={false}
            />
            
            {/* Garden Photo */}
            <Link href="/beer-garden">
              <GalleryImage
                src="/images/garden/beer-garden/the-anchor-beer-garden-heathrow-flight-path.jpg"
                alt="Beer garden at The Anchor - plane spotting paradise"
                caption="Beer Garden & Plane Spotting"
                width={600}
                height={600}
                priority={false}
              />
            </Link>
          </div>
        </Container>
      </div>

      {/* Private Events Section */}
      <div className="bg-white section-spacing-md">
        <Container>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Host Your Event at The Anchor"
              subtitle="From intimate gatherings to grand celebrations"
            />
            
            <Grid cols={3} gap="lg" className="mb-12">
              <Link href="/corporate-events" className="group">
                <Card variant="default" className="h-full transition-all hover:shadow-lg hover:scale-105">
                  <CardBody className="text-center">
                    <div className="text-4xl mb-4">💼</div>
                    <h2 className="text-xl font-bold text-anchor-green mb-2 group-hover:text-anchor-gold">Corporate Events</h2>
                    <p className="text-gray-700 mb-4">
                      Professional venue for meetings, team building, and conferences. 
                      7 minutes from Heathrow with free parking.
                    </p>
                    <p className="text-anchor-gold font-semibold">Learn more →</p>
                  </CardBody>
                </Card>
              </Link>
              
              <Link href="/christmas-parties" className="group">
                <Card variant="default" className="h-full transition-all hover:shadow-lg hover:scale-105 bg-red-50">
                  <CardBody className="text-center">
                    <div className="text-4xl mb-4">🎄</div>
                    <h2 className="text-xl font-bold text-anchor-green mb-2 group-hover:text-anchor-gold">Christmas Parties</h2>
                  <p className="text-gray-700 mb-4">
                    Book your festive celebration now! Traditional menus, 
                    festive atmosphere, and memorable celebrations.
                  </p>
                  <p className="text-anchor-gold font-semibold">Check availability →</p>
                  </CardBody>
                </Card>
              </Link>
              
              <Link href="/private-party-venue" className="group">
                <Card variant="default" className="h-full transition-all hover:shadow-lg hover:scale-105 bg-pink-50">
                  <CardBody className="text-center">
                    <div className="text-4xl mb-4">🎉</div>
                    <h2 className="text-xl font-bold text-anchor-green mb-2 group-hover:text-anchor-gold">Private Parties</h2>
                    <p className="text-gray-700 mb-4">
                      Birthdays, anniversaries, and celebrations. 
                      Flexible spaces, custom menus, your music.
                    </p>
                    <p className="text-anchor-gold font-semibold">Plan your party →</p>
                  </CardBody>
                </Card>
              </Link>
            </Grid>
            
            <Card variant="default" className="bg-anchor-cream">
              <CardBody>
                <Grid cols={2} gap="lg" align="center">
                <div>
                  <h2 className="text-2xl font-bold text-anchor-green mb-4">Why Choose The Anchor?</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600">✓</span>
                      <span><strong>Flexible venue hire pricing</strong> - tailored to your event</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600">✓</span>
                      <span><strong>Free parking</strong> for all your guests</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600">✓</span>
                      <span><strong>Flexible spaces</strong> for 10-200 guests</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600">✓</span>
                      <span><strong>Custom catering</strong> to suit all budgets</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600">✓</span>
                      <span><strong>Experienced team</strong> to handle every detail</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-6">
                    From business meetings to birthday parties, 
                    we make your event special.
                  </p>
                  <Link href="/book-event">
                    <Button 
                      variant="primary" 
                      size="lg"
                    >
                      Explore All Event Options
                    </Button>
                  </Link>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Quick enquiry?</strong>
                    </p>
                    <QuickEnquiryLinks />
                  </div>
                </div>
              </Grid>
            </CardBody>
          </Card>
          </div>
        </Container>
      </div>

      {/* Customer Reviews */}
      <ReviewSection 
        title="What Our Customers Say"
        subtitle="Real reviews from our guests"
        background="white"
        layout="carousel"
      />

      {/* Internal Links for SEO */}
      <InternalLinkingSection 
        title="Explore More"
        links={commonLinkGroups.mainPages}
        className="section-spacing-md"
      />

      {/* Find Us Section */}
      <div id="visit-us" className="bg-anchor-green text-white section-spacing-lg">
        <Container>
          <div className="max-w-6xl mx-auto flex flex-col justify-center">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Come Visit Us!
              </h2>
            </div>
            
            <Grid cols={2} gap="lg" align="center">
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
                
                <DirectionsButton
                  href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
                  source="home_footer_cta"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white text-anchor-green hover:bg-gray-100"
                >
                  Get Directions on Google Maps
                </DirectionsButton>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3 text-white">🕐 Hours & Weather</h3>
                <BusinessHours variant="condensed" showKitchen={true} showWeather={true} />
              </div>
            </Grid>
          </div>
        </Container>
      </div>

      {/* LocalBusiness Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://www.the-anchor.pub/#business",
            "name": "The Anchor",
            "description": "The closest traditional British pub to Heathrow Airport. Famous Sunday roasts, beer garden under flight path, FREE parking.",
            "url": "https://www.the-anchor.pub",
            "telephone": "+441753682707",
            "email": "manager@the-anchor.pub",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Horton Road",
              "addressLocality": "Stanwell Moor",
              "addressRegion": "Surrey",
              "postalCode": "TW19 6AQ",
              "addressCountry": "GB"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 51.462509,
              "longitude": -0.502067
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
                "opens": "16:00",
                "closes": "22:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Friday",
                "opens": "16:00",
                "closes": "00:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "12:00",
                "closes": "00:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "12:00",
                "closes": "22:00"
              }
            ],
            "priceRange": "££",
            "servesCuisine": ["British", "Pub Food"],
            "amenityFeature": [
              { "@type": "LocationFeatureSpecification", "name": "Free Parking", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Dog Friendly", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Family Friendly", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Wheelchair Accessible", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Beer Garden", "value": true }
            ],
            "hasMap": "https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ",
            "publicAccess": true,
            "isAccessibleForFree": true,
            "keywords": "The Anchor, pub near Heathrow, Stanwell Moor pub, plane spotting pub, Sunday roast Surrey"
          })
        }}
      />

    </>
  )
}
