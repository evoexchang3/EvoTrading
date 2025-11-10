import type { ReactNode } from 'react';

export interface SectionConfig {
  id: string;
  component: ReactNode;
  enabled: boolean;
}

export interface SectionRegistry {
  [key: string]: (props: any) => ReactNode;
}

/**
 * Generic Section Renderer
 * Renders sections in the specified order, respecting enable/disable flags
 * 
 * @param sections - Array of section configurations with id, component, and enabled flag
 * @param sectionOrder - Ordered array of section IDs to render
 * @returns Rendered sections in the specified order
 */
export function renderSections(
  sections: SectionConfig[],
  sectionOrder: string[]
): ReactNode[] {
  const sectionMap = new Map(sections.map(s => [s.id, s]));
  
  return sectionOrder
    .map(sectionId => sectionMap.get(sectionId))
    .filter((section): section is SectionConfig => 
      section !== undefined && section.enabled
    )
    .map((section, index) => (
      <div key={`${section.id}-${index}`}>
        {section.component}
      </div>
    ));
}

/**
 * Create a section component with standardized props
 */
export function createSection(
  id: string,
  Component: (props: any) => ReactNode,
  props: any,
  enabled: boolean = true
): SectionConfig {
  return {
    id,
    component: <Component {...props} />,
    enabled,
  };
}

/**
 * Layout Dispatcher Helper
 * Maps layout type to appropriate component from registry
 */
export function dispatchLayout<T extends string>(
  layoutType: T,
  registry: Record<T, (props: any) => ReactNode>,
  props: any,
  fallback?: (props: any) => ReactNode
): ReactNode {
  const LayoutComponent = registry[layoutType] || fallback;
  if (!LayoutComponent) {
    console.warn(`No component found for layout type: ${layoutType}`);
    return null;
  }
  return <LayoutComponent {...props} />;
}
