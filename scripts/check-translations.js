#!/usr/bin/env node

/**
 * Translation Key Validation Script
 * 
 * Validates that all translation keys from en.ts exist in all language files
 * Generates missing key manifests for each language
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationsDir = path.join(__dirname, '..', 'client', 'src', 'translations');
const languages = ['zh-CN', 'ja', 'de', 'fr', 'es', 'ar', 'ru'];

// Extract keys from a translation file
function extractKeys(content) {
  const keys = [];
  const keyRegex = /['"]([^'"]+)['"]\s*:/g;
  let match;
  
  while ((match = keyRegex.exec(content)) !== null) {
    const key = match[1];
    // Skip TypeScript/object-related keys
    if (!key.includes('Record') && !key.includes('string') && key.includes('.')) {
      keys.push(key);
    }
  }
  
  return [...new Set(keys)].sort();
}

// Main validation
console.log('🔍 Checking translation completeness...\n');

// Read English (master) keys
const enContent = fs.readFileSync(path.join(translationsDir, 'en.ts'), 'utf8');
const enKeys = extractKeys(enContent);
console.log(`📄 English (en.ts): ${enKeys.length} keys\n`);

const results = {};

// Check each language
languages.forEach(lang => {
  const langFile = path.join(translationsDir, `${lang}.ts`);
  
  if (!fs.existsSync(langFile)) {
    console.log(`❌ ${lang}.ts not found\n`);
    results[lang] = { missing: enKeys, coverage: 0 };
    return;
  }
  
  const langContent = fs.readFileSync(langFile, 'utf8');
  const langKeys = extractKeys(langContent);
  const missingKeys = enKeys.filter(key => !langKeys.includes(key));
  const coverage = ((langKeys.length / enKeys.length) * 100).toFixed(1);
  
  results[lang] = {
    existing: langKeys.length,
    missing: missingKeys,
    coverage: parseFloat(coverage)
  };
  
  console.log(`📄 ${lang}.ts:`);
  console.log(`   ✅ Existing: ${langKeys.length} keys`);
  console.log(`   ❌ Missing: ${missingKeys.length} keys`);
  console.log(`   📊 Coverage: ${coverage}%\n`);
});

// Generate missing key manifests
console.log('\n📝 Generating missing key manifests...\n');

languages.forEach(lang => {
  const result = results[lang];
  if (!result || result.missing.length === 0) {
    console.log(`✅ ${lang}: Complete (no missing keys)`);
    return;
  }
  
  // Group missing keys by section
  const sections = {};
  result.missing.forEach(key => {
    const section = key.split('.')[0];
    if (!sections[section]) sections[section] = [];
    sections[section].push(key);
  });
  
  // Create manifest
  const manifestPath = path.join(__dirname, `missing-keys-${lang}.txt`);
  let manifest = `Missing Translation Keys for ${lang}\n`;
  manifest += `${'='.repeat(50)}\n\n`;
  manifest += `Total Missing: ${result.missing.length} keys\n`;
  manifest += `Coverage: ${result.coverage}%\n\n`;
  
  Object.entries(sections).sort().forEach(([section, keys]) => {
    manifest += `\n${section.toUpperCase()} (${keys.length} keys)\n`;
    manifest += `${'-'.repeat(50)}\n`;
    keys.forEach(key => manifest += `  ${key}\n`);
  });
  
  fs.writeFileSync(manifestPath, manifest);
  console.log(`   Created: ${manifestPath} (${result.missing.length} keys)`);
});

console.log('\n✅ Validation complete!\n');

// Exit with error if any language is incomplete
const incomplete = Object.values(results).some(r => r.missing && r.missing.length > 0);
process.exit(incomplete ? 1 : 0);
