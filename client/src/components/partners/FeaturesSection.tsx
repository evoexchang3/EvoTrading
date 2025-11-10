import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  VariantSection,
  VariantContainer,
  VariantHeading,
  VariantText,
  VariantCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/variant";

export function FeaturesSection() {
  const { t } = useLanguage();

  const programFeatures = [
    t('partners.features.realTimeTracking'),
    t('partners.features.multiplePayments'),
    t('partners.features.noMinimum'),
    t('partners.features.subAffiliate'),
    t('partners.features.customPages'),
    t('partners.features.regularPromotions'),
  ];

  return (
    <VariantSection>
      <VariantContainer>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <VariantHeading level="heading" className="mb-6" data-testid="text-features-title">
              {t('partners.features.title')}
            </VariantHeading>
            <VariantText className="text-muted-foreground mb-8">
              {t('partners.features.subtitle')}
            </VariantText>
            <ul className="space-y-4">
              {programFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`feature-${index}`}>
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <VariantText className="text-muted-foreground">{feature}</VariantText>
                </li>
              ))}
            </ul>
          </div>

          <VariantCard className="bg-primary text-primary-foreground">
            <CardHeader className="space-y-4">
              <CardTitle>{t('partners.howItWorks.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('partners.howItWorks.signUp.title')}</h3>
                    <VariantText className="opacity-90">{t('partners.howItWorks.signUp.description')}</VariantText>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('partners.howItWorks.promote.title')}</h3>
                    <VariantText className="opacity-90">{t('partners.howItWorks.promote.description')}</VariantText>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('partners.howItWorks.earn.title')}</h3>
                    <VariantText className="opacity-90">{t('partners.howItWorks.earn.description')}</VariantText>
                  </div>
                </div>
              </div>
            </CardContent>
          </VariantCard>
        </div>
      </VariantContainer>
    </VariantSection>
  );
}
