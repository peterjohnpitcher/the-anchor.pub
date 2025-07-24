import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Add performance and security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Enable HTTP/2 Server Push for critical resources
  const pathname = request.nextUrl.pathname
  
  if (pathname === '/') {
    // Push critical resources for homepage
    response.headers.append('Link', '</images/page-headers/home/optimized/hero-mobile.webp>; rel=preload; as=image; type="image/webp"; media="(max-width: 640px)"')
    response.headers.append('Link', '</images/page-headers/home/optimized/hero-tablet.webp>; rel=preload; as=image; type="image/webp"; media="(max-width: 1024px) and (min-width: 641px)"')
    response.headers.append('Link', '</images/page-headers/home/optimized/hero-desktop.webp>; rel=preload; as=image; type="image/webp"; media="(min-width: 1025px)"')
  }
  
  // Add cache headers for static assets
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|ico|svg)$/i)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  if (pathname.match(/\.(js|css|woff|woff2|ttf|otf)$/i)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Stale-while-revalidate for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}