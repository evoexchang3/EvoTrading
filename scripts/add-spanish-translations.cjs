const fs = require('fs');
const path = require('path');

// Read files
const enContent = fs.readFileSync(path.join(__dirname, '../client/src/translations/en.ts'), 'utf8');
const esContent = fs.readFileSync(path.join(__dirname, '../client/src/translations/es.ts'), 'utf8');
const missingKeysContent = fs.readFileSync(path.join(__dirname, 'missing-keys-es.txt'), 'utf8');

// Extract missing keys
const missingKeys = missingKeysContent
  .split('\n')
  .filter(line => line.trim().startsWith('company.') || 
                  line.trim().startsWith('marketInfo.') ||
                  line.trim().startsWith('customer.') ||
                  line.trim().startsWith('funding.') ||
                  line.trim().startsWith('learn.') ||
                  line.trim().startsWith('legal.') ||
                  line.trim().startsWith('settings.') ||
                  line.trim().startsWith('error.') ||
                  line.trim().startsWith('home.'))
  .map(line => line.trim());

console.log(`Found ${missingKeys.length} missing keys`);

// Extract English translations for missing keys
const translations = {};
missingKeys.forEach(key => {
  const regex = new RegExp(`'${key.replace(/\./g, '\\.')}': '([^']*(?:\\\\'[^']*)*)'`, 'g');
  const match = regex.exec(enContent);
  if (match) {
    translations[key] = match[1];
  } else {
    // Try with backticks for multiline strings
    const multilineRegex = new RegExp(`'${key.replace(/\./g, '\\.')}': \`([^\`]*)\``, 'gs');
    const multilineMatch = multilineRegex.exec(enContent);
    if (multilineMatch) {
      translations[key] = multilineMatch[1];
    }
  }
});

console.log(`Extracted ${Object.keys(translations).length} translations`);

// Write to output file for manual translation
const output = Object.entries(translations)
  .map(([key, value]) => `${key}||${value}`)
  .join('\n');

fs.writeFileSync(path.join(__dirname, 'translations-to-add.txt'), output);
console.log('Wrote translations to translations-to-add.txt');
