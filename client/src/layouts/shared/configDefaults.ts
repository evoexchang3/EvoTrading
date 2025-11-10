/**
 * Configuration Defaults for Page-Specific Content
 * Provides base configurations that variants can override
 */

import type {
  PartnersContentConfig,
  CompanyContentConfig,
  EducationContentConfig,
  LegalContentConfig,
  CustomerInfoContentConfig,
  MarketInfoContentConfig,
  CompanySubpageContentConfig,
} from './variantConfig';

// Default Partners Page Configuration
export const defaultPartnersConfig: PartnersContentConfig = {
  layout: 'logo-grid',
  heroStyle: 'standard',
  showBenefits: true,
  showCommission: true,
  showLogos: true,
  showTestimonials: false,
  showCaseStudies: true,
  showHowItWorks: true,
  showCTA: true,
  partnerCount: 9,
  sectionOrder: ['hero', 'benefits', 'commission', 'logos', 'howItWorks', 'cta'],
};

// Default Company Page Configuration
export const defaultCompanyConfig: CompanyContentConfig = {
  layout: 'mission-led',
  showMission: true,
  showValues: true,
  showTeam: true,
  showTimeline: false,
  showLocations: true,
  showCTA: true,
};

// Default Education Page Configuration
export const defaultEducationConfig: EducationContentConfig = {
  layout: 'course-grid',
  showBeginner: true,
  showAdvanced: true,
  showResources: true,
  showGlossary: true,
  courseCount: 4,
};

// Default Legal Page Configuration
export const defaultLegalConfig: LegalContentConfig = {
  layout: 'single-column',
  showTableOfContents: true,
  showLastUpdated: true,
  showRelatedDocs: true,
  sectionStyle: 'headings',
};

// Default Customer Info Page Configuration
export const defaultCustomerInfoConfig: CustomerInfoContentConfig = {
  layout: 'comparison-table',
  showComparison: true,
  showFAQ: true,
  showCTA: true,
  detailLevel: 'detailed',
};

// Default Market Info Page Configuration
export const defaultMarketInfoConfig: MarketInfoContentConfig = {
  layout: 'educational',
  showCharts: true,
  showExamples: true,
  showRelatedTopics: true,
  contentDepth: 'comprehensive',
};

// Default Company Subpage Configuration
export const defaultCompanySubpageConfig: CompanySubpageContentConfig = {
  layout: 'document-style',
  showMetrics: true,
  showDocuments: true,
  showCTA: true,
};

// Typed factory builders for page configs
export function buildPartnersConfig(overrides: Partial<PartnersContentConfig> = {}): PartnersContentConfig {
  return { ...defaultPartnersConfig, ...overrides };
}

export function buildCompanyConfig(overrides: Partial<CompanyContentConfig> = {}): CompanyContentConfig {
  return { ...defaultCompanyConfig, ...overrides };
}

export function buildEducationConfig(overrides: Partial<EducationContentConfig> = {}): EducationContentConfig {
  return { ...defaultEducationConfig, ...overrides };
}

export function buildLegalConfig(overrides: Partial<LegalContentConfig> = {}): LegalContentConfig {
  return { ...defaultLegalConfig, ...overrides };
}

export function buildCustomerInfoConfig(overrides: Partial<CustomerInfoContentConfig> = {}): CustomerInfoContentConfig {
  return { ...defaultCustomerInfoConfig, ...overrides };
}

export function buildMarketInfoConfig(overrides: Partial<MarketInfoContentConfig> = {}): MarketInfoContentConfig {
  return { ...defaultMarketInfoConfig, ...overrides };
}

export function buildCompanySubpageConfig(overrides: Partial<CompanySubpageContentConfig> = {}): CompanySubpageContentConfig {
  return { ...defaultCompanySubpageConfig, ...overrides };
}

// Configuration merge helper (legacy - prefer typed builders above)
export function mergePageConfig<T extends Record<string, any>>(
  base: T,
  overrides: Partial<T>
): T {
  return { ...base, ...overrides };
}
