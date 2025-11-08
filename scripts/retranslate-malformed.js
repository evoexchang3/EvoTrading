#!/usr/bin/env node

/**
 * Retranslate Malformed Keys Script
 * 
 * Phase 2: Properly retranslates all [RETRANSLATE] marked keys
 * Features:
 * - Small batch sizes (12 keys per request) to prevent truncation
 * - Validation for trailing backslashes and incomplete strings
 * - Retry logic with exponential backoff
 * - Progress tracking per language
 * - Cost estimation
 */

import * as deepl from 'deepl-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const BATCH_SIZE = 12; // SMALL batches to prevent truncation
const MAX_CONCURRENT = 2; // Process 2 batches in parallel
const RETRY_DELAY_BASE = 2000;
const MAX_RETRIES = 3;
const COST_PER_MILLION_CHARS = 25;

const translationsDir = path.join(__dirname, '..', 'client', 'src', 'translations');
const progressFile = path.join(__dirname, 'retranslation-progress.json');

// Language code mapping (i18n code -> DeepL API code)
const LANGUAGE_MAP = {
  'zh-CN': 'ZH', 'ja': 'JA', 'de': 'DE', 'fr': 'FR', 'es': 'ES', 
  'ar': 'AR', 'ru': 'RU', 'it': 'IT', 'nl': 'NL', 'pl': 'PL',
  'pt-BR': 'PT-BR', 'pt-PT': 'PT-PT', 'ko': 'KO', 'tr': 'TR',
  'he': 'HE', 'vi': 'VI', 'zh-TW': 'ZH-HANT', 'en-GB': 'EN-GB',
  'sv': 'SV', 'da': 'DA', 'fi': 'FI', 'nb': 'NB', 'cs': 'CS',
  'ro': 'RO', 'hu': 'HU', 'el': 'EL', 'bg': 'BG', 'uk': 'UK',
  'id': 'ID', 'et': 'ET', 'lt': 'LT', 'lv': 'LV', 'sk': 'SK', 'sl': 'SL'
};

const translator = new deepl.Translator(DEEPL_API_KEY);

/**
 * Extract keys needing retranslation
 */
function extractRetranslateKeys(content) {
  const keys = [];
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Pattern 1: '[RETRANSLATE]' as standalone value
    if (line.includes("'[RETRANSLATE]'")) {
      const match = line.match(/['"]([^'"]+)['"]\s*:\s*\['RETRANSLATE'\]/);
      if (match) {
        keys.push(match[1]);
        continue;
      }
    }
    
    // Pattern 2: Concatenated with partial translation
    // Example: 'text...' + '[RETRANSLATE]',
    const concatMatch = line.match(/['"]([^'"]+)['"]\s*:\s*['"]([^'"]*)['"]\s*\+\s*\['RETRANSLATE'\]/);
    if (concatMatch) {
      keys.push(concatMatch[1]);
      continue;
    }
    
    // Pattern 3: Just contains [RETRANSLATE] anywhere
    if (line.includes('[RETRANSLATE]')) {
      const genericMatch = line.match(/['"]([^'"]+)['"]\s*:/);
      if (genericMatch) {
        keys.push(genericMatch[1]);
      }
    }
  }
  
  return [...new Set(keys)]; // Remove duplicates
}

/**
 * Get English source text for a key
 */
function getEnglishValue(key) {
  const enFile = path.join(translationsDir, 'en.ts');
  const content = fs.readFileSync(enFile, 'utf-8');
  
  // Match the key and extract its value
  const regex = new RegExp(`['"]${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\s*:\\s*['"]((?:[^'"]|\\\\['"])*)['"]+`, 'g');
  const match = regex.exec(content);
  
  if (match && match[1]) {
    // Unescape the value
    return match[1]
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');
  }
  
  console.warn(`⚠️  Could not find English value for key: ${key}`);
  return null;
}

/**
 * Validate translation response
 */
