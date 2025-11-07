/**
 * Newsletter Hero Footer
 * Email signup prominent, minimal links - conversion-focused
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export default function NewsletterHeroFooter({ variant }: FooterProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const legalLinks = [
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Hero */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="mb-4">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground">Get market insights and platform updates delivered to your inbox.</p>
          </div>

          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              data-testid="input-newsletter-email"
            />
            <Button data-testid="button-newsletter-subscribe">Subscribe</Button>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="pt-8 border-t text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`footer-link-${link.href.split('/').pop()}`}>
                <span className="hover:text-foreground">{link.label}</span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
