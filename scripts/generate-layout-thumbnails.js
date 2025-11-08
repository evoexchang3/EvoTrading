#!/usr/bin/env node

/**
 * Layout Thumbnail Generator
 * Generates preview thumbnails for all 15 layout variants using Playwright
 * Usage: node scripts/generate-layout-thumbnails.js
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Layout variants to generate thumbnails for
const VARIANTS = [
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
  'terracotta-warm'
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
const OUTPUT_DIR = path.resolve(__dirname, '../public/assets/layouts');
const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 300;

async function generateThumbnails() {
  console.log('🎨 Layout Thumbnail Generator');
  console.log('==============================\n');

  // Ensure output directories exist
  for (const variant of VARIANTS) {
    const variantDir = path.join(OUTPUT_DIR, variant);
    if (!fs.existsSync(variantDir)) {
      fs.mkdirSync(variantDir, { recursive: true });
      console.log(`📁 Created directory: ${variantDir}`);
    }
  }

  // Launch browser
  console.log('\n🚀 Launching browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2 // Retina display for crisp thumbnails
  });

  const page = await context.newPage();

  console.log(`\n📸 Generating thumbnails for ${VARIANTS.length} variants...\n`);

  for (const variant of VARIANTS) {
    try {
      console.log(`   Processing: ${variant}...`);

      // Navigate to landing page
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // Remove any existing variant CSS
      await page.evaluate(() => {
        const existingLinks = document.querySelectorAll('link[data-layout-variant]');
        existingLinks.forEach(link => link.remove());
      });

      // Apply variant CSS
      await page.evaluate((variantName) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `/layouts/variants/${variantName}.css`;
        link.setAttribute('data-layout-variant', variantName);
        document.head.appendChild(link);
        document.documentElement.setAttribute('data-layout', variantName);
      }, variant);

      // Wait for CSS to apply
      await page.waitForTimeout(1000);

      // Take full page screenshot
      const screenshotBuffer = await page.screenshot({
        fullPage: false,
        type: 'png'
      });

      // Convert to WebP and resize using sharp (if available) or just save as PNG
      const outputPath = path.join(OUTPUT_DIR, variant, 'thumb.webp');
      
      // Use sharp if available, otherwise fall back to PNG
      try {
        const sharp = await import('sharp');
        await sharp.default(screenshotBuffer)
          .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
            fit: 'cover',
            position: 'top'
          })
          .webp({ quality: 85 })
          .toFile(outputPath);
        
        console.log(`   ✅ Generated: ${variant}/thumb.webp`);
      } catch (sharpError) {
        // Fallback: save as PNG if sharp is not available
        const pngPath = path.join(OUTPUT_DIR, variant, 'thumb.png');
        fs.writeFileSync(pngPath, screenshotBuffer);
        console.log(`   ⚠️  Generated PNG (sharp not available): ${variant}/thumb.png`);
      }

    } catch (error) {
      console.error(`   ❌ Error generating ${variant}:`, error.message);
    }
  }

  await browser.close();

  console.log('\n==============================');
  console.log('✅ Thumbnail generation complete!');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
}

// Run the generator
generateThumbnails().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
