import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Food Menu | The Anchor Stanwell Moor | Traditional British Pub Food',
  description: 'Enjoy traditional British pub food at The Anchor. Famous Sunday roasts, stone-baked pizzas, burgers, and family-friendly meals. Kitchen open Tuesday-Sunday.',
  keywords: 'pub food stanwell moor, sunday roast near heathrow, british pub menu, family restaurant stanwell',
  openGraph: {
    title: 'Food Menu - The Anchor Pub',
    description: 'Traditional British pub food, famous Sunday roasts, and family-friendly dining near Heathrow.',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg'],
  },
}

export default function FoodMenuPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg"
            alt="The Anchor famous Sunday roast"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-anchor-green/80 via-anchor-green/60 to-anchor-green/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Honest Food, Great Value
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              Traditional British pub food made with care
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="tag bg-white/90 backdrop-blur-sm">🍖 Famous Sunday Roasts</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍕 Stone-Baked Pizzas</span>
              <span className="tag bg-white/90 backdrop-blur-sm">👨‍👩‍👧‍👦 Kids Menu</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🌱 Vegetarian Options</span>
            </div>
            
            <CallToAction 
              href="tel:01753682707"
              variant="primary"
              size="large"
            >
              📞 Book a Table: 01753 682707
            </CallToAction>
          </div>
        </div>
      </section>

      {/* Kitchen Hours */}
      <section className="py-8 bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-anchor-green mb-4">🍽️ Kitchen Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-anchor-green">Tuesday - Thursday</p>
                <p className="text-gray-700">6:00 PM - 9:00 PM</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-anchor-green">Friday</p>
                <p className="text-gray-700">6:00 PM - 9:00 PM</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-anchor-green">Saturday</p>
                <p className="text-gray-700">1:00 PM - 7:00 PM</p>
              </div>
              <div className="bg-white rounded-lg p-4 md:col-span-3">
                <p className="font-semibold text-anchor-green">Sunday</p>
                <p className="text-gray-700">12:00 PM - 5:00 PM (Roast only)</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600 italic">Kitchen closed Mondays</p>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Sunday Roasts */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍖 Sunday Roasts
              </h2>
              <div className="bg-anchor-sand/20 rounded-2xl p-8">
                <p className="text-center text-lg text-gray-700 mb-8">
                  Our famous Sunday roasts are served from 12pm to 5pm every Sunday. 
                  All roasts come with roast potatoes, Yorkshire pudding, seasonal vegetables, and gravy.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6">
                    <h3 className="font-bold text-xl text-anchor-green mb-2">Roast Beef</h3>
                    <p className="text-anchor-gold font-semibold mb-2">£14.95</p>
                    <p className="text-gray-700">Tender British beef, perfectly pink, with horseradish sauce</p>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <h3 className="font-bold text-xl text-anchor-green mb-2">Roast Chicken</h3>
                    <p className="text-anchor-gold font-semibold mb-2">£13.95</p>
                    <p className="text-gray-700">Half a succulent roast chicken with sage & onion stuffing</p>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <h3 className="font-bold text-xl text-anchor-green mb-2">Roast Pork</h3>
                    <p className="text-anchor-gold font-semibold mb-2">£13.95</p>
                    <p className="text-gray-700">Slow-roasted pork loin with crispy crackling & apple sauce</p>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <h3 className="font-bold text-xl text-anchor-green mb-2">Vegetarian Roast</h3>
                    <p className="text-anchor-gold font-semibold mb-2">£11.95</p>
                    <p className="text-gray-700">Butternut squash Wellington with all the trimmings</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-anchor-gold/10 rounded-lg text-center">
                  <p className="font-semibold text-anchor-green">Book early - Sunday roasts are very popular!</p>
                </div>
              </div>
            </div>

            {/* Starters */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🥗 Starters & Sharers
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card-warm bg-white border-2 border-anchor-sand p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Loaded Nachos</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£8.95</p>
                  <p className="text-gray-700 text-sm">Tortilla chips, cheese, jalapeños, salsa, guacamole & sour cream</p>
                </div>
                <div className="card-warm bg-white border-2 border-anchor-sand p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Garlic Bread</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£4.95</p>
                  <p className="text-gray-700 text-sm">Stone-baked ciabatta with garlic butter (add cheese +£1)</p>
                </div>
                <div className="card-warm bg-white border-2 border-anchor-sand p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Soup of the Day</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£5.95</p>
                  <p className="text-gray-700 text-sm">Homemade soup served with crusty bread</p>
                </div>
                <div className="card-warm bg-white border-2 border-anchor-sand p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Chicken Wings</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£7.95</p>
                  <p className="text-gray-700 text-sm">BBQ or buffalo wings with blue cheese dip</p>
                </div>
                <div className="card-warm bg-white border-2 border-anchor-sand p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Halloumi Fries</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£6.95</p>
                  <p className="text-gray-700 text-sm">Crispy halloumi sticks with sweet chilli dip</p>
                </div>
                <div className="card-warm bg-white border-2 border-anchor-sand p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Sharing Platter</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£15.95</p>
                  <p className="text-gray-700 text-sm">Wings, onion rings, garlic bread, nachos & dips</p>
                </div>
              </div>
            </div>

            {/* Mains */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍔 Pub Classics
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">The Anchor Burger</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£12.95</p>
                  <p className="text-gray-700 mb-2">8oz beef patty, bacon, cheese, lettuce, tomato, burger sauce</p>
                  <p className="text-sm text-gray-600 italic">Served with chips and coleslaw</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Fish & Chips</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£13.95</p>
                  <p className="text-gray-700 mb-2">Beer-battered cod, mushy peas, tartare sauce</p>
                  <p className="text-sm text-gray-600 italic">Our Friday night favourite!</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Steak & Kidney Pie</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£12.95</p>
                  <p className="text-gray-700 mb-2">Traditional pie with mash, vegetables & gravy</p>
                  <p className="text-sm text-gray-600 italic">Proper British comfort food</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Chicken Tikka Masala</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£11.95</p>
                  <p className="text-gray-700 mb-2">Britain's favourite curry with rice, naan & poppadoms</p>
                  <p className="text-sm text-gray-600 italic">Medium spice</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Bangers & Mash</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£10.95</p>
                  <p className="text-gray-700 mb-2">Three pork sausages, creamy mash, onion gravy</p>
                  <p className="text-sm text-gray-600 italic">Simple and delicious</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Vegetable Lasagne</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£10.95</p>
                  <p className="text-gray-700 mb-2">Layers of roasted vegetables, béchamel, served with salad</p>
                  <p className="text-sm text-gray-600 italic">Vegetarian favourite</p>
                </div>
              </div>
            </div>

            {/* Pizzas */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍕 Stone-Baked Pizzas
              </h2>
              <p className="text-center text-lg text-gray-700 mb-8">
                All our pizzas are hand-stretched and stone-baked to order
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Margherita</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£9.95</p>
                  <p className="text-gray-700 text-sm">Tomato, mozzarella, fresh basil</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Pepperoni</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£11.95</p>
                  <p className="text-gray-700 text-sm">Tomato, mozzarella, pepperoni</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Hawaiian</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£11.95</p>
                  <p className="text-gray-700 text-sm">Tomato, mozzarella, ham, pineapple</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Meat Feast</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£13.95</p>
                  <p className="text-gray-700 text-sm">Pepperoni, ham, chicken, beef, sausage</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Vegetarian</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£10.95</p>
                  <p className="text-gray-700 text-sm">Mushrooms, peppers, onions, sweetcorn, olives</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">BBQ Chicken</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£12.95</p>
                  <p className="text-gray-700 text-sm">BBQ base, chicken, bacon, red onion</p>
                </div>
              </div>
            </div>

            {/* Kids Menu */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                👶 Little Anchors Menu
              </h2>
              <div className="bg-anchor-sand/30 rounded-2xl p-8">
                <p className="text-center text-lg text-gray-700 mb-8">
                  All kids meals £5.95 - includes a drink and ice cream dessert!
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🍔</div>
                    <h3 className="font-semibold text-anchor-green">Mini Burger</h3>
                    <p className="text-sm text-gray-600">With chips</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🐟</div>
                    <h3 className="font-semibold text-anchor-green">Fish Fingers</h3>
                    <p className="text-sm text-gray-600">With chips & peas</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🍕</div>
                    <h3 className="font-semibold text-anchor-green">Mini Pizza</h3>
                    <p className="text-sm text-gray-600">Cheese & tomato</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🌭</div>
                    <h3 className="font-semibold text-anchor-green">Sausage & Mash</h3>
                    <p className="text-sm text-gray-600">With gravy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desserts */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍰 Desserts
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Sticky Toffee Pudding</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£5.95</p>
                  <p className="text-gray-700 text-sm">With vanilla ice cream</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Chocolate Brownie</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£5.95</p>
                  <p className="text-gray-700 text-sm">Warm, with chocolate sauce</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                  <h3 className="font-bold text-lg text-anchor-green mb-2">Ice Cream Selection</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£4.95</p>
                  <p className="text-gray-700 text-sm">Three scoops - ask for flavours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dietary Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              Dietary Information
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="font-bold text-lg text-anchor-green mb-2">Vegetarian Options</h3>
                <p className="text-gray-700 text-sm">Clearly marked on menu. Just ask if you need help!</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-4xl mb-4">🌾</div>
                <h3 className="font-bold text-lg text-anchor-green mb-2">Gluten Free</h3>
                <p className="text-gray-700 text-sm">Several options available. Please inform staff of requirements.</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-4xl mb-4">🥜</div>
                <h3 className="font-bold text-lg text-anchor-green mb-2">Allergies</h3>
                <p className="text-gray-700 text-sm">Full allergen menu available. Please speak to our team.</p>
              </div>
            </div>
            <p className="mt-8 text-gray-600 italic">
              We take dietary requirements seriously. Please inform us when booking or ordering.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Hungry? Book Your Table Now
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our kitchen gets busy, especially on weekends. Book ahead to avoid disappointment!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="large"
            >
              📞 Call: 01753 682707
            </CallToAction>
            <CallToAction 
              href="/drinks"
              variant="white"
              size="large"
            >
              🍺 View Drinks Menu
            </CallToAction>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Menu",
            "name": "The Anchor Food Menu",
            "description": "Traditional British pub food menu",
            "hasMenuSection": [
              {
                "@type": "MenuSection",
                "name": "Sunday Roasts",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Roast Beef",
                    "description": "Tender British beef with Yorkshire pudding and vegetables",
                    "offers": {
                      "@type": "Offer",
                      "price": "14.95",
                      "priceCurrency": "GBP"
                    }
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Roast Chicken",
                    "description": "Half roast chicken with sage & onion stuffing",
                    "offers": {
                      "@type": "Offer",
                      "price": "13.95",
                      "priceCurrency": "GBP"
                    }
                  }
                ]
              },
              {
                "@type": "MenuSection",
                "name": "Pub Classics",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Fish & Chips",
                    "description": "Beer-battered cod with mushy peas",
                    "offers": {
                      "@type": "Offer",
                      "price": "13.95",
                      "priceCurrency": "GBP"
                    }
                  }
                ]
              }
            ],
            "inLanguage": "en-GB",
            "provider": {
              "@type": "Restaurant",
              "name": "The Anchor",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Horton Road",
                "addressLocality": "Stanwell Moor",
                "addressRegion": "Surrey",
                "postalCode": "TW19 6AQ"
              }
            }
          })
        }}
      />
    <Footer /></>
  )
}