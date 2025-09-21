import fs from 'fs';
import path from 'path';

export interface HeaderImageConfig {
  src: string;
  alt: string;
  isFallback?: boolean;
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Descriptive alt text for each page header
const PAGE_HEADER_ALT_TEXT: Record<string, string> = {
  'home': 'The Anchor pub entrance with warm lighting and traditional British pub signage',
  'whats-on': 'Live entertainment stage at The Anchor with colorful lighting and audience seating',
  'food-menu': 'Delicious pub food spread including burgers, fish and chips on wooden table',
  'drinks': 'Well-stocked bar at The Anchor showing beer taps, spirits, and wine selection',
  'sunday-lunch': 'Traditional Sunday roast dinner with Yorkshire pudding, vegetables, and gravy',
  'beer-garden': 'Spacious outdoor beer garden with wooden tables, umbrellas and string lights',
  'find-us': 'The Anchor pub exterior on Horton Road, Stanwell Moor with clear signage',
  'near-heathrow': 'The Anchor pub with planes visible overhead, showcasing proximity to Heathrow',
  'blog': 'Cozy interior corner of The Anchor with vintage decor and warm atmosphere',
  'events': 'Packed event night at The Anchor with crowd enjoying live entertainment',
  'private-party-venue': 'Private function room set up for celebration with decorations and seating',
  'function-room-hire': 'Versatile function room at The Anchor ready for corporate or private events',
  'corporate-events': 'Professional meeting setup in The Anchor function room with presentation area',
  'christmas-parties': 'Festively decorated dining area with Christmas tree and holiday lights',
  'drag-shows': 'Drag performer on stage at The Anchor in glamorous outfit entertaining crowd',
  'pizza-tuesday': 'Fresh stone-baked pizzas on display for Pizza Tuesday special offer',
  'ashford-pub': 'The Anchor pub showcasing its convenient location for Ashford residents',
  'staines-pub': 'Traditional British pub atmosphere at The Anchor, perfect for Staines locals',
  'm25-junction-14-pub': 'The Anchor pub exterior with easy access from M25 Junction 14',
  'stanwell-pub': 'The heart of Stanwell community - The Anchor pub welcoming entrance',
  'windsor-pub': 'The Anchor pub traditional British charm, short drive from Windsor',
  'heathrow-hotels-pub': 'The Anchor pub ideal for hotel guests, with planes visible overhead',
  'bedfont-pub': 'Welcoming pub atmosphere at The Anchor for Bedfont community',
  'egham-pub': 'The Anchor traditional pub setting perfect for Egham visitors',
  'feltham-pub': 'Local favorite The Anchor pub serving Feltham community',
  'near-heathrow-terminal-2': 'Convenient pub location near Terminal 2 with aircraft in background',
  'near-heathrow-terminal-3': 'The Anchor pub garden with Terminal 3 flight path visible above',
  'near-heathrow-terminal-4': 'Traditional British pub experience near Terminal 4 at The Anchor',
  'near-heathrow-terminal-5': 'The Anchor pub exterior with Terminal 5 aircraft passing overhead'
};

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
    if (fs.existsSync(pageFolderPath)) {
      // Read all files in the folder
      const files = fs.readdirSync(pageFolderPath);
      
      // Find the first image file (any name, supported extension)
      const imageFile = files.find(file => 
        IMAGE_EXTENSIONS.some(ext => file.toLowerCase().endsWith(ext))
      );

      if (imageFile) {
        // Get descriptive alt text or fall back to a generated one
        const altText = PAGE_HEADER_ALT_TEXT[folderName] || 
          `The Anchor pub ${route === '/' ? 'homepage' : route.replace(/\//g, ' ').replace(/-/g, ' ').trim()} header image`;

        // Return the image configuration
        return {
          src: `/images/page-headers/${folderName}/${imageFile}`,
          alt: altText,
          isFallback: false
        };
      }
    }

    // If no image found for this route, check if it's a subpage and try to inherit from parent
    if (route.includes('/') && route !== '/') {
      const segments = route.split('/').filter(Boolean);
      
      // Try parent paths from most specific to least specific
      for (let i = segments.length - 1; i > 0; i--) {
        const parentRoute = '/' + segments.slice(0, i).join('/');
        const parentImage = getPageHeaderImage(parentRoute);
        
        if (parentImage) {
          // Adjust alt text for subpage
          const subpageAltText = PAGE_HEADER_ALT_TEXT[folderName] || 
            parentImage.alt.replace(' header image', '') + ` - ${segments[segments.length - 1].replace(/-/g, ' ')}`;
          
          return {
            src: parentImage.src,
            alt: subpageAltText,
            isFallback: true
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error(`Error reading header image for route ${route}:`, error);
    return null;
  }
}

/**
 * Gets a default header image if page-specific image is not found
 * Uses the homepage hero image as the default
 */
export function getDefaultHeaderImage(): HeaderImageConfig {
  return {
    src: '/images/page-headers/home/page-headers-homepage.jpg',
    alt: 'The Anchor pub entrance with warm lighting and traditional British pub signage',
    isFallback: true
  };
}
