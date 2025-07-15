# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Anchor pub website - a local SEO-optimized Next.js application designed to dominate local search results near Heathrow Airport and Stanwell Moor.

## 🔴 CRITICAL: Development Workflow

### 1. Discovery Phase (ALWAYS DO FIRST)
Before implementing ANY feature or fix:
```bash
# Run full system check
cd website && npm run lint
cd website && npm run build
cd website && npm run test:crawl

# Check for console errors
# 1. Start dev server: npm run dev
# 2. Open browser DevTools
# 3. Navigate through ALL existing pages
# 4. Document any errors found
2. Pre-Implementation Analysis
Document the following BEFORE coding:

Current state of affected components
All files that will be modified
Potential side effects on other features
Required API endpoints and their current status
Database/data structure requirements

3. Implementation Phase

Create feature branch naming: feature/[description] or fix/[issue-description]
Implement with error handling at every step
Add console.warn() for development debugging (remove before complete)
Test incrementally - don't wait until the end

4. Post-Implementation Verification
Run through ENTIRE checklist - no exceptions
📋 Master Quality Checklist
Code Quality

 ESLint passes with no errors (npm run lint)
 Build completes successfully (npm run build)
 No TypeScript errors
 All console.log/warn statements removed
 Error boundaries implemented for client components

Functionality

 Feature works as specified
 All form inputs connected to state
 Form validation prevents invalid submissions
 API calls have try/catch blocks
 Loading states show during async operations
 Error states show helpful messages
 Success feedback confirms actions

Browser Testing

 No console errors in Chrome DevTools
 No console errors in Safari DevTools
 No console errors in Firefox DevTools
 Works on mobile viewport (375px)
 Works on tablet viewport (768px)
 Works on desktop viewport (1920px)

Integration Testing

 Doesn't break existing features
 Navigation between pages works
 Data persists correctly
 API responses handle edge cases
 Proper 404/error handling

Performance & SEO

 Images optimized and lazy loaded
 No layout shift (CLS < 0.1)
 Page loads in < 3 seconds
 Proper meta tags present
 Schema markup validates

🐛 Issue Tracking System
When You Find ANY Issue

Immediate Documentation
markdown## ISSUE FOUND
- **Type**: Bug/Performance/SEO/Accessibility
- **Severity**: Critical/High/Medium/Low
- **Component**: [Affected component/page]
- **File Path**: `/website/[full/path/to/file.tsx]`
- **Line Numbers**: [If applicable]
- **Description**: [Detailed description]
- **Steps to Reproduce**:
  1. [Step 1]
  2. [Step 2]
- **Expected Behavior**: [What should happen]
- **Actual Behavior**: [What actually happens]
- **Browser/Environment**: [Chrome 120, Safari 17, etc.]
- **Console Error**: ```[Paste full error]```
- **Screenshot**: [If applicable]

GitHub Issue Format
markdownTitle: [Component] - Brief description

Labels: bug, priority-high, needs-investigation

## Summary
[One sentence description]

## Environment
- Next.js Version: 14.2.3
- Node Version: [from node -v]
- Browser: [Name and version]

## Steps to Reproduce
1. 
2. 

## Expected vs Actual

## Code Context
```typescript
// Relevant code snippet
Possible Solution
[If you have ideas]
Related Issues

#[issue number]


🔍 Comprehensive Discovery Process
Before Starting ANY Work
Run this complete discovery routine:
bash# 1. Environment Check
node -v
npm -v
cd website && npm list next react

# 2. Dependency Audit
npm audit
npm outdated

# 3. Full Build Test
npm run build

# 4. Lint Check
npm run lint

# 5. Type Check
npx tsc --noEmit

