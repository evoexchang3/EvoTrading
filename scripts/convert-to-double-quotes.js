#!/usr/bin/env node

/**
 * Converts all translation files from single-quoted to double-quoted format
 * This eliminates the need to escape apostrophes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationsDir = path.join(__dirname, '..', 'client', 'src', 'translations');

const languageFiles = [
  'ar.ts', 'bg.ts', 'cs.ts', 'da.ts', 'de.ts', 'el.ts', 'en.ts', 'en-GB.ts',
  'es.ts', 'et.ts', 'fi.ts', 'fr.ts', 'he.ts', 'hu.ts', 'id.ts', 'it.ts',
  'ja.ts', 'ko.ts', 'lt.ts', 'lv.ts', 'nb.ts', 'nl.ts', 'pl.ts', 'pt-BR.ts',
  'pt-PT.ts', 'ro.ts', 'ru.ts', 'sk.ts', 'sl.ts', 'sv.ts', 'uk.ts',
  'vi.ts', 'zh-CN.ts', 'zh-TW.ts'
];

let totalConverted = 0;

for (const file of languageFiles) {
  const filePath = path.join(translationsDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  let converted = 0;
  
  // Convert translation entries from single to double quotes
  // Pattern: '  'key': 'value',  ' becomes '  "key": "value",  '
  content = content.replace(/^(\s*)('(?:[^'\\]|\\.)*')\s*:\s*('(?:[^'\\]|\\.)*')(,?)$/gm, (match, indent, key, value, comma) => {
    converted++;
    
    // Remove outer single quotes and unescape escaped single quotes
    const keyContent = key.slice(1, -1).replace(/\\'/g, "'");
    const valueContent = value.slice(1, -1).replace(/\\'/g, "'");
    
    // Escape double quotes and backslashes for double-quoted strings
    const keyEscaped = keyContent.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const valueEscaped = valueContent.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    
    return `${indent}"${keyEscaped}": "${valueEscaped}"${comma}`;
  });
  
  if (converted > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${file}: Converted ${converted} entries to double quotes`);
    totalConverted += converted;
  } else {
    console.log(`✓  ${file}: Already using double quotes or no entries found`);
  }
}

console.log(`\n🎉 Total converted: ${totalConverted} translation entries across ${languageFiles.length} files`);
console.log('\n💡 Translation files now use double quotes - apostrophes no longer need escaping!');
