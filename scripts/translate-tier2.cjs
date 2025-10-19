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

// DeepL supported languages for Tier 2-4
const DEEPL_SUPPORTED = {
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-PT',
  'it': 'it',
  'nl': 'nl',
  'ko': 'ko',
  'tr': 'tr',
  'pl': 'pl',
  'id': 'id',
  'sv': 'sv',
  'nb': 'nb', // Norwegian
  'da': 'da',
  'fi': 'fi',
  'cs': 'cs',
  'hu': 'hu',
  'ro': 'ro',
  'el': 'el',
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
  const comments = [];
  
  const lines = content.split('\n');
  for (const line of lines) {
    // Preserve comments
    if (line.trim().startsWith('//')) {
      comments.push(line);
    }
    
    // Match key-value pairs (handle multi-line strings)
    const match = line.match(/^\s*['"]([^'"]+)['"]\s*:\s*['"](.*)['"],?\s*$/);
    if (match) {
      let value = match[2];
      // Unescape quotes
      value = value.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n');
      translations[match[1]] = value;
    }
  }
  
  return { translations, comments };
}

// Escape for TypeScript
function escapeString(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// Preserve {{placeholders}}
function preservePlaceholders(text) {
  const placeholders = [];
  const preserved = text.replace(/\{\{([^}]+)\}\}/g, (match) => {
    const idx = placeholders.length;
    placeholders.push(match);
    return `__PH${idx}__`;
  });
  return { preserved, placeholders };
}

// Restore {{placeholders}}
function restorePlaceholders(text, placeholders) {
  return text.replace(/__PH(\d+)__/g, (match, idx) => {
    return placeholders[parseInt(idx)] || match;
  });
}

// Batch translate using DeepL Pro (50 texts per request)
async function translateBatch(texts, targetLang, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const results = await translator.translateText(
        texts,
        null,
        targetLang,
        { preserveFormatting: true, formality: 'default' }
      );
      
      return Array.isArray(results) ? results.map(r => r.text) : [results.text];
    } catch (error) {
      if (error.response?.status === 429 && attempt < retries) {
        // Rate limit - exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`   ⏳ Rate limit hit, waiting ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

// Translate all keys
async function translateAll(translations, targetLang) {
  const keys = Object.keys(translations);
  const result = {};
  
  console.log(`📝 Translating ${keys.length} keys to ${targetLang}...`);
  
  // Prepare batches
  const batchSize = 50;
  const batches = [];
  
  for (let i = 0; i < keys.length; i += batchSize) {
    const batchKeys = keys.slice(i, i + batchSize);
    const batchTexts = [];
    const batchData = [];
    
    for (const key of batchKeys) {
      const { preserved, placeholders } = preservePlaceholders(translations[key]);
      batchTexts.push(preserved);
      batchData.push({ key, placeholders });
    }
    
    batches.push({ texts: batchTexts, data: batchData });
  }
  
  // Process batches
  let processed = 0;
  for (let i = 0; i < batches.length; i++) {
    const { texts, data } = batches[i];
    
    try {
      const translated = await translateBatch(texts, targetLang);
      
      for (let j = 0; j < texts.length; j++) {
        const { key, placeholders } = data[j];
        result[key] = restorePlaceholders(translated[j], placeholders);
      }
      
      processed += texts.length;
      console.log(`   ✓ ${processed}/${keys.length} keys (batch ${i + 1}/${batches.length})`);
      
      // Delay between batches
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error(`   ❌ Batch ${i + 1} failed:`, error.message);
      // Fallback: use original text
      for (const { key } of data) {
        result[key] = translations[key];
      }
      processed += texts.length;
    }
  }
  
  return result;
}

// Generate file
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

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node translate-tier2.cjs <lang> [lang...]');
    console.log('Example: node translate-tier2.cjs pt-BR it nl ko');
    process.exit(1);
  }
  
  const enPath = path.join(__dirname, '../client/src/translations/en.ts');
  const outDir = path.join(__dirname, '../client/src/translations');
  
  console.log('🔍 Loading English translations...');
  const { translations } = extractTranslations(enPath);
  console.log(`📊 Found ${Object.keys(translations).length} keys\n`);
  
  for (const langCode of args) {
    const deeplCode = DEEPL_SUPPORTED[langCode];
    if (!deeplCode) {
      console.error(`❌ ${langCode} not supported by DeepL`);
      continue;
    }
    
    console.log(`🌐 Translating ${langCode}...`);
    const translated = await translateAll(translations, deeplCode);
    
    const outPath = path.join(outDir, `${langCode}.ts`);
    generateFile(translated, langCode, outPath);
    console.log(`✅ ${langCode} complete!\n`);
  }
  
  console.log('🎉 All done!');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
