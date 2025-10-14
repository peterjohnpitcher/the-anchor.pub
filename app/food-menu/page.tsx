import Image from 'next/image'
import Link from 'next/link'
import { Button, Container, Section, Card, CardBody, Alert } from '@/components/ui'
import { BookTableButton } from '@/components/BookTableButton'
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
import { DEFAULT_PIZZA_IMAGE } from '@/lib/image-fallbacks'
import { FoodStickyCtaBar } from '@/components/food/FoodStickyCtaBar'

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
  title: 'Heathrow Pub Food Menu & Sunday Roasts | The Anchor',
  description: "See The Anchor's full menu 7 minutes from Heathrow: Sunday roasts, 2-for-1 Pizza Tuesday, pub classics and veggie options. Book your table with free parking.",
  keywords: 'heathrow food menu, sunday roast near heathrow airport, pub food near me heathrow, pizza tuesday deal heathrow, book table the anchor',
  openGraph: {
    title: 'Heathrow Pub Food Menu & Sunday Roasts',
    description: "Browse The Anchor's menu near Heathrow: Sunday roasts, stone-baked pizzas and pub favourites with free parking. Reserve your table today.",
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'Heathrow Pub Food Menu & Sunday Roasts',
    description: "Explore The Anchor's menu minutes from Heathrow: Sunday roasts, Pizza Tuesday deal and pub classics. Book a table with free parking.",
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg']
  }),
  alternates: {
    canonical: '/food-menu'
  }
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
    "url": "https://www.the-anchor.pub/food-menu#pizza",
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
      "category": "Pizza",
      "description": "Stone-baked pizzas with hand-stretched dough, rich tomato sauce and generous toppings available at The Anchor near Heathrow.",
      "image": `https://www.the-anchor.pub${DEFAULT_PIZZA_IMAGE}`,
      "offers": {
        "@type": "Offer",
        "name": "Tuesday Pizza BOGOF",
        "description": "Buy one get one free on all pizzas every Tuesday",
        "price": "9.99",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "url": "https://www.the-anchor.pub/food-menu#pizza"
      }
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
    "url": "https://www.the-anchor.pub/food-menu#mains",
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

  const menuSectionList = [
    {
      position: 1,
      name: "Sunday Roasts",
      url: "https://www.the-anchor.pub/food-menu#roasts"
    },
    {
      position: 2,
      name: "Pizza Tuesday",
      url: "https://www.the-anchor.pub/food-menu#pizza"
    },
    {
      position: 3,
      name: "Pub Classics",
      url: "https://www.the-anchor.pub/food-menu#classics"
    },
    {
      position: 4,
      name: "Dietary Options",
      url: "https://www.the-anchor.pub/food-menu#dietary"
    },
    {
      position: 5,
      name: "Visiting Heathrow",
      url: "https://www.the-anchor.pub/food-menu#travel"
    }
  ]

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
        title="Book Pub Food Minutes from Heathrow"
        description="Sunday roasts, 2-for-1 Pizza Tuesday and pub classics with free parking and rapid service."
        size="small"
        showStatusBar={true}
        breadcrumbs={[
          { name: 'Food & Drink' }
        ]}
        tags={[
          { label: '🍖 Sunday Roast Pre-Orders', variant: 'default' },
          { label: '🍕 2-for-1 Pizza Tuesday', variant: 'default' },
          { label: '🍔 Pub Classics & Burgers', variant: 'default' },
          { label: '🌱 Veggie & Gluten-Friendly', variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookTableButton
              source="food_menu_hero"
              context="food"
              variant="primary"
              size="lg"
              fullWidth
              className="sm:w-auto"
            >
              Reserve a Table
            </BookTableButton>
            <Link href="#menu" className="w-full sm:w-auto">
              <Button 
                variant="secondary"
                size="lg"
                fullWidth
                className="sm:w-auto bg-white text-anchor-green hover:bg-gray-100"
              >
                📖 View Full Menu
              </Button>
            </Link>
          </div>
        }
      />

      {/* Quick Jump Links */}
      <Section background="white" spacing="sm">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '#roasts', label: '🍖 Sunday Roast' },
              { href: '#pizza', label: '🍕 Pizza Tuesday' },
              { href: '#classics', label: '🍔 Pub Classics' },
              { href: '#dietary', label: '🌱 Vegetarian & Gluten-Friendly' },
              { href: '#travel', label: '✈️ Heathrow Travellers' }
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full border border-anchor-green/20 bg-white px-4 py-2 text-sm font-semibold text-anchor-green shadow-sm transition hover:border-anchor-gold hover:text-anchor-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Menu Highlights */}
      <Section background="white" spacing="md" id="highlights">
        <Container>
          <SectionHeader
            title="What Guests Book Us For"
            subtitle="Choose the section that matches your plans and pre-book to guarantee your table."
          />
          <FeatureGrid
            columns={4}
            features={[
              {
                icon: "🍖",
                title: "Signature Sunday Roast",
                description: (
                  <>
                    Book by 1pm Saturday to guarantee proper roasts with Yorkshire puddings and crispy potatoes.
                    <div className="mt-3">
                      <Link href="/sunday-lunch" className="text-anchor-gold font-semibold hover:text-anchor-green transition">
                        Explore roast menu →
                      </Link>
                    </div>
                  </>
                ),
                className: "text-left",
                variant: "colored",
                color: "bg-anchor-cream/60"
              },
              {
                icon: "🍕",
                title: "Pizza Tuesday BOGOF",
                description: (
                  <>
                    All stone-baked pizzas are buy-one-get-one-free every Tuesday. Dine in or takeaway with free parking.
                    <div className="mt-3">
                      <Link href="/pizza-tuesday" className="text-anchor-gold font-semibold hover:text-anchor-green transition">
                        See the deal →
                      </Link>
                    </div>
                  </>
                ),
                className: "text-left",
                variant: "colored",
                color: "bg-white"
              },
              {
                icon: "🍔",
                title: "Pub Classics & Burgers",
                description: (
                  <>
                    From double-stacked burgers to fish & chips, quick service keeps Heathrow schedules on track.
                    <div className="mt-3">
                      <a href="#classics" className="text-anchor-gold font-semibold hover:text-anchor-green transition">
                        Jump to pub favourites →
                      </a>
                    </div>
                  </>
                ),
                className: "text-left",
                variant: "colored",
                color: "bg-white"
              },
              {
                icon: "🌱",
                title: "Vegetarian & Gluten-Friendly",
                description: (
                  <>
                    Dedicated veggie mains, salads and gluten-aware options. Speak to us about allergens anytime.
                    <div className="mt-3">
                      <a href="#dietary" className="text-anchor-gold font-semibold hover:text-anchor-green transition">
                        View dietary picks →
                      </a>
                    </div>
                  </>
                ),
                className: "text-left",
                variant: "colored",
                color: "bg-white"
              }
            ]}
          />
        </Container>
      </Section>

      {/* Social Proof */}
      <Section background="white" spacing="sm">
        <Container>
          <Card className="max-w-4xl mx-auto bg-anchor-cream/60">
            <CardBody>
              <p className="text-sm uppercase tracking-[0.3em] text-anchor-gold mb-3 text-center">
                Guest feedback
              </p>
              <blockquote className="text-center text-xl font-semibold text-anchor-green">
                “The food was fantastic and great value. Sunday roast cooked to perfection and the pizza offer was brilliant.
                Staff were welcoming and the free parking made flying from Heathrow so much easier.”
              </blockquote>
              <p className="mt-4 text-center text-sm text-gray-600">— Google Review, September 2025</p>
            </CardBody>
          </Card>
        </Container>
      </Section>
      {/* Sunday Roast Focus */}
      <Section background="white" spacing="md" id="roasts">
        <Container>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <Card className="bg-white shadow-md">
              <CardBody>
                <SectionHeader
                  title="Sunday Roast Near Heathrow"
                  subtitle="Book by 1pm Saturday to lock in your favourite roast and all the trimmings."
                  align="left"
                  className="mb-6"
                />
                <ul className="space-y-3 text-gray-700">
                  <li>• Beef, chicken, lamb and vegetarian roasts with all the trimmings.</li>
                  <li>• £5 deposit secures your spot — perfect for families and group catch-ups.</li>
                  <li>• Kids portions, high chairs and colouring packs available.</li>
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <BookTableButton
                    source="food_menu_roast_cta"
                    context="sunday_roast"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="sm:w-auto"
                  >
                    Book Sunday Roast
                  </BookTableButton>
                  <Link href="/sunday-lunch" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      fullWidth
                      className="sm:w-auto bg-white text-anchor-green hover:bg-gray-100"
                    >
                      View Roast Menu
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-anchor-cream/50 shadow-md">
              <CardBody>
                <h3 className="text-lg font-semibold text-anchor-green mb-3">Roast FAQ</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Times:</strong> Served 12pm–5pm every Sunday.</li>
                  <li><strong>Deposits:</strong> £5pp, fully deducted from your bill.</li>
                  <li><strong>Dietary:</strong> Gluten-aware gravy and veggie options available.</li>
                  <li><strong>Extras:</strong> Add-on cauliflower cheese, extra Yorkies and seasonal puddings.</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Pizza Tuesday Focus */}
      <Section background="white" spacing="md" id="pizza">
        <Container>
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
            <Card className="bg-anchor-cream/40 shadow-md">
              <CardBody>
                <SectionHeader
                  title="2-for-1 Pizza Tuesday"
                  subtitle="Hand-stretched dough, San Marzano sauce and a free pizza with every order every Tuesday."
                  align="left"
                  className="mb-6"
                />
                <ul className="space-y-3 text-gray-700">
                  <li>• Deal runs all evening during kitchen hours (6pm–9pm).</li>
                  <li>• Mix and match toppings, dine-in or takeaway.</li>
                  <li>• Free on-site parking and rapid service for pre-flight dinners.</li>
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <BookTableButton
                    source="food_menu_pizza_cta"
                    context="pizza_tuesday"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="sm:w-auto"
                  >
                    Reserve Pizza Tuesday
                  </BookTableButton>
                  <Link href="/pizza-tuesday" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      fullWidth
                      className="sm:w-auto bg-white text-anchor-green hover:bg-gray-100"
                    >
                      Pizza Deal Details
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-white shadow-md">
              <CardBody>
                <h3 className="text-lg font-semibold text-anchor-green mb-3">Pizza Line-Up</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Margherita:</strong> House favourite with buffalo mozzarella and basil.</li>
                  <li><strong>Fully Loaded:</strong> Pepperoni, ham, mushrooms and peppers.</li>
                  <li><strong>Nice & Spicy:</strong> Jalapeños and nduja for a fiery kick.</li>
                  <li><strong>Garden Club:</strong> Veggie-friendly with grilled courgette and peppers.</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">Gluten-aware bases available — ask the team when you pre-book.</p>
              </CardBody>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Pub Classics & Dietary Options */}
      <Section background="white" spacing="md" id="classics">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white shadow-md">
              <CardBody>
                <SectionHeader
                  title="Pub Classics Done Properly"
                  subtitle="Order at the bar or from your table — mains usually land within 15 minutes."
                  align="left"
                  className="mb-4"
                />
                <ul className="space-y-2 text-gray-700">
                  <li>• Beer-battered fish & chips with minted peas.</li>
                  <li>• Double-stacked burgers with thick-cut chips.</li>
                  <li>• Chicken wings, sharers and bar snacks for groups.</li>
                </ul>
                <div className="mt-5">
                  <BookTableButton
                    source="food_menu_classics_cta"
                    context="food"
                    variant="primary"
                    size="md"
                    fullWidth
                    className="sm:w-auto"
                  >
                    Book a Table for Dinner
                  </BookTableButton>
                </div>
              </CardBody>
            </Card>
            <Card className="bg-anchor-cream/40 shadow-md" id="dietary">
              <CardBody>
                <h3 className="text-lg font-semibold text-anchor-green mb-3">Vegetarian & Gluten-Friendly Picks</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Halloumi burger with roasted pepper relish.</li>
                  <li>• Mediterranean vegetable pizza with vegan cheese option.</li>
                  <li>• Seasonal salads and sides designed for sharing.</li>
                  <li>• Speak to the kitchen about allergens — we’ll adapt wherever possible.</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">Add your requirements when you book and we’ll be ready.</p>
              </CardBody>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Heathrow & Terminal Messaging */}
      <Section background="white" spacing="md" className="bg-anchor-cream/40" id="travel">
        <Container>
          <SectionHeader
            title="Flying from Heathrow? Eat Properly Before You Go"
            subtitle="Seven minutes from Terminal 5 with free parking, fast service, and prices that beat airport restaurants every time."
          />
          <InfoBoxGrid
            columns={3}
            className="max-w-6xl mx-auto"
            boxes={[
              {
                title: "🍽️ Better Than Terminal Dining",
                content: (
                  <p className="text-gray-700">
                    Swap food courts for fresh British favourites. Travellers tell us we&apos;re the best alternative to{" "}
                    <strong>restaurants at Heathrow Terminal 5</strong> thanks to our quick service and proper portions.
                  </p>
                ),
                variant: "colored",
                color: "bg-white rounded-2xl p-6 shadow-sm"
              },
              {
                title: "⏱️ Terminal Timings",
                content: (
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Terminal 5:</strong> 7 minutes door-to-door</li>
                    <li><strong>Terminals 2 &amp; 3:</strong> 11 minutes avoiding airport car park queues</li>
                    <li><strong>Terminal 4:</strong> 12 minutes via Stanwell Moor</li>
                  </ul>
                ),
                variant: "colored",
                color: "bg-white rounded-2xl p-6 shadow-sm"
              },
              {
                title: "💷 Save £20-£40 Every Visit",
                content: (
                  <p className="text-gray-700">
                    Free on-site parking and local pub prices mean more for your travel budget. Download receipts and eat properly before your flight.
                  </p>
                ),
                variant: "colored",
                color: "bg-white rounded-2xl p-6 shadow-sm"
              }
            ]}
          />
          <AlertBox
            variant="success"
            title="Need a Heathrow restaurant alternative?"
            className="mt-10 max-w-3xl mx-auto"
            content={
              <p className="text-gray-700">
                Combine your meal with our{' '}
                <Link href="/restaurants-near-heathrow" className="text-anchor-gold font-semibold hover:text-anchor-green transition-colors">
                  Heathrow dining guide
                </Link>{' '}
                for tips on timing, taxi fares and flight-ready menu picks.
              </p>
            }
          />
        </Container>
      </Section>

      {/* Page Title for SEO */}
      <Section background="white" spacing="sm">
        <Container>
          <PageTitle 
            className="text-center text-anchor-green"
            seo={{ structured: true, speakable: true }}
          >
            Food Menu - The Anchor Restaurant
          </PageTitle>
        </Container>
      </Section>

      {/* Daily Specials - Shows only on relevant days */}
      <SpeakableContent selector="special-offers" priority="high">
        <DailySpecials isOpen={isOpen} />
      </SpeakableContent>

      {/* Perfect Pre-Flight Meal Section */}
      <Section background="white" spacing="md">
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
      </Section>

      {/* Staines & Local Authority Content */}
      <Section background="gray" spacing="md">
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
      </Section>

      {/* Food & Drink Pairings */}
      <Section background="white" spacing="md" className="bg-anchor-gold/10">
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
      </Section>

      {/* Menu Content */}
      <div id="menu">
        <FilteredMenuRenderer menuData={menuData} />
      </div>

      {/* Additional Information */}
      <Section background="gray" spacing="md">
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
      </Section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "What time is the kitchen open at The Anchor?",
            answer: `Our kitchen is open ${kitchenSchedule} for our famous Sunday roasts. The kitchen is closed Mondays. During busy periods we recommend booking ahead.`
          },
          {
            question: "Do you serve Sunday roast at The Anchor?",
            answer: "Yes! Our celebrated Sunday roasts are served every Sunday from 12pm-5pm. We offer beef, chicken, lamb, and vegetarian options. Sunday roasts require a booking with £5 per person deposit by 1pm Saturday. The remaining balance is paid on the day. Booking is essential as we're very popular - many say we serve the best Sunday roast in Surrey!"
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
            href: "tel:+441753682707",
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

      <FoodStickyCtaBar
        ctaContext="food"
        whatsapp={{
          href: 'https://wa.me/441753682707?text=Hi%20Anchor%20Team!%20Can%20I%20book%20a%20table%20for%20food%3F',
          label: 'WhatsApp to Book',
          id: 'whatsapp_food_menu'
        }}
        label="Book Food Table"
      />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Menu",
              "@id": "https://www.the-anchor.pub/food-menu#menu",
              "name": "The Anchor Food Menu",
              "description": "Traditional British food menu with allergen information",
              "hasMenuSection": menuData.categories.map(category => ({
                "@type": "MenuSection",
                "name": category.title,
                "description": `${category.title} options at The Anchor`,
                "image": category.emoji ? `https://www.the-anchor.pub/images/menu-categories/${category.title.toLowerCase().replace(' ', '-')}.jpg` : undefined,
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
                "servesCuisine": ["British", "Pizza", "Pub Food"],
                "priceRange": "££",
                "acceptsReservations": "true",
                "telephone": "+441753682707",
                "url": "https://www.the-anchor.pub"
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.the-anchor.pub/food-menu"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Food Menu Sections",
              "itemListElement": menuSectionList.map(section => ({
                "@type": "ListItem",
                "position": section.position,
                "name": section.name,
                "url": section.url
              }))
            },
            specialAnnouncementSchema,
            {
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              "@id": "https://www.the-anchor.pub/#food-establishment",
              "name": "The Anchor Restaurant",
              "description": "Traditional British pub restaurant near Heathrow Airport",
              "servesCuisine": ["British", "Pizza", "Pub Food"],
              "hasMenu": {
                "@id": "https://www.the-anchor.pub/food-menu#menu"
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
