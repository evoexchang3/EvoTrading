import { DollarSign, Users, TrendingUp, Globe } from 'lucide-react';
import { useLanguage } from "@/hooks/useLanguage";
import {
  VariantSection,
  VariantContainer,
  VariantText,
} from "@/components/variant";

export function MetricsStripLayout() {
  const { t } = useLanguage();

  // Partner program metrics - in a real implementation, these would come from config/content
  const metrics = [
    {
      icon: DollarSign,
      value: '$10M+',
      label: t('partners.metrics.totalPaid') || 'Total Paid to Partners',
    },
    {
      icon: Users,
      value: '1,000+',
      label: t('partners.metrics.activePartners') || 'Active Partners',
    },
    {
      icon: TrendingUp,
      value: '45%',
      label: t('partners.metrics.avgCommission') || 'Avg Commission Rate',
    },
    {
      icon: Globe,
      value: '50+',
      label: t('partners.metrics.countries') || 'Countries Represented',
    },
  ];

  return (
    <VariantSection background="muted">
      <VariantContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-background hover-elevate"
                data-testid={`metric-${index}`}
              >
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold mb-2">{metric.value}</div>
                <VariantText className="text-muted-foreground text-sm">{metric.label}</VariantText>
              </div>
            );
          })}
        </div>
      </VariantContainer>
    </VariantSection>
  );
}
