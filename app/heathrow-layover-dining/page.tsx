import Link from 'next/link'
import { Metadata } from 'next'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { Container, Section, Button } from '@/components/ui'
import { SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { BookTableButton } from '@/components/BookTableButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { SpeakableSchema } from '@/components/seo/SpeakableSchema'
import { SpeakableContent } from '@/components/voice/SpeakableContent'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { DEFAULT_NEAR_HEATHROW_IMAGE } from '@/lib/image-fallbacks'
import { FoodStickyCtaBar } from '@/components/food/FoodStickyCtaBar'

export const metadata: Metadata = {
  title: 'Heathrow Layover Dining Guide | Eat in 90 Minutes at The Anchor',
  description: 'Make the most of a Heathrow layover with The Anchor’s fast pub dining, free parking, and book-ahead tips. Perfect for 2–3 hour stopovers near Terminal 5.',
  keywords: 'heathrow layover dining, layover restaurant near heathrow, layover itinerary terminal 5, eat near heathrow airport, quick restaurant near heathrow',
  openGraph: {
    title: 'Heathrow Layover Dining in 90 Minutes | The Anchor Stanwell Moor',
    description: 'Swap airport queues for proper pub food 7 minutes from Heathrow. Booking tips, itineraries, and travel times for stress-free layovers.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE],
  },
  alternates: {
    canonical: '/heathrow-layover-dining'
  },
  twitter: getTwitterMetadata({
    title: 'Heathrow Layover Dining in 90 Minutes | The Anchor Stanwell Moor',
    description: 'Free parking, fast service, and hearty pub food 7 minutes from T5. Book a table for your Heathrow layover.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE]
  })
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Near Heathrow', url: '/near-heathrow' },
  { name: 'Heathrow Layover Dining', url: '/heathrow-layover-dining' }
])

const faqItems = [
  {
    question: 'How long do I need for a layover meal at The Anchor?',
    answer: 'Allow 90 minutes door-to-door from Terminal 5 (longer if using Terminals 2–4). That gives you 15 minutes travel each way and 60 minutes to dine. Let us know your timing on booking so the kitchen can pace your service.'
  },
  {
    question: 'Can I store luggage while I dine?',
    answer: 'Yes. We have a luggage-friendly corner in the dining room where cabin cases and long-haul bags can stay in sight but out of walkways. For very large items, speak to the team when booking so we can reserve extra space.'
  },
  {
    question: 'Is there free parking for layover guests?',
    answer: 'Layover guests receive three hours free parking. Register your number plate at the bar on arrival. Need longer? Let us know and we can extend it or advise on our overnight parking option.'
  },
  {
    question: 'Do you cater for dietary requirements and quick service?',
    answer: 'Absolutely. We have vegetarian, vegan, and gluten-free options across the menu. Mention dietary needs and flight times when booking so we can prepare dishes quickly.'
  },
  {
    question: 'How do I reach The Anchor from Heathrow terminals?',
    answer: 'Taxi or rideshare is the fastest: 7 minutes from T5, 11 minutes from T2/3, and 14 minutes from T4. You can also take the 442 bus towards Staines and hop off in Stanwell Moor, then walk three minutes to the pub.'
  }
]

