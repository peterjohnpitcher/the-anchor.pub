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
import { InternalLinkingSection } from '@/components/seo/InternalLinkingSection'

export const metadata: Metadata = {
  title: 'Disaronno Cocktails Near Heathrow | Amaretto Drinks | The Anchor',
  description: 'Sip Disaronno on the rocks or in bespoke cocktails at The Anchor near Heathrow. £4.80 single measure, classic Godfather and sour serves, free parking minutes from Terminal 5.',
  keywords: 'disaronno near heathrow, amaretto cocktail stanwell moor, godfather cocktail pub, disaronno sour near terminal 5, amaretto drink price the anchor',
  openGraph: {
    title: 'Disaronno Cocktails Near Heathrow | The Anchor',
    description: 'Enjoy Disaronno serves and classic amaretto cocktails at The Anchor, minutes from Heathrow with free parking.',
    images: [DEFAULT_DRINKS_IMAGE],
  },
  twitter: getTwitterMetadata({
    title: 'Disaronno Cocktails Near Heathrow | The Anchor',
    description: 'Enjoy Disaronno serves and classic amaretto cocktails at The Anchor, minutes from Heathrow with free parking.',
    images: [DEFAULT_DRINKS_IMAGE]
  }),
  alternates: {
    canonical: '/drinks/disaronno'
  }
}

const disaronnoSchema = {
  '@context': 'https://schema.org',
  '@type': 'MenuItem',
  '@id': 'https://www.the-anchor.pub/drinks/disaronno#menu-item',
  name: 'Disaronno Amaretto',
  description: 'Authentic Italian amaretto served neat, over ice or in signature cocktails at The Anchor near Heathrow.',
  image: `https://www.the-anchor.pub${DEFAULT_DRINKS_IMAGE}`,
  offers: [
    {
      '@type': 'Offer',
      price: '4.80',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitText: 'single measure'
      }
    },
    {
      '@type': 'Offer',
      name: 'Double Measure',
      price: '6.80',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitText: 'double measure'
      }
    }
  ],
  suggests: [
    {
      '@type': 'MenuItem',
      name: 'Disaronno Sour',
      description: 'Disaronno, fresh lemon juice and sugar for a balanced sweet-sour shake.'
    },
    {
      '@type': 'MenuItem',
      name: 'Godfather Cocktail',
      description: 'Disaronno mixed with Scotch over ice for a rich digestif.'
    }
  ]
}

