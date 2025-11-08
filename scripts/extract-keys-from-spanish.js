#!/usr/bin/env node

/**
 * Extract English keys from Spanish backup and manually create basic en.ts
 * We'll use the keys from Spanish and create placeholder English values that can be filled in
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spanishFile = path.join(__dirname, '..', 'client', 'src', 'translations', 'es.ts.backup');
const outputFile = path.join(__dirname, '..', 'client', 'src', 'translations', 'en.ts');

// Read Spanish file
const content = fs.readFileSync(spanishFile, 'utf-8');

// Extract keys (lines that start with quotes followed by colon)
const keyPattern = /^\s*['"]([^'"]+)['"]\s*:/gm;
const keys = [];
let match;
while ((match = keyPattern.exec(content)) !== null) {
  keys.push(match[1]);
}

console.log(`Found ${keys.length} translation keys in Spanish backup`);

// For now, create basic English values (can be improved later)
let output = 'export const en = {\n';

for (const key of keys) {
  // Create basic English value from key (replace dots with spaces, capitalize)
  const parts = key.split('.');
  const lastPart = parts[parts.length - 1];
  const basicValue = lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
  
  output += `  "${key}": "${basicValue}",\n`;
}

output += '};\n';

fs.writeFileSync(outputFile, output, 'utf-8');
console.log(`✅ Created en.ts with ${keys.length} entries (basic English values from keys)`);
console.log(`⚠️  Note: Values are auto-generated from keys - may need manual review`);
