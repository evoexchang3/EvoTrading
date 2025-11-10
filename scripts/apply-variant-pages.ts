#!/usr/bin/env tsx
/**
 * Apply Generated Page Configs to variantConfig.ts
 * Safely inserts partners→companySubpage configs for all variants
 * Preserves existing home→faq configs
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import {
  buildPartnersConfig,
  buildCompanyConfig,
  buildEducationConfig,
  buildLegalConfig,
  buildCustomerInfoConfig,
  buildMarketInfoConfig,
  buildCompanySubpageConfig,
} from '../client/src/layouts/shared/configDefaults.js';
import { variantOverrides } from '../client/src/layouts/shared/variantOverrides.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VARIANT_CONFIG_PATH = path.join(__dirname, '../client/src/layouts/shared/variantConfig.ts');

interface PageConfigs {
  partners: any;
  company: any;
  education: any;
  legal: any;
  customerInfo: any;
  marketInfo: any;
  companySubpage: any;
}

function formatValue(value: any, indent: number): string {
  const spacing = ' '.repeat(indent);
  
  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  } else if (typeof value === 'string') {
    return `'${value}'`;
  } else if (Array.isArray(value)) {
    const items = value.map(v => typeof v === 'string' ? `'${v}'` : String(v)).join(', ');
    return `[${items}]`;
  } else {
    return JSON.stringify(value);
  }
}

function formatConfigSection(name: string, config: any, baseIndent: number): string {
  const indent = ' '.repeat(baseIndent);
  const propIndent = ' '.repeat(baseIndent + 2);
  
  const lines = [`${indent}${name}: {`];
  
  for (const [key, value] of Object.entries(config)) {
    lines.push(`${propIndent}${key}: ${formatValue(value, baseIndent + 2)},`);
  }
  
  lines.push(`${indent}},`);
  return lines.join('\n');
}

function generatePageConfigsBlock(variantId: string, baseIndent: number): string {
  const overrides = variantOverrides[variantId] || {};
  
  const configs: PageConfigs = {
    partners: buildPartnersConfig(overrides.partners),
    company: buildCompanyConfig(overrides.company),
    education: buildEducationConfig(overrides.education),
    legal: buildLegalConfig(overrides.legal),
    customerInfo: buildCustomerInfoConfig(overrides.customerInfo),
    marketInfo: buildMarketInfoConfig(overrides.marketInfo),
    companySubpage: buildCompanySubpageConfig(overrides.companySubpage),
  };
  
  const sections = [
    formatConfigSection('partners', configs.partners, baseIndent),
    formatConfigSection('company', configs.company, baseIndent),
    formatConfigSection('education', configs.education, baseIndent),
    formatConfigSection('legal', configs.legal, baseIndent),
    formatConfigSection('customerInfo', configs.customerInfo, baseIndent),
    formatConfigSection('marketInfo', configs.marketInfo, baseIndent),
    formatConfigSection('companySubpage', configs.companySubpage, baseIndent),
  ];
  
  return sections.join('\n');
}

function findVariantBlock(content: string, variantId: string): { start: number; end: number } | null {
  // Find the variant definition, e.g., "'bloomberg-dark': {"
  const variantPattern = new RegExp(`^  '${variantId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*\\{`, 'm');
  const match = content.match(variantPattern);
  
  if (!match || match.index === undefined) {
    return null;
  }
  
  const start = match.index;
  let braceDepth = 0;
  let inString = false;
  let stringChar = '';
  let end = start;
  
  // Find the matching closing brace for this variant object
  for (let i = start; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';
    
    // Handle strings
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = '';
      }
    }
    
    // Count braces only outside strings
    if (!inString) {
      if (char === '{') {
        braceDepth++;
      } else if (char === '}') {
        braceDepth--;
        if (braceDepth === 0) {
          end = i + 1;
          break;
        }
      }
    }
  }
  
  return { start, end };
}

function findFaqConfigEnd(variantContent: string): number {
  // Find where the faq config ends within this variant's content
  const faqPattern = /faq:\s*\{[^}]*\}/s;
  const match = variantContent.match(faqPattern);
  
  if (!match || match.index === undefined) {
    return -1;
  }
  
  return match.index + match[0].length;
}

function updateVariantConfigs(content: string): string {
  const variantIds = Object.keys(variantOverrides);
  let updatedContent = content;
  
  // Process variants in reverse order to preserve string indices
  for (const variantId of variantIds.reverse()) {
    const block = findVariantBlock(updatedContent, variantId);
    
    if (!block) {
      console.log(`⚠️  Could not find variant: ${variantId}`);
      continue;
    }
    
    const variantContent = updatedContent.substring(block.start, block.end);
    
    // Find where faq config ends
    const faqEndInBlock = findFaqConfigEnd(variantContent);
    
    if (faqEndInBlock === -1) {
      console.log(`⚠️  Could not find faq config in variant: ${variantId}`);
      continue;
    }
    
    const faqEndAbsolute = block.start + faqEndInBlock;
    
    // Find the closing brace of the pages object within this variant
    const pagesStartPattern = /pages:\s*\{/;
    const pagesMatch = variantContent.match(pagesStartPattern);
    
    if (!pagesMatch || pagesMatch.index === undefined) {
      console.log(`⚠️  Could not find pages object in variant: ${variantId}`);
      continue;
    }
    
    const pagesStartInBlock = pagesMatch.index + pagesMatch[0].length;
    
    // Find the end of the pages object
    let braceDepth = 1;
    let pagesEndInBlock = pagesStartInBlock;
    let inString = false;
    let stringChar = '';
    
    for (let i = pagesStartInBlock; i < variantContent.length; i++) {
      const char = variantContent[i];
      const prevChar = i > 0 ? variantContent[i - 1] : '';
      
      if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = '';
        }
      }
      
      if (!inString) {
        if (char === '{') {
          braceDepth++;
        } else if (char === '}') {
          braceDepth--;
          if (braceDepth === 0) {
            pagesEndInBlock = i;
            break;
          }
        }
      }
    }
    
    const pagesEndAbsolute = block.start + pagesEndInBlock;
    
    // Generate new configs
    const newConfigs = generatePageConfigsBlock(variantId, 6);
    
    // Build updated variant content
    const before = updatedContent.substring(0, faqEndAbsolute);
    const after = updatedContent.substring(pagesEndAbsolute);
    
    updatedContent = before + ',\n' + newConfigs + '\n      ' + after;
    
    console.log(`✅ Updated variant: ${variantId}`);
  }
  
  return updatedContent;
}

// Main execution
console.log('🚀 Applying generated configs to variantConfig.ts...\n');

try {
  // Read the file
  const content = fs.readFileSync(VARIANT_CONFIG_PATH, 'utf-8');
  console.log(`📖 Read ${VARIANT_CONFIG_PATH} (${content.length} characters)\n`);
  
  // Update the content
  const updatedContent = updateVariantConfigs(content);
  
  // Write back the file
  fs.writeFileSync(VARIANT_CONFIG_PATH, updatedContent, 'utf-8');
  console.log(`\n💾 Wrote updated file to ${VARIANT_CONFIG_PATH}`);
  
  console.log('\n✅ All variant configs updated successfully!');
  console.log('\n💡 Next steps:');
  console.log('   1. Run: tsx scripts/validate-variants.ts');
  console.log('   2. Run: tsx scripts/test-variant-uniqueness.ts');
  console.log('   3. Review git diff to verify changes');
  
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
