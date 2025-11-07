/**
 * Navigation Variant Registry
 * Dynamically loads navigation components based on variant configuration
 */

import { NavigationLayout } from '@/layouts/shared/variantConfig';
import { ComponentType } from 'react';

// Import all navigation variants
import CompactTopNav from './CompactTopNav';
import WideSplitNav from './WideSplitNav';
import CenteredDoubleNav from './CenteredDoubleNav';
import TickerBarNav from './TickerBarNav';
import VerticalSidebarNav from './VerticalSidebarNav';
import HamburgerMobileNav from './HamburgerMobileNav';
import MegaMenuNav from './MegaMenuNav';
import IconRailNav from './IconRailNav';
import GlassmorphicNav from './GlassmorphicNav';
import MinimalTextNav from './MinimalTextNav';
import BreadcrumbHybridNav from './BreadcrumbHybridNav';
import RibbonSecondaryNav from './RibbonSecondaryNav';
import BottomMobileNav from './BottomMobileNav';
import PillarLayoutNav from './PillarLayoutNav';
import HeroOverlayNav from './HeroOverlayNav';

export interface NavigationProps {
  variant?: string;
}

// Navigation component registry
const navigationRegistry: Record<NavigationLayout, ComponentType<NavigationProps>> = {
  'compact-top': CompactTopNav,
  'wide-split': WideSplitNav,
  'centered-double': CenteredDoubleNav,
  'ticker-bar': TickerBarNav,
  'vertical-sidebar': VerticalSidebarNav,
  'hamburger-mobile': HamburgerMobileNav,
  'mega-menu': MegaMenuNav,
  'icon-rail': IconRailNav,
  'glassmorphic': GlassmorphicNav,
  'minimal-text': MinimalTextNav,
  'breadcrumb-hybrid': BreadcrumbHybridNav,
  'ribbon-secondary': RibbonSecondaryNav,
  'bottom-mobile': BottomMobileNav,
  'pillar-layout': PillarLayoutNav,
  'hero-overlay': HeroOverlayNav,
};

/**
 * Get navigation component for a specific layout type
 */
export function getNavigationComponent(layout: NavigationLayout): ComponentType<NavigationProps> {
  return navigationRegistry[layout] || CompactTopNav;
}

export default navigationRegistry;
