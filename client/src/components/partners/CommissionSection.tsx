import { useLanguage } from "@/hooks/useLanguage";
import {
  VariantSection,
  VariantContainer,
  VariantHeading,
  VariantText,
  VariantCard,
  VariantGrid,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/variant";

export function CommissionSection() {
  const { t } = useLanguage();

  return (
    <VariantSection background="muted">
      <VariantContainer>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <VariantHeading level="heading" data-testid="text-commission-title">
              {t('partners.commission.title')}
            </VariantHeading>
            <VariantText className="text-muted-foreground">
              {t('partners.commission.subtitle')}
            </VariantText>
          </div>

          <VariantGrid>
            <VariantCard>
              <CardHeader className="text-center space-y-4">
                <CardTitle>{t('partners.commission.starter.title')}</CardTitle>
                <div>
                  <p className="text-4xl font-bold text-primary">{t('partners.commission.starter.percentage')}</p>
                  <VariantText className="text-muted-foreground mt-2">{t('partners.commission.starter.label')}</VariantText>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <VariantText className="text-muted-foreground">
                  {t('partners.commission.starter.description')}
                </VariantText>
              </CardContent>
            </VariantCard>

            <VariantCard className="border-primary">
              <CardHeader className="text-center space-y-4">
                <CardTitle>{t('partners.commission.professional.title')}</CardTitle>
                <div>
                  <p className="text-4xl font-bold text-primary">{t('partners.commission.professional.percentage')}</p>
                  <VariantText className="text-muted-foreground mt-2">{t('partners.commission.professional.label')}</VariantText>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <VariantText className="text-muted-foreground">
                  {t('partners.commission.professional.description')}
                </VariantText>
              </CardContent>
            </VariantCard>

            <VariantCard>
              <CardHeader className="text-center space-y-4">
                <CardTitle>{t('partners.commission.elite.title')}</CardTitle>
                <div>
                  <p className="text-4xl font-bold text-primary">{t('partners.commission.elite.percentage')}</p>
                  <VariantText className="text-muted-foreground mt-2">{t('partners.commission.elite.label')}</VariantText>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <VariantText className="text-muted-foreground">
                  {t('partners.commission.elite.description')}
                </VariantText>
              </CardContent>
            </VariantCard>
          </VariantGrid>
        </div>
      </VariantContainer>
    </VariantSection>
  );
}
