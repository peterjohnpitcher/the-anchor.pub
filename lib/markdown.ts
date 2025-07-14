import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  keywords: string[]
  tags: string[]
  featured?: boolean
  hero: string
  images: string[]
  content: string
  htmlContent?: string
}

export interface MenuItem {
  title: string
  description: string
  lastUpdated: string
  content: string
  htmlContent?: string
}

// Blog functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(contentDirectory, 'blog')
  
  if (!fs.existsSync(blogDir)) {
    return []
  }

  const folders = fs.readdirSync(blogDir)
  
  const posts = await Promise.all(
    folders.map(async (folder) => {
      const post = await getBlogPost(folder)
      return post
    })
  )
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const postPath = path.join(contentDirectory, 'blog', slug, 'index.md')
    
    if (!fs.existsSync(postPath)) {
      return null
    }

    const fileContents = fs.readFileSync(postPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content)
    
    const htmlContent = processedContent.toString()

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || '',
      keywords: data.keywords || [],
      tags: data.tags || [],
      featured: data.featured || false,
      hero: data.hero || '',
      images: data.images || [],
      content,
      htmlContent
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

// Menu functions
export async function getMenuContent(menuType: 'food' | 'drinks'): Promise<MenuItem | null> {
  try {
    const menuPath = path.join(contentDirectory, 'menu', `${menuType}.md`)
    
    if (!fs.existsSync(menuPath)) {
      return null
    }

    const fileContents = fs.readFileSync(menuPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content)
    
    const htmlContent = processedContent.toString()

    return {
      title: data.title || '',
      description: data.description || '',
      lastUpdated: data.lastUpdated || '',
      content,
      htmlContent
    }
  } catch (error) {
    console.error(`Error reading ${menuType} menu:`, error)
    return null
  }
}

// Utility function to distribute images throughout blog content
export function distributeImages(htmlContent: string, images: string[], blogSlug: string): string {
  if (!images || images.length === 0) return htmlContent
  
  // Split content into paragraphs
  const paragraphs = htmlContent.split('</p>')
  
  if (paragraphs.length <= 1) return htmlContent
  
  // Calculate distribution
  const imageInterval = Math.floor(paragraphs.length / (images.length + 1))
  
  let result = ''
  let imageIndex = 0
  
  paragraphs.forEach((paragraph, index) => {
    result += paragraph + (paragraph.trim() ? '</p>' : '')
    
    // Insert image at calculated intervals
    if (imageIndex < images.length && 
        index > 0 && 
        index % imageInterval === 0 && 
        index < paragraphs.length - 1) {
      const imagePath = `/content/blog/${blogSlug}/${images[imageIndex]}`
      result += `
        <figure class="my-8">
          <img 
            src="${imagePath}" 
            alt="Article image" 
            class="w-full rounded-lg shadow-md"
            loading="lazy"
          />
        </figure>
      `
      imageIndex++
    }
  })
  
  return result
}

// Get featured blog posts
export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts
    .filter(post => post.featured)
    .slice(0, limit)
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.tags.includes(tag))
}