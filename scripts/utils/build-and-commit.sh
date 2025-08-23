#!/bin/bash

echo "Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build successful! Proceeding with git commit..."
    
    # Stage all changes
    git add .
    
    # Show what's being committed
    echo "Files to be committed:"
    git status --short
    
    # Create comprehensive commit
    git commit -m "feat: Complete website overhaul - accessibility, SEO, UX, and component standardization

## Accessibility Improvements (WCAG 2.1 Compliance)
- Add skip navigation links to root layout for keyboard users
- Fix all missing alt text on images with descriptive content
- Add aria-hidden to decorative SVGs and icons
- Fix heading hierarchy violations across all pages
- Replace div onClick handlers with proper button elements
- Add ARIA landmarks (main, nav, aside) to layout components
- Fix color contrast issues to meet WCAG AA standards
- Add proper focus indicators with visible outlines
- Fix touch targets to minimum 44x44px size
- Fix tab order in complex layouts with roving tabindex
- Add aria-live regions for dynamic content updates
- Add descriptive link text replacing generic 'click here'

## SEO Optimizations
- Add canonical URLs to prevent duplicate content issues
- Fix meta descriptions over 160 characters
- Add Twitter card metadata to all pages
- Fix incomplete schema.org markup for LocalBusiness, Menu, Events
- Implement breadcrumb navigation with schema markup
- Add resource hints (preconnect, dns-prefetch) for performance

## Performance Enhancements
- Optimize all images with responsive srcset and sizes
- Implement lazy loading for below-fold images
- Add blur placeholders to hero images
- Implement code splitting for routes
- Configure webpack chunks for UI components
- Remove unused components and test files

## UX Improvements
- Add loading states for all async operations
- Implement user-friendly error messages with helpful context
- Fix mobile font sizes under 16px for readability
- Remove fixed widths causing horizontal scroll
- Add scroll-to-top button for long pages
- Improve form labels and validation messages

## Component Standardization
- Create 6 new utility components:
  * IconText - consistent icon/text pairing
  * JourneyTime - travel time display
  * ContactLink - accessible contact links
  * EventMetadata - standardized event info
  * PriceDisplay - consistent price formatting
  * OpeningStatus - real-time open/closed status
- Standardize component library with TypeScript interfaces
- Implement consistent error handling patterns

## British English Corrections
- Fix spelling: Cheque → Check throughout codebase
- Fix Organization → Organisation in schema

## Documentation Updates
- Update README.md with new component patterns
- Add component usage guides
- Update style guide with accessibility standards
- Document SEO implementation strategies

## Configuration Changes
- Update package.json with new dependencies
- Add jest configuration for testing
- Configure Next.js for optimized builds
- Add TypeScript strict mode settings

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    
    # Show the commit
    echo "Commit created:"
    git log -1 --oneline
    
    # Push to GitHub
    echo "Pushing to GitHub..."
    git push origin main
    
    echo "All done! Changes have been committed and pushed to GitHub."
else
    echo "Build failed! Please fix the errors before committing."
    exit 1
fi