/**
 * Screenshot Capture Script for Layout Variant Thumbnails
 * 
 * This script captures real screenshots of each layout variant's landing page
 * and saves them as thumbnails to replace the stock photo placeholders.
 * 
 * Usage: tsx scripts/capture-layout-thumbnails.ts
 */

import { chromium } from 'playwright';
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

// Always use localhost for screenshot capture (works in dev environment)
const BASE_URL = 'http://localhost:5000';

const OUTPUT_DIR = 'client/public/assets/layouts';

async function captureVariantScreenshot(variantId: string): Promise<void> {
  console.log(`📸 Capturing ${variantId}...`);
  
  const browser = await chromium.launch({
    headless: true,
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1600 }, // Increased to accommodate clip height
      deviceScaleFactor: 2, // Retina quality
    });
    
    const page = await context.newPage();
    
    // Navigate to home page with variant applied
    await page.goto(`${BASE_URL}?preview=${variantId}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    
    // Wait for hero section to load
    await page.waitForSelector('main', { timeout: 10000 });
    
    // Additional wait for images and styles
    await page.waitForTimeout(2000);
    
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
    const outputPath = path.join(OUTPUT_DIR, variantId, 'thumb.png');
    fs.writeFileSync(outputPath, screenshot);
    
    console.log(`✅ Saved: ${outputPath}`);
    
  } catch (error) {
    console.error(`❌ Error capturing ${variantId}:`, error);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 Starting layout thumbnail capture...');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Variants: ${VARIANTS.length}`);
  console.log('');
  
  // Ensure output directories exist
  for (const variant of VARIANTS) {
    const dir = path.join(OUTPUT_DIR, variant);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  
  // Capture screenshots sequentially to avoid overwhelming the browser
  for (const variant of VARIANTS) {
    await captureVariantScreenshot(variant);
  }
  
  console.log('');
  console.log('✨ All thumbnails captured successfully!');
}

main().catch(console.error);
