import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { ArrowRight, TrendingUp } from "lucide-react";

interface HeroProps {
  headline: string;
  subheadline: string;
  cta: string;
}

/**
 * Ticker Overlay hero layout - Modern 2025 Design
 * Features: Market ticker strip scrolling over hero
 * Used by: emerald-trader
 */
export function HeroTickerOverlay({ headline, subheadline, cta }: HeroProps) {
  const { t } = useLanguage();
  const classes = useVariantClasses();

  return (
    <section className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] flex items-center py-12 sm:py-0">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Live Market Ticker - Top Overlay */}
      <div className="absolute top-0 left-0 right-0 bg-card/95 border-b border-border backdrop-blur-sm z-20 overflow-hidden">
        <div className="flex gap-8 py-3 px-4 animate-scroll-left">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium">EUR/USD</span>
            <span className="text-sm text-green-500">1.0842 +0.23%</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium">BTC/USD</span>
            <span className="text-sm text-primary">$43,521 +1.45%</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium">Gold</span>
            <span className="text-sm text-yellow-500">$2,045 +0.52%</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium">Crude Oil</span>
            <span className="text-sm text-blue-500">$73.21 -0.31%</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium">ETH/USD</span>
            <span className="text-sm text-purple-500">$2,347 +2.12%</span>
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium">EUR/USD</span>
            <span className="text-sm text-green-500">1.0842 +0.23%</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium">BTC/USD</span>
            <span className="text-sm text-primary">$43,521 +1.45%</span>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className={`${classes.container} relative z-10 ${classes.spacing('section')} mt-16`}>
        <div className={`mx-auto max-w-4xl text-center ${classes.spacing('element')} ${classes.animation('hero')}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Live Market Data</span>
          </div>

          <h1 className={`${classes.textSize('hero')} font-bold tracking-tight mb-6 animate-fade-in-up`} data-testid="text-hero-title">
            {headline}
          </h1>
          
          <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up`} style={{ animationDelay: '200ms' }} data-testid="text-hero-subtitle">
            {subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
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
