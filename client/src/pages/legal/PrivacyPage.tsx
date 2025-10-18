import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <LandingLayout>
      <SEO
        title={t('legal.privacy.seo.title')}
        description={t('legal.privacy.seo.description')}
        keywords={t('legal.privacy.seo.keywords')}
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="text-privacy-title">
              {t('legal.privacy.title')}
            </h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                {t('legal.privacy.lastUpdated')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section1.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section1.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section2.title')}</h2>
                <h3 className="text-xl font-semibold mb-3">{t('legal.privacy.section2.personalInfo.title')}</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.privacy.section2.personalInfo.item1')}</li>
                  <li>{t('legal.privacy.section2.personalInfo.item2')}</li>
                  <li>{t('legal.privacy.section2.personalInfo.item3')}</li>
                  <li>{t('legal.privacy.section2.personalInfo.item4')}</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">{t('legal.privacy.section2.usageInfo.title')}</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.privacy.section2.usageInfo.item1')}</li>
                  <li>{t('legal.privacy.section2.usageInfo.item2')}</li>
                  <li>{t('legal.privacy.section2.usageInfo.item3')}</li>
                  <li>{t('legal.privacy.section2.usageInfo.item4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section3.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section3.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.privacy.section3.use1')}</li>
                  <li>{t('legal.privacy.section3.use2')}</li>
                  <li>{t('legal.privacy.section3.use3')}</li>
                  <li>{t('legal.privacy.section3.use4')}</li>
                  <li>{t('legal.privacy.section3.use5')}</li>
                  <li>{t('legal.privacy.section3.use6')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section4.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section4.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.privacy.section4.share1')}</li>
                  <li>{t('legal.privacy.section4.share2')}</li>
                  <li>{t('legal.privacy.section4.share3')}</li>
                  <li>{t('legal.privacy.section4.share4')}</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section4.noSell')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section5.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section5.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.privacy.section5.measure1')}</li>
                  <li>{t('legal.privacy.section5.measure2')}</li>
                  <li>{t('legal.privacy.section5.measure3')}</li>
                  <li>{t('legal.privacy.section5.measure4')}</li>
                  <li>{t('legal.privacy.section5.measure5')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section6.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section6.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.privacy.section6.right1')}</li>
                  <li>{t('legal.privacy.section6.right2')}</li>
                  <li>{t('legal.privacy.section6.right3')}</li>
                  <li>{t('legal.privacy.section6.right4')}</li>
                  <li>{t('legal.privacy.section6.right5')}</li>
                  <li>{t('legal.privacy.section6.right6')}</li>
                  <li>{t('legal.privacy.section6.right7')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section7.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section7.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section8.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section8.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section9.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section9.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section10.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.privacy.section10.content')}
                  <br />
                  <strong>{t('legal.privacy.section10.email')}</strong>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
