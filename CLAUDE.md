# CLAUDE.md - AI Development Standards for The Anchor

> Comprehensive collaboration guidelines for Claude Code when working with The Anchor Pub codebase

## Table of Contents

1. [Core Principles](#core-principles)
2. [Collaboration Guidelines](#collaboration-guidelines)
3. [Code Standards](#code-standards)
4. [Project Architecture](#project-architecture)
5. [Testing & Quality Assurance](#testing--quality-assurance)
6. [Development Workflow](#development-workflow)
7. [Commands & Scripts](#commands--scripts)
8. [Critical Business Rules](#critical-business-rules)
9. [Common Tasks & Patterns](#common-tasks--patterns)
10. [Security & Safety](#security--safety)

## Core Principles

### Foundation Rules
1. **Scope Management First**: Only make changes explicitly requested - no "while I'm here" improvements
2. **Test Everything**: Run tests and linting after every change
3. **Consistency Over Perfection**: Follow existing patterns in the codebase
4. **Security First**: Never commit secrets, API keys, or sensitive data
5. **Documentation of Intent**: Code shows what, comments explain why (when requested)
6. **Fail Fast, Recover Gracefully**: Validate inputs, handle errors appropriately

## Collaboration Guidelines

### Communication Pattern
**Before making changes:**
1. Clearly state what files will be modified
2. List the specific changes to be made
3. Use TodoWrite tool to track each requested change
4. Wait for confirmation before proceeding (when unclear)

### Response Standards
- **Be Concise**: Maximum 4 lines of response text (excluding code/tools)
- **No Preamble**: Answer directly without unnecessary introduction
- **Reference Locations**: Use `file_path:line_number` format
- **Batch Operations**: Use parallel tool calls when possible

### Avoid Unsolicited Changes
**DO NOT:**
- Add comments unless specifically asked
- Reorganize code structure without request
- "Improve" code style or formatting
- Add documentation unless requested
- Create new files unless explicitly required
- Update git config or push without explicit request

### When Uncertain, Ask
- "Should I also update X?"
- "This might affect Y - should I address it?"
- "I noticed Z - would you like me to fix that separately?"

## Code Standards

### TypeScript/JavaScript Conventions
```typescript
// Variables and functions: camelCase
const userName = "John";
function calculateAccuracy() {}

// React Components: PascalCase
export function BookingWizard() {}

// Files: kebab-case for routes, PascalCase for components
// app/book-table/page.tsx
// components/BookingWizard.tsx

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_ENDPOINT = "https://management.orangejelly.co.uk";

// Types/Interfaces: PascalCase
interface BookingData {}
type ApiResponse = {};
```

### React/Next.js Patterns
```typescript
// Server Components (default)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Components (only when needed)
'use client'
import { useState } from 'react';
export function InteractiveComponent() {}

// Always use forwardRef for UI components
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {}
);
```

### CVA Pattern for Components
```typescript
const componentVariants = cva('base-classes', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})
```

## Project Architecture

### Technology Stack
- **Framework**: Next.js 14.2.3 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom anchor-branded palette
- **Components**: CVA for variant management
- **Analytics**: Google Tag Manager
- **External API**: management.orangejelly.co.uk

### Directory Structure
```
the-anchor.pub/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (proxy pattern)
│   ├── book-table/        # Booking flow
│   └── [route]/page.tsx   # Route pages
├── components/
│   ├── ui/                # Reusable UI primitives
│   │   ├── primitives/    # Button, Input, Badge
│   │   ├── layout/        # Container, Section, Grid
│   │   └── index.ts       # Central exports
│   ├── features/          # Business components
│   └── tracking/          # Analytics components
├── lib/                   # Utilities and helpers
│   ├── api/              # API client code
│   ├── gtm-events.ts     # Analytics tracking
│   ├── constants.ts      # Business constants
│   └── hours-utils.ts    # Business hours logic
├── public/               # Static assets
├── docs/                 # Documentation
│   ├── MASTER-FACT-CHECK-REFERENCE.md
│   └── COMPLETE_API_DOCUMENTATION.md
└── tests/               # Test files
```

### Key Architecture Patterns

#### 1. Server-First Approach
- Default to React Server Components
- Add `'use client'` only for interactivity (onClick, useState)
- Server components fetch data directly

#### 2. API Proxy Pattern
All external API calls go through Next.js API routes:
- Protects API keys (environment variables)
- Handles CORS issues
- Adds caching and error handling
- Centralizes API logic

#### 3. Unified Business Logic
- Single source of truth for hours/kitchen status
- Centralized in `/lib/hours-utils.ts`
- Consistent handling across all endpoints

## Testing & Quality Assurance

### Testing Requirements
```bash
# Always run after changes:
npm run build        # Ensure compilation succeeds
npm run lint         # Check code quality
npm test            # Run unit tests
```

### Testing Checklist
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] Linting passes
- [ ] Tests pass
- [ ] Manual testing of affected features
- [ ] Check for console errors in browser

### Common Build Errors & Fixes
```typescript
// "useClient" errors: Add 'use client' to component
'use client'  // Add at top of file

// Window undefined: Check environment
if (typeof window !== 'undefined') {
  // Browser-only code
}

// Hydration mismatch: Ensure consistent rendering
// Use useEffect for client-only logic
```

## Development Workflow

### Git Standards

#### Branch Strategy
- Work directly on `main` for client projects
- Create feature branches only for major changes

#### Commit Messages
```bash
# Follow conventional commits
feat: add table booking for special events
fix: resolve Monday kitchen hours display
refactor: consolidate API business hours logic
docs: update CLAUDE.md with new standards
test: add booking flow integration tests
```

#### Commit Process
```bash
# 1. Stage changes
git add -A

# 2. Commit with descriptive message
git commit -m "fix: ensure Monday shows as drinks-only in calendar

- Updated business hours logic to default Monday kitchen closed
- Fixed calendar display consistency
- Added proper fallback for dates without API data

Co-Authored-By: Claude <noreply@anthropic.com>"

# 3. ONLY push when explicitly requested
git push origin main
```

### Pull Request Creation
When requested to create a PR:
1. Create branch if needed
2. Push with -u flag if new branch
3. Use `gh pr create` with proper format:
```bash
gh pr create --title "Fix Monday kitchen hours display" --body "$(cat <<'EOF'
## Summary
- Fixed inconsistent Monday display in booking calendar
- Implemented business rule: Monday kitchen closed by default
- Added proper API data fallback logic

## Test plan
- [x] Calendar shows all Mondays as drinks-only (blue)
- [x] Special hours can override Monday kitchen status
- [x] Build passes without errors
- [x] No TypeScript issues

Generated with Claude Code
EOF
)"
```

## Commands & Scripts

### Development
```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
```

### Testing
```bash
npm test                  # Run unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:crawl       # E2E tests (Playwright)
npm run test:crawl:ui    # E2E with UI
```

### Analysis & Debugging
```bash
npm run analyze              # Bundle size analysis
npm run analyze:browser      # Client bundle
npm run analyze:server       # Server bundle

# Check for issues
npx tsc --noEmit            # TypeScript check
npx next lint               # Linting
```

## Critical Business Rules

### Brand Standards
- **Always use**: "The Anchor" (never "The Anchor Pub" in content)
- **Contact**: info@theanchorpub.co.uk | 01753 682707
- **Domain**: www.the-anchor.pub (canonical with www)

### Content Verification
**Single Source of Truth Files:**
- `/docs/MASTER-FACT-CHECK-REFERENCE.md` - All business facts
- `/docs/MASTER-OFFERS-AND-CLAIMS.md` - Marketing claims
- `/docs/COMPLETE_API_DOCUMENTATION.md` - API usage

### Business Logic Rules
1. **Monday Kitchen**: Always closed unless special hours explicitly open it
2. **Sunday Lunch**: Requires advance booking and prepayment
3. **Opening Hours**: Verified as of January 2025
4. **No Service**: No breakfast, delivery, Sky Sports, or guest ales

### API Integration Rules
- **Single Source**: Management API is source of truth
- **Phone Format**: Normalize to E.164 (+44...)
- **Idempotency**: Use keys for bookings to prevent duplicates
- **Error Handling**: Always provide fallback for API failures

## Common Tasks & Patterns

### Adding a New Page
```typescript
// app/new-route/page.tsx
import { Metadata } from 'next'
import { HeroWrapper } from '@/components/hero/HeroWrapper'

export const metadata: Metadata = {
  title: 'Page Title | The Anchor Stanwell Moor',
  description: 'Page description',
  alternates: {
    canonical: './', // Relative to metadataBase
  },
}

export default function Page() {
  return (
    <>
      <HeroWrapper
        route="/new-route"
        title="Page Title"
        description="Description"
      />
      {/* Page content */}
    </>
  )
}
```

### Adding Analytics Tracking
```typescript
'use client'  // Required for tracking
import { trackEventName } from '@/lib/gtm-events'

// In component
<Button onClick={() => trackEventName('source_location')}>
  Action
</Button>
```

### Updating Business Information
1. Update `/docs/MASTER-FACT-CHECK-REFERENCE.md`
2. Update `/lib/constants.ts` if needed
3. Search for hardcoded instances
4. Test build for TypeScript errors

### API Error Handling Pattern
```typescript
try {
  const response = await fetch('/api/endpoint')
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  const data = await response.json()
  return data
} catch (error) {
  console.error('API call failed:', error)
  // Return fallback data or handle gracefully
  return defaultData
}
```

## Security & Safety

### Never Commit
- API keys or secrets (use `.env.local`)
- Personal information or PII
- Debug console.log statements with sensitive data
- Commented out code with credentials

### Environment Variables
```bash
# .env.local (never commit)
ANCHOR_API_KEY=your-key-here
NEXT_PUBLIC_GTM_ID=GTM-XXXXX
NEXT_PUBLIC_AVIATIONSTACK_API_KEY=xxxxx
```

### Input Validation
```typescript
// Always validate and sanitize inputs
function validatePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length < 10) {
    throw new Error('Invalid phone number')
  }
  return normaliseUKPhone(cleaned)
}
```

### API Security
- Always use API routes as proxy
- Validate request methods
- Check authentication where needed
- Rate limit sensitive endpoints
- Log suspicious activity

## Performance Optimization

### Image Handling
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={aboveFold}
/>
```

### Code Splitting
```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { loading: () => <Skeleton /> }
)
```

### Bundle Optimization
- Use dynamic imports for non-critical components
- Implement route-based code splitting
- Minimize client-side JavaScript
- Prefer server components

## Debugging Tips

### Common Issues & Solutions

#### Build Errors
```bash
# TypeScript errors
npx tsc --noEmit

# Missing imports
# Check @/components/ui/index.ts exports

# Module not found
# Verify file exists and path is correct
```

#### Runtime Errors
```typescript
// Hydration mismatches
// Ensure server and client render same content

// API failures
// Check network tab, verify endpoints

// State issues
// Use React DevTools to inspect
```

#### Performance Issues
```bash
# Check bundle size
npm run analyze

# Profile with Chrome DevTools
# Look for large components, unnecessary re-renders
```

## Monitoring & Observability

### Structured Logging
```typescript
console.log('API_CALL', {
  endpoint: '/api/booking/submit',
  method: 'POST',
  timestamp: new Date().toISOString(),
  userId: user?.id,
  success: true,
  latency: endTime - startTime
})
```

### Error Tracking
```typescript
try {
  // Operation
} catch (error) {
  console.error('BOOKING_ERROR', {
    error: error.message,
    stack: error.stack,
    context: { bookingData, step }
  })
  // Track in GTM
  trackError('booking_submission', error.message)
}
```

## Continuous Improvement

### Code Review Checklist
- [ ] Follows existing patterns
- [ ] No hardcoded values that should be config
- [ ] Error handling implemented
- [ ] Loading and error states handled
- [ ] Responsive design verified
- [ ] Accessibility considered
- [ ] Performance impact minimal

### Regular Maintenance
- Update dependencies monthly
- Review and update documentation
- Check for deprecated API usage
- Monitor bundle size trends
- Review error logs

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

## API Documentation Reference

Whenever making changes to API usage, always follow the comprehensive documentation at:
`/docs/COMPLETE_API_DOCUMENTATION.md`

---

*Last updated: 2025-01-23*
*Version: 2.0.0*
*This is a living document - update as patterns evolve*