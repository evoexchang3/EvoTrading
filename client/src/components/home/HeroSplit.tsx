import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariant, useVariantClasses } from "@/layouts/shared/useVariant";
import { Lock, Shield, CheckCircle2, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HeroProps {
  headline: string;
  subheadline: string;
  cta: string;
}

/**
 * Split hero layout with image/visual on one side - Modern 2025 Design
 * Used by: charcoal-pro, nordic-clean, terracotta-warm, sunset-trading, sapphire-finance
 * Features: Asymmetric layout with floating card elements for modern depth
 */
export function HeroSplit({ headline, subheadline, cta }: HeroProps) {
  const { t } = useLanguage();
  const variant = useVariant();
  const classes = useVariantClasses();

  return (
    <section className="relative overflow-hidden min-h-[500px] sm:min-h-[650px] flex items-center py-12 sm:py-0">
      <div className={`${classes.container} ${classes.spacing('section')}`}>
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${classes.animation('hero')}`}>
          {/* Content */}
          <div className={`${classes.spacing('element')} animate-fade-in-up`}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium">{t('home.hero.badge') || 'Advanced Trading'}</span>
            </div>

            <h1 className={`${classes.textSize('hero')} font-bold tracking-tight mb-4 sm:mb-6`} data-testid="text-hero-title">
              {headline}
            </h1>
            
            <p 
              className={`${classes.textSize('body')} text-muted-foreground leading-relaxed mb-6 sm:mb-8`} 
              data-testid="text-hero-subtitle"
            >
              {subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
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
            
            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-muted-foreground group">
                <div className="p-1.5 sm:p-2 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                  <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
                </div>
                <span>{t('home.hero.sslSecured')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground group">
                <div className="p-1.5 sm:p-2 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
                </div>
                <span>{t('home.hero.regulated')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground group">
                <div className="p-1.5 sm:p-2 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500" />
                </div>
                <span>{t('home.hero.compliant')}</span>
              </div>
            </div>
          </div>

          {/* Visual Side - Modern floating cards */}
          <div className="relative min-h-[300px] lg:h-[500px] order-first lg:order-last animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {/* Background gradient orb */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl blur-3xl"></div>
            
            {/* Floating stat cards */}
            <div className="relative h-full flex flex-col justify-center gap-3 sm:gap-4">
              <Card className="animate-float hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-full bg-green-500/10">
                      <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Market Performance</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-500">+24.5%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-float hover:shadow-lg transition-shadow ml-6 sm:ml-12" style={{ animationDelay: '200ms' }}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-full bg-blue-500/10">
                      <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Active Trades</p>
                      <p className="text-xl sm:text-2xl font-bold">50,000+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