export default function DisaronnoPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Drinks', url: '/drinks' },
    { name: 'Disaronno', url: '/drinks/disaronno' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, disaronnoSchema]) }}
      />

      <HeroWrapper
        route="/drinks/disaronno"
        title="Disaronno Amaretto at The Anchor"
        description="Italian almond warmth poured neat, over ice or in signature cocktails"
        className="min-h-[40vh]"
        overlay="gradient"
        breadcrumbs={[
          { name: 'Drinks', href: '/drinks' },
          { name: 'Disaronno' }
        ]}
        tags={[
          { label: '£4.80 single measure', variant: 'primary' },
          { label: 'Try the Disaronno Sour', variant: 'success' },
          { label: 'Perfect post-dinner', variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4">
            <BookTableButton
              source="disaronno_hero"
              context="drinks_disaronno"
              variant="primary"
              size="lg"
              fullWidth
              className="w-full sm:w-auto"
            >
              🍸 Reserve a Table
            </BookTableButton>
            <DirectionsButton
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
              source="disaronno_hero"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              📍 Plan Your Visit
            </DirectionsButton>
          </div>
        }
      />

      <Section background="white" spacing="lg" container containerSize="md">
        <article className="max-w-3xl mx-auto prose prose-lg max-w-none">
          <h1 className="text-anchor-green text-3xl md:text-4xl font-bold mb-6">
            Disaronno Near Heathrow - Sip, Savor, Unwind
          </h1>
          <div className="bg-anchor-cream/40 border border-anchor-cream rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-anchor-green mb-3">Quick Highlights</h2>
            <ul className="space-y-2 text-gray-700">
              <li>£4.80 single or £6.80 double measure poured over crystal clear ice</li>
              <li>Signature Disaronno Sour and Godfather cocktails shaken to order</li>
              <li>Free parking and relaxed seating seven minutes from Heathrow</li>
              <li>Pair with sticky toffee pudding or chocolate brownie for a sweet finale</li>
            </ul>
          </div>
          <p className="text-gray-700 text-lg mb-4">
            When you crave smooth almond aromas and a long, sweet finish, Disaronno is the pour that delivers. We stock the original amber amaretto and serve it exactly how you like: neat, over ice, lengthened with cola or shaken into a Disaronno Sour that dances between sweet and sharp.
          </p>
          <p className="text-gray-700">
            Enjoy yours in our cosy bar, at a window seat overlooking Horton Road or outside in the beer garden under the Heathrow flight path. Either way, it is a far better deal than airport lounge prices.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold text-anchor-green mb-3">Serving Suggestions</h2>
                <ul className="space-y-2 text-gray-700">
                  <li><Badge variant="primary" className="mr-2">Classic</Badge> 35ml Disaronno over cubed ice</li>
                  <li><Badge variant="secondary" className="mr-2">Disaronno Sour</Badge> Shaken with lemon juice and sugar, served short</li>
                  <li><Badge variant="warning" className="mr-2">Godfather</Badge> Disaronno and Scotch stirred over rocks</li>
                  <li><Badge variant="success" className="mr-2">Hot Amaretto</Badge> Add to black coffee with whipped cream</li>
                </ul>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold text-anchor-green mb-3">Perfect Pairings</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>🍰 Sticky toffee pudding from our dessert board</li>
                  <li>🍫 Chocolate brownie for a richer finish</li>
                  <li>🍕 Pizza Tuesday slices for sweet-savoury contrast</li>
                  <li>🥃 Follow with a Baby Guinness shot for a retro combo</li>
                </ul>
                <Link href="/food-menu" className="inline-block mt-4">
                  <Button variant="secondary" size="lg">🍽️ Explore Dessert Menu</Button>
                </Link>
              </CardBody>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-anchor-green mb-4">Why Choose The Anchor for Disaronno?</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✓ Fair pub prices: £4.80 beats Heathrow bar rates by miles.</li>
            <li>✓ Free parking and relaxed seating for a proper post-dinner nightcap.</li>
            <li>✓ Bartenders who actually know how to balance a sour or Godfather.</li>
            <li>✓ Quick taxi back to Heathrow or local hotels when you are ready to depart.</li>
          </ul>
        </article>
      </Section>

      <Section background="gray" spacing="lg" container containerSize="md">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold text-anchor-green mb-3">After-Dinner Favourite</h2>
              <p className="text-gray-700">
                Ask for Disaronno following your Sunday roast or corporate set menu. Our team will bring it over with dessert so your guests can linger longer.
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold text-anchor-green mb-3">Gift a Bottle</h2>
              <p className="text-gray-700">
                Celebrating a birthday or engagement? We can arrange a bottle on ice ready for arrival. Let us know when booking.
              </p>
            </CardBody>
          </Card>
        </div>
      </Section>

      <InternalLinkingSection
        title="Discover More From Our Bar"
        links={[
          { href: '/drinks', title: 'Full Drinks Menu', description: 'See every draught, spirit and cocktail we serve' },
          { href: '/drinks/jagerbomb', title: 'Jagerbomb Shots', description: 'Energy-packed rounds for celebratory nights' },
          { href: '/drinks/aperol', title: 'Aperol Spritz', description: 'Bright Italian aperitivo for sunny afternoons' },
          { href: '/food-menu', title: 'Food Menu', description: 'Pair Disaronno with desserts and sharers' }
        ]}
        className="section-spacing-md"
      />

      <FAQAccordionWithSchema
        className="bg-white"
        faqs={[
          {
            question: 'How much is Disaronno at The Anchor?',
            answer: 'A single 35ml measure of Disaronno costs £4.80 and a double measure is £6.80. We also offer cocktail serves such as the Disaronno Sour.'
          },
          {
            question: 'Do you make Disaronno cocktails?',
            answer: 'Yes. Popular choices include the Disaronno Sour, the Godfather and long mixed serves with cola or ginger ale. Ask the bar team for recommendations.'
          },
          {
            question: 'Is The Anchor near Heathrow?',
            answer: 'We are seven minutes from Heathrow Terminal 5 with free parking, making us the ideal spot for a relaxed Disaronno nightcap before or after your flight.'
          }
        ]}
      />
    </>
  )
}
