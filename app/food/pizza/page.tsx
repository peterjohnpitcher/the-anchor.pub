import Image from 'next/image'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { PageHeaderWrapper } from '@/components/ui/PageHeaderWrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buy One Get One Free Pizza | The Anchor Stanwell Moor | BOGOF Deal',
  description: 'BOGOF pizza deal at The Anchor pub near Heathrow. Buy one get one free on all stone-baked pizzas every Tuesday & Wednesday. Fresh dough, quality toppings. Dine-in & takeaway available.',
  keywords: 'buy one get one free pizza, bogof pizza stanwell moor, pizza deal heathrow, 2 for 1 pizza, pizza offer staines',
  openGraph: {
    title: 'BOGOF Pizza Deal - The Anchor Pub',
    description: 'Buy one get one free on all pizzas every Tuesday & Wednesday. Dine-in & takeaway available.',
    images: ['/images/the-anchor-pub-stanwell-moor.jpg'],
  },
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
        "name": "Margherita Pizza",
        "description": "Classic tomato base with mozzarella and fresh basil",
        "offers": {
          "@type": "Offer",
          "price": "10.99",
          "priceCurrency": "GBP"
        }
      },
      {
        "@type": "MenuItem",
        "name": "Pepperoni Pizza",
        "description": "Loaded with spicy pepperoni and extra cheese",
        "offers": {
          "@type": "Offer",
          "price": "12.99",
          "priceCurrency": "GBP"
        }
      },
      {
        "@type": "MenuItem",
        "name": "BBQ Chicken Pizza",
        "description": "BBQ base, chicken, red onions, and peppers",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pizzaMenuSchema, offerSchema]) }}
      />
      
      {/* Hero Section */}
      <PageHeaderWrapper
        route="/food/pizza"
        title="Buy One Get One FREE"
        description="On ALL Stone-Baked Pizzas"
        minHeight="min-h-[60vh]"
        showStatusBar={true}
      >
        <div className="bg-yellow-400 text-red-900 font-bold text-xl md:text-2xl px-6 py-3 rounded-full inline-block mb-6">
          🍕 TUESDAY SPECIAL 🍕
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CallToAction href="/food-menu" variant="secondary" size="lg">
            View Full Menu
          </CallToAction>
          <CallToAction href="tel:01753682707" variant="primary" size="lg">
            📞 Book a Table
          </CallToAction>
        </div>
      </PageHeaderWrapper>

      {/* Offer Details */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              How Our BOGOF Deal Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-3">🍕</div>
                <h3 className="font-bold text-lg mb-2">Choose Any Pizza</h3>
                <p className="text-gray-700">Pick from our full range of stone-baked pizzas</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="font-bold text-lg mb-2">Get One FREE</h3>
                <p className="text-gray-700">Free pizza must be of equal or lesser value</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-3">📅</div>
                <h3 className="font-bold text-lg mb-2">Every Tuesday</h3>
                <p className="text-gray-700">Available all day during kitchen hours</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700">
              No voucher needed • Dine-in & takeaway • Cannot be combined with other offers
            </p>
          </div>
        </div>
      </section>

      {/* Pizza Menu */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green text-center mb-12">
              Our Stone-Baked Pizzas
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-2">Margherita</h3>
                <p className="text-gray-700 mb-3">Classic tomato base with mozzarella and fresh basil</p>
                <p className="text-xl font-bold text-anchor-gold">£10.99</p>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-2">Pepperoni</h3>
                <p className="text-gray-700 mb-3">Loaded with spicy pepperoni and extra cheese</p>
                <p className="text-xl font-bold text-anchor-gold">£12.99</p>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-2">BBQ Chicken</h3>
                <p className="text-gray-700 mb-3">BBQ base, chicken, red onions, and peppers</p>
                <p className="text-xl font-bold text-anchor-gold">£13.99</p>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-2">Hawaiian</h3>
                <p className="text-gray-700 mb-3">Ham, pineapple, and extra cheese</p>
                <p className="text-xl font-bold text-anchor-gold">£12.99</p>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-2">Meat Feast</h3>
                <p className="text-gray-700 mb-3">Pepperoni, ham, sausage, and bacon</p>
                <p className="text-xl font-bold text-anchor-gold">£14.99</p>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-2">Veggie Supreme</h3>
                <p className="text-gray-700 mb-3">Mushrooms, peppers, onions, olives, and sweetcorn</p>
                <p className="text-xl font-bold text-anchor-gold">£12.99</p>
              </div>
            </div>
            
            <div className="mt-8 bg-yellow-100 border-2 border-yellow-400 rounded-xl p-6 text-center">
              <p className="text-lg font-semibold text-gray-800">
                🍕 Kitchen Hours: Tuesday-Friday 6pm-9pm | Saturday 1pm-7pm | Sunday 12pm-5pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="section-spacing bg-anchor-sand/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              Best Pizza Deal Near Heathrow
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Looking for "buy one get one free pizza near me"? The Anchor's BOGOF pizza deal is the best value 
              in Stanwell Moor, Staines, and the Heathrow area. Just 7 minutes from Terminal 5!
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold">Stanwell Moor</p>
                <p className="text-sm text-gray-600">2 min drive</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold">Staines</p>
                <p className="text-sm text-gray-600">8 min drive</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold">Heathrow T5</p>
                <p className="text-sm text-gray-600">7 min drive</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold">Ashford</p>
                <p className="text-sm text-gray-600">10 min drive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Your BOGOF Pizza?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Available every Tuesday during kitchen hours
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CallToAction href="tel:01753682707" variant="secondary" size="lg">
              📞 Call 01753 682707
            </CallToAction>
            <CallToAction 
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor" 
              variant="outline" 
              size="lg"
              className="!text-white !border-white hover:!bg-white hover:!text-anchor-green"
            >
              📍 Get Directions
            </CallToAction>
          </div>
        </div>
      </section>
    </>
  )
}