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
 * Grid-based features layout
 * Most common layout for features section
 */
export function FeaturesGrid() {
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
        <div className={`text-center ${classes.spacing('element')}`}>
          <h2 className={`${classes.textSize('heading')} font-bold`} data-testid="text-features-title">
            {t('home.features.title')}
          </h2>
          <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto`}>
            {t('home.features.subtitle')}
          </p>
        </div>

        <div className={classes.grid}>
          {features.map((feature, index) => (
            <Card key={index} className={`${classes.card} ${classes.hover('card')}`} data-testid={`card-feature-${index}`}>
              <CardHeader>
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className={classes.textSize('heading')}>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={classes.textSize('body')}>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
