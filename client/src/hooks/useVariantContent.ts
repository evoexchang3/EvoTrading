/**
 * useVariantContent Hook
 * Provides variant-specific content based on active site configuration variant
 */

import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { variantContentRegistry, VariantContent } from '@/content/variantContent';

export function useVariantContent() {
  const { activeVariant } = useSiteConfig();

  // Get content for active variant, fallback to bloomberg-dark
  const variantContent: VariantContent = variantContentRegistry[activeVariant] || variantContentRegistry['bloomberg-dark'];

  /**
   * Get content for a specific page
   */
  function getPageContent<K extends keyof VariantContent>(page: K): VariantContent[K] {
    return variantContent[page] || ({} as VariantContent[K]);
  }

  return {
    content: variantContent,
    getPageContent,
    activeVariant,
  };
}
