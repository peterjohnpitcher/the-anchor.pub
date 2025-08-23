#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// CSS classes that need to be reverted to American spelling
const cssClassFixMap = {
  'centre': 'center',
  'Centre': 'Center',
  'capitalise': 'capitalize',
  'Capitalise': 'Capitalize'
};

// Function to fix CSS classes in a string
function fixCSSClasses(content) {
  let fixed = content;
  let changeCount = 0;
  
  // Fix className attributes
  fixed = fixed.replace(/className=(["'`])([^"'`]*)(["'`])/g, (match, quote1, classes, quote2) => {
    let fixedClasses = classes;
    let classChanged = false;
    
    // Fix each CSS spelling error
    for (const [british, american] of Object.entries(cssClassFixMap)) {
      // Match whole words only to avoid partial replacements
      const regex = new RegExp(`\\b${british}\\b`, 'g');
      if (regex.test(fixedClasses)) {
        fixedClasses = fixedClasses.replace(regex, american);
        classChanged = true;
      }
    }
    
    if (classChanged) {
      changeCount++;
    }
    
    return `className=${quote1}${fixedClasses}${quote2}`;
  });
  
  // Fix class attributes in HTML
  fixed = fixed.replace(/class=(["'`])([^"'`]*)(["'`])/g, (match, quote1, classes, quote2) => {
    let fixedClasses = classes;
    let classChanged = false;
    
    for (const [british, american] of Object.entries(cssClassFixMap)) {
      const regex = new RegExp(`\\b${british}\\b`, 'g');
      if (regex.test(fixedClasses)) {
        fixedClasses = fixedClasses.replace(regex, american);
        classChanged = true;
      }
    }
    
    if (classChanged) {
      changeCount++;
    }
    
    return `class=${quote1}${fixedClasses}${quote2}`;
  });
  
  // Fix Tailwind classes in template literals
  fixed = fixed.replace(/\$\{[^}]*\}/g, (match) => {
    let fixedMatch = match;
    for (const [british, american] of Object.entries(cssClassFixMap)) {
      const regex = new RegExp(`\\b${british}\\b`, 'g');
      fixedMatch = fixedMatch.replace(regex, american);
    }
    return fixedMatch;
  });
  
  // Fix common Tailwind utility classes
  const tailwindClasses = [
    'text-centre', 'items-centre', 'justify-centre', 'place-items-centre',
    'place-content-centre', 'content-centre', 'self-centre', 'mx-centre'
  ];
  
  tailwindClasses.forEach(britishClass => {
    const americanClass = britishClass.replace('centre', 'center');
    const regex = new RegExp(`\\b${britishClass}\\b`, 'g');
    if (regex.test(fixed)) {
      fixed = fixed.replace(regex, americanClass);
      changeCount++;
    }
  });
  
  return { fixed, changeCount };
}

// Process files
function processFiles() {
  // File patterns to process
  const patterns = [
    'app/**/*.{tsx,ts,jsx,js}',
    'components/**/*.{tsx,ts,jsx,js}',
    'lib/**/*.{tsx,ts,jsx,js}',
    'styles/**/*.css'
  ];
  
  let totalFiles = 0;
  let totalChanges = 0;
  const processedFiles = [];
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const { fixed, changeCount } = fixCSSClasses(content);
      
      if (changeCount > 0) {
        fs.writeFileSync(file, fixed, 'utf8');
        processedFiles.push({ file, changeCount });
        totalChanges += changeCount;
      }
      
      totalFiles++;
    });
  });
  
  // Summary
  console.log('\n🔧 CSS Class Fix Complete!\n');
  console.log(`📁 Files scanned: ${totalFiles}`);
  console.log(`✏️  Files fixed: ${processedFiles.length}`);
  console.log(`🔄 Total CSS classes fixed: ${totalChanges}\n`);
  
  if (processedFiles.length > 0) {
    console.log('Files with CSS fixes:');
    processedFiles.forEach(({ file, changeCount }) => {
      console.log(`  - ${file} (${changeCount} fixes)`);
    });
  }
  
  console.log('\n✅ Your site styling should now work correctly!');
  console.log('   CSS classes use American spelling (required by Tailwind)');
  console.log('   Content text remains in British English');
}

// Run the script
console.log('🚀 Fixing CSS class names...\n');
processFiles();