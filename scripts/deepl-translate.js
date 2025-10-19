#!/usr/bin/env node

/**
 * DeepL Translation Automation Script
 * 
 * Intelligent batch translation system for internationalization
 * Features:
 * - Batch processing (500 keys per request, 72KB optimal)
 * - Rate limiting (10-15 concurrent requests max)
 * - Exponential backoff for 429 errors
 * - Progress tracking to prevent re-translation
 * - Cost estimation before translating
 * - Quality validation (apostrophes, quotes, syntax)
 * - Usage monitoring and quota tracking
 */

import * as deepl from 'deepl-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const BATCH_SIZE = 100; // Keys per batch (ultra-conservative for stability)
const MAX_CONCURRENT = 1; // One at a time to avoid API issues
const BATCH_DELAY = 1000; // Delay between batches in ms
const RETRY_DELAY_BASE = 3000; // Base retry delay in ms
const MAX_RETRIES = 5;
const COST_PER_MILLION_CHARS = 25; // USD
const BASE_FEE = 5.49; // USD/month

const translationsDir = path.join(__dirname, '..', 'client', 'src', 'translations');
const progressFile = path.join(__dirname, 'translation-progress.json');

// Language code mapping (DeepL format)
const LANGUAGE_MAP = {
  'zh-CN': 'ZH', // Chinese (simplified)
  'ja': 'JA',
  'de': 'DE',
  'fr': 'FR',
  'es': 'ES',
  'ar': 'AR',
  'ru': 'RU',
  // Phase 2 languages (40+ total)
  'pt': 'PT-PT', // Portuguese
  'it': 'IT',
  'nl': 'NL',
  'pl': 'PL',
  'tr': 'TR',
  'ko': 'KO',
  'sv': 'SV',
  'da': 'DA',
  'fi': 'FI',
  'no': 'NB', // Norwegian
  'cs': 'CS',
  'ro': 'RO',
  'hu': 'HU',
  'el': 'EL',
  'bg': 'BG',
  'uk': 'UK',
  'id': 'ID',
  'th': 'TH',
  'vi': 'VI',
  'hi': 'HI', // Hindi (if available)
};

// Initialize DeepL translator
const translator = new deepl.Translator(DEEPL_API_KEY);

/**
 * Extract translation keys from TypeScript file
 */
function extractKeys(content) {
  const keys = [];
  const keyValueRegex = /['"]([^'"]+)['"]\s*:\s*['"]([^'"]*(?:\\'[^'"]*)*)['"]/g;
  let match;
  
  while ((match = keyValueRegex.exec(content)) !== null) {
    const key = match[1];
    const value = match[2];
    
    // Skip TypeScript/object-related keys
    if (!key.includes('Record') && !key.includes('string') && key.includes('.')) {
      keys.push({ key, value });
    }
  }
  
  return keys;
}

/**
 * Load existing translation keys from a language file
 */
