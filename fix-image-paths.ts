#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

// Read the blog redirects to get the mapping
const redirects = require('./blog-redirects.json')

// Create a mapping of old folder names to new folder names
const folderMapping: Record<string, string> = {}
redirects.forEach((redirect: any) => {
  const oldFolder = redirect.source.replace('/blog/', '')
  const newFolder = redirect.destination.replace('/blog/', '')
  folderMapping[oldFolder] = newFolder
})

const contentDir = path.join(process.cwd(), 'content', 'blog')

console.log('Fixing image paths in blog posts...\n')

let totalFixed = 0

// Process all blog folders
const blogDirs = fs.readdirSync(contentDir).filter(dir => 
  fs.statSync(path.join(contentDir, dir)).isDirectory() && !dir.startsWith('_')
)

blogDirs.forEach(dir => {
  const indexPath = path.join(contentDir, dir, 'index.md')
  
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8')
    let originalContent = content
    let fixedInFile = 0
    
    // Fix image paths that still use old folder names
    Object.entries(folderMapping).forEach(([oldFolder, newFolder]) => {
      const oldPattern = new RegExp(`/content/blog/${oldFolder}/`, 'g')
      const newPath = `/content/blog/${newFolder}/`
      
      const matches = content.match(oldPattern)
      if (matches) {
        content = content.replace(oldPattern, newPath)
        fixedInFile += matches.length
      }
    })
    
    // Also check if current folder's images use the wrong path
    const currentFolderPattern = new RegExp(`/content/blog/[^/]+/(hero\\.(?:jpg|png|jpeg)|image-\\d+\\.(?:jpg|png|jpeg))`, 'g')
    content = content.replace(currentFolderPattern, (match, filename) => {
      return `/content/blog/${dir}/${filename}`
    })
    
    if (content !== originalContent) {
      fs.writeFileSync(indexPath, content)
      console.log(`Fixed ${fixedInFile} image paths in: ${dir}`)
      totalFixed += fixedInFile
    }
  }
})

console.log(`\nTotal image paths fixed: ${totalFixed}`)
console.log('Image path fixing complete!')