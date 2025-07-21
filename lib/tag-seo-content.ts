// Comprehensive SEO content for all tag pages
export interface TagSEOContent {
  name: string
  description: string
  metaTitle: string
  metaDescription: string
  heroContent: string
  introContent: string
  valueProposition: string
  keywords: string[]
}

// Generate fallback SEO content for tags without specific content
export function generateFallbackSEOContent(tag: string): TagSEOContent {
  const name = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    name: name,
    description: `Explore ${name.toLowerCase()} content and updates`,
    metaTitle: `${name} | The Anchor Pub Stanwell Moor Near Heathrow`,
    metaDescription: `Discover ${name.toLowerCase()} at The Anchor Stanwell Moor. Your local pub with great food, drinks & atmosphere, 5 minutes from Heathrow Airport.`,
    heroContent: `Welcome to our ${name.toLowerCase()} page at The Anchor, Stanwell Moor's favourite local pub. Explore our latest posts and updates about ${name.toLowerCase()}.`,
    introContent: `The Anchor is your destination for all things ${name.toLowerCase()} in Stanwell Moor. As a cornerstone of the local community, we pride ourselves on offering exceptional experiences that bring people together. Whether you're a regular or visiting for the first time, you'll find a warm welcome and great atmosphere just minutes from Heathrow Airport.`,
    valueProposition: `Visit The Anchor today and experience the best of ${name.toLowerCase()} in Stanwell Moor. With our convenient location, free parking, and friendly service, we're your perfect local pub near Heathrow.`,
    keywords: [
      `${tag} stanwell moor`,
      `${tag} pub heathrow`,
      `${tag} surrey`,
      `${tag} TW19`,
      `the anchor ${tag}`
    ]
  }
}

// Get SEO content for a tag (with fallback)
export function getTagSEOContent(tag: string): TagSEOContent {
  return tagSEOContent[tag] || generateFallbackSEOContent(tag)
}

