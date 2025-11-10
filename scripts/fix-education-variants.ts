import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'client/src/content/variantContent.ts');

console.log('Reading variantContent.ts...');
let content = readFileSync(filePath, 'utf-8');

let changesCount = 0;

console.log('Fixing education CTA field names (title→headline, subtitle→description, button→buttonText)...');
const ctaPattern = /(education:\s*\{[\s\S]*?cta:\s*\{[\s\S]*?)(\s+)title:(\s+)/g;
content = content.replace(ctaPattern, (match, before, ws1, ws2) => {
  changesCount++;
  return `${before}${ws1}headline:${ws2}`;
});

const ctaSubtitlePattern = /(education:\s*\{[\s\S]*?cta:\s*\{[\s\S]*?)(\s+)subtitle:(\s+)/g;
content = content.replace(ctaSubtitlePattern, (match, before, ws1, ws2) => {
  changesCount++;
  return `${before}${ws1}description:${ws2}`;
});

const ctaButtonPattern = /(education:\s*\{[\s\S]*?cta:\s*\{[\s\S]*?)(\s+)button:(\s+)/g;
content = content.replace(ctaButtonPattern, (match, before, ws1, ws2) => {
  changesCount++;
  return `${before}${ws1}buttonText:${ws2}`;
});

console.log('Removing extra button field from academy sections...');
const academyButtonPattern = /(academy:\s*\{[\s\S]*?features:\s*\[[\s\S]*?\],?\s*)(,?\s*button:\s*'[^']*',?\s*)/g;
content = content.replace(academyButtonPattern, (match, before) => {
  changesCount++;
  return before;
});

console.log('Adding resources.items arrays where missing...');
const resourcesPattern = /(resources:\s*\{\s*title:\s*'[^']*',\s*subtitle:\s*'[^']*',\s*)(\},)/g;
content = content.replace(resourcesPattern, (match, before, after) => {
  changesCount++;
  return `${before}items: [
        {
          title: 'Educational Resources',
          description: 'Comprehensive learning materials and trading guides.',
        },
        {
          title: 'Market Analysis',
          description: 'Regular market updates and trading insights.',
        },
      ],
    ${after}`;
});

console.log(`Applied ${changesCount} transformations.`);
console.log('Writing updated content back to file...');
writeFileSync(filePath, content, 'utf-8');

console.log('✓ Education variants fixed successfully!');
console.log('Run: npx tsc --noEmit to verify TypeScript compilation');
