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

let totalFixed = 0;

for (const file of languageFiles) {
  const filePath = path.join(translationsDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Count DOUBLE-escaped quotes (\\') before fixing
  const beforeCount = (content.match(/\\\\'/g) || []).length;
  
  // Only fix DOUBLE-escaping (\\' → \'), preserve valid single escaping (\')
  content = content.replace(/\\\\'/g, "\\'");
  
  // Count remaining double-escaped quotes after fixing
  const afterCount = (content.match(/\\\\'/g) || []).length;
  const fixed = beforeCount - afterCount;
  
  if (fixed > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${file}: Fixed ${fixed} escaped quotes`);
    totalFixed += fixed;
  } else {
    console.log(`✓  ${file}: No issues found`);
  }
}

console.log(`\n🎉 Total fixed: ${totalFixed} escaped quotes across ${languageFiles.length} files`);
