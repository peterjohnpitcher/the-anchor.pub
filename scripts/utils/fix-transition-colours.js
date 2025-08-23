const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files to fix
const files = [
  'app/blog/[slug]/page.tsx',
  'app/blog/page.tsx',
  'app/blog/tags/page.tsx',
  'app/whats-on/page.tsx',
  'components/features/BlogPost.tsx',
  'components/features/Gallery.tsx',
  'components/features/MenuDisplay.tsx',
  'components/FloatingActions.tsx',
  'components/Navigation.tsx',
  'components/NextEvent.tsx',
  'components/TerminalNavigation.tsx',
  'components/hero/Breadcrumbs.tsx',
  'components/ui/primitives/Input.tsx',
  'components/ui/forms/Select.tsx',
  'components/ui/forms/Checkbox.tsx',
  'components/ui/forms/DatePicker.tsx',
  'components/ui/forms/Radio.tsx',
  'components/ui/forms/Switch.tsx',
  'components/ui/navigation/Breadcrumb.tsx',
  'components/ui/navigation/NavBar.tsx'
];

let totalReplacements = 0;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace transition-colours with transition-colors
    content = content.replace(/transition-colours/g, 'transition-colors');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      const replacements = (originalContent.match(/transition-colours/g) || []).length;
      totalReplacements += replacements;
      console.log(`✅ Fixed ${replacements} instance(s) in ${file}`);
    }
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log(`\n✨ Total replacements: ${totalReplacements}`);