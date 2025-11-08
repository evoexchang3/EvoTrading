#!/usr/bin/env node

/**
 * Rebuild en.ts from extracted-en-translations.txt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractedFile = path.join(__dirname, 'extracted-en-translations.txt');
const outputFile = path.join(__dirname, '..', 'client', 'src', 'translations', 'en.ts');

// Read extracted translations
const content = fs.readFileSync(extractedFile, 'utf-8');
const lines = content.split('\n').filter(line => line.trim());

// Build en.ts content with double quotes
let output = 'export const en = {\n';

for (const line of lines) {
  // Parse line format: "key: value" or "'key': 'value'"
  const match = line.match(/^['"]?([^'"]+)['"]?\s*:\s*['"](.*)['"]?\s*,?$/);
  if (match) {
    const [, key, value] = match;
    // Escape double quotes and backslashes in value
    const escapedValue = value
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n');
    output += `  "${key}": "${escapedValue}",\n`;
  }
}

output += '};\n';

// Write en.ts
fs.writeFileSync(outputFile, output, 'utf-8');
console.log(`✅ Rebuilt en.ts with ${lines.length} translation entries`);
