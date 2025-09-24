import { Metadata } from 'next'
import Link from 'next/link'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { Section, Card, CardBody, Button, Badge } from '@/components/ui'
import { BookTableButton } from '@/components/BookTableButton'
import { DirectionsButton } from '@/components/DirectionsButton'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { DEFAULT_DRINKS_IMAGE } from '@/lib/image-fallbacks'
import { getTwitterMetadata } from '@/lib/twitter-metadata'

export const metadata: Metadata = {
  title: 'Jagerbomb Shots Near Heathrow | The Anchor Pub Drink Menu',
  description: 'Order Jagerbomb shots at The Anchor near Heathrow. Served ice cold for £4.50 or 3 for £12. Perfect pre-flight energy boost with free parking and late opening.',
  keywords: 'jagerbomb near heathrow, energy drink shot stanwell moor, jagermeister red bull pub, party shots near terminal 5, jagerbomb price the anchor',
  openGraph: {
    title: 'Jagerbomb Shots Near Heathrow | The Anchor Pub',
    description: 'Grab ice cold Jagerbombs for £4.50 or 3 for £12 at The Anchor, minutes from Heathrow with free parking.',
    images: [DEFAULT_DRINKS_IMAGE],
  },
  twitter: getTwitterMetadata({
    title: 'Jagerbomb Shots Near Heathrow | The Anchor Pub',
    description: 'Grab ice cold Jagerbombs for £4.50 or 3 for £12 at The Anchor, minutes from Heathrow with free parking.',
    images: [DEFAULT_DRINKS_IMAGE]
  }),
  alternates: {
    canonical: '/drinks/jagerbomb'
  }
}

const jagerbombSchema = {
  '@context': 'https://schema.org',
  '@type': 'MenuItem',
  '@id': 'https://www.the-anchor.pub/drinks/jagerbomb#menu-item',
  name: 'Jagerbomb Shot',
  description: 'Classic Jagermeister and energy drink shot served ice cold at The Anchor near Heathrow.',
  image: `https://www.the-anchor.pub${DEFAULT_DRINKS_IMAGE}`,
  offers: [
    {
      '@type': 'Offer',
      price: '4.50',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitText: 'shot'
      }
    },
    {
      '@type': 'Offer',
      name: 'Three Shot Bundle',
      price: '12.00',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: 3,
        unitText: 'shots'
      }
    }
  ],
  nutrition: {
    '@type': 'NutritionInformation',
    calories: '130',
    servingSize: '60ml'
  }
}

export default function JagerbombPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Drinks', url: '/drinks' },
    { name: 'Jagerbomb', url: '/drinks/jagerbomb' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, jagerbombSchema]) }}
      />

      <HeroWrapper
        route="/drinks/jagerbomb"
        title="Jagerbomb Shots Near Heathrow"
        description="Ice cold Jagermeister and energy drink - party starters minutes from Terminal 5"
        overlay="gradient"
        breadcrumbs={[
          { name: 'Drinks', href: '/drinks' },
          { name: 'Jagerbomb' }
        ]}
        className="min-h-[40vh]"
        tags={[
          { label: '£4.50 each', variant: 'primary' },
          { label: '3 for £12 bundle', variant: 'success' },
          { label: 'Served ice cold', variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4">
            <BookTableButton
              source="jagerbomb_hero"
              context="drinks_jagerbomb"
              variant="primary"
              size="lg"
              fullWidth
              className="w-full sm:w-auto"
            >
              📅 Book a Table
            </BookTableButton>
            <DirectionsButton
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
              source="jagerbomb_hero"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              📍 Get Directions
            </DirectionsButton>
          </div>
        }
      />

      <Section background="white" spacing="lg" container containerSize="md">
        <article className="max-w-3xl mx-auto prose prose-lg max-w-none">
          <h1 className="text-anchor-green text-3xl md:text-4xl font-bold mb-6">
            Jagerbombs at The Anchor - Heathrow Pub & Dining
          </h1>
          <p className="text-gray-700 text-lg">
            Need an energy lift before a night out or long-haul flight? Our Jagerbombs blend ice cold Jagermeister with punchy energy drink for a sharp blast of sweetness and spice. We keep the short glasses frosted, pour to order and serve with a smile that says “holiday mode starts now”.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold text-anchor-green mb-3">Prices</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center justify-between">
                    <span>Single Jagerbomb</span>
                    <Badge variant="primary">£4.50</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Bundle of three</span>
                    <Badge variant="success">£12.00</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Shot tray (ask team)</span>
                    <Badge variant="secondary">Perfect for groups</Badge>
                  </li>
                </ul>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold text-anchor-green mb-3">When They Hit Best</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>⚡ Pre-party jump start before cab rides to central London</li>
                  <li>✈️ Celebrating a safe touchdown after long-haul flights</li>
                  <li>🎉 Birthdays, stag dos and drag show intervals</li>
                  <li>🏉 Half-time buzz during live sport nights</li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-anchor-green mb-4">How We Pour Them</h2>
          <p className="text-gray-700 mb-4">
            We fill a short glass with ice cold energy drink, drop in a chilled Jagermeister shot glass and serve immediately. Fast, punchy and consistent every time. Prefer it sipped rather than bombed? Ask for the shot on the side.
          </p>
          <p className="text-gray-700">
            Travelling with hand luggage only? Relax in the beer garden, get your Jagerbomb fix without airport bar prices and we will call you a taxi back when you are ready to head off.
          </p>
        </article>
      </Section>

      <Section background="gray" spacing="lg" container containerSize="md">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold text-anchor-green mb-3">Make It a Shared Round</h2>
              <p className="text-gray-700 mb-4">
                Pair Jagerbombs with our pizza sharing boards or late-night bar snacks. Tuesday pizza night makes them even better value.
              </p>
              <Link href="/pizza-tuesday">
                <Button variant="secondary" size="lg">🍕 View Pizza Tuesday</Button>
              </Link>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold text-anchor-green mb-3">Designated Driver Options</h2>
              <p className="text-gray-700 mb-4">
                We stock premium alcohol free beers, sodas and mocktails so the driver still enjoys a proper night out.
              </p>
              <Link href="/drinks">
                <Button variant="secondary" size="lg">🍺 See Drinks Menu</Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </Section>

      <FAQAccordionWithSchema
        className="bg-white"
        faqs={[
          {
            question: 'How much is a Jagerbomb at The Anchor?',
            answer: 'A single Jagerbomb costs £4.50 and a round of three is £12. Ask the bar team if you would like a larger tray for parties.'
          },
          {
            question: 'Do you serve Jagerbombs every day?',
            answer: 'Yes, Jagerbombs are available whenever the bar is open. They are most popular on quiz nights, drag shows and Friday or Saturday evenings.'
          },
          {
            question: 'Can I order Jagerbombs near Heathrow Airport before a flight?',
            answer: 'Absolutely. We are seven minutes from Heathrow Terminal 5 with free parking. Enjoy a few Jagerbombs, then we can arrange a taxi back to the terminal for you.'
          }
        ]}
      />
    </>
  )
}
