#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const BLOG_DIR = path.join(process.cwd(), 'public', 'content', 'blog');
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 85;

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let processedCount = 0;
let skippedCount = 0;

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

async function optimizeImage(filePath) {
  try {
    const originalSize = await getFileSize(filePath);
    totalOriginalSize += originalSize;
    
    // Skip if already small (< 200KB)
    if (originalSize < 200 * 1024) {
      skippedCount++;
      totalOptimizedSize += originalSize;
      return;
    }
    
    const ext = path.extname(filePath).toLowerCase();
    const metadata = await sharp(filePath).metadata();
    
    // Calculate new dimensions
    let newWidth = metadata.width;
    let newHeight = metadata.height;
    
    if (metadata.width > MAX_WIDTH) {
      newWidth = MAX_WIDTH;
      newHeight = Math.round((MAX_WIDTH / metadata.width) * metadata.height);
    }
    
    if (newHeight > MAX_HEIGHT) {
      newHeight = MAX_HEIGHT;
      newWidth = Math.round((MAX_HEIGHT / metadata.height) * metadata.width);
    }
    
    // Create optimized version
    let pipeline = sharp(filePath)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    
    // Apply format-specific optimizations
    if (ext === '.png') {
      // Convert PNG to JPEG if no transparency
      if (metadata.channels === 3) {
        const jpegPath = filePath.replace('.png', '.jpg');
        await pipeline
          .jpeg({ quality: JPEG_QUALITY, progressive: true })
          .toFile(jpegPath);
        
        const newSize = await getFileSize(jpegPath);
        
        // Only replace if significantly smaller
        if (newSize < originalSize * 0.7) {
          await fs.unlink(filePath);
          console.log(`✓ Converted PNG to JPEG: ${path.basename(filePath)} (${formatSize(originalSize)} → ${formatSize(newSize)})`);
          totalOptimizedSize += newSize;
        } else {
          // Keep PNG but optimize it
          await fs.unlink(jpegPath);
          await pipeline
            .png({ quality: 90, compressionLevel: 9 })
            .toFile(filePath + '.tmp');
          
          await fs.rename(filePath + '.tmp', filePath);
          const newSize = await getFileSize(filePath);
          console.log(`✓ Optimized PNG: ${path.basename(filePath)} (${formatSize(originalSize)} → ${formatSize(newSize)})`);
          totalOptimizedSize += newSize;
        }
      } else {
        // PNG with transparency - just optimize
        await pipeline
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(filePath + '.tmp');
        
        await fs.rename(filePath + '.tmp', filePath);
        const newSize = await getFileSize(filePath);
        console.log(`✓ Optimized PNG: ${path.basename(filePath)} (${formatSize(originalSize)} → ${formatSize(newSize)})`);
        totalOptimizedSize += newSize;
      }
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(filePath + '.tmp');
      
      await fs.rename(filePath + '.tmp', filePath);
      const newSize = await getFileSize(filePath);
      console.log(`✓ Optimized JPEG: ${path.basename(filePath)} (${formatSize(originalSize)} → ${formatSize(newSize)})`);
      totalOptimizedSize += newSize;
    }
    
    processedCount++;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    // Count original size even on error
    totalOptimizedSize += await getFileSize(filePath);
  }
}

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        await optimizeImage(fullPath);
      }
    }
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
}

async function main() {
  console.log('🖼️  Starting blog image optimization...');
  console.log(`📁 Directory: ${BLOG_DIR}`);
  console.log(`📐 Max dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}`);
  console.log(`🎨 JPEG quality: ${JPEG_QUALITY}%\n`);
  
  const startTime = Date.now();
  
  try {
    await processDirectory(BLOG_DIR);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const savedBytes = totalOriginalSize - totalOptimizedSize;
    const savedPercent = ((savedBytes / totalOriginalSize) * 100).toFixed(1);
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Optimization complete!\n');
    console.log(`📊 Statistics:`);
    console.log(`   • Processed: ${processedCount} images`);
    console.log(`   • Skipped: ${skippedCount} images (already small)`);
    console.log(`   • Original size: ${formatSize(totalOriginalSize)}`);
    console.log(`   • Optimized size: ${formatSize(totalOptimizedSize)}`);
    console.log(`   • Space saved: ${formatSize(savedBytes)} (${savedPercent}%)`);
    console.log(`   • Duration: ${duration}s`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();