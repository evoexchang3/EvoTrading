import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  headline: string;
  subheadline: string;
  cta: string;
}

/**
 * Minimal hero layout - Modern 2025 Design
 * Used by: modern-light, carbon-sleek, financial-times, midnight-premium
 * Features: Clean, text-focused design with subtle gradients
 */
export function HeroMinimal({ headline, subheadline, cta }: HeroProps) {
  const { t } = useLanguage();
  const classes = useVariantClasses();

  return (
    <section className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] flex items-center py-12 sm:py-0">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
      
      <div className={`${classes.container} relative z-10 ${classes.spacing('section')}`}>
        <div className={`max-w-3xl ${classes.spacing('element')} ${classes.animation('hero')}`}>
          <h1 
            className={`${classes.textSize('hero')} font-bold tracking-tight mb-4 sm:mb-6 animate-fade-in-up`} 
            data-testid="text-hero-title"
          >
            {headline}
          </h1>
          
          <p 
            className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mb-6 sm:mb-8 leading-relaxed animate-fade-in-up`}
            style={{ animationDelay: '150ms' }}
            data-testid="text-hero-subtitle"
          >
            {subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto" data-testid="button-hero-register">
                {cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-hero-login">
                {t('home.hero.loginButton')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
