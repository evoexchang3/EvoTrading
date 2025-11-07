/**
 * Partner Carousel Footer
 * Partner logos with rotating carousel - trust-building
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PartnerCarouselFooter({ variant }: FooterProps) {
  const { getBranding } = useSiteConfig();
  const { t, language } = useLanguage();
  const { companyName, supportEmail } = getBranding(language);

  // Mock partner logos
  const partners = ['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5'];

  const links = [
    { label: t('footer.aboutUs'), href: '/about' },
    { label: t('footer.contact'), href: '/contact' },
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Partner Logos */}
        <div className="mb-8">
          <h3 className="text-center text-sm font-semibold text-muted-foreground mb-6">TRUSTED BY</h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
            {partners.map((partner, index) => (
              <div
                key={partner}
                className="flex items-center justify-center p-4 bg-muted/30 rounded-lg"
                data-testid={`footer-partner-${index + 1}`}
              >
                <span className="text-sm text-muted-foreground">{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="pt-8 border-t">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`footer-link-${link.href.split('/').pop()}`}>
                <span className="text-sm text-muted-foreground hover:text-foreground">{link.label}</span>
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {companyName}
          </p>
        </div>
      </div>
    </footer>
  );
}
