# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Collaboration Guidelines

When working on this codebase:

### 1. Scope Management
- **Only make changes explicitly requested** - no "while I'm here" improvements
- **List planned changes before executing** - get confirmation first
- **Stick to the exact scope** - resist adding extras like comments, reorganization, or "cleanup"

### 2. Communication Pattern
Before making changes:
1. Clearly state what files will be modified
2. List the specific changes to be made
3. Wait for confirmation before proceeding
4. Use TodoWrite tool to track each requested change

### 3. Avoid Unsolicited Changes
Do NOT:
- Add comments unless specifically asked
- Reorganize code structure
- "Improve" code style or formatting
- Add documentation unless requested
- Create new files unless explicitly required

### 4. Ask Before Assuming
When unsure:
- "Should I also update X?"
- "This might affect Y - should I address it?"
- "I noticed Z - would you like me to fix that separately?"

## Commands

### Development
```bash
npm run dev          # Start development server (default port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing
```bash
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:crawl   # Run Playwright E2E tests
npm run test:crawl:ui # Run Playwright tests with UI
```

### Analysis
```bash
npm run analyze      # Analyze bundle size
npm run analyze:browser # Analyze client bundle
npm run analyze:server  # Analyze server bundle
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 14.2.3 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom anchor-branded color palette
- **Components**: CVA (class-variance-authority) for variant management
- **Analytics**: Google Tag Manager with comprehensive event tracking

### Key Architecture Patterns

#### 1. Server-First Approach
- Default to React Server Components
- Add `'use client'` only when interactivity needed (onClick, useState, etc.)
- Server components fetch data directly, client components use API routes

#### 2. API Proxy Pattern
All external API calls go through Next.js API routes (`/api/*`) to:
- Protect API keys (stored in environment variables)
- Handle CORS issues
- Add caching and error handling
- Main external API: `management.orangejelly.co.uk`

#### 3. Component Organization
```
components/
├── ui/                 # Reusable UI primitives (always import from @/components/ui)
│   ├── primitives/     # Base components (Button, Input, Badge)
│   ├── layout/         # Layout components (Container, Section, Grid)
│   └── index.ts        # Central export file
├── features/           # Business-specific components
├── hero/              # Hero section variants
└── tracking/          # Analytics components
```

#### 4. Tracking Implementation
Any component with user interaction tracking:
1. Must be a client component (`'use client'`)
2. Import from `@/lib/gtm-events`
3. Check `typeof window !== 'undefined'` before using browser APIs
4. Use snake_case for event names

Example:
```typescript
'use client'
import { trackTableBookingClick } from '@/lib/gtm-events'

<Button onClick={() => trackTableBookingClick('header_desktop')}>
  Book Table
</Button>
```

### Critical Business Rules

**Brand Usage**
- Always use "The Anchor" (never "The Anchor Pub" in content)
- Contact email: info@theanchorpub.co.uk
- Phone: 01753 682707

**Content Verification**
- All business facts must match `/docs/MASTER-FACT-CHECK-REFERENCE.md`
- Opening hours are confirmed as of January 2025
- Kitchen closed Mondays (no food service)
- No breakfast service, delivery, Sky Sports, or guest ales

**Key Files**
- `/docs/MASTER-FACT-CHECK-REFERENCE.md` - Single source of truth for all business information
- `/docs/MASTER-OFFERS-AND-CLAIMS.md` - All verified marketing claims
- `/lib/static-events.ts` - Static event data
- `/lib/constants.ts` - Business information constants

### Common Patterns

#### Component Structure
```typescript
'use client' // Only if needed

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { BaseComponentProps } from '../types'

const componentVariants = cva('base-classes', {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ }
})

export interface ComponentProps 
  extends BaseComponentProps,
    VariantProps<typeof componentVariants> {
  // Additional props
}

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants(props), className)}
        {...props}
      />
    )
  }
)
Component.displayName = 'Component'
```

#### Error Handling Pattern
```typescript
if (error) return <ErrorDisplay type="specific" error={error} />
if (loading) return <LoadingState />
if (!data) return <EmptyState />
```

### Environment Variables
```
ANCHOR_API_KEY                        # External API authentication
NEXT_PUBLIC_GTM_ID                   # Google Tag Manager ID
NEXT_PUBLIC_AVIATIONSTACK_API_KEY    # Flight tracking API
```

### Performance Optimization

