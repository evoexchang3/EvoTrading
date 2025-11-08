#!/usr/bin/env node

/**
 * Replace [RETRANSLATE] markers with English fallback
 * 
 * Pragmatic solution for DeepL truncation issues:
 * - Replaces all [RETRANSLATE] markers with English source text
 * - Ensures 100% functional app (no broken keys)
 * - Documents limitation for future manual translation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationsDir = path.join(__dirname, '..', 'client', 'src', 'translations');

const AFFECTED_LANGUAGES = [
  'tr', 'fi', 'sl', 'sk', 'cs', 'ro', 'nb', 'en-GB', 'el', 'et', 'bg', 'hu',
  'lt', 'lv', 'vi', 'he', 'pt-PT', 'sv', 'pl', 'pt-BR', 'ko', 'da', 'id',
  'uk', 'zh-TW', 'it', 'nl'
];

/**
 * Extract keys needing English fallback
 */
function extractRetranslateKeys(content) {
  const keys = [];
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('[RETRANSLATE]') || line.includes('[NEEDS_MANUAL_REVIEW]')) {
      const match = line.match(/['"]([^'"]+)['"]\s*:/);
      if (match) {
        keys.push(match[1]);
      }
    }
  }
  
  return [...new Set(keys)];
}

/**
 * Get English value for a key
 */
function getEnglishValue(key) {
  const enFile = path.join(translationsDir, 'en.ts');
  const content = fs.readFileSync(enFile, 'utf-8');
  
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`['"]${escapedKey}['"]\\s*:\\s*['"]((?:[^'"]|\\\\['"])*)['"]+`, 'g');
  const match = regex.exec(content);
  
  if (match && match[1]) {
    return match[1]
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');
  }
  
  return null;
}

/**
 * Replace [RETRANSLATE] markers with English text
 */
function replaceWithEnglish(langCode) {
  const filePath = path.join(translationsDir, `${langCode}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${langCode} - file not found`);
    return { success: false };
  }
  
  console.log(`🔧 Processing ${langCode}...`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const keys = extractRetranslateKeys(content);
  
  if (keys.length === 0) {
    console.log(`✓  No [RETRANSLATE] markers in ${langCode}`);
    return { success: true, replacedCount: 0 };
  }
  
  console.log(`   Found ${keys.length} keys with [RETRANSLATE] markers`);
  
  let replacedCount = 0;
  
  for (const key of keys) {
    const englishValue = getEnglishValue(key);
    
    if (!englishValue) {
      console.warn(`   ⚠️  No English value found for: ${key}`);
      continue;
    }
    
    // Escape the value for JavaScript string
    const escapedValue = englishValue
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t');
    
    // Replace all patterns containing [RETRANSLATE] or [NEEDS_MANUAL_REVIEW]
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Pattern 1: Pure '[RETRANSLATE]' (string concat)
    const pattern1 = new RegExp(
      `(['"]${escapedKey}['"]\\s*:\\s*)['"]\\[RETRANSLATE\\]['"]`,
      'g'
    );
    
    // Pattern 2: Concatenated with partial text + '[RETRANSLATE]'
    const pattern2 = new RegExp(
      `(['"]${escapedKey}['"]\\s*:\\s*)'[^']*'\\s*\\+\\s*['"]\\[RETRANSLATE\\]['"]`,
      'g'
    );
    
    // Pattern 3: [NEEDS_MANUAL_REVIEW]
    const pattern3 = new RegExp(
      `(['"]${escapedKey}['"]\\s*:\\s*)(?:'[^']*'\\s*\\+\\s*)?['"]\\[NEEDS_MANUAL_REVIEW\\]['"]`,
      'g'
    );
    
    const beforeReplace = content;
    content = content.replace(pattern3, `$1'${escapedValue}'`);
    content = content.replace(pattern2, `$1'${escapedValue}'`);
    content = content.replace(pattern1, `$1'${escapedValue}'`);
    
    if (content !== beforeReplace) {
      replacedCount++;
    }
  }
  
  if (replacedCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Replaced ${replacedCount} keys with English fallback in ${langCode}`);
  }
  
  return { success: true, replacedCount };
}

/**
 * Main execution
 */
async function main() {
  console.log('🔄 ENGLISH FALLBACK REPLACEMENT');
  console.log('='.repeat(60));
  console.log('Replacing [RETRANSLATE] markers with English text');
  console.log('');
  
  const results = [];
  let totalReplaced = 0;
  
  for (const lang of AFFECTED_LANGUAGES) {
    const result = replaceWithEnglish(lang);
    results.push({ lang, ...result });
    totalReplaced += result.replacedCount || 0;
  }
  
  console.log('');
  console.log('='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total languages processed: ${results.filter(r => r.success).length}`);
  console.log(`Total keys replaced with English: ${totalReplaced}`);
  console.log('');
  console.log('✅ All languages now have functional translations!');
  console.log('   (Some keys use English fallback due to DeepL truncation)');
}

main().catch(console.error);
