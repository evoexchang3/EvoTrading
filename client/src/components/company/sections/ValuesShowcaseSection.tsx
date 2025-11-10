import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Shield, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ValuesShowcaseSection() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: t('company.values.item1.title'),
      description: t('company.values.item1.description'),
      metric: "99.9%",
      metricLabel: t('company.values.item1.metric'),
    },
    {
      icon: Award,
      title: t('company.values.item2.title'),
      description: t('company.values.item2.description'),
      metric: "10+",
      metricLabel: t('company.values.item2.metric'),
    },
    {
      icon: FileText,
      title: t('company.values.item3.title'),
      description: t('company.values.item3.description'),
      metric: "100%",
      metricLabel: t('company.values.item3.metric'),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background" aria-label="Values showcase">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="heading-values-showcase">
            {t('company.values.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-values-showcase-description">
            {t('company.values.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center" data-testid={`value-showcase-${index}`}>
                <CardContent className="p-8">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6">
                    <Icon className="w-12 h-12 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" data-testid={`value-showcase-title-${index}`}>
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid={`value-showcase-description-${index}`}>
                    {value.description}
                  </p>
                  <div className="pt-6 border-t">
                    <div className="text-3xl font-bold text-primary mb-1" data-testid={`value-showcase-metric-${index}`}>
                      {value.metric}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`value-showcase-metric-label-${index}`}>
                      {value.metricLabel}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
