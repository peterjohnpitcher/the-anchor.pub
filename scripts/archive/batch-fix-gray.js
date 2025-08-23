#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { globby } = require('globby');

console.log('🔧 Fixing ALL gray -> gray CSS classes...\n');

async function fixGray() {
  let totalFixed = 0;
  
  // Get all files with gray classes
  const files = await globby([
    '**/*.{ts,tsx,js,jsx,css,scss}',
    '!node_modules/**',
    '!.next/**',
    '!scripts/**',
    '!content/**/*.md'
  ]);
  
  console.log(`Checking ${files.length} files...\n`);
  
  // All gray to gray replacements
  const grayFixes = [
    // Basic classes
    { from: /\bgray-/g, to: 'gray-' },
    { from: /bg-gray/g, to: 'bg-gray' },
    { from: /text-gray/g, to: 'text-gray' },
    { from: /border-gray/g, to: 'border-gray' },
    { from: /ring-gray/g, to: 'ring-gray' },
    { from: /fill-gray/g, to: 'fill-gray' },
    { from: /stroke-gray/g, to: 'stroke-gray' },
    { from: /placeholder-gray/g, to: 'placeholder-gray' },
    { from: /decoration-gray/g, to: 'decoration-gray' },
    { from: /divide-gray/g, to: 'divide-gray' },
    { from: /outline-gray/g, to: 'outline-gray' },
    { from: /shadow-gray/g, to: 'shadow-gray' },
    { from: /accent-gray/g, to: 'accent-gray' },
    { from: /caret-gray/g, to: 'caret-gray' },
    
    // Hover/focus/active states
    { from: /hover:gray/g, to: 'hover:gray' },
    { from: /hover:bg-gray/g, to: 'hover:bg-gray' },
    { from: /hover:text-gray/g, to: 'hover:text-gray' },
    { from: /hover:border-gray/g, to: 'hover:border-gray' },
    { from: /hover:ring-gray/g, to: 'hover:ring-gray' },
    { from: /focus:gray/g, to: 'focus:gray' },
    { from: /focus:bg-gray/g, to: 'focus:bg-gray' },
    { from: /focus:text-gray/g, to: 'focus:text-gray' },
    { from: /focus:border-gray/g, to: 'focus:border-gray' },
    { from: /focus:ring-gray/g, to: 'focus:ring-gray' },
    { from: /active:bg-gray/g, to: 'active:bg-gray' },
    { from: /active:text-gray/g, to: 'active:text-gray' },
    { from: /active:border-gray/g, to: 'active:border-gray' },
    { from: /disabled:bg-gray/g, to: 'disabled:bg-gray' },
    { from: /disabled:text-gray/g, to: 'disabled:text-gray' },
    { from: /disabled:border-gray/g, to: 'disabled:border-gray' },
    
    // Dark mode
    { from: /dark:gray/g, to: 'dark:gray' },
    { from: /dark:bg-gray/g, to: 'dark:bg-gray' },
    { from: /dark:text-gray/g, to: 'dark:text-gray' },
    { from: /dark:border-gray/g, to: 'dark:border-gray' },
    
    // Responsive
    { from: /sm:gray/g, to: 'sm:gray' },
    { from: /sm:bg-gray/g, to: 'sm:bg-gray' },
    { from: /sm:text-gray/g, to: 'sm:text-gray' },
    { from: /md:gray/g, to: 'md:gray' },
    { from: /md:bg-gray/g, to: 'md:bg-gray' },
    { from: /md:text-gray/g, to: 'md:text-gray' },
    { from: /lg:gray/g, to: 'lg:gray' },
    { from: /lg:bg-gray/g, to: 'lg:bg-gray' },
    { from: /lg:text-gray/g, to: 'lg:text-gray' },
    { from: /xl:gray/g, to: 'xl:gray' },
    { from: /xl:bg-gray/g, to: 'xl:bg-gray' },
    { from: /xl:text-gray/g, to: 'xl:text-gray' },
    
    // Group states
    { from: /group-hover:bg-gray/g, to: 'group-hover:bg-gray' },
    { from: /group-hover:text-gray/g, to: 'group-hover:text-gray' },
    { from: /group-focus:bg-gray/g, to: 'group-focus:bg-gray' },
    { from: /group-focus:text-gray/g, to: 'group-focus:text-gray' },
    
    // From/to classes
    { from: /from-gray/g, to: 'from-gray' },
    { from: /to-gray/g, to: 'to-gray' },
    { from: /via-gray/g, to: 'via-gray' },
    
    // Selection
    { from: /selection:bg-gray/g, to: 'selection:bg-gray' },
    { from: /selection:text-gray/g, to: 'selection:text-gray' }
  ];
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let originalContent = content;
      
      // Apply all gray -> gray fixes
      grayFixes.forEach(fix => {
        content = content.replace(fix.from, fix.to);
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`✅ Fixed: ${file}`);
        totalFixed++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}: ${err.message}`);
    }
  }
  
  console.log(`\n✨ Complete! Fixed ${totalFixed} files with gray -> gray replacements.`);
}

fixGray().catch(console.error);