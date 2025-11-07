import { LandingLayout } from "@/components/LandingLayout";
import { AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantHeading, VariantText } from "@/components/variant";
import { VariantProseContent } from "@/components/variant/VariantProseContent";

export default function RiskPage() {
  const { t } = useLanguage();

  return (
    <LandingLayout>
      <SEO
        title={t('legal.risk.seo.title')}
        description={t('legal.risk.seo.description')}
        keywords={t('legal.risk.seo.keywords')}
      />
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <AlertTriangle className="h-10 w-10 text-destructive flex-shrink-0" />
              <div>
                <VariantHeading level="hero" as="h1" className="mb-2" data-testid="text-risk-title">
                  {t('legal.risk.title')}
                </VariantHeading>
                <VariantText className="text-muted-foreground">
                  {t('legal.risk.subtitle')}
                </VariantText>
              </div>
            </div>

            <VariantProseContent>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.generalWarning.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.generalWarning.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.leverage.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.leverage.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.risk.leverage.point1')}</li>
                  <li>{t('legal.risk.leverage.point2')}</li>
                  <li>{t('legal.risk.leverage.point3')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.marketVolatility.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.marketVolatility.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.risk.marketVolatility.point1')}</li>
                  <li>{t('legal.risk.marketVolatility.point2')}</li>
                  <li>{t('legal.risk.marketVolatility.point3')}</li>
                  <li>{t('legal.risk.marketVolatility.point4')}</li>
                  <li>{t('legal.risk.marketVolatility.point5')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.cryptocurrency.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.cryptocurrency.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.risk.cryptocurrency.point1')}</li>
                  <li>{t('legal.risk.cryptocurrency.point2')}</li>
                  <li>{t('legal.risk.cryptocurrency.point3')}</li>
                  <li>{t('legal.risk.cryptocurrency.point4')}</li>
                  <li>{t('legal.risk.cryptocurrency.point5')}</li>
                  <li>{t('legal.risk.cryptocurrency.point6')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.forex.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.forex.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.risk.forex.point1')}</li>
                  <li>{t('legal.risk.forex.point2')}</li>
                  <li>{t('legal.risk.forex.point3')}</li>
                  <li>{t('legal.risk.forex.point4')}</li>
                  <li>{t('legal.risk.forex.point5')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.commodity.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.commodity.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.risk.commodity.point1')}</li>
                  <li>{t('legal.risk.commodity.point2')}</li>
                  <li>{t('legal.risk.commodity.point3')}</li>
                  <li>{t('legal.risk.commodity.point4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.technology.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.technology.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.risk.technology.point1')}</li>
                  <li>{t('legal.risk.technology.point2')}</li>
                  <li>{t('legal.risk.technology.point3')}</li>
                  <li>{t('legal.risk.technology.point4')}</li>
                  <li>{t('legal.risk.technology.point5')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.overnightWeekend.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.overnightWeekend.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.risk.overnightWeekend.point1')}</li>
                  <li>{t('legal.risk.overnightWeekend.point2')}</li>
                  <li>{t('legal.risk.overnightWeekend.point3')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.pastPerformance.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.pastPerformance.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.riskManagement.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.riskManagement.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.risk.riskManagement.point1')}</li>
                  <li>{t('legal.risk.riskManagement.point2')}</li>
                  <li>{t('legal.risk.riskManagement.point3')}</li>
                  <li>{t('legal.risk.riskManagement.point4')}</li>
                  <li>{t('legal.risk.riskManagement.point5')}</li>
                  <li>{t('legal.risk.riskManagement.point6')}</li>
                  <li>{t('legal.risk.riskManagement.point7')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.professionalAdvice.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.professionalAdvice.content')}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>{t('legal.risk.professionalAdvice.point1')}</li>
                  <li>{t('legal.risk.professionalAdvice.point2')}</li>
                  <li>{t('legal.risk.professionalAdvice.point3')}</li>
                  <li>{t('legal.risk.professionalAdvice.point4')}</li>
                </ul>
              </section>

              <section className="mb-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.risk.importantNotice.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('legal.risk.importantNotice.content')}
                </p>
              </section>
            </VariantProseContent>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
