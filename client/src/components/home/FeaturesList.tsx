import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { 
  Zap, 
  Shield, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Globe2
} from "lucide-react";

/**
 * List-based features layout
 * More traditional, vertical layout
 * Used by: navy-institutional, financial-times
 */
export function FeaturesList() {
  const { t } = useLanguage();
  const classes = useVariantClasses();

  const features = [
    {
      icon: Zap,
      title: t('home.features.fastExecution.title'),
      description: t('home.features.fastExecution.description'),
    },
    {
      icon: Shield,
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description'),
    },
    {
      icon: Clock,
      title: t('home.features.24/7Trading.title'),
      description: t('home.features.24/7Trading.description'),
    },
    {
      icon: DollarSign,
      title: t('home.features.transparentFees.title'),
      description: t('home.features.transparentFees.description'),
    },
    {
      icon: BarChart3,
      title: t('home.features.advancedTools.title'),
      description: t('home.features.advancedTools.description'),
    },
    {
      icon: Globe2,
      title: t('home.features.globalMarkets.title'),
      description: t('home.features.globalMarkets.description'),
    },
  ];

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container}>
        <div className={`text-center mb-12 ${classes.spacing('element')}`}>
          <h2 className={`${classes.textSize('heading')} font-bold`} data-testid="text-features-title">
            {t('home.features.title')}
          </h2>
          <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto`}>
            {t('home.features.subtitle')}
          </p>
        </div>

        <div className={`max-w-4xl mx-auto ${classes.spacing('element')}`}>
          {features.map((feature, index) => (
            <Card key={index} className={`${classes.card} ${classes.hover('card')} mb-4`} data-testid={`card-feature-${index}`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className={classes.textSize('heading')}>{feature.title}</CardTitle>
                    <CardDescription className={`${classes.textSize('body')} mt-2`}>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
