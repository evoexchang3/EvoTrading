/**
 * Accordion Stack Footer
 * Mobile-first accordion sections - space-efficient
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function AccordionStackFooter({ variant }: FooterProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const sections = [
    {
      title: 'Markets',
      links: [
        { label: 'Forex', href: '/markets#forex' },
        { label: 'Crypto', href: '/markets#crypto' },
        { label: 'Commodities', href: '/markets#commodities' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: t('footer.aboutUs'), href: '/about' },
        { label: t('footer.company'), href: '/company' },
        { label: t('footer.contact'), href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
        { label: t('footer.termsOfService'), href: '/legal/terms' },
        { label: t('footer.riskDisclosure'), href: '/legal/risk-disclosure' },
      ],
    },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section, index) => (
            <AccordionItem key={section.title} value={`item-${index}`}>
              <AccordionTrigger data-testid={`footer-accordion-${section.title.toLowerCase()}`}>
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pb-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        <span className="text-sm text-muted-foreground hover:text-foreground">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {companyName}</p>
        </div>
      </div>
    </footer>
  );
}
