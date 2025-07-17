const sharp = require('sharp');
const { readFile, writeFile, mkdir } = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path');

async function optimizeHeroImage() {
  const inputPath = 'public/images/page-headers/home/Page Headers - Homepage.jpg';
  const outputDir = 'public/images/page-headers/home/optimized';
  
  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }
  
  console.log('Optimizing homepage hero image...');
  
  // Get original metadata
  const metadata = await sharp(inputPath).metadata();
  console.log(`Original: ${metadata.width}x${metadata.height}, ${(metadata.size / 1024 / 1024).toFixed(2)}MB`);
  
  // Generate optimized versions
  const sizes = [
    { width: 640, suffix: 'mobile' },
    { width: 1024, suffix: 'tablet' },
    { width: 1920, suffix: 'desktop' },
  ];
  
  for (const { width, suffix } of sizes) {
    // WebP version
    const webpPath = path.join(outputDir, `hero-${suffix}.webp`);
    await sharp(inputPath)
      .resize(width, null, { 
        withoutEnlargement: true,
        fit: 'cover'
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);
    
    const webpStats = await sharp(webpPath).metadata();
    console.log(`Created ${suffix} WebP: ${webpStats.width}x${webpStats.height}, ${(webpStats.size / 1024).toFixed(1)}KB`);
    
    // AVIF version
    const avifPath = path.join(outputDir, `hero-${suffix}.avif`);
    await sharp(inputPath)
      .resize(width, null, { 
        withoutEnlargement: true,
        fit: 'cover'
      })
      .avif({ quality: 80, effort: 6 })
      .toFile(avifPath);
    
    const avifStats = await sharp(avifPath).metadata();
    console.log(`Created ${suffix} AVIF: ${avifStats.width}x${avifStats.height}, ${(avifStats.size / 1024).toFixed(1)}KB`);
    
    // Optimized JPEG fallback
    const jpegPath = path.join(outputDir, `hero-${suffix}.jpg`);
    await sharp(inputPath)
      .resize(width, null, { 
        withoutEnlargement: true,
        fit: 'cover'
      })
      .jpeg({ 
        quality: 82, 
        progressive: true,
        optimizeScans: true,
        mozjpeg: true
      })
      .toFile(jpegPath);
    
    const jpegStats = await sharp(jpegPath).metadata();
    console.log(`Created ${suffix} JPEG: ${jpegStats.width}x${jpegStats.height}, ${(jpegStats.size / 1024).toFixed(1)}KB`);
  }
  
  // Generate blur placeholder (tiny version)
  const blurPath = path.join(outputDir, 'hero-blur.jpg');
  await sharp(inputPath)
    .resize(10, null, { 
      withoutEnlargement: true,
      fit: 'cover'
    })
    .blur(1)
    .jpeg({ quality: 60 })
    .toFile(blurPath);
  
  // Convert to base64
  const blurBuffer = await readFile(blurPath);
  const blurDataURL = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;
  
  // Save metadata
  const metadataPath = path.join(outputDir, 'hero-metadata.json');
  await writeFile(metadataPath, JSON.stringify({
    original: {
      width: metadata.width,
      height: metadata.height,
      size: metadata.size,
      format: metadata.format
    },
    blurDataURL,
    optimized: {
      mobile: '/images/page-headers/home/optimized/hero-mobile',
      tablet: '/images/page-headers/home/optimized/hero-tablet',
      desktop: '/images/page-headers/home/optimized/hero-desktop'
    },
    generatedAt: new Date().toISOString()
  }, null, 2));
  
  console.log('\nOptimization complete!');
  console.log(`Blur placeholder: ${blurDataURL.substring(0, 50)}...`);
}

optimizeHeroImage().catch(console.error);