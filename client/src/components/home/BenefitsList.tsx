import { useVariantClasses } from "@/layouts/shared/useVariant";
import { CheckCircle2 } from "lucide-react";

interface BenefitsProps {
  title: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}

/**
 * List-based benefits layout
 * Vertical list with checkmarks, traditional presentation
 * Used by: navy-institutional, financial-times, terracotta-warm
 */
export function BenefitsList({ title, items }: BenefitsProps) {
  const classes = useVariantClasses();

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

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((benefit, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 sm:p-6 rounded-md ${classes.hover('card')} transition-all duration-200`}
              data-testid={`item-benefit-${index}`}
            >
              <div className="flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className={`${classes.textSize('heading')} font-semibold mb-2`}>
                  {benefit.title}
                </h3>
                <p className={`${classes.textSize('body')} text-muted-foreground`}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
