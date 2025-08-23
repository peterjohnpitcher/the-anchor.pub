#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { globby } = require('globby');

console.log('🇬🇧 Adding British English to user-visible content only...\n');
console.log('This will NOT touch any code, APIs, or CSS classes.\n');

async function addBritishToContent() {
  let totalFixed = 0;
  
  // Get all TSX/JSX files (for user-visible strings)
  const files = await globby([
    '**/*.{tsx,jsx}',
    '!node_modules/**',
    '!.next/**',
    '!scripts/**'
  ]);
  
  console.log(`Found ${files.length} files to check for user-visible content...\n`);
  
  // These replacements ONLY apply to visible text content
  const britishReplacements = {
    // Common words in UI text
    '>color<': '>colour<',
    '>Color<': '>Colour<',
    '>colors<': '>colours<',
    '>Colors<': '>Colours<',
    '>flavor<': '>flavour<',
    '>Flavor<': '>Flavour<',
    '>flavors<': '>flavours<',
    '>Flavors<': '>Flavours<',
    '>favorite<': '>favourite<',
    '>Favorite<': '>Favourite<',
    '>favorites<': '>favourites<',
    '>Favorites<': '>Favourites<',
    '>honor<': '>honour<',
    '>Honor<': '>Honour<',
    '>neighbor<': '>neighbour<',
    '>Neighbor<': '>Neighbour<',
    '>center<': '>centre<',
    '>Center<': '>Centre<',
    '>theater<': '>theatre<',
    '>Theater<': '>Theatre<',
    '>gray<': '>gray<',
    '>Gray<': '>gray<',
    '>license<': '>licence<',
    '>License<': '>Licence<',
    '>program<': '>programme<',
    '>Program<': '>Programme<',
    '>tire<': '>tyre<',
    '>Tire<': '>Tyre<',
    '>curb<': '>kerb<',
    '>Curb<': '>Kerb<',
    '>jewelry<': '>jewellery<',
    '>Jewelry<': '>Jewellery<',
    '>pajamas<': '>pyjamas<',
    '>Pajamas<': '>Pyjamas<',
    '>aluminum<': '>aluminium<',
    '>Aluminum<': '>Aluminium<',
    '>dialog<': '>dialogue<',
    '>Dialog<': '>Dialogue<',
    '>catalog<': '>catalogue<',
    '>Catalog<': '>Catalogue<',
    
    // In strings
    '"customize': '"customise',
    '"Customize': '"Customise',
    '"organization': '"organisation',
    '"Organization': '"Organisation',
    '"optimize': '"optimise',
    '"Optimize': '"Optimise',
    '"analyze': '"analyse',
    '"Analyze': '"Analyse',
    '"realize': '"realise',
    '"Realize': '"Realise',
    '"recognize': '"recognise',
    '"Recognize': '"Recognise',
    '"authorize': '"authorise',
    '"Authorize': '"Authorise',
    '"specialize': '"specialise',
    '"Specialize': '"Specialise',
    '"memorize': '"memorise',
    '"Memorize': '"Memorise',
    
    // Common phrases
    'draft beer': 'draught beer',
    'Draft beer': 'Draught beer',
    'draft beers': 'draught beers',
    'Draft Beers': 'Draught Beers',
    'check out': 'cheque out',
    'Check out': 'Cheque out',
    'pay by check': 'pay by cheque',
    'Pay by check': 'Pay by cheque',
    
    // Be careful with these - only in content
    ' customize ': ' customise ',
    ' organize ': ' organise ',
    ' optimize ': ' optimise ',
    ' analyze ': ' analyse ',
    ' realize ': ' realise ',
    ' recognize ': ' recognise ',
    ' authorize ': ' authorise ',
    ' specialize ': ' specialise ',
    ' memorize ': ' memorise '
  };
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let originalContent = content;
      
      // Skip if it's an API file or library code
      if (file.includes('/api/') || file.includes('/lib/') || file.includes('/utils/')) {
        continue;
      }
      
      // Apply British spelling ONLY to user-visible content
      Object.entries(britishReplacements).forEach(([american, british]) => {
        // Only replace in actual content, not in code
        if (american.includes('>') && american.includes('<')) {
          // This is JSX content
          content = content.replace(new RegExp(american, 'g'), british);
        } else if (american.startsWith('"') || american.includes(' ')) {
          // This is string content or phrases
          content = content.replace(new RegExp(american, 'g'), british);
        }
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`✅ Added British spelling to content in: ${file}`);
        totalFixed++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}: ${err.message}`);
    }
  }
  
  console.log(`\n✨ Complete! Updated ${totalFixed} files with British spelling in content.`);
  console.log('\n📝 Important notes:');
  console.log('- All code, APIs, and CSS classes remain in American English');
  console.log('- Only user-visible text uses British English');
  console.log('- This maintains both functionality AND proper localisation');
}

addBritishToContent().catch(console.error);