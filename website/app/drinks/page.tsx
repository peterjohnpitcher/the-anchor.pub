import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { parseMenuMarkdown } from '@/lib/menu-parser'
import { MenuRenderer } from '@/components/MenuRenderer'
import { PageHeaderWrapper } from '@/components/ui/PageHeaderWrapper'
import { Metadata } from 'next'
import { drinksMenuSchema, generateBreadcrumbSchema } from '@/lib/enhanced-schemas'

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

export default async function DrinksMenuPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Drinks Menu', url: '/drinks' }
  ])

  const menuData = await parseMenuMarkdown('drinks')
  
  if (!menuData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Menu temporarily unavailable. Please call us on 01753 682707.</p>
      </div>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([drinksMenuSchema, breadcrumbSchema]) }}
      />
      {/* Hero Section */}
      <PageHeaderWrapper
        route="/drinks"
        title="Drinks at The Anchor"
        description="From real ales to premium spirits - something for everyone"
        minHeight="min-h-[50vh]"
        showStatusBar={true}
      >
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="tag bg-white/90 backdrop-blur-sm">🍺 Real Ales</span>
          <span className="tag bg-white/90 backdrop-blur-sm">🥃 Premium Spirits</span>
          <span className="tag bg-white/90 backdrop-blur-sm">🍷 Wine Selection</span>
          <span className="tag bg-white/90 backdrop-blur-sm">🍹 Cocktails</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CallToAction 
            href="#menu"
            variant="primary"
            size="lg"
            className="bg-white text-anchor-green hover:bg-gray-100"
          >
            📖 Jump to Menu
          </CallToAction>
          <CallToAction 
            href="#cocktails"
            variant="primary"
            size="lg"
          >
            🍹 View Our Cocktails
          </CallToAction>
        </div>
      </PageHeaderWrapper>

      {/* Quick Links */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {menuData.categories.map((category) => (
              <Link 
                key={category.id}
                href={`#${category.id}`} 
                className="px-6 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                {category.title} {category.emoji}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Your Local After Landing */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Your Local After Landing - Just 5 Minutes from Heathrow
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="font-bold text-xl mb-2">Airport Staff Haven</h3>
                <p className="text-gray-700">Perfect spot for crews and airport workers to unwind after long shifts. Join your colleagues for a well-deserved pint.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚖</div>
                <h3 className="font-bold text-xl mb-2">Meeting Point</h3>
                <p className="text-gray-700">Picking someone up? Skip expensive airport parking. Meet here for a relaxed drink while they clear customs.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="font-bold text-xl mb-2">Traveller's Rest</h3>
                <p className="text-gray-700">Just landed or about to fly? We're your local. Quick taxi from all terminals, open late, proper British welcome.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why The Anchor for Drinks */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Stanwell Moor's Premier Drinks Destination
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="font-bold text-xl text-anchor-green mb-4">🍺 The Beer Garden Experience</h3>
                <p className="text-gray-700 mb-4">Stanwell Moor's largest beer garden. Watch planes overhead while enjoying perfectly poured pints in the sunshine. Heated areas and covered sections mean the garden's open year-round.</p>
                <p className="text-sm text-gray-600">Dog-friendly outdoor areas - bring your four-legged friends!</p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="font-bold text-xl text-anchor-green mb-4">📺 Sports & Atmosphere</h3>
                <p className="text-gray-700 mb-4">Multiple screens showing major sporting events on BBC and ITV. Catch the Six Nations, World Cup, Euros, and other big tournaments with great views from every seat.</p>
                <p className="text-sm text-gray-600">Big matches get busy - arrive early for the best seats!</p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="font-bold text-xl text-anchor-green mb-4">🎯 Local Institution</h3>
                <p className="text-gray-700 mb-4">Serving Stanwell Moor and Staines for generations. Where locals meet, airport workers unwind, and visitors become regulars. Your neighbourhood pub with a global touch.</p>
                <p className="text-sm text-gray-600">Ask about our locals' card for exclusive offers!</p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="font-bold text-xl text-anchor-green mb-4">🌟 Quality & Choice</h3>
                <p className="text-gray-700 mb-4">From real ales to craft cocktails, we take drinks seriously. Expert bar staff, proper glassware, and drinks served exactly how they should be. No shortcuts.</p>
                <p className="text-sm text-gray-600">Can't see your favourite? Just ask - we might have it!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Highlights */}
      <section className="section-spacing bg-anchor-gold/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              Drinks for Every Season
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">☀️</div>
                <h3 className="font-bold mb-2">Summer</h3>
                <p className="text-sm text-gray-700">Pimm's jugs, ice-cold lagers, and frozen cocktails in the sun-drenched beer garden</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🍂</div>
                <h3 className="font-bold mb-2">Autumn</h3>
                <p className="text-sm text-gray-700">Warming ales, harvest ciders, and our famous hot toddy as the evenings draw in</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">❄️</div>
                <h3 className="font-bold mb-2">Winter</h3>
                <p className="text-sm text-gray-700">Mulled wine, Bailey's hot chocolate, and hearty stouts by the cosy fire</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🌸</div>
                <h3 className="font-bold mb-2">Spring</h3>
                <p className="text-sm text-gray-700">Fresh G&Ts, crisp rosé, and the return of beer garden season</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <div id="menu">
        <MenuRenderer menuData={menuData} accentColor="anchor-green" />
      </div>

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