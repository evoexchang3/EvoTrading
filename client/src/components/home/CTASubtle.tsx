import { Button } from "@/components/ui/button";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface CTAProps {
  headline: string;
  description: string;
  buttonText: string;
  learnMore: string;
}

/**
 * Subtle CTA layout
 * Understated, minimal call-to-action
 * Used by: navy-institutional, arctic-minimal, nordic-clean
 */
export function CTASubtle({ headline, description, buttonText, learnMore }: CTAProps) {
  const classes = useVariantClasses();

  return (
    <section className={`${classes.spacing('section')}`}>
      <div className={classes.container}>
        <div className="max-w-2xl mx-auto text-center py-8">
          <h2 
            className={`${classes.textSize('heading')} text-2xl sm:text-3xl font-semibold mb-4`}
            data-testid="text-cta-headline"
          >
            {headline}
          </h2>
          <p 
            className={`${classes.textSize('body')} text-muted-foreground mb-6`}
            data-testid="text-cta-description"
          >
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              variant="default"
              className="w-full sm:w-auto"
              data-testid="button-cta-primary"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/education">
              <Button 
                variant="ghost"
                className="w-full sm:w-auto"
                data-testid="button-cta-secondary"
              >
                {learnMore}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
