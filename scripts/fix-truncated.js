#!/usr/bin/env node

/**
 * Second-pass cleanup script to fix truncated translations
 * Usage: node scripts/fix-truncated.js <lang-code>
 */

import { Translator } from 'deepl-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const BATCH_SIZE = 20; // Translate 20 keys per API call
const CONCURRENCY = 2; // Process 2 batches concurrently
const MAX_RETRIES = 3; // Retry failed batches up to 3 times

// Language code mapping (i18n code -> DeepL API code) - All 35 languages
const DEEPL_LANG_MAP = {
  // Tier 0 - Existing
  'zh-CN': 'ZH',     'ja': 'JA',        'de': 'DE',        'fr': 'FR',
  'es': 'ES',        'ar': 'AR',        'ru': 'RU',
  
  // Tier 1 - High Priority
  'it': 'IT',        'nl': 'NL',        'pl': 'PL',        'pt-BR': 'PT-BR',
  'pt-PT': 'PT-PT',  'ko': 'KO',        'tr': 'TR',        'he': 'HE',
  'vi': 'VI',        'zh-TW': 'ZH-HANT','en-GB': 'EN-GB',
  
  // Tier 2 - European
  'sv': 'SV',        'da': 'DA',        'fi': 'FI',        'nb': 'NB',
  'cs': 'CS',        'ro': 'RO',        'hu': 'HU',        'el': 'EL',
  'bg': 'BG',
  
  // Tier 3 - Emerging
  'uk': 'UK',        'id': 'ID',        'et': 'ET',        'lt': 'LT',
  'lv': 'LV',        'sk': 'SK',        'sl': 'SL',
};

// Retry helper with exponential backoff
async function retryWithBackoff(fn, maxRetries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const isNetworkError = ['ECONNRESET', 'ETIMEDOUT', 'ECONNABORTED', 'ENOTFOUND'].includes(error.code);
      const isRateLimitError = error.statusCode === 429 || error.message?.includes('quota');
      
      if (attempt === maxRetries || (!isNetworkError && !isRateLimitError)) {
        throw error;
      }
      
      const backoffMs = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
      console.log(`   ⏳ Retry ${attempt}/${maxRetries} after ${backoffMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoffMs));
    }
  }
}

// Process a batch of translations
async function processBatch(translator, keys, targetLang, batchNum, totalBatches) {
  console.log(`\n📦 Batch ${batchNum}/${totalBatches} (${keys.length} keys)`);
  
  const results = await Promise.all(
    keys.map(async ({ key, original }, idx) => {
      try {
        const result = await retryWithBackoff(async () => {
          return await translator.translateText(original, null, targetLang, {
            preserveFormatting: true,
            tagHandling: 'xml',
          });
        });
        
        const translated = result.text;
        console.log(`   ✅ [${idx + 1}/${keys.length}] ${key}`);
        
        return { key, translated, success: true };
      } catch (error) {
        console.log(`   ❌ [${idx + 1}/${keys.length}] ${key}: ${error.message}`);
        return { key, translated: null, success: false };
      }
    })
  );
  
  return results;
}

async function fixTruncatedTranslations(langCode) {
  if (!DEEPL_API_KEY) {
    console.error('❌ Error: DEEPL_API_KEY not found in environment');
    process.exit(1);
  }

  const translator = new Translator(DEEPL_API_KEY);
  const truncatedFile = path.join(__dirname, `truncated-${langCode}.json`);
  const translationFile = path.join(__dirname, '..', 'client', 'src', 'translations', `${langCode}.ts`);

  // Check if truncated file exists
  if (!fs.existsSync(truncatedFile)) {
    console.log(`✅ No truncated translations found for ${langCode}`);
    return;
  }

  // Load truncated keys
  const truncatedKeys = JSON.parse(fs.readFileSync(truncatedFile, 'utf-8'));
  console.log(`🔧 Fixing ${truncatedKeys.length} truncated translations for ${langCode}...\n`);

  // Load translation file
  if (!fs.existsSync(translationFile)) {
    console.error(`❌ Error: Translation file not found: ${translationFile}`);
    process.exit(1);
  }

  let fileContent = fs.readFileSync(translationFile, 'utf-8');
  const targetLang = DEEPL_LANG_MAP[langCode] || langCode;

  // Split truncated keys into batches
  const batches = [];
  for (let i = 0; i < truncatedKeys.length; i += BATCH_SIZE) {
    batches.push(truncatedKeys.slice(i, i + BATCH_SIZE));
  }
  
  console.log(`📊 Processing ${truncatedKeys.length} truncations in ${batches.length} batches (${BATCH_SIZE} keys/batch, concurrency ${CONCURRENCY})\n`);

  // Process batches with controlled concurrency
  let allResults = [];
  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const batchPromises = batches
      .slice(i, i + CONCURRENCY)
      .map((batch, idx) => 
        processBatch(translator, batch, targetLang, i + idx + 1, batches.length)
      );
    
    const batchResults = await Promise.all(batchPromises);
    allResults.push(...batchResults.flat());
  }

  // Apply all successful translations to file
  let fixedCount = 0;
  for (const { key, translated, success } of allResults) {
    if (!success || !translated) continue;
    
    // Escape special characters for TypeScript string
    const escaped = translated
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
    
    // Find and replace the [INCOMPLETE] placeholder
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchPattern = new RegExp(
      `^(\\s*'${escapedKey}':\\s*')\\[INCOMPLETE\\][\\s\\S]*?'(,?)$`,
      'gm'
    );
    const replacement = `$1${escaped}'$2`;
    
    const beforeLength = fileContent.length;
    fileContent = fileContent.replace(searchPattern, replacement);
    const afterLength = fileContent.length;
    
    if (beforeLength !== afterLength) {
      fixedCount++;
    }
  }

  // Write updated file
  fs.writeFileSync(translationFile, fileContent);
  console.log(`\n✅ Fixed ${fixedCount}/${truncatedKeys.length} translations in ${langCode}.ts`);
  
  // Clean up truncated file
  fs.unlinkSync(truncatedFile);
  console.log(`🗑️  Removed ${path.basename(truncatedFile)}`);
  
  // Check for remaining [INCOMPLETE] markers
  const remainingIncomplete = (fileContent.match(/\[INCOMPLETE\]/g) || []).length;
  if (remainingIncomplete > 0) {
    console.log(`\n⚠️  Warning: ${remainingIncomplete} [INCOMPLETE] markers still remain`);
  } else {
    console.log(`\n✨ All translations complete!`);
  }
}

// Main execution
const langCode = process.argv[2];
if (!langCode) {
  console.error('Usage: node scripts/fix-truncated.js <lang-code>');
  console.error('Example: node scripts/fix-truncated.js pt');
  process.exit(1);
}

fixTruncatedTranslations(langCode).catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
