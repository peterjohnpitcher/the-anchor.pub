import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'
import { OpeningStatus } from '@/components/OpeningStatus'
import { getMenu } from '@/lib/api'

export const metadata: Metadata = {
  title: 'BOGOF Pizza Near Heathrow | The Anchor - Buy One Get One Free',
  description: 'Enjoy BOGOF pizza at The Anchor! Buy one get one free on all pizzas. Fresh stone-baked pizzas near Heathrow Airport. Perfect for families and groups.',
  keywords: 'bogof pizza, buy one get one free pizza, pizza near me, pizza heathrow, pizza stanwell moor, pizza staines, cheap pizza, pizza deals, pizza offers tw19',
  openGraph: {
    title: 'BOGOF Pizza at The Anchor - Buy One Get One Free',
    description: 'Fresh stone-baked pizzas with amazing BOGOF deal. Buy one pizza, get one free!',
    images: ['/images/food/pizza-bogof-deal.jpg'],
  },
}

export default async function PizzaPage() {
  // Try to fetch pizza menu items
  let pizzaItems = []
  try {
    const menuData = await getMenu()
    const pizzaSection = menuData.hasMenuSection?.find(
      section => section.name.toLowerCase().includes('pizza')
    )
    if (pizzaSection) {
      pizzaItems = pizzaSection.hasMenuItem || []
    }
  } catch (error) {
    console.error('Failed to fetch pizza menu:', error)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-anchor-green to-anchor-green-dark" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-anchor-gold text-white px-6 py-2 rounded-full inline-block mb-4 font-bold text-lg">
              🍕 BOGOF DEAL 🍕
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Buy One Get One FREE Pizza
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Fresh stone-baked pizzas • Available all week • Dine in or takeaway
            </p>
            
            <div className="mb-6">
              <OpeningStatus />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallToAction 
                href="tel:01753682707"
                variant="primary"
                size="lg"
              >
                📞 Order Your BOGOF Pizza
              </CallToAction>
              
              <CallToAction 
                href="#pizza-menu"
                variant="white"
                size="lg"
              >
                🍕 View Pizza Menu
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* BOGOF Deal Details */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-anchor-gold text-white rounded-2xl p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🍕 BOGOF Pizza Deal 🍕
              </h2>
              <p className="text-xl mb-6">
                Buy any pizza and get another pizza of equal or lesser value absolutely FREE!
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-bold text-lg">Available</p>
                  <p>7 Days a Week</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-bold text-lg">Dine In</p>
                  <p>or Takeaway</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="font-bold text-lg">No Voucher</p>
                  <p>Required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Pizza */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Why The Anchor's Pizza is Special
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Fresh & Authentic</h3>
                <p className="text-gray-700 mb-4">
                  Our pizzas are made fresh to order using authentic Italian methods. We use 
                  only the finest ingredients - from our specially sourced mozzarella to our 
                  homemade tomato sauce using San Marzano tomatoes.
                </p>
                <p className="text-gray-700">
                  Each pizza is hand-stretched and stone-baked to perfection, giving you that 
                  authentic crispy base with a perfectly cooked, flavourful topping.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Perfect for Sharing</h3>
                <p className="text-gray-700 mb-4">
                  With our BOGOF deal, pizza night becomes a feast! Perfect for families, 
                  groups of friends, or couples who want to try different flavours. Mix and 
                  match your favourites - get a classic Margherita with a spicy Diavola, or 
                  try our special creations.
                </p>
                <p className="text-gray-700">
                  Located near Heathrow, we're also perfect for travelers wanting a great 
                  meal at local prices before or after their flight.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-anchor-cream rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🔥</div>
                <p className="font-bold text-anchor-green">Stone Baked</p>
                <p className="text-sm text-gray-600">Authentic oven</p>
              </div>
              <div className="bg-anchor-cream rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🧀</div>
                <p className="font-bold text-anchor-green">Real Mozzarella</p>
                <p className="text-sm text-gray-600">Premium cheese</p>
              </div>
              <div className="bg-anchor-cream rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🍅</div>
                <p className="font-bold text-anchor-green">Fresh Sauce</p>
                <p className="text-sm text-gray-600">Made daily</p>
              </div>
              <div className="bg-anchor-cream rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">👨‍🍳</div>
                <p className="font-bold text-anchor-green">Hand Made</p>
                <p className="text-sm text-gray-600">To order</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pizza Menu */}
      <section id="pizza-menu" className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Our Pizza Menu
            </h2>
            
            {pizzaItems.length > 0 ? (
              <div className="grid gap-6">
                {pizzaItems.map((pizza, index) => (
                  <div key={index} className="bg-white rounded-xl p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-anchor-green">{pizza.name}</h3>
                      <p className="text-lg font-bold text-anchor-gold">
                        {pizza.offers?.price ? `£${pizza.offers.price}` : 'Price on request'}
                      </p>
                    </div>
                    <p className="text-gray-700">{pizza.description}</p>
                    {pizza.suitableForDiet && pizza.suitableForDiet.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {pizza.suitableForDiet.map((diet, i) => (
                          <span key={i} className="text-xs bg-anchor-cream text-anchor-green px-2 py-1 rounded">
                            {diet}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback menu if API fails */
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-bold text-anchor-green mb-3">Classic Pizzas</h3>
                  <ul className="space-y-3">
                    <li>
                      <p className="font-semibold">Margherita</p>
                      <p className="text-sm text-gray-600">Tomato, mozzarella, fresh basil</p>
                    </li>
                    <li>
                      <p className="font-semibold">Pepperoni</p>
                      <p className="text-sm text-gray-600">Tomato, mozzarella, pepperoni</p>
                    </li>
                    <li>
                      <p className="font-semibold">Hawaiian</p>
                      <p className="text-sm text-gray-600">Tomato, mozzarella, ham, pineapple</p>
                    </li>
                    <li>
                      <p className="font-semibold">Vegetarian</p>
                      <p className="text-sm text-gray-600">Tomato, mozzarella, peppers, mushrooms, onions, olives</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-bold text-anchor-green mb-3">Specialty Pizzas</h3>
                  <ul className="space-y-3">
                    <li>
                      <p className="font-semibold">Meat Feast</p>
                      <p className="text-sm text-gray-600">Tomato, mozzarella, pepperoni, ham, sausage, bacon</p>
                    </li>
                    <li>
                      <p className="font-semibold">BBQ Chicken</p>
                      <p className="text-sm text-gray-600">BBQ sauce, mozzarella, chicken, bacon, sweetcorn</p>
                    </li>
                    <li>
                      <p className="font-semibold">Diavola</p>
                      <p className="text-sm text-gray-600">Tomato, mozzarella, spicy salami, chillies</p>
                    </li>
                    <li>
                      <p className="font-semibold">Four Cheese</p>
                      <p className="text-sm text-gray-600">Tomato, mozzarella, gorgonzola, parmesan, goat cheese</p>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <CallToAction href="/food-menu" variant="primary" size="lg">
                View Full Food Menu
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* How BOGOF Works */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              How Our BOGOF Deal Works
            </h2>
            
            <div className="bg-anchor-sand/30 rounded-2xl p-8">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-anchor-gold text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold text-anchor-green">Choose Your Pizzas</p>
                    <p className="text-gray-700">Select any two pizzas from our menu</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-anchor-gold text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold text-anchor-green">Pay for the Higher Priced Pizza</p>
                    <p className="text-gray-700">You only pay for the more expensive pizza</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-anchor-gold text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold text-anchor-green">Get the Second Pizza FREE</p>
                    <p className="text-gray-700">The equal or lower priced pizza is completely free!</p>
                  </div>
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Terms:</strong> BOGOF deal available on pizzas only. Cannot be combined with other offers. 
                  Available for dine-in and takeaway. Management reserves the right to withdraw offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Perfect Pizza For Every Occasion
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  👨‍👩‍👧‍👦 Family Night
                </h3>
                <p className="text-gray-700">
                  BOGOF makes family pizza night affordable! Get pizzas the kids love plus 
                  grown-up flavours for the same price.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  ✈️ Pre-Flight Meal
                </h3>
                <p className="text-gray-700">
                  Flying from Heathrow? Enjoy proper pizza at pub prices instead of expensive 
                  airport food. Just 10 minutes away!
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🏈 Match Day
                </h3>
                <p className="text-gray-700">
                  Watch the game on our big screens while enjoying BOGOF pizzas. Perfect for 
                  sharing with mates.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🎉 Group Gatherings
                </h3>
                <p className="text-gray-700">
                  Feeding a crowd? Our BOGOF deal makes it easy and affordable to cater for 
                  birthday parties or gatherings.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🍺 Beer & Pizza
                </h3>
                <p className="text-gray-700">
                  The perfect pub combination! Enjoy our pizzas with a selection of craft 
                  beers and real ales.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🏠 Takeaway Treat
                </h3>
                <p className="text-gray-700">
                  Can't dine in? Take advantage of BOGOF for takeaway. Call ahead to order 
                  for quick collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Benefits */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Your Local Pizza Destination
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 text-center mb-8">
              <p className="text-xl">
                Conveniently located for pizza lovers across the area
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📍</div>
                <h3 className="font-bold text-anchor-green mb-2">Stanwell Moor</h3>
                <p className="text-gray-700">Your village pizza place with BOGOF deals every day</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✈️</div>
                <h3 className="font-bold text-anchor-green mb-2">Near Heathrow</h3>
                <p className="text-gray-700">10 minutes from all terminals - beat airport prices!</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-bold text-anchor-green mb-2">Free Parking</h3>
                <p className="text-gray-700">Easy collection with our spacious free car park</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Get Your BOGOF Pizza Today! 🍕
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Buy one pizza, get one free - available 7 days a week
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 Order Now: 01753 682707
            </CallToAction>
            <CallToAction 
              href="/find-us"
              variant="white"
              size="lg"
            >
              📍 Get Directions
            </CallToAction>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">The Anchor</p>
            <p>Horton Road, Stanwell Moor</p>
            <p>Surrey TW19 6AQ</p>
            <p className="text-sm mt-2">BOGOF Pizza Available Daily!</p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema with Offer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "The Anchor - BOGOF Pizza",
            "description": "Buy one get one free pizza deal at The Anchor pub near Heathrow. Fresh stone-baked pizzas.",
            "image": "https://the-anchor.pub/images/food/pizza-bogof-deal.jpg",
            "makesOffer": {
              "@type": "Offer",
              "name": "BOGOF Pizza Deal",
              "description": "Buy one pizza get one free. Second pizza must be of equal or lesser value.",
              "priceCurrency": "GBP",
              "itemOffered": {
                "@type": "MenuItem",
                "name": "Pizza",
                "description": "Fresh stone-baked pizzas"
              },
              "validFrom": "2024-01-01",
              "validThrough": "2024-12-31",
              "availability": "https://schema.org/InStock",
              "availableAtOrFrom": {
                "@type": "Place",
                "name": "The Anchor",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Horton Road",
                  "addressLocality": "Stanwell Moor",
                  "postalCode": "TW19 6AQ"
                }
              }
            },
            "servesCuisine": ["Italian", "Pizza"],
            "hasMenu": {
              "@type": "Menu",
              "name": "Pizza Menu",
              "hasMenuSection": {
                "@type": "MenuSection",
                "name": "Pizzas",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Margherita",
                    "description": "Tomato, mozzarella, fresh basil"
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Pepperoni",
                    "description": "Tomato, mozzarella, pepperoni"
                  }
                ]
              }
            },
            "url": "https://the-anchor.pub/food/pizza",
            "telephone": "+441753682707"
          })
        }}
      />
    </>
  )
}