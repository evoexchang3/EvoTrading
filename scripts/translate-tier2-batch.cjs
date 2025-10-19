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

// DeepL supported language mappings
const DEEPL_LANGUAGES = {
  // Tier 2
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-PT',
  'it': 'it',
  'nl': 'nl',
  'ko': 'ko',
  'tr': 'tr',
  'pl': 'pl',
  'id': 'id',
  // Tier 3
  'sv': 'sv',
  'no': 'nb',
  'da': 'da',
  'fi': 'fi',
  'cs': 'cs',
  'hu': 'hu',
  'ro': 'ro',
  'el': 'el',
  // Tier 4
  'uk': 'uk',
  'bg': 'bg',
  'sk': 'sk',
  'lt': 'lt',
  'lv': 'lv',
};

// Extract translations from en.ts
function extractTranslations(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const translations = {};
  
  const regex = /['"]([^'"]+)['"]\s*:\s*['"](.+?)['"],?\s*$/gm;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    let value = match[2];
    value = value.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n');
    translations[key] = value;
  }
  
  return translations;
}

// Escape for TypeScript
function escapeString(str) {
  return str.replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// Preserve {{variables}}
function preservePlaceholders(text) {
  const placeholders = [];
  const preserved = text.replace(/\{\{([^}]+)\}\}/g, (match) => {
    const idx = placeholders.length;
    placeholders.push(match);
    return `__PH${idx}__`;
  });
  return { preserved, placeholders };
}

// Restore {{variables}}
function restorePlaceholders(text, placeholders) {
  return text.replace(/__PH(\d+)__/g, (match, idx) => placeholders[parseInt(idx)] || match);
}

// Batch translate with DeepL
async function batchTranslate(translations, targetLang) {
  const keys = Object.keys(translations);
  const result = {};
  
  console.log(`📝 Translating ${keys.length} keys to ${targetLang}...`);
  
  // Prepare all texts
  const data = keys.map(key => {
    const { preserved, placeholders } = preservePlaceholders(translations[key]);
    return { key, preserved, placeholders };
  });
  
  // Translate in batches of 50
  const batchSize = 50;
  let processed = 0;
  
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const texts = batch.map(d => d.preserved);
    
    try {
      const results = await translator.translateText(texts, null, targetLang, {
        preserveFormatting: true,
      });
      
      const resultsArray = Array.isArray(results) ? results : [results];
      
      for (let j = 0; j < batch.length; j++) {
        const { key, placeholders } = batch[j];
        const translated = resultsArray[j]?.text || texts[j];
        result[key] = restorePlaceholders(translated, placeholders);
      }
      
      processed += batch.length;
      console.log(`   ${processed}/${keys.length} keys translated`);
      
      // Rate limit delay
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Batch error: ${error.message}`);
      // Use original text on error
      for (const { key } of batch) {
        result[key] = translations[key];
      }
      processed += batch.length;
    }
  }
  
  console.log(`✅ Translation complete!`);
  return result;
}

// Generate translation file
function generateFile(translations, langCode, outputPath) {
  const varName = langCode.replace(/-/g, '');
  const lines = [`export const ${varName} = {`];
  
  for (const [key, value] of Object.entries(translations)) {
    lines.push(`  '${key}': '${escapeString(value)}',`);
  }
  
  lines.push('};');
  
  fs.writeFileSync(outputPath, lines.join('\n') + '\n', 'utf-8');
  console.log(`💾 Saved: ${outputPath}`);
}

// Main
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node translate-tier2-batch.cjs <lang-code> [lang-code...]');
    console.log('Example: node translate-tier2-batch.cjs pt-BR it nl');
    process.exit(1);
  }
  
  const enPath = path.join(__dirname, '../client/src/translations/en.ts');
  const outputDir = path.join(__dirname, '../client/src/translations');
  
  console.log('🔍 Reading English translations...');
  const english = extractTranslations(enPath);
  console.log(`📊 Found ${Object.keys(english).length} keys\n`);
  
  for (const langCode of args) {
    const deeplLang = DEEPL_LANGUAGES[langCode];
    if (!deeplLang) {
      console.error(`❌ Unsupported: ${langCode}`);
      continue;
    }
    
    console.log(`\n🌐 Processing ${langCode}...`);
    
    try {
      const translated = await batchTranslate(english, deeplLang);
      const outputPath = path.join(outputDir, `${langCode}.ts`);
      generateFile(translated, langCode, outputPath);
      console.log(`✅ ${langCode} done!\n`);
    } catch (error) {
      console.error(`❌ Failed ${langCode}: ${error.message}`);
    }
  }
  
  console.log('\n🎉 All done!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
