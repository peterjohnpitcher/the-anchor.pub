#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { globby: glob } = require('globby');

// American to British spelling mappings
const spellingMap = {
  // -ize to -ise
  'organize': 'organise',
  'organizing': 'organising',
  'organized': 'organised',
  'organization': 'organisation',
  'organizational': 'organisational',
  'customize': 'customise',
  'customizing': 'customising',
  'customized': 'customised',
  'customization': 'customisation',
  'personalize': 'personalise',
  'personalizing': 'personalising',
  'personalized': 'personalised',
  'personalization': 'personalisation',
  'optimize': 'optimise',
  'optimizing': 'optimising',
  'optimized': 'optimised',
  'optimization': 'optimisation',
  'maximize': 'maximise',
  'maximizing': 'maximising',
  'maximized': 'maximised',
  'recognize': 'recognise',
  'recognizing': 'recognising',
  'recognized': 'recognised',
  'specialize': 'specialise',
  'specializing': 'specialising',
  'specialized': 'specialised',
  'realize': 'realise',
  'realizing': 'realising',
  'realized': 'realised',
  'prioritize': 'prioritise',
  'prioritizing': 'prioritising',
  'prioritized': 'prioritised',
  'categorize': 'categorise',
  'categorizing': 'categorising',
  'categorized': 'categorised',
  'summarize': 'summarise',
  'summarizing': 'summarising',
  'summarized': 'summarised',
  
  // -or to -our
  'color': 'colour',
  'colors': 'colours',
  'colored': 'coloured',
  'coloring': 'colouring',
  'colorful': 'colourful',
  'flavor': 'flavour',
  'flavors': 'flavours',
  'flavored': 'flavoured',
  'flavorful': 'flavourful',
  'honor': 'honour',
  'honors': 'honours',
  'honored': 'honoured',
  'honoring': 'honouring',
  'humor': 'humour',
  'humorous': 'humorous', // stays the same
  'neighbor': 'neighbour',
  'neighbors': 'neighbours',
  'neighborhood': 'neighbourhood',
  'neighboring': 'neighbouring',
  'behavior': 'behaviour',
  'behaviors': 'behaviours',
  'behavioral': 'behavioural',
  'favorite': 'favourite',
  'favorites': 'favourites',
  'favorited': 'favourited',
  'labor': 'labour',
  'laboring': 'labouring',
  'labored': 'laboured',
  
  // -er to -re
  'center': 'centre',
  'centers': 'centres',
  'centered': 'centred',
  'centering': 'centring',
  'theater': 'theatre',
  'theaters': 'theatres',
  'fiber': 'fibre',
  'fibers': 'fibres',
  'meter': 'metre',
  'meters': 'metres',
  'kilometer': 'kilometre',
  'kilometers': 'kilometres',
  'liter': 'litre',
  'liters': 'litres',
  
  // Other common differences
  'program': 'programme',
  'programs': 'programmes',
  'programming': 'programming', // stays the same for computing
  'programmed': 'programmed',
  'check': 'cheque', // only for payment context
  'checks': 'cheques',
  'airplane': 'aeroplane',
  'airplanes': 'aeroplanes',
  'defense': 'defence',
  'defensive': 'defensive',
  'offense': 'offence',
  'offensive': 'offensive',
  'license': 'licence', // noun
  'licenses': 'licences',
  'licensed': 'licensed', // verb stays the same
  'practice': 'practise', // verb - need context
  'practicing': 'practising',
  'practiced': 'practised',
  'gray': 'gray',
  'grays': 'grays',
  'grayed': 'grayed',
  'mom': 'mum',
  'aluminum': 'aluminium',
  'jewelry': 'jewellery',
  'draft': 'draught', // for beer context
  'drafts': 'draughts',
  'plow': 'plough',
  'plowed': 'ploughed',
  'tire': 'tyre',
  'tires': 'tyres',
  'curb': 'kerb',
  'curbs': 'kerbs',
  'donut': 'doughnut',
  'donuts': 'doughnuts'
};

