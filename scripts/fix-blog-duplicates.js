const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(process.cwd(), 'content', 'blog');

// Get all blog directories
const blogDirs = fs.readdirSync(contentDir).filter(dir => {
  const stat = fs.statSync(path.join(contentDir, dir));
  return stat.isDirectory();
});

let fixedCount = 0;

blogDirs.forEach(dir => {
  const indexPath = path.join(contentDir, dir, 'index.md');
  
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    const { data, content: markdown } = matter(content);
    
    // Check if this post has images in frontmatter
    if (data.images && data.images.length > 0) {
      console.log(`\nFound ${data.images.length} images in frontmatter for: ${dir}`);
      
      // Check if images are also embedded in markdown
      const hasEmbeddedImages = data.images.some(img => 
        markdown.includes(`![`) && markdown.includes(`/${img}`)
      );
      
      if (hasEmbeddedImages) {
        console.log(`  ✗ Has duplicate images embedded in markdown`);
        
        // Clear the images array in frontmatter
        data.images = [];
        
        // Also check if hero image is duplicated in content
        let cleanedMarkdown = markdown;
        if (data.hero && markdown.includes(`](/content/blog/${dir}/${data.hero})`)) {
          console.log(`  ✗ Hero image also duplicated in content`);
          // Remove hero image from content (it's at the beginning usually)
          const heroPattern = new RegExp(`!\\[.*?\\]\\(/content/blog/${dir}/${data.hero}\\)\\n*`, 'g');
          cleanedMarkdown = cleanedMarkdown.replace(heroPattern, '');
        }
        
        // Rebuild the file
        const updatedContent = matter.stringify(cleanedMarkdown, data);
        fs.writeFileSync(indexPath, updatedContent);
        
        console.log(`  ✓ Fixed: Cleared images array and removed duplicate hero`);
        fixedCount++;
      } else {
        console.log(`  ✓ No duplication found`);
      }
    }
  }
});

console.log(`\n\nSummary: Fixed ${fixedCount} blog posts with image duplication issues.`);