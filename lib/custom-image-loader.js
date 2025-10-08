/**
 * Custom Next.js image loader that preserves local `/content/blog/...` URLs.
 * Returning a relative path prevents `_next/image` from proxying the request,
 * so the browser hits our content route directly.
 */
module.exports = function customImageLoader({ src, width, quality }) {
  // Allow remote images to pass through untouched.
  if (src.startsWith('http://') || src.startsWith('https://')) {
    const params = new URLSearchParams()
    if (width) params.set('w', String(width))
    if (quality) params.set('q', String(quality))
    const paramString = params.toString()
    if (!paramString) return src
    const separator = src.includes('?') ? '&' : '?'
    return `${src}${separator}${paramString}`
  }

  const normalizedSrc = src.startsWith('/') ? src : `/${src}`
  const params = new URLSearchParams()
  if (width) params.set('w', String(width))
  if (quality) params.set('q', String(quality))
  const query = params.toString()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const prefix = baseUrl.replace(/\/+$/, '')
  const path = `${normalizedSrc}${query ? `?${query}` : ''}`
  return prefix ? `${prefix}${path}` : path
}
