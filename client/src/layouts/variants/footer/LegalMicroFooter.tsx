/**
 * Legal Micro Footer
 * Single row, essential legal links only - minimal and clean
 */

import { Link } from 'wouter';
import { FooterProps } from './index';

export default function LegalMicroFooter({ variant, companyName, supportEmail, language, t }: FooterProps) {

  const legalLinks = [
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
    { label: t('footer.riskDisclosure'), href: '/legal/risk' },
    { label: t('footer.contact'), href: '/contact' },
  ];

  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">&copy; {new Date().getFullYear()} {companyName}</span>
          {legalLinks.map((link, index) => (
            <>
              <span key={`sep-${index}`}>•</span>
              <Link key={link.href} href={link.href} data-testid={`footer-link-${link.href.split('/').pop()}`}>
                <span className="hover:text-foreground">{link.label}</span>
              </Link>
            </>
          ))}
        </div>
      </div>
    </footer>
  );
}
