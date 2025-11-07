import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { Lock, Shield, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";

/**
 * Full-width hero layout - Modern 2025 Design
 * Used by: bloomberg-dark, crypto-neon, emerald-trader
 * Features: Animated gradient backgrounds, floating elements, modern visual depth
 */
export function HeroFullWidth() {
  const { t } = useLanguage();
  const classes = useVariantClasses();

  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5"></div>
      
      {/* Floating orbs for depth */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className={`${classes.container} relative z-10 ${classes.spacing('section')}`}>
        <div className={`mx-auto max-w-4xl ${classes.spacing('element')} ${classes.animation('hero')}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{t('home.hero.badge') || 'Trusted by 50,000+ Traders Worldwide'}</span>
          </div>

          <h1 
            className={`${classes.textSize('hero')} font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in-up`} 
            data-testid="text-hero-title"
          >
            {t('home.hero.title')}
          </h1>
          
          <p 
            className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mb-8 leading-relaxed animate-fade-in-up`}
            style={{ animationDelay: '200ms' }}
            data-testid="text-hero-subtitle"
          >
            {t('home.hero.subtitle')}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Link href="/register">
              <Button size="lg" className="group" data-testid="button-hero-register">
                {t('home.hero.registerButton')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="group" data-testid="button-hero-login">
                {t('home.hero.loginButton')}
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators with modern design */}
          <div className="flex flex-wrap gap-6 pt-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground group">
              <div className="p-2 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                <Lock className="h-4 w-4 text-green-500" />
              </div>
              <span>{t('home.hero.sslSecured')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground group">
              <div className="p-2 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                <Shield className="h-4 w-4 text-blue-500" />
              </div>
              <span>{t('home.hero.regulated')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground group">
              <div className="p-2 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <span>{t('home.hero.compliant')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
