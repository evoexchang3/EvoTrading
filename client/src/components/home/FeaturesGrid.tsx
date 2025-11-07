import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Zap, 
  Shield, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Globe2
} from "lucide-react";

/**
 * Grid-based features layout with scroll-triggered animations
 * Modern 2025 design with staggered entrance effects
 */
export function FeaturesGrid() {
  const { t } = useLanguage();
  const classes = useVariantClasses();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      icon: Zap,
      title: t('home.features.fastExecution.title'),
      description: t('home.features.fastExecution.description'),
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      icon: Shield,
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description'),
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      icon: Clock,
      title: t('home.features.24/7Trading.title'),
      description: t('home.features.24/7Trading.description'),
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: DollarSign,
      title: t('home.features.transparentFees.title'),
      description: t('home.features.transparentFees.description'),
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: BarChart3,
      title: t('home.features.advancedTools.title'),
      description: t('home.features.advancedTools.description'),
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      icon: Globe2,
      title: t('home.features.globalMarkets.title'),
      description: t('home.features.globalMarkets.description'),
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
    },
  ];

  return (
    <section className={`${classes.spacing('section')} bg-muted/30 relative overflow-hidden`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className={`${classes.container} relative`} ref={ref}>
        <div className={`text-center ${classes.spacing('element')} mb-8 sm:mb-12`}>
          <h2 
            className={`${classes.textSize('heading')} font-bold mb-3 sm:mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} 
            data-testid="text-features-title"
          >
            {t('home.features.title')}
          </h2>
          <p 
            className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            {t('home.features.subtitle')}
          </p>
        </div>

        <div className={classes.grid}>
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`${classes.card} ${classes.hover('card')} group transition-all duration-300 touch-manipulation active:scale-[0.98] ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${200 + index * 100}ms` }}
              data-testid={`card-feature-${index}`}
            >
              <CardHeader className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <div className={`inline-flex p-2.5 sm:p-3 rounded-lg ${feature.bg} transition-transform group-hover:scale-110 duration-300`}>
                    <feature.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${feature.color} transition-transform group-hover:rotate-12 duration-300`} />
                  </div>
                </div>
                <CardTitle className={classes.textSize('heading')}>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <CardDescription className={`${classes.textSize('body')} leading-relaxed`}>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
