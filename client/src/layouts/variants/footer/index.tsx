/**
 * Footer Variant Registry
 * Dynamically loads footer components based on variant configuration
 */

import { FooterLayout } from '@/layouts/shared/variantConfig';
import { ComponentType } from 'react';

// Import all footer variants
import QuadGridFooter from './QuadGridFooter';
import TieredTwoRowFooter from './TieredTwoRowFooter';
import SocialFirstFooter from './SocialFirstFooter';
import NewsletterHeroFooter from './NewsletterHeroFooter';
import LegalMicroFooter from './LegalMicroFooter';
import MultiCtaCardFooter from './MultiCtaCardFooter';
import AccordionStackFooter from './AccordionStackFooter';
import StickySupportFooter from './StickySupportFooter';
import MinimalistLineFooter from './MinimalistLineFooter';
import MetricsStripFooter from './MetricsStripFooter';
import PartnerCarouselFooter from './PartnerCarouselFooter';
import CardResourcesFooter from './CardResourcesFooter';
import ContactPanelFooter from './ContactPanelFooter';
import GlobalOfficesFooter from './GlobalOfficesFooter';
import FaqTeaserFooter from './FaqTeaserFooter';

export interface FooterProps {
  variant?: string;
}

// Footer component registry
const footerRegistry: Record<FooterLayout, ComponentType<FooterProps>> = {
  'quad-grid': QuadGridFooter,
  'tiered-two-row': TieredTwoRowFooter,
  'social-first': SocialFirstFooter,
  'newsletter-hero': NewsletterHeroFooter,
  'legal-micro': LegalMicroFooter,
  'multi-cta-card': MultiCtaCardFooter,
  'accordion-stack': AccordionStackFooter,
  'sticky-support': StickySupportFooter,
  'minimalist-line': MinimalistLineFooter,
  'metrics-strip': MetricsStripFooter,
  'partner-carousel': PartnerCarouselFooter,
  'card-resources': CardResourcesFooter,
  'contact-panel': ContactPanelFooter,
  'global-offices': GlobalOfficesFooter,
  'faq-teaser': FaqTeaserFooter,
};

/**
 * Get footer component for a specific layout type
 */
export function getFooterComponent(layout: FooterLayout): ComponentType<FooterProps> {
  return footerRegistry[layout] || QuadGridFooter;
}

export default footerRegistry;
