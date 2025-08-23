# The Anchor Website Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Vercel account (recommended) or other Next.js hosting provider
- Access to domain DNS settings

## Environment Variables

Create a `.env.production` file with:

```bash
ANCHOR_API_KEY=your-production-api-key
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Follow the prompts to:
   - Link to your Vercel account
   - Set up the project
   - Configure environment variables

4. Set custom domain:
   - Go to Vercel dashboard → Project settings → Domains
   - Add `the-anchor.pub` and `www.the-anchor.pub`
   - Update DNS records as instructed

### Option 2: Manual Build & Deploy

1. Build the project:
```bash
npm run build
```

2. The output will be in `.next` folder

3. For static export (if no API routes):
```bash
npm run build && npm run export
```

4. Deploy the `out` folder to any static hosting

### Option 3: Docker

1. Create Dockerfile:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

## Performance Optimisation

### Before Deployment

1. Run Lighthouse test:
```bash
npm run build
npm run start
# Open http://localhost:3000 in Chrome
# Run Lighthouse audit
```

2. Check bundle size:
```bash
npm run analyze
```

### CDN Setup

1. Images are already optimised via Next.js Image component
2. Consider Cloudflare for additional caching
3. Set cache headers in `next.config.js` if needed

## SEO Checklist

- [x] Sitemap generated at `/sitemap.xml`
- [x] Robots.txt configured
- [x] Schema.org markup implemented
- [x] Meta tags optimised
- [x] Open Graph tags configured
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Set up Google Analytics
- [ ] Configure Google My Business website link

## Monitoring

1. Set up monitoring:
   - Vercel Analytics (built-in)
   - Google Analytics
   - Uptime monitoring (e.g., UptimeRobot)

2. Error tracking:
   - Sentry.io integration (optional)

## Post-Deployment

1. Test all pages on production
2. Check mobile responsiveness
3. Verify API integration works
4. Test contact forms and phone links
5. Monitor Core Web Vitals

## Maintenance

- Regular dependency updates: `npm update`
- Monitor API key usage
- Check for broken links monthly
- Update content via API as needed

## Support

For issues:
- Check Vercel/hosting logs
- Review browser console for errors
- Ensure environment variables are set
- Check API endpoint connectivity

## Performance Targets

- Lighthouse Score: 90+ for all categories
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1