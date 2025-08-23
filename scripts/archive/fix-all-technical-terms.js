#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Running comprehensive fix for British English issues in technical code...\n');

let totalFixed = 0;
const fixedFiles = [];

// Terms that should ALWAYS use American spelling in code
const technicalFixes = {
  'authorise': 'authorize',
  'authorisation': 'authorization',
  'colour': 'color',
  'colours': 'colors',
  'centre': 'center',
  'centred': 'centered',
  'behaviour': 'behavior',
  'behaviours': 'behaviors',
  'customise': 'customize',
  'customisation': 'customization',
  'initialise': 'initialize',
  'initialisation': 'initialization',
  'optimise': 'optimize',
  'optimisation': 'optimization',
  'organise': 'organize',
  'organisation': 'organization',
  'realise': 'realize',
  'realisation': 'realization',
  'serialise': 'serialize',
  'serialisation': 'serialization',
  'analyse': 'analyze',
  'analysing': 'analyzing',
  'synchronise': 'synchronize',
  'synchronisation': 'synchronization',
  'minimise': 'minimize',
  'maximise': 'maximize',
  'normalise': 'normalize',
  'normalisation': 'normalization',
  'visualise': 'visualize',
  'visualisation': 'visualization',
  'favourite': 'favorite',
  'favourites': 'favorites'
};

// Fix API files
console.log('🔧 Fixing API routes...');
const apiFiles = glob.sync('app/api/**/*.{ts,js}', { cwd: process.cwd() });
apiFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  Object.entries(technicalFixes).forEach(([british, american]) => {
    const regex = new RegExp(`\\b${british}\\b`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, american);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`  ✅ Fixed API file: ${file}`);
    fixedFiles.push(file);
    totalFixed++;
  }
});

// Fix all TypeScript/JavaScript files (excluding content)
console.log('\n🔧 Fixing TypeScript/JavaScript files...');
const codeFiles = glob.sync('**/*.{ts,tsx,js,jsx}', { 
  cwd: process.cwd(),
  ignore: ['node_modules/**', 'scripts/**', '.next/**', 'content/**/*.md']
});

codeFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Fix technical terms in code
  Object.entries(technicalFixes).forEach(([british, american]) => {
    const regex = new RegExp(`\\b${british}\\b`, 'g');
    content = content.replace(regex, american);
  });
  
  // Fix specific style object patterns
  content = content.replace(/textAlign:\s*['"]centre['"]/g, "textAlign: 'center'");
  content = content.replace(/alignItems:\s*['"]centre['"]/g, "alignItems: 'center'");
  content = content.replace(/justifyContent:\s*['"]centre['"]/g, "justifyContent: 'center'");
  
  // Fix JSON keys
  content = content.replace(/["']colour["'](\s*:)/g, "'color'$1");
  content = content.replace(/["']centre["'](\s*:)/g, "'center'$1");
  content = content.replace(/["']behaviour["'](\s*:)/g, "'behavior'$1");
  content = content.replace(/["']favourite["'](\s*:)/g, "'favorite'$1");
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`  ✅ Fixed: ${file}`);
    fixedFiles.push(file);
    totalFixed++;
  }
});

// Fix lib files specifically
console.log('\n🔧 Fixing library files...');
const libFiles = glob.sync('lib/**/*.{ts,js}', { cwd: process.cwd() });
libFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Be very aggressive with technical terms in lib files
  Object.entries(technicalFixes).forEach(([british, american]) => {
    const regex = new RegExp(`\\b${british}\\b`, 'gi');
    content = content.replace(regex, american);
  });
  
  if (content !== originalContent && !fixedFiles.includes(file)) {
    fs.writeFileSync(file, content);
    console.log(`  ✅ Fixed lib file: ${file}`);
    totalFixed++;
  }
});

// Fix utils files
console.log('\n🔧 Fixing utility files...');
const utilFiles = glob.sync('utils/**/*.{ts,js}', { cwd: process.cwd() });
utilFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  Object.entries(technicalFixes).forEach(([british, american]) => {
    const regex = new RegExp(`\\b${british}\\b`, 'gi');
    content = content.replace(regex, american);
  });
  
  if (content !== originalContent && !fixedFiles.includes(file)) {
    fs.writeFileSync(file, content);
    console.log(`  ✅ Fixed util file: ${file}`);
    totalFixed++;
  }
});

console.log(`\n✅ Fixed ${totalFixed} files with British spelling in technical code`);
console.log('\n📝 Note: Content files (blog posts, etc.) have been preserved with British spelling.');
console.log('Only technical code (APIs, components, utilities) have been fixed to use American spelling.');