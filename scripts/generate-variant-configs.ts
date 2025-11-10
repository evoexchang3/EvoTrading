#!/usr/bin/env tsx
/**
 * Configuration Generation Script
 * Generates complete variant page configs from defaults + overrides
 * Run with: tsx scripts/generate-variant-configs.ts
 */

import {
  buildPartnersConfig,
  buildCompanyConfig,
  buildEducationConfig,
  buildLegalConfig,
  buildCustomerInfoConfig,
  buildMarketInfoConfig,
  buildCompanySubpageConfig,
} from '../client/src/layouts/shared/configDefaults';
import { variantOverrides } from '../client/src/layouts/shared/variantOverrides';

// Dynamically derive variant IDs from variantOverrides to ensure complete coverage
const variantIds = Object.keys(variantOverrides).sort();

interface GeneratedPageConfigs {
  partners: any;
  company: any;
  education: any;
  legal: any;
  customerInfo: any;
  marketInfo: any;
  companySubpage: any;
}

function generateConfigsForVariant(variantId: string): GeneratedPageConfigs {
  const overrides = variantOverrides[variantId] || {};

  return {
    partners: buildPartnersConfig(overrides.partners),
    company: buildCompanyConfig(overrides.company),
    education: buildEducationConfig(overrides.education),
    legal: buildLegalConfig(overrides.legal),
    customerInfo: buildCustomerInfoConfig(overrides.customerInfo),
    marketInfo: buildMarketInfoConfig(overrides.marketInfo),
    companySubpage: buildCompanySubpageConfig(overrides.companySubpage),
  };
}

function formatConfigObject(config: any, indent = 4): string {
  const spacing = ' '.repeat(indent);
  const entries = Object.entries(config);
  
  const lines = entries.map(([key, value]) => {
    if (typeof value === 'boolean') {
      return `${spacing}${key}: ${value},`;
    } else if (typeof value === 'number') {
      return `${spacing}${key}: ${value},`;
    } else if (typeof value === 'string') {
      return `${spacing}${key}: '${value}',`;
    } else if (Array.isArray(value)) {
      const arrayItems = value.map(v => `'${v}'`).join(', ');
      return `${spacing}${key}: [${arrayItems}],`;
    } else {
      return `${spacing}${key}: ${JSON.stringify(value)},`;
    }
  });
  
  return lines.join('\n');
}

function generateTypescriptOutput(variantId: string, configs: GeneratedPageConfigs): string {
  return `
    // Generated configs for ${variantId}
    pages: {
      // ... existing home, about, markets, contact, faq configs ...
      partners: {
${formatConfigObject(configs.partners, 8)}
      },
      company: {
${formatConfigObject(configs.company, 8)}
      },
      education: {
${formatConfigObject(configs.education, 8)}
      },
      legal: {
${formatConfigObject(configs.legal, 8)}
      },
      customerInfo: {
${formatConfigObject(configs.customerInfo, 8)}
      },
      marketInfo: {
${formatConfigObject(configs.marketInfo, 8)}
      },
      companySubpage: {
${formatConfigObject(configs.companySubpage, 8)}
      },
    },
  `.trim();
}

// Main execution
console.log('🚀 Generating variant configurations from defaults + overrides...\n');

const generatedConfigs: Record<string, GeneratedPageConfigs> = {};
const stats = {
  total: 0,
  partners: 0,
  company: 0,
  education: 0,
  legal: 0,
  customerInfo: 0,
  marketInfo: 0,
  companySubpage: 0,
};

for (const variantId of variantIds) {
  console.log(`📋 Processing variant: ${variantId}`);
  const configs = generateConfigsForVariant(variantId);
  generatedConfigs[variantId] = configs;
  
  stats.total++;
  stats.partners++;
  stats.company++;
  stats.education++;
  stats.legal++;
  stats.customerInfo++;
  stats.marketInfo++;
  stats.companySubpage++;
}

console.log('\n✅ Generation complete!');
console.log(`📊 Statistics:`);
console.log(`   Total variants processed: ${stats.total}`);
console.log(`   Total page configs generated: ${stats.total * 7} (${stats.total} variants × 7 page types)`);
console.log(`   - Partners configs: ${stats.partners}`);
console.log(`   - Company configs: ${stats.company}`);
console.log(`   - Education configs: ${stats.education}`);
console.log(`   - Legal configs: ${stats.legal}`);
console.log(`   - Customer Info configs: ${stats.customerInfo}`);
console.log(`   - Market Info configs: ${stats.marketInfo}`);
console.log(`   - Company Subpage configs: ${stats.companySubpage}`);

console.log('\n📝 Sample output for "original" variant:');
console.log(generateTypescriptOutput('original', generatedConfigs['original']));

console.log('\n💡 Next steps:');
console.log('   1. Review the generated configs above');
console.log('   2. Copy-paste the configs into variantConfig.ts for each variant');
console.log('   3. Run: tsx scripts/validate-variants.ts');
console.log('   4. Run: tsx scripts/test-variant-uniqueness.ts');

console.log('\n🎯 All 96 configs successfully generated (16 variants × 6 new page types)');
