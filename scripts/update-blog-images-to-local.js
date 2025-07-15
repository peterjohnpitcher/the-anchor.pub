const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content/blog');
const publicContentDir = path.join(__dirname, '../public/content/blog');

// Get all blog directories
const blogDirs = fs.readdirSync(contentDir).filter(dir => {
  const stat = fs.statSync(path.join(contentDir, dir));
  return stat.isDirectory() && dir !== '_archived';
});

let totalUpdated = 0;
let totalSkipped = 0;

blogDirs.forEach(blogDir => {
  const indexPath = path.join(contentDir, blogDir, 'index.md');
  
  if (!fs.existsSync(indexPath)) {
    console.log(`❌ No index.md found in ${blogDir}`);
    totalSkipped++;
    return;
  }
  
  // Check if local images exist
  const publicBlogDir = path.join(publicContentDir, blogDir);
  if (!fs.existsSync(publicBlogDir)) {
    console.log(`❌ No public images directory for ${blogDir}`);
    totalSkipped++;
    return;
  }
  
  // Get list of local images
  const localImages = fs.readdirSync(publicBlogDir).filter(file => 
    file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );
  
  if (localImages.length === 0) {
    console.log(`❌ No local images found for ${blogDir}`);
    totalSkipped++;
    return;
  }
  
  // Read the markdown file
  let content = fs.readFileSync(indexPath, 'utf8');
  const originalContent = content;
  
  // Pattern to match wixstatic URLs
  const wixPattern = /!\[([^\]]*)\]\(https:\/\/static\.wixstatic\.com\/[^)]+\)/g;
  
  let imageIndex = 0;
  let replacements = 0;
  
  // Replace wixstatic URLs with local images
  content = content.replace(wixPattern, (match, altText) => {
    // Try to use images in order, cycling through if needed
    const imageName = localImages[imageIndex % localImages.length];
    imageIndex++;
    replacements++;
    
    // Use the original alt text if available, otherwise create one
    const finalAltText = altText || `${blogDir.replace(/-/g, ' ')} image`;
    
    return `![${finalAltText}](/content/blog/${blogDir}/${imageName})`;
  });
  
  // Also check for images without alt text
  const wixPatternNoAlt = /!\[\]\(https:\/\/static\.wixstatic\.com\/[^)]+\)/g;
  content = content.replace(wixPatternNoAlt, (match) => {
    const imageName = localImages[imageIndex % localImages.length];
    imageIndex++;
    replacements++;
    return `![${blogDir.replace(/-/g, ' ')} image](/content/blog/${blogDir}/${imageName})`;
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log(`✅ Updated ${blogDir}: ${replacements} images replaced`);
    totalUpdated++;
  } else {
    console.log(`⏭️  Skipped ${blogDir}: No wixstatic images found`);
    totalSkipped++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Updated: ${totalUpdated} blog posts`);
console.log(`   Skipped: ${totalSkipped} blog posts`);
console.log(`   Total: ${blogDirs.length} blog posts processed`);