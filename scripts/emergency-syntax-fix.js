import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AFFECTED_LANGUAGES = [
  'tr', 'fi', 'sl', 'sk', 'cs', 'ro', 'nb', 'en-GB', 'el', 'et', 'bg', 'hu',
  'lt', 'lv', 'vi', 'he', 'pt-PT', 'sv', 'pl', 'pt-BR', 'ko', 'da', 'id',
  'uk', 'zh-TW', 'it', 'nl'
];

const TRANSLATIONS_DIR = path.join(__dirname, '..', 'client', 'src', 'translations');

function fixSyntaxErrors(content, languageCode) {
  let fixCount = 0;
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Pattern 1: Lines ending with \\'<comma> (most common)
    // Example: 'key': 'text ending with backslash\\'<comma>
    if (line.match(/\\\\'[,;]?\s*$/)) {
      // Remove the trailing backslash before the quote
      line = line.replace(/\\\\'([,;]?\s*)$/, "' + '[RETRANSLATE]'$1");
      fixCount++;
    }
    
    // Pattern 2: Lines with Don\' or similar truncations in the middle
    // Example: 'text': 'Don\'t do this - very bad\',
    // This is actually valid syntax in some cases, so we need to be careful
    
    // Pattern 3: Unfinished strings (no closing quote at all)
    // Example: 'key': 'text without closing quote
    if (line.includes("': '") && !line.match(/'[,;]?\s*$/) && !line.includes('//')) {
      // Count quotes after the key
      const afterColon = line.split("': '")[1];
      if (afterColon) {
        const quoteCount = (afterColon.match(/'/g) || []).length;
        // If odd number of quotes, the string is unclosed
        if (quoteCount % 2 === 0 && !line.trim().endsWith(',') && !line.trim().endsWith(';')) {
          line = line.trim() + "' + '[RETRANSLATE]',";
          fixCount++;
        }
      }
    }
    
    fixedLines.push(line);
  }
  
  return {
    content: fixedLines.join('\n'),
    fixCount
  };
}

function processLanguageFile(languageCode) {
  const filePath = path.join(TRANSLATIONS_DIR, `${languageCode}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${languageCode}.ts - file not found`);
    return { processed: false };
  }
  
  console.log(`🔧 Processing ${languageCode}.ts...`);
  
  const originalContent = fs.readFileSync(filePath, 'utf-8');
  const { content: fixedContent, fixCount } = fixSyntaxErrors(originalContent, languageCode);
  
  if (fixCount > 0) {
    // Create backup
    const backupPath = filePath + '.backup';
    fs.writeFileSync(backupPath, originalContent);
    
    // Write fixed content
    fs.writeFileSync(filePath, fixedContent);
    
    console.log(`✅ Fixed ${fixCount} syntax errors in ${languageCode}.ts`);
    console.log(`   Backup saved to ${languageCode}.ts.backup`);
    
    return { processed: true, fixCount, backup: backupPath };
  } else {
    console.log(`✓  No syntax errors found in ${languageCode}.ts`);
    return { processed: true, fixCount: 0 };
  }
}

async function main() {
  console.log('🚨 EMERGENCY SYNTAX FIX - Phase 1');
  console.log('=' .repeat(60));
  console.log(`Processing ${AFFECTED_LANGUAGES.length} affected language files...`);
  console.log('');
  
  let totalFixed = 0;
  const results = [];
  
  for (const lang of AFFECTED_LANGUAGES) {
    const result = processLanguageFile(lang);
    if (result.processed) {
      totalFixed += result.fixCount || 0;
      results.push({ lang, ...result });
    }
  }
  
  console.log('');
  console.log('=' .repeat(60));
  console.log('📊 SUMMARY');
  console.log('=' .repeat(60));
  console.log(`Total files processed: ${results.filter(r => r.processed).length}`);
  console.log(`Total syntax errors fixed: ${totalFixed}`);
  console.log(`Files with fixes: ${results.filter(r => r.fixCount > 0).length}`);
  console.log('');
  
  if (totalFixed > 0) {
    console.log('✅ Emergency fix complete! App should now compile.');
    console.log('⚠️  Keys marked with [RETRANSLATE] need proper translation in Phase 2.');
    console.log('');
    console.log('Next step: Run Phase 2 (retranslate-malformed.js) to fix translations.');
  } else {
    console.log('✓  No syntax errors detected. Files are clean!');
  }
  
  // Save results for Phase 2
  const resultsPath = path.join(__dirname, 'emergency-fix-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`Results saved to: ${resultsPath}`);
}

main().catch(console.error);
