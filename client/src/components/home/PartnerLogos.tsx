import { useVariantClasses } from "@/layouts/shared/useVariant";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Partner Logos section showing trusted brands
 * Used by: modern-light, terracotta-warm, crypto-neon, sapphire-finance, midnight-premium
 */
export function PartnerLogos() {
  const classes = useVariantClasses();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const partners = [
    "TradingView",
    "MetaTrader",
    "Bloomberg",
    "Reuters",
    "Dow Jones",
    "FX Street",
  ];

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container} ref={ref}>
        <div className={`text-center ${classes.spacing('element')} mb-12`}>
          <h2 className={`${classes.textSize('heading')} font-bold mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} data-testid="text-partners-title">
            Trusted Technology Partners
          </h2>
          <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            Integrated with industry-leading platforms
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center p-4 rounded-lg bg-card hover-elevate transition-all ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
              data-testid={`logo-partner-${index}`}
            >
              <span className="text-lg font-semibold text-muted-foreground">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
