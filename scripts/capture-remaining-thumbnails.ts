/**
 * Capture remaining variant screenshots (variants 9-16)
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const VARIANTS = [
  'emerald-trader',
  'navy-institutional',
  'sunset-trading',
  'midnight-premium',
  'arctic-minimal',
  'carbon-sleek',
  'sapphire-finance',
  'terracotta-warm',
];

const PAGES = [
  { route: '/', name: 'home' },
  { route: '/about', name: 'about' },
  { route: '/partners', name: 'partners' },
  { route: '/company', name: 'company' },
  { route: '/education', name: 'education' },
];

const BASE_URL = 'http://localhost:5000';
const OUTPUT_DIR = 'client/public/assets/layouts';

async function main() {
  console.log('🚀 Capturing remaining variants (9-16)...\n');
  
  const browser = await chromium.launch({ headless: true });
  
  try {
    for (let i = 0; i < VARIANTS.length; i++) {
      const variant = VARIANTS[i];
      console.log(`[${i + 9}/16] 📸 ${variant}...`);
      
      const context = await browser.newContext({
        viewport: { width: 1920, height: 1600 },
        deviceScaleFactor: 2,
      });
      
      const page = await context.newPage();
      
      for (const pageConfig of PAGES) {
        try {
          await page.goto(`${BASE_URL}${pageConfig.route}?preview=${variant}`, {
            waitUntil: 'domcontentloaded',
            timeout: 20000,
          });
          
          await page.waitForLoadState('networkidle', { timeout: 15000 });
          await page.waitForTimeout(1500);
          
          const screenshot = await page.screenshot({
            type: 'png',
            clip: { x: 0, y: 0, width: 1920, height: 1440 },
          });
          
          const dir = path.join(OUTPUT_DIR, variant);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          
          fs.writeFileSync(path.join(dir, `${pageConfig.name}.png`), screenshot);
          process.stdout.write(`  ✅ ${pageConfig.name} `);
        } catch (error) {
          process.stdout.write(`  ❌ ${pageConfig.name} `);
        }
      }
      
      console.log('');
      await context.close();
    }
  } finally {
    await browser.close();
  }
  
  console.log('\n✨ Remaining screenshots captured!');
}

main().catch(console.error);
