#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Color replacements map
const colorReplacements = {
  'text-gray-300': 'text-gray-600',
  'text-gray-400': 'text-gray-600',
  'text-gray-500': 'text-gray-700',
  // For text-gray-600, we need to check context - leaving as is for now
};

// Files to process
const patterns = [
  '**/*.tsx',
  '**/*.jsx',
  '**/*.ts',
  '**/*.js',
  '**/*.css'
];

// Directories to ignore
const ignore = [
  'node_modules/**',
  '.next/**',
  'dist/**',
  'build/**',
  '.git/**'
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if file contains any of the colors we need to replace
    const hasTargetColors = Object.keys(colorReplacements).some(color => 
      content.includes(color)
    );
    
    if (!hasTargetColors) {
      return { modified: false };
    }
    
    console.log(`Processing: ${filePath}`);
    
    // Replace each color
    Object.entries(colorReplacements).forEach(([oldColor, newColor]) => {
      const regex = new RegExp(`\\b${oldColor}\\b`, 'g');
      const newContent = content.replace(regex, newColor);
      
      if (newContent !== content) {
        content = newContent;
        modified = true;
        console.log(`  Replaced ${oldColor} with ${newColor}`);
      }
    });
    
    // Special handling for text-gray-600 to text-gray-700
    // Only replace if it's likely on a light background (checking context)
    const gray600Regex = /\btext-gray-600\b/g;
    let matches = [...content.matchAll(gray600Regex)];
    
    matches.forEach(match => {
      const index = match.index;
      const lineStart = content.lastIndexOf('\n', index) + 1;
      const lineEnd = content.indexOf('\n', index);
      const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);
      
      // Check if line contains indicators of light background
      const lightBackgroundIndicators = [
        'bg-white',
        'bg-gray-50',
        'bg-gray-100',
        'bg-blue-50',
        'bg-green-50',
        'bg-yellow-50',
        'bg-red-50',
        'bg-purple-50',
        'bg-pink-50',
        'bg-indigo-50',
        'card',
        'Card',
        'section',
        'main',
        'article'
      ];
      
      // Check if we should upgrade to text-gray-700
      const shouldUpgrade = lightBackgroundIndicators.some(indicator => 
        line.includes(indicator)
      );
      
      if (shouldUpgrade) {
        const before = content.substring(0, index);
        const after = content.substring(index + 'text-gray-600'.length);
        content = before + 'text-gray-700' + after;
        modified = true;
        console.log(`  Upgraded text-gray-600 to text-gray-700 (light background context)`);
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated ${filePath}`);
    }
    
    return { modified, filePath };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { modified: false, error: error.message };
  }
}

function main() {
  console.log('Fixing color contrast issues...\n');
  
  let totalFiles = 0;
  let modifiedFiles = 0;
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { ignore });
    
    files.forEach(file => {
      totalFiles++;
      const result = processFile(file);
      
      if (result.modified) {
        modifiedFiles++;
      }
    });
  });
  
  console.log(`\n✓ Complete!`);
  console.log(`  Total files scanned: ${totalFiles}`);
  console.log(`  Files modified: ${modifiedFiles}`);
  console.log(`\nColor replacements applied:`);
  console.log(`  - text-gray-300 → text-gray-600`);
  console.log(`  - text-gray-400 → text-gray-600`);
  console.log(`  - text-gray-500 → text-gray-700`);
  console.log(`  - text-gray-600 → text-gray-700 (when on light backgrounds)`);
}

// Run the script
main();