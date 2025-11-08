#!/usr/bin/env node

/**
 * Final comprehensive fix for ALL 11 corrupted translation keys
 * Based on corruption-report.json findings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// English source values for the 2 corrupted keys
const FIXES = {
  'company.safetyOfFunds.faq.q5.answer': "No, you can still lose your entire account balance through normal trading losses. Negative Balance Protection (NBP) only prevents you from owing money beyond your deposited amount. Example: You deposit $1,000 and lose it all → You lose $1,000 (NBP doesn\\'t help). You deposit $1,000, market gaps, account goes to -$500 → NBP resets to $0, you lose $1,000 but don\\'t owe the extra $500. NBP protects from debt, not from losing your capital. Always trade responsibly with money you can afford to lose.",
  'tools.positionCalculator.riskRules.rule1.example': "$10,000 account → Max $200 risk per trade. If stopped out 5 times in a row, you\\'re only down $1,000 (10%), still plenty of capital to recover."
};

// Exact corruptions from scan
const CORRUPTIONS = [
  { lang: 'el', lineNum: 3466, key: 'company.safetyOfFunds.faq.q5.answer' },
  { lang: 'ko', lineNum: 3466, key: 'company.safetyOfFunds.faq.q5.answer' },
  { lang: 'nb', lineNum: 3466, key: 'company.safetyOfFunds.faq.q5.answer' },
  { lang: 'nb', lineNum: 7800, key: 'company.safetyOfFunds.faq.q5.answer' },
  { lang: 'pl', lineNum: 3466, key: 'company.safetyOfFunds.faq.q5.answer' },
  { lang: 'pt-PT', lineNum: 3466, key: 'company.safetyOfFunds.faq.q5.answer' },
  { lang: 'ro', lineNum: 3466, key: 'company.safetyOfFunds.faq.q5.answer' },
  { lang: 'ro', lineNum: 7800, key: 'company.safetyOfFunds.faq.q5.answer' },
  { lang: 'fi', lineNum: 5953, key: 'tools.positionCalculator.riskRules.rule1.example' },
  { lang: 'sk', lineNum: 5953, key: 'tools.positionCalculator.riskRules.rule1.example' },
  { lang: 'sl', lineNum: 5953, key: 'tools.positionCalculator.riskRules.rule1.example' }
];

console.log('🔧 FINAL FIX: Repairing ALL 11 corrupted translation keys\n');
console.log('='.repeat(70));

let totalFixed = 0;
const byLang = new Map();

// Group by language
for (const corruption of CORRUPTIONS) {
  if (!byLang.has(corruption.lang)) {
    byLang.set(corruption.lang, []);
  }
  byLang.get(corruption.lang).push(corruption);
}

// Fix each language file
for (const [lang, corruptions] of byLang.entries()) {
  const filePath = path.join(__dirname, `../client/src/translations/${lang}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${lang}: File not found, skipping`);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Create backup
  const backupPath = `${filePath}.bak-final`;
  fs.writeFileSync(backupPath, content, 'utf8');
  
  let fixesApplied = 0;
  
  // Fix each corrupted line
  for (const corruption of corruptions) {
    const lineIndex = corruption.lineNum - 1;
    const englishValue = FIXES[corruption.key];
    
    if (lineIndex >= 0 && lineIndex < lines.length) {
      // Replace with clean English value
      const cleanLine = `  '${corruption.key}': '${englishValue}',`;
      lines[lineIndex] = cleanLine;
      fixesApplied++;
      totalFixed++;
      console.log(`   ✅ Line ${corruption.lineNum}: ${corruption.key}`);
    }
  }
  
  // Write fixed content
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`✓  ${lang}: Fixed ${fixesApplied}/${corruptions.length} key(s)\n`);
}

console.log('='.repeat(70));
console.log(`📊 FINAL SUMMARY:`);
console.log(`   Total corrupted keys fixed: ${totalFixed}/11`);
console.log(`   Status: ${totalFixed === 11 ? '✅ ALL FIXED!' : '⚠️  INCOMPLETE'}`);
console.log('='.repeat(70));

if (totalFixed === 11) {
  console.log('\n🎉 SUCCESS! All known corruptions have been fixed.');
  console.log('\n✅ Next steps:');
  console.log('   1. Restart the application workflow');
  console.log('   2. Verify clean build with zero errors');
  console.log('   3. Test all 35 languages in the UI');
}
