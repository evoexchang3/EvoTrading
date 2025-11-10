import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { CheckCircle2, Award, TrendingUp, Shield, Zap, Users } from "lucide-react";

interface BenefitsProps {
  title: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}

/**
 * Grid-based benefits layout  
 * Modern 2x2 or 3-column grid presentation
 * Used by: charcoal-pro, modern-light, sunset-trading
 */
export function BenefitsGrid({ title, items }: BenefitsProps) {
  const classes = useVariantClasses();

  // Icon mapping for visual variety
  const icons = [CheckCircle2, Award, TrendingUp, Shield, Zap, Users];

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container}>
        <div className={`text-center ${classes.spacing('element')} mb-8 sm:mb-12`}>
          <h2 
            className={`${classes.textSize('heading')} font-bold`} 
            data-testid="text-benefits-title"
          >
            {title}
          </h2>
        </div>

        <div className={classes.grid}>
          {items.map((benefit, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Card
                key={index}
                className={`${classes.card} ${classes.hover('card')} transition-all duration-300`}
                data-testid={`card-benefit-${index}`}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4">
                    <div className="inline-flex p-2.5 sm:p-3 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className={classes.textSize('heading')}>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className={`${classes.textSize('body')} text-muted-foreground leading-relaxed`}>
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
