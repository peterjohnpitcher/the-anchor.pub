#!/usr/bin/env node

/**
 * Check Migration Status
 * Shows what blog posts have been migrated and their status
 */

const fs = require('fs').promises;
const path = require('path');

async function checkMigrationStatus() {
  const contentDir = path.join(__dirname, '..', 'content', 'blog');
  const publicDir = path.join(__dirname, '..', 'public', 'content', 'blog');
  
  console.log('📊 Checking migration status...\n');
  
  try {
    // Get all blog directories
    const blogDirs = await fs.readdir(contentDir);
    const validPosts = [];
    
    for (const dir of blogDirs) {
      if (dir.startsWith('.') || dir === 'README.md' || dir === 'TEMPLATE.md') continue;
      
      const postPath = path.join(contentDir, dir);
      const stats = await fs.stat(postPath);
      
      if (stats.isDirectory()) {
        const indexPath = path.join(postPath, 'index.md');
        const publicPath = path.join(publicDir, dir);
        
        try {
          const content = await fs.readFile(indexPath, 'utf8');
          const hasPublicDir = await fs.access(publicPath).then(() => true).catch(() => false);
          
          // Extract frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const title = frontmatter.match(/title:\s*"([^"]+)"/)?.[1] || 'Unknown';
            const date = frontmatter.match(/date:\s*"([^"]+)"/)?.[1] || 'Unknown';
            const contentLength = content.length;
            
            // Check for images
            let imageCount = 0;
            if (hasPublicDir) {
              const publicFiles = await fs.readdir(publicPath);
              imageCount = publicFiles.filter(f => f.match(/\.(jpg|jpeg|png|gif|webp)$/i)).length;
            }
            
            validPosts.push({
              slug: dir,
              title,
              date,
              contentLength,
              hasImages: imageCount > 0,
              imageCount
            });
          }
        } catch (error) {
          console.error(`❌ Error reading ${dir}:`, error.message);
        }
      }
    }
    
    // Sort by date
    validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display results
    console.log(`✅ Found ${validPosts.length} migrated blog posts:\n`);
    
    validPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   📅 Date: ${post.date}`);
      console.log(`   📝 Content: ${post.contentLength} characters`);
      console.log(`   🖼️  Images: ${post.imageCount}`);
      console.log(`   🔗 URL: /blog/${post.slug}`);
      console.log('');
    });
    
    // Summary
    console.log('📊 Summary:');
    console.log(`   Total posts: ${validPosts.length}`);
    console.log(`   Posts with images: ${validPosts.filter(p => p.hasImages).length}`);
    console.log(`   Total characters: ${validPosts.reduce((sum, p) => sum + p.contentLength, 0)}`);
    
  } catch (error) {
    console.error('Error checking migration status:', error);
  }
}

checkMigrationStatus();