#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const deepl = require('deepl-node');

// Initialize DeepL translator
const authKey = process.env.DEEPL_API_KEY;
if (!authKey) {
  console.error('❌ DEEPL_API_KEY environment variable not set');
  process.exit(1);
}

const translator = new deepl.Translator(authKey);

// Financial terminology glossary - terms to preserve or handle specially
const FINANCIAL_TERMS = {
  // Keep in English
  'Stop Loss': 'Stop Loss',
  'Take Profit': 'Take Profit',
  'Pip': 'Pip',
  'Spread': 'Spread',
  'NFP': 'NFP',
  'FOMC': 'FOMC',
  'ECB': 'ECB',
  'BOE': 'BOE',
  'BOJ': 'BOJ',
  'CPI': 'CPI',
  'PPI': 'PPI',
  'PCE': 'PCE',
  'GDP': 'GDP',
  'PMI': 'PMI',
  'AML/KYC': 'AML/KYC',
  'SSL': 'SSL',
};

// Language code mappings for DeepL
const DEEPL_LANG_CODES = {
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-PT',
  'it': 'it',
  'nl': 'nl',
  'ko': 'ko',
  'tr': 'tr',
  'pl': 'pl',
  'id': 'id',
  'th': 'th', // Note: DeepL doesn't support Thai directly
  'vi': 'vi', // Note: DeepL doesn't support Vietnamese directly
  'hi': 'hi',  // Hindi might not be supported
  'bn': 'bn',  // Bengali might not be supported
  'ms': 'ms',  // Malay might not be supported
  'fil': 'fil', // Filipino might not be supported
  'sv': 'sv',
  'no': 'nb',  // Norwegian Bokmål
  'da': 'da',
  'fi': 'fi',
  'cs': 'cs',
  'hu': 'hu',
  'ro': 'ro',
  'el': 'el',
  'he': 'he',  // Hebrew might need special handling
  'fa': 'fa',  // Persian might not be supported
  'ur': 'ur',  // Urdu might not be supported
  'sw': 'sw',  // Swahili might not be supported
  'uk': 'uk',
  'bg': 'bg',
  'hr': 'hr',  // Croatian might not be supported
  'sk': 'sk',
  'lt': 'lt',
  'lv': 'lv',
};

// Extract all translations from en.ts
function extractTranslations(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const translations = {};
  
  // Match translation key-value pairs
  const regex = /['"]([^'"]+)['"]\s*:\s*['"](.+?)['"]\s*,/gs;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    let value = match[2];
    
    // Unescape already escaped quotes
    value = value.replace(/\\'/g, "'").replace(/\\"/g, '"');
    
    translations[key] = value;
  }
  
  return translations;
}

// Escape apostrophes and quotes for TypeScript
function escapeString(str) {
  return str.replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// Preserve variable placeholders like {{variableName}}
function preservePlaceholders(text) {
  const placeholders = [];
  let preserved = text.replace(/\{\{([^}]+)\}\}/g, (match, content) => {
    const index = placeholders.length;
    placeholders.push(match);
    return `__PLACEHOLDER_${index}__`;
  });
  
  return { preserved, placeholders };
}

// Restore variable placeholders
function restorePlaceholders(text, placeholders) {
  return text.replace(/__PLACEHOLDER_(\d+)__/g, (match, index) => {
    return placeholders[parseInt(index)] || match;
  });
}

// Translate text with DeepL
async function translateText(text, targetLang) {
  if (!text || text.trim() === '') return text;
  
  try {
    // Preserve placeholders
    const { preserved, placeholders } = preservePlaceholders(text);
    
    // Translate
    const result = await translator.translateText(
      preserved,
      null, // Auto-detect source language
      targetLang,
      {
        preserveFormatting: true,
        formality: 'default',
      }
    );
    
    // Restore placeholders
    let translated = restorePlaceholders(result.text, placeholders);
    
    return translated;
  } catch (error) {
    console.error(`Translation error for "${text.substring(0, 50)}...": ${error.message}`);
    return text; // Return original on error
  }
}

// Translate all keys in batches using DeepL's batch API
async function translateAll(translations, targetLang, batchSize = 50) {
  const keys = Object.keys(translations);
  const result = {};
  let processed = 0;
  
  console.log(`📝 Translating ${keys.length} keys to ${targetLang}...`);
  
  for (let i = 0; i < keys.length; i += batchSize) {
    const batch = keys.slice(i, i + batchSize);
    const batchTexts = batch.map(key => {
      const { preserved, placeholders } = preservePlaceholders(translations[key]);
      return { key, preserved, placeholders };
    });
    
    try {
      // Batch translate using DeepL API
      const textsToTranslate = batchTexts.map(item => item.preserved);
      const results = await translator.translateText(
        textsToTranslate,
        null,
        targetLang,
        {
          preserveFormatting: true,
          formality: 'default',
        }
      );
      
      // Process results
      for (let j = 0; j < batch.length; j++) {
        const key = batch[j];
        const { placeholders } = batchTexts[j];
        const translated = Array.isArray(results) ? results[j].text : results.text;
        result[key] = restorePlaceholders(translated, placeholders);
        processed++;
      }
      
      if (processed % 100 === 0 || processed === keys.length) {
        console.log(`   Translated ${processed}/${keys.length} keys...`);
      }
      
      // Small delay between batch requests
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`Batch translation error: ${error.message}`);
      // Fallback to individual translation for this batch
      for (const key of batch) {
        result[key] = await translateText(translations[key], targetLang);
        processed++;
      }
    }
  }
  
  console.log(`✅ Translation complete: ${processed} keys`);
  return result;
}

// Generate translation file
function generateTranslationFile(translations, langCode, outputPath) {
  const varName = langCode.replace(/-/g, '');
  const lines = [`export const ${varName} = {`];
  
  // Add translations
  for (const [key, value] of Object.entries(translations)) {
    const escapedValue = escapeString(value);
    lines.push(`  '${key}': '${escapedValue}',`);
  }
  
  lines.push('};');
  lines.push(''); // Empty line at end
  
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`💾 Saved: ${outputPath}`);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node translate-with-deepl.js <lang-code> [lang-code...]');
    console.log('Example: node translate-with-deepl.js pt-BR it nl');
    process.exit(1);
  }
  
  const enPath = path.join(__dirname, '../client/src/translations/en.ts');
  const outputDir = path.join(__dirname, '../client/src/translations');
  
  console.log('🔍 Extracting English translations...');
  const englishTranslations = extractTranslations(enPath);
  console.log(`📊 Found ${Object.keys(englishTranslations).length} translation keys\n`);
  
  for (const langCode of args) {
    const deeplLang = DEEPL_LANG_CODES[langCode];
    if (!deeplLang) {
      console.error(`❌ Unsupported language code: ${langCode}`);
      continue;
    }
    
    console.log(`\n🌐 Processing ${langCode}...`);
    
    try {
      // Translate
      const translated = await translateAll(englishTranslations, deeplLang);
      
      // Generate file
      const outputPath = path.join(outputDir, `${langCode}.ts`);
      generateTranslationFile(translated, langCode, outputPath);
      
      console.log(`✅ ${langCode} completed!\n`);
    } catch (error) {
      console.error(`❌ Failed to process ${langCode}: ${error.message}`);
    }
  }
  
  console.log('\n🎉 All translations complete!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
