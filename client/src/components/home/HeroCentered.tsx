import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { Lock, Shield, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

/**
 * Centered hero layout - Modern 2025 Design
 * Used by: navy-institutional, arctic-minimal, minimalist-corporate
 * Features: Clean, elegant center-aligned design with subtle animations
 */
export function HeroCentered() {
  const { t } = useLanguage();
  const classes = useVariantClasses();

  return (
    <section className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] flex items-center py-12 sm:py-0">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5"></div>
      
      {/* Centered floating orb - responsive sizing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className={`${classes.container} relative z-10 ${classes.spacing('section')}`}>
        <div className={`mx-auto max-w-4xl text-center ${classes.spacing('element')} ${classes.animation('hero')}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium">{t('home.hero.badge') || 'Professional Trading Platform'}</span>
          </div>

          <h1 
            className={`${classes.textSize('hero')} font-bold tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text animate-fade-in-up`} 
            data-testid="text-hero-title"
          >
            {t('home.hero.title')}
          </h1>
          
          <p 
            className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed animate-fade-in-up`}
            style={{ animationDelay: '200ms' }}
            data-testid="text-hero-subtitle"
          >
            {t('home.hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto" data-testid="button-hero-register">
                {t('home.hero.registerButton')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-hero-login">
                {t('home.hero.loginButton')}
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators with modern design */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-start sm:items-center gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground group">
              <div className="p-1.5 sm:p-2 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              </div>
              <span>{t('home.hero.sslSecured')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground group">
              <div className="p-1.5 sm:p-2 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              </div>
              <span>{t('home.hero.regulated')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground group">
              <div className="p-1.5 sm:p-2 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500" />
              </div>
              <span>{t('home.hero.compliant')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
