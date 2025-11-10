/**
 * Zod Schema Validation for Variant Configurations
 * Ensures all variant configs are complete and valid at runtime
 */

import { z } from 'zod';

// Enum schemas
export const animationStyleSchema = z.enum(['instant', 'subtle', 'smooth', 'energetic', 'dramatic']);
export const typographySizeSchema = z.enum(['compact', 'standard', 'spacious', 'large']);
export const layoutDensitySchema = z.enum(['dense', 'comfortable', 'spacious']);
export const cardStyleSchema = z.enum(['sharp', 'rounded', 'soft', 'elevated', 'flat']);

export const navigationLayoutSchema = z.enum([
  'compact-top', 'wide-split', 'centered-double', 'ticker-bar', 
  'vertical-sidebar', 'hamburger-mobile', 'mega-menu', 'icon-rail',
  'glassmorphic', 'minimal-text', 'breadcrumb-hybrid', 'ribbon-secondary',
  'bottom-mobile', 'pillar-layout', 'hero-overlay'
]);

export const footerLayoutSchema = z.enum([
  'five-column-original', 'quad-grid', 'tiered-two-row', 'social-first',
  'newsletter-hero', 'legal-micro', 'multi-cta-card', 'accordion-stack',
  'sticky-support', 'minimalist-line', 'metrics-strip', 'partner-carousel',
  'card-resources', 'contact-panel', 'global-offices', 'faq-teaser'
]);

export const contentToneSchema = z.enum([
  'professional', 'friendly', 'premium', 'technical', 'minimalist',
  'energetic', 'trustworthy', 'innovative', 'educational', 'corporate',
  'crypto-native', 'warm', 'authoritative', 'casual', 'elite'
]);

export const heroTypeSchema = z.enum([
  'standard-centered', 'fullscreen-video', 'split-content', 'minimal-text',
  'data-dashboard', 'ticker-overlay', 'carousel-features'
]);

export const aboutLayoutFocusSchema = z.enum([
  'mission-first', 'values-first', 'team-first', 'timeline-led'
]);

export const teamPresentationSchema = z.enum(['grid', 'carousel', 'spotlight-list']);
export const valuesStyleSchema = z.enum(['cards', 'icons', 'minimal']);

export const marketsLayoutSchema = z.enum(['table', 'cards', 'accordion', 'tabs']);
export const marketGroupingSchema = z.enum(['by-type', 'by-region', 'popularity-weighted']);

export const contactLayoutSchema = z.enum(['form-first', 'info-first', 'split']);
export const formStructureSchema = z.enum(['single-column', 'two-column', 'stepper']);

export const faqLayoutSchema = z.enum(['accordion', 'tabs', 'cards']);
export const faqOrganizationSchema = z.enum(['categorised', 'flat', 'searchable']);
export const faqHighlightSchema = z.enum(['featured-top', 'inline', 'none']);

export const partnersLayoutSchema = z.enum(['logo-grid', 'spotlight-carousel', 'case-study', 'metrics-strip']);

// Page-specific config schemas
export const homeContentConfigSchema = z.object({
  // Hero Configuration
  heroType: heroTypeSchema,
  heroLayout: z.enum(['full-width', 'centered', 'split', 'minimal']),
  
  // Section Layouts
  featureLayout: z.enum(['grid', 'list', 'carousel', 'masonry']),
  benefitsLayout: z.enum(['list', 'grid', 'cards']),
  statsLayout: z.enum(['grid', 'row', 'carousel']),
  ctaStyle: z.enum(['prominent', 'subtle', 'inline']),
  imageStyle: z.enum(['full-bleed', 'contained', 'rounded', 'overlapping']),
  
  // Optional Sections (REQUIRED - all must be defined)
  showFeatures: z.boolean(),
  showBenefits: z.boolean(),
  showStats: z.boolean(),
  showCta: z.boolean(),
  
  // Item Count Overrides
  featureCount: z.union([z.literal(3), z.literal(4), z.literal(6)]),
  benefitsCount: z.union([z.literal(3), z.literal(4), z.literal(6)]),
  statsCount: z.union([z.literal(3), z.literal(4)]),
  
  // Unique Modules (REQUIRED - all must be defined)
  includeTestimonials: z.boolean(),
  includePartnerLogos: z.boolean(),
  includeLiveTicker: z.boolean(),
  includeComplianceBadges: z.boolean(),
  
  // Section Ordering (must be non-empty array)
  sectionOrder: z.array(z.enum([
    'hero', 'features', 'benefits', 'stats', 'cta', 
    'testimonials', 'partners', 'compliance'
  ])).min(1, 'sectionOrder must have at least one section'),
});

export const aboutContentConfigSchema = z.object({
  layout: aboutLayoutFocusSchema,
  teamPresentation: teamPresentationSchema,
  valuesStyle: valuesStyleSchema,
  showTimeline: z.boolean(),
  showMission: z.boolean(),
  showValues: z.boolean(),
  showTeam: z.boolean(),
  teamMemberCount: z.union([z.literal(4), z.literal(6), z.literal(8), z.literal(12)]),
});

