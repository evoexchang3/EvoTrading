import { Card, CardContent } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { TrendingUp, Users, Globe, Zap } from "lucide-react";

interface StatsProps {
  currencyPairs: string;
  cryptoAssets: string;
  customerSupport: string;
  avgExecutionTime: string;
}

/**
 * Grid-based stats layout (2x2)
 * Balanced, modern presentation
 * Used by: bloomberg-dark, charcoal-pro, nordic-clean
 */
export function StatsGrid({ currencyPairs, cryptoAssets, customerSupport, avgExecutionTime }: StatsProps) {
  const classes = useVariantClasses();

  const stats = [
    { 
      label: currencyPairs, 
      value: '50+', 
      icon: TrendingUp,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      label: cryptoAssets, 
      value: '100+', 
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    { 
      label: customerSupport, 
      value: '24/7', 
      icon: Globe,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    { 
      label: avgExecutionTime, 
      value: '0.01s', 
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
  ];

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`${classes.card} ${classes.hover('card')} transition-all duration-300`}
              data-testid={`card-stat-${index}`}
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className={`p-3 sm:p-4 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`${classes.textSize('heading')} text-2xl sm:text-3xl font-bold mb-1`} data-testid={`text-stat-value-${index}`}>
                      {stat.value}
                    </div>
                    <div className={`${classes.textSize('body')} text-muted-foreground`} data-testid={`text-stat-label-${index}`}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
