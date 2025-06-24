import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Food Menu | The Anchor Stanwell Moor | Traditional British Pub Food',
  description: 'Enjoy traditional British pub food at The Anchor. Famous Sunday roasts, stone-baked pizzas, burgers, and family-friendly meals. Kitchen open Tuesday-Sunday.',
  keywords: 'pub food stanwell moor, sunday roast near heathrow, british pub menu, family restaurant stanwell',
  openGraph: {
    title: 'Food Menu - The Anchor Pub',
    description: 'Traditional British pub food, famous Sunday roasts, and family-friendly dining near Heathrow.',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg'],
  },
}

export default function FoodMenuPage() {
  return (
    <>
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg"
            alt="The Anchor famous Sunday roast"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-anchor-green/80 via-anchor-green/60 to-anchor-green/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Good Food, Good Company
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              Great memories start with great food
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="tag bg-white/90 backdrop-blur-sm">🍖 Sunday Roasts</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍕 Stone-Baked Pizzas</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🍔 Burgers & Stacks</span>
              <span className="tag bg-white/90 backdrop-blur-sm">🌱 Veggie Options</span>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Hours */}
      <section className="py-8 bg-anchor-gold/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-anchor-green font-semibold">
            Kitchen Hours: Tuesday to Friday 6pm-9pm | Saturday 1pm-7pm | Sunday 12pm-5pm
          </p>
          <p className="text-gray-700 mt-2">
            Please order at the bar when you're ready
          </p>
        </div>
      </section>

      {/* Sunday Roasts Special Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-8 text-center">
              🥘 Sunday Roasts
            </h2>
            <div className="bg-anchor-sand/30 rounded-2xl p-8 shadow-sm text-center mb-8">
              <p className="text-lg text-gray-700 mb-4">
                Our famous Sunday roasts are available every Sunday from 12pm to 5pm
              </p>
              <CallToAction 
                href="/sunday-lunch"
                variant="primary" 
                size="lg"
              >
                View Full Sunday Menu
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Light Bites */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              🥪 Light Bites
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Chicken Goujon Wrap with Chips</h3>
                  <span className="text-xl font-bold text-anchor-gold">£9.99</span>
                </div>
                <p className="text-gray-700">Crispy chicken goujons in a wrap with salad & chips.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Fish Finger Wrap with Chips</h3>
                  <span className="text-xl font-bold text-anchor-gold">£9.99</span>
                </div>
                <p className="text-gray-700">Golden fish fingers in a soft wrap with salad & chips.</p>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-2xl p-8 shadow-md">
              <h4 className="font-bold text-xl text-anchor-green mb-6 text-center">Sides & Extras</h4>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="flex justify-between">
                  <span>Chips</span>
                  <span className="text-anchor-gold font-semibold">£3.49 (V)</span>
                </div>
                <div className="flex justify-between">
                  <span>Chunky Chips</span>
                  <span className="text-anchor-gold font-semibold">£4.49</span>
                </div>
                <div className="flex justify-between">
                  <span>Cheesy Chips</span>
                  <span className="text-anchor-gold font-semibold">£4.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Sweet Potato Fries</span>
                  <span className="text-anchor-gold font-semibold">£4.49 (V)</span>
                </div>
                <div className="flex justify-between">
                  <span>6 Onion Rings</span>
                  <span className="text-anchor-gold font-semibold">£3.49 (V)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Snack Pots */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              🍟 Snack Pots
            </h2>
            <p className="text-center text-lg text-gray-700 mb-8">
              Enjoy our snack pots with chips and your choice of dip. Perfect for a cosy snack, quick bite, 
              or smaller appetites including children.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-anchor-sand/30 rounded-2xl p-6 shadow-sm text-center">
                <h3 className="font-bold text-lg text-anchor-green mb-2">4 Chicken Goujons with Chips</h3>
                <p className="text-xl font-bold text-anchor-gold">£7.49</p>
              </div>
              <div className="bg-anchor-sand/30 rounded-2xl p-6 shadow-sm text-center">
                <h3 className="font-bold text-lg text-anchor-green mb-2">5 Salt & Chilli Squid with Chips</h3>
                <p className="text-xl font-bold text-anchor-gold">£7.49</p>
              </div>
              <div className="bg-anchor-sand/30 rounded-2xl p-6 shadow-sm text-center">
                <h3 className="font-bold text-lg text-anchor-green mb-2">3 Fish Fingers with Chips</h3>
                <p className="text-xl font-bold text-anchor-gold">£7.49</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mains */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              🍽️ Mains
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Beef & Ale Pie</h3>
                  <span className="text-xl font-bold text-anchor-gold">£14.99</span>
                </div>
                <p className="text-gray-700">Tender slow-cooked beef in a hearty ale gravy, wrapped in golden pastry. Served with buttery mash and seasonal vegetables.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Chicken Katsu Curry</h3>
                  <span className="text-xl font-bold text-anchor-gold">£13.99</span>
                </div>
                <p className="text-gray-700">Crispy breaded chicken served on fluffy rice, smothered in aromatic katsu curry sauce. A fusion of British and Japanese flavours.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Chicken & Wild Mushroom Pie</h3>
                  <span className="text-xl font-bold text-anchor-gold">£14.99</span>
                </div>
                <p className="text-gray-700">Succulent chicken and wild mushrooms in a creamy sauce, encased in flaky pastry. Served with smooth mash and fresh seasonal veg.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Sausage & Mash</h3>
                  <span className="text-xl font-bold text-anchor-gold">£13.99</span>
                </div>
                <p className="text-gray-700">Three juicy sausages on creamy mash, topped with crispy onions and rich gravy. A comforting British classic, full of flavour.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Lamb Shank</h3>
                  <span className="text-xl font-bold text-anchor-gold">£14.99</span>
                </div>
                <p className="text-gray-700">Slow-cooked lamb shank, served with smooth mash and seasonal veg. Finished with a rich mint-infused gravy for a perfect balance.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Spinach & Ricotta Cannelloni</h3>
                  <span className="text-anchor-gold text-sm font-bold bg-green-100 px-2 py-1 rounded ml-2">(V)</span>
                  <span className="text-xl font-bold text-anchor-gold">£13.99</span>
                </div>
                <p className="text-gray-700">Pasta tubes filled with creamy ricotta and spinach, baked in rich tomato sauce. Served with garlic bread and crisp mixed salad.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Lasagne</h3>
                  <span className="text-xl font-bold text-anchor-gold">£14.99</span>
                </div>
                <p className="text-gray-700">Layers of pasta, rich meat sauce, and creamy béchamel, baked until golden. Served with crisp salad and warm garlic bread.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Mac 'N Cheese</h3>
                  <span className="text-anchor-gold text-sm font-bold bg-green-100 px-2 py-1 rounded ml-2">(V)</span>
                  <span className="text-xl font-bold text-anchor-gold">£13.99</span>
                </div>
                <p className="text-gray-700">Creamy macaroni in a rich cheese sauce, topped with crispy onions. Served with garlic bread and fresh salad for extra indulgence.</p>
              </div>
            </div>
            
            {/* Chip Shop Favourites */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-anchor-green mb-2 text-center">🐟 Classic Chip Shop Favourites</h3>
              <p className="text-center text-anchor-gold font-semibold mb-4">50% Off for Over 65s Every Friday!</p>
              <p className="text-gray-700 text-center mb-6">All served with mushy peas, tartar sauce, and fresh lemon</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Fish & Chips</h3>
                  <span className="text-xl font-bold text-anchor-gold">£14.99</span>
                </div>
                <p className="text-gray-700">Beer-battered fish, crispy golden chips, mushy peas, tartar sauce, and a fresh lemon wedge for a classic taste.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Half Fish & Chips</h3>
                  <span className="text-xl font-bold text-anchor-gold">£11.99</span>
                </div>
                <p className="text-gray-700">Half-sized battered fish with chunky chips, mushy peas, tartar sauce, and a fresh lemon wedge—light but satisfying.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Scampi & Chips</h3>
                  <span className="text-xl font-bold text-anchor-gold">£12.99</span>
                </div>
                <p className="text-gray-700">Golden, crispy scampi served with chunky chips, mushy peas, tartar sauce, and a fresh lemon wedge for balance.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Jumbo Sausage & Chips</h3>
                  <span className="text-xl font-bold text-anchor-gold">£12.99</span>
                </div>
                <p className="text-gray-700">Jumbo sausage with chunky chips, mushy peas, and your choice of sauce—perfect for a hearty, no-fuss meal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Burgers */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              🍔 Burgers
            </h2>
            <p className="text-center text-lg text-gray-700 mb-8">
              Our burgers are all served with salad, chips and the sauce of your choice.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-anchor-sand/30 rounded-2xl p-8 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Beef Burger</h3>
                  <span className="text-xl font-bold text-anchor-gold">£9.99</span>
                </div>
                <p className="text-gray-700">Classic beef patty with all the trimmings</p>
              </div>
              <div className="bg-anchor-sand/30 rounded-2xl p-8 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Spicy Chicken Burger</h3>
                  <span className="text-xl font-bold text-anchor-gold">£9.99</span>
                </div>
                <p className="text-gray-700">Crispy coated chicken with a spicy kick</p>
              </div>
              <div className="bg-anchor-sand/30 rounded-2xl p-8 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Chicken Burger</h3>
                  <span className="text-xl font-bold text-anchor-gold">£9.99</span>
                </div>
                <p className="text-gray-700">Juicy grilled chicken breast</p>
              </div>
              <div className="bg-anchor-sand/30 rounded-2xl p-8 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-anchor-green">Vegetable Burger</h3>
                  <span className="text-anchor-gold text-sm font-bold bg-green-100 px-2 py-1 rounded ml-2">(V)</span>
                  <span className="text-xl font-bold text-anchor-gold">£9.99</span>
                </div>
                <p className="text-gray-700">Plant-based patty packed with flavour</p>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-6 italic">
              Why not upgrade your fries, add double cheese slices, add crispy bacon or a hashed brown?
            </p>

            {/* Burger Specials */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-anchor-green mb-8 text-center">
                Burger Specials
              </h3>
              <p className="text-center text-lg text-gray-700 mb-8">
                All of our special burgers are served with chips as standard.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-anchor-green">Katsu Chicken Burger</h3>
                    <span className="text-xl font-bold text-anchor-gold">£12.99</span>
                  </div>
                  <p className="text-gray-700">Crispy chicken fillet topped with rich katsu curry sauce, fresh cucumber, and golden chips. A bold twist!</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-anchor-green">Beef Stack</h3>
                    <span className="text-xl font-bold text-anchor-gold">£12.99</span>
                  </div>
                  <p className="text-gray-700">Double beef patties, fresh salad, crispy onion ring, and golden chips. Customise with cheese or bacon!</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-anchor-green">Spicy Chicken Stack</h3>
                    <span className="text-xl font-bold text-anchor-gold">£12.99</span>
                  </div>
                  <p className="text-gray-700">Crispy, spicy chicken with fresh salad, a crunchy hash brown, and golden chips. Add your favourite sauce!</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-anchor-green">Chicken Stack</h3>
                    <span className="text-xl font-bold text-anchor-gold">£12.99</span>
                  </div>
                  <p className="text-gray-700">Breaded chicken fillet, crisp salad, hash brown, and golden chips. A hearty choice—perfect with sauce!</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-anchor-green">Veggie Stack</h3>
                    <span className="text-anchor-gold text-sm font-bold bg-green-100 px-2 py-1 rounded ml-2">(V)</span>
                    <span className="text-xl font-bold text-anchor-gold">£12.99</span>
                  </div>
                  <p className="text-gray-700">A tasty veggie patty with fresh salad, a crispy onion ring, and golden chips. A satisfying meat-free treat!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stone Baked Pizza */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              🍕 Stone Baked Pizza
            </h2>
            <p className="text-center text-lg text-gray-700 mb-8">
              Enjoy the comforting taste of our stone-baked pizzas, crafted to order with authentic Italian ingredients.
              <br /><span className="text-sm italic">We offer 12" gluten-free pizzas on request. Small pizzas perfect for children!</span>
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Rustic Classic (V)</h3>
                <p className="text-anchor-gold font-semibold mb-2">£7.49 / £10.49</p>
                <p className="text-gray-700 text-sm">Rich tomato sauce, creamy mozzarella, crisp stone-baked crust—a timeless favourite.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Simply Salami</h3>
                <p className="text-anchor-gold font-semibold mb-2">£8.49 / £12.99</p>
                <p className="text-gray-700 text-sm">Napoli salami, tangy tomato sauce, mozzarella, stone-baked to crispy perfection.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Fully Loaded</h3>
                <p className="text-anchor-gold font-semibold mb-2">£9.49 / £13.99</p>
                <p className="text-gray-700 text-sm">Napoli salami, speck ham, fennel salami, mozzarella on a bold stone-baked base.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Nice & Spicy</h3>
                <p className="text-anchor-gold font-semibold mb-2">£8.49 / £13.49</p>
                <p className="text-gray-700 text-sm">'Nduja, Ventricina, roquito peppers, mozzarella—fiery flavours on a crisp crust.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-anchor-green mb-2">The Garden Club (V)</h3>
                <p className="text-anchor-gold font-semibold mb-2">£8.99 / £12.99</p>
                <p className="text-gray-700 text-sm">Roasted courgettes, caramelised onions, rocket, and mozzarella on a rich tomato base.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Smoked Chilli Chicken</h3>
                <p className="text-anchor-gold font-semibold mb-2">£8.99 / £13.49</p>
                <p className="text-gray-700 text-sm">Smoky paprika base with chicken, mozzarella, and roquito peppers for a spicy-savoury bite.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Chicken & Pesto</h3>
                <p className="text-anchor-gold font-semibold mb-2">£9.49 / £13.49</p>
                <p className="text-gray-700 text-sm">Tender chicken, basil pesto, and melted mozzarella on a crisp, stone-baked crust.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Barbecue Chicken</h3>
                <p className="text-anchor-gold font-semibold mb-2">£9.99 / £13.99</p>
                <p className="text-gray-700 text-sm">Sweet and smoky BBQ sauce, succulent chicken, speck ham, and mozzarella on a crunchy crust.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Speck Ham & Parmesan</h3>
                <p className="text-anchor-gold font-semibold mb-2">£9.99 / £13.99</p>
                <p className="text-gray-700 text-sm">Thinly sliced speck ham, shaved parmesan, and mozzarella on rich tomato sauce.</p>
              </div>
            </div>
            <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-anchor-sand/30 rounded-2xl p-8 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-anchor-green">Garlic Bread (V)</h3>
                  <span className="text-lg font-bold text-anchor-gold">£7.49 / £9.49</span>
                </div>
                <p className="text-gray-700 text-sm">Stone-baked bread brushed with garlic butter, warm and crispy every time.</p>
              </div>
              <div className="bg-anchor-sand/30 rounded-2xl p-8 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-anchor-green">Garlic Bread with Mozzarella (V)</h3>
                  <span className="text-lg font-bold text-anchor-gold">£9.49 / £11.49</span>
                </div>
                <p className="text-gray-700 text-sm">Warm garlic bread crowned with melted mozzarella for pure indulgence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Desserts & Hot Drinks */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              🍰 Desserts
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-anchor-sand/30 rounded-2xl p-6 shadow-sm text-center">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Apple Crumble</h3>
                <p className="text-xl font-bold text-anchor-gold mb-2">£5.99</p>
                <p className="text-gray-700 text-sm">Spiced apple crumble served warm with custard or ice cream.</p>
              </div>
              <div className="bg-anchor-sand/30 rounded-2xl p-6 shadow-sm text-center">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Chocolate Fudge Brownie</h3>
                <p className="text-xl font-bold text-anchor-gold mb-2">£5.99</p>
                <p className="text-gray-700 text-sm">Gooey chocolate brownie, ideal with custard or ice cream.</p>
              </div>
              <div className="bg-anchor-sand/30 rounded-2xl p-6 shadow-sm text-center">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Sticky Toffee Pudding</h3>
                <p className="text-xl font-bold text-anchor-gold mb-2">£5.99</p>
                <p className="text-gray-700 text-sm">Rich sponge pudding in toffee sauce, perfect with custard.</p>
              </div>
              <div className="bg-anchor-sand/30 rounded-2xl p-6 shadow-sm text-center">
                <h3 className="font-bold text-lg text-anchor-green mb-2">Ice Cream Sundae</h3>
                <p className="text-xl font-bold text-anchor-gold mb-2">£4.99</p>
                <p className="text-gray-700 text-sm">Three scoops of ice cream with chocolate or strawberry sauce.</p>
              </div>
            </div>

            {/* Hot Drinks */}
            <div className="mt-16">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                ☕ Hot Drinks
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-md max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span>Americano</span>
                    <span className="text-anchor-gold font-semibold">£2.10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Latte</span>
                    <span className="text-anchor-gold font-semibold">£2.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cappuccino</span>
                    <span className="text-anchor-gold font-semibold">£2.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hot Chocolate</span>
                    <span className="text-anchor-gold font-semibold">£2.40</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Individual Pot of Tea</span>
                    <span className="text-anchor-gold font-semibold">£2.20</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic text-center mt-4">
                  Tetley Tea, Decaffeinated, Earl Grey, Green Tea, Green Tea with Lemon, Min Fusion, Raspberry Pomegranate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg text-anchor-green mb-2">Allergen Information</h3>
              <p className="text-gray-700">
                All our dishes are prepared in a single kitchen where allergens are present. While we take every 
                precaution, we cannot guarantee dishes are free from cross-contamination. If you have allergies or 
                dietary requirements, please speak to a member of our team before ordering. We use vegetable oil 
                where necessary to keep dishes light yet warming during colder months.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-2">
                Sauce options include Ketchup, Mayonnaise, BBQ, Sweet Chilli, Burger Sauce, Garlic Mayonnaise, or Tartar.
              </p>
              <p className="text-sm text-gray-600 italic">
                Available Tuesday to Friday 6pm to 9pm | Saturday 1pm to 7pm | Sunday 12pm to 5pm. 
                Please order at the bar when you're ready.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 italic">
                (V) Vegetarian, (VG) Vegan. Items are prepared in a single kitchen, and while we take great care, we cannot guarantee 
                allergen cross-contamination. For full allergen details, please ask at the bar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Hungry? Book Your Table Now
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our kitchen gets busy, especially on weekends. Book ahead to avoid disappointment!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 Call: 01753 682707
            </CallToAction>
            <CallToAction 
              href="/drinks"
              variant="white"
              size="lg"
            >
              🍺 View Drinks Menu
            </CallToAction>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Menu",
            "name": "The Anchor Food Menu",
            "description": "Traditional British pub food menu",
            "hasMenuSection": [
              {
                "@type": "MenuSection",
                "name": "Mains",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Fish & Chips",
                    "description": "Beer-battered fish, crispy golden chips, mushy peas",
                    "offers": {
                      "@type": "Offer",
                      "price": "14.99",
                      "priceCurrency": "GBP"
                    },
                    "nutrition": {
                      "@type": "NutritionInformation",
                      "description": "50% off for over 65s on Fridays"
                    }
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Beef & Ale Pie",
                    "description": "Tender slow-cooked beef in hearty ale gravy",
                    "offers": {
                      "@type": "Offer",
                      "price": "14.99",
                      "priceCurrency": "GBP"
                    }
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Chicken Katsu Curry",
                    "description": "Crispy breaded chicken with katsu curry sauce",
                    "offers": {
                      "@type": "Offer",
                      "price": "13.99",
                      "priceCurrency": "GBP"
                    }
                  }
                ]
              },
              {
                "@type": "MenuSection",
                "name": "Stone Baked Pizza",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Rustic Classic",
                    "description": "Rich tomato sauce, creamy mozzarella",
                    "offers": {
                      "@type": "Offer",
                      "price": "7.49",
                      "priceCurrency": "GBP"
                    },
                    "suitableForDiet": ["https://schema.org/VegetarianDiet"]
                  }
                ]
              }
            ],
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
          })
        }}
      />
    </>
  )
}