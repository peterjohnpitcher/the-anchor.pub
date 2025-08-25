#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { existsSync } = require('fs');

// Configuration
const CONFIG = {
  maxWidth: 1920,
  maxHeight: 1080,
  jpegQuality: 75,
  pngQuality: 85,
  webpQuality: 80,
  // Files larger than this will be optimized
  sizeThreshold: 500 * 1024, // 500KB
  // Specific optimizations for different directories
  blogImageMaxWidth: 1200,
  blogThumbnailMaxWidth: 600,
};

// Track statistics
let stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  totalSizeBefore: 0,
  totalSizeAfter: 0,
};

async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const sizeBefore = await getFileSize(inputPath);
    
    // Skip if file is already small
    if (sizeBefore < CONFIG.sizeThreshold) {
      console.log(`  ⏭️  Skipping ${path.basename(inputPath)} (already optimized: ${(sizeBefore / 1024).toFixed(1)}KB)`);
      stats.skipped++;
      return;
    }

    const ext = path.extname(inputPath).toLowerCase();
    let processor = sharp(inputPath);
    
    // Get image metadata
    const metadata = await processor.metadata();
    
    // Determine max dimensions based on location
    let maxWidth = CONFIG.maxWidth;
    let maxHeight = CONFIG.maxHeight;
    
    if (inputPath.includes('/blog/')) {
      if (inputPath.includes('thumbnail') || inputPath.includes('thumb')) {
        maxWidth = CONFIG.blogThumbnailMaxWidth;
      } else {
        maxWidth = CONFIG.blogImageMaxWidth;
      }
    }
    
    // Only resize if image is larger than max dimensions
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      processor = processor.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Apply format-specific optimizations
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        processor = processor.jpeg({
          quality: CONFIG.jpegQuality,
          progressive: true,
          mozjpeg: true,
        });
        break;
      case '.png':
        processor = processor.png({
          quality: CONFIG.pngQuality,
          progressive: true,
          compressionLevel: 9,
          palette: true,
        });
        break;
      case '.webp':
        processor = processor.webp({
          quality: CONFIG.webpQuality,
          lossless: false,
          effort: 6,
        });
        break;
      default:
        console.log(`  ⚠️  Unsupported format: ${ext}`);
        stats.skipped++;
        return;
    }
    
    // Save optimized image
    await processor.toFile(outputPath);
    
    const sizeAfter = await getFileSize(outputPath);
    const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
    
    stats.processed++;
    stats.totalSizeBefore += sizeBefore;
    stats.totalSizeAfter += sizeAfter;
    
    console.log(`  ✅ Optimized ${path.basename(inputPath)}: ${(sizeBefore / 1024).toFixed(1)}KB → ${(sizeAfter / 1024).toFixed(1)}KB (-${reduction}%)`);
    
  } catch (error) {
    console.error(`  ❌ Error processing ${inputPath}:`, error.message);
    stats.errors++;
  }
}

async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and .git directories
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next') {
          continue;
        }
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          // Create backup directory
          const backupDir = path.join(path.dirname(fullPath), '.backup');
          if (!existsSync(backupDir)) {
            await fs.mkdir(backupDir, { recursive: true });
          }
          
          // Backup original file
          const backupPath = path.join(backupDir, entry.name);
          await fs.copyFile(fullPath, backupPath);
          
          // Optimize in place
          await optimizeImage(backupPath, fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const targetDir = args[0] || './public';
  
  console.log('🖼️  Image Optimization Tool');
  console.log('===========================');
  console.log(`Target directory: ${path.resolve(targetDir)}`);
  console.log(`Size threshold: ${CONFIG.sizeThreshold / 1024}KB`);
  console.log(`JPEG quality: ${CONFIG.jpegQuality}`);
  console.log(`PNG quality: ${CONFIG.pngQuality}`);
  console.log(`WebP quality: ${CONFIG.webpQuality}`);
  console.log('');
  console.log('Processing images...');
  console.log('');
  
  const startTime = Date.now();
  
  await processDirectory(targetDir);
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('');
  console.log('📊 Optimization Complete');
  console.log('========================');
  console.log(`✅ Processed: ${stats.processed} images`);
  console.log(`⏭️  Skipped: ${stats.skipped} images`);
  console.log(`❌ Errors: ${stats.errors} images`);
  console.log('');
  
  if (stats.processed > 0) {
    const totalReduction = ((stats.totalSizeBefore - stats.totalSizeAfter) / stats.totalSizeBefore * 100).toFixed(1);
    console.log(`📦 Size before: ${(stats.totalSizeBefore / 1024 / 1024).toFixed(2)}MB`);
    console.log(`📦 Size after: ${(stats.totalSizeAfter / 1024 / 1024).toFixed(2)}MB`);
    console.log(`🎯 Total reduction: ${(stats.totalSizeBefore - stats.totalSizeAfter) / 1024 / 1024}MB (${totalReduction}%)`);
  }
  
  console.log(`⏱️  Time taken: ${duration}s`);
  console.log('');
  console.log('💡 Original images backed up in .backup directories');
  console.log('   To restore: rm -rf [image] && mv .backup/[image] .');
}

// Handle specific problematic directory first
async function optimizeProblematicDirectory() {
  const problemDir = './public/content/blog/relive-the-laughter-at-the-anchor-s-gameshow-house';
  
  if (existsSync(problemDir)) {
    console.log('🚨 Found problematic directory with 302MB of images!');
    console.log('   Processing this directory first with aggressive optimization...');
    console.log('');
    
    // Use more aggressive settings for this directory
    const originalQuality = CONFIG.jpegQuality;
    CONFIG.jpegQuality = 60; // More aggressive compression
    CONFIG.maxWidth = 1200; // Smaller max width
    CONFIG.maxHeight = 800; // Smaller max height
    
    await processDirectory(problemDir);
    
    // Restore original settings
    CONFIG.jpegQuality = originalQuality;
    CONFIG.maxWidth = 1920;
    CONFIG.maxHeight = 1080;
    
    console.log('');
    console.log('✅ Problematic directory processed');
    console.log('');
  }
}

// Run the script
if (require.main === module) {
  optimizeProblematicDirectory()
    .then(() => main())
    .catch(console.error);
}

module.exports = { optimizeImage, processDirectory };