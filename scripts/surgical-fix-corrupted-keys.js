#!/usr/bin/env node

/**
 * Surgical fix for exactly 28 corrupted translation keys
 * Replaces ONLY the known corrupted keys with clean English source
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// English source values for corrupted keys
const FIXES = {
  'tools.positionCalculator.faq.q6.answer': "Fixed Fractional (recommended for most traders): Risk a fixed % of current account balance per trade. Example: 2% of $10K = $200 risk. Account grows to $12K → 2% = $240 risk. Position size scales with account automatically. Pros: Compounds gains, reduces risk on drawdowns. Cons: Slow growth initially. Fixed Ratio: Risk increases only after specific profit target (e.g., increase size by 1 lot per $5K profit). Example: 1 lot until $15K, then 2 lots until $20K. Pros: Controlled growth. Cons: Complex to manage. For 95% of traders, use Fixed Fractional - it\\'s mathematically optimal and emotionally easier.",
  'tools.positionCalculator.riskRules.rule1.example': "$10,000 account → Max $200 risk per trade. If stopped out 5 times in a row, you\\'re only down $1,000 (10%), still plenty of capital to recover."
};

const AFFECTED_LANGUAGES = [
  'bg', 'cs', 'da', 'el', 'et', 'fi', 'he', 'hu', 'id', 'it', 'ko', 'lt', 'lv',
  'nb', 'nl', 'pl', 'pt-BR', 'pt-PT', 'ro', 'sk', 'sl', 'sv', 'tr', 'uk', 'vi', 'zh-CN', 'zh-TW'
];

console.log('🔧 SURGICAL FIX: Repairing 28 corrupted translation keys\n');
console.log('='.repeat(60));

let totalFixed = 0;

for (const lang of AFFECTED_LANGUAGES) {
  const filePath = path.join(__dirname, `../client/src/translations/${lang}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${lang}: File not found, skipping`);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let fixesApplied = 0;
  
  // Create backup
  const backupPath = `${filePath}.bak-surgical`;
  fs.writeFileSync(backupPath, content, 'utf8');
  
  // Fix each corrupted key
  for (const [key, englishValue] of Object.entries(FIXES)) {
    // Special case: cs.ts has both keys, others only have q6.answer
    if (lang !== 'cs' && key === 'tools.positionCalculator.riskRules.rule1.example') {
      continue;
    }
    
    // Pattern to match the corrupted line (key appears multiple times in value)
    const corrupted = new RegExp(
      `'${key.replace(/\./g, '\\.')}':\\s*'[^']*'${key.replace(/\./g, '\\.')}[^']*'[^\\n]*`,
      'g'
    );
    
    // Check if corruption exists
    if (corrupted.test(modified)) {
      // Replace with clean English value
      const cleanLine = `  '${key}': '${englishValue}',`;
      
      // Find and replace the entire corrupted line
      const linePattern = new RegExp(
        `^\\s*'${key.replace(/\./g, '\\.')}':[^\\n]*$`,
        'gm'
      );
      
      modified = modified.replace(linePattern, cleanLine);
      fixesApplied++;
      totalFixed++;
      console.log(`   ✅ Fixed: ${key}`);
    }
  }
  
  if (fixesApplied > 0) {
    fs.writeFileSync(filePath, modified, 'utf8');
    console.log(`✓  ${lang}: Fixed ${fixesApplied} key(s)\n`);
  } else {
    console.log(`⚠️  ${lang}: No corrupted keys found\n`);
  }
}

console.log('='.repeat(60));
console.log(`📊 SUMMARY:`);
console.log(`   Total corrupted keys fixed: ${totalFixed}/28`);
console.log(`   Status: ${totalFixed === 28 ? '✅ COMPLETE' : '⚠️  INCOMPLETE'}`);
console.log('='.repeat(60));

if (totalFixed > 0) {
  console.log('\n✅ Next steps:');
  console.log('   1. Restart the application workflow');
  console.log('   2. Check build logs for any remaining errors');
  console.log('   3. Test language selector for all 35 languages');
}
