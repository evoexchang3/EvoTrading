/**
 * Screenshot Capture Script for Layout Variant Thumbnails
 * 
 * This script captures real screenshots of each layout variant's pages
 * and saves them as thumbnails for the admin configuration UI.
 * 
 * Efficient Architecture:
 * - Single browser instance for entire script (not 192 launches!)
 * - One context per variant (safe cookie/device isolation)
 * - Sequential page capture with retry logic
 * - Progress tracking and error summary
 * 
 * Usage: tsx scripts/capture-layout-thumbnails.ts
 */

import { chromium, Browser, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const VARIANTS = [
  'original',
  'bloomberg-dark',
  'modern-light',
  'minimalist-corporate',
  'crypto-neon',
  'financial-times',
  'nordic-clean',
  'charcoal-pro',
  'emerald-trader',
  'navy-institutional',
  'sunset-trading',
  'midnight-premium',
  'arctic-minimal',
  'carbon-sleek',
  'sapphire-finance',
  'terracotta-warm',
];

// Key pages that reliably work for screenshots
const PAGES = [
  { route: '/', name: 'home' },
  { route: '/about', name: 'about' },
  { route: '/partners', name: 'partners' },
  { route: '/company', name: 'company' },
  { route: '/education', name: 'education' },
];

const BASE_URL = 'http://localhost:5000';
const OUTPUT_DIR = 'client/public/assets/layouts';
const MAX_RETRIES = 1;
const RETRY_DELAY = 500;

interface CaptureResult {
  variant: string;
  page: string;
  success: boolean;
  error?: string;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function capturePageScreenshot(
  page: Page,
  variantId: string,
  pageName: string,
  pageRoute: string,
  retryCount = 0
): Promise<CaptureResult> {
  try {
    // Navigate to page with variant applied
    await page.goto(`${BASE_URL}${pageRoute}?preview=${variantId}`, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
    
    // Wait for page to be loaded (use body instead of main for compatibility)
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    // Short wait for styles and images
    await page.waitForTimeout(1500);
    
    // Capture the hero + navigation section (4:3 aspect ratio thumbnail)
    const screenshot = await page.screenshot({
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: 1440, // 4:3 aspect ratio for preview card thumbnails
      },
    });
    
    // Save screenshot
    const outputPath = path.join(OUTPUT_DIR, variantId, `${pageName}.png`);
    fs.writeFileSync(outputPath, screenshot);
    
    return { variant: variantId, page: pageName, success: true };
    
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    
    // Retry logic with exponential backoff
    if (retryCount < MAX_RETRIES) {
      await sleep(RETRY_DELAY * (retryCount + 1));
      return capturePageScreenshot(page, variantId, pageName, pageRoute, retryCount + 1);
    }
    
    return { 
      variant: variantId, 
      page: pageName, 
      success: false, 
      error: errorMsg.substring(0, 80)
    };
  }
}

async function captureVariantScreenshots(
  browser: Browser,
  variantId: string,
  current: number,
  total: number
): Promise<CaptureResult[]> {
  console.log(`\n[${current}/${total}] 📸 ${variantId}...`);
  
  const results: CaptureResult[] = [];
  
  // Create new context for this variant (safe isolation)
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1600 },
    deviceScaleFactor: 2, // Retina quality
  });
  
  try {
    const page = await context.newPage();
    
    // Capture all pages for this variant
    for (let i = 0; i < PAGES.length; i++) {
      const pageConfig = PAGES[i];
      process.stdout.write(`  [${i + 1}/${PAGES.length}] ${pageConfig.name}... `);
      
      const result = await capturePageScreenshot(
        page,
        variantId,
        pageConfig.name,
        pageConfig.route
      );
      
      results.push(result);
      
      if (result.success) {
        console.log('✅');
      } else {
        console.log(`❌`);
      }
    }
    
  } finally {
    await context.close();
  }
  
  return results;
}

async function main() {
  console.log('🚀 Starting layout thumbnail capture...');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Variants: ${VARIANTS.length}`);
  console.log(`Pages per variant: ${PAGES.length}`);
  console.log(`Total screenshots: ${VARIANTS.length * PAGES.length}`);
  console.log('');
  
  // Ensure output directories exist
  for (const variant of VARIANTS) {
    const dir = path.join(OUTPUT_DIR, variant);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  
  // Single browser instance for entire script
  console.log('🌐 Launching browser...\n');
  const browser = await chromium.launch({
    headless: true,
  });
  
  const allResults: CaptureResult[] = [];
  
  try {
    // Capture screenshots for each variant
    for (let i = 0; i < VARIANTS.length; i++) {
      const variant = VARIANTS[i];
      const results = await captureVariantScreenshots(
        browser,
        variant,
        i + 1,
        VARIANTS.length
      );
      allResults.push(...results);
    }
  } finally {
    await browser.close();
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Capture Summary');
  console.log('='.repeat(60));
  
  const successful = allResults.filter(r => r.success).length;
  const failed = allResults.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📷 Total: ${allResults.length}`);
  
  if (failed > 0) {
    console.log('\nFailed captures:');
    allResults
      .filter(r => !r.success)
      .forEach(r => console.log(`  - ${r.variant}/${r.page}`));
  }
  
  console.log('');
  console.log('✨ Screenshot capture complete!');
}

main().catch(console.error);