export const marketsContentConfigSchema = z.object({
  layout: marketsLayoutSchema,
  grouping: marketGroupingSchema,
  showCharts: z.boolean(),
  showSpread: z.boolean(),
  showLeverage: z.boolean(),
  compactView: z.boolean(),
});

export const contactContentConfigSchema = z.object({
  layout: contactLayoutSchema,
  formStructure: formStructureSchema,
  showMap: z.boolean(),
  showOffices: z.boolean(),
  showSocial: z.boolean(),
  showHours: z.boolean(),
});

export const faqContentConfigSchema = z.object({
  layout: faqLayoutSchema,
  organization: faqOrganizationSchema,
  highlight: faqHighlightSchema,
  showSearch: z.boolean(),
  showCategories: z.boolean(),
  categoryCount: z.union([z.literal(4), z.literal(6), z.literal(8)]),
});

export const partnersContentConfigSchema = z.object({
  layout: partnersLayoutSchema,
  showLogos: z.boolean(),
  showTestimonials: z.boolean(),
  showCaseStudies: z.boolean(),
  partnerCount: z.union([z.literal(6), z.literal(9), z.literal(12)]),
});

// Main variant config schema
export const variantConfigSchema = z.object({
  id: z.string().min(1, 'Variant ID cannot be empty'),
  name: z.string().min(1, 'Variant name cannot be empty'),
  category: z.enum(['professional', 'modern', 'crypto', 'warm', 'specialized']),
  description: z.string().min(1, 'Variant description cannot be empty'),
  
  structure: z.object({
    navigationLayout: navigationLayoutSchema,
    footerLayout: footerLayoutSchema,
    contentTone: contentToneSchema,
  }),
  
  layout: z.object({
    density: layoutDensitySchema,
    maxWidth: z.enum(['1200px', '1400px', '1600px', 'full']),
    sidebarStyle: z.enum(['compact', 'standard', 'wide', 'none']),
    gridColumns: z.union([z.literal(2), z.literal(3), z.literal(4)]),
  }),
  
  typography: z.object({
    size: typographySizeSchema,
    headingScale: z.number().positive(),
    bodySpacing: z.enum(['tight', 'normal', 'relaxed']),
    fontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']),
  }),
  
  visual: z.object({
    cardStyle: cardStyleSchema,
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl']),
    shadows: z.enum(['none', 'subtle', 'medium', 'strong']),
    borders: z.enum(['none', 'subtle', 'visible', 'prominent']),
  }),
  
  animations: z.object({
    style: animationStyleSchema,
    duration: z.number().positive(),
    pageTransition: z.string(),
    heroEntry: z.string(),
    cardHover: z.string(),
    buttonHover: z.string(),
  }),
  
  pages: z.object({
    home: homeContentConfigSchema,
    about: aboutContentConfigSchema,
    markets: marketsContentConfigSchema,
    contact: contactContentConfigSchema,
    faq: faqContentConfigSchema,
    partners: partnersContentConfigSchema,
  }),
  
  // Legacy content field (for backward compatibility)
  content: homeContentConfigSchema,
  
  assets: z.object({
    heroImage: z.string().min(1),
    backgroundPattern: z.string().optional(),
    iconSet: z.enum(['outlined', 'filled', 'duotone']),
  }),
});

export type ValidatedVariantConfig = z.infer<typeof variantConfigSchema>;

/**
 * Validates a single variant configuration
 * @throws ZodError if validation fails with detailed error messages
 */
export function validateVariantConfig(variantId: string, config: unknown): ValidatedVariantConfig {
  try {
    return variantConfigSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.errors.map(err => 
        `  - ${err.path.join('.')}: ${err.message}`
      ).join('\n');
      throw new Error(
        `Variant config validation failed for "${variantId}":\n${issues}`
      );
    }
    throw error;
  }
}

/**
 * Validates all variant configurations in a record
 * @returns Map of variant IDs to validation results (true if valid, error message if invalid)
 */
export function validateAllVariants(
  variants: Record<string, unknown>
): Map<string, true | string> {
  const results = new Map<string, true | string>();
  
  for (const [variantId, config] of Object.entries(variants)) {
    try {
      validateVariantConfig(variantId, config);
      results.set(variantId, true);
    } catch (error) {
      results.set(variantId, error instanceof Error ? error.message : String(error));
    }
  }
  
  return results;
}

/**
 * Validates variants and throws on first error (strict mode)
 * Use this for preflight checks where any invalid config should halt execution
 */
export function strictValidateAllVariants(variants: Record<string, unknown>): void {
  for (const [variantId, config] of Object.entries(variants)) {
    validateVariantConfig(variantId, config);
  }
}
