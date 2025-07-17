# Image Directory Structure

This directory contains all images for The Anchor website. Below is a guide for what images should be placed in each folder.

## Critical Images Required

These images are referenced in the code and must be added before going live:

1. **`/images/the-anchor-pub-stanwell-moor.jpg`**
   - Main pub exterior image
   - Used in metadata and SEO
   - Recommended: 1200x630px for social sharing

2. **`/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg`**
   - Venue exterior shot
   - Used in OpenGraph tags
   - Recommended: 1200x630px minimum

## Folder Structure

### `/branding/`
- Logo files (transparent PNGs)
- `the-anchor-pub-logo-white-transparent.png` - For dark backgrounds
- `the-anchor-pub-logo-black-transparent.png` - For light backgrounds

### `/events/`
Event-related images organized by type:
- `/drag-shows/` - Drag show performances
- `/christmas/` - Christmas party images
- `/corporate/` - Corporate event setups
- Default event images

### `/food/`
Food photography:
- `/sunday-roast/` - Sunday roast dishes
- Individual dish photos
- Menu highlights

### `/garden/beer-garden/`
- Beer garden views
- Plane spotting shots
- Outdoor seating areas

### `/hero/`
Hero images for main sections:
- Interior atmosphere shots
- Exterior views
- High-quality, full-width images (1920px+ width recommended)

### `/venue/`
General venue photography:
- Interior spaces
- Bar area
- Seating areas

### `/near-heathrow/`
Location-specific images showing proximity to Heathrow

### `/page-headers/`
Dynamic page header images. Each subfolder corresponds to a route:
- `/home/` - Homepage header
- `/whats-on/` - Events page header
- `/food-menu/` - Food menu header
- `/drinks/` - Drinks menu header
- etc.

**Note**: The system automatically looks for images in folders matching the route name. 
For example, the route `/near-heathrow/terminal-5` will look for images in `/page-headers/near-heathrow-terminal-5/`.

## Image Guidelines

### Formats
- Use `.jpg` for photographs
- Use `.png` for logos and graphics with transparency
- Consider `.webp` for better performance (Next.js will handle conversion)

### Sizes
- Hero images: 1920x1080px minimum
- Gallery images: 800x600px minimum
- Thumbnails: 400x300px
- Social sharing: 1200x630px

### Naming Convention
- Use descriptive names: `the-anchor-[description]-[location].jpg`
- Keep names lowercase
- Use hyphens instead of spaces
- Include location context where relevant

### Optimization
- Compress images before uploading
- Keep file sizes under 500KB where possible
- Higher quality for hero images is acceptable (up to 1MB)

## Missing Images List

Track which images still need to be added:

- [ ] `/images/the-anchor-pub-stanwell-moor.jpg`
- [ ] `/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg`
- [ ] `/images/branding/the-anchor-pub-logo-white-transparent.png`
- [ ] `/images/branding/the-anchor-pub-logo-black-transparent.png`
- [ ] `/images/hero/the-anchor-pub-interior-atmosphere.jpg`
- [ ] `/images/events/drag-shows/the-anchor-drag-show-nikki-manfadge-stanwell-moor.jpg`
- [ ] `/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg`
- [ ] `/images/garden/beer-garden/the-anchor-beer-garden-heathrow-flight-path.jpg`
- [ ] `/images/page-headers/home/Page Headers - Homepage.jpg`

Add more items as you identify missing images during testing.