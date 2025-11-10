/**
 * Variant Override Mappings
 * Data-driven overrides for all 16 variants × 6 new page types
 * Each variant gets unique configurations based on its persona/category
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

export interface PageOverrides {
  partners?: Partial<PartnersContentConfig>;
  company?: Partial<CompanyContentConfig>;
  education?: Partial<EducationContentConfig>;
  legal?: Partial<LegalContentConfig>;
  customerInfo?: Partial<CustomerInfoContentConfig>;
  marketInfo?: Partial<MarketInfoContentConfig>;
  companySubpage?: Partial<CompanySubpageContentConfig>;
}

export const variantOverrides: Record<string, PageOverrides> = {
  // Group 0: Original (baseline)
  'original': {
    partners: {
      layout: 'logo-grid',
      heroStyle: 'standard',
      partnerCount: 12,
      sectionOrder: ['hero', 'benefits', 'commission', 'logos', 'howItWorks', 'cta'],
    },
    company: {
      layout: 'mission-led',
      showTimeline: false,
    },
    education: {
      layout: 'course-grid',
      courseCount: 4,
    },
    legal: {
      layout: 'single-column',
      sectionStyle: 'headings',
    },
    customerInfo: {
      layout: 'comparison-table',
      detailLevel: 'detailed',
    },
    marketInfo: {
      layout: 'educational',
      contentDepth: 'comprehensive',
    },
    companySubpage: {
      layout: 'document-style',
    },
  },

  // GROUP A: Professional/Institutional
  'bloomberg-dark': {
    partners: {
      layout: 'spotlight-carousel',
      heroStyle: 'minimal',
      partnerCount: 9,
      showTestimonials: true,
      showCaseStudies: false,
      sectionOrder: ['hero', 'logos', 'testimonials', 'commission', 'benefits', 'cta'],
    },
    company: {
      layout: 'values-led',
      showTimeline: true,
    },
    education: {
      layout: 'course-list',
      courseCount: 6,
      showGlossary: false,
    },
    legal: {
      layout: 'two-column',
      sectionStyle: 'numbered',
      showTableOfContents: false,
    },
    customerInfo: {
      layout: 'faq-led',
      detailLevel: 'concise',
      showComparison: false,
    },
    marketInfo: {
      layout: 'data-driven',
      contentDepth: 'detailed',
      showRelatedTopics: false,
    },
    companySubpage: {
      layout: 'metrics-focused',
      showMetrics: true,
      showDocuments: false,
    },
  },

  'charcoal-pro': {
    partners: {
      layout: 'benefits-led',
      heroStyle: 'data-focused',
      partnerCount: 8,
      showHowItWorks: false,
      sectionOrder: ['hero', 'benefits', 'logos', 'commission', 'caseStudies', 'cta'],
    },
    company: {
      layout: 'team-led',
      showTimeline: false,
      showLocations: false,
    },
    education: {
      layout: 'pathway',
      courseCount: 5,
      showResources: false,
    },
    legal: {
      layout: 'accordion',
      sectionStyle: 'headings',
      showRelatedDocs: false,
    },
    customerInfo: {
      layout: 'benefit-cards',
      detailLevel: 'summary',
      showFAQ: false,
    },
    marketInfo: {
      layout: 'beginner-friendly',
      contentDepth: 'simplified',
      showExamples: false,
    },
    companySubpage: {
      layout: 'document-style',
      showCTA: false,
    },
  },

  'navy-institutional': {
    partners: {
      layout: 'case-studies',
      heroStyle: 'professional',
      partnerCount: 10,
      showLogos: false,
      sectionOrder: ['hero', 'caseStudies', 'benefits', 'commission', 'howItWorks', 'cta'],
    },
    company: {
      layout: 'timeline-led',
      showTimeline: true,
      showMission: false,
    },
    education: {
      layout: 'course-grid',
      courseCount: 4,
      showBeginner: false,
    },
    legal: {
      layout: 'single-column',
      sectionStyle: 'bullets',
      showLastUpdated: false,
    },
    customerInfo: {
      layout: 'comparison-table',
      detailLevel: 'detailed',
      showCTA: false,
    },
    marketInfo: {
      layout: 'educational',
      contentDepth: 'comprehensive',
      showCharts: false,
    },
    companySubpage: {
      layout: 'timeline-view',
      showDocuments: false,
    },
  },

  // GROUP B: Modern/Fintech
  'modern-light': {
    partners: {
      layout: 'logo-grid',
      heroStyle: 'gradient',
      partnerCount: 15,
      showBenefits: false,
      sectionOrder: ['hero', 'logos', 'commission', 'testimonials', 'howItWorks', 'cta'],
    },
    company: {
      layout: 'mission-led',
      showValues: false,
      showLocations: true,
    },
    education: {
      layout: 'course-list',
      courseCount: 6,
      showAdvanced: false,
    },
    legal: {
      layout: 'two-column',
      sectionStyle: 'headings',
    },
    customerInfo: {
      layout: 'faq-led',
      detailLevel: 'concise',
    },
    marketInfo: {
      layout: 'data-driven',
      contentDepth: 'detailed',
    },
    companySubpage: {
      layout: 'metrics-focused',
    },
  },

  'sapphire-finance': {
    partners: {
      layout: 'spotlight-carousel',
      heroStyle: 'tech-forward',
      partnerCount: 12,
      showCommission: false,
      sectionOrder: ['hero', 'benefits', 'logos', 'caseStudies', 'howItWorks', 'cta'],
    },
    company: {
      layout: 'values-led',
      showTeam: false,
    },
    education: {
      layout: 'pathway',
      courseCount: 5,
      showGlossary: false,
    },
    legal: {
      layout: 'accordion',
      sectionStyle: 'numbered',
    },
    customerInfo: {
      layout: 'benefit-cards',
      detailLevel: 'summary',
    },
    marketInfo: {
      layout: 'beginner-friendly',
      contentDepth: 'simplified',
    },
    companySubpage: {
      layout: 'document-style',
    },
  },

  'emerald-trader': {
    partners: {
      layout: 'benefits-led',
      heroStyle: 'modern',
      partnerCount: 9,
      showTestimonials: false,
      sectionOrder: ['hero', 'benefits', 'commission', 'logos', 'howItWorks', 'cta'],
    },
    company: {
      layout: 'team-led',
      showTimeline: true,
    },
    education: {
      layout: 'course-grid',
      courseCount: 4,
    },
    legal: {
      layout: 'single-column',
      sectionStyle: 'headings',
    },
    customerInfo: {
      layout: 'comparison-table',
      detailLevel: 'detailed',
    },
    marketInfo: {
      layout: 'educational',
      contentDepth: 'comprehensive',
    },
    companySubpage: {
      layout: 'timeline-view',
    },
  },

  'carbon-sleek': {
    partners: {
      layout: 'case-studies',
      heroStyle: 'sleek',
      partnerCount: 8,
      showHowItWorks: false,
      sectionOrder: ['hero', 'caseStudies', 'benefits', 'commission', 'logos', 'cta'],
    },
    company: {
      layout: 'timeline-led',
      showLocations: false,
    },
    education: {
      layout: 'course-list',
      courseCount: 6,
      showResources: false,
    },
    legal: {
      layout: 'two-column',
      sectionStyle: 'bullets',
    },
    customerInfo: {
      layout: 'faq-led',
      detailLevel: 'concise',
    },
    marketInfo: {
      layout: 'data-driven',
      contentDepth: 'detailed',
    },
    companySubpage: {
      layout: 'metrics-focused',
    },
  },

  // GROUP C: Crypto/Web3
  'crypto-neon': {
    partners: {
      layout: 'logo-grid',
      heroStyle: 'neon',
      partnerCount: 16,
      showCaseStudies: false,
      sectionOrder: ['hero', 'logos', 'benefits', 'commission', 'howItWorks', 'cta'],
    },
    company: {
      layout: 'mission-led',
      showMission: true,
      showValues: true,
    },
    education: {
      layout: 'pathway',
      courseCount: 5,
    },
    legal: {
      layout: 'accordion',
      sectionStyle: 'headings',
    },
    customerInfo: {
      layout: 'benefit-cards',
      detailLevel: 'summary',
    },
    marketInfo: {
      layout: 'beginner-friendly',
      contentDepth: 'simplified',
    },
    companySubpage: {
      layout: 'document-style',
    },
  },

  'midnight-premium': {
    partners: {
      layout: 'spotlight-carousel',
      heroStyle: 'vibrant',
      partnerCount: 10,
      showBenefits: false,
      sectionOrder: ['hero', 'testimonials', 'logos', 'commission', 'caseStudies', 'cta'],
    },
    company: {
      layout: 'values-led',
      showTimeline: false,
    },
    education: {
      layout: 'course-grid',
      courseCount: 4,
      showGlossary: false,
    },
    legal: {
      layout: 'single-column',
      sectionStyle: 'numbered',
    },
    customerInfo: {
      layout: 'comparison-table',
      detailLevel: 'detailed',
    },
    marketInfo: {
      layout: 'educational',
      contentDepth: 'comprehensive',
    },
    companySubpage: {
      layout: 'timeline-view',
    },
  },

  'financial-times': {
    partners: {
      layout: 'benefits-led',
      heroStyle: 'cyber',
      partnerCount: 12,
      showCommission: false,
      sectionOrder: ['hero', 'benefits', 'logos', 'caseStudies', 'howItWorks', 'cta'],
    },
    company: {
      layout: 'team-led',
      showLocations: true,
    },
    education: {
      layout: 'course-list',
      courseCount: 6,
    },
    legal: {
      layout: 'two-column',
      sectionStyle: 'headings',
    },
    customerInfo: {
      layout: 'faq-led',
      detailLevel: 'concise',
    },
    marketInfo: {
      layout: 'data-driven',
      contentDepth: 'detailed',
    },
    companySubpage: {
      layout: 'metrics-focused',
    },
  },

  'terracotta-warm': {
    partners: {
      layout: 'case-studies',
      heroStyle: 'electric',
      partnerCount: 9,
      showLogos: false,
      sectionOrder: ['hero', 'caseStudies', 'benefits', 'commission', 'howItWorks', 'cta'],
    },
    company: {
      layout: 'timeline-led',
      showMission: false,
    },
    education: {
      layout: 'pathway',
      courseCount: 5,
      showBeginner: false,
    },
    legal: {
      layout: 'accordion',
      sectionStyle: 'bullets',
    },
    customerInfo: {
      layout: 'benefit-cards',
      detailLevel: 'summary',
    },
    marketInfo: {
      layout: 'beginner-friendly',
      contentDepth: 'simplified',
    },
    companySubpage: {
      layout: 'document-style',
    },
  },

  'sunset-trading': {
    partners: {
      layout: 'metrics-strip',
      heroStyle: 'modern',
      partnerCount: 12,
      showTestimonials: true,
      showCaseStudies: false,
      sectionOrder: ['hero', 'logos', 'benefits', 'testimonials', 'commission', 'cta'],
    },
    company: {
      layout: 'mission-led',
      showTimeline: true,
      showLocations: false,
    },
    education: {
      layout: 'course-grid',
      courseCount: 4,
      showResources: false,
    },
    legal: {
      layout: 'single-column',
      sectionStyle: 'plain',
    },
    customerInfo: {
      layout: 'comparison-table',
      detailLevel: 'detailed',
      showFAQ: false,
    },
    marketInfo: {
      layout: 'educational',
      contentDepth: 'comprehensive',
      showCharts: false,
    },
    companySubpage: {
      layout: 'card-sections',
      showMetrics: false,
    },
  },

  // GROUP D: Minimalist
  'arctic-minimal': {
    partners: {
      layout: 'logo-grid',
      heroStyle: 'minimal',
      partnerCount: 6,
      showTestimonials: false,
      showCaseStudies: false,
      showHowItWorks: false,
      sectionOrder: ['hero', 'logos', 'benefits', 'commission', 'cta'],
    },
    company: {
      layout: 'mission-led',
      showLocations: false,
      showCTA: false,
    },
    education: {
      layout: 'course-grid',
      courseCount: 4,
      showResources: false,
    },
    legal: {
      layout: 'single-column',
      sectionStyle: 'headings',
      showRelatedDocs: false,
    },
    customerInfo: {
      layout: 'comparison-table',
      detailLevel: 'concise',
      showFAQ: false,
    },
    marketInfo: {
      layout: 'educational',
      contentDepth: 'simplified',
      showRelatedTopics: false,
    },
    companySubpage: {
      layout: 'document-style',
      showMetrics: false,
    },
  },

  'minimalist-corporate': {
    partners: {
      layout: 'spotlight-carousel',
      heroStyle: 'corporate',
      partnerCount: 8,
      showBenefits: false,
      showCommission: false,
      sectionOrder: ['hero', 'logos', 'caseStudies', 'cta'],
    },
    company: {
      layout: 'values-led',
      showTeam: false,
    },
    education: {
      layout: 'course-list',
      courseCount: 6,
      showGlossary: false,
    },
    legal: {
      layout: 'two-column',
      sectionStyle: 'numbered',
    },
    customerInfo: {
      layout: 'faq-led',
      detailLevel: 'summary',
    },
    marketInfo: {
      layout: 'data-driven',
      contentDepth: 'detailed',
    },
    companySubpage: {
      layout: 'timeline-view',
    },
  },

  'nordic-clean': {
    partners: {
      layout: 'benefits-led',
      heroStyle: 'clean',
      partnerCount: 10,
      showTestimonials: false,
      showHowItWorks: false,
      sectionOrder: ['hero', 'benefits', 'logos', 'commission', 'cta'],
    },
    company: {
      layout: 'team-led',
      showTimeline: false,
    },
    education: {
      layout: 'pathway',
      courseCount: 5,
    },
    legal: {
      layout: 'accordion',
      sectionStyle: 'headings',
    },
    customerInfo: {
      layout: 'benefit-cards',
      detailLevel: 'detailed',
    },
    marketInfo: {
      layout: 'beginner-friendly',
      contentDepth: 'comprehensive',
    },
    companySubpage: {
      layout: 'metrics-focused',
    },
  },
};