// Patterns to exclude (don't change these)
const excludePatterns = [
  /className\s*=\s*["'][^"']*color[^"']*["']/gi, // CSS classes
  /style\s*=\s*{[^}]*color[^}]*}/gi, // Inline styles
  /backgroundColor/gi,
  /textColor/gi,
  /borderColor/gi,
  /\.color/gi, // Property access
  /color:/gi, // CSS property
  /Color\(/gi, // Function names
  /import.*color/gi, // Import statements
  /from.*color/gi, // Import sources
  /\.optimize/gi, // Method names
  /optimize\(/gi, // Function calls
  /organized\s+crime/gi, // Keep as "organized crime"
  /check\s+(?:box|mark|list|point)/gi, // Keep "check" in these contexts
  /practice\s+(?:nurse|doctor|law)/gi, // Keep "practice" as noun in these contexts
];

// File patterns to search
const filePatterns = [
  'app/**/*.{tsx,ts}',
  'components/**/*.{tsx,ts}',
  'lib/**/*.{tsx,ts}',
  'content/**/*.md',
  '*.md',
  '!node_modules/**',
  '!.next/**',
  '!out/**',
  '!coverage/**',
  '!*.min.js',
  '!package-lock.json'
];

async function findAndReplace() {
  console.log('🔍 Searching for American English spellings...\n');
  
  const files = await glob(filePatterns);
  const changes = [];
  let totalChanges = 0;

  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf8');
      const originalContent = content;
      const fileChanges = [];

      // Check each spelling
      for (const [american, british] of Object.entries(spellingMap)) {
        // Create regex for whole word matching (case-insensitive for searching)
        const regex = new RegExp(`\\b${american}\\b`, 'gi');
        
        // Find all matches first
        const matches = [...content.matchAll(regex)];
        
        for (const match of matches) {
          const matchIndex = match.index;
          const matchedText = match[0];
          
          // Check if this match should be excluded
          let shouldExclude = false;
          const lineStart = content.lastIndexOf('\n', matchIndex) + 1;
          const lineEnd = content.indexOf('\n', matchIndex);
          const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);
          
          for (const excludePattern of excludePatterns) {
            if (excludePattern.test(line)) {
              shouldExclude = true;
              break;
            }
          }
          
          if (!shouldExclude) {
            // Preserve the original case
            let replacement = british;
            if (matchedText[0] === matchedText[0].toUpperCase()) {
              replacement = british.charAt(0).toUpperCase() + british.slice(1);
            }
            if (matchedText === matchedText.toUpperCase()) {
              replacement = british.toUpperCase();
            }
            
            fileChanges.push({
              american: matchedText,
              british: replacement,
              line: line.trim(),
              lineNumber: content.substring(0, matchIndex).split('\n').length
            });
          }
        }
      }

      // Apply replacements
      if (fileChanges.length > 0) {
        for (const change of fileChanges) {
          const regex = new RegExp(`\\b${change.american}\\b`, 'g');
          content = content.replace(regex, (match) => {
            // Only replace if not in an excluded context
            const index = content.indexOf(match);
            const lineStart = content.lastIndexOf('\n', index) + 1;
            const lineEnd = content.indexOf('\n', index);
            const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);
            
            for (const excludePattern of excludePatterns) {
              if (excludePattern.test(line)) {
                return match;
              }
            }
            return change.british;
          });
        }

        if (content !== originalContent) {
          await fs.writeFile(file, content, 'utf8');
          changes.push({ file, changes: fileChanges });
          totalChanges += fileChanges.length;
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Print results
  if (changes.length > 0) {
    console.log(`✅ Found and fixed ${totalChanges} American spellings in ${changes.length} files:\n`);
    
    for (const { file, changes: fileChanges } of changes) {
      console.log(`\n📄 ${file}:`);
      for (const change of fileChanges) {
        console.log(`   Line ${change.lineNumber}: ${change.american} → ${change.british}`);
        console.log(`   Context: "${change.line.substring(0, 80)}${change.line.length > 80 ? '...' : ''}"`);
      }
    }
  } else {
    console.log('✨ No American spellings found. Your content is already in British English!');
  }

  console.log('\n📋 Summary:');
  console.log(`   Files scanned: ${files.length}`);
  console.log(`   Files changed: ${changes.length}`);
  console.log(`   Total corrections: ${totalChanges}`);
}

// Run the script
findAndReplace().catch(console.error);