export default function HeathrowLayoverDiningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SpeakableSchema />

      <HeroWrapper
        route="/heathrow-layover-dining"
        title="Heathrow Layover Dining in 90 Minutes"
        description="Swap airport queues for proper British pub food with free parking just 7 minutes from Terminal 5."
        size="large"
        breadcrumbs={[
          { name: 'Near Heathrow', href: '/near-heathrow' },
          { name: 'Layover Dining' }
        ]}
        tags={[
          { label: '✈️ 7 mins from T5', variant: 'success' },
          { label: '⏱️ 90-min itineraries', variant: 'default' },
          { label: '🍽️ Full menu served fast', variant: 'default' },
          { label: '🚗 Free parking', variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4">
            <BookTableButton
              source="layover_hero"
              context="heathrow_layover"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Book Layover Table
            </BookTableButton>
            <Link href="#itineraries" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                className="sm:w-auto"
              >
                View Layover Itineraries
              </Button>
            </Link>
          </div>
        }
      />

      <Section background="white" spacing="md">
        <Container>
          <PageTitle
            className="text-center text-anchor-green"
            seo={{ structured: true, speakable: true }}
          >
            Heathrow Layover Dining at The Anchor
          </PageTitle>
          <SpeakableContent className="mt-6 text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Plan a stress-free Heathrow layover meal. The Anchor serves Sunday roasts, Pizza Tuesday, and pub classics with free parking, fast service, and reliable travel times back to your terminal.
          </SpeakableContent>
        </Container>
      </Section>

      <Section background="white" spacing="lg" className="bg-white">
        <Container>
          <SectionHeader
            title="Why Layover Guests Choose The Anchor"
            subtitle="Proper food, friendly service, and timings that work around airport schedules."
            align="center"
          />
          <FeatureGrid
            columns={3}
            features={[
              {
                icon: '⏱️',
                title: 'In & Out in 90 Minutes',
                description: 'Pre-order or choose from our express menu for a relaxed meal without clock-watching. Tell us your flight time and we pace courses accordingly.'
              },
              {
                icon: '🍽️',
                title: 'Full Menu, All Day',
                description: 'From Sunday roasts to 2-for-1 Pizza Tuesday, vegetarian plates, and speedy sharers, every layover party finds something spot on.'
              },
              {
                icon: '🚗',
                title: 'Free Parking & Easy Transfers',
                description: 'Register your car for three hours free. Need a cab back? We’ll organise one with our trusted local partners.'
              },
              {
                icon: '🧳',
                title: 'Luggage-Friendly Seating',
                description: 'Plenty of space at tables for hand luggage and suitcases — we’ll help you keep everything nearby and secure.'
              },
              {
                icon: '📶',
                title: 'Work-Friendly Amenities',
                description: 'Free WiFi, plug sockets, and quiet corners when you need to catch up on email or plan the onward journey.'
              },
              {
                icon: '🥂',
                title: 'Perfect for Crew & Families',
                description: 'Airline staff, business travelers, and families rate us for group menus, kids’ portions, and celebratory welcome-back drinks.'
              }
            ]}
          />
        </Container>
      </Section>

      <Section id="itineraries" background="white" spacing="lg">
        <Container>
          <SectionHeader
            title="Layover Itineraries That Work"
            subtitle="Pick the layover that matches your schedule and we’ll keep everything running smoothly."
          />
          <div className="grid gap-8 md:grid-cols-3">
            <AlertBox
              title="90-Minute Express"
              variant="success"
              content={
                <ul className="space-y-2">
                  <li>Taxi from Terminal 5 – 7 minutes</li>
                  <li>Pre-ordered mains arrive 10 minutes after seating</li>
                  <li>Coffee &amp; dessert to-go for airport return</li>
                  <li>Taxi booked back 30 minutes before boarding gate closes</li>
                </ul>
              }
            />
            <AlertBox
              title="3-Hour Leisure"
              variant="info"
              content={
                <ul className="space-y-2">
                  <li>Welcome drinks and sharers on arrival</li>
                  <li>Main course + dessert paced over 90 minutes</li>
                  <li>Short walk on Stanwell Moor village green</li>
                  <li>Use free WiFi to check-in before departure</li>
                </ul>
              }
            />
            <AlertBox
              title="Overnight Stopover"
              variant="warning"
              content={
                <ul className="space-y-2">
                  <li>Dinner at The Anchor followed by nightcap in the bar</li>
                  <li>Partner hotel introductions for late check-out</li>
                  <li>Overnight parking arrangements available</li>
                  <li>Breakfast recommendations before you fly</li>
                </ul>
              }
            />
          </div>
        </Container>
      </Section>

      <Section background="cream" spacing="lg">
        <Container>
          <SectionHeader
            title="Travel Times & Costs"
            subtitle="Budget your layover with realistic timings and typical fares."
          />
          <div className="overflow-x-auto rounded-xl shadow-md bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-anchor-green text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Terminal</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Taxi / Uber</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Public Transport</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                <tr>
                  <td className="px-6 py-4 font-semibold text-anchor-green">Terminal 5</td>
                  <td className="px-6 py-4">7 minutes • £12–£18</td>
                  <td className="px-6 py-4">Bus 442 • 20 minutes + 3 minute walk</td>
                  <td className="px-6 py-4">Fast crew dinners & short layovers</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-anchor-green">Terminals 2 & 3</td>
                  <td className="px-6 py-4">11 minutes • £16–£22</td>
                  <td className="px-6 py-4">Elizabeth Line + bus transfer • 30 minutes</td>
                  <td className="px-6 py-4">Families meeting arrivals</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-anchor-green">Terminal 4</td>
                  <td className="px-6 py-4">14 minutes • £18–£24</td>
                  <td className="px-6 py-4">Shuttle to T5 + bus • 35 minutes</td>
                  <td className="px-6 py-4">Overnight guests staying nearby</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section background="white" spacing="lg">
        <Container>
          <SectionHeader
            title="Make the Most of Your Layover"
            subtitle="Stretch your legs, stay connected, and head back to departures refreshed."
          />
          <InfoBoxGrid
            columns={3}
            boxes={[
              {
                title: 'Plane-Spotting Patio',
                content: (
                  <p>Watch final approaches with a pint in hand. Great for aviation fans and families.</p>
                )
              },
              {
                title: 'Charging & WiFi',
                content: (
                  <p>Power up devices and download shows before you board. Ask staff for quiet seating.</p>
                )
              },
              {
                title: 'Local Walks',
                content: (
                  <p>Take a 15-minute stroll along the River Colne or Stanwell Moor village green between courses.</p>
                )
              },
              {
                title: 'Group-Friendly Menus',
                content: (
                  <p>Pre-set menus available for crew briefings or incentive trips. Email events@the-anchor.pub for options.</p>
                )
              },
              {
                title: 'Takeaway Ready',
                content: <p>All-day menu items travel well — take leftovers or order takeaway pizzas for the onward journey.</p>
              }
            ]}
          />
        </Container>
      </Section>

      <FAQAccordionWithSchema
        title="Heathrow Layover Dining FAQs"
        faqs={faqItems}
        className="bg-anchor-cream/40"
      />

      <Section background="white" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto text-center bg-anchor-sand/40 rounded-3xl p-10 shadow-sm">
            <h2 className="text-3xl font-bold text-anchor-green mb-4">Ready to Book Your Layover Meal?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Tell us your flight number, party size, and arrival time. We’ll confirm the best itinerary, reserve parking, and keep a taxi on standby so you return to Heathrow relaxed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <BookTableButton
                source="layover_footer"
                context="heathrow_layover"
                variant="primary"
                size="lg"
              >
                Reserve Layover Dining
              </BookTableButton>
              <Link href="https://wa.me/441753682707" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="sm:w-auto border-anchor-green text-anchor-green hover:bg-anchor-green hover:text-white"
                >
                  WhatsApp for Quick Plan
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <FoodStickyCtaBar
        ctaContext="heathrow_layover"
        whatsapp={{
          href: 'https://wa.me/441753682707?text=Hi%20Anchor%20Team!%20I%20have%20a%20Heathrow%20layover%20and%20need%20to%20book%20a%20table.',
          label: 'Plan via WhatsApp',
          id: 'whatsapp_heathrow_layover'
        }}
        label="Book Layover Meal"
      />
    </>
  )
}
