/**
 * Sticky Support Footer
 * Fixed bottom support/contact bar - always accessible
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone } from 'lucide-react';

export default function StickySupportFooter({ variant }: FooterProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const { companyName, supportEmail } = config.branding.languageOverrides[language] || config.branding;

  return (
    <>
      {/* Spacer for fixed footer */}
      <div className="h-16" />

      {/* Sticky Footer Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <span className="text-sm font-medium hidden sm:block">Need help? We're here 24/7</span>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" data-testid="footer-button-chat">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
              <Link href="/contact">
                <Button size="sm" variant="outline" data-testid="footer-button-contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </Link>
              <a href={`mailto:${supportEmail}`}>
                <Button size="sm" data-testid="footer-button-email">
                  <Phone className="w-4 h-4 mr-2" />
                  Support
                </Button>
              </a>
            </div>

            <span className="text-xs text-muted-foreground hidden md:block">
              &copy; {new Date().getFullYear()} {companyName}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