function validateTranslation(text) {
  // Check for trailing backslash patterns
  if (text.match(/\\['"]?$/)) {
    return {
      valid: false,
      reason: 'Trailing backslash detected'
    };
  }
  
  // Check for odd number of quotes (unclosed string)
  const singleQuotes = (text.match(/'/g) || []).length;
  const doubleQuotes = (text.match(/"/g) || []).length;
  
  // If there are quotes, ensure they're properly escaped or paired
  if ((singleQuotes % 2 !== 0 && !text.includes("\\'")) ||
      (doubleQuotes % 2 !== 0 && !text.includes('\\"'))) {
    return {
      valid: false,
      reason: 'Unbalanced quotes'
    };
  }
  
  return { valid: true };
}

/**
 * Translate a batch of texts with retry
 */
async function translateBatch(texts, targetLang, retryCount = 0) {
  try {
    const results = await translator.translateText(
      texts,
      'en',
      targetLang,
      { formality: 'default' }
    );
    
    const translations = Array.isArray(results) ? results : [results];
    const validated = [];
    
    for (let i = 0; i < translations.length; i++) {
      const text = translations[i].text;
      const validation = validateTranslation(text);
      
      if (!validation.valid) {
        console.warn(`⚠️  Invalid translation detected: ${validation.reason}`);
        console.warn(`   Original: ${texts[i].substring(0, 50)}...`);
        console.warn(`   Translation: ${text.substring(0, 50)}...`);
        // Use original English text as fallback
        validated.push(texts[i] + ' [NEEDS_MANUAL_REVIEW]');
      } else {
        validated.push(text);
      }
    }
    
    return validated;
  } catch (error) {
    if (error.code === 429 && retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY_BASE * Math.pow(2, retryCount);
      console.log(`   Rate limited. Retry ${retryCount + 1}/${MAX_RETRIES} in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return translateBatch(texts, targetLang, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Process chunks in batches with concurrency control
 */
async function processBatches(chunks, targetLang) {
  const results = [];
  
  for (let i = 0; i < chunks.length; i += MAX_CONCURRENT) {
    const batch = chunks.slice(i, i + MAX_CONCURRENT);
    const batchPromises = batch.map(chunk => translateBatch(chunk, targetLang));
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    console.log(`   Processed ${Math.min(i + MAX_CONCURRENT, chunks.length)}/${chunks.length} batches`);
  }
  
  return results.flat();
}

/**
 * Update language file with new translations
 */
function updateLanguageFile(langCode, keyValues) {
  const filePath = path.join(translationsDir, `${langCode}.ts`);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let updateCount = 0;
  
  for (const [key, value] of Object.entries(keyValues)) {
    // Escape special characters in the value
    const escapedValue = value
      .replace(/\\/g, '\\\\')  // Escape backslashes first
      .replace(/'/g, "\\'")     // Escape single quotes
      .replace(/\n/g, '\\n')    // Escape newlines
      .replace(/\t/g, '\\t');   // Escape tabs
    
    // Find and replace the key's value
    // This regex handles all [RETRANSLATE] patterns
    const keyRegex = new RegExp(
      `(['"]${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\s*:\\s*)(?:'[^']*'\\s*\\+\\s*)?\\['RETRANSLATE'\\]`,
      'g'
    );
    
    const replacement = `$1'${escapedValue}'`;
    const newContent = content.replace(keyRegex, replacement);
    
    if (newContent !== content) {
      content = newContent;
      updateCount++;
    }
  }
  
  fs.writeFileSync(filePath, content);
  return updateCount;
}

/**
 * Retranslate a single language
 */
async function retranslateLanguage(langCode) {
  const filePath = path.join(translationsDir, `${langCode}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${langCode} - file not found`);
    return { success: false, reason: 'file_not_found' };
  }
  
  console.log(`\n🔄 Processing ${langCode}...`);
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const keysNeedingTranslation = extractRetranslateKeys(content);
  
  if (keysNeedingTranslation.length === 0) {
    console.log(`✓  No keys need retranslation in ${langCode}`);
    return { success: true, keysProcessed: 0 };
  }
  
  console.log(`   Found ${keysNeedingTranslation.length} keys needing retranslation`);
  
  // Get English source values
  const sourceTexts = [];
  const validKeys = [];
  
  for (const key of keysNeedingTranslation) {
    const value = getEnglishValue(key);
    if (value) {
      sourceTexts.push(value);
      validKeys.push(key);
    }
  }
  
  if (sourceTexts.length === 0) {
    console.log(`⚠️  No valid source texts found for ${langCode}`);
    return { success: false, reason: 'no_source_texts' };
  }
  
  // Calculate cost
  const totalChars = sourceTexts.reduce((sum, text) => sum + text.length, 0);
  const estimatedCost = (totalChars / 1000000) * COST_PER_MILLION_CHARS;
  console.log(`   Characters to translate: ${totalChars.toLocaleString()}`);
  console.log(`   Estimated cost: $${estimatedCost.toFixed(2)}`);
  
  // Split into chunks
  const chunks = [];
  for (let i = 0; i < sourceTexts.length; i += BATCH_SIZE) {
    chunks.push(sourceTexts.slice(i, i + BATCH_SIZE));
  }
  
  console.log(`   Processing ${chunks.length} batches (${BATCH_SIZE} keys per batch)...`);
  
  // Translate
  const targetLang = LANGUAGE_MAP[langCode];
  const translations = await processBatches(chunks, targetLang);
  
  // Create key-value pairs
  const keyValues = {};
  for (let i = 0; i < validKeys.length; i++) {
    keyValues[validKeys[i]] = translations[i];
  }
  
  // Update file
  const updateCount = updateLanguageFile(langCode, keyValues);
  
  console.log(`✅ Updated ${updateCount} keys in ${langCode}.ts`);
  
  return {
    success: true,
    keysProcessed: updateCount,
    cost: estimatedCost
  };
}

/**
 * Main execution
 */
async function main() {
  console.log('🔄 RETRANSLATION - Phase 2');
  console.log('='.repeat(60));
  console.log('Fixing malformed translations with improved batching');
  console.log('');
  
  if (!DEEPL_API_KEY) {
    console.error('❌ DEEPL_API_KEY not found in environment');
    process.exit(1);
  }
  
  const languagesToProcess = Object.keys(LANGUAGE_MAP).filter(lang => lang !== 'en');
  
  console.log(`Languages to process: ${languagesToProcess.length}`);
  console.log('');
  
  const results = [];
  let totalCost = 0;
  let totalKeys = 0;
  
  for (const lang of languagesToProcess) {
    try {
      const result = await retranslateLanguage(lang);
      results.push({ lang, ...result });
      
      if (result.success && result.cost) {
        totalCost += result.cost;
        totalKeys += result.keysProcessed || 0;
      }
      
      // Small delay between languages
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Error processing ${lang}:`, error.message);
      results.push({ lang, success: false, error: error.message });
    }
  }
  
  console.log('');
  console.log('='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total languages processed: ${results.filter(r => r.success).length}/${languagesToProcess.length}`);
  console.log(`Total keys retranslated: ${totalKeys}`);
  console.log(`Total cost: $${totalCost.toFixed(2)}`);
  console.log('');
  
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log('⚠️  Failed languages:');
    failed.forEach(f => console.log(`   - ${f.lang}: ${f.reason || f.error}`));
  }
  
  // Save results
  const resultsPath = path.join(__dirname, 'retranslation-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`Results saved to: ${resultsPath}`);
}

main().catch(console.error);
