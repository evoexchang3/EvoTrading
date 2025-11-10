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
 * Masonry-based features layout with staggered heights
 * Pinterest-style layout for visual interest
 * Used by: carbon-sleek variant
 */
export function FeaturesMasonry({ title, subtitle, items }: FeaturesProps) {
  const classes = useVariantClasses();

  // Canonical icon order (matches variant content structure)
  const iconMap: LucideIcon[] = [Zap, Shield, Clock, DollarSign, BarChart3, Globe2];
  const colorMap = ['text-yellow-500', 'text-green-500', 'text-blue-500', 'text-emerald-500', 'text-purple-500', 'text-cyan-500'];
  const bgMap = ['bg-yellow-500/10', 'bg-green-500/10', 'bg-blue-500/10', 'bg-emerald-500/10', 'bg-purple-500/10', 'bg-cyan-500/10'];

  const features = items.map((item, index) => ({
    icon: iconMap[index % iconMap.length],
    title: item.title,
    description: item.description,
    color: colorMap[index % colorMap.length],
    bg: bgMap[index % bgMap.length],
  }));

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container}>
        <div className={`text-center ${classes.spacing('element')} mb-8 sm:mb-12`}>
          <h2 
            className={`${classes.textSize('heading')} font-bold mb-3 sm:mb-4`} 
            data-testid="text-features-title"
          >
            {title}
          </h2>
          <p 
            className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto`}
          >
            {subtitle}
          </p>
        </div>

        {/* Masonry Grid using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`${classes.card} ${classes.hover('card')} mb-4 break-inside-avoid group transition-all duration-300`}
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
