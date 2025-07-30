import Image from 'next/image'
import Link from 'next/link'
import { Button, Container } from '@/components/ui'
import { HeroWrapper } from '@/components/hero'
import { Metadata } from 'next'
import { SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { ReviewSection } from '@/components/reviews'
import { MenuPageTracker } from '@/components/MenuPageTracker'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { generateNutritionInfo, generateSuitableForDiet } from '@/lib/schema-utils'

export const metadata: Metadata = {
  title: 'Sunday Roast Near Me | The Anchor Stanwell Moor | Traditional Sunday Lunch',
  description: 'Award-winning Sunday roast near Heathrow Airport. Traditional British roast dinners with Yorkshire puddings, crispy roast potatoes & homemade gravy. £14.99-£15.99. Pre-order required.',
  keywords: 'sunday roast near me, sunday lunch near me, roast dinner near me, sunday carvery near me, traditional sunday roast stanwell moor, best sunday lunch near heathrow, sunday roast surrey',
  openGraph: {
    title: 'Famous Sunday Roasts at The Anchor',
    description: 'Traditional British Sunday roast dinners. Pre-order by 1pm Saturday required. Regular menu also available.',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'Famous Sunday Roasts at The Anchor',
    description: 'Traditional British Sunday roast dinners. Pre-order by 1pm Saturday required. Regular menu also available.',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg']
  })
}

