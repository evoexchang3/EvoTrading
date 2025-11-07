/**
 * useVariantContent Hook
 * Provides variant-specific content based on active site configuration variant
 */

import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { variantContentRegistry, VariantContent, PageContent } from '@/content/variantContent';

export function useVariantContent() {
  const { config } = useSiteConfig();
  const activeVariant = config.layout?.activeVariant || 'bloomberg-dark';

  // Get content for active variant, fallback to bloomberg-dark
  const variantContent: VariantContent = variantContentRegistry[activeVariant] || variantContentRegistry['bloomberg-dark'];

  /**
   * Get content for a specific page
   */
  function getPageContent(page: keyof VariantContent): Partial<PageContent> {
    return variantContent[page] || {};
  }

  return {
    content: variantContent,
    getPageContent,
    activeVariant,
  };
}
