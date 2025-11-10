import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
 * Grid-based features layout with scroll-triggered animations
 * Modern 2025 design with staggered entrance effects
 */
export function FeaturesGrid({ title, subtitle, items }: FeaturesProps) {
  const classes = useVariantClasses();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

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
    <section className={`${classes.spacing('section')} bg-muted/30 relative overflow-hidden`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className={`${classes.container} relative`} ref={ref}>
        <div className={`text-center ${classes.spacing('element')} mb-8 sm:mb-12`}>
          <h2 
            className={`${classes.textSize('heading')} font-bold mb-3 sm:mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} 
            data-testid="text-features-title"
          >
            {title}
          </h2>
          <p 
            className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            {subtitle}
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
