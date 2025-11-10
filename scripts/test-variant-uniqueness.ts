/**
 * Variant Structural Uniqueness Test
 * Generates fingerprints for each variant and verifies all are unique
 * 
 * Usage: tsx scripts/test-variant-uniqueness.ts
 */

import { variantConfigs, type VariantConfig } from '../client/src/layouts/shared/variantConfig';
import crypto from 'crypto';

interface VariantFingerprint {
  variantId: string;
  fingerprint: string;
  components: {
    navigationLayout: string;
    footerLayout: string;
    homeHeroType: string;
    homeSectionOrder: string;
    homeOptionalModules: string[];
    aboutLayout: string;
    marketsLayout: string;
    contactLayout: string;
    faqLayout: string;
  };
}

/**
 * Generates a unique fingerprint for a variant based on its structural properties
 */
function generateVariantFingerprint(variantId: string, config: VariantConfig): VariantFingerprint {
  const homeConfig = config.pages.home;
  
  // Collect optional modules that are enabled
  const optionalModules: string[] = [];
  if (homeConfig.includeTestimonials) optionalModules.push('testimonials');
  if (homeConfig.includePartnerLogos) optionalModules.push('partners');
  if (homeConfig.includeLiveTicker) optionalModules.push('ticker');
  if (homeConfig.includeComplianceBadges) optionalModules.push('compliance');
  
  const components = {
    navigationLayout: config.structure.navigationLayout,
    footerLayout: config.structure.footerLayout,
    homeHeroType: homeConfig.heroType,
    homeSectionOrder: homeConfig.sectionOrder.join('|'),
    homeOptionalModules: optionalModules,
    aboutLayout: config.pages.about.layout,
    marketsLayout: config.pages.markets.layout,
    contactLayout: config.pages.contact.layout,
    faqLayout: config.pages.faq.layout,
  };
  
  // Create a deterministic fingerprint from all components
  const fingerprintData = [
    components.navigationLayout,
    components.footerLayout,
    components.homeHeroType,
    components.homeSectionOrder,
    components.homeOptionalModules.sort().join(','),
    components.aboutLayout,
    components.marketsLayout,
    components.contactLayout,
    components.faqLayout,
  ].join('::');
  
  const fingerprint = crypto
    .createHash('sha256')
    .update(fingerprintData)
    .digest('hex')
    .substring(0, 16);
  
  return {
    variantId,
    fingerprint,
    components,
  };
}

/**
 * Compares two variants and identifies what makes them different
 */
function compareVariants(fp1: VariantFingerprint, fp2: VariantFingerprint): string[] {
  const differences: string[] = [];
  
  if (fp1.components.navigationLayout !== fp2.components.navigationLayout) {
    differences.push(`navigation: ${fp1.components.navigationLayout} vs ${fp2.components.navigationLayout}`);
  }
  if (fp1.components.footerLayout !== fp2.components.footerLayout) {
    differences.push(`footer: ${fp1.components.footerLayout} vs ${fp2.components.footerLayout}`);
  }
  if (fp1.components.homeHeroType !== fp2.components.homeHeroType) {
    differences.push(`hero: ${fp1.components.homeHeroType} vs ${fp2.components.homeHeroType}`);
  }
  if (fp1.components.homeSectionOrder !== fp2.components.homeSectionOrder) {
    differences.push(`sections: ${fp1.components.homeSectionOrder} vs ${fp2.components.homeSectionOrder}`);
  }
  if (JSON.stringify(fp1.components.homeOptionalModules) !== JSON.stringify(fp2.components.homeOptionalModules)) {
    differences.push(`modules: [${fp1.components.homeOptionalModules.join(',')}] vs [${fp2.components.homeOptionalModules.join(',')}]`);
  }
  if (fp1.components.aboutLayout !== fp2.components.aboutLayout) {
    differences.push(`about: ${fp1.components.aboutLayout} vs ${fp2.components.aboutLayout}`);
  }
  if (fp1.components.marketsLayout !== fp2.components.marketsLayout) {
    differences.push(`markets: ${fp1.components.marketsLayout} vs ${fp2.components.marketsLayout}`);
  }
  if (fp1.components.contactLayout !== fp2.components.contactLayout) {
    differences.push(`contact: ${fp1.components.contactLayout} vs ${fp2.components.contactLayout}`);
  }
  if (fp1.components.faqLayout !== fp2.components.faqLayout) {
    differences.push(`faq: ${fp1.components.faqLayout} vs ${fp2.components.faqLayout}`);
  }
  
  return differences;
}

