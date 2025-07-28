import Image from 'next/image'
import Link from 'next/link'
import { Button, Container, Section, Card, CardBody, Alert } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { FilteredMenuRenderer } from '@/components/FilteredMenuRenderer'
import { DailySpecials } from '@/components/DailySpecials'
import { HeroWrapper, Breadcrumbs } from '@/components/hero'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { parseMenuMarkdown } from '@/lib/menu-parser'
import { getBusinessHours } from '@/lib/api'
import { Metadata } from 'next'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { MenuPageTracker } from '@/components/MenuPageTracker'
import ScrollDepthTracker from '@/components/tracking/ScrollDepthTracker'
import { SpeakableSchema } from '@/components/seo/SpeakableSchema'
import { SpeakableContent } from '@/components/voice/SpeakableContent'
import { KitchenHoursDisplay } from '@/components/KitchenHoursDisplay'
import { formatTime12Hour } from '@/lib/time-utils'
import { isKitchenOpen, BusinessHours } from '@/lib/api'
import { generateSuitableForDiet, generateNutritionInfo, generateMenuItemOffer } from '@/lib/schema-utils'
import { specialAnnouncementSchema } from '@/lib/schema'

// Helper function to build kitchen schedule string from business hours
function buildKitchenSchedule(hours: BusinessHours): string {
  const schedule: string[] = []
  
  // Check Tuesday to Friday
  const weekdays = ['tuesday', 'wednesday', 'thursday', 'friday']
  const weekdayHours = weekdays.map(day => {
    const dayHours = hours.regularHours[day]
    if (!dayHours || !dayHours.kitchen || !isKitchenOpen(dayHours.kitchen)) return null
    return {
      day,
      opens: formatTime12Hour(dayHours.kitchen.opens),
      closes: formatTime12Hour(dayHours.kitchen.closes)
    }
  }).filter(Boolean)
  
  // Check if all weekdays have same hours
  if (weekdayHours.length === 4 && weekdayHours.every(h => 
    h?.opens === weekdayHours[0]?.opens && h?.closes === weekdayHours[0]?.closes
  )) {
    schedule.push(`Tuesday to Friday from ${weekdayHours[0]?.opens}-${weekdayHours[0]?.closes}`)
  } else {
    // Add individually
    weekdayHours.forEach(h => {
      if (h) {
        schedule.push(`${h.day.charAt(0).toUpperCase() + h.day.slice(1)} from ${h.opens}-${h.closes}`)
      }
    })
  }
  
  // Saturday
  const saturdayHours = hours.regularHours.saturday
  if (saturdayHours?.kitchen && isKitchenOpen(saturdayHours.kitchen)) {
    const opens = formatTime12Hour(saturdayHours.kitchen.opens)
    const closes = formatTime12Hour(saturdayHours.kitchen.closes)
    schedule.push(`Saturday from ${opens}-${closes}`)
  }
  
  // Sunday
  const sundayHours = hours.regularHours.sunday
  if (sundayHours?.kitchen && isKitchenOpen(sundayHours.kitchen)) {
    const opens = formatTime12Hour(sundayHours.kitchen.opens)
    const closes = formatTime12Hour(sundayHours.kitchen.closes)
    schedule.push(`Sunday from ${opens}-${closes}`)
  }
  
  return schedule.join(', ') || "Please check our current hours"
}

export const metadata: Metadata = {
  title: 'Food Menu Near Me | The Anchor Stanwell Moor | Traditional British Food',
  description: 'Enjoy traditional British food at The Anchor. Famous Sunday roasts, stone-baked pizzas, burgers, and family-friendly meals. Kitchen open Tuesday-Sunday.',
  keywords: 'food stanwell moor, sunday roast near heathrow, british menu, family restaurant stanwell',
  openGraph: {
    title: 'Food Menu - The Anchor',
    description: 'Traditional British food, famous Sunday roasts, and family-friendly dining near Heathrow.',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'Food Menu - The Anchor',
    description: 'Traditional British food, famous Sunday roasts, and family-friendly dining near Heathrow.',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg']
  })
}

