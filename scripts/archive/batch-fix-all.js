#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { globby: glob } = require('globby');

console.log('🚀 Running batch fix for all British English issues...\n');

async function fixAll() {
  let totalFixed = 0;
  
  // Get all relevant files
  const files = await glob([
    '**/*.{ts,tsx,js,jsx}',
    '!node_modules/**',
    '!.next/**',
    '!scripts/**'
  ]);
  
  console.log(`Found ${files.length} files to check...\n`);
  
  // Technical terms that must use American spelling
  const fixes = {
    // CSS classes
    'text-centre': 'text-center',
    'items-centre': 'items-center',
    'justify-centre': 'justify-center',
    'mx-centre': 'mx-auto',
    'self-centre': 'self-center',
    
    // Component props
    'optimised': 'optimized',
    'customised': 'customized',
    'organised': 'organized',
    'recognised': 'recognized',
    
    // API and technical terms
    'authorise': 'authorize',
    'authorisation': 'authorization',
    'colour(?!\\s*:)': 'color', // Avoid breaking "colour:" in content
    'serialise': 'serialize',
    'initialise': 'initialize',
    'optimise': 'optimize',
    'organise': 'organize',
    'analyse': 'analyze',
    'normalise': 'normalize',
    'visualise': 'visualize',
    'synchronise': 'synchronize',
    'minimise': 'minimize',
    'maximise': 'maximize',
    
    // Alignment values
    "'centre'": "'center'",
    '"centre"': '"center"',
    'alignment: "centre"': 'alignment: "center"',
    "alignment: 'centre'": "alignment: 'center'",
    
    // Style properties
    'textAlign: "centre"': 'textAlign: "center"',
    "textAlign: 'centre'": "textAlign: 'center'",
    'alignItems: "centre"': 'alignItems: "center"',
    "alignItems: 'centre'": "alignItems: 'center'",
    'justifyContent: "centre"': 'justifyContent: "center"',
    "justifyContent: 'centre'": "justifyContent: 'center'"
  };
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let originalContent = content;
      
      // Skip content files (blog posts)
      if (file.includes('/content/') && file.endsWith('.md')) {
        continue;
      }
      
      // Apply all fixes
      Object.entries(fixes).forEach(([pattern, replacement]) => {
        const regex = new RegExp(pattern, 'g');
        content = content.replace(regex, replacement);
      });
      
      // Special case for alignment type
      content = content.replace(/alignment\?\s*:\s*'left'\s*\|\s*'centre'\s*\|\s*'right'/g, 
                               "alignment?: 'left' | 'center' | 'right'");
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`✅ Fixed: ${file}`);
        totalFixed++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}: ${err.message}`);
    }
  }
  
  console.log(`\n✨ Batch fix complete! Fixed ${totalFixed} files.`);
  console.log('\nYour site should now work properly with:');
  console.log('  - CSS classes using American spelling (for Tailwind)');
  console.log('  - API/technical terms using American spelling');
  console.log('  - Content text preserving British spelling where appropriate');
}

fixAll().catch(console.error);