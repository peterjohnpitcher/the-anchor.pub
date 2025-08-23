#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to extract headings from TSX content
function extractHeadings(content, filePath) {
  const headings = [];
  
  // Match HTML heading tags
  const htmlHeadingRegex = /<h([1-6])(?:\s+[^>]*)?>(.*?)<\/h\1>/gi;
  let match;
  
  while ((match = htmlHeadingRegex.exec(content)) !== null) {
    const lineNumber = content.substring(0, match.index).split('\n').length;
    headings.push({
      level: parseInt(match[1]),
      text: match[2].replace(/<[^>]*>/g, '').trim(),
      line: lineNumber,
      type: 'html'
    });
  }
  
  // Sort by line number
  headings.sort((a, b) => a.line - b.line);
  
  return headings;
}

// Function to analyze heading hierarchy issues
function analyzeHeadingHierarchy(headings, filePath) {
  const issues = [];
  
  // Check for missing h1
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    issues.push({
      type: 'missing-h1',
      message: 'Page is missing an h1 tag',
      file: filePath
    });
  }
  
  // Check for multiple h1s
  if (h1Count > 1) {
    issues.push({
      type: 'multiple-h1',
      message: `Page has ${h1Count} h1 tags (should have exactly 1)`,
      file: filePath,
      lines: headings.filter(h => h.level === 1).map(h => h.line)
    });
  }
  
  // Check for heading level jumps
  let previousLevel = 0;
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    
    if (previousLevel > 0 && heading.level > previousLevel + 1) {
      issues.push({
        type: 'level-jump',
        message: `Heading level jump from h${previousLevel} to h${heading.level}`,
        file: filePath,
        line: heading.line,
        heading: heading.text
      });
    }
    
    previousLevel = heading.level;
  }
  
  return issues;
}

// Main function
async function main() {
  const files = glob.sync('**/*.tsx', {
    ignore: ['node_modules/**', '.next/**', 'coverage/**']
  });
  
  const allIssues = [];
  const fileAnalysis = [];
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const headings = extractHeadings(content, file);
    
    if (headings.length > 0 || file.includes('/page.tsx')) {
      const issues = analyzeHeadingHierarchy(headings, file);
      
      fileAnalysis.push({
        file,
        headings,
        issues
      });
      
      if (issues.length > 0) {
        allIssues.push(...issues);
      }
    }
  }
  
  // Group issues by type
  const issuesByType = {
    'missing-h1': [],
    'multiple-h1': [],
    'level-jump': []
  };
  
  allIssues.forEach(issue => {
    issuesByType[issue.type].push(issue);
  });
  
  // Output results
  console.log('=== Heading Hierarchy Analysis ===\n');
  
  console.log(`Total files analyzed: ${fileAnalysis.length}`);
  console.log(`Total issues found: ${allIssues.length}\n`);
  
  // Missing H1s
  if (issuesByType['missing-h1'].length > 0) {
    console.log(`\n### Missing H1 Tags (${issuesByType['missing-h1'].length} files):`);
    issuesByType['missing-h1'].forEach(issue => {
      console.log(`  - ${issue.file}`);
    });
  }
  
  // Multiple H1s
  if (issuesByType['multiple-h1'].length > 0) {
    console.log(`\n### Multiple H1 Tags (${issuesByType['multiple-h1'].length} files):`);
    issuesByType['multiple-h1'].forEach(issue => {
      console.log(`  - ${issue.file} (lines: ${issue.lines.join(', ')})`);
    });
  }
  
  // Level Jumps
  if (issuesByType['level-jump'].length > 0) {
    console.log(`\n### Heading Level Jumps (${issuesByType['level-jump'].length} occurrences):`);
    issuesByType['level-jump'].forEach(issue => {
      console.log(`  - ${issue.file}:${issue.line} - ${issue.message} ("${issue.heading}")`);
    });
  }
  
  // Save detailed report
  const report = {
    summary: {
      filesAnalyzed: fileAnalysis.length,
      totalIssues: allIssues.length,
      issuesByType: {
        'missing-h1': issuesByType['missing-h1'].length,
        'multiple-h1': issuesByType['multiple-h1'].length,
        'level-jump': issuesByType['level-jump'].length
      }
    },
    issues: allIssues,
    fileAnalysis: fileAnalysis.filter(f => f.issues.length > 0)
  };
  
  fs.writeFileSync('heading-hierarchy-report.json', JSON.stringify(report, null, 2));
  console.log('\nDetailed report saved to heading-hierarchy-report.json');
}

main().catch(console.error);