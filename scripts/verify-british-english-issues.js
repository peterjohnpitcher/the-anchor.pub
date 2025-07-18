#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 Searching for potential issues caused by British English conversion...\n');

let totalIssues = 0;
const issues = [];

// Check API routes for British spelling
function checkApiRoutes() {
  console.log('📡 Checking API routes...');
  const apiFiles = glob.sync('app/api/**/*.{ts,js}', { cwd: process.cwd() });
  
  apiFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let hasIssue = false;
    
    // Check for British spellings in critical areas
    const britishTerms = {
      'authorise': 'authorize',
      'authorisation': 'authorization',
      'colour': 'color',
      'centre': 'center',
      'behaviour': 'behavior',
      'customise': 'customize',
      'initialise': 'initialize',
      'optimise': 'optimize',
      'organise': 'organize',
      'realise': 'realize',
      'serialise': 'serialize',
      'analyse': 'analyze',
      'synchronise': 'synchronize',
      'minimise': 'minimize',
      'maximise': 'maximize',
      'normalise': 'normalize',
      'visualise': 'visualize'
    };
    
    Object.keys(britishTerms).forEach(british => {
      const regex = new RegExp(`\\b${british}\\b`, 'gi');
      if (regex.test(content)) {
        hasIssue = true;
        issues.push({
          file,
          issue: `Contains British spelling "${british}" which should be "${britishTerms[british]}" in API code`
        });
      }
    });
    
    if (hasIssue) totalIssues++;
  });
}

// Check JSON responses and data structures
function checkJsonStructures() {
  console.log('📊 Checking JSON structures and type definitions...');
  const tsFiles = glob.sync('**/*.{ts,tsx}', { 
    cwd: process.cwd(),
    ignore: ['node_modules/**', 'scripts/**', '.next/**']
  });
  
  tsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for British spellings in interfaces, types, and JSON keys
    const jsonKeyPatterns = [
      /["']colour["']\s*:/g,
      /["']centre["']\s*:/g,
      /["']behaviour["']\s*:/g,
      /["']favourite["']\s*:/g,
      /["']authorisation["']\s*:/g,
      /["']organisation["']\s*:/g
    ];
    
    jsonKeyPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        const match = content.match(pattern);
        issues.push({
          file,
          issue: `Contains British spelling in JSON key or property: ${match[0]}`
        });
        totalIssues++;
      }
    });
  });
}

// Run all checks
checkApiRoutes();
checkJsonStructures();

console.log('\n📋 Summary:');
console.log(`Total issues found: ${totalIssues}`);

if (issues.length > 0) {
  console.log('\n❌ Issues found:\n');
  issues.forEach(issue => {
    console.log(`  ${issue.file}:`);
    console.log(`    - ${issue.issue}`);
  });
  
  console.log('\n💡 Run the comprehensive fix script next');
} else {
  console.log('\n✅ No major issues found!');
}