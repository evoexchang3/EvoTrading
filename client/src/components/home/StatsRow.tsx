import { useVariantClasses } from "@/layouts/shared/useVariant";

interface StatsProps {
  currencyPairs: string;
  cryptoAssets: string;
  customerSupport: string;
  avgExecutionTime: string;
}

/**
 * Row-based stats layout (1x4 horizontal)
 * Compact, minimal presentation
 * Used by: navy-institutional, arctic-minimal, emerald-trader
 */
export function StatsRow({ currencyPairs, cryptoAssets, customerSupport, avgExecutionTime }: StatsProps) {
  const classes = useVariantClasses();

  const stats = [
    { label: currencyPairs, value: '50+' },
    { label: cryptoAssets, value: '100+' },
    { label: customerSupport, value: '24/7' },
    { label: avgExecutionTime, value: '0.01s' },
  ];

  return (
    <section className={`${classes.spacing('section')}`}>
      <div className={classes.container}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-4"
              data-testid={`item-stat-${index}`}
            >
              <div 
                className={`${classes.textSize('heading')} text-3xl sm:text-4xl font-bold mb-2 text-primary`}
                data-testid={`text-stat-value-${index}`}
              >
                {stat.value}
              </div>
              <div 
                className={`${classes.textSize('body')} text-muted-foreground`}
                data-testid={`text-stat-label-${index}`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
