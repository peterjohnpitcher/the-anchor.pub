#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to extract headings from TSX content
function extractHeadings(content, filePath) {
  const headings = [];
  
  // Match HTML heading tags with better regex
  const htmlHeadingRegex = /<h([1-6])(?:\s+[^>]*)?>([\s\S]*?)<\/h\1>/gi;
  let match;
  
  while ((match = htmlHeadingRegex.exec(content)) !== null) {
    const lineNumber = content.substring(0, match.index).split('\n').length;
    const headingText = match[2]
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\{[^}]*\}/g, '') // Remove JSX expressions
      .trim();
    
    headings.push({
      level: parseInt(match[1]),
      text: headingText || '[Dynamic content]',
      line: lineNumber,
      raw: match[0]
    });
  }
  
  // Check for OptimizedHeroSection or HeroWrapper with title prop
  const heroSectionRegex = /<(?:OptimizedHeroSection|HeroWrapper|HeroSection)[^>]*\btitle\s*=\s*(?:{([^}]+)}|"([^"]+)"|'([^']+)')/g;
  while ((match = heroSectionRegex.exec(content)) !== null) {
    const lineNumber = content.substring(0, match.index).split('\n').length;
    const titleContent = match[1] || match[2] || match[3];
    
    // Skip if title is empty string or falsy
    if (titleContent && titleContent.trim() && titleContent !== '""' && titleContent !== "''" && titleContent !== 'false') {
      headings.push({
        level: 1,
        text: `[Hero title: ${titleContent.substring(0, 50)}...]`,
        line: lineNumber,
        isHeroTitle: true
      });
    }
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
  if (h1Count === 0 && filePath.includes('/page.tsx')) {
    issues.push({
      type: 'missing-h1',
      severity: 'error',
      message: 'Page is missing an h1 tag',
      file: filePath
    });
  }
  
  // Check for multiple h1s
  if (h1Count > 1) {
    issues.push({
      type: 'multiple-h1',
      severity: 'error',
      message: `Page has ${h1Count} h1 tags (should have exactly 1)`,
      file: filePath,
      lines: headings.filter(h => h.level === 1).map(h => h.line)
    });
  }
  
  // Check for heading level jumps
  let previousLevel = 0;
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    
    // Skip if first heading is not h1 but is h2 (common pattern)
    if (i === 0 && heading.level === 2) {
      previousLevel = 1; // Assume implicit h1
      continue;
    }
    
    if (previousLevel > 0 && heading.level > previousLevel + 1) {
      issues.push({
        type: 'level-jump',
        severity: 'warning',
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

// Get all TSX files
function getAllTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip certain directories
      if (!['node_modules', '.next', 'coverage', '.git'].includes(file)) {
        getAllTsxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main function
function main() {
  const projectRoot = process.cwd();
  const files = getAllTsxFiles(projectRoot);
  
  const allIssues = [];
  const fileAnalysis = [];
  
  console.log('Analyzing heading hierarchy in', files.length, 'files...\n');
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const headings = extractHeadings(content, file);
    
    // Only analyze files that have headings or are page files
    if (headings.length > 0 || file.includes('/page.tsx')) {
      const issues = analyzeHeadingHierarchy(headings, file);
      const relativePath = path.relative(projectRoot, file);
      
      fileAnalysis.push({
        file: relativePath,
        headings,
        issues
      });
      
      if (issues.length > 0) {
        allIssues.push(...issues.map(issue => ({
          ...issue,
          file: relativePath
        })));
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
  console.log('=== HEADING HIERARCHY ANALYSIS REPORT ===\n');
  
  console.log(`Total files analyzed: ${fileAnalysis.length}`);
  console.log(`Total issues found: ${allIssues.length}\n`);
  
  // Missing H1s - Critical for pages
  const missingH1Pages = issuesByType['missing-h1'].filter(i => i.file.includes('/page.tsx'));
  if (missingH1Pages.length > 0) {
    console.log(`\n❌ CRITICAL: Pages Missing H1 Tags (${missingH1Pages.length} files):`);
    console.log('These pages need an h1 tag for proper SEO and accessibility:\n');
    missingH1Pages.forEach(issue => {
      console.log(`  • ${issue.file}`);
    });
  }
  
  // Multiple H1s
  if (issuesByType['multiple-h1'].length > 0) {
    console.log(`\n❌ ERROR: Multiple H1 Tags (${issuesByType['multiple-h1'].length} files):`);
    console.log('Pages should have exactly one h1 tag:\n');
    issuesByType['multiple-h1'].forEach(issue => {
      console.log(`  • ${issue.file} - Lines: ${issue.lines.join(', ')}`);
    });
  }
  
  // Level Jumps
  if (issuesByType['level-jump'].length > 0) {
    console.log(`\n⚠️  WARNING: Heading Level Jumps (${issuesByType['level-jump'].length} occurrences):`);
    console.log('Heading levels should increment by 1 (h1 → h2 → h3):\n');
    issuesByType['level-jump'].forEach(issue => {
      console.log(`  • ${issue.file}:${issue.line} - ${issue.message}`);
      console.log(`    Heading: "${issue.heading}"`);
    });
  }
  
  // Summary of files with issues
  const filesWithIssues = new Set(allIssues.map(i => i.file));
  console.log(`\n📊 SUMMARY:`);
  console.log(`  • Total files with issues: ${filesWithIssues.size}`);
  console.log(`  • Critical issues (missing h1 on pages): ${missingH1Pages.length}`);
  console.log(`  • Error issues (multiple h1): ${issuesByType['multiple-h1'].length}`);
  console.log(`  • Warning issues (level jumps): ${issuesByType['level-jump'].length}`);
  
  // Save detailed report
  const report = {
    summary: {
      filesAnalyzed: fileAnalysis.length,
      totalIssues: allIssues.length,
      filesWithIssues: filesWithIssues.size,
      issuesByType: {
        'missing-h1': issuesByType['missing-h1'].length,
        'multiple-h1': issuesByType['multiple-h1'].length,
        'level-jump': issuesByType['level-jump'].length
      }
    },
    criticalPages: missingH1Pages,
    allIssues: allIssues,
    fileAnalysis: fileAnalysis.filter(f => f.issues.length > 0)
  };
  
  fs.writeFileSync('heading-hierarchy-report.json', JSON.stringify(report, null, 2));
  console.log('\n✅ Detailed report saved to heading-hierarchy-report.json');
  
  // Return exit code based on critical issues
  if (missingH1Pages.length > 0 || issuesByType['multiple-h1'].length > 0) {
    process.exit(1);
  }
}

main();