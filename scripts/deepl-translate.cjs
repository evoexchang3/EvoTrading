#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const deepl = require('deepl-node');

const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

// DeepL supported languages
const LANG_CODES = {
  'pt-BR': 'pt-BR', 'pt-PT': 'pt-PT', 'it': 'it', 'nl': 'nl', 'ko': 'ko',
  'tr': 'tr', 'pl': 'pl', 'id': 'id', 'sv': 'sv', 'nb': 'nb', 'da': 'da',
  'fi': 'fi', 'cs': 'cs', 'hu': 'hu', 'ro': 'ro', 'el': 'el', 'uk': 'uk',
  'bg': 'bg', 'sk': 'sk', 'lt': 'lt', 'lv': 'lv',
};

function extractTranslations(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const translations = {};
  const regex = /['"]([^'"]+)['"]\s*:\s*['"](.+?)['"]\s*,/gs;
  let match;
  while ((match = regex.exec(content)) !== null) {
    translations[match[1]] = match[2].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }
  return translations;
}

function preservePlaceholders(text) {
  const placeholders = [];
  const preserved = text.replace(/\{\{([^}]+)\}\}/g, (m) => {
    placeholders.push(m);
    return `__PH${placeholders.length - 1}__`;
  });
  return { preserved, placeholders };
}

function restorePlaceholders(text, placeholders) {
  return text.replace(/__PH(\d+)__/g, (_, i) => placeholders[parseInt(i)] || '');
}

async function translateBatch(texts, targetLang) {
  const results = await translator.translateText(texts, null, targetLang, {
    preserveFormatting: true,
    formality: 'default',
  });
  return Array.isArray(results) ? results.map(r => r.text) : [results.text];
}

async function translateAll(translations, targetLang) {
  const keys = Object.keys(translations);
  const result = {};
  const batchSize = 50;
  
  console.log(`Translating ${keys.length} keys to ${targetLang}...`);
  
  const allTexts = [];
  const allData = [];
  
  for (const key of keys) {
    const { preserved, placeholders } = preservePlaceholders(translations[key]);
    allTexts.push(preserved);
    allData.push({ key, placeholders });
  }
  
  for (let i = 0; i < allTexts.length; i += batchSize) {
    const batchTexts = allTexts.slice(i, i + batchSize);
    const batchData = allData.slice(i, i + batchSize);
    
    try {
      const translated = await translateBatch(batchTexts, targetLang);
      for (let j = 0; j < translated.length; j++) {
        const { key, placeholders } = batchData[j];
        result[key] = restorePlaceholders(translated[j], placeholders);
      }
      console.log(`  ${Math.min(i + batchSize, keys.length)}/${keys.length}`);
      await new Promise(r => setTimeout(r, 200));
    } catch (error) {
      console.error(`Batch error: ${error.message}`);
      for (let j = 0; j < batchTexts.length; j++) {
        result[batchData[j].key] = translations[batchData[j].key];
      }
    }
  }
  
  return result;
}

function generateFile(translations, langCode, outputPath) {
  const varName = langCode.replace(/-/g, '');
  const lines = [`export const ${varName} = {`];
  for (const [key, value] of Object.entries(translations)) {
    const escaped = value.replace(/'/g, "\\'").replace(/\n/g, '\\n');
    lines.push(`  '${key}': '${escaped}',`);
  }
  lines.push('};', '');
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`Saved: ${langCode}.ts`);
}

async function main() {
  const args = process.argv.slice(2);
  const enPath = path.join(__dirname, '../client/src/translations/en.ts');
  const outputDir = path.join(__dirname, '../client/src/translations');
  
  const englishTranslations = extractTranslations(enPath);
  console.log(`Found ${Object.keys(englishTranslations).length} keys\n`);
  
  for (const langCode of args) {
    const deeplLang = LANG_CODES[langCode];
    if (!deeplLang) {
      console.error(`Unsupported: ${langCode}`);
      continue;
    }
    
    console.log(`\nProcessing ${langCode}...`);
    const translated = await translateAll(englishTranslations, deeplLang);
    generateFile(translated, langCode, path.join(outputDir, `${langCode}.ts`));
    console.log(`✅ ${langCode} complete\n`);
  }
  
  console.log('🎉 All done!');
}

main().catch(console.error);
