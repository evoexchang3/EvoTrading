import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";
import { Lock, Shield, CheckCircle2 } from "lucide-react";

/**
 * Centered hero layout
 * Used by: navy-institutional, arctic-minimal, minimalist-corporate
 */
export function HeroCentered() {
  const { t } = useLanguage();
  const classes = useVariantClasses();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      
      <div className={`${classes.container} relative ${classes.spacing('section')}`}>
        <div className={`mx-auto max-w-4xl text-center ${classes.spacing('element')} ${classes.animation('hero')}`}>
          <h1 className={`${classes.textSize('hero')} font-bold tracking-tight`} data-testid="text-hero-title">
            {t('home.hero.title')}
          </h1>
          <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto`} data-testid="text-hero-subtitle">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
          <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm text-muted-foreground">
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
      </div>
    </section>
  );
}
