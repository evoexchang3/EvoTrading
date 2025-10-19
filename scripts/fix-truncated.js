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
const RETRY_DELAY = 2000; // 2 seconds between translations

// Language code mapping
const DEEPL_LANG_MAP = {
  'pt': 'pt-PT', // Portuguese
  'it': 'it',    // Italian
  'nl': 'nl',    // Dutch
  'pl': 'pl',    // Polish
  'zh-CN': 'zh', // Chinese Simplified
  'ja': 'ja',    // Japanese
  'de': 'de',    // German
  'fr': 'fr',    // French
  'es': 'es',    // Spanish
  'ar': 'ar',    // Arabic
  'ru': 'ru',    // Russian
};

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

  // Fix each truncated string
  for (let i = 0; i < truncatedKeys.length; i++) {
    const { key, original } = truncatedKeys[i];
    
    console.log(`   [${i + 1}/${truncatedKeys.length}] ${key}`);
    
    try {
      // Translate the original string
      const result = await translator.translateText(original, null, targetLang, {
        preserveFormatting: true,
        tagHandling: 'xml',
      });
      
      const translated = result.text;
      
      // Escape special characters for TypeScript string
      const escaped = translated
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      
      // Find and replace the [INCOMPLETE] placeholder
      const searchPattern = new RegExp(`'${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}': '\\[INCOMPLETE\\] [^']*'`, 'g');
      const replacement = `'${key}': '${escaped}'`;
      
      fileContent = fileContent.replace(searchPattern, replacement);
      
      console.log(`   ✅ Fixed`);
      
      // Rate limiting
      if (i < truncatedKeys.length - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
    }
  }

  // Write updated file
  fs.writeFileSync(translationFile, fileContent);
  console.log(`\n✅ Fixed ${truncatedKeys.length} translations in ${langCode}.ts`);
  
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
