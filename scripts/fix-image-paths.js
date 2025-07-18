#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Image-related terms that should NOT be converted to British spelling
const imagePathFixMap = {
  'centre': 'center',
  'Centre': 'Center',
  'optimised': 'optimized',
  'Optimised': 'Optimized',
  'organised': 'organized',
  'Organised': 'Organized',
  'specialised': 'specialized',
  'Specialised': 'Specialized'
};

// Function to fix image paths and references
function fixImagePaths(content) {
  let fixed = content;
  let changeCount = 0;
  
  // Fix image src attributes
  fixed = fixed.replace(/src=(["'`])([^"'`]*)(["'`])/g, (match, quote1, imgPath, quote2) => {
    let fixedPath = imgPath;
    let pathChanged = false;
    
    // Check if this is an image path
    if (imgPath.includes('/images/') || imgPath.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      for (const [british, american] of Object.entries(imagePathFixMap)) {
        const regex = new RegExp(british, 'g');
        if (regex.test(fixedPath)) {
          fixedPath = fixedPath.replace(regex, american);
          pathChanged = true;
        }
      }
    }
    
    if (pathChanged) {
      changeCount++;
      console.log(`  Fixed image path: ${imgPath} → ${fixedPath}`);
    }
    
    return `src=${quote1}${fixedPath}${quote2}`;
  });
  
  // Fix import statements for images
  fixed = fixed.replace(/from\s+(["'`])([^"'`]*\.(jpg|jpeg|png|gif|webp|svg))(["'`])/gi, (match, quote1, imgPath, ext, quote2) => {
    let fixedPath = imgPath;
    let pathChanged = false;
    
    for (const [british, american] of Object.entries(imagePathFixMap)) {
      const regex = new RegExp(british, 'g');
      if (regex.test(fixedPath)) {
        fixedPath = fixedPath.replace(regex, american);
        pathChanged = true;
      }
    }
    
    if (pathChanged) {
      changeCount++;
      console.log(`  Fixed import path: ${imgPath} → ${fixedPath}`);
    }
    
    return `from ${quote1}${fixedPath}${quote2}`;
  });
  
  // Fix optimised/optimized object properties
  fixed = fixed.replace(/optimised\s*:/g, 'optimized:');
  
  // Fix image paths in objects (like in hero sections)
  fixed = fixed.replace(/["'`]\/images\/[^"'`]+["'`]/g, (match) => {
    let fixedMatch = match;
    let pathChanged = false;
    
    for (const [british, american] of Object.entries(imagePathFixMap)) {
      const regex = new RegExp(british, 'g');
      if (regex.test(fixedMatch)) {
        fixedMatch = fixedMatch.replace(regex, american);
        pathChanged = true;
      }
    }
    
    if (pathChanged) {
      changeCount++;
    }
    
    return fixedMatch;
  });
  
  return { fixed, changeCount };
}

// Check actual image files and rename if needed
function checkAndRenameImageFiles() {
  const imagePatterns = [
    'public/images/**/*.{jpg,jpeg,png,gif,webp,svg}',
    'public/images/**'
  ];
  
  const renamedFiles = [];
  
  imagePatterns.forEach(pattern => {
    const files = glob.sync(pattern);
    
    files.forEach(file => {
      const basename = path.basename(file);
      const dirname = path.dirname(file);
      let newBasename = basename;
      let changed = false;
      
      // Check if filename contains British spelling
      for (const [british, american] of Object.entries(imagePathFixMap)) {
        if (basename.includes(british)) {
          newBasename = newBasename.replace(new RegExp(british, 'g'), american);
          changed = true;
        }
      }
      
      // Check if directory name contains British spelling
      let newDirname = dirname;
      for (const [british, american] of Object.entries(imagePathFixMap)) {
        if (dirname.includes(british)) {
          newDirname = newDirname.replace(new RegExp(british, 'g'), american);
          changed = true;
        }
      }
      
      if (changed) {
        const oldPath = file;
        const newPath = path.join(newDirname, newBasename);
        
        // Create new directory if needed
        if (newDirname !== dirname && !fs.existsSync(newDirname)) {
          fs.mkdirSync(newDirname, { recursive: true });
        }
        
        // Rename file
        if (fs.existsSync(oldPath) && oldPath !== newPath) {
          try {
            fs.renameSync(oldPath, newPath);
            renamedFiles.push({ from: oldPath, to: newPath });
            console.log(`  Renamed: ${oldPath} → ${newPath}`);
          } catch (err) {
            console.error(`  Failed to rename: ${oldPath}`, err.message);
          }
        }
      }
    });
  });
  
  return renamedFiles;
}

// Process code files
function processCodeFiles() {
  const patterns = [
    'app/**/*.{tsx,ts,jsx,js}',
    'components/**/*.{tsx,ts,jsx,js}',
    'lib/**/*.{tsx,ts,jsx,js}',
    'styles/**/*.css'
  ];
  
  let totalFiles = 0;
  let totalChanges = 0;
  const processedFiles = [];
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const { fixed, changeCount } = fixImagePaths(content);
      
      if (changeCount > 0) {
        fs.writeFileSync(file, fixed, 'utf8');
        processedFiles.push({ file, changeCount });
        totalChanges += changeCount;
      }
      
      totalFiles++;
    });
  });
  
  return { totalFiles, totalChanges, processedFiles };
}

// Run the script
console.log('🔍 Checking for image path issues...\n');

// First, rename any actual image files
console.log('📁 Checking image files...');
const renamedFiles = checkAndRenameImageFiles();
if (renamedFiles.length > 0) {
  console.log(`\n✅ Renamed ${renamedFiles.length} image files\n`);
} else {
  console.log('✅ No image files needed renaming\n');
}

// Then fix references in code
console.log('📝 Fixing image references in code...');
const { totalFiles, totalChanges, processedFiles } = processCodeFiles();

// Summary
console.log('\n🎉 Image Path Fix Complete!\n');
console.log(`📁 Files scanned: ${totalFiles}`);
console.log(`✏️  Files fixed: ${processedFiles.length}`);
console.log(`🔄 Total image paths fixed: ${totalChanges}`);
console.log(`🖼️  Image files renamed: ${renamedFiles.length}\n`);

if (processedFiles.length > 0) {
  console.log('Files with image path fixes:');
  processedFiles.forEach(({ file, changeCount }) => {
    console.log(`  - ${file} (${changeCount} fixes)`);
  });
}

console.log('\n✅ Your images should now load correctly!');