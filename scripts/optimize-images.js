const sharp = require('sharp');
const { readFile, writeFile, mkdir } = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path');
const { globby } = require('globby');
const { getBase64 } = require('@plaiceholder/base64');

// Configuration
const FORMATS = ['webp', 'avif'];
const SIZES = {
  hero: [640, 1024, 1920, 2560],
  card: [256, 384, 512, 768],
  thumbnail: [128, 192, 256, 384]
};

const QUALITY = {
  hero: { webp: 85, avif: 80, jpg: 82 },
  card: { webp: 82, avif: 77, jpg: 80 },
  thumbnail: { webp: 80, avif: 75, jpg: 78 }
};

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function generateBlurPlaceholder(imagePath) {
  try {
    const base64 = await getBase64(imagePath);
    return base64;
  } catch (error) {
    console.warn(`Failed to generate blur placeholder for ${imagePath}:`, error.message);
    // Return a default blur placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg==';
  }
}

async function optimizeImage(inputPath, outputDir, type = 'hero') {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const sizes = SIZES[type] || SIZES.hero;
  const quality = QUALITY[type] || QUALITY.hero;
  
  console.log(`Optimizing ${inputPath} as ${type}...`);
  
  // Get original image metadata
  const metadata = await sharp(inputPath).metadata();
  const aspectRatio = metadata.width / metadata.height;
  
  // Generate blur placeholder
  const blurDataURL = await generateBlurPlaceholder(inputPath);
  
  const optimizedImages = [];
  
  // Generate responsive sizes
  for (const width of sizes) {
    // Skip if the original is smaller than the target size
    if (width > metadata.width) continue;
    
    const height = Math.round(width / aspectRatio);
    
    // Generate WebP and AVIF versions
    for (const format of FORMATS) {
      const outputPath = path.join(
        outputDir,
        `${filename}-${width}w.${format}`
      );
      
      await sharp(inputPath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .toFormat(format, {
          quality: quality[format] || 80,
          effort: 6 // Higher effort for better compression
        })
        .toFile(outputPath);
      
      optimizedImages.push({
        width,
        height,
        format,
        path: outputPath.replace('public/', '/')
      });
      
      console.log(`  Created: ${outputPath}`);
    }
    
    // Also create optimized JPEG
    const jpegPath = path.join(
      outputDir,
      `${filename}-${width}w.jpg`
    );
    
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: quality.jpg || 82,
        progressive: true,
        optimizeScans: true
      })
      .toFile(jpegPath);
    
    optimizedImages.push({
      width,
      height,
      format: 'jpg',
      path: jpegPath.replace('public/', '/')
    });
  }
  
  // Create a metadata file
  const metadataPath = path.join(outputDir, `${filename}.meta.json`);
  await writeFile(metadataPath, JSON.stringify({
    original: {
      width: metadata.width,
      height: metadata.height,
      aspectRatio,
      size: metadata.size
    },
    blurDataURL,
    optimizedImages,
    generatedAt: new Date().toISOString()
  }, null, 2));
  
  console.log(`  Metadata saved to: ${metadataPath}`);
  
  return { blurDataURL, optimizedImages };
}

async function main() {
  // Priority: Optimize hero images first
  const heroImages = await globby([
    'public/images/page-headers/**/*.{jpg,jpeg,png}',
    'public/images/hero/**/*.{jpg,jpeg,png}'
  ]);
  
  console.log(`Found ${heroImages.length} hero images to optimize`);
  
  for (const imagePath of heroImages) {
    const dir = path.dirname(imagePath);
    const optimizedDir = path.join(dir, 'optimized');
    await ensureDir(optimizedDir);
    
    try {
      await optimizeImage(imagePath, optimizedDir, 'hero');
    } catch (error) {
      console.error(`Failed to optimize ${imagePath}:`, error.message);
    }
  }
  
  // Optimize event and card images
  const cardImages = await globby([
    'public/images/events/**/*.{jpg,jpeg,png}',
    'public/images/food/**/*.{jpg,jpeg,png}'
  ]);
  
  console.log(`\nFound ${cardImages.length} card images to optimize`);
  
  for (const imagePath of cardImages) {
    const dir = path.dirname(imagePath);
    const optimizedDir = path.join(dir, 'optimized');
    await ensureDir(optimizedDir);
    
    try {
      await optimizeImage(imagePath, optimizedDir, 'card');
    } catch (error) {
      console.error(`Failed to optimize ${imagePath}:`, error.message);
    }
  }
  
  console.log('\nImage optimization complete!');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, generateBlurPlaceholder };