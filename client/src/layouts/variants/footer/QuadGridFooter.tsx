/**
 * Quad Grid Footer
 * 4 columns, legal/compliance focused - professional and comprehensive
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function QuadGridFooter({ variant }: FooterProps) {
  const { getBranding } = useSiteConfig();
  const { t, language } = useLanguage();
  const { companyName, supportEmail } = getBranding(language);

  const footerSections = [
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
    {
      title: 'Compliance',
      links: [
        { label: 'Regulatory', href: '/company/regulatory' },
        { label: 'Licenses', href: '/company/regulatory' },
        { label: 'Complaints', href: '/company/complaints' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/contact' },
        { label: 'FAQ', href: '/company/faq' },
        { label: 'Documents', href: '/customer/verification' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4" data-testid={`footer-heading-${section.title.toLowerCase()}`}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      <span className="text-sm text-muted-foreground hover:text-foreground">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
