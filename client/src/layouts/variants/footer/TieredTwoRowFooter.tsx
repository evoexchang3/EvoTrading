/**
 * Tiered Two-Row Footer
 * Important links top row, legal bottom - clean and organized
 */

import { Link } from 'wouter';
import { FooterProps } from './index';

export default function TieredTwoRowFooter({ variant, companyName, supportEmail, language, t }: FooterProps) {

  const mainLinks = [
    { label: t('footer.aboutUs'), href: '/about' },
    { label: t('footer.sectionMarkets'), href: '/markets' },
    { label: t('footer.company'), href: '/company' },
    { label: t('footer.contact'), href: '/contact' },
  ];

  const legalLinks = [
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
    { label: t('footer.riskDisclosure'), href: '/legal/risk' },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4">
        {/* Top Row - Main Links */}
        <div className="py-8 flex flex-wrap justify-center gap-6 border-b">
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`footer-link-${link.href.split('/').pop()}`}>
              <span className="text-sm font-medium hover:text-primary">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Bottom Row - Legal */}
        <div className="py-6 flex flex-wrap justify-center items-center gap-4 text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} {companyName}</span>
          <span>|</span>
          {legalLinks.map((link, index) => (
            <>
              <Link key={link.href} href={link.href} data-testid={`footer-legal-${link.href.split('/').pop()}`}>
                <span className="hover:text-foreground">{link.label}</span>
              </Link>
              {index < legalLinks.length - 1 && <span>|</span>}
            </>
          ))}
        </div>
      </div>
    </footer>
  );
}
