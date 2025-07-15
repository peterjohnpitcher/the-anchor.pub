#!/usr/bin/env node

/**
 * Update image references in blog posts
 * Ensures markdown files reference the correct images
 */

const fs = require('fs').promises;
const path = require('path');

async function updateImageReferences() {
  const contentDir = path.join(__dirname, '..', 'content', 'blog');
  const publicDir = path.join(__dirname, '..', 'public', 'content', 'blog');
  
  console.log('📝 Updating image references in blog posts...\n');
  
  const blogDirs = await fs.readdir(contentDir);
  let updated = 0;
  
  for (const dir of blogDirs) {
    if (dir.startsWith('.') || dir === 'README.md' || dir === 'TEMPLATE.md') continue;
    
    const postPath = path.join(contentDir, dir);
    const stats = await fs.stat(postPath);
    
    if (stats.isDirectory()) {
      const indexPath = path.join(postPath, 'index.md');
      const publicPath = path.join(publicDir, dir);
      
      try {
        // Read the markdown file
        let content = await fs.readFile(indexPath, 'utf8');
        
        // Get actual images in public directory
        let actualImages = [];
        try {
          const files = await fs.readdir(publicPath);
          actualImages = files.filter(f => f.match(/\.(jpg|jpeg|png|gif|webp)$/i)).sort();
        } catch (e) {
          continue; // No public directory
        }
        
        if (actualImages.length > 0) {
          // Extract frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const afterFrontmatter = content.substring(frontmatterMatch[0].length);
            
            // Update hero image
            const heroImage = actualImages.find(img => img.startsWith('hero')) || actualImages[0];
            let newFrontmatter = frontmatter.replace(/hero:\s*"[^"]+"/g, `hero: "${heroImage}"`);
            
            // Update images array
            const otherImages = actualImages.filter(img => !img.startsWith('hero'));
            if (otherImages.length > 0) {
              const imagesYaml = otherImages.map(img => `  - "${img}"`).join('\n');
              newFrontmatter = newFrontmatter.replace(/images:\s*\[[^\]]*\]|images:\s*\n(  - "[^"]+"\n)*/g, `images:\n${imagesYaml}`);
            } else {
              newFrontmatter = newFrontmatter.replace(/images:\s*\[[^\]]*\]|images:\s*\n(  - "[^"]+"\n)*/g, 'images: []');
            }
            
            // Reconstruct the file
            const newContent = `---\n${newFrontmatter}\n---${afterFrontmatter}`;
            
            if (newContent !== content) {
              await fs.writeFile(indexPath, newContent);
              console.log(`✅ Updated: ${dir}`);
              console.log(`   Images: ${actualImages.join(', ')}`);
              updated++;
            }
          }
        }
      } catch (error) {
        console.error(`❌ Error updating ${dir}:`, error.message);
      }
    }
  }
  
  console.log(`\n✅ Updated ${updated} blog posts with correct image references`);
}

updateImageReferences().catch(console.error);