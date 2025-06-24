import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Drinks Menu | The Anchor Stanwell Moor | Real Ales & Premium Tequila',
  description: 'Extensive drinks selection at The Anchor. Real ales, craft beers, premium tequilas, wines, and cocktails. Home of Thursday tequila tastings.',
  keywords: 'drinks menu stanwell moor, real ale pub, tequila tasting heathrow, craft beer stanwell',
  openGraph: {
    title: 'Drinks Menu - The Anchor Pub',
    description: 'Real ales, premium tequilas, and extensive drinks selection. Thursday tequila tastings!',
    images: ['/images/events/tequila-tasting/anchor-tequila-tasting-thursday-stanwell-moor.jpg'],
  },
}

export default function DrinksMenuPage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-anchor-green to-anchor-green-dark" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Drinks at The Anchor
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              From real ales to premium tequilas - something for everyone
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="tag bg-white/90 backdrop-blur-sm">🍺 Real Ales</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🥃 Premium Spirits</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍷 Wine Selection</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍹 Tequila Bar</span>
            </div>
            
            <CallToAction 
              href="#tequila-thursdays"
              variant="primary"
              size="large"
            >
              🌮 Thursday Tequila Tastings
            </CallToAction>
          </div>
        </div>
      </section>

      {/* Special Highlight */}
      <section id="tequila-thursdays" className="py-16 bg-anchor-gold/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              🥃 Tequila Thursdays
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-xl text-gray-700 mb-6">
                Join us every Thursday evening for our famous tequila tastings!
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🌮</div>
                  <h3 className="font-bold text-anchor-green mb-2">Expert Selection</h3>
                  <p className="text-gray-700">Premium tequilas from Mexico's finest distilleries</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">👨‍🏫</div>
                  <h3 className="font-bold text-anchor-green mb-2">Guided Tasting</h3>
                  <p className="text-gray-700">Learn about production, regions, and flavor profiles</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="font-bold text-anchor-green mb-2">Great Atmosphere</h3>
                  <p className="text-gray-700">Meet fellow tequila enthusiasts in a fun setting</p>
                </div>
              </div>
              <CallToAction href="/whats-on/tequila-tasting" variant="primary">
                Learn More About Tequila Thursdays
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Drinks Categories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Draught Beers & Ales */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍺 On Tap
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">London Pride</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£4.80 pint</p>
                  <p className="text-gray-700">Fuller's classic premium ale - 4.1%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Guinness</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£5.20 pint</p>
                  <p className="text-gray-700 text-sm">The black stuff, perfectly poured - 4.2%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Stella Artois</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£4.60 pint</p>
                  <p className="text-gray-700 text-sm">Belgian premium lager - 4.8%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Guest Ale</h3>
                  <p className="text-anchor-gold font-semibold mb-2">From £4.50</p>
                  <p className="text-gray-700 text-sm">Ask about this week's selection</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Peroni</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£4.90 pint</p>
                  <p className="text-gray-700 text-sm">Italian lager - 5.1%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Strongbow</h3>
                  <p className="text-anchor-gold font-semibold mb-2">£4.40 pint</p>
                  <p className="text-gray-700 text-sm">Classic apple cider - 4.5%</p>
                </div>
              </div>
            </div>

            {/* Bottled Beers */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍾 Bottled Beers & Ciders
              </h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Corona</h3>
                  <p className="text-anchor-gold">£4.20</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Budweiser</h3>
                  <p className="text-anchor-gold">£3.80</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Desperados</h3>
                  <p className="text-anchor-gold">£4.50</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Becks Blue (0%)</h3>
                  <p className="text-anchor-gold">£3.20</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Old Mout Cider</h3>
                  <p className="text-anchor-gold">£4.80</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Kopparberg</h3>
                  <p className="text-anchor-gold">£4.80</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Magners</h3>
                  <p className="text-anchor-gold">£4.50</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Selection varies</h3>
                  <p className="text-gray-700">Ask staff</p>
                </div>
              </div>
            </div>

            {/* Spirits */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🥃 Spirits & Cocktails
              </h2>
              
              {/* Premium Tequilas */}
              <div className="bg-anchor-sand/20 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Premium Tequila Collection</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-anchor-green">Patrón Silver</h4>
                    <p className="text-anchor-gold">£6.50</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-anchor-green">Don Julio Reposado</h4>
                    <p className="text-anchor-gold">£7.00</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-anchor-green">Casamigos Blanco</h4>
                    <p className="text-anchor-gold">£6.00</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-anchor-green">Herradura Añejo</h4>
                    <p className="text-anchor-gold">£8.00</p>
                  </div>
                </div>
                <p className="text-center mt-4 text-gray-600 italic">Ask about our full tequila menu - over 20 varieties!</p>
              </div>

              {/* Standard Spirits */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">House Spirits</h3>
                  <p className="text-anchor-gold font-semibold mb-2">Single £3.50 | Double £5.50</p>
                  <p className="text-gray-700">Smirnoff, Gordon's, Bacardi, Bell's, Jack Daniel's</p>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Premium Spirits</h3>
                  <p className="text-anchor-gold font-semibold mb-2">From £4.50</p>
                  <p className="text-gray-700">Grey Goose, Hendrick's, Kraken, Jameson</p>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Cocktails</h3>
                  <p className="text-anchor-gold font-semibold mb-2">From £7.95</p>
                  <p className="text-gray-700">Mojito, Margarita, Long Island, Espresso Martini</p>
                </div>
              </div>
            </div>

            {/* Wines */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍷 Wine Selection
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">House Wines</h3>
                  <p className="text-gray-700 mb-4">175ml / 250ml / Bottle</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Sauvignon Blanc</span>
                      <span className="text-anchor-gold">£4.50 / £6.00 / £18.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pinot Grigio</span>
                      <span className="text-anchor-gold">£4.50 / £6.00 / £18.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Merlot</span>
                      <span className="text-anchor-gold">£4.50 / £6.00 / £18.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shiraz</span>
                      <span className="text-anchor-gold">£4.50 / £6.00 / £18.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rosé</span>
                      <span className="text-anchor-gold">£4.50 / £6.00 / £18.00</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Premium Selection</h3>
                  <p className="text-gray-700 mb-4">By the bottle</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Chablis</span>
                      <span className="text-anchor-gold">£32.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rioja Reserva</span>
                      <span className="text-anchor-gold">£28.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prosecco</span>
                      <span className="text-anchor-gold">£25.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Champagne</span>
                      <span className="text-anchor-gold">£45.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft Drinks */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🥤 Soft Drinks & Hot Beverages
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Soft Drinks</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Coca-Cola / Diet Coke</span>
                      <span className="text-anchor-gold">£2.80</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lemonade / Tonic</span>
                      <span className="text-anchor-gold">£2.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orange / Apple Juice</span>
                      <span className="text-anchor-gold">£2.80</span>
                    </div>
                    <div className="flex justify-between">
                      <span>J2O</span>
                      <span className="text-anchor-gold">£3.20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Red Bull</span>
                      <span className="text-anchor-gold">£3.50</span>
                    </div>
                  </div>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Hot Drinks</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Americano</span>
                      <span className="text-anchor-gold">£2.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cappuccino / Latte</span>
                      <span className="text-anchor-gold">£3.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Espresso</span>
                      <span className="text-anchor-gold">£2.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tea</span>
                      <span className="text-anchor-gold">£2.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hot Chocolate</span>
                      <span className="text-anchor-gold">£3.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drinks Offers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              🎉 Happy Hour & Offers
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-xl text-anchor-green mb-3">Happy Hour</h3>
                <p className="text-anchor-gold font-semibold mb-2">Tuesday - Thursday 5-7pm</p>
                <p className="text-gray-700">Selected drinks £1 off</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-xl text-anchor-green mb-3">Wine Wednesday</h3>
                <p className="text-anchor-gold font-semibold mb-2">All day Wednesday</p>
                <p className="text-gray-700">House wine bottles £15</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Join Us for a Drink
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether it's a quick pint, tequila tasting, or celebration - we've got you covered
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="large"
            >
              📞 Book Your Visit
            </CallToAction>
            <CallToAction 
              href="/food-menu"
              variant="white"
              size="large"
            >
              🍔 View Food Menu
            </CallToAction>
          </div>
        </div>
      </section>
    <Footer /></>
  )
}