export default async function FoodMenuPage() {
  const [menuData, businessHours] = await Promise.all([
    parseMenuMarkdown('food'),
    getBusinessHours()
  ])
  
  // Build dynamic kitchen schedule string
  const kitchenSchedule = businessHours ? buildKitchenSchedule(businessHours) : 
    "Tuesday to Friday from 6pm-9pm, Saturday from 1pm-7pm, and Sunday from 12pm-5pm"
  
  if (!menuData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Menu temporarily unavailable. Please call us on 01753 682707.</p>
      </div>
    )
  }

  const isOpen = businessHours?.currentStatus?.isOpen || false

  // Create schemas
  const pizzaBOGOFSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Buy One Get One Free Pizza - Every Tuesday",
    "description": "BOGOF on all stone-baked pizzas every Tuesday at The Anchor. Dine-in and takeaway available.",
    "url": "https://the-anchor.pub/food-menu#pizza",
    "priceCurrency": "GBP",
    "eligibleRegion": {
      "@type": "Place",
      "name": "Stanwell Moor, Staines, Ashford, Feltham, and surrounding Surrey areas"
    },
    "availabilityStarts": "2025-01-01",
    "availabilityEnds": "2025-12-31",
    "validFrom": "16:00",
    "validThrough": "22:00",
    "dayOfWeek": "https://schema.org/Tuesday",
    "itemOffered": {
      "@type": "Product",
      "name": "Stone-Baked Pizzas",
      "category": "Pizza"
    },
    "seller": {
      "@type": "LocalBusiness",
      "name": "The Anchor",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Stanwell Moor",
        "addressRegion": "Surrey"
      }
    }
  }

  const fridayFishOfferSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "50% Off Fish & Chips for Over 65s - Every Friday",
    "description": "Half price fish and chips for senior citizens every Friday at The Anchor.",
    "url": "https://the-anchor.pub/food-menu#mains",
    "priceCurrency": "GBP",
    "eligibleRegion": {
      "@type": "Place",
      "name": "Stanwell Moor and surrounding areas"
    },
    "eligibleCustomerType": "Senior Citizens (65+)",
    "dayOfWeek": "https://schema.org/Friday",
    "seller": {
      "@type": "LocalBusiness",
      "name": "The Anchor"
    }
  }

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Food Menu",
    "hasMenuSection": []
  }

  return (
    <>
      <SpeakableSchema />
      <MenuPageTracker 
        menuType="food" 
        specialOffers={[
          "Buy One Get One Free Pizza - Every Tuesday",
          "50% Off Fish & Chips for Over 65s - Every Friday"
        ]}
      />
      <ScrollDepthTracker />
      {/* Hero Section */}
      <HeroWrapper
        route="/food-menu"
        title="Good Food, Good Company"
        description="Great memories start with great food"
        size="small"
        showStatusBar={true}
        breadcrumbs={[
          { name: 'Food & Drink' }
        ]}
        tags={[
          { label: '🍖 Sunday Roasts', variant: 'default' },
          { label: '🍕 Stone-Baked Pizzas', variant: 'default' },
          { label: '🍔 Burgers & Stacks', variant: 'default' },
          { label: '🌱 Veggie Options', variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#menu">
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-anchor-green hover:bg-gray-100"
              >
                📖 Jump to Menu
              </Button>
            </Link>
            <Link href="/sunday-lunch">
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-anchor-green hover:bg-gray-100"
              >
                🍖 Sunday Roast Menu
              </Button>
            </Link>
          </div>
        }
      />

      {/* Page Title for SEO */}
      <section className="bg-white py-8">
        <Container>
          <PageTitle 
            className="text-center text-anchor-green"
            seo={{ structured: true, speakable: true }}
          >
            Food Menu - The Anchor Restaurant
          </PageTitle>
        </Container>
      </section>

      {/* Daily Specials - Shows only on relevant days */}
      <SpeakableContent selector="special-offers" priority="high">
        <DailySpecials isOpen={isOpen} />
      </SpeakableContent>

      {/* Perfect Pre-Flight Meal Section */}
      <div className="bg-white section-spacing-md">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Perfect Pre-Flight Meal - 5 Minutes from Heathrow"
            />
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "✈️ Quick Access from All Terminals",
                  content: (
                    <>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">T2 & T3:</span>
                          <span>5 minutes by taxi</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">T4:</span>
                          <span>7 minutes via Southern Perimeter Road</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">T5:</span>
                          <span>8 minutes via M25</span>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-4">Free parking available - no airport fees!</p>
                    </>
                  ),
                  variant: "colored",
                  color: "bg-gray-50 rounded-lg p-8"
                },
                {
                  title: "🍽️ Why Eat at the Airport?",
                  content: (
                    <>
                      <ul className="space-y-3 text-gray-700">
                        <li>• Proper portions at local prices</li>
                        <li>• Relaxed atmosphere without the rush</li>
                        <li>• Real food, freshly cooked to order</li>
                        <li>• Free WiFi to check flight status</li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-4">Most meals served within 15 minutes</p>
                    </>
                  ),
                  variant: "colored",
                  color: "bg-gray-50 rounded-lg p-8"
                }
              ]}
              className="mb-8"
            />
          </div>
        </Container>
      </div>

      {/* Staines & Local Authority Content */}
      <div className="bg-gray-50 section-spacing-md">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Staines' Favourite Traditional British Food"
              subtitle="Serving Stanwell Moor, Staines, and surrounding areas with proper British food since opening our doors. Where Heathrow workers grab lunch, families gather for Sunday roasts, and locals know they'll always get a warm welcome."
            />
            <SpeakableContent selector="menu-highlights" priority="high">
              <FeatureGrid
                columns={3}
                features={[
                  {
                    icon: "🐟",
                    title: "Famous Fish & Chips",
                    description: "Beer-battered to order, served with proper mushy peas",
                    variant: "default",
                    className: "bg-white rounded-lg p-6 shadow-md text-center"
                  },
                  {
                    icon: "🥧",
                    title: "Homestyle Pies",
                    description: "Beef & ale, chicken & mushroom - proper comfort food",
                    variant: "default",
                    className: "bg-white rounded-lg p-6 shadow-md text-center"
                  },
                  {
                    icon: "🍖",
                    title: "Sunday Roasts",
                    description: (
                      <>
                        The talk of Stanwell Moor - book early to avoid disappointment
                        <Link href="/sunday-lunch" className="block mt-2">
                          <span className="text-anchor-gold font-semibold hover:text-anchor-green transition-colors">
                            View Sunday Menu →
                          </span>
                        </Link>
                      </>
                    ),
                    variant: "default",
                    className: "bg-white rounded-lg p-6 shadow-md text-center"
                  }
                ]}
              />
            </SpeakableContent>
          </div>
        </Container>
      </div>

      {/* Food & Drink Pairings */}
      <div className="bg-anchor-gold/10 section-spacing-md">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Perfect Pairings - Food & Drinks Together"
            />
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "🍔 With Our Burgers",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Beef Burger:</strong> Pairs perfectly with a pint of Stella or Carlsberg</li>
                      <li><strong>Spicy Chicken:</strong> Cool it down with a crisp Birra Moretti</li>
                      <li><strong>Veggie Stack:</strong> Try with our refreshing Aspall cider</li>
                    </ul>
                  )
                },
                {
                  title: "🍕 With Our Pizzas",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Fully Loaded:</strong> Italian Birra Moretti is the classic choice</li>
                      <li><strong>Nice & Spicy:</strong> Smirnoff & lemonade cuts through the heat</li>
                      <li><strong>Garden Club:</strong> Light Pinot Grigio complements perfectly</li>
                    </ul>
                  )
                },
                {
                  title: "🐟 With Fish & Chips",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Classic pairing:</strong> A pint of bitter or Guinness</li>
                      <li><strong>Lighter option:</strong> Sauvignon Blanc cuts through the batter</li>
                      <li><strong>Traditional choice:</strong> A proper cup of tea!</li>
                    </ul>
                  )
                },
                {
                  title: "🥘 With Sunday Roast",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Chicken:</strong> Chardonnay or a smooth Carlsberg</li>
                      <li><strong>Lamb:</strong> Malbec brings out the flavours beautifully</li>
                      <li><strong>Pork:</strong> Full-bodied Shiraz or a pint of bitter</li>
                    </ul>
                  )
                }
              ]}
            />
            <p className="text-center text-gray-600 mt-8">
              Ask our staff for recommendations - they know their stuff!
            </p>
          </div>
        </Container>
      </div>

      {/* Menu Content */}
      <div id="menu">
        <FilteredMenuRenderer menuData={menuData} />
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 section-spacing-md">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Alert
              variant="warning"
              title="Allergen Information"
              className="mb-8"
            >
              <p className="text-gray-700">
                All our dishes are prepared in a single kitchen where allergens are present. While we take every 
                precaution, we cannot guarantee dishes are free from cross-contamination. If you have allergies or 
                dietary requirements, please speak to a member of our team before ordering. We use vegetable oil 
                where necessary to keep dishes light yet warming during colder months.
              </p>
            </Alert>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "What time is the kitchen open at The Anchor?",
            answer: `Our kitchen is open ${kitchenSchedule} for our famous Sunday roasts. The kitchen is closed Mondays. During busy periods we recommend booking ahead.`
          },
          {
            question: "Do you serve Sunday roast at The Anchor?",
            answer: "Yes! Our celebrated Sunday roasts are served every Sunday from 12pm-5pm. We offer beef, chicken, lamb, and vegetarian options. All Sunday roasts must be ordered and paid for by 1pm on Saturday. Booking is essential as we're very popular - many say we serve the best Sunday roast in Surrey!"
          },
          {
            question: "Is there a children's menu at The Anchor?",
            answer: "Yes, we have a dedicated children's menu with smaller portions and kid-friendly options. Children are always welcome at The Anchor with no time restrictions. We also provide high chairs and colouring activities to keep the little ones entertained."
          },
          {
            question: "What's the Tuesday pizza deal at The Anchor?",
            answer: "Every Tuesday we offer Buy One Get One Free (BOGOF) on all our stone-baked pizzas! This applies to eat-in and takeaway. It's our most popular offer - perfect for families and pizza lovers."
          },
          {
            question: "Do you cater for dietary requirements?",
            answer: "Yes, we have vegetarian options marked on our menu and can accommodate most dietary requirements. Please inform our staff about any allergies or dietary needs when ordering. Note that all dishes are prepared in the same kitchen where allergens are present."
          },
          {
            question: "Can I book a table for food at The Anchor?",
            answer: "Absolutely! We recommend booking ahead, especially for Sunday roasts and weekend evenings. Call us on 01753 682707 to reserve your table. We can accommodate large groups with advance notice."
          },
          {
            question: "Do you offer takeaway food?",
            answer: "Yes, our entire food menu is available for takeaway. Call ahead on 01753 682707 to place your order and we'll have it ready for collection. Tuesday pizza BOGOF deal applies to takeaway too!"
          },
          {
            question: "What's the best pub food near Heathrow Airport?",
            answer: "The Anchor is just 7 minutes from Terminal 5 and serves traditional British food at local prices - much better value than airport restaurants! We're perfect for pre-flight meals with free parking and quick service."
          },
          {
            question: "What payment methods are accepted at The Anchor?",
            answer: "We accept cash and all major credit and debit cards, including American Express. Whether you're dining in, getting takeaway, or just having drinks, we make payment easy and convenient."
          }
        ]}
        className="bg-white"
      />

      {/* CTA Section */}
      <CTASection
        title="Hungry? Book Your Table Now"
        description="Our kitchen gets busy, especially on weekends. Book ahead to avoid disappointment!"
        buttons={[
          {
            text: "📞 Call: 01753 682707",
            href: "tel:01753682707",
            variant: "white"
          },
          {
            text: "🍺 View Drinks Menu",
            href: "/drinks",
            variant: "white"
          }
        ]}
        variant="green"
      />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Menu",
              "@id": "https://the-anchor.pub/food-menu#menu",
              "name": "The Anchor Food Menu",
              "description": "Traditional British food menu with allergen information",
              "hasMenuSection": menuData.categories.map(category => ({
                "@type": "MenuSection",
                "name": category.title,
                "description": `${category.title} options at The Anchor`,
                "image": category.emoji ? `https://the-anchor.pub/images/menu-categories/${category.title.toLowerCase().replace(' ', '-')}.jpg` : undefined,
                "hasMenuItem": category.sections.flatMap(section => 
                  section.items.map(item => ({
                    "@type": "MenuItem",
                    "name": item.name,
                    "description": item.description || item.name,
                    "offers": item.price && !item.price.includes('sauces') ? {
                      "@type": "Offer",
                      "price": item.price.replace(/[£$]/, '').split(' / ')[0],
                      "priceCurrency": "GBP",
                      "availability": "https://schema.org/InStock",
                      ...(generateMenuItemOffer(item, new Date().toLocaleDateString('en-US', { weekday: 'long' }))?.[0] || {})
                    } : undefined,
                    "nutrition": item.price && !item.price.includes('sauces') ? generateNutritionInfo(item.name, category.title) : undefined,
                    "suitableForDiet": generateSuitableForDiet(item),
                    ...(item.allergens && item.allergens.length > 0 && {
                      "additionalProperty": [
                        {
                          "@type": "PropertyValue",
                          "name": "allergens",
                          "value": item.allergens.join(", ")
                        }
                      ]
                    })
                  }))
                )
              })),
              "inLanguage": "en-GB",
              "provider": {
                "@type": "Restaurant",
                "@id": "https://the-anchor.pub/#business",
                "name": "The Anchor",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Horton Road",
                  "addressLocality": "Stanwell Moor",
                  "addressRegion": "Surrey",
                  "postalCode": "TW19 6AQ",
                  "addressCountry": "GB"
                },
                "servesCuisine": ["British", "Pizza", "Pub Food"],
                "priceRange": "££",
                "acceptsReservations": "true",
                "telephone": "+441753682707",
                "url": "https://the-anchor.pub"
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://the-anchor.pub/food-menu"
              }
            },
            specialAnnouncementSchema,
            {
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              "@id": "https://the-anchor.pub/#food-establishment",
              "name": "The Anchor Restaurant",
              "description": "Traditional British pub restaurant near Heathrow Airport",
              "servesCuisine": ["British", "Pizza", "Pub Food"],
              "hasMenu": {
                "@id": "https://the-anchor.pub/food-menu#menu"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Horton Road",
                "addressLocality": "Stanwell Moor",
                "addressRegion": "Surrey",
                "postalCode": "TW19 6AQ",
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 51.462509,
                "longitude": -0.502067
              },
              "openingHoursSpecification": businessHours ? [
                {
                  "@type": "OpeningHoursSpecification",
                  "name": "Kitchen Hours",
                  "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "18:00",
                  "closes": "21:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "name": "Kitchen Hours",
                  "dayOfWeek": "Saturday",
                  "opens": "13:00",
                  "closes": "19:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "name": "Kitchen Hours",
                  "dayOfWeek": "Sunday",
                  "opens": "12:00",
                  "closes": "17:00"
                }
              ] : [],
              "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "American Express"],
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Allergen Information Available",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Vegetarian Options",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Children's Menu",
                  "value": true
                }
              ]
            },
            pizzaBOGOFSchema,
            fridayFishOfferSchema
          ])
        }}
      />
    </>
  )
}