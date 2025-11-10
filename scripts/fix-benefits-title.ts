import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'client/src/content/variantContent.ts');
let content = readFileSync(filePath, 'utf-8');

console.log('Fixing home.benefits: headline → title...');

// Very specific pattern: benefits section with headline field
// Only matches in the exact context of benefits object
const pattern = /(benefits:\s*\{\s*)headline:/g;
const newContent = content.replace(pattern, '$1title:');

const changesCount = (content.match(pattern) || []).length;
console.log(`Found ${changesCount} instances to fix`);

if (changesCount > 0) {
  writeFileSync(filePath, newContent, 'utf-8');
  console.log('✓ Fixed benefits.headline → benefits.title');
} else {
  console.log('No changes needed');
}