console.log('🔍 Testing variant structural uniqueness...\n');

// Generate fingerprints for all variants
const fingerprints: VariantFingerprint[] = [];
for (const [variantId, config] of Object.entries(variantConfigs)) {
  fingerprints.push(generateVariantFingerprint(variantId, config));
}

console.log(`📊 Generated fingerprints for ${fingerprints.length} variants\n`);

// Check for duplicate fingerprints
const fingerprintMap = new Map<string, string[]>();
for (const fp of fingerprints) {
  const existing = fingerprintMap.get(fp.fingerprint) || [];
  existing.push(fp.variantId);
  fingerprintMap.set(fp.fingerprint, existing);
}

let duplicatesFound = false;
for (const [fingerprint, variantIds] of fingerprintMap.entries()) {
  if (variantIds.length > 1) {
    duplicatesFound = true;
    console.error(`❌ DUPLICATE FINGERPRINT: ${fingerprint}`);
    console.error(`   Variants: ${variantIds.join(', ')}`);
    
    // Show what's different between the duplicates
    const fp1 = fingerprints.find(f => f.variantId === variantIds[0])!;
    const fp2 = fingerprints.find(f => f.variantId === variantIds[1])!;
    const diffs = compareVariants(fp1, fp2);
    
    if (diffs.length === 0) {
      console.error(`   These variants are IDENTICAL in structure!`);
    } else {
      console.error(`   Differences: ${diffs.join(', ')}`);
    }
    console.error('');
  }
}

if (duplicatesFound) {
  console.error('❌ FAIL: Found duplicate variant structures\n');
  process.exit(1);
}

// Verify all variants have unique section orders
const sectionOrders = new Map<string, string[]>();
for (const fp of fingerprints) {
  const order = fp.components.homeSectionOrder;
  const existing = sectionOrders.get(order) || [];
  existing.push(fp.variantId);
  sectionOrders.set(order, existing);
}

let sectionDuplicatesFound = false;
for (const [order, variantIds] of sectionOrders.entries()) {
  if (variantIds.length > 1) {
    sectionDuplicatesFound = true;
    console.error(`❌ DUPLICATE SECTION ORDER: [${order.replace(/\|/g, ', ')}]`);
    console.error(`   Variants: ${variantIds.join(', ')}\n`);
  }
}

if (sectionDuplicatesFound) {
  console.error('❌ FAIL: Found duplicate section orders\n');
  process.exit(1);
}

// Success! Show distribution summary
console.log('✅ All variants have unique structural fingerprints!\n');
console.log('📈 Structural Distribution:');
console.log(`   Unique fingerprints: ${fingerprintMap.size}/${fingerprints.length}`);
console.log(`   Unique section orders: ${sectionOrders.size}/${fingerprints.length}`);

// Show per-page layout distribution
const aboutLayouts = new Map<string, number>();
const marketsLayouts = new Map<string, number>();
const contactLayouts = new Map<string, number>();
const faqLayouts = new Map<string, number>();

for (const fp of fingerprints) {
  aboutLayouts.set(fp.components.aboutLayout, (aboutLayouts.get(fp.components.aboutLayout) || 0) + 1);
  marketsLayouts.set(fp.components.marketsLayout, (marketsLayouts.get(fp.components.marketsLayout) || 0) + 1);
  contactLayouts.set(fp.components.contactLayout, (contactLayouts.get(fp.components.contactLayout) || 0) + 1);
  faqLayouts.set(fp.components.faqLayout, (faqLayouts.get(fp.components.faqLayout) || 0) + 1);
}

console.log(`\n   About layouts: ${Array.from(aboutLayouts.entries()).map(([k, v]) => `${k}(${v})`).join(', ')}`);
console.log(`   Markets layouts: ${Array.from(marketsLayouts.entries()).map(([k, v]) => `${k}(${v})`).join(', ')}`);
console.log(`   Contact layouts: ${Array.from(contactLayouts.entries()).map(([k, v]) => `${k}(${v})`).join(', ')}`);
console.log(`   FAQ layouts: ${Array.from(faqLayouts.entries()).map(([k, v]) => `${k}(${v})`).join(', ')}`);

console.log('\n✨ Maximum structural diversity achieved across all variants!');
process.exit(0);
