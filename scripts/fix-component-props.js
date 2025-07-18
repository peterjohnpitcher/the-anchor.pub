#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix British spelling in component props and interfaces
function fixComponentProps(content) {
  let fixed = content;
  let changeCount = 0;
  
  // Fix 'optimised' property to 'optimized'
  fixed = fixed.replace(/\boptimised\b/g, (match) => {
    changeCount++;
    return 'optimized';
  });
  
  // Fix alignment values from 'centre' to 'center'
  // But keep the object key 'centre' when it maps to CSS classes
  fixed = fixed.replace(/'centre'/g, (match, offset) => {
    // Check if this is a key in alignmentClasses object
    const before = fixed.substring(Math.max(0, offset - 20), offset);
    if (before.includes('alignmentClasses') || before.includes(': \'text-center')) {
      return match; // Keep as 'centre' for object keys
    }
    changeCount++;
    return "'center'";
  });
  
  // Fix default alignment values
  fixed = fixed.replace(/alignment = 'centre'/g, () => {
    changeCount++;
    return "alignment = 'center'";
  });
  
  // Fix alignment type definitions
  fixed = fixed.replace(/'left' \| 'centre' \| 'right'/g, () => {
    changeCount++;
    return "'left' | 'center' | 'right'";
  });
  
  // Fix the alignmentClasses mapping to use 'center' key
  fixed = fixed.replace(/centre: 'text-center items-center'/g, () => {
    changeCount++;
    return "center: 'text-center items-center'";
  });
  
  return { fixed, changeCount };
}

// Process files
function processFiles() {
  const patterns = [
    'components/**/*.{tsx,ts,jsx,js}',
    'app/**/*.{tsx,ts,jsx,js}'
  ];
  
  let totalFiles = 0;
  let totalChanges = 0;
  const processedFiles = [];
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const { fixed, changeCount } = fixComponentProps(content);
      
      if (changeCount > 0) {
        fs.writeFileSync(file, fixed, 'utf8');
        processedFiles.push({ file, changeCount });
        totalChanges += changeCount;
      }
      
      totalFiles++;
    });
  });
  
  return { totalFiles, totalChanges, processedFiles };
}

// Run the script
console.log('🔧 Fixing component props...\n');

const { totalFiles, totalChanges, processedFiles } = processFiles();

// Summary
console.log('\n✅ Component Props Fix Complete!\n');
console.log(`📁 Files scanned: ${totalFiles}`);
console.log(`✏️  Files fixed: ${processedFiles.length}`);
console.log(`🔄 Total props fixed: ${totalChanges}\n`);

if (processedFiles.length > 0) {
  console.log('Files with fixes:');
  processedFiles.forEach(({ file, changeCount }) => {
    console.log(`  - ${file} (${changeCount} fixes)`);
  });
}

console.log('\n✅ Your components should now work correctly!');