import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'

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
              size="lg"
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
                  <p className="text-gray-700">Fuller's classic premium ale - 4.1%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Guinness</h3>
                  <p className="text-gray-700 text-sm">The black stuff, perfectly poured - 4.2%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Stella Artois</h3>
                  <p className="text-gray-700 text-sm">Belgian premium lager - 4.8%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Guest Ale</h3>
                  <p className="text-gray-700 text-sm">Ask about this week's selection</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Peroni</h3>
                  <p className="text-gray-700 text-sm">Italian lager - 5.1%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Strongbow</h3>
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
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Budweiser</h3>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Desperados</h3>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Becks Blue (0%)</h3>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Old Mout Cider</h3>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Kopparberg</h3>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-anchor-green">Magners</h3>
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
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-anchor-green">Don Julio Reposado</h4>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-anchor-green">Casamigos Blanco</h4>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-anchor-green">Herradura Añejo</h4>
                  </div>
                </div>
                <p className="text-center mt-4 text-gray-600 italic">Ask about our full tequila menu - over 20 varieties!</p>
              </div>

              {/* Standard Spirits */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">House Spirits</h3>
                  <p className="text-gray-700">Smirnoff, Gordon's, Bacardi, Bell's, Jack Daniel's</p>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Premium Spirits</h3>
                  <p className="text-gray-700">Grey Goose, Hendrick's, Kraken, Jameson</p>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Cocktails</h3>
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
                  <div className="space-y-3">
                    <div>
                      <span>Sauvignon Blanc</span>
                    </div>
                    <div>
                      <span>Pinot Grigio</span>
                    </div>
                    <div>
                      <span>Merlot</span>
                    </div>
                    <div>
                      <span>Shiraz</span>
                    </div>
                    <div>
                      <span>Rosé</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Premium Selection</h3>
                  <div className="space-y-3">
                    <div>
                      <span>Chablis</span>
                    </div>
                    <div>
                      <span>Rioja Reserva</span>
                    </div>
                    <div>
                      <span>Prosecco</span>
                    </div>
                    <div>
                      <span>Champagne</span>
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
                    <div>
                      <span>Coca-Cola / Diet Coke</span>
                    </div>
                    <div>
                      <span>Lemonade / Tonic</span>
                    </div>
                    <div>
                      <span>Orange / Apple Juice</span>
                    </div>
                    <div>
                      <span>J2O</span>
                    </div>
                    <div>
                      <span>Red Bull</span>
                    </div>
                  </div>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Hot Drinks</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span>Americano</span>
                    </div>
                    <div>
                      <span>Cappuccino / Latte</span>
                    </div>
                    <div>
                      <span>Espresso</span>
                    </div>
                    <div>
                      <span>Tea</span>
                    </div>
                    <div>
                      <span>Hot Chocolate</span>
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
                <p className="text-gray-700">Selected drinks with special offers</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-xl text-anchor-green mb-3">Wine Wednesday</h3>
                <p className="text-anchor-gold font-semibold mb-2">All day Wednesday</p>
                <p className="text-gray-700">Special offers on house wine bottles</p>
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
              size="lg"
            >
              📞 Book Your Visit
            </CallToAction>
            <CallToAction 
              href="/food-menu"
              variant="white"
              size="lg"
            >
              🍔 View Food Menu
            </CallToAction>
          </div>
        </div>
      </section>
    </>
  )
}