import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariant, useVariantClasses } from "@/layouts/shared/useVariant";
import { Lock, Shield, CheckCircle2 } from "lucide-react";

/**
 * Split hero layout with image on one side, content on the other
 * Used by: charcoal-pro, nordic-clean, terracotta-warm, sunset-trading, sapphire-finance
 */
export function HeroSplit() {
  const { t } = useLanguage();
  const variant = useVariant();
  const classes = useVariantClasses();

  return (
    <section className="relative overflow-hidden">
      <div className={`${classes.container} ${classes.spacing('section')}`}>
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${classes.animation('hero')}`}>
          {/* Content */}
          <div className={classes.spacing('element')}>
            <h1 className={`${classes.textSize('hero')} font-bold tracking-tight`} data-testid="text-hero-title">
              {t('home.hero.title')}
            </h1>
            <p className={`${classes.textSize('body')} text-muted-foreground`} data-testid="text-hero-subtitle">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" data-testid="button-hero-register">
                  {t('home.hero.registerButton')}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" data-testid="button-hero-login">
                  {t('home.hero.loginButton')}
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                <span>{t('home.hero.sslSecured')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>{t('home.hero.regulated')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{t('home.hero.compliant')}</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:h-[500px] rounded-lg overflow-hidden">
            <img 
              src={variant.assets.heroImage} 
              alt="Trading platform hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
