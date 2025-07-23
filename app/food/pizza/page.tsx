import Image from 'next/image'
import Link from 'next/link'
import { Button, Container, Section, Card, CardBody, Alert } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { HeroWrapper } from '@/components/hero'
import { Metadata } from 'next'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { BookTableButton } from '@/components/BookTableButton'
import { MenuPageTracker } from '@/components/MenuPageTracker'

export const metadata: Metadata = {
  title: 'Buy One Get One Free Pizza | The Anchor Stanwell Moor | BOGOF Deal',
  description: 'BOGOF pizza deal at The Anchor near Heathrow. Buy one get one free on all stone-baked pizzas every Tuesday. Fresh dough, quality toppings. Dine-in & takeaway.',
  keywords: 'buy one get one free pizza, bogof pizza stanwell moor, pizza deal heathrow, 2 for 1 pizza, pizza offer staines',
  openGraph: {
    title: 'BOGOF Pizza Deal - The Anchor Pub',
    description: 'Buy one get one free on all pizzas every Tuesday. Dine-in & takeaway available.',
    images: ['/images/the-anchor-pub-stanwell-moor.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'BOGOF Pizza Deal - The Anchor Pub',
    description: 'Buy one get one free on all pizzas every Tuesday. Dine-in & takeaway available.',
    images: ['/images/the-anchor-pub-stanwell-moor.jpg']
  })
}

const pizzaMenuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "hasMenuSection": {
    "@type": "MenuSection",
    "name": "Stone-Baked Pizzas",
    "hasMenuItem": [
      {
        "@type": "MenuItem",
        "name": "Rustic Classic Pizza",
        "description": "Rich tomato sauce, creamy mozzarella, crisp stone-baked crust—a timeless favourite.",
        "offers": {
          "@type": "Offer",
          "price": "10.99",
          "priceCurrency": "GBP"
        }
      },
      {
        "@type": "MenuItem",
        "name": "Simply Salami Pizza",
        "description": "Napoli salami, tangy tomato sauce, mozzarella, stone-baked to crispy perfection.",
        "offers": {
          "@type": "Offer",
          "price": "12.99",
          "priceCurrency": "GBP"
        }
      },
      {
        "@type": "MenuItem",
        "name": "Barbecue Chicken Pizza",
        "description": "Sweet and smoky BBQ sauce, succulent chicken, speck ham, and mozzarella on a crunchy crust.",
        "offers": {
          "@type": "Offer",
          "price": "13.99",
          "priceCurrency": "GBP"
        }
      }
    ]
  }
}

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "Buy One Get One Free Pizza",
  "description": "Get any pizza free when you buy one of equal or greater value",
  "seller": {
    "@type": "Restaurant",
    "name": "The Anchor",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Horton Road",
      "addressLocality": "Stanwell Moor",
      "addressRegion": "Surrey",
      "postalCode": "TW19 6AQ"
    }
  },
  "validFrom": "2024-01-01",
  "validThrough": "2024-12-31",
  "availableDay": ["Tuesday"],
  "priceSpecification": {
    "@type": "PriceSpecification",
    "price": "0",
    "priceCurrency": "GBP"
  }
}

