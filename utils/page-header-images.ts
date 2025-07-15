import fs from 'fs';
import path from 'path';

export interface HeaderImageConfig {
  src: string;
  alt: string;
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Gets the header image for a given page route
 * @param route - The page route (e.g., '/whats-on', '/food-menu')
 * @returns Image config or null if no image found
 */
export function getPageHeaderImage(route: string): HeaderImageConfig | null {
  // Convert route to folder name
  // '/' -> 'home'
  // '/whats-on' -> 'whats-on'
  // '/near-heathrow/terminal-5' -> 'near-heathrow-terminal-5'
  const folderName = route === '/' 
    ? 'home' 
    : route.replace(/\//g, '-').replace(/^-/, '');

  const headerImagesDir = path.join(process.cwd(), 'public/images/page-headers');
  const pageFolderPath = path.join(headerImagesDir, folderName);

  try {
    // Check if the folder exists
    if (!fs.existsSync(pageFolderPath)) {
      return null;
    }

    // Read all files in the folder
    const files = fs.readdirSync(pageFolderPath);
    
    // Find the first image file (any name, supported extension)
    const imageFile = files.find(file => 
      IMAGE_EXTENSIONS.some(ext => file.toLowerCase().endsWith(ext))
    );

    if (!imageFile) {
      return null;
    }

    // Return the image configuration
    return {
      src: `/images/page-headers/${folderName}/${imageFile}`,
      alt: `${route === '/' ? 'Home' : route.replace(/\//g, ' ').replace(/-/g, ' ').trim()} page header`
    };
  } catch (error) {
    console.error(`Error reading header image for route ${route}:`, error);
    return null;
  }
}

/**
 * Gets a default header image if page-specific image is not found
 */
export function getDefaultHeaderImage(): HeaderImageConfig {
  return {
    src: '/images/hero/the-anchor-pub-interior-atmosphere.jpg',
    alt: 'The Anchor pub interior'
  };
}