**Image Handling**
- Always use Next.js Image component
- Include width, height, and sizes props
- Add blur placeholder for above-fold images
- Multiple formats configured (AVIF, WebP fallbacks)

**Bundle Optimization**
- Dynamic imports for non-critical components
- Separate chunks for vendor/UI/features
- Code splitting by route automatic with App Router

### Testing Approach

**Component Testing**
- Jest with React Testing Library
- Test files in `__tests__` folders
- Focus on user behavior over implementation

**E2E Testing**
- Playwright for critical user journeys
- Tests in `/tests` directory
- Run with `npm run test:crawl`

### Deployment

**Build Process**
1. `npm run build` creates optimized production build
2. Static pages generated at build time
3. API routes run as serverless functions
4. Images optimized on-demand

**Hosting**
- Deployed on Vercel
- Automatic deployments from main branch
- Preview deployments for pull requests

### Common Tasks

**Adding a New Page**
1. Create file in `app/[route]/page.tsx`
2. Add metadata for SEO
3. Use HeroWrapper for consistent headers
4. Include appropriate tracking components
5. Follow spacing patterns (section-spacing-* classes)

**Updating Business Information**
1. Update `/docs/MASTER-FACT-CHECK-REFERENCE.md`
2. Update any hardcoded instances in components
3. Verify consistency across all pages
4. Test build to ensure no TypeScript errors

**Adding Analytics Tracking**
1. Define event in `/lib/gtm-events.ts`
2. Make component client-side with `'use client'`
3. Import and call tracking function
4. Test in GTM Preview mode

### Debugging Tips

**Common Build Errors**
- "useClient" errors: Add `'use client'` to component
- Window undefined: Check `typeof window !== 'undefined'`
- Hydration mismatch: Ensure server/client render same content
- Import errors: Use central exports from `@/components/ui`

**Performance Issues**
- Check bundle size with `npm run analyze`
- Verify images have proper sizes prop
- Ensure heavy components use dynamic imports
- Check for unnecessary client components

## SEO & Domain Configuration

### CRITICAL: Canonical Domain Setup
**The site uses www.the-anchor.pub as the canonical domain**

#### Domain & DNS Configuration
- **DNS**: Managed by Cloudflare
- **Hosting**: Vercel
- **Canonical Domain**: `https://www.the-anchor.pub` (with www)
- **SSL/TLS**: Cloudflare MUST be set to "Full" or "Full (strict)" (NOT "Flexible")

#### Canonical URL Implementation
**DO NOT hardcode canonical URLs in layout.tsx!** This was a critical bug that made all pages claim to be the homepage.

Correct implementation:
```typescript
// app/layout.tsx - Set metadataBase only
export const metadata: Metadata = {
  metadataBase: new URL('https://www.the-anchor.pub'),
  // DO NOT add alternates.canonical here!
}

// Individual pages - Use relative canonical
export const metadata: Metadata = {
  alternates: {
    canonical: './', // Uses metadataBase + current path
  },
}
```

#### Common SEO Mistakes to Avoid
1. **Never hardcode canonical in root layout** - It makes ALL pages have the same canonical
2. **Always use www.the-anchor.pub** - The site is configured for www, not non-www
3. **Check for redirect loops** - Ensure no circular redirects in blog-redirects.json
4. **Verify imports** - Always check components are properly imported before using
5. **Keep domain consistent** - All references should use www version

#### Sitemap & Robots.txt
- Sitemap URLs must use the canonical domain (www)
- Update robots.txt to reference www URLs
- Remove duplicate entries from sitemap.ts

#### When Adding New Pages
1. Use relative canonical URLs (e.g., `canonical: '/new-page'`)
2. Ensure the page is added to sitemap.ts
3. Check that all internal links use relative paths
4. Verify no redirect conflicts

#### Cloudflare Settings
**CRITICAL**: If you see "ERR_TOO_MANY_REDIRECTS":
1. Check Cloudflare SSL/TLS is set to "Full" or "Full (strict)"
2. Disable any Cloudflare Page Rules that might cause redirects
3. Let Vercel handle www/non-www redirects, not Cloudflare

#### Testing Canonical Implementation
```bash
# Check canonical tag on any page
curl -s https://www.the-anchor.pub/[page] | grep '<link rel="canonical"'

# Verify only ONE canonical tag exists
# Verify it points to the correct URL (not homepage)
```