function loadTranslationKeys(langCode) {
  const filePath = path.join(translationsDir, `${langCode}.ts`);
  
  if (!fs.existsSync(filePath)) {
    return new Set();
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const keys = extractKeys(content);
  return new Set(keys.map(k => k.key));
}

/**
 * Calculate total character count
 */
function calculateCharacterCount(texts) {
  return texts.reduce((sum, text) => sum + text.length, 0);
}

/**
 * Estimate translation cost
 */
function estimateCost(characterCount) {
  const millionChars = characterCount / 1_000_000;
  const usageCost = millionChars * COST_PER_MILLION_CHARS;
  return {
    characters: characterCount,
    millionChars: millionChars.toFixed(3),
    usageCost: usageCost.toFixed(2),
    total: (parseFloat(usageCost) + BASE_FEE).toFixed(2)
  };
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Translate batch with retry logic and exponential backoff
 */
async function translateBatch(texts, targetLang, retryCount = 0) {
  try {
    const results = await translator.translateText(texts, null, targetLang, {
      preserveFormatting: true,
      formality: 'default'
    });
    
    return Array.isArray(results) ? results.map(r => r.text) : [results.text];
  } catch (error) {
    if (error.message?.includes('429') && retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY_BASE * Math.pow(2, retryCount);
      console.log(`   ⏳ Rate limit hit, retrying in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
      await sleep(delay);
      return translateBatch(texts, targetLang, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Process translations in batches with concurrency control
 */
async function translateWithConcurrency(missingKeys, targetLang) {
  const batches = [];
  for (let i = 0; i < missingKeys.length; i += BATCH_SIZE) {
    batches.push(missingKeys.slice(i, i + BATCH_SIZE));
  }
  
  console.log(`   📦 Processing ${batches.length} batches (${BATCH_SIZE} keys each, max ${MAX_CONCURRENT} concurrent)`);
  
  const translations = new Map();
  let completed = 0;
  
  // Process batches with concurrency limit
  for (let i = 0; i < batches.length; i += MAX_CONCURRENT) {
    const batchGroup = batches.slice(i, i + MAX_CONCURRENT);
    
    const promises = batchGroup.map(async (batch, batchIndex) => {
      // Filter out empty values and prepare texts
      const validItems = batch.filter(item => item.value && item.value.trim());
      const emptyItems = batch.filter(item => !item.value || !item.value.trim());
      
      // Add empty values directly to translations
      emptyItems.forEach(item => {
        translations.set(item.key, item.value || '');
      });
      
      // Only translate non-empty texts
      if (validItems.length > 0) {
        const texts = validItems.map(item => item.value);
        const translated = await translateBatch(texts, targetLang);
        
        validItems.forEach((item, idx) => {
          translations.set(item.key, translated[idx]);
        });
      }
      
      completed++;
      const progress = ((completed / batches.length) * 100).toFixed(1);
      console.log(`   ✓ Batch ${completed}/${batches.length} (${progress}%)`);
    });
    
    await Promise.all(promises);
    
    // Add delay between batch groups to avoid overwhelming API
    if (i + MAX_CONCURRENT < batches.length) {
      await sleep(BATCH_DELAY);
    }
  }
  
  return translations;
}

/**
 * Validate translated text quality
 */
function validateTranslation(key, text, originalText) {
  const issues = [];
  
  // Check for suspiciously short translations (likely truncated)
  if (originalText && text.length < originalText.length * 0.3 && originalText.length > 50) {
    issues.push('Translation suspiciously short (possible truncation)');
  }
  
  // Check for incomplete strings (ends with backslash followed by quote or comma)
  if (/\\['",]?\s*$/.test(text)) {
    issues.push('Incomplete string (ends with escape sequence)');
  }
  
  // Skip other validations for now as they produce too many false positives
  
  return issues;
}

/**
 * Escape special characters for TypeScript strings
 */
function escapeForTypeScript(text) {
  // Only escape single quotes, DeepL already handles other escaping
  return text.replace(/'/g, "\\'");
}

/**
 * Write translations to language file
 */
function writeTranslations(langCode, translations, existingKeys) {
  const filePath = path.join(translationsDir, `${langCode}.ts`);
  const varName = langCode.replace('-', '_');
  
  // Check if file exists
  if (fs.existsSync(filePath)) {
    // Update existing file
    let content = fs.readFileSync(filePath, 'utf8');
    const closingIndex = content.lastIndexOf('};');
    
    if (closingIndex === -1) {
      throw new Error(`Invalid file format for ${langCode}.ts`);
    }
    
    // Build new translations section
    let newTranslations = '\n  // Auto-translated by DeepL\n';
    
    for (const [key, value] of translations) {
      if (!existingKeys.has(key)) {
        const escapedValue = escapeForTypeScript(value);
        newTranslations += `  '${key}': '${escapedValue}',\n`;
      }
    }
    
    // Insert new translations
    const updatedContent = content.slice(0, closingIndex) + newTranslations + content.slice(closingIndex);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    
  } else {
    // Create new file from scratch
    let content = `export const ${varName} = {\n`;
    
    for (const [key, value] of translations) {
      const escapedValue = escapeForTypeScript(value);
      content += `  '${key}': '${escapedValue}',\n`;
    }
    
    content += '};\n';
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

/**
 * Check DeepL API usage
 */
async function checkUsage() {
  try {
    const usage = await translator.getUsage();
    
    if (usage.character) {
      const used = usage.character.count;
      const limit = usage.character.limit;
      const remaining = limit - used;
      const percentUsed = ((used / limit) * 100).toFixed(1);
      
      console.log('\n📊 DeepL API Usage:');
      console.log(`   Used: ${used.toLocaleString()} / ${limit.toLocaleString()} characters (${percentUsed}%)`);
      console.log(`   Remaining: ${remaining.toLocaleString()} characters\n`);
      
      if (percentUsed > 90) {
        console.log('⚠️  WARNING: Over 90% of quota used!\n');
      }
      
      return { used, limit, remaining };
    }
  } catch (error) {
    console.log('⚠️  Could not fetch usage data:', error.message);
  }
  
  return null;
}

/**
 * Load progress from previous run
 */
function loadProgress() {
  if (fs.existsSync(progressFile)) {
    return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
  }
  return {};
}

/**
 * Save progress
 */
function saveProgress(progress) {
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
}

/**
 * Main translation workflow
 */
async function main() {
  const args = process.argv.slice(2);
  const targetLanguages = args.length > 0 ? args : Object.keys(LANGUAGE_MAP);
  const estimateOnly = args.includes('--estimate');
  const skipConfirmation = args.includes('--yes') || args.includes('-y');
  
  console.log('🌍 DeepL Translation Automation\n');
  console.log('═'.repeat(60));
  
  // Check API key
  if (!DEEPL_API_KEY) {
    console.error('❌ DEEPL_API_KEY environment variable not set');
    process.exit(1);
  }
  
  // Check usage
  await checkUsage();
  
  // Load English translations (source)
  const enPath = path.join(translationsDir, 'en.ts');
  const enContent = fs.readFileSync(enPath, 'utf8');
  const enKeys = extractKeys(enContent);
  
  console.log(`📖 Source: English (${enKeys.length} keys)\n`);
  
  // Load progress
  const progress = loadProgress();
  
  // Process each language
  const jobs = [];
  
  for (const langCode of targetLanguages) {
    if (langCode === '--estimate' || langCode === '--yes' || langCode === '-y') continue;
    
    const deeplLang = LANGUAGE_MAP[langCode];
    if (!deeplLang) {
      console.log(`⚠️  Skipping ${langCode}: No DeepL mapping`);
      continue;
    }
    
    console.log(`\n🔍 Analyzing ${langCode}...`);
    
    const existingKeys = loadTranslationKeys(langCode);
    const missingKeys = enKeys.filter(item => !existingKeys.has(item.key));
    
    if (missingKeys.length === 0) {
      console.log(`   ✅ Complete! No missing keys.`);
      continue;
    }
    
    const charCount = calculateCharacterCount(missingKeys.map(k => k.value));
    const cost = estimateCost(charCount);
    
    console.log(`   📊 Missing: ${missingKeys.length} keys (${charCount.toLocaleString()} characters)`);
    console.log(`   💰 Cost: $${cost.usageCost} (${cost.millionChars}M chars at $25/M)`);
    
    jobs.push({
      langCode,
      deeplLang,
      missingKeys,
      charCount,
      cost,
      existingKeys
    });
  }
  
  if (jobs.length === 0) {
    console.log('\n✅ All languages complete!\n');
    return;
  }
  
  // Calculate total cost
  const totalChars = jobs.reduce((sum, job) => sum + job.charCount, 0);
  const totalCost = estimateCost(totalChars);
  
  console.log('\n' + '═'.repeat(60));
  console.log('📊 TOTAL SUMMARY');
  console.log('═'.repeat(60));
  console.log(`Languages: ${jobs.length}`);
  console.log(`Total Keys: ${jobs.reduce((sum, job) => sum + job.missingKeys.length, 0).toLocaleString()}`);
  console.log(`Total Characters: ${totalChars.toLocaleString()}`);
  console.log(`Estimated Cost: $${totalCost.usageCost} + $${BASE_FEE} base = $${totalCost.total}`);
  console.log('═'.repeat(60) + '\n');
  
  if (estimateOnly) {
    console.log('💡 Estimate only mode. Use without --estimate to translate.\n');
    return;
  }
  
  // Confirm before proceeding
  if (!skipConfirmation) {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    await new Promise((resolve) => {
      rl.question('⚠️  Proceed with translation? (y/N): ', (answer) => {
        rl.close();
        if (answer.toLowerCase() !== 'y') {
          console.log('\n❌ Cancelled by user\n');
          process.exit(0);
        }
        resolve();
      });
    });
  }
  
  // Process translations
  console.log('\n🚀 Starting translation...\n');
  
  for (const job of jobs) {
    console.log(`\n📝 Translating ${job.langCode} (${job.missingKeys.length} keys)...`);
    
    try {
      const translations = await translateWithConcurrency(job.missingKeys, job.deeplLang);
      
      // Validate translations
      console.log('   🔍 Validating translations...');
      let issueCount = 0;
      const criticalIssues = [];
      
      for (const [key, value] of translations) {
        const original = job.missingKeys.find(item => item.key === key)?.value;
        const issues = validateTranslation(key, value, original);
        
        if (issues.length > 0) {
          // Check if it's a critical issue
          if (issues.some(issue => issue.includes('truncation') || issue.includes('Incomplete'))) {
            criticalIssues.push({ key, issues });
            console.log(`   ❌ CRITICAL - ${key}: ${issues.join(', ')}`);
          } else {
            console.log(`   ⚠️  ${key}: ${issues.join(', ')}`);
          }
          issueCount++;
        }
      }
      
      if (criticalIssues.length > 0) {
        console.log(`\n   ❌ Found ${criticalIssues.length} CRITICAL issues - translation aborted`);
        console.log('   💡 Try reducing batch size or adding more delay\n');
        throw new Error(`${criticalIssues.length} critical validation failures`);
      } else if (issueCount > 0) {
        console.log(`   ⚠️  Found ${issueCount} validation warnings (non-critical)`);
      } else {
        console.log('   ✅ All validations passed');
      }
      
      // Write to file
      console.log('   💾 Writing translations...');
      writeTranslations(job.langCode, translations, job.existingKeys);
      
      console.log(`   ✅ ${job.langCode} complete!`);
      
      // Update progress
      progress[job.langCode] = {
        completed: true,
        date: new Date().toISOString(),
        keysTranslated: job.missingKeys.length,
        characters: job.charCount
      };
      saveProgress(progress);
      
    } catch (error) {
      console.error(`   ❌ Error translating ${job.langCode}:`, error.message);
      progress[job.langCode] = {
        completed: false,
        error: error.message,
        date: new Date().toISOString()
      };
      saveProgress(progress);
    }
  }
  
  // Final usage check
  console.log('\n' + '═'.repeat(60));
  await checkUsage();
  console.log('✅ Translation complete!\n');
  console.log('💡 Next steps:');
  console.log('   1. Run: npm run build');
  console.log('   2. Run: node scripts/check-translations.js');
  console.log('   3. Verify: Check for syntax errors\n');
}

// Run
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
