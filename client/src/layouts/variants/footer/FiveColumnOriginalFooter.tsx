/**
 * Five Column Original Footer
 * The true original platform footer design with 5 comprehensive columns
 * Information | Customer | Company | Trust & Security | Support
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { TrendingUp } from 'lucide-react';

export default function FiveColumnOriginalFooter({ variant, companyName, supportEmail, language, t }: FooterProps) {

  const footerSections = [
    {
      key: 'information',
      title: t('footer.sectionInformation'),
      links: [
        { key: 'technical-analysis', label: t('footer.technicalAnalysis'), href: '/learn/resources#technical-analysis' },
        { key: 'fundamental-analysis', label: t('footer.fundamentalAnalysis'), href: '/learn/resources#fundamental-analysis' },
        { key: 'trading-signals', label: t('footer.tradingSignals'), href: '/tools/signals' },
        { key: 'market-heatmap', label: t('footer.marketHeatmap'), href: '/markets/heatmap' },
      ],
    },
    {
      key: 'customer',
      title: t('footer.sectionCustomer'),
      links: [
        { key: 'account-types', label: t('footer.accountTypes'), href: '/customer/accounts' },
        { key: 'payment-methods', label: t('footer.paymentMethods'), href: '/customer/funding' },
        { key: 'verification', label: t('footer.verification'), href: '/customer/verification' },
        { key: 'trading-advice', label: t('footer.tradingAdvice'), href: '/learn' },
      ],
    },
    {
      key: 'company',
      title: t('footer.sectionCompany'),
      links: [
        { key: 'about-us', label: t('footer.aboutUs'), href: '/about' },
        { key: 'contact', label: t('footer.contact'), href: '/contact' },
        { key: 'legal', label: t('footer.legal'), href: '/legal' },
        { key: 'rate-table', label: t('footer.rateTable'), href: '/customer/accounts#rates' },
      ],
    },
    {
      key: 'trust-security',
      title: t('footer.sectionTrustSecurity'),
      links: [
        { key: 'regulatory-licenses', label: t('footer.regulatoryLicenses'), href: '/company/regulatory' },
        { key: 'safety-of-funds', label: t('footer.safetyOfFunds'), href: '/company/regulatory#safety' },
        { key: 'security-data-protection', label: t('footer.securityDataProtection'), href: '/legal/privacy' },
        { key: 'platform-status', label: t('footer.platformStatus'), href: '/platform/status' },
        { key: 'complaints-disputes', label: t('footer.complaintsDisputes'), href: '/company/complaints' },
      ],
    },
    {
      key: 'support',
      title: t('footer.sectionSupport'),
      links: [
        { key: 'faq', label: t('footer.faq'), href: '/faq' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Brand Section - Outside the grid to avoid layout conflicts */}
        <div className="mb-12">
          <Link href="/">
            <span className="flex items-center gap-2 text-xl font-bold mb-4 hover:opacity-80 transition-opacity cursor-pointer" data-testid="footer-brand">
              <TrendingUp className="h-6 w-6" />
              {t('footer.tradingPlatform')}
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-md">
            {t('footer.platformDescription')}
          </p>
        </div>

        {/* Five Information Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {footerSections.map((section) => (
            <div key={section.key}>
              <h3 className="font-semibold mb-4" data-testid={`footer-heading-${section.key}`}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} data-testid={`footer-link-${link.key}`}>
                      <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Support Contact Info */}
              {section.key === 'support' && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground" data-testid="footer-support-email">{supportEmail}</p>
                  <p className="text-sm font-medium" data-testid="footer-support-247">{t('footer.support247')}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {companyName}. {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              {t('footer.sslSecured')}
            </span>
            <span className="text-muted-foreground">{t('footer.gdprCompliant')}</span>
            <span className="text-muted-foreground">{t('footer.amlKycVerified')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
