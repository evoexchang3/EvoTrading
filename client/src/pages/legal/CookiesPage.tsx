import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantHeading } from "@/components/variant";
import { VariantProseContent } from "@/components/variant/VariantProseContent";

export default function CookiesPage() {
  const { t } = useLanguage();

  return (
    <LandingLayout>
      <SEO
        title={t('legal.cookies.seo.title')}
        description={t('legal.cookies.seo.description')}
        keywords={t('legal.cookies.seo.keywords')}
      />
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-4xl mx-auto">
            <VariantHeading level="hero" as="h1" className="mb-8" data-testid="text-cookies-title">
              {t('legal.cookies.title')}
            </VariantHeading>
            <VariantProseContent>
              <p className="text-lg text-muted-foreground mb-8">
                {t('legal.cookies.lastUpdated')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section1.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section1.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section2.title')}</h2>
                
                <h3 className="text-xl font-semibold mb-3">{t('legal.cookies.section2.essential.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section2.essential.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.cookies.section2.essential.item1')}</li>
                  <li>{t('legal.cookies.section2.essential.item2')}</li>
                  <li>{t('legal.cookies.section2.essential.item3')}</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">{t('legal.cookies.section2.functional.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section2.functional.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.cookies.section2.functional.item1')}</li>
                  <li>{t('legal.cookies.section2.functional.item2')}</li>
                  <li>{t('legal.cookies.section2.functional.item3')}</li>
                  <li>{t('legal.cookies.section2.functional.item4')}</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">{t('legal.cookies.section2.analytics.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section2.analytics.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.cookies.section2.analytics.item1')}</li>
                  <li>{t('legal.cookies.section2.analytics.item2')}</li>
                  <li>{t('legal.cookies.section2.analytics.item3')}</li>
                  <li>{t('legal.cookies.section2.analytics.item4')}</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">{t('legal.cookies.section2.marketing.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section2.marketing.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.cookies.section2.marketing.item1')}</li>
                  <li>{t('legal.cookies.section2.marketing.item2')}</li>
                  <li>{t('legal.cookies.section2.marketing.item3')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section3.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section3.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li><strong>{t('legal.cookies.section3.analytics')}</strong> {t('legal.cookies.section3.analyticsValue')}</li>
                  <li><strong>{t('legal.cookies.section3.security')}</strong> {t('legal.cookies.section3.securityValue')}</li>
                  <li><strong>{t('legal.cookies.section3.support')}</strong> {t('legal.cookies.section3.supportValue')}</li>
                  <li><strong>{t('legal.cookies.section3.payments')}</strong> {t('legal.cookies.section3.paymentsValue')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section4.title')}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('legal.cookies.section4.session.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('legal.cookies.section4.session.content')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('legal.cookies.section4.persistent.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('legal.cookies.section4.persistent.content')}
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section5.title')}</h2>
                <h3 className="text-xl font-semibold mb-3">{t('legal.cookies.section5.browser.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section5.browser.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li><strong>{t('legal.cookies.section5.browser.chrome')}</strong> {t('legal.cookies.section5.browser.chromeValue')}</li>
                  <li><strong>{t('legal.cookies.section5.browser.firefox')}</strong> {t('legal.cookies.section5.browser.firefoxValue')}</li>
                  <li><strong>{t('legal.cookies.section5.browser.safari')}</strong> {t('legal.cookies.section5.browser.safariValue')}</li>
                  <li><strong>{t('legal.cookies.section5.browser.edge')}</strong> {t('legal.cookies.section5.browser.edgeValue')}</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">{t('legal.cookies.section5.consent.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section5.consent.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section6.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section6.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.cookies.section6.item1')}</li>
                  <li>{t('legal.cookies.section6.item2')}</li>
                  <li>{t('legal.cookies.section6.item3')}</li>
                  <li>{t('legal.cookies.section6.item4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section7.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section7.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section8.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section8.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section9.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.cookies.section9.content')}
                  <br />
                  <strong>{t('legal.cookies.section9.email')}</strong>
                </p>
              </section>
            </VariantProseContent>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
