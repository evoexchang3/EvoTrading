#!/usr/bin/env node

/**
 * Safe line-by-line fix for corrupted rule1.example key
 * Replaces any malformed line with properly-escaped English fallback
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = ['bg', 'cs', 'el', 'et', 'fi', 'he', 'hu', 'ko', 'lt', 'lv', 'pl', 'pt-BR', 'pt-PT', 'sk', 'sl', 'vi', 'zh-TW'];

const KEY = 'tools.positionCalculator.riskRules.rule1.example';
// Properly escaped for TypeScript single-quoted string
const CORRECT_LINE = "  'tools.positionCalculator.riskRules.rule1.example': '$10,000 account → Max $200 risk per trade. If stopped out 5 times in a row, you\\'re only down $1,000 (10%), still plenty of capital to recover.',\n";

let totalFixed = 0;

console.log('🔧 Fixing corrupted rule1.example key (v2 - line-based)...\n');

for (const lang of languages) {
  const filePath = path.join(__dirname, `../client/src/translations/${lang}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭  ${lang}: File not found`);
    continue;
  }
  
  // Read file as lines
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Find the corrupted line
  let lineIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(KEY)) {
      lineIndex = i;
      break;
    }
  }
  
  if (lineIndex === -1) {
    console.log(`⚠  ${lang}: Key not found`);
    continue;
  }
  
  const currentLine = lines[lineIndex];
  
  // Check if corrupted (doubled key or escape issues)
  const isCorrupted = 
    currentLine.includes(`''${KEY}':`) ||  // Doubled key
    (currentLine.includes('\\\\') && currentLine.length > 200) ||  // Excessive backslashes
    currentLine.split(',').length > 2;  // Multiple commas (incomplete replacement)
  
  if (isCorrupted) {
    // Create backup
    const backupPath = `${filePath}.bak-v2`;
    fs.writeFileSync(backupPath, content, 'utf8');
    
    // Replace the corrupted line
    lines[lineIndex] = CORRECT_LINE.trim();
    
    // Write back
    const newContent = lines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    totalFixed++;
    console.log(`✅ ${lang}: Fixed`);
  } else {
    console.log(`✓  ${lang}: Already correct`);
  }
}

console.log(`\n✅ Fixed ${totalFixed} files`);
