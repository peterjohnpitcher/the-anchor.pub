import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Drinks Menu | The Anchor Stanwell Moor | Real Ales & Premium Spirits',
  description: 'Extensive drinks selection at The Anchor. Real ales, craft beers, premium spirits, wines, and cocktails. Home of Thursday tequila tastings.',
  keywords: 'drinks menu stanwell moor, real ale pub, tequila tasting heathrow, craft beer stanwell',
  openGraph: {
    title: 'Drinks Menu - The Anchor Pub',
    description: 'Real ales, premium spirits, and extensive drinks selection. Thursday tequila tastings!',
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
              From real ales to premium spirits - something for everyone
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="tag bg-white/90 backdrop-blur-sm">🍺 Real Ales</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🥃 Premium Spirits</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍷 Wine Selection</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍹 Cocktails</span>
            </div>
            
            <CallToAction 
              href="#tequila-thursdays"
              variant="primary"
              size="large"
            >
              🥃 Thursday Tequila Tastings
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
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Birra Moretti</h3>
                  <p className="text-gray-700">Italian lager - 4.6%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Carling</h3>
                  <p className="text-gray-700">Classic British lager - 4.0%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Guinness</h3>
                  <p className="text-gray-700">The black stuff, perfectly poured - 4.2%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Stella Artois</h3>
                  <p className="text-gray-700">Belgian premium lager - 4.8%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Inch's Apple Cider</h3>
                  <p className="text-gray-700">Medium apple cider - 4.5%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Fosters</h3>
                  <p className="text-gray-700">Australian lager - 4.0%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Pravha</h3>
                  <p className="text-gray-700">Premium Czech pilsner - 4.0%</p>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Carlsberg</h3>
                  <p className="text-gray-700">Danish pilsner - 3.8%</p>
                </div>
              </div>
            </div>

            {/* Bottled Beers & Ciders */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍾 Bottled Selection
              </h2>
              
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Bottled Ales</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Abbot Ale</h4>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Greene King IPA</h4>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Old Speckled Hen</h4>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Newcastle Brown Ale</h4>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-anchor-green mb-4">Bottled Beers</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Budweiser</h4>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Corona Extra</h4>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Desperados</h4>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Peroni</h4>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Peroni 0%</h4>
                  <p className="text-sm text-gray-600">Alcohol-free</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-anchor-green mb-4">Bottled Ciders</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Magners</h4>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Old Mout</h4>
                  <p className="text-sm text-gray-600">Berries & Cherries</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Old Mout</h4>
                  <p className="text-sm text-gray-600">Kiwi & Lime</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Old Mout</h4>
                  <p className="text-sm text-gray-600">Strawberry & Apple</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-anchor-green">Aspall</h4>
                </div>
              </div>
            </div>

            {/* Cocktails */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍹 Cocktails
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-anchor-sand/20 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-4">Classic Cocktails</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Aperol Spritz</li>
                    <li>Espresso Martini</li>
                    <li>Passion Fruit Martini</li>
                    <li>Classic Margarita</li>
                    <li>Vodka Margarita</li>
                    <li>Sex on the Beach</li>
                    <li>Woo Woo</li>
                    <li>Pimms</li>
                  </ul>
                </div>
                <div className="bg-anchor-sand/20 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-4">Specialty Cocktails</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Margarita Spritz</li>
                    <li>Apple and Blackberry Pie</li>
                    <li>Crimbo Colada</li>
                    <li>Bailey's Hot Chocolate</li>
                    <li>Hot Toddy</li>
                  </ul>
                </div>
                <div className="bg-anchor-sand/20 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-anchor-green mb-4">Shots & Bombs</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Baby Guinness</li>
                    <li>Jager Bomb</li>
                    <li>Kick Bomb</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Spirits */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🥃 Spirits
              </h2>
              
              {/* Gin Selection */}
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
                <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Gin Collection</h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Bombay Sapphire</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Gordons</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Gordons Pink</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Gordons Lemon</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Gordons White Peach</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Gordons Tropical Passionfruit</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Hendricks</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Hendrick's Flora Adora</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Tanqueray</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Tanqueray 10</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Tanqueray Flor de Sevilla</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Tanqueray Blackcurrant Royale</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Whitley Neill Rhubarb</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Williams Chase Pink Grapefruit</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Kopparberg Strawberry & Lime</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Botanist</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Gordons Sloe Gin</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Chase Sloe Gin</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Warner's Elderflower</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Warner's Honeybee</p>
                  </div>
                </div>
              </div>

              {/* Whisky Selection */}
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
                <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Whisky Selection</h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Baileys</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Bells</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Famous Grouse</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Jack Daniels</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Jack Daniels Fire</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Jack Daniels Honey</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Jack Daniel's Apple</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Jameson</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Bushmills</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Glenfiddich</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Johnnie Walker Black Label</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Monkey Shoulder</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Southern Comfort</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Makers Mark</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Talisker</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Glenmorangie</p>
                  </div>
                  <div className="text-center p-3 bg-anchor-cream rounded">
                    <p className="font-semibold">Shanky's Whip</p>
                  </div>
                </div>
              </div>

              {/* Tequila Selection */}
              <div className="bg-anchor-sand/20 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Tequila & Mezcal</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold">Jose Cuervo Gold</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold">Jose Cuervo Silver</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold">Cazcabel Coffee</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold">Patron Silver</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold">Olmeca Altos Plata</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold">Olmeca Reposado</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold">Vida Mezcal</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold">Lustre Strawberry Cream</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <p className="font-semibold">Lustre Pineapple Cream</p>
                  </div>
                </div>
              </div>

              {/* Other Spirits */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Vodka</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>Smirnoff Red</li>
                    <li>Grey Goose</li>
                    <li>Grey Goose Strawberry & Lemongrass</li>
                    <li>Smirnoff Raspberry Crush</li>
                    <li>Smirnoff Mango & Passionfruit</li>
                    <li>Lustre Caffe Latte Cream</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Rum</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>Bacardi</li>
                    <li>Bacardi Carta Negra</li>
                    <li>Captain Morgan Gold Spiced</li>
                    <li>Captain Morgans Original Dark</li>
                    <li>Havana Club 3</li>
                    <li>Havana Club 7</li>
                    <li>Havana Club Especial</li>
                    <li>Kraken</li>
                    <li>Malibu</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Liqueurs & Shooters</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>Aperol</li>
                    <li>Archers</li>
                    <li>Cointreau</li>
                    <li>Disaronno</li>
                    <li>Drambuie</li>
                    <li>Jägermeister</li>
                    <li>Kahlua</li>
                    <li>Midori</li>
                    <li>Pernod</li>
                    <li>Sambuca (Classic/Raspberry/Liquorice/Chilli)</li>
                    <li>Sourz (Cherry/Apple/Strawberry)</li>
                    <li>Tia Maria</li>
                    <li>Chambord</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Wines */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍷 Wine Selection
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Red Wines</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Counterpoint Shiraz</li>
                    <li>El Pico Cabernet Sauvignon</li>
                    <li>Gentlemens Collection</li>
                    <li>I Heart Merlot</li>
                    <li>I Heart Shiraz</li>
                    <li>Rocosa Malbec</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">White Wines</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Counterpoint Chardonnay</li>
                    <li>El Pico Sauvignon Blanc</li>
                    <li>Giotto Pinot Grigio</li>
                    <li>I Heart Chardonnay</li>
                    <li>I Heart Pinot Grigio</li>
                    <li>I Heart Sauvignon Blanc</li>
                    <li>Piesporter Michelsberg</li>
                    <li>Montford Estate Sauvignon Blanc</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Rosé & Sparkling</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Gris des Signeurs</li>
                    <li>I Heart Rose</li>
                    <li>Three Pebbles Bay</li>
                    <li>Ara Marl Sauvignon Rose</li>
                    <li>Ara Pinot Gris</li>
                    <li className="pt-2 font-semibold">Sparkling:</li>
                    <li>G&G Prosecco</li>
                  </ul>
                </div>
              </div>
              <p className="text-center mt-6 text-gray-600 italic">
                Also available: Mulled Wine (175ml) during winter months
              </p>
            </div>

            {/* Soft Drinks & Mixers */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🥤 Soft Drinks & Mixers
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Soft Drinks</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Harrogate Still Water</div>
                    <div>Harrogate Sparkling Water</div>
                    <div>Can of Coke</div>
                    <div>Can of Diet Coke</div>
                    <div>Can of Fanta</div>
                    <div>J2o Orange & Passionfruit</div>
                    <div>J2o Apple & Mango</div>
                    <div>J2o Apple & Raspberry</div>
                    <div>Fruit Shoot Orange</div>
                    <div>Fruit Shoot Blackcurrant</div>
                    <div>Appletiser (can)</div>
                  </div>
                </div>
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-4">Mixers</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Coca Cola</div>
                    <div>Diet Coke</div>
                    <div>Coke Zero</div>
                    <div>Lemonade</div>
                    <div>7-Up Free</div>
                    <div>Tonic</div>
                    <div>Slimline Tonic</div>
                    <div>Slimline Elderflower</div>
                    <div>Ginger Ale</div>
                    <div>Soda</div>
                    <div>Orange Juice</div>
                    <div>Pineapple Juice</div>
                    <div>Cranberry Juice</div>
                    <div>Red Bull</div>
                    <div>Kick Energy Drink</div>
                    <div>Fever Tree Mexican Lime</div>
                    <div>Fever Tree Rhubarb & Raspberry</div>
                    <div>Russchian Pink Soda</div>
                    <div>Lime Cordial</div>
                    <div>Blackcurrant Cordial</div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4 italic">
                    Splash of mixer available for spirits
                  </p>
                </div>
              </div>
            </div>

            {/* Hot Drinks */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                ☕ Hot Drinks
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl mx-auto">
                <p className="text-center text-gray-700 mb-4">
                  Available with cold milk, sugar, or sweetener
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>Americano</div>
                  <div>Cappuccino</div>
                  <div>Latte</div>
                  <div>Espresso</div>
                  <div>Hot Chocolate</div>
                  <div>Tea (various)</div>
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
    </>
  )
}