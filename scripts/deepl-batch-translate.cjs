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

// Language mappings for DeepL
const LANG_CODES = {
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
  return text.replace(/__PH(\d+)__/g, (_, i) => placeholders[parseInt(i)] || '');
}

// Batch translate with DeepL
async function batchTranslate(texts, targetLang) {
  const BATCH_SIZE = 50;
  const results = [];
  
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    
    try {
      const translated = await translator.translateText(
        batch,
        null,
        targetLang,
        { preserveFormatting: true, formality: 'default' }
      );
      
      const batchResults = Array.isArray(translated) 
        ? translated.map(t => t.text)
        : [translated.text];
      
      results.push(...batchResults);
      
      if ((i + BATCH_SIZE) % 500 === 0 || i + BATCH_SIZE >= texts.length) {
        console.log(`   Progress: ${Math.min(i + BATCH_SIZE, texts.length)}/${texts.length}`);
      }
      
      // Small delay between batches
      if (i + BATCH_SIZE < texts.length) {
        await new Promise(r => setTimeout(r, 100));
      }
    } catch (error) {
      console.error(`Batch error at ${i}: ${error.message}`);
      // Fallback: translate individually
      for (const text of batch) {
        try {
          const single = await translator.translateText(text, null, targetLang);
          results.push(single.text);
        } catch (e) {
          results.push(text); // Keep original on error
        }
      }
    }
  }
  
  return results;
}

// Translate all keys
async function translateAll(translations, targetLang) {
  const keys = Object.keys(translations);
  console.log(`📝 Translating ${keys.length} keys to ${targetLang}...`);
  
  // Prepare texts with placeholder preservation
  const textsData = keys.map(key => ({
    key,
    ...preservePlaceholders(translations[key])
  }));
  
  // Translate all preserved texts
  const translatedTexts = await batchTranslate(
    textsData.map(d => d.preserved),
    targetLang
  );
  
  // Build result with restored placeholders
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    const { key, placeholders } = textsData[i];
    result[key] = restorePlaceholders(translatedTexts[i], placeholders);
  }
  
  console.log(`✅ Complete: ${keys.length} keys translated`);
  return result;
}

// Generate TypeScript file
function generateFile(translations, langCode, outputPath) {
  const varName = langCode.replace(/-/g, '');
  const lines = [`export const ${varName} = {`];
  
  for (const [key, value] of Object.entries(translations)) {
    const escaped = value.replace(/'/g, "\\'").replace(/\n/g, '\\n');
    lines.push(`  '${key}': '${escaped}',`);
  }
  
  lines.push('};', '');
  
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`💾 Saved: ${outputPath}\n`);
}

// Main
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node deepl-batch-translate.cjs <lang> [lang...]');
    console.log('Example: node deepl-batch-translate.cjs pt-BR it nl ko');
    process.exit(1);
  }
  
  const enPath = path.join(__dirname, '../client/src/translations/en.ts');
  const outDir = path.join(__dirname, '../client/src/translations');
  
  console.log('🔍 Loading English translations...');
  const english = extractTranslations(enPath);
  console.log(`📊 Found ${Object.keys(english).length} keys\n`);
  
  for (const langCode of args) {
    const targetLang = LANG_CODES[langCode];
    if (!targetLang) {
      console.error(`❌ Unsupported: ${langCode}`);
      continue;
    }
    
    console.log(`\n🌐 Processing ${langCode}...`);
    
    try {
      const translated = await translateAll(english, targetLang);
      const outputPath = path.join(outDir, `${langCode}.ts`);
      generateFile(translated, langCode, outputPath);
    } catch (error) {
      console.error(`❌ Failed ${langCode}: ${error.message}`);
    }
  }
  
  console.log('\n🎉 All translations complete!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
