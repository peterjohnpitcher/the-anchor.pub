import type { Event } from '@/lib/api'

const WEBSITE_ORIGIN = 'https://www.the-anchor.pub'
const EVENT_PATH_PREFIX = '/events'

type EventUrlSource = Pick<Event, 'slug' | 'id' | 'url'>

function normaliseId(value: EventUrlSource['id']) {
  if (!value) return ''
  return `${value}`.trim()
}

function resolvePathFromUrl(urlValue: string): string {
  try {
    const parsed = new URL(urlValue, WEBSITE_ORIGIN)
    if (parsed.protocol.startsWith('http')) {
      if (parsed.pathname && parsed.pathname !== '/') {
        return parsed.pathname
      }
      return EVENT_PATH_PREFIX
    }
  } catch {
    // ignore parsing issues and fall through to string handling below
  }
  if (urlValue.startsWith('/')) {
    return urlValue
  }
  return `${EVENT_PATH_PREFIX}/${urlValue}`
}

export function getEventWebsitePath(event: EventUrlSource): string {
  const slug = event.slug?.trim()
  if (slug) {
    return `${EVENT_PATH_PREFIX}/${slug}`
  }

  const fallbackId = normaliseId(event.id)
  if (fallbackId) {
    return `${EVENT_PATH_PREFIX}/${fallbackId}`
  }

  if (event.url) {
    return resolvePathFromUrl(event.url)
  }

  return EVENT_PATH_PREFIX
}

export function getEventWebsiteUrl(event: EventUrlSource, options?: { absolute?: boolean }): string {
  const path = getEventWebsitePath(event)
  if (options?.absolute) {
    if (path.startsWith('http')) {
      return path
    }
    return `${WEBSITE_ORIGIN}${path}`
  }
  return path
}
