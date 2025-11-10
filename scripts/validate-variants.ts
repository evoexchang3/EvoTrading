/**
 * Preflight Validation Script for Variant Configurations
 * Run this before deployment to ensure all variants are properly configured
 * 
 * Usage: tsx scripts/validate-variants.ts
 */

import { variantConfigs } from '../client/src/layouts/shared/variantConfig';
import { strictValidateAllVariants, validateAllVariants } from '../client/src/layouts/shared/variantValidation';

console.log('🔍 Validating variant configurations...\n');

try {
  // Strict validation - will throw on first error
  strictValidateAllVariants(variantConfigs);
  
  console.log('✅ All 16 variants passed strict validation!\n');
  
  // Run comprehensive validation for detailed report
  const results = validateAllVariants(variantConfigs);
  
  const validCount = Array.from(results.values()).filter(r => r === true).length;
  const invalidCount = results.size - validCount;
  
  console.log('📊 Validation Summary:');
  console.log(`   Total variants: ${results.size}`);
  console.log(`   Valid: ${validCount}`);
  console.log(`   Invalid: ${invalidCount}`);
  
  if (invalidCount > 0) {
    console.log('\n❌ Invalid variants:');
    for (const [variantId, result] of results.entries()) {
      if (result !== true) {
        console.log(`\n   ${variantId}:`);
        console.log(`   ${result}`);
      }
    }
    process.exit(1);
  }
  
  console.log('\n✨ All variant configurations are valid and complete!');
  process.exit(0);
  
} catch (error) {
  console.error('\n❌ Validation failed:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
