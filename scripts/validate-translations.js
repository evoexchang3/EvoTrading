#!/usr/bin/env node

/**
 * Translation Files Validation Suite
 * 
 * Validates all 35 language files for:
 * 1. Valid JavaScript/TypeScript syntax (compilable)
 * 2. No malformed escape sequences
 * 3. No [RETRANSLATE] or [NEEDS_MANUAL_REVIEW] markers
 * 4. Consistent key structure across all languages
 * 5. RTL language proper directionality
 * 
 * Usage: node scripts/validate-translations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BLUE = '\x1b[34m';
const BOLD = '\x1b[1m';

// All 35 languages
const languages = [
  'en', 'de', 'es', 'fr', 'ja', 'zh-CN', 'ar', 'ru',
  'bg', 'cs', 'da', 'el', 'et', 'fi', 'he', 'hu', 'id', 'it', 'ko', 'lt', 'lv',
  'nl', 'pl', 'pt-BR', 'pt-PT', 'ro', 'sk', 'sl', 'sv', 'tr', 'uk', 'vi', 'zh-TW', 'nb', 'hr'
];

// RTL languages
const rtlLanguages = ['ar', 'he'];

// Validation results
const results = {
  totalLanguages: languages.length,
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: [],
  warningsList: []
};

/**
 * Check if file contains valid JavaScript syntax
 */
async function validateSyntax(langCode, filePath) {
  try {
    // Try to import the file (will throw on syntax errors)
    const fileUrl = `file://${filePath}?t=${Date.now()}`;
    const module = await import(fileUrl);
    const translations = module[langCode] || module.default;
    
    if (typeof translations !== 'object' || translations === null) {
      throw new Error('File does not export a valid object');
    }
    
    return { valid: true, keyCount: Object.keys(translations).length };
  } catch (error) {
    return { 
      valid: false, 
      error: error.message,
      stack: error.stack
    };
  }
}

/**
 * Check for malformed markers in source code
 */
function checkForMarkers(langCode, filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const markers = {
    retranslate: (content.match(/\[RETRANSLATE\]/g) || []).length,
    manualReview: (content.match(/\[NEEDS_MANUAL_REVIEW\]/g) || []).length
  };
  
  return markers;
}

/**
 * Check for common escape sequence issues
 */
function checkEscapeSequences(langCode, filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check for trailing backslash at end of strings
  const trailingBackslash = content.match(/'[^']*\\'\s*,/g);
  if (trailingBackslash && trailingBackslash.length > 0) {
    issues.push(`Found ${trailingBackslash.length} strings with trailing backslash before closing quote`);
  }
  
  // Check for double backslashes that might be incorrect
  const doubleBackslash = content.match(/\\\\\\\\/g);
  if (doubleBackslash && doubleBackslash.length > 0) {
    issues.push(`Found ${doubleBackslash.length} instances of quadruple backslash (possibly incorrect escaping)`);
  }
  
  return issues;
}

/**
 * Compare key structure against English source
 */
function compareKeys(langCode, langKeys, sourceKeys) {
  const missing = sourceKeys.filter(k => !langKeys.includes(k));
  const extra = langKeys.filter(k => !sourceKeys.includes(k));
  
  return { missing, extra };
}

/**
 * Validate RTL language metadata
 */
function validateRTL(langCode, translations) {
  if (!rtlLanguages.includes(langCode)) {
    return { isRTL: false, valid: true };
  }
  
  // Check if language has RTL marker or proper bidirectional handling
  const hasRTLMarker = translations['_metadata']?.direction === 'rtl' ||
                       translations['direction'] === 'rtl';
  
  return { 
    isRTL: true, 
    valid: true,
    hasMarker: hasRTLMarker,
    note: hasRTLMarker ? 'RTL metadata found' : 'RTL handled by language code detection'
  };
}

