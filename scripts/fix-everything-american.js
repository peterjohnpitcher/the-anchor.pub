#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { globby } = require('globby');

console.log('🚀 Fixing ALL code to use American English...\n');
console.log('This will fix APIs, CSS, components, and all technical code.');
console.log('User-visible content will be handled separately.\n');

async function fixEverything() {
  let totalFixed = 0;
  
  // Get all code files (excluding markdown content)
  const files = await globby([
    '**/*.{ts,tsx,js,jsx,json}',
    '!node_modules/**',
    '!.next/**',
    '!package-lock.json',
    '!content/**/*.md'  // Exclude blog content
  ]);
  
  console.log(`Found ${files.length} files to check...\n`);
  
  // Comprehensive American English fixes
  const fixes = {
    // API endpoint fixes
    'cheque-availability': 'check-availability',
    'cheque availability': 'check availability',
    'Cheque availability': 'Check availability',
    'cheque': 'check',
    'Cheque': 'Check',
    
    // CSS classes
    'text-centre': 'text-center',
    'items-centre': 'items-center',
    'justify-centre': 'justify-center',
    'mx-centre': 'mx-auto',
    'self-centre': 'self-center',
    'place-items-centre': 'place-items-center',
    'place-content-centre': 'place-content-center',
    'object-centre': 'object-center',
    
    // Component props and values
    "'centre'": "'center'",
    '"centre"': '"center"',
    ': centre': ': center',
    '= centre': '= center',
    'optimised': 'optimized',
    'customised': 'customized',
    'organised': 'organized',
    'recognised': 'recognized',
    'realised': 'realized',
    'specialised': 'specialized',
    'normalised': 'normalized',
    'centralised': 'centralized',
    'visualised': 'visualized',
    'analysed': 'analyzed',
    'standardised': 'standardized',
    'personalised': 'personalized',
    'categorised': 'categorized',
    'prioritised': 'prioritized',
    
    // API and technical terms
    'authorise': 'authorize',
    'authorisation': 'authorization',
    'Authorisation': 'Authorization',
    'unauthorised': 'unauthorized',
    'Unauthorised': 'Unauthorized',
    'colour': 'color',
    'Colour': 'Color',
    'colours': 'colors',
    'Colours': 'Colors',
    'multicoloured': 'multicolored',
    'behaviour': 'behavior',
    'Behaviour': 'Behavior',
    'behaviours': 'behaviors',
    'serialise': 'serialize',
    'deserialise': 'deserialize',
    'initialise': 'initialize',
    'initialisation': 'initialization',
    'optimise': 'optimize',
    'optimisation': 'optimization',
    'organise': 'organize',
    'organisation': 'organization',
    'Organisation': 'Organization',
    'analyse': 'analyze',
    'analyser': 'analyzer',
    'normalise': 'normalize',
    'normalisation': 'normalization',
    'visualise': 'visualize',
    'visualisation': 'visualization',
    'synchronise': 'synchronize',
    'synchronisation': 'synchronization',
    'minimise': 'minimize',
    'maximise': 'maximize',
    'summarise': 'summarize',
    'emphasise': 'emphasize',
    'specialise': 'specialize',
    'generalise': 'generalize',
    'centralise': 'centralize',
    'decentralise': 'decentralize',
    'standardise': 'standardize',
    'categorise': 'categorize',
    'prioritise': 'prioritize',
    'favourite': 'favorite',
    'Favourite': 'Favorite',
    'favourites': 'favorites',
    'flavour': 'flavor',
    'flavours': 'flavors',
    'honour': 'honor',
    'honours': 'honors',
    'neighbour': 'neighbor',
    'neighbours': 'neighbors',
    'labour': 'labor',
    'labours': 'labors',
    'humour': 'humor',
    'rumour': 'rumor',
    'rumours': 'rumors',
    'saviour': 'savior',
    'saviours': 'saviors',
    'endeavour': 'endeavor',
    'endeavours': 'endeavors',
    'harbour': 'harbor',
    'harbours': 'harbors',
    'armour': 'armor',
    'odour': 'odor',
    'odours': 'odors',
    'parlour': 'parlor',
    'vapour': 'vapor',
    'vapours': 'vapors',
    'vigour': 'vigor',
    'rigour': 'rigor',
    'glamour': 'glamor',
    'clamour': 'clamor',
    'rancour': 'rancor',
    'splendour': 'splendor',
    'candour': 'candor',
    'theatre': 'theater',
    'Theatre': 'Theater',
    'metre': 'meter',
    'metres': 'meters',
    'centimetre': 'centimeter',
    'centimetres': 'centimeters',
    'kilometre': 'kilometer',
    'kilometres': 'kilometers',
    'litre': 'liter',
    'litres': 'liters',
    'fibre': 'fiber',
    'fibres': 'fibers',
    'sombre': 'somber',
    'spectre': 'specter',
    'spectres': 'specters',
    'calibre': 'caliber',
    'manoeuvre': 'maneuver',
    'manoeuvres': 'maneuvers',
    'defence': 'defense',
    'Defence': 'Defense',
    'offence': 'offense',
    'Offence': 'Offense',
    'pretence': 'pretense',
    'licence': 'license',
    'Licence': 'License',
    'practise': 'practice',
    'gray': 'gray',
    'gray': 'Gray',
    'draught': 'draft',
    'draughts': 'drafts',
    'plough': 'plow',
    'ploughs': 'plows',
    'mould': 'mold',
    'moulds': 'molds',
    'smoulder': 'smolder',
    'smoulders': 'smolders',
    'fulfil': 'fulfill',
    'fulfilment': 'fulfillment',
    'instalment': 'installment',
    'instalments': 'installments',
    'enrolment': 'enrollment',
    'enrol': 'enroll',
    'distil': 'distill',
    'instil': 'instill',
    'skilful': 'skillful',
    'wilful': 'willful',
    'travelling': 'traveling',
    'travelled': 'traveled',
    'traveller': 'traveler',
    'travellers': 'travelers',
    'modelling': 'modeling',
    'modelled': 'modeled',
    'labelling': 'labeling',
    'labelled': 'labeled',
    'cancelling': 'canceling',
    'cancelled': 'canceled',
    'channelling': 'channeling',
    'channelled': 'channeled',
    'counselling': 'counseling',
    'counselled': 'counseled',
    'counsellor': 'counselor',
    'fuelling': 'fueling',
    'fuelled': 'fueled',
    'jewellery': 'jewelry',
    'pyjamas': 'pajamas',
    'tyre': 'tire',
    'tyres': 'tires',
    'kerb': 'curb',
    'kerbs': 'curbs',
    'maths': 'math',
    'aluminium': 'aluminum',
    'whilst': 'while',
    'amongst': 'among',
    'learnt': 'learned',
    'burnt': 'burned',
    'dreamt': 'dreamed',
    'spelt': 'spelled',
    'spoilt': 'spoiled',
    'programme': 'program',
    'programmes': 'programs',
    'dialogue': 'dialog',
    'dialogues': 'dialogs',
    'catalogue': 'catalog',
    'catalogues': 'catalogs',
    'analogue': 'analog',
    'epilogue': 'epilog',
    'monologue': 'monolog',
    'prologue': 'prolog',
    'synagogue': 'synagog',
    'cheque': 'check',
    'cheques': 'checks',
    'chequebook': 'checkbook',
    'chequebooks': 'checkbooks',
    'paycheque': 'paycheck',
    'paycheques': 'paychecks'
  };
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let originalContent = content;
      
      // Apply all fixes
      Object.entries(fixes).forEach(([british, american]) => {
        // Use word boundaries for most replacements
        const regex = new RegExp(`\\b${british}\\b`, 'g');
        content = content.replace(regex, american);
      });
      
      // Fix specific patterns that might not have word boundaries
      content = content.replace(/text-centre/g, 'text-center');
      content = content.replace(/items-centre/g, 'items-center');
      content = content.replace(/justify-centre/g, 'justify-center');
      content = content.replace(/self-centre/g, 'self-center');
      content = content.replace(/place-items-centre/g, 'place-items-center');
      content = content.replace(/place-content-centre/g, 'place-content-center');
      content = content.replace(/object-centre/g, 'object-center');
      
      // Fix alignment type definitions
      content = content.replace(/alignment\?\s*:\s*'left'\s*\|\s*'centre'\s*\|\s*'right'/g, 
                               "alignment?: 'left' | 'center' | 'right'");
      
      // Fix style properties
      content = content.replace(/textAlign:\s*['"]centre['"]/g, "textAlign: 'center'");
      content = content.replace(/alignItems:\s*['"]centre['"]/g, "alignItems: 'center'");
      content = content.replace(/justifyContent:\s*['"]centre['"]/g, "justifyContent: 'center'");
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`✅ Fixed: ${file}`);
        totalFixed++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}: ${err.message}`);
    }
  }
  
  console.log(`\n✨ Complete! Fixed ${totalFixed} files.`);
  console.log('\n📝 Next steps:');
  console.log('1. Test your APIs to ensure they work correctly');
  console.log('2. Create a separate script to handle British English in user-visible content only');
  console.log('3. Consider adding ESLint rules to enforce American English in code');
}

fixEverything().catch(console.error);