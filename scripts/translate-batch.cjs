#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const deepl = require('deepl-node');

const authKey = process.env.DEEPL_API_KEY;
if (!authKey) {
  console.error('❌ DEEPL_API_KEY not set');
  process.exit(1);
}

const translator = new deepl.Translator(authKey);

// DeepL supported language codes
const DEEPL_LANGS = {
  'pt-BR': 'pt-BR', 'pt-PT': 'pt-PT', 'it': 'it', 'nl': 'nl',
  'ko': 'ko', 'tr': 'tr', 'pl': 'pl', 'id': 'id',
  'sv': 'sv', 'no': 'nb', 'da': 'da', 'fi': 'fi',
  'cs': 'cs', 'hu': 'hu', 'ro': 'ro', 'el': 'el',
  'uk': 'uk', 'bg': 'bg', 'sk': 'sk', 'lt': 'lt', 'lv': 'lv',
};

// Extract translations from en.ts
function extractTranslations(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const translations = {};
  const regex = /['"]([^'"]+)['"]\s*:\s*['"](.+?)['"]\s*,/gs;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    translations[match[1]] = match[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
  }
  
  return translations;
}

// Preserve {{placeholders}}
function preservePlaceholders(text) {
  const placeholders = [];
  const preserved = text.replace(/\{\{([^}]+)\}\}/g, (match) => {
    placeholders.push(match);
    return `__PH${placeholders.length - 1}__`;
  });
  return { preserved, placeholders };
}

// Restore {{placeholders}}
function restorePlaceholders(text, placeholders) {
  return text.replace(/__PH(\d+)__/g, (_, idx) => placeholders[parseInt(idx)] || '');
}

// Escape for TypeScript
function escapeString(str) {
  return str.replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// Batch translate
async function translateAll(translations, targetLang) {
  const keys = Object.keys(translations);
  console.log(`📝 Translating ${keys.length} keys to ${targetLang}...`);
  
  const textsToTranslate = [];
  const metadata = [];
  
  for (const key of keys) {
    const { preserved, placeholders } = preservePlaceholders(translations[key]);
    textsToTranslate.push(preserved);
    metadata.push({ key, placeholders });
  }
  
  const result = {};
  const batchSize = 50;
  let processed = 0;
  
  for (let i = 0; i < textsToTranslate.length; i += batchSize) {
    const batch = textsToTranslate.slice(i, i + batchSize);
    const batchMeta = metadata.slice(i, i + batchSize);
    
    try {
      const results = await translator.translateText(batch, null, targetLang, {
        preserveFormatting: true,
        formality: 'default',
      });
      
      const resultArray = Array.isArray(results) ? results : [results];
      for (let j = 0; j < batch.length; j++) {
        const { key, placeholders } = batchMeta[j];
        result[key] = restorePlaceholders(resultArray[j].text, placeholders);
      }
      
      processed += batch.length;
      console.log(`   ${processed}/${keys.length} keys (${Math.round(processed/keys.length*100)}%)`);
      
      await new Promise(r => setTimeout(r, 100));
    } catch (error) {
      console.error(`Batch error: ${error.message}`);
      // Fallback: translate individually
      for (let j = 0; j < batch.length; j++) {
        const { key, placeholders } = batchMeta[j];
        try {
          const res = await translator.translateText(batch[j], null, targetLang);
          result[key] = restorePlaceholders(res.text, placeholders);
        } catch (e) {
          result[key] = translations[key]; // Keep original on error
        }
      }
      processed += batch.length;
    }
  }
  
  console.log(`✅ Complete: ${processed} keys`);
  return result;
}

// Generate translation file
function generateFile(translations, langCode, outputPath) {
  const varName = langCode.replace(/-/g, '');
  const lines = [`export const ${varName} = {`];
  
  for (const [key, value] of Object.entries(translations)) {
    lines.push(`  '${key}': '${escapeString(value)}',`);
  }
  
  lines.push('};', '');
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`💾 Saved: ${outputPath}`);
}

// Main
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node translate-batch.cjs <lang-code> [lang-code...]');
    console.log('Example: node translate-batch.cjs pt-BR it nl');
    process.exit(1);
  }
  
  const enPath = path.join(__dirname, '../client/src/translations/en.ts');
  const outputDir = path.join(__dirname, '../client/src/translations');
  
  console.log('🔍 Extracting English translations...');
  const english = extractTranslations(enPath);
  console.log(`📊 Found ${Object.keys(english).length} keys\n`);
  
  for (const langCode of args) {
    const deeplLang = DEEPL_LANGS[langCode];
    if (!deeplLang) {
      console.error(`❌ Unsupported: ${langCode}`);
      continue;
    }
    
    console.log(`\n🌐 ${langCode}...`);
    try {
      const translated = await translateAll(english, deeplLang);
      const outputPath = path.join(outputDir, `${langCode}.ts`);
      generateFile(translated, langCode, outputPath);
      console.log(`✅ ${langCode} done!\n`);
    } catch (error) {
      console.error(`❌ ${langCode} failed: ${error.message}`);
    }
  }
  
  console.log('\n🎉 All translations complete!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
