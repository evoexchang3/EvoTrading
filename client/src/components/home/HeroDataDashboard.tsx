import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { TrendingUp, TrendingDown, Activity, ArrowRight } from "lucide-react";

interface HeroProps {
  headline: string;
  subheadline: string;
  cta: string;
}

/**
 * Data Dashboard hero layout - Modern 2025 Design
 * Features: Live metrics and charts integrated into hero
 * Used by: midnight-premium
 */
export function HeroDataDashboard({ headline, subheadline, cta }: HeroProps) {
  const { t } = useLanguage();
  const classes = useVariantClasses();

  return (
    <section className="relative overflow-hidden min-h-[600px] sm:min-h-[700px] flex items-center py-12 sm:py-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className={`${classes.container} relative z-10 ${classes.spacing('section')}`}>
        <div className={`grid lg:grid-cols-2 gap-8 items-center ${classes.animation('hero')}`}>
          {/* Content */}
          <div className={`${classes.spacing('element')} animate-fade-in-up`}>
            <h1 className={`${classes.textSize('hero')} font-bold tracking-tight mb-4 sm:mb-6`} data-testid="text-hero-title">
              {headline}
            </h1>
            
            <p className={`${classes.textSize('body')} text-muted-foreground leading-relaxed mb-6 sm:mb-8`} data-testid="text-hero-subtitle">
              {subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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

          {/* Live Data Cards */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Card className={`${classes.card} hover-elevate`} data-testid="card-metric-1">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm text-muted-foreground">EUR/USD</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold">1.0842</p>
                <p className="text-sm text-green-500">+0.23%</p>
              </CardContent>
            </Card>
            
            <Card className={`${classes.card} hover-elevate`} data-testid="card-metric-2">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm text-muted-foreground">BTC/USD</span>
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold">$43,521</p>
                <p className="text-sm text-primary">+1.45%</p>
              </CardContent>
            </Card>
            
            <Card className={`${classes.card} hover-elevate`} data-testid="card-metric-3">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Gold</span>
                  <TrendingUp className="h-4 w-4 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold">$2,045</p>
                <p className="text-sm text-yellow-500">+0.52%</p>
              </CardContent>
            </Card>
            
            <Card className={`${classes.card} hover-elevate`} data-testid="card-metric-4">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm text-muted-foreground">S&P 500</span>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-2xl font-bold">4,892</p>
                <p className="text-sm text-red-500">-0.12%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