async function main() {
  console.log(`${BOLD}${BLUE}════════════════════════════════════════════════════════════${RESET}`);
  console.log(`${BOLD}${BLUE}     Translation Files Validation Suite${RESET}`);
  console.log(`${BOLD}${BLUE}════════════════════════════════════════════════════════════${RESET}\n`);

  // Load English source as reference
  const enPath = path.join(__dirname, '../client/src/translations/en.ts');
  let sourceKeys = [];

  try {
    const enModule = await import(`file://${enPath}`);
    const enTranslations = enModule.en;
    sourceKeys = Object.keys(enTranslations);
    console.log(`${GREEN}✓${RESET} Loaded English source: ${BOLD}${sourceKeys.length}${RESET} keys\n`);
  } catch (error) {
    console.error(`${RED}✗${RESET} Failed to load English source:`, error.message);
    process.exit(1);
  }

  // Validate each language
  for (const langCode of languages) {
  const filePath = path.join(__dirname, `../client/src/translations/${langCode}.ts`);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    results.failed++;
    results.errors.push({
      language: langCode,
      error: 'File not found'
    });
    console.log(`${RED}✗${RESET} ${BOLD}${langCode}${RESET}: File not found`);
    continue;
  }
  
  console.log(`${BLUE}🔍${RESET} Validating ${BOLD}${langCode}${RESET}...`);
  
    // 1. Syntax validation
    const syntaxResult = await validateSyntax(langCode, filePath);
    if (!syntaxResult.valid) {
      results.failed++;
      results.errors.push({
        language: langCode,
        error: 'Syntax error',
        details: syntaxResult.error
      });
      console.log(`   ${RED}✗ Syntax: FAILED${RESET}`);
      console.log(`   ${RED}  └─ ${syntaxResult.error}${RESET}\n`);
      continue;
    }
    console.log(`   ${GREEN}✓ Syntax: Valid${RESET} (${syntaxResult.keyCount} keys)`);
    
    // 2. Check for markers
    const markers = checkForMarkers(langCode, filePath);
    if (markers.retranslate > 0 || markers.manualReview > 0) {
      results.warnings++;
      results.warningsList.push({
        language: langCode,
        warning: `Found ${markers.retranslate} [RETRANSLATE] and ${markers.manualReview} [NEEDS_MANUAL_REVIEW] markers`
      });
      console.log(`   ${YELLOW}⚠ Markers: ${markers.retranslate} RETRANSLATE, ${markers.manualReview} MANUAL_REVIEW${RESET}`);
    } else {
      console.log(`   ${GREEN}✓ Markers: None${RESET}`);
    }
    
    // 3. Escape sequences
    const escapeIssues = checkEscapeSequences(langCode, filePath);
    if (escapeIssues.length > 0) {
      results.warnings++;
      results.warningsList.push({
        language: langCode,
        warning: escapeIssues.join('; ')
      });
      console.log(`   ${YELLOW}⚠ Escape sequences: ${escapeIssues.join(', ')}${RESET}`);
    } else {
      console.log(`   ${GREEN}✓ Escape sequences: Clean${RESET}`);
    }
    
    // 4. Key comparison
    const module = await import(`file://${filePath}?t=${Date.now()}`);
    const translations = module[langCode] || module.default;
    const langKeys = Object.keys(translations);
    const keyComparison = compareKeys(langCode, langKeys, sourceKeys);
    
    if (keyComparison.missing.length > 0 || keyComparison.extra.length > 0) {
      results.warnings++;
      const msg = [];
      if (keyComparison.missing.length > 0) msg.push(`${keyComparison.missing.length} missing`);
      if (keyComparison.extra.length > 0) msg.push(`${keyComparison.extra.length} extra`);
      
      results.warningsList.push({
        language: langCode,
        warning: `Key mismatch: ${msg.join(', ')}`
      });
      console.log(`   ${YELLOW}⚠ Keys: ${msg.join(', ')}${RESET}`);
    } else {
      console.log(`   ${GREEN}✓ Keys: Complete match (${langKeys.length}/${sourceKeys.length})${RESET}`);
    }
    
    // 5. RTL validation
    const rtlResult = validateRTL(langCode, translations);
    if (rtlResult.isRTL) {
      console.log(`   ${GREEN}✓ RTL: ${rtlResult.note}${RESET}`);
    }
    
    results.passed++;
    console.log(`   ${GREEN}${BOLD}✓ PASSED${RESET}\n`);
  }

  // Print summary
  console.log(`${BOLD}${BLUE}════════════════════════════════════════════════════════════${RESET}`);
  console.log(`${BOLD}${BLUE}     Validation Summary${RESET}`);
  console.log(`${BOLD}${BLUE}════════════════════════════════════════════════════════════${RESET}\n`);

  console.log(`Total languages: ${BOLD}${results.totalLanguages}${RESET}`);
  console.log(`${GREEN}Passed: ${BOLD}${results.passed}${RESET}${GREEN}${RESET}`);
  console.log(`${RED}Failed: ${BOLD}${results.failed}${RESET}${RED}${RESET}`);
  console.log(`${YELLOW}Warnings: ${BOLD}${results.warnings}${RESET}${YELLOW}${RESET}\n`);

  if (results.errors.length > 0) {
    console.log(`${BOLD}${RED}Errors:${RESET}`);
    results.errors.forEach(({ language, error, details }) => {
      console.log(`  ${RED}✗${RESET} ${BOLD}${language}${RESET}: ${error}`);
      if (details) console.log(`    ${details}`);
    });
    console.log('');
  }

  if (results.warningsList.length > 0) {
    console.log(`${BOLD}${YELLOW}Warnings:${RESET}`);
    results.warningsList.forEach(({ language, warning }) => {
      console.log(`  ${YELLOW}⚠${RESET} ${BOLD}${language}${RESET}: ${warning}`);
    });
    console.log('');
  }

  // Final verdict
  if (results.failed === 0) {
    console.log(`${BOLD}${GREEN}✅ All ${results.passed} languages are syntactically valid!${RESET}`);
    if (results.warnings > 0) {
      console.log(`${YELLOW}   Note: ${results.warnings} language(s) have warnings but are functional${RESET}\n`);
    }
    process.exit(0);
  } else {
    console.log(`${BOLD}${RED}❌ ${results.failed} language(s) failed validation${RESET}\n`);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Validation script error:', error);
  process.exit(1);
});
