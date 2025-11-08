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
  
  // Convert all single-quoted values to template literals
  // Pattern: '  'key': 'value',
  content = content.replace(/^(\s+)'([^']+)':\s*'([^]*?)',?$/gm, (match, indent, key, value) => {
    // Replace single quotes with template literals for the value
    // Also need to escape any backticks in the value
    const escapedValue = value.replace(/`/g, '\\`').replace(/\${/g, '\\${');
    modified = true;
    return `${indent}'${key}': \`${escapedValue}\`,`;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${file}: Converted to template literals`);
  } else {
    console.log(`✓  ${file}: Already using template literals or no changes needed`);
  }
}

console.log(`\n🎉 Conversion complete!`);
