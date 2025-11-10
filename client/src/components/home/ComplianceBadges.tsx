import { Card, CardContent } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Shield, Lock, CheckCircle2, Award } from "lucide-react";

/**
 * Compliance Badges section showing regulatory certifications
 * Used by: bloomberg-dark, charcoal-pro, arctic-minimal, financial-times, sunset-trading, sapphire-finance, minimalist-corporate, emerald-trader
 */
export function ComplianceBadges() {
  const classes = useVariantClasses();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const badges = [
    {
      icon: Shield,
      title: "FCA Regulated",
      description: "UK Financial Conduct Authority",
    },
    {
      icon: Lock,
      title: "CySEC Licensed",
      description: "Cyprus Securities & Exchange",
    },
    {
      icon: CheckCircle2,
      title: "ASIC Authorized",
      description: "Australian Securities & Investments",
    },
    {
      icon: Award,
      title: "ISO Certified",
      description: "ISO 27001 Information Security",
    },
  ];

  return (
    <section className={`${classes.spacing('section')}`}>
      <div className={classes.container} ref={ref}>
        <div className={`text-center ${classes.spacing('element')} mb-12`}>
          <h2 className={`${classes.textSize('heading')} font-bold mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} data-testid="text-compliance-title">
            Regulated & Secure
          </h2>
          <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            Your funds protected by world-class regulatory oversight
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <Card 
                key={index}
                className={`${classes.card} text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
                data-testid={`card-compliance-${index}`}
              >
                <CardContent className="p-6">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
