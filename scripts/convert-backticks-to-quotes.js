#!/usr/bin/env node

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
  'pt-PT.ts', 'ro.ts', 'ru.ts', 'sk.ts', 'sl.ts', 'sv.ts', 'tr.ts', 'uk.ts',
  'vi.ts', 'zh-CN.ts', 'zh-TW.ts'
];

for (const file of languageFiles) {
  const filePath = path.join(translationsDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Convert template literals back to single-quoted strings with proper escaping
  // Pattern: '  'key': `value`,
  content = content.replace(/^(\s+)'([^']+)':\s*`([^`]*(?:\\`[^`]*)*)`(,?)$/gm, (match, indent, key, value, comma) => {
    // Escape single quotes in the value (for content like "50.000'den")
    const escapedValue = value
      .replace(/\\\$/g, '$')  // Unescape ${} that was escaped for template literals
      .replace(/\\`/g, '`')    // Unescape backticks
      .replace(/'/g, "\\'");   // Escape single quotes for JavaScript
    
    modified = true;
    return `${indent}'${key}': '${escapedValue}'${comma}`;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${file}: Converted back to single quotes`);
  } else {
    console.log(`✓  ${file}: Already using single quotes or no matches`);
  }
}

console.log(`\n🎉 Conversion complete!`);
