import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const VARIANTS = ['carbon-sleek', 'sapphire-finance', 'terracotta-warm'];
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
  console.log('Finishing last 3 variants...\n');
  const browser = await chromium.launch({ headless: true });
  
  for (const variant of VARIANTS) {
    console.log(`📸 ${variant}...`);
    const context = await browser.newContext({ viewport: { width: 1920, height: 1600 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    
    for (const pg of PAGES) {
      try {
        await page.goto(`${BASE_URL}${pg.route}?preview=${variant}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForLoadState('networkidle', { timeout: 15000 });
        await page.waitForTimeout(1500);
        const screenshot = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1920, height: 1440 } });
        const dir = path.join(OUTPUT_DIR, variant);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, `${pg.name}.png`), screenshot);
        process.stdout.write(`✅ `);
      } catch { process.stdout.write(`❌ `); }
    }
    console.log('');
    await context.close();
  }
  
  await browser.close();
  console.log('\n✨ All 16 variants complete!');
}

main().catch(console.error);