export default function PizzaPage() {
  return (
    <>
      <MenuPageTracker 
        menuType="pizza"
        specialOffers={[
          "Buy One Get One Free - Every Tuesday"
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pizzaMenuSchema, offerSchema]) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/food/pizza"
        title="Buy One Get One FREE"
        description="On ALL Stone-Baked Pizzas"
        size="large"
        showStatusBar={true}
        tags={[
          { label: "🍕 TUESDAY SPECIAL 🍕", variant: "warning" }
        ]}
        cta={
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/food-menu">
              <Button variant="secondary" size="lg">
                View Full Menu
              </Button>
            </Link>
            <BookTableButton
              source="pizza_menu_hero"
              context="pizza_menu"
              variant="primary"
              size="lg"
            >
              📞 Book a Table
            </BookTableButton>
          </div>
        }
      />

      {/* Offer Details */}
      <div className="bg-anchor-sand/20 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              title="How Our BOGOF Deal Works"
              className="mb-8"
            />
            
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "🍕",
                  title: "Choose Any Pizza",
                  description: "Pick from our full range of stone-baked pizzas",
                  className: "text-center"
                },
                {
                  icon: "✨",
                  title: "Get One FREE",
                  description: "Free pizza must be of equal or lesser value",
                  className: "text-center"
                },
                {
                  icon: "📅",
                  title: "Every Tuesday",
                  description: "Available during kitchen hours",
                  className: "text-center"
                }
              ]}
              className="mb-8"
            />
            
            <p className="text-lg text-gray-700">
              No voucher needed • Dine-in & takeaway • Cannot be combined with other offers
            </p>
          </div>
        </Container>
      </div>

      {/* Pizza Menu */}
      <div className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Our Stone-Baked Pizzas"
              className="text-center mb-12"
            />
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card variant="default" className="bg-anchor-cream">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-2">Rustic Classic</h3>
                  <p className="text-gray-700 mb-3">Rich tomato sauce, creamy mozzarella, crisp stone-baked crust—a timeless favourite.</p>
                  <p className="text-xl font-bold text-anchor-gold">£7.49 / £10.49</p>
                </CardBody>
              </Card>
              
              <Card variant="default" className="bg-anchor-cream">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-2">Simply Salami</h3>
                  <p className="text-gray-700 mb-3">Napoli salami, tangy tomato sauce, mozzarella, stone-baked to crispy perfection.</p>
                  <p className="text-xl font-bold text-anchor-gold">£8.49 / £12.99</p>
                </CardBody>
              </Card>
              
              <Card variant="default" className="bg-anchor-cream">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-2">Barbecue Chicken</h3>
                  <p className="text-gray-700 mb-3">Sweet and smoky BBQ sauce, succulent chicken, speck ham, and mozzarella on a crunchy crust.</p>
                  <p className="text-xl font-bold text-anchor-gold">£9.99 / £13.99</p>
                </CardBody>
              </Card>
              
              <Card variant="default" className="bg-anchor-cream">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-2">Fully Loaded</h3>
                  <p className="text-gray-700 mb-3">Napoli salami, speck ham, fennel salami, mozzarella on a bold stone-baked base.</p>
                  <p className="text-xl font-bold text-anchor-gold">£9.49 / £13.99</p>
                </CardBody>
              </Card>
              
              <Card variant="default" className="bg-anchor-cream">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-2">Nice & Spicy</h3>
                  <p className="text-gray-700 mb-3">'Nduja, Ventricina, roquito peppers, mozzarella—fiery flavours on a crisp crust.</p>
                  <p className="text-xl font-bold text-anchor-gold">£8.49 / £13.49</p>
                </CardBody>
              </Card>
              
              <Card variant="default" className="bg-anchor-cream">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-anchor-green mb-2">The Garden Club</h3>
                  <p className="text-gray-700 mb-3">Roasted courgettes, caramelised onions, rocket, and mozzarella on a rich tomato base.</p>
                  <p className="text-xl font-bold text-anchor-gold">£8.99 / £12.99</p>
                </CardBody>
              </Card>
            </div>
            
            <Alert
              variant="warning"
              title="Kitchen Hours"
              className="mt-8 text-center"
            >
              <p className="text-gray-800">
                🍕 Tuesday-Friday 6pm-9pm | Saturday 1pm-7pm | Sunday 12pm-5pm
              </p>
            </Alert>
          </div>
        </Container>
      </div>

      {/* Local SEO Section */}
      <div className="bg-anchor-sand/20 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Best Pizza Deal Near Heathrow"
              className="mb-8"
            />
            
            <p className="text-lg text-gray-700 mb-6">
              Looking for "buy one get one free pizza near me"? The Anchor's BOGOF pizza deal is the best value 
              in Stanwell Moor, Staines, and the Heathrow area. Just 7 minutes from Terminal 5!
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="default">
                <CardBody className="p-4 text-center">
                  <p className="font-semibold">Stanwell Moor</p>
                  <p className="text-sm text-gray-600">2 min drive</p>
                </CardBody>
              </Card>
              <Card variant="default">
                <CardBody className="p-4 text-center">
                  <p className="font-semibold">Staines</p>
                  <p className="text-sm text-gray-600">8 min drive</p>
                </CardBody>
              </Card>
              <Card variant="default">
                <CardBody className="p-4 text-center">
                  <p className="font-semibold">Heathrow T5</p>
                  <p className="text-sm text-gray-600">7 min drive</p>
                </CardBody>
              </Card>
              <Card variant="default">
                <CardBody className="p-4 text-center">
                  <p className="font-semibold">Ashford</p>
                  <p className="text-sm text-gray-600">10 min drive</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <CTASection
        title="Ready for Your BOGOF Pizza?"
        description="Available every Tuesday during kitchen hours"
        buttons={[
          {
            text: "📞 Call 01753 682707",
            href: "tel:01753682707",
            variant: "secondary"
          },
          {
            text: "📍 Get Directions",
            href: "https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor",
            variant: "white"
          }
        ]}
        variant="green"
      />
    </>
  )
}