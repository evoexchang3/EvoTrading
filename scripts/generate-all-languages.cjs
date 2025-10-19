#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌍 Generating 30+ Language Translation Files\n');

// Complete language list with metadata
const languages = [
  // Tier 1 - Already exists
  { code: 'en', name: 'English', export: 'en', skip: true },
  { code: 'zh-CN', name: '简体中文', export: 'zhCN', skip: true },
  { code: 'ja', name: '日本語', export: 'ja', skip: true },
  { code: 'de', name: 'Deutsch', export: 'de', skip: true },
  { code: 'fr', name: 'Français', export: 'fr', skip: true },
  { code: 'es', name: 'Español', export: 'es', skip: true },
  { code: 'ar', name: 'العربية', export: 'ar', rtl: true, skip: true },
  { code: 'ru', name: 'Русский', export: 'ru', skip: true },
  
  // Tier 2 - Generate these
  { code: 'pt-BR', name: 'Português (Brasil)', export: 'ptBR' },
  { code: 'pt-PT', name: 'Português (Portugal)', export: 'ptPT' },
  { code: 'it', name: 'Italiano', export: 'it' },
  
  // Tier 3 - New languages
  { code: 'ko', name: '한국어', export: 'ko' },
  { code: 'th', name: 'ไทย', export: 'th' },
  { code: 'vi', name: 'Tiếng Việt', export: 'vi' },
  { code: 'id', name: 'Bahasa Indonesia', export: 'id' },
  { code: 'tr', name: 'Türkçe', export: 'tr' },
  { code: 'pl', name: 'Polski', export: 'pl' },
  { code: 'nl', name: 'Nederlands', export: 'nl' },
  { code: 'sv', name: 'Svenska', export: 'sv' },
  { code: 'no', name: 'Norsk', export: 'no' },
  { code: 'da', name: 'Dansk', export: 'da' },
  { code: 'fi', name: 'Suomi', export: 'fi' },
  { code: 'cs', name: 'Čeština', export: 'cs' },
  { code: 'sk', name: 'Slovenčina', export: 'sk' },
  { code: 'hu', name: 'Magyar', export: 'hu' },
  { code: 'ro', name: 'Română', export: 'ro' },
  { code: 'el', name: 'Ελληνικά', export: 'el' },
  { code: 'he', name: 'עברית', export: 'he', rtl: true },
  { code: 'hi', name: 'हिन्दी', export: 'hi' },
  { code: 'bn', name: 'বাংলা', export: 'bn' },
  { code: 'ms', name: 'Bahasa Melayu', export: 'ms' },
  { code: 'tl', name: 'Filipino', export: 'tl' },
  { code: 'uk', name: 'Українська', export: 'uk' },
  { code: 'bg', name: 'Български', export: 'bg' },
  { code: 'hr', name: 'Hrvatski', export: 'hr' },
  { code: 'sr', name: 'Српски', export: 'sr' },
  { code: 'sl', name: 'Slovenščina', export: 'sl' },
  { code: 'lt', name: 'Lietuvių', export: 'lt' },
  { code: 'lv', name: 'Latviešu', export: 'lv' },
  { code: 'et', name: 'Eesti', export: 'et' },
];

const enPath = path.join(__dirname, '../client/src/translations/en.ts');
const enContent = fs.readFileSync(enPath, 'utf-8');

// Generate each language file
languages.forEach(lang => {
  if (lang.skip) {
    console.log(`⏭️  Skipping ${lang.code} - already exists`);
    return;
  }
  
  const outputPath = path.join(__dirname, `../client/src/translations/${lang.code}.ts`);
  
  // Replace export name
  const content = enContent.replace('export const en = {', `export const ${lang.export} = {`);
  
  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ ${lang.code}.ts created`);
});

console.log('\n🎉 All language files generated!');
console.log(`📊 Total languages: ${languages.length}`);

// Generate the language metadata
const metadata = {
  languages: languages.map(l => ({
    code: l.code,
    name: l.name,
    export: l.export,
    rtl: l.rtl || false
  }))
};

fs.writeFileSync(
  path.join(__dirname, 'language-metadata.json'),
  JSON.stringify(metadata, null, 2)
);
console.log('✅ Metadata saved to language-metadata.json');
