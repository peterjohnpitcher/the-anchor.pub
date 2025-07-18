#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define all the replacements we need to make
const replacements = [
  // Footer already done
  
  // BusinessHours.tsx
  {
    file: 'components/BusinessHours.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  
  // Weather.tsx  
  {
    file: 'components/Weather.tsx',
    changes: [
      { old: "labelColor: 'text-gray-600'", new: "labelColor: 'text-gray-700'" }
    ]
  },
  
  // InfoBox.tsx
  {
    file: 'components/InfoBox.tsx',
    changes: [
      { old: "'text-gray-600'", new: "'text-gray-700'" }
    ]
  },
  
  // EventsToday.tsx
  {
    file: 'components/EventsToday.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  
  // NextEventServer.tsx
  {
    file: 'components/NextEventServer.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  
  // QuickInfoGrid.tsx
  {
    file: 'components/QuickInfoGrid.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  
  // DirectionsCard.tsx
  {
    file: 'components/DirectionsCard.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  
  // features/BlogPost.tsx
  {
    file: 'components/features/BlogPost.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  
  // features/EventBooking.tsx
  {
    file: 'components/features/EventBooking.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  
  // All the page files with text-gray-600
  {
    file: 'app/drinks/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/feltham-pub/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/components/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/private-party-venue/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/book-event/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/christmas-parties/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/bedfont-pub/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/ashford-pub/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/find-us/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/egham-pub/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/stanwell-pub/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/near-heathrow/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/corporate-events/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  },
  {
    file: 'app/blog/tag/[tag]/page.tsx',
    changes: [
      { old: 'text-gray-600', new: 'text-gray-700' }
    ]
  }
];

function processFile(filePath, changes) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;
    
    changes.forEach(change => {
      const regex = new RegExp(`\\b${change.old}\\b`, 'g');
      const matches = content.match(regex);
      
      if (matches) {
        content = content.replace(regex, change.new);
        modified = true;
        console.log(`✓ ${filePath}: Replaced ${change.old} → ${change.new} (${matches.length} times)`);
      }
    });
    
    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('Batch fixing color contrast issues...\n');
  
  let totalFiles = replacements.length;
  let modifiedFiles = 0;
  
  replacements.forEach(({file, changes}) => {
    if (processFile(file, changes)) {
      modifiedFiles++;
    }
  });
  
  console.log(`\n✓ Complete!`);
  console.log(`  Total files processed: ${totalFiles}`);
  console.log(`  Files modified: ${modifiedFiles}`);
}

// Run the script
main();