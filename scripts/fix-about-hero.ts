import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'client/src/content/variantContent.ts');
let content = readFileSync(filePath, 'utf-8');

console.log('Fixing about.hero: description → subtitle...');

// Pattern: about section with hero.description
// Must be in about context, not education
const pattern = /(about:\s*\{[\s\S]{1,200}?hero:\s*\{[\s\S]{1,100}?title:[^\}]+?)(\s+)description:(\s+)/g;
const newContent = content.replace(pattern, '$1$2subtitle:$3');

const changesCount = (content.match(pattern) || []).length;
console.log(`Found ${changesCount} instances to fix`);

if (changesCount > 0) {
  writeFileSync(filePath, newContent, 'utf-8');
  console.log('✓ Fixed about.hero.description → about.hero.subtitle');
} else {
  console.log('No changes needed');
}
