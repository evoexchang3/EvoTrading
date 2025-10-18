import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <LandingLayout>
      <SEO
        title={t('legal.terms.seo.title')}
        description={t('legal.terms.seo.description')}
        keywords={t('legal.terms.seo.keywords')}
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="text-terms-title">
              {t('legal.terms.title')}
            </h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                {t('legal.terms.lastUpdated')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section1.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section1.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section2.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section2.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.terms.section2.requirement1')}</li>
                  <li>{t('legal.terms.section2.requirement2')}</li>
                  <li>{t('legal.terms.section2.requirement3')}</li>
                  <li>{t('legal.terms.section2.requirement4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section3.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section3.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section4.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section4.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.terms.section4.fee1')}</li>
                  <li>{t('legal.terms.section4.fee2')}</li>
                  <li>{t('legal.terms.section4.fee3')}</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section4.disclosure')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section5.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section5.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section6.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section6.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section7.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section7.intro')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.terms.section7.prohibition1')}</li>
                  <li>{t('legal.terms.section7.prohibition2')}</li>
                  <li>{t('legal.terms.section7.prohibition3')}</li>
                  <li>{t('legal.terms.section7.prohibition4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section8.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section8.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section9.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section9.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section10.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section10.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.section11.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.terms.section11.content')}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
