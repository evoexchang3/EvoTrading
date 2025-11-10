import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const PAGES = [
  { route: '/company', name: 'company' },
  { route: '/education', name: 'education' },
];

async function main() {
  console.log('Fixing charcoal-pro...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1600 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  
  for (const pg of PAGES) {
    await page.goto(`http://localhost:5000${pg.route}?preview=charcoal-pro`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    await page.waitForTimeout(1500);
    const screenshot = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1920, height: 1440 } });
    fs.writeFileSync(path.join('client/public/assets/layouts/charcoal-pro', `${pg.name}.png`), screenshot);
    console.log(`✅ ${pg.name}.png`);
  }
  
  await browser.close();
  console.log('✨ Done!');
}

main().catch(console.error);
