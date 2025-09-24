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
  title: 'Aperol Spritz Near Heathrow | Summer Spritz Cocktails | The Anchor',
  description: 'Order Aperol Spritz cocktails at The Anchor near Heathrow. £8.00 classic serve with prosecco, soda and orange slice. Perfect garden drink with free parking.',
  keywords: 'aperol spritz near heathrow, summer cocktail stanwell moor, aperitivo near terminal 5, prosecco spritz pub, aperol price the anchor',
  openGraph: {
    title: 'Aperol Spritz Near Heathrow | The Anchor Pub',
    description: 'Refresh with a classic Aperol Spritz at The Anchor, minutes from Heathrow with a sunny beer garden and free parking.',
    images: [DEFAULT_DRINKS_IMAGE],
  },
  twitter: getTwitterMetadata({
    title: 'Aperol Spritz Near Heathrow | The Anchor Pub',
    description: 'Refresh with a classic Aperol Spritz at The Anchor, minutes from Heathrow with a sunny beer garden and free parking.',
    images: [DEFAULT_DRINKS_IMAGE]
  }),
  alternates: {
    canonical: '/drinks/aperol'
  }
}

const aperolSchema = {
  '@context': 'https://schema.org',
  '@type': 'MenuItem',
  '@id': 'https://www.the-anchor.pub/drinks/aperol#menu-item',
  name: 'Aperol Spritz',
  description: 'Aperol, prosecco and soda served over ice with orange slice at The Anchor near Heathrow.',
  image: `https://www.the-anchor.pub${DEFAULT_DRINKS_IMAGE}`,
  offers: {
    '@type': 'Offer',
    price: '8.00',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock'
  },
  nutrition: {
    '@type': 'NutritionInformation',
    calories: '190',
    servingSize: '250ml'
  }
}

export default function AperolPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Drinks', url: '/drinks' },
    { name: 'Aperol Spritz', url: '/drinks/aperol' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, aperolSchema]) }}
      />

      <HeroWrapper
        route="/drinks/aperol"
        title="Aperol Spritz Near Heathrow"
        description="Vibrant orange aperitivo cocktails served ice cold in our beer garden"
        overlay="gradient"
        className="min-h-[40vh]"
        breadcrumbs={[
          { name: 'Drinks', href: '/drinks' },
          { name: 'Aperol Spritz' }
        ]}
        tags={[
          { label: '£8.00 classic serve', variant: 'primary' },
          { label: 'Summer garden favourite', variant: 'success' },
          { label: 'Add a sharing board', variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4">
            <BookTableButton
              source="aperol_hero"
              context="drinks_aperol"
              variant="primary"
              size="lg"
              fullWidth
              className="w-full sm:w-auto"
            >
              ☀️ Reserve a Table
            </BookTableButton>
            <DirectionsButton
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
              source="aperol_hero"
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
            Aperol Spritz at The Anchor - Stanwell Moor Aperitivo Spot
          </h1>
          <p className="text-gray-700 text-lg mb-4">
            Golden hour tastes better with the bittersweet pop of an Aperol Spritz. We pour a precise mix of Aperol, crisp prosecco and chilled soda water over plenty of ice then garnish with a thick orange wheel for aroma. Sip in the beer garden while planes cruise overhead or settle into our dining room for a leisurely lunch.
          </p>
          <p className="text-gray-700">
            Our spritz is priced at £8.00 and available all year, though it shines brightest on sunny afternoons, date nights and celebratory toasts before heading to Heathrow departures.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold text-anchor-green mb-3">Spritz Variations</h2>
                <ul className="space-y-2 text-gray-700">
                  <li><Badge variant="primary" className="mr-2">Classic</Badge> Aperol, prosecco, soda, orange slice</li>
                  <li><Badge variant="success" className="mr-2">Garden Spritz</Badge> Add elderflower cordial and fresh mint</li>
                  <li><Badge variant="warning" className="mr-2">Rosato</Badge> Switch prosecco for a dry rosé</li>
                  <li><Badge variant="secondary" className="mr-2">Low Alcohol</Badge> Aperol with light tonic and extra soda</li>
                </ul>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold text-anchor-green mb-3">Pair It With</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>🧀 Grazing boards stacked with olives and cured meats</li>
                  <li>🍕 Light pizza slices on Tuesday 2-for-1 night</li>
                  <li>🥗 Summer salads when the kitchen is serving lighter dishes</li>
                  <li>🍓 Strawberry cheesecake for a sweet finish</li>
                </ul>
                <Link href="/food-menu" className="inline-block mt-4">
                  <Button variant="secondary" size="lg">🍽️ Browse Food Menu</Button>
                </Link>
              </CardBody>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-anchor-green mb-4">Why Sip Spritzes With Us?</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✓ Spacious beer garden that catches the afternoon sun.</li>
            <li>✓ Free parking so you can relax without worrying about meters.</li>
            <li>✓ Quick taxi links back to Heathrow hotels and terminals.</li>
            <li>✓ Friendly team ready with charcuterie boards and top ups.</li>
          </ul>
        </article>
      </Section>

      <Section background="gray" spacing="lg" container containerSize="md">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold text-anchor-green mb-3">Spritz for Groups</h2>
              <p className="text-gray-700">
                Organising a hen do or after-work celebration? Pre-order a spritz tree of six glasses and we will have it waiting on arrival.
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold text-anchor-green mb-3">Designated Driver Friendly</h2>
              <p className="text-gray-700">
                Non drinkers can enjoy San Pellegrino sodas, mocktails and artisan lemonades so the whole table feels part of the toast.
              </p>
            </CardBody>
          </Card>
        </div>
      </Section>

      <FAQAccordionWithSchema
        className="bg-white"
        faqs={[
          {
            question: 'How much is an Aperol Spritz at The Anchor?',
            answer: 'A classic Aperol Spritz costs £8.00 and comes with prosecco, Aperol, soda water and a fresh orange slice.'
          },
          {
            question: 'Do you have outdoor seating for spritz cocktails?',
            answer: 'Yes, our beer garden is ideal for Aperol Spritz with plenty of tables, parasols and flight path views.'
          },
          {
            question: 'Can I get to The Anchor easily from Heathrow?',
            answer: 'We are seven minutes from Heathrow Terminal 5 by taxi or a short ride on the 442 bus. Free parking makes it easy for drivers too.'
          }
        ]}
      />
    </>
  )
}
