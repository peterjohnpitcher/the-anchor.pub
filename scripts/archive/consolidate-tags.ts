#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Tag consolidation mappings
const tagConsolidations: Record<string, string> = {
  'offers': 'special-offers',
  'pet-friendly': 'dog-friendly',
  'update': 'news',
  'festive': 'christmas',
  'festive-menu': 'christmas',
  'new-arrivals': 'new-arrival',
  'updates': 'news'
}

async function consolidateTags() {
  const blogDir = path.join(process.cwd(), 'public/content/blog')
  const blogFolders = fs.readdirSync(blogDir)
  
  let updatedCount = 0
  const tagRedirects: Array<{source: string, destination: string, permanent: boolean}> = []
  
  for (const folder of blogFolders) {
    const folderPath = path.join(blogDir, folder)
    const stat = fs.statSync(folderPath)
    
    if (stat.isDirectory()) {
      const indexPath = path.join(folderPath, 'index.md')
      
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf-8')
        const { data, content: markdownContent } = matter(content)
        
        if (data.tags && Array.isArray(data.tags)) {
          const originalTags = [...data.tags]
          const consolidatedTags = data.tags.map(tag => 
            tagConsolidations[tag] || tag
          )
          
          // Remove duplicates
          const uniqueTags = [...new Set(consolidatedTags)]
          
          // Check if tags changed
          if (JSON.stringify(originalTags.sort()) !== JSON.stringify(uniqueTags.sort())) {
            data.tags = uniqueTags
            
            // Rewrite the file
            const newContent = matter.stringify(markdownContent, data)
            fs.writeFileSync(indexPath, newContent)
            
            console.log(`Updated ${folder}:`)
            console.log(`  Original tags: ${originalTags.join(', ')}`)
            console.log(`  New tags: ${uniqueTags.join(', ')}`)
            updatedCount++
          }
        }
      }
    }
  }
  
  // Generate redirects for consolidated tags
  Object.entries(tagConsolidations).forEach(([oldTag, newTag]) => {
    tagRedirects.push({
      source: `/blog/tag/${oldTag}`,
      destination: `/blog/tag/${newTag}`,
      permanent: true
    })
  })
  
  // Save tag redirects
  const redirectsPath = path.join(process.cwd(), 'tag-redirects.json')
  fs.writeFileSync(redirectsPath, JSON.stringify(tagRedirects, null, 2))
  
  console.log(`\nConsolidated tags in ${updatedCount} blog posts`)
  console.log(`Generated ${tagRedirects.length} tag redirects`)
  console.log('\nTag redirects saved to tag-redirects.json')
  console.log('Add these to your next.config.js redirects configuration')
}

// Run the consolidation
consolidateTags().catch(console.error)