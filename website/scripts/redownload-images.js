#!/usr/bin/env node

/**
 * Re-download blog images with full-size URLs
 * Fixes pixelated thumbnail images
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Download an image
async function downloadImage(imageUrl, outputPath) {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(outputPath);
    const protocol = imageUrl.startsWith('https') ? https : require('http');
    
    protocol.get(imageUrl, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      require('fs').unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// Fix Wix URL to get full size
function getFullSizeUrl(thumbnailUrl) {
  if (!thumbnailUrl.includes('static.wixstatic.com')) {
    return thumbnailUrl;
  }
  
  const match = thumbnailUrl.match(/\/media\/([a-f0-9_]+~mv2\.[a-zA-Z]+)/);
  if (match) {
    return `https://static.wixstatic.com/media/${match[1]}`;
  }
  
  if (thumbnailUrl.includes('/v1/')) {
    return thumbnailUrl.split('/v1/')[0];
  }
  
  return thumbnailUrl;
}

async function redownloadImages() {
  const contentDir = path.join(__dirname, '..', 'content', 'blog');
  const publicDir = path.join(__dirname, '..', 'public', 'content', 'blog');
  
  console.log('🔍 Scanning for images to re-download...\n');
  
  // Get all blog directories
  const blogDirs = await fs.readdir(contentDir);
  let totalFixed = 0;
  
  for (const dir of blogDirs) {
    if (dir.startsWith('.') || dir === 'README.md' || dir === 'TEMPLATE.md') continue;
    
    const postPath = path.join(contentDir, dir);
    const stats = await fs.stat(postPath);
    
    if (stats.isDirectory()) {
      const indexPath = path.join(postPath, 'index.md');
      const publicPath = path.join(publicDir, dir);
      
      try {
        const content = await fs.readFile(indexPath, 'utf8');
        
        // Extract all image URLs from the markdown content
        const imageMatches = content.matchAll(/!\[.*?\]\((https:\/\/static\.wixstatic\.com[^)]+)\)/g);
        const foundImages = Array.from(imageMatches);
        
        if (foundImages.length > 0) {
          console.log(`📁 ${dir}`);
          await fs.mkdir(publicPath, { recursive: true });
          
          for (const match of foundImages) {
            const originalUrl = match[1];
            
            // Check if it's a thumbnail URL
            if (originalUrl.includes('/v1/') || originalUrl.includes('fill') || originalUrl.includes('w_')) {
              const fullSizeUrl = getFullSizeUrl(originalUrl);
              console.log(`  🔄 Found thumbnail URL`);
              console.log(`     Old: ${originalUrl.substring(0, 80)}...`);
              console.log(`     New: ${fullSizeUrl}`);
              
              // Determine filename based on existing images
              const existingFiles = await fs.readdir(publicPath).catch(() => []);
              const imageCount = existingFiles.filter(f => f.match(/\.(jpg|jpeg|png|gif|webp)$/i)).length;
              const ext = path.extname(new URL(fullSizeUrl).pathname) || '.jpg';
              const filename = imageCount === 0 ? `hero${ext}` : `image-${imageCount}${ext}`;
              const imagePath = path.join(publicPath, filename);
              
              try {
                await downloadImage(fullSizeUrl, imagePath);
                console.log(`     ✅ Downloaded as: ${filename}`);
                totalFixed++;
              } catch (error) {
                console.log(`     ❌ Failed to download: ${error.message}`);
              }
            }
          }
          console.log('');
        }
      } catch (error) {
        console.error(`Error processing ${dir}:`, error.message);
      }
    }
  }
  
  console.log(`\n✅ Re-downloaded ${totalFixed} full-size images`);
}

redownloadImages().catch(console.error);