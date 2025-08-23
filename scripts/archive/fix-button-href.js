#!/usr/bin/env node

/**
 * Fix Button components that have href prop (not valid)
 * Wraps them in Link component
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function fixFile(filePath) {
  console.log(`${colors.blue}Processing: ${filePath}${colors.reset}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // Pattern to match Button with href prop
  const buttonWithHrefPattern = /<Button\s+([^>]*?)href\s*=\s*(["']([^"']+)["']|{([^}]+)})/g;
  
  // Find all matches first
  const matches = [];
  let match;
  while ((match = buttonWithHrefPattern.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      index: match.index,
      href: match[3] || match[4]
    });
  }
  
  // Process matches in reverse order to maintain correct indices
  for (let i = matches.length - 1; i >= 0; i--) {
    const { fullMatch, index, href } = matches[i];
    
    // Find the complete Button element
    let openCount = 1;
    let closeIndex = index + fullMatch.length;
    let inString = false;
    let stringChar = '';
    
    while (openCount > 0 && closeIndex < content.length) {
      const char = content[closeIndex];
      
      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar && content[closeIndex - 1] !== '\\') {
        inString = false;
      } else if (!inString) {
        if (char === '<') {
          openCount++;
        } else if (char === '>') {
          openCount--;
        }
      }
      
      closeIndex++;
    }
    
    const buttonElement = content.substring(index, closeIndex);
    
    // Remove href from Button props
    const buttonWithoutHref = buttonElement.replace(/\s*href\s*=\s*(["'][^"']+["']|{[^}]+})/, '');
    
    // Check if it's a special link (tel, mailto, http)
    const isExternal = href.startsWith('http');
    const isSpecial = href.startsWith('tel:') || href.startsWith('mailto:');
    
    // Wrap in Link
    let replacement;
    if (isExternal || isSpecial) {
      const linkProps = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      replacement = `<Link href="${href}"${linkProps}>\n      ${buttonWithoutHref}\n    </Link>`;
    } else {
      replacement = `<Link href="${href}">\n      ${buttonWithoutHref}\n    </Link>`;
    }
    
    // Replace in content
    content = content.substring(0, index) + replacement + content.substring(closeIndex);
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content);
    console.log(`${colors.green}✓ Fixed ${matches.length} Button(s) with href${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.yellow}No Button components with href found${colors.reset}`);
    return false;
  }
}

// Files to fix based on TypeScript errors
const filesToFix = [
  'app/ashford-pub/page.tsx',
  'app/christmas-parties/page.tsx',
  'app/corporate-events/page.tsx',
  'app/heathrow-hotels-pub/page.tsx',
  'app/staines-pub/page.tsx',
  'app/feltham-pub/page.tsx',
  'app/egham-pub/page.tsx',
  'app/bedfont-pub/page.tsx',
  'app/windsor-pub/page.tsx',
  'app/stanwell-pub/page.tsx',
  'app/m25-junction-14-pub/page.tsx',
  'app/function-room-hire/page.tsx',
  'app/private-party-venue/page.tsx'
];

const rootDir = path.resolve(__dirname, '..');

console.log(`${colors.blue}Fixing Button components with href prop...${colors.reset}\n`);

filesToFix.forEach(file => {
  const filePath = path.join(rootDir, file);
  
  if (fs.existsSync(filePath)) {
    try {
      fixFile(filePath);
    } catch (error) {
      console.log(`${colors.red}Error processing ${file}: ${error.message}${colors.reset}`);
    }
  } else {
    console.log(`${colors.yellow}File not found: ${file}${colors.reset}`);
  }
  console.log('');
});