/**
 * Accordion Stack Footer
 * Mobile-first accordion sections - space-efficient
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function AccordionStackFooter({ variant, companyName, supportEmail, language, t }: FooterProps) {

  const sections = [
    {
      title: t('footer.sectionMarkets'),
      links: [
        { label: t('footer.forex'), href: '/markets#forex' },
        { label: t('footer.crypto'), href: '/markets#crypto' },
        { label: t('footer.commodities'), href: '/markets#commodities' },
      ],
    },
    {
      title: t('footer.sectionCompany'),
      links: [
        { label: t('footer.aboutUs'), href: '/about' },
        { label: t('footer.company'), href: '/company' },
        { label: t('footer.contact'), href: '/contact' },
      ],
    },
    {
      title: t('footer.sectionLegal'),
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
