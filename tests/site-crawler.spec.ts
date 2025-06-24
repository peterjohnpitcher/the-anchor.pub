import { test, expect, Page, ConsoleMessage, Request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// All pages to test
const PAGES = [
  { url: '/', name: 'homepage' },
  { url: '/whats-on', name: 'whats-on' },
  { url: '/whats-on/drag-shows', name: 'drag-shows' },
  { url: '/whats-on/tequila-tasting', name: 'tequila-tasting' },
  { url: '/food-menu', name: 'food-menu' },
  { url: '/sunday-lunch', name: 'sunday-lunch' },
  { url: '/drinks', name: 'drinks' },
  { url: '/find-us', name: 'find-us' },
  { url: '/book-event', name: 'book-event' },
  { url: '/near-heathrow', name: 'near-heathrow' },
  { url: '/near-heathrow/terminal-2', name: 'terminal-2' },
  { url: '/near-heathrow/terminal-3', name: 'terminal-3' },
  { url: '/near-heathrow/terminal-4', name: 'terminal-4' },
  { url: '/near-heathrow/terminal-5', name: 'terminal-5' },
];

interface PageReport {
  url: string;
  name: string;
  status: 'success' | 'error';
  loadTime: number;
  errors: Array<{
    type: 'console' | 'network' | 'js';
    message: string;
    details?: any;
  }>;
  warnings: string[];
  networkFailures: string[];
  apiCalls: Array<{
    url: string;
    status: number;
    duration: number;
  }>;
  performance: {
    domContentLoaded: number;
    load: number;
  };
  accessibility: {
    missingAltTexts: number;
    emptyLinks: number;
    lowContrast: number;
  };
  seo: {
    title: string;
    description: string;
    h1Count: number;
    canonicalUrl: string;
  };
}

test.describe('Full Site Crawl and Analysis', () => {
  const reports: PageReport[] = [];
  const screenshotDir = path.join(__dirname, '../test-results/screenshots');
  
  // Create screenshot directory
  test.beforeAll(async () => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  // Helper to analyze page
  async function analyzePage(page: Page, pageInfo: typeof PAGES[0]): Promise<PageReport> {
    const report: PageReport = {
      url: pageInfo.url,
      name: pageInfo.name,
      status: 'success',
      loadTime: 0,
      errors: [],
      warnings: [],
      networkFailures: [],
      apiCalls: [],
      performance: { domContentLoaded: 0, load: 0 },
      accessibility: { missingAltTexts: 0, emptyLinks: 0, lowContrast: 0 },
      seo: { title: '', description: '', h1Count: 0, canonicalUrl: '' },
    };

    const startTime = Date.now();
    const consoleMessages: ConsoleMessage[] = [];
    const failedRequests: Request[] = [];

    // Monitor console
    page.on('console', (msg) => {
      consoleMessages.push(msg);
      if (msg.type() === 'error') {
        report.errors.push({
          type: 'console',
          message: msg.text(),
          details: msg.location(),
        });
      } else if (msg.type() === 'warning') {
        report.warnings.push(msg.text());
      }
    });

    // Monitor network failures
    page.on('requestfailed', (request) => {
      failedRequests.push(request);
      report.networkFailures.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
      report.errors.push({
        type: 'network',
        message: `Network request failed: ${request.url()}`,
        details: request.failure(),
      });
    });

    // Monitor API calls
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/api/') || url.includes('management.orangejelly.co.uk')) {
        report.apiCalls.push({
          url,
          status: response.status(),
          duration: response.request().timing().responseEnd,
        });
        
        if (response.status() >= 400) {
          report.errors.push({
            type: 'network',
            message: `API error ${response.status()}: ${url}`,
            details: await response.text().catch(() => null),
          });
        }
      }
    });

    // Monitor page errors
    page.on('pageerror', (error) => {
      report.errors.push({
        type: 'js',
        message: error.message,
        details: error.stack,
      });
    });

    try {
      // Navigate to page
      const response = await page.goto(pageInfo.url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      if (response && !response.ok()) {
        report.status = 'error';
        report.errors.push({
          type: 'network',
          message: `Page returned status ${response.status()}`,
        });
      }

      report.loadTime = Date.now() - startTime;

      // Get performance metrics
      const perfTiming = await page.evaluate(() => {
        const timing = performance.timing;
        return {
          domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
          load: timing.loadEventEnd - timing.navigationStart,
        };
      });
      report.performance = perfTiming;

      // Check accessibility
      const accessibilityCheck = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const links = Array.from(document.querySelectorAll('a'));
        
        return {
          missingAltTexts: images.filter(img => !img.alt || img.alt.trim() === '').length,
          emptyLinks: links.filter(link => !link.textContent?.trim() && !link.querySelector('img')).length,
          lowContrast: 0, // Would need more complex analysis
        };
      });
      report.accessibility = accessibilityCheck;

      // Check SEO
      const seoCheck = await page.evaluate(() => {
        const title = document.querySelector('title')?.textContent || '';
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const h1s = document.querySelectorAll('h1');
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
        
        return {
          title,
          description,
          h1Count: h1s.length,
          canonicalUrl: canonical,
        };
      });
      report.seo = seoCheck;

      // Take screenshots
      await page.screenshot({
        path: path.join(screenshotDir, `${pageInfo.name}-desktop.png`),
        fullPage: true,
      });

      // Mobile screenshot
      await page.setViewportSize({ width: 375, height: 667 });
      await page.screenshot({
        path: path.join(screenshotDir, `${pageInfo.name}-mobile.png`),
        fullPage: true,
      });

      // Check for specific issues
      
      // Check if Navigation is visible
      const navVisible = await page.isVisible('nav');
      if (!navVisible) {
        report.errors.push({
          type: 'js',
          message: 'Navigation component not visible',
        });
      }

      // Check if Footer is visible
      const footerVisible = await page.isVisible('footer');
      if (!footerVisible) {
        report.errors.push({
          type: 'js',
          message: 'Footer component not visible',
        });
      }

      // Check for empty sections
      const emptySections = await page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll('section'));
        return sections.filter(s => !s.textContent?.trim()).length;
      });
      if (emptySections > 0) {
        report.warnings.push(`Found ${emptySections} empty sections`);
      }

    } catch (error: any) {
      report.status = 'error';
      report.errors.push({
        type: 'js',
        message: `Failed to analyze page: ${error.message}`,
        details: error.stack,
      });
    }

    return report;
  }

  // Test each page
  for (const pageInfo of PAGES) {
    test(`Crawl ${pageInfo.name} (${pageInfo.url})`, async ({ page }) => {
      const report = await analyzePage(page, pageInfo);
      reports.push(report);
      
      // Assert no critical errors
      expect(report.errors.filter(e => e.type === 'js').length).toBe(0);
      expect(report.networkFailures.length).toBe(0);
      expect(report.accessibility.missingAltTexts).toBe(0);
      expect(report.seo.h1Count).toBeGreaterThan(0);
      expect(report.seo.title).not.toBe('');
    });
  }

  // Generate summary report
  test.afterAll(async () => {
    const summaryPath = path.join(__dirname, '../test-results/crawl-report.json');
    const summary = {
      timestamp: new Date().toISOString(),
      totalPages: reports.length,
      successfulPages: reports.filter(r => r.status === 'success').length,
      totalErrors: reports.reduce((sum, r) => sum + r.errors.length, 0),
      totalWarnings: reports.reduce((sum, r) => sum + r.warnings.length, 0),
      averageLoadTime: reports.reduce((sum, r) => sum + r.loadTime, 0) / reports.length,
      pages: reports,
      commonIssues: {
        jsErrors: reports.flatMap(r => r.errors.filter(e => e.type === 'js')),
        networkErrors: reports.flatMap(r => r.errors.filter(e => e.type === 'network')),
        consoleErrors: reports.flatMap(r => r.errors.filter(e => e.type === 'console')),
        missingAltTexts: reports.filter(r => r.accessibility.missingAltTexts > 0),
        seoIssues: reports.filter(r => !r.seo.title || r.seo.h1Count === 0),
      },
    };

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    // Print summary to console
    console.log('\n=== CRAWL SUMMARY ===');
    console.log(`Total Pages: ${summary.totalPages}`);
    console.log(`Successful: ${summary.successfulPages}`);
    console.log(`Total Errors: ${summary.totalErrors}`);
    console.log(`Total Warnings: ${summary.totalWarnings}`);
    console.log(`Average Load Time: ${Math.round(summary.averageLoadTime)}ms`);
    
    if (summary.totalErrors > 0) {
      console.log('\n=== TOP ISSUES ===');
      summary.pages.forEach(page => {
        if (page.errors.length > 0) {
          console.log(`\n${page.name} (${page.url}):`);
          page.errors.forEach(error => {
            console.log(`  - ${error.type}: ${error.message}`);
          });
        }
      });
    }
  });
});