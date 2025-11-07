/**
 * Global Offices Footer
 * Office locations with map visual - international presence
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin } from 'lucide-react';

export default function GlobalOfficesFooter({ variant }: FooterProps) {
  const { getBranding } = useSiteConfig();
  const { t, language } = useLanguage();
  const { companyName, supportEmail } = getBranding(language);

  const offices = [
    { city: 'London', address: '123 Financial St, London EC2M 7PP, UK', testId: 'footer-office-london' },
    { city: 'New York', address: '456 Wall Street, New York, NY 10005, USA', testId: 'footer-office-newyork' },
    { city: 'Singapore', address: '789 Shenton Way, Singapore 068805', testId: 'footer-office-singapore' },
    { city: 'Dubai', address: '321 DIFC, Dubai, UAE', testId: 'footer-office-dubai' },
  ];

  const legalLinks = [
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-8 text-center">Our Global Presence</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {offices.map((office) => (
            <div key={office.city} className="p-4 border rounded-lg" data-testid={office.testId}>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">{office.city}</h4>
                  <p className="text-xs text-muted-foreground">{office.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`footer-link-${link.href.split('/').pop()}`}>
                <span className="text-sm text-muted-foreground hover:text-foreground">{link.label}</span>
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {companyName}. Offices worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
