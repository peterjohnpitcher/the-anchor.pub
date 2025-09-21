import Link from 'next/link'
import { Button, Container, Section, Card, CardBody } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { parseMenuMarkdown } from '@/lib/menu-parser'
import { MenuRenderer } from '@/components/MenuRenderer'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { drinksMenuSchema, generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { SectionHeader, FeatureGrid, InfoBoxGrid } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { ManagersSpecialHero } from '@/components/ManagersSpecialHero'
import { MenuPageTracker } from '@/components/MenuPageTracker'
import ScrollDepthTracker from '@/components/tracking/ScrollDepthTracker'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { InternalLinkingSection, commonLinkGroups } from '@/components/seo/InternalLinkingSection'
import { generateNutritionInfo } from '@/lib/schema-utils'
import { BookTableButton } from '@/components/BookTableButton'
import { DEFAULT_DRINKS_IMAGE } from '@/lib/image-fallbacks'

export const metadata: Metadata = {
  title: 'Drinks Menu | Real Ales & Premium Spirits | The Anchor - Heathrow Pub & Dining',
  description: '🍺 FULL DRINKS MENU! Draught beers, premium spirits, cocktails, extensive wine list. Pint costs what a pint should cost - much cheaper than airport bars!',
  keywords: 'drinks menu stanwell moor, real ales, cocktails heathrow, wine list, premium spirits, draught beer',
  openGraph: {
    title: '🍺 Drinks Menu | Real Ales & Premium Spirits',
    description: 'Full drinks selection. Pint costs what a pint should cost - half the price of airport bars!',
    images: [DEFAULT_DRINKS_IMAGE],
  },
  twitter: getTwitterMetadata({
    title: '🍺 Drinks Menu | Real Ales & Premium Spirits',
    description: 'Full drinks selection. Pint costs what a pint should cost - half the price of airport bars!',
    images: [DEFAULT_DRINKS_IMAGE]
  })
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
        <p className="text-xl text-gray-700">Menu temporarily unavailable. Please call us on 01753 682707.</p>
      </div>
    )
  }

  const enhancedDrinksMenuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": "https://www.the-anchor.pub/drinks#menu",
    "name": "The Anchor Drinks Menu",
    "description": "Full bar service with real ales, draught lagers, wines, spirits and soft drinks at The Anchor in Stanwell Moor, Surrey",
    "hasMenuSection": menuData.categories.map(category => ({
      "@type": "MenuSection",
      "name": category.title,
      "description": `${category.title} selection at The Anchor`,
      "hasMenuItem": category.sections.flatMap(section => 
        section.items.map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description || item.name,
          "offers": {
            "@type": "Offer",
            "price": item.price.replace(/[£$]/, '').split(' / ')[0],
            "priceCurrency": "GBP",
            "availability": "https://schema.org/InStock"
          },
          ...(category.title.toLowerCase().includes('cocktail') && {
            "nutrition": generateNutritionInfo(item.name, 'cocktails')
          })
        }))
      )
    })),
    "inLanguage": "en-GB",
    "provider": {
      "@type": "BarOrPub",
      "@id": "https://www.the-anchor.pub/#business",
      "name": "The Anchor",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Horton Road",
        "addressLocality": "Stanwell Moor",
        "addressRegion": "Surrey",
        "postalCode": "TW19 6AQ",
        "addressCountry": "GB"
      },
      "priceRange": "££",
      "servesCuisine": ["British"],
      "telephone": "+441753682707",
      "url": "https://www.the-anchor.pub"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.the-anchor.pub/drinks"
    }
  }

  // Manager's Special Offer Schema
  const managersSpecialSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Manager's Special - 25% OFF Redleg Spiced Rum",
    "description": "Save 25% on Redleg Spiced Rum. Caribbean warmth for autumn nights.",
    "url": "https://www.the-anchor.pub/drinks#managers-special",
    "priceCurrency": "GBP",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "3.00",
      "priceCurrency": "GBP",
      "eligibleQuantity": {
        "@type": "QuantitativeValue",
        "unitText": "single measure"
      }
    },
    "itemOffered": {
      "@type": "Product",
      "name": "The Botanist Gin",
      "brand": {
        "@type": "Brand",
        "name": "Bruichladdich Distillery"
      },
      "description": "Premium Islay gin with 22 hand-foraged botanicals"
    },
    "seller": {
      "@id": "https://www.the-anchor.pub/#business"
    },
    "validFrom": new Date().toISOString(),
    "validThrough": new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
  }

  // BarOrPub specific schema
  const barSchema = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "@id": "https://www.the-anchor.pub/#bar",
    "name": "The Anchor Bar",
    "description": "Traditional British pub bar with extensive drinks selection",
    "hasMenu": {
      "@id": "https://www.the-anchor.pub/drinks#menu"
    },
    "servesCuisine": "British",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday"],
        "opens": "16:00",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "16:00",
        "closes": "00:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "13:00",
        "closes": "00:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "12:00",
        "closes": "21:00"
      }
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Real Ales",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Craft Beers",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Premium Spirits",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Wine Selection",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Cocktail Menu",
        "value": true
      }
    ]
  }


  return (
    <>
      <MenuPageTracker 
        menuType="drinks"
        specialOffers={[
          "Manager's Special - 25% OFF Redleg Spiced Rum"
        ]}
      />
      <ScrollDepthTracker />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([enhancedDrinksMenuSchema, barSchema, managersSpecialSchema, breadcrumbSchema]) }}
      />
      {/* Hero Section */}
      <HeroWrapper
        route="/drinks"
        title="Drinks at The Anchor"
        description="From real ales to premium spirits - something for everyone"
        size="medium"
        showStatusBar={true}
        tags={[
          { label: '🍺 Real Ales', variant: 'default' },
          { label: '🥃 Premium Spirits', variant: 'default' },
          { label: '🍷 Wine Selection', variant: 'default' },
          { label: '🍹 Cocktails', variant: 'primary' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookTableButton
              source="drinks_hero"
              variant="secondary"
              size="lg"
              fullWidth
              className="w-full sm:w-auto bg-white text-anchor-green hover:bg-gray-100"
            />
            <Link href="#menu" className="w-full sm:w-auto">
              <Button 
                variant="secondary"
                size="lg"
                fullWidth
                className="sm:w-auto bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                📖 Jump to Menu
              </Button>
            </Link>
            <Link href="#cocktails" className="w-full sm:w-auto">
              <Button 
                variant="secondary"
                size="lg"
                fullWidth
                className="sm:w-auto"
              >
                🍹 View Our Cocktails
              </Button>
            </Link>
          </div>
        }
      />

      {/* Manager's Special */}
      <ManagersSpecialHero />

      {/* Page Title */}
      <Section className="py-8 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <PageTitle
              seo={{
                structured: true,
                speakable: true
              }}
              className="text-anchor-green mb-4"
            >
              Drinks Menu - Beers, Wines & Spirits
            </PageTitle>
            <p className="text-lg text-gray-700">
              Explore our extensive selection of real ales, draught lagers, premium spirits, wines, and cocktails
            </p>
          </div>
        </Container>
      </Section>

      {/* Quick Links */}
      <Section background="gray" spacing="md">
        <Container>
          <div className="flex flex-wrap justify-center gap-4">
            {menuData.categories.map((category) => (
              <Link 
                key={category.id}
                href={`#${category.id}`} 
                className="rounded-lg bg-white px-6 py-3 shadow transition-shadow hover:shadow-md"
              >
                {category.title} {category.emoji}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Your Local After Landing */}
      <Section background="white" spacing="md">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Your Local After Landing - Just 5 Minutes from Heathrow"
            />
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "✈️",
                  title: "Airport Staff Haven",
                  description: "Perfect spot for crews and airport workers to unwind after long shifts. Join your colleagues for a well-deserved pint.",
                  className: "text-center"
                },
                {
                  icon: "🚖",
                  title: "Meeting Point",
                  description: "Picking someone up? Skip expensive airport parking. Meet here for a relaxed drink while they clear customs.",
                  className: "text-center"
                },
                {
                  icon: "🌍",
                  title: "Traveller's Rest",
                  description: "Just landed or about to fly? We're your local. Quick taxi from all terminals, open late, proper British welcome.",
                  className: "text-center"
                }
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* Why The Anchor for Drinks */}
      <Section background="gray" spacing="md">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Stanwell Moor's Premier Drinks Destination"
            />
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "🍺 The Beer Garden Experience",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">Stanwell Moor's largest beer garden. Watch planes overhead while enjoying perfectly poured pints in the sunshine. Heated areas and covered sections mean the garden's open year-round.</p>
                      <p className="text-sm text-gray-700">Dog-friendly outdoor areas - bring your four-legged friends!</p>
                    </>
                  ),
                  variant: "default",
                  className: "bg-white rounded-lg p-8 shadow-md"
                },
                {
                  title: "📺 Sports & Atmosphere",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">Multiple screens showing major sporting events on BBC and ITV. Catch the Six Nations, World Cup, Euros, and other big tournaments with great views from every seat.</p>
                      <p className="text-sm text-gray-700">Big matches get busy - arrive early for the best seats!</p>
                    </>
                  ),
                  variant: "default",
                  className: "bg-white rounded-lg p-8 shadow-md"
                },
                {
                  title: "🎯 Local Institution",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">Serving Stanwell Moor and Staines for generations. Where locals meet, airport workers unwind, and visitors become regulars. Your neighbourhood bar with a global touch.</p>
                      <p className="text-sm text-gray-700">Ask about our locals' card for exclusive offers!</p>
                    </>
                  ),
                  variant: "default",
                  className: "bg-white rounded-lg p-8 shadow-md"
                },
                {
                  title: "🌟 Quality & Choice",
                  content: (
                    <>
                      <p className="text-gray-700 mb-4">From real ales to handcrafted cocktails, we take drinks seriously. Expert bar staff, proper glassware, and drinks served exactly how they should be. No shortcuts.</p>
                      <p className="text-sm text-gray-700">Can't see your favourite? Just ask - we might have it!</p>
                    </>
                  ),
                  variant: "default",
                  className: "bg-white rounded-lg p-8 shadow-md"
                }
              ]}
            />
            
          </div>
        </Container>
      </Section>

      {/* Seasonal Highlights */}
      <Section background="white" className="bg-anchor-gold/10" spacing="md">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Drinks for Every Season"
            />
            <FeatureGrid
              columns={4}
              features={[
                {
                  icon: "☀️",
                  title: "Summer",
                  description: "Pimm's jugs, ice-cold lagers, and frozen cocktails in the sun-drenched beer garden",
                  variant: "default",
                  className: "bg-white rounded-lg p-6 shadow-md text-center"
                },
                {
                  icon: "🍂",
                  title: "Autumn",
                  description: "Warming ales, harvest ciders, and our famous hot toddy as the evenings draw in",
                  variant: "default",
                  className: "bg-white rounded-lg p-6 shadow-md text-center"
                },
                {
                  icon: "❄️",
                  title: "Winter",
                  description: "Mulled wine, Bailey's hot chocolate, and hearty stouts by the cosy fire",
                  variant: "default",
                  className: "bg-white rounded-lg p-6 shadow-md text-center"
                },
                {
                  icon: "🌸",
                  title: "Spring",
                  description: "Fresh G&Ts, crisp rosé, and the return of beer garden season",
                  variant: "default",
                  className: "bg-white rounded-lg p-6 shadow-md text-center"
                }
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* Menu Content */}
      <div id="menu">
        <MenuRenderer menuData={menuData} accentColor="anchor-green" />
      </div>

      {/* Internal Links for SEO */}
      <Section background="white" spacing="md">
        <Container>
          <InternalLinkingSection 
            links={commonLinkGroups.dining}
            className="mx-auto max-w-5xl"
          />
        </Container>
      </Section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "What beers are on tap at The Anchor?",
            answer: "We have a fantastic selection of draught beers including Aspall, Carlsberg, Birra Moretti, Carling, Fosters, Guinness, Inches, Pravha, and Stella Artois. Our draught selection offers something for every taste, from crisp lagers to rich stouts."
          },
          {
            question: "Do you serve cocktails at The Anchor?",
            answer: "Yes! We have a full cocktail menu featuring classics like Mojitos, Margaritas, Espresso Martinis, and many more. Our skilled bartenders can also make your favourite cocktail on request."
          },
          {
            question: "Where can I find well-kept draught beer near Heathrow?",
            answer: "The Anchor is just 7 minutes from Heathrow and offers an excellent selection of real ales and premium lagers. We're much better value than airport bars and have a proper pub atmosphere with our beer garden."
          },
          {
            question: "Do you have non-alcoholic drink options?",
            answer: "Absolutely! We offer a full range of soft drinks, mocktails, premium coffee, tea, and non-alcoholic beers. We ensure everyone can enjoy their visit regardless of whether they're drinking alcohol."
          },
          {
            question: "Can I book the bar area for a private drinks party?",
            answer: "Yes, our bar area can be reserved exclusively for cocktail receptions and casual events. We offer comprehensive drinks packages including welcome drinks, wine packages, and bar tabs. Our experienced team will help create the perfect drinks solution for your celebration. Contact us on 01753 682707 to discuss your requirements."
          },
          {
            question: "What wines do you serve at The Anchor?",
            answer: "We offer a carefully selected wine list including our iHeart house wines available in 187ml bottles (perfect single-serve size) or 700ml bottles. We also have premium wine options by the bottle. Our selection includes red, white, rosé, and sparkling wines to suit all tastes and budgets."
          },
          {
            question: "What payment methods are accepted at the bar?",
            answer: "We accept cash and all major credit and debit cards, including American Express. Whether you're settling a tab, buying rounds, or paying for events, we make it easy with multiple payment options."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-anchor-green to-anchor-green/90 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Join Us for a Drink
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Whether it's a quick pint, tequila tasting, or celebration - we've got you covered
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookTableButton
                source="drinks_page_cta"
                size="lg"
                variant="secondary"
                fullWidth
                className="w-full sm:w-auto bg-white text-anchor-green hover:bg-gray-100"
              />
              <Link href="tel:+441753682707" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" fullWidth className="sm:w-auto bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                  📞 Call Us
                </Button>
              </Link>
              <Link href="/food-menu" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" fullWidth className="sm:w-auto bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                  🍔 View Food Menu
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