# 6. Test Suite
npm run test:crawl
Page-by-Page Verification
Navigate to each route and verify:

 / - Homepage loads, hero visible, all sections render
 /whats-on - Events load from API
 /food-menu - Menu categories display
 /drinks - Drinks menu loads
 /sunday-lunch - Sunday menu displays
 /find-us - Map loads, hours display
 /near-heathrow/* - All terminal pages work
 /events/* - Individual event pages load
 /book-event - Form renders and validates

API Endpoint Health Check
Test each endpoint:
typescript// Add this to a test file
const endpoints = [
  '/events',
  '/menu/food',
  '/menu/drinks',
  '/hours',
  '/bookings/availability'
];

endpoints.forEach(endpoint => {
  anchorAPI.get(endpoint)
    .then(data => console.log(`✅ ${endpoint}: OK`))
    .catch(err => console.error(`❌ ${endpoint}: ${err.message}`));
});
📝 Feature Development Template
BEFORE Writing Any Code
markdown## Feature Planning: [Feature Name]

### Requirements Analysis
- **User Story**: As a [user], I want to [action] so that [benefit]
- **Acceptance Criteria**:
  1. [ ] [Specific measurable outcome]
  2. [ ] [Specific measurable outcome]

### Technical Discovery
- **Affected Components**:
  - `/website/components/[Component].tsx` - [What changes]
  - `/website/app/[route]/page.tsx` - [What changes]
  
- **API Requirements**:
  - Endpoint: `GET /api/[endpoint]`
  - Response Shape: ```typescript
    interface Response {
      // Define expected shape
    }
    ```
  
- **State Management**:
  - [ ] Local state sufficient
  - [ ] Need context/global state
  - [ ] Server state (React Query/SWR needed?)

### Risk Assessment
- **Potential Breaking Changes**:
  1. [Component X might break because...]
  
- **Performance Impact**:
  - [ ] Additional API calls needed
  - [ ] Large data processing
  - [ ] Heavy client-side computation

### Implementation Plan
1. [Step 1 - Create base component]
2. [Step 2 - Add API integration]
3. [Step 3 - Add error handling]
4. [Step 4 - Add loading states]
5. [Step 5 - Test all scenarios]
🚀 Deployment Readiness
Pre-Deployment Checklist

 All issues in GitHub are documented
 No console errors in production build
 API error handling tested (disconnect network)
 Loading states tested (slow 3G)
 Mobile experience verified
 SEO meta tags validated
 Performance metrics meet requirements
 Accessibility scan passed

Post-Deployment Verification

 Production site loads correctly
 All API endpoints responding
 No console errors in production
 Analytics tracking working
 Error monitoring configured

💡 Code Quality Patterns
API Integration Pattern
typescript// ALWAYS follow this pattern
export async function getSomeData() {
  try {
    // Log attempt in dev
    if (process.env.NODE_ENV === 'development') {
      console.log('Fetching data from /api/endpoint');
    }
    
    const data = await anchorAPI.get('/endpoint');
    
    // Validate response shape
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid response shape');
    }
    
    return data;
  } catch (error) {
    // Log error details
    console.error('getSomeData error:', {
      message: error.message,
      endpoint: '/endpoint',
      timestamp: new Date().toISOString()
    });
    
    // Return safe default
    return [];
  }
}
Component Error Boundary Pattern
typescript// Every page.tsx should have error handling
export default async function Page() {
  let data;
  let error;
  
  try {
    data = await getData();
  } catch (e) {
    error = e;
    // Log to error tracking service
  }
  
  if (error) {
    return <ErrorState message="Failed to load data" />;
  }
  
  if (!data || data.length === 0) {
    return <EmptyState message="No data available" />;
  }
  
  return <SuccessState data={data} />;
}
🔧 Development Commands
[existing commands...]
📁 Project Structure
[existing structure...]
🛠 Technology Stack
[existing stack...]
🎯 Key Architecture Decisions
[existing decisions...]
📈 SEO Strategy
[existing SEO section...]
🔌 API Integration
[existing API section...]
🔐 Environment Variables
[existing env section...]
⚡ Performance Requirements
[existing performance section...]
📚 API Client Usage
[existing API client section...]
🎨 Code Patterns
[existing patterns section...]
⚠️ Important Notes

ALWAYS run discovery phase first - no exceptions
Document EVERY issue found, no matter how small
Test on mobile first - 80% of traffic is mobile
Create GitHub issues for anything that can't be fixed immediately
Follow the patterns - don't create new ones without discussion
When in doubt, over-communicate what you're finding/doing