const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all blog index.md files
const blogFiles = glob.sync('content/blog/*/index.md', {
  cwd: path.join(__dirname, '..'),
  absolute: true
});

console.log(`Found ${blogFiles.length} blog posts to update`);

let updatedCount = 0;
let alreadyHasOldUrl = 0;

blogFiles.forEach(filePath => {
  try {
    // Get the folder name (slug)
    const folderName = path.basename(path.dirname(filePath));
    
    // Skip special files
    if (folderName === 'blog') {
      return;
    }
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if oldUrl already exists
    if (content.includes('oldUrl:')) {
      alreadyHasOldUrl++;
      console.log(`✓ ${folderName} - already has oldUrl`);
      return;
    }
    
    // Parse the frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      console.log(`✗ ${folderName} - no frontmatter found`);
      return;
    }
    
    const frontmatter = frontmatterMatch[1];
    const contentAfterFrontmatter = content.substring(frontmatterMatch[0].length);
    
    // Add oldUrl to the frontmatter
    const oldUrl = `https://www.the-anchor.pub/post/${folderName}`;
    
    // Split frontmatter into lines and add oldUrl after the last field
    const frontmatterLines = frontmatter.split('\n');
    
    // Find a good place to insert oldUrl (after date if it exists, otherwise after description)
    let insertIndex = -1;
    for (let i = 0; i < frontmatterLines.length; i++) {
      if (frontmatterLines[i].startsWith('date:')) {
        insertIndex = i + 1;
        break;
      } else if (frontmatterLines[i].startsWith('description:')) {
        // Handle multi-line descriptions
        let j = i + 1;
        while (j < frontmatterLines.length && !frontmatterLines[j].match(/^\w+:/)) {
          j++;
        }
        insertIndex = j;
      }
    }
    
    // If we couldn't find a good spot, add it at the end
    if (insertIndex === -1) {
      insertIndex = frontmatterLines.length;
    }
    
    // Insert the oldUrl
    frontmatterLines.splice(insertIndex, 0, `oldUrl: "${oldUrl}"`);
    
    // Reconstruct the file
    const newContent = `---\n${frontmatterLines.join('\n')}\n---${contentAfterFrontmatter}`;
    
    // Write the file back
    fs.writeFileSync(filePath, newContent, 'utf8');
    updatedCount++;
    console.log(`✓ ${folderName} - added oldUrl: ${oldUrl}`);
    
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
});

console.log(`\nSummary:`);
console.log(`- Updated: ${updatedCount} files`);
console.log(`- Already had oldUrl: ${alreadyHasOldUrl} files`);
console.log(`- Total processed: ${blogFiles.length} files`);