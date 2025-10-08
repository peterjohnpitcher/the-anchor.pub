import path from 'path'
import fs from 'fs'
import { DEFAULT_PAGE_HEADER_IMAGE } from './image-fallbacks'

const BLOG_ASSET_DIRS = [
  path.join(process.cwd(), 'content', 'blog'),
  path.join(process.cwd(), 'content', 'blog', '_archived'),
  path.join(process.cwd(), 'public', 'content', 'blog')
]

function isRemoteSource(source?: string): boolean {
  if (!source) return false
  return source.startsWith('http://') || source.startsWith('https://')
}

export function blogImageExists(slug: string, imageFile?: string): boolean {
  if (!imageFile || isRemoteSource(imageFile)) {
    return Boolean(imageFile && isRemoteSource(imageFile))
  }

  return BLOG_ASSET_DIRS.some((dir) => {
    try {
      const candidate = path.join(dir, slug, imageFile)
      return fs.existsSync(candidate)
    } catch {
      return false
    }
  })
}

export function getBlogHeroUrl(slug: string, hero?: string): string {
  if (isRemoteSource(hero)) {
    return hero as string
  }

  if (hero && blogImageExists(slug, hero)) {
    return `/content/blog/${slug}/${hero}`
  }

  return DEFAULT_PAGE_HEADER_IMAGE
}

export function getExistingBlogImageNames(slug: string, images: string[] = []): string[] {
  return images.filter((image) => blogImageExists(slug, image))
}

export const BLOG_FALLBACK_IMAGE = DEFAULT_PAGE_HEADER_IMAGE
