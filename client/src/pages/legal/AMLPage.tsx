import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

export default function AMLPage() {
  const { t } = useLanguage();

  return (
    <LandingLayout>
      <SEO
        title={t('legal.aml.seo.title')}
        description={t('legal.aml.seo.description')}
        keywords={t('legal.aml.seo.keywords')}
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="text-aml-title">
              {t('legal.aml.title')}
            </h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                {t('legal.aml.lastUpdated')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section1.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section1.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section2.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section2.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.aml.section2.compliance1')}</li>
                  <li>{t('legal.aml.section2.compliance2')}</li>
                  <li>{t('legal.aml.section2.compliance3')}</li>
                  <li>{t('legal.aml.section2.compliance4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section3.title')}</h2>
                <h3 className="text-xl font-semibold mb-3">{t('legal.aml.section3.identityVerification.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section3.identityVerification.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.aml.section3.identityVerification.requirement1')}</li>
                  <li>{t('legal.aml.section3.identityVerification.requirement2')}</li>
                  <li>{t('legal.aml.section3.identityVerification.requirement3')}</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">{t('legal.aml.section3.enhancedDueDiligence.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section3.enhancedDueDiligence.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.aml.section3.enhancedDueDiligence.requirement1')}</li>
                  <li>{t('legal.aml.section3.enhancedDueDiligence.requirement2')}</li>
                  <li>{t('legal.aml.section3.enhancedDueDiligence.requirement3')}</li>
                  <li>{t('legal.aml.section3.enhancedDueDiligence.requirement4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section4.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section4.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.aml.section4.activity1')}</li>
                  <li>{t('legal.aml.section4.activity2')}</li>
                  <li>{t('legal.aml.section4.activity3')}</li>
                  <li>{t('legal.aml.section4.activity4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section5.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section5.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section6.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section6.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.aml.section6.requirement1')}</li>
                  <li>{t('legal.aml.section6.requirement2')}</li>
                  <li>{t('legal.aml.section6.requirement3')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section7.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section7.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.aml.section7.screening1')}</li>
                  <li>{t('legal.aml.section7.screening2')}</li>
                  <li>{t('legal.aml.section7.screening3')}</li>
                  <li>{t('legal.aml.section7.screening4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section8.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section8.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.aml.section8.record1')}</li>
                  <li>{t('legal.aml.section8.record2')}</li>
                  <li>{t('legal.aml.section8.record3')}</li>
                  <li>{t('legal.aml.section8.record4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section9.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section9.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section10.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section10.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.aml.section11.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.aml.section11.content')}
                  <br />
                  <strong>{t('legal.aml.section11.email')}</strong>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
