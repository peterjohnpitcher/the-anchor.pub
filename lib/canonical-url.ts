/**
 * Utility for generating canonical URLs
 */

const SITE_URL = 'https://the-anchor.pub'

/**
 * Generates a canonical URL for a given pathname
 * @param pathname - The pathname (e.g., '/whats-on', '/food-menu')
 * @returns The full canonical URL
 */
export function getCanonicalUrl(pathname: string): string {
  // Remove trailing slashes except for homepage
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/$/, '')
  
  // Handle special cases for near-heathrow terminal pages
  if (cleanPath.includes('/near-heathrow/terminal-')) {
    // Normalize terminal URLs (e.g., terminal-1, terminal-2, etc.)
    const terminalMatch = cleanPath.match(/terminal-(\d)/)
    if (terminalMatch) {
      return `${SITE_URL}/near-heathrow/terminal-${terminalMatch[1]}`
    }
  }
  
  return `${SITE_URL}${cleanPath}`
}

/**
 * Gets alternate URLs for language variations (future use)
 * @param pathname - The pathname
 * @returns Array of alternate language URLs
 */
export function getAlternateUrls(pathname: string): { lang: string; url: string }[] {
  // Currently only English, but structured for future multi-language support
  return [
    {
      lang: 'en-GB',
      url: getCanonicalUrl(pathname)
    }
  ]
}

/**
 * Checks if a URL should have a canonical tag
 * Some pages like API routes shouldn't have canonical tags
 * @param pathname - The pathname to check
 * @returns Whether the page should have a canonical tag
 */
export function shouldHaveCanonical(pathname: string): boolean {
  const excludedPaths = [
    '/api/',
    '/_next/',
    '/api-test',
    '/_api-diagnostics'
  ]
  
  return !excludedPaths.some(path => pathname.startsWith(path))
}