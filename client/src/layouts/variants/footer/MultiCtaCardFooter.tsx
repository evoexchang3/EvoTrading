/**
 * Multi CTA Card Footer
 * 3 columns + featured CTA card - action-oriented
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { Button } from '@/components/ui/button';
import { VariantCard, CardHeader, CardTitle, CardContent } from '@/components/variant';

export default function MultiCtaCardFooter({ variant, companyName, supportEmail, language, t }: FooterProps) {

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.sectionMarkets')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/markets#forex"><span className="hover:text-foreground">{t('footer.forex')}</span></Link></li>
              <li><Link href="/markets#crypto"><span className="hover:text-foreground">{t('footer.crypto')}</span></Link></li>
              <li><Link href="/markets#commodities"><span className="hover:text-foreground">{t('footer.commodities')}</span></Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.sectionCompany')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" data-testid="footer-link-about"><span className="hover:text-foreground">{t('footer.aboutUs')}</span></Link></li>
              <li><Link href="/company" data-testid="footer-link-company"><span className="hover:text-foreground">{t('footer.company')}</span></Link></li>
              <li><Link href="/contact" data-testid="footer-link-contact"><span className="hover:text-foreground">{t('footer.contact')}</span></Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.sectionLegal')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/legal/privacy"><span className="hover:text-foreground">{t('footer.privacyPolicy')}</span></Link></li>
              <li><Link href="/legal/terms"><span className="hover:text-foreground">{t('footer.termsOfService')}</span></Link></li>
            </ul>
          </div>

          {/* CTA Card */}
          <VariantCard className="hover-elevate">
            <CardHeader>
              <CardTitle className="text-lg">Start Trading Today</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Join thousands of traders worldwide</p>
              <Link href="/auth/register">
                <Button className="w-full" data-testid="footer-button-cta">Open Account</Button>
              </Link>
            </CardContent>
          </VariantCard>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {companyName}</p>
        </div>
      </div>
    </footer>
  );
}
