#!/usr/bin/env node

/**
 * Comprehensive scan for ALL corrupted translation keys
 * Finds any key where the key name appears inside the value text
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALL_LANGUAGES = [
  'ar', 'bg', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'he', 'hu',
  'id', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'pl', 'pt-BR', 'pt-PT', 'ro',
  'ru', 'sk', 'sl', 'sv', 'tr', 'uk', 'vi', 'zh-CN', 'zh-TW'
];

console.log('🔍 Scanning ALL translation files for corruptions...\n');

const allCorruptions = [];

for (const lang of ALL_LANGUAGES) {
  const filePath = path.join(__dirname, `../client/src/translations/${lang}.ts`);
  
  if (!fs.existsSync(filePath)) {
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match pattern: 'some.key.name': 'value text'
    const match = line.match(/^\s*'([^']+)':\s*'(.*)'/);
    if (!match) continue;
    
    const key = match[1];
    const valueStart = match[2];
    
    // Check if key name appears in the value (corruption marker)
    // Look for pattern like: 'key.name': 'text... 'key.name': more text'
    if (valueStart.includes(`'${key}':`)) {
      allCorruptions.push({
        lang,
        lineNum: i + 1,
        key,
        line: line.trim()
      });
    }
  }
}

// Group by key name
const byKey = new Map();
for (const corruption of allCorruptions) {
  if (!byKey.has(corruption.key)) {
    byKey.set(corruption.key, []);
  }
  byKey.get(corruption.key).push(corruption.lang);
}

console.log('='.repeat(70));
console.log(`📊 CORRUPTION REPORT`);
console.log('='.repeat(70));
console.log(`Total corrupted keys found: ${allCorruptions.length}`);
console.log(`Unique key names corrupted: ${byKey.size}`);
console.log('='.repeat(70));
console.log('\n📋 CORRUPTIONS BY KEY:\n');

for (const [key, langs] of byKey.entries()) {
  console.log(`${key}:`);
  console.log(`  Languages (${langs.length}): ${langs.join(', ')}`);
  console.log('');
}

console.log('='.repeat(70));
console.log('\n📋 CORRUPTIONS BY LANGUAGE:\n');

const byLang = new Map();
for (const corruption of allCorruptions) {
  if (!byLang.has(corruption.lang)) {
    byLang.set(corruption.lang, []);
  }
  byLang.get(corruption.lang).push(corruption);
}

for (const [lang, corruptions] of byLang.entries()) {
  console.log(`${lang}: ${corruptions.length} corrupted key(s)`);
  for (const c of corruptions) {
    console.log(`  Line ${c.lineNum}: ${c.key}`);
  }
  console.log('');
}

// Save detailed report to file
const reportPath = path.join(__dirname, 'corruption-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  totalCorruptions: allCorruptions.length,
  uniqueKeys: byKey.size,
  byKey: Array.from(byKey.entries()).map(([key, langs]) => ({ key, langs })),
  byLang: Array.from(byLang.entries()).map(([lang, corruptions]) => ({ 
    lang, 
    count: corruptions.length,
    corruptions: corruptions.map(c => ({ lineNum: c.lineNum, key: c.key }))
  }))
}, null, 2));

console.log(`\n✅ Detailed report saved to: ${reportPath}`);
