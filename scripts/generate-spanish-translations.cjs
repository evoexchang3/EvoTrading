const fs = require('fs');
const path = require('path');

// Read the missing keys file
const missingContent = fs.readFileSync(path.join(__dirname, 'missing-keys-es.txt'), 'utf8');
const enContent = fs.readFileSync(path.join(__dirname, '../client/src/translations/en.ts'), 'utf8');

// Extract all missing keys
const lines = missingContent.split('\n');
const missingKeys = [];
for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.includes('--') && !trimmed.includes('==') && 
      !trimmed.startsWith('Missing') && !trimmed.startsWith('Total') && 
      !trimmed.startsWith('Coverage') && !trimmed.match(/^[A-Z]/)) {
    missingKeys.push(trimmed);
  }
}

console.log(`Found ${missingKeys.length} missing keys`);

// Function to extract English translation for a key
function getEnglishTranslation(key) {
  // Try single-line string with single quotes
  const singleQuoteRegex = new RegExp(`'${key.replace(/\./g, '\\.')}': '([^']*(?:\\\\'[^']*)*)'`);
  let match = singleQuoteRegex.exec(enContent);
  if (match) return match[1];
  
  // Try multiline string with backticks
  const backtickRegex = new RegExp(`'${key.replace(/\./g, '\\.')}': \`([^\`]*)\``,'s');
  match = backtickRegex.exec(enContent);
  if (match) return match[1];
  
  return null;
}

// Spanish translation mapping for common terms
const translations = {
  // Professional Spanish translations for the missing keys
  // This will be populated with actual translations
};

// Output all missing keys with their English values
const output = [];
for (const key of missingKeys) {
  const englishValue = getEnglishTranslation(key);
  if (englishValue) {
    output.push(`  '${key}': '${englishValue}',`);
  }
}

console.log(`Successfully extracted ${output.length} translations`);
console.log('\nSample output (first 10):');
output.slice(0, 10).forEach(line => console.log(line));

// Write to output file for review
fs.writeFileSync(path.join(__dirname, 'extracted-en-translations.txt'), output.join('\n'));
console.log(`\nWrote all extractions to extracted-en-translations.txt`);
