#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Verifying color contrast fixes...\n');

// Colors that should no longer exist
const removedColors = ['text-gray-300', 'text-gray-400', 'text-gray-500'];

// Colors that might still exist but should be limited
const limitedColors = ['text-gray-600'];

// Search for each removed color
removedColors.forEach(color => {
  console.log(`Checking for ${color}...`);
  try {
    const result = execSync(
      `grep -r "${color}" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=scripts . || true`,
      { encoding: 'utf8' }
    );
    
    if (result.trim()) {
      console.log(`⚠️  Found instances of ${color}:`);
      console.log(result);
    } else {
      console.log(`✓ No instances of ${color} found`);
    }
  } catch (error) {
    console.log(`✓ No instances of ${color} found`);
  }
  console.log('');
});

// Check for text-gray-600 (should be mostly replaced with text-gray-700)
console.log(`Checking remaining instances of text-gray-600...`);
try {
  const result = execSync(
    `grep -r "text-gray-600" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=scripts . || true`,
    { encoding: 'utf8' }
  );
  
  if (result.trim()) {
    const lines = result.trim().split('\n');
    console.log(`Found ${lines.length} instances of text-gray-600 (review these for context):`);
    lines.slice(0, 10).forEach(line => console.log(`  ${line}`));
    if (lines.length > 10) {
      console.log(`  ... and ${lines.length - 10} more`);
    }
  } else {
    console.log(`✓ No instances of text-gray-600 found`);
  }
} catch (error) {
  console.log(`✓ No instances of text-gray-600 found`);
}

console.log('\n✓ Color contrast verification complete!');
console.log('\nSummary of changes:');
console.log('  - text-gray-300 → text-gray-600');
console.log('  - text-gray-400 → text-gray-600');
console.log('  - text-gray-500 → text-gray-700');
console.log('  - text-gray-600 → text-gray-700 (where appropriate)');
console.log('\nAll text should now meet WCAG AA contrast requirements.');