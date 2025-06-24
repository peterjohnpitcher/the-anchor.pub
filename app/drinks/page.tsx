import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
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
      {/* Status Bar */}
      <div className="flex justify-center py-4 bg-gray-50 mt-20">
        <StatusBar />
      </div>
      
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
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Birra Moretti</h3>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.6% ABV</p>
                  <p className="text-gray-700 text-sm">Premium Italian lager with a smooth, balanced taste and subtle hop character. Light golden colour with a crisp, refreshing finish.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Carling</h3>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.0% ABV</p>
                  <p className="text-gray-700 text-sm">Britain's favourite lager. Clean, crisp taste with a perfect balance of sweetness and bitterness. Easy-drinking session beer.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Guinness</h3>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.2% ABV</p>
                  <p className="text-gray-700 text-sm">Ireland's iconic stout. Rich, creamy head with distinctive roasted barley flavours, hints of coffee and chocolate. Perfectly poured every time.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Stella Artois</h3>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.8% ABV</p>
                  <p className="text-gray-700 text-sm">Belgian premium lager since 1366. Full-flavoured with a hoppy bitterness and crisp finish. The gold standard of European lagers.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Inch's Apple Cider</h3>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.5% ABV</p>
                  <p className="text-gray-700 text-sm">Traditional medium-dry apple cider. Made from carefully selected apples for a crisp, refreshing taste with natural fruit sweetness.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Fosters</h3>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.0% ABV</p>
                  <p className="text-gray-700 text-sm">Australian-style lager that's bright and golden. Light, refreshing taste with subtle fruity notes. Perfect for sunny beer garden sessions.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Pravha</h3>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.0% ABV</p>
                  <p className="text-gray-700 text-sm">Premium Czech pilsner with authentic Saaz hops. Light, crisp and refreshing with a delicate floral aroma and clean finish.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Carlsberg</h3>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">3.8% ABV</p>
                  <p className="text-gray-700 text-sm">Danish pilsner that's probably the best beer in the world. Light, refreshing with a balanced hop character and smooth finish.</p>
                </div>
              </div>
            </div>

            {/* Bottled Beers & Ciders */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍾 Bottled Selection
              </h2>
              
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Bottled Ales</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Abbot Ale</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">5.0% ABV</p>
                  <p className="text-gray-700 text-sm">Full-bodied, distinctive premium bitter. Smooth, mature flavour with masses of fruit character and a malty richness.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Greene King IPA</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">3.6% ABV</p>
                  <p className="text-gray-700 text-sm">Fresh, dry hop flavour with herbal notes and citrus. Clean, refreshing bitter finish. A classic English IPA since 1799.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Old Speckled Hen</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">5.2% ABV</p>
                  <p className="text-gray-700 text-sm">Smooth, malty and fruity premium ale. Rich amber colour with a distinctive toffee and malt character, perfectly balanced finish.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Newcastle Brown Ale</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.7% ABV</p>
                  <p className="text-gray-700 text-sm">The one and only. Sweet caramel notes with a nutty, dry finish. Full-bodied with a smooth, creamy texture.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-anchor-green mb-4">Bottled Beers</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Budweiser</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">5.0% ABV</p>
                  <p className="text-gray-700 text-sm">King of Beers. Crisp American lager with a clean, smooth taste. Brewed with rice for exceptional drinkability.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Corona Extra</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.5% ABV</p>
                  <p className="text-gray-700 text-sm">Mexico's favourite beer. Light, refreshing pilsner-style lager. Best served with a wedge of lime.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Desperados</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">5.9% ABV</p>
                  <p className="text-gray-700 text-sm">Tequila-flavoured beer with a kick. Bold combination of beer with tequila flavour and a hint of citrus.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Peroni</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">5.1% ABV</p>
                  <p className="text-gray-700 text-sm">Italy's number one premium lager. Crisp and refreshing with a clean, dry finish. Effortlessly stylish.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Peroni 0%</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">0.0% ABV</p>
                  <p className="text-gray-700 text-sm">All the Italian style, none of the alcohol. Same crisp taste and refreshing character as the original.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-anchor-green mb-4">Bottled Ciders</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Magners</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.5% ABV</p>
                  <p className="text-gray-700 text-sm">Original Irish cider. Made from 17 varieties of apples for a unique crisp, refreshing taste. Best served over ice.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Old Mout Berries & Cherries</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.0% ABV</p>
                  <p className="text-gray-700 text-sm">Fruity cider from New Zealand. Blend of strawberries and raspberries with juicy cherries. Sweet and refreshing.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Old Mout Kiwi & Lime</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.0% ABV</p>
                  <p className="text-gray-700 text-sm">Exotic fruit cider with zingy kiwi and zesty lime. Light, crisp apple base with tropical twist.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Old Mout Strawberry & Apple</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">4.0% ABV</p>
                  <p className="text-gray-700 text-sm">Sweet strawberries blended with crisp apples. Refreshingly fruity with a light, summery taste.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Aspall</h4>
                  <p className="text-sm font-semibold text-anchor-gold mb-2">5.5% ABV</p>
                  <p className="text-gray-700 text-sm">Suffolk's finest cyder since 1728. Medium dry with champagne-like sparkle. Complex apple flavours with a crisp finish.</p>
                </div>
              </div>
            </div>

            {/* Cocktails */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                🍹 Cocktails
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Aperol Spritz</h4>
                  <p className="text-gray-700 text-sm">Aperol, prosecco, soda water. Light, refreshing Italian classic.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Espresso Martini</h4>
                  <p className="text-gray-700 text-sm">Vodka, coffee liqueur, fresh espresso. The perfect pick-me-up.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Passion Fruit Martini</h4>
                  <p className="text-gray-700 text-sm">Vodka, passoa, passion fruit, lime. Served with prosecco shot.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Classic Margarita</h4>
                  <p className="text-gray-700 text-sm">Tequila, triple sec, lime juice. Salt or sugar rim optional.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Vodka Margarita</h4>
                  <p className="text-gray-700 text-sm">Our twist on the classic. Vodka, triple sec, lime juice.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Sex on the Beach</h4>
                  <p className="text-gray-700 text-sm">Vodka, peach schnapps, orange and cranberry juice.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Woo Woo</h4>
                  <p className="text-gray-700 text-sm">Vodka, peach schnapps, cranberry juice. Simple and delicious.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Pimms</h4>
                  <p className="text-gray-700 text-sm">Pimm's No.1, lemonade, fresh fruit and mint. Summer in a glass.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Margarita Spritz</h4>
                  <p className="text-gray-700 text-sm">Tequila, triple sec, prosecco. A bubbly twist on the classic.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Apple and Blackberry Pie</h4>
                  <p className="text-gray-700 text-sm">Vodka, apple juice, blackberry liqueur. Autumn comfort in a glass.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Crimbo Colada</h4>
                  <p className="text-gray-700 text-sm">Festive twist on piña colada. Rum, coconut, cranberry.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Bailey's Hot Chocolate</h4>
                  <p className="text-gray-700 text-sm">Rich hot chocolate with Baileys. Topped with whipped cream.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Hot Toddy</h4>
                  <p className="text-gray-700 text-sm">Whisky, honey, lemon, hot water. Winter warmer.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Baby Guinness</h4>
                  <p className="text-gray-700 text-sm">Kahlúa and Baileys layered shot. Looks like a mini pint.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Jager Bomb</h4>
                  <p className="text-gray-700 text-sm">Jägermeister dropped in Red Bull. Party starter.</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-xl text-anchor-green mb-2">Kick Bomb</h4>
                  <p className="text-gray-700 text-sm">Vodka shot in Kick energy drink. Local favourite.</p>
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
                <p className="text-center text-gray-600 mb-8">All served with premium tonic and garnish</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Bombay Sapphire</h4>
                    <p className="text-gray-700 text-sm">Aromatic with bright citrus notes. Ten hand-selected botanicals from around the world.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Gordons</h4>
                    <p className="text-gray-700 text-sm">The world's best-selling London Dry. Triple-distilled with juniper, coriander and citrus.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Gordons Pink</h4>
                    <p className="text-gray-700 text-sm">Inspired by Gordon's 1880s recipe. Natural strawberry and raspberry flavours.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Gordons Lemon</h4>
                    <p className="text-gray-700 text-sm">Zesty Mediterranean lemons. Fresh citrus taste perfect for G&T.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Gordons White Peach</h4>
                    <p className="text-gray-700 text-sm">Juicy white peach distilled gin. Sweet and refreshing.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Gordons Tropical Passionfruit</h4>
                    <p className="text-gray-700 text-sm">Exotic passion fruit flavour. Vibrant tropical taste.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Hendricks</h4>
                    <p className="text-gray-700 text-sm">Infused with cucumber and rose petals. Delightfully peculiar.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Hendrick's Flora Adora</h4>
                    <p className="text-gray-700 text-sm">Limited release with floral botanicals. Garden party in a glass.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Tanqueray</h4>
                    <p className="text-gray-700 text-sm">Four botanicals perfection. Bold juniper with citrus and spice.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Tanqueray 10</h4>
                    <p className="text-gray-700 text-sm">Small batch with fresh citrus fruits. Ultra-smooth premium gin.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Tanqueray Flor de Sevilla</h4>
                    <p className="text-gray-700 text-sm">Seville orange essence. Uniquely bittersweet citrus taste.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Tanqueray Blackcurrant Royale</h4>
                    <p className="text-gray-700 text-sm">French blackcurrants and vanilla. Rich, fruity and sophisticated.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Whitley Neill Rhubarb</h4>
                    <p className="text-gray-700 text-sm">Yorkshire rhubarb with crisp citrus. Tart and refreshing.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Williams Chase Pink Grapefruit</h4>
                    <p className="text-gray-700 text-sm">Potato-based gin with pink grapefruit. Zesty and aromatic.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Kopparberg Strawberry & Lime</h4>
                    <p className="text-gray-700 text-sm">Swedish gin with strawberry and lime. Light and fruity.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Botanist</h4>
                    <p className="text-gray-700 text-sm">22 hand-foraged Islay botanicals. Complex and smooth.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Gordons Sloe Gin</h4>
                    <p className="text-gray-700 text-sm">Wild sloe berries steeped in gin. Sweet and warming.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Chase Sloe Gin</h4>
                    <p className="text-gray-700 text-sm">Herefordshire sloes and mulberries. Rich, jammy flavour.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Warner's Elderflower</h4>
                    <p className="text-gray-700 text-sm">Farm-grown elderflower. Delicate floral sweetness.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Warner's Honeybee</h4>
                    <p className="text-gray-700 text-sm">Local honey and lemon verbena. Smooth and naturally sweet.</p>
                  </div>
                </div>
              </div>

              {/* Whisky Selection */}
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
                <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Whisky Selection</h3>
                <p className="text-center text-gray-600 mb-8">From smooth Irish to peaty Scotch</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Baileys</h4>
                    <p className="text-gray-700 text-sm">Irish cream liqueur. Smooth blend of Irish whiskey, cream, and cocoa.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Bells</h4>
                    <p className="text-gray-700 text-sm">Scotland's favourite blend. Smooth and fruity with a spicy finish.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Famous Grouse</h4>
                    <p className="text-gray-700 text-sm">Smooth blended Scotch. Full-flavoured with hints of sherry oak.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Jack Daniels</h4>
                    <p className="text-gray-700 text-sm">Tennessee whiskey. Charcoal mellowed for smoothness. Sweet vanilla notes.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Jack Daniels Fire</h4>
                    <p className="text-gray-700 text-sm">Cinnamon liqueur. Fiery red hot cinnamon taste with smooth finish.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Jack Daniels Honey</h4>
                    <p className="text-gray-700 text-sm">Honey liqueur. Natural honey sweetness with whiskey smoothness.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Jack Daniel's Apple</h4>
                    <p className="text-gray-700 text-sm">Crisp green apple liqueur. Fresh orchard taste with whiskey warmth.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Jameson</h4>
                    <p className="text-gray-700 text-sm">Triple-distilled Irish whiskey. Smooth, sweet with subtle wood notes.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Bushmills</h4>
                    <p className="text-gray-700 text-sm">Original Irish whiskey since 1608. Light, fruity with vanilla sweetness.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Glenfiddich</h4>
                    <p className="text-gray-700 text-sm">World's most awarded single malt. Fresh pear, subtle oak, soft vanilla.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Johnnie Walker Black Label</h4>
                    <p className="text-gray-700 text-sm">12-year blend. Deep, complex with smoky finish. True icon.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Monkey Shoulder</h4>
                    <p className="text-gray-700 text-sm">Triple malt blend. Smooth, rich and mellow. Vanilla, honey, spiced oak.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Southern Comfort</h4>
                    <p className="text-gray-700 text-sm">Whiskey liqueur with fruits and spices. Sweet, smooth, one-of-a-kind.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Makers Mark</h4>
                    <p className="text-gray-700 text-sm">Kentucky bourbon. Hand-dipped red wax seal. Sweet caramel and vanilla.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Talisker</h4>
                    <p className="text-gray-700 text-sm">Island single malt. Powerful peat smoke, sea salt, spicy pepper finish.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Glenmorangie</h4>
                    <p className="text-gray-700 text-sm">Highland single malt. Delicate, floral with vanilla and peach notes.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-xl text-anchor-green mb-2">Shanky's Whip</h4>
                    <p className="text-gray-700 text-sm">Black Irish whiskey liqueur. Smooth blend with vanilla and caramel.</p>
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
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
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
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
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
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
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
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
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
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
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
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow max-w-2xl mx-auto">
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