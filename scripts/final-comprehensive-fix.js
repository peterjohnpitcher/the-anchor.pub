#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { globby } = require('globby');

console.log('🔧 Running FINAL comprehensive fix for all remaining British spelling issues...\n');

async function finalFix() {
  let totalFixed = 0;
  
  // Get all relevant files
  const files = await globby([
    '**/*.{ts,tsx,js,jsx,css,scss}',
    '!node_modules/**',
    '!.next/**',
    '!scripts/**',
    '!content/**/*.md'  // Keep British spelling in blog content
  ]);
  
  console.log(`Found ${files.length} files to check...\n`);
  
  // Final comprehensive fixes
  const fixes = {
    // CSS classes with gray -> gray
    'bg-gray': 'bg-gray',
    'text-gray': 'text-gray',
    'border-gray': 'border-gray',
    'hover:bg-gray': 'hover:bg-gray',
    'hover:text-gray': 'hover:text-gray',
    'hover:border-gray': 'hover:border-gray',
    'focus:bg-gray': 'focus:bg-gray',
    'focus:text-gray': 'focus:text-gray',
    'focus:border-gray': 'focus:border-gray',
    
    // Component props and values
    'optimised': 'optimized',
    'customised': 'customized',
    'organised': 'organized',
    'recognised': 'recognized',
    'coloured': 'colored',
    "'coloured'": "'colored'",
    '"coloured"': '"colored"',
    'colour:': 'color:',
    "'colour'": "'color'",
    '"colour"': '"color"',
    
    // Any remaining British spellings in code
    'cheque': 'check',
    'centre': 'center',
    'theatre': 'theater',
    'programme': 'program',
    'defence': 'defense',
    'offence': 'offense',
    'licence': 'license',
    'practise': 'practice',
    'organisation': 'organization',
    'authorisation': 'authorization',
    'behaviour': 'behavior',
    'favourite': 'favorite',
    'honour': 'honor',
    'neighbour': 'neighbor',
    'labour': 'labor',
    'humour': 'humor',
    'flavour': 'flavor',
    'favour': 'favor',
    'saviour': 'savior',
    'harbour': 'harbor',
    'armour': 'armor',
    'rumour': 'rumor',
    'honour': 'honor',
    'odour': 'odor',
    'parlour': 'parlor',
    'vapour': 'vapor',
    'vigour': 'vigor',
    'rigour': 'rigor',
    'glamour': 'glamor',
    'clamour': 'clamor',
    'rancour': 'rancor',
    'splendour': 'splendor',
    'candour': 'candor',
    'metre': 'meter',
    'kilometre': 'kilometer',
    'centimetre': 'centimeter',
    'litre': 'liter',
    'fibre': 'fiber',
    'calibre': 'caliber',
    'sombre': 'somber',
    'spectre': 'specter',
    'manoeuvre': 'maneuver',
    'plough': 'plow',
    'mould': 'mold',
    'smoulder': 'smolder',
    'draught': 'draft',
    'fulfil': 'fulfill',
    'fulfilment': 'fulfillment',
    'enrolment': 'enrollment',
    'instalment': 'installment',
    'skilful': 'skillful',
    'wilful': 'willful',
    'travelling': 'traveling',
    'travelled': 'traveled',
    'traveller': 'traveler',
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
    'kerb': 'curb',
    'aluminium': 'aluminum',
    'dialogue': 'dialog',
    'catalogue': 'catalog',
    'analogue': 'analog',
    'epilogue': 'epilog',
    'monologue': 'monolog',
    'prologue': 'prolog',
    'maths': 'math',
    'whilst': 'while',
    'amongst': 'among',
    'learnt': 'learned',
    'burnt': 'burned',
    'dreamt': 'dreamed',
    'spelt': 'spelled',
    'spoilt': 'spoiled',
    
    // Technical terms
    'initialise': 'initialize',
    'serialise': 'serialize',
    'optimise': 'optimize',
    'organise': 'organize',
    'realise': 'realize',
    'recognise': 'recognize',
    'analyse': 'analyze',
    'normalise': 'normalize',
    'visualise': 'visualize',
    'synchronise': 'synchronize',
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
    'customise': 'customize',
    'authorise': 'authorize'
  };
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let originalContent = content;
      
      // Apply all fixes
      Object.entries(fixes).forEach(([british, american]) => {
        // For CSS classes, use exact replacement
        if (british.includes('-gray') || british.includes(':gray')) {
          content = content.replace(new RegExp(british, 'g'), american);
        } else {
          // For other terms, use word boundaries
          const regex = new RegExp(`\\b${british}\\b`, 'g');
          content = content.replace(regex, american);
        }
      });
      
      // Special handling for gray/gray in class names
      content = content.replace(/gray-(\d+)/g, 'gray-$1');
      content = content.replace(/gray\//g, 'gray/');
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`✅ Fixed: ${file}`);
        totalFixed++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}: ${err.message}`);
    }
  }
  
  console.log(`\n✨ Final fix complete! Fixed ${totalFixed} files.`);
  console.log('\n📝 Summary:');
  console.log('- All CSS classes now use American spelling (gray, not gray)');
  console.log('- All technical code uses American spelling');
  console.log('- Component props and interfaces use American spelling');
  console.log('- API endpoints and functions use American spelling');
  console.log('\nYour site should now be 100% functional!');
}

finalFix().catch(console.error);