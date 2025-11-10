import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "wouter";

interface CTAProps {
  headline: string;
  description: string;
  buttonText: string;
  learnMore: string;
}

/**
 * Prominent CTA layout
 * Bold, eye-catching call-to-action with large buttons
 * Used by: original, charcoal-pro, modern-light, crypto-neon
 */
export function CTAProminent({ headline, description, buttonText, learnMore }: CTAProps) {
  const classes = useVariantClasses();

  return (
    <section className={`${classes.spacing('section')} bg-gradient-to-b from-muted/50 to-background`}>
      <div className={classes.container}>
        <Card className={`${classes.card} p-8 sm:p-12 text-center`}>
          <div className="max-w-3xl mx-auto">
            <h2 
              className={`${classes.textSize('heading')} text-3xl sm:text-4xl font-bold mb-4 sm:mb-6`}
              data-testid="text-cta-headline"
            >
              {headline}
            </h2>
            <p 
              className={`${classes.textSize('body')} text-muted-foreground mb-6 sm:mb-8 text-lg`}
              data-testid="text-cta-description"
            >
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
                data-testid="button-cta-primary"
              >
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/education">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  data-testid="button-cta-secondary"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {learnMore}
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
