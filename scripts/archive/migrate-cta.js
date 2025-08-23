#!/usr/bin/env node

/**
 * Script to help migrate CallToAction components to Button components
 * Usage: node scripts/migrate-cta.js [file-path]
 */

const fs = require('fs');
const path = require('path');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function migrateFile(filePath) {
  console.log(`${colors.blue}Processing: ${filePath}${colors.reset}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // Check if file imports CallToAction
  if (!content.includes('CallToAction')) {
    console.log(`${colors.yellow}No CallToAction found, skipping...${colors.reset}`);
    return false;
  }
  
  // Add Link import if not present and Button/Container/Section imports
  if (content.includes("from '@/components/CallToAction'")) {
    // Check if Link is already imported
    if (!content.includes("import Link from 'next/link'") && !content.includes('import Link from "next/link"')) {
      content = `import Link from 'next/link'\n${content}`;
      hasChanges = true;
    }
    
    // Replace CallToAction import with Button import
    content = content.replace(
      /import\s*{\s*CallToAction\s*}\s*from\s*['"]@\/components\/CallToAction['"]/g,
      "import { Button } from '@/components/ui'"
    );
    hasChanges = true;
  }
  
  // Pattern to match CallToAction with href prop
  const ctaWithHrefPattern = /<CallToAction\s+([^>]*?)href\s*=\s*["']([^"']+)["']([^>]*?)>([\s\S]*?)<\/CallToAction>/g;
  
  // Replace CallToAction components with Button wrapped in Link
  content = content.replace(ctaWithHrefPattern, (match, beforeHref, href, afterHref, children) => {
    // Extract props
    const propsMatch = match.match(/<CallToAction([^>]+)>/);
    const propsString = propsMatch ? propsMatch[1] : '';
    
    // Extract variant
    let variant = 'primary';
    const variantMatch = propsString.match(/variant\s*=\s*["']([^"']+)["']/);
    if (variantMatch) {
      const ctaVariant = variantMatch[1];
      // Map CTA variants to Button variants
      if (ctaVariant === 'white') {
        variant = 'secondary';
      } else if (ctaVariant === 'secondary') {
        variant = 'secondary';
      } else {
        variant = ctaVariant;
      }
    }
    
    // Extract size
    let size = 'md';
    const sizeMatch = propsString.match(/size\s*=\s*["']([^"']+)["']/);
    if (sizeMatch) {
      size = sizeMatch[1];
    }
    
    // Extract className if present
    let className = '';
    const classMatch = propsString.match(/className\s*=\s*["']([^"']+)["']/);
    if (classMatch) {
      className = classMatch[1];
    }
    
    // Check if external prop is present
    const isExternal = propsString.includes('external');
    
    // Handle special case for white variant
    if (variantMatch && variantMatch[1] === 'white') {
      className = className ? `${className} bg-white text-anchor-green hover:bg-gray-100` : 'bg-white text-anchor-green hover:bg-gray-100';
    }
    
    // Build the replacement
    let replacement;
    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) {
      // External link or special protocol
      const linkProps = isExternal || href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
      replacement = `<Link href="${href}"${linkProps}>
      <Button 
        variant="${variant}"
        size="${size}"${className ? `\n        className="${className}"` : ''}
      >
        ${children.trim()}
      </Button>
    </Link>`;
    } else {
      // Internal link
      replacement = `<Link href="${href}">
      <Button 
        variant="${variant}"
        size="${size}"${className ? `\n        className="${className}"` : ''}
      >
        ${children.trim()}
      </Button>
    </Link>`;
    }
    
    hasChanges = true;
    return replacement;
  });
  
  // Pattern to match CallToAction without href (used as button)
  const ctaWithoutHrefPattern = /<CallToAction\s+([^>]*?)(?<!href\s*=\s*["'][^"']+["'])>([\s\S]*?)<\/CallToAction>/g;
  
  content = content.replace(ctaWithoutHrefPattern, (match, props, children) => {
    // This is a button without href, replace directly with Button
    let variant = 'primary';
    const variantMatch = props.match(/variant\s*=\s*["']([^"']+)["']/);
    if (variantMatch && variantMatch[1] === 'white') {
      variant = 'secondary';
    } else if (variantMatch) {
      variant = variantMatch[1];
    }
    
    hasChanges = true;
    return `<Button ${props.trim()}>${children.trim()}</Button>`;
  });
  
  if (hasChanges) {
    // Create backup
    const backupPath = filePath + '.backup';
    fs.writeFileSync(backupPath, fs.readFileSync(filePath, 'utf8'));
    
    // Write updated content
    fs.writeFileSync(filePath, content);
    console.log(`${colors.green}✓ Migrated successfully!${colors.reset}`);
    console.log(`${colors.magenta}  Backup saved to: ${backupPath}${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.yellow}No changes needed.${colors.reset}`);
    return false;
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`${colors.red}Usage: node scripts/migrate-cta.js <file-path>${colors.reset}`);
  console.log('Example: node scripts/migrate-cta.js app/whats-on/page.tsx');
  process.exit(1);
}

const filePath = path.resolve(args[0]);

if (!fs.existsSync(filePath)) {
  console.log(`${colors.red}Error: File not found: ${filePath}${colors.reset}`);
  process.exit(1);
}

try {
  migrateFile(filePath);
} catch (error) {
  console.log(`${colors.red}Error processing file: ${error.message}${colors.reset}`);
  process.exit(1);
}