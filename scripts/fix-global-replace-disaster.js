#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { globby } = require('globby');

console.log('🚨 EMERGENCY FIX: Repairing global replace damage...\n');

async function fixDisaster() {
  let totalFixed = 0;
  
  // Get ALL files
  const files = await globby([
    '**/*.{ts,tsx,js,jsx,css,scss,json,md}',
    '!node_modules/**',
    '!.next/**',
    '!.git/**'
  ]);
  
  console.log(`Found ${files.length} files to check and fix...\n`);
  
  // Critical fixes needed
  const fixes = [
    // Fix "cheque" back to "check" (except in British content about actual cheques)
    { pattern: /\bcheque\b/g, replacement: 'check' },
    { pattern: /\bCheque\b/g, replacement: 'Check' },
    { pattern: /\bcheques\b/g, replacement: 'checks' },
    { pattern: /\bCheques\b/g, replacement: 'Checks' },
    { pattern: /\bchequing\b/g, replacement: 'checking' },
    { pattern: /\bChequing\b/g, replacement: 'Checking' },
    
    // Fix CSS transition-colours back to transition-colors
    { pattern: /transition-colours/g, replacement: 'transition-colors' },
    { pattern: /hover:colours/g, replacement: 'hover:colors' },
    { pattern: /text-colours/g, replacement: 'text-colors' },
    { pattern: /bg-colours/g, replacement: 'bg-colors' },
    { pattern: /border-colours/g, replacement: 'border-colors' },
    
    // Fix Organisation back to Organization in schemas
    { pattern: /"@type":\s*"Organisation"/g, replacement: '"@type": "Organization"' },
    { pattern: /'@type':\s*'Organisation'/g, replacement: "'@type': 'Organization'" },
    
    // Ensure gray CSS classes are correct (not grey)
    { pattern: /\btext-grey-/g, replacement: 'text-gray-' },
    { pattern: /\bbg-grey-/g, replacement: 'bg-gray-' },
    { pattern: /\bborder-grey-/g, replacement: 'border-gray-' },
    { pattern: /\bring-grey-/g, replacement: 'ring-gray-' },
    { pattern: /\bplaceholder-grey-/g, replacement: 'placeholder-gray-' },
    { pattern: /\bdivide-grey-/g, replacement: 'divide-gray-' },
    { pattern: /\bfrom-grey-/g, replacement: 'from-gray-' },
    { pattern: /\bto-grey-/g, replacement: 'to-gray-' },
    { pattern: /\bvia-grey-/g, replacement: 'via-gray-' },
    
    // Fix hover/focus states
    { pattern: /hover:text-grey-/g, replacement: 'hover:text-gray-' },
    { pattern: /hover:bg-grey-/g, replacement: 'hover:bg-gray-' },
    { pattern: /hover:border-grey-/g, replacement: 'hover:border-gray-' },
    { pattern: /focus:text-grey-/g, replacement: 'focus:text-gray-' },
    { pattern: /focus:bg-grey-/g, replacement: 'focus:bg-gray-' },
    { pattern: /focus:border-grey-/g, replacement: 'focus:border-gray-' },
    { pattern: /active:bg-grey-/g, replacement: 'active:bg-gray-' },
    { pattern: /disabled:text-grey-/g, replacement: 'disabled:text-gray-' },
    { pattern: /disabled:bg-grey-/g, replacement: 'disabled:bg-gray-' },
    
    // Fix responsive variants
    { pattern: /sm:text-grey-/g, replacement: 'sm:text-gray-' },
    { pattern: /sm:bg-grey-/g, replacement: 'sm:bg-gray-' },
    { pattern: /md:text-grey-/g, replacement: 'md:text-gray-' },
    { pattern: /md:bg-grey-/g, replacement: 'md:bg-gray-' },
    { pattern: /lg:text-grey-/g, replacement: 'lg:text-gray-' },
    { pattern: /lg:bg-grey-/g, replacement: 'lg:bg-gray-' },
    { pattern: /xl:text-grey-/g, replacement: 'xl:text-gray-' },
    { pattern: /xl:bg-grey-/g, replacement: 'xl:bg-gray-' },
    
    // Fix dark mode
    { pattern: /dark:text-grey-/g, replacement: 'dark:text-gray-' },
    { pattern: /dark:bg-grey-/g, replacement: 'dark:bg-gray-' },
    { pattern: /dark:border-grey-/g, replacement: 'dark:border-gray-' },
    
    // Fix group states
    { pattern: /group-hover:text-grey-/g, replacement: 'group-hover:text-gray-' },
    { pattern: /group-hover:bg-grey-/g, replacement: 'group-hover:bg-gray-' }
  ];
  
  // Special handling for content that should keep British spelling
  const contentExceptions = [
    'pay by cheque', // This is about actual cheques/checks for payment
    'cheque book',
    'bank cheque'
  ];
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let originalContent = content;
      let changed = false;
      
      // Apply fixes
      fixes.forEach(fix => {
        if (content.match(fix.pattern)) {
          content = content.replace(fix.pattern, fix.replacement);
          changed = true;
        }
      });
      
      // Special handling for actual payment cheques in content
      if (file.includes('/content/') || file.includes('.md')) {
        // Restore British spelling for actual cheques (payment method)
        content = content.replace(/pay by check/g, 'pay by cheque');
        content = content.replace(/Pay by check/g, 'Pay by cheque');
        content = content.replace(/bank check/g, 'bank cheque');
        content = content.replace(/checkbook/g, 'chequebook');
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`✅ Fixed: ${file}`);
        totalFixed++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}: ${err.message}`);
    }
  }
  
  console.log(`\n✨ Emergency fix complete! Fixed ${totalFixed} files.`);
  console.log('\n📋 What was fixed:');
  console.log('- "cheque" → "check" (except for payment cheques)');
  console.log('- "Organisation" → "Organization" in schemas');
  console.log('- CSS classes using gray (not grey)');
  console.log('- transition-colours → transition-colors');
  console.log('\n⚠️  Please run your tests to ensure everything works!');
}

fixDisaster().catch(console.error);