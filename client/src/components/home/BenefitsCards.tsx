import { Card, CardContent } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { Sparkles, Trophy, Rocket, Star, Crown, Target } from "lucide-react";

interface BenefitsProps {
  title: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}

/**
 * Card-based benefits layout
 * Bold cards with large icons, premium presentation
 * Used by: arctic-minimal, nordic-clean, sapphire-finance
 */
export function BenefitsCards({ title, items }: BenefitsProps) {
  const classes = useVariantClasses();

  // Premium icon set for card-based layouts
  const icons = [Sparkles, Trophy, Rocket, Star, Crown, Target];
  const colorMap = ['text-blue-500', 'text-purple-500', 'text-emerald-500', 'text-amber-500', 'text-rose-500', 'text-cyan-500'];
  const bgMap = ['bg-blue-500/10', 'bg-purple-500/10', 'bg-emerald-500/10', 'bg-amber-500/10', 'bg-rose-500/10', 'bg-cyan-500/10'];

  return (
    <section className={`${classes.spacing('section')}`}>
      <div className={classes.container}>
        <div className={`text-center ${classes.spacing('element')} mb-8 sm:mb-12`}>
          <h2 
            className={`${classes.textSize('heading')} font-bold`} 
            data-testid="text-benefits-title"
          >
            {title}
          </h2>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${classes.spacing('element')}`}>
          {items.map((benefit, index) => {
            const Icon = icons[index % icons.length];
            const color = colorMap[index % colorMap.length];
            const bg = bgMap[index % bgMap.length];
            
            return (
              <Card
                key={index}
                className={`${classes.card} ${classes.hover('card')} transition-all duration-300 group`}
                data-testid={`card-benefit-${index}`}
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="mb-4 sm:mb-6">
                    <div className={`inline-flex p-4 sm:p-5 rounded-xl ${bg} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${color}`} />
                    </div>
                  </div>
                  <h3 className={`${classes.textSize('heading')} font-bold mb-3 sm:mb-4`}>
                    {benefit.title}
                  </h3>
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
