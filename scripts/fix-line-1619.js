#!/usr/bin/env node

/**
 * Emergency fix for corrupted line 1619 pattern across all language files
 * Pattern: 'key': ''key': text...
 * Should be: 'key': 'English fallback text'
 * 
 * Enhanced with:
 * - Pre-validation to confirm doubled key fragment
 * - File backups before modification
 * - Detailed logging of no-match cases for manual inspection
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = [
  'bg', 'cs', 'da', 'el', 'et', 'fi', 'he', 'hu', 'it', 'ko', 'lt', 'lv',
  'nl', 'pl', 'pt-BR', 'pt-PT', 'ro', 'sk', 'sl', 'sv', 'uk', 'vi', 'zh-TW', 'nb', 'zh-CN'
];

// English source value (verified from en.ts)
const KEY = 'tools.positionCalculator.riskRules.rule1.example';
const englishValue = "$10,000 account → Max $200 risk per trade. If stopped out 5 times in a row, you're only down $1,000 (10%), still plenty of capital to recover.";

let totalFixed = 0;
let totalSkipped = 0;
let totalNotFound = 0;

console.log('🔧 Fixing corrupted line 1619 across 25 languages...\n');

for (const lang of languages) {
  const filePath = path.join(__dirname, `../client/src/translations/${lang}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭  ${lang}: File not found, skipping`);
    totalNotFound++;
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Detect corruption: doubled key literal embedded in value
  const corruptionPattern = new RegExp(
    `'${KEY.replace(/\./g, '\\.')}':\\s*''${KEY.replace(/\./g, '\\.')}':`,
    ''
  );
  
  // Also check for other malformed patterns (missing quotes, broken escape sequences)
  const linePattern = new RegExp(
    `'${KEY.replace(/\./g, '\\.')}':[^,\\n]{0,500}`,
    ''
  );
  
  const lineMatch = content.match(linePattern);
  
  if (!lineMatch) {
    console.log(`⚠  ${lang}: Key not found - MANUAL INSPECTION REQUIRED`);
    totalNotFound++;
    continue;
  }
  
  const currentLine = lineMatch[0];
  
  // Confirm corruption is present
  const hasBackslashes = currentLine.includes("\\\\");
  if (corruptionPattern.test(currentLine) || 
      (hasBackslashes && currentLine.length > 150)) {
    
    // Create backup
    const backupPath = `${filePath}.bak-line1619`;
    fs.writeFileSync(backupPath, content, 'utf8');
    
    // Replace with English fallback
    const replacement = `'${KEY}': '${englishValue}',`;
    const newContent = content.replace(linePattern, replacement);
    
    // Verify replacement succeeded
    if (newContent === content) {
      console.log(`❌ ${lang}: Replacement FAILED - check manually`);
      fs.unlinkSync(backupPath); // Remove backup
      continue;
    }
    
    // Write fixed content
    fs.writeFileSync(filePath, newContent, 'utf8');
    totalFixed++;
    console.log(`✅ ${lang}: Fixed (backup: ${path.basename(backupPath)})`);
    
  } else {
    console.log(`✓  ${lang}: Already correct`);
    totalSkipped++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 Summary:');
console.log(`   Fixed: ${totalFixed}`);
console.log(`   Already correct: ${totalSkipped}`);
console.log(`   Not found: ${totalNotFound}`);
console.log('='.repeat(60));

if (totalFixed > 0) {
  console.log('\n✅ Run validate-translations.js to confirm all fixes');
}

if (totalNotFound > 0) {
  console.log('\n⚠️  Some files require manual inspection');
}
