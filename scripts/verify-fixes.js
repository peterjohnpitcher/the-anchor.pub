#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Check for any remaining issues
function checkForIssues() {
  const issues = [];
  
  // Check for CSS classes with British spelling
  const cssIssuePatterns = [
    /className=["']([^"']*\bcentre\b[^"']*)/g,
    /className=["']([^"']*\bitems-centre\b[^"']*)/g,
    /className=["']([^"']*\bjustify-centre\b[^"']*)/g,
    /className=["']([^"']*\btext-centre\b[^"']*)/g
  ];
  
  // Check for prop issues
  const propIssuePatterns = [
    /\boptimised\s*:/g,
    /\.optimised\?/g,
    /alignment\s*=\s*['"]centre['"]/g
  ];
  
  // File patterns to check
  const patterns = [
    'app/**/*.{tsx,ts,jsx,js}',
    'components/**/*.{tsx,ts,jsx,js}'
  ];
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const fileIssues = [];
      
      // Check CSS issues
      cssIssuePatterns.forEach(pattern => {
        const matches = [...content.matchAll(pattern)];
        if (matches.length > 0) {
          fileIssues.push({
            type: 'CSS class',
            pattern: pattern.source,
            count: matches.length
          });
        }
      });
      
      // Check prop issues
      propIssuePatterns.forEach(pattern => {
        const matches = [...content.matchAll(pattern)];
        if (matches.length > 0) {
          fileIssues.push({
            type: 'Component prop',
            pattern: pattern.source,
            count: matches.length
          });
        }
      });
      
      if (fileIssues.length > 0) {
        issues.push({ file, issues: fileIssues });
      }
    });
  });
  
  return issues;
}

// Check if optimized image directories exist
function checkImageDirectories() {
  const imageHeaders = glob.sync('public/images/page-headers/**/optimized');
  return imageHeaders;
}

// Run verification
console.log('🔍 Verifying fixes...\n');

// Check for remaining issues
const remainingIssues = checkForIssues();

if (remainingIssues.length === 0) {
  console.log('✅ No British spelling issues found in CSS classes or props!\n');
} else {
  console.log('⚠️  Found remaining issues:\n');
  remainingIssues.forEach(({ file, issues }) => {
    console.log(`  ${file}:`);
    issues.forEach(issue => {
      console.log(`    - ${issue.type}: ${issue.count} instances`);
    });
  });
  console.log('');
}

// Check image directories
const imageDirectories = checkImageDirectories();
console.log(`📁 Found ${imageDirectories.length} optimized image directories\n`);

// Summary
console.log('📊 Summary:');
console.log('  - CSS classes should use American spelling (text-center, not text-centre)');
console.log('  - Component props should use American spelling (optimized, not optimised)');
console.log('  - Image directories are correctly named "optimized"');
console.log('  - Content text can remain in British English');

if (remainingIssues.length === 0) {
  console.log('\n✅ All issues appear to be fixed! Your header images should now load correctly.');
} else {
  console.log('\n⚠️  Some issues remain. Run the fix scripts again or manually fix the remaining issues.');
}