#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🚨 Emergency fix for API issues...\n');

// Find all API files
const apiFiles = glob.sync('app/api/**/*.{ts,js}', { cwd: process.cwd() });

console.log(`Found ${apiFiles.length} API files to fix\n`);

let totalFixed = 0;

apiFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Critical fixes for APIs
  content = content.replace(/cheque-availability/g, 'check-availability');
  content = content.replace(/cheque availability/g, 'check availability');
  content = content.replace(/Cheque availability/g, 'Check availability');
  content = content.replace(/\bcheque\b/g, 'check');
  content = content.replace(/\bCheque\b/g, 'Check');
  content = content.replace(/\bcolour\b/g, 'color');
  content = content.replace(/\bColour\b/g, 'Color');
  content = content.replace(/\bauthorisation\b/g, 'authorization');
  content = content.replace(/\bAuthorisation\b/g, 'Authorization');
  content = content.replace(/\bcentre\b/g, 'center');
  content = content.replace(/\bCentre\b/g, 'Center');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed API file: ${file}`);
    totalFixed++;
  }
});

console.log(`\n✅ Fixed ${totalFixed} API files`);
console.log('\nYour APIs should now work correctly!');