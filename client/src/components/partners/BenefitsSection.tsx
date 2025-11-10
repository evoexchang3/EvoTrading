import { DollarSign, TrendingUp, Award, Users } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  VariantSection,
  VariantContainer,
  VariantHeading,
  VariantText,
  VariantCard,
  VariantGrid,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/variant";

export function BenefitsSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: DollarSign,
      title: t('partners.benefits.competitiveCommissions.title'),
      description: t('partners.benefits.competitiveCommissions.description'),
    },
    {
      icon: TrendingUp,
      title: t('partners.benefits.recurringIncome.title'),
      description: t('partners.benefits.recurringIncome.description'),
    },
    {
      icon: Award,
      title: t('partners.benefits.marketingSupport.title'),
      description: t('partners.benefits.marketingSupport.description'),
    },
    {
      icon: Users,
      title: t('partners.benefits.dedicatedManager.title'),
      description: t('partners.benefits.dedicatedManager.description'),
    },
  ];

  return (
    <VariantSection animation="page">
      <VariantContainer>
        <div className="text-center mb-12">
          <VariantHeading level="heading" data-testid="text-benefits-title">
            {t('partners.benefits.title')}
          </VariantHeading>
          <VariantText className="text-muted-foreground max-w-2xl mx-auto">
            {t('partners.benefits.subtitle')}
          </VariantText>
        </div>

        <VariantGrid>
          {benefits.map((benefit, index) => (
            <VariantCard key={index} data-testid={`card-benefit-${index}`}>
              <CardHeader>
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{benefit.description}</CardDescription>
              </CardContent>
            </VariantCard>
          ))}
        </VariantGrid>
      </VariantContainer>
    </VariantSection>
  );
}
