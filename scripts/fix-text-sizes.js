#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files to exclude (admin/diagnostic pages)
const excludedFiles = [
  'app/_api-diagnostics/page.tsx',
  'app/api-status/page.tsx',
  'app/api-test/page.tsx'
];

// Patterns to fix
const fixes = [
  // Standalone text-xs without responsive variants
  {
    pattern: /className="([^"]*\s)?text-xs(\s[^"]*)?"/g,
    test: (match) => !match.includes('sm:text-') && !match.includes('md:text-'),
    replace: (match, before = '', after = '') => {
      // Check context to determine appropriate size
      const classNames = match;
      
      // For tags, badges, and meta information - use text-sm sm:text-xs
      if (classNames.includes('tag') || classNames.includes('badge') || 
          classNames.includes('rounded-full') || classNames.includes('px-2 py-1') ||
          classNames.includes('px-2 py-0.5')) {
        return `className="${before}text-sm sm:text-xs${after}"`;
      }
      
      // For body text and descriptions - use text-base sm:text-sm
      if (classNames.includes('text-gray') || classNames.includes('mt-2') ||
          classNames.includes('mb-2') || classNames.includes('description')) {
        return `className="${before}text-base sm:text-sm${after}"`;
      }
      
      // Default to text-sm sm:text-xs for other cases
      return `className="${before}text-sm sm:text-xs${after}"`;
    }
  },
  // Fix inline styles with conditional logic
  {
    pattern: /\{[^}]*\?[^}]*'text-xs[^']*'[^}]*:[^}]*\}/g,
    test: (match) => !match.includes('sm:text-') && !match.includes('md:text-'),
    replace: (match) => {
      return match.replace(/text-xs/g, 'text-sm sm:text-xs');
    }
  }
];

function processFile(filePath) {
  // Skip excluded files
  if (excludedFiles.some(excluded => filePath.includes(excluded))) {
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let changesMade = false;

  fixes.forEach(fix => {
    const matches = [...modified.matchAll(fix.pattern)];
    
    matches.forEach(match => {
      if (fix.test(match[0])) {
        const replacement = fix.replace(match[0], match[1], match[2]);
        modified = modified.replace(match[0], replacement);
        changesMade = true;
      }
    });
  });

  if (changesMade) {
    fs.writeFileSync(filePath, modified);
    console.log(`✓ Fixed ${filePath}`);
    return true;
  }

  return false;
}

// Main execution
console.log('🔍 Searching for text-xs without responsive variants...\n');

const files = glob.sync('**/*.{tsx,jsx}', {
  ignore: ['node_modules/**', '.next/**', 'out/**', 'coverage/**']
});

let filesFixed = 0;

files.forEach(file => {
  if (processFile(file)) {
    filesFixed++;
  }
});

console.log(`\n✅ Fixed ${filesFixed} files`);