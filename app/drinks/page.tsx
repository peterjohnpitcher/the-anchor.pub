import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Drinks Menu | The Anchor Stanwell Moor | Real Ales & Premium Spirits',
  description: 'Extensive drinks selection at The Anchor. Real ales, craft beers, premium spirits, wines, and cocktails. Great atmosphere and friendly service.',
  keywords: 'drinks menu stanwell moor, real ale pub, cocktails heathrow, craft beer stanwell',
  openGraph: {
    title: 'Drinks Menu - The Anchor Pub',
    description: 'Real ales, premium spirits, and extensive drinks selection. Something for everyone!',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
}

export default function DrinksMenuPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-anchor-green to-anchor-green-dark" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Drinks at The Anchor
            </h1>
            
            {/* Status Bar */}
            <div className="flex justify-center mb-6">
              <StatusBar 
                theme={{
                  background: 'bg-white/10 backdrop-blur-md',
                  border: 'border-2 border-white/20',
                  text: 'text-white',
                  accentText: 'text-white/60'
                }}
              />
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              From real ales to premium spirits - something for everyone
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="tag bg-white/90 backdrop-blur-sm">🍺 Real Ales</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🥃 Premium Spirits</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍷 Wine Selection</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍹 Cocktails</span>
            </div>
            
            <CallToAction 
              href="#cocktails"
              variant="primary"
              size="lg"
            >
              🍹 View Our Cocktails
            </CallToAction>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#draught" className="px-6 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              On Tap 🍺
            </Link>
            <Link href="#bottled" className="px-6 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              Bottled 🍾
            </Link>
            <Link href="#cocktails" className="px-6 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              Cocktails 🍹
            </Link>
            <Link href="#spirits" className="px-6 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              Spirits 🥃
            </Link>
            <Link href="#wine" className="px-6 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              Wine 🍷
            </Link>
            <Link href="#soft" className="px-6 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              Soft Drinks 🥤
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Draught Section */}
            <div id="draught" className="mb-16">
              <h2 className="text-3xl font-bold text-anchor-green mb-8">🍺 On Tap</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Birra Moretti</h3>
                  <p className="text-gray-600">4.6% ABV - Premium Italian lager</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Carling</h3>
                  <p className="text-gray-600">4.0% ABV - Refreshing British lager</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Guinness</h3>
                  <p className="text-gray-600">4.2% ABV - Classic Irish stout</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Stella Artois</h3>
                  <p className="text-gray-600">4.8% ABV - Belgian premium lager</p>
                </div>
              </div>
            </div>

            {/* Cocktails Section */}
            <div id="cocktails" className="mb-16">
              <h2 className="text-3xl font-bold text-anchor-green mb-8">🍹 Cocktails</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Espresso Martini</h3>
                  <p className="text-gray-600">Vodka, coffee liqueur, fresh espresso</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Passion Fruit Martini</h3>
                  <p className="text-gray-600">Vodka, passoa, passion fruit, prosecco shot</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Classic Margarita</h3>
                  <p className="text-gray-600">Tequila, triple sec, lime juice</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Aperol Spritz</h3>
                  <p className="text-gray-600">Aperol, prosecco, soda water</p>
                </div>
              </div>
            </div>

            {/* Spirits Section */}
            <div id="spirits" className="mb-16">
              <h2 className="text-3xl font-bold text-anchor-green mb-8">🥃 Spirits</h2>
              <p className="text-gray-600 mb-6">We have an extensive selection of premium spirits including:</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Gin</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>Bombay Sapphire</li>
                    <li>Hendrick's</li>
                    <li>Tanqueray</li>
                    <li>Gordon's</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Whisky</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>Jameson</li>
                    <li>Jack Daniel's</li>
                    <li>Glenfiddich</li>
                    <li>Famous Grouse</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Vodka</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>Smirnoff</li>
                    <li>Grey Goose</li>
                    <li>Absolut</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Wine Section */}
            <div id="wine" className="mb-16">
              <h2 className="text-3xl font-bold text-anchor-green mb-8">🍷 Wine Selection</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Red Wine</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>Merlot</li>
                    <li>Cabernet Sauvignon</li>
                    <li>Shiraz</li>
                    <li>Malbec</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">White Wine</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>Sauvignon Blanc</li>
                    <li>Pinot Grigio</li>
                    <li>Chardonnay</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Rosé & Sparkling</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>House Rosé</li>
                    <li>Prosecco</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Soft Drinks Section */}
            <div id="soft" className="mb-16">
              <h2 className="text-3xl font-bold text-anchor-green mb-8">🥤 Soft Drinks</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Soft Drinks</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>Coca-Cola, Diet Coke, Coke Zero</li>
                    <li>Lemonade, Ginger Ale</li>
                    <li>Orange Juice, Apple Juice</li>
                    <li>J2O varieties</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Hot Drinks</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>Americano</li>
                    <li>Cappuccino</li>
                    <li>Latte</li>
                    <li>Tea varieties</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
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