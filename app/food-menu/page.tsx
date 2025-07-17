import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { MenuRenderer } from '@/components/MenuRenderer'
import { DailySpecials } from '@/components/DailySpecials'
import { HeroWrapper } from '@/components/hero'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { parseMenuMarkdown } from '@/lib/menu-parser'
import { getBusinessHours } from '@/lib/api'
import { Metadata } from 'next'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Food Menu Near Me | The Anchor Stanwell Moor | Traditional British Pub Food',
  description: 'Enjoy traditional British pub food at The Anchor. Famous Sunday roasts, stone-baked pizzas, burgers, and family-friendly meals. Kitchen open Tuesday-Sunday.',
  keywords: 'pub food stanwell moor, sunday roast near heathrow, british pub menu, family restaurant stanwell',
  openGraph: {
    title: 'Food Menu - The Anchor Pub',
    description: 'Traditional British pub food, famous Sunday roasts, and family-friendly dining near Heathrow.',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg'],
  },
}

export default async function FoodMenuPage() {
  const [menuData, businessHours] = await Promise.all([
    parseMenuMarkdown('food'),
    getBusinessHours()
  ])
  
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
    "description": "Half price fish and chips for senior citizens every Friday at The Anchor pub.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([menuSchema, pizzaBOGOFSchema, fridayFishOfferSchema]) }}
      />
      {/* Hero Section */}
      <HeroWrapper
        route="/food-menu"
        title="Good Food, Good Company"
        description="Great memories start with great food"
        size="small"
        showStatusBar={true}
        tags={[
          { label: '🍖 Sunday Roasts', variant: 'default' },
          { label: '🍕 Stone-Baked Pizzas', variant: 'default' },
          { label: '🍔 Burgers & Stacks', variant: 'default' },
          { label: '🌱 Veggie Options', variant: 'default' }
        ]}
        cta={
          <CallToAction 
            href="#menu"
            variant="primary"
            size="lg"
            className="bg-white text-anchor-green hover:bg-gray-100"
          >
            📖 Jump to Menu
          </CallToAction>
        }
      />

      {/* Daily Specials - Shows only on relevant days */}
      <DailySpecials isOpen={isOpen} />

      {/* Perfect Pre-Flight Meal Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
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
                        <li>• Proper portions at pub prices</li>
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
        </div>
      </section>

      {/* Staines & Local Authority Content */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Staines' Favourite Traditional Pub Food"
              subtitle="Serving Stanwell Moor, Staines, and surrounding areas with proper British pub grub since opening our doors. Where Heathrow workers grab lunch, families gather for Sunday roasts, and locals know they'll always get a warm welcome."
            />
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
                  description: "The talk of Stanwell Moor - book early to avoid disappointment",
                  variant: "default",
                  className: "bg-white rounded-lg p-6 shadow-md text-center"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Food & Drink Pairings */}
      <section className="section-spacing bg-anchor-gold/10">
        <div className="container mx-auto px-4">
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
                      <li><strong>Fully Loaded:</strong> Italian Peroni is the classic choice</li>
                      <li><strong>Nice & Spicy:</strong> Smirnoff & lemonade cuts through the heat</li>
                      <li><strong>Garden Club:</strong> Light Pinot Grigio complements perfectly</li>
                    </ul>
                  )
                },
                {
                  title: "🐟 With Fish & Chips",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Classic pairing:</strong> Greene King IPA or Abbot Ale</li>
                      <li><strong>Lighter option:</strong> Sauvignon Blanc cuts through the batter</li>
                      <li><strong>Traditional choice:</strong> A proper cup of tea!</li>
                    </ul>
                  )
                },
                {
                  title: "🥘 With Sunday Roast",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Beef:</strong> Full-bodied Shiraz or a pint of bitter</li>
                      <li><strong>Chicken:</strong> Chardonnay or a smooth Carlsberg</li>
                      <li><strong>Lamb:</strong> Malbec brings out the flavours beautifully</li>
                    </ul>
                  )
                }
              ]}
            />
            <p className="text-center text-gray-600 mt-8">
              Ask our staff for recommendations - they know their stuff!
            </p>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <div id="menu">
        <MenuRenderer menuData={menuData} />
      </div>

      {/* Additional Information */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AlertBox
              variant="warning"
              title="Allergen Information"
              className="mb-8"
              content={
                <p className="text-gray-700">
                  All our dishes are prepared in a single kitchen where allergens are present. While we take every 
                  precaution, we cannot guarantee dishes are free from cross-contamination. If you have allergies or 
                  dietary requirements, please speak to a member of our team before ordering. We use vegetable oil 
                  where necessary to keep dishes light yet warming during colder months.
                </p>
              }
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "What time is the kitchen open at The Anchor?",
            answer: "Our kitchen is open Tuesday to Friday from 6pm-9pm, Saturday from 1pm-7pm, and Sunday from 12pm-5pm for our famous Sunday roasts. The kitchen is closed Mondays. During busy periods we recommend booking ahead."
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
            answer: "The Anchor is just 7 minutes from Terminal 5 and serves traditional British pub food at local prices - much better value than airport restaurants! We're perfect for pre-flight meals with free parking and quick service."
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
              "name": "The Anchor Food Menu",
              "description": "Traditional British pub food menu",
              "hasMenuSection": menuData.categories.map(category => ({
                "@type": "MenuSection",
                "name": category.title,
                "hasMenuItem": category.sections.flatMap(section => 
                  section.items.map(item => ({
                    "@type": "MenuItem",
                    "name": item.name,
                    "description": item.description,
                    "offers": {
                      "@type": "Offer",
                      "price": item.price.replace(/[£$]/, '').split(' / ')[0],
                      "priceCurrency": "GBP"
                    },
                    ...(item.vegetarian && {
                      "suitableForDiet": ["https://schema.org/VegetarianDiet"]
                    })
                  }))
                )
              })),
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
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What time is the kitchen open at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our kitchen is open Tuesday to Friday from 6pm-9pm, Saturday from 1pm-7pm, and Sunday from 12pm-5pm for our famous Sunday roasts. The kitchen is closed Mondays. During busy periods we recommend booking ahead."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you serve Sunday roast at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our celebrated Sunday roasts are served every Sunday from 12pm-5pm. We offer beef, chicken, lamb, and vegetarian options. All Sunday roasts must be ordered and paid for by 1pm on Saturday. Booking is essential as we're very popular - many say we serve the best Sunday roast in Surrey!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there a children's menu at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we have a dedicated children's menu with smaller portions and kid-friendly options. Children are always welcome at The Anchor with no time restrictions. We also provide high chairs and colouring activities to keep the little ones entertained."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's the Tuesday pizza deal at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Every Tuesday we offer Buy One Get One Free (BOGOF) on all our stone-baked pizzas! This applies to eat-in and takeaway. It's our most popular offer - perfect for families and pizza lovers."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you cater for dietary requirements?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we have vegetarian options marked on our menu and can accommodate most dietary requirements. Please inform our staff about any allergies or dietary needs when ordering. Note that all dishes are prepared in the same kitchen where allergens are present."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I book a table for food at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! We recommend booking ahead, especially for Sunday roasts and weekend evenings. Call us on 01753 682707 to reserve your table. We can accommodate large groups with advance notice."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer takeaway food?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our entire food menu is available for takeaway. Call ahead on 01753 682707 to place your order and we'll have it ready for collection. Tuesday pizza BOGOF deal applies to takeaway too!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's the best pub food near Heathrow Airport?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Anchor is just 7 minutes from Terminal 5 and serves traditional British pub food at local prices - much better value than airport restaurants! We're perfect for pre-flight meals with free parking and quick service."
                  }
                }
              ]
            }
          ])
        }}
      />
    </>
  )
}