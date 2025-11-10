import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { ArrowRight, Zap, Shield, TrendingUp, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroProps {
  headline: string;
  subheadline: string;
  cta: string;
}

/**
 * Carousel Features hero layout - Modern 2025 Design
 * Features: Auto-rotating feature highlights in hero
 * Used by: sunset-trading
 */
export function HeroCarouselFeatures({ headline, subheadline, cta }: HeroProps) {
  const { t } = useLanguage();
  const classes = useVariantClasses();
  
  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Execute trades in milliseconds", color: "text-yellow-500" },
    { icon: Shield, title: "Bank-Grade Security", description: "Your funds are always protected", color: "text-green-500" },
    { icon: TrendingUp, title: "Smart Analytics", description: "AI-powered market insights", color: "text-blue-500" },
    { icon: BarChart3, title: "Advanced Charts", description: "Professional trading tools", color: "text-purple-500" },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative overflow-hidden min-h-[600px] sm:min-h-[700px] flex items-center py-12 sm:py-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className={`${classes.container} relative z-10 ${classes.spacing('section')}`}>
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${classes.animation('hero')}`}>
          {/* Content */}
          <div className={`${classes.spacing('element')} animate-fade-in-up`}>
            <h1 className={`${classes.textSize('hero')} font-bold tracking-tight mb-6`} data-testid="text-hero-title">
              {headline}
            </h1>
            
            <p className={`${classes.textSize('body')} text-muted-foreground leading-relaxed mb-8`} data-testid="text-hero-subtitle">
              {subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

          {/* Auto-rotating Features */}
          <div className="relative h-[300px] flex items-center justify-center">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = index === activeIndex;
              
              return (
                <Card 
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${classes.card} ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                  data-testid={`card-feature-${index}`}
                >
                  <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-primary/10 mb-6`}>
                      <Icon className={`h-12 w-12 ${feature.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
            
            {/* Dots Indicator */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
                  data-testid={`button-carousel-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
