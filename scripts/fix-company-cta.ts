import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'client/src/content/variantContent.ts');
let content = readFileSync(filePath, 'utf-8');

console.log('Fixing company.cta: buttonText → button...');

// Pattern: company cta with buttonText
// Must be in company context (has 'about' field which education CTAs don't have)
const pattern = /(company:\s*\{[\s\S]{1,500}?cta:\s*\{[\s\S]{1,200}?about:[^\}]+?)(\s+)buttonText:(\s+)/g;
const newContent = content.replace(pattern, '$1$2button:$3');

const changesCount = (content.match(pattern) || []).length;
console.log(`Found ${changesCount} instances to fix`);

if (changesCount > 0) {
  writeFileSync(filePath, newContent, 'utf-8');
  console.log('✓ Fixed company.cta.buttonText → company.cta.button');
} else {
  console.log('No changes needed');
}
