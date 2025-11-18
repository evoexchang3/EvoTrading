/**
 * Contact Panel Footer
 * Large contact info, small nav - support-focused
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { getPhoneUri } from '@/lib/phoneUtils';

export default function ContactPanelFooter({ variant, companyName, supportEmail, language, t }: FooterProps) {

  const contactMethods = [
    { icon: Mail, label: t('footer.emailSupport'), value: supportEmail, href: `mailto:${supportEmail}`, testId: 'footer-contact-email' },
    { icon: Phone, label: t('footer.phoneSupport'), value: '+1 (555) 123-4567', href: getPhoneUri('+1 (555) 123-4567'), testId: 'footer-contact-phone' },
    { icon: MessageCircle, label: t('footer.liveChat'), value: t('footer.available247'), href: '#', testId: 'footer-contact-chat' },
  ];

  const quickLinks = [
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
  ];

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">{t('footer.getInTouch')}</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a key={method.label} href={method.href} data-testid={method.testId}>
                    <div className="p-4 rounded-lg border hover-elevate">
                      <Icon className="w-6 h-6 mb-2 text-primary" />
                      <div className="font-semibold text-sm mb-1">{method.label}</div>
                      <div className="text-xs text-muted-foreground">{method.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} data-testid={`footer-link-${link.href.split('/').pop()}`}>
                    <span className="text-sm text-muted-foreground hover:text-foreground">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {companyName}</p>
        </div>
      </div>
    </footer>
  );
}