export const tagSEOContent: Record<string, TagSEOContent> = {
  // Phase 1: High-Priority Tags
  'events': {
    name: 'Events & Entertainment',
    description: 'Quiz nights, drag shows, seasonal celebrations, and special events',
    metaTitle: 'Pub Events Stanwell Moor | What\'s On at The Anchor Near Heathrow',
    metaDescription: 'Discover the best pub events in Stanwell Moor. Quiz nights, drag shows, seasonal celebrations & more at The Anchor, just 5 minutes from Heathrow Airport.',
    heroContent: 'Experience the best pub events in Stanwell Moor at The Anchor, your premier entertainment venue just minutes from Heathrow Airport. From monthly quiz nights to spectacular drag shows, we\'re the heart of local entertainment.',
    introContent: 'The Anchor is Stanwell Moor\'s premier destination for unforgettable events and entertainment. Our packed calendar features something for everyone - test your knowledge at our legendary monthly quiz nights, enjoy fabulous drag performances with Nikki Manfadge, or celebrate at our special events. With our warm atmosphere, excellent food and drinks, and convenient location near Heathrow, we\'re the perfect venue for a memorable night out.',
    valueProposition: 'Why settle for an ordinary night when you can experience extraordinary entertainment? Book your table today and discover why locals and visitors alike choose The Anchor for the best events in the area. With free parking, a welcoming atmosphere, and events throughout the week, your perfect night out is waiting.',
    keywords: ['pub events stanwell moor', 'events near heathrow', 'what\'s on stanwell moor', 'entertainment venue surrey', 'live events TW19']
  },

  'drinks': {
    name: 'Drinks & Bar',
    description: 'Craft beers, premium spirits, wines, and special drink offers',
    metaTitle: 'Pub Drinks Menu Stanwell Moor | Craft Beer & Cocktails Near Heathrow',
    metaDescription: 'Explore our exceptional drinks selection at The Anchor Stanwell Moor. Craft beers, premium spirits, wines & cocktails. 5 min from Heathrow.',
    heroContent: 'Discover our exceptional drinks selection at The Anchor, where quality meets tradition in the heart of Stanwell Moor village. From craft beers to premium spirits, we\'ve curated a bar menu that satisfies every taste.',
    introContent: 'At The Anchor, we take pride in our carefully curated drinks menu. Our bar features an impressive selection of local and international craft beers, premium spirits from around the world, and a wine list chosen to complement our food menu perfectly. Whether you\'re a real ale enthusiast, cocktail connoisseur, or wine lover, our knowledgeable staff are here to help you find your perfect drink.',
    valueProposition: 'Discover why The Anchor is Stanwell Moor\'s favourite drinking destination. With regular tasting events, seasonal specials, and the warmest welcome near Heathrow, your perfect pint is always waiting.',
    keywords: ['pub drinks menu stanwell moor', 'craft beer near heathrow', 'cocktails stanwell moor', 'wine bar surrey', 'drinks TW19']
  },

  'food': {
    name: 'Food & Dining',
    description: 'Delicious pub food, seasonal menus, and dining experiences',
    metaTitle: 'Pub Food Stanwell Moor | Restaurant Near Heathrow | The Anchor Menu',
    metaDescription: 'Enjoy delicious pub food at The Anchor Stanwell Moor. Fresh ingredients, dietary options, Sunday roasts & more. Restaurant 5 minutes from Heathrow Airport.',
    heroContent: 'Savor exceptional pub food at The Anchor Stanwell Moor, where traditional favourites meet modern culinary excellence. Our chefs use fresh, locally-sourced ingredients to create memorable dining experiences.',
    introContent: 'The Anchor\'s kitchen serves up the perfect blend of traditional pub classics and contemporary dishes during kitchen hours. From our famous Sunday roasts to stone-baked pizzas, beer-battered fish and chips to gourmet burgers, every dish is prepared with care using the finest ingredients. We accommodate all dietary requirements with vegetarian, vegan, and gluten-free options available throughout our menu.',
    valueProposition: 'Whether you\'re joining us for a quick lunch, romantic dinner, or Sunday family gathering, The Anchor delivers exceptional food in a warm, welcoming atmosphere. Book your table today and taste why we\'re Stanwell Moor\'s favourite dining destination.',
    keywords: ['pub food stanwell moor', 'restaurant near heathrow', 'sunday lunch stanwell moor', 'dining near airport', 'best food TW19']
  },

  'community': {
    name: 'Community & Local',
    description: 'Local news, village life, and community initiatives',
    metaTitle: 'Stanwell Moor Community Pub | Local Village Pub Near Heathrow',
    metaDescription: 'The Anchor: Stanwell Moor\'s community hub. Supporting local initiatives, hosting village events & bringing neighbours together. Your true local near Heathrow.',
    heroContent: 'The Anchor is more than just a pub - we\'re the heart of Stanwell Moor village. For generations, we\'ve been where locals gather, celebrate, and support each other.',
    introContent: 'Deep roots in Stanwell Moor make The Anchor a true community pub. We actively support local charities, host village events, and provide a welcoming space for neighbours to connect. From quiz teams to book clubs, charity fundraisers to community meetings, we\'re proud to be part of the fabric of village life. Our commitment to the community extends beyond our doors - we source from local suppliers, employ local staff, and reinvest in making Stanwell Moor an even better place to live.',
    valueProposition: 'Experience the warmth of a genuine village pub where everybody knows your name. Whether you\'re a long-time resident or new to the area, you\'ll find a warm welcome and friendly faces at The Anchor. Join our community today.',
    keywords: ['stanwell moor community pub', 'local pub near heathrow', 'village pub surrey', 'community venue TW19', 'stanwell moor local']
  },

  'special-offers': {
    name: 'Special Offers',
    description: 'Deals, promotions, and exclusive offers',
    metaTitle: 'Pub Deals Stanwell Moor | Special Offers at The Anchor Near Heathrow',
    metaDescription: 'Save with special offers at The Anchor Stanwell Moor. Lunch deals, quiz night specials & more. Best pub deals 5 minutes from Heathrow Airport.',
    heroContent: 'Make the most of your visit with our fantastic special offers at The Anchor. From daily deals to seasonal promotions, we\'re always finding ways to give our customers extra value.',
    introContent: 'At The Anchor, we believe great experiences shouldn\'t break the bank. That\'s why we offer a variety of special deals throughout the week. Tuck into our value lunch menu Monday to Friday during kitchen hours, or take advantage of our monthly quiz night. We also run seasonal promotions for all our customers.',
    valueProposition: 'Follow us on social media and sign up to our newsletter to be first to hear about new offers and promotions. With something special every day of the week, there\'s always a great reason to visit The Anchor.',
    keywords: ['pub deals stanwell moor', 'pub offers near heathrow', 'pub offers surrey', 'special offers TW19', 'deals stanwell moor']
  },

  // Phase 2: Seasonal Tags
  'christmas': {
    name: 'Christmas at The Anchor',
    description: 'Festive celebrations, Christmas menus, and holiday events',
    metaTitle: 'Christmas Pub Stanwell Moor | Festive Menu & Events Near Heathrow',
    metaDescription: 'Celebrate Christmas at The Anchor Stanwell Moor. Festive menu, Christmas parties, seasonal events & bookings. Perfect venue 5 minutes from Heathrow.',
    heroContent: 'Make your Christmas magical at The Anchor Stanwell Moor. From intimate festive dinners to spectacular party nights, we\'re your perfect Christmas venue near Heathrow.',
    introContent: 'Christmas at The Anchor is truly special. Our pub transforms into a winter wonderland complete with twinkling lights, festive decorations, and the warmest atmosphere in Stanwell Moor. Our specially crafted Christmas menu features all the traditional favourites alongside creative festive dishes, while our bar offers mulled wine, seasonal cocktails, and winter warmers.',
    valueProposition: 'Book your Christmas celebration early to avoid disappointment. Whether it\'s an office party, family gathering, or festive night out with friends, we\'ll make your Christmas unforgettable. Contact us today to discuss your requirements.',
    keywords: ['christmas pub stanwell moor', 'festive menu heathrow', 'christmas party venue surrey', 'xmas events TW19', 'holiday dining stanwell moor']
  },

  'easter': {
    name: 'Easter Celebrations',
    description: 'Easter celebrations and springtime events',
    metaTitle: 'Easter Sunday Lunch Stanwell Moor | Easter Events at The Anchor',
    metaDescription: 'Celebrate Easter at The Anchor Stanwell Moor. Special Easter menu, family events, egg hunts & spring celebrations. Book your table near Heathrow.',
    heroContent: 'Hop into spring with Easter celebrations at The Anchor. Join us for special menus, family fun, and the warmest welcome in Stanwell Moor.',
    introContent: 'Easter at The Anchor brings families together for joyful spring celebrations. Our special Easter menu features seasonal ingredients at their best, including succulent spring lamb and fresh seasonal vegetables. For the little ones, we organise Easter egg hunts in our beer garden, making it a perfect family day out.',
    valueProposition: 'Make Easter extra special with a visit to The Anchor. Book your table early for our popular Easter Sunday lunch and create memories that will last long after the chocolate eggs are gone.',
    keywords: ['easter sunday lunch stanwell moor', 'easter events surrey pub', 'family easter heathrow', 'spring events TW19', 'easter menu stanwell moor']
  },

  'halloween': {
    name: 'Halloween Parties',
    description: 'Spooky celebrations and Halloween parties',
    metaTitle: 'Halloween Party Stanwell Moor | Spooky Events at The Anchor Pub',
    metaDescription: 'Join our Halloween celebrations at The Anchor Stanwell Moor. Costume parties, themed nights, spooky decorations & special menu. Near Heathrow Airport.',
    heroContent: 'Get ready for frightfully good fun at The Anchor\'s Halloween celebrations. Our spooktacular events are the highlight of Stanwell Moor\'s Halloween calendar.',
    introContent: 'When October arrives, The Anchor transforms into Stanwell Moor\'s spookiest venue. Our Halloween parties feature costume competitions with great prizes, themed cocktails and mysterious concoctions, and decorations that will send shivers down your spine. Our kitchen creates special Halloween menu items that are scary good!',
    valueProposition: 'Don\'t miss the best Halloween party in the area - book your table for a night of thrills, chills, and fantastic entertainment. Costume encouraged but not required!',
    keywords: ['halloween party stanwell moor', 'spooky events near heathrow', 'halloween pub surrey', 'october events TW19', 'costume party stanwell moor']
  },

  // Phase 3: Event Categories
  'quiz-night': {
    name: 'Quiz Nights',
    description: 'Test your knowledge at our regular quiz nights',
    metaTitle: 'Pub Quiz Stanwell Moor | Monthly Quiz Night at The Anchor',
    metaDescription: 'Join our famous monthly pub quiz at The Anchor Stanwell Moor. Great prizes, fun atmosphere, £3 entry. Book your team table. 5 minutes from Heathrow.',
    heroContent: 'Put your knowledge to the test at Stanwell Moor\'s best pub quiz! Join us monthly at The Anchor, where teams battle it out for glory, prizes, and bragging rights.',
    introContent: 'Our legendary monthly quiz nights have been bringing the community together for years. Starting at 7pm, with questions ranging from general knowledge to music, sports to local history, there\'s something for every team member. Our charismatic quiz master keeps the energy high and the laughs coming, while you enjoy great food and drinks throughout the evening. Entry is just £3 per person.',
    valueProposition: 'Gather your smartest friends and book your table for our next monthly quiz. With cash prizes for the winners and spot prizes throughout, it\'s the perfect night out. Tables fill up fast, so book early!',
    keywords: ['pub quiz stanwell moor', 'quiz night near heathrow', 'monthly quiz surrey', 'trivia night TW19', 'team quiz stanwell moor']
  },

  'drag-shows': {
    name: 'Drag Shows',
    description: 'Fabulous drag entertainment with Nikki Manfadge',
    metaTitle: 'Drag Shows Stanwell Moor | Nikki Manfadge at The Anchor Pub',
    metaDescription: 'Experience fabulous drag shows at The Anchor Stanwell Moor. Regular performances by Nikki Manfadge. Book your table for an unforgettable night near Heathrow.',
    heroContent: 'Get ready for glitter, glamour, and gorgeous entertainment! The Anchor proudly presents spectacular drag shows that have become the talk of Stanwell Moor.',
    introContent: 'Our drag shows, featuring the fabulous Nikki Manfadge and special guests, bring West End-quality entertainment to your local pub. These high-energy performances combine comedy, lip-sync perfection, audience interaction, and enough sequins to light up the night. The atmosphere is electric, inclusive, and absolutely unforgettable.',
    valueProposition: 'Drag show nights sell out fast - book your table now to secure your spot at Stanwell Moor\'s most fabulous night out. Come as you are and prepare to be entertained like never before!',
    keywords: ['drag shows stanwell moor', 'drag queen events surrey', 'nikki manfadge shows', 'drag night near heathrow', 'entertainment TW19']
  },

  'sports': {
    name: 'Sports & Fixtures',
    description: 'Live sports screenings, match days, and sporting events',
    metaTitle: 'Sports Pub Stanwell Moor | Live Football & Rugby Near Heathrow',
    metaDescription: 'Watch live sports at The Anchor Stanwell Moor. Multiple screens, great atmosphere for football, rugby & more. Sports pub 5 minutes from Heathrow.',
    heroContent: 'Catch all the sporting action at The Anchor, Stanwell Moor\'s premier sports pub. With multiple screens and an electric atmosphere, we\'re your home for live sports.',
    introContent: 'Sports fans choose The Anchor for terrestrial sports coverage. We show major sporting events available on free-to-air channels including the World Cup, Euros, Six Nations rugby, and Wimbledon. The atmosphere during these big tournaments is incredible, with passionate fans creating an unforgettable experience.',
    valueProposition: 'Book your table for the next major tournament and enjoy great food, cold beers, and the best sporting atmosphere in Stanwell Moor during international competitions.',
    keywords: ['sports pub stanwell moor', 'watch football near heathrow', 'rugby pub surrey', 'live sports TW19', 'match day stanwell moor']
  },

  'bingo': {
    name: 'Bingo Nights',
    description: 'Fun-filled bingo events with great prizes',
    metaTitle: 'Bingo Night Stanwell Moor | Thursday Bingo at The Anchor Pub',
    metaDescription: 'Play bingo at The Anchor Stanwell Moor. Thursday nights, cash prizes, fun atmosphere. Popular bingo venue 5 minutes from Heathrow Airport.',
    heroContent: 'Eyes down for a full house! Join us for exciting bingo nights at The Anchor, where fun and prizes await in Stanwell Moor\'s friendliest pub.',
    introContent: 'Our bingo nights have become a beloved tradition at The Anchor. Every Thursday, players of all ages come together for an evening of excitement, laughter, and the chance to win cash prizes. Our entertaining bingo caller keeps the energy high while you enjoy drinks and snacks throughout the evening.',
    valueProposition: 'Join the fun this Thursday - arrive early to get a good table and enjoy our special bingo night menu. With multiple games, accumulator prizes, and a fantastic atmosphere, it\'s the perfect night out for groups of friends or solo players looking to meet new people.',
    keywords: ['bingo night stanwell moor', 'thursday bingo surrey', 'cash prizes heathrow', 'bingo pub TW19', 'bingo venue stanwell moor']
  },

  // Phase 4: Niche Tags
  'heathrow-area': {
    name: 'Near Heathrow Airport',
    description: 'Perfect for airport workers and travelers',
    metaTitle: 'Pub Near Heathrow Airport | The Anchor Stanwell Moor 5 Min Away',
    metaDescription: 'The Anchor: Your local pub just 5 minutes from Heathrow Airport. Perfect for airport workers, flight crews & travelers. Free parking, great food & drinks.',
    heroContent: 'Located just 5 minutes from Heathrow Airport, The Anchor is the perfect pub for airport workers, flight crews, and travelers seeking authentic British hospitality.',
    introContent: 'The Anchor\'s proximity to Heathrow Airport makes us uniquely positioned to serve the airport community. We understand the irregular hours and international tastes of airport workers and travelers. That\'s why we offer a diverse menu suited to international palates during kitchen hours, and a warm welcome whether you\'re starting your shift or ending a long journey.',
    valueProposition: 'With free parking, quick service for those on tight schedules, and a warm welcome for airport workers, The Anchor is your home away from home near Heathrow.',
    keywords: ['pub near heathrow airport', 'bars near heathrow terminals', 'heathrow local pub', 'airport pub TW19', 'heathrow workers pub']
  },

  'stanwell-moor': {
    name: 'Stanwell Moor Village',
    description: 'Your local village pub',
    metaTitle: 'Stanwell Moor Village Pub | The Anchor - Best Local Pub TW19',
    metaDescription: 'The Anchor: Stanwell Moor\'s beloved village pub. Traditional atmosphere, community hub, local favourite. Your true local in the heart of TW19.',
    heroContent: 'The Anchor has been at the heart of Stanwell Moor village for generations, serving as the community\'s favourite gathering place and true local pub.',
    introContent: 'Deeply rooted in Stanwell Moor\'s history, The Anchor embodies everything a village pub should be. We\'re where locals catch up over a pint, families gather for Sunday lunch, and the community comes together for celebrations. Our connection to the village runs deep - from supporting local suppliers to sponsoring village events, we\'re proud to be Stanwell Moor\'s pub.',
    valueProposition: 'Whether you\'re a long-time resident or new to Stanwell Moor, you\'ll find a warm welcome at The Anchor. Join us and discover why we\'ve been the village\'s favourite pub for generations.',
    keywords: ['stanwell moor village pub', 'best pub in stanwell moor', 'local pub tw19', 'stanwell moor local', 'village pub surrey']
  },

  'sunday-roast': {
    name: 'Sunday Roast',
    description: 'Traditional Sunday lunches with all the trimmings',
    metaTitle: 'Sunday Roast Stanwell Moor | Best Sunday Lunch at The Anchor',
    metaDescription: 'Our renowned Sunday roast at The Anchor Stanwell Moor. Traditional roasts, vegetarian options, book ahead. Best Sunday lunch near Heathrow Airport.',
    heroContent: 'Sundays are special at The Anchor, where our traditional roast dinners have become legendary in Stanwell Moor. Join us for the perfect Sunday lunch.',
    introContent: 'Our Sunday roasts are a labour of love. Each week, our chefs prepare succulent roasted meats including beef, lamb, pork, and chicken, accompanied by crispy roast potatoes, seasonal vegetables, Yorkshire puddings, and rich gravies. Vegetarian and vegan roasts ensure everyone can enjoy Sunday lunch at its finest. The generous portions and homemade touches make our Sunday roasts the talk of the village.',
    valueProposition: 'Sunday lunch at The Anchor is more than a meal - it\'s a tradition. Book your table early as we fill up fast, especially for larger family groups. Experience why locals vote us the best Sunday roast in the area.',
    keywords: ['sunday roast stanwell moor', 'sunday lunch near heathrow', 'best roast dinner surrey', 'traditional sunday lunch TW19', 'carvery stanwell moor']
  },

  'dog-friendly': {
    name: 'Dog Friendly Pub',
    description: 'Welcoming spaces for you and your four-legged friends',
    metaTitle: 'Dog Friendly Pub Stanwell Moor | Dogs Welcome at The Anchor',
    metaDescription: 'The Anchor welcomes dogs in our bar & beer garden. Dog friendly pub in Stanwell Moor with water bowls & treats. Perfect for dog walks near Heathrow.',
    heroContent: 'The Anchor is proud to be Stanwell Moor\'s most dog-friendly pub. Your four-legged friends are as welcome as you are in our bar areas and beautiful beer garden.',
    introContent: 'We know your dog is part of the family, which is why The Anchor goes the extra mile to ensure they feel welcome. Our bar areas and spacious beer garden are perfect for relaxing with your canine companion. We provide fresh water bowls, dog treats at the bar, and our staff love making a fuss of well-behaved dogs. The surrounding area offers lovely walks, making us the perfect refreshment stop.',
    valueProposition: 'Next time you\'re out walking your dog, stop by The Anchor for a warm welcome. With plenty of space, a dog-friendly atmosphere, and treats for your furry friend, we\'re the perfect destination for dog owners.',
    keywords: ['dog friendly pub stanwell moor', 'dog pub near heathrow', 'pet friendly surrey', 'dogs welcome TW19', 'dog friendly beer garden']
  },

  'pizza': {
    name: 'Stone-Baked Pizza',
    description: 'Authentic stone-baked pizzas and Italian favourites',
    metaTitle: 'Pizza Stanwell Moor | Stone-Baked Pizza at The Anchor Pub',
    metaDescription: 'Delicious stone-baked pizzas at The Anchor Stanwell Moor. Authentic Italian recipes, fresh ingredients, eat in or takeaway. Best pizza near Heathrow.',
    heroContent: 'Experience authentic stone-baked pizzas at The Anchor, where traditional Italian methods meet fresh, quality ingredients in the heart of Stanwell Moor.',
    introContent: 'Our pizza menu is a slice of Italy in Stanwell Moor. Each pizza is hand-stretched and stone-baked to perfection, creating that perfect combination of crispy base and bubbling toppings. From the classic Rustic Classic to creative house specials like the Fully Loaded, we use only the finest ingredients including San Marzano tomatoes, fresh mozzarella, and locally-sourced toppings where possible.',
    valueProposition: 'Whether you\'re dining in our cozy restaurant or grabbing a takeaway, our pizzas are always made fresh to order. Try our pizza and drink deal for the perfect casual meal any night of the week.',
    keywords: ['pizza stanwell moor', 'stone baked pizza heathrow', 'italian restaurant surrey', 'best pizza TW19', 'pizza takeaway stanwell moor']
  },

  'beer': {
    name: 'Beer Selection',
    description: 'Craft and traditional beers',
    metaTitle: 'Craft Beer Pub Stanwell Moor | Real Ales at The Anchor',
    metaDescription: 'Discover craft beers & real ales at The Anchor Stanwell Moor. Local breweries, rotating guest beers, beer garden. Best beer selection near Heathrow.',
    heroContent: 'Beer lovers rejoice! The Anchor offers Stanwell Moor\'s finest selection of craft beers, real ales, and international favourites.',
    introContent: 'Our passion for great beer shows in every pint we pour. The Anchor\'s bar features carefully selected cask ales from local breweries, exciting craft beers from around the world, and all your favourite lagers perfectly chilled. Our rotating guest beers mean there\'s always something new to try, while beer enthusiasts appreciate our knowledgeable staff who can recommend the perfect pint.',
    valueProposition: 'Join us for a journey through the world of beer. Whether you prefer a traditional bitter, a hoppy IPA, or a smooth lager, we have the perfect beer waiting for you at The Anchor.',
    keywords: ['craft beer stanwell moor', 'real ale pub heathrow', 'beer garden surrey', 'best beer TW19', 'local brewery stanwell moor']
  },

  'tasting-events': {
    name: 'Tasting Events',
    description: 'Premium spirit and wine tasting experiences',
    metaTitle: 'Tasting Events Stanwell Moor | Wine & Spirit Tastings at The Anchor',
    metaDescription: 'Join exclusive tasting events at The Anchor Stanwell Moor. Wine, whisky, gin & rum tastings with experts. Book your tasting experience near Heathrow.',
    heroContent: 'Elevate your palate at The Anchor\'s exclusive tasting events. From fine wines to premium spirits, discover new favourites in Stanwell Moor.',
    introContent: 'Our regular tasting events have become a highlight for discerning drinkers in Stanwell Moor. Led by expert hosts, these intimate gatherings explore the world of wine, whisky, gin, rum, and other premium spirits. Each event includes carefully selected samples, expert commentary, tasting notes, and paired nibbles to enhance the experience.',
    valueProposition: 'Spaces are limited for our tasting events to ensure an intimate, educational experience. Book early to secure your place at our next tasting and expand your drinks knowledge in great company.',
    keywords: ['tasting events stanwell moor', 'wine tasting heathrow', 'whisky tasting surrey', 'gin tasting TW19', 'spirit events stanwell moor']
  },

  'fish-and-chips': {
    name: 'Fish & Chips',
    description: 'Traditional British fish and chips',
    metaTitle: 'Fish and Chips Stanwell Moor | Best Fish & Chips at The Anchor',
    metaDescription: 'Traditional fish & chips at The Anchor Stanwell Moor. Beer-battered cod, mushy peas, homemade tartar sauce. Classic British pub food near Heathrow.',
    heroContent: 'Enjoy the great British classic at The Anchor - our beer-battered fish and chips are the pride of Stanwell Moor.',
    introContent: 'Our fish and chips exemplify British pub food at its finest. We use sustainably sourced cod, hand-cut chips, and our signature beer batter recipe that creates the perfect golden, crispy coating. Served with mushy peas, homemade tartar sauce, and a wedge of lemon, it\'s a dish that brings comfort and satisfaction with every bite.',
    valueProposition: 'Available during kitchen hours, our fish and chips are a must-try. Join us for the authentic British pub experience.',
    keywords: ['fish and chips stanwell moor', 'best fish chips heathrow', 'british food surrey', 'cod and chips TW19', 'traditional fish chips']
  },

  'family-friendly': {
    name: 'Family Friendly',
    description: 'Events and spaces perfect for the whole family',
    metaTitle: 'Family Friendly Pub Stanwell Moor | Kids Welcome at The Anchor',
    metaDescription: 'Family pub in Stanwell Moor. Kids menu, high chairs, family events & spacious beer garden. Perfect for family dining near Heathrow Airport.',
    heroContent: 'The Anchor welcomes families with open arms. From our dedicated kids menu to family events, we\'re Stanwell Moor\'s favourite family-friendly pub.',
    introContent: 'We believe pubs should be places where families create memories together. The Anchor offers everything you need for a stress-free family meal - a dedicated children\'s menu with healthy options, high chairs and booster seats, colouring activities to keep little ones entertained, and a spacious beer garden perfect for summer days. Our staff are experienced in making families feel welcome and comfortable.',
    valueProposition: 'Make The Anchor your family\'s regular dining spot. With something for everyone, fair prices, and a warm welcome, we\'re the perfect choice for family gatherings in Stanwell Moor.',
    keywords: ['family friendly pub stanwell moor', 'kids menu heathrow', 'family dining surrey', 'children welcome TW19', 'family pub stanwell moor']
  },

  // Additional tags continue with same comprehensive structure...
  'offers': {
    name: 'Current Offers',
    description: 'Latest deals and promotions',
    metaTitle: 'Latest Pub Offers | The Anchor Stanwell Moor Deals & Promotions',
    metaDescription: 'Cheque out current offers at The Anchor Stanwell Moor. Daily deals, seasonal promotions & more. Save on food & drinks near Heathrow.',
    heroContent: 'Never miss a deal at The Anchor! Cheque out our latest offers and promotions designed to give you more value every visit.',
    introContent: 'We\'re always creating new ways to reward our customers. From daily deals to seasonal specials, our current offers include lunch meal deals, quiz night specials, and exclusive promotions for our regular guests. Follow us on social media to be first to know about flash deals and limited-time offers.',
    valueProposition: 'Why pay full price? Cheque our current offers before your visit and enjoy great food and drinks for less at The Anchor.',
    keywords: ['pub offers stanwell moor', 'current deals heathrow', 'promotions surrey pub', 'latest offers TW19', 'pub discounts stanwell moor']
  },

  'news': {
    name: 'Latest News',
    description: 'Updates and announcements from The Anchor',
    metaTitle: 'Pub News Stanwell Moor | Latest Updates from The Anchor',
    metaDescription: 'Stay updated with news from The Anchor Stanwell Moor. New menus, events, renovations & community updates. Your local pub near Heathrow.',
    heroContent: 'Stay connected with all the latest happenings at The Anchor. From new menu launches to upcoming events, we keep you in the know.',
    introContent: 'The Anchor is always evolving to serve our community better. Our news section keeps you updated on menu changes and new dishes, upcoming events and entertainment, pub improvements and renovations, community initiatives and charity work, and important announcements. We believe in keeping our customers informed about everything happening at their favourite local pub.',
    valueProposition: 'Bookmark this page and check back regularly for the latest news from The Anchor. Better yet, sign up for our newsletter to get updates delivered straight to your inbox.',
    keywords: ['pub news stanwell moor', 'anchor updates heathrow', 'local news surrey', 'pub announcements TW19', 'stanwell moor news']
  },

  'cocktails': {
    name: 'Cocktails',
    description: 'Signature cocktails and mixed drinks',
    metaTitle: 'Cocktails Stanwell Moor | Cocktail Bar at The Anchor Pub',
    metaDescription: 'Enjoy expertly crafted cocktails at The Anchor Stanwell Moor. Classic & signature cocktails. Best cocktail bar near Heathrow.',
    heroContent: 'Discover the art of mixology at The Anchor\'s cocktail bar. From timeless classics to innovative signatures, every cocktail is crafted with passion.',
    introContent: 'Our skilled bartenders bring creativity and expertise to every cocktail they create. Using premium spirits, fresh ingredients, and house-made syrups, we offer a cocktail menu that satisfies every taste. Whether you prefer a perfectly balanced Martini, a refreshing Mojito, or want to try one of our signature creations, each drink is made with care and presented beautifully.',
    valueProposition: 'Elevate your evening with cocktails at The Anchor. Discover your new favourite cocktail - expertly mixed and beautifully presented.',
    keywords: ['cocktails stanwell moor', 'cocktail bar heathrow', 'mixed drinks surrey', 'best cocktails TW19', 'signature cocktails']
  },

  'entertainment': {
    name: 'Entertainment',
    description: 'Live entertainment and performances',
    metaTitle: 'Pub Entertainment Stanwell Moor | Live Shows at The Anchor',
    metaDescription: 'Experience great entertainment at The Anchor Stanwell Moor. Quiz nights, drag shows, themed events & more. Your entertainment venue near Heathrow Airport.',
    heroContent: 'The Anchor is Stanwell Moor\'s premier entertainment destination. From quiz nights to drag shows, we bring the best entertainment to your local pub.',
    introContent: 'Entertainment is in our DNA at The Anchor. Our diverse programme ensures there\'s something for everyone - legendary quiz nights, spectacular drag performances with Nikki Manfadge, special themed events throughout the year, and unforgettable holiday celebrations. Our venue provides the perfect intimate setting where you\'re close to the action.',
    valueProposition: 'Cheque our entertainment calendar and book your table for an unforgettable night out. With shows throughout the week, The Anchor is where Stanwell Moor comes to be entertained.',
    keywords: ['pub entertainment stanwell moor', 'live shows heathrow', 'entertainment venue surrey', 'shows TW19', 'live entertainment']
  },

  'spirits': {
    name: 'Premium Spirits',
    description: 'Fine spirits and liquors',
    metaTitle: 'Premium Spirits Stanwell Moor | Whisky, Gin & Rum at The Anchor',
    metaDescription: 'Explore premium spirits at The Anchor Stanwell Moor. Extensive whisky, gin, rum & vodka selection. Spirit tastings available. Near Heathrow.',
    heroContent: 'Connoisseurs and casual drinkers alike will appreciate The Anchor\'s impressive collection of premium spirits from around the world.',
    introContent: 'Our back bar reads like a spirits enthusiast\'s wish list. We\'ve curated an exceptional selection including single malt whiskies from Scotland\'s finest distilleries, artisan gins from local and international producers, premium rums from the Caribbean and beyond, and small-batch vodkas and other spirits. Our knowledgeable staff can guide you through our collection and recommend the perfect serve.',
    valueProposition: 'Whether you\'re celebrating a special occasion or simply appreciating fine spirits, The Anchor offers the selection and expertise to make your experience memorable.',
    keywords: ['premium spirits stanwell moor', 'whisky bar heathrow', 'gin selection surrey', 'rum bar TW19', 'spirit collection']
  },

  'football': {
    name: 'Live Football',
    description: 'Major football tournaments and international matches',
    metaTitle: 'Watch Football Stanwell Moor | World Cup & Euros at The Anchor',
    metaDescription: 'Watch live football at The Anchor Stanwell Moor. World Cup, Euros & international matches on terrestrial TV. Sports pub near Heathrow.',
    heroContent: 'The Anchor is headquarters for football fans in Stanwell Moor during major tournaments. Watch the World Cup, Euros and more on our screens.',
    introContent: 'When major tournaments come around, The Anchor shows all the action on terrestrial TV. We screen the World Cup, European Championships, and other international fixtures available on free-to-air channels. The atmosphere during these tournaments is electric, with passionate fans creating an unforgettable experience.',
    valueProposition: 'Book your table for the next major tournament and enjoy cold beers, great food, and the best football atmosphere in Stanwell Moor during international competitions.',
    keywords: ['watch football stanwell moor', 'premier league pub heathrow', 'live football surrey', 'sports bar TW19', 'football pub stanwell moor']
  },

  'rugby': {
    name: 'Rugby Coverage',
    description: 'Six Nations and rugby matches',
    metaTitle: 'Watch Rugby Stanwell Moor | Six Nations at The Anchor Pub',
    metaDescription: 'Catch all rugby action at The Anchor Stanwell Moor. Six Nations, Premiership Rugby, international matches on big screens. Rugby pub near Heathrow.',
    heroContent: 'Rugby fans unite at The Anchor for major rugby matches on terrestrial TV. From Six Nations drama to World Cup glory shown on BBC and ITV.',
    introContent: 'The Anchor is proud to be Stanwell Moor\'s home of rugby. Our screens come alive during the Six Nations Championship, Autumn Internationals, and Rugby World Cup. The camaraderie among rugby fans creates a special atmosphere, whether you\'re supporting England or enjoying the spectacle of international rugby.',
    valueProposition: 'Join fellow rugby enthusiasts for the next big match. With great viewing, classic pub food, and proper pints, The Anchor delivers the complete rugby experience.',
    keywords: ['watch rugby stanwell moor', 'six nations pub heathrow', 'rugby bar surrey', 'sports pub TW19', 'rugby coverage stanwell moor']
  },

  'british-cuisine': {
    name: 'British Cuisine',
    description: 'Classic British pub food and traditional dishes',
    metaTitle: 'British Food Stanwell Moor | Traditional Pub Cuisine at The Anchor',
    metaDescription: 'Authentic British cuisine at The Anchor Stanwell Moor. Pie & mash, bangers & mash, ploughman\'s lunch & more classics. Best British food near Heathrow.',
    heroContent: 'Celebrate the best of British cuisine at The Anchor, where traditional recipes and quality ingredients create memorable dining experiences.',
    introContent: 'Our commitment to British cuisine runs deep. The Anchor\'s menu showcases the finest traditional dishes - from hearty steak and kidney pies to classic bangers and mash, shepherd\'s pie to ploughman\'s lunches. Each dish is prepared using time-honoured recipes and the best British ingredients, creating authentic flavours that remind you why British pub food is loved worldwide.',
    valueProposition: 'Experience true British hospitality and cuisine at The Anchor. Whether you\'re a local or visiting from abroad, our traditional menu offers a taste of authentic Britain.',
    keywords: ['british food stanwell moor', 'traditional pub food heathrow', 'british cuisine surrey', 'classic british TW19', 'english food stanwell moor']
  },

  'march': {
    name: 'March Events',
    description: 'Spring events and March activities',
    metaTitle: 'March Events Stanwell Moor | Spring at The Anchor Pub',
    metaDescription: 'March events at The Anchor Stanwell Moor. St Patrick\'s Day, Mother\'s Day, spring menu & special events. Plan your March visit near Heathrow.',
    heroContent: 'March brings spring excitement to The Anchor with special events, seasonal menus, and celebrations throughout the month.',
    introContent: 'As winter gives way to spring, March at The Anchor is filled with reasons to celebrate. St. Patrick\'s Day brings Irish festivities with Guinness, Irish music, and special menus. Mother\'s Day sees families gathering for our special lunch menu. Plus, our spring menu launches with fresh, seasonal ingredients making their appearance.',
    valueProposition: 'Don\'t miss out on March\'s special events - book early for St. Patrick\'s Day and Mother\'s Day to avoid disappointment.',
    keywords: ['march events stanwell moor', 'st patricks day heathrow', 'mothers day lunch surrey', 'spring events TW19', 'march activities']
  },

  'february': {
    name: 'February Events',
    description: 'Valentine\'s celebrations and winter warmth',
    metaTitle: 'February Events Stanwell Moor | Valentine\'s Day at The Anchor Pub',
    metaDescription: 'February at The Anchor Stanwell Moor. Valentine\'s dining, winter warmers, cozy atmosphere & special events. Romance & comfort near Heathrow.',
    heroContent: 'February at The Anchor combines romantic Valentine\'s celebrations with cozy winter comfort, creating the perfect escape from the cold in Stanwell Moor.',
    introContent: 'Love is in the air this February at The Anchor. Our special Valentine\'s menu offers romantic dining with candlelit tables and carefully crafted dishes for two. Beyond Valentine\'s Day, February sees us serving hearty winter warmers and maintaining our cozy fires that make the most of our warm, welcoming atmosphere during the coldest month.',
    valueProposition: 'Book your Valentine\'s table early or simply escape the February chill with friends over warming drinks and comfort food. The Anchor is your cozy retreat this winter.',
    keywords: ['february events stanwell moor', 'valentines day heathrow', 'winter pub surrey', 'february dining TW19', 'romantic restaurant stanwell moor']
  },

  'november': {
    name: 'November Events',
    description: 'Autumn celebrations and fireworks season',
    metaTitle: 'November Events Stanwell Moor | Bonfire Night at The Anchor Pub',
    metaDescription: 'November at The Anchor Stanwell Moor. Bonfire Night, autumn menu, cozy fires & warming drinks. Your local pub for November near Heathrow.',
    heroContent: 'November at The Anchor brings autumn at its finest - from Bonfire Night celebrations to cozy evenings by our fires with seasonal comfort food.',
    introContent: 'As autumn reaches its peak, November at The Anchor offers the warmest welcome in Stanwell Moor. Guy Fawkes Night sees special events and the best views of local fireworks from our beer garden. Our autumn menu features game dishes, hearty stews, and warming puddings. The pub\'s cozy interior, complete with roaring fires, provides the perfect escape from November\'s chill.',
    valueProposition: 'Make The Anchor your November headquarters for Bonfire Night celebrations, cozy dinners, and the best autumn atmosphere in Stanwell Moor.',
    keywords: ['november events stanwell moor', 'bonfire night heathrow', 'autumn pub surrey', 'november dining TW19', 'fireworks night stanwell moor']
  },

  'traditional': {
    name: 'Traditional Pub Experience',
    description: 'Authentic British pub traditions and heritage',
    metaTitle: 'Traditional Pub Stanwell Moor | Authentic British Pub The Anchor',
    metaDescription: 'Experience a traditional British pub at The Anchor Stanwell Moor. Real ales, classic pub food, warm hospitality. Authentic pub near Heathrow.',
    heroContent: 'Step into The Anchor and experience the timeless traditions of a proper British pub, where heritage meets heartfelt hospitality in Stanwell Moor.',
    introContent: 'The Anchor embodies everything that makes British pubs special. From our hand-pulled real ales to hearty traditional meals, from the warm welcome at the bar to the generations of locals who call this their second home, we maintain the traditions that have made the British pub a cultural institution. Our traditional approach means proper pints, honest food, genuine hospitality, and a place where everyone truly is welcome.',
    valueProposition: 'In a world of change, The Anchor remains proudly traditional. Experience authentic British pub culture where quality, tradition, and community come first.',
    keywords: ['traditional pub stanwell moor', 'authentic british pub heathrow', 'real pub surrey', 'traditional pub TW19', 'proper british pub']
  },

  'day-of-the-dead': {
    name: 'Day of the Dead Celebrations',
    description: 'Vibrant Día de los Muertos festivities',
    metaTitle: 'Day of the Dead Stanwell Moor | Día de los Muertos at The Anchor',
    metaDescription: 'Celebrate Day of the Dead at The Anchor Stanwell Moor. Mexican festivities, special menu, decorations & themed events. Unique celebration near Heathrow.',
    heroContent: 'Experience the colour and culture of Día de los Muertos at The Anchor, where Mexican traditions come alive in a spectacular celebration of life and memory.',
    introContent: 'The Anchor transforms for Day of the Dead with vibrant decorations, traditional altars, and a festive atmosphere that honours this beautiful Mexican tradition. Our special menu features authentic Mexican dishes and drinks, including specialty tequilas and mezcals. Face painting, traditional music, and themed entertainment create an immersive cultural experience that\'s become one of Stanwell Moor\'s most anticipated annual events.',
    valueProposition: 'Join us for a unique cultural celebration that combines Mexican traditions with British pub hospitality. Book early as this popular event fills up fast!',
    keywords: ['day of the dead stanwell moor', 'dia de los muertos heathrow', 'mexican celebration surrey', 'cultural event TW19', 'day of dead party']
  },

  'dining': {
    name: 'Dining Experience',
    description: 'Restaurant quality dining in a pub setting',
    metaTitle: 'Dining Stanwell Moor | Restaurant at The Anchor Pub Near Heathrow',
    metaDescription: 'Fine dining in a relaxed pub setting at The Anchor Stanwell Moor. Fresh ingredients, seasonal menus, dietary options. Restaurant 5 min from Heathrow.',
    heroContent: 'Elevate your dining experience at The Anchor, where pub charm meets restaurant quality in the heart of Stanwell Moor village.',
    introContent: 'Dining at The Anchor goes beyond typical pub grub. Our kitchen team creates dishes that rival any restaurant, using fresh, locally-sourced ingredients and modern cooking techniques while maintaining the relaxed, friendly atmosphere of a traditional pub. From business lunches to romantic dinners, family celebrations to casual catch-ups, our dining room provides the perfect setting for any occasion.',
    valueProposition: 'Reserve your table and discover why discerning diners choose The Anchor for quality dining without the formality. Great food, warm service, perfect atmosphere.',
    keywords: ['dining stanwell moor', 'restaurant near heathrow', 'pub dining surrey', 'eat out TW19', 'dinner stanwell moor']
  },

  'parties': {
    name: 'Party Venue',
    description: 'Private parties and celebrations',
    metaTitle: 'Party Venue Stanwell Moor | Private Parties at The Anchor Pub',
    metaDescription: 'Host your party at The Anchor Stanwell Moor. Birthday parties, celebrations, private events with in-house catering. Perfect venue 5 minutes from Heathrow.',
    heroContent: 'Make your celebration unforgettable at The Anchor, Stanwell Moor\'s premier party venue with flexible spaces and exceptional service.',
    introContent: 'The Anchor is the perfect venue for parties of all sizes and occasions. Our experienced team helps you create memorable celebrations, whether it\'s a milestone birthday, anniversary, engagement party, or any special occasion. We offer flexible spaces that can be configured for your needs, customised menus to suit your taste and budget, and dedicated staff to ensure everything runs smoothly.',
    valueProposition: 'Let us take the stress out of party planning. Contact our events team to discuss your requirements and discover why The Anchor is Stanwell Moor\'s favourite party venue.',
    keywords: ['party venue stanwell moor', 'private parties heathrow', 'celebration venue surrey', 'birthday party TW19', 'event space stanwell moor']
  },

  'festive': {
    name: 'Festive Celebrations',
    description: 'Seasonal festivities and holiday celebrations',
    metaTitle: 'Festive Events Stanwell Moor | Seasonal Celebrations at The Anchor',
    metaDescription: 'Festive celebrations at The Anchor Stanwell Moor. Christmas, New Year, seasonal events & special menus. Book your festive party near Heathrow.',
    heroContent: 'The Anchor sparkles with festive magic throughout the holiday season, creating unforgettable celebrations in the heart of Stanwell Moor.',
    introContent: 'When festive season arrives, The Anchor transforms into a wonderland of celebration. Twinkling lights, seasonal decorations, and a warm, jovial atmosphere set the stage for perfect festive gatherings. Our special festive menus feature all the seasonal favourites, while our bar offers warming winter cocktails, mulled wine, and festive spirits to keep the celebrations flowing.',
    valueProposition: 'Whether planning an office party, family gathering, or festive night out with friends, The Anchor delivers the perfect festive experience. Book early to secure your preferred dates.',
    keywords: ['festive events stanwell moor', 'christmas celebrations heathrow', 'seasonal party surrey', 'festive venue TW19', 'holiday events stanwell moor']
  },

  'environment': {
    name: 'Eco-Friendly Initiatives',
    description: 'Sustainability and environmental responsibility',
    metaTitle: 'Eco-Friendly Pub Stanwell Moor | Sustainable Dining at The Anchor',
    metaDescription: 'The Anchor Stanwell Moor\'s commitment to sustainability. Local sourcing, waste reduction, eco-friendly practices. Green pub near Heathrow.',
    heroContent: 'The Anchor leads by example in environmental responsibility, proving that great hospitality and sustainability go hand in hand in Stanwell Moor.',
    introContent: 'Our commitment to the environment shapes everything we do at The Anchor. From sourcing ingredients locally to reduce food miles, to comprehensive recycling and waste reduction programmes, we\'re constantly finding ways to minimize our environmental impact. Our beer garden features native plants that support local wildlife, while energy-efficient systems throughout the pub reduce our carbon footprint.',
    valueProposition: 'Choose The Anchor and support a business that cares about our planet\'s future. Enjoy great food and drinks knowing you\'re supporting sustainable hospitality.',
    keywords: ['eco friendly pub stanwell moor', 'sustainable restaurant heathrow', 'green pub surrey', 'environmental dining TW19', 'sustainable hospitality']
  },

  'craft-beer': {
    name: 'Craft Beer Selection',
    description: 'Curated craft beers from local and international breweries',
    metaTitle: 'Craft Beer Pub Stanwell Moor | Craft Beer Bar at The Anchor',
    metaDescription: 'Discover craft beers at The Anchor Stanwell Moor. Local microbreweries, international craft beers, beer tastings. Best selection near Heathrow.',
    heroContent: 'Explore the world of craft beer at The Anchor, where passionate brewing meets expert curation in Stanwell Moor\'s premier craft beer destination.',
    introContent: 'Our craft beer selection showcases the innovation and artistry of modern brewing. From hoppy IPAs to rich stouts, crisp lagers to complex sours, we feature rotating taps from local microbreweries and celebrated international craft producers. Our knowledgeable staff are always ready to guide you through our selection, offering tasting notes and pairing suggestions to enhance your experience.',
    valueProposition: 'Join our craft beer journey with regular tap takeovers, meet-the-brewer events, and exclusive launches. Follow us for updates on our ever-changing craft selection.',
    keywords: ['craft beer stanwell moor', 'craft beer bar heathrow', 'microbrewery beers surrey', 'craft ale TW19', 'beer selection stanwell moor']
  },

  'pet-friendly': {
    name: 'Pet-Friendly Venue',
    description: 'Welcoming pets and their owners',
    metaTitle: 'Pet Friendly Pub Stanwell Moor | Pets Welcome at The Anchor',
    metaDescription: 'The Anchor welcomes pets in Stanwell Moor. Dog-friendly bar & garden, water bowls, treats available. Perfect stop after walks near Heathrow.',
    heroContent: 'Bring your furry friends to The Anchor, where pets are welcomed as warmly as their owners in our pet-friendly spaces.',
    introContent: 'We believe pets are family, which is why The Anchor opens its doors to well-behaved pets in our bar areas and spacious beer garden. After exploring the beautiful walks around Stanwell Moor, stop by for refreshments - we provide fresh water bowls and keep treats behind the bar for our four-legged visitors. Our staff love meeting new pets and making them feel at home.',
    valueProposition: 'No need to leave your pet at home - bring them along for a truly inclusive pub experience where every member of the family is welcome.',
    keywords: ['pet friendly pub stanwell moor', 'dog friendly heathrow', 'pets welcome surrey', 'dog pub TW19', 'pet friendly venue']
  },

  'st-patricks-day': {
    name: 'St. Patrick\'s Day',
    description: 'Irish celebrations and St. Patrick\'s festivities',
    metaTitle: 'St Patrick\'s Day Stanwell Moor | Irish Celebration at The Anchor',
    metaDescription: 'Celebrate St Patrick\'s Day at The Anchor Stanwell Moor. Guinness, Irish music, special menu & festivities. Best Irish party near Heathrow.',
    heroContent: 'The Anchor goes green for St. Patrick\'s Day with the biggest Irish celebration in Stanwell Moor. Sláinte!',
    introContent: 'St. Patrick\'s Day at The Anchor is legendary. We transform into Stanwell Moor\'s own piece of Ireland with traditional Irish music filling the air, Guinness flowing freely, and Irish whiskeys taking center stage. Our special menu features Irish favourites from hearty stews to colcannon, while the atmosphere buzzes with Celtic energy and friendly craic that lasts well into the night.',
    valueProposition: 'Don\'t miss the best St. Patrick\'s Day party in the area - wear your green, bring your friends, and prepare for an unforgettable Irish celebration.',
    keywords: ['st patricks day stanwell moor', 'irish pub heathrow', 'paddys day surrey', 'irish celebration TW19', 'st patricks party']
  },

  'irish': {
    name: 'Irish Heritage',
    description: 'Irish drinks, food, and culture',
    metaTitle: 'Irish Pub Experience Stanwell Moor | Irish Heritage at The Anchor',
    metaDescription: 'Experience Irish hospitality at The Anchor Stanwell Moor. Guinness, Irish whiskey, traditional food & warm welcome. Irish pub near Heathrow.',
    heroContent: 'Experience the warmth of Irish hospitality at The Anchor, where Celtic traditions blend perfectly with British pub culture.',
    introContent: 'The Anchor celebrates Irish heritage year-round with our carefully curated selection of Irish drinks and dishes. Our bar features perfectly poured Guinness, an impressive range of Irish whiskeys from Jameson to rare single malts, and Irish craft beers. The kitchen serves up Irish classics when the mood strikes, from beef and Guinness pie to hearty Irish stew, all served with the famous Irish hospitality during kitchen hours.',
    valueProposition: 'Whether you\'re Irish, have Irish roots, or simply appreciate Irish culture, you\'ll find a warm Celtic welcome at The Anchor any day of the year.',
    keywords: ['irish pub stanwell moor', 'guinness near heathrow', 'irish bar surrey', 'celtic pub TW19', 'irish heritage stanwell moor']
  },

  'festive-menu': {
    name: 'Festive Menu',
    description: 'Special seasonal and holiday menus',
    metaTitle: 'Festive Menu Stanwell Moor | Christmas Menu at The Anchor Pub',
    metaDescription: 'Festive dining at The Anchor Stanwell Moor. Christmas menu, seasonal dishes, party bookings available. Reserve your festive meal near Heathrow.',
    heroContent: 'Indulge in our spectacular festive menu at The Anchor, where traditional favourites meet creative seasonal dishes in a celebration of flavour.',
    introContent: 'Our festive menu is the culmination of months of planning and preparation. Each dish celebrates the season\'s finest ingredients - from perfectly roasted turkeys with all the trimmings to innovative vegetarian and vegan festive options. Rich Christmas puddings, mince pies, and seasonal desserts provide the perfect ending, while our festive drinks menu features warming mulled wine and seasonal cocktails.',
    valueProposition: 'Make your festive dining memorable with our carefully crafted menu. Available for parties of all sizes - book early as spaces fill quickly during the festive season.',
    keywords: ['festive menu stanwell moor', 'christmas dinner heathrow', 'seasonal menu surrey', 'holiday dining TW19', 'xmas menu stanwell moor']
  },

  'december': {
    name: 'December Events',
    description: 'Christmas season and year-end celebrations',
    metaTitle: 'December Events Stanwell Moor | Christmas at The Anchor Pub',
    metaDescription: 'December at The Anchor Stanwell Moor. Christmas parties, New Year\'s Eve, festive events & seasonal atmosphere. Book December events near Heathrow.',
    heroContent: 'December at The Anchor is pure magic - from twinkling Christmas lights to New Year\'s Eve celebrations, it\'s the most wonderful time of the year.',
    introContent: 'The festive spirit takes over The Anchor throughout December. Our pub becomes a Christmas wonderland with decorations and the scent of mulled wine filling the air. Office parties, family gatherings, and friends\'s reunions fill our calendar, while Christmas Eve brings the community together for festive drinks. New Year\'s Eve caps off the month with our spectacular countdown party featuring a special DJ.',
    valueProposition: 'December books up fast at The Anchor - secure your Christmas party dates and New Year\'s Eve tickets early to avoid disappointment.',
    keywords: ['december events stanwell moor', 'christmas parties heathrow', 'new years eve surrey', 'december dining TW19', 'xmas events stanwell moor']
  },

  'family-dining': {
    name: 'Family Dining',
    description: 'Family meals and kid-friendly dining',
    metaTitle: 'Family Dining Stanwell Moor | Family Restaurant at The Anchor',
    metaDescription: 'Family-friendly dining at The Anchor Stanwell Moor. Kids menu, high chairs, family meals & Sunday lunch. Perfect for families near Heathrow.',
    heroContent: 'The Anchor welcomes families with dedicated menus, comfortable spaces, and warm hospitality that makes dining out with children a pleasure.',
    introContent: 'Family dining at The Anchor is designed to be stress-free and enjoyable for all ages. Our children\'s menu offers healthy, tasty options alongside kid favourites, all at family-friendly prices. High chairs, colouring materials, and patient staff ensure parents can relax while children are entertained. Our spacious layout provides room for pushchairs, and our beer garden offers safe outdoor space for little ones to explore.',
    valueProposition: 'Make The Anchor your family\'s regular dining destination. With something for everyone and a genuine welcome for children, we\'re where family memories are made.',
    keywords: ['family dining stanwell moor', 'kids restaurant heathrow', 'family meals surrey', 'children dining TW19', 'family restaurant stanwell moor']
  },

  'market': {
    name: 'Market Events',
    description: 'Local markets and artisan showcases',
    metaTitle: 'Market Events Stanwell Moor | Artisan Markets at The Anchor',
    metaDescription: 'Discover market events at The Anchor Stanwell Moor. Local producers, artisan goods, seasonal markets. Community marketplace near Heathrow.',
    heroContent: 'The Anchor hosts vibrant market events that bring together local artisans, producers, and the community in celebration of local enterprise.',
    introContent: 'Our market events transform The Anchor\'s spaces into bustling marketplaces showcasing the best of local talent. From artisan food producers to handmade crafts, seasonal produce to unique gifts, our markets support local businesses while offering our community access to exceptional local products. The pub provides the perfect backdrop with refreshments available throughout the day.',
    valueProposition: 'Support local businesses and discover unique products at our regular market events. Cheque our calendar for upcoming markets and special themed events.',
    keywords: ['market events stanwell moor', 'artisan market heathrow', 'local market surrey', 'community market TW19', 'producers market stanwell moor']
  },

  'mexican': {
    name: 'Mexican Cuisine',
    description: 'Authentic Mexican food and drinks',
    metaTitle: 'Mexican Food Stanwell Moor | Mexican Night at The Anchor Pub',
    metaDescription: 'Enjoy Mexican cuisine at The Anchor Stanwell Moor. Tacos, tequila, Mexican beers & themed nights. Best Mexican food near Heathrow.',
    heroContent: 'Spice up your dining at The Anchor with our Mexican offerings - from sizzling fajitas to premium tequilas, we bring Mexican flavours to Stanwell Moor.',
    introContent: 'The Anchor\'s Mexican menu items and themed nights transport you south of the border without leaving Stanwell Moor. Our kitchen prepares authentic Mexican dishes using traditional spices and fresh ingredients, while our bar stocks premium tequilas, mezcals, and Mexican beers. Regular Mexican nights feature special menus, themed music, and a fiesta atmosphere that\'s become a local favourite.',
    valueProposition: 'Join us for Taco Tuesday or our monthly Mexican nights for an authentic taste of Mexico paired with our famous British hospitality.',
    keywords: ['mexican food stanwell moor', 'mexican restaurant heathrow', 'tacos surrey', 'mexican night TW19', 'tequila bar stanwell moor']
  },

  'april': {
    name: 'April Events',
    description: 'Spring celebrations and Easter festivities',
    metaTitle: 'April Events Stanwell Moor | Spring at The Anchor Pub',
    metaDescription: 'April events at The Anchor Stanwell Moor. Easter celebrations, spring menu, outdoor dining begins. Perfect for April visits near Heathrow.',
    heroContent: 'April at The Anchor blooms with spring energy - from Easter celebrations to the opening of our beer garden season, it\'s a month of renewal.',
    introContent: 'Spring truly arrives at The Anchor in April. Our beer garden comes alive with the first warm days, Easter brings family celebrations and egg hunts, and our spring menu showcases the season\'s freshest ingredients. April also marks the return of outdoor dining and drinking, with longer evenings perfect for after-work gatherings and weekend relaxation.',
    valueProposition: 'Don\'t miss the start of beer garden season - join us for al fresco dining and drinks as Stanwell Moor embraces spring at The Anchor.',
    keywords: ['april events stanwell moor', 'spring pub heathrow', 'easter events surrey', 'april dining TW19', 'spring celebrations stanwell moor']
  },

  'premier-league': {
    name: 'Football Coverage',
    description: 'Major football tournaments and cup finals',
    metaTitle: 'Football Pub Stanwell Moor | Watch Major Tournaments at The Anchor',
    metaDescription: 'Watch football at The Anchor Stanwell Moor. FA Cup finals, World Cup, Euros shown on terrestrial TV. Best football pub near Heathrow.',
    heroContent: 'The Anchor shows major football tournaments and cup finals available on terrestrial television - join us for the biggest matches.',
    introContent: 'When Premier League matches are shown on terrestrial television, The Anchor is the place to watch. Major cup finals and international tournaments featuring Premier League stars are shown on our screens. The atmosphere during these free-to-air matches is fantastic, with passionate fans creating a great matchday experience.',
    valueProposition: 'Book your table for the next televised cup final or international tournament and experience football the way it should be watched - with great beer, good food, and passionate fans.',
    keywords: ['premier league pub stanwell moor', 'watch football heathrow', 'football bar surrey', 'premier league TW19', 'match day pub stanwell moor']
  },

  'valentines': {
    name: 'Valentine\'s Day',
    description: 'Romantic dining and Valentine\'s celebrations',
    metaTitle: 'Valentine\'s Day Stanwell Moor | Romantic Dining at The Anchor',
    metaDescription: 'Valentine\'s dinner at The Anchor Stanwell Moor. Romantic atmosphere, special menu, candlelit dining. Book your Valentine\'s table near Heathrow.',
    heroContent: 'Romance blooms at The Anchor this Valentine\'s Day with intimate dining, special menus, and an atmosphere perfect for celebrating love.',
    introContent: 'Valentine\'s Day at The Anchor sets the scene for romance. Candlelit tables, rose petals, and soft music create an intimate atmosphere, while our special Valentine\'s menu features dishes designed for sharing and indulgence. From champagne on arrival to decadent desserts for two, every detail is crafted to make your Valentine\'s celebration unforgettable.',
    valueProposition: 'Book early to secure your Valentine\'s table - our romantic setting and special menu make The Anchor Stanwell Moor\'s most sought-after Valentine\'s destination.',
    keywords: ['valentines day stanwell moor', 'romantic restaurant heathrow', 'valentines dinner surrey', 'date night TW19', 'romantic dining stanwell moor']
  },

  'wednesday': {
    name: 'Wednesday Specials',
    description: 'Midweek events and Wednesday activities',
    metaTitle: 'Wednesday at The Anchor Stanwell Moor | Midweek Specials',
    metaDescription: 'Wednesdays at The Anchor Stanwell Moor. Midweek specials, hump day offers. Best Wednesday night out near Heathrow.',
    heroContent: 'Make Wednesday wonderful at The Anchor with special offers and the perfect midweek atmosphere.',
    introContent: 'Wednesday at The Anchor offers the perfect midweek break. When our monthly quiz falls on a Wednesday, it draws teams from across Stanwell Moor for an evening of trivia, laughter, and friendly competition starting at 7pm. The midweek energy is infectious, making hump day something to look forward to.',
    valueProposition: 'Beat the midweek blues at The Anchor - whether it\'s quiz night or just a regular Wednesday, we\'re here with great food, drinks, and atmosphere.',
    keywords: ['wednesday stanwell moor', 'midweek specials heathrow', 'wednesday night surrey', 'midweek TW19', 'hump day stanwell moor']
  },

  'seasonal': {
    name: 'Seasonal Offerings',
    description: 'Seasonal menus, drinks, and celebrations',
    metaTitle: 'Seasonal Menu Stanwell Moor | Seasonal Events at The Anchor',
    metaDescription: 'Discover seasonal offerings at The Anchor Stanwell Moor. Seasonal menus, drinks, events throughout the year. Fresh flavours near Heathrow.',
    heroContent: 'The Anchor celebrates every season with special menus, events, and atmospheres that capture the best of each time of year.',
    introContent: 'Our commitment to seasonality means The Anchor constantly evolves throughout the year. Spring brings fresh, light dishes and garden reopening. Summer sees BBQs and long evenings in the beer garden. Autumn introduces hearty comfort foods and harvest celebrations. Winter warms with rich stews and cozy fires. Our drinks menu follows suit with seasonal cocktails, beers, and wines.',
    valueProposition: 'Experience The Anchor in every season - each visit brings new flavours, fresh experiences, and reasons to celebrate the time of year.',
    keywords: ['seasonal menu stanwell moor', 'seasonal pub heathrow', 'seasonal dining surrey', 'seasonal events TW19', 'seasonal offerings stanwell moor']
  },

  'new-arrival': {
    name: 'New Arrivals',
    description: 'Latest additions to our menu and offerings',
    metaTitle: 'New Menu Items Stanwell Moor | Latest at The Anchor Pub',
    metaDescription: 'Discover new arrivals at The Anchor Stanwell Moor. New menu items, drinks, latest offerings & innovations. Try something new near Heathrow.',
    heroContent: 'The Anchor constantly innovates with new arrivals - from exciting menu additions to fresh drinks, there\'s always something new to discover.',
    introContent: 'Innovation keeps The Anchor fresh and exciting. Our chefs regularly introduce new dishes inspired by seasonal ingredients and culinary trends. The bar features new craft beers, spirits, and cocktails as we discover exceptional products. We also launch new events and entertainment based on customer feedback and emerging trends, ensuring there\'s always a reason to return and try something different.',
    valueProposition: 'Be first to try our latest offerings - follow us on social media for announcements and exclusive previews of new arrivals at The Anchor.',
    keywords: ['new menu stanwell moor', 'latest offerings heathrow', 'new dishes surrey', 'new arrivals TW19', 'menu updates stanwell moor']
  },

  'guide': {
    name: 'Local Guide',
    description: 'Your guide to The Anchor and Stanwell Moor',
    metaTitle: 'Pub Guide Stanwell Moor | Visitor Guide to The Anchor',
    metaDescription: 'Complete guide to The Anchor Stanwell Moor. Opening hours, directions, menu highlights, events calendar. Everything you need near Heathrow.',
    heroContent: 'Your comprehensive guide to making the most of The Anchor - from first-time visitors to regular guests, everything you need to know.',
    introContent: 'This guide helps you navigate everything The Anchor offers. Learn about our various spaces from the cozy main bar to the spacious beer garden. Understand our menu highlights and daily specials. Get tips on the best times to visit for different experiences. Discover our regular events and how to book for special occasions. We want every visit to be perfect, and this guide ensures you never miss out.',
    valueProposition: 'Bookmark this guide and refer back whenever you plan a visit - with insider tips and comprehensive information, you\'ll always make the most of The Anchor.',
    keywords: ['pub guide stanwell moor', 'anchor guide heathrow', 'visitor guide surrey', 'pub information TW19', 'stanwell moor guide']
  },

  'womens-day': {
    name: 'International Women\'s Day',
    description: 'Celebrating women and women\'s achievements',
    metaTitle: 'Women\'s Day Stanwell Moor | Celebrations at The Anchor Pub',
    metaDescription: 'International Women\'s Day at The Anchor Stanwell Moor. Special events, ladies nights, celebrating women. Join our Women\'s Day events near Heathrow.',
    heroContent: 'The Anchor proudly celebrates International Women\'s Day and women\'s achievements throughout the year with special events and recognition.',
    introContent: 'International Women\'s Day sees The Anchor hosting special celebrations honouring women\'s achievements and contributions. From featuring women-owned suppliers and breweries to hosting inspirational speakers and networking events, we create spaces for celebration and connection. Our regular ladies\' nights and women-focused events throughout the year continue this commitment to inclusivity and recognition.',
    valueProposition: 'Join us in celebrating women - whether for International Women\'s Day or our regular women-focused events, The Anchor provides a welcoming, supportive environment.',
    keywords: ['womens day stanwell moor', 'ladies night heathrow', 'womens events surrey', 'IWD TW19', 'womens celebration stanwell moor']
  },

  'celebration': {
    name: 'Celebrations',
    description: 'Special occasions and milestone celebrations',
    metaTitle: 'Celebrations Stanwell Moor | Celebrate at The Anchor Pub',
    metaDescription: 'Celebrate special occasions at The Anchor Stanwell Moor. Birthdays, anniversaries, achievements & more. Perfect celebration venue near Heathrow.',
    heroContent: 'Every celebration finds its perfect home at The Anchor, where special occasions become unforgettable memories in Stanwell Moor.',
    introContent: 'The Anchor has been the backdrop for countless celebrations - birthdays that span generations, anniversaries marked with champagne toasts, achievements honoured among friends, and life\'s milestones celebrated in style. Our team excels at making every celebration special, whether it\'s an intimate gathering or a large party. We handle the details so you can focus on enjoying your special moment.',
    valueProposition: 'Trust The Anchor with your next celebration - our experience, flexibility, and dedication ensure your special occasion is everything you dreamed and more.',
    keywords: ['celebrations stanwell moor', 'special occasions heathrow', 'milestone venue surrey', 'celebrate TW19', 'party venue stanwell moor']
  },

  'weekly-specials': {
    name: 'Weekly Specials',
    description: 'Regular weekly deals and offers',
    metaTitle: 'Weekly Specials Stanwell Moor | Daily Deals at The Anchor',
    metaDescription: 'Weekly specials at The Anchor Stanwell Moor. Monday to Sunday deals, food offers. Best pub deals every day near Heathrow.',
    heroContent: 'Save every day of the week with The Anchor\'s weekly specials - from Monday deals to Sunday offers, there\'s always a reason to visit.',
    introContent: 'Our weekly specials calendar means there\'s never a bad time to visit The Anchor. Monday\'s lunch deals ease you into the week. Tuesday\'s specials make midweek manageable. Our monthly quiz nights bring excitement. Thursday\'s dinner deals. Weekend specials make Saturday and Sunday even more special. Each day brings its own opportunity to enjoy great value.',
    valueProposition: 'Plan your week around our specials - with different offers every day, you can enjoy The Anchor\'s quality at exceptional value throughout the week.',
    keywords: ['weekly specials stanwell moor', 'daily deals heathrow', 'pub offers surrey', 'weekly deals TW19', 'daily specials stanwell moor']
  },

  'charity': {
    name: 'Charity Events',
    description: 'Fundraising and community support initiatives',
    metaTitle: 'Charity Events Stanwell Moor | Fundraising at The Anchor Pub',
    metaDescription: 'Support charity at The Anchor Stanwell Moor. Fundraising events, charity nights, community support. Making a difference near Heathrow.',
    heroContent: 'The Anchor believes in giving back - join our regular charity events and help make a difference in Stanwell Moor and beyond.',
    introContent: 'Community support is central to The Anchor\'s values. Our regular charity events have raised thousands for local and national causes. From quiz nights where proceeds go to charity, to sponsored challenges and charity auctions, we provide a platform for the community to come together for good causes. Our customers\' generosity never fails to impress, making every charity event a success.',
    valueProposition: 'Support great causes while enjoying great times - check our calendar for upcoming charity events and be part of The Anchor\'s commitment to giving back.',
    keywords: ['charity events stanwell moor', 'fundraising pub heathrow', 'charity night surrey', 'community support TW19', 'charity fundraiser stanwell moor']
  },

  'local-area': {
    name: 'Local Area',
    description: 'Discover Stanwell Moor and surroundings',
    metaTitle: 'Local Area Guide Stanwell Moor | The Anchor\'s Neighbourhood',
    metaDescription: 'Explore Stanwell Moor local area around The Anchor. Nearby attractions, walks, transport links. Your guide to the area near Heathrow.',
    heroContent: 'The Anchor sits at the heart of Stanwell Moor - discover our vibrant local area and everything it has to offer visitors and residents.',
    introContent: 'Stanwell Moor\'s location offers the perfect blend of village charm and accessibility. Just minutes from Heathrow yet maintaining its rural character, our area provides beautiful walks along the River Colne, easy access to Windsor and London, historic sites and local attractions, and a genuine community atmosphere. The Anchor serves as the perfect base for exploring everything our local area offers.',
    valueProposition: 'Make The Anchor your starting point for discovering Stanwell Moor and beyond - we\'re always happy to share local knowledge and recommendations.',
    keywords: ['local area stanwell moor', 'things to do heathrow', 'stanwell moor attractions', 'local guide TW19', 'area information stanwell moor']
  },

  'mental-health': {
    name: 'Mental Health Awareness',
    description: 'Supporting mental health and wellbeing',
    metaTitle: 'Mental Health Support Stanwell Moor | Wellbeing at The Anchor',
    metaDescription: 'The Anchor Stanwell Moor supports mental health awareness. Safe space, community support, wellbeing initiatives. Mental health matters near Heathrow.',
    heroContent: 'The Anchor champions mental health awareness, providing a supportive space where wellbeing matters and conversations flow as freely as our drinks.',
    introContent: 'Mental health is everyone\'s business, and The Anchor takes our role seriously. We provide a judgment-free environment where people can connect and combat isolation. Our staff are trained in mental health awareness, ready to listen and signpost support. We host events supporting mental health charities and awareness campaigns. The traditional pub setting offers natural opportunities for social connection - often the best medicine.',
    valueProposition: 'Whether you need a friendly chat, a break from routine, or just a welcoming space, The Anchor is here. Together, we\'re breaking down mental health stigma.',
    keywords: ['mental health stanwell moor', 'wellbeing pub heathrow', 'mental health support surrey', 'community wellbeing TW19', 'mental health awareness']
  },

  'awareness': {
    name: 'Awareness Campaigns',
    description: 'Supporting important causes and awareness initiatives',
    metaTitle: 'Awareness Events Stanwell Moor | Community Causes at The Anchor',
    metaDescription: 'The Anchor Stanwell Moor supports awareness campaigns. Health awareness, social causes, community initiatives. Making a difference near Heathrow.',
    heroContent: 'The Anchor stands behind important awareness campaigns, using our platform to educate, support, and make a positive difference in our community.',
    introContent: 'Throughout the year, The Anchor supports various awareness campaigns that matter to our community. From health awareness months to social justice initiatives, environmental campaigns to local issues, we provide space for education and discussion. Our events raise both awareness and funds, while our platform helps amplify important messages that might otherwise go unheard in our busy world.',
    valueProposition: 'Join us in supporting causes that matter - The Anchor proves that pubs can be forces for positive change in their communities.',
    keywords: ['awareness campaigns stanwell moor', 'community causes heathrow', 'social awareness surrey', 'support campaigns TW19', 'awareness events stanwell moor']
  },

  'corporate': {
    name: 'Corporate Events',
    description: 'Business meetings and corporate functions',
    metaTitle: 'Corporate Events Stanwell Moor | Business Venue at The Anchor',
    metaDescription: 'Host corporate events at The Anchor Stanwell Moor. Business meetings, team building, corporate parties. Professional venue 5 min from Heathrow.',
    heroContent: 'The Anchor provides the perfect blend of professional service and relaxed atmosphere for successful corporate events near Heathrow Airport.',
    introContent: 'Business and pleasure meet perfectly at The Anchor. Our flexible spaces accommodate everything from informal team meetings to formal corporate functions. Located minutes from Heathrow, we\'re ideal for international colleagues. We offer private areas for confidential discussions, AV equipment for presentations, customised in-house catering menus, and dedicated event coordination. Our relaxed pub atmosphere helps break down barriers and encourage productive relationships.',
    valueProposition: 'Choose The Anchor for corporate events that achieve results while everyone enjoys themselves. Contact our events team to discuss your business requirements.',
    keywords: ['corporate events stanwell moor', 'business venue heathrow', 'corporate functions surrey', 'team events TW19', 'business meetings stanwell moor']
  },

  'mexican-culture': {
    name: 'Mexican Culture',
    description: 'Celebrating Mexican heritage and traditions',
    metaTitle: 'Mexican Culture Stanwell Moor | Mexican Heritage at The Anchor',
    metaDescription: 'Experience Mexican culture at The Anchor Stanwell Moor. Traditional celebrations, authentic food, cultural events. Mexican heritage near Heathrow.',
    heroContent: 'The Anchor celebrates the rich tapestry of Mexican culture through authentic food, traditional celebrations, and vibrant events throughout the year.',
    introContent: 'Our celebration of Mexican culture goes beyond just food and drinks. The Anchor hosts authentic cultural events including Day of the Dead celebrations, Cinco de Mayo festivities, traditional music nights, and educational cultural experiences. We work with local Mexican communities to ensure authenticity while creating inclusive events that welcome everyone to experience and appreciate Mexican heritage.',
    valueProposition: 'Immerse yourself in Mexican culture without leaving Stanwell Moor - The Anchor brings authentic experiences that educate, entertain, and unite our diverse community.',
    keywords: ['mexican culture stanwell moor', 'cultural events heathrow', 'mexican heritage surrey', 'cultural celebration TW19', 'mexican traditions stanwell moor']
  },

  'september': {
    name: 'September Events',
    description: 'Autumn beginnings and September activities',
    metaTitle: 'September Events Stanwell Moor | Autumn at The Anchor Pub',
    metaDescription: 'September at The Anchor Stanwell Moor. Autumn menu launch, harvest celebrations, cozy atmosphere returns. Welcome autumn near Heathrow.',
    heroContent: 'September at The Anchor marks the beautiful transition to autumn with harvest celebrations, seasonal menus, and the return of cozy pub nights.',
    introContent: 'As summer fades into autumn, September at The Anchor brings its own special charm. Our autumn menu launches featuring seasonal produce and warming dishes. The beer garden enjoys those last sunny days while inside becomes cozy again with fires lit on cooler evenings. Harvest celebrations and wine events mark the season\'s change, while the return of darker evenings makes our pub atmosphere even more inviting.',
    valueProposition: 'Experience the magic of September at The Anchor - where summer memories blend with autumn anticipation in the perfect seasonal transition.',
    keywords: ['september events stanwell moor', 'autumn pub heathrow', 'september dining surrey', 'harvest events TW19', 'september activities stanwell moor']
  }
}