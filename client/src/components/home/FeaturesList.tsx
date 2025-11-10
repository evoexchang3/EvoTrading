import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { 
  Zap, 
  Shield, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Globe2,
  LucideIcon
} from "lucide-react";

interface FeaturesProps {
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}

/**
 * List-based features layout
 * More traditional, vertical layout
 * Used by: navy-institutional, financial-times
 */
export function FeaturesList({ title, subtitle, items }: FeaturesProps) {
  const classes = useVariantClasses();

  // Canonical icon order (matches variant content structure)
  const iconMap: LucideIcon[] = [Zap, Shield, Clock, DollarSign, BarChart3, Globe2];

  const features = items.map((item, index) => ({
    icon: iconMap[index % iconMap.length],
    title: item.title,
    description: item.description,
  }));

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container}>
        <div className={`text-center mb-12 ${classes.spacing('element')}`}>
          <h2 className={`${classes.textSize('heading')} font-bold`} data-testid="text-features-title">
            {title}
          </h2>
          <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto`}>
            {subtitle}
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
