/**
 * Minimalist Line Footer
 * Copyright + 3-4 essential links - ultra clean
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MinimalistLineFooter({ variant }: FooterProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const links = [
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
    { label: t('footer.contact'), href: '/contact' },
  ];

  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
          <span className="text-muted-foreground">&copy; {new Date().getFullYear()} {companyName}</span>
          
          <div className="flex gap-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`footer-link-${link.href.split('/').pop()}`}>
                <span className="text-muted-foreground hover:text-foreground transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
