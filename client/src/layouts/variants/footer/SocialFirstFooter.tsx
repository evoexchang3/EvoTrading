/**
 * Social First Footer
 * Large social icons, minimal text - modern and social-focused
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function SocialFirstFooter({ variant, companyName, supportEmail, language, t }: FooterProps) {

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', testId: 'social-facebook' },
    { icon: Twitter, href: '#', label: 'Twitter', testId: 'social-twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', testId: 'social-linkedin' },
    { icon: Instagram, href: '#', label: 'Instagram', testId: 'social-instagram' },
    { icon: Youtube, href: '#', label: 'YouTube', testId: 'social-youtube' },
  ];

  const essentialLinks = [
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
  ];

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Large Social Icons */}
          <div className="flex gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-4 rounded-full bg-background hover-elevate"
                  data-testid={social.testId}
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* Minimal Links */}
          <div className="flex gap-4 text-sm text-muted-foreground">
            {essentialLinks.map((link, index) => (
              <>
                <Link key={link.href} href={link.href} data-testid={`footer-link-${link.href.split('/').pop()}`}>
                  <span className="hover:text-foreground">{link.label}</span>
                </Link>
                {index < essentialLinks.length - 1 && <span>•</span>}
              </>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {companyName}
          </p>
        </div>
      </div>
    </footer>
  );
}
