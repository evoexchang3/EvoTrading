/**
 * FAQ Teaser Footer
 * Common questions + link to full FAQ - helpful and informative
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function FaqTeaserFooter({ variant }: FooterProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const faqs = [
    { question: 'How do I open a trading account?', answer: 'Click "Register" and complete the simple 3-step process.' },
    { question: 'What are the minimum deposit requirements?', answer: 'Minimum deposit varies by account type, starting from $100.' },
    { question: 'Is my money safe?', answer: 'Client funds are held in segregated accounts with tier-1 banks.' },
  ];

  const legalLinks = [
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>

          <div className="space-y-4 mb-8">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 border rounded-lg" data-testid={`footer-faq-${index + 1}`}>
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <Link href="/company/faq">
              <Button variant="outline" data-testid="footer-button-view-all-faq">
                View All FAQ
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="pt-6 border-t">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              {legalLinks.map((link) => (
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
      </div>
    </footer>
  );
}
