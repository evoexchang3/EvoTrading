#!/usr/bin/env node

/**
 * Comprehensive fix for ALL corrupted translation keys
 * Detects any key where the key name appears inside the value text
 * and replaces with English fallback from en.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = [
  'bg', 'cs', 'da', 'el', 'et', 'fi', 'he', 'hu', 'id', 'it', 'ko', 'lt', 'lv',
  'nl', 'pl', 'pt-BR', 'pt-PT', 'ro', 'sk', 'sl', 'sv', 'tr', 'uk', 'vi', 'zh-TW', 'nb', 'zh-CN'
];

console.log('🔧 Finding and fixing ALL corrupted translation keys...\n');

// Load English source
const enPath = path.join(__dirname, '../client/src/translations/en.ts');
const enContent = fs.readFileSync(enPath, 'utf8');

// Parse English key-value pairs
const enMap = new Map();
const enMatches = enContent.matchAll(/'([^']+)':\s*'([^']*(?:\\'[^']*)*)'/g);
for (const match of enMatches) {
  const key = match[1];
  const value = match[2];
  enMap.set(key, value);
}

console.log(`✓ Loaded ${enMap.size} keys from English source\n`);

let totalCorrupted = 0;
let totalFixed = 0;

for (const lang of languages) {
  const filePath = path.join(__dirname, `../client/src/translations/${lang}.ts`);
  
  if (!fs.existsSync(filePath)) {
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const corrupted = [];
  
  // Find all corrupted lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Extract key from line
    const keyMatch = line.match(/'([^']+)':/);
    if (!keyMatch) continue;
    
    const key = keyMatch[1];
    
    // Check if key name appears INSIDE the value (corruption marker)
    if (line.includes(`'${key}':`) && line.indexOf(`'${key}':`, line.indexOf(':'))) {
      corrupted.push({ lineNum: i, key, line });
    }
  }
  
  if (corrupted.length === 0) {
    console.log(`✓  ${lang}: No corrupted keys`);
    continue;
  }
  
  console.log(`🔧 ${lang}: Found ${corrupted.length} corrupted keys`);
  
  // Create backup
  const backupPath = `${filePath}.bak-comprehensive`;
  fs.writeFileSync(backupPath, content, 'utf8');
  
  // Fix each corrupted line
  let fixedCount = 0;
  for (const item of corrupted) {
    const englishValue = enMap.get(item.key);
    if (!englishValue) {
      console.log(`   ⚠  ${item.key}: No English source found`);
      continue;
    }
    
    // Replace with properly-escaped English value
    const newLine = `  '${item.key}': '${englishValue}',`;
    lines[item.lineNum] = newLine;
    fixedCount++;
  }
  
  // Write fixed content
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  
  console.log(`   ✅ Fixed ${fixedCount}/${corrupted.length} keys\n`);
  totalCorrupted += corrupted.length;
  totalFixed += fixedCount;
}

console.log('='.repeat(60));
console.log(`📊 Summary:`);
console.log(`   Total corrupted keys found: ${totalCorrupted}`);
console.log(`   Total keys fixed: ${totalFixed}`);
console.log('='.repeat(60));

if (totalFixed > 0) {
  console.log('\n✅ Run validate-translations.js to confirm all fixes');
}