export default function SundayLunchPage() {
  return (
    <>
      <MenuPageTracker 
        menuType="sunday_lunch"
        specialOffers={[
          "Pre-order required by 1pm Saturday"
        ]}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/sunday-lunch"
        title="Sunday Roast at The Anchor"
        description="Traditional British roast dinners that locals rave about"
        size="large"
        showStatusBar={false}
        tags={[
          { label: "Every Sunday 12pm - 5pm", variant: "warning" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/book-table?tab=sunday" className="inline-flex items-center whitespace-nowrap">
                <Icon name="calendar" className="mr-2 flex-shrink-0" />
                <span>Book Your Table Now</span>
              </Link>
            </Button>
            
            <Link href="#menu">
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-anchor-green hover:bg-gray-100"
              >
                View Sunday Menu
              </Button>
            </Link>
          </div>
        }
      >
        <div className="mt-6 bg-red-600/90 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-white font-bold text-lg mb-1">
            ⚠️ IMPORTANT: Pre-order & £5 Deposit Required
          </p>
          <p className="text-white text-sm">
            Sunday roasts must be pre-ordered with a £5 per person deposit by 1pm on Saturday
          </p>
          <p className="text-white/90 text-sm sm:text-xs mt-2">
            Regular menu also available on Sundays without pre-order
          </p>
        </div>
      </HeroWrapper>

      {/* Page Title for SEO */}
      <section className="bg-white py-8">
        <Container>
          <PageTitle 
            className="text-center text-anchor-green"
            seo={{ structured: true, speakable: true }}
          >
            Sunday Roast Near Me - Traditional British Sunday Lunch | The Anchor
          </PageTitle>
        </Container>
      </section>

      {/* Why Our Roasts Are Special */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why Our Sunday Roast Near Me is Special"
            subtitle="Locals searching for 'Sunday lunch near me' choose The Anchor - here's why."
          />
          
          <FeatureGrid
            columns={3}
            features={[
              {
                icon: "👨‍🍳",
                title: "Chef's Pride",
                description: "Our head chef takes personal pride in every roast. Meat is sourced locally and cooked to perfection.",
                className: "text-center"
              },
              {
                icon: "🥘",
                title: "Generous Portions",
                description: "No one leaves hungry! Proper portions with all the trimmings. Extra Yorkshire puddings? Just ask!",
                className: "text-center"
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Atmosphere",
                description: "Sundays are for families. Relaxed atmosphere, kids welcome, and plenty of space for everyone.",
                className: "text-center"
              }
            ]}
            className="max-w-5xl mx-auto"
          />
        </div>
      </section>

      {/* Sunday Menu */}
      <section id="menu" className="section-spacing bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Sunday Roast Menu"
            />
            <AlertBox
              variant="warning"
              title="📝 Pre-Order System (New for 2025)"
              className="mb-8 max-w-3xl mx-auto"
              content={
                <>
                  <p className="text-gray-700 mb-4">
                    Our Sunday dinners are made from scratch and to order. <strong>All Sunday roasts must be 
                    pre-ordered with a £5 per person deposit by 1pm on Saturday.</strong> The remaining balance 
                    is paid on the day.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-900 mb-2">🌱 Why We Require Pre-Orders</h4>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Fresh preparation:</strong> We make your gorgeous Sunday lunch from scratch, ready when you sit down</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Reduced waste:</strong> Making meals to order helps us minimize food waste and be more sustainable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Better prices:</strong> Less waste means we can keep our Sunday lunch prices affordable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Guaranteed quality:</strong> Every roast is fresh and delicious, not sitting under heat lamps</span>
                      </li>
                    </ul>
                    <p className="text-xs text-green-700 mt-3 italic">
                      This system helps us continue offering Sunday lunches close to Heathrow without raising prices.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 text-center">
                      <strong>Can't pre-order?</strong> No problem! Our regular menu is also available on 
                      Sundays without pre-order requirement.
                    </p>
                  </div>
                </>
              }
            />
            <p className="text-center text-sm text-gray-600 italic mb-12">
              All dishes served with herb and garlic-crusted roast potatoes, seasonal vegetables, 
              Yorkshire pudding, and red wine gravy. Vegetarian gravy available on request.
            </p>
            
            {/* Main Roasts */}
            <div className="space-y-6 mb-12">
              {/* Roasted Chicken */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Roasted Chicken</h3>
                  <span className="text-2xl font-bold text-anchor-gold">£14.99</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Oven-roasted chicken breast with sage & onion stuffing balls, herb and garlic-crusted roast potatoes, 
                  seasonal vegetables, Yorkshire pudding, and red wine gravy. Vegetarian gravy available on request.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Pair with: El Pico Sauvignon Blanc – crisp and refreshing | Pint of Birra Moretti – smooth and well-rounded.
                </p>
              </div>
              
              {/* Slow-Cooked Lamb Shank */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Slow-Cooked Lamb Shank</h3>
                  <span className="text-2xl font-bold text-anchor-gold">£15.49</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Tender slow-braised lamb shank in rich red wine gravy, served with herb and garlic-crusted roast 
                  potatoes, seasonal vegetables, and a Yorkshire pudding. Vegetarian gravy available on request.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Pair with: Rocoso Malbec – bold and velvety | Pint of Guinness Draught – smooth and malty.
                </p>
              </div>
              
              {/* Crispy Pork Belly */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Crispy Pork Belly</h3>
                  <span className="text-2xl font-bold text-anchor-gold">£15.99</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Crispy crackling and tender slow-roasted pork belly with Bramley apple sauce, herb and garlic-crusted 
                  roast potatoes, seasonal vegetables, Yorkshire pudding, and red wine gravy. Vegetarian gravy available on request.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Pair with: Counterpoint Shiraz – rich and full-bodied | Pint of Inches Cider – crisp and fruity.
                </p>
              </div>
              
              {/* Beetroot & Butternut Squash Wellington */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Beetroot & Butternut Squash Wellington</h3>
                  <span className="text-anchor-gold text-sm font-bold bg-green-100 px-2 py-1 rounded ml-2">(VG)</span>
                  <span className="text-2xl font-bold text-anchor-gold">£15.49</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Golden puff pastry filled with beetroot & butternut squash, served with herb and garlic-crusted roast 
                  potatoes, seasonal vegetables, and vegetarian gravy.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Pair with: Giotto Pinot Grigio – light and fresh | Pint of Pravha – clean and crisp.
                </p>
              </div>
              
              {/* Kids Roasted Chicken */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Kids Roasted Chicken</h3>
                  <span className="text-2xl font-bold text-anchor-gold">£9.99</span>
                </div>
                <p className="text-gray-700 mb-4">
                  A smaller portion of our roasted chicken with herb and garlic-crusted roast potatoes, seasonal 
                  vegetables, Yorkshire pudding, and red wine gravy. Vegetarian gravy available on request.
                </p>
              </div>
              
            </div>
            
            {/* Optional Extras */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-12">
              <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Optional Extras</h3>
              <div className="text-center">
                <div className="inline-block">
                  <div className="flex justify-between items-center gap-8">
                    <p className="font-semibold text-lg text-anchor-green">Cauliflower Cheese</p>
                    <span className="text-lg font-bold text-anchor-gold">£3.99</span>
                  </div>
                  <p className="text-gray-700 mt-2">
                    Creamy mature cheddar sauce, baked until golden and bubbling.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Deposit Information */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8 text-center">
              <h4 className="text-lg font-bold text-blue-900 mb-2">💳 Deposit Information</h4>
              <p className="text-blue-800">
                <strong>£5 per person deposit</strong> required when booking (by 1pm Saturday)
              </p>
              <p className="text-blue-700 text-sm mt-1">
                Balance payable on the day • Prices shown are total per person
              </p>
              <p className="text-blue-600 text-xs mt-2">
                Looking for "Sunday carvery near me"? We prepare each roast fresh to order!
              </p>
            </div>
            
            {/* Booking CTA within menu section */}
            <div className="text-center mb-12">
              <Button variant="primary" size="lg" className="w-full" asChild>
                <Link href="/book-table?tab=sunday">
                  <Icon name="calendar" className="mr-2" />
                  Reserve Your Sunday Roast
                </Link>
              </Button>
              <p className="text-sm text-gray-600 mt-3">
                Deadline: 1pm Saturday • £5 deposit per person
              </p>
            </div>
            
            {/* Allergen Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-700">
                All our dishes are prepared in a single kitchen where allergens are present. While we take every 
                precaution, we cannot guarantee dishes are free from cross-contamination. If you have allergies or 
                dietary requirements, please speak to a member of our team before ordering. We use vegetable oil 
                where necessary to keep dishes light yet warming during colder months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sunday Experience */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="The Sunday Experience"
            />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">What to Expect</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Arrive to the smell of roasting meat and Yorkshire puddings in the oven</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Friendly service from our Sunday team who know their regulars by name</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Generous portions that'll have you loosening your belt</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Kids running around while parents enjoy a proper Sunday pint</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>That satisfied feeling of a proper Sunday done right</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-anchor-sand/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Sunday Timeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">12:00pm</span>
                    <span className="text-gray-700">Kitchen opens - first roasts out</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">1:00pm</span>
                    <span className="text-gray-700">Peak time begins - buzzing atmosphere</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">3:00pm</span>
                    <span className="text-gray-700">Quieter period - perfect for families</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">5:00pm</span>
                    <span className="text-gray-700">Last orders for roasts</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="primary" size="md" fullWidth asChild>
                    <Link href="/book-table?tab=sunday">
                      <Icon name="calendar" className="mr-2" />
                      Book Your Table
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewSection 
        title="What People Say About Our Sunday Roast"
        subtitle="Real reviews from our Sunday lunch guests"
        background="gray"
        layout="carousel"
      />

      {/* The Sunday Roast Tradition */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Why Sunday Roast at The Anchor is Special"
            />
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl text-center mb-8">
                In a world of chain restaurants and microwave meals, The Anchor keeps the great 
                British tradition of Sunday roast alive and thriving in Stanwell Moor.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">The Village Tradition</h3>
                  <p className="mb-4">
                    For generations, Sunday lunch at the village pub has been a cornerstone of British 
                    life. At The Anchor, we honour this tradition with pride. Every Sunday, our kitchen 
                    starts early, filling the pub with the comforting aromas of roasting meat and fresh 
                    Yorkshire puddings rising in the oven. It's the smell that draws locals from their 
                    Sunday papers and brings families together around our tables.
                  </p>
                  <p>
                    Our Sunday roast isn't just a meal - it's a weekly ritual for many Stanwell Moor 
                    families. Grandparents, parents, and children gather here, creating memories over 
                    generous plates of perfectly roasted meat and all the trimmings. It's these moments 
                    that make a pub truly part of the community.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">Cooked with Care</h3>
                  <p className="mb-4">
                    Our head chef takes Sunday roast seriously - perhaps too seriously, his wife might 
                    say! Each cut of meat is carefully selected from local suppliers, seasoned with 
                    herbs from our own garden when in season, and roasted to perfection. The vegetables 
                    are fresh, not frozen. The roast potatoes are par-boiled then roasted in goose fat 
                    until golden and crispy. The Yorkshire puddings? Made from scratch, naturally.
                  </p>
                  <p className="mb-4">
                    This attention to detail is why we introduced our pre-order system. By knowing 
                    exactly how many roasts we're serving, we can prepare each one fresh to order, 
                    ensuring every plate meets our exacting standards. It's more work for us, but 
                    the results speak for themselves.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-green-900 mb-2">🌱 Our Commitment to Sustainability</h4>
                    <p className="text-sm text-green-800">
                      The £5 deposit ensures we prepare exactly what's needed, reducing food waste significantly. 
                      This sustainable approach allows us to maintain quality and affordability - keeping our 
                      Sunday roasts accessible to the community we serve.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">
                  Your Local Sunday Roast Near Me
                </h3>
                <p className="text-gray-700 mb-4">
                  When you search for "Sunday roast near me" in Stanwell Moor, Staines, or anywhere 
                  near Heathrow, The Anchor is your answer. We're not just the closest traditional pub 
                  to the airport - we're a proper British pub serving authentic Sunday roasts the way 
                  they should be done. Whether you're a local from Ashford, Bedfont, or Egham, or 
                  staying at a Heathrow hotel, you'll find us perfectly located for your Sunday lunch.
                </p>
                <p className="text-gray-700 mb-4">
                  Our Sunday roast has become legendary in the area. Flight crews from Terminal 2, 3, 4, 
                  and 5 have made us their regular Sunday spot. Business travelers extend their trips 
                  just to experience a proper British Sunday lunch before flying home. Why? Because when 
                  you're looking for "Sunday lunch near me," you want more than just food - you want 
                  the full British pub experience.
                </p>
                <p className="text-gray-700">
                  "You haven't truly visited England until you've had a proper Sunday roast," one 
                  American guest told us. We couldn't agree more. At The Anchor, Sunday roast isn't 
                  just a meal - it's a tradition we've been perfecting for years, making us the go-to 
                  answer for "roast dinner near me" searches across Surrey and West London.
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Whether you're searching for "Sunday roast near me" in Stanwell Moor, "Sunday lunch 
                  near me" in Staines, or "roast dinner near me" anywhere near Heathrow, The Anchor is 
                  your destination. We welcome locals from Ashford, Bedfont, Egham, Feltham, Stanwell, 
                  and Windsor, plus international visitors wanting authentic British culture. Just 
                  remember to book ahead - Sundays are our busiest day for a reason.
                </p>
                <p className="text-lg text-gray-700 italic">
                  "The best Sunday roast near me" isn't just what people search for - it's what they 
                  find at The Anchor. With 4.8 stars from over 127 reviews, we're the top-rated Sunday 
                  lunch destination near Heathrow Airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section-spacing bg-anchor-green text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't Miss Out on Sunday Roast
            </h2>
            <p className="text-lg mb-8">
              Sunday roasts must be pre-ordered with a £5 per person deposit by 1pm on Saturday.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="secondary" size="lg" className="bg-white text-anchor-green hover:bg-gray-100 border-white" asChild>
                <Link href="/book-table?tab=sunday">
                  <Icon name="calendar" className="mr-2" />
                  Book Your Sunday Roast
                </Link>
              </Button>
              
              <Link href="tel:01753682707">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-anchor-green"
                >
                  <Icon name="phone" className="mr-2" />
                  Call: 01753 682707
                </Button>
              </Link>
            </div>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
              Can't pre-order? Our regular menu is available on Sundays too!
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
              <h3 className="font-bold text-xl mb-3 text-white">Sunday Roast Service</h3>
              <p className="mb-2 text-white">Every Sunday: 12:00 PM - 5:00 PM</p>
              <p className="text-sm text-white/90">Last orders 4:30 PM</p>
            </div>
          </div>
        </Container>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "@id": "https://the-anchor.pub/#sunday-roast",
              "name": "The Anchor - Sunday Roast",
              "servesCuisine": ["British", "Sunday Roast"],
              "priceRange": "££",
              "telephone": "+441753682707",
              "url": "https://the-anchor.pub/sunday-lunch",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Horton Road",
                "addressLocality": "Stanwell Moor",
                "addressRegion": "Surrey",
                "postalCode": "TW19 6AQ",
                "addressCountry": "GB"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Sunday",
                  "opens": "12:00",
                  "closes": "17:00",
                  "description": "Sunday Roast service hours"
                }
              ],
              "advanceBookingRequirement": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "unitCode": "DAY",
                "description": "Sunday roasts must be pre-ordered by 1pm Saturday"
              },
              "acceptsReservations": "required",
              "reservationPolicy": "Pre-order required by 1pm Saturday. £5 per person deposit required at time of booking, balance due on arrival.",
            "hasMenu": {
              "@type": "Menu",
              "name": "Sunday Roast Menu",
              "description": "Traditional British Sunday roast dinners",
              "hasMenuSection": {
                "@type": "MenuSection",
                "name": "Sunday Roasts",
                "description": "Served with roast potatoes, Yorkshire pudding, vegetables and gravy",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Roasted Chicken",
                    "description": "Oven-roasted chicken breast with sage & onion stuffing balls",
                    "offers": {
                      "@type": "Offer",
                      "price": "14.99",
                      "priceCurrency": "GBP",
                      "availability": "https://schema.org/PreOrder"
                    },
                    "nutrition": generateNutritionInfo("Roasted Chicken", "sunday-roast")
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Slow-Cooked Lamb Shank",
                    "description": "Tender slow-braised lamb shank in rich red wine gravy",
                    "offers": {
                      "@type": "Offer",
                      "price": "15.49",
                      "priceCurrency": "GBP"
                    }
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Crispy Pork Belly",
                    "description": "Crispy crackling and tender slow-roasted pork belly with Bramley apple sauce",
                    "offers": {
                      "@type": "Offer",
                      "price": "15.99",
                      "priceCurrency": "GBP"
                    }
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Beetroot & Butternut Squash Wellington",
                    "description": "Golden puff pastry filled with beetroot & butternut squash (Vegan)",
                    "offers": {
                      "@type": "Offer",
                      "price": "15.49",
                      "priceCurrency": "GBP"
                    },
                    "suitableForDiet": ["https://schema.org/VeganDiet", "https://schema.org/VegetarianDiet"]
                  }
                ]
              },
              "inLanguage": "en-GB"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Offer",
            "name": "Sunday Roast Pre-Order Special",
            "description": "Traditional British Sunday roast dinners with all the trimmings. Must be pre-ordered with a £5 per person deposit by 1pm Saturday.",
            "url": "https://the-anchor.pub/sunday-lunch",
            "priceCurrency": "GBP",
            "priceRange": "£14.99 - £15.99",
            "eligibleRegion": {
              "@type": "Place",
              "name": "Stanwell Moor and surrounding areas"
            },
            "availableAtOrFrom": {
              "@type": "Place",
              "name": "The Anchor",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Horton Road",
                "addressLocality": "Stanwell Moor",
                "addressRegion": "Surrey",
                "postalCode": "TW19 6AQ"
              }
            },
            "itemOffered": {
              "@type": "MenuItem",
              "name": "Sunday Roast Selection",
              "description": "Choice of roasted meats served with Yorkshire pudding, roast potatoes, seasonal vegetables and gravy"
            },
            "validFrom": "12:00",
            "validThrough": "17:00",
            "eligibleDuration": {
              "@type": "Duration",
              "description": "Available Sundays only"
            },
            "availabilityStarts": "2025-01-01",
            "availabilityEnds": "2025-12-31",
            "seller": {
              "@id": "https://the-anchor.pub/#business"
            },
            "priceSpecification": {
              "@type": "CompoundPriceSpecification",
              "priceComponent": [
                {
                  "@type": "UnitPriceSpecification",
                  "name": "Deposit",
                  "price": "5.00",
                  "priceCurrency": "GBP",
                  "unitText": "per person",
                  "description": "Required at time of booking"
                },
                {
                  "@type": "UnitPriceSpecification",
                  "name": "Balance",
                  "priceCurrency": "GBP",
                  "unitText": "per person",
                  "description": "Payable on arrival"
                }
              ]
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://the-anchor.pub"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Sunday Lunch",
                "item": "https://the-anchor.pub/sunday-lunch"
              }
            ]
          }
        ])
        }}
      />
    </>
  )
}