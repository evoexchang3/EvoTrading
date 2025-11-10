import { Button } from "@/components/ui/button";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  headline: string;
  description: string;
  buttonText: string;
  learnMore: string;
}

/**
 * Inline CTA layout
 * Compact, horizontal call-to-action
 * Used by: bloomberg-dark, emerald-trader, financial-times
 */
export function CTAInline({ headline, description, buttonText }: CTAProps) {
  const classes = useVariantClasses();

  return (
    <section className={`${classes.spacing('section')} bg-muted/30`}>
      <div className={classes.container}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-md border">
          <div className="flex-1 text-center sm:text-left">
            <h3 
              className={`${classes.textSize('heading')} text-xl sm:text-2xl font-bold mb-2`}
              data-testid="text-cta-headline"
            >
              {headline}
            </h3>
            <p 
              className={`${classes.textSize('body')} text-muted-foreground`}
              data-testid="text-cta-description"
            >
              {description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button 
              size="lg"
              className="w-full sm:w-auto"
              data-testid="button-cta-primary"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
