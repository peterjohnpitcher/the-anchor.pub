#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to analyze Image components in a file
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];
  
  // Find all Image components
  const imageRegex = /<Image\s/g;
  let match;
  
  lines.forEach((line, index) => {
    if (line.includes('<Image')) {
      const lineNumber = index + 1;
      let imageBlock = '';
      let currentLine = index;
      let openTags = 0;
      
      // Extract the entire Image component (handles multi-line)
      while (currentLine < lines.length) {
        const currentLineContent = lines[currentLine];
        imageBlock += currentLineContent + '\n';
        
        // Count opening and closing tags
        const opens = (currentLineContent.match(/<Image/g) || []).length;
        const closes = (currentLineContent.match(/\/>/g) || []).length;
        openTags += opens - closes;
        
        if (openTags === 0 && imageBlock.includes('<Image')) break;
        currentLine++;
      }
      
      // Check for missing attributes
      const hasSizes = imageBlock.includes('sizes=');
      const hasFill = imageBlock.includes('fill');
      const hasWidth = imageBlock.includes('width=');
      const hasHeight = imageBlock.includes('height=');
      const hasPriority = imageBlock.includes('priority');
      const hasLoading = imageBlock.includes('loading=');
      const hasAlt = imageBlock.includes('alt=');
      
      // Determine if this needs optimization
      if (!hasSizes) {
        const issue = {
          file: filePath,
          line: lineNumber,
          type: 'missing-sizes',
          hasFill,
          hasWidth,
          hasHeight,
          imageBlock: imageBlock.trim()
        };
        
        // Suggest appropriate sizes attribute based on context
        if (hasFill) {
          issue.suggestion = 'sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"';
        } else if (hasWidth && hasHeight) {
          const widthMatch = imageBlock.match(/width={?(\d+)}?/);
          const width = widthMatch ? parseInt(widthMatch[1]) : null;
          
          if (width && width <= 100) {
            issue.suggestion = `sizes="${width}px"`;
          } else if (width && width <= 200) {
            issue.suggestion = `sizes="(max-width: 640px) ${width}px, ${width}px"`;
          } else {
            issue.suggestion = 'sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"';
          }
        }
        
        issues.push(issue);
      }
      
      // Check for other optimization opportunities
      if (!hasAlt) {
        issues.push({
          file: filePath,
          line: lineNumber,
          type: 'missing-alt',
          imageBlock: imageBlock.trim()
        });
      }
      
      if (!hasPriority && !hasLoading && lineNumber < 50) {
        issues.push({
          file: filePath,
          line: lineNumber,
          type: 'missing-loading-strategy',
          suggestion: 'Consider adding priority={true} for above-the-fold images or loading="lazy" for below-the-fold images',
          imageBlock: imageBlock.trim()
        });
      }
    }
  });
  
  return issues;
}

// Main execution
async function main() {
  console.log('Analyzing Image components for responsive optimization...\n');
  
  // Find all TypeScript/JavaScript files
  const files = glob.sync('**/*.{tsx,jsx,ts,js}', {
    ignore: ['node_modules/**', '.next/**', 'scripts/**', '*.test.*', '*.spec.*']
  });
  
  let totalIssues = 0;
  const allIssues = [];
  
  files.forEach(file => {
    const issues = analyzeFile(file);
    if (issues.length > 0) {
      allIssues.push({ file, issues });
      totalIssues += issues.length;
    }
  });
  
  // Generate report
  console.log(`Found ${totalIssues} Image components that need optimization\n`);
  
  // Group by issue type
  const issuesByType = {
    'missing-sizes': [],
    'missing-alt': [],
    'missing-loading-strategy': []
  };
  
  allIssues.forEach(({ file, issues }) => {
    issues.forEach(issue => {
      issuesByType[issue.type].push({ ...issue, file });
    });
  });
  
  // Report missing sizes attributes
  if (issuesByType['missing-sizes'].length > 0) {
    console.log(`\n📏 Missing sizes attribute (${issuesByType['missing-sizes'].length} instances):`);
    console.log('=' + '='.repeat(50));
    
    issuesByType['missing-sizes'].forEach(issue => {
      console.log(`\nFile: ${issue.file}:${issue.line}`);
      console.log(`Type: ${issue.hasFill ? 'fill' : 'fixed dimensions'}`);
      if (issue.suggestion) {
        console.log(`Suggested sizes: ${issue.suggestion}`);
      }
      console.log('Image component:');
      console.log(issue.imageBlock.split('\n').map(l => '  ' + l).join('\n'));
    });
  }
  
  // Report missing alt attributes
  if (issuesByType['missing-alt'].length > 0) {
    console.log(`\n🏷️  Missing alt attribute (${issuesByType['missing-alt'].length} instances):`);
    console.log('=' + '='.repeat(50));
    
    issuesByType['missing-alt'].forEach(issue => {
      console.log(`\nFile: ${issue.file}:${issue.line}`);
    });
  }
  
  // Report missing loading strategy
  if (issuesByType['missing-loading-strategy'].length > 0) {
    console.log(`\n⚡ Missing loading strategy (${issuesByType['missing-loading-strategy'].length} instances):`);
    console.log('=' + '='.repeat(50));
    
    issuesByType['missing-loading-strategy'].forEach(issue => {
      console.log(`\nFile: ${issue.file}:${issue.line}`);
      console.log(`Suggestion: ${issue.suggestion}`);
    });
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Summary:');
  console.log(`- Images missing sizes attribute: ${issuesByType['missing-sizes'].length}`);
  console.log(`- Images missing alt attribute: ${issuesByType['missing-alt'].length}`);
  console.log(`- Images missing loading strategy: ${issuesByType['missing-loading-strategy'].length}`);
  console.log('\nRecommendations:');
  console.log('1. Add sizes attribute to all Image components for better responsive loading');
  console.log('2. Use OptimizedImage component where possible for automatic optimization');
  console.log('3. Add priority={true} to above-the-fold images');
  console.log('4. Add loading="lazy" to below-the-fold images');
  console.log('5. Always include descriptive alt text for accessibility');
}

main().catch(